import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CellHeader from "./CellHeader";
import Row from "./Row";
import { isObj } from "../utils/typeCheck";

export class Excel extends Component {
    
    static propTypes = {
        data: PropTypes.array.isRequired
    }

    getHeaders=(obj,child)=>{
        const keys = Object.keys(obj);
        const headers = keys.map((item,index)=>{
            if(isObj(item)){
                return this.getHeaders(item);
            } 
                
            return <CellHeader text={item} key={index}>{child}</CellHeader>
        })
        if(child)
            return <child>headers</child>
        return headers;
    }

    render() {
        const { data } = this.props;
        const headers = this.getHeaders(data[0]);
        console.log(headers);
        return (
            <div className='excel'>
                <div class="row">
                        {headers}   
                </div>           
                {data.map((item,index)=>{
                    return <Row values={Object.values(item)} key={index}></Row>
                })}
                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Excel)
