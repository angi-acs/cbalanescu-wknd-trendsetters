/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Hero (hero14)'];

  // --- Background Image (row 2) ---
  // Find the first child div that contains an img.cover-image.utility-position-absolute
  let bgImg = null;
  const bgImgWrapper = element.querySelector('img.cover-image.utility-position-absolute');
  if (bgImgWrapper) {
    bgImg = bgImgWrapper;
  }

  // --- Main Content (row 3) ---
  // This is the container > card > card-body
  let mainContent = null;
  const container = element.querySelector('div.container');
  if (container) {
    // The card that contains everything
    const card = container.querySelector('div.card.card-on-secondary');
    if (card) {
      mainContent = card;
    }
  }

  // Edge case: if any of the above is missing, provide an empty string for robustness
  const cells = [
    headerRow,
    [bgImg ? bgImg : ''],
    [mainContent ? mainContent : ''],
  ];

  // Create the block table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
