import axios, { AxiosPromise } from "axios";
import {
  IRegisterUser,
  ILoginUser,
  IUserUpdateEmail,
  IUserUpdatePassword,
  IUserUpdateDisplayName
} from "../../redux/users/types";
import { IReview } from "../../redux/reviews/types";

export const host =
  process.env.API_ENV === "prod"
    ? "https://sauceforyourthoughts.com"
    : "http://localhost:7777";

export const API = {
  user: {
    /** @description Add new user to DB
     *  @param {IRegisterUser} credentials - user credentials
     *  @return {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  {String} res.data.msg - message accociated with isGood
     *
     *  {Object} res.data.user - user data
     *
     *  {String} res.data.user.token - unique user JWT
     *
     *  {String} res.data.user.name - user's display name
     *
     *  {String} res.data.email - user's email
     *  @reject {String} error message
     */
    register: (credentials: IRegisterUser): AxiosPromise => {
      return axios.post(`${host}/api/user/register`, credentials).then(res => {
        if (res.data.isGood) {
          return res;
        }
        throw new Error(res.data.msg);
      });
    },

    /** @description Add new user to DB
     *  @param {ILoginUser} credentials - user credentials
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  {String} res.data.msg - message accociated with isGood
     *
     *  {Object} res.data.user - user data
     *
     *  {String} res.data.user.token - unique user JWT
     *
     *  {String} res.data.user.name - user's display name
     *
     *  {String} res.data.email - user's email
     *  @reject {String} error message
     */
    login: (credentials: ILoginUser): AxiosPromise => {
      return axios.post(`${host}/api/user/login`, credentials).then(res => {
        if (res.data.isGood) {
          return res;
        }
        throw new Error(res.data.msg);
      });
    },

    /** @description Get user information from server
     *  @param {string} token - user token
     *  @param {string?} displayName - specific user interested in
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  {String} res.data.msg - message accociated with isGood
     *
     *  {Array} res.data.user[] - user data
     *
     *  {String} res.data.user[].displayName - user's display name
     *
     *  {String} res.data.user[].email - user's email
     *
     *  @reject {String} error message
     */
    getInfo: ({
      data
    }: {
      data: { user: { token: string }; displayName?: string };
    }): AxiosPromise => {
      return axios.post(`${host}/api/user/getInfo`, data).then(res => {
        if (res.data.isGood) {
          return res;
        }
        throw new Error(res.data.msg);
      });
    },
    /** @description Update a user's email
     *  @param {IUserUpdateEmail} data - container for user information
     *  @param {string} data.user.token - user token
     *  @param {string} data.user.email - new email address
     *  @param {string} data.user.confirmEmail - confirmed email adress
     *  @param {string} data.user.password - user password
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  {String} res.data.msg - message accociated with isGood
     *
     *  {Object} res.data.user - user data object
     *
     *  {String} res.data.user.token - unique user token
     *
     *  {String} res.data.user.displayName - user's display name
     *
     *  {String} res.data.user.email - user's email
     *
     *  @reject {String} error message
     */
    updateEmail: ({ data }: { data: IUserUpdateEmail }): AxiosPromise => {
      return axios.post(`${host}/api/user/update/email`, data).then(res => {
        if (res.data.isGood) {
          return res;
        }
        throw new Error(res.data.msg);
      });
    },
    /** @description Call Server to update password
     *  @param {IUserUpdatePassword} data - container for user information
     *  @param {string} data.user.token - user token
     *  @param {string} data.user.password - original password
     *  @param {string} data.user.newPassword - new user password
     *  @param {string} data.user.confirmNewPassword - confirm new user password
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  {String} res.data.msg - message accociated with isGood
     *
     *  @reject {String} error message
     */
    updatePassword: ({ data }: { data: IUserUpdatePassword }): AxiosPromise => {
      return axios.post(`${host}/api/user/update/password`, data).then(res => {
        if (res.data.isGood) {
          return res;
        }
        throw new Error(res.data.msg);
      });
    },
    /** @description Call Server to update display name
     *  @param {IUserUpdateDisplayName} data - container for user information
     *  @param {string} data.user.token - user token
     *  @param {string} data.user.password - original password
     *  @param {string} data.user.displayName - new user display name
     *  @param {string} data.user.confirmDisplayName - confirm new display name
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  {String} res.data.msg - message accociated with isGood
     *
     *  @reject {String} error message
     */
    updateDisplayName: ({
      data
    }: {
      data: IUserUpdateDisplayName;
    }): AxiosPromise => {
      return axios
        .post(`${host}/api/user/update/displayname`, data)
        .then(res => {
          if (res.data.isGood) {
            return res;
          }
          throw new Error(res.data.msg);
        });
    }
  },
  sauce: {
    /** @description Add sauce to DB
     *  @param {FormData} formData object w/ all required suace and user information
     *    @param {String} formData.user.token user's unique token
     *    @param {ISauce} formData.sauce - sauce being added
     *    @param {File} formData.image - image associated w/ sauce
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  {Object} res.data.sauce - sauce data
     *
     *  {String} res.data.sauce.slug - unique sauce slug
     *  @reject {String} error message
     */
    add: ({ formData }: { formData: FormData }): AxiosPromise => {
      return axios
        .post(`${host}/api/sauce/add`, formData, {
          headers: {
            "content-type": `multipart/form-data`
          }
        })
        .then(res => {
          if (res.data.isGood) {
            return res;
          }
          throw new Error(res.data.msg);
        });
    },

    /** @description Find sauce information given the sauce's slug
     *  @param {String} slug sauce's unique slug
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  {ISauce} res.data.sauce - sauce data
     *
     *  {Object[]} res.data.related - array of related sauces
     *
     *  @reject {String} error message
     */
    getBySlug: ({ slug }: { slug: string }): AxiosPromise => {
      return axios.get(`${host}/api/sauce/get/by/slug/?s=${slug}`).then(res => {
        if (res.data.isGood) {
          return res;
        }
        throw new Error(res.data.msg);
      });
    }
  },
  sauces: {
    /** @description Grab sauces from DB
     *  @param {String?} query string with parsable params
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  {Object[]} res.data.sauces - Array of sauces
     *
     *  {Number} res.data.count - how many sauces are in DB
     *
     *  @reject {String} error message
     */
    getByQuery: ({ query }: { query?: string }): AxiosPromise => {
      // Assign default query if falsy
      if (!query) query = "type=all&order=newest&page=1&lim=8";
      return axios.get(`${host}/api/sauces/getByQuery/?${query}`).then(res => {
        if (res.data.isGood) {
          return res;
        }
        throw new Error(res.data.msg);
      });
    },
    /** @description Grab newest sauces from DB
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  {Object[]} res.data.saucesByNewest - Array of sauces
     *
     *  @reject {String} error message
     */
    getByNewest: (): AxiosPromise => {
      return axios.get(`${host}/api/sauces/get/by/newest/`).then(res => {
        if (res.data.isGood) {
          return res;
        }
        throw new Error(res.data.msg);
      });
    },
    /** @description Grab featured sauces from DB
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  {Object[]} res.data.saucesByFeatured - Array of sauces
     *
     *  @reject {String} error message
     */
    getByFeatured: (): AxiosPromise => {
      return axios.get(`${host}/api/sauces/get/by/featured/`).then(res => {
        if (res.data.isGood) {
          return res;
        }
        throw new Error(res.data.msg);
      });
    }
  },

  review: {
    /** @description Add review to DB
     *  @param {Object} data data object
     *    @param {string} data.user.token user's unique token
     *    @param {IReview} data.review - review being added
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  @reject {String} error message
     */
    add: (data: { user: { token: string }; review: IReview }): AxiosPromise =>
      axios.post(`${host}/api/review/add`, data).then(res => {
        if (res.data.isGood) {
          return res;
        }
        throw new Error(res.data.msg);
      }),
    /** @description Get review from server
     *  @param {Object} data data object
     *    @param {string} data.user.token user's unique token
     *    @param {string} data.sauce.slug - unique sauce slug
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  {Object} res.data.review - review information
     *
     *  @reject {String} error message
     */
    get: (data: {
      user: { token: string };
      sauce: { slug: string };
    }): AxiosPromise =>
      axios.post(`${host}/api/review/get`, data).then(res => {
        if (res.data.isGood) {
          return res.data.sauce.reviews[0];
        }
        throw new Error(res.data.msg);
      }),
    /** @description Add review to DB
     *  @param {Object} data data object
     *    @param {string} data.user.token user's unique token
     *    @param {IReview} data.review - review info
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  @reject {String} error message
     */
    edit: (data: { user: { token: string }; review: IReview }): AxiosPromise =>
      axios.post(`${host}/api/review/edit`, data).then(res => {
        if (res.data.isGood) {
          return res;
        }
        throw new Error(res.data.msg);
      }),
    /** @description Check if user is eligible to submit a review or not (maybe suace is private or have already submitted one)
     *  @param {Object} data data object
     *    @param {string} data.user.token user's unique token
     *    @param {string} data.sauce.slug unique sauce string
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  {Boolean} res.data.canSubmit - whether user can submit or not
     *
     *  @reject {String} error message
     */
    canUserSubmit: ({
      data
    }: {
      data: {
        user: { token: string };
        sauce: { slug: string };
      };
    }): AxiosPromise => {
      return axios.post(`${host}/api/review/canusersubmit`, data).then(res => {
        if (res.data.isGood && res.data.canUserSubmit) {
          return res;
        }
        throw new Error(res.data.msg);
      });
    }
  }
};
