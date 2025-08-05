/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header must exactly match block name in the prompt
  const headerRow = ['Hero (hero29)'];

  // 2. Extract background image (image element) and content block
  // The structure is: section > div.container > div.grid-layout > [contentDiv, img]
  let grid = element.querySelector('.grid-layout');
  if (!grid) {
    // Fallback to immediate child divs if structure varies
    const container = element.querySelector('.container');
    grid = container ? container.firstElementChild : null;
  }
  if (!grid) {
    // Fallback to any direct child div
    grid = Array.from(element.children).find(el => el.classList.contains('grid-layout'));
  }

  // Defensive
  if (!grid) {
    // If not found, fall back to any image and any div
    const fallbackImg = element.querySelector('img');
    const fallbackDiv = element.querySelector('div');
    const cells = [
      headerRow,
      [fallbackImg || ''],
      [fallbackDiv || ''],
    ];
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
    return;
  }

  // Now, get direct children: one is content, one is image
  // Do not clone, use references
  let contentDiv = null;
  let imageEl = null;
  Array.from(grid.children).forEach(child => {
    if (child.tagName === 'IMG' && !imageEl) {
      imageEl = child;
    } else if (child.tagName === 'DIV' && !contentDiv) {
      contentDiv = child;
    }
  });

  // Edge cases: If order reversed, or if extra nodes
  if (!contentDiv || !imageEl) {
    const divs = Array.from(grid.children).filter(c => c.tagName === 'DIV');
    const imgs = Array.from(grid.children).filter(c => c.tagName === 'IMG');
    if (!contentDiv) contentDiv = divs[0] || null;
    if (!imageEl) imageEl = imgs[0] || null;
  }

  // 3. Always build table with exactly 3 rows, 1 column as per block description
  const cells = [
    headerRow,
    [imageEl || ''],
    [contentDiv || ''],
  ];

  // 4. Create table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
