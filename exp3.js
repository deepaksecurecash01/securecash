const readPdfFile = (filename) => {
  try {
	const filePath = path.join(process.cwd(), "public", "upload", filename);

	if (!fs.existsSync(filePath)) {
	  console.warn(`PDF file not found: ${filePath}`);
	  return null;
	}

	const fileBuffer = fs.readFileSync(filePath);
	return fileBuffer.toString("base64");
  } catch (error) {
	console.error(`Error reading PDF file ${filename}:`, error);
	return null;
  }
};
const preparePdfAttachments = () =>
{
	const attachmentConfigs = [
		{
			filename: "SecureCash-Online-Services-Flyer.pdf",
			displayName: "SecureCash Online Services Flyer.pdf",
		},
		{
			filename: "How-to-Prepare-Your-Banking.pdf",
			displayName: "How to Prepare Your Banking.pdf",
		},
	];

	const attachments = [];

	for (const config of attachmentConfigs) {
		const pdfContent = readPdfFile(config.filename);
		if (pdfContent) {
			attachments.push({
				content: pdfContent,
				filename: config.displayName,
				type: "application/pdf",
				disposition: "attachment",
			});
		}
	}

	return attachments;
};
const pdfAttachments = preparePdfAttachments();

attachments: pdfAttachments
