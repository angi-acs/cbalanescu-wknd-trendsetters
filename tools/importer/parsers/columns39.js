/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: always a single cell as per the requirements
  const headerRow = ['Columns (columns39)'];

  // Get all immediate child divs, which are the columns
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, collect all its content into a cell
  const contentRow = columnDivs.map((col) => {
    // If the column has only one child, return it directly
    if (col.children.length === 1) {
      return col.firstElementChild;
    }
    // Otherwise, collect all children
    return Array.from(col.childNodes).filter(node => {
      // Remove empty text nodes
      return !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim());
    });
  });

  // Compose the table as a 2-row (header, content), N-column (each column div) block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace original element
  element.replaceWith(table);
}
