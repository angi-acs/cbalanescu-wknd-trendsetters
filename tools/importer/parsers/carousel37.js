/* global WebImporter */
export default function parse(element, { document }) {
  // According to the example, the header row should be a single cell,
  // then each data row should be a 2-column row (image | text)

  const headerRow = ['Carousel (carousel37)'];

  // Get image grid: the first .w-layout-grid with images
  let imageGrid = null;
  const grids = Array.from(element.querySelectorAll('.w-layout-grid'));
  for (let grid of grids) {
    if (grid.querySelector('img')) {
      imageGrid = grid;
      break;
    }
  }
  let images = imageGrid ? Array.from(imageGrid.querySelectorAll('img')) : Array.from(element.querySelectorAll('img'));

  // Get all text (title, description, buttons)
  let titleElem = element.querySelector('.h1-heading, h1, h2, h3, h4, h5, h6');
  let descElem = element.querySelector('.subheading, p');
  let buttonGroup = element.querySelector('.button-group');
  let textCell = [];
  if (titleElem) textCell.push(titleElem);
  if (descElem && descElem !== titleElem) textCell.push(descElem);
  if (buttonGroup) textCell.push(buttonGroup);

  // Compose the rows
  const rows = [];
  rows.push(headerRow); // header row: single cell only
  images.forEach((img, idx) => {
    if (idx === 0) {
      rows.push([img, textCell]); // first slide: image and text
    } else {
      rows.push([img, '']); // other slides: image only, empty cell
    }
  });

  // The table structure: header row must be a single cell; data rows must be two columns
  // WebImporter.DOMUtils.createTable will handle colspan for the header row

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
