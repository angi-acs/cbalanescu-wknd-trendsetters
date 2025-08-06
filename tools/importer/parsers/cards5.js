/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in the example
  const headerRow = ['Cards (cards5)'];
  const cells = [headerRow];

  // Helper to build the text cell from a card (references existing elements directly)
  function buildTextCell(card) {
    const fragments = [];
    // Tag(s), if present
    const tagGroup = card.querySelector('.tag-group');
    if (tagGroup) {
      fragments.push(tagGroup);
    }
    // Heading (h3)
    const heading = card.querySelector('h3');
    if (heading) {
      fragments.push(heading);
    }
    // Paragraph/Description (p)
    const desc = card.querySelector('p');
    if (desc) {
      fragments.push(desc);
    }
    return fragments;
  }

  // Get the .container > .grid-layout (the main grid)
  const gridLayout = element.querySelector('.container .grid-layout');
  if (!gridLayout) return;
  // First card is the prominent one (feature card) - first <a>
  const firstCard = gridLayout.querySelector(':scope > a.utility-link-content-block');
  if (firstCard) {
    // image: div[class*="aspect"] > img
    const imgWrap = firstCard.querySelector('div[class*="aspect"]');
    let img = imgWrap ? imgWrap.querySelector('img') : null;
    // If no image, cell is empty string
    cells.push([
      img || '',
      buildTextCell(firstCard)
    ]);
  }
  // The next two groups are both .flex-horizontal
  const flexGroups = gridLayout.querySelectorAll(':scope > div.flex-horizontal');
  // The first flex-horizontal: contains 2 cards with images
  if (flexGroups[0]) {
    const secondaryCards = flexGroups[0].querySelectorAll(':scope > a.utility-link-content-block');
    secondaryCards.forEach(card => {
      const imgWrap = card.querySelector('div[class*="aspect"]');
      let img = imgWrap ? imgWrap.querySelector('img') : null;
      cells.push([
        img || '',
        buildTextCell(card)
      ]);
    });
  }
  // The second flex-horizontal: contains text-only cards (no image)
  if (flexGroups[1]) {
    const tertiaryCards = flexGroups[1].querySelectorAll(':scope > a.utility-link-content-block');
    tertiaryCards.forEach(card => {
      cells.push([
        '', // no image
        buildTextCell(card)
      ]);
    });
  }
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
