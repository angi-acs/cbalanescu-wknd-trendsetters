/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero12)'];

  // 2. Find the background image (img tag at top-level grid)
  // The correct image is the one that's a direct child of the top-level grid, not inside the content grid
  let img = null;
  const grids = element.querySelectorAll(':scope > .w-layout-grid');
  if (grids.length > 0) {
    // Iterate through direct children of the top-level grid for an image
    const topLevelGrid = grids[0];
    const directImg = Array.from(topLevelGrid.children).find(
      (child) => child.tagName && child.tagName.toLowerCase() === 'img'
    );
    if (directImg) img = directImg;
  }
  // fallback: find any image inside this section if not found above
  if (!img) {
    img = element.querySelector('img');
  }
  const row2 = [img ? img : ''];

  // 3. Find the main content area
  // it's in the nested .w-layout-grid within the top-level grid
  let contentGrid = null;
  if (grids.length > 0) {
    // Find a child grid inside the top-level grid
    contentGrid = grids[0].querySelector('.w-layout-grid');
  }

  // Fallback: find a div that contains a heading
  if (!contentGrid) {
    contentGrid = element.querySelector('h1, h2, h3')?.closest('div');
  }

  // 4. Gather content: headings, paragraph(s), button group
  let contentElements = [];
  if (contentGrid) {
    // We want to grab the children in order; usually h2, .rich-text, .button-group
    const children = Array.from(contentGrid.children);
    children.forEach((child) => {
      // Ignore images, only grab content
      if (child.tagName && child.tagName.toLowerCase() === 'img') return;
      // Ignore empty
      if (!child.textContent.trim()) return;
      contentElements.push(child);
    });
  }

  const row3 = [contentElements.length ? contentElements : ''];

  // 5. Assemble the table structure
  const cells = [
    headerRow,
    row2,
    row3,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
