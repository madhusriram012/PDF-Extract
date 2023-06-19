const _ = require("lodash");
const Helper = require('../helper/helper.js')

class InvoiceNumberExtractor {
    find = (elements) => {
        const helper = new Helper()
        const index = helper.findIndexOfTheTextContains(elements, "Invoice#")
        const invoiceString = elements[index].Text.replace("Invoice#", "").trim()
        const splitInvoiceString = invoiceString.split(" ")
        if(splitInvoiceString && splitInvoiceString.length > 0 && splitInvoiceString[0] !== '') {
            return splitInvoiceString[0]
        } else {
            return elements[index + 1].Text.split(" ")[0].trim() //assuming data present otherwise `Cannot read properties of undefined` error
        }
    }

}

module.exports = InvoiceNumberExtractor
