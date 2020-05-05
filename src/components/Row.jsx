/* eslint-disable require-jsdoc */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';


/**
 *the row of excel
 *@author Daoxing.Huang
 * @export
 * @class Row
 * @extends {Component}
 */

export class Row extends Component {
    static propTypes = {
      rowSelectedChange: PropTypes.func.isRequired,
      cellOnChange: PropTypes.func.isRequired,
      item: PropTypes.object.isRequired,
      rowNum: PropTypes.number.isRequired,
    }

    state = {checked: false}

    /**
     *invoke when input checked changed
     *
     * @param {Event} e
     * @memberof Row
     */
    checkedChange(e) {
      const ck = e.target.checked;
      this.setState({checked: ck});
    }

    // eslint-disable-next-line react/no-deprecated
    componentWillReceiveProps(newProps) {
      const {selected} = newProps.item;
      this.setState({checked: selected});
    }

    /**
     * invoke when row checked status changed.
     *
     * @param {Event} e
     * @memberof Row
     */

    rowCheckedChange(e) {
      const {rowSelectedChange, item} = this.props;
      const checked = e.target.checked;
      this.setState({checked: checked});
      rowSelectedChange(item.id, checked);
    }

    render() {
      const {cellOnChange, item, rowNum} = this.props;
      const {columValues, id} = item;
      // {rowNum:index+1,id:generateId(),selected:false,value}
      const cells = columValues.map((item, index )=>{
        return <Cell rowId={id} item={item} onChange ={cellOnChange}
          key={index}></Cell>;
      });
      return (
        <tr className='tr'>
          <td className="td">
            {rowNum}
          </td>
          <td className="td">
            <input type="checkbox" checked={this.state.checked}
              onChange={this.rowCheckedChange.bind(this)} />
          </td>
          {cells}
        </tr>
      );
    }
}


export default Row;
