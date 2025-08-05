/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must exactly match the example (including capitalization and spacing)
  const headerRow = ['Hero (hero40)'];

  // Defensive: Find the grid containing the hero layout
  const grid = element.querySelector('.w-layout-grid.grid-layout');

  let imageCell = [''];
  let contentCell = [''];

  if (grid) {
    // Get immediate child divs
    const gridDivs = grid.querySelectorAll(':scope > div');

    // 1st div: background image
    if (gridDivs[0]) {
      const img = gridDivs[0].querySelector('img');
      if (img) imageCell = [img];
    }

    // 2nd div: text, cta
    if (gridDivs[1]) {
      const gridInner = gridDivs[1].querySelector('.w-layout-grid');
      let contentEls = [];
      if (gridInner) {
        // Get h1
        const h1 = gridInner.querySelector('h1');
        if (h1) contentEls.push(h1);
        // Subheading and CTA
        const flexVert = gridInner.querySelector('.flex-vertical.flex-gap-xs');
        if (flexVert) {
          // Paragraph (subheading)
          const p = flexVert.querySelector('p');
          if (p) contentEls.push(p);
          // CTA Button
          const btn = flexVert.querySelector('a.button');
          if (btn) contentEls.push(btn);
        }
      }
      if (contentEls.length) {
        contentCell = contentEls;
      }
    }
  }

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [imageCell],
    [contentCell],
  ], document);

  element.replaceWith(table);
}
