import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Cell extends Component {
    static propTypes = {
        prop: PropTypes
    };

    render() {
        const { text } = this.props;
        return (
            <div className="cell">{text}</div>
        );
    }
}

const mapStateToProps = (state) => ({
    
});

const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
