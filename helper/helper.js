const _ = require("lodash");

class Helper {
    findSimilarTopBoundElements = (elements, bound) => {
        return _.filter(elements, function (o) {
            return o["Bounds"] && o.Bounds.length > 0 && o.Bounds[0] === bound;
        });
    }

    findElementsWithTables = (elements, rowsGreaterThan, colsEquals) => {
        return _.filter(elements, function (o) {
            return o["attributes"] && o.attributes["NumCol"] && o.attributes["NumRow"] > rowsGreaterThan && o.attributes["NumCol"] === colsEquals;
        });
    }

    findIndexOfTheTextContains = (elements, text) => {
        return _.findIndex(elements, function (o) {
            return o.Text && o.Text.includes(text)
        });
    }

    findIndexOfTheArrayContains = (elements, text) => {
        return _.findIndex(elements, function (o) {
            return o && o.includes(text)
        });
    }
    findIndexOfThePathContains = (elements, path) => {
        return _.findIndex(elements, function (o) {
            return o.path && o.path.includes(path)
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
