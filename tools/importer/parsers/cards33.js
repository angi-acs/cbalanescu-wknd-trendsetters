/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards33) header row
  const headerRow = ['Cards (cards33)'];

  // Query all top-level card divs
  const cardDivs = element.querySelectorAll(':scope > div.utility-aspect-1x1');
  
  // Each card has only an image, no text content in the source HTML
  const rows = Array.from(cardDivs).map(div => {
    const img = div.querySelector('img');
    return [img, ''];
  });

  // Assemble the block table
  const tableArray = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableArray, document);
  element.replaceWith(block);
}
