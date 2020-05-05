/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */


import shortid from 'js-shortid';
import {isObj} from '../utils/typeCheck';
import Column from './column';
/**
 * 用于显示的行信息
 * @author Daoxing.Huang
 * @public
 * @param {Number} text 行号
 * @param {Boolean} selected 是否被选中
 * @param {Object} data 用于显示的数据
 * @export
 * @class Row
 */
export default class Row {
  constructor(rowNum, selected, data) {
    this.id = shortid.gen();
    this.rowNum = rowNum;
    this.selected = selected;
    this.columValues = this.getColumValues(data);
  };

  /**
     *
     *
     * @param {Object} item - 当前行数据
     * @param {Object} [values=[]] - 转化后列信息
     * @return
     * @memberof Row
     */
  getColumValues(item, values = []) {
    const cloneItem = JSON.parse(JSON.stringify(item));
    const keys = Object.keys(cloneItem);
    const coloumns = [];
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      const value = cloneItem[key];
      if (isObj(value)) {
        const childValue = this.getColumValues(value, values);
        coloumns.push(...childValue);
      } else {
        const col = new Column(value);
        coloumns.push(col);
      }
    }
    // keys.forEach((key) => {
    //   if(key === 'id'){
    //     continue;
    //   }
    //   const value = cloneItem[key];
    //   if (isObj(value)) {
    //     const childValue = this.getColumValues(value, values);
    //     coloumns.push(...childValue);
    //   } else {
    //     const col = new Column(value);
    //     coloumns.push(col);
    //   }
    // });
    return coloumns;
  };

  /**
   *
   * 返回一个全新的 clone对象
   * @param {Object} value
   * @returns {Row} Row对象
   * @memberof Row
   */
  static clone(template, rowNum = -1) {
    const row = new Row(rowNum, false, template);
    row.__setTemplateValue();
    return row;
  }

  __setTemplateValue() {
    const coloumns = this.columValues;
    coloumns.map((item)=>{
      Object.keys(item).map((key)=>{
        if (key !== 'id') {
          item[key] = void 0;
        }
      });
    });
  }
}
