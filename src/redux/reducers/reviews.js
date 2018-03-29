export default function sauce(state = {}, action) {
  switch (action.type) {
    case "REVIEWS_ADDED":
      // construct return object
      return {
        byId:
          "byId" in state && Object.keys(state.byId).length > 0
            ? Object.assign({}, state.byId, action.reviews.byId)
            : Object.assign({}, action.reviews.byId),
        allIds:
          "allIds" in state && state.allIds.length > 0
            ? state.allIds.concat(action.reviews.allIds)
            : [].concat(action.reviews.allIds)
      };

    default:
      return state;
  }
}
