const _ = require("lodash");
const Helper = require('../helper/helper.js')

class InvoiceIssueDateExtractor {
    find = (elements) => {
        const helper = new Helper()
        const index = helper.findIndexOfTheTextContains(elements, "Issue")
        const splitInvoiceStringArr = elements[index].Text.trim().split(" ")
        const indexOfDate = helper.findIndexOfTheArrayContains(splitInvoiceStringArr, "date")
        const dateStringArr = splitInvoiceStringArr.slice(indexOfDate, splitInvoiceStringArr.length)
        if(dateStringArr.length === 2) {
            return dateStringArr[1]
        } else{
            return elements[index + 1].Text.trim()
        }
    }

}

module.exports = InvoiceIssueDateExtractor
