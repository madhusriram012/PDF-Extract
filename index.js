const ExtractPdfService = require('./extractPdf.js');
const CsvService = require('./csvService');
const Adobe = require('./adobeExecutionContext');

const throttledQueue = require('throttled-queue');
const config = require('config');
const maxRequestsPerInterval = config.get('throttle.maxRequestsPerInterval');
const intervalInSeconds = config.get('throttle.intervalInSeconds');
const OUTPUT_FOLDER = config.get('folderInfo.outputPath');
const throttle = throttledQueue(maxRequestsPerInterval, intervalInSeconds);

const processAllPDFs = async () => {
  const adobeExecutionContext = Adobe.getAdobeExecutionContext();
  const inputs = getInputPdfs();

  await Promise.all(
    inputs.map((input, index) =>
      throttle(async () => {
        console.log('The promise has resolved ' + index);
        const extractPdfService = new ExtractPdfService(input, adobeExecutionContext, OUTPUT_FOLDER);
        await extractPdfService.extractAndSavePdf();
      })
    )
  );

  inputs.map((input) => {
    const filePath = `${OUTPUT_FOLDER}/${input.replace(".pdf", "")}.zip`;
    const csvService = new CsvService(filePath, OUTPUT_FOLDER);
    csvService.writeToCsv();
  });
};

const getInputPdfs = () => {
  const inputPdfs = [];
  for (let i = 0; i < 100; i++) {
    inputPdfs.push(`TestDataSet/output${i}.pdf`);
  }
  return inputPdfs;
};

processAllPDFs()
  .then(() => {
    console.log("All PDFs processed successfully.");
  })
  .catch((err) => {
    console.log(`Error processing PDFs: ${err}`);
  });
