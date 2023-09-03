import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

const generatePDF = async (text: string, fontsize: number, lineheight: number, margin: number) => {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);
  const fontUrls = ['/fonts/QEDavidReid.ttf', '/fonts/QEVickyCaulfield.ttf', '/fonts/QETonyFlores.ttf', '/fonts/QEHerbertCooper.ttf', '/fonts/QEVRead.ttf'];
  const fonts = await Promise.all(fontUrls.map(url => fetch(url).then(response => response.arrayBuffer())));
  const embeddedFonts = await Promise.all(fonts.map(font => pdfDoc.embedFont(font)));
  const url = 'https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf'
  const fontBytes = await fetch(url).then((res) => res.arrayBuffer())
  const defaultFont = await pdfDoc.embedFont(fontBytes)

  const fontSize = fontsize;
  const fontColor = rgb(0, 0, 0.3);
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
      let wordWidth = 0;
      for (const letter of word) {
        let font;
        if (/^[a-zA-Z0-9()\[\]{}\-_:;.,•'/̄ |–]+$/.test(letter)) {
          font = embeddedFonts[fontIndex];
          wordWidth += font.widthOfTextAtSize(letter, fontSize);
        } else {
          console.log(letter);
          font = defaultFont;
          wordWidth += font.widthOfTextAtSize("  ", fontSize);
        }
      }

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

      for (const letter of word) {
        let font;
        let letterWidth;
        if (/^[a-zA-Z0-9()\[\]{}\-_:;.,•'/̄ |–]+$/.test(letter)) {
          font = embeddedFonts[fontIndex];
          letterWidth = font.widthOfTextAtSize(letter, fontSize);
        } else {
          font = defaultFont;
          letterWidth = font.widthOfTextAtSize("  ", fontSize);
        }

        currentPage.drawText(letter, {
          x: currentX,
          y: currentY,
          size: fontSize,
          font,
          color: fontColor,
        });

        currentX += letterWidth;

        fontIndex = Math.floor(Math.random() * embeddedFonts.length);
      }
      currentX += defaultFont.widthOfTextAtSize('  ', fontSize);
    }
    currentY -= lineHeight;
    currentX = pageMargin;
  }

  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
};
export { generatePDF };
