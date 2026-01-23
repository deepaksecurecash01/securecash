import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), "public");
    const pdfPath = path.join(publicDir, "upload", "updated.pdf");

    // 1. FONT PATHS
    const fontBase = path.join(publicDir, "fonts", "montserrat");
    const regularFontPath = path.join(fontBase, "Montserrat-Regular.ttf");
    const boldFontPath = path.join(fontBase, "Montserrat-Bold.ttf");
    const lightFontPath = path.join(fontBase, "Montserrat-Light.ttf");

    if (!fs.existsSync(pdfPath))
      return NextResponse.json({ error: "PDF not found" }, { status: 404 });

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
      console.warn("Custom fonts not found, falling back to Helvetica");
      const { StandardFonts } = await import("pdf-lib");
      regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      lightFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    }

    const formData = {
      "Organisation Name": "SecureCash",
      "Organisation Role": "Developer",
      "Organisation ABN": "54 358 777 554",
      "Full Name": "Deepak Kumar",
      Email: "deepak@securecash.com.au",
      Birthday: "15/01/1999",
      "Date of Acceptance": "23/01/2026, 8:26:36 AM",
      // DUMMY BASE64 SIGNATURE (Gray Square)
      Signature:
        "data:image/png;base64,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",
    };

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

    // Date & Time
    drawFormRow(page11, {
      label: "Date:",
      value: formData["Date of Acceptance"].split(",")[0],
      x: col2X,
      y: sigY,
      width: 100,
    });
    drawFormRow(page11, {
      label: "Time:",
      value: formData["Date of Acceptance"].split(",")[1]?.trim(),
      x: col2X + 110,
      y: sigY,
      width: 110,
    });

    const pdfBytes = await pdfDoc.save();
    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="final-fixed.pdf"',
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
