import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import VendorEntryForm from './VendorEntryForm';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { FormErrors } from './FormErrors';
import { confirmAlert } from 'react-confirm-alert'; // Import
import registerServiceWorker from './registerServiceWorker';
import $ from 'jquery';

import Case from 'case';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import CryptoJS from 'crypto-js';
import CustomerExcelImport from './CustomerExcelImport';
import CustomerEntryForm from './CustomerEntryForm';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';

var _isDirty = false;
class RewardRedeemPage extends Component {
    constructor() {
        super()
        var rewardAmount = CryptoJS.AES.decrypt(localStorage.getItem('RewardAmount'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var rewardPoint = CryptoJS.AES.decrypt(localStorage.getItem('RewardPoint'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var expiryDuration = CryptoJS.AES.decrypt(localStorage.getItem('ExpiryDuration'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var maxRewardLimit = CryptoJS.AES.decrypt(localStorage.getItem('MaxRewardLimit'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var redeemAmount = CryptoJS.AES.decrypt(localStorage.getItem('RedeemAmount'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var redeemPoint = CryptoJS.AES.decrypt(localStorage.getItem('RedeemPoint'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var minRedeemRewardPoint = CryptoJS.AES.decrypt(localStorage.getItem('MinRedeemRewardPoint'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
   
   
        this.state = {
            rewardAmount: rewardAmount,
            rewardPoint: rewardPoint,
            maxRewardLimit: maxRewardLimit,
            expiryDuration: expiryDuration,
            redeemPoint: redeemPoint,
            redeemAmount: redeemAmount,
            minRedeemRewardPoint: minRedeemRewardPoint,
            staffId:staffId,
            employeeName:employeeName,
           role:role, 
            formErrors: {
                rewardAmount: '',
                rewardPoint: '',
                maxRewardLimit: '',
                expiryDuration: '',
                redeemPoint: '',
                redeemAmount: '',
                minRedeemRewardPoint: '',
            },

            rewardAmountValid: false,
            rewardPointValid: false,
            maxRewardLimitValid: false,
            expiryDurationValid: false,
            redeemPointValid: false,
            redeemAmountValid: false,
            minRedeemRewardPointValid: false,
        }
   
    }

    componentDidMount() {
        window.scrollTo(0, 0);
     
    }


    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let rewardAmountValid = this.state.rewardAmountValid;
        let rewardPointValid = this.state.rewardPointValid;
        let maxRewardLimitValid = this.state.maxRewardLimitValid;
        let expiryDurationValid = this.state.expiryDurationValid;
        let redeemPointValid = this.state.redeemPointValid;
        let redeemAmountValid = this.state.redeemAmountValid;
        let minRedeemRewardPointValid = this.state.minRedeemRewardPointValid;

        switch (fieldName) {
            case 'rewardAmount':
                rewardAmountValid = value.length >= 1;
                fieldValidationErrors.RewardAmount = rewardAmountValid ? '' : ' is InCorrect';
                break;
            case 'rewardPoint':
                rewardPointValid = value.length >= 1;
                fieldValidationErrors.RewardPoint = rewardPointValid ? '' : ' is InCorrect';
                break;
            case 'maxRewardLimit':
                maxRewardLimitValid = value.length >= 1;
                fieldValidationErrors.MaxRewardLimit = maxRewardLimitValid ? '' : ' is too short';
                break;

            case 'expiryDuration':
                expiryDurationValid = value.length >= 1;
                fieldValidationErrors.ExpiryDuration = expiryDurationValid ? '' : ' is InCorrect';
                break;

            case 'redeemPoint':
                redeemPointValid = value.length >= 1;
                fieldValidationErrors.RedeemPoint = redeemPointValid ? '' : ' is InCorrect';
                break;

            case 'redeemAmount':
                redeemAmountValid = value.length >= 1;
                fieldValidationErrors.RedeemAmount = redeemAmountValid ? '' : ' is InCorrect';
                break;


            case 'minRedeemRewardPoint':
                minRedeemRewardPointValid = value.length >= 1;
                fieldValidationErrors.MinRedeemRewardPoint = minRedeemRewardPointValid ? '' : ' is InCorrect';
                break;
            default:
                break;
        }



        this.setState({
            formErrors: fieldValidationErrors,
            rewardAmountValid: rewardAmountValid,
            rewardPointValid: rewardPointValid,
            maxRewardLimitValid: maxRewardLimitValid,
            expiryDurationValid: expiryDurationValid,
            redeemPointValid: redeemPointValid,
            redeemAmountValid: redeemAmountValid,
            minRedeemRewardPointValid: minRedeemRewardPointValid,
        }, this.validateForm);
    }
    validateForm() {

        this.setState({
            formValid:
                this.state.rewardAmountValid
                && this.state.rewardPointValid
                && this.state.maxRewardLimitValid
                && this.state.expiryDurationValid
                && this.state.redeemPointValid
                && this.state.redeemAmountValid
                && this.state.minRedeemRewardPointValid
        });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }
    AddRewardRedeemFunc() {
        var self = this;
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state.companyId = companyId;
        this.setState({
            companyId: companyId,
        });
    
 
            $.ajax({
                type: 'POST',
                data: JSON.stringify({
                    rewardAmount:this.state.rewardAmount,
                    rewardPoint:this.state.rewardPoint,
                    maxRewardLimit:this.state.maxRewardLimit,
                    expiryDuration:this.state.expiryDuration,
                    redeemPoint:this.state.redeemPoint,
                    redeemAmount:this.state.redeemAmount,
                    minRedeemRewardPoint:this.state.minRedeemRewardPoint,
                    companyId: this.state.companyId,
                    staffId: self.state.staffId,
                   employeeName: self.state.employeeName,
                   role: self.state.role,
                }),
                url: "http://15.206.129.105:8080/MerchandiseAPI/MessageCenter/RewardRedeemPoints",
                contentType: "application/json",
                dataType: 'json',
                async: false,
                success: function (data, textStatus, jqXHR) {
               

                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Successfully Updated Reward Redeem Details',               // Message dialog 
                            showConfirmButton: false,
                            timer: 2000
                        })


   localStorage.setItem('RewardAmount', CryptoJS.AES.encrypt(JSON.stringify(Number(self.state.rewardAmount)), "shinchanbaby"));

localStorage.setItem('RewardPoint', CryptoJS.AES.encrypt(JSON.stringify(Number(self.state.rewardPoint)), "shinchanbaby"));

localStorage.setItem('MaxRewardLimit', CryptoJS.AES.encrypt(JSON.stringify(Number(self.state.maxRewardLimit)), "shinchanbaby"));

localStorage.setItem('ExpiryDuration', CryptoJS.AES.encrypt(JSON.stringify(Number(self.state.expiryDuration)), "shinchanbaby"));


localStorage.setItem('RedeemPoint', CryptoJS.AES.encrypt(JSON.stringify(Number(self.state.redeemPoint)), "shinchanbaby"));


localStorage.setItem('RedeemAmount', CryptoJS.AES.encrypt(JSON.stringify(Number(self.state.redeemAmount)), "shinchanbaby"));

localStorage.setItem('MinRedeemRewardPoint', CryptoJS.AES.encrypt(JSON.stringify(Number(self.state.minRedeemRewardPoint)), "shinchanbaby"));


                     self.state.rewardAmount = self.state.rewardAmount;
                        self.state.rewardPoint = self.state.rewardPoint;
                        self.state.maxRewardLimit =self.state.maxRewardLimit;
                        self.state.expiryDuration = self.state.expiryDuration;
                        self.state.redeemPoint =self.state.redeemPoint;
                        self.state.redeemAmount =self.state.redeemAmount;
                        self.state.minRedeemRewardPoint = self.state.minRedeemRewardPoint;                        
                        self.state.formValid = false;
                        self.state.rewardAmountValid = false;
                        self.state.rewardPointValid = false;
                        self.state.maxRewardLimitValid = false;
                        self.state.expiryDurationValid = false;
                        self.state.redeemPointValid = false;
                        self.state.redeemAmountValid = false;
                        self.state.minRedeemRewardPointValid = false;


                 


                        self.setState({
                            rewardAmount: self.state.rewardAmount,
                            rewardPoint: self.state.rewardPoint,
                            maxRewardLimit: self.state.maxRewardLimit,
                            expiryDuration: self.state.expiryDuration,
                            redeemPoint: self.state.redeemPoint,
                            redeemAmount: self.state.redeemAmount,
                            minRedeemRewardPoint: self.state.minRedeemRewardPoint,                         
                            formValid: false,
                            rewardAmountValid: false,
                            rewardPointValid: false,
                            maxRewardLimitValid: false,
                            expiryDurationValid: false,
                            redeemPointValid: false,
                            redeemAmountValid: false,
                            minRedeemRewardPointValid: false,
                        });
                        ReactDOM.render(
                            <Router >
                                <div>
                                    <Route path="/" component={RewardRedeemPage} />
                                </div>
                            </Router>, document.getElementById('contentRender'));
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
        const value = e.target.value;
      
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    handleMinRedeemRewardPoint = (e) => {
        const name = e.target.name;
        const value = e.target.value;
 
    this.setState({
        value:value,
    })

     if (Number(value) > Number(this.state.maxRewardLimit)) {
    
    
            alert("Min Redeem Point Exceeds Total" + value);
    
            this.state.minRedeemRewardPoint = 0;
            this.setState({ [name]: this.state.minRedeemRewardPoint  },
                () => { this.validateField(name, this.state.minRedeemRewardPoint ) });
    
          } else {
    
            this.state.minRedeemRewardPoint = value;
            this.setState({ [name]: this.state.minRedeemRewardPoint  },
                () => { this.validateField(name, this.state.minRedeemRewardPoint ) });
    
          }
     

    }


    handleMaxRewardLimit = (e) => {
        const name = e.target.name;
        const value = e.target.value;
 
    this.setState({
        value:value,
    })
        
    
     if (Number(value) < Number(this.state.maxRewardLimit)) {
    
    
            alert("Min Redeem Point Exceeds Total" + value);
      
            this.state.minRedeemRewardPoint = 0;
            this.setState({ [name]: this.state.minRedeemRewardPoint  },
                () => { this.validateField(name, this.state.minRedeemRewardPoint ) });
    
          } 
     
          this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

   
   

    cancelFunc() {

 var self=this;
        self.state.rewardAmount = 0;
        self.state.rewardPoint = 0;
        self.state.maxRewardLimit = 0;
        self.state.expiryDuration = 0;
        self.state.redeemPoint = 0;
        self.state.redeemAmount = 0;
        self.state.minRedeemRewardPoint = 0;                        
        self.state.formValid = false;
        self.state.rewardAmountValid = false;
        self.state.rewardPointValid = false;
        self.state.maxRewardLimitValid = false;
        self.state.expiryDurationValid = false;
        self.state.redeemPointValid = false;
        self.state.redeemAmountValid = false;
        self.state.minRedeemRewardPointValid = false;

       


        this.setState({
            rewardAmount:this.state.rewardAmount,
            rewardPoint:this.state.rewardPoint,
            maxRewardLimit:this.state.maxRewardLimit,
            expiryDuration:this.state.expiryDuration,
            redeemPoint:this.state.redeemPoint,
            redeemAmount:this.state.redeemAmount,
            minRedeemRewardPoint:this.state.minRedeemRewardPoint,
            formValid:false,

            rewardAmountValid: false,
            rewardPointValid: false,
            maxRewardLimitValid: false,
            expiryDurationValid: false,
            redeemPointValid: false,
            redeemAmountValid: false,
            minRedeemRewardPointValid:false,

        })
        ReactDOM.render(<RewardRedeemPage />, document.getElementById("contentRender"));
    }



    BackbtnFunc() {
        

        if ((this.state.rewardAmount.length == 0)) {
            this.setState({
                rewardAmountValid: false,

            })

        }
        if ((this.state.rewardPoint.length == 0)) {
            this.setState({
                rewardPointValid: false,
            })

        }
        if ((this.state.maxRewardLimit.length == 0)) {
            this.setState({
                maxRewardLimitValid: false,
            })

        }
        if ((this.state.expiryDuration.length == 0)) {
            this.setState({
                expiryDurationValid: false,
            })

        }
        if ((this.state.redeemPoint.length == 0)) {
            this.setState({
                redeemPointValid: false,
            })

        }
        if ((this.state.redeemAmount.length == 0)) {
            this.setState({
                redeemAmountValid: false,
            })

        }
        if ((this.state.minRedeemRewardPoint.length == 0)) {
            this.setState({
                minRedeemRewardPointValid: false,
            })

        }



        if (this.state.rewardAmount.length == 0 && this.state.rewardPoint.length == 0 &&
            this.state.maxRewardLimit.length == 0 && this.state.expiryDuration.length == 0 &&
            this.state.redeemPoint.length == 0 && this.state.redeemAmount.length == 0 &&
            this.state.minRedeemRewardPoint.length == 0 ) {
            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={DashboardOverall} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));
            registerServiceWorker();
        }
        else {
            confirmAlert({
                title: "Confirmation", // Title dialog
                message: "Unsaved changes are there. Do you really want to go back?", // Message dialog
                buttons: [
                    {
                        label: 'Confirm',
                        onClick: () => this.ConfirmBack()
                    },
                    {
                        label: 'Cancel',
                        onClick: () => this.CancelBack()
                    }
                ]
            });
        }

    }
    ConfirmBack() {
        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={DashboardOverall} />


                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }
    CancelBack() {


    }
    render() {
        return (

            <div class="container">
           
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
                                <h3 >Rewards Program</h3>   </div>

                        </div>



                        <div className="panel panel-default" style={{ borderColor: "white", marginBottom: "1px" }}>
                            <FormErrors formErrors={this.state.formErrors} />
                        </div>
<div class="row">
    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
    <form class="form-horizontal form-bordered" name="submissions">
                            <div className={`form-group ${this.errorClass(this.state.formErrors.rewardAmount)}`}>
                                <label class="control-label col-lg-4 col-md-4  col-xs-2  col-sm-2" style={{ fontWeight: "bold" }} for="rewardAmount">Amount<span style={{ color: "red" }}>*</span></label>
                                <div class="col-lg-6 col-md-6 col-xs-4 col-sm-4">
                                    <input type="number" class="form-control" id="rewardAmount" name="rewardAmount" value={this.state.rewardAmount} onChange={this.handleUserInput} placeholder="Amount" />
                                </div>
                            </div>
                            <div className={`form-group ${this.errorClass(this.state.formErrors.rewardPoint)}`}>
                                <label style={{ fontWeight: "bold" }} class="control-label col-lg-4 col-md-4  col-xs-2 col-sm-2" for="rewardPoint"> RewardPoint<span style={{ color: "red" }}>*</span></label>
                                <div class="col-lg-6 col-md-6 col-xs-4 col-sm-4">
                                    <input type="number" class="form-control" /*min="1" */ max="10" name="rewardPoint" value={this.state.rewardPoint} onChange={this.handleUserInput} id="rewardPoint" placeholder="Point" />
                                </div>
                            </div>
                            <div className={`form-group ${this.errorClass(this.state.formErrors.maxRewardLimit)}`}>
                                <label style={{ fontWeight: "bold" }} class="control-label col-lg-4 col-md-4  col-xs-2 col-sm-2" for="maxRewardLimit">MaxRewardLimit<span style={{ color: "red" }}>*</span></label>
                                <div class="col-lg-6 col-md-6 col-xs-4 col-sm-4">
                                    <input type="number" class="form-control" name="maxRewardLimit" value={this.state.maxRewardLimit} onChange={this.handleMaxRewardLimit} id="maxRewardLimit" placeholder="Limit" />
                                </div>
                            </div>

                            <div className={`form-group ${this.errorClass(this.state.formErrors.expiryDuration)}`}>
                                <label style={{ fontWeight: "bold" }} class="control-label col-lg-4 col-md-4  col-xs-2 col-sm-2" for="expiryDuration">ExpiryDuration[in Days]<span style={{ color: "red" }}>*</span></label>
                                <div class="col-lg-6 col-md-6 col-xs-4 col-sm-4">
                                <input type="number" class="form-control" name="expiryDuration" value={this.state.expiryDuration} onChange={this.handleUserInput} id="expiryDuration" placeholder="In Days" />
                               </div>
                            </div>
                            </form>
    </div>
    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
    <form class="form-horizontal form-bordered" name="submissions">
            
            <div className={`form-group ${this.errorClass(this.state.formErrors.redeemPoint)}`}>
                                <label class="control-label col-lg-4 col-md-4  col-xs-2  col-sm-2" style={{ fontWeight: "bold" }} for="redeemPoint">RedeemPoint <span style={{ color: "red" }}>*</span></label>
                                <div class="col-lg-6 col-md-6 col-xs-4 col-sm-4">
                                    <input type="number" class="form-control" id="redeemPoint" name="redeemPoint" value={this.state.redeemPoint} onChange={this.handleUserInput} placeholder="Point" />
                                </div>
                            </div>
                            <div className={`form-group ${this.errorClass(this.state.formErrors.redeemAmount)}`}>
                                <label style={{ fontWeight: "bold" }} class="control-label col-lg-4 col-md-4  col-xs-2  col-sm-2" for="redeemAmount"> RedeemAmount<span style={{ color: "red" }}>*</span></label>
                                <div class="col-lg-6 col-md-6 col-xs-4 col-sm-4">
                                    <input type="number" class="form-control" /*min="1" */ max="10" name="redeemAmount" value={this.state.redeemAmount} onChange={this.handleUserInput} id="redeemAmount" placeholder="Amount" />
                                </div>
                            </div>
                            <div className={`form-group ${this.errorClass(this.state.formErrors.minRedeemRewardPoint)}`}>
                                <label style={{ fontWeight: "bold" }} class="control-label col-lg-4 col-md-4  col-xs-2  col-sm-2" for="minRedeemRewardPoint">MinRewardPoint<span style={{ color: "red" }}>*</span></label>
                                <div class="col-lg-6 col-md-6 col-xs-4 col-sm-4">
                                    <input type="number" class="form-control" name="minRedeemRewardPoint" value={this.state.minRedeemRewardPoint} onChange={this.handleMinRedeemRewardPoint} id="minRedeemRewardPoint" placeholder="Min Point to start Redeem process" />
                                </div>
                            </div>
                     
                      </form>
        </div>
</div>
<div class="form-group">
                              <div class="row" style={{ marginLeft: "2px", marginBottom: "10%" }}>
                                  <div class="col-sm-offset-2 col-sm-10">
                                      <button style={{ fontWeight: "bold" }} type="button" /*disabled={!this.state.formValid}*/ onClick={() => this.AddRewardRedeemFunc()} class="btn btn-primary">Submit</button> <span></span>
                                      <button style={{ fontWeight: "bold" }} type="button" onClick={() => this.cancelFunc()} class="btn btn-primary">Clear</button>
                                  </div>
                              </div>
                          </div>       
                    </div>
                </div>

               
            </div>

        );
    }
}

export default RewardRedeemPage;