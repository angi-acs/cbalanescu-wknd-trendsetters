/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main container
  const container = element.querySelector('.container');
  if (!container) return;

  // Find the main grid (two columns: left = info, right = images)
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  const imagesGrid = container.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  if (!mainGrid || !imagesGrid) return;

  // LEFT COLUMN (mainGrid):
  // First div: eyebrow and heading
  // Second div: text, author/date/read, "Read more" button
  const leftDivs = mainGrid.querySelectorAll(':scope > div');
  const leftContent = [];
  leftDivs.forEach(div => {
    leftContent.push(div);
  });

  // RIGHT COLUMN (imagesGrid): two images in .utility-aspect-1x1
  const imgDivs = imagesGrid.querySelectorAll(':scope > .utility-aspect-1x1');
  const rightContent = [];
  imgDivs.forEach(div => {
    rightContent.push(div);
  });

  // Compose the table cells
  const cells = [
    ['Columns (columns41)'],
    [leftContent, rightContent]
  ];

  // Create the block table, replace the section
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
