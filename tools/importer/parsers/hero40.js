/* global WebImporter */
export default function parse(element, { document }) {
  // Create the block header row according to the spec
  const headerRow = ['Hero (hero40)'];

  // Extract the background image (should be the prominent cover image)
  let bgImg = element.querySelector('img.cover-image, img');
  // If no background image, be robust: use null, which will render as an empty cell
  const bgRow = [bgImg ? bgImg : ''];

  // Find the content container with h1, p, and CTA (within the main grid)
  // Get all direct children divs from the main .w-layout-grid
  let contentDiv = null;
  const mainGrid = element.querySelector('.w-layout-grid');
  if (mainGrid) {
    const gridDivs = mainGrid.querySelectorAll(':scope > div');
    for (const div of gridDivs) {
      if (div.querySelector('h1')) {
        contentDiv = div;
        break;
      }
      // fallback: look one level deeper for sections with h1
      const h1 = div.querySelector('h1');
      if (h1) {
        contentDiv = div;
        break;
      }
    }
  }

  // Compose the text content (h1, paragraph, button)
  let textContent = document.createDocumentFragment();
  if (contentDiv) {
    // h1 - main heading
    const h1 = contentDiv.querySelector('h1');
    if (h1) textContent.appendChild(h1);
    // p.paragraph-lg (may be inside nested flex group)
    const p = contentDiv.querySelector('p');
    if (p) textContent.appendChild(p);
    // CTA button(s) - inside .button-group
    const btnGroup = contentDiv.querySelector('.button-group');
    if (btnGroup) {
      Array.from(btnGroup.children).forEach(child => textContent.appendChild(child));
    }
  }
  const textRow = [textContent];

  // Compose the table
  const cells = [headerRow, bgRow, textRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
