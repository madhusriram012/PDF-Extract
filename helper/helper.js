const _ = require("lodash");

class Helper {
    findSimilarTopBoundElements = (elements, bound) => {
        return _.filter(elements, function (o) {
            return o["Bounds"] && o.Bounds.length > 0 && o.Bounds[0] === bound;
        });
    }

    findIndexOfTheTextContains = (elements, text) => {
        return _.findIndex(elements, function (o) {
            return o.Text && o.Text.includes(text)
        });
    }

    getElementTextOrEmpty = (elements, index) => {
        if(index === -1) {
            return ''
        } else {
            return elements[index].Text.trim()
        }
    }

    getElementOrEmpty = (elements, index) => {
        if(index === -1) {
            return ''
        } else {
            return elements[index].trim()
        }
    }
}

module.exports = Helper
