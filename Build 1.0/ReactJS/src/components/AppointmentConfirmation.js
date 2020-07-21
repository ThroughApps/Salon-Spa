import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import SalesReportEdit from './SalesReportEdit';
import SalesReportDisplay from './SalesReportDisplay';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import SalesReportUpdate from './SalesReportUpdate';
// import 'sweetalert2/src/sweetalert2.scss';
// import Swal from 'sweetalert2/dist/sweetalert2.js';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import './DownloadButton.css';
import "./MainPageRedirectButton.css";
import SaleOrder1 from './SaleOrder';
import ReportMenuPage from './ReportMenuPage';
import classnames from "classnames";
import moment from 'moment';
import Select from 'react-select';
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import './datepicker.css';
import _ from 'underscore';
import 'timepicker/jquery.timepicker.css';
//import { makeData, Logo, Tips } from "./Utils";


var dateListArray = [];

class AppointmentConfirmation extends Component {
  constructor() {
    super()

    var today = new Date();
    var date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);


    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var currentTime = today.getHours() + ":" + today.getMinutes();


    this.state = {
      date: date,
      companyId: companyId,
      data: [],
      columns: [],
      color: "",
      selectionChanged: false,
      columnName: "",
      rowIndex: '',
      description: "",
      currentDate: date,
      time: currentTime,
    };

    this.setState({

      companyId: companyId,
      date: date,

    })

    this.tmp = new Set();

  }


  componentDidMount() {


    var self = this;

    window.scrollTo(0, 0);

    $('#appointmentdate').datepicker({

      onSelect: function (date) {

        var dt = new Date(date);
        self.state.appointmentDate = date;

        self.setState({
          appointmentDate: self.state.appointmentDate,
        });
      },

      dateFormat: 'yy-mm-dd',
      minDate: '0',
      maxDate: '1M',
      numberOfMonths: 1
    });


    $('#appointmentTimePicker').timepicker({
      timeFormat: 'H:i',
      interval: 60,
      //minTime: '10',
      //maxTime: '6:00pm',
      //defaultTime: '11',
      //startTime: '10:00',
      dynamic: true,
      dropdown: true,
      scrollbar: true

    });


    this.GetUnconfirmedAppointmentsFunc();


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


  GetUnconfirmedAppointmentsFunc() {

    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,
        date: this.state.date,

      }),
      url: " http://15.206.129.105:8080/MerchandiseAPI/Appointments/UnconfirmedAppointments",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        console.log("DATA :", data);

        if (data.length != 0) {

          var no = 0;
          var dateArrayOptions = [];
          var dateArrayList = [];


          $.each(data, function (i, item) {
            no = Number(no) + 1;

            var serviceTime = item.appointmentTime + " - " + item.appointmentEndTime;

            dateArrayList.push(item.appointmentDate);

            self.state.data[i] = {
              "SNo": no,
              "AppointmentId": item.appointmentId,
              "BookingDate": item.bookingDate,
              "AppointmentDate": item.appointmentDate,
              "CustomerName": item.customerName,
              "ContactNo": item.mobileNo,
              "Timings": serviceTime,
              "Service": item.service,
              "Employee": item.employeedetails.split(",")[0] + " " + item.employeedetails.split(",")[1],
              "Gender": item.gender,
              "ModeOfAppointment": item.modeofAppointment,
              "AppointmentBy": item.appointmentBy,
              "Confirm": < div class="updatedevice" id="updatedevice" style={{ textAlign: "center" }}><span style={{ fontSize: '1em', color: 'white' }}>
                <i class="glyphicon glyphicon-ok-sign" style={{
                  border: "none",
                  padding: "6px 7px 5px 7px",
                  fontSize: "1em",
                  color: "white",
                  borderRadius: "18px",
                  backgroundColor: "rgb(51, 183, 83)"
                }}></i>
              </span></div>,
              "Deny": < div class="updatedevice" id="updatedevice" style={{ textAlign: "center" }}><span style={{ fontSize: '1em', color: 'white' }}>
                <i class="glyphicon glyphicon-remove-sign" style={{
                  border: "none",
                  padding: "6px 7px 5px 7px",
                  fontSize: "1em",
                  color: "white",
                  borderRadius: "18px",
                  backgroundColor: "rgb(243, 54, 54)"
                }}></i>
              </span></div>,
              "Deny With Reschedule": < div class="updatedevice" id="updatedevice" style={{ textAlign: "center" }}><span style={{ fontSize: '1em', color: 'white' }}>
                <i class="glyphicon glyphicon-transfer" style={{
                  border: "none",
                  padding: "6px 7px 5px 7px",
                  fontSize: "1em",
                  color: "white",
                  borderRadius: "18px",
                  backgroundColor: "blue"
                }}></i>
              </span></div>,

            };




          });



          dateArrayList = _.unique(dateArrayList);
          console.log("DATE ARRAY LIST :", dateArrayList);

          $.each(dateArrayList, function (i, item) {
            dateArrayOptions.push({ label: item, value: item });


          });

          self.state.columns = self.getColumns();
          self.state.dateOptions = dateArrayOptions;
          console.log("DATE ARRAY OPTIONS :", self.state.dateOptions);

          self.setState({
            dateOptions: self.state.dateOptions
          })
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

    return Object.keys(this.state.data[0]).map(key => {
      if (

        key != "Gender" &&
        key != "ModeOfAppointment" &&
        key != "AppointmentBy" &&
        key != "AppointmentId"
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

    var self = this;
    return {


      onClick: (e, handleOriginal) => {


        if (column.Header == "Confirm") {

          if (rowInfo != undefined) {



            self.state.appointmentId = rowInfo.original["AppointmentId"];
            self.state.description = "-";
            self.state.displaystatus = "Accepted";
            self.state.status = "2";
            self.state.rowIndex = rowInfo.index;

            self.setState({
              appointmentId: self.state.appointmentId,
            });

            self.AcceptRejectFunc();
          }



        } else if (column.Header == "Deny") {
          if (rowInfo != undefined) {

            self.state.appointmentId = rowInfo.original["AppointmentId"];
            self.state.displaystatus = "Rejected";
            self.state.status = "1";
            self.state.rowIndex = rowInfo.index;
            $("#descriptionmodal").modal('show');

            self.setState({
              appointmentId: self.state.appointmentId,
            });


          }
        } else if (column.Header == "Deny With Reschedule") {

          if (rowInfo != undefined) {
            self.state.appointmentId = rowInfo.original["AppointmentId"];
            self.state.customerName = rowInfo.original["CustomerName"];
            self.state.mobileNo = rowInfo.original["ContactNo"];
            self.state.service = rowInfo.original["Service"];
            self.state.employee = rowInfo.original["Employee"];
            var timings = rowInfo.original["Timings"];
            self.state.appointmentTime = timings.split("-")[0];
            self.state.appointmentEndTime = timings.split("-")[1];
            self.state.gender = rowInfo.original["Gender"];
            self.state.modeofAppointment = rowInfo.original["ModeOfAppointment"];
            self.state.appointmentBy = rowInfo.original["AppointmentBy"];
            self.state.bookingDate = this.state.date;
            self.state.appointmentDate = rowInfo.original["AppointmentDate"];

            self.state.displaystatus = "ReScheduled";
            self.state.status = "4";
            self.state.rowIndex = rowInfo.index;

            var startTime = moment(this.state.appointmentTime, "HH:mm");
            var endTime = moment(this.state.appointmentEndTime, "HH:mm");

            var duration = moment.duration(endTime.diff(startTime));

            var hours = parseInt(duration.asHours());
            var minutes = parseInt(duration.asMinutes()) - hours * 60;
            self.state.duration = hours + ":" + minutes;

            console.log("SERVICE DURATION :", self.state.duration);

            $("#reschedulemodal").modal('show');

            self.setState({
              appointmentId: self.state.appointmentId,
            });

          }

        }

      },







    };



  };








  AcceptRejectFunc() {
    var self = this;

    console.log("ACCEPT REJECT ", JSON.stringify({
      companyId: this.state.companyId,
      appointmentId: this.state.appointmentId,
      status: this.state.status,
      description: this.state.description

    }));

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,
        appointmentId: this.state.appointmentId,
        status: this.state.status,
        description: this.state.description

      }),
      url: " http://15.206.129.105:8080/MerchandiseAPI/Appointments/AppointmentAcceptReject",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        console.log("DATA :", data);


        if (data.response == "Success") {


          Swal.fire({
            position: 'center',
            icon: 'success',
            title: self.state.displaystatus + ' The Appointment Successfully',
            showConfirmButton: false,
            timer: 2000
          })


        } else if (data.response == "AlreadyAffected") {

          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'The Appointment Is Already Affected',
            showConfirmButton: false,
            timer: 2000
          })



        }

        var array = [...self.state.data]; // make a new copy of array instead of mutating the same array directly.
        array.splice(self.state.rowIndex, 1);

        self.state.data = [];
        self.state.data = array;
        self.setState({ data: array });

        self.state.appointmentId = "";
        self.state.description = "";




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


  RescheduleFunc() {
    var self = this;
    console.log("RESCHEDULE DATA :", JSON.stringify({
      customerName: this.state.customerName,
      mobileNo: this.state.mobileNo,
      gender: this.state.gender,
      appointmentDate: this.state.appointmentDate,
      bookingDate: this.state.bookingDate,
      appointmentTime: this.state.appointmentTime,
      appointmentEndTime: this.state.appointmentEndTime,
      companyId: this.state.companyId,
      service: this.state.service,
      employeedetails: this.state.employee,
      appointmentBy: this.state.appointmentBy,
      modeofAppointment: this.state.modeofAppointment,
      description: this.state.description,
      appointmentId: this.state.appointmentId,
      getDataType: "Reschedule",
      status: this.state.status
    }));

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        customerName: this.state.customerName,
        mobileNo: this.state.mobileNo,
        gender: this.state.gender,
        appointmentDate: this.state.appointmentDate,
        bookingDate: this.state.bookingDate,
        appointmentTime: this.state.appointmentTime,
        appointmentEndTime: this.state.appointmentEndTime,
        companyId: this.state.companyId,
        service: this.state.service,
        employeedetails: this.state.employee,
        appointmentBy: this.state.appointmentBy,
        modeofAppointment: this.state.modeofAppointment,
        description: this.state.description,
        appointmentId: this.state.appointmentId,
        getDataType: "Reschedule",
        status: this.state.status
      }),
      url: " http://15.206.129.105:8080/MerchandiseAPI/Appointments/RescheduleAppointment",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        console.log("DATA :", data);


        if (data.response == "Success") {


          Swal.fire({
            position: 'center',
            icon: 'success',
            title: self.state.displaystatus + ' The Appointment Successfully',
            showConfirmButton: false,
            timer: 2000
          })

          var array = [...self.state.data]; // make a new copy of array instead of mutating the same array directly.
          array.splice(self.state.rowIndex, 1);

          self.state.data = [];
          self.state.data = array;
          self.setState({ data: array });

          self.state.appointmentId = "";
          self.state.description = "";


          self.cancelFunc();

        } else if (data.response == "AlreadyAffected") {

          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'The Appointment Is Already Affected',
            showConfirmButton: false,
            timer: 2000
          })

          var array = [...self.state.data]; // make a new copy of array instead of mutating the same array directly.
          array.splice(self.state.rowIndex, 1);

          self.state.data = [];
          self.state.data = array;
          self.setState({ data: array });

          self.state.appointmentId = "";
          self.state.description = "";


          self.cancelFunc();


        } else if (data.response == "EmployeeEngaged") {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Employee is Already Engaged Kindly Select SomeOther Time',
            showConfirmButton: false,
            timer: 2000
          })
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

  cancelFunc() {



    this.state.customerName = "";
    this.state.mobileNo = "";
    this.state.gender = "";
    this.state.appointmentDate = "";
    this.state.bookingDate = "";
    this.state.appointmentTime = "";
    this.state.employee = "";
    this.state.service = "";
    this.state.modeofAppointment = "";
    this.state.appointmentBy = "";




    this.setState({
      customerName: this.state.customerName,
      mobileNo: this.state.mobileNo,
      gender: this.state.gender,
      appointmentDate: this.state.appointmentDate,
      bookingDate: this.state.currentDate,
      appointmentTime: this.state.appointmentTime,
      employee: this.state.employee,
      service: this.state.service,
      modeofAppointment: this.state.modeofAppointment,
      appointmentBy: this.state.appointmentBy,
    })

  }

  handleChangeSelectedDateOption = (e) => {

    // Display selected value for user
    var currentValue = e;
    this.state.dateOption = e;
    this.setState({
      dateOption: this.state.dateOption
    })

    dateListArray = [];
    $.each(e, function (i, item) {
      dateListArray.push(item.value);
    });
    console.log("DATE LIST ARRAY :", dateListArray);

  }


  AcceptRejectAllFunc(clicked_id) {

    var self = this;
    var proceedData = "No";

    if (clicked_id == "accept") {
      this.state.status = "2";
      this.state.description = "-";
      this.state.displaystatus = "Accepted"
      proceedData = "Yes";
    } else if (clicked_id == "reject") {
      if (this.state.description != "") {
        proceedData = "Yes";
        this.state.status = "1";
        this.state.displaystatus = "Rejected";
      } else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Kindly, Fill In Description To Proceed',
          showConfirmButton: false,
          timer: 2000
        })
      }
    }

    var self = this;
    if (proceedData == "Yes") {
      $.ajax({
        type: 'POST',
        data: JSON.stringify({
          companyId: this.state.companyId,
          date: dateListArray.toString(),
          status: this.state.status,
          description: this.state.description,
          currentDate: this.state.currentDate
        }),
        url: " http://15.206.129.105:8080/MerchandiseAPI/Appointments/AcceptRejectAllAppointment",
        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {

          console.log("DATA :", data);


          if (data.response == "Success") {


            Swal.fire({
              position: 'center',
              icon: 'success',
              title: self.state.displaystatus + ' The Appointment Successfully',
              showConfirmButton: false,
              timer: 2000
            })





          } else if (data.response == "AlreadyAffected") {

            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'The Appointment Is Already Affected',
              showConfirmButton: false,
              timer: 2000
            })




          }

          self.state.dateOption = "";
          self.state.description = "";


          var dateArrayOptions = [];
          var dateArrayList = [];
          self.state.data = [];
          self.state.column = [];
          var no = 0;

          if (data.appointmentDetails.length != 0) {

            $.each(data.appointmentDetails, function (i, item) {
              no = Number(no) + 1;

              dateArrayList.push(item.appointmentDate);


              var serviceTime = item.appointmentTime + " - " + item.appointmentEndTime;





              self.state.data[i] = {
                "SNo": no,
                "AppointmentId": item.appointmentId,
                "BookingDate": item.bookingDate,
                "AppointmentDate": item.appointmentDate,
                "CustomerName": item.customerName,
                "ContactNo": item.mobileNo,
                "Timings": serviceTime,
                "Service": item.service,
                "Employee": item.employeedetails.split(",")[0] + " " + item.employeedetails.split(",")[1],
                "Gender": item.gender,
                "ModeOfAppointment": item.modeofAppointment,
                "AppointmentBy": item.appointmentBy,
                "Confirm": < div class="updatedevice" id="updatedevice" style={{ textAlign: "center" }}><span style={{ fontSize: '1em', color: 'white' }}>
                  <i class="glyphicon glyphicon-ok-sign" style={{
                    border: "none",
                    padding: "6px 7px 5px 7px",
                    fontSize: "1em",
                    color: "white",
                    borderRadius: "18px",
                    backgroundColor: "rgb(51, 183, 83)"
                  }}></i>
                </span></div>,
                "Deny": < div class="updatedevice" id="updatedevice" style={{ textAlign: "center" }}><span style={{ fontSize: '1em', color: 'white' }}>
                  <i class="glyphicon glyphicon-remove-sign" style={{
                    border: "none",
                    padding: "6px 7px 5px 7px",
                    fontSize: "1em",
                    color: "white",
                    borderRadius: "18px",
                    backgroundColor: "rgb(243, 54, 54)"
                  }}></i>
                </span></div>,
                "Deny With Reschedule": < div class="updatedevice" id="updatedevice" style={{ textAlign: "center" }}><span style={{ fontSize: '1em', color: 'white' }}>
                  <i class="glyphicon glyphicon-transfer" style={{
                    border: "none",
                    padding: "6px 7px 5px 7px",
                    fontSize: "1em",
                    color: "white",
                    borderRadius: "18px",
                    backgroundColor: "blue"
                  }}></i>
                </span></div>,

              };




            });

            dateArrayList = _.unique(dateArrayList);
            console.log("DATE ARRAY LIST :", dateArrayList);

            self.state.dateOptions = [];
            $.each(dateArrayList, function (i, item) {
              dateArrayOptions.push({ label: item, value: item });

            });

            self.state.columns = self.getColumns();
            self.state.dateOptions = dateArrayOptions;
            self.setState({
              dateOptions: self.state.dateOptions
            })

          }

          self.setState({
            data: self.state.data,
            columns: self.state.columns
          })



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

  }




  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });

  }

  OkFunc() {

    var self = this;

    if (this.state.status == "4") {
      if (this.state.appointmentDate != "" && this.state.appointmentTime != "" && this.state.description != "") {



        var time = moment(this.state.appointmentTime.split(":")[0] + ':' + this.state.appointmentTime.split(":")[1], 'HH:mm');
        time.add(this.state.duration.split(":")[0], 'H');
        time.add(this.state.duration.split(":")[1], 'm');
        this.state.appointmentEndTime = time.format("HH:mm");


        console.log("END TIME FOR SERVICE :", this.state.appointmentEndTime);


        var appointmentFixedDate = Date.parse(this.state.appointmentDate);
        var currentDate = Date.parse(this.state.currentDate);

        var proceedData = "Yes";

        if (appointmentFixedDate == currentDate) {
          console.log("DATE'S SAME ");

          var currentTime = new Date();
          var appointmentFixedTime = new Date();

          currentTime.setHours((this.state.time).split(":")[0], (this.state.time).split(":")[1], '0');
          appointmentFixedTime.setHours((this.state.appointmentTime).split(":")[0], (this.state.appointmentTime).split(":")[1], '0');

          if (appointmentFixedTime <= currentTime) {
            console.log("TIME  SAME ");
            proceedData = "No";
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Select Appointment Time In Future',
              showConfirmButton: false,
              timer: 2000
            })
          }

        }


        if (proceedData == "Yes") {
          this.RescheduleFunc();
        }

      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Kindly Fill in All Fields To Proceed',
          showConfirmButton: false,
          timer: 2000
        })
      }






    } else if (this.state.status == "1") {
      if (this.state.description != "-") {
        this.AcceptRejectFunc();
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Kindly Fill Description To proceed',
          showConfirmButton: false,
          timer: 2000
        })
      }
    }

  }


  handleAppointmentTime = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const id = e.target.id;
    this.setState({
      [name]: value,
    });

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
        <div class="card">
          <div class="card-header" style={{ backgroundColor: "" }}>
            <h4 style={{ fontWeight: "300", fontSize: "30px" }}>Appointments Confirmation</h4>
          </div>
          <div>
            <div class="card-body">
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" style={{ paddingTop: "10px" }} >
                  <label>Select Date</label>
                  <Select
                    name="dateOption"
                    isMulti={true}
                    options={this.state.dateOptions}
                    onChange={this.handleChangeSelectedDateOption}
                    value={this.state.dateOption}
                  />

                </div>

                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" style={{ paddingTop: "10px" }} >
                  <label>Description</label>
                  <input type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    style={{ color: "black", marginBottom: "0px" }}
                    onChange={this.handleUserInput}
                    value={this.state.description}
                    autocomplete="off"
                    placeholder="Description" />
                </div>
              </div>

              <div style={{ padding: "20px" }}>
                <button style={{ marginRight: "20px" }} onClick={() => this.AcceptRejectAllFunc("accept")} class="btn btn-primary">Accept All</button>

                <button style={{}} onClick={() => this.AcceptRejectAllFunc("reject")} class="btn btn-primary">Reject All</button>
              </div>

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
                  getTdProps={this.onRowClick} />

                <div style={{ opacity: "1" }} class="modal fade" id="descriptionmodal"  >
                  <div style={{ marginTop: "158px" }} class="modal-dialog">

                    <div class="modal-content">
                      <div class="modal-header">
                        <h4 class="modal-title" style={{ align: "center", display: "contents" }}>Description Details</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>

                      </div>
                      <div class="modal-body" >
                        <div class="form-body">

                          <div className={"form-group"}>
                            <div class="" >
                              <label>Description</label>
                              <input type="text"
                                id="description"
                                name="description"
                                style={{ color: "black", marginBottom: "0px" }}
                                onChange={this.handleUserInput}
                                value={this.state.description}
                                class="form-control"
                                autocomplete="off"
                                placeholder="Description" />
                            </div>
                            <div>
                              <button type="button" onClick={() => this.OkFunc()}
                                style={{ marginTop: "15px" }} class="btn btn-primary"
                              >Ok</button>
                            </div>
                          </div>
                        </div>


                      </div>
                    </div>

                  </div>

                </div>

                <div style={{ opacity: "1" }} class="modal fade" id="reschedulemodal"  >
                  <div style={{ marginTop: "158px" }} class="modal-dialog">

                    <div class="modal-content">
                      <div class="modal-header">
                        <h4 class="modal-title" style={{ align: "center", display: "contents" }}>Reschedule Details</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>

                      </div>
                      <div class="modal-body" >
                        <div class="">
                          <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4" style={{ paddingTop: "10px" }} >
                              <label>Date</label>
                              <input onChange={this.handleUserInput}
                              className="form-control"
                                id="appointmentdate" name="appointmentDate"
                                placeholder="Date Of Appointment"
                                value={this.state.appointmentDate} required />
                            </div>

                            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4" style={{ paddingTop: "10px" }} >

                              <label>Appointment Time</label>
                              <input
                                className="dateFromField form-control"
                                type="text"
                                data-step="5"
                                value={this.state.appointmentTime}
                                required
                                name="appointmentTime"
                                onSelect={this.handleAppointmentTime}
                                id="appointmentTimePicker"
                                placeholder="Enter AppointmentTime Time"

                              />
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4" style={{ paddingTop: "10px" }} >
                              <label>Description</label>
                              <input type="text"
                              className="form-control"
                                id="description"
                                name="description"
                                style={{ color: "black", marginBottom: "0px" }}
                                onChange={this.handleUserInput}
                                value={this.state.description}
                                autocomplete="off"
                                placeholder="Description" />
                            </div>
                            <div>
                              <button type="button" onClick={() => this.OkFunc()}
                                style={{ marginTop: "15px",marginLeft:"15px" }} class="btn btn-primary"
                              >Ok</button>
                            </div>
                          </div>
                        </div>


                      </div>
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

export default AppointmentConfirmation;
