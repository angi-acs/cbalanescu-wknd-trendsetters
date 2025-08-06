/* global WebImporter */
export default function parse(element, { document }) {
  // Table header per the block name in the prompt
  const headerRow = ['Cards (cards33)'];

  // Each immediate child div is a card container
  const cardDivs = element.querySelectorAll(':scope > div');
  const rows = [];

  cardDivs.forEach(cardDiv => {
    // The image is the sole child (with class cover-image), for each card
    const img = cardDiv.querySelector('img');
    let textContent = '';
    // Try to extract any text content that might be present with the image
    // If the cardDiv contains more than just the image, use its text content
    // (for future-proofing and to handle variants)
    // Remove img from cloned div if present, so text only is included
    const clonedDiv = cardDiv.cloneNode(true);
    const imgInClone = clonedDiv.querySelector('img');
    if (imgInClone) imgInClone.remove();
    textContent = clonedDiv.textContent.trim();

    let textCell;
    if (textContent) {
      // Wrap in a <div> for the table cell
      textCell = document.createElement('div');
      textCell.textContent = textContent;
    } else {
      // No text found, leave cell empty
      textCell = document.createElement('div');
    }
    rows.push([img, textCell]);
  });

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
