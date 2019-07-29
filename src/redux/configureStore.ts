import { createStore, applyMiddleware, combineReducers, Action } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";

import flashMessage from "./flashMessage/reducer";
import sauces from "./sauces/reducer";
import reviews from "./reviews/reducer";
import users from "./users/reducer";
import { ISauce } from "./sauces/types";
import { IQuery } from "./sauces/types";
import { IUser } from "./users/types";
import { IReview } from "./reviews/types";
import { IFlashState } from "./flashMessage/types";
import Auth from "../utils/Auth/Auth";

const rootReducer = combineReducers({
  flashMessage,
  sauces,
  reviews,
  users
});

export interface AppState {
  sauces: {
    allSlugs?: string[];
    bySlug?: { [key: string]: ISauce };
    total?: number;
    query?: IQuery;
    types: string[];
    orders: string[];
    saucesWithNewestReviews: [];
    newest: [];
    featured: [];
  };
  users: {
    self: { token?: string; displayName?: string; avatar?: string };
    byDisplayName?: { [key: string]: IUser };
    allDisplayNames?: string[];
  };
  reviews: {
    byReviewID?: { [key: string]: IReview };
    allReviewIDs?: string[];
  };
  flashMessage: IFlashState;
}

export const configureStore = () => {
  // was of type 'object'
  const initialState: AppState = {
    sauces: {
      allSlugs: [],
      bySlug: {},
      total: 0,
      query: {},
      types: [
        "All",
        "Hot Sauce",
        "BBQ Sauce",
        "Gravy",
        "Marinade",
        "Salsa",
        "Meat Sauce"
      ],
      orders: ["Newest", "Name", "Times Reviewed", "Avg Rating"],
      saucesWithNewestReviews: [],
      newest: [],
      featured: []
    },
    users: {
      self: {
        token: Auth.isUserAuthenticated() ? Auth.getToken() : undefined,
        displayName: Auth.isUserAuthenticated ? Auth.getName() : undefined
      },
      byDisplayName: {},
      allDisplayNames: []
    },
    reviews: { byReviewID: {}, allReviewIDs: [] },
    flashMessage: { isVisible: false, type: null, text: null, slug: null }
  };

  if (process.env.NODE_ENV === "production") {
    return createStore(rootReducer, initialState, applyMiddleware(thunk));
  } else {
    return createStore(
      rootReducer,
      initialState,
      composeWithDevTools(applyMiddleware(thunk))
    );
  }
};

// Defining thunk properties
export type MyThunkResult<R> = ThunkAction<R, AppState, undefined, Action>;
// It is important to use Action as last type argument, does not work with any.
export type MyThunkDispatch = ThunkDispatch<AppState, undefined, Action>;
