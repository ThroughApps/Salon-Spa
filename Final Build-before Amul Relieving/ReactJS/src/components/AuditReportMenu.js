import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import $ from 'jquery';

import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import PurchaseDateWiseReportDisplay from './PurchaseDateWiseReportDisplay';
import ReportMenuPage from './ReportMenuPage';
import ReportMenuPagePremium from './ReportMenuPagePremium';
import ReportMenuPageBasic from './ReportMenuPageBasic';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import AuditReport from './AuditReport';
import moment from 'moment';
var currentRow;

class AuditReportMenu extends Component {


    constructor() {
        super()

        var today = new Date();
        var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var year = today.getFullYear();
        var dateAdd = moment().subtract(7, 'd').toDate();
        var fromdate = dateAdd.getFullYear() + '-' + (dateAdd.getMonth() + 1) + '-' + dateAdd.getDate();
        this.state = {
            year: year,
            fromDate: fromdate,
            toDate: today1,
            companyId: companyId,
            companyName: companyName,


        };



    }

    componentDidMount() {

        var self = this;
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


    handleUserInput = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });

    }

    Submit() {

        if (this.state.fromDate.length > 0 && this.state.toDate.length > 0) {
            var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

            this.state.companyId = companyId;
            this.state.employeeId = employeeId;


            this.setState({
                companyId: this.state.companyId,
                employeeId: this.state.employeeId,
                fromDate: this.state.fromDate,
                toDate: this.state.toDate,

            });
            var self = this;

            // alert("JSON"+JSON.stringify(this.state));
            $.ajax({
                type: 'POST',
                data: JSON.stringify(this.state),

                url: " http://15.206.129.105:8080/MerchandiseAPI/EstimateReport/auditReport",
                contentType: "application/json",
                dataType: 'json',
                async: false,
                success: function (data, textStatus, jqXHR) {
                    ReactDOM.render(
                        <Router>
                            <div>

                                <Route path="/" component={() => <AuditReport data={data} fromDate={self.state.fromDate} toDate={self.state.toDate} />} />


                            </div>
                        </Router>,
                        document.getElementById('contentRender'));
                    registerServiceWorker();



                },
                error: function (data) {
                    confirmAlert({
                        title: 'No Internet',                        // Title dialog
                        message: 'Network Connection Problem',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    });


                },
            });
        } else {
            confirmAlert({
                title: 'Error',                        // Title dialog
                message: 'Please Select Dates',               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
            });
        }

    }
    BackbtnFunc() {
        var planName = CryptoJS.AES.decrypt(localStorage.getItem("PlanName"), "shinchanbaby").toString(CryptoJS.enc.Utf8);

        //	 alert("plantype"+planName);
        if (planName.toLowerCase() == "basic") {
         
            ReactDOM.render(
                <Router>
                    <div >
                        <Route exact path="/" component={ReportMenuPageBasic} />

                    </div>
                </Router>, document.getElementById('contentRender'));
            registerServiceWorker();
        }
        else if (planName.toLowerCase() == "premium") {
          
            ReactDOM.render(
                <Router>
                    <div >
                        <Route exact path="/" component={ReportMenuPagePremium} />

                    </div>
                </Router>,
                document.getElementById('contentRender'));
            registerServiceWorker();
        }
        else if (planName.toLowerCase() == "elite") {
        
            ReactDOM.render(
                <Router>
                    <div >
                        <Route exact path="/" component={ReportMenuPage} />

                    </div>
                </Router>,
                document.getElementById('contentRender'));
            registerServiceWorker();
        }

    }

    render() {
        return (


            <div class="container" style={{ height: "20px" }}>

<div class="row">
                    <div class="col-sm-3 ">
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
                    <div class="col-sm-9">
                    <div class="card-header">
                          <h3 id="companyHeader" style={{marginLeft:"150px"}}> {this.state.companyName}</h3>
                  
                  <h4  id="reportHeader" style={{marginLeft:"130px"}}>Audit Report</h4>
             
                    
                      </div>
                    </div> 
                  </div>   




                <div class="jumbotron" id="containerbodyjumbo" >
                    
                    <form class="form-horizontal form-bordered" name="submissions">
                        <div class="form-group">
                            <label class="control-label col-sm-2 font-weight-bold" for="fromDate">From<span style={{ color: "red" }}>*</span></label>
                            <div class="col-sm-5">
                                <input
                                    className="dateToField"
                                    style={{ width: '50%' }}
                                    type="text"
                                    value={this.state.fromDate}
                                    id="fromDate" name="fromDate"
                                    onChange={this.handleUserInput} />


                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-2 font-weight-bold" for="toDate">To<span style={{ color: "red" }}>*</span></label>
                            <div class="col-sm-5">

                                <input
                                    className="dateToField"
                                    style={{ width: '50%' }}
                                    type="text"
                                    value={this.state.toDate}
                                    id="toDate" name="toDate"
                                    onChange={this.handleUserInput} />
                            </div></div>


                        <div class="form-group">
                            <label class="control-label col-sm-2 font-weight-bold"></label>
                            <div class="col-sm-5">
                                <button
                                    type="button"
                                    onClick={() => this.Submit()}
                                    className="btn btn-primary"
                                >Submit</button></div>
                        </div>
                    </form>


                </div>






            </div>

        );
    }
}

export default AuditReportMenu;