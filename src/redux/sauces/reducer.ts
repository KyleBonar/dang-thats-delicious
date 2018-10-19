import { Reducer } from "redux";
import { ISaucesState, IAction, SaucesActionTypes } from "./types";

const initialState: ISaucesState = {
  allIds: [],
  byId: {},
  total: 0,
  query: {}
};

const sauceReducer: Reducer<ISaucesState> = (
  state: ISaucesState = initialState,
  action: IAction
): ISaucesState => {
  switch (action.type) {
    case SaucesActionTypes.SAUCES_ADDED:
      // Look for null cases first
      if (!action.sauces || !action.sauces.allIds || !action.query) {
        return state;
      }

      // Return new state.
      return {
        ...state,
        byId: { ...state.byId, ...action.sauces.byId },
        allIds:
          "allIds" in state && state.allIds.length > 0
            ? [...state.allIds, ...action.sauces.allIds]
            : [...action.sauces.allIds],
        query:
          action.query === null // If the query is null, leave as is, else concatinate
            ? state.query
            : {
                ...state.query,
                ...action.query
              },
        total: action.total || state.total
      };

    // Will come back to this
    // case SaucesActionTypes.UPDATE_SAUCE:
    //   // update single sauces item if sauces is already set
    //   return state
    //     ? state.map(sauce => {
    //         if (sauce._id === action.sauce._id) {
    //           action.sauce.author = sauce.author;
    //           return action.sauce;
    //         }
    //         return sauce;
    //       })
    //     : [];
    case SaucesActionTypes.SAUCES_BY_TAG_FOUND:
      return state; // Will come back to this

    // TODO: add sauce to .byIds and add id to .allIds
    case SaucesActionTypes.SAUCE_FOUND:
      return state; // Will come back to this

    default:
      return state;
  }
};

export default sauceReducer;
