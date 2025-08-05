/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container which holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // The grid contains 3 direct children:
  // 1. The left content (div with h2, h3, p)
  // 2. The contact list (ul)
  // 3. The image (img)
  let leftContent = null;
  let contactList = null;
  let image = null;

  // Go through all direct children of grid
  Array.from(grid.children).forEach(child => {
    if (
      child.tagName === 'DIV' &&
      (child.querySelector('h2') || child.querySelector('h3') || child.querySelector('p'))
    ) {
      leftContent = child;
    } else if (child.tagName === 'UL') {
      contactList = child;
    } else if (child.tagName === 'IMG') {
      image = child;
    }
  });

  // Compose a left column div with left content and contact list (if present)
  const leftCol = document.createElement('div');
  if (leftContent) leftCol.appendChild(leftContent);
  if (contactList) leftCol.appendChild(contactList);

  // The right column is the image
  // If image is not present, use an empty div
  const rightCol = image ? image : document.createElement('div');

  // Fix: The cells array should have a header row with a single column, then a content row with N columns
  const cells = [
    ['Columns (columns20)'], // Header row: single cell
    [leftCol, rightCol]      // Second row: one cell per column
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  // After createTable, adjust the header row to have a single th with colspan equal to the number of columns in the second row
  const headerRow = table.querySelector('tr:first-child');
  if (headerRow && headerRow.children.length === 1 && table.rows.length > 1) {
    const th = headerRow.children[0];
    const colCount = table.rows[1].children.length;
    if (colCount > 1) {
      th.setAttribute('colspan', colCount);
    }
  }

  element.replaceWith(table);
}
