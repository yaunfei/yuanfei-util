declare function setCookie(
  key: string,
  value: string,
  expiresDay?: string,
  domian?: string,
  path?: string
);

declare function getCookie(key: string): string;
declare function setData(key: string, value: any);
declare function getData(key: string): any;
export { setCookie, getCookie, setData, getData };
