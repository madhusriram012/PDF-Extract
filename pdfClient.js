const PDFServicesSdk = require("@adobe/pdfservices-node-sdk");
class PdfClient {
    getExtractPdfOperation(inputPdf) {
        const extractPDFOperation = PDFServicesSdk.ExtractPDF.Operation.createNew(); // Create a new operation instance for each PDF

        const input = PDFServicesSdk.FileRef.createFromLocalFile(
            inputPdf,
            PDFServicesSdk.ExtractPDF.SupportedSourceFormat.pdf
        );

        const options = new PDFServicesSdk.ExtractPDF.options.ExtractPdfOptions.Builder()
            .addElementsToExtract(PDFServicesSdk.ExtractPDF.options.ExtractElementType.TEXT, PDFServicesSdk.ExtractPDF.options.ExtractElementType.TABLES)
            .addElementsToExtractRenditions(PDFServicesSdk.ExtractPDF.options.ExtractRenditionsElementType.TABLES)
            .addTableStructureFormat(PDFServicesSdk.ExtractPDF.options.TableStructureType.CSV)
            .build();

        extractPDFOperation.setInput(input);
        extractPDFOperation.setOptions(options);
        return extractPDFOperation
    }
}
module.exports = PdfClient
