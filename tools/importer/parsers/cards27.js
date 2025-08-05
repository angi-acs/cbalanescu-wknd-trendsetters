/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards27)'];
  const rows = [headerRow];

  // Get all top-level card elements (each card is a direct child div)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  cardDivs.forEach(card => {
    // Get first image inside the card
    const img = card.querySelector('img');
    // Get the card text content, if available
    let textCellContent = null;
    // Prefer .utility-padding-all-2rem div, which contains h3 and p
    const textDiv = card.querySelector('.utility-padding-all-2rem');
    if (textDiv) {
      textCellContent = textDiv;
    } else {
      // If no such div, create an empty div for text content
      textCellContent = document.createElement('div');
    }
    // Only add a row if there's an image (image is mandatory for this block)
    if (img) {
      rows.push([img, textCellContent]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}