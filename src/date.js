/**
 * 获取当前时间加几天返回的 UTC 全球标准时间
 * @param {string | number} day 
 * @returns string
 */
export const addayToUTC = (day) => {
  if (!day) return;
  let date = new Date();
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * day);
  return date.toUTCString();
};
