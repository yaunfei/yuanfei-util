import { addayToUTC } from "./index";

/**
 * 设置cookie
 * @param {stirng} key
 * @param {string} value
 * @param {string} expiresDay
 * @param {string} domian
 * @param {string} path
 */
export const setCookie = (key, value, expiresDay, domian, path) => {
  let foo = expiresDay ? `;expires=${addayToUTC(expiresDay)}` : "";
  foo += domian ? `;domian=${domian}` : "";
  foo += path ? `;path=${path}` : "";
  document.cookie = `${key}=${encodeURIComponent(value)}${foo}`;
};

/**
 * 获取cookie
 * @param {string}} key
 * @returns string
 */
export const getCookie = (key) => {
  let arr,
    reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) {
    return decodeURIComponent(arr[2]);
  }
  return "";
};

/**
 * localStorage存储
 * @param {string} key
 * @param {any} value
 */
export const setData = (key, value) => {
  if (!window.localStorage) return;
  if (!key) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

/**
 * localStorage获取
 * @param {string} key
 * @param {any} value
 */
export const getData = (key) => {
  if (!window.localStorage) return;
  return JSON.parse(localStorage.getItem(key));
};
