import { formatterMoney, numToChinese, chineseToNum } from "../src/index";

describe("formatterMoney", () =>{
  test("格式1", () => {
    expect(formatterMoney('3201')).toBe('3,201.00')
  })
  test("格式2", () => {
    expect(formatterMoney('432343201')).toBe('432,343,201.00')
  })
  test("格式3", () => {
    expect(formatterMoney('3201.123')).toBe('3,201.12')
  })
})

describe("numToChinese", ()=> {
  test("测试1", () => {
    expect(numToChinese('4510')).toBe('肆仟伍佰壹拾元整')
  })
  test("测试2", () => {
    expect(numToChinese('10004510')).toBe('壹仟万零肆仟伍佰壹拾元整')
  })
  test("测试3", () => {
    expect(numToChinese('10000510')).toBe('壹仟万零伍佰壹拾元整')
  })
  test("测试4", () => {
    expect(numToChinese('2000000510')).toBe('贰拾亿零伍佰壹拾元整')
  })
  test("测试5", () => {
    expect(numToChinese('2010000510')).toBe('贰拾亿零壹仟万零伍佰壹拾元整')
  })
  test("测试6", () => {
    expect(numToChinese('2010000510.12')).toBe('贰拾亿零壹仟万零伍佰壹拾元壹角贰分')
  })
  test("测试7", () => {
    expect(numToChinese('0.12')).toBe('壹角贰分')
  })
})

describe("chineseToNum", ()=>{
  test("chineseToNum测试1", () => {
    expect(chineseToNum('肆仟伍佰壹拾元整')).toBe('4510')
  })
  test("chineseToNum测试2", () => {
    expect(chineseToNum('壹仟万零肆仟伍佰壹拾元整')).toBe('10004510')
  })
  test("chineseToNum测试3", () => {
    expect(chineseToNum('壹仟万零伍佰壹拾元整')).toBe('10000510')
  })
  test("chineseToNum测试4", () => {
    expect(chineseToNum('贰拾亿零伍佰壹拾元整')).toBe('2000000510')
  })
  test("chineseToNum测试5", () => {
    expect(chineseToNum('贰拾亿零壹仟万零伍佰壹拾元整')).toBe('2010000510')
  })
  test("chineseToNum测试6", () => {
    expect(chineseToNum('贰拾亿零壹仟万零伍佰壹拾元壹角贰分')).toBe('2010000510.12')
  })
  test("chineseToNum测试7", () => {
    expect(chineseToNum('伍角贰分')).toBe('0.52')
  })
})