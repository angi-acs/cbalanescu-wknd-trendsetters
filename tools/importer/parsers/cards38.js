/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly matches example
  const headerRow = ['Cards (cards38)'];
  const cells = [headerRow];

  // Find the main card grid
  let container = element.querySelector('.container');
  if (!container) container = element;

  // All direct .w-layout-grid children (one main, one nested)
  const topGrids = Array.from(container.querySelectorAll(':scope > .w-layout-grid'));
  let cardNodes = [];

  topGrids.forEach(grid => {
    // Each child of grid can be another grid or a card
    Array.from(grid.children).forEach(child => {
      // If it's a nested grid, add its direct card children
      if (child.classList.contains('w-layout-grid')) {
        cardNodes.push(...Array.from(child.querySelectorAll(':scope > .utility-link-content-block')));
      } else if (child.classList.contains('utility-link-content-block')) {
        cardNodes.push(child);
      }
    });
  });

  // Fallback: if no grids found, look for cards directly
  if (cardNodes.length === 0) {
    cardNodes = Array.from(container.querySelectorAll('.utility-link-content-block'));
  }

  cardNodes.forEach(card => {
    // Find aspect-ratio container, prefer 2x3, fallback to 1x1, then fallback to any img
    let imageDiv = card.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    let img = imageDiv ? imageDiv.querySelector('img') : card.querySelector('img');
    let imageCell = img || '';

    // Find heading (can be h2, h3, h4 etc)
    let heading = card.querySelector('h2, h3, h4');
    // Find description: all <p> after heading in dom order
    let descs = [];
    if (heading) {
      let sib = heading.nextElementSibling;
      while (sib) {
        if (sib.tagName && sib.tagName.toLowerCase() === 'p') {
          descs.push(sib);
        } else if (sib.classList && (sib.classList.contains('button') || sib.tagName.toLowerCase() === 'a' || sib.tagName.toLowerCase() === 'button')) {
          // Stop after paragraphs, but still allow cta after
          break;
        }
        sib = sib.nextElementSibling;
      }
    } else {
      descs = Array.from(card.querySelectorAll('p'));
    }
    // Find CTA: look for .button, a.button, or native <a>/.w-button at end
    let cta = card.querySelector('.button, .w-button, a.button, a.w-button, button');

    // Construct text cell
    let textCell = [];
    if (heading) textCell.push(heading);
    if (descs.length) textCell.push(...descs);
    if (cta) textCell.push(cta);
    if (textCell.length === 0) {
      // Fallback: if no heading/desc, use all childNodes except imageDiv/img
      let textDiv = card.cloneNode(false);
      Array.from(card.childNodes).forEach(n => {
        if (n !== imageDiv && n !== img) textDiv.appendChild(n);
      });
      textCell.push(textDiv);
    }
    // Always two columns: image | text
    cells.push([
      imageCell,
      textCell.length > 1 ? textCell : textCell[0]
    ]);
  });

  // Create the table and replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
