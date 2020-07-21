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


class FutureAppointments extends Component {
  constructor() {
    super()

    var today = new Date();
    var date = today.getFullYear() + '-' + ('0'+(today.getMonth() + 1)).slice(-2) + '-' +('0'+ today.getDate()).slice(-2);
 
 
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
   

    this.state = {
      date: date,
      companyId: companyId,
      data:[],
      columns:[],


    };

    this.setState({

      companyId: companyId,
      date:date,

    })

  }
  

  componentDidMount() {

 
    window.scrollTo(0, 0);

    this.GetFutureAppointmentsFunc();


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


  GetFutureAppointmentsFunc(){

    var self=this;
    $.ajax({
        type: 'POST',
        data: JSON.stringify({
          companyId: this.state.companyId,
          date:this.state.date,
  
        }),
        url: " http://15.206.129.105:8080/MerchandiseAPI/AppointmentReport/GetFutureAppointment",
        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {
  
      
  
          
          if (data.length != 0) {
          
            var no=0;
  
  
            $.each(data, function (i, item) {
              no = Number(no) + 1;
 
                var status="Active";
                if(item.status=="1"){
                    status="Cancelled";
                }else if(item.status=="2"){
                  status="Confirmed";
                }else if(item.status=="4"){
                  status="Rescheduled";
                }

                var serviceTime=item.appointmentTime+" - "+item.appointmentEndTime;

                self.state.data[i] = {
                  "SNo":no,
                  "BookingDate":  item.bookingDate,
                  "AppointmentDate":  item.appointmentDate,
                  "CustomerName": item.customerName,
                  "ContactNo": item.mobileNo,
                  "Timings": serviceTime,
                  "Service": item.service ,
                  "Employee": item.employeedetails.split(",")[0]+" "+item.employeedetails.split(",")[1] ,
                  "Status":status,
                  "Description":item.description,
                  "Gender":item.gender,
                  "ModeOfAppointment":item.modeofAppointment,
                  "AppointmentBy":item.appointmentBy,
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
     
              };
         
         
         
         
              });
  
              self.state.columns = self.getColumns();
  
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



  getColumns(){

     return Object.keys(this.state.data[0]).map(key => {
      if (

        key != "Gender" &&
        key != "ModeOfAppointment" &&
        key != "AppointmentBy" 
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

           
          if (column.Header == "View") {
             
              if(rowInfo!=undefined){

               


                    self.state.bookingDate =rowInfo.original["BookingDate"];
                    self.state.appointmentDate = rowInfo.original["AppointmentDate"];
                    self.state.customerName = rowInfo.original["CustomerName"];// get current row 1st TD value
                    self.state.contactNo = rowInfo.original["ContactNo"];
                    self.state.timings = rowInfo.original["Timings"];
                    self.state.service =rowInfo.original["Service"];
                    self.state.employeedetails = rowInfo.original["Employee"];
                    self.state.status =rowInfo.original["Status"];
                    self.state.gender =rowInfo.original["Gender"];
                    self.state.modeofAppointment =rowInfo.original["ModeOfAppointment"];
                    self.state.appointmentBy =rowInfo.original["AppointmentBy"];

                    self.setState({
                      bookingDate:self.state.bookingDate,
                      appointmentDate:self.state.appointmentDate,
                      customerName:self.state.customerName,
                      contactNo:self.state.contactNo,
                      timings:self.state.timings,
                      service:self.state.service,
                      employeedetails:self.state.employeedetails,
                      status:self.state.status,
                      gender:self.state.gender,
                      modeofAppointment:self.state.modeofAppointment,
                      appointmentBy:self.state.appointmentBy
                    })


    /*  ReactDOM.render(<SalesReportDisplay id={self.state.id}
        date={self.state.date} userName={self.state.userName} contact={self.state.contact}
        status={self.state.status} balanceAmt={self.state.balanceAmt} subtotal1={self.state.subtotal1} customerId={self.state.customerId} companyName={self.state.companyName} />, document.getElementById("contentRender"));
    */ 

       $("#myModal1").modal('show');
    }

    

            }
        }
    };
};

  render() {
   {/* const  downloadButtonData=<span style={{fontWeight:"700",fontWeight: "900",fontSize:"15px"}}>Download</span> */}
               
 
    return (

      <div class="container">
         <div class="card">
         <div class="row">
          <div class="col-sm-2 ">
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

          </div> 
          <div class="col-sm-10 ">
                    <div class="card-header">
                          <h3 id="companyHeader" style={{marginLeft:"150px"}}> {this.state.companyName}</h3>
                  
                  <h4  id="reportHeader" style={{marginLeft:"130px"}}>Future Appointments</h4>
             
                    
                      </div>
                    </div> 
 </div>
          
          <div>
            <div class="card-body">
             
              <div>

   <div className="row">
        <div className="col-sm-4 col-lg-8 col-md-8">
       
        </div>
        
<div className="col-sm-4 col-lg-2 col-md-2">
   

</div>
        </div>
             
                <div id="tableOverflow">
                  <table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">

                  </table>
                </div>


                 <ReactTable style={{overflow:"auto"}}
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


   <div style={{opacity:"1"}} class="modal fade" id="myModal1"  >
            <div style={{marginTop: "158px"}}  class="modal-dialog">

              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title" style={{ align: "center",display: "contents" }}>Customer Details</h4>
                  <button type="button"  class="close" data-dismiss="modal">&times;</button>

                </div>
                <div class="modal-body" >
                  <div class="form-body">
                    

                    <form class="form-horizontal form-bordered" name="submissions">
                      <div className={"form-group"}>
                        <div class="col-sm-10" style={{textAlign:"-webkit-center"}}>
                         <table id="customermodaltable"> 
                         <tr><td>CustomerName</td><td style={{paddingLeft: "31px"}}>{this.state.customerName}</td></tr>
                         <tr><td>ContactNo</td><td style={{paddingLeft: "31px"}}>{this.state.contactNo}</td></tr>
                         <tr><td>Gender</td><td style={{paddingLeft: "31px"}}>{this.state.gender}</td></tr>
                         <tr><td>BookingDate</td><td style={{paddingLeft: "31px"}}>{this.state.bookingDate}</td></tr>
                         <tr><td>AppointmentDate</td><td style={{paddingLeft: "31px"}}>{this.state.appointmentDate}</td></tr>
                         <tr><td>Timings</td><td style={{paddingLeft: "31px"}}>{this.state.timings}</td></tr>
                         <tr><td>Service</td><td style={{paddingLeft: "31px"}}>{this.state.service}</td></tr>
                         <tr><td>EmployeeDetails</td><td style={{paddingLeft: "31px"}}>{this.state.employeedetails}</td></tr>
                         <tr><td>ModeOfAppointment</td><td style={{paddingLeft: "31px"}}>{this.state.modeofAppointment}</td></tr>
                         <tr><td>AppointmentBy</td><td style={{paddingLeft: "31px"}}>{this.state.appointmentBy}</td></tr>
                         <tr><td>Appointment Status</td><td style={{paddingLeft: "31px"}}>{this.state.status}</td></tr>
                         </table>
                         </div>
                      </div>
                   
         
                    </form>
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

export default FutureAppointments;
