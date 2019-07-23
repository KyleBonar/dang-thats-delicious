import { API } from "../../utils/api/API";
import {
  IRegisterUser,
  ILoginUser,
  IUserState,
  IUserAction,
  USER_ADDED,
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  IUserUpdateEmail
} from "./types";
import { MyThunkResult } from "../configureStore";

export const addUsers = ({ user }: { user: IUserState }): IUserAction => {
  return {
    type: USER_ADDED,
    byDisplayName: user.byDisplayName,
    allDisplayNames: user.allDisplayNames
  };
};

// action to log user in
export const userLoggedIn = ({
  token,
  displayName
}: {
  token: string;
  displayName: string;
}) => ({
  type: USER_LOGGED_IN,
  token,
  displayName
});

// action to log user out
export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

// export const gotUserInfo = ({ _id, email, name }) => ({
//   type: "USERS_SET_INFO",
//   _id,
//   email,
//   name
// });

/** @description update a specific user's DB info
 *  @param {Object} credentials - data container
 *    @param {Object} credentials.user - user container
 *      @param {String} credentials.user.token - unique user identifier
 *      @param {String} credentials.user.name - new name to update to
 *      @param {String} credentials.user.email - new email to update to
 *  @fires users#gotUserInfo - set user.self properties
 *  @fires flash#flashSuccess - show user success message
 *  @returns {Promise}
 *    @returns {NULL}
 */
// export const updateUser = credentials => dispatch =>
//   api.user.update(credentials).then(res => {
//     const { email, name } = res.user;
//     // update by setting again
//     dispatch(gotUserInfo({ email, name }));
//     const text = `Your name was saved as: ${name} and your email was saved as: ${email}.`;
//     dispatch(flashSuccess({ text }));
//     return res.user;
//   });

/** @description pass credentials to server to register user
 *  @param {IRegisterUser} credentials - credentials object
 *  @fires user#userLoggedIn - set self.token in redux store
 *  @return {Promise} Promise
 *  @resolves {Object} token - unique user token
 *
 *  {String} token - unique user token
 *
 *  {String} displayName - unique user displayName
 *
 *  @reject {String} error message
 */
export const register = ({ credentials }: { credentials: IRegisterUser }) => (
  dispatch: any
): Promise<object> => {
  return API.user.register(credentials).then(res => {
    // Grab token and name
    const { token, name }: { token?: string; name?: string } = res.data.user;

    // If we can't find token, stop
    if (!token) {
      throw new Error("Unable to verify your login. Please try again.");
    }

    // if name is undefined or empty string  we should look in
    // the return object to see if displayName was sent instead or set to "Me"
    const displayName =
      name === undefined || name.length === 0
        ? res.data.user.displayName || "Me"
        : name;

    // Dispatch user login
    dispatch(userLoggedIn({ token, displayName }));

    return { token, displayName };
  });
};

/** @description pass credentials to server to log user in
 *  @param {ILoginUser} credentials - credentials object
 *  @fires user#userLoggedIn - set self.token in redux store
 *  @return {Promise} Promise
 *  @resolves {Object} token - unique user token
 *
 *  {String} token - unique user token
 *
 *  {String} displayName - unique user displayName
 *
 *  @reject {String} error message
 */
export const login = ({ credentials }: { credentials: ILoginUser }) => (
  dispatch: any
): Promise<object> => {
  return API.user.login(credentials).then(res => {
    // Grab token and name
    const { token, name }: { token?: string; name?: string } = res.data.user;

    // If we can't find token, stop
    if (!token) {
      throw new Error("Unable to verify your login. Please try again.");
    }

    // if name is undefined or empty string  we should look in
    // the return object to see if displayName was sent instead or set to "Me"
    const displayName =
      name === undefined || name.length === 0
        ? res.data.user.displayName || "Me"
        : name;

    // Dispatch user login
    dispatch(userLoggedIn({ token, displayName }));

    return { token, displayName };
  });
};

/** @description logs the user out by resetting redux store
 *  @fires auth#userLoggedOut - resets information in redux users.self
 *  @returns {NULL}
 */
export const logout = () => (dispatch: any) => {
  // remove users.self info
  dispatch(userLoggedOut());
};
/** @description pass credentials to server to log user in
 *  @param {Object} data - user information container
 *  @param {string} data.user.token - unique user string
 *  @param {string?} data.displayName - person we are interested in
 *  @return {Promise} Promise
 *  @resolves {Null}
 *
 *  @reject {String} error message
 */
export const getInfo = ({
  data
}: {
  data: { user: { token: string }; displayName: string };
}): MyThunkResult<Promise<null>> => async dispatch => {
  await API.user.getInfo({ data });

  return null;
};

/** @description pass credentials to server to log user in
 *  @param {IUserUpdateEmail} data - container for user information
 *  @param {string} data.user.token - user token
 *  @param {string} data.user.email - new email address
 *  @param {string} data.user.confirmEmail - confirmed email adress
 *  @param {string} data.user.password - user password
 *  @fires user#userUpdateEmail - set self.token in redux store
 *  @return {Promise} Promise
 *  @resolves {Object} token - unique user token
 *
 *  {String} token - unique user token
 *
 *  {String} displayName - unique user displayName
 *
 *  @reject {String} error message
 */
export const updateEmail = ({
  data
}: {
  data: IUserUpdateEmail;
}): MyThunkResult<Promise<null>> => async dispatch => {
  await API.user.updateEmail({ data });

  // We will have new token so need to update
  // Dispatch user login
  // dispatch(userLoggedIn({ token, displayName }));

  return null;
};
