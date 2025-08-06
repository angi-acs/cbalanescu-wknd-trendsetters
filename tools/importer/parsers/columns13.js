/* global WebImporter */
export default function parse(element, { document }) {
  // The header row is a single cell, even if there are multiple columns in the content row
  const headerRow = ['Columns (columns13)'];

  // Get direct column wrappers
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Each column's content: just the <img> inside, or whole col if missing
  const contentRow = columns.map(col => {
    const img = col.querySelector('img');
    return img ? img : col;
  });

  // The rows: first is single header cell, second is N columns
  const rows = [headerRow, contentRow];

  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original grid with the table
  element.replaceWith(table);
}
