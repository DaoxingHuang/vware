/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types */
import React, {} from 'react';

/**
 *the header cell of excel
 *
 * @export
 * @class CellHeader
 * @public
 * @extends {Component}
 */

export default function CellHeader(props) {
  const {text, children, headerClick, span} = props;
  const hasChildren = children && children.length > 0;
  return (
    <td className="th" colSpan={span} onClick={() => headerClick(text)}>
      <table className="table">
        <thead className="thead">
          <tr className="tr">
            <th className="th"
              colSpan={span}>{text}
            </th>
          </tr>
          {hasChildren && <tr className="tr">{children}</tr>}
        </thead>
      </table>
    </td>
  );
}

