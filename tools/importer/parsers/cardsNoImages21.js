/* global WebImporter */
export default function parse(element, { document }) {
  // Create the Cards block table
  const rows = [['Cards']];
  // Each card is an immediate child div
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach(card => {
    // Find the text content in the <p> inside the card
    // The card may also have icons (SVGs), which are not part of the content per spec
    const p = card.querySelector('p');
    if (p) {
      rows.push([p]); // Reference the existing <p> element
    } else {
      // Fallback: If no <p>, use trimmed text of the card
      const txt = card.textContent.trim();
      if (txt) {
        rows.push([document.createTextNode(txt)]);
      }
    }
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
