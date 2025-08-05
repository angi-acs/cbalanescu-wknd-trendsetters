/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main .container with the .grid-layout
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (columns)
  const gridChildren = Array.from(grid.children).filter(ch => ch.nodeType === 1);
  if (gridChildren.length < 2) return;

  // Reference the entire left and right columns, ensuring we get all text content
  const leftCol = gridChildren[0];
  const rightCol = gridChildren[1];

  // Header row must match the example exactly
  const headerRow = ['Columns (columns42)'];
  // The content row - reference the original column elements (not clones)
  const contentRow = [leftCol, rightCol];

  const cells = [headerRow, contentRow];

  // Create the columns block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element in the DOM
  element.replaceWith(block);
}
