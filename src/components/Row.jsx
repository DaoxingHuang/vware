import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Cell from "./Cell";


export class Row extends Component {
    // static propTypes = {
    //     prop: PropTypes
    // }

    state = {checked:false}

    checkedChange=(e)=>{
        const ck = e.target.checked;
        this.setState({checked:ck})
    }

    componentDidUpdate(){
    }

    componentWillReceiveProps(newProps){
        const {selected} = newProps.item; 
        this.setState({checked:selected})
    }
    shouldComponentUpdate(){
        return true;
    }

    rowCheckedChange=(e)=>{
        const {rowSelectedChange,item} = this.props;
        const checked = e.target.checked;
        this.setState({checked:checked});
        rowSelectedChange(item.id,checked);
    }

    render() {
        const {cellOnChange,item,rowNum} = this.props;
        debugger;
        const { columValues,id } = item;
        // {rowNum:index+1,id:generateId(),selected:false,value} 
        const cells =  columValues.map((item,index )=>{
            return <Cell rowId={id}  item={item} onChange ={cellOnChange} key={index}></Cell>
        })
        return (
            <tr className='tr'>
              <td className="td">
              {rowNum}
                </td>
               <td className="td">
                <input type="checkbox"  checked={this.state.checked}
                    defaultChecked={this.state.checked} 
                    onChange={this.rowCheckedChange} /></td>
                {cells}
            </tr>
        )
    }
}


export default Row;
