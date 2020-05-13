import { API } from "../../utils/api/API";

import {
  ISaucesReturnAction,
  ISaucesState,
  IQuery,
  SAUCES_ADDED,
  SAUCES_REMOVED,
  IAddSaucesAction,
  SAUCES_UPDATE,
  SAUCES_CLEARED,
  SAUCES_UPDATE_DISPLAYNAME,
  TYPES_ADDED
} from "./types";
import { IReviewsState, IReviewAPI } from "../reviews/types.js";
import Flatn from "../../utils/Flatn/Flatn";

import { addedReviews } from "../reviews/actions";
import { IUser, IUserState } from "../users/types";
import { addUsers } from "../users/actions";
import { MyThunkResult } from "../configureStore";

/** @description Add sauce(s) to array of sauces
 *  @param {Object} byId - dictionary of id => ISauce pairs
 *    @param {ISauce} byId.id - dictionary of id => ISauce pairs
 *  @param {String[]} allIds - array of sauce id's
 *  @param {Object} query - dictionary of queryString => id pairs
 *    @param {String[]} query - dictionary of queryString => id pairs
 *  @param {Number} total - total number of suaces we know about
 *  @return {ISaucesReturnAction} sauce and action type
 */
export const addedSauces = ({
  allSlugs,
  bySlug,
  query,
  total,
  saucesWithNewestReviews,
  newest,
  featured
}: IAddSaucesAction): ISaucesReturnAction => ({
  type: SAUCES_ADDED,
  allSlugs,
  bySlug,
  query,
  total,
  saucesWithNewestReviews,
  newest,
  featured
});

/** @description Update a single user's display name wherever it is found
 *  @param {String} displayName - new person's name
 *  @param {String} oldDisplayName - old person's name
 *  @return {IUserAction} sauce and action type
 */
export const updatedDisplayName = ({
  oldDisplayName,
  displayName
}: {
  oldDisplayName: string;
  displayName: string;
}): ISaucesReturnAction => ({
  type: SAUCES_UPDATE_DISPLAYNAME,
  oldDisplayName,
  displayName
});

/** @description Add sauce(s) to array of sauces
 *  @param {Object} byId - dictionary of id => ISauce pairs
 *    @param {ISauce} byId.id - dictionary of id => ISauce pairs
 *  @param {String[]} allIds - array of sauce id's
 *  @param {Object} query - dictionary of queryString => id pairs
 *    @param {String[]} query - dictionary of queryString => id pairs
 *  @param {Number} total - total number of suaces we know about
 *  @return {ISaucesReturnAction} sauce and action type
 */
export const removedSauces = ({
  allSlugs
}: IAddSaucesAction): ISaucesReturnAction => ({
  type: SAUCES_REMOVED,
  allSlugs
});

/** @description Update specific sauce
 *  @param {ISaucesAction} object - object of sauce information
 *    @param {Object} object.byId - dictionary of id => ISauce pairs
 *    @param {number[]} object.allIds - array of sauce id's
 *  @return {ISaucesAction} sauce and action type
 */
export const updatedSauces = ({
  bySlug
}: IAddSaucesAction): ISaucesReturnAction => ({
  type: SAUCES_UPDATE,
  bySlug
});

/** @description Reset sauces in store
 *  @return {ISaucesAction} sauce and action type
 */
export const saucesCleared = (): ISaucesReturnAction => ({
  type: SAUCES_CLEARED
});

/** @description Add types of sauces to store
 *  @param {String[]} types - array of types
 *  @return {ISaucesAction} sauce and action type
 */
export const typesAdded = (types: string[]): ISaucesReturnAction => ({
  types,
  type: TYPES_ADDED
});

/** @description grab single sauce related to slug
 *  @param {Object} data - object containing slug we are interested in
 *    @param {Object} data.sauce  - sauce container
 *      @param {String} data.sauce.slug - unique sauce slug
 *
 *  @returns {Promise}
 *  @fires sauces.addsauce - add sauce to redux store
 *  @fires reviews.addedReviews - add reviews to redux store
 *  @resolves {Null}
 *
 *  @reject {String} error message
 */
export const getSauceBySlug = ({
  slug
}: {
  slug: string;
}): MyThunkResult<Promise<null>> => async dispatch => {
  const res = await API.sauce.getBySlug({ slug });

  // Pull sauce out
  const { sauce } = res.data;

  // Update sauce and dispatch reviews if we have them
  const reviews: IReviewAPI[] = [...sauce.reviews];
  if (reviews && reviews.length > 0) {
    // Normalize reviews
    const { byReviewID, allReviewIDs } = Flatn.reviews({
      reviews
    });
    // Create obj to redux
    const normalizedReviews: IReviewsState = { byReviewID, allReviewIDs };
    // Push reviews to redux
    dispatch(addedReviews({ reviews: normalizedReviews }));
    // Update reviews on sauce
    sauce.reviews = normalizedReviews.allReviewIDs;
  }

  // Now we need to normalize author and update sauce
  // Grab author from sauce
  const author: IUser = sauce.author;
  // grab the author from reviews
  const usersFromReviews = reviews.map((review: any) => {
    return review.author;
  });
  const normalizedUser: IUserState = Flatn.users({
    users: [author, ...usersFromReviews]
  });
  // Dispatch user
  dispatch(addUsers({ user: normalizedUser }));

  // Update sauce w/ author and set _full to true
  sauce.author = author.displayName;
  // Set here for Flatn will auto-set to false
  sauce._full = true;

  const { allSlugs, bySlug }: ISaucesState = Flatn.saucesArr({
    sauces: [sauce]
  });
  // optimize images by adjusting image url
  if (bySlug) {
    Object.keys(bySlug).forEach(key => {
      // sanity check
      const photoURL: string | undefined = bySlug[key].photo;
      if (!photoURL) {
        return;
      }

      const index = photoURL.indexOf("/upload/") + 8;
      bySlug[key].photo =
        photoURL.substr(0, index) +
        "q_auto,w_434,h_651/" +
        photoURL.substr(index);
    });
  }

  // Grab newest reviews
  const { saucesWithNewestReviews } = res.data;

  // Lastly dispatch sauce
  dispatch(addedSauces({ allSlugs, bySlug, saucesWithNewestReviews }));
  return null;
};

/** @description Add sauce to DB
 *  @param {FormData} formdata - Form Data that has been JSONified
 *    @param {Object} formdata.user - author of the sauce
 *      @param {String} formdata.user.token - unique string
 *    @param {ISauce} formdata.sauce - sauce object
 *  @returns {Promise}
 *    @returns {String} slug - unique sauce slug
 */
export const addSauce = ({ formData }: { formData: FormData }) => async (
  dispatch: any
): Promise<string> => {
  return API.sauce.add({ formData }).then((res: any) => {
    const { slug } = res.data.sauce;

    return slug;
  });
};

/** @description Edit a sauce
 *  @param {FormData} formdata - Form Data that has been JSONified
 *    @param {String} formdata.user.token - unique user token
 *    @param {ISauce} formdata.sauce - sauce object
 *  @returns {Promise}
 *    @returns {Object} response object
 */
export const editSauce = ({ formData }: { formData: FormData }) => async (
  dispatch: any
): Promise<string> => {
  return API.sauce.update({ formData }).then((res: any) => {
    return res;
  });
};

/** @description Grab sauces according to query
 *  @param {String?} query - optional query string to search for
 *  @returns {Promise}
 *  @fires sauces.addedSauces - add sauces to redux store
 *  @resolves {NULL}
 */
export const getSaucesByQuery = ({
  query
}: {
  query: string;
}): MyThunkResult<Promise<null>> => async dispatch => {
  const res = await API.sauces.getByQuery({ query });

  // immediately grab total and remove from obj
  const totalForQuery = res.data.totalForQuery;

  // Normalize sauces
  const { allSlugs, bySlug }: ISaucesState = Flatn.saucesArr({
    sauces: res.data.sauces
  });
  // optimize images by adjusting image url
  if (bySlug) {
    Object.keys(bySlug).forEach(key => {
      // sanity check
      const photoURL: string | undefined = bySlug[key].photo;
      if (!photoURL) {
        return;
      }

      const index = photoURL.indexOf("/upload/") + 8;
      bySlug[key].photo =
        photoURL.substr(0, index) +
        "q_auto,w_434,h_651/" +
        photoURL.substr(index);
    });
  }

  // format query as expected
  const _query: IQuery = {};
  _query[query] = { sauces: allSlugs || [], total: totalForQuery };

  // dispatch sauce
  dispatch(
    addedSauces({ allSlugs, bySlug, query: _query, total: res.data.total })
  );
  return null;
};

/** @description Grab newest sauces
 *  @returns {Promise}
 *  @fires sauces.addedSauces - add sauces to redux store
 *  @resolves {NULL}
 */
export const getSaucesByNewest = (): MyThunkResult<
  Promise<null>
> => async dispatch => {
  const res = await API.sauces.getByNewest();

  // Normalize sauces
  const { allSlugs, bySlug }: ISaucesState = Flatn.saucesArr({
    sauces: res.data.saucesByNewest
  });
  // optimize images by adjusting image url
  if (bySlug) {
    Object.keys(bySlug).forEach(key => {
      // sanity check
      const photoURL: string | undefined = bySlug[key].photo;
      if (!photoURL) {
        return;
      }

      const index = photoURL.indexOf("/upload/") + 8;
      bySlug[key].photo =
        photoURL.substr(0, index) +
        "q_auto,w_434,h_651/" +
        photoURL.substr(index);
    });
  }

  // dispatch sauces
  dispatch(addedSauces({ allSlugs, bySlug, newest: allSlugs }));
  return null;
};

/** @description Grab featured sauces
 *  @returns {Promise}
 *  @fires sauces.addedSauces - add sauces to redux store
 *  @resolves {NULL}
 */
export const getSaucesByFeatured = (): MyThunkResult<Promise<null>> => {
  return async dispatch => {
    const res = await API.sauces.getByFeatured();

    // Normalize sauces
    const { allSlugs, bySlug }: ISaucesState = Flatn.saucesArr({
      sauces: res.data.saucesByFeatured
    });

    // optimize images by adjusting image url
    if (bySlug) {
      Object.keys(bySlug).forEach(key => {
        // sanity check
        const photoURL: string | undefined = bySlug[key].photo;
        if (!photoURL) {
          return;
        }

        const index = photoURL.indexOf("/upload/") + 8;
        bySlug[key].photo =
          photoURL.substr(0, index) +
          "q_auto,w_434,h_651/" +
          photoURL.substr(index);
      });
    }

    // dispatch sauces
    dispatch(addedSauces({ allSlugs, bySlug, featured: allSlugs }));
    return null;
  };
};

/** @description Update sauce in DB
 *  @param {FormData} data - Form Data that has been JSONified
 *    @param {Object} data.user - author of the sauce
 *      @param {String} data.user.token - unique string
 *    @param {ISauce} data.sauce - sauce object
 *    @param {IReview} review - user review object
 *    @param {Blob?} photo - actual photo to upload
 *  @returns {Promise}
 *    @returns {null}
 */
// export const updateSauce = ({
//   data
// }: {
//   data: {
//     user: { token: string };
//     sauce: ISauce;
//     review: IReview;
//     photo?: Blob;
//   };
// }) => (dispatch: any) => {
//   return api.sauce.update(data).then((res: any) => {
//     // dispatch(updatedSaucesItems({ sauce }));
//   });
// };

// export const getSaucesByTag = data => dispatch =>
//   api.sauces.getSaucesByTag(data).then(res => {
//     dispatch(saucesByTagFound({ sauces: res.sauces }));
//     return res;
//   });

// export const getSaucesBySearch = searchValue => dispatch =>
//   api.sauces.search(searchValue).then(
//     res =>
//       // dipatch event here in future (?)
//       res
//   );
