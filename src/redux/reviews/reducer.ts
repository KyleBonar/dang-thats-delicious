import { Reducer } from "redux";
import {
  IReviewsState,
  IReviewsAction,
  REVIEWS_ADDED,
  REVIEWS_UPDATED
} from "./types";

const initialState: IReviewsState = {
  allReviewIDs: [],
  byReviewID: {}
};

const reviewReducer: Reducer<IReviewsState> = (
  state: IReviewsState = initialState,
  action: IReviewsAction
): IReviewsState => {
  switch (action.type) {
    case REVIEWS_ADDED: {
      const allReviewIDs = action.allReviewIDs
        ? [
            ...state.allReviewIDs, // old HashIDs
            ...action.allReviewIDs.filter(
              x => state.allReviewIDs.indexOf(x) === -1 // concat only HashID that are not already in the array
            )
          ]
        : [];

      // construct individual components
      const byReviewID = { ...state.byReviewID, ...action.byReviewID }; // concat new review to old

      // construct return object
      const obj: IReviewsState = {
        byReviewID,
        allReviewIDs
      };

      // Return obj
      return obj;
    }
    case REVIEWS_UPDATED: {
      // Simply overwrite old review with the new ones
      const byReviewID = { ...state.byReviewID, ...action.byReviewID };

      // return state
      return { ...state, byReviewID };
    }

    default:
      return state;
  }
};

export default reviewReducer;
