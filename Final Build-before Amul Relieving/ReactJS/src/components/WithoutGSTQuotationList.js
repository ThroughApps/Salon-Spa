import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import QuotationList from './QuotationList';
import WithoutGSTQuotationReportDisplay from './WithoutGSTQuotationReportDisplay';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import './DownloadButton.css';
import "./MainPageRedirectButton.css";
import WithoutGSTQuotation1 from './WithoutGSTQuotation';


var currentRow;
class WithoutGSTQuotationList1 extends Component {
  constructor(data) {
    super(data)

    var today = new Date();
    today = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
 var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
 var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)


   
    this.state = {
      date: today,
      companyId:companyId,
      staffId:staffId,
      employeeName:employeeName,
     role:role,    
     
      columns: [],
      dataList: [],  

    };
  }

  componentDidMount() {
    $("#tableHeadings").hide();
    $("#nodata").hide();
    this.GetData();
    window.scrollTo(0, 0);
  }
  GetData() {
    var self=this;
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
        companyId: companyId,
    });
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId:this.state.companyId,
     
  }),
      url: " http://15.206.129.105:8080/MerchandiseAPI/quotation/withoutgstquotationreport",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        if(data.withoutgstquotationreportlist.length!=0){
          var tab = '<thead><tr class="headcolor"><th>S.No</th><th>Invoice</th><th>date</th><th>Name</th><th>Contact</th><th>Address</th><th>Total(Rs)</th></tr></thead>';
  
 var no;
 self.state.dataList=[];
  $.each(data.withoutgstquotationreportlist, function (i, item) {
    no=parseInt(i)+1;
    tab += '<tbody id= "myTable" ><tr id="tabletextcol" ><td>' + no + '</td><td>' + item.invoiceNo + '</td><td>' + item.date + '</td><td>' + item.customerName + '</td><td>' + item.contactNo + '</td><td>' + item.address+'</td><td>' + item.finalAmountTotal + '</td></tr></tbody>';
  
    self.state.dataList[i] = {
      "SNo":no,
      "Invoice":item.invoiceNo,
      "Date":item.date,
      "Name":item.customerName,
      "Contact":item.contactNo,
      "Address":item.address,     
      "Total(Rs)":item.finalAmountTotal,
      "CompanyName":item.companyName,
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
     
    }   
  });
  $("#tableHeadings").append(tab);
  if (self.state.dataList.length > 0) {
    self.state.columns = self.getColumns();
  }
          }
        else{
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
        key != "CompanyName" 
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

        if (column.Header === "Delete") {

          if(rowInfo!=undefined){
          var rowIndexValue = rowInfo["index"];
       
          var invoiceNo = rowInfo.original["Invoice"];
          var date =rowInfo.original["Date"];
          var customerName = rowInfo.original["Name"];   
          this.state.invoiceNo = invoiceNo;
          this.state.date = date;
          this.state.customerName=customerName;
          this.setState({
            invoiceNo: this.state.invoiceNo,
            date:this.state.date,        
            customerName:this.state.customerName,
          });
          var rowIndexValue=rowInfo.index;
        
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Do you Want to Delete '+self.state.invoiceNo,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
         //   timer: 1500
          }).then((result) => {
            if (result.value) {
              self.DeleteFunc(rowIndexValue) 

            // For more information about handling dismissals please visit
            // https://sweetalert2.github.io/#handling-dismissals
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire({
                position:'center',
                icon:'warning',
                title:'Cancelled Deletion Of '+self.state.invoiceNo,
                showConfirmButton: false,
                timer:2000,
              })
            }
          })

        }

        } else if (column.Header === "View") {

          if(rowInfo!=undefined){
          var rowIndexValue = rowInfo["index"];

          var invoiceNo =rowInfo.original["Invoice"];
          var date =rowInfo.original["Date)"];
          var userName = rowInfo.original["Name"];
          var contact =rowInfo.original["Contact"];
          var companyName = rowInfo.original["CompanyName"];
         
          this.state.invoiceNo = invoiceNo;
          this.state.date = date;
          this.state.userName = userName;
          this.state.contact = contact;
          this.state.companyName = companyName;        

        
          this.setState({
            invoiceNo: this.state.invoiceNo,
            userName: this.state.userName,
            companyName: this.state.companyName,
            contact: this.state.contact,
            date: this.state.date,        
          
          });
          ReactDOM.render(
            <Router>
              <div>
                <Route path="/" component={() => <WithoutGSTQuotationReportDisplay 
                userName={this.state.userName}
                companyName={this.state.companyName} invoiceNo={this.state.invoiceNo} 
  />} />

              </div>
            </Router>,
            document.getElementById('contentRender'));


                }
        }
      }
    };
  };


  NoAction() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={WithoutGSTQuotationList1} />
        </div>
      </Router>,
      document.getElementById('contentRender'));
  
  }
  DeleteFunc(rowIndexValue)
  {
      var self=this;
  
      $.ajax({
          type: 'POST',
          data: JSON.stringify({
            invoiceNo:self.state.invoiceNo,
              date:self.state.date,
              companyId:self.state.companyId,
              customerName:self.state.customerName,
              staffId: self.state.staffId,
                   employeeName: self.state.employeeName,
                   role: self.state.role,
          }),
         url: " http://15.206.129.105:8080/MerchandiseAPI/QuotationReport/DeleteWithoutGSTQuotationReport",
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

  GSTQuotationList(){
    ReactDOM.render(
        <Router>
            <div>
  
                <Route path="/" component={QuotationList} />
              </div>
        </Router>,
        document.getElementById('contentRender'));
    registerServiceWorker();
  }
  WithoutGSTQuotationList(){
    ReactDOM.render(
        <Router>
            <div>
  
                <Route path="/" component={WithoutGSTQuotationList1} />
              </div>
        </Router>,
        document.getElementById('contentRender'));
    registerServiceWorker();
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

  AddWithoutGSTQuotation(){
    ReactDOM.render(
      <Router>
        <div>
        
          <Route path="/" component={WithoutGSTQuotation1} />
        
  
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
                      <h3>WithoutGSTQuotation List</h3>   </div>
                
                  </div>
          </div>
          <ul class="nav nav-tabs">
    <li ><a  style={{color:"black",fontWeight:"bold"}}  className="active"  onClick={() => this.GSTQuotationList()}><span style={{display:"inline-grid"}}>GSTQuotation List</span></a></li>
    <li class="active"><a  style={{color:"black",fontWeight:"bold"}}   onClick={() => this.WithoutGSTQuotationList()}><span style={{display:"inline-grid"}}>WithoutGSTQuotation List</span></a></li>
                    
  </ul>
    <div class="card-body">
      <div class="form-horizontal form-bordered">
      
  </div>

  

      <div style={{ display: "grid" }}>

   <div className="row">
        <div className="col-sm-4 col-lg-8 col-md-8">
        
        </div>
        <div className="col-sm-4 col-lg-2 col-md-2">
        <a class="pageredirectbtn" href="#"  onClick={() => this.AddWithoutGSTQuotation()}>
          <span style={{fontWeight:"700",fontWeight: "900",fontSize:"15px"}}>+ Quotation</span>
         </a>
</div>
<div className="col-sm-4 col-lg-2 col-md-2">
    
<div class="buttonright" >
                  <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                     table="tableHeadings"
                    filename="WithoutGSTQuotation"
                    sheet="tablexls"
					 className="pageredirectbtn download-table-xls-button "
                    buttonText={downloadButtonData}      />
                </div>
                <div id="tableOverflow">
          <table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">

          </table>
        </div>
</div>
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

export default WithoutGSTQuotationList1;