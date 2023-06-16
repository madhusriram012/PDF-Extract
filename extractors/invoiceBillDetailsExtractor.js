const _ = require("lodash");
const Helper = require('../helper/helper.js')

class InvoiceBillDetailsExtractor {
    findDetails = (elements) => {
        const helper = new Helper()
        const index = helper.findIndexOfTheTextContains(elements, "ITEM") //TODO if index not found
        const detailsElements = helper.findSimilarTopBoundElements(elements, elements[index].Bounds[0])
        const details = this.getItemDetails(detailsElements)
        console.log(details)
    }

    getItemDetails = (elements) => {
        const index = _.findIndex(elements, function (o) {
            console.log(o.Text)
            return o.Text && (/^\d+$/.test(o.Text.trim()))
        });
    }
}

module.exports = InvoiceBillDetailsExtractor
