/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as specified
  const headerRow = ['Accordion (accordion22)'];

  // Gather all immediate .divider children (each is one accordion item)
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));

  // Map each divider to a [title, content] row
  const rows = dividers.map(divider => {
    // Find grid container inside the divider
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) {
      // Fallback: empty cells
      return [document.createElement('div'), document.createElement('div')];
    }
    // The title and content should be the first and second children of the grid
    // But let's check class names to be resilient
    let titleEl = null;
    let contentEl = null;
    for (const child of grid.children) {
      if (!titleEl && child.classList.contains('h4-heading')) {
        titleEl = child;
      } else if (!contentEl && child.classList.contains('rich-text')) {
        contentEl = child;
      }
    }
    // Fallbacks in case class names are missing
    if (!titleEl) titleEl = grid.children[0] || document.createElement('div');
    if (!contentEl) contentEl = grid.children[1] || document.createElement('div');
    return [titleEl, contentEl];
  });

  // Compose the table
  const cells = [headerRow, ...rows];

  // Create the table for the block
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(table);
}
