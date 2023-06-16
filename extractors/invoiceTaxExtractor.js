const _ = require("lodash");
const Helper = require('../helper/helper.js')

class InvoiceTaxExtractor {
    findPaymentDetails = (elements) => {
        const helper = new Helper()
        const detailsElements = helper.findSimilarTopBoundElements(elements, 485.92999267578125)
        const details = this.getTaxDetails(detailsElements)
        console.log(details)
    }

    getTaxDetails = (elements) => {
        const index = _.findIndex(elements, function (o) {
            return o.Text && (/^\d+$/.test(o.Text.trim()))
        });
        if(index === -1)
            return ''
        return elements[index].Text.trim()
    }
}

module.exports = InvoiceTaxExtractor
