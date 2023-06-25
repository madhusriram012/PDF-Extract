class Extractor {
    content
    businessName
    businessStreetAddress
    businessCity
    businessCountry
    businessZipcode
    invoiceNumber
    issueDate
    businessDescription
    customerName = ""
    customerEmail = ""
    customerPhone = ""
    customerAddressLine1 = ""
    customerAddressLine2 = ""
    invoiceDescription = ""
    dueDate = ""
    taxValue
    items = []

    constructor(content) {
        this.content = content;
    }

    extractBusinessInfo() {
        this.businessName = this.#extractAndRemoveBusinessName()
        this.businessStreetAddress = this.#extractAndRemoveStreetAddress()
        this.businessCity = this.#extractAndRemoveCity()
        this.businessCountry = this.#extractAndRemoveCountry()
        this.businessZipcode = this.#extractAndRemoveZipcode()
        return this
    }

    extractInvoiceInfo() {
        this.invoiceNumber = this.#extractAndRemoveInvoiceNumber()
        this.issueDate = this.#extractAndRemoveIssueDate()
        return this
    }

    extractBusinessDescription() {
        this.businessDescription = this.#extractAndRemoveBusinessDescription()
        return this
    }

    extractCustomerInfo() {
        this.#extractDetails()
        this.#extractAndRemoveCustomerInfo()
        return this
    }

    extractAndRemoveTaxInfo() {
        this.taxValue = this.#extractAndRemoveTax()
        return this
    }

    extractItemsInfo() {
        this.#extractAndRemoveItems()
        return this
    }

    get() {
        return {
            businessName: this.businessName,
            businessStreetAddress: this.businessStreetAddress,
            businessCity: this.businessCity,
            businessCountry: this.businessCountry,
            businessZipcode: this.businessZipcode,
            invoiceNumber: this.invoiceNumber,
            issueDate: this.issueDate,
            businessDescription: this.businessDescription,
            customerName: this.customerName,
            customerEmail: this.customerEmail,
            customerPhone: this.customerPhone,
            customerAddressLine1: this.customerAddressLine1,
            customerAddressLine2: this.customerAddressLine2,
            invoiceDescription: this.invoiceDescription,
            dueDate: this.dueDate,
            items: this.items,
            taxValue: this.taxValue
        }
    }

    #extractAndRemoveBusinessName() {
        const endOfBusinessName = this.content.indexOf("\n");
        const businessName = this.content.slice(0, endOfBusinessName).trim();
        this.content = this.content.substring(endOfBusinessName + 1);
        return businessName
    }

    #extractAndRemoveStreetAddress() {
        const indexOfComma = this.content.indexOf(",");
        const streetAddress = this.content.slice(0, indexOfComma).trim();
        this.content = this.content.substring(indexOfComma + 1);
        return streetAddress
    }

    #extractAndRemoveCity() {
        const indexOfComma = this.content.indexOf(",");
        const city = this.content.slice(0, indexOfComma).trim();
        this.content = this.content.substring(indexOfComma + 1);
        return city
    }

    #extractAndRemoveCountry() {
        let end = this.content.indexOf("\n");

        if (end < 5) {
            this.content = this.content.substring(end + 1);
        }
        end = this.content.indexOf("\n");
        let businessCountry = this.content.slice(0, end).trim();
        this.content = this.content.substring(end + 1);
        return businessCountry
    }

    #extractAndRemoveZipcode() {
        const end = this.content.indexOf("\n");
        const zipCode = this.content.slice(0, end).trim();
        this.content = this.content.substring(end + 1);
        return zipCode
    }

    #extractAndRemoveInvoiceNumber() {
        const indexOfHash = this.content.indexOf("#");
        this.content = this.content.substring(indexOfHash + 2);
        const indexOfIssue = this.content.indexOf("Issue");
        const invoiceNumber = this.content.slice(0, indexOfIssue).trim();
        this.content = this.content.substring(indexOfIssue);
        return invoiceNumber
    }

    #extractAndRemoveIssueDate() {
        let end = this.content.indexOf("\n");
        let issueDate = "";
        if (end < 15) {
            this.content = this.content.substring(end + 1);
            end = this.content.indexOf("\n");
            issueDate = this.content.slice(0, 10);
            this.content = this.content.substring(end + 1);
        } else {
            issueDate = this.content.slice(11, 22);
            this.content = this.content.substring(23);
        }
        return issueDate
    }

    #extractAndRemoveBusinessDescription() {
        let end = this.content.indexOf("\n");
        if (end === 0) {
            this.content = this.content.substring(end + 1);
            end = this.content.indexOf("\n");
        }
        this.content = this.content.substring(end + 1);
        end = this.content.indexOf("\n");
        const businessDescription = this.content.slice(0, end).trim();
        this.content = this.content.substring(end + 1);
        return businessDescription
    }

    #extractDetails() {
        let end = this.content.indexOf("\n");
        this.content = this.content.substring(end + 1);
        let details = this.content.indexOf("DETAILS");
        if (details === 0) {
            end = this.content.indexOf("\n");
            this.content = this.content.substring(end + 1);
            end = this.content.indexOf("\n");
            this.content = this.content.substring(end + 1);
        }
    }

    #extractAndRemoveCustomerInfo() {
        let end;

        let indexOfItem = this.content.indexOf("ITEM");
        let newSt = this.content.slice(0, indexOfItem);         //string containing only data of customer
        this.content = this.content.substring(indexOfItem);

        let indexOfDueDate = newSt.indexOf("Due date");
        this.dueDate = newSt.slice(indexOfDueDate + 10, indexOfDueDate + 20);

        let indexOfAtRate = newSt.indexOf("@");
        let space = newSt.indexOf(" ");
        end = newSt.indexOf("\n");

        while (space < indexOfAtRate && space < end) {
            this.customerName += newSt.slice(0, space + 1);
            newSt = newSt.substring(space + 1);
            space = newSt.indexOf(" ");
            indexOfAtRate = newSt.indexOf("@");
            end = newSt.indexOf("\n");
        }

        if (indexOfDueDate < indexOfAtRate) {

            while (end < indexOfDueDate) {
                this.invoiceDescription += " " + newSt.slice(0, end);
                newSt = newSt.substring(end + 1);
                end = newSt.indexOf("\n");
                indexOfDueDate = newSt.indexOf("Due");
            }
            end = newSt.indexOf("\n");
            newSt = newSt.substring(end + 1);

            end = newSt.indexOf("\n");
            let indexOfDot = newSt.indexOf(".");
            if (indexOfDot < end) {
                indexOfAtRate = newSt.indexOf("@");
                this.customerEmail += newSt.slice(0, indexOfAtRate + 1);
                newSt = newSt.substring(indexOfAtRate + 1);
                indexOfDot = newSt.indexOf(".");
                this.customerEmail += newSt.slice(0, indexOfDot + 1);
                this.customerEmail += "com";
            } else {
                this.customerEmail = newSt.slice(0, end);
            }

            end = newSt.indexOf("\n");
            newSt = newSt.substring(end + 1);
            end = newSt.indexOf("\n");
            this.invoiceDescription += newSt.slice(0, end);

            newSt = newSt.substring(end + 1);
            end = newSt.indexOf("\n");

            let complete_email = true;
            if (end < 10) {
                complete_email = false;
                newSt = newSt.substring(end + 1);
                end = newSt.indexOf("\n");
            }
            this.customerPhone = newSt.substring(0, 12);

            newSt = newSt.substring(13);
            end = newSt.indexOf("\n");
            if (end < 3) {
                newSt = newSt.substring(end + 1);
                end = newSt.indexOf("\n");
            }
            if (complete_email) {
                if (!this.#isNumeric(newSt[0])) {
                    while (newSt.indexOf('$') > 0) {
                        this.invoiceDescription += newSt.slice(0, end);
                        newSt = newSt.substring(end + 1);
                        end = newSt.indexOf("\n");
                    }
                    newSt = newSt.substring(end + 1);
                    end = newSt.indexOf("\n");

                    //Address line one contains 3 words seperated by two spaces
                    let count = 0;
                    while (count < 3) {
                        count++;
                        this.customerAddressLine1 += newSt.slice(0, space + 1);
                        newSt = newSt.substring(space + 1);
                        space = newSt.indexOf(" ");
                    }
                    end = newSt.indexOf("\n");

                    newSt = newSt.substring(end + 1);
                    end = newSt.indexOf("\n");
                    while (newSt.indexOf("ITEM") > 0) {
                        if (end < 15 && this.customerAddressLine2 === "") {
                            this.customerAddressLine2 = newSt.slice(0, end);
                            newSt = newSt.substring(end + 1);
                            end = newSt.indexOf("\n");
                        } else {
                            this.invoiceDescription += newSt.slice(0, end);
                            newSt = newSt.substring(end + 1);
                            end = newSt.indexOf("\n");
                        }
                    }
                } else {
                    let count = 0;
                    space = newSt.indexOf(" ");
                    while (count < 3) {
                        count++;
                        this.customerAddressLine1 += newSt.slice(0, space + 1);
                        newSt = newSt.substring(space + 1);
                        space = newSt.indexOf(" ");
                    }
                    end = newSt.indexOf("\n");
                    if (end === 0) {
                        newSt = newSt.substring(end + 1);
                        end = newSt.indexOf("\n");
                    }
                    if (end < 15) {
                        this.customerAddressLine2 = newSt.slice(0, end);
                        newSt = newSt.substring(end + 1);
                        end = newSt.indexOf("\n");
                    }

                    while (newSt.indexOf('$') > 0) {
                        this.invoiceDescription += newSt.slice(0, end);
                        newSt = newSt.substring(end + 1);
                        end = newSt.indexOf("\n");
                    }
                    newSt = newSt.substring(end + 1);
                    end = newSt.indexOf("\n");

                    if (end < 15 && this.customerAddressLine2 === "") {
                        this.customerAddressLine2 = newSt.slice(0, end);
                        newSt = newSt.substring(end + 1);
                        end = newSt.indexOf("\n");
                    }
                    while (newSt.length > 0) {
                        this.invoiceDescription += newSt.slice(0, end);
                        newSt = newSt.substring(end + 1);
                        end = newSt.indexOf("\n");
                    }
                }
            } else {
                while (newSt.indexOf('$') > 0) {
                    this.invoiceDescription += newSt.slice(0, end);
                    newSt = newSt.substring(end + 1);
                    end = newSt.indexOf("\n");
                }
                newSt = newSt.substring(end + 1);
                end = newSt.indexOf("\n");

                let count = 0;
                while (count < 3) {
                    count++;
                    this.customerAddressLine1 += newSt.slice(0, space + 1);
                    newSt = newSt.substring(space + 1);
                    space = newSt.indexOf(" ");
                }
                end = newSt.indexOf("\n");

                newSt = newSt.substring(end + 1);
                end = newSt.indexOf("\n");

                if (end < 15 && newSt.indexOf("ITEM") > 0) {
                    this.customerAddressLine2 = newSt.slice(0, end);
                    newSt = newSt.substring(end + 1);
                    end = newSt.indexOf("\n");
                }
                while (newSt.indexOf("ITEM") > 0) {
                    this.invoiceDescription += newSt.slice(0, end);
                    newSt = newSt.substring(end + 1);
                    end = newSt.indexOf("\n");
                }
            }
        } else {
            indexOfAtRate = newSt.indexOf("@");
            this.customerEmail = newSt.slice(0, indexOfAtRate + 1);
            this.customerEmail = this.customerEmail.trim();
            newSt = newSt.substring(indexOfAtRate + 1);

            let indexOfDot = newSt.indexOf(".");
            end = newSt.indexOf("\n");
            space = newSt.indexOf(" ");
            let emailExtension = false;

            if (indexOfDot < end) {
                emailExtension = true;
                this.customerEmail = this.customerEmail.trim();
                this.customerEmail += newSt.slice(0, indexOfDot + 1) + "com";
                newSt = newSt.substring(indexOfDot);
                end = newSt.indexOf("\n");
                space = newSt.indexOf(" ");
                if (end < space) {
                    newSt = newSt.substring(end + 1);
                } else {
                    newSt = newSt.substring(space + 1);
                }
            } else {
                this.customerEmail += newSt.slice(0, end);
                end = newSt.indexOf("\n");
                newSt = newSt.substring(end + 1);
            }

            if (emailExtension) {
                end = newSt.indexOf("\n");
                if (end === 0) {
                    newSt = newSt.substring(end + 1);
                    end = newSt.indexOf("\n");
                }
                space = newSt.indexOf(" ");
                if (end < 4) {
                    newSt = newSt.substring(end + 1);

                } else if (space < 3) {
                    newSt = newSt.substring(space + 1);
                }

                if (this.#isNumeric(newSt[0])) {
                    this.customerPhone = newSt.slice(0, 12);
                    newSt = newSt.substring(14);
                    space = newSt.indexOf(" ");

                    let count = 0;
                    while (count < 3) {
                        count++;
                        this.customerAddressLine1 += newSt.slice(0, space + 1);
                        newSt = newSt.substring(space + 1);
                        space = newSt.indexOf(" ");
                    }
                    end = newSt.indexOf("\n");
                    if (end === 0) {
                        newSt = newSt.substring(end + 1);
                        end = newSt.indexOf("\n");
                    }
                    this.customerAddressLine2 = newSt.slice(0, end);
                    newSt = newSt.substring(end + 1);
                    end = newSt.indexOf("\n");

                    while (newSt.length > 0 && newSt.indexOf("$") > 0) {
                        if (newSt.indexOf("DETAILS") === 0 || newSt.indexOf("PAYMENT") === 0 || newSt.indexOf("Due date") === 0) {
                            newSt = newSt.substring(end + 1);
                            end = newSt.indexOf("\n");
                            continue;
                        }
                        this.invoiceDescription += newSt.slice(0, end);
                        newSt = newSt.substring(end + 1);
                        end = newSt.indexOf("\n");
                    }
                } else if (newSt.indexOf("Due date") === 0) {
                    newSt = newSt.substring(end + 1);
                    end = newSt.indexOf("\n");
                    if (end < 3) {
                        newSt = newSt.substring(end + 1);
                        end = newSt.indexOf("\n");
                    }
                    space = newSt.indexOf(" ");
                    this.customerPhone = newSt.slice(0, 12);
                    newSt = newSt.substring(14);

                    let count = 0;
                    while (count < 3) {
                        count++;
                        this.customerAddressLine1 += newSt.slice(0, space + 1);
                        newSt = newSt.substring(space + 1);
                        space = newSt.indexOf(" ");
                    }

                    end = newSt.indexOf("\n");
                    if (end === 0) {
                        newSt = newSt.substring(end + 1);
                        end = newSt.indexOf("\n");
                    }
                    this.customerAddressLine2 = newSt.slice(0, end);
                } else {
                    this.invoiceDescription += newSt.slice(0, end);
                    newSt = newSt.substring(end + 1);
                    end = newSt.indexOf("\n");
                    newSt = newSt.substring(end + 1);
                    end = newSt.indexOf("\n");

                    if (end < 5) {
                        newSt = newSt.substring(end + 1);
                        end = newSt.indexOf("\n");
                    }
                    this.customerPhone = newSt.slice(0, 12);
                    newSt = newSt.substring(14);

                    let count = 0;
                    while (count < 3) {
                        count++;
                        this.customerAddressLine1 += newSt.slice(0, space + 1);
                        newSt = newSt.substring(space + 1);
                        space = newSt.indexOf(" ");
                    }
                    end = newSt.indexOf("\n");
                    if (end === 0) {
                        newSt = newSt.substring(end + 1);
                        end = newSt.indexOf("\n");
                    }
                    this.customerAddressLine2 = newSt.slice(0, end);
                }
            } else {
                end = newSt.indexOf("\n");
                let com_index = newSt.indexOf("com");
                if (com_index < end) {
                    this.customerEmail += newSt.slice(0, com_index + 3);
                    newSt = newSt.substring(com_index + 5);

                    this.customerPhone = newSt.slice(0, 12);
                    newSt = newSt.substring(14);
                    space = newSt.indexOf(" ");

                    let count = 0;
                    while (count < 3) {
                        count++;
                        this.customerAddressLine1 += newSt.slice(0, space + 1);
                        newSt = newSt.substring(space + 1);
                        space = newSt.indexOf(" ");
                    }
                    end = newSt.indexOf("\n");
                    if (end === 0) {
                        newSt = newSt.substring(end + 1);
                        end = newSt.indexOf("\n");
                    }
                    this.customerAddressLine2 = newSt.slice(0, end);

                    newSt = newSt.substring(end + 1);
                    end = newSt.indexOf("\n");
                    while (newSt.length > 0 && newSt.indexOf("$") > 0) {
                        if (newSt.indexOf("DETAILS") === 0 || newSt.indexOf("PAYMENT") === 0 || newSt.indexOf("Due date") === 0) {
                            newSt = newSt.substring(end + 1);
                            end = newSt.indexOf("\n");
                            continue;
                        }
                        this.invoiceDescription += newSt.slice(0, end);
                        newSt = newSt.substring(end + 1);
                        end = newSt.indexOf("\n");
                    }
                } else if (newSt.indexOf("Due date") === 0) {
                    newSt = newSt.substring(end + 1);
                    end = newSt.indexOf("\n");
                    this.customerEmail += newSt.slice(0, end);
                    newSt = newSt.substring(end + 1);
                    end = newSt.indexOf("\n");

                    this.customerPhone = newSt.slice(0, 12);
                    newSt = newSt.substring(14);
                    space = newSt.indexOf(" ");

                    let count = 0;
                    while (count < 3) {
                        count++;
                        this.customerAddressLine1 += newSt.slice(0, space + 1);
                        newSt = newSt.substring(space + 1);
                        space = newSt.indexOf(" ");
                    }
                    end = newSt.indexOf("\n");
                    if (end === 0) {
                        newSt = newSt.substring(end + 1);
                        end = newSt.indexOf("\n");
                    }
                    this.customerAddressLine2 = newSt.slice(0, end);
                } else {
                    this.invoiceDescription += newSt.slice(0, end);
                    newSt = newSt.substring(end + 1);
                    end = newSt.indexOf("\n");
                    newSt = newSt.substring(end + 1);
                    end = newSt.indexOf("\n");

                    this.customerPhone = newSt.slice(0, 12);
                    newSt = newSt.substring(14);
                    space = newSt.indexOf(" ");

                    let count = 0;
                    while (count < 3) {
                        count++;
                        this.customerAddressLine1 += newSt.slice(0, space + 1);
                        newSt = newSt.substring(space + 1);
                        space = newSt.indexOf(" ");
                    }
                    end = newSt.indexOf("\n");
                    if (end === 0) {
                        newSt = newSt.substring(end + 1);
                        end = newSt.indexOf("\n");
                    }
                    this.customerAddressLine2 = newSt.slice(0, end);
                }
            }
        }
        this.customerEmail = this.customerEmail.split(" ").join("");
        this.#removeSpacesForCustomerInfo()
    }

    #isNumeric(value) {
        return /^-?\d+$/.test(value);
    }

    #removeSpacesForCustomerInfo() {
        if (this.customerName) {
            this.customerName = this.customerName.trim()
        }
        if (this.customerEmail) {
            this.customerEmail = this.customerEmail.trim()
        }
        if (this.customerAddressLine1) {
            this.customerAddressLine1 = this.customerAddressLine1.trim()
        }
        if (this.customerAddressLine2) {
            this.customerAddressLine2 = this.customerAddressLine2.trim()
        }
        if (this.customerPhone) {
            this.customerPhone = this.customerPhone.trim()
        }
        if (this.dueDate) {
            this.dueDate = this.dueDate.trim()
        }
        if (this.invoiceDescription) {
            this.invoiceDescription = this.invoiceDescription.trim()
        }
    }

    #extractAndRemoveTax() {
        let indexOfTax = this.content.indexOf("%");
        let newSt = this.content.substring(indexOfTax);
        let indexOfSpace = newSt.indexOf(" ");
        let end = newSt.indexOf("\n");
        if(indexOfSpace<end){
            newSt = newSt.substring(indexOfSpace+ 1);
        }
        else{
            newSt = newSt.substring(end + 1);
        }

        end = newSt.indexOf("\n");
        if(end===0){
            newSt= newSt.substring(end+1);
            end = newSt.indexOf("\n");
        }

        if (newSt[0] === '$') {
            end = newSt.indexOf("\n");
            newSt = newSt.substring(end + 1);
        }

        return newSt.slice(0, 2).trim();
    }

    #extractAndRemoveItems() {
        //Extracting data of Products
        let indexOfAmount = this.content.indexOf("AMOUNT");
        let indexOfSubtotal = this.content.indexOf("Subtotal");
        this.content = this.content.substring(indexOfAmount, indexOfSubtotal);
        let end = this.content.indexOf("\n");
        this.content = this.content.substring(end + 1);

        while (this.content.length > 0) {
            end = this.content.indexOf("\n");
            const productName = this.content.slice(0, end).trim();
            this.content = this.content.substring(end + 1);

            end = this.content.indexOf("\n");
            const productQty = this.content.slice(0, end).trim();
            this.content = this.content.substring(end + 1);

            end = this.content.indexOf("\n");
            const productRate = this.content.slice(0, end).trim();
            this.content = this.content.substring(end + 1);
            end = this.content.indexOf("\n");
            this.content = this.content.substring(end + 1);
            this.items.push({
                productName: productName,
                productQty: productQty,
                productRate: productRate
            })
        }
    }
}

module.exports = Extractor
