/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Columns (columns39)'];

  // Reference each direct child div as a column (so all contents are preserved, not just images)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // The content row: each cell is the original column div
  const contentRow = columns;

  // Build the table: header, then the content row
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace original element
  element.replaceWith(table);
}