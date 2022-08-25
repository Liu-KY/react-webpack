import immer from "immer";

const defaultStore = {
  goodCates: [],
};

export default (store = defaultStore, { type, payload }) => {
  return immer(store, (store) => {
    switch (type) {
      case "GOOD_CHANGE_CATES":
        store.goodCates = payload;
        break;
      case "GOOD_ADD_CATES":
        store.goodCates = payload;

      default:
    }
  });
};
