/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified in requirements
  const headerRow = ['Accordion (accordion22)'];
  const rows = [headerRow];

  // Each accordion item is a .divider direct child
  const dividers = element.querySelectorAll(':scope > .divider');

  dividers.forEach((divider) => {
    // Get the inner grid within the .divider
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return;
    // Get all direct children of the grid (should be title and content)
    const gridChildren = Array.from(grid.children);
    // Defensive: skip if not enough columns
    if (gridChildren.length < 2) return;
    // Use existing elements for title and content
    const title = gridChildren[0];
    const content = gridChildren[1];
    rows.push([title, content]);
  });

  // Only replace if at least one accordion item was found (rows > header)
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
