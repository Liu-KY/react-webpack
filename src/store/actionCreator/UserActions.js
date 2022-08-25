import { fetchLogin, fetchUserInfo } from "@/api/use";

export function login(data) {
  return (dispatch) => {
    fetchLogin(data).then(({ token }) => {
      dispatch({
        type: "USER_CHANGE_TOKEN",
        payload: token,
      });
    });
  };
}

export async function getInfo(data) {
  let info = await fetchUserInfo(data);

  return {
    type: "USER_CHANGE_INFO",
    payload: info,
  };
}

export function clearInfo() {
    return {
      type: "USER_CLEAR_INFO",
      payload:'',
    };
}

export function generateRoutes(asyncRoutes, roles) {

    let accessedRoutes;

    accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);

    return {
      type: "USER_CHANGE_PERMISSION",
      payload: accessedRoutes,
    };

}


function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

function filterAsyncRoutes(routes, roles) {
  const res = [];

  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}