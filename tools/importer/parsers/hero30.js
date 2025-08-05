/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Block header
  const headerRow = ['Hero (hero30)'];

  // 2. Background Image row
  // Find the <img> with class 'cover-image' inside the header's descendant divs
  let bgImg = null;
  const imgs = element.querySelectorAll('img.cover-image');
  if (imgs && imgs.length > 0) {
    bgImg = imgs[0];
  }
  const bgImgRow = [bgImg || ''];

  // 3. Content row (title, cta, etc)
  let contentCell = [];

  // The content is inside the .container div, usually the second grid cell
  // Find '.container' among header's descendants
  const container = element.querySelector('.container');
  if (container) {
    // Find the heading (h1) and button group (if present)
    const heading = container.querySelector('h1');
    if (heading) {
      contentCell.push(heading);
    }
    const buttonGroup = container.querySelector('.button-group');
    // Only include button group if it contains child elements
    if (buttonGroup && buttonGroup.children.length > 0) {
      contentCell.push(buttonGroup);
    }
  }

  // If no content found, ensure cell is present and empty
  const contentRow = [contentCell.length > 0 ? contentCell : ''];

  // Assemble cells for block table
  const cells = [
    headerRow,
    bgImgRow,
    contentRow
  ];

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
