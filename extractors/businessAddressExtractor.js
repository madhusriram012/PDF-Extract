const validator = require("validator");
const Helper = require('../helper/helper.js')

class BusinessAddressExtractor {
    findAddress = (elements) => {
        const helper = new Helper()
        const businessAddressElements = helper.findSimilarTopBoundElements(elements, 76.72799682617188)
        const idx = helper.findIndexOfThePathContains(elements, "/Title")
        const addressElements = businessAddressElements.slice(0, idx - 1)
        const arr = addressElements
            .map((_, i) => {
                return addressElements[i].Text
            });
        const addressString = arr.join('').trim();
        const splitAddressString = addressString.split(",")
        if (splitAddressString.length > 0) { //assumption is that the address present in the expected format
            try {
                const businessDetails = splitAddressString[0].split(" ")
                const businessName = businessDetails[0] + " " + businessDetails[1]
                const businessStreetAddress = businessDetails.slice(2, businessDetails.length - 1).join(" ")
                const businessCity = splitAddressString[1]
                const splitCountryPostCode = splitAddressString[splitAddressString.length - 1].trim().split(" ")
                const businessCountry = splitAddressString[2] + "," + splitCountryPostCode[0]
                const businessZipCode = splitCountryPostCode[1]
                return {
                    businessName: businessName.trim(),
                    businessStreetAddress: businessStreetAddress.trim(),
                    businessCity: businessCity.trim(),
                    businessCountry: businessCountry.trim(),
                    businessZipCode: businessZipCode.trim()
                }
            } catch (e) {
                console.log(" Error in getting address")
                return {
                    businessName: '',
                    businessStreetAddress: '',
                    businessCity: '',
                    businessCountry: '',
                    businessZipCode: ''
                }

            }
        }
    }
}

module.exports = BusinessAddressExtractor
