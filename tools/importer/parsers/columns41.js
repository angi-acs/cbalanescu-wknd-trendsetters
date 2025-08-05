/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: only one column
  const headerRow = ['Columns (columns41)'];

  // Get the main grid (has two children: left = heading/eyebrow, right = body/button/author)
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column.grid-gap-lg');
  let leftCol = document.createElement('div');
  let rightCol = document.createElement('div');
  if (mainGrid) {
    const children = mainGrid.querySelectorAll(':scope > div');
    if (children[0]) leftCol = children[0];
    if (children[1]) rightCol = children[1];
  }

  // Get the images grid (two images, side by side)
  const imagesGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column.grid-gap-md');
  let leftImage = document.createElement('div');
  let rightImage = document.createElement('div');
  if (imagesGrid) {
    const images = imagesGrid.querySelectorAll(':scope > div');
    if (images[0]) leftImage = images[0];
    if (images[1]) rightImage = images[1];
  }

  // Compose cells so that the header row is a single-column, content rows are two-column
  const cells = [
    headerRow,               // 1 column
    [leftCol, rightCol],     // 2 columns
    [leftImage, rightImage], // 2 columns
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
