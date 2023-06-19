const Helper = require('../helper/helper.js')
const fs = require('fs');
const path = require('path');
const { parse } = require('fast-csv');

class InvoiceItemDetailsExtractor {
    findDetails = (elements) => {
        const helper = new Helper()
        const tableElements = helper.findElementsWithTables(elements, 2, 4)
        const filePaths = tableElements[0].filePaths
        const index = helper.findIndexOfTheArrayContains(filePaths, "csv")
        const filePath = filePaths[index]
        console.log(filePath)
        /*let rows = [];

        fs.createReadStream(path.resolve(__dirname, 'confirmed_cases_au_by_location.csv'))
            .pipe(parse({ headers: true }))
            .on('error', error => console.error(error))
            .on('data', row => {
                console.log(row);
                //each row can be written to db
                rows.push(row);
            })
            .on('end', rowCount => {
                console.log(`Parsed ${rowCount} rows`);
                console.log(rows[81484].postcode); // this data can be used to write to a db in bulk
            });*/
    }
}

module.exports = InvoiceItemDetailsExtractor
