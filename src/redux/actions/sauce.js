import api from "../../api/api";
import { flashSuccess } from "./flash";
import { addSingleSauce, updateSaucesItem, flattenSauces } from "./sauces";
import { addReviews } from "./review";

//Not sure what I want to do with this yet...
export const sauceAdded = () => ({
  type: "SAUCE_ADDED"
});

/** @description Action emitter for when a single sauce is found
 *  @param Object, sauce related information
 *  @returns Object, has sauce info and action type
 */
export const sauceFound = ({ sauce }) => ({
  type: "SAUCE_FOUND",
  sauce
});

export const sauceUpdated = () => ({
  type: "SAUCE_UPDATED"
});

//clear sauce from redux store
export const cleanedUpSauce = () => ({
  type: "CLEANED_UP_SAUCE"
});

/** @description Get relevant sauce information from sauce id. Dispatches redux action emitter.
 *  @param Object, pass to API class
 *  @returns Promise
 *  @returns Object, sauce
 */
export const getSauceById = data => dispatch => {
  return api.sauce.getById(data).then(res => {
    const { sauces, reviews, authors } = flattenSauces([res.data]);
    dispatch(addSingleSauce({ sauce: sauces }));
    dispatch(addReviews({ reviews }));
    return res;
  });
};

export const getSauceBySlug = data => dispatch => {
  return api.sauce.getBySlug(data).then(res => {
    dispatch(sauceFound({ sauce: res.sauce }));
    return res;
  });
};

export const updateSauce = data => dispatch => {
  return api.sauce.update(data).then(res => {
    //remove sauce from redux
    dispatch(sauceUpdated());
    //update sauce in redux sauces array
    dispatch(updateSaucesItem({ sauce: res.sauce }));
    return res;
  });
};

export const cleanUpSauce = () => dispatch => {
  dispatch(cleanedUpSauce());
};
