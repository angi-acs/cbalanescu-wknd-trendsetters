/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row with the exact block name
  const headerRow = ['Hero (hero30)'];

  // Find the background image. It's the <img> with class 'cover-image'
  const img = element.querySelector('img.cover-image');
  const backgroundRow = [img ? img : '']; // Insert empty string if not found

  // Find the text content: the second cell of the grid-layout
  // .grid-layout > div:nth-child(2)
  const grid = element.querySelector('.grid-layout');
  let textContentDiv = '';
  if (grid) {
    const divs = grid.querySelectorAll(':scope > div');
    if (divs.length > 1) {
      // The second grid cell has the text content (e.g., h1)
      textContentDiv = divs[1];
    }
  }
  const textRow = [textContentDiv];

  // Assemble the table as per the requirements
  const rows = [
    headerRow,
    backgroundRow,
    textRow
  ];

  // Create and replace with the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
