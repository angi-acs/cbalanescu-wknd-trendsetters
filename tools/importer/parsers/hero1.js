/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero1)'];
  
  // 2. Get main content wrapper
  const container = element.querySelector('.container');
  const grid = container ? container.querySelector('.grid-layout') : null;
  const gridChildren = grid ? Array.from(grid.children) : [];

  // 3. Find image (use first img in grid)
  let img = null;
  for (const child of gridChildren) {
    if (child.tagName === 'IMG') {
      img = child;
      break;
    }
  }
  // Fallback if image not found
  if (!img) {
    img = element.querySelector('img');
  }

  // 4. Find text block (the non-img direct child in grid)
  let textBlock = null;
  for (const child of gridChildren) {
    if (child !== img) {
      textBlock = child;
      break;
    }
  }
  // Fallback if not found
  if (!textBlock) {
    // Try to find a likely div
    textBlock = element.querySelector('div:not(.container):not(.grid-layout):not(.w-layout-grid):not(.image)');
  }

  // Defensive: If nothing found, create an empty div
  if (!img) img = document.createElement('div');
  if (!textBlock) textBlock = document.createElement('div');

  // 5. Assemble rows for table according to spec
  const rows = [
    headerRow,
    [img],
    [textBlock],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
