/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout which contains the image and content
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children: image and content
  const gridChildren = Array.from(grid.children);
  // Find the image element
  const imageEl = gridChildren.find(child => child.tagName === 'IMG');
  // Find the content container (should contain h1)
  const contentEl = gridChildren.find(child => child.querySelector('h1'));

  // Prepare content parts for the 3rd row
  const contentParts = [];
  if (contentEl) {
    // Grab the h1
    const h1 = contentEl.querySelector('h1');
    if (h1) contentParts.push(h1);
    // Grab the subheading
    const subheading = contentEl.querySelector('p.subheading');
    if (subheading) contentParts.push(subheading);
    // Grab buttons in a button group
    const buttonGroup = contentEl.querySelector('.button-group');
    if (buttonGroup) {
      const buttons = Array.from(buttonGroup.querySelectorAll('a'));
      if (buttons.length) contentParts.push(...buttons);
    }
  }

  // Build the table rows as per spec
  const cells = [
    ['Hero (hero15)'],
    [imageEl ? imageEl : ''],
    [contentParts.length ? contentParts : '']
  ];

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
