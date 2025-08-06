/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the table
  const cells = [
    ['Cards (cards11)']
  ];

  // Find all card links in the grid
  const cardLinks = element.querySelectorAll(':scope > a.card-link');
  cardLinks.forEach((card) => {
    // Get image element (mandatory, always first in card)
    let img = null;
    const imgContainer = card.querySelector('.utility-aspect-3x2');
    if (imgContainer) {
      img = imgContainer.querySelector('img');
    }

    // Gather all text content for card
    const textElements = [];
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    if (textContainer) {
      // Tag(s) (optional)
      const tagGroup = textContainer.querySelector('.tag-group');
      if (tagGroup) {
        tagGroup.querySelectorAll('.tag').forEach((tag) => {
          textElements.push(tag);
        });
      }
      // Heading (usually h3)
      const heading = textContainer.querySelector('h3, .h4-heading');
      if (heading) {
        textElements.push(heading);
      }
      // Paragraph description (optional)
      const desc = textContainer.querySelector('p');
      if (desc) {
        textElements.push(desc);
      }
    }

    // Construct row: image in first cell, text content in second
    cells.push([
      img || '',
      textElements.length > 0 ? textElements : ''
    ]);
  });

  // Create and replace block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
