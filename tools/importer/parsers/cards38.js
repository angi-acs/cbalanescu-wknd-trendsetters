/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract text content from a card
  function extractTextContent(cardEl) {
    // Collect the main heading (could be h2 or h3 or h4)
    let heading = cardEl.querySelector('h1, h2, h3, h4, h5, h6');
    // Collect all p tags immediately under the card (description)
    let paragraphs = Array.from(cardEl.querySelectorAll('p'));
    // Find a CTA button or .button class (if present)
    let cta = cardEl.querySelector('.button, .btn, a.button');
    const content = [];
    if (heading) content.push(heading);
    if (paragraphs.length > 0) content.push(...paragraphs);
    if (cta) content.push(cta);
    return content;
  }

  // Find the grid that contains all card items
  // It's either the first grid-layout or the element itself
  let grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) grid = element;

  // Recursively collect all .utility-link-content-block (the actual cards)
  function collectCards(node) {
    let cardEls = [];
    node.childNodes.forEach(child => {
      if (child.nodeType === 1 && child.classList.contains('utility-link-content-block')) {
        cardEls.push(child);
      } else if (child.nodeType === 1 && child.classList.contains('w-layout-grid')) {
        cardEls = cardEls.concat(collectCards(child));
      }
    });
    return cardEls;
  }
  const cards = collectCards(grid);

  // Compose rows for the block table
  const rows = [[ 'Cards (cards38)' ]]; // header row
  cards.forEach(card => {
    // Find image (use the direct `img` if present, otherwise use the wrapping aspect div)
    let img = card.querySelector('img');
    let imageCell = null;
    if (img) {
      if (
        img.parentElement &&
        img.parentElement.childElementCount === 1 &&
        img.parentElement !== card
      ) {
        imageCell = img.parentElement;
      } else {
        imageCell = img;
      }
    } else {
      imageCell = '';
    }
    const textCell = extractTextContent(card);
    rows.push([imageCell, textCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
