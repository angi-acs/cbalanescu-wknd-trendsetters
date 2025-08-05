/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children (columns)
  const cols = Array.from(element.querySelectorAll(':scope > div'));
  // For each column, get its first image or fallback to the full div
  const colCells = cols.map((col) => {
    const img = col.querySelector('img');
    return img || col;
  });
  // The header row must be a single cell, as per the example
  const cells = [
    ['Columns (columns13)'],
    colCells
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
