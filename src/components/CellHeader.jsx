import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class CellHeader extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        const { text,children } =  this.props;
        return (
            <div className="header">
                {text}
                {
                React.Children.map(children, (child, i) => {
                        return child
                      })
                })}
         </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(CellHeader)
