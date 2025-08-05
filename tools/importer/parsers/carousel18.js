/* global WebImporter */
export default function parse(element, { document }) {
  // Find the image grid containing all slides
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const slides = Array.from(grid.children).filter(child => child.querySelector('img'));

  // Build the block table's rows
  const rows = [
    ['Carousel (carousel18)']
  ];

  slides.forEach(slide => {
    // Find the <img> for the slide (mandatory)
    const aspect = slide.querySelector('.utility-aspect-2x3');
    if (!aspect) return;
    const img = aspect.querySelector('img');
    if (!img) return;
    // Reference the img node directly
    rows.push([img, '']); // Second cell empty, as there's no text content in the provided HTML
  });

  // Create block table and replace the original block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
