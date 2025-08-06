/* global WebImporter */
export default function parse(element, { document }) {
  // Block header
  const headerRow = ['Cards (cards27)'];

  // Get all direct children divs (each a possible card)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Helper to extract the image and text content for each card
  function getCardCells(cardDiv) {
    // Get the image: get only the first image in this cardDiv
    const img = cardDiv.querySelector('img');
    // Find the container with text: utility-padding-all-2rem, or fallback
    let textContainer = cardDiv.querySelector('.utility-padding-all-2rem');
    if (!textContainer) {
      // fallback: a div with h3 or p inside
      textContainer = Array.from(cardDiv.querySelectorAll('div')).find(d => d.querySelector('h3, p'));
    }
    const textElems = [];
    if (textContainer) {
      // Only push h3 if it exists
      const h3 = textContainer.querySelector('h3');
      if (h3) textElems.push(h3);
      // Only push p if it exists
      const p = textContainer.querySelector('p');
      if (p) textElems.push(p);
    }
    // If no text found, check if there is any h3 or p directly in cardDiv (rare fallback)
    if (textElems.length === 0) {
      const h3 = cardDiv.querySelector('h3');
      if (h3) textElems.push(h3);
      const p = cardDiv.querySelector('p');
      if (p) textElems.push(p);
    }
    // If still nothing, leave blank
    const textCell = textElems.length === 1 ? textElems[0] : (textElems.length > 1 ? textElems : '');
    return [img, textCell];
  }

  // Build rows: filter out divs without an image (per block definition)
  const rows = [headerRow];
  cardDivs.forEach(cardDiv => {
    const img = cardDiv.querySelector('img');
    if (img) {
      rows.push(getCardCells(cardDiv));
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
