/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types */
import React, {Component, Children} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

/**
 *
 *
 * @export
 * @class CellHeader
 * @extends {Component}
 */
export class CellHeader extends Component {
  render() {
    const {text, children, headerClick,span} = this.props;
    const hasChildren = children && children.length > 0;
    return (
      <th className="th" colSpan={span} onClick={() => headerClick(text)}>
        <table className="table">
          <thead className="thead">
            <tr className="tr"> <th className="th" colSpan={span}>{text}</th></tr>
          </thead>
          {hasChildren && <tr className="tr">{children}</tr>}
        </table>
      </th>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CellHeader);
