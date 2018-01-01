import api from "../api/api";

export const storesGot = ({ stores }) => ({
  type: "STORES_GOT",
  stores
});

export const updatedStoresItems = ({ store }) => ({
  type: "UPDATED_STORES_ITEM",
  store
});

export const storesByTagGot = ({ stores }) => ({
  type: "STORES_BY_TAG_GOT",
  stores
});

export const getStores = selection => dispatch => {
  return api.stores.get(selection).then(res => {
    dispatch(storesGot({ stores: res.stores }));
    return res;
  });
};

export const updateStoresItem = store => dispatch => {
  dispatch(updatedStoresItems({ store }));
  return;
};

export const getStoresByTag = tag => dispatch => {
  return api.stores.getByTag(tag).then(res => {
    dispatch(storesByTagGot({ stores: res.stores }));
    return res;
  });
};
