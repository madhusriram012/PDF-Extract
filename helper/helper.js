const _ = require("lodash");

class Helper {
    findSimilarTopBoundElements = (elements, bound) => {
        return _.filter(elements, function (o) {
            return o.Bounds[0] === bound;
        });
    }

    findIndexOfTheTextContains = (elements, text) => {
        return _.findIndex(elements, function (o) {
            return o.Text && o.Text.includes(text)
        });
    }
}

module.exports = Helper
