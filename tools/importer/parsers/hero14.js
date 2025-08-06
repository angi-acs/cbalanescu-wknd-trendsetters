/* global WebImporter */
export default function parse(element, { document }) {
  // Row 1: Header (block name exactly as required)
  const headerRow = ['Hero (hero14)'];

  // Row 2: Background Image (single <img> with absolute positioning)
  // The background image is always the .cover-image.utility-position-absolute
  const bgImg = element.querySelector('img.cover-image.utility-position-absolute');
  const bgImgRow = [bgImg ? bgImg : ''];

  // Row 3: Content (the main card with all important content)
  // This card contains heading, list items, call-to-action, and may include an inline image
  // We want the entire .card.card-on-secondary block as a single cell
  const card = element.querySelector('.card.card-on-secondary');
  const contentRow = [card ? card : ''];

  // Assemble the table in the required 1-col 3-row structure
  const cells = [headerRow, bgImgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
