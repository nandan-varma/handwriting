import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

const generatePDF = async (text: string, fontsize: number, lineheight: number, margin: number) => {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);
  const fontUrls = ['/fonts/QEDavidReid.ttf', '/fonts/QEVickyCaulfield.ttf', '/fonts/QETonyFlores.ttf', '/fonts/QEHerbertCooper.ttf', '/fonts/QEVRead.ttf'];
  const fonts = await Promise.all(fontUrls.map(url => fetch(url).then(response => response.arrayBuffer())));
  const embeddedFonts = await Promise.all(fonts.map(font => pdfDoc.embedFont(font)));


  const fontSize = fontsize;
  const fontColor = rgb(0, 0, 0);
  const lineHeight = lineheight;
  const pageMargin = margin;

  let currentPage = pdfDoc.addPage();
  let currentY = currentPage.getHeight() - pageMargin;
  let currentX = pageMargin;
  const paragraphs = text.split('\n');

  for (const paragraph of paragraphs) {
    const words = paragraph.split(/\s+/);
    let fontIndex = 0;

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

      currentPage.drawText(word, {
        x: currentX,
        y: currentY,
        size: fontSize,
        font,
        color: fontColor,
      });

      currentX += wordWidth + font.widthOfTextAtSize(' ', fontSize);
      fontIndex = (fontIndex + 1) % embeddedFonts.length;
    }
    currentY -= lineHeight;
    currentX = pageMargin;
  }

  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
};
export { generatePDF };