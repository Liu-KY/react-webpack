import axios from "axios";
import { message, Modal } from "antd";

import { store } from "@/store";
import { clearInfo } from "@/store/actionCreator/UserActions";

const baseURL = "http://localhost:9000";
const version = "/api/v1/react";

const instance = axios.create({
  baseURL: baseURL + version,
  timeout: 5000,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const { token } = store.getState().user;
    config.headers.Authorization = token;

    return config;
  },

  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    if (response.data.err === 1) {
      message.error(`${response.data.msg}`);
      return response.data.msg;
    } else if (response.data.err === -1) {

      Modal.error({
        title: "用户信息失效",
        content: "请重新登录",
        afterClose() {
          store.dispatch(clearInfo());
        },
      });
    } else {
      return response.data.data;
    }
  },

  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;
