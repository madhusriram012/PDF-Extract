const AdmZip = require("adm-zip");
const {createObjectCsvWriter: csvWriter} = require("csv-writer");
const BillingAddressExtractor = require('./extractors/billingAddressExtractor.js')
const DetailsExtractor = require('./extractors/detailsExtractor.js')
const InvoiceTaxExtractor = require('./extractors/invoiceTaxExtractor.js')
const InvoiceBillDetailsExtractor = require('./extractors/invoiceBillDetailsExtractor.js')

class CsvService {
    inputPdf
    inputFolder

    constructor(inputPdf, inputFolder) {
        this.inputPdf = inputPdf
        this.inputFolder = inputFolder
    }

    writeToCsv = async () => {
        const OUTPUT_ZIP = `${this.inputFolder}/${this.inputPdf.replace(".pdf", "")}.zip`;
        // Convert JSON to CSV
        const zip = new AdmZip(OUTPUT_ZIP);
        const jsondata = zip.readAsText("structuredData.json");
        const data = JSON.parse(jsondata);
        const elements = data.elements
        console.log(this.inputPdf)
        const billingAddressExtractor = new BillingAddressExtractor()
        billingAddressExtractor.findBillingAddress(elements)
        const detailsExtractor = new DetailsExtractor()
        detailsExtractor.findDetails(elements)
        const invoiceTaxExtractor = new InvoiceTaxExtractor()
        invoiceTaxExtractor.findPaymentDetails(elements)
        const invoiceBillDetailsExtractor = new InvoiceBillDetailsExtractor()
        invoiceBillDetailsExtractor.findDetails(elements)

        /*const csvData = data.elements.reduce((acc, element, index) => {
            acc[`Text${index + 1}`] = element.Text;
            return acc;
        }, {});

        csvData.Path = this.inputPdf;

        const csvWriterOptions = {
            path: `${this.inputFolder}/combined_data.csv`,
            header: [
                { id: "Path", title: "Path" },
                ...data.elements.map((_, index) => ({ id: `Text${index + 1}`, title: `Text${index + 1}` }))
            ],
            append: true
        };

        const writer = csvWriter(csvWriterOptions);
        await writer.writeRecords([csvData]);*/
        //console.log(`Successfully written information from ${this.inputPdf}.`);
    }

}

module.exports = CsvService
