/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid layout (the visual block content)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get direct children: typically image, then right column with h1/p/buttons
  const children = grid.querySelectorAll(':scope > *');
  if (children.length < 2) return;

  const imgEl = children[0].tagName === 'IMG' ? children[0] : null;
  const contentEl = children[1];

  // Defensive: Only add image row if image is present
  const rows = [];
  // Header row
  rows.push(['Hero (hero15)']);
  // Image row (if present)
  rows.push([imgEl]);
  // Content row: keep all relevant text/buttons in a single cell
  if (contentEl) {
    rows.push([contentEl]);
  } else {
    rows.push(['']);
  }

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
