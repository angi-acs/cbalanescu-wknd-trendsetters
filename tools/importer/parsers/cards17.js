/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function: extracts cards from a grid
  function extractCardsFromGrid(grid) {
    const cards = [];
    // Each direct child <a> is a card
    Array.from(grid.children).forEach(card => {
      if (card.tagName !== 'A') return;
      // Try to find the card image (first img in descendants)
      let imgEl = card.querySelector('img');
      // Build the text cell: heading + description
      let heading = card.querySelector('h3');
      let desc = card.querySelector('.paragraph-sm');
      // Only push heading/desc if they exist
      const textParts = [];
      if (heading) textParts.push(heading);
      if (desc) textParts.push(desc);
      // If both heading & desc missing, push empty string so cell is not empty
      cards.push([
        imgEl || '',
        textParts.length > 0 ? textParts : ''
      ]);
    });
    return cards;
  }

  // Find every grid inside all tab panes
  const grids = element.querySelectorAll('.w-layout-grid');
  let allCards = [];
  grids.forEach(grid => {
    allCards = allCards.concat(extractCardsFromGrid(grid));
  });

  // Table header as required
  const cells = [
    ['Cards (cards17)'],
    ...allCards
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
