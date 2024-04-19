'use client'
import { PDFDocument, PDFFont, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
// import fs from 'fs';

function hexToRgb(hex: string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

const generatePDF = async (text: string, fontsize: number, lineheight: number, margin: number, lettergap: number, color: string, user_fonts: string[]) => {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  // server side code : currently not working
  // const fontUrls = ['/fonts/QEDavidReid.ttf', '/fonts/QEVickyCaulfield.ttf', '/fonts/QETonyFlores.ttf', '/fonts/QEHerbertCooper.ttf', '/fonts/QEVRead.ttf', '/fonts/QESamRoberts2.ttf', '/fonts/QECarolineMutiboko.ttf', '/fonts/QEKunjarScript.ttf', '/fonts/QEBradenHill.ttf'];
  // let fontsDir = fs.readdirSync('./public/fonts');
  // let fonts = [];
  // for (let i = 0; i < fontsDir.length; i++) {
  //   fonts.push(fs.readFileSync(`./public/fonts/${fontsDir[i]}`));
  // }
  // const userFonts = await Promise.all(user_fonts.map(url => fetch(url).then(response => response.arrayBuffer())));
  // const embeddedFonts = await Promise.all(fonts.map(font => pdfDoc.embedFont(font)));
  // const fontBytes = fs.readFileSync('./public/fonts/Ubuntu-R.ttf');

  // client side code : working
  const fontUrls = ['/fonts/QEDavidReid.ttf', '/fonts/QEVickyCaulfield.ttf', '/fonts/QETonyFlores.ttf', '/fonts/QEHerbertCooper.ttf', '/fonts/QEVRead.ttf'];
  const embeddedFonts = await Promise.all(fontUrls.map(url => fetch(url)
    .then(response => response.arrayBuffer()).
    then(font => pdfDoc.embedFont(font))));
  const url = '/fonts/Ubuntu-R.ttf'
  const fontBytes = await fetch(url).then((res) => res.arrayBuffer())
  const defaultFont = await pdfDoc.embedFont(fontBytes)

  const fontSize = fontsize;
  const fontColor = rgb(hexToRgb(color).r / 255, hexToRgb(color).g / 255, hexToRgb(color).b / 255);
  const lineHeight = lineheight;
  const pageMargin = margin;
  const gap = lettergap * 0.1;
  const lineVariance = 0.003;

  let currentPage = pdfDoc.addPage();
  let currentY = currentPage.getHeight() - pageMargin;
  let currentX = pageMargin;
  const paragraphs = text.split('\n');

  for (const paragraph of paragraphs) {
    const words = paragraph.split(/\s+/);
    let fontIndex = Math.floor(Math.random() * embeddedFonts.length);

    for (const word of words) {
      let wordWidth = 0;
      for (const letter of word) {
        let font;
        if (/^[a-zA-Z0-9()\[\]{}\-_?!:;.,•'/̄ |–-]+$/.test(letter)) {
          font = embeddedFonts[fontIndex];
          wordWidth += font.widthOfTextAtSize(letter, fontSize) + gap;
        } else {
          // console.log(letter);
          font = defaultFont;
          wordWidth += font.widthOfTextAtSize("  ", fontSize) + gap;
        }
      }

      // Check if word exceeds the available width on the current line
      if (currentX + wordWidth > currentPage.getWidth() - pageMargin) {
        currentY -= lineHeight;
        currentX = pageMargin;

        // Check if we need to move to the next page
        if (currentY < pageMargin + fontSize + lineHeight) {
          currentPage = pdfDoc.addPage();
          currentY = currentPage.getHeight() - pageMargin;
        }
      }

      for (const letter of word) {
        let font;
        let letterWidth;
        if (/^[a-zA-Z0-9()\[\]{}\-_?!:;.,•'/̄ |–]+$/.test(letter)) {
          font = embeddedFonts[fontIndex];
          letterWidth = font.widthOfTextAtSize(letter, fontSize) + gap;
        } else {
          font = defaultFont;
          letterWidth = font.widthOfTextAtSize("  ", fontSize) + gap;
        }

        currentPage.drawText(letter, {
          x: currentX,
          y: currentY * (1 + lineVariance * Math.random()),
          size: fontSize,
          font,
          color: fontColor,
        });

        currentX += letterWidth;

        fontIndex = Math.floor(Math.random() * embeddedFonts.length);
      }
      currentX += defaultFont.widthOfTextAtSize('  ', fontSize) + gap;
    }
    currentY -= lineHeight;
    currentX = pageMargin;
  }

  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
};
export { generatePDF };
