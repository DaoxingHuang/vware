import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Cell extends Component {


    state = {editable:false,id:'',text:''};

    componentWillReceiveProps(newProps){
        const {editable} = newProps;
        this.setState({editable:editable})
    }
    onDoubleClick=(e)=>{
        this.setState({editable:true})
    }
    onBlur=(e)=>{
        this.setState({editable:false});
    }

    componentWillReceiveProps(newProps){
        const {id,text} = newProps.item;
        debugger;
        this.setState({text:text});
    }

    componentWillMount(){
        const {id,text} = this.props.item;
        debugger;
        this.setState({id:id,text:text});
    }

    txtChange = (e)=>{
        const { rowId , onChange } = this.props;
        const value = e.target.value;
        this.setState({text:value});
        onChange(rowId,this.state.id,value);
    }
    

    render() {
        return (
            <td className="td" onDoubleClick={this.onDoubleClick.bind(this)}>
                {!this.state.editable?this.state.text:
                <input type="text"  
                    value={this.state.text} onChange={this.txtChange} 
                    onBlur={this.onBlur.bind(this)}></input>}
            </td>
    
        );
    }
}


export default Cell;
