import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import GenericDashboard from './Topnavbar/GenericDashboard';

import ForgotPassword from './ForgotPassword';
import CryptoJS from 'crypto-js';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';

import SiteRegister from './SiteRegister';
import LicenseEntryForm from './LicenseEntryForm';

import dpalogo1 from './image/dpalogo1.png';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import GenericDashboardBasic from './Topnavbar/GenericDashboardBasic';
import GenericDashboardPremium from './Topnavbar/GenericDashboardPremium';
import GenericDashboardElite from './Topnavbar/GenericDashboardElite';
import './LoginPage.css';
import LandingPage_tasaloon from './LandingPage_tasaloon/LandingPage_tasaloon';

class LoginPage extends Component {


    constructor() {

        super()
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


        this.state = {
            emailId: '',
            password: '',
            date: date,
            formErrors: { emailId: '', password: '' },
            emailIdValid: false,
            passwordValid: false
        };
        this.setState({
            date: date,
        });
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        var uri = window.location.toString();
        if (uri.indexOf("?") > 0) {
            var clean_uri = uri.substring(0, uri.indexOf("?"));
            window.history.replaceState({}, document.title, clean_uri);
        }

    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailIdValid = this.state.emailIdValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {

            case 'emailId':
                emailIdValid = value.length >= 10;
                { /*  emailIdValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);*/ }
                fieldValidationErrors.EmailId = emailIdValid ? '' : ' is invalid';
                break;
            case 'password':

                passwordValid = value.length >= 5 && value.match(/^((?=.*[0-9])(?=.*[A-Z])(?=.{8,}))/);
                fieldValidationErrors.Password = passwordValid ? '' : 'should be at least 8 character long/include at least one capital letter and number';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailIdValid: emailIdValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.emailIdValid && this.state.passwordValid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }
    Fpassword() {
        ReactDOM.render(< ForgotPassword />, document.getElementById('root'));

    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) }
        );
    }

    Login() {
        var key = "shinchanbaby";

        localStorage.setItem('EmailId', CryptoJS.AES.encrypt(this.state.emailId, key));
        localStorage.setItem('Password', CryptoJS.AES.encrypt(this.state.password, key));


        $.ajax({
            type: 'POST',
            data: JSON.stringify({

                emailId: this.state.emailId,
                password: this.state.password,
                date: this.state.date,

            }),

            url: " http://15.206.129.105:8080/MerchandiseAPI/Login/LoginCheck1",

            contentType: "application/json",
            dataType: 'json',
            async: false,

            success: function (data, textStatus, jqXHR) {




                if (data.staffId == "NOT_REGISTERED") {

                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Please Register to Login',
                        showConfirmButton: false,
                        timer: 2000
                    })



                    ReactDOM.render(
                        <Router>
                            <div>

                                <Route path="/" component={LoginPage} />


                            </div>
                        </Router>, document.getElementById('root'));
                    registerServiceWorker();



                }
                else if (data.staffId == "PASSWORD_INCORRECT") {

                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Incorrect Password.Enter Correct Password or Click on Forgot Password to reset',
                        showConfirmButton: false,
                        timer: 2000
                    })


                    ReactDOM.render(
                        <Router>
                            <div>

                                <Route path="/" component={LoginPage} />


                            </div>
                        </Router>, document.getElementById('root'));
                    registerServiceWorker();


                }

                else if (data.status == "active") {
                    if (data.emailId == "Success") {

                        localStorage.setItem('isLoggedIn', CryptoJS.AES.encrypt("true".toString(), key));


                        localStorage.setItem('CompanyId', CryptoJS.AES.encrypt(data.companyId, key));
                        localStorage.setItem('CompanyEmailId', CryptoJS.AES.encrypt(data.companyEmailId, key));
                        localStorage.setItem('ContactNo', CryptoJS.AES.encrypt(data.contactNo, key));

                        localStorage.setItem('CompanyAddress', CryptoJS.AES.encrypt(JSON.stringify(data.companyAddress), key));
                        localStorage.setItem('DoorNo', CryptoJS.AES.encrypt(data.doorNo, key));
                        localStorage.setItem('Floor', CryptoJS.AES.encrypt(data.floor, key));
                        localStorage.setItem('Street', CryptoJS.AES.encrypt(data.street, key));
                        localStorage.setItem('Place', CryptoJS.AES.encrypt(data.place, key));
                        localStorage.setItem('State', CryptoJS.AES.encrypt(data.state, key));
                        localStorage.setItem('Area', CryptoJS.AES.encrypt(data.area, key));
                        localStorage.setItem('Zipcode', CryptoJS.AES.encrypt(data.zipCode, key));



                        localStorage.setItem('LandlineNo', CryptoJS.AES.encrypt(data.landlineNo, key));
                        localStorage.setItem('FeedbackNo', CryptoJS.AES.encrypt(data.feedbackNo, key));
                        localStorage.setItem('CompanyName', CryptoJS.AES.encrypt(data.companyName, key));
                        localStorage.setItem('LicenseKey', CryptoJS.AES.encrypt(data.licenseKey, key));
                        localStorage.setItem('Status', CryptoJS.AES.encrypt(data.status, key));

                        localStorage.setItem('Roles', CryptoJS.AES.encrypt(JSON.stringify(data.employeeRolelist), key));
                        localStorage.setItem('Permissions', CryptoJS.AES.encrypt(JSON.stringify(data.employeePermisionlist), key));
                        localStorage.setItem('PermissionHeader', CryptoJS.AES.encrypt(JSON.stringify(data.headerPermissionList), key));

                        localStorage.setItem('Role', CryptoJS.AES.encrypt(data.roleName, key));
                        localStorage.setItem('staffId', CryptoJS.AES.encrypt(data.staffId, key));
                        localStorage.setItem('EmployeeName', CryptoJS.AES.encrypt(data.employeeName, key));
                        localStorage.setItem('EmpList', CryptoJS.AES.encrypt(JSON.stringify(data.employeeList), key));
                        localStorage.setItem('VendorList', CryptoJS.AES.encrypt(JSON.stringify(data.vendorList), key));
                        localStorage.setItem('CustomerList', CryptoJS.AES.encrypt(JSON.stringify(data.customerList), key));
                        localStorage.setItem('CategoryList', CryptoJS.AES.encrypt(JSON.stringify(data.categoryList), key));
                        localStorage.setItem('UserList', CryptoJS.AES.encrypt(JSON.stringify(data.userList), key));
                        localStorage.setItem('PlanName', CryptoJS.AES.encrypt(data.planName, key));


                        localStorage.setItem('LandlineNo', CryptoJS.AES.encrypt(data.landlineNo, key));
                        localStorage.setItem('FeedbackNo', CryptoJS.AES.encrypt(data.feedbackNo, key));
                        localStorage.setItem('ConfigValue', CryptoJS.AES.encrypt(data.configValue, key));
                        localStorage.setItem('ToggleValue', CryptoJS.AES.encrypt(data.toggleValue, key));


                        localStorage.setItem('GSTNo', CryptoJS.AES.encrypt(data.gstNo, key));
                        localStorage.setItem('BankName', CryptoJS.AES.encrypt(data.bankName, key));
                        localStorage.setItem('BranchName', CryptoJS.AES.encrypt(data.branchName, key));
                        localStorage.setItem('AccountNo', CryptoJS.AES.encrypt(data.accountNo, key));
                        localStorage.setItem('IfscCode', CryptoJS.AES.encrypt(data.ifscCode, key));
                        localStorage.setItem('AccountName', CryptoJS.AES.encrypt(data.accountName, key));
                        localStorage.setItem('CompanyLogo', CryptoJS.AES.encrypt(data.companyLogo, key));

                        localStorage.setItem('RewardAmount', CryptoJS.AES.encrypt(data.rewardAmount, key));
                        localStorage.setItem('RewardPoint', CryptoJS.AES.encrypt(data.rewardPoint, key));
                        localStorage.setItem('MaxRewardLimit', CryptoJS.AES.encrypt(data.maxRewardLimit, key));
                        localStorage.setItem('ExpiryDuration', CryptoJS.AES.encrypt(data.expiryDuration, key));
                        localStorage.setItem('RedeemPoint', CryptoJS.AES.encrypt(data.redeemPoint, key));
                        localStorage.setItem('RedeemAmount', CryptoJS.AES.encrypt(data.redeemAmount, key));
                        localStorage.setItem('MinRedeemRewardPoint', CryptoJS.AES.encrypt(data.minRedeemRewardPoint, key));

                        var planName = CryptoJS.AES.decrypt(localStorage.getItem("PlanName"), "shinchanbaby").toString(CryptoJS.enc.Utf8);

                        //	 alert("plantype"+planName);
                        if (planName.toLowerCase() == "basic") {
                    
                            ReactDOM.render(
                                <Router>
                                    <div >
                                        <Route exact path="/" component={GenericDashboardBasic} />

                                    </div>
                                </Router>, document.getElementById('root'));
                            registerServiceWorker();
                        }
                        else if (planName.toLowerCase() == "premium") {
                       
                            ReactDOM.render(
                                <Router>
                                    <div >
                                        <Route exact path="/" component={GenericDashboardPremium} />

                                    </div>
                                </Router>, document.getElementById('root'));
                            registerServiceWorker();
                        }
                        else if (planName.toLowerCase() == "elite") {
                         

                            ReactDOM.render(
                                <Router>
                                    <div >
                                        <Route exact path="/" component={GenericDashboardElite} />

                                    </div>
                                </Router>, document.getElementById('root'));
                            registerServiceWorker();
                        }




                        // ReactDOM.render(
                        //     <Router>
                        //         <div>

                        //             <Route path="/" component={() => <GenericDashboard />} />



                        //         </div>
                        //     </Router>,
                        //     document.getElementById('root'));
                        // registerServiceWorker();
                    }
                    else {

                        Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            title: 'Login Id or Password Incorrect',
                            showConfirmButton: false,
                            timer: 2000
                        })

                    }
                }
                else if (data.status == "inactive") {

                    localStorage.setItem('ConfigValue', CryptoJS.AES.encrypt(data.configValue, key));
                    localStorage.setItem('ToggleValue', CryptoJS.AES.encrypt(data.toggleValue, key));
                    localStorage.setItem('isLoggedIn', CryptoJS.AES.encrypt("false".toString(), key));

                    localStorage.setItem('CompanyId', CryptoJS.AES.encrypt(data.companyId, key));
                    localStorage.setItem('CompanyEmailId', CryptoJS.AES.encrypt(data.companyEmailId, key));
                    localStorage.setItem('ContactNo', CryptoJS.AES.encrypt(data.contactNo, key));
                    localStorage.setItem('CompanyAddress', CryptoJS.AES.encrypt(JSON.stringify(data.companyAddress), key));
                    localStorage.setItem('CompanyName', CryptoJS.AES.encrypt(data.companyName, key));
                    localStorage.setItem('LicenseKey', CryptoJS.AES.encrypt(data.licenseKey, key));
                    localStorage.setItem('Status', CryptoJS.AES.encrypt(data.status, key));

                    localStorage.setItem('GSTNo', CryptoJS.AES.encrypt(data.gstNo, key));
                    localStorage.setItem('Roles', CryptoJS.AES.encrypt(JSON.stringify(data.employeeRolelist), key));
                    localStorage.setItem('Permissions', CryptoJS.AES.encrypt(JSON.stringify(data.employeePermisionlist), key));
                    localStorage.setItem('PermissionHeader', CryptoJS.AES.encrypt(JSON.stringify(data.headerPermissionList), key));

                    localStorage.setItem('Role', CryptoJS.AES.encrypt(data.roleName, key));
                    localStorage.setItem('staffId', CryptoJS.AES.encrypt(data.staffId, key));
                    localStorage.setItem('EmployeeName', CryptoJS.AES.encrypt(data.employeeName, key));
                    localStorage.setItem('EmpList', CryptoJS.AES.encrypt(JSON.stringify(data.employeeList), key));
                    localStorage.setItem('VendorList', CryptoJS.AES.encrypt(JSON.stringify(data.vendorList), key));
                    localStorage.setItem('CustomerList', CryptoJS.AES.encrypt(JSON.stringify(data.customerList), key));
                    localStorage.setItem('CategoryList', CryptoJS.AES.encrypt(JSON.stringify(data.categoryList), key));
                    localStorage.setItem('UserList', CryptoJS.AES.encrypt(JSON.stringify(data.userList), key));

                    localStorage.setItem('PlanName', CryptoJS.AES.encrypt(data.planName, key));


                    localStorage.setItem('DoorNo', CryptoJS.AES.encrypt(data.doorNo, key));
                    localStorage.setItem('Floor', CryptoJS.AES.encrypt(data.floor, key));
                    localStorage.setItem('Street', CryptoJS.AES.encrypt(data.street, key));
                    localStorage.setItem('Place', CryptoJS.AES.encrypt(data.place, key));
                    localStorage.setItem('State', CryptoJS.AES.encrypt(data.state, key));
                    localStorage.setItem('BankName', CryptoJS.AES.encrypt(data.bankName, key));
                    localStorage.setItem('BranchName', CryptoJS.AES.encrypt(data.branchName, key));
                    localStorage.setItem('AccountNo', CryptoJS.AES.encrypt(data.accountNo, key));
                    localStorage.setItem('IfscCode', CryptoJS.AES.encrypt(data.ifscCode, key));
                    localStorage.setItem('AccountName', CryptoJS.AES.encrypt(data.accountName, key));
                    localStorage.setItem('CompanyLogo', CryptoJS.AES.encrypt(data.companyLogo, key));
                    localStorage.setItem('RewardAmount', CryptoJS.AES.encrypt(data.rewardAmount, key));
                    localStorage.setItem('RewardPoint', CryptoJS.AES.encrypt(data.rewardPoint, key));
                    localStorage.setItem('MaxRewardLimit', CryptoJS.AES.encrypt(data.maxRewardLimit, key));
                    localStorage.setItem('ExpiryDuration', CryptoJS.AES.encrypt(data.expiryDuration, key));
                    localStorage.setItem('RedeemPoint', CryptoJS.AES.encrypt(data.redeemPoint, key));
                    localStorage.setItem('RedeemAmount', CryptoJS.AES.encrypt(data.redeemAmount, key));
                    localStorage.setItem('MinRedeemRewardPoint', CryptoJS.AES.encrypt(data.minRedeemRewardPoint, key));
                    localStorage.setItem('Area', CryptoJS.AES.encrypt(data.area, key));
                    localStorage.setItem('Zipcode', CryptoJS.AES.encrypt(data.zipCode, key));


                    ReactDOM.render(<LicenseEntryForm />, document.getElementById("root"));
                    registerServiceWorker();
                }
                else {

                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'License Renewal is Required',
                        showConfirmButton: false,
                        timer: 2000
                    })

                    ReactDOM.render(<LoginPage />, document.getElementById("root"));
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
    SignUpFunc() {


        ReactDOM.render(< SiteRegister />, document.getElementById('root'));

    }
    HomeFunc() {

        
                ReactDOM.render(< LandingPage_tasaloon />, document.getElementById('root'));
         
    }
    render() {


        return (

            <div class="container">


                <div className="loginpage_1 responsive " id="loginpagebg">

                    <svg id="log_bg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 445.88 401.56">
                        <defs>
                            <linearGradient id="gradient-horizontal">
                                <stop offset="0%" stop-color="var(--color-stop-1)" />
                                <stop offset="50%" stop-color="var(--color-stop-2)" />
                                <stop offset="100%" stop-color="var(--color-stop-3)" />
                            </linearGradient>   </defs>
                        <title>rocketbgtbAsset 1</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1">
                            <path class="cls-1" d="M93,90.31c13.14-11.92,25.92-24.31,36.81-39C155,17.22,185.61-4.81,229.93,1.61c78.36,11.36,137.42,142,201,202.15,36.73,34.76-5.32,91.3-30.29,119-40.18,44.56-92.78,86.83-155.87,76.82C167,387.23-1.57,366.95.52,257.14c.81-42.32,14.3-83.65,41.08-116.66C56.93,121.58,75.31,106.37,93,90.31Z" /></g></g></svg>

                    <svg id="log_bg1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 331.39">
                        <defs></defs>
                        <title>rocketbgtbAsset 3</title><g id="Layer_2" data-name="Layer 2">
                            <g id="Layer_1-2" data-name="Layer 1">
                                <path class="cls-1" d="M.5,44.55v286s119-65,119-165S66.5,6.55.5.55Z" />
                            </g></g></svg>

                    <svg id="log_bg2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 385.06 242.3">
                        <defs></defs>
                        <title>rocketbgtbAsset 2</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1">
                            <path class="cls-1" d="M5.67,17.5s57,104,98,116,107-30,145,23,119.78,89,135.89,85V.5H.67Z" /></g></g></svg>

                    <div className="login-container"
                /* style={{boxShadow: "10px 10px 5px grey"}} */>
                        <div className="container" id="logbg" >
                            <div className="row">
              
                                <div className="col-sm-hide col-xs-hide col-md-5 col-lg-5 ">
                                <div className="welcome_cont">
                                            <h2 className="wel_text"> Welcome </h2>
                                        </div>

                                    <div class="imgcontainer" id="imgtic">
                                        <img src={dpalogo1} alt="Avatar"  class="avatar" id="imgcont" />
                                    </div>
                                </div>

                                <div className="col-sm-hide col-xs-hide col-md-7 col-lg-7 " style={{backgroundColor: "#efe7e2"}}>
                                   {/*  <div class="imgcontainer" id="imgtic" >
                                        <img src={dpalogo1} alt="Avatar" style={{ borderRadius: "0px", marginTop: "10%" }} class="avatar" id="imgcont" />
                                    </div> */}
                                    <div className="containerlogin" id="loginpage">

                                        <div className="form-signin-heading text-muted" id="loginname">
                                            <h2 className="lod_Id"> LogIn </h2>
                                        </div>
                                        <div className="form-signin" id="login_details" style={{ paddingtop: "33px!important" }}>


                                            <input type="text" value={this.state.emailId} onChange={this.handleUserInput}
                                                name="emailId" id="emailId" className="form-control text_feild" required="" autoFocus="" placeholder="email-ID / Mobile No" />

                                            <input type="password" value={this.state.password} onChange={this.handleUserInput}
                                                name="password" id="password" className="form-control text_feild" required="" placeholder="Password" />

                                            <div className="checkbox check_1">
                                                <button type="button" id="forgetpwdID" onClick={() => this.Fpassword()} className="btn btn-link">Forgot Password ?</button>
                                                <button type="button" id="forgetpwdID" onClick={() => this.SignUpFunc()} className="btn btn-link" >Sign Up</button>
                                                <button style={{ float: "right" }} type="button" id="forgetpwdID" onClick={() => this.HomeFunc()} className="btn btn-link" ><span class="fa fa-home"></span></button>
                                            </div>
                                            <div id="loginSubmitButton1">
                                                <button type="submit" id="loginSubmitButton" disabled={!this.state.formValid}
                                                    style={{ backgroundColor: "rgb(226, 39, 45)", marginTop: "0%" }}
                                                    onClick={() => this.Login()} className="btn btn-md" ><span class="fa fa-angle-double-right" style={{ paddingRight: "10px" }}></span>CONTINUE </button>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>{/* row ends */}
                        </div>

                    </div>

                </div>
            </div>





        );
    }

}
export default LoginPage;