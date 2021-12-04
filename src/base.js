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
