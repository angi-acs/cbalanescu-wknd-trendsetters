/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards34)'];
  // Get all immediate children (the cards)
  const cardDivs = element.querySelectorAll(':scope > div');
  const rows = Array.from(cardDivs).map(div => {
    // First cell: the image (if present)
    const img = div.querySelector('img');
    // Second cell: all remaining content except the image
    const cellContents = [];
    // Gather all children except the <img>
    Array.from(div.childNodes).forEach(node => {
      if (node.nodeType === 1 && node !== img) {
        cellContents.push(node);
      } else if (node.nodeType === 3 && node.textContent.trim()) {
        // Text nodes
        const span = document.createElement('span');
        span.textContent = node.textContent;
        cellContents.push(span);
      }
    });
    // If no textual content, use empty string for second cell
    const secondCell = cellContents.length > 0 ? cellContents : '';
    return [img || '', secondCell];
  });
  const tableCells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(block);
}
