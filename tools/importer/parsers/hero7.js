/* global WebImporter */
export default function parse(element, { document }) {
  // Find all immediate children (should be image containers)
  const children = Array.from(element.querySelectorAll(':scope > div'));
  
  // Find the first <img> within any of the children to use as background image, as per the visual structure
  let bgImg = null;
  for (const child of children) {
    const img = child.querySelector('img');
    if (img) {
      bgImg = img;
      break;
    }
  }

  // Compose block table rows
  const headerRow = ['Hero (hero7)'];
  const bgRow = [bgImg ? bgImg : ''];
  // No heading, subheading, or cta in provided HTML, so blank content cell
  const contentRow = [''];

  const cells = [headerRow, bgRow, contentRow];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
