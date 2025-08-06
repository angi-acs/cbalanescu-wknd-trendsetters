/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row exactly as in the example
  const rows = [['Cards']];

  // Get all immediate child divs: each is a card
  const cards = element.querySelectorAll(':scope > div');
  cards.forEach(card => {
    // Reference all <p> elements within the card (there should be one)
    // But if none, skip this card
    const p = card.querySelector('p');
    if (p) {
      rows.push([p]);
    }
  });

  // Build and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
