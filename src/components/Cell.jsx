/* eslint-disable react/no-deprecated */
/* eslint-disable require-jsdoc */
/* eslint-disable no-invalid-this */
/* eslint-disable react/prop-types */
import React, {Component} from 'react';

/**
 * the cell of excel.
 *
 * @class Cell
 * @extends {Component}
 */

class Cell extends Component {
    state = {editable: false, id: '', text: ''};


    onDoubleClick(e) {
      e.preventDefault();
      debugger;
      this.setState({editable: true});
    }
    onBlur(e) {
      e.preventDefault();
      this.setState({editable: false});
    }

    componentWillReceiveProps(newProps) {
      const {editable} = newProps;
      const {text} = newProps.item;
      this.setState({text: text, editable: editable});
    }

    componentWillMount() {
      const {id, text} = this.props.item;
      this.setState({id: id, text: text});
    }

    // eslint-disable-next-line valid-jsdoc
    /**
     *
     *
     * @memberof Cell
     */
    txtChange = (e)=>{
      e.preventDefault();
      const {rowId, onChange} = this.props;
      const value = e.target.value;
      this.setState({text: value});
      onChange(rowId, this.state.id, value);
    }

    // eslint-disable-next-line require-jsdoc
    render() {
      return (
        <td className="td"
          onDoubleClick={this.onDoubleClick.bind(this)}>
          {!this.state.editable?this.state.text:
                <input type="text"
                  value={this.state.text} onChange={this.txtChange.bind(this)}
                  onBlur={this.onBlur.bind(this)}></input>}
        </td>
      );
    }
}

export default Cell;
