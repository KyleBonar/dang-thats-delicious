import { API } from "../../utils/api/API";
import { IRegisterUser, UsersActionTypes, ILoginUser } from "./types";

// export const addUsers = ({ users }) => ({
//   type: "USERS_ADDED",
//   users
// });

export const userLoggedIn = ({
  token,
  displayName
}: {
  token: string;
  displayName: string;
}) => ({
  type: UsersActionTypes.USER_LOGGED_IN,
  token,
  displayName
});

// export const gotUserInfo = ({ _id, email, name }) => ({
//   type: "USERS_SET_INFO",
//   _id,
//   email,
//   name
// });

/** @description Grab all sauces available (will limit this to only set amount at a time in future)
 *  @param {Object} user - API expects a specific format
 *    @param {String} user.token - JWT string
 *  @param {function} dispatch - dispatch action
 *  @return {NULL}
 */
// export const getHearts = credentials => dispatch =>
//   api.user.getHearts(credentials).then(res => {
//     const hearts = res.data.hearts.map(heart => heart._id);
//     dispatch(gotHearts({ hearts }));
//   });

/** @description add/remove sauce from user's array of hearted sauces
 *  @param {Object} data - API expects specific format
 *    @param {Object} user - user object
 *      @param {String} token - JWT string
 *    @param {Object} sauce - sauce object
 *      @param {String} _id - sauce identifier
 *  @returns {NULL}
 */
// export const toggleHeart = data => dispatch =>
//   api.user.toggleSauce(data).then(res => {
//     dispatch(toggledHeart({ sauce: res.data.sauce }));
//   });

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

/** @description gets basic information on a specifc user
 *  @param {Object} credentials - container
 *  @param {Object} credentials.user - user information container
 *    @param {String} credentials.user.token - unique user identifier
 *  @fires users#gotUserInfo - set user.self properties
 *  @returns {Promise}
 *    @returns {NULL}
 */
// export const getInfo = credentials => dispatch =>
//   api.user.getInfo(credentials).then(res => {
//     const { _id, email, name } = res.data.user;
//     dispatch(gotUserInfo({ _id, email, name }));
//   });

/** @description pass credentials to server to register user
 *  @param {IRegisterUser} credentials - credentials object
 *  @fires user#userLoggedIn - set self.token in redux store
 *  @return {Promise}
 *    @return {NULL}
 */
export const register = ({ credentials }: { credentials: IRegisterUser }) => (
  dispatch: any
): Promise<any> => {
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
  });
};

/** @description pass credentials to server to log user in
 *  @param {ILoginUser} credentials - credentials object
 *  @fires user#userLoggedIn - set self.token in redux store
 * @return {Promise}
 *    @return {NULL}
 */
export const login = ({ credentials }: { credentials: ILoginUser }) => (
  dispatch: any
): Promise<any> => {
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
  });
};
