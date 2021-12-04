/**
 * 1.直接导出每个方法
 * 如：amount的 formatterMoney
 * 引用方式（要花括号）：
 * import { formatterMoney } from 'yuanfei-util'
 * 使用：
 * formatterMoney()
 */
export * from "./amount";
export * from "./base";

/**
 * 2.指定默认导出
 * 如：amount导出被定义一个别名Util
 * 引用方式（不要花括号）：
 * import Util from 'yuanfei-util'
 * 使用:
 * Util.Amount.formatterMoney()
 */
import * as Amount from "./amount";
import * as Base from "./base";
export default {
  Amount,
  Base,
};

/**
 * 3.正常导出模块
 * 如：amount导出
 * 引用方式（要花括号）：
 * import { Amount } from 'yuanfei-util'
 * 使用:
 * Amount.formatterMoney()
 */
export { Amount, Base };
