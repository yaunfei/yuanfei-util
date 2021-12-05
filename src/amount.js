import { Decimal } from "decimal.js";

/**
 * 金额格式化 3位截取; 32000 => 3,200
 * @param {String | Number} money
 * @returns String
 */
export const formatterMoney = (money) => {
  if (!money) return;
  money = parseFloat(money).toFixed(2);
  const regExp = new RegExp("(-?\\d+)(\\d{3})");

  while (regExp.test(money)) {
    money = money.replace(regExp, "$1,$2"); // 处理为32123,1234
  }
  return money;
};

/**
 * 数字金额转汉字金额大写；3200 => 叁仟俩佰元
 * @param {String | Number} money
 * @returns String
 */
export const numToChinese = (money) => {
  if (!money) return;
  let moneyArr = parseFloat(money).toFixed(2).split("."); // 转成字符串；分割整数和小数
  money = moneyArr[0]
    ?.replace(/\b(0+)/g, "")
    .split("")
    .reverse(); //整数部分： 去掉头部的0, 000130130 => 130130；传成数组；倒置
  let digit = moneyArr[1]?.replace(/(0+)\b/g, "").split(""); //小数部分： 去掉后面的0, 20 => 2；传成数组；

  let resMoney = 0;

  const dic = {
    0: "零",
    1: "壹",
    2: "贰",
    3: "叁",
    4: "肆",
    5: "伍",
    6: "陆",
    7: "柒",
    8: "捌",
    9: "玖",
  };

  const dicUnit = {
    0: "",
    1: "拾",
    2: "佰",
    3: "仟",
  };

  const digitDicUnit = {
    0: "角",
    1: "分",
  };

  // 处理仟、佰、拾； ['1', '0', '0', '3'] => 叁仟零零壹
  const getInfo = (item) => {
    if (!item || item.length > 4) return;

    return item
      .map((subItem, index) => {
        if (subItem === "0") {
          return dic[0];
        }
        return `${dic[subItem]}${dicUnit[index]}`;
      })
      .reverse()
      .join("")
      .replace(/(零+)$/g, ""); //反转回来；拼接成字符串；去掉尾部的 零
  };

  // 处理整数部分
  const regExp1 = /(0+)$/g;
  const regExp2 = /0{4}/;

  switch (true) {
    case money.length < 5:
      resMoney = getInfo(money);
      break;
    case money.length < 9:
      let first = money.slice(4, money.length).reverse().join("");
      let second = money.slice(0, 4).reverse().join("");
      if (regExp1.test(first) && !regExp2.test(second)) {
        resMoney = `${getInfo(money.slice(4, money.length))}万零${getInfo(
          money.slice(0, 4)
        )}`;
      } else {
        resMoney = `${getInfo(money.slice(4, money.length))}万${getInfo(
          money.slice(0, 4)
        )}`;
      }
      break;
    case money.length < 13:
      let first1 = money.slice(8, money.length).reverse().join("");
      let second1 = money.slice(4, 8).reverse().join("");
      let third1 = money.slice(0, 4).reverse().join("");
      if (
        regExp1.test(first1) &&
        !regExp2.test(second1) &&
        !regExp2.test(third1)
      ) {
        // 万位后面有0
        if (regExp1.test(second1)) {
          resMoney = `${getInfo(money.slice(8, money.length))}亿零${getInfo(
            money.slice(4, 8)
          )}万零${getInfo(money.slice(0, 4))}`;
        } else {
          resMoney = `${getInfo(money.slice(8, money.length))}亿零${getInfo(
            money.slice(4, 8)
          )}万${getInfo(money.slice(0, 4))}`;
        }
      } else {
        // 万位不全为0
        if (!regExp2.test(second1)) {
          resMoney = `${getInfo(money.slice(8, money.length))}亿${getInfo(
            money.slice(4, 8)
          )}万${getInfo(money.slice(0, 4))}`;
        } else if (!regExp2.test(third1)) {
          resMoney = `${getInfo(money.slice(8, money.length))}亿零${getInfo(
            money.slice(0, 4)
          )}`;
        } else {
          resMoney = `${getInfo(money.slice(8, money.length))}亿${getInfo(
            money.slice(0, 4)
          )}`;
        }
      }
      break;
  }

  resMoney = `${resMoney.replace(/零零零/g, "零").replace(/零零/g, "零")}`;

  let digitMoney;
  // 处理小数部分
  if (digit) {
    digitMoney = digit
      .map((digitItem, index) => {
        if (digitItem === "0") {
          return;
        }
        return `${dic[digitItem]}${digitDicUnit[index]}`;
      })
      .join("");
  }

  !!digitMoney
    ? (resMoney = `${resMoney ? `${resMoney}元` : resMoney}${digitMoney}`)
    : (resMoney = `${resMoney}元整`);

  return resMoney;
};

/**
 * 汉字金额大写转数字金额；'叁仟肆佰伍拾亿零壹佰陆拾柒万叁仟肆佰伍拾壹元捌角伍分' => '345001673451.85'
 * @param {String} money
 * @returns String
 */
export const chineseToNum = (money) => {
  const dic = {
    零: 0,
    壹: 1,
    贰: 2,
    叁: 3,
    肆: 4,
    伍: 5,
    陆: 6,
    柒: 7,
    捌: 8,
    玖: 9,
  };

  // 处理仟,佰,拾;'叁仟肆佰伍拾壹' => '3451'
  const getInfo = (item) => {
    let itemCount = 0;

    // 将仟，佰，拾 拆分数组 '叁仟肆佰伍拾壹' => ['叁仟', '肆佰', '伍拾', '壹']
    let arr = item
      .replace(/(\w*仟)(\w*)/, "$1,$2")
      .replace(/(\w*佰)(\w*)/, "$1,$2")
      .replace(/(\w*拾)(\w*)/, "$1,$2")
      .split(",")
      .filter((_item) => {
        return _item && _item.trim();
      });

    // 处理每个单位对应的值
    for (let subItem of arr) {
      let currValue = new Decimal(0);
      let subArr = subItem.split("");
      if (subArr[1] === "拾") {
        // 处理拾位
        currValue = new Decimal(dic[subArr[0]]).mul(new Decimal(10));
      } else if (subArr[1] === "佰") {
        //处理佰位
        currValue = new Decimal(dic[subArr[0]]).mul(new Decimal(100));
      } else if (subArr[1] === "仟") {
        // 处理仟位
        currValue = new Decimal(dic[subArr[0]]).mul(new Decimal(1000));
      } else {
        // 处理个位
        currValue = new Decimal(dic[subArr[0]]);
      }
      itemCount = new Decimal(itemCount).add(new Decimal(currValue));
    }
    return itemCount;
  };

  let totalMoney = new Decimal(0);

  //// 按照亿,万,拆分成数组;'叁仟肆佰伍拾亿零壹佰陆拾柒万叁仟肆佰伍拾壹元捌角伍分' => ['叁仟肆佰伍拾亿', '壹佰陆拾柒万', '叁仟肆佰伍拾壹元', '捌角', '伍分']
  let newMoney = money
    .replace(/零/g, "")
    .replace(/整/g, "") // 去掉 '零','整'
    .replace(/(\w*亿)(\w*)/, "$1,$2")
    .replace(/(\w*万)(\w*)/, "$1,$2")
    .replace(/(\w*元)(\w*)/, "$1,$2")
    .replace(/(\w*角)(\w*)/, "$1,$2")
    .split(",")
    .filter((_item) => {
      return _item && _item.trim();
    });

  // 按照亿,万及以下单位为组, 循环求解求解数值;
  for (let mainItem of newMoney) {
    let currMoney = 0;
    let mainArr = mainItem.split("");

    if (mainArr[mainArr.length - 1] === "亿") {
      mainArr.pop(); // 去掉亿单位
      currMoney = new Decimal(getInfo(mainArr.join(""))).mul(
        new Decimal(100000000)
      ); // 求仟,佰,拾
    } else if (mainArr[mainArr.length - 1] === "万") {
      mainArr.pop(); // 去掉万单位
      currMoney = new Decimal(getInfo(mainArr.join(""))).mul(
        new Decimal(10000)
      ); // 求仟,佰,拾
    } else if (mainArr[mainArr.length - 1] === "元") {
      mainArr.pop(); // 去掉元
      currMoney = new Decimal(getInfo(mainArr.join(""))); // 求仟,佰,拾
    } else if (mainArr[mainArr.length - 1] === "角") {
      mainArr.pop(); // 去掉角
      currMoney = new Decimal(dic[mainArr[0]]).mul(new Decimal(0.1));
    } else if (mainArr[mainArr.length - 1] === "分") {
      mainArr.pop(); // 去掉分
      currMoney = new Decimal(dic[mainArr[0]]).mul(new Decimal(0.01));
    }
    totalMoney = new Decimal(totalMoney).add(new Decimal(currMoney));
  }

  return totalMoney.toString();
};
