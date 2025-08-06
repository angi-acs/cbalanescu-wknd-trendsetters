/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero1)'];

  // Find the main grid containing the image and text
  const grid = element.querySelector('.w-layout-grid');
  let imgEl = null;
  let textContent = null;

  if (grid) {
    // Find the image (first img child in grid)
    imgEl = grid.querySelector('img');
    // Find the text content: first div in grid that's not image
    const children = Array.from(grid.children);
    textContent = children.find(child => child.tagName === 'DIV');
  }

  // Defensive: If missing image, insert empty string
  // Defensive: If missing text, insert empty string
  const cells = [
    headerRow,
    [imgEl || ''],
    [textContent || '']
  ];

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
