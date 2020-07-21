import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';

import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js';
import FooterText from './FooterText';

import ReportMenuPage from './ReportMenuPage';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Select from 'react-select';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import _ from 'underscore';
import * as moment_ from 'moment';

//import { Pagination } from 'react-bootstrap';
//import Pagination from 'react-bootstrap/Pagination'
//import PageItem from 'react-bootstrap/PageItem'
//import { usePagination } from '@material-ui/lab/Pagination';

import Pagination from "react-js-pagination";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
const moment = moment_;
var count = 0;
var xlsRows = [];
var dataCount = 0;
var dataCountArray = [];
var itemData = 1;
var pageArray = [];
var localPageData = [];

var localPagePreviousShiftData = [];
class ShiftwiseReport extends Component {

  constructor() {
    super();
    var today = new Date();
    today = today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + ("0" + today.getDate()).slice(-2);

    //  var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    // var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var companyId = "001";
    this.state = {
      date: today,

      department: '',
      //   superiorId: superiorId,
      valid: false,
      companyId: companyId,
      data: [],
      columns: [],
      shift: '0',
      totlaItemCount: 0,
      itemsPerPage: 10,
      activePage: 1,
      pdfdata_table: '',


    };


  }



  componentDidMount() {
    dataCount = 0;
    dataCountArray = [];
    itemData = 1;
    pageArray = [];
    $("#tableHeadings").hide();
    dataCountArray.push(dataCount);
    xlsRows = [];
    this.GetTotalShiftOpted();
    window.scrollTo(0, 0);

    /* document.addEventListener('contextmenu', function(e) {
         e.preventDefault();
       });
 
       document.onkeydown = function(e) {
         if(e.keyCode == 123) {
            return false;
         }
         if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
            return false;
         }
         if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
            return false;
         }
         if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
            return false;
         }
         if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
            return false;
         }
       }
       */


  }


  GetTotalShiftOpted() {

    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,
        date: this.state.date,
      }),
      //url: "http://15.206.129.105:8080/EmployeeAttendenceAPI/ShiftReport/selectTotalNoShift",
      //  url: "http://15.206.129.105:8080/EmployeeAttendenceAPI/ShiftReport/selectTotalNoShift",
      url: "http://15.206.129.105:8080/MerchandiseAPI/EmployeeReportPaging/selectTotalNoShift",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        console.log("DATA :", data);

        if (data.length != 0) {
          var shiftOptionsArray = [];
          $.each(data, function (i, item) {
            shiftOptionsArray.push({ label: item.shift + "-" + item.siteName + "-" + item.area + "-" + item.location, value: item.shift });
          });
          shiftOptionsArray.push({ label: "All", value: 'all' });

          self.state.shiftOptions = shiftOptionsArray;
          self.setState({
            shiftOptions: self.state.shiftOptions,
          })
        }

      },
      error: function (data, textStatus, jqXHR) {
        confirmAlert({
          title: 'No Internet',                        // Title dialog
          message: 'Network Connection Problem',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
        });

      }


    });

  }


  handleChangeSelectedShiftOption = (e) => {

    // Display selected value for user
    var currentValue = e;
    this.state.shiftOption = e;
    this.state.shift = e.value;

    this.setState({
      shiftOption: this.state.shiftOption,
      shift: this.state.shift,

    })

    if (this.state.shift == "all") {
      $("#totalEmpShift").hide();
    } else {
      $("#totalEmpShift").show();
    }
    $("#tablecontents").empty();
    itemData = 1;
    this.state.totlaItemCount = 0;
    dataCountArray = [];
    dataCount = 0;
    pageArray = [];
    localPageData = [];
    xlsRows = [];
    dataCountArray.push(dataCount);
    pageArray.push(1);
    this.state.pdfdata_table = "";

    this.GetOptedShiftData();

  }

  GetOptedShiftData() {


    var self = this;

    // var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)


    var companyId = "001";
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });

    self.state.data = [];
    self.state.columns = [];



    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        shift: this.state.shift,
        companyId: this.state.companyId,
        dataCount: dataCount,
        totlaItemCount: this.state.totalItemCount,
        date: this.state.date,
        fromDate1: this.state.date,
      }),
      //url: "http://15.206.129.105:8080/EmployeeAttendenceAPI/EmployeeReportPaging/EmployeeShiftWiseReport",
      //  url: "http://15.206.129.105:8080/EmployeeAttendenceAPI/EmployeeReportPaging/EmployeeShiftWiseReport", //sandy//
      url: "http://15.206.129.105:8080/MerchandiseAPI/EmployeeReportPaging/EmployeeShiftWiseReport",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        console.log("DATA", data)

        console.log("EMPLOYEERETRIEVELIST", data.employeeRetrievelist);
        console.log("PREVIOUS SHIFT LIST", data.prevShiftList);
        count = 0;
        self.state.totalEmpCount = 0;


        if (data.employeeRetrievelist.length != 0) {
          self.state.downloadData = "yes";
          if (itemData == "1") {
            self.state.totlaItemCount = data.totlaItemCount;
            self.state.totalEmpCount = data.totlaItemCount;
            self.setState({
              totalEmpCount:self.state.totalEmpCount,
            })
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


              self.state.empShift5 = "20";


              self.state.empShift3 = item.empCount;


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
            // if(value.employeeId==item.employeeId){
            return value.name + '#' + value.employeeId + '#' + value.date;
            //  }

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

              // currentLocation:group[0].currentLocation,
              endLocation: _.pluck(group, 'currentLocation'),
              nextRowPreviousLocation: _.last(_.pluck(group, 'currentLocation')),
              interpreviousLocation: _.pluck(group, 'currentLocation').slice(0, (_.pluck(group, 'currentLocation').length) - 1),
              firstpreviousLocation: ["-"],
              //  previousLocation:data.prevShiftList[0].currentLocation.append(_.pluck(group, 'currentLocation').slice(0, (_.pluck(group, 'currentLocation').length)-1))
              // previousLocation:_.invoke(data.prevShiftList[0].currentLocation, _.pluck(group, 'currentLocation').slice(0, (_.pluck(group, 'currentLocation').length)-1))
              previousLocation: _.union(["-"], [_.pluck(group, 'currentLocation').slice(0, (_.pluck(group, 'currentLocation').length) - 1)]),





            }
          });





          console.log("Datewisedata11", data11)
          localPageData[self.state.activePage] = [];
          localPageData[self.state.activePage].push(data11);

          localPagePreviousShiftData[self.state.activePage] = [];
          localPagePreviousShiftData[self.state.activePage].push(data.prevShiftList);
          // var previousLocation="-";
          // if(data.prevShiftList.length!=0){
          //  var location=_.findWhere(data.prevShiftList,{employeeId:data11[0].employeeId});
          //  console.log("LOCATION :",location);
          //  if(location!=undefined){
          //  previousLocation=location.currentLocation;
          //  var fromLocation=data11[0].previousLocation;
          //  }

          // }else{
          //  var fromLocation=previousLocation+','+data11[0].interpreviousLocation;
          // }

          var previousLocation = "-";
          if (data.prevShiftList.length != 0) {
            previousLocation = data.prevShiftList[0].currentLocation;

            var fromLocation = data11[0].previousLocation;
          }
          else {
            var fromLocation = previousLocation + ',' + data11[0].interpreviousLocation;
          }
          var empId = data11[0].employeeId;
          var empName = data11[0].name;
          var dept = data11[0].dept;
          var type = data11[0].type;
          var shift = data11[0].shift;
          var startDate = data11[0].fromDate;

          if (data11[0].grade !== null) {
            var grade = data11[0].grade;

          } else {
            var grade = "-";
          }
          //var grade=data11[0].grade;
          var empCode1 = data11[0].empCode;

          var supervisorId = data11[0].supervisorId;
          var supervisorName = data11[0].supervisorName;
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

          if (data11[0].dbPrevLocation !== null) {
            var dbPrevLocation = data11[0].dbPrevLocation;

            // fromLocation = _.union([itemk.dbPrevLocation], [itemk.interpreviousLocation]);
          } else {
            var dbPrevLocation = "-";
          }
          dbPrevLocation = $.trim(dbPrevLocation);
          var lastChar = dbPrevLocation.slice(-1);
          if (lastChar == ',') {
            dbPrevLocation = dbPrevLocation.slice(0, -1);
          }
          var jvalue;

          var datavalue = 0;

          $.each(data11, function (i, itemk) {
            console.log("shift 1st ", shift)
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
                  // "From":startDate,
                  // "To": endDate,
                  "Shift": shift.toString(),
                  "Migrated From": dbPrevLocation.toString(),
                  "Migrated To": endLocation.toString()
                }
                if (itemk.grade !== null) {
                  grade = itemk.grade;

                } else {
                  grade = "-";
                }
                startDate = itemk.fromDate;
                endDate = itemk.fromDate;
                empId = itemk.employeeId;
                empName = itemk.name;
                dept = itemk.dept;
                type = itemk.type;
                startDate = itemk.fromDate;
                shift = itemk.shift;
                supervisorId = itemk.supervisorId;
                supervisorName = itemk.supervisorName;
                console.log("After setting table value shiftvalue:", shift);

                // fromLocation=_.union([_.last(endLocation)],[itemk.interpreviousLocation]);
                fromLocation = _.union([_.last(endLocation)], [itemk.interpreviousLocation]);
                fromLocation = fromLocation.toString();
                dbPrevLocation = fromLocation.toString();
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
                // "From":startDate,
                // "To": endDate,
                "Shift": shift.toString(),
                "Migrated From": dbPrevLocation.toString(),
                "Migrated To": endLocation.toString()
              }
              if (itemk.grade !== null) {
                grade = itemk.grade;

              } else {
                grade = "-";
              }
              startDate = itemk.fromDate;
              empId = itemk.employeeId;
              empName = itemk.name;
              dept = itemk.dept;
              type = itemk.type;
              endDate = itemk.fromDate;
              startDate = itemk.fromDate;
              shift = itemk.shift;
              if (itemk.dbPrevLocation !== null) {
                fromLocation = _.union([itemk.dbPrevLocation], [itemk.interpreviousLocation]);
              } else {
                fromLocation = "-";
              }
              dbPrevLocation = fromLocation.toString();

              dbPrevLocation = $.trim(dbPrevLocation);
              var lastChar = dbPrevLocation.slice(-1);
              if (lastChar == ',') {
                dbPrevLocation = dbPrevLocation.slice(0, -1);
              }

              endLocation = itemk.endLocation;

              supervisorId = itemk.supervisorId;
              supervisorName = itemk.supervisorName;



              var previousLocation = "-";
              if (data.prevShiftList.length != 0) {
                var location = _.findWhere(data.prevShiftList, { employeeId: itemk.employeeId });
                console.log("LOCATION :", location);
                if (location != undefined) {
                  previousLocation = location.currentLocation;
                }

              }



              totalDataCount = Number(totalDataCount) + 1;




              datavalue = datavalue + 1;

            }
            console.log("last row grade", grade);
            self.state.data[datavalue] = {
              "SNO": Number(count) + 1,
              "Id": empId,
              "Name": empName,
              "Grade": grade,
              "Supervisor": supervisorId + '-' + supervisorName,
              "Department": dept,
              "Type": type,
              //    "From": startDate,
              // "To": endDate,
              "Shift": shift.toString(),
              "Migrated From": dbPrevLocation.toString(),
              "Migrated To": endLocation.toString()
            }



          });

          self.state.columns = self.getColumns();

          self.setState({
            count: count,
            data: self.state.data,
            columns: self.state.columns,
          })

          var dataCount1 = data.dataCount;

          var dataCount_Status = _.contains(dataCountArray, dataCount1);
          console.log("DATA COUNT ARRAY BEFORE:", dataCountArray);

          if (dataCount_Status == false) {
            dataCountArray.push(dataCount1);
          }

          console.log("DATA COUNT ARRAY AFTER:", dataCountArray);

        } else {

          itemData = "1";
          self.state.totlaItemCount = 0;
          self.state.shift = '';
          self.state.downloadData = "no";
          self.setState({
            shift: self.state.shift,
          })

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

      if (self.state.shift != "0" && self.state.downloadData == "yes") {
        self.GetOptedShiftData_Download();
        self.GenerateExcel();
      } else if (self.state.shift == "0") {
        confirmAlert({
          title: "Error", // Title dialog
          message: "Kindly Select Shift To Proceed", // Message dialog
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

      if (self.state.shift != "0" && self.state.downloadData == "yes") {
        self.GetOptedShiftData_Download();
        self.GeneratePDF();
      } else if (self.state.shift == "0") {
        confirmAlert({
          title: "Error", // Title dialog
          message: "Kindly Select Shift To Proceed", // Message dialog
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

  GetOptedShiftData_Download() {

    var self = this;

    // var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var companyId = "001";

    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });

    xlsRows = [];


    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        shift: this.state.shift,
        companyId: this.state.companyId,
        date: this.state.date,
        fromDate1: this.state.date,
      }),
      // url: "http://15.206.129.105:8080/EmployeeAttendenceAPI/excelDownload/ShiftWiseReport",
      //   url: "http://15.206.129.105:8080/EmployeeAttendenceAPI/excelDownload/ShiftWiseReport",//sandy//
      url: "http://15.206.129.105:8080/MerchandiseAPI/excelDownload/ShiftWiseReport",
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
          //  console.log("groupByDate",groupByDate);

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
          if (data11[0].dbPrevLocation !== null) {
            var dbPrevLocation = data11[0].dbPrevLocation;

            // fromLocation = _.union([itemk.dbPrevLocation], [itemk.interpreviousLocation]);

          } else {
            var dbPrevLocation = "-";
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
                //     xlsRows.push(startDate);
                //    xlsRows.push(endDate);
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

                //    fromLocation = _.union([_.last(endLocation)], [itemk.interpreviousLocation]);
                fromLocation = _.union([_.last(endLocation)], [itemk.interpreviousLocation]);
                //  console.log("excel After setting table value fromLocation for nextRow::",fromLocation);
                endLocation = itemk.endLocation;
                fromLocation = fromLocation.toString();
                dbPrevLocation = fromLocation.toString();

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
              // xlsRows.push(startDate);
              // xlsRows.push(endDate);
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
              //   endDate=itemk.fromDate;
              //   startDate=itemk.fromDate;
              shift = itemk.shift;
              //  fromLocation = _.union([_.last(endLocation)], [itemk.interpreviousLocation]);

              if (itemk.dbPrevLocation !== null) {
                fromLocation = _.union([itemk.dbPrevLocation], [itemk.interpreviousLocation]);
              } else {
                fromLocation = "-";
              }
              dbPrevLocation = fromLocation.toString();

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
          console.log("lat=st row count", count);
          console.log("lat=st row empId", empId);
          console.log("lat=st row empName", empName);
          console.log("lat=st row grade", grade);
          console.log("lat=st row supervisorId", supervisorId);
          console.log("lat=st row dept", dept);
          console.log("lat=st row dbPrevLocation", dbPrevLocation);
          console.log("lat=st row endLocation", endLocation);

          xlsRows.push(Number(count) + 1);
          xlsRows.push(empId);
          xlsRows.push(empName);
          xlsRows.push(grade);
          xlsRows.push(supervisorId + '-' + supervisorName);
          xlsRows.push(dept);
          xlsRows.push(type);

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


  GetOptedShiftData_PrintDownload() {
    var self = this;

    // var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    var companyId = "001";
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,

    });


    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        shift: this.state.shift,
        companyId: this.state.companyId,
        date: this.state.date,
        shift: this.state.shift
      }),
      // url: "http://15.206.129.105:8080/EmployeeAttendenceAPI/excelDownload/PrintShiftWiseReport",
      //  url: "http://15.206.129.105:8080/EmployeeAttendenceAPI/excelDownload/PrintShiftWiseReport",//sandy//
      url: "http://15.206.129.105:8080/MerchandiseAPI/excelDownload/PrintShiftWiseReport",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        console.log("PRINT DATA :", data);

        self.state.pdfdata_table = "";
        //var myObject = JSON.parse(data.shift);

        //  console.log("PRINT ARRAY DATA :",myObject);
        self.state.pdfdata_table = data.employeeRetrievelist;



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


  GenerateExcel() {
    var createXLSLFormatObj = [];


    /* XLS Head Columns */
    var xlsHeaderMain = ["ORGANIZATION EMPLOYEE SHIFT WISE REPORT LIST FOR SHIFT - " + this.state.shift + " - " + this.state.date];
    createXLSLFormatObj.push(xlsHeaderMain);

    /* XLS Head Columns */
    var xlsHeader = ["S.NO", "EmployeeId", "Name", "Grade", "Supervisor",
      "Department", "Type", "Shift", "Migrated From", "Migrated To"];
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
    var filename = "DateWiseOrganizationHistoryReport.xlsx";

    /* Sheet Name */
    var ws_name = "DateWiseOrganizationHistory";

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

  // GenerateExcel() {
  //   var createXLSLFormatObj = [];

  //   /* XLS Head Columns */
  //   var xlsHeaderMain = ["ORGANIZATION EMPLOYEE SHIFT WISE REPORT LIST FOR SHIFT - " + this.state.shift + " - " + this.state.date];
  //   createXLSLFormatObj.push(xlsHeaderMain);


  //   var listInnerRowData = [];
  //   console.log("XLS ROW :", xlsRows);

  //   var summaryData = xlsRows.length - 1;
  //   console.log("XLS ROW SUMMARY:", summaryData);

  //   listInnerRowData.push(xlsRows[summaryData]);
  //   createXLSLFormatObj.push(listInnerRowData);

  //   var emptyRowData = [];
  //   createXLSLFormatObj.push(emptyRowData);



  //   /* XLS Head Columns */
  //   var xlsHeader = ["S.NO", "EmployeeId", "Name", "Grade", "Supervisor",
  //     "Department", "Type", "Shift", "Migrated From", "Migrated To"];
  //   createXLSLFormatObj.push(xlsHeader);

  //   var indexValue = 0;



  //   listInnerRowData = [];
  //   for (var z = 0; z < xlsRows.length - 1; z++) {

  //     if (xlsRows[z] != "+") {
  //       listInnerRowData.push(xlsRows[z]);
  //     } else {
  //       createXLSLFormatObj.push(listInnerRowData);
  //       listInnerRowData = [];
  //     }
  //     indexValue = z;
  //   }


  //   /* File Name */
  //   var filename = "EmployeeShiftWiseReport" + this.state.shift + ".xlsx";

  //   /* Sheet Name */
  //   var ws_name = "EmployeeShiftWise";

  //   var wb = XLSX.utils.book_new(),
  //     ws = XLSX.utils.aoa_to_sheet(createXLSLFormatObj);

  //   /* merge cells A1:B1 */
  //   var merge = { s: { r: 0, c: 0 }, e: { r: 0, c: 8 } };

  //   /* merge cells A1:B1 */
  //   var merge1 = { s: { r: 2, c: 0 }, e: { r: 2, c: 8 } };

  //   /* add merges */
  //   if (!ws['!merges']) ws['!merges'] = [];
  //   ws['!merges'].push(merge);

  //   /* add merges */
  //   if (!ws['!merges']) ws['!merges'] = [];
  //   ws['!merges'].push(merge1);


  //   /* set column width */
  //   var wscols = [
  //     { wch: 15 },
  //     { wch: 15 },
  //     { wch: 40 },
  //     { wch: 25 },
  //     { wch: 25 },
  //     { wch: 15 },
  //     { wch: 15 },
  //     { wch: 15 },
  //     ,
  //     { hidden: true }, // hide column,

  //   ];

  //   /* set row height */
  //   var wsrows = [
  //     { hpt: 25 }, // "points"
  //     // {hpx: 16}, // "pixels"
  //     ,
  //     // {hpx: 24, level:3},
  //     // {hidden: true}, // hide row
  //     // {hidden: false}
  //   ];

  //   /*add column width */
  //   ws['!cols'] = wscols;

  //   /* add row height */
  //   ws['!rows'] = wsrows;

  //   /* Add worksheet to workbook */
  //   XLSX.utils.book_append_sheet(wb, ws, ws_name);

  //   /* Write workbook and Download */
  //   XLSX.writeFile(wb, filename, { cellStyles: true });
  // }

  GeneratePDF() {
    var doc = new jsPDF();
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(9);

    doc.text("   ORGANIZATION EMPLOYEE SHIFT WISE REPORT LIST FOR SHIFT - " + this.state.shift + " - " + this.state.date + " Total No.Of.Employees : " + count, 10, 10);
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
    var filename = "EmployeeShiftWiseReport" + this.state.shift + ".pdf";
    doc.autoTable({
      head: [["S.NO", "EmployeeId", "Name", "Grade", "Supervisor", "Department", "Type", "Shift", "Migrated From", "Migrated To"]],
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
    //  footer();
    doc.save(filename);

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


  handlePageChange(pageNumber) {
    $("#tablecontents").empty();
    console.log(`active page is ${pageNumber}`);
    this.state.activePage = pageNumber;
    this.setState({ activePage: pageNumber });

    var self = this;
    alert("PageNumber:" + pageNumber);
    var pageData_Status = _.contains(pageArray, pageNumber);

    dataCount = 0;
    if (pageData_Status == false) {
      pageArray.push(pageNumber);
      dataCount = Math.round((Number(dataCount)) + ((Number(pageNumber) - 1) * 10));


      this.GetOptedShiftData();

    } else {

      // console.log("DATA IN STORED ARRAY LOCAL PAGE :",   localPageData[self.state.activePage][0][0]);
      //   dataCount=dataCountArray[pageNumber-1];


      self.state.data = [];
      self.state.columns = [];
      count = 0;

      var previousLocation = "-";
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
      var fromLocation = localPageData[self.state.activePage][0][0].previousLocation;


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
      if (localPageData[self.state.activePage][0][0].dbPrevLocation !== null) {
        var dbPrevLocation = localPageData[self.state.activePage][0][0].dbPrevLocation;

      } else {
        var dbPrevLocation = "-"
      }

      dbPrevLocation = $.trim(dbPrevLocation);
      var lastChar = dbPrevLocation.slice(-1);
      if (lastChar == ',') {
        dbPrevLocation = dbPrevLocation.slice(0, -1);
      }
      var datavalue = 0;
      console.log("OFFLINE DATA", localPageData[self.state.activePage][0]);
      $.each(localPageData[self.state.activePage][0], function (i, item) {

        if (empId === item.employeeId) {
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
              //  "From": startDate,
              //  "To": endDate,
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

            //fromLocation = _.union([_.last(endLocation)], [item.interpreviousLocation]);
            fromLocation = _.union([_.last(endLocation)], [item.interpreviousLocation]);
            fromLocation = fromLocation.toString();
            dbPrevLocation = fromLocation.toString();

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
            //  "From": startDate,
            //  "To": endDate,
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
          //  fromLocation = _.union([_.last(endLocation)], [item.interpreviousLocation]);
          if (item.dbPrevLocation !== null) {


            fromLocation = _.union([item.dbPrevLocation], [item.interpreviousLocation]);

          } else {
            fromLocation = "-";
          }
          dbPrevLocation = fromLocation.toString();


          dbPrevLocation = $.trim(dbPrevLocation);
          var lastChar = dbPrevLocation.slice(-1);
          if (lastChar == ',') {
            dbPrevLocation = dbPrevLocation.slice(0, -1);
          }


          endLocation = item.endLocation;

          //  var previousLocation="-";
          //  if(localPagePreviousShiftData[self.state.activePage][0].length!=0){
          //    var location=_.findWhere(localPagePreviousShiftData[self.state.activePage][0],{employeeId:item.employeeId});
          //    console.log("LOCATION :",location);
          //    if(location!=undefined){
          //     previousLocation=location.currentLocation;
          //    }

          //  }

          //  fromLocation = _.union([_.last(endLocation)], [item.interpreviousLocation]);
          totalDataCount = Number(totalDataCount) + 1;
          datavalue = datavalue + 1;

        }



      });

      self.state.data[datavalue] = {
        "SNO": Number(count) + 1,
        "Id": empId,
        "Name": empName,
        "Grade": grade,
        "Supervisor": supervisorId + '-' + supervisorName,
        "Department": dept,
        "Type": type,

        "Shift": shift.toString(),
        "Migrated From": dbPrevLocation.toString(),
        "Migrated To": endLocation.toString(),
      }

      self.state.columns = self.getColumns();

      self.setState({
        data: self.state.data,
        columns: self.state.columns,
      })




    }




  }

  DownloadQatarPDF() {

    var self = this;


    Swal.fire({
      title: 'Select The Data With Which You Want To Print Your Data',
      input: 'radio',
      inputOptions: {
        'EmployeeId': 'EmployeeId',
        'EmployeeCode': 'EmployeeCode',
        // '#0000ff': 'Blue'
      },

      // validator is optional
      inputValidator: function (result) {
        if (!result) {
          return 'You need to select something!';
        }
      }
    }).then(function (result) {
      if (result.value) {
        Swal.fire({
          type: 'success',
          html: 'You selected: ' + result.value
        });

        self.PrintPDFValidation(result.value);


      }
    })


  }


  PrintPDFValidation(result) {

    $("#tableHeadings").empty();
    var self = this;
    this.state.printResultData = result;

    if (self.state.pdfdata_table.length != 0) {
      self.GeneratePrintPDF();
    } else {
      if (self.state.shift != "0" && self.state.downloadData == "yes") {
        self.GetOptedShiftData_PrintDownload();
        self.GeneratePrintPDF();
      } else if (self.state.shift == "0") {
        confirmAlert({
          title: "Error", // Title dialog
          message: "Kindly Select Shift To Proceed", // Message dialog
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


  GeneratePrintPDF() {

    var self = this;

    const doc3 = new jsPDF('p');
    var filename = "EmployeeShiftWiseReport";
    doc3.setFontSize(20)
    doc3.text("Schedule for " + this.state.date + " ", 100, 10, "center")

    doc3.setFontSize(25)
    doc3.text('Through Apps', 100, 20, null, null, "center")

    //  doc3.setLineWidth(0.5)
    //   doc3.line(20, 25, 60, 25)

    var shiftPDF;

    if (self.state.pdfdata_table.length != 0) {

      if (this.state.shift != "all") {

        var location = self.state.pdfdata_table[0].currentLocation;
        var description = self.state.pdfdata_table[0].description;
        var time = self.state.pdfdata_table[0].time;
        var supervisorName;

        if (this.state.printResultData == "EmployeeCode") {

          if (self.state.pdfdata_table[0].grade != "-") {
            supervisorName = self.state.pdfdata_table[0].grade + "-" + self.state.pdfdata_table[0].empCode + "-" + self.state.pdfdata_table[0].supervisorName;
          } else {
            supervisorName = self.state.pdfdata_table[0].empCode + "-" + self.state.pdfdata_table[0].supervisorName;
          }


          var empId = [];
          var count = 0;

          $.each(self.state.pdfdata_table, function (i, item) {

            var employeeId;
            if (item.grade != "-") {
              //   employeeId=item.Grade+"-"+item.EmpId;
              employeeId = item.grade + "-" + item.empCode;
            } else {
              // employeeId=item.EmpId;
              employeeId = item.empCode;
            }

            empId.push(employeeId);
            count = Number(count) + 1;
          });


        } else {


          if (self.state.pdfdata_table[0].grade != "-") {
            supervisorName = self.state.pdfdata_table[0].grade + "-" + self.state.pdfdata_table[0].employeeId + "-" + self.state.pdfdata_table[0].supervisorName;
          } else {
            supervisorName = self.state.pdfdata_table[0].employeeId + "-" + self.state.pdfdata_table[0].supervisorName;
          }


          var empId = [];
          var count = 0;

          $.each(self.state.pdfdata_table, function (i, item) {

            var employeeId;
            if (item.grade != "-") {
              employeeId = item.grade + "-" + item.employeeId;
            } else {
              employeeId = item.employeeId;
            }

            empId.push(employeeId);
            count = Number(count) + 1;
          });

        }


        var empData = empId.toString();
        shiftPDF =
          '<tr><th colspan="4" style={{ textAlign: "center", fontSize: "50px", color: "red" }}> ' + location + '</th></tr>'
          + '<tr><td> ' + description + ' </td><td > ' + supervisorName + ' </td>'
          + '<td>' + time + '</td><td>' + count + '</td></tr>'
          + '<tr><td colspan="4" >' + empData + '</td></tr>'


        $("#tableHeadings").append(shiftPDF);


      } else {
        console.log("PDF_TABLE_DATA :", self.state.pdfdata_table);


        var location = self.state.pdfdata_table[0].currentLocation;
        var description = self.state.pdfdata_table[0].description;
        var supervisorName;
        var time = self.state.pdfdata_table[0].time;
        var shift = self.state.pdfdata_table[0].shift
        var count = 0;
        var empId = [];
        shiftPDF = "";


        if (this.state.printResultData == "EmployeeCode") {

          if (self.state.pdfdata_table[0].grade != "-") {
            supervisorName = self.state.pdfdata_table[0].grade + "-" + self.state.pdfdata_table[0].empCode + "-" + self.state.pdfdata_table[0].supervisorName;
          } else {
            supervisorName = self.state.pdfdata_table[0].empCode + "-" + self.state.pdfdata_table[0].supervisorName;
          }

          for (var i = 0; i < self.state.pdfdata_table.length; i++) {

            var employeeId;
            if (shift == self.state.pdfdata_table[i].shift) {


              if (self.state.pdfdata_table[i].grade != "-") {
                employeeId = self.state.pdfdata_table[i].grade + "-" + self.state.pdfdata_table[i].empCode;
              } else {
                employeeId = self.state.pdfdata_table[i].empCode;
              }

              empId.push(employeeId);
              count = Number(count) + 1;

            } else {

              var empData = empId.toString();
              shiftPDF =
                '<tr><th colspan="4" style={{ textAlign: "center", fontSize: "50px", color: "red" }}> ' + location + '</th></tr>'
                + '<tr><td> ' + description + ' </td><td > ' + supervisorName + ' </td>'
                + '<td>' + time + '</td><td>' + count + '</td></tr>'
                + '<tr><td colspan="4" >' + empData + '</td></tr>'



              $("#tableHeadings").append(shiftPDF);

              location = self.state.pdfdata_table[i].currentLocation;
              description = self.state.pdfdata_table[i].description;
              time = self.state.pdfdata_table[i].time;
              shift = self.state.pdfdata_table[i].shift
              count = 0;
              empId = [];
              shiftPDF = "";

              if (self.state.pdfdata_table[i].grade != "-") {
                supervisorName = self.state.pdfdata_table[i].grade + "-" + self.state.pdfdata_table[i].empCode + "-" + self.state.pdfdata_table[i].supervisorName;
              } else {
                supervisorName = self.state.pdfdata_table[i].empCode + "-" + self.state.pdfdata_table[i].supervisorName;
              }

              if (self.state.pdfdata_table[i].grade != "-") {
                employeeId = self.state.pdfdata_table[i].grade + "-" + self.state.pdfdata_table[i].empCode;
              } else {
                employeeId = self.state.pdfdata_table[i].empCode;
              }

              empId.push(employeeId);
              count = Number(count) + 1;

            }

          }

        } else {

          if (self.state.pdfdata_table[0].grade != "-") {
            supervisorName = self.state.pdfdata_table[0].grade + "-" + self.state.pdfdata_table[0].employeeId + "-" + self.state.pdfdata_table[0].supervisorName;
          } else {
            supervisorName = self.state.pdfdata_table[0].employeeId + "-" + self.state.pdfdata_table[0].supervisorName;
          }

          for (var i = 0; i < self.state.pdfdata_table.length; i++) {

            var employeeId;
            if (shift == self.state.pdfdata_table[i].shift) {


              if (self.state.pdfdata_table[i].grade != "-") {
                employeeId = self.state.pdfdata_table[i].grade + "-" + self.state.pdfdata_table[i].employeeId;
              } else {
                employeeId = self.state.pdfdata_table[i].employeeId;
              }

              empId.push(employeeId);
              count = Number(count) + 1;

            } else {

              var empData = empId.toString();
              shiftPDF =
                '<tr><th colspan="4" style={{ textAlign: "center", fontSize: "50px", color: "red" }}> ' + location + '</th></tr>'
                + '<tr><td> ' + description + ' </td><td > ' + supervisorName + ' </td>'
                + '<td>' + time + '</td><td>' + count + '</td></tr>'
                + '<tr><td colspan="4" >' + empData + '</td></tr>'



              $("#tableHeadings").append(shiftPDF);

              location = self.state.pdfdata_table[i].currentLocation;
              description = self.state.pdfdata_table[i].description;
              time = self.state.pdfdata_table[i].time;
              shift = self.state.pdfdata_table[i].shift
              count = 0;
              empId = [];
              shiftPDF = "";

              if (self.state.pdfdata_table[i].grade != "-") {
                supervisorName = self.state.pdfdata_table[i].grade + "-" + self.state.pdfdata_table[i].employeeId + "-" + self.state.pdfdata_table[i].supervisorName;
              } else {
                supervisorName = self.state.pdfdata_table[i].employeeId + "-" + self.state.pdfdata_table[i].supervisorName;
              }

              if (self.state.pdfdata_table[i].grade != "-") {
                employeeId = self.state.pdfdata_table[i].grade + "-" + self.state.pdfdata_table[i].employeeId;
              } else {
                employeeId = self.state.pdfdata_table[i].employeeId;
              }

              empId.push(employeeId);
              count = Number(count) + 1;

            }

          }







        }







        var empData = empId.toString();
        shiftPDF =
          '<tr><th colspan="4" style={{ textAlign: "center", fontSize: "50px", color: "red" }}> ' + location + '</th></tr>'
          + '<tr><td> ' + description + ' </td><td > ' + supervisorName + ' </td>'
          + '<td>' + time + '</td><td>' + count + '</td></tr>'
          + '<tr><td colspan="4" >' + empData + '</td></tr>'



        $("#tableHeadings").append(shiftPDF);

      }

    }







    autoTable(doc3, {
      theme: 'grid',
      html: '#tableHeadings',
      styles: { /* fillColor: [0, 0, 0] */ textAlign: 'center' },
      columnStyles: { halign: 'center', /* fillColor: [0, 0, 0] */ },
      margin: { top: 30 },
    })


    const pages = doc3.internal.getNumberOfPages();

    const pageWidth = doc3.internal.pageSize.width;  //Optional
    const pageHeight = doc3.internal.pageSize.height;  //Optional
    for (let j = 1; j < pages + 1; j++) {
      let horizontalPos = pageWidth /2;  //Can be fixed number
      let verticalPos = pageHeight - 10;  //Can be fixed number
      doc3.setPage(j);
      // doc.text('${j} of ${pages}');
      doc3.text(`${j} - ${pages}`, horizontalPos, verticalPos, { align: 'center' },{fontWeight:'5'});
     doc3.setFontSize(14);
    }
    doc3.output('dataurlnewwindow');
 
    doc3.save(filename);



  }

  render() {

    return (

      <div class="container">
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


        <h4 style={{ textAlign: "center" }} id="title">Shiftwise Report-{this.state.date}</h4>

        <form style={{ paddingBottom: '20px', position: 'inline-block' }}>
          <div class="form-horizontal form-bordered">
            <div id="Shift" className="form-group">
              <label class="control-label col-sm-2 text-sm-left"
                for="shift" >Shift</label>
              <div class="col-sm-4">

                <Select
                  id="shift"
                  style={{ width: "20%" }}
                  name="shift"
                  options={this.state.shiftOptions}
                  onChange={this.handleChangeSelectedShiftOption}
                  value={this.state.shiftOption}
                />

              </div>
              <div class="col-sm-1">
              </div>
              <div class="col-sm-3">
                <p style={{ fontWeight: "600" }}>Total No.Of.Employees : {this.state.totlaItemCount}</p>
              </div>
            </div>
          </div>

          <div className="row" style={{ margin: "12px 12px 0px 12px" }}>

            <div class="col-sm-4 col-md-4  col-lg-4  "
              style={{
                padding: "0px 10px",
                marginBottom: "30px"
              }}
              id="detailedReport">
              <button type='button' onClick={() => this.DownloadPDF()}>Download As PDF</button>

            </div>
            <div class="col-sm-4 col-md-4  col-lg-4 "
              style={{
                padding: "0px 10px",
                marginBottom: "30px"
              }}
              id="detailedReport">
              <button type='button' onClick={() => this.DownloadQatarPDF()}>Qatar PDF</button>

            </div>
            <div class="col-sm-4 col-md-4  col-lg-4 ">
              <div >
                <button type='button' onClick={() => this.DownloadExcel()}>Download As Excel</button>
              </div>
            </div>

          </div>

          <div id="tableOverflow" style={{ overflow: "auto" }}>
            <table class="table" id="tableHeadings">

            </table>
          </div>

          <div style={{ display: "grid", marginBottom: "2%" }}>
            <div id="tableOverflow" className="hideContent">

              <div>
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
                  showPaginationTop={true}
                  showPaginationBottom={false}
                  getTdProps={this.onRowClick}
                />


                <Pagination
                  activePage={this.state.activePage}
                  itemsCountPerPage={this.state.itemsPerPage}
                  totalItemsCount={this.state.totlaItemCount}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange.bind(this)}
                />



              </div>
            </div>
          </div>
        </form>






      </div >


    );
  }

}

export default ShiftwiseReport;
