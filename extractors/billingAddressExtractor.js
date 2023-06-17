const _ = require("lodash");
const validator = require("validator");
const Helper = require('../helper/helper.js')

class BillingAddressExtractor {
    findBillingAddress = (elements) => {
        const helper = new Helper()
       
        const index = helper.findIndexOfTheTextContains(elements, "BILL TO") //TODO if index not found
        const billingAddressElements = helper.findSimilarTopBoundElements(elements, elements[index].Bounds[0])
        // console.log(billingAddressElements)
        const email = this.findEmailAddress(billingAddressElements)
        const phoneNumber = this.findPhoneNumber(billingAddressElements)

    }
  
    // findEmailAddress = (elements) => {
    //     const emailElement = elements.find((o) => {
    //       return o.Text && validator.isEmail(o.Text.trim());
    //     });
      
    //     if (emailElement) {
    //       return emailElement.Text.trim();
    //     }
      
    //     return '';
    //   };
     findEmailAddress = (elements) => {
      const emails = [];
      let currentEmail = "";
    
      for (const element of elements) {
        if (element.Text) {
          const normalizedText = element.Text.trim();
    
          if (validator.isEmail(normalizedText)) {
            // Valid email address found
            const normalizedEmail = normalizeEmail(normalizedText);
            currentEmail += normalizedEmail;
          } else {
            // Not a valid email address, assuming broken part of an email
            currentEmail += normalizedText;
          }
    
          if (currentEmail && validator.isEmail(currentEmail)) {
            emails.push(currentEmail);
            currentEmail = "";
          }
        }
      }
    
      return emails;
    };
    
    

    findPhoneNumber = (elements) => {
        for (let i = 0; i < elements.length; i++) {
          const text = elements[i].Text.trim().replace(/-/g, '');
          if (text && /^\d+$/.test(text)) {
            return text;
          }
        }
        return '';
      };
}

module.exports = BillingAddressExtractor
