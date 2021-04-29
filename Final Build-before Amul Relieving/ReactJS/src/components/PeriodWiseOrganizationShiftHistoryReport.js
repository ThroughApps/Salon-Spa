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


var count = 0;
var xlsRows = [];
var dataCount = 0;
var dataCountArray = [];
var itemData = 1;
var pageArray = [];
var localPageData = [];
var localPagePreviousShiftData = [];

class PeriodWiseOrganizationShiftHistoryReport extends Component {
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


    this.state = {
      data: [],
      columns: [],
      date: today1,
      totlaItemCount: 0,
      itemsPerPage: 3,
      activePage: 1,
      fromDate: '',
      toDate: '',

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
        url: "http://15.206.129.105:8080/MerchandiseAPI/EmployeeReportPaging/PeriodWiseShiftHistoryReport",

        contentType: "application/json",
        dataType: "json",
        async: false,
        success: function (data, textStatus, jqXHR) {
          window.scrollTo(0, 0);
          console.log("DATA FROM BACKEND:", data);
          console.log("DATA FROM BACKEND employeeRetrievelist:", data.employeeRetrievelist);
          console.log("DATA FROM BACKEND PREVSHIFTLIST:", data.prevShiftList);


          var count = 0;

          if (data.employeeRetrievelist.length != 0) {

            self.state.downloadData = "yes";
            if (itemData == "1") {
              self.state.totlaItemCount = data.totlaItemCount;
              self.state.totalEmpCount = data.totlaItemCount;
              self.state.totalEmpCount1 = data.totalItemCount;
              itemData = Number(itemData) + 1;
            }
            if (data.allShiftDetails.length != 0) {
              var tab;
              $.each(data.allShiftDetails, function (i, item) {

                // <td>'+item.allShiftGrade+'</td></tr>
                self.state.shiftNo1 = item.shiftNo;
                self.setState({
                  shiftNo1: self.state.shiftNo1,
                })
                tab += '<tr><td>' + item.shiftNo + '</td><td>' + item.empCount + '</td>';
                $.each((item.allShiftGrade), function (i, item) {

                  if ((Number(self.state.shiftNo1) == Number(item.shiftNo))) {
                    tab += '<td>' + item.grade + '-' + item.empCode + '</td>';
                  }
                });

                tab += '</tr>';
              });

              $("#tableHeadings").append(tab);
            }

            var previousLocation = "-";
            if (data.prevShiftList.length != 0) {
              previousLocation = data.prevShiftList[0].currentLocation;
            }
            var groupByDate = _.chain(data.employeeRetrievelist)
              .sortBy('date')
              .sortBy('employeeId')
              .value();
            console.log("groupByDate", groupByDate);
            var groups = _.groupBy(groupByDate, function (value) {
              //  if(value.employeeId==item.employeeId){
              return value.name + '#' + value.employeeId + '#' + value.date;
              //   }

            });
            console.log("groups", groups);
            var data11 = _.map(groups, function (group) {
              return {
                name: group[0].name,
                employeeId: group[0].employeeId,
                grade: group[0].grade,
                empCode: group[0].empCode,
                dbPrevLocation: group[0].previousLocation,
                supervisorId: group[0].shiftSuperVisorId,
                supervisorName: group[0].shiftSupervisorName,
                date: _.pluck(group, 'date'),
                shift: _.pluck(group, 'shift'),
                dept: group[0].department,
                type: group[0].employeeType,
                fromDate: _.first(_.pluck(group, 'date')),
                endDate: _.last(_.pluck(group, 'date')),

                //  currentLocation:group[0].currentLocation,
                endLocation: _.pluck(group, 'currentLocation'),
                nextRowPreviousLocation: _.last(_.pluck(group, 'currentLocation')),
                interpreviousLocation: _.pluck(group, 'currentLocation').slice(0, (_.pluck(group, 'currentLocation').length) - 1),
                firstpreviousLocation: ["-"],
                //   previousLocation:data.prevShiftList[0].currentLocation.append(_.pluck(group, 'currentLocation').slice(0, (_.pluck(group, 'currentLocation').length)-1))
                //  previousLocation:_.invoke(data.prevShiftList[0].currentLocation, _.pluck(group, 'currentLocation').slice(0, (_.pluck(group, 'currentLocation').length)-1))
                previousLocation: _.union(["-"], _.pluck(group, 'currentLocation').slice(0, (_.pluck(group, 'currentLocation').length) - 1)),


              }
            });



            console.log("data11", data11)

            localPageData[self.state.activePage] = [];
            localPageData[self.state.activePage].push(data11);

            localPagePreviousShiftData[self.state.activePage] = [];
            localPagePreviousShiftData[self.state.activePage].push(data.prevShiftList);








            var previousLocation = "-";
            if (data.prevShiftList.length != 0) {
              previousLocation = data.prevShiftList[0].currentLocation;
              var fromLocation = data11[0].previousLocation;
            }
            else {
              var fromLocation = previousLocation + ',' + data11[0].interpreviousLocation;
            }
            if (data11[0].grade !== null) {
              var grade = data11[0].grade;

            } else {
              var grade = "-";
            }
            var empCode1 = data11[0].empCode;

            var supervisorId = data11[0].supervisorId;
            var supervisorName = data11[0].supervisorName;
            var empId = data11[0].employeeId;
            var empName = data11[0].name;
            var dept = data11[0].dept;
            var type = data11[0].type;
            var shift = data11[0].shift;
            var startDate = data11[0].fromDate;
            // var fromLocation=fromLocation;
            var endLocation = data11[0].endLocation;
            var totalDataCount = 0;
            var count = 0;
            var lastShiftChangeValue = 0;
            var dataLength = data.shiftList.length;
            var ivalue;

            var lastFromLocation;
            var endDate = data11[0].endDate;
            var nextRowPreviousLocation = data11[0].nextRowPreviousLocation;
            var interpreviousLocation = data11[0].interpreviousLocation;
            if ( data11[0].dbPrevLocation !== null) {
              var dbPrevLocation = data11[0].dbPrevLocation;
                  
             // fromLocation = _.union([itemk.dbPrevLocation], [itemk.interpreviousLocation]);
  
            } else {
            var  dbPrevLocation = "-";
            }

            dbPrevLocation = $.trim(dbPrevLocation);
            var lastChar = dbPrevLocation.slice(-1);
            if (lastChar == ',') {
              dbPrevLocation = dbPrevLocation.slice(0, -1);
            }
            var jvalue;
            var datavalue = 0;

            $.each(data11, function (i, itemk) {
              console.log("shift  1st ", shift)
              console.log("shift itemk", itemk.shift)

              if (empId == itemk.employeeId) {
                console.log("I-VALUE :", i, " SHIFT :", shift, " ITEM SHIFT :", itemk.shift);


                console.log((shift === itemk.shift), "shift", shift, "item", itemk.shift, "fromdate", itemk.fromDate, "endDate", itemk.endDate);
                if (shift.toString() === itemk.shift.toString()) {
                  lastShiftChangeValue = i;
                  ivalue = i;
                  endDate = itemk.fromDate;
                  console.log("same shift enddate ", endDate);

                } else {
                  // alert("CHANGE")
                  console.log("SHIFT CHANGE ", shift, itemk.shift);
                  console.log("END Date ", endDate);
                  ivalue = i;
                  // endDate=data11[ivalue-1].fromDate;
                  count = Number(count) + 1;
                  self.state.data[datavalue] = {
                    "SNO": count,
                    "Id": empId,
                    "Name": empName,
                    "Grade": grade,
                    "Supervisor": supervisorId + '-' + supervisorName,
                    "Department": dept,
                    "Type": type,
                    "From": startDate,
                    "To": endDate,
                    "Shift": shift.toString(),
                    "Migrated From": dbPrevLocation.toString(),
                    "Migrated To": endLocation.toString()
                  }
                  if (itemk.grade !== null) {
                    grade = itemk.grade;

                  } else {
                    grade = "-";
                  }
                  supervisorId = itemk.supervisorId;
                  supervisorName = itemk.supervisorName;
                  startDate = itemk.fromDate;
                  endDate = itemk.fromDate;
                  empId = itemk.employeeId;
                  empName = itemk.name;
                  dept = itemk.dept;
                  type = itemk.type;
                  startDate = itemk.fromDate;
                  shift = itemk.shift;
                  console.log("After setting table value shiftvalue:", shift);

                 // fromLocation = _.union([_.last(endLocation)], [itemk.interpreviousLocation]);
                 fromLocation = _.union([_.last(endLocation)], [itemk.interpreviousLocation]);
                fromLocation=fromLocation.toString();
                dbPrevLocation=fromLocation.toString(); 
                dbPrevLocation = $.trim(dbPrevLocation);
                var lastChar = dbPrevLocation.slice(-1);
                if (lastChar == ',') {
                  dbPrevLocation = dbPrevLocation.slice(0, -1);
                }
                 console.log("After setting table value fromLocation for nextRow::", fromLocation);
                  endLocation = itemk.endLocation;

                  totalDataCount = Number(totalDataCount) + 1;

                  datavalue = datavalue + 1;

                }
              }
              else if (empId !== itemk.employeeId) {
                console.log("EMPLOYEE CHANGE ");
                console.log("FromLocation ", fromLocation);

                ivalue = i;

                lastShiftChangeValue = i;


                count = Number(count) + 1;
                self.state.data[datavalue] = {
                  "SNO": count,
                  "Id": empId,
                  "Name": empName,
                  "Grade": grade,
                  "Supervisor": supervisorId + '-' + supervisorName,
                  "Department": dept,
                  "Type": type,
                  "From": startDate,
                  "To": endDate,
                  "Shift": shift.toString(),
                  "Migrated From": dbPrevLocation.toString(),
                  "Migrated To": endLocation.toString()
                }
                if (itemk.grade !== null) {
                  grade = itemk.grade;

                } else {
                  grade = "-";
                }
                supervisorId = itemk.supervisorId;
                supervisorName = itemk.supervisorName;
                startDate = itemk.fromDate;
                empId = itemk.employeeId;
                empName = itemk.name;
                dept = itemk.dept;
                type = itemk.type;
                endDate = itemk.fromDate;
                startDate = itemk.fromDate;
                shift = itemk.shift;
             //   fromLocation = _.union([_.last(endLocation)], [itemk.interpreviousLocation]);
             if (itemk.dbPrevLocation !== null) {

                
              fromLocation = _.union([itemk.dbPrevLocation], [itemk.interpreviousLocation]);

            } else {
              fromLocation = "-";
            }
            dbPrevLocation=fromLocation.toString();
            dbPrevLocation = $.trim(dbPrevLocation);
            var lastChar = dbPrevLocation.slice(-1);
            if (lastChar == ',') {
              dbPrevLocation = dbPrevLocation.slice(0, -1);
            }
             endLocation = itemk.endLocation;



                var previousLocation = "-";
                if (data.prevShiftList.length != 0) {
                  var location = _.findWhere(data.prevShiftList, { employeeId: itemk.employeeId });
                  console.log("LOCATION :", location);
                  if (location != undefined) {
                    previousLocation = location.currentLocation;
                  }

                }

              //  fromLocation = _.union([_.last(endLocation)], [itemk.interpreviousLocation]);
                totalDataCount = Number(totalDataCount) + 1;


                datavalue = datavalue + 1;

              }
              self.state.data[datavalue] = {
                "SNO": Number(count) + 1,

                "Id": empId,
                "Name": empName,
                "Grade": grade,
                "Supervisor": supervisorId + '-' + supervisorName,
                "Department": dept,
                "Type": type,
                "From": startDate,
                "To": endDate,
                "Shift": shift.toString(),
                "Migrated From": dbPrevLocation.toString(),
                "Migrated To": endLocation.toString()
              }

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
    var xlsHeaderMain = ["PERIOD WISE ORGANIZATION SHIFT HISTORY REPORT LIST" + " [ " + this.state.fromDate + " - " + this.state.toDate + " ]"];
    createXLSLFormatObj.push(xlsHeaderMain);


    /* XLS Head Columns */
    var xlsHeader = ["S.NO", "EmployeeId", "Name", "Grade", "Supervisor", "Department", "Type", "From", "To", "Shift", "Migrated From", "Migrated To"];
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
    var filename = "periodWiseOrganizationHistoryReport.xlsx";

    /* Sheet Name */
    var ws_name = "PeriodWiseOrganizationHistory";

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
    doc.text(" PERIOD WISE ORGANIZATION SHIFT HISTORY REPORT LIST" + " [ " + this.state.fromDate + " - " + this.state.toDate + " ]", 10, 10);
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
    var filename = "PeriodWiseReport.pdf";
    doc.autoTable({
      head: [["S.NO", "EmployeeId", "Name", "Grade", "Supervisor", "Department", "Type", "From", "To", "Shift", "Migrated From", "Migrated To"]],
      body: pdfData,
    }
    );
    const pages = doc.internal.getNumberOfPages();

    const pageWidth = doc.internal.pageSize.width;  //Optional
    const pageHeight = doc.internal.pageSize.height;  //Optional
    for (let j = 1; j < pages + 1; j++) {
      let horizontalPos = pageWidth / 2;  //Can be fixed number
      let verticalPos = pageHeight - 10;  //Can be fixed number
      doc.setPage(j);
      // doc.text('${j} of ${pages}');
      doc.text(`${j} - ${pages}`, horizontalPos, verticalPos, { align: 'center' });
    }

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
      dataCount = Math.round((Number(dataCount)) + ((Number(pageNumber) - 1) * 3));

      this.Submit();

    } else {

      console.log("DATA IN STORED ARRAY LOCAL PAGE :", localPageData[self.state.activePage][0]);

      self.state.data = [];
      self.state.columns = [];
      count = 0;

      var previousLocation = "-";
      if (localPagePreviousShiftData[self.state.activePage][0].length != 0) {
        previousLocation = localPageData[self.state.activePage][0].currentLocation;
        var fromLocation = localPageData[self.state.activePage][0][0].previousLocation;
      } else {
        var fromLocation = previousLocation + ',' + localPageData[self.state.activePage][0].interpreviousLocation;
      }

      if (localPageData[self.state.activePage][0][0].grade !== null) {
        var grade = localPageData[self.state.activePage][0][0].grade;

      } else {
        var grade = "-";
      }
      var empCode1 = localPageData[self.state.activePage][0][0].empCode;

      var supervisorId = localPageData[self.state.activePage][0][0].supervisorId;
      var supervisorName = localPageData[self.state.activePage][0][0].supervisorName;
      var empId = localPageData[self.state.activePage][0][0].employeeId;
      var empName = localPageData[self.state.activePage][0][0].name;
      var dept = localPageData[self.state.activePage][0][0].dept;
      var type = localPageData[self.state.activePage][0][0].type;
      var shift = localPageData[self.state.activePage][0][0].shift;
      var startDate = localPageData[self.state.activePage][0][0].fromDate;
      var endLocation = localPageData[self.state.activePage][0][0].endLocation;
      var totalDataCount = 0;
      var count = 0;
      var lastShiftChangeValue = 0;
      var dataLength = localPageData[self.state.activePage][0][0].length;
      var ivalue;
      var fromLocation = fromLocation;
      var lastFromLocation;
      var endDate = localPageData[self.state.activePage][0][0].endDate;
      var nextRowPreviousLocation = localPageData[self.state.activePage][0][0].nextRowPreviousLocation;
      var interpreviousLocation = localPageData[self.state.activePage][0][0].interpreviousLocation;
      if(localPageData[self.state.activePage][0][0].dbPrevLocation!==null)
      {
        var dbPrevLocation = localPageData[self.state.activePage][0][0].dbPrevLocation;
      
      }   else{
        var dbPrevLocation = "-"
      }
      dbPrevLocation = $.trim(dbPrevLocation);
      var lastChar = dbPrevLocation.slice(-1);
      if (lastChar == ',') {
        dbPrevLocation = dbPrevLocation.slice(0, -1);
      }
      var datavalue = 0;

      $.each(localPageData[self.state.activePage][0], function (i, item) {

        if (empId == item.employeeId) {
          //SAME EMPLOYEEID
          console.log("I-VALUE :", i, " SHIFT :", shift, " ITEM SHIFT :", item.shift);

          if (shift.toString() === item.shift.toString()) {

            lastShiftChangeValue = i;
            ivalue = i;
            endDate = item.fromDate;
            console.log("same shift enddate ", endDate);
          } else {

            //SHIFT CHANGE

            console.log("SHIFT CHANGE ");
            ivalue = i;
            // var endDate = localPageData[self.state.activePage][0][ivalue - 1].date;
            // var endLocation=localPageData[self.state.activePage][0][ivalue-1].currentLocation;
            // lastFromLocation=localPageData[self.state.activePage][0][ivalue-1].currentLocation;


            count = Number(count) + 1;
            self.state.data[datavalue] = {
              "SNO": count,
              "Id": empId,
              "Name": empName,
              "Grade": grade,
              "Supervisor": supervisorId + '-' + supervisorName,
              "Department": dept,
              "Type": type,
              "From": startDate,
              "To": endDate,
              "Shift": shift.toString(),
              "Migrated From": dbPrevLocation.toString(),
              "Migrated To": endLocation.toString(),
            }

            if (item.grade !== null) {
              grade = item.grade;

            } else {
              grade = "-";
            }
            supervisorId = item.supervisorId;
            supervisorName = item.supervisorName;
            startDate = item.fromDate;
            endDate = item.fromDate;
            empId = item.employeeId;
            empName = item.name;
            dept = item.dept;
            type = item.type;
            startDate = item.fromDate;
            shift = item.shift;
            console.log("After setting table value shiftvalue:", shift);

            fromLocation = _.union([_.last(endLocation)], [item.interpreviousLocation]);
          
            fromLocation=fromLocation.toString();
            dbPrevLocation=fromLocation.toString();
            dbPrevLocation = $.trim(dbPrevLocation);
            var lastChar = dbPrevLocation.slice(-1);
            if (lastChar == ',') {
              dbPrevLocation = dbPrevLocation.slice(0, -1);
            }

            console.log("After setting table value fromLocation for nextRow::", fromLocation);
            endLocation = item.endLocation;

            totalDataCount = Number(totalDataCount) + 1;

            datavalue = datavalue + 1;
          }

        } else if (empId !== item.employeeId) {
          console.log("EMPLOYEE ID CHANGE");
          ivalue = i;
          // var endDate = localPageData[self.state.activePage][0][ivalue - 1].date;
          // var endLocation=localPageData[self.state.activePage][0][ivalue-1].currentLocation;

          lastShiftChangeValue = i;

          count = Number(count) + 1;
          self.state.data[datavalue] = {
            "SNO": count,
            "Id": empId,
            "Name": empName,
            "Grade": grade,
            "Supervisor": supervisorId + '-' + supervisorName,
            "Department": dept,
            "Type": type,
            "From": startDate,
            "To": endDate,
            "Shift": shift.toString(),
            "Migrated From": dbPrevLocation.toString(),
            "Migrated To": endLocation.toString(),
          }



          if (item.grade !== null) {
            grade = item.grade;

          } else {
            grade = "-";
          }
          supervisorId = item.supervisorId;
          supervisorName = item.supervisorName;
          startDate = item.fromDate;
          empId = item.employeeId;
          empName = item.name;
          dept = item.dept;
          type = item.type;
          endDate = item.fromDate;
          startDate = item.fromDate;
          shift = item.shift;
         // fromLocation = _.union([_.last(endLocation)], [item.interpreviousLocation]);
         if (item.dbPrevLocation !== null) {
               fromLocation = _.union([item.dbPrevLocation], [item.interpreviousLocation]);
           } else {
          fromLocation = "-";
        }
        dbPrevLocation=fromLocation.toString(); 
        dbPrevLocation = $.trim(dbPrevLocation);
        var lastChar = dbPrevLocation.slice(-1);
        if (lastChar == ',') {
          dbPrevLocation = dbPrevLocation.slice(0, -1);
        }
         endLocation = item.endLocation;

          var previousLocation = "-";
          if (localPagePreviousShiftData[self.state.activePage][0].length != 0) {
            var location = _.findWhere(localPagePreviousShiftData[self.state.activePage][0], { employeeId: item.employeeId });
            console.log("LOCATION :", location);
            if (location != undefined) {
              previousLocation = location.currentLocation;
            }

          }

        //  fromLocation = _.union([_.last(endLocation)], [item.interpreviousLocation]);
          totalDataCount = Number(totalDataCount) + 1;
          datavalue = datavalue + 1;

        }

        // count = Number(count) + 1;
        self.state.data[datavalue] = {
          "SNO": Number(count) + 1,
          "Id": empId,
          "Name": empName,
          "Grade": grade,
          "Supervisor": supervisorId + '-' + supervisorName,
          "Department": dept,
          "Type": type,
          "From": startDate,
          "To": endDate,
          "Shift": shift.toString(),
          "Migrated From": dbPrevLocation.toString(),
          "Migrated To": endLocation.toString(),
        }


      });


      // if(localPageData[self.state.activePage][0][lastShiftChangeValue].grade!==null){
      //   localPageData[self.state.activePage][0][lastShiftChangeValue].grade=localPageData[self.state.activePage][0][lastShiftChangeValue].grade;

      //   }else{
      //     localPageData[self.state.activePage][0][lastShiftChangeValue].grade="-";
      //   }
      //     self.state.data[datavalue] = {
      //       "SNO": Number(count) + 1,
      //       "Id": localPageData[self.state.activePage][0][lastShiftChangeValue].employeeId,
      //       "Name": localPageData[self.state.activePage][0][lastShiftChangeValue].name,
      //         "Grade": localPageData[self.state.activePage][0][lastShiftChangeValue].grade,
      //    "Supervisor": localPageData[self.state.activePage][0][lastShiftChangeValue].supervisorId+'-'+ localPageData[self.state.activePage][0][lastShiftChangeValue].supervisorName,
      //       "Department": localPageData[self.state.activePage][0][lastShiftChangeValue].dept,
      //       "Type": localPageData[self.state.activePage][0][lastShiftChangeValue].type,
      //       "From": localPageData[self.state.activePage][0][ivalue].fromDate,
      //       "To": localPageData[self.state.activePage][0][lastShiftChangeValue].fromDate,
      //       "Shift": localPageData[self.state.activePage][0][lastShiftChangeValue].shift.toString(),
      //       "Migrated From":fromLocation.toString(),
      //       "Migrated To": localPageData[self.state.activePage][0][lastShiftChangeValue].endLocation.toString(),

      //     }


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
      url: "http://15.206.129.105:8080/MerchandiseAPI/excelDownload/PeriodWiseShiftWiseReport",

      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        console.log("data", data)
        count = 0;


        if (data.employeeRetrievelist.length != 0) {

          var previousLocation = "-";
          if (data.prevShiftList.length != 0) {
            previousLocation = data.prevShiftList[0].currentLocation;
          }


          var groupByDate = _.chain(data.employeeRetrievelist)
            .sortBy('date')
            .sortBy('employeeId')
            .value();
          console.log("groupByDate", groupByDate);

          var groups = _.groupBy(groupByDate, function (value) {
            //  if(value.employeeId==item.employeeId){
            return value.name + '#' + value.employeeId + '#' + value.date;
            //   }

          });
          console.log("groups", groups);
          var data11 = _.map(groups, function (group) {
            return {
              name: group[0].name,
              employeeId: group[0].employeeId,
              grade: group[0].grade,
              empCode: group[0].empCode,
              dbPrevLocation: group[0].previousLocation, 
              supervisorId: group[0].shiftSuperVisorId,
              supervisorName: group[0].shiftSupervisorName,
              date: _.pluck(group, 'date'),
              shift: _.pluck(group, 'shift'),
              dept: group[0].department,
              type: group[0].employeeType,
              fromDate: _.first(_.pluck(group, 'date')),
              endDate: _.last(_.pluck(group, 'date')),

              //  currentLocation:group[0].currentLocation,
              endLocation: _.pluck(group, 'currentLocation'),
              nextRowPreviousLocation: _.last(_.pluck(group, 'currentLocation')),
              interpreviousLocation: _.pluck(group, 'currentLocation').slice(0, (_.pluck(group, 'currentLocation').length) - 1),
              firstpreviousLocation: ['-'],
              //   previousLocation:data.prevShiftList[0].currentLocation.append(_.pluck(group, 'currentLocation').slice(0, (_.pluck(group, 'currentLocation').length)-1))
              //  previousLocation:_.invoke(data.prevShiftList[0].currentLocation, _.pluck(group, 'currentLocation').slice(0, (_.pluck(group, 'currentLocation').length)-1))
              previousLocation: _.union(['-'], _.pluck(group, 'currentLocation').slice(0, (_.pluck(group, 'currentLocation').length) - 1)),


            }
          });
          console.log("EXCEL DATA11", data11);

          var previousLocation = "-";
          if (data.prevShiftList.length != 0) {
            previousLocation = data.prevShiftList[0].currentLocation;

            var fromLocation = data11[0].previousLocation;
          }
          else {
            var fromLocation = previousLocation + ',' + data11[0].interpreviousLocation;
          }

          if (data11[0].grade !== null) {
            var grade = data11[0].grade;

          } else {
            var grade = "-";
          }
          var empCode1 = data11[0].empCode;

          var supervisorId = data11[0].supervisorId;
          var supervisorName = data11[0].supervisorName;
          var empId = data11[0].employeeId;
          var empName = data11[0].name;
          var dept = data11[0].dept;
          var type = data11[0].type;
          var shift = data11[0].shift;
          var startDate = data11[0].fromDate;
          //  var fromLocation=fromLocation;
          var endLocation = data11[0].endLocation;
          var totalDataCount = 0;
          var count = 0;
          var lastShiftChangeValue = 0;
          var dataLength = data.shiftList.length;
          var ivalue;
          var lastFromLocation;
          var endDate = data11[0].endDate;
          var nextRowPreviousLocation = data11[0].nextRowPreviousLocation;
          var interpreviousLocation = data11[0].interpreviousLocation;
          if ( data11[0].dbPrevLocation !== null) {
            var dbPrevLocation = data11[0].dbPrevLocation;
                
           // fromLocation = _.union([itemk.dbPrevLocation], [itemk.interpreviousLocation]);

          } else {
          var  dbPrevLocation = "-";
          }
          dbPrevLocation = $.trim(dbPrevLocation);
          var lastChar = dbPrevLocation.slice(-1);
          if (lastChar == ',') {
            dbPrevLocation = dbPrevLocation.slice(0, -1);
          }
          var jvalue;




          $.each(data11, function (i, itemk) {

            if (empId === itemk.employeeId.toString()) {
              //SAME EMPLOYEEID
              console.log("I-VALUE :", i, " SHIFT :", shift, " ITEM SHIFT :", itemk.shift);

              if (shift.toString() === itemk.shift.toString()) {
                lastShiftChangeValue = i;
                ivalue = i;
                endDate = itemk.fromDate;
                console.log("excel same shift enddate ", endDate);
              } else {

                //SHIFT CHANGE

                console.log("SHIFT CHANGE ");
                ivalue = i;

                count = Number(count) + 1;

                xlsRows.push(count);
                xlsRows.push(empId);
                xlsRows.push(empName);
                xlsRows.push(grade);
                xlsRows.push(supervisorId + '-' + supervisorName);
                xlsRows.push(dept);
                xlsRows.push(type);
                xlsRows.push(startDate);
                xlsRows.push(endDate);
                xlsRows.push(shift.toString());
                xlsRows.push(dbPrevLocation.toString());
                xlsRows.push(endLocation.toString());
                xlsRows.push("+");
                if (itemk.grade !== null) {
                  grade = itemk.grade;

                } else {
                  grade = "-";
                }
                supervisorId = itemk.supervisorId;
                supervisorName = itemk.supervisorName;

                startDate = itemk.fromDate;
                endDate = itemk.fromDate;
                empId = itemk.employeeId;
                empName = itemk.name;
                dept = itemk.dept;
                type = itemk.type;
                startDate = itemk.fromDate;
                shift = itemk.shift;
                console.log("excel After setting table value shiftvalue:", shift);

                fromLocation = _.union([_.last(endLocation)], [itemk.interpreviousLocation]);
                fromLocation=fromLocation.toString();
                dbPrevLocation=fromLocation.toString();
                dbPrevLocation = $.trim(dbPrevLocation);
                var lastChar = dbPrevLocation.slice(-1);
                if (lastChar == ',') {
                  dbPrevLocation = dbPrevLocation.slice(0, -1);
                }
             
                console.log("excel After setting table value fromLocation for nextRow::", fromLocation);
                endLocation = itemk.endLocation;

                totalDataCount = Number(totalDataCount) + 1;

                i = i + 1;


              }
              //  break;  
            }

            else if (empId !== itemk.employeeId) {
              console.log("EMPLOYEE ID CHANGE");

              ivalue = i;

              lastShiftChangeValue = i;

              count = Number(count) + 1;

              xlsRows.push(count);
              xlsRows.push(empId);
              xlsRows.push(empName);
              xlsRows.push(grade);
              xlsRows.push(supervisorId + '-' + supervisorName);
              xlsRows.push(dept);
              xlsRows.push(type);
              xlsRows.push(startDate);
              xlsRows.push(endDate);
              xlsRows.push(shift.toString());
              xlsRows.push(dbPrevLocation.toString());
              xlsRows.push(endLocation.toString());
              xlsRows.push("+");

              if (itemk.grade !== null) {
                grade = itemk.grade;

              } else {
                grade = "-";
              }
              supervisorId = itemk.supervisorId;
              supervisorName = itemk.supervisorName;
              startDate = itemk.fromDate;
              empId = itemk.employeeId;
              empName = itemk.name;
              dept = itemk.dept;
              type = itemk.type;
              endDate = itemk.fromDate;
              startDate = itemk.fromDate;
              shift = itemk.shift;
            //  fromLocation = _.union([_.last(endLocation)], [itemk.interpreviousLocation]);
            
            if (itemk.dbPrevLocation !== null) {
              fromLocation = _.union([itemk.dbPrevLocation], [itemk.interpreviousLocation]);
              } else {
                fromLocation = "-";
              }
              dbPrevLocation=fromLocation.toString();
              dbPrevLocation = $.trim(dbPrevLocation);
              var lastChar = dbPrevLocation.slice(-1);
              if (lastChar == ',') {
                dbPrevLocation = dbPrevLocation.slice(0, -1);
              }
            
            endLocation = itemk.endLocation;
              var previousLocation = "-";
              if (data.prevShiftList.length != 0) {
                var location = _.findWhere(data.prevShiftList, { employeeId: itemk.employeeId });
                console.log("LOCATION :", location);
                if (location != undefined) {
                  previousLocation = location.currentLocation;
                }

              }

              totalDataCount = Number(totalDataCount) + 1;



              i = i + 1;

            }

          });


          xlsRows.push(Number(count) + 1);
          xlsRows.push(empId);
          xlsRows.push(empName);
          xlsRows.push(grade);
          xlsRows.push(supervisorId + '-' + supervisorName);
          xlsRows.push(dept);
          xlsRows.push(type);
          xlsRows.push(startDate);
          xlsRows.push(endDate);
          xlsRows.push(shift.toString());
          xlsRows.push(dbPrevLocation.toString());
          xlsRows.push(endLocation.toString());
          xlsRows.push("+");


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


        <h4 style={{ textAlign: "center" }}>Period Wise Shift History Report - {this.state.fromDate} - {this.state.toDate}</h4>

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
export default PeriodWiseOrganizationShiftHistoryReport;
