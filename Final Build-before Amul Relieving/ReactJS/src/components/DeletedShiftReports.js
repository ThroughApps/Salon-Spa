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

class DeletedShiftReports extends Component {
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
    var year= today.getFullYear() ;
   var dateAdd = moment().subtract(7, 'd').toDate();
 
 var fromDate=dateAdd.getFullYear()+'-'+("0" + (dateAdd.getMonth() + 1)).slice(-2)+'-'+("0" + (dateAdd.getDate())).slice(-2);


    this.state = {
      data: [],
      columns: [],
      date: today1,
      totlaItemCount: 0,
      itemsPerPage: 10,
      activePage: 1,
      fromDate: fromDate,
      toDate: today2,

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
    this.state.date = '';

    $("#tableHeadings").hide();
    $('#date').datepicker({

      onSelect: function (date) {

        var dt = new Date(date);
        self.state.date = date;

        self.setState({
          date: self.state.date,
        });

        dataCount = 0;
        dataCountArray = [];
        itemData = 1;
        pageArray = [];
        pageArray.push(1);
        dataCountArray.push(dataCount);
        xlsRows = [];

        self.Submit();
      },

      dateFormat: 'yy-mm-dd',
      minDate: '-1M',
      maxDate: '0',
      numberOfMonths: 1
    });

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



  }






  Submit() {

    var self = this;

   //var companyId = CryptoJS.AES.decrypt(localStorage.getItem("CompanyId"), "shinchanbaby").toString(CryptoJS.enc.Utf8);
 //    var employeeId = CryptoJS.AES.decrypt(localStorage.getItem("EmployeeId"), "shinchanbaby").toString(CryptoJS.enc.Utf8);
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


    if (this.state.fromDate != "" && this.state.toDate != "") {

      $.ajax({
        type: "POST",
        data: JSON.stringify({
          companyId: this.state.companyId,
          employeeId: this.state.employeeId,
          fromDate1: self.state.fromDate,
          toDate1: self.state.toDate,
          dataCount: dataCount,
          fromDate:self.state.fromDate,
          totlaItemCount: this.state.totalItemCount,
        }),
        //  url: "http://15.206.129.105:8080/EmployeeAttendenceAPI/EmployeeReportPaging/PeriodWiseShiftHistoryReport",
        //url: "http://15.206.129.105:8080/EmployeeAttendenceAPI/EmployeeReportPaging/PeriodWiseShiftHistoryReport",
        url: "http://15.206.129.105:8080/MerchandiseAPI/EmployeeReportPaging/deletedShiftReport",

        contentType: "application/json",
        dataType: "json",
        async: false,
        success: function (data, textStatus, jqXHR) {
          window.scrollTo(0, 0);
          console.log("DATA:", data);
          console.log("DATA FROM BACKEND:", data.deletedShiftReportList);
    
        


          var count = 0;

          if (data.deletedShiftReportList.length != 0) {

            self.state.downloadData = "yes";
            if (itemData == "1") {
              self.state.totlaItemCount = data.totlaItemCount;
           
              itemData = Number(itemData) + 1;
            }


            localPageData[self.state.activePage] = [];
            localPageData[self.state.activePage].push(data.deletedShiftReportList);

            var datavalue = 0;
var count=0;
var totalDataCount = 0;
            $.each(data.deletedShiftReportList, function (i, itemk) {
             

              if(itemk.status=="2")
              {
                self.state.status="Premanently Deleted";
              }else{
               self.state.status="Temporarily Deleted";
              }
            
              self.state.data[datavalue] = {
                
                "SNO": Number(count) + 1,

                "Shift": itemk.currentLocation,
                "Description": itemk.description,
                "StartDate": itemk.startDate,
                "EndDate": itemk.endDate,
                "Status":self.state.status,
                
              }
              totalDataCount = Number(totalDataCount) + 1;

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

    } else {
      confirmAlert({
        title: "Error", // Title dialog
        message: "Kindly Select From & To Date", // Message dialog
        confirmLabel: "Ok" // Text button confirm
      });
    }

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
      if (self.state.fromDate != "" && self.state.toDate != "" && self.state.downloadData == "yes") {
        self.GetPeriodWiseShiftData_Download();
        self.GenerateExcel();
      } else if (self.state.fromDate == "" || self.state.toDate == "") {
        confirmAlert({
          title: "Error", // Title dialog
          message: "Kindly Select From & To Date To Proceed", // Message dialog
          confirmLabel: "Ok" // Text button confirm
        });
      } else {
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
      if (self.state.fromDate != "" && self.state.toDate != "" && self.state.downloadData == "yes") {
        self.GetPeriodWiseShiftData_Download();
        self.GeneratePDF();
      } else if (self.state.fromDate == "" || self.state.toDate == "") {
        confirmAlert({
          title: "Error", // Title dialog
          message: "Kindly Select From & To Date To Proceed", // Message dialog
          confirmLabel: "Ok" // Text button confirm
        });
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
    var xlsHeaderMain = ["DELETED SHIFT REPORT LIST" + " [ " + this.state.fromDate + " - " + this.state.toDate + " ]"];
    createXLSLFormatObj.push(xlsHeaderMain);


    /* XLS Head Columns */
    var xlsHeader = ["S.NO", "SHIFT", "DESCRIPTION","START DATE", "END DATE","STATUS"];
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
    var filename = "deletedShiftReport.xlsx";

    /* Sheet Name */
    var ws_name = "deletedShiftReport";

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
    doc.text("DELETED SHIFT REPORT LIST" + " [ " + this.state.fromDate + " - " + this.state.toDate + " ]", 10, 10);
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
    var filename = "deletedShiftReport.pdf";
    doc.autoTable({
      head: [["S.NO", "Shift", "Description","StartDate", "EndDate","Status"]],
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
      var totalDataCount = 0;
      $.each(localPageData[self.state.activePage][0], function (i, item) {

     if(item.status=="2")
     {
       self.state.status="Premanently Deleted";
     }else{
      self.state.status="Temporarily Deleted";
     }
        // count = Number(count) + 1;
        self.state.data[datavalue] = {
          "SNO": Number(count) + 1,
          "Shift": item.currentLocation,
        "Description": item.description,
          "StartDate": item.startDate,
          "EndDate":item.endDate,
          "Status":self.state.status,
          
        }
datavalue=datavalue+1;

totalDataCount = Number(totalDataCount) + 1;

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

    //var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)


   var companyId = '001';
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });

    xlsRows = [];

    //alert("datatobackend"+ this.state.companyId+"-"+this.state.fromDate+"-"+this.state.toDate);
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,
        fromDate1: this.state.fromDate,
        toDate1: this.state.toDate,
        fromDate:this.state.fromDate,
      }),
      // url: "http://15.206.129.105:8080/EmployeeAttendenceAPI/excelDownload/PeriodWiseShiftWiseReport",
      //url: "http://15.206.129.105:8080/EmployeeAttendenceAPI/excelDownload/PeriodWiseShiftWiseReport",
      url: "http://15.206.129.105:8080/MerchandiseAPI/excelDownload/deletedShiftReport",

      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        console.log("data", data)
        count = 0;


        if (data.deletedShiftReportListExcel.length != 0) {

       



          $.each(data.deletedShiftReportListExcel, function (i, itemk) {
            if(itemk.status=="2")
            {
              self.state.status="Premanently Deleted";
            }else{
             self.state.status="Temporarily Deleted";
            }
          

            xlsRows.push(Number(count) + 1);
            xlsRows.push(itemk.currentLocation);
            xlsRows.push(itemk.description);
            xlsRows.push(itemk.startDate);
            xlsRows.push(itemk.endDate);
            xlsRows.push(self.state.status);
        
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


        <h4 style={{ textAlign: "center" }}>Deleted Shift Report - {this.state.fromDate} - {this.state.toDate}</h4>

        <div class="btn-group" style={{ marginBottom: "0%", width: "100%" }}>
          <form style={{ paddingTop: '15px', position: 'inline-block' }}>
            <label htmlFor="fromDate" style={{ marginRight: '20px' }}> From:</label>
            <input
              className="dateToField"
              style={{ width: '50%' }}
              type="text"
              value={this.state.fromDate}
              id="fromDate" name="fromDate"
              onChange={this.handleUserInput} />

          </form>

          <form >
            <label
              htmlFor="toDate"
              style={{ marginRight: '39px' }}> To:</label>

            <input
              className="dateToField"
              style={{ width: '50%' }}
              type="text"
              value={this.state.toDate}
              id="toDate" name="toDate"
              onChange={this.handleUserInput} />

          </form>
        </div>

        <div>
          <button href="#" onClick={() => this.Submit()}>Submit</button>
        </div>



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
export default DeletedShiftReports;
