import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import VendorEntryForm from './VendorEntryForm';
import CustomerList from './CustomerList';
import AddCategory from './AddCategory';
import AddUser from './AddUser';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';
import './datepicker.css';

import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import { FormErrors } from './FormErrors';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import './AddAppointment.css';
import moment from 'moment';

import Timekeeper from 'react-timekeeper';

 import Select from 'react-select';
 import _ from 'underscore';


 var serviceArray=[];
var serviceListArray=[];
var appointmentArray=[];
var serviceTimeArray=[];

class AddAppointment extends Component {

    
    constructor(){
        super()
        
        var today = new Date();
       // var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
       var date = today.getFullYear() + '-' + ('0'+(today.getMonth() + 1)).slice(-2) + '-' +('0'+ today.getDate()).slice(-2);
       var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var currentTime = today.getHours() + ":" + today.getMinutes() ;
      
        this.state={
            currentDate: date,
            companyId:companyId,
          
            data:[],
            columns:[],
            timekeeperData:false,
            time:currentTime,
            appointmentTime:currentTime,

            customerName:"",
            mobileNo:"",
            gender:"",
            appointmentDate:"",
            employeeDetails:"",
            modeofAppointment:"",
          
          
      
     
           
            
        }
        this.setState({
          currentDate: date,
           }) 
    }

    componentDidMount() {     

        window.scrollTo(0, 0);      
       var self=this;
       $("#timekeeperdiv").hide();
       
       var genderArray=[];
      genderArray.push({ label: 'Male', value: 'Male'});
      genderArray.push({ label: 'Female', value: 'Female'});
      genderArray.push({ label: 'Other', value: 'Other'});
      var appointmentModeArray=[];
      appointmentModeArray.push({ label: 'Call', value: 'Call'});
      appointmentModeArray.push({ label: 'Message', value: 'Message'});
      appointmentModeArray.push({ label: 'WalkIn', value: 'WalkIn'});

      this.state.genderOptions=genderArray;
      this.state.appointmodeOptions=appointmentModeArray;
      this.setState({
        genderOptions:this.state.genderOptions,
        appointmodeOptions:this.state.appointmodeOptions
      })

       $('#appointmentdate').datepicker({

        onSelect: function (date) {
  
          var dt = new Date(date);
          self.state.appointmentDate=date;

          self.setState({
            appointmentDate: self.state.appointmentDate,
          });
     },
  
        dateFormat: 'yy-mm-dd',
        minDate: '0',
        maxDate: '1M',
        numberOfMonths: 1
      });

     this.GetSaloonDetails();
    
     
  
 
}
   
   
GetSaloonDetails()
    {
       var self=this;

  $.ajax({
            type: 'POST',
            data: JSON.stringify({
              companyId: this.state.companyId,
              date:this.state.currentDate
            }),
          
              url: " http://15.206.129.105:8080/MerchandiseAPI/Appointments/GetSaloonDetails",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
             
            

                        
                            var  serviceArrayOptions=[];
                            var employeeArrayOptions=[];
                            appointmentArray=[];
                            serviceArray=[];
                      

                            serviceArray=data.serviceDetails;
                            appointmentArray=data.appointmentDetails;

                              $.each(data.serviceDetails, function (i, item) {
                                serviceArrayOptions.push({ label:item.serviceName , value: item.serviceName });
                                });

                              $.each(data.employeeDetails, function (i, item) {
                                employeeArrayOptions.push({ label: item.employeeName, value: item.employeeId+','+item.employeeName });   
                                });

                              

                              self.state.serviceOptions=serviceArrayOptions;
                              self.state.employeeOptions=employeeArrayOptions;
                          
                              self.setState({
                                serviceOptions:self.state.serviceOptions,
                                employeeOptions:self.state.employeeOptions
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
          
      
            },
        });
    }
   
    handleUserInput = (e) => {
      const name = e.target.name;
      const value = (e.target.value).replace(/[^A-Za-z]/g, "");
      this.setState({
        [name]: value,
      });
  
    }    
  
    handleUserInputMobileNo =(e) =>{
      const name = e.target.name;
      const value = (e.target.value).replace(/[^0-9.,]+/, '');
      this.setState({
        [name]: value,
      });
    }


    handleChangeSelectedGenderOption = (e) => {
      // Display selected value for user
      var currentValue=e;
      this.state.genderOption=e;
      this.state.gender=e.value;
      this.setState({
        genderOption:this.state.genderOption,
        gender:this.state.gender
      })
  }


handleChangeSelectedServiceOption = (e) => {
      
            // Display selected value for user
            var currentValue=e;
            this.state.serviceOption=e;
            this.setState({
              serviceOption:this.state.serviceOption
            })

            serviceListArray=[];
            serviceTimeArray=[];
            $.each(e, function (i, item) {
              serviceListArray.push(item.value);
              var timeArray=_.where(serviceArray, {serviceName: item.value});
              serviceTimeArray.push(timeArray[0].serviceTime);
          
              });
           
                       
     }

handleChangeSelectedEmployeeOption = (e) => {
      
                      // Display selected value for user
                      var currentValue=e;
                      this.state.employeeOption=e;
                      this.state.employeeDetails=e.value;
                      this.setState({
                        employeeOption:this.state.employeeOption,
                        employeeDetails:this.state.employeeDetails
                      })
                     
                                  
                            
                         
      }
          
      handleChangeSelectedAppointmentModeOption = (e) => {
            // Display selected value for user
            var currentValue=e;
            this.state.modeofappointmentOption=e;
            this.state.modeofAppointment=e.value;
            this.setState({
              modeofappointmentOption:this.state.modeofappointmentOption,
              modeofAppointment:this.state.modeofAppointment
            })
      }

      keeperchangetime(newTime){
        this.state.appointmentTime=newTime;
        this.setState({
          appointmentTime:this.state.appointmentTime
        })
      }
      
      OpenTimeKeeper(){
      
        if(this.state.timekeeperData==true){
          $("#timekeeperdiv").hide();
        }else{
          $("#timekeeperdiv").show();
        }
       
      }
      
      CloseTimeKeeper(){
        this.state.timekeeperData=false;
        $("#timekeeperdiv").hide();
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
  
 



  MakeAppointmentFunc(){

    var self=this;


    var proceedData="Yes";

   
    if(  this.state.customerName!="" && this.state.mobileNo!="" && 
    this.state.gender!="" && this.state.appointmentDate!="" && 
    this.state.employeeDetails!="" && serviceListArray.length!=0 && 
      this.state.modeofAppointment!="" ){

   var appointmentFixedDate = Date.parse(this.state.appointmentDate);
   var currentDate = Date.parse(this.state.currentDate);


    if(appointmentFixedDate==currentDate){
    

      var currentTime=new Date();
      var appointmentFixedTime =new Date();
 
       currentTime.setHours((this.state.time).split(":")[0], (this.state.time).split(":")[1],'0');
       appointmentFixedTime.setHours((this.state.appointmentTime).split(":")[0], (this.state.appointmentTime).split(":")[1],'0');
 
       if(appointmentFixedTime<=currentTime){
         
         proceedData="No";
         Swal.fire({
           position: 'center',
           icon: 'warning',
           title: 'Select Appointment Time In Future',
           showConfirmButton: false,
           timer: 2000
         })
       }

    }

  

    
    if(proceedData=="Yes"){
      var totalServiceTime=0;

          $.each(serviceTimeArray, function (i, item) {
            var startMin=item;

            var hr=startMin.split(":")[0];
            var min=startMin.split(":")[1];
      
            var totalMin=Number(hr)*60+Number(min);
            totalServiceTime=Number(totalMin)+Number(totalServiceTime);
      
      
          });
   
            var hr=this.state.appointmentTime.split(":")[0];
            var min=this.state.appointmentTime.split(":")[1];

            var totalMin=Number(hr)*60+Number(min);
            totalServiceTime=Number(totalMin)+Number(totalServiceTime);

            var hours = Math.floor(totalServiceTime / 60);  
            hours=('0'+(hours)).slice(-2) ;

            var minutes = totalServiceTime % 60;
            minutes=('0'+(minutes)).slice(-2) ;

            var endTimings= hours + ":" + minutes;    
          


          var empTimeArray=_.where(appointmentArray, {employeedetails: this.state.employeeDetails,appointmentDate:this.state.appointmentDate});
       

      
          var format = 'hh:mm';
          var timeCheckData;
            for(var i=0;i<empTimeArray.length;i++){

                    // var time = moment() gives you current time. no format required.
                    var time = moment(this.state.appointmentTime,format),
                    endTime=moment(endTimings,format),
                    beforeTime = moment(empTimeArray[i].appointmentTime, format),
                    afterTime = moment(empTimeArray[i].appointmentEndTime, format);
                  
                  if (time.isBetween(beforeTime, afterTime) || endTime.isBetween(beforeTime, afterTime) ) {
                    timeCheckData="is_between";
                   
                    proceedData="No";

                    Swal.fire({
                      position: 'center',
                      icon: 'warning',
                      title: 'Kindly Select Some Other Time As Per Your Convinence As Employee Is Already Engaged',
                      showConfirmButton: false,
                      timer: 2000
                    })

                    break;
                  } else {
                    timeCheckData="is_not_between";
                  
                    proceedData="Yes";
                  }

            }

        if( timeCheckData=="is_between"){
            
          var empAppointmentTimeData="";

          var tab = '<thead><tr><th>S.NO</th><th>Start Time</th><th>End Time</th></tr></thead>';
   
          for(var i=0;i<empTimeArray.length;i++){
            var sno=Number(i)+1;
          //  empAppointmentTimeData+=sno+". "+empTimeArray[i].appointmentTime+" - "+empTimeArray[i].appointmentEndTime+"<br>";
           tab += '<tr>'
          +'<td>' + sno+ '</td><td>' + empTimeArray[i].appointmentTime + '</td><td>' + empTimeArray[i].appointmentEndTime+ '</td>'
          +'</tr>';
          }
          

     
         $("#employeeengagedtable").empty();
         $("#employeeengagedtable").append(tab);
      
           $("#myModal1").modal('show');
        }


     


    

    }

    if(proceedData=="Yes"){
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        customerName: this.state.customerName,
        mobileNo: this.state.mobileNo,
        gender:this.state.gender,
        appointmentDate: this.state.appointmentDate,
        bookingDate: this.state.currentDate,
        appointmentTime: this.state.appointmentTime,
        appointmentEndTime:endTimings,
        companyId: this.state.companyId,
        service: serviceListArray.toString(),
        employeedetails:this.state.employeeDetails,
        appointmentBy:'Saloon',
        modeofAppointment:this.state.modeofAppointment,
        getDataType:'NotAllSaloon',
        date:this.state.currentDate,
        status:'0',
        description:"-",
      }),

      url: " http://15.206.129.105:8080/MerchandiseAPI/Appointments/MakeAppointments",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

       
      
          if(data.response=="Success"){
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Made Appointment Successfully',
              showConfirmButton: false,
              timer: 2000
            })
            self.cancelFunc();
          }else if(data.response=="EmployeeEngaged"){
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Employee Is Already Engaged Kindly Select Some Other Time',
              showConfirmButton: false,
              timer: 2000
            })
          }

    

         var  serviceArrayOptions=[];
         var employeeArrayOptions=[];
         appointmentArray=[];
         serviceArray=[];
   

         serviceArray=data.serviceDetails;
         appointmentArray=data.appointmentDetails;

          self.state.serviceArrayOptions="";
          self.state.employeeArrayOptions="";

           $.each(data.serviceDetails, function (i, item) {
             serviceArrayOptions.push({ label:item.serviceName , value: item.serviceName });
             });

           $.each(data.employeeDetails, function (i, item) {
             employeeArrayOptions.push({ label: item.employeeName, value: item.employeeId+','+item.employeeName });   
             });

           

           self.state.serviceOptions=serviceArrayOptions;
           self.state.employeeOptions=employeeArrayOptions;
       
           self.setState({
             serviceOptions:self.state.serviceOptions,
             employeeOptions:self.state.employeeOptions
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
      },
    });
  }

}else{
  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: 'Kindly Fill In All Fields To Proceed',
    showConfirmButton: false,
    timer: 2000
  })
}

  }




  cancelFunc(){

 

    this.state.customerName="";
    this.state.mobileNo="";
    this.state.gender="";
    this.state.appointmentDate="";
    this.state.bookingDate="";
    this.state.appointmentTime=this.state.time;
    serviceListArray=[];
    this.state.employeeDetails="";
    this.state.saloonOption="";
    this.state.serviceOption="";
    this.state.employeeOption="";
    this.state.genderOption="";
    this.state.modeofappointmentOption="";
    this.state.modeofAppointment="";
    
  
  
    this.setState({
      customerName: this.state.customerName,
      mobileNo: this.state.mobileNo,
      gender:this.state.gender,
      appointmentDate: this.state.appointmentDate,
      bookingDate: this.state.currentDate,
      appointmentTime: this.state.appointmentTime,
      employeeDetails:this.state.employeeDetails,
      saloonOption:this.state.saloonOption,
      serviceOption:this.state.serviceOption,
      employeeOption:this.state.employeeOption,
      genderOption:this.state.genderOption,
      modeofappointmentOption:this.state.modeofappointmentOption,
      modeofAppointment:this.state.modeofAppointment,
    })
  
  }
    render() {
      const label_style={
        paddingTop: "20px"
      }
      
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
              <h4 style={{ fontWeight: "300", fontSize: "30px" }}>Make Appointment </h4>
            </div>
          </div>
  
          <div class="row" style={{ backgroundColor: "" }}>
            <div class="col-xs-12 col-sm-4 col-lg-4 " style={label_style}>
              <label class="control-label selectpicker" for="customerName">Contact No:</label>
              <input
                  type="text"
                  id="mobileno"
                  name="mobileNo"
                  style={{ color: "black", marginBottom: "0px" }}
                  onChange={this.handleUserInputMobileNo}
                  value={this.state.mobileNo}
                  class="form-control"
                  autocomplete="off"
                  placeholder="Contact No" />
            </div>
            <div class="col-xs-12 col-sm-4 col-lg-4 " style={label_style}>
              <label class="control-label selectpicker " for="customerName">Customer Name:</label>
              <input
                  type="text"
                  id="customername"
                  name="customerName"
                  onChange={this.handleUserInput}
                  value={this.state.customerName}
                  style={{ color: "black", marginBottom: "0px" }}
                  class="form-control"
                  autocomplete="off"
                  placeholder="customer Name" />
  
            </div>
            <div class="col-xs-12 col-sm-4 col-lg-4 " style={label_style}>
              <label class="control-label selectpicker" id="quantity" for="customerName">Gender:</label>
              <Select
                id="gender"
                name="gender"
                isMulti={false}
                options={this.state.genderOptions}
                onChange={this.handleChangeSelectedGenderOption}
                value={this.state.genderOption}
              />
            </div>
          </div>
  
          <div class="row" style={{ backgroundColor: "" }}>
            <div class="col-xs-12 col-sm-4 col-lg-4 " style={label_style}>
              <label class="control-label selectpicker" for="customerName">Date Of Appointment:</label>
              <input onChange={this.handleUserInput} class="form-control"
                  id="appointmentdate" name="appointmentDate" placeholder="Date Of Appointment" value={this.state.appointmentDate} required />
            </div>
            <div class="col-xs-12 col-sm-4 col-lg-4 " style={label_style}>
              <label class="control-label selectpicker " for="customerName"> Time Of Appointment:</label>
              <input onClick={() => this.OpenTimeKeeper()} class="form-control"
                  id="appointmenttime" name="appointmentTime" placeholder="Appointment Time" value={this.state.appointmentTime} readOnly />
  
            </div>
            <div class="col-xs-12 col-sm-4 col-lg-4 " style={label_style}>
              <div id="timekeeperdiv"
                style={{
                  position: "absolute",
                  display: "none",
                  zIndex: "10",
                   marginTop: "20px",
      }}>
             <Timekeeper
                onChange={(newTime) => this.keeperchangetime(newTime.formatted24)}
                hour24Mode
                //   coarseMinutes={15}
                //  forceCoarseMinutes
                switchToMinuteOnHourSelect
                doneButton={(newTime) => (
                  <div
                    style={{ textAlign: 'center', padding: '10px 0' }}
                    onClick={() => this.CloseTimeKeeper()}
                  >
                    Done
                  </div>
                )}
  
              />
            </div>
          </div>
        </div>
  
  
        <div class="row" style={{ backgroundColor: "" }}>
          <div class="col-xs-12 col-sm-4 col-lg-4 " style={label_style}>
            <label class="control-label selectpicker" for="customerName"> Service:</label>
            <Select
                id="selectedOption"
                name="selectedOption"
                isMulti={true}
                options={this.state.serviceOptions}
                onChange={this.handleChangeSelectedServiceOption}
                value={this.state.serviceOption}
              />
  
          </div>
          <div class="col-xs-12 col-sm-4 col-lg-4 " style={label_style}>
            <label class="control-label selectpicker " for="customerName"> Employee:</label>
            <Select
                id="selectedOption"
                name="selectedOption"
                isMulti={false}
                options={this.state.employeeOptions}
                onChange={this.handleChangeSelectedEmployeeOption}
                value={this.state.employeeOption}
              />
          </div>
          <div class="col-xs-12 col-sm-4 col-lg-4 " style={label_style}>
            <label class="control-label selectpicker" id="quantity" for="customerName">Appointment Mode:</label>
            <Select
                id="modeofAppointment"
                name="modeofAppointment"
                isMulti={false}
                options={this.state.appointmodeOptions}
                onChange={this.handleChangeSelectedAppointmentModeOption}
                value={this.state.modeofappointmentOption}
              />
          </div>
        </div>
        <div>
          <button type="button" onClick={() => this.MakeAppointmentFunc()} style={{ marginTop: " 2%" }} class="btn btn-primary ">Make Appointment</button>
  
        </div>
  
          <div style={{ opacity: "1" }} class="modal fade" id="myModal1"  >
            <div style={{ marginTop: "158px" }} class="modal-dialog">
  
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title" style={{ align: "center", display: "contents" }}>Employee Engaged Timings</h4>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
  
                </div>
                <div class="modal-body" >
                  <div class="form-body">
  
  
                    <form class="form-horizontal form-bordered" name="submissions">
                      <div className={"form-group"}>
                        <label class="control-label col-sm-2 remove" for="modalproductName">Employee Engaged On <span>{this.state.appointmentDate}</span> At </label>
                        <div class="col-sm-10" style={{ textAlign: "-webkit-center" }}>
                          <table id="employeeengagedtable" style={{ borderSpacing: "14px", borderCollapse: "separate" }}> </table>
                        </div>
                      </div>
  
  
                    </form>
                  </div>
  
  
                </div>
              </div>
  
            </div>
  
          </div>
  
  
  
  
  
        </div>
      );
    }

}
export default AddAppointment