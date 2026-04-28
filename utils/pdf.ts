"use client";

function hashSeed(seed: string): number {
  let hash = 2166136261;

  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0 || 1;
}

function createSeededRandom(seed: string): () => number {
  let state = hashSeed(seed);

  return () => {
    state += 0x6d2b79f5;

    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);

    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { r: 0, g: 0, b: 0 };
  const r = result[1];
  const g = result[2];
  const b = result[3];
  if (!r || !g || !b) return { r: 0, g: 0, b: 0 };
  return {
    r: Number.parseInt(r, 16),
    g: Number.parseInt(g, 16),
    b: Number.parseInt(b, 16),
  };
}

const isLatinLike = (char: string): boolean =>
  /^[a-zA-Z0-9()[\]\-_?!:;.,'" |?-]+$/.test(char);

const generatePDF = async (
  text: string,
  fontsize: number,
  lineheight: number,
  margin: number,
  lettergap: number,
  color: string,
  seed: string,
): Promise<Uint8Array> => {
  const { PDFDocument, rgb } = await import("pdf-lib");
  const fontkit = (await import("@pdf-lib/fontkit")).default;

  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);
  const fontUrls = [
    "/fonts/QEDavidReid.ttf",
    "/fonts/QEVickyCaulfield.ttf",
    "/fonts/QETonyFlores.ttf",
    "/fonts/QEHerbertCooper.ttf",
    "/fonts/QEVRead.ttf",
  ];
  const embeddedFonts = await Promise.all(
    fontUrls.map((url) =>
      fetch(url)
        .then((response) => response.arrayBuffer())
        .then((fontData) => pdfDoc.embedFont(fontData)),
    ),
  );
  const fontUrl = "/fonts/Ubuntu-R.ttf";
  const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer());
  const defaultFont = await pdfDoc.embedFont(fontBytes);

  const fontSize = fontsize;
  const { r: rVal, g: gVal, b: bVal } = hexToRgb(color);
  const fontColor = rgb(rVal / 255, gVal / 255, bVal / 255);
  const lineHeight = lineheight;
  const pageMargin = margin;
  const gap = lettergap * 0.1;
  const lineVariance = 0.003;
  const random = createSeededRandom(seed);

  const getFont = (index: number) => {
    const f = embeddedFonts[index];
    return f !== undefined
      ? f
      : embeddedFonts[0] !== undefined
        ? embeddedFonts[0]
        : defaultFont;
  };

  let currentPage = pdfDoc.addPage();
  let currentY = currentPage.getHeight() - pageMargin;
  let currentX = pageMargin;
  const paragraphs = text.split("\n");

  for (const paragraph of paragraphs) {
    const words = paragraph.split(/\s+/);
    let fontIndex = Math.floor(random() * embeddedFonts.length);

    for (const word of words) {
      let wordWidth = 0;
      for (const letter of word) {
        const font = isLatinLike(letter) ? getFont(fontIndex) : defaultFont;
        wordWidth += font.widthOfTextAtSize(letter, fontSize) + gap;
      }

      if (currentX + wordWidth > currentPage.getWidth() - pageMargin) {
        currentY -= lineHeight;
        currentX = pageMargin;

        if (currentY < pageMargin + fontSize + lineHeight) {
          currentPage = pdfDoc.addPage();
          currentY = currentPage.getHeight() - pageMargin;
        }
      }

      for (const letter of word) {
        const isLatin = isLatinLike(letter);
        const font = isLatin ? getFont(fontIndex) : defaultFont;
        const letterWidth = isLatin
          ? font.widthOfTextAtSize(letter, fontSize) + gap
          : defaultFont.widthOfTextAtSize("  ", fontSize) + gap;

        currentPage.drawText(letter, {
          x: currentX,
          y: currentY * (1 + lineVariance * random()),
          size: fontSize,
          font,
          color: fontColor,
        });

        currentX += letterWidth;

        fontIndex = Math.floor(random() * embeddedFonts.length);
      }
      currentX += defaultFont.widthOfTextAtSize("  ", fontSize) + gap;
    }
    currentY -= lineHeight;
    currentX = pageMargin;
  }

  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
};
export { generatePDF };
