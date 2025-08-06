/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid (the two columns: text and images)
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;
  // Figure out which child is the text and which is the image list
  const children = Array.from(grid.children);
  let textCol = null;
  let imgCol = null;
  children.forEach((child) => {
    if (child.querySelector('img')) {
      imgCol = child;
    } else {
      textCol = child;
    }
  });
  // Extract images from the image column
  let images = [];
  if (imgCol) {
    // There could be another inner grid for images
    const imgGrid = imgCol.querySelector('.grid-layout');
    if (imgGrid) {
      images = Array.from(imgGrid.querySelectorAll('img'));
    } else {
      images = Array.from(imgCol.querySelectorAll('img'));
    }
  }
  // Extract content for the first slide
  let heading = null;
  let description = null;
  let buttons = null;
  if (textCol) {
    heading = textCol.querySelector('h1, h2, h3, h4, h5, h6');
    // Find first <p> after heading
    if (heading) {
      let sibling = heading.nextElementSibling;
      while (sibling) {
        if (sibling.tagName.toLowerCase() === 'p') {
          description = sibling;
          break;
        }
        sibling = sibling.nextElementSibling;
      }
    } else {
      description = textCol.querySelector('p');
    }
    // Get button group
    buttons = textCol.querySelector('.button-group');
  }
  // Compose table rows
  const rows = [];
  rows.push(['Carousel (carousel37)']);
  images.forEach((img, idx) => {
    if (idx === 0) {
      const cellContent = [];
      if (heading) cellContent.push(heading);
      if (description) cellContent.push(description);
      if (buttons) cellContent.push(buttons);
      rows.push([img, cellContent]);
    } else {
      rows.push([img, '']);
    }
  });
  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
