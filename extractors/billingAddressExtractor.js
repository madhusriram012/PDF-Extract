const _ = require("lodash");
const validator = require("validator");
const Helper = require('../helper/helper.js')

class BillingAddressExtractor {
    findBillingAddress = (elements) => {
        const helper = new Helper()
        // Kerry Bergnaum Kerry_Bergnaum@yahoo.c om 189-052-5595 // TODO it won't work for the scenario where all the data in single line (e.g. output5.zip)
        const index = helper.findIndexOfTheTextContains(elements, "BILL TO") //TODO if index not found
        const billingAddressElements = helper.findSimilarTopBoundElements(elements, elements[index].Bounds[0])
        //console.log(billingAddressElements)
        const email = this.findEmailAddress(billingAddressElements)
        const phoneNumber = this.findPhoneNumber(billingAddressElements)
        console.log(email)
        console.log(phoneNumber)
    }

    findEmailAddress = (elements) => {
        const index = _.findIndex(elements, function (o) {
            return o.Text && validator.isEmail(o.Text.trim())
        });
        if(index === -1)
            return ''
        return elements[index].Text.trim()
    }

    findPhoneNumber = (elements) => {
        const index = _.findIndex(elements, function (o) {
            return o.Text && (/^\d+$/.test(o.Text.trim().replaceAll("-", "")))
        });
        if(index === -1)
            return ''
        return elements[index].Text.trim()
    }
}

module.exports = BillingAddressExtractor
