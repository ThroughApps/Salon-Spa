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
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';

var _isDirty = false;
class CustomerEntryForm extends Component {
  constructor() {
    super()
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state = {
      customerName: '',
      companyName: '',
      address: '',
      contactNo: '',
      alternateContactNo: '',
      gstNo: '',
      landlineNo: '',
      staffId: staffId,
      employeeName: employeeName,
      role: role,
      email: '',
      city: '',
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
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    var _isDirty = false;
    $(':input').change(function () {
      _isDirty = true;
    });

  }
  CustomerExcelExportFunc() {

    var companyId = CryptoJS.AES.decrypt(
      localStorage.getItem("CompanyId"),
      "shinchanbaby"
    ).toString(CryptoJS.enc.Utf8);
    this.state.companyId = companyId;
    var today = new Date();
    var today1 =
      today.getFullYear() +
      "_" +
      (today.getMonth() + 1) +
      "_" +
      today.getDate();

    var totalName =
      companyId +
      "_" +
      today.getHours() +
      "_" +
      today.getMinutes() +
      "_" +
      today.getSeconds() +
      "_" +
      today1 +
      ".xlsx";

    this.state.customerFileName = totalName;


    this.setState({
      customerFileName: this.state.customerFileName,
      companyId: this.state.companyId
    });

    $.ajax({
      type: "POST",
      data: JSON.stringify({
        customerFileName: this.state.customerFileName,
        companyId: this.state.companyId
      }),


      url: " http://15.206.129.105:8080/MerchandiseAPI/Excel/ExportCustomerFile",
      contentType: "application/json",
      dataType: "json",
      async: false,
      success: function (data, textStatus, jqXHR) {


        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "The File Requested For Import Is Downloaded Successfully", // Message dialog  
          showConfirmButton: false,
          timer: 2000
        })


      },
      error: function (data) {

        Swal.fire({
          position: 'center',
          icon: 'error',
          title: "Network Connection Problem",
          showConfirmButton: false,
          timer: 1500
        })

      }
    });
  }

  ImportFunc1() {

    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={CustomerExcelImport} />
        </div>
      </Router>,
      document.getElementById("contentRender")
    );

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
        customerNameValid = value.match(/^(\s?\.?[a-zA-Z]+)+$/);
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


      case 'contactNo':
        contactNoValid = value.match(/^(\d{10})$/);
        fieldValidationErrors.ContactNo = contactNoValid ? '' : ' is InCorrect';
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

        && this.state.contactNoValid


    });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }
  AddCustomerFunc() {
    var self = this;
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });


    //var landlineNoTest=landlineregExp.test(this.state.landlineNo);
    var landlinenoData;
    if (this.state.landlineNo == "") {
      landlinenoData = "yes";
    } else if (this.state.landlineNo != "") {
      var landlineregExp = /^(\d{12})$/;
      var landlineNoTest = landlineregExp.test(this.state.landlineNo);
      if (landlineNoTest == true) {
        landlinenoData = "yes";
      } else {
        landlinenoData = "no";
      }

    }
    if (landlinenoData == "yes") {
      $.ajax({
        type: 'POST',
        data: JSON.stringify({
          customerName: Case.capital(this.state.customerName),
          companyName: Case.capital(this.state.companyName),
          address: this.state.address,
          city: this.state.city,
          contactNo: this.state.contactNo,
          alternateContactNo: this.state.alternateContactNo,
          gstNo: this.state.gstNo,
          email: this.state.email,
          companyId: this.state.companyId,
          landlineNo: this.state.landlineNo,
          staffId:this.state.staffId,
          employeeName:this.state.employeeName,
          role:this.state.role,

        }),
        url: " http://15.206.129.105:8080/MerchandiseAPI/master/addcustomer",
        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {
          if (data.contactNo == "Mobile") {

            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'The Mobile Number is Already Exists',
              showConfirmButton: false,
              timer: 2000
            })

          }
          else {


            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Successfully Added ' + self.state.customerName + ' Details',               // Message dialog 
              showConfirmButton: false,
              timer: 2000
            })
            self.state.customerName = "";
            self.state.companyName = "";
            self.state.address = "";
            self.state.contactNo = "";
            self.state.alternateContactNo = "";
            self.state.gstNo = "";
            self.state.email = "";
            self.state.city = "";
            self.state.landlineNo = "";
            self.state.formValid = false;
            self.state.customerNameValid = false;
            self.state.companyNameValid = false;
            self.state.addressValid = false;
            self.state.contactNoValid = false;

            // $('[name=city]').val('');

            self.setState({
              customerName: '',
              companyName: '',
              address: '',
              contactNo: '',
              alternateContactNo: '',
              gstNo: '',
              email: '',
              city: '',
              landlineNo: '',
              formValid: false,
              customerNameValid: false,
              companyNameValid: false,
              addressValid: false,
              contactNoValid: false,


            });
            ReactDOM.render(
              <Router >
                <div>
                  <Route path="/" component={CustomerEntryForm} />
                </div>
              </Router>, document.getElementById('contentRender'));

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
        },
      });
    } else {

      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Incorrect LandLine No',
        showConfirmButton: false,
        timer: 2000
      })
    }

  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    _isDirty = true;
    this.state.backButtonVariable = false;

    if (value.length == 0) {
      _isDirty = false;
    }
    this.setState({
      backButtonVariable: this.state.backButtonVariable,
    })
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }



  handleUserInputLandLineNo = (e) => {

    const name = e.target.name;
    const value = e.target.value;
    _isDirty = true;
    this.state.backButtonVariable = false;
    this.setState({
      backButtonVariable: this.state.backButtonVariable,
    })

    this.setState({
      landlineNo: value
    });
  }


  cancelFunc() {
    this.state.customerName = "";
    this.state.companyName = "";
    this.state.address = "";
    this.state.contactNo = "";
    this.state.alternateContactNo = "";
    this.state.gstNo = "";
    this.state.email = "";
    this.state.city = "";
    this.state.landlineNo = "";


    this.setState({
      customerName: this.state.customerName,
      companyName: this.state.companyName,
      address: this.state.address,
      city: this.state.city,
      contactNo: this.state.contactNo,
      alternateContactNo: this.state.alternateContactNo,
      gstNo: this.state.gstNo,
      email: this.state.email,
      landlineNo: this.state.landlineNo,
      customerNameValid: false,
      companyNameValid: false,
      addressValid: false,
      contactNoValid: false,
      emailValid: false,
      landlineNoValid: false,
    })
    ReactDOM.render(<CustomerEntryForm />, document.getElementById("contentRender"));
  }

  // BackbtnFunc() {
  //     //   alert(this.state.backButtonVariable)
  //        if(this.state.backButtonVariable==true)
  //        {
  //          ReactDOM.render(
  //            <Router>
  //              <div>

  //                <Route path="/" component={DashboardOverall} />


  //              </div>
  //            </Router>,
  //            document.getElementById('contentRender'));
  //          registerServiceWorker();
  //        }
  //        else{
  //          confirmAlert({
  //            title: "Confirmation", // Title dialog
  //            message: "Unsaved changes are there. Do you really want to go back?", // Message dialog
  //            buttons: [
  //              {
  //                label: 'Confirm',
  //                onClick: () => this.ConfirmBack()
  //              },
  //              {
  //                label: 'Cancel',
  //                onClick: () => this.CancelBack()
  //              }
  //            ]
  //          });
  //        }

  //      }


  //  BackbtnFunc() {
  //     alert(this.state.backButtonVariable)
  //   var dirtyValue ="false";
  //   alert(String(_isDirty));
  //   alert(String(dirtyValue));
  //      if(String(_isDirty)== String(dirtyValue))
  //      {
  //        ReactDOM.render(
  //          <Router>
  //            <div>

  //              <Route path="/" component={DashboardOverall} />


  //            </div>
  //          </Router>,
  //          document.getElementById('contentRender'));
  //        registerServiceWorker();
  //      }
  //      else{
  //        confirmAlert({
  //          title: "Confirmation", // Title dialog
  //          message: "Unsaved changes are there. Do you really want to go back?", // Message dialog
  //          buttons: [
  //            {
  //              label: 'Confirm',
  //              onClick: () => this.ConfirmBack()
  //            },
  //            {
  //              label: 'Cancel',
  //              onClick: () => this.CancelBack()
  //            }
  //          ]
  //        });
  //      }

  //    }

  BackbtnFunc() {
    //   alert(this.state.backButtonVariable)
    var dirtyValue = "false";

    if ((this.state.customerName.length == 0)) {
      this.setState({
        customerNameValid: false,

      })

    }
    if ((this.state.companyName.length == 0)) {
      this.setState({
        companyNameValid: false,
      })

    }
    if ((this.state.address.length == 0)) {
      this.setState({
        addressValid: false,
      })

    }
    if ((this.state.contactNo.length == 0)) {
      this.setState({
        contactNoValid: false,
      })

    }



    if (this.state.customerName.length == 0 && this.state.companyName.length == 0 &&
      this.state.address.length == 0 && this.state.contactNo.length == 0 &&
      this.state.alternateContactNo.length == 0 && this.state.gstNo.length == 0 &&
      this.state.landlineNo.length == 0 && this.state.email.length == 0 &&
      this.state.city.length == 0) {
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
    // this.setState({
    //     customerName:this.state.customerName,
    //     companyName:this.state.companyName,
    //     address:this.state.address,
    //     city:this.state.city,
    //     contactNo:this.state.contactNo,
    //     alternateContactNo:this.state.alternateContactNo,
    //     gstNo:this.state.gstNo,
    //     email:this.state.email,
    //     landlineNo:this.state.landlineNo,
    //     customerNameValid: false,
    //     companyNameValid: false,
    //     addressValid: false,
    //     contactNoValid: false,
    //     emailValid: false,
    //     landlineNoValid:false,      

    // })

  }
  render() {
    return (

      <div class="container">
        {/* <ul class="previous disabled" id="backbutton"
                    style={{
                        backgroundColor: "#f1b6bf",
                        float: "none",
                        display: "inline-block",
                        marginLeft: "5px",
                        borderRadius: "5px",
                        padding: "3px 7px 3px 7px"
                    }}>
                    <a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i>Back</a></ul> */}

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
                <h3 >Customer Entry Form</h3>   </div>

            </div>



            <div className="panel panel-default" style={{ borderColor: "white", marginBottom: "1px" }}>
              <FormErrors formErrors={this.state.formErrors} />
            </div>

            <form class="form-horizontal form-bordered" name="submissions">
              <div className={`form-group ${this.errorClass(this.state.formErrors.customerName)}`}>
                <label class="control-label col-sm-2" style={{ fontWeight: "bold" }} for="customerName">Customer Name<span style={{ color: "red" }}>*</span></label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" style={{ textTransform: "capitalize", color: "black" }} id="customerName" name="customerName" value={this.state.customerName} onChange={this.handleUserInput} placeholder="Customer Name" />
                </div>
              </div>
              <div className={`form-group ${this.errorClass(this.state.formErrors.contactNo)}`}>
                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="contactNo"> Contact No<span style={{ color: "red" }}>*</span></label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" /*min="1" */ max="10" name="contactNo" value={this.state.contactNo} onChange={this.handleUserInput} id="contactNo" placeholder="Contact no" />
                </div>
              </div>
              <div className={`form-group ${this.errorClass(this.state.formErrors.companyName)}`}>
                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="companyName">Company Name</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" name="companyName" value={this.state.companyName} onChange={this.handleUserInput} id="companyName" placeholder="Company Name" />
                </div>
              </div>

              <div className={`form-group ${this.errorClass(this.state.formErrors.address)}`}>
                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="address">Address</label>
                <div class="col-sm-10">
                  <textarea rows="2" cols="20" class="form-control" name="address" value={this.state.address} onChange={this.handleUserInput} id="address" placeholder="Address"> </textarea>
                </div>
              </div>
              <div class="form-group">
                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="city">State</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" name="city" value={this.state.city} onChange={this.handleUserInput} id="city" placeholder="State Name" />

                </div>
              </div>

              <div class="form-group">
                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="alternateContactNo"> Alternate No</label>
                <div class="col-sm-10">
                  <input type="text" min="1" class="form-control" name="alternateContactNo" value={this.state.alternateContactNo} onChange={this.handleUserInput} id="alternateContactNo" placeholder="Alternate Contact no" />
                </div>
              </div>
              <div className="form-group">
                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="gstNo"> GST No</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" name="gstNo" value={this.state.gstNo} onChange={this.handleUserInput} id="gstNo" placeholder="GST no" />
                </div>
              </div>

              <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>

                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="email">Email ID</label>
                <div class="col-sm-10">
                  <input type="email" class="form-control" name="email" value={this.state.email} onChange={this.handleUserInput} id="email" placeholder="Email ID" />
                </div>
              </div>

              <div class="form-group">

                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="landlineno">LandLine No</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" name="landlineNo" value={this.state.landlineNo} onChange={this.handleUserInputLandLineNo} id="landlineno" placeholder="LandLine No" />
                </div>
              </div>

              <div class="form-group">
                <div class="row" style={{ marginLeft: "2px", marginBottom: "10%" }}>
                  <div class="col-sm-offset-2 col-sm-10">
                    <button style={{ fontWeight: "bold" }} type="button" disabled={!this.state.formValid} onClick={() => this.AddCustomerFunc()} class="btn btn-primary">Submit</button> <span></span>
                    <button style={{ fontWeight: "bold" }} type="button" onClick={() => this.cancelFunc()} class="btn btn-primary">Clear</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div class="modal fade" id="myModal"  >
          <div class="modal-dialog">

            <div class="modal-content">
              <div class="modal-header" style={{ paddingTop: "0px", paddingBottom: "0px" }}>
                <h5 class="modal-title" style={{ align: "center", display: "contents" }}>Please NOTE:</h5>
                <button type="button" class="close" style={{ color: "black" }}
                  data-dismiss="modal">&times;</button>


              </div>
              <div id="mymodal" class="modal-body" >
                <ol>
                  <li>
                    Ensure <b>Customer Name</b> contains only Alphabets
                    </li>
                  <li>
                    Ensure <b>ContactNo</b>,<b>AlternateNo</b> are only Numbers
                    </li>
                  <li>
                    Ensure <b>Email Id</b> is of correct Format
                    </li>

                </ol>
                <a
                  href="ExportCustomer.xlsx"
                  style={{ color: "red", textDecoration: "none", borderBottom: "1px solid blue" }}
                  // href="#myModal"
                  //  data-toggle="modal" data-target="#myModal" 
                  download={this.state.customerFileName}
                  onClick={() => this.CustomerExcelExportFunc()}
                //  style={{ backgroundColor: "#677785", color: "white" }}
                >  <span style={{ fontSize: "20px" }}
                  class="glyphicon glyphicon-download"

                >
                    <span style={{ paddingLeft: "10px", fontSize: "24px" }}>Export&ensp;<b>[</b>Download&ensp;Excel&ensp;File<b>]</b></span></span>
                </a>


              </div>
            </div>

          </div>

        </div>
      </div>

    );
  }
}

export default CustomerEntryForm;