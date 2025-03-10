import { defaultNameSpace } from "../config";

/**
 * BEM 命名字符拼接函数
 * @param {Object} options BEM 参数对象
 * @param {string} options.namespace 命名空间
 * @param {string} options.block 块
 * @param {string} [options.blockSuffix] 子级块
 * @param {string} [options.element] 元素
 * @param {string} [options.modifier] 修改器
 * @param {string} [options.modifierValue] 修改器的值
 * @returns {string} 生成的 BEM 类名
 */
const generateBEMClass = ({
  namespace,
  block,
  blockSuffix = "",
  element = "",
  modifier = "",
  modifierValue = "",
}) => {
  return [
    `${namespace}-${block}`,
    blockSuffix && `-${blockSuffix}`,
    element && `__${element}`,
    modifier && `--${modifier}`,
    modifierValue && `_${modifierValue}`,
  ]
    .filter(Boolean)
    .join("");
};

/**
 * 生成 BEM 命名空间的 Hook
 * @param {string} block 块名称
 * @returns {object} 命名空间的工具函数集合
 */
export const useNameSpace = (block) => {
  const namespace = defaultNameSpace;

  /**
   * 生成 Block（块）的类名
   * @param {string} [blockSuffix] 子级块
   * @returns {string} 生成的类名
   */
  const b = (blockSuffix = "") =>
    generateBEMClass({ namespace, block, blockSuffix });

  /**
   * 生成 Element（元素）的类名
   * @param {string} [element] 元素名称
   * @returns {string} 生成的类名
   */
  const e = (element = "") =>
    element ? generateBEMClass({ namespace, block, element }) : "";

  /**
   * 生成 Modifier（修饰符）的类名
   * @param {string} [modifier] 修饰符名称
   * @param {string} [modifierValue] 修饰符的值
   * @returns {string} 生成的类名
   */
  const m = (modifier = "", modifierValue = "") =>
    modifier
      ? generateBEMClass({ namespace, block, modifier, modifierValue })
      : "";

  /**
   * 生成状态类名
   * @param {string} name 状态名称
   * @param {boolean} state 状态是否启用
   * @returns {string} 生成的类名
   */
  const is = (name, state) => (name && state ? `is-${name}` : "");

  return { namespace, b, e, m, is };
};
