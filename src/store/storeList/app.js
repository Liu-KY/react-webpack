import immer from "immer";

const defaultStore = {
  size: "large",
  idn: navigator.language.replace('-','_'),
  color:'#25b864',
};

export default (store = defaultStore, { type, payload }) => {
  return immer(store, (store) => {
    switch (type) {
      case "APP_CHANGE_SIZE":
        store.size = payload;
        break;
      case "APP_CHANGE_IDN":
        store.idn = payload;
        break;
      case "APP_CHANGE_COLOR":
        store.color = payload;
        break;
      default:
    }
  });
};
