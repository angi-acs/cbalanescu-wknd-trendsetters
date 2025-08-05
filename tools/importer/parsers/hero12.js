/* global WebImporter */
export default function parse(element, { document }) {
  // --- Header row: always the block name, exactly as specified ---
  const headerRow = ['Hero (hero12)'];

  // --- Image row: find the prominent image in the section ---
  // The image is a direct child of the outer grid, not inside content blocks
  let imageRow = [''];
  const images = element.querySelectorAll('img');
  if (images.length > 0) {
    // Use the first image found
    imageRow = [images[0]];
  }

  // --- Content row: should include heading (h2), subheading (rich-text), and CTA(s) (button-group) ---
  // Find the most likely container for these, which is a nested .section inside a .grid-layout
  let contentCell = [];
  // Find all .section blocks inside the element (skipping the top-level section)
  const nestedSections = element.querySelectorAll('.section');
  let foundContent = false;
  for (const section of nestedSections) {
    // Look for h1/h2/h3
    const heading = section.querySelector('h1, h2, h3');
    if (heading) contentCell.push(heading);

    // Look for subheading: .rich-text, .paragraph-lg, .w-richtext, etc
    const subheading = section.querySelector('.rich-text, .rich-text-block, .paragraph-lg, .w-richtext');
    if (subheading) contentCell.push(subheading);

    // Look for CTA(s): .button-group
    const cta = section.querySelector('.button-group');
    if (cta) contentCell.push(cta);

    // If we found at least one of the items, stop
    if (contentCell.length > 0) {
      foundContent = true;
      break;
    }
  }

  // Fallback: If nothing found, use all children except image
  if (!foundContent) {
    const children = Array.from(element.children).filter((child) => !child.matches('img'));
    if (children.length > 0) {
      contentCell = children;
    } else {
      contentCell = [''];
    }
  }

  // --- Build the block table ---
  const cells = [
    headerRow,
    imageRow,
    [contentCell]
  ];

  // --- Create block table and replace original element ---
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
