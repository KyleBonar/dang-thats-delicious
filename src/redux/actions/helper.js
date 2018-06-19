// TODO: Refactor this monster.
/** @description Flattens sauce as per https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape.
 *  @param {Object[]} sauces[]  - to be flattened
 *    @param {String} sauces[]._id - unique identifier
 *    @param {String} sauces[].description - description of sauce
 *    @param {String} sauces[].name - name of the sauce
 *    @param {String} sauces[].photo - name of the photo
 *    @param {String[]} sauces[].tags[] - tags assigned to sauce
 *    @param {Object?} sauces[].author - optional author of sauce
 *      @param {String} sauces[].author._id - unique identifier
 *      @param {String} sauces[].author.name - author name
 *    @param {Object[]} sauces[].reviews[] - reviews for sauce
 *      @param {String} sauces[].reviews[]._id - unique identifier
 *      @param {String?} sauces[].reviews[].text - optional actual review
 *      @param {Integer?} sauces[].reviews[].rating - optional number of stars given
 *      @param {Object?}  sauces[].reviews[].author - optional author of the review
 *        @param {String?} sauces[].reviews[].author._id - optional unique author string
 *      @param {String?} sauces[].reviews[].sauce - optional sauce the review is for
 *        @param {String?} sauces[].reviews[].sauce._id - optional unique sauce string
 *  @returns {Object} sauces, authors, reviews
 */
export const flattenSauces = sauces => {
  // hold all results
  const res = {};

  // init sauces
  res.sauces = {};
  res.sauces.byId = {};
  res.sauces.allIds = [];

  // init authors
  res.authors = {};
  res.authors.byId = {};
  res.authors.allIds = [];

  // init reviews
  res.reviews = {};
  res.reviews.byId = {};
  res.reviews.allIds = [];
  sauces.forEach(sauce => {
    // flatten sauce
    res.sauces.byId[sauce._id] = sauce;

    // add sauce id to array so long as it doesn't already exist in the array
    // (there should never be two sauces with same _id but this is inexpensive safety check)
    if (!res.sauces.allIds.includes(sauce._id))
      res.sauces.allIds.push(sauce._id);

    // flatten authors
    res.authors.byId[sauce.author._id] = {
      _id: sauce.author._id,
      name: sauce.author.name
    };

    // add author id to array if doesn't already exist in array
    if (!res.authors.allIds.includes(sauce.author._id))
      res.authors.allIds.push(sauce.author._id);

    if (sauce.reviews && sauce.reviews.length > 0) {
      // loop through array of reviews
      sauce.reviews.forEach(review => {
        // flatten review
        res.reviews.byId[review._id] = review;

        // add review id to array if it doesn't already exist in array
        if (!res.reviews.allIds.includes(review._id)) {
          res.reviews.allIds.push(review._id);
        }
      });
    }
  });

  return res;
};

/** @description  checks to make sure object has data inside .byId and .allIds
 *  @param {Object} obj - object to check
 *    @param {Object} obj.allIds - object of normalized keys
 *    @param {String[]} obj.allIds[] - array of normalized keys
 *  @returns {Boolean} if obj has both
 */
export const flatChecker = obj => {
  // make sauces were flattened
  if (Object.keys(obj.byId).length === 0 || obj.allIds.length === 0) {
    // TODO: proper error here
    // console.log("object is not flattened");
    return false;
  }

  return true;
};

/** @description removes duplicate values from array
 *  @param {String|Integer[]} arr - array to remove duplciates from
 *  @returns {String|Integer[]} array of only uniques
 */
export const uniq = arr => {
  const seen = {};
  return arr.filter(
    item => (seen[item] === true ? false : (seen[item] = true))
  );
};
