/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout in this header section
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get all direct children of the grid (each column)
  const columns = Array.from(grid.children).filter(child => child.nodeType === 1);
  if (columns.length < 2) return;

  // Header row must be a single cell, matching the example EXACTLY
  const headerRow = ['Columns (columns42)'];
  // Second row is the content, one cell per column
  const contentRow = columns;

  // Build the table: header row (1 cell), then content row (n cells)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
