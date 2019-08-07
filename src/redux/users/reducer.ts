import {
  IUserState,
  IUserAction,
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  USER_ADDED,
  USER_CLEARED
} from "./types";
import { Reducer } from "redux";

const initialState: IUserState = {
  byDisplayName: {},
  allDisplayNames: [""]
};

const userReducer: Reducer<IUserState> = (
  state: IUserState = initialState,
  action: IUserAction
): IUserState => {
  switch (action.type) {
    case USER_LOGGED_IN: {
      console.log(action);
      // Grab values
      const { token, displayName, avatarURL } = action;

      // Make sure we have each value
      if (!token || !displayName || !avatarURL) return state;

      // Set user.self info
      return {
        ...state,
        self: {
          token,
          displayName,
          avatarURL
        }
      };
    }
    case USER_LOGGED_OUT: {
      // remove all user.self stuff
      return { ...state, self: {} };
    }
    case USER_ADDED: {
      // This will concat onto dictionary and overwrite an old key if new appears
      const byDisplayName = { ...state.byDisplayName, ...action.byDisplayName };

      // Make sure we don't have undefined here.
      const stateAllDisplayNames = state.allDisplayNames || [];
      const actionAllDisplayNames = action.allDisplayNames || [];
      const allDisplayNames = [
        ...stateAllDisplayNames, // old DisplayNames
        ...actionAllDisplayNames.filter(
          x => stateAllDisplayNames.indexOf(x) === -1 // concat only DisplayName that are not already in the array
        )
      ];
      return { ...state, byDisplayName, allDisplayNames };
    }
    case USER_CLEARED: {
      return initialState;
    }

    default:
      return state;
  }
};

export default userReducer;
