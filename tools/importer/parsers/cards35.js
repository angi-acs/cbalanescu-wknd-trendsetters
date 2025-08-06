/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as given in the example
  const rows = [['Cards (cards35)']];

  // Each card is an anchor directly inside the grid
  const cards = element.querySelectorAll(':scope > a');
  cards.forEach((card) => {
    // Find the image: always the first img inside this card
    const img = card.querySelector('img');
    
    // The text content is inside the second-level div inside the card anchor
    // Find the div whose children include the card content (excluding img)
    let textDiv = null;
    const gridDiv = card.querySelector('div');
    if (gridDiv) {
      // There will be two children: img and the actual text container
      const children = Array.from(gridDiv.children);
      textDiv = children.find(child => child !== img);
    }

    const textParts = [];
    if (textDiv) {
      // Optional meta (tag and read time)
      const meta = textDiv.querySelector('.flex-horizontal');
      if (meta) textParts.push(meta);
      // Heading
      const heading = textDiv.querySelector('h3, .h4-heading');
      if (heading) textParts.push(heading);
      // Description
      const desc = textDiv.querySelector('p');
      if (desc) textParts.push(desc);
      // CTA - usually the last div whose text is 'Read'
      const cta = Array.from(textDiv.children).find(
        el =>
          el.tagName === 'DIV' &&
          el.textContent &&
          el.textContent.trim().toLowerCase() === 'read'
      );
      if (cta) textParts.push(cta);
    }

    // Add this card's row
    rows.push([
      img,
      textParts
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
