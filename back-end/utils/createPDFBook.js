import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import axios from "axios";
import fs from "fs";
import path from 'path';
import { getDirectoryName } from "./getDirectoryName.js";

const maxWidth = 500; // Maximum width for the description text
const fontSize = 12; // Font size for the description text

export const createPDFBook = async(imageInfo) => {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const title = pdfDoc.addPage();
  const { width: pageWidth, height: pageHeight } = title.getSize();

  const titleText = imageInfo.title;
  const titleFontSize = 35;
  const titleWidth = font.widthOfTextAtSize(titleText, titleFontSize);

  const titleX = (pageWidth - titleWidth) / 2;
  const titleY = pageHeight - 100;

  title.drawText(titleText, {
    x: titleX,
    y: titleY,
    font,
    size: titleFontSize,
    color: rgb(0.9059, 0.3451, 0),
  });

  const summaryLines = splitTextIntoLines(
    imageInfo.summary,
    font,
    fontSize,
    maxWidth
  );
  title.drawText(`${summaryLines}`, {
    x: 50,
    y: 700,
    font,
    size: fontSize,
    color: rgb(0, 0, 0),
  });

  const paragraphs = imageInfo.paragraphs;
  for (let i = 0; i < paragraphs.length; i++) {
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    const data = paragraphs[i];

    page.drawText(data.paragraphTitle, {
      x: 50,
      y: height - 50,
      font,
      size: 30,
      color: rgb(0.933, 0.51, 0.933),
    });

    const response = await axios.get(data.imgUrl, {
      responseType: "arraybuffer",
      headers: {
        Accept: "image/png, image/jpeg",
      },
    });
    const imageBuffer = Buffer.from(response.data, "binary");

    let image = await pdfDoc.embedPng(imageBuffer);
    const imageDims = image.scale(500 / Math.max(image.width, image.height));

    const imageX = (width - imageDims.width) / 2;
    const imageY = (height - imageDims.height) / 2;
    page.drawImage(image, {
      x: imageX,
      y: height - imageDims.height - 70,
      width: imageDims.width,
      height: imageDims.height,
    });

    const description = data.paragraph;
    const descriptionLines = splitTextIntoLines(
      description,
      font,
      fontSize,
      maxWidth
    );
    const descriptionHeight = font.heightAtSize(fontSize) + 5;
    const descriptionX = (width - maxWidth) / 2;
    const descriptionY = height - imageDims.height - 100;

    page.drawText(descriptionLines, {
      x: descriptionX,
      y: descriptionY,
      font,
      size: fontSize,
      color: rgb(0, 0, 0),
    });
  }

  const pdfBytes = await pdfDoc.save();
  const filePath = `../public/output${Date.now()}.pdf`;

  fs.writeFileSync(path.join(getDirectoryName(import.meta.url), filePath), pdfBytes);

  const substringStartIndex = filePath.indexOf('public') + 'public'.length;
    const extractedString = filePath.substring(substringStartIndex);
  return extractedString;
}


function splitTextIntoLines(text, font, fontSize, maxWidth) {
  let currentLine = "";
  const words = text.split(" ");

  let newLines = "";

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const width = font.widthOfTextAtSize(word, fontSize);
    const currentLineWidth = font.widthOfTextAtSize(currentLine, fontSize);

    if (currentLineWidth + width < maxWidth) {
      currentLine += (currentLine === "" ? "" : " ") + word;
    } else {
      newLines += currentLine + "\n";
      currentLine = word;
    }
  }

  newLines += currentLine;

  return newLines;
}

//createPDF(imageInfo).catch(console.error);

export default createPDFBook;
