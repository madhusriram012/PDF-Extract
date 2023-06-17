const _ = require("lodash");

class Helper {
    // findSimilarTopBoundElements = (elements, bound) => {
    //     return _.filter(elements, function (o) {
    //         return o.hasOwnProperty("Bounds") && o.Bounds.length > 0 && o.Bounds[0] === bound;
    //     });
    // }
       findSimilarTopBoundElements = (elements, targetBounds) => {
        if (!Array.isArray(elements)) {
            // Handle case when a single element is passed
            elements = [elements];
          }
      
          // Flatten the target bounds array for easier comparison
          const flattenedTargetBounds = _.flatten(targetBounds);
      
          return elements.filter((o) => {
            if (o.Bounds && o.Bounds.length === flattenedTargetBounds.length) {
              // Flatten the bounds array of the current element
              const flattenedBounds = _.flatten(o.Bounds);
      
              // Check if all the flattened bounds match with the target bounds
              return _.isEqual(flattenedBounds, flattenedTargetBounds);
            }
            return false;
          });
      };

    findIndexOfTheTextContains = (elements, text) => {
        if (!Array.isArray(elements)) {
            // Handle case when a single element is passed
            elements = [elements];
          }
      
          let foundIndices = [];
          const searchText = text.toLowerCase();
      
          elements.forEach((o, index) => {
            if (o.Text && o.Text.toLowerCase().includes(searchText)) {
              foundIndices.push(index);
            }
          });
      
          return foundIndices;
    }
}



module.exports = Helper
