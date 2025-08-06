/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: exactly as block name
  const headerRow = ['Hero (hero36)'];

  // Background image row: none present in this HTML
  const bgRow = [''];

  // Content row: needs to contain the title, subheading, and CTA
  // Strategy: Extract all relevant block-level elements from the grid container
  // These are: heading, subheading (p), and CTA (a)
  let heading, subheading, cta;

  // Locate the container with the 'grid-layout' class
  const grid = element.querySelector('.grid-layout');
  if (grid) {
    // Get all direct children of grid
    const children = Array.from(grid.children);
    // Find the div with heading and paragraph
    const textDiv = children.find(child => child.tagName === 'DIV');
    if (textDiv) {
      heading = textDiv.querySelector('h1, h2, h3, h4, h5, h6');
      subheading = textDiv.querySelector('p');
    }
    // Find the CTA (anchor element)
    cta = children.find(child => child.tagName === 'A');
  }

  // Compose the content cell, only including present elements, in order
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  if (cta) contentCell.push(cta);

  // If there are no elements, use an empty string
  const contentRow = [contentCell.length ? contentCell : ''];

  // Build the cells array for the block table
  const cells = [headerRow, bgRow, contentRow];

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
