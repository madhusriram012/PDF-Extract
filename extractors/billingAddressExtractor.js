const validator = require("validator");
const Helper = require('../helper/helper.js');

class BillingAddressExtractor {
  findBillingAddress = (elements) => {
    try {
      const helper = new Helper();
      const index = helper.findIndexOfTheTextContains(elements, "BILL TO");

      if (index === -1) {
        throw new Error("Index not found");
      }

      const billingAddressElements = helper.findSimilarTopBoundElements(elements, elements[index].Bounds[0]);
      const addressString = billingAddressElements.map(({ Text }) => Text).join('').replace("BILL TO", "").trim();
      console.log(addressString);

      const [name, email, phoneNumber] = this.extractAddressDetails(addressString);

      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Phone Number:", phoneNumber);

      // Process the address remaining idx
    } catch (error) {
      console.error("Error in getting address:", error);
    }
  };

  extractAddressDetails = (addressString) => {
    const splitAddressString = addressString.split(/\s+/);

    const name = `${splitAddressString[0]} ${splitAddressString[1]}`;
    const email = this.getEmailAddress(splitAddressString);
    const phoneNumber = this.getPhoneNumber(splitAddressString);

    return [name, email, phoneNumber];
  };

  getEmailAddress = (splitAddressString) => {
    for (let i = 0; i < splitAddressString.length; i++) {
      const currentString = splitAddressString[i];
      if (validator.isEmail(currentString)) {
        return currentString;
      }
    }
    return '';
  };

  getPhoneNumber = (splitAddressString) => {
    for (let i = 0; i < splitAddressString.length; i++) {
      const currentString = splitAddressString[i];
      const phoneNumber = currentString.replace(/[^0-9]/g, ''); // Remove non-digit characters
      if (phoneNumber.length >= 10) { // Assuming phone numbers are at least 10 digits long
        return phoneNumber;
      }
    }
    return '';
  };
}

module.exports = BillingAddressExtractor;
