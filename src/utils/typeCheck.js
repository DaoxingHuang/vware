// string
export const isString = (o) => Object.prototype.toString.call(o)
    .slice(8, -1) === 'String';
// number
export const isNumber = (o) =>
  Object.prototype.toString.call(o).slice(8, -1) === 'Number';

export const isObj = (o) => // objec
  Object.prototype.toString.call(o).slice(8, -1) === 'Object';

export const isArray = (o) => // array
  Object.prototype.toString.call(o).slice(8, -1) === 'Array';

export const isDate = (o) => // time
  Object.prototype.toString.call(o).slice(8, -1) === 'Date';

export const isBoolean = (o) => // bool
  Object.prototype.toString.call(o).slice(8, -1) === 'Boolean';

export const isFunction = (o) => // func
  Object.prototype.toString.call(o).slice(8, -1) === 'Function';

export const isNull = (o) => // null
  Object.prototype.toString.call(o).slice(8, -1) === 'Null';

export const isUndefined = (o) => // undefined
  Object.prototype.toString.call(o).slice(8, -1) === 'Undefined';

export const isFalse = (o) => {
  if (o === '' || o === undefined || o === null || o === 'null' ||
        // eslint-disable-next-line no-restricted-globals
        o === 'undefined' || o === 0 || o === false || isNaN(o)) return true;
  return false;
};


