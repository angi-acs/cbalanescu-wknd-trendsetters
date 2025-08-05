/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must be a single cell array per requirements
  const headerRow = ['Columns (columns31)'];

  // Gather all immediate children for columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // For each column, extract the direct child (which contains the image)
  const cellsRow = columns.map(col => {
    if (col.children.length === 1) {
      return col.children[0];
    }
    return col;
  });

  // Table structure: header is a single-cell row, second row is N columns
  const cells = [
    headerRow,
    cellsRow,
  ];

  // Create table with one-cell header row, and columns as required
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
