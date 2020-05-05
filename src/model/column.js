/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */

import shortid from 'js-shortid';

/**
 * Column info.
 * @author Daoxing.Huang
 * @public
 * @param {String} text - show info
 * @export
 * @class Row
 */
export default class Column {
  constructor(text) {
    this.id = shortid.gen();
    this.text = text;
  };
}
