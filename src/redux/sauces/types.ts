import { IReview } from "../reviews/types";
import { IUserRef } from "../users/types";

export interface ISauce {
  _id?: number;
  _addedToStore?: number; // Unix time added to redux store
  _full?: boolean; // Whether we have full sauce or partial
  name: string;
  ingredients: string;
  author: string;
  created: Date;
  types?: string[];
  maker: string;
  description: string;
  photo?: string;
  shu?: number | string;
  reviews?: string[];
  city?: string;
  state?: string;
  country?: string;
  slug?: string;
}

// Trimmed down for reference only
export interface ISauceRef {
  _id?: number | string;
  slug: string;
}

// Used for action emitters and reducer
export interface ISaucesAction {
  type: string;
  total?: number;
  query?: IQuery;
  bySlug?: { [key: string]: ISauce };
  allSlugs?: string[];
}

// Used for redux state
export interface ISaucesState {
  allSlugs: string[];
  bySlug?: { [key: string]: ISauce };
  total?: number;
  query?: IQuery;
}

export interface IQuery {
  [key: string]: { sauces: string[] };
}

// Use const enums for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
export const enum SaucesActionTypes {
  SAUCES_ADDED = "@@sauces/SAUCES_ADDED",
  UPDATE_SAUCE = "@@sauces/UPDATE_SAUCE",
  SAUCES_BY_TAG_FOUND = "@@sauces/SAUCES_BY_TAG_FOUND",
  SAUCE_FOUND = "@@sauces/SAUCE_FOUND"
}
