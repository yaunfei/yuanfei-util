import { formatterMoney, numToChinese, chineseToNum } from "../src/index";

describe("formatterMoney", () =>{
  test("testFormatterMoney1", () => {
    expect(formatterMoney('3201')).toBe('3,201.00')
  })
  test("testFormatterMoney2", () => {
    expect(formatterMoney('432343201')).toBe('432,343,201.00')
  })
  test("testFormatterMoney3", () => {
    expect(formatterMoney('3201.123')).toBe('3,201.12')
  })
})

describe("numToChinese", ()=> {
  test("testNumToChinese1", () => {
    expect(numToChinese('4510')).toBe('肆仟伍佰壹拾元整')
  })
  test("testNumToChinese2", () => {
    expect(numToChinese('10004510')).toBe('壹仟万零肆仟伍佰壹拾元整')
  })
  test("testNumToChinese3", () => {
    expect(numToChinese('10000510')).toBe('壹仟万零伍佰壹拾元整')
  })
  test("testNumToChinese4", () => {
    expect(numToChinese('2000000510')).toBe('贰拾亿零伍佰壹拾元整')
  })
  test("testNumToChinese5", () => {
    expect(numToChinese('2010000510')).toBe('贰拾亿零壹仟万零伍佰壹拾元整')
  })
  test("testNumToChinese6", () => {
    expect(numToChinese('2010000510.12')).toBe('贰拾亿零壹仟万零伍佰壹拾元壹角贰分')
  })
  test("testNumToChinese7", () => {
    expect(numToChinese('0.12')).toBe('壹角贰分')
  })
})

describe("chineseToNum", ()=>{
  test("testChineseToNum1", () => {
    expect(chineseToNum('肆仟伍佰壹拾元整')).toBe('4510')
  })
  test("testChineseToNum2", () => {
    expect(chineseToNum('壹仟万零肆仟伍佰壹拾元整')).toBe('10004510')
  })
  test("testChineseToNum3", () => {
    expect(chineseToNum('壹仟万零伍佰壹拾元整')).toBe('10000510')
  })
  test("testChineseToNum4", () => {
    expect(chineseToNum('贰拾亿零伍佰壹拾元整')).toBe('2000000510')
  })
  test("testChineseToNum5", () => {
    expect(chineseToNum('贰拾亿零壹仟万零伍佰壹拾元整')).toBe('2010000510')
  })
  test("testChineseToNum6", () => {
    expect(chineseToNum('贰拾亿零壹仟万零伍佰壹拾元壹角贰分')).toBe('2010000510.12')
  })
  test("testChineseToNum7", () => {
    expect(chineseToNum('伍角贰分')).toBe('0.52')
  })
})