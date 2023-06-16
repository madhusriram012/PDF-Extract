const PdfClient = require('./pdfClient.js')
const fs = require("fs");
class ExtractPdfService {
    inputPdf
    executionContext
    outputFolder
    constructor(inputPdf, executionContext, outputFolder) {
       this.inputPdf = inputPdf
       this.executionContext = executionContext
       this.outputFolder = outputFolder
    }
    async extractAndSavePdf() {
        const OUTPUT_ZIP = `${this.outputFolder}/${this.inputPdf.replace(".pdf", "")}.zip`;

        // Remove output ZIP file if it already exists
        if (fs.existsSync(OUTPUT_ZIP)) {
            fs.unlinkSync(OUTPUT_ZIP);
        }

        const pdfClient = new PdfClient()
        const extractPDFOperation = pdfClient.getExtractPdfOperation(this.inputPdf)
        try {
            const result = await extractPDFOperation.execute(this.executionContext);
            await result.saveAsFile(OUTPUT_ZIP);
            console.log(`Successfully extracted information from ${this.inputPdf}.`);
        } catch (err) {
            console.log(`Error processing ${this.inputPdf}: ${err}`);
        }
    }
}
module.exports = ExtractPdfService
