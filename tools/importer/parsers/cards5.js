/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: create fragment from available elements
  function buildTextCell(elems) {
    const frag = document.createDocumentFragment();
    elems.forEach(e => { if (e) frag.appendChild(e); });
    return frag;
  }

  // Table header as in the example
  const cells = [['Cards (cards5)']];

  // Find the grid
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // 1. Main card (large card on left)
  const mainCard = gridChildren[0];
  if (mainCard && mainCard.classList.contains('utility-link-content-block')) {
    const image = mainCard.querySelector('img');
    const tag = mainCard.querySelector('.tag-group');
    const heading = mainCard.querySelector('h3');
    const desc = mainCard.querySelector('p');
    const textCell = buildTextCell([tag, heading, desc]);
    cells.push([
      image || '',
      textCell
    ]);
  }

  // 2. Two medium cards (top right, image cards)
  const mediumCardsCol = gridChildren[1];
  if (mediumCardsCol) {
    const mediumCards = mediumCardsCol.querySelectorAll('.utility-link-content-block');
    mediumCards.forEach(card => {
      const image = card.querySelector('img');
      const tag = card.querySelector('.tag-group');
      const heading = card.querySelector('h3');
      const desc = card.querySelector('p');
      const textCell = buildTextCell([tag, heading, desc]);
      cells.push([
        image || '',
        textCell
      ]);
    });
  }

  // 3. Text-only cards (rightmost column)
  const textCardsCol = gridChildren[2];
  if (textCardsCol) {
    // Only count direct children with .utility-link-content-block
    Array.from(textCardsCol.children).forEach(child => {
      if (child.classList.contains('utility-link-content-block')) {
        const heading = child.querySelector('h3');
        const desc = child.querySelector('p');
        const textCell = buildTextCell([heading, desc]);
        cells.push([
          '',
          textCell
        ]);
      }
    });
  }

  // Build and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
