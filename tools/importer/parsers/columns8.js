/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing columns (direct child with grid-layout class)
  const grid = element.querySelector(':scope > .grid-layout');
  if (!grid) return;
  // Get each column (direct children of grid)
  const columns = Array.from(grid.children);
  // Build header row as shown in the example: single cell, regardless of column count
  const headerRow = ['Columns (columns8)'];
  // Build the columns row: each cell is the referenced existing column element
  const columnsRow = columns.map(col => col);
  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);
  // Replace the original element with the new table block
  element.replaceWith(table);
}
