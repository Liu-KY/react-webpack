import request from "@/utils/request";

//商品品类
export function goodCates(params = {}) {
  return request({
    url: "/good/cates",
    method: "GET",
    params,
  });
}

//商品列表
export function goodList(params = {}) {
  return request({
    url: "/good/list",
    method: "GET",
    params,
  });
}


//商品上传
export function goodUpdate(data = {}) {
  return request({
    url: "/good/update",
    method: "POST",
    data,
  });
}


//商品详情
export function goodInfo(params = {}) {
    return request({
      url: "/good/info",
      method: "GET",
      params,
    });
  }