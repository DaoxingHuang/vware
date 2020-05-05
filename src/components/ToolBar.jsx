import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


export class ToolBar extends Component {
    static propTypes = {
        prop: PropTypes
    };


    render() {
        const {addEvent,deleteEvent,udpateEvent,lang, langEvent} = this.props;
        return (
            <div className="btnContainer">
                <span class="btngroup">
                    <button class="btngroup--btn" onClick={addEvent} > {lang["TXT-ADD"] }</button>
                    <button class="btngroup--btn" onClick={deleteEvent} > {lang["TXT-DELETE"] }</button>
                    <button class="btngroup--btn" onClick={udpateEvent} >{lang["TXT-UPDATE"]}</button>
                    <button class="btngroup--btn" onClick={langEvent} >{lang["TXT_LANGEXCHANGE"]}</button>
                </span>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    
});

const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);
