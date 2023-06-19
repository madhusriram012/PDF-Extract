const _ = require("lodash");
const Helper = require('../helper/helper.js')

class InvoiceTaxExtractor {
    findPaymentDetails = (elements) => {
        const helper = new Helper()
        const detailsElements = helper.findSimilarTopBoundElements(elements, 485.92999267578125)
        const taxAmount = this.getTaxDetails(detailsElements, helper)
        if(taxAmount === '') {
            return this.getTaxIfPresentAsParagraph(elements, helper)
        }
        return taxAmount
    }

    getTaxDetails = (elements, helper) => {
        const index = _.findIndex(elements, function (o) {
            return o.Text && (/^\d+$/.test(o.Text.trim()))
        });
        return helper.getElementTextOrEmpty(elements, index)
    }

    getTaxIfPresentAsParagraph = (elements, helper) => {
        const index = helper.findIndexOfTheTextContains(elements, "Tax") //TODO if index not found
        const taxElement = elements[index]
        if(taxElement) {
            const taxStringArr = taxElement.Text.split(" ")
            return this.findNumber(taxStringArr, helper)
        } else return ''
    }

    findNumber = (arr, helper) => {
       const idx =  _.findIndex(arr, function (o) {
            return (/^\d+$/.test(o.trim()))
        });

        return helper.getElementOrEmpty(arr, idx)
    }

}

module.exports = InvoiceTaxExtractor
