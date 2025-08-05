/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches exactly the block name in the example
  const headerRow = ['Carousel (carousel26)'];
  
  // Find the card-body div that contains the slide content
  const cardBody = element.querySelector('.card-body');
  let img = null;
  let textContent = null;
  
  if (cardBody) {
    img = cardBody.querySelector('img');
    // Find the heading (h4-heading) if available
    textContent = cardBody.querySelector('.h4-heading');
  }
  // Fallbacks if structure is different
  if (!img) {
    img = element.querySelector('img');
  }
  if (!textContent) {
    textContent = element.querySelector('.h4-heading, h1, h2, h3, h4, h5, h6');
  }
  // Only include image if it exists
  const slideRow = [img ? img : '', textContent ? textContent : ''];

  const cells = [
    headerRow,
    slideRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}