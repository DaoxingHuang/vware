/* eslint-disable react/prop-types */
import React from 'react';


/**
 * Tools
 * @public
 * @author Daoxing.Huang
 * @export
 * @class ToolBar
 * @extends {Component}
 */

// eslint-disable-next-line require-jsdoc
export default function ToolBar(props) {
  const {addEvent, deleteEvent, udpateEvent, lang, langEvent} = props;
  return (
    <div className="btnContainer">
      <span className="btngroup">
        <button className="btngroup--btn"
          onClick={addEvent} > {lang['TXT-ADD'] }</button>
        <button className="btngroup--btn"
          onClick={deleteEvent} > {lang['TXT-DELETE'] }</button>
        <button className="btngroup--btn"
          onClick={udpateEvent} >{lang['TXT-UPDATE']}</button>
        <button className="btngroup--btn"
          onClick={langEvent} >{lang['TXT_LANGEXCHANGE']}</button>
      </span>
    </div>
  );
}


