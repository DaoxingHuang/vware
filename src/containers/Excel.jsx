/* eslint-disable require-jsdoc */
/* eslint-disable react/no-deprecated */
/* eslint-disable valid-jsdoc */
/* eslint-disable no-invalid-this */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CellHeader from '../components/Header';
import Row from '../components/Row';
import {isObj} from '../utils/typeCheck';
import ToolBar from '../components/ToolBar';
import {default as MRow} from '../model/row';
import en from '../assets/lang/en.json';
import zh from '../assets/lang/zh.json';

/**
 * Container.the whole excel container.
 * @author Daoxing.Huang
 * @public
 * @export
 * @class Excel
 * @extends {Component}
 */

export default class Excel extends Component {
  constructor() {
    super();
    this.isDefaultLang = true;
    this.cols = [];
    this.valueTemplate={};
    this.headers = [];
  }

  static propTypes = {
    data: PropTypes.array.isRequired,
  };

  state = {values: [], headers: [], cols: [],
    selectAll: false, lang: en,
  };

  /**
     * Change language
     * @private
     * @function
     * @instance
     * @memberof ToolBar
  */
  changeLanguage() {
    this.isDefaultLang = !this.isDefaultLang;
    if (this.isDefaultLang) {
      this.setState({lang: en});
    } else {
      this.setState({lang: zh});
    }
  }

  /**
   * header click event.
   *@public
   *@function
   *@param {String} cloumName - Column name
   *@memberof Excel
   */
  headerClick = (cloumName) => {
    console.log(this.cols);
    const index = this.cols.findIndex(
        (value) => value.name === cloumName,
    );
    const clonevalues = Array.from(this.state.values);
    clonevalues.sort((a, b) => {
      return -1;
    });
    this.cols[index].asc = !this.cols[index].asc;
    this.setState({values: clonevalues});
  };

  componentWillMount() {
    const {data} = this.props;
    this.valueTemplate = data[0];
    this.getRowValues(data);
    this.headers = this.getHeaders(data[0]);
  }

  componentDidMount() {
    // this.editor = new JSONEditor(document.getElementById('jsoneditor'), {});
  }

  /**
   * create template data
   * @public
   * @function
   * @param {Object} data - the data that will use as template.
   * @memberof Excel
   */
  createTemplate=(data)=>{
    const clone = JSON.parse(JSON.stringify(data));
    clone.id='';
    clone.selected = false;
    clone.rowNum = -1;
    clone.value.forEach((item)=>{
      Object.keys(item).forEach((key)=>{
        item[key] = void 0;
      });
    });
    return clone;
  }


  /**
   * create the excel headers.
   * @public
   * @function
   * @instance
   * @param {Object} obj - the data will get from user enter.
   * @memberof Excel
   */
  getHeaders = (obj) => {
    const keys = Object.keys(obj);
    const headers = keys.map((item, index) => {
      let childHeaders = [];
      if (isObj(obj[item])) {
        childHeaders = this.getHeaders(obj[item]);
      } else {
        this.cols.push({name: item, asc: true});
      }
      return (
        <CellHeader headerClick={this.headerClick} span={childHeaders.length}
          text={item} key={index}>
          {childHeaders}
        </CellHeader>
      );
    });
    return headers;
  };


  /**
   *Get all data from input.
   *@function
   *@instance
   *@public
   *@param {Object} data - the data from user enter.
   * @memberof Excel
   */
  getRowValues = (data) => {
    data.forEach((item, index) => {
      const row = new MRow(index, false, item);
      this.state.values.push(row);
    });
  };

  /**
   * select all event.
   * @function
   * @private
   * @instance
   * @param {Event} e - Event.
   * @memberof Excel
   */
  headCheckChange=(e)=>{
    if (!e||!e.target) {
      return;
    }
    const checked = e.target.checked;
    const clones = this.state.values.map((item)=>{
      return Object.assign(item, {selected: checked});
    });
    this.setState({values: clones, selectAll: checked});
    // e.preventDefault();
  }

  /**
   * row selected change event
   * @function
   * @instance
   * @private
   * @param {String} id the row id
   * @param {Boolean} checked checked or not.
   * @memberof Excel
   */
  rowSelectedChange(id, checked) {
    const findItem = this.state.values.find((item)=>{
      return item.id === id;
    });
    findItem.selected = checked;
    const filter = this.state.values.filter((item)=>item.selected);
    const selectAll = filter.length === this.state.values.length;
    this.setState({selectAll: selectAll});
    console.log(this.state.values);
  }

  /**
   * cell input change event
   * @function
   * @instance
   * @private
   * @param {String} rowId the row id
   * @param {String} cellId the cell id.
   * @param {String} value the cell value.
   * @memberof Excel
   */
  cellInputOnChange = (rowId, cellId, value)=>{
    console.log('===', rowId, 'value:', value);
    const findItem = this.state.values.find((item)=>{
      return item.id === rowId;
    });
    const targetCell = findItem.columValues.find((item)=>{
      return item.id === cellId;
    });
    targetCell.text = value;
  }

  /**
   * add new row.
   * @function
   * @private
   * @instance
   * @param {Event} e - Event.
   * @memberof Excel
   */
  addNewRow = (e)=>{
    e.preventDefault();
    const row = MRow.clone(this.valueTemplate, this.state.values.length);
    debugger;
    const values = Array.from( this.state.values);
    values.push(row);
    this.setState({values: values});
  }

  /**
   * delete a row.
   * @function
   * @private
   * @instance
   * @param {Event} e - Event.
   * @memberof Excel
   */
  deleteRow= (e)=>{
    e.preventDefault();
    const filter = this.state.values.filter((item)=>
      !item.selected);
    debugger;
    this.setState({values: filter});
  }

  /**
   * update cell  row.
   * @function
   * @private
   * @instance
   * @param {Event} e - Event.
   * @memberof Excel
   */
  updateRow= (e)=>{
    e.preventDefault();
    const udpateEle = e.target;
    udpateEle.innerText = this.state.lang['TXT-UPDATEING'];
    setTimeout(()=>{
      udpateEle.innerText = this.state.lang['TXT-UPDATE']; ;
    }, 1000);
  }

  textareaChange() {

  }

  // eslint-disable-next-line require-jsdoc
  render() {
    const rows=this.state.values.map((item, index)=>{
      return <Row item={item}
        cellOnChange = {this.cellInputOnChange}
        rowNum={index+1} rowSelectedChange={this.rowSelectedChange.bind(this)}
        key = {index}></Row>;
    });

    return (
      <React.Fragment>
        <div className="table-shadow">
          <table className="table">
            <thead className="thead">
              <tr className="tr">
                <th className="th"></th>
                <th className="th">
                  <input checked={this.state.selectAll}
                    type="checkbox" onChange={this.headCheckChange.bind(this)}/>
                </th>
                {this.headers}
              </tr>
            </thead>
            <tbody className="tbody">
              {rows}
            </tbody>
          </table>
          <ToolBar lang={this.state.lang} addEvent={this.addNewRow.bind(this)}
            deleteEvent = {this.deleteRow.bind(this)}
            udpateEvent={this.updateRow.bind(this)}
            langEvent={this.changeLanguage.bind(this)}></ToolBar>
        </div>
      </React.Fragment>
    );
  }
}
