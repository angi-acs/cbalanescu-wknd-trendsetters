/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout wrapper
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (order is important)
  const gridChildren = Array.from(grid.children);

  // There should be three: left column (info), right column (contact list), image
  let leftCol = null;
  let rightCol = null;
  let img = null;

  // Identify leftCol, rightCol, and img
  gridChildren.forEach(child => {
    if (!leftCol && child.querySelector('h2') && child.querySelector('h3')) {
      leftCol = child;
    } else if (!rightCol && child.tagName === 'UL') {
      rightCol = child;
    } else if (!img && child.tagName === 'IMG') {
      img = child;
    }
  });

  // As a fallback, also check if the image exists nested in any child
  if (!img) {
    img = grid.querySelector('img');
  }

  // If any column is missing, insert an empty placeholder
  const cols = [leftCol, rightCol].map(col => col || '');

  // Create the table rows
  const headerRow = ['Columns (columns20)'];
  const contentRow = cols;
  const rows = [headerRow, contentRow];

  // If there is an image, add another row, spanning two columns
  if (img) {
    // To span columns, add the image to first cell, second cell empty
    rows.push([img, '']);
  }

  // Create and replace block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
