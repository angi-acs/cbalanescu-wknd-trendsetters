/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid inside the hero section
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Find headline (h2)
  const headline = grid.querySelector('h2');

  // Find tags block (vertical flex with tags)
  const tagsBlock = grid.querySelector('.flex-vertical');

  // Find the description rich text block
  const descriptionBlock = grid.querySelector('.rich-text');

  // Assemble content for the third row:
  // Heading, tags, and description (in source order)
  const contentArr = [];
  if (headline) contentArr.push(headline);
  if (tagsBlock) contentArr.push(tagsBlock);
  if (descriptionBlock) contentArr.push(descriptionBlock);

  // Build the table: header row, (optional) image row, content row
  const cells = [
    ['Hero (hero32)'], // Header row
    [''], // Background image row (empty in this HTML)
    [contentArr] // Content row: existing elements referenced in order
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
