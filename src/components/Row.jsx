import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Cell from "./Cell";
export class Row extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        const { values } = this.props; 
        const cells =  values.map((item,index )=>{
            return <Cell text={item} key={index}></Cell>
        })
        return (
            <div className='row'>
               {cells} 
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Row)
