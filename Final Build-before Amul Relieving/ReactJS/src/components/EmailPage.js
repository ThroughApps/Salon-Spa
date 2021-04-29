
import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import VendorEntryForm from './VendorEntryForm';


import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


class EmailPage extends Component {
  constructor(data) {
    super(data)

    var today = new Date();
    today = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
   
    
  }
componentDidMount(){
  window.scrollTo(0, 0);      
   
}
  
  render() {
    return (
        
      <div class="container">
         
              
                <div class="card">
      <div class="card-header" style={{backgroundColor:"white"}}>
      <ul class="nav nav-tabs">
    <li class="active"><a  style={{color:"black",fontWeight:"bold"}}  className="active"  onClick={() => this.Expense()}><span style={{display:"inline-grid"}}>January</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold"}}   onClick={() => this.AddCategory()}><span style={{display:"inline-grid"}}>Febuary</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold"}}   onClick={() => this.AddUser()}><span style={{display:"inline-grid"}}>March</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold"}}  onClick={() => this.Expense()}><span style={{display:"inline-grid"}}>April</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold"}}   onClick={() => this.AddCategory()}><span style={{display:"inline-grid"}}>May</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold"}}   onClick={() => this.AddUser()}><span style={{display:"inline-grid"}}>June</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold"}}   onClick={() => this.AddCategory()}><span style={{display:"inline-grid"}}>July</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold"}}   onClick={() => this.AddUser()}><span style={{display:"inline-grid"}}>August</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold"}}   onClick={() => this.AddCategory()}><span style={{display:"inline-grid"}}>September</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold"}}   onClick={() => this.AddUser()}><span style={{display:"inline-grid"}}>October</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold"}}   onClick={() => this.AddCategory()}><span style={{display:"inline-grid"}}>November</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold"}}   onClick={() => this.AddUser()}><span style={{display:"inline-grid"}}>December</span></a></li>
             
  </ul>
      </div>
      <div>
      <div class="card-body">
      <div class="row" style={{marginTop:"2%"}}>
    <div class="col-sm-4" >
    <div  class="title tile purple" style={{marginTop:"2%",display: "inline-block",	boxSizing: "border-box",	background: "rgb(152, 151, 201)",	padding: "20px",marginBottom:"10px"}}>
    <div class="tile-header">
              
              <h2>Total Taxable Value : ₹ <span id="total_taxable">0</span></h2>
                <hr class="hrcolor"/>
              <h2>IGST : ₹ <span id="igst">0</span></h2>
                <hr class="hrcolor"/>              
              <h2>CGST : ₹ <span id="cgst">0</span></h2>
                <hr class="hrcolor"/> 
              <h2>SGST : ₹ <span id="sgst">0</span></h2>
            </div>
           
            <div class="tile-footer"  style={{backgroundColor:"rgb(4, 3, 70)"}}>
              <h3 class="pull-right">Sale</h3>
            </div>
    </div></div>
    <div class="col-sm-4 ">       
    <div  class="title tile purple"  style={{marginTop:"2%",display: "inline-block",	boxSizing: "border-box",	background: "rgb(152, 151, 201)",	padding: "20px",marginBottom:"10px"}}>
    <div class="tile-header">
           
              <h2>IGST : ₹ <span id="igst">0</span></h2>
                <hr class="hrcolor"/>              
              <h2>CGST : ₹ <span id="cgst">0</span></h2>
                <hr class="hrcolor"/> 
              <h2>SGST : ₹ <span id="sgst">0</span></h2>
            </div>
           
            <div class="tile-footer"  style={{backgroundColor:"rgb(4, 3, 70)"}}>
              <h3 class="pull-right">Sale</h3>
            </div>
    </div>
    </div>
  </div>      
        </div>
        </div>
</div>      
      </div>
    );
  }

}

export default EmailPage;