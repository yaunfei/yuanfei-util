/**
 * 深度拷贝
 * @param {Object｜Function} obj
 * @returns Object
 */
export const deepCopy = (obj) => {
  if (obj === null) return null;
  // Date RegExp Function
  if (obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  let newObj = new obj.constructor();
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = deepCopy(obj[key]);
    }
  }

  return newObj;
};

/**
 * 防抖
 * @param {function} fn
 * @param {time} delay
 * @returns
 */
export const debounce = (fn, delay) => {
  let timer = null;
  return (...agrs) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, agrs);
    }, delay);
  };
};

/**
 * 节流
 * @param {function} fn
 * @param {timer} delay
 * @returns
 */
export const throttle = (fn, delay) => {
  let flag = true;
  return (...agrs) => {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, agrs);
      flag = true;
    }, delay);
  };
};
