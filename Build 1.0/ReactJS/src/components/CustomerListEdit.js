import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import { FormErrors } from './FormErrors';
import $ from 'jquery';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import SalesReportDisplay from './SalesReportDisplay';
import SalesDailyReport from './SalesDailyReport';
import ReportMenuPage from './ReportMenuPage';
import ReportMenuPagePremium from './ReportMenuPagePremium';
import ReportMenuPageBasic from './ReportMenuPageBasic';
import CryptoJS from 'crypto-js';
import CustomerList from './CustomerList';
import FooterText from './FooterText';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import Case from 'case';

var id;
var discount = 0;
var pay = 0;
class CustomerListEdit extends Component {

    constructor(props) {
        super(props)
        var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state = {

            customerName: this.props.customerName,
            companyName: this.props.companyName,
            address: this.props.address,
            contactNo: this.props.contactNo,
            city: this.props.city,
            alternateContactNo: this.props.alternateContactNo,
            gstNo: this.props.gstNo,
            email: this.props.email,
            customerId: this.props.customerId,
            date: date,
            companyId: companyId,
            staffId: staffId,
            employeeName: employeeName,
            role: role,

            formErrors: {
                customerName: '',
                companyName: '',
                address: '',
                contactNo: '',
                gstNo: '',
                email: '',
            },
            customerNameValid: false,
            companyNameValid: false,
            addressValid: false,
            contactNoValid: false,
            emailValid: false,
            backButtonVariable: true,
        };
        this.setState({
            date: date,
        })


    }


    componentDidMount() {

    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let customerNameValid = this.state.customerNameValid;
        let companyNameValid = this.state.companyNameValid;
        let addressValid = this.state.addressValid;
        let contactNoValid = this.state.contactNoValid;
        let emailValid = this.state.emailValid;

        switch (fieldName) {
            case 'customerName':
                customerNameValid = value.match(/^([a-zA-Z]+)([a-zA-Z ])*$/);
                fieldValidationErrors.CustomerName = customerNameValid ? '' : ' is InCorrect';
                break;
            case 'companyName':
                companyNameValid = value.match(/^[a-zA-Z]([a-zA-Z0-9]|[- @\.#&!])*$/);
                fieldValidationErrors.CompanyName = companyNameValid ? '' : ' is InCorrect';
                break;
            case 'address':
                addressValid = value.length >= 5;
                fieldValidationErrors.Address = addressValid ? '' : ' is too short';
                break;

            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.Email = emailValid ? '' : ' is InCorrect';
                break;

            // 
            case 'contactNo':
                // contactNoValid = value.length == 5;
                contactNoValid = value.match(/^(\d{10})$/);
                // contactNoValid = value.match(/^[- +()]*[0-9][- +()0-9]*$/);
                fieldValidationErrors.ContactNo = contactNoValid ? '' : ' is InCorrect';
                // $("#contactNo").val("");
                break;

            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            customerNameValid: customerNameValid,
            companyNameValid: companyNameValid,
            addressValid: addressValid,
            contactNoValid: contactNoValid,
            emailValid: emailValid
        }, this.validateForm);
    }
    validateForm() {

        this.setState({
            formValid:
                this.state.customerNameValid
                && this.state.companyNameValid
                && this.state.addressValid
                && this.state.contactNoValid


        });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }



    handleUserInput = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });

    }




    UpdateSubmit() {

        var self = this;

        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                customerName: Case.capital(self.state.customerName),
                companyName: Case.capital(self.state.companyName),
                address: self.state.address,
                contactNo: self.state.contactNo,
                city: self.state.city,
                alternateContactNo: self.state.alternateContactNo,
                gstNo: self.state.gstNo,
                email: self.state.email,
                customerId: self.state.customerId,

                staffId: self.state.staffId,
                employeeName: self.state.employeeName,
                role: self.state.role,

                oldCustomerName: self.state.oldCustomerName,
                oldCompanyName: self.state.oldCompanyName,
                oldAddress: self.state.oldAddress,
                oldContactNo: self.state.oldContactNo,
                oldCity: self.state.oldCity,
                oldAlternateContactNo: self.state.oldAlternateContactNo,
                oldGstNo: self.state.oldGstNo,
                oldEmail: self.state.oldEmail,

                companyId: this.state.companyId,

            }),
            url: " http://15.206.129.105:8080/MerchandiseAPI/master/CustomerDetailsUpdate",
            contentType: "application/json",
            dataType: 'json',
            async: false,

            success: function (data, textStatus, jqXHR) {

                var tab;

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Customer Details Updated Successfully',
                    showConfirmButton: false,
                    timer: 2000
                })

                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={CustomerList} />


                        </div>
                    </Router>,
                    document.getElementById('contentRender'));
                registerServiceWorker();


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



    BackbtnFunc() {
        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={CustomerList} />


                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }




    render() {
        return (


            <div class="container" style={{ height: "20px" }}>
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
                                    marginTop: "13px",
                                    display: "inline-block"
                                }}>
                                <a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i>Back</a></ul>

                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-xs-8">
                            <div class="card-header">
                                <h3 >Customer Profile Edit</h3>   </div>

                        </div>
                    </div><div>
                        <div class="card-body">
                            <div style={{ color: "red", borderColor: "white", marginBottom: "0px" }} className="panel panel-default">
                                <FormErrors style={{ color: "red" }} formErrors={this.state.formErrors} />
                            </div>

                            <form class="form-horizontal form-bordered" >
                                <div className={`form-group ${this.errorClass(this.state.formErrors.customerName)}`}>
                                    <label class="control-label col-sm-2" for="customerName">Customer Name</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control"
                                            onChange={this.handleUserInput}
                                            value={this.state.customerName}
                                            id="customerName"
                                            name="customerName" />


                                    </div></div>
                                <div className={`form-group ${this.errorClass(this.state.formErrors.companyName)}`}>
                                    <label class="control-label col-sm-2" for="companyName">Company Name</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control"
                                            onChange={this.handleUserInput}
                                            value={this.state.companyName}
                                            id="companyName"
                                            name="companyName" />
                                    </div>
                                </div>
                                <div className={`form-group ${this.errorClass(this.state.formErrors.contactNo)}`}>
                                    <label class="control-label col-sm-2" for="contactNo">Contact No</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.contactNo}
                                            id="contactNo"
                                            name="contactNo" /></div>
                                </div>
                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="alternateContactNo">Alternate Contact No</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.alternateContactNo}
                                            id="alternateContactNo"
                                            name="alternateContactNo" />
                                    </div></div>

                                <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>

                                    <label class="control-label col-sm-2" for="email">Email</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.email}
                                            id="email"
                                            name="email" />
                                    </div></div>


                                <div className={`form-group ${this.errorClass(this.state.formErrors.address)}`}>
                                    <label class="control-label col-sm-2" for="address">Address</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.address}
                                            id="address"
                                            name="address" />
                                    </div></div>

                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="city">State</label>
                                    <div class="col-sm-10">

                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.city}
                                            id="city"
                                            name="city" />
                                    </div></div>

                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="gstNo">GST No</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.gstNo}
                                            id="gstNo"
                                            name="gstNo" />
                                    </div></div>


                            </form>
                        </div>

                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-offset-2 col-sm-10">
                                <button type="button" style={{ fontWeight: "bold" }} class="btn btn-primary" onClick={() => this.UpdateSubmit()}>Update</button>

                            </div></div></div>


                </div></div>
        );
    }
}

export default CustomerListEdit;