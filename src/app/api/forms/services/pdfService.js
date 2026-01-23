import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import fs from "fs";
import path from "path";

/**
 * Generates the Executed Agreement PDF
 * @param {Object} formData - The form data including signature
 * @returns {Promise<string>} - The base64 PDF string
 */
export const generateExecutedAgreement = async (formData) => {
  try {
    // 1. SETUP PATHS
    const publicDir = path.join(process.cwd(), "public");
    const pdfPath = path.join(
      publicDir,
      "upload",
      "SecureCash_Terms_Dynamic.pdf",
    );

    const fontBase = path.join(publicDir, "fonts", "montserrat");
    const regularFontPath = path.join(fontBase, "Montserrat-Regular.ttf");
    const boldFontPath = path.join(fontBase, "Montserrat-Bold.ttf");
    const lightFontPath = path.join(fontBase, "Montserrat-Light.ttf");

    if (!fs.existsSync(pdfPath)) {
      throw new Error(`PDF Template not found at: ${pdfPath}`);
    }

    const pdfBuffer = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    pdfDoc.registerFontkit(fontkit);

    // 2. EMBED FONTS
    let regularFont, boldFont, lightFont;
    try {
      regularFont = await pdfDoc.embedFont(fs.readFileSync(regularFontPath));
      boldFont = await pdfDoc.embedFont(fs.readFileSync(boldFontPath));
      if (fs.existsSync(lightFontPath)) {
        lightFont = await pdfDoc.embedFont(fs.readFileSync(lightFontPath));
      } else {
        lightFont = regularFont;
      }
    } catch (e) {
      console.warn("Custom fonts missing, falling back to Helvetica");
      const { StandardFonts } = await import("pdf-lib");
      regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      lightFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    }

    // =========================================================
    // HELPER: Form Row Drawer
    // =========================================================
    const drawFormRow = (page, { label, value, x, y, width = 200 }) => {
      const fontSize = 12;

      // 1. Label (BOLD)
      page.drawText(label, {
        x,
        y,
        size: fontSize,
        font: boldFont,
        color: rgb(0, 0, 0),
      });

      // Calculate start of line
      const labelWidth = boldFont.widthOfTextAtSize(label, fontSize);
      const lineStartX = x + labelWidth + 5;
      const lineWidth = width - labelWidth - 5;

      // 2. Value (REGULAR)
      if (value) {
        page.drawText(value, {
          x: lineStartX + 5,
          y: y + 2,
          size: fontSize,
          font: regularFont,
          color: rgb(0, 0, 0),
        });
      }

      // 3. Line
      page.drawLine({
        start: { x: lineStartX, y: y - 2 },
        end: { x: lineStartX + lineWidth, y: y - 2 },
        thickness: 0.5,
        color: rgb(0, 0, 0),
      });
    };

    // ==========================================
    // STEP 1: PAGE 2 - DYNAMIC PARAGRAPH
    // ==========================================
    const page2 = pdfDoc.getPages()[1];
    const dynamicText = `${formData["Full Name"]} (${formData["Organisation Role"]}) of ${formData["Organisation Name"]} ABN ${formData["Organisation ABN"]} (hereinafter referred to as "the Customer", together with the Principal and the Customer are referred to as "the Parties")`;

    page2.drawText(dynamicText, {
      x: 38,
      y: 505,
      size: 12,
      font: regularFont,
      color: rgb(0, 0, 0),
      maxWidth: 500,
      lineHeight: 16,
    });

    // ==========================================
    // STEP 2: PAGE 11 - EXECUTION FORM
    // ==========================================
    const page11 = pdfDoc.getPages()[10];

    const startY = 580;
    const col1X = 38;
    const col2X = 320;
    const rowHeight = 50;

    // -- ROW 1 --
    drawFormRow(page11, {
      label: "Name:",
      value: formData["Full Name"],
      x: col1X,
      y: startY,
      width: 250,
    });
    drawFormRow(page11, {
      label: "Position:",
      value: formData["Organisation Role"],
      x: col2X,
      y: startY,
      width: 220,
    });

    // -- ROW 2 --
    drawFormRow(page11, {
      label: "Email:",
      value: formData["Email"],
      x: col1X,
      y: startY - rowHeight,
      width: 250,
    });
    drawFormRow(page11, {
      label: "DOB:",
      value: formData["Birthday"],
      x: col2X,
      y: startY - rowHeight,
      width: 150,
    });

    // -- ROW 3 --
    drawFormRow(page11, {
      label: "Company:",
      value: formData["Organisation Name"],
      x: col1X,
      y: startY - rowHeight * 2,
      width: 250,
    });
    drawFormRow(page11, {
      label: "ABN:",
      value: formData["Organisation ABN"],
      x: col2X,
      y: startY - rowHeight * 2,
      width: 220,
    });

    // -- ROW 4 (Signature Area) --
    const sigY = startY - rowHeight * 4;

    page11.drawText("Signature:", {
      x: col1X,
      y: sigY,
      size: 12,
      font: boldFont,
    });
    page11.drawLine({
      start: { x: col1X + 70, y: sigY - 2 },
      end: { x: col1X + 250, y: sigY - 2 },
      thickness: 0.5,
    });

    // *** SIGNATURE PROCESSING ***
    if (formData.Signature) {
      try {
        // Strip data URI prefix if present
        const sigData = formData.Signature.includes(",")
          ? formData.Signature.split(",")[1]
          : formData.Signature;

        const sigImage = await pdfDoc.embedPng(sigData);

        // Define max dimensions for signature area
        const maxWidth = 160;
        const maxHeight = 60;

        // Calculate aspect-preserving scale
        const widthScale = maxWidth / sigImage.width;
        const heightScale = maxHeight / sigImage.height;
        const finalScale = Math.min(widthScale, heightScale);

        const sigWidth = sigImage.width * finalScale;
        const sigHeight = sigImage.height * finalScale;

        page11.drawImage(sigImage, {
          x: col1X + 75,
          y: sigY - sigHeight + 60,
          width: sigWidth,
          height: sigHeight,
        });
      } catch (err) {
        console.error("Failed to embed signature:", err);
        page11.drawText("/s/ Digital Signature (Error)", {
          x: col1X + 75,
          y: sigY + 2,
          size: 10,
          font: regularFont,
          color: rgb(0.4, 0.4, 0.4),
        });
      }
    } else {
      page11.drawText("/s/ Digital Signature", {
        x: col1X + 75,
        y: sigY + 2,
        size: 10,
        font: regularFont,
        color: rgb(0.4, 0.4, 0.4),
      });
    }

    // ✅ UPDATED: Date & Time - Simple parsing
    const dateTimeStr = formData["Date of Acceptance"] || "";
    const parts = dateTimeStr.split(",");
    const dateValue = parts[0]?.trim() || ""; // "23/01/2026"
    const timeValue = parts[1]?.trim() || ""; // "8:26:36 AM"

    drawFormRow(page11, {
      label: "Date:",
      value: dateValue,
      x: col2X,
      y: sigY,
      width: 100,
    });

    drawFormRow(page11, {
      label: "Time:",
      value: timeValue,
      x: col2X + 110,
      y: sigY,
      width: 110,
    });

    // 6. SAVE
    return await pdfDoc.saveAsBase64();
  } catch (error) {
    console.error("PDF Generation Error:", error);
    return null; // Return null on failure so email service can handle it
  }
};
