/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing slides
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Each child div is a slide
  const slideDivs = Array.from(grid.children);
  // Build rows - always two columns: [image, text cell]
  const rows = slideDivs.map(div => {
    // Get image (required for this block)
    const img = div.querySelector('img');
    // No image? Skip this slide
    if (!img) return null;
    // No extra text content in provided HTML; second cell is empty string
    return [img, ''];
  }).filter(Boolean);
  // Block header row is a single cell
  const cells = [
    ['Carousel (carousel18)'],
    ...rows
  ];
  // Create the table and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
