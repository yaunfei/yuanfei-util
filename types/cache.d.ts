declare function setCookie(
  key: string,
  value: string,
  expiresDay?: string,
  domian?: string,
  path?: string
): void;

declare function getCookie(key: string): string;
declare function setData(key: string, value: any): void;
declare function getData(key: string): any;
export { setCookie, getCookie, setData, getData };
