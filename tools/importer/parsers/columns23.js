/* global WebImporter */
export default function parse(element, { document }) {
  // Find the image grid and collect all images
  const grid = element.querySelector('.grid-layout.desktop-3-column');
  const imgDivs = grid ? Array.from(grid.children) : [];
  const images = imgDivs.map(div => div.querySelector('img')).filter(Boolean);

  // Get the overlay content (heading, paragraph, buttons)
  let content = null;
  const contentCol = element.querySelector('.ix-hero-scale-3x-to-1x-content');
  if (contentCol) {
    content = contentCol.querySelector('.container');
  }

  // Place all images in one container for the first column
  const imagesContainer = document.createElement('div');
  images.forEach(img => imagesContainer.appendChild(img));

  // Correct header row: two columns to match the content row
  const headerRow = ['Columns (columns23)', ''];
  const row = [imagesContainer, content];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row
  ], document);

  element.replaceWith(table);
}
