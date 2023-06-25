const AdmZip = require("adm-zip");
const fs = require('fs');
const Extractor=require("./extractor");

class CsvService {
  filePath;
  inputFolder;

  constructor(filePath, inputFolder) {
    this.filePath = filePath;
    this.inputFolder = inputFolder;
  }

  writeToCsv = async () => {
    // Convert JSON to CSV
    const zip = new AdmZip(this.filePath, {});
    const jsonData = zip.readAsText("structuredData.json");
    const data = JSON.parse(jsonData);
    let elementString = "";
    data.elements.forEach(element => {
      if (element.Text) {
        elementString += element.Text + "\n";
      }
    });

    const extractedData = new Extractor(elementString)
      .extractBusinessInfo()
      .extractInvoiceInfo()
      .extractBusinessDescription()
      .extractCustomerInfo()
      .extractAndRemoveTaxInfo()
      .extractItemsInfo()
      .get();

    const csvFilePath = `${this.inputFolder}/combined_data.csv`;
    const isFileExists = fs.existsSync(csvFilePath);
    const headerRow = [
      "Business City",
      "Business State",
      "Business Country",
      "Business Description",
      "Business Name",
      "Business Street Address",
      "Business Zipcode",
      "Customer Address Line 1",
      "Customer Address Line 2",
      "Customer Email",
      "Customer Name",
      "Customer Phone",
      "Product Name",
      "Product Quantity",
      "Product Rate",
      "Invoice Description",
      "Invoice Due Date",
      "Invoice Issue Date",
      "Invoice Number",
      "Invoice Tax"
    ];

    if (!isFileExists) {
      fs.writeFileSync(csvFilePath, headerRow.join(",") + "\n");
    }

    const records = [];

    extractedData.items.forEach(item => {
      const record = [
        extractedData.businessCity,
        extractedData.businessCountry,
        extractedData.businessDescription,
        extractedData.businessName,
        extractedData.businessStreetAddress,
        extractedData.businessZipcode,
        extractedData.customerAddressLine1,
        extractedData.customerAddressLine2,
        extractedData.customerEmail,
        extractedData.customerName,
        extractedData.customerPhone,
        item.productName,
        item.productQty,
        item.productRate,
        extractedData.invoiceDescription,
        extractedData.dueDate,
        extractedData.issueDate,
        extractedData.invoiceNumber,
        extractedData.taxValue
      ];

      records.push(record.join(","));
    });

    fs.appendFileSync(csvFilePath, records.join("\n") + "\n");
    console.log(`Successfully written information to combined_data.csv.`);
  };
}

module.exports = CsvService;
