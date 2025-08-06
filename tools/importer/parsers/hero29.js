/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the two major columns (text and image)
  const grid = element.querySelector('.w-layout-grid') || element;
  const gridChildren = Array.from(grid.children);

  // Identify image and text areas
  let imageEl = null;
  let textEl = null;
  gridChildren.forEach((child) => {
    if (child.tagName && child.tagName.toLowerCase() === 'img') {
      imageEl = child;
    } else if (!textEl && child.querySelector && child.querySelector('h2')) {
      textEl = child;
    }
  });

  // Compose content cell for row 3 (title, subheading, CTA, etc)
  let contentCell = [];
  if (textEl) {
    // Add all children in original order
    contentCell = Array.from(textEl.children);
  }

  // Block table rows: header, image, content
  const cells = [
    ['Hero (hero29)'],
    [imageEl].filter(Boolean),
    [contentCell.length ? contentCell : ''].filter(Boolean)
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}