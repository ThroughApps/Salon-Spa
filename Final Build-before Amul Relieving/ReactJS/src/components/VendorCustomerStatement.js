import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import $ from 'jquery';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ReportMenuPage from './ReportMenuPage';
import ReportMenuPagePremium from './ReportMenuPagePremium';
import ReportMenuPageBasic from './ReportMenuPageBasic';
import CustomerStatement from './CustomerStatement';
import CryptoJS from 'crypto-js';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';

var currentRow;
var vendorarray = [];
var inputarray = [];
var testarray = [];
var customerarray = [];
var rougharray = [];
var tablecontentarray = [];
var advancebalance_calc;
var subtotal_cgst = 0;
var subtotal_sgst = 0;
var subtotal_igst = 0;

class VendorCustomerStatement extends Component {


  constructor() {
    super()

    var today = new Date();
    var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    var year = today.getFullYear();

    this.state = {
      year: year,
      fromDate: today1,
      customerName: '',
      toDate: today1,
      companyId: companyId,

    };



  }

  handleVendorDetails = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.state.vendorId = value;

    rougharray.push(this.state.vendorId);


    this.setState({
      [name]: value,
      vendorNameValid: true
    });

    var self = this;
    for (var k = 0; k < vendorarray.length; k++) {
      var temp = JSON.parse(vendorarray[k]);
    
      if (temp.vendorId == this.state.vendorId) {

        self.state.orderNumber = temp.orderNumber + 1;
        self.state.vendorId = temp.vendorId;
        self.state.contactNo = temp.contactNo;
        self.state.vendorName = temp.vendorName;
        self.setState({
          orderNumber: self.state.orderNumber,
          vendorId: self.state.vendorId,
          contactNo: self.state.contactNo,
          vendorName:self.state.vendorName,
        })

        $.ajax({
          type: 'POST',
          data: JSON.stringify({

            fromDate: this.state.fromDate,
            toDate: this.state.toDate,
            vendorId: this.state.vendorId,
            companyId: this.state.companyId,
          }),
          url: " http://15.206.129.105:8080/MerchandiseAPI/PurchaseReport/vendorstatementreport",
          contentType: "application/json",
          dataType: 'json',
          async: false,

          success: function (data, textStatus, jqXHR) {

            ReactDOM.render(
              <Router>
                <div>


                  <Route path="/" component={() => <CustomerStatement data={data} />} />


                </div>
              </Router>,
              document.getElementById('contentRender'));
            registerServiceWorker();


          },
          error: function (data) {
      
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Network Connection Problem',
              showConfirmButton: false,
              timer: 2000
            })

          }
        });
        break;
      }
    }

  }
  componentDidMount() {
    window.scrollTo(0, 0);

    var self = this;
    var customerName;

    $('#toDate').datepicker({
      onSelect: function (date) {
        var dt = new Date(date);
        dt.setDate(dt.getDate() - 1);
        $("#fromDate").datepicker("option", "maxDate", dt);
        self.setState({
          toDate: date,
        });

      },
      dateFormat: 'yy-mm-dd',
      minDate: '-3M',
      maxDate: 'M',
      numberOfMonths: 1
    });
    $('#fromDate').datepicker({
      onSelect: function (date) {
        var dt = new Date(date);
        dt.setDate(dt.getDate() + 1);
        $("#toDate").datepicker("option", "minDate", dt);
        self.setState({
          fromDate: date,
        });
      },
      dateFormat: 'yy-mm-dd',
      minDate: '-3M',
      maxDate: 'M',
      numberOfMonths: 1
    });
    var vendorName;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,

      }),
      url: " http://15.206.129.105:8080/MerchandiseAPI/vendororder/selectvendor",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        vendorName += '<option value ="" disabled selected hidden >Select a vendor</option>';
        $.each(data.selectvendornamelist, function (i, item) {
          vendorName += '<option value="' + item.vendorId + '">' + item.vendorName + '</option>'
          var content = JSON.stringify({
            vendorName: item.vendorName,
            orderNumber: item.orderNumber,
            vendorId: item.vendorId,
            contactNo: item.contactNo,
          });

          vendorarray.push(content);

        });
        $("#vendorName").append(vendorName);

      },
      error: function (data) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Network Connection Problem',
          showConfirmButton: false,
          timer: 2000
        })

      }
    });

  }


  handleUserInput = (e) => {

    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });

  }


BackbtnFunc() {
  var planName = CryptoJS.AES.decrypt(localStorage.getItem("PlanName"),"shinchanbaby").toString(CryptoJS.enc.Utf8);

//	 alert("plantype"+planName);
 if(planName.toLowerCase() =="basic"){
    
     ReactDOM.render(
         <Router>
             <div >
                 <Route exact path="/" component={ReportMenuPageBasic} />
             
                 </div>
         </Router>, document.getElementById('contentRender'));
     registerServiceWorker();
 }
 else if(planName.toLowerCase() =="premium"){
  
     ReactDOM.render(
         <Router>
             <div >			
                 <Route exact path="/" component={ReportMenuPagePremium} />
              
             </div>
         </Router>,
            document.getElementById('contentRender'));
     registerServiceWorker();
 }
else if(planName.toLowerCase() =="elite"){


 ReactDOM.render(
     <Router>
         <div >	
             <Route exact path="/" component={ReportMenuPage} />
           
             </div>
     </Router>, 
     document.getElementById('contentRender'));
 registerServiceWorker();
}

}


  render() {
    return (


      <div class="container" style={{ height: "20px" }}>
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
          <ul class="previous disabled" id="backbutton"
          style={{
            backgroundColor: "#f1b6bf",
            float: "none",
            display: "inline-block",
            marginLeft: "5px",
            borderRadius: "5px",
            padding: "3px 7px 3px 7px"
          }}>

          <a onClick={() => this.BackbtnFunc()}><i class="arrow left"></i>Back</a></ul>
          </div>
          <div className="col-lg-9 col-md-9 col-sm-8 col-xs-6">
          <h3 >Vendor Statement</h3>
          </div>
        </div>
       
        <div class="card">
          
          <div class="card-body">
            <div class="form-group row">
              <div class="col-md-3">
                <form style={{ paddingBottom: '50px', position: 'inline-block', color: "black" }}>

                  <label htmlFor="fromDate" style={{ paddingRight: '50px', color: "black" }}> From:</label>

                  <input
                    style={{
                      width: '46%',
                      color: "black!important"
                    }}
                    type="text" className="form-control"
                    value={this.state.fromDate}
                    id="fromDate" name="fromDate"
                    onChange={this.handleUserInput} />
                </form>
              </div>
              <div class="col-md-3">
                <form style={{ paddingBottom: '50px', position: 'inline-block', color: "black" }}>
                  <label
                    htmlFor="toDate"
                    style={{ marginRight: '70px', color: "black" }}> To:</label>
                  <input
                    style={{
                      width: '50%',
                      color: "black!important"
                    }}
                    type="text" className="form-control"
                    value={this.state.toDate}
                    id="toDate" name="toDate"
                    onChange={this.handleUserInput} />
                </form>
              </div>
              <div class="col-md-3">
                <form style={{ paddingBottom: '50px', position: 'inline-block', color: "black" }}>
                <label
                    htmlFor="toDate"
                    style={{ marginRight: '70px', color: "black" }}> </label>
                 
                  <select style={{
                    width: '50%',
                    color: "black!important"
                  }} id="vendorName" className="form-control" onChange={this.handleVendorDetails} name="vendorName"
                    style={{ marginBottom: "15px" }} >

                  </select>

                </form>
              </div>

            </div>
          </div>

        </div>

      </div>

    );
  }
}

export default VendorCustomerStatement;