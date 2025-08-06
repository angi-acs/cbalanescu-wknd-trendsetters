/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row (must match exactly)
  const headerRow = ['Carousel (carousel26)'];

  // Find the innermost card-body containing all relevant content
  const cardBody = element.querySelector('.card-body');
  if (!cardBody) return;

  // Required: image (first cell)
  const img = cardBody.querySelector('img');

  // Optional: text content (second cell)
  let textContent = [];
  const heading = cardBody.querySelector('.h4-heading');
  if (heading) {
    // Use original element for semantic meaning
    textContent.push(heading);
  }
  // No description or CTA/link in this HTML
  if (textContent.length === 0) {
    textContent = [''];
  }

  // Structure: header row, then each slide row
  const cells = [
    headerRow,
    [img, textContent]
  ];

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
