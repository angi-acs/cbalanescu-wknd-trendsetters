/* global WebImporter */
export default function parse(element, { document }) {
  // Table header, as required by the block definition and example
  const headerRow = ['Hero (hero36)'];

  // 2nd row: background image (optional) - not present in this HTML, so empty string
  const bgImageRow = [''];

  // 3rd row: Title (Heading), Subheading (optional), CTA (optional)
  // These are all in grid children, in order: text column, then CTA column
  let contentEls = [];
  
  // Get the main grid (should be a direct descendant)
  const grid = element.querySelector('.w-layout-grid');
  if (grid) {
    const gridCells = grid.querySelectorAll(':scope > *');
    if (gridCells.length > 0) {
      // First cell: text (heading and subheading)
      const textCell = gridCells[0];
      // Find heading (h1-h6)
      const heading = textCell.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) contentEls.push(heading);
      // Find subheading (could be a <p> or an element with class 'subheading')
      // We need to ensure we do not double-push the same element
      let subheading;
      // Prefer a <p> with class 'subheading' (as in the HTML)
      subheading = textCell.querySelector('p.subheading');
      // If not found, fallback to any <p> or .subheading
      if (!subheading) {
        subheading = textCell.querySelector('.subheading, p');
      }
      // Only push subheading if it's not the heading node
      if (subheading && subheading !== heading) {
        contentEls.push(subheading);
      }
    }
    if (gridCells.length > 1) {
      // Second cell: CTA button or link
      const ctaCell = gridCells[1];
      // Find a link or button
      let cta = ctaCell.querySelector('a, button');
      // In some Webflow layouts, the cell itself is the link
      if (!cta && (ctaCell.tagName === 'A' || ctaCell.tagName === 'BUTTON')) {
        cta = ctaCell;
      }
      if (cta) contentEls.push(cta);
    }
  }
  // Only push non-empty content to the row
  const contentRow = [contentEls.length ? contentEls : ['']];

  const cells = [
    headerRow,
    bgImageRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
