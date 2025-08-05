/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards2)'];
  const rows = [headerRow];

  // Each card is a direct <a> child
  const cards = element.querySelectorAll(':scope > a.utility-link-content-block');
  cards.forEach((card) => {
    // IMAGE (first cell): <img> inside .utility-aspect-2x3
    let img = null;
    const imgWrap = card.querySelector(':scope > .utility-aspect-2x3');
    if (imgWrap) {
      img = imgWrap.querySelector('img');
    }

    // TEXT (second cell): Tag/date, then heading
    const textContent = [];

    // Tag/date row
    const tagRow = card.querySelector(':scope > .flex-horizontal');
    if (tagRow) {
      // Use original tagRow, but remove class for clean import
      tagRow.removeAttribute('class');
      textContent.push(tagRow);
    }

    // Heading
    const heading = card.querySelector(':scope > h3, :scope > .h4-heading');
    if (heading) {
      textContent.push(heading);
    }

    // Create row for this card: [img, text cell]
    rows.push([
      img,
      textContent.length === 1 ? textContent[0] : textContent
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
