/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards17)'];
  const cells = [headerRow];

  // Select all tab panes
  const tabPanes = element.querySelectorAll('[class*="w-tab-pane"]');
  tabPanes.forEach((tabPane) => {
    // Each tabPane contains a grid of cards
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    const cards = grid.querySelectorAll(':scope > a');
    cards.forEach((card) => {
      // Left cell: image (if present)
      let imgCell = '';
      const aspectBox = card.querySelector('.utility-aspect-3x2');
      if (aspectBox) {
        const img = aspectBox.querySelector('img');
        if (img) imgCell = img;
      }
      // Right cell: text (heading and description)
      // If .utility-text-align-center exists within card, use it, else use card
      const textContainer = card.querySelector('.utility-text-align-center') || card;
      let textParts = [];
      // Heading (h3 or .h4-heading)
      const heading = textContainer.querySelector('h3, .h4-heading');
      if (heading) textParts.push(heading);
      // Description (first .paragraph-sm)
      const desc = textContainer.querySelector('.paragraph-sm');
      if (desc) textParts.push(desc);
      // Compose cell with all found elements
      // If both missing, fallback to ''
      let textCell = textParts.length > 0 ? textParts : '';
      cells.push([imgCell, textCell]);
    });
  });
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
