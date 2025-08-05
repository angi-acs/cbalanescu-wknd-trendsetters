/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards11)'];
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  const rows = cards.map(card => {
    // Image: the first img inside the .utility-aspect-3x2 container
    let imgEl = null;
    const imgContainer = card.querySelector('.utility-aspect-3x2');
    if (imgContainer) {
      imgEl = imgContainer.querySelector('img');
    }
    if (!imgEl) {
      imgEl = document.createElement('span');
    }
    // Text cell: tag, heading, description
    const content = card.querySelector('.utility-padding-all-1rem');
    const textCellParts = [];
    if (content) {
      // Tag (optional)
      const tagGroup = content.querySelector('.tag-group');
      if (tagGroup) {
        // Reference the existing tagGroup element directly
        textCellParts.push(tagGroup);
      }
      // Heading (optional)
      const heading = content.querySelector('h1,h2,h3,h4,h5,h6');
      if (heading) {
        textCellParts.push(heading);
      }
      // Paragraph/description (optional)
      const desc = content.querySelector('p');
      if (desc) {
        textCellParts.push(desc);
      }
      // No CTA links in sample HTML (all CTA is the card itself)
    }
    return [imgEl, textCellParts];
  });
  const tableArray = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableArray, document);
  element.replaceWith(block);
}
