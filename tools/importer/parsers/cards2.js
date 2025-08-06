/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Cards (cards2)'];
  
  // Get all direct card links
  const cardLinks = Array.from(element.querySelectorAll(':scope > a.utility-link-content-block'));

  const rows = cardLinks.map((card) => {
    // First cell: the image (reference)
    const img = card.querySelector('img');

    // Second cell: text content including tag, date, and heading
    // We'll group them in a single div for proper structure
    const cellDiv = document.createElement('div');

    // Tag/date row (may have both or just one)
    const meta = card.querySelector('.flex-horizontal');
    if (meta) {
      // Reference the existing element directly
      cellDiv.appendChild(meta);
    }

    // Heading (title)
    const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) {
      cellDiv.appendChild(heading);
    }

    return [img, cellDiv];
  });

  // Compose the table rows
  const tableRows = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
