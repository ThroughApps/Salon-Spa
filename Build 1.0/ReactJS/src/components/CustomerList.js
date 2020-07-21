
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

import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import CustomerListView from './CustomerListView';
import CustomerListEdit from './CustomerListEdit';
import FooterText from './FooterText';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import "./DownloadButton.css";
import "./MainPageRedirectButton.css";
import CustomerEntryForm from './CustomerEntryForm';

var currentRow;
var i = 1;

class CustomerList1 extends Component {
  constructor(data) {
    super(data)
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var today = new Date();
    today = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    this.state = {
      staffId:staffId,
      employeeName:employeeName,
     role:role,      
      contactNo: '',   
      columns: [],
      dataList: [],
    }
  }
  componentDidMount() {
    $("#nodata").hide();
    $("#tableOverflow1").hide();
    this.GetData();
    window.scrollTo(0, 0);

  }
  GetData() {
    var self = this;
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,

      }),
      contentType: "application/json",
      dataType: 'json',
      url: " http://15.206.129.105:8080/MerchandiseAPI/master/customerreport",
      async: false,
      crossDomain: true,
      success: function (data, textStatus, jqXHR) {
        var no;
    
        self.state.dataList=[];
        if (data.customerRetrievelist.length != 0) {
          
          var tab = '<thead><tr class="headcolor"><th>S.No</th><th>Customer Name</th>'
          +'<th>Company Name</th><th>Address</th><th>Contact No</th>'
          +'<th>AlternateNo</th><th>EmailId</th><th>State</th>'
          +'<th>GSTNo</th></tr></thead>';

         $.each(data.customerRetrievelist, function (i, item) {
            no = parseInt(i) + 1;
            tab += '<tbody id= "myTable" ><tr  id="tabletextcol" ><td>' + no + '</td>'
            +'<td>' + item.customerName + '</td><td>' + item.companyName + '</td>'
            +'<td>' + item.address + '</td><td>' + item.contactNo + '</td>'
            +'<td class="alternatecontactNo">' + item.alternateContactNo + '</td>'
            +'<td>' + item.email + '</td><td>' + item.city + '</td>'
            +'<td class="gstNo">' + item.gstNo + '</td></tr></tbody>';

            
            self.state.dataList[i] = {
              "SNo":no,
              "CustomerName":item.customerName,
              "CompanyName":item.companyName,
              "Address":item.address,
              "ContactNo":item.contactNo,            
              "City":item.city,
              "AlternateNo":item.alternateContactNo,
              "GstNo":item.gstNo,
              "Email":item.email,
              "CustomerId":item.customerId,     
              "LandlineNo":item.landlineNo,         
              "Delete":< div class="updatedevice" id="updatedevice" style={{ textAlign: "center" }}><span style={{ fontSize: '1em', color: 'white' }}>
              <i class="fa fa-trash" style={{
                  border: "none",
                  padding: "6px 7px 5px 7px",
                  fontSize: "1em",
                  color: "white",
                  borderRadius: "18px",
                  backgroundColor: "tomato"
                
              }}>  </i>
          </span></div>,
              "View": < div class="updatedevice" id="updatedevice" style={{ textAlign: "center" }}><span style={{ fontSize: '1em', color: 'white' }}>
              <i class="glyphicon glyphicon-eye-open" style={{
                  border: "none",
                  padding: "6px 7px 5px 7px",
                  fontSize: "1em",
                  color: "white",
                  borderRadius: "18px",
                  backgroundColor: "#337ab7"
              }}></i>
          </span></div>,
              "Update":  < div class="updatedevice" id="updatedevice" style={{ textAlign: "center" }}><span style={{
                fontSize: '1em', color: 'white', padding: "3px 3px 5px 4px",
                fontSize: "1em",
                borderRadius: "12px",
                backgroundColor: "mediumseagreen"
            }}>
                <i class="glyphicon glyphicon-pencil" style={{ border: "none" }}></i>
            </span></div>            
            };
        
          });
          $("#tableHeadings").append(tab);
          if (self.state.dataList.length > 0) {
            self.state.columns = self.getColumns();
          }
            } else {
          $("#nodata").show();
        
        }
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
  getColumns() {
    return Object.keys(this.state.dataList[0]).map(key => {
        
      if (
        key != "City" &&
        key != "AlternateNo" &&       
        key != "GstNo" &&
        key != "Email" &&
        key != "CustomerId"&&
        key != "LandlineNo"
      ) {
        return {
          Header: key,
          accessor: key
        };
      } else {
        return {
          Header: key,
          accessor: key,
          show: false
        };
      }
    });
  }

  onRowClick = (state, rowInfo, column, instance) => {
    var self=this;
    return {

      onClick: (e, handleOriginal) => {

        if (column.Header === "Update") {

          if(rowInfo!=undefined){
          var rowIndexValue = rowInfo["index"];
         
          var customerName =rowInfo.original["CustomerName"];
          var companyName =rowInfo.original["CompanyName"];
          var address = rowInfo.original["Address"];
          var contactNo =rowInfo.original["ContactNo"];
          var city = rowInfo.original["City"];
          var alternateContactNo = rowInfo.original["AlternateNo"];
          var gstNo = rowInfo.original["GstNo"];
          var email = rowInfo.original["Email"];
          var customerId = rowInfo.original["CustomerId"];
          var landlineNo= rowInfo.original["LandlineNo"];
         
          this.state.customerName = customerName;
          this.state.companyName = companyName;
          this.state.address = address;
          this.state.contactNo = contactNo;
          this.state.city = city;
          this.state.alternateContactNo = alternateContactNo;
          this.state.gstNo = gstNo;
          this.state.email = email;
          this.state.customerId = customerId;
          this.state.landlineNo=landlineNo;
          this.setState({
            customerName: this.state.customerName,
            companyName: this.state.companyName,
            address: this.state.address,
            contactNo: this.state.contactNo,
            city: this.state.city,
            alternateContactNo: this.state.alternateContactNo,
            gstNo: this.state.gstNo,
            email: this.state.email,
            customerId: this.state.customerId,
          landlineNo:this.state.landlineNo,
        });
          ReactDOM.render(
            <Router>
              <div>

                <Route path="/" component={() => <CustomerListEdit customerName={this.state.customerName}
        companyName={this.state.companyName} address={this.state.address} 
        contactNo={this.state.contactNo} city={this.state.city} gstNo={this.state.gstNo} 
        email={this.state.email} alternateContactNo={this.state.alternateContactNo}
         customerId={this.state.customerId} landlineNo={this.state.landlineNo}
        />} />

              </div>
            </Router>,
            document.getElementById('contentRender'));
          }

        } else if (column.Header === "Delete") {

          if(rowInfo!=undefined){
          var rowIndexValue = rowInfo["index"];
          var customerId =  rowInfo.original["CustomerId"];
          var customerName =rowInfo.original["CustomerName"];
          var contactNo =rowInfo.original["ContactNo"];
       
          this.state.customerId = customerId;
          this.state.customerName = customerName;
          this.state.contactNo = contactNo;
          this.setState({
            customerId: this.state.customerId,
            customerName:this.state.customerName,
            contactNo:this.state.contactNo,
          });

          var rowIndexValue=rowInfo.index;
       
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Do you Want to Delete '+self.state.customerName,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
         //   timer: 1500
          }).then((result) => {
            if (result.value) {
              self.Delete(rowIndexValue) 

            // For more information about handling dismissals please visit
            // https://sweetalert2.github.io/#handling-dismissals
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire({
                position:'center',
                icon:'warning',
                title:'Cancelled Deletion Of '+self.state.customerName,
                showConfirmButton: false,
                timer:2000,
              })
            }
          })

        }
        } else if (column.Header === "View") {

          if(rowInfo!=undefined){
          var rowIndexValue = rowInfo["index"];
         
          var customerName =rowInfo.original["CustomerName"];
          var companyName =rowInfo.original["CompanyName"];
          var address = rowInfo.original["Address"];
          var contactNo =rowInfo.original["ContactNo"];
          var city = rowInfo.original["City"];
          var alternateContactNo = rowInfo.original["AlternateNo"];
          var gstNo = rowInfo.original["GstNo"];
          var email = rowInfo.original["Email"];
          var customerId = rowInfo.original["CustomerId"];        
          var landlineNo= rowInfo.original["LandlineNo"];


          this.state.customerName = customerName;
          this.state.companyName = companyName;
          this.state.address = address;
          this.state.contactNo = contactNo;
          this.state.city = city;
          this.state.alternateContactNo = alternateContactNo;
          this.state.gstNo = gstNo;
          this.state.email = email;
          this.state.customerId = customerId;
          this.state.landlineNo=landlineNo;
          ReactDOM.render(
            <Router>
              <div>

                <Route path="/" component={() => <CustomerListView customerName={this.state.customerName}
        companyName={this.state.companyName} address={this.state.address} landlineNo={this.state.landlineNo} contactNo={this.state.contactNo} city={this.state.city} gstNo={this.state.gstNo} email={this.state.email} alternateContactNo={this.state.alternateContactNo} customerId={this.state.customerId}
     />} />

              </div>
            </Router>,
            document.getElementById('contentRender'));


        }
      }
      }
    };
  };



  Delete(rowIndexValue) {
    var self = this;

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        contactNo: self.state.contactNo,
        companyId: self.state.companyId,
        staffId:this.state.staffId,
        employeeName:this.state.employeeName,
        role:this.state.role,
        customerId:self.state.customerId,
        customerName:self.state.customerName,

      }),
      url: " http://15.206.129.105:8080/MerchandiseAPI/master/deletecustomer",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {
       
        var array = [...self.state.dataList]; // make a new copy of array instead of mutating the same array directly.
        array.splice(rowIndexValue, 1);
        self.state.dataList=[];
        self.state.dataList=array;
        self.setState({dataList: array});

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

  NoAction() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={CustomerList1} />
        </div>
      </Router>,
      document.getElementById('contentRender'));

  }
  BackbtnFunc() {
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={DashboardOverall} />


        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }

  AddCustomerPageFunc(){
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={CustomerEntryForm} />


        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }
  render() {
    const  downloadButtonData=<span style={{fontWeight:"700",fontWeight: "900",fontSize:"15px"}}>Download</span>
               
  
    return (

      <div className="container" style={{ paddingTop: "0px" }}>
        <div class="card">
        <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4">
                        <ul class="previous disabled" id="backbutton"
                    style={{
                        backgroundColor: "#f1b6bf",
                        float: "none",
                        display: "inline-block",
                        marginLeft: "5px",
                        borderRadius: "5px",
                        padding: "3px 7px 3px 7px",
                        marginTop:"13px",
                        display:"inline-block"
                    }}>
                    <a  href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i>Back</a></ul>

                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-xs-8">
                        <div class="card-header">
                        <h3 >Customer List</h3>   </div>
                  
                    </div>
            </div>
      <div class="card-body">
        <div class="form-horizontal form-bordered">
        
    </div>

        <div style={{ display: "grid",overflow:"auto" }}>
        <div className="row">
        <div className="col-sm-4 col-lg-8 col-md-8">
        
        </div>
        <div className="col-sm-4 col-lg-2 col-md-2">
        <a class="pageredirectbtn" href="#"  onClick={() => this.AddCustomerPageFunc()}>
          <span style={{fontWeight:"700",fontWeight: "900",fontSize:"15px"}}>+ Customer</span>
         </a>
</div>
<div className="col-sm-4 col-lg-2 col-md-2">
    
<div class="buttonright" >
                  <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="pageredirectbtn download-table-xls-button "
                    table="tableHeadings"
                    filename="Customer_List"
                    sheet="tablexls"
                    buttonText={downloadButtonData}      />
                </div>
</div>
        </div>
     
                <div id="tableOverflow1">
                  <table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">
                  </table>
                </div>

          <div id="tableOverflow" class="hideContent">
        
            <ReactTable style={{overflow:"auto"}}
              data={this.state.dataList}
              columns={this.state.columns}
              noDataText="No Data Available"
              filterable
              defaultPageSize={5}
              className="-striped -highlight"
              defaultFilterMethod={(filter, row, column) => {
                const id = filter.pivotId || filter.id;
                return row[id] !== undefined
                  ? String(row[id])
                    .toLowerCase()
                    .indexOf(filter.value.toLowerCase()) !== -1
                  : true;
              }}
              showPaginationTop={true}
              showPaginationBottom={false}
              getTdProps={this.onRowClick}
            />
          </div>
        </div>

        <h4 id="nodata" class="hideContent" style={{ textAlign: "center" }}>
          No Data
      </h4>

      </div>
      </div>
    </div>
    );
  }

}

export default CustomerList1;