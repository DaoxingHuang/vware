/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */

import shortid from 'js-shortid';

/**
 * 用于显示的列信息
 * @author Daoxing.Huang
 * @public
 * @param {String} text - 行号
 * @export
 * @class Row
 */
export default class Column {
  constructor(text) {
    this.id = shortid.gen();
    this.text = text;
  };
}
