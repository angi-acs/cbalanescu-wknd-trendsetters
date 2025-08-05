/* global WebImporter */
export default function parse(element, { document }) {
  // 1st row: block name (header)
  const headerRow = ['Hero (hero6)'];

  // 2nd row: background image (img element if present)
  // Find the main grid, then its immediate children (the two columns)
  const mainGrid = element.querySelector(':scope > .w-layout-grid');
  let imgCell = '';
  let contentCell = '';

  if (mainGrid) {
    const gridDivs = mainGrid.querySelectorAll(':scope > div');
    // Usually: [image wrapper div, content wrapper div]
    if (gridDivs.length > 0) {
      // The background image is in the first column
      const bgImg = gridDivs[0].querySelector('img');
      if (bgImg) imgCell = bgImg;
    }
    if (gridDivs.length > 1) {
      // The content card is nested inside the second column
      // There may be several wrappers, but always a .card
      const card = gridDivs[1].querySelector('.card');
      if (card) {
        contentCell = card;
      } else {
        // Fallback: use entire content column if card not found
        contentCell = gridDivs[1];
      }
    }
  }

  // If mainGrid not found, fallback to empty cells (shouldn't happen)

  const cells = [
    headerRow,
    [imgCell],
    [contentCell],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
