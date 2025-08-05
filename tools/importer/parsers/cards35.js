/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards35)'];
  // Find each direct card link within the main grid
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  const rows = cards.map(card => {
    // 1st cell: the main image (first img in the card)
    const img = card.querySelector('img');
    // 2nd cell: card text content
    // Find the main content DIV containing everything except the image
    // It's usually the inner div after the img, containing tag, time, heading, p, and cta
    let contentDiv = null;
    // Find the deepest child DIV that contains the card's text content
    // The structure is: a > div.grid > [img, div] or similar
    // We want the div sibling of img inside the inner grid
    const innerGrid = card.querySelector('div.w-layout-grid');
    if (innerGrid) {
      // find all immediate children of innerGrid after the img
      const childDivs = Array.from(innerGrid.children).filter(
        c => c.tagName === 'DIV'
      );
      // It's usually the first DIV
      if (childDivs.length > 0) {
        contentDiv = childDivs[0];
      }
    }
    // Fallback: just take the first div that follows the img
    if (!contentDiv && img) {
      let sib = img.nextElementSibling;
      while (sib) {
        if (sib.tagName === 'DIV') {
          contentDiv = sib;
          break;
        }
        sib = sib.nextElementSibling;
      }
    }
    // Last fallback: if nothing found, put an empty div
    if (!contentDiv) {
      contentDiv = document.createElement('div');
    }
    // Return the row as [img, contentDiv]
    return [img, contentDiv];
  });
  // Create the table: 2 columns, header row as first row, then all cards
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
