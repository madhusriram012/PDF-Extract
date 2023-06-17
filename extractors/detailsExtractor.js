const _ = require("lodash");
const Helper = require('../helper/helper.js')

class DetailsExtractor {
    findDetails = (elements) => {
        const helper = new Helper()
        const index = helper.findIndexOfTheTextContains(elements, "DETAILS") //TODO if index not found
        const detailsElements = helper.findSimilarTopBoundElements(elements, elements[index].Bounds[0])
        const details = this.getDetails(detailsElements)
        // console.log(details)
    }

    getDetails = (elements) => {
        const arr = _.map(elements, function(o) {
            if(o["Text"] && !o["Text"].includes("DETAILS")) return o["Text"].trim();
        })
        return arr.join(" ").trim()
    }
}

module.exports = DetailsExtractor
