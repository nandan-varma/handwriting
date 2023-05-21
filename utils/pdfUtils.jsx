import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

const generatePDF = async (text) => {
  const fontUrls = ['/fonts/QEDavidReid.ttf', '/fonts/QEVickyCaulfield.ttf', '/fonts/QETonyFlores.ttf', '/fonts/QEHerbertCooper.ttf', '/fonts/QEJeffDungan.ttf','/fonts/QEVRead.ttf'];
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);
  const fonts = await Promise.all(fontUrls.map(url => fetch(url).then(response => response.arrayBuffer())));
  const embeddedFonts = await Promise.all(fonts.map(font => pdfDoc.embedFont(font)));


  const fontSize = 24;
  const fontColor = rgb(0, 0, 0);
  const lineHeight = fontSize * 1.2;
  const pageMargin = 50;

  let currentPage = pdfDoc.addPage();
  let currentY = currentPage.getHeight() - pageMargin;
  let currentX = pageMargin;
  let fontIndex = 0;

  const words = text.split(/\s+/);

  for (const word of words) {
    const font = embeddedFonts[fontIndex];
    const wordWidth = font.widthOfTextAtSize(word, fontSize);

    // Check if word exceeds the available width on the current line
    if (currentX + wordWidth > currentPage.getWidth() - pageMargin) {
      currentY -= lineHeight;
      currentX = pageMargin;

      // Check if we need to move to the next page
      if (currentY < pageMargin) {
        currentPage = pdfDoc.addPage();
        currentY = currentPage.getHeight() - pageMargin;
      }
    }

    // Handle next line character
    if (word === '\n') {
      currentY -= lineHeight;

      // Check if we need to move to the next page
      if (currentY < pageMargin) {
        currentPage = pdfDoc.addPage();
        currentY = currentPage.getHeight() - pageMargin;
      }

      continue;
    }

    for (const char of word) {
      const charWidth = font.widthOfTextAtSize(char, fontSize);

      // Check if character exceeds the available width on the current line
      if (currentX + charWidth > currentPage.getWidth() - pageMargin) {
        currentY -= lineHeight;
        currentX = pageMargin;

        // Check if we need to move to the next page
        if (currentY < pageMargin) {
          currentPage = pdfDoc.addPage();
          currentY = currentPage.getHeight() - pageMargin;
        }
      }

      currentPage.drawText(char, {
        x: currentX,
        y: currentY,
        size: fontSize,
        font,
        color: fontColor,
      });

      currentX += charWidth;
    }

    currentX += font.widthOfTextAtSize(' ', fontSize);
    fontIndex = (fontIndex + 1) % embeddedFonts.length;
  }

  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
};


export { generatePDF };