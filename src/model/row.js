/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */


import shortid from 'js-shortid';
import {isObj} from '../utils/typeCheck';
import Column from './column';
/**
 * row that will show
 * @author Daoxing.Huang
 * @public
 * @param {Number} text row Number
 * @param {Boolean} selected checked or not
 * @param {Object} data the data will receive.
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
     * @param {Object} item - row data
     * @param {Object} [values=[]] valuses list.
     * @return {Array} the array columns.
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
    return coloumns;
  };

  /**
   *
   * get a new clone Row Object
   * @param {Object} value
   * @returns {Row} Row
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
