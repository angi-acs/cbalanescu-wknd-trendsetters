/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must match example exactly
  const headerRow = ['Hero (hero4)'];

  // Background image row: no image present, so empty string
  const bgRow = [''];

  // Content row: extract heading, paragraph, and button preserving DOM elements
  let contentEls = [];
  // Find the grid containing the main elements
  const grid = element.querySelector('.w-layout-grid');
  if (grid) {
    // Find the direct children of the grid
    const children = Array.from(grid.children);
    // First h2 or heading
    const heading = children.find(el => /^H[1-6]$/.test(el.tagName));
    if (heading) contentEls.push(heading);
    // Find the div containing paragraph and button
    const contentDiv = children.find(el => el.tagName === 'DIV');
    if (contentDiv) {
      // Add all of its children (paragraphs, links)
      contentEls.push(...Array.from(contentDiv.children));
    }
  }
  // Fallback if grid not found (edge case)
  if (contentEls.length === 0) {
    // Try to find heading, p, and a anywhere inside element.
    const heading = element.querySelector('h1,h2,h3,h4,h5,h6');
    const p = element.querySelector('p');
    const a = element.querySelector('a');
    contentEls = [heading, p, a].filter(Boolean);
  }

  const contentRow = [contentEls];

  // Create the table according to guidelines
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgRow,
    contentRow
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
