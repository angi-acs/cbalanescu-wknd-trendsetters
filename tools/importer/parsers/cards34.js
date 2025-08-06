/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const cells = [['Cards (cards34)']];
  // Get all card wrappers (assume 1:1 mapping, each contains an <img>)
  const cardDivs = element.querySelectorAll(':scope > .utility-aspect-1x1');
  cardDivs.forEach((cardDiv) => {
    // Reference the (single) image element in each card
    const img = cardDiv.querySelector('img');
    // Defensive: if no image, skip this card
    if (!img) return;
    // For this HTML, there is no title/description, so second cell is empty
    cells.push([
      img,
      ''
    ]);
  });
  // Build the table and replace the source
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
