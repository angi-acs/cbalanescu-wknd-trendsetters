/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all direct children of the grid (these are the columns)
  const columnElements = Array.from(grid.children);
  if (columnElements.length === 0) return;

  // Table header row: exactly one cell with the correct title
  const headerRow = ['Columns (columns8)'];

  // Content row: one cell per column, referencing the original elements
  const contentRow = columnElements.map(col => col);

  // Build the table data structure
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}