/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (columns)
  const columnDivs = element.querySelectorAll(':scope > div');
  const numCols = columnDivs.length;
  if (!numCols) return;

  // The header row should have as many cells as the content row: first cell with block name, rest empty
  const headerRow = ['Columns (columns31)'];
  while (headerRow.length < numCols) {
    headerRow.push('');
  }

  const contentRow = Array.from(columnDivs);

  const cells = [
    headerRow,
    contentRow
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
