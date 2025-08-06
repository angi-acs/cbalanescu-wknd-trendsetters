/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row exactly as required
  const headerRow = ['Hero (hero4)'];

  // No background image in given HTML, so second row is empty
  const bgRow = [''];

  // Third row: Title (heading), Subheading (paragraph), CTA button (link)
  // Robustly handle variations (missing or reordered elements)
  // Find the direct child .w-layout-grid
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Find all direct children of grid (should be [heading, content-div])
  const gridChildren = Array.from(grid.children);

  // Heading: the first heading element in grid children
  const heading = gridChildren.find(c => /^H[1-6]$/i.test(c.tagName));
  // Content: the first non-heading element
  const contentDiv = gridChildren.find(c => c !== heading);

  // Prepare the array for the cell
  const contentCell = [];
  if (heading) contentCell.push(heading);

  if (contentDiv) {
    // Find all elements in contentDiv
    const children = Array.from(contentDiv.children);
    // Paragraph (subheading/description)
    const paragraph = children.find(el => el.tagName === 'P');
    if (paragraph) contentCell.push(paragraph);
    // CTA: the first <a> (button)
    const cta = children.find(el => el.tagName === 'A');
    if (cta) contentCell.push(cta);
  }

  // Compose the table structure
  const cells = [headerRow, bgRow, [contentCell]];

  // Create and replace with the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
