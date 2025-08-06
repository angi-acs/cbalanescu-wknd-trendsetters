/* global WebImporter */
export default function parse(element, { document }) {
  // Header row - must EXACTLY match the example
  const headerRow = ['Hero (hero7)'];

  // 2nd row: Background Image (optional)
  // Use the first <img> as the background image
  let backgroundImg = null;
  const firstImg = element.querySelector('img');
  if (firstImg) backgroundImg = firstImg;
  const backgroundRow = [backgroundImg || ''];

  // 3rd row: Title, Subheading, CTA - not present, so blank
  const contentRow = [''];

  // Compose the table as in the example: 1 col, 3 rows
  const rows = [headerRow, backgroundRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
