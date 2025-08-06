/* global WebImporter */
export default function parse(element, { document }) {
  // Find the direct child .container, then its .w-layout-grid.grid-layout
  const grid = element.querySelector('div.container > .w-layout-grid.grid-layout');
  if (!grid) return;

  // The grid contains two columns: left (heading, quote), right (divider, author info, logo)
  // We'll structure the block as 2 columns

  // Left column content: heading + quote
  const leftColumn = document.createElement('div');
  const heading = grid.querySelector('.h2-heading');
  if (heading) leftColumn.appendChild(heading);
  const paragraph = grid.querySelector('.paragraph-lg');
  if (paragraph) leftColumn.appendChild(paragraph);

  // Right column content: inner grid (divider, author, logo)
  const rightColumn = document.createElement('div');
  // Find the nested grid (author + logo area) as a direct child of the main grid
  let authorBlock = null;
  for (const child of grid.children) {
    if (child.classList.contains('w-layout-grid') && child !== grid) {
      authorBlock = child;
      break;
    }
  }
  // Some Webflow exports use id selectors for inner grids; fallback for robustness
  if (!authorBlock) {
    authorBlock = grid.querySelector('.w-layout-grid.grid-layout:not(:first-child)');
  }
  if (authorBlock) {
    // Move all children of authorBlock into rightColumn
    while (authorBlock.firstChild) {
      rightColumn.appendChild(authorBlock.firstChild);
    }
    // Remove the now-empty authorBlock container
    if (authorBlock.parentNode) authorBlock.parentNode.removeChild(authorBlock);
  }

  // Create header row as in the spec
  const headerRow = ['Columns (columns28)'];
  const cells = [
    headerRow,
    [leftColumn, rightColumn]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
