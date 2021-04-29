import React, { Component } from "react";
import $ from "jquery";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import LoginPage from "./LoginPage";
import CryptoJS from "crypto-js";
import registerServiceWorker from "./registerServiceWorker";

//import moment from 'moment';
import * as XLSX from 'xlsx';
import _ from 'underscore';
import ReactTable from "react-table";
import "react-table/react-table.css";
import ReportMenuPage from "./ReportMenuPage";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Pagination from "react-js-pagination";
import moment from 'moment';

var count = 0;
var xlsRows = [];
var dataCount = 0;
var dataCountArray = [];
var itemData = 1;
var pageArray = [];
var localPageData = [];
var localPagePreviousShiftData = [];

class ScheduledShiftReport extends Component {
  constructor(props) {
    super(props);
    var PermissionHeader = CryptoJS.AES.decrypt(
      localStorage.getItem("PermissionHeader"),
      "shinchanbaby"
    ).toString(CryptoJS.enc.Utf8);

    var today = new Date();
    var currentMonth = (today.getMonth() + 1);
    var currentYear = today.getFullYear();
    var today1 = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var today2=today.getFullYear()+'-'+("0" + (today.getMonth() + 1)).slice(-2)+'-'+("0" + (today.getDate())).slice(-2);
  

    this.state = {
      data: [],
      columns: [],
      date: today2,
      totlaItemCount: 0,
      itemsPerPage: 10,
      activePage: 1,
      

    };
  }


  componentDidMount() {

    var self = this;
    dataCount = 0;
    dataCountArray = [];
    itemData = 1;
    pageArray = [];

    dataCountArray.push(dataCount);
    pageArray.push(1);
    xlsRows = [];
   // this.state.date = '';

    $("#tableHeadings").hide();
   

   
    self.Submit();


  }






  Submit() {

    var self = this;

  // var companyId = CryptoJS.AES.decrypt(localStorage.getItem("CompanyId"), "shinchanbaby").toString(CryptoJS.enc.Utf8);
  // var employeeId = CryptoJS.AES.decrypt(localStorage.getItem("EmployeeId"), "shinchanbaby").toString(CryptoJS.enc.Utf8);
   var employeeId = '001';
   var companyId = '001';
    this.state.companyId = companyId;
    this.state.employeeId = employeeId;
    this.setState({
      companyId: this.state.companyId,
      employeeId: this.state.employeeId
    });

    self.state.data = [];
    self.state.columns = [];
    xlsRows = [];
    var today = new Date();
    var currentMonth = (today.getMonth() + 1);
    var currentYear = today.getFullYear();
    var today1 = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var date=today.getFullYear()+'-'+("0" + (today.getMonth() + 1)).slice(-2)+'-'+("0" + (today.getDate())).slice(-2);
 
    


   

      $.ajax({
        type: "POST",
        data: JSON.stringify({
          companyId: this.state.companyId,
          employeeId: this.state.employeeId,     
          dataCount: dataCount,       
          totlaItemCount: this.state.totalItemCount,
          date:date,
        }),
        //  url: "http://15.206.129.105:8080/EmployeeAttendenceAPI/EmployeeReportPaging/ScheduledShiftReport",
        //url: "http://15.206.129.105:8080/EmployeeAttendenceAPI/EmployeeReportPaging/PeriodWiseShiftHistoryReport",
        url: "http://15.206.129.105:8080/MerchandiseAPI/EmployeeReportPaging/ScheduledShiftReport",

        contentType: "application/json",
        dataType: "json",
        async: false,
        success: function (data, textStatus, jqXHR) {
          window.scrollTo(0, 0);
          console.log("DATA:", data);
          console.log("DATA FROM BACKEND:", data.scheduledShiftReportList);
    
        


          var count = 0;

          if (data.scheduledShiftReportList.length != 0) {

            self.state.downloadData = "yes";
            if (itemData == "1") {
              self.state.totlaItemCount = data.totlaItemCount;           
              itemData = Number(itemData) + 1;
            }


            localPageData[self.state.activePage] = [];
            localPageData[self.state.activePage].push(data.scheduledShiftReportList);

            var datavalue = 0;
var count=0;
            $.each(data.scheduledShiftReportList, function (i, itemk) {
            //  var shiftloop = itemk.shiftLoop.split(',');
            //  var timingsloop = itemk.timingsLoop.split(',');
            //  var descriptionloop = itemk.descriptionLoop.split(',');
            //  var workLocationloop = itemk.workLocationLoop.split(',');
              
            //   for(var i = 0; i < shiftloop.length; i++)
            //   {
            //      alert(shiftloop[i]+':'+timingsloop[i]+','+descriptionloop[i]+','+workLocationloop[i]+','+
            //      shiftloop[i+1]+':'+timingsloop[i+1]+','+descriptionloop[i+1]+','+workLocationloop[i+1]);

            //   }
            
              self.state.data[datavalue] = {
                
                "SNO": Number(count) + 1,
                "Shift": itemk.shiftLoop,
                "Timings": itemk.timingsLoop,
                "Description": itemk.descriptionLoop,
                "WorkLocation":itemk.workLocationLoop,
                "FromDate": itemk.fromDate,
                "ToDate": itemk.toDate,
                "ShiftDescription":itemk.shiftDescription,

                
              }
              datavalue=datavalue+1;
              count=count+1;
            });


            self.state.columns = self.getColumns();

            self.setState({
              data: self.state.data,
              columns: self.state.columns,
            });

            var dataCount1 = data.dataCount;

            var dataCount_Status = _.contains(dataCountArray, dataCount1);
            console.log("DATA COUNT ARRAY BEFORE:", dataCountArray);

            if (dataCount_Status == false) {
              dataCountArray.push(dataCount1);
            }

          } else {
            itemData = "1";
            self.state.totlaItemCount = 0;
            self.state.downloadData = "no";

          }

        },
        error: function (data) {
          confirmAlert({
            title: "No Internet", // Title dialog
            message: "Network Connection Problem", // Message dialog
            confirmLabel: "Ok" // Text button confirm
          });
        }
      });

     

  }


  getColumns() {

    return Object.keys(this.state.data[0]).map(key => {

      return {
        Header: key,
        accessor: key
      };

    });
  }

  DownloadExcel() {


    var self = this;
    if (xlsRows.length != 0) {
      self.GenerateExcel();
    } else {
      if ( self.state.downloadData == "yes") {
        self.GetPeriodWiseShiftData_Download();
        self.GenerateExcel();
      }  else {
        confirmAlert({
          title: "Download Failed", // Title dialog
          message: "No File For Download Since No Data", // Message dialog
          confirmLabel: "Ok" // Text button confirm
        });
      }

    }



  }

  DownloadPDF() {

    var self = this;
    if (xlsRows.length != 0) {
      self.GeneratePDF();
    } else {
      if (self.state.downloadData == "yes") {
        self.GetPeriodWiseShiftData_Download();
        self.GeneratePDF();
      } else {
        confirmAlert({
          title: "Download Failed", // Title dialog
          message: "No File For Download Since No Data", // Message dialog
          confirmLabel: "Ok" // Text button confirm
        });
      }
    }

  }

  GenerateExcel() {
    var createXLSLFormatObj = [];


    /* XLS Head Columns */
    var xlsHeaderMain = ["SCHEDULED SHIFT REPORT" ];
    createXLSLFormatObj.push(xlsHeaderMain);


    /* XLS Head Columns */
    var xlsHeader = ["S.NO", "Shift", "Timings","Description","WorkLocation","StartDate", "EndDate","ShiftDescription"];
    createXLSLFormatObj.push(xlsHeader);

    var indexValue = 0;

    var listInnerRowData = [];

    for (var z = 0; z < xlsRows.length; z++) {

      if (xlsRows[z] != "+") {
        listInnerRowData.push(xlsRows[z]);
      } else {
        createXLSLFormatObj.push(listInnerRowData);
        listInnerRowData = [];
      }
      indexValue = z;
    }


    /* File Name */
    var filename = "scheduledShiftReport.xlsx";

    /* Sheet Name */
    var ws_name = "scheduledShiftReport";

    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.aoa_to_sheet(createXLSLFormatObj);


    /* set column width */
    var wscols = [
      { wch: 15 },
      { wch: 15 },
      { wch: 40 },
      { wch: 25 },
      { wch: 25 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      ,
      { hidden: true }, // hide column,

    ];

    /* set row height */
    var wsrows = [
      { hpt: 25 }, // "points"
      // {hpx: 16}, // "pixels"
      ,
      // {hpx: 24, level:3},
      // {hidden: true}, // hide row
      // {hidden: false}
    ];

    /*add column width */
    ws['!cols'] = wscols;

    /* add row height */
    ws['!rows'] = wsrows;

    /* Add worksheet to workbook */
    XLSX.utils.book_append_sheet(wb, ws, ws_name);

    /* Write workbook and Download */
    XLSX.writeFile(wb, filename, { cellStyles: true });


  }

  GeneratePDF() {
    var doc = new jsPDF();
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(11);
    doc.text("SCHEDULED SHIFT REPORT" + "", 10, 10);
    var indexValue = 0;
    var pdfData = [];
    var listInnerRowData = [];

    for (var z = 0; z < xlsRows.length; z++) {

      if (xlsRows[z] != "+") {
        listInnerRowData.push(xlsRows[z]);
      } else {
        pdfData.push(listInnerRowData);
        listInnerRowData = [];
      }
      indexValue = z;
    }
    /* File Name */

    var filename = "scheduledShiftReport.pdf";
    doc.autoTable({
      head: [["S.NO", "Shift", "Timings","Description","WorkLocation","StartDate", "EndDate","ShiftDescription"]],
      body: pdfData,
    }
    );

    doc.save(filename);
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.state.activePage = pageNumber;
    this.setState({ activePage: pageNumber });

    var self = this;

    var pageData_Status = _.contains(pageArray, pageNumber);
    dataCount = 0;
    if (pageData_Status == false) {
      pageArray.push(pageNumber);
      dataCount = Math.round((Number(dataCount)) + ((Number(pageNumber) - 1) * 10));

      this.Submit();

    } else {

      console.log("DATA IN STORED ARRAY LOCAL PAGE :", localPageData[self.state.activePage][0]);

      self.state.data = [];
      self.state.columns = [];
      count = 0;

    
      var datavalue = 0;

      $.each(localPageData[self.state.activePage][0], function (i, itemk) {

 
        // count = Number(count) + 1;
        self.state.data[datavalue] = {
          "SNO": Number(count) + 1,
          "Shift": itemk.shiftLoop,
          "Timings": itemk.timingsLoop,
          "Description": itemk.descriptionLoop,
          "WorkLocation":itemk.workLocationLoop,
          "FromDate": itemk.fromDate,
          "ToDate": itemk.toDate,
          "ShiftDescription":itemk.shiftDescription,
          
        }
datavalue=datavalue+1;
count=count+1;
      });



      self.state.columns = self.getColumns();

      self.setState({
        data: self.state.data,
        columns: self.state.columns,
      })

    }



  }



  GetPeriodWiseShiftData_Download() {


    var self = this;

   // var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)


   var companyId = '001';
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });

    xlsRows = [];
    var today = new Date();
    var currentMonth = (today.getMonth() + 1);
    var currentYear = today.getFullYear();
    var today1 = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var date=today.getFullYear()+'-'+("0" + (today.getMonth() + 1)).slice(-2)+'-'+("0" + (today.getDate())).slice(-2);
 
      $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,       
        date:date,
      }),
      // url: "http://15.206.129.105:8080/EmployeeAttendenceAPI/excelDownload/PeriodWiseShiftWiseReport",
      //url: "http://15.206.129.105:8080/EmployeeAttendenceAPI/excelDownload/ScheduledShiftReport",
      url: "http://15.206.129.105:8080/MerchandiseAPI/excelDownload/ScheduledShiftReport",

      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        console.log("data", data)
        count = 0;


        if (data.scheduledShiftReportListExcel.length != 0) {

       



          $.each(data.scheduledShiftReportListExcel, function (i, itemk) {
          
          

            xlsRows.push(Number(count) + 1);
            xlsRows.push(itemk.shiftLoop);
            xlsRows.push(itemk.timingsLoop);
            xlsRows.push(itemk.descriptionLoop);
            xlsRows.push(itemk.workLocationLoop);        
            xlsRows.push(itemk.fromDate);
            xlsRows.push(itemk.toDate);
            xlsRows.push(itemk.shiftDescription);
        
            xlsRows.push("+");
       
count=count+1;
          });




          console.log("XLS ROW DATA :", xlsRows);


        } else {

          xlsRows = [];


        }


      },
      error: function (data) {
        confirmAlert({
          title: "No Internet", // Title dialog
          message: "Network Connection Problem", // Message dialog
          confirmLabel: "Ok" // Text button confirm
        });
      }

    });




  }







  BackbtnFunc() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={ReportMenuPage} />
        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }

  render() {
    return (
      <div className="container">
        <ul class="previous disabled" id="backbutton"
          style={{
            backgroundColor: "#f1b6bf",
            float: "none",
            display: "inline-block",
            marginLeft: "5px",
            borderRadius: "5px",
            padding: "3px 7px 3px 7px"
          }}>
          <a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i>Back</a></ul>


        <h4 style={{ textAlign: "center" }}>Scheduled Shift Report - {this.state.date} </h4>


        <div style={{ display: "grid" }}>
          <div id="tableOverflow" className="hideContent">
            <div className="row" style={{ margin: "12px 12px 0px 12px" }}>
              <div class="col-sm-8 col-lg-8 col-md-8 "></div>

              <div class="col-sm-2 col-lg-2 col-md-2 "
                style={{
                  padding: "0px 10px",
                  marginBottom: "30px"
                }}
                id="detailedReport">
                <button href="#" onClick={() => this.DownloadPDF()}>Download As PDF</button>

              </div>

              <div >
                <div class="col-sm-2 col-lg-2 col-md-2 ">
                  <div >
                    <button href="#" onClick={() => this.DownloadExcel()}>Download As Excel</button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
        <div style={{ marginBottom: "3%" }}>
          <ReactTable style={{ overflow: "auto" }}
            data={this.state.data}
            columns={this.state.columns}
            noDataText="No Data Available"
            filterable
            defaultPageSize={10}
            className="-striped -highlight"
            defaultFilterMethod={(filter, row, column) => {
              const id = filter.pivotId || filter.id;
              return row[id] !== undefined
                ? String(row[id])
                  .toLowerCase()
                  .indexOf(filter.value.toLowerCase()) !== -1
                : true;
            }}
            showPaginationTop={false}
            showPaginationBottom={true}
            getTdProps={this.onRowClick}

          />
        </div>


        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.itemsPerPage}
          totalItemsCount={this.state.totlaItemCount}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
        />

        <div />
      </div>


    );
  }
}
export default ScheduledShiftReport;
