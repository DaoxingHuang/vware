import React, { Component } from "react";
import PropTypes from "prop-types";
import CellHeader from "./Header";
import Row from "./Row";
import { isObj } from "../utils/typeCheck";
import { ToolBar } from "./ToolBar";
import {default as MRow} from "../model/row";
import en from "../assets/lang/en.json";
import zh from "../assets/lang/zh.json";

export class Excel extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
  };

  state = { values: [], headers: [],cols:[],
      selectAll:false,valueTemplate:{},lang:en,isDefaultLang:true
      };

     /**
     * Change language
     * @private
     * @function
     * @instance
     * @memberof ToolBar
     */
    changeLanguage(){
      this.state.isDefaultLang = !this.state.isDefaultLang;
      if(this.state.isDefaultLang)
          this.setState({lang:en});
      else
          this.setState({lang:zh});
  }

  headerClick = (cloumName) => {
    console.log(this.state.cols);
    debugger;
    const index = this.state.cols.findIndex(
      (value) => value.name === cloumName
    );
    console.log(this.state.cols[index]);
    const asc = this.state.cols[index].asc;
    const clonevalues = Array.from(this.state.values);
    console.log("before:", clonevalues);
      clonevalues.sort((a, b) => {
        return -1;
      });
      // clonevalues.sort((a, b) => {
      //   return b.columValues[index].text - a.columValues[index].text;
      // });
    this.state.cols[index].asc = !this.state.cols[index].asc;
    console.log("after:", clonevalues);
    this.setState({ values: clonevalues });
  };

  componentWillMount() {
    const { data } = this.props;
    this.state.valueTemplate = data[0];
    this.getRowValues(data);
    this.state.headers = this.getHeaders(data[0]);
  }

  createTemplate=(data)=>{
      const clone = JSON.parse(JSON.stringify(data));
      clone.id='';
      clone.selected = false;
      clone.rowNum = -1;
      clone.value.map(item=>{
          Object.keys(item).map(key=>{
            item[key] = void 0;
          })
      })
      debugger;
      return clone;
    
  }

  componentDidMount() {}

  /**
   *
   *
   * @memberof Excel
   */
  getHeaders = (obj) => {
    const keys = Object.keys(obj);
    const headers = keys.map((item, index) => {
      let childHeaders = [];
      if (isObj(obj[item])) {
        childHeaders = this.getHeaders(obj[item]);
      } else {
        this.state.cols.push({ name: item, asc: true });
      }
      return (
        <CellHeader headerClick={this.headerClick} span={childHeaders.length} text={item} key={index}>
          {childHeaders}
        </CellHeader>
      );
    });
    return headers;
  };


  getRowValues = (data) => {
    data.forEach((item, index) => {
      const row = new MRow(index,false,item);
      this.state.values.push(row);
    });
  };

  headCheckChange=(e)=>{
      if(!e||!e.target)
        return ;
      const checked = e.target.checked;
      const clones = this.state.values.map((item)=>{
          return Object.assign(item,{selected:checked});
      });
      this.setState({values:clones,selectAll:checked});
  }

  rowSelectedChange(id,checked){
    const findItem = this.state.values.find((item)=>{
      return item.id == id;
    })
    findItem.selected = checked;
    const filter = this.state.values.filter(item=>item.selected);
    const selectAll  = filter.length === this.state.values.length;
    this.setState({selectAll:selectAll});
    console.log(this.state.values);
  }

  cellInputOnChange = (rowId, cellId,value)=>{
    console.log('===',rowId,'value:',value);
    const findItem = this.state.values.find((item)=>{
      return item.id == rowId;
    })
    const targetCell = findItem.columValues.find((item)=>{
      return item.id == cellId;
    })
    targetCell.text = value;
    console.log(this.state.values);
  }

  addNewRow = (e)=>{
     const row = MRow.clone(this.state.valueTemplate,this.state.values.length);
     debugger;
     const values = Array.from( this.state.values);
     values.push(row);
     this.setState({values:values});
  }

  deleteRow= (e)=>{
    const filter = this.state.values.filter(item=>
      !item.selected);
    debugger;
    this.setState({values:filter});
  }

  updateRow= (e)=>{
    const udpateEle = e.target;
    udpateEle.innerText = this.state.lang["TXT-UPDATEING"];
    setTimeout(()=>{
      udpateEle.innerText = this.state.lang["TXT-UPDATE"];;
    },1000)
  }

  render() {

    this.state.count = this.state.count++;
    debugger;
    const rows=this.state.values.map((item,index)=>{
        return <Row item={item} cellOnChange = {this.cellInputOnChange} rowNum={index+1}  rowSelectedChange={this.rowSelectedChange.bind(this)} key = {index}></Row>
    });
  
    return (
      <div id="demo" className="table-shadow">
        <table className="table">
          <thead className="thead">
            <tr className="tr">
              <th></th>
                <th className="th">
                  <input  checked={this.state.selectAll} defaultChecked={false}  type="checkbox" 
                  onChange={this.headCheckChange.bind(this)} />
                </th>
              {this.state.headers}
          </tr>
            </thead>
            <tbody className="tbody">
              {rows}
            </tbody>
          </table>
          <ToolBar lang={this.state.lang} addEvent={this.addNewRow.bind(this)} deleteEvent = {this.deleteRow.bind(this)} 
              udpateEvent={this.updateRow.bind(this)} langEvent={this.changeLanguage.bind(this)}></ToolBar>
      </div>

    );
  }
}

export default (Excel);
