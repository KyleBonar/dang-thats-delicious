import axios from "axios";

export default {
  user: {
    login: credentials => {
      return axios
        .post("http://localhost:7777/api/user/login", credentials)
        .then(res => {
          if (res.data.isGood) {
            return res.data;
          } else {
            throw new Error(res.data.msg);
          }
        });
    },
    register: credentials => {
      return axios
        .post("http://localhost:7777/api/user/register", credentials)
        .then(res => {
          if (res.data.isGood) {
            return res.data;
          } else {
            throw new Error(res.data.msg);
          }
        });
    },
    getInfo: credentials => {
      return axios
        .post("http://localhost:7777/api/user/getInfo", credentials)
        .then(res => {
          if (res.status === 200 && res.data.isGood) {
            return res.data;
          } else {
            throw new Error(res.data.msg);
          }
        });
    },
    update: credentials => {
      return axios
        .post("http://localhost:7777/api/user/update", credentials)
        .then(res => {
          if (res.status === 200 && res.data.isGood) {
            return res.data;
          } else {
            throw new Error(res.data.msg);
          }
        });
    },
    isLoggedIn: credentials => {
      return axios
        .post("http://localhost:7777/api/user/isloggedin", credentials)
        .then(res => {
          if (res.status === 200 && res.data.isGood) {
            return res.data;
          } else {
            throw new Error(res.data.msg);
          }
        });
    }
  },
  store: {
    add: data => {
      return axios
        .post("http://localhost:7777/api/store/add", data, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data.isGood) {
            return res.data;
          } else {
            throw new Error(res.data.msg);
          }
        });
    },
    getById: data => {
      return axios
        .post("http://localhost:7777/api/store/get/id", data)
        .then(res => {
          if (res.data.isGood) {
            return res.data;
          } else {
            throw new Error(res.data.msg);
          }
        });
    },
    getBySlug: data => {
      return axios
        .get(`http://localhost:7777/api/store/get/${data}`)
        .then(res => {
          if (res.data.isGood) {
            return res.data;
          } else {
            throw new Error(res.data.msg);
          }
        });
    },
    update: data => {
      return axios
        .post("http://localhost:7777/api/store/update", data, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data.isGood) {
            return res.data;
          } else {
            throw new Error(res.data.msg);
          }
        });
    }
  },
  stores: {
    get: range => {
      return axios.get("http://localhost:7777/api/stores/get").then(res => {
        if (res.data.isGood) {
          return res.data;
        } else {
          throw new Error(res.data.msg);
        }
      });
    },
    getByTag: tag => {
      return axios
        .get(`http://localhost:7777/api/stores/get/tag/${tag}`)
        .then(res => {
          if (res.data.isGood) {
            return res.data;
          } else {
            throw new Error(res.data.msg);
          }
        });
    },
    search: searchValue => {
      return axios
        .get(`http://localhost:7777/api/stores/search/${searchValue}`)
        .then(res => {
          if (res.data.isGood) {
            return res.data;
          } else {
            //this false error will be handled in SearchBar component
            throw new Error(res.data.msg);
          }
        });
    },
    searchByMap: coordinates => {
      return axios
        .get(
          `http://localhost:7777/api/stores/map/lng=${coordinates.lng}&lat=${
            coordinates.lat
          }`
        )
        .then(res => {
          if (res.data.isGood) {
            return res.data;
          } else {
            //this false error will be handled in SearchBar component
            throw new Error(res.data.msg);
          }
        });
    }
  },
  tags: {
    getList: () => {
      return axios.get("http://localhost:7777/api/tags/get").then(res => {
        if (res.data.isGood) {
          return res.data;
        } else {
          throw new Error(res.data.msg);
        }
      });
    }
  }
};
