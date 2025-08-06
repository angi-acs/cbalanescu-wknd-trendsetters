/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in the spec
  const header = ['Columns (columns23)'];

  // Find the main grid containing the two columns (images & text)
  const grid = element.querySelector('.grid-layout.desktop-1-column') || element;
  // Find the content/image areas (should be two main grid children)
  const columns = Array.from(grid.children).filter(el => el.tagName !== 'DIV' || el.childElementCount > 0);

  // The first column with the collage of images
  let imagesCell = null;
  const imageCol = columns.find(col => col.querySelector('.grid-layout.desktop-3-column'));
  if (imageCol) {
    const imagesGrid = imageCol.querySelector('.grid-layout.desktop-3-column');
    // Compose a fragment of all the images in order
    const frag = document.createElement('div');
    Array.from(imagesGrid.querySelectorAll('img')).forEach(img => frag.appendChild(img));
    imagesCell = frag;
  } else {
    imagesCell = document.createElement('div'); // empty fallback
  }

  // The second column with the heading, subheading, and buttons
  let contentCell = null;
  const contentCol = columns.find(col => col.querySelector('.container'));
  if (contentCol) {
    const content = contentCol.querySelector('.container');
    contentCell = content;
  } else {
    contentCell = document.createElement('div'); // empty fallback
  }

  const row = [imagesCell, contentCell];
  const cells = [header, row];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
