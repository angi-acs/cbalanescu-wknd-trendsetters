/* global WebImporter */
export default function parse(element, { document }) {
  // The component is Columns (columns28)
  // Find the main grid layout
  const container = element.querySelector('.container');
  if (!container) return;

  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // The section structure is:
  // 1. <p class="h2-heading.."> - heading
  // 2. <p class="paragraph-lg.."> - testimonial text
  // 3. <div class="w-layout-grid..."><div class="divider..."></div><div class="flex-horizontal..."><div class="avatar"><img ...></div><div>name/title</div></div><div class="utility-display-inline-block...">svg logo</div></div>

  // Only immediate children of grid
  const children = Array.from(grid.children);
  if (children.length < 3) return;

  // First column: heading, divider/avatar block
  // Second column: testimonial ("quote") text

  // Compose columns referencing existing elements
  const leftCol = document.createElement('div');
  leftCol.appendChild(children[0]); // heading
  leftCol.appendChild(children[2]); // grid with divider, avatar, logo

  const rightCol = children[1]; // quote paragraph

  // Block table creation
  const headerRow = ['Columns (columns28)'];
  const cells = [
    headerRow,
    [leftCol, rightCol],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
