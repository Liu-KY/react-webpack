import immer from "immer";

const defaultStore = {
  token: "",
  avatar: "",
  roles: null,
  introduction: "",
  name: "",
  accessRoutes: null, // 用于保存当前用户可访问的动态路由们
};

export default (store = defaultStore, { type, payload }) => {
  return immer(store, (store) => {
    switch (type) {
      case "USER_CHANGE_TOKEN":
        store.token = payload;
        break;

      case "USER_CHANGE_INFO":
        if (payload) {
          const { avatar, roles, introduction, name } = payload;
          store.avatar = avatar;
          store.roles = roles;
          store.introduction = introduction;
          store.name = name;
        }
        break;

      case "USER_CHANGE_PERMISSION":
        store.accessRoutes = payload;
        
        break;
      case "USER_CLEAR_INFO":
        // const { token } = payload
        store.token = payload;
        break;
      default:
    }
  });
};
