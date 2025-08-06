/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row must match the block name exactly
  const headerRow = ['Hero (hero6)'];

  // 2. Extract the background image (may be optional)
  // The image is .cover-image
  const bgImg = element.querySelector('img.cover-image') || '';

  // 3. Extract the text/card content
  // .card contains h1, p (subheading), .button-group
  const card = element.querySelector('.card');
  const textContent = [];
  if (card) {
    // Heading (h1)
    const h1 = card.querySelector('h1');
    if (h1) textContent.push(h1);
    // Subheading (p)
    const subheading = card.querySelector('p');
    if (subheading) textContent.push(subheading);
    // Call(s) to action
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) {
      // Reference all button links in order
      const btns = Array.from(buttonGroup.querySelectorAll('a'));
      if (btns.length === 1) {
        textContent.push(btns[0]);
      } else if (btns.length > 1) {
        // If multiple buttons, group them in a div to keep inline layout
        const btnDiv = document.createElement('div');
        btns.forEach(btn => btnDiv.appendChild(btn));
        textContent.push(btnDiv);
      }
    }
  }

  // 4. Construct the table: 1 column, 3 rows
  // 1st row: header, 2nd: background image, 3rd: text/CTAs
  const rows = [
    headerRow,
    [bgImg],
    [textContent]
  ];

  // 5. Create and replace
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
