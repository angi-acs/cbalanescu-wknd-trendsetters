/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row exactly as specified
  const headerRow = ['Hero (hero32)'];

  // Find the grid container that holds all hero content
  const grid = element.querySelector('.w-layout-grid');

  // There is no background image in this HTML, so the background image row is empty
  const bgImageRow = [''];

  // Compose the content cell for the third row, maintaining source order and semantic meaning
  const content = [];

  // Subtitle/author (optional)
  const subtitle = grid.querySelector('.paragraph-xl');
  if (subtitle) content.push(subtitle);

  // Tags (optional)
  const tags = grid.querySelector('.flex-vertical');
  if (tags) content.push(tags);

  // Title (main heading)
  const title = grid.querySelector('h2');
  if (title) content.push(title);

  // Paragraph(s) (rich text)
  const richText = grid.querySelector('.rich-text');
  if (richText) content.push(richText);

  // Build rows for the table
  const rows = [
    headerRow,
    bgImageRow,
    [content]
  ];

  // Create block table and replace original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
