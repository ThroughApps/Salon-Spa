import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css 
import $ from 'jquery';
import './datepicker.css';


import Switch from 'react-toggle-switch';
import '../../node_modules/react-toggle-switch/dist/css/switch.min.css';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';

import FooterText from './FooterText';
import timepicker from 'timepicker/jquery.timepicker';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';

class ConfigurationPage extends Component {
    constructor(){
        super()
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var configValue = CryptoJS.AES.decrypt(localStorage.getItem('ConfigValue'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var toggleValue = CryptoJS.AES.decrypt(localStorage.getItem('ToggleValue'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
       
       
        if (configValue == 0) {
            configValue = false;
          } else {
            configValue = true;
          }

          if (toggleValue == 0) {
            toggleValue = false;
          } else {
            toggleValue = true;
          }
        this.state={
            date: date,
            toggleTime:'',
            staffId:staffId,
 employeeName:employeeName,
role:role,  
            configValue:configValue,
            companyId:companyId,
            toggleValue:toggleValue,
          

        }
        this.setState({
            date: date,
           }) 
      
    }
    handleToggleTime = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({
        [name]: value,
     
      });
 
    }
    configValueChange = () => {

        if (this.state.configValue == 0) {
          this.state.configValue = 1;
    
          this.setState({
            configValue: 1,
          })
        } else {
          this.state.configValue = 0;
    
          this.setState({
            configValue: 0,
          })
        }
    
        this.configValueFunc();
      };

      toggleValueChange = () => {

        if (this.state.toggleValue == 0) {
          this.state.toggleValue = 1;
    
          this.setState({
            toggleValue: 1,
          })
        } else {
          this.state.toggleValue = 0;
    
          this.setState({
            toggleValue: 0,
          })
        }
    
        this.toggleValueFunc();
      };
      toggleValueFunc(){

        var self = this;
        $.ajax({
          type: 'POST',
          data: JSON.stringify({
    
            companyId: this.state.companyId,
            toggleValue: this.state.toggleValue,

          
          }),
          url: " http://15.206.129.105:8080/MerchandiseAPI/MessageCenter/toggleValueSettings",
     
        contentType: "application/json",
    
          async: false,
    
          success: function (data, textStatus, jqXHR) {

            self.state.toggleValue = data.toggleValue;
    
            var key = "shinchanbaby";
           
            localStorage.setItem('ToggleValue', CryptoJS.AES.encrypt(data.toggleValue.toString(), key));
            var consoleprint = CryptoJS.AES.decrypt(localStorage.getItem('ToggleValue'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
      
        
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

      configValueFunc() {
     
    
        var self = this;
        $.ajax({
          type: 'POST',
          data: JSON.stringify({
    
            companyId: this.state.companyId,
            configValue: this.state.configValue,
            staffId: self.state.staffId,
                   employeeName: self.state.employeeName,
                   role: self.state.role,
          
          }),
          url: " http://15.206.129.105:8080/MerchandiseAPI/MessageCenter/ConfigValueSettings",
     
        contentType: "application/json",
    
          async: false,
    
          success: function (data, textStatus, jqXHR) {
   
            self.state.configValue = data.configValue;
    
            var key = "shinchanbaby";
            localStorage.setItem('Config', data.configValue.toString());
            localStorage.setItem('ConfigValue', CryptoJS.AES.encrypt(data.configValue.toString(), key));
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

      toggleSwitch = () => {
        this.setState(prevState => {
          return {
            switched: !prevState.switched
          };
        });
      };
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            
     );
      }
 
    
      
 

      componentDidMount() {
       window.scrollTo(0, 0);      
  //     this.Initialize();
    
       $("#nodata").hide(); 

    $(document).ready(function () {

        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
        });

    });

    $('#toggleTime').timepicker({
      onSelect: function (time) {
        $("#checkOutTime").timepicker('option', 'minTime', time);
        this.state.toggleTime = time;
        this.setState({
          toggleTime: time,
        });
      },

      timeFormat: 'H:i:s',
    });
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

    render() {
        return(
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
                        <div class="card-header" style={{backgroundColor:""}}>
                    <h4 style={{fontWeight:"300",fontSize:"30px"}}>Configuration</h4><hr></hr>
                  </div>
                 
                  <div class="card-body">
                   <form class="form-horizontal form-bordered" >
                   <div class="form-group"> 
                   <div class="row">
                   <div className="col-sm-4">
                   <label class="control-label" for="roleName">Add Estimate to Invoices:</label>
                  </div>
                  <div class="col-sm-8" style={{paddingTop:"10px"}}>
                  <Switch onClick={this.configValueChange} on={this.state.configValue} />  
                  </div>
                   </div>
                  </div>
{/* 
                  <div class="form-group"> 
                   <div class="row">
                   <div className="col-sm-4">
                   <label class="control-label" for="roleName">Do you want toggle dashboard ?</label>
                  </div>
                  <div class="col-sm-8" style={{paddingTop:"10px"}}>
                  <Switch onClick={this.toggleValueChange} on={this.state.toggleValue} />  
                  </div>
                   </div>
                  </div> */}

                  {/* <div className="form-group">
                <label class="control-label col-sm-2" for="toggleTime">Toggle Time<span style={{ color: "red" }}>*</span></label>
                <div class="col-lg-2 col-md-4 col-sm-2">
                  <input
                    className="dateFromField form-control"

                    type="text"
                    data-step="5"
                    value={this.state.toggleTime}
                    required
                    name="toggleTime"
                    onSelect={this.handleToggleTime}

                    id="toggleTime"
                    placeholder="Enter toggle Time"

                  /> </div></div> */}
             
              </form></div>
          
             
              </div> </div>
                    );
    }

}
export default ConfigurationPage;