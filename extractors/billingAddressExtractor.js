const validator = require("validator");
const Helper = require('../helper/helper.js')

class BillingAddressExtractor {
    findBillingAddress = (elements) => {
        const helper = new Helper()
        const index = helper.findIndexOfTheTextContains(elements, "BILL TO") //TODO if index not found
        const billingAddressElements = helper.findSimilarTopBoundElements(elements, elements[index].Bounds[0])
        const arr = billingAddressElements
            .map((_, i) => billingAddressElements[i].Text);
        const addressString = arr.join('').replace("BILL TO", "").trim();
        const splitAddressString = addressString.split(" ")
        if (splitAddressString.length > 0) { //assumption is that the address present in the expected format
            try {
                const name = splitAddressString[0] + " " + splitAddressString[1] //firstname + lastname
                const emailAddress = this.getEmailAddress(splitAddressString[2], splitAddressString[3])
                const phoneNumber = this.getPhoneNumber(splitAddressString[3], splitAddressString[4])
                const idx = this.getIndexOfPhoneNumber(splitAddressString[3], 3, splitAddressString[4], 4)
                const addressLine1 = splitAddressString.slice(idx + 1, splitAddressString.length - 1).join(" ")
                const addressLine2 = splitAddressString[splitAddressString.length - 1]
                return {
                    name : name,
                    emailAddress: emailAddress,
                    phoneNumber: phoneNumber,
                    addressLine1: addressLine1,
                    addressLine2: addressLine2
                }
            } catch (e) {
                console.log(" Error in getting address")
                return {
                    name : '',
                    emailAddress: '',
                    phoneNumber: '',
                    addressLine1: '',
                    addressLine2: ''
                }
            }
        }
    }

    getEmailAddress = (part1, part2) => {
        if (validator.isEmail(part1 + part2)) {
            return part1 + part2
        } else if (validator.isEmail(part1)) {
            return part1
        } else return ''
    }

    getPhoneNumber = (part1, part2) => {
        const stringWithoutHyphen = part1.trim().replace(/-/g, '');
        if(this.isLetterPresent(stringWithoutHyphen)) { //contain
            return part2
        } else {
            return part1
        }
    }

    getIndexOfPhoneNumber = (part1,index1, part2, index2) => {
        const stringWithoutHyphen = part1.trim().replace(/-/g, '');
        if(this.isLetterPresent(stringWithoutHyphen)) { //contain characters
            return index2
        } else {
            return index1
        }
    }
    isLetterPresent = (string) => {
        return /[a-z]/i.test(string)
    }
}

module.exports = BillingAddressExtractor
