import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import VendorEntryForm from './VendorEntryForm';
import CustomerList from './CustomerList';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';

import './datepicker.css';
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import Case from "case";
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import EstimateList from './EstimateList';
import SelectSearch from 'react-select';
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css"; // optional styles
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import Select from 'react-select';
import moment from 'moment';

var numberToWord = require('npm-number-to-word');

var staffData = [];
var inputarray = [];
var saleRateArray = [];
var purchaseRateArray = [];
var testarray = [];
var customerarray = [];
var rougharray = [];
var tablecontentarray = [];
var currentItemQuantity;
var currentItemLimitQuantity;
var enqarrData = [];

class Estimate1 extends Component {
  constructor(data) {
    super(data)
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
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
      month: (today.getMonth() + 1),
      date: date,
      modalproductName: '',
      staffId: '',
      modalproductCategory: '',
      modalproductType: '',
      modalquantity: 0,
      modalquantityLimit: 0,
      modalcgst: 0,
      modalsgst: 0,
      modaligst: 0,
      redeemPointToUse: 0,
      redeemAmountToUse: 0,
      rewardAmount: rewardAmount,
      rewardPoint: rewardPoint,
      maxRewardLimit: maxRewardLimit,
      expiryDuration: expiryDuration,
      redeemAmount: redeemAmount,
      redeemPoint: redeemPoint,
      minRedeemRewardPoint: minRedeemRewardPoint,
      staffId: staffId,
      employeeName: employeeName,
      role: role,
      modalhsnCode: '',
      modalpurchaseRate: '',
      modalsaleRate: '',
      modaldescription: '',
      totalVisit: '',
      lastVisit: '',
      totalRevenue: '',
      customerName: '',
      contactNo: '',
      staffName: '',
      //  invoiceNo: '',
      orderNumber: '',
      invoiceDate: date,
      companyId: companyId,
      dueDate: date,
      productName: '',
      saleType: '',
      description: '',

      rate: '',

      quantity: '1',
      sms: '',
      emailoption: '',
      total: 0,
      totalqty: '',
      subtotal1: 0,
      totalitemqty: 0,
      balance_amount: '',
      advance: 0,
      discount: 0,
      balance: '',
      options: [],
      paymentoptions: [],
      saleSale: '',
      purchaseSale: '',
      modalCustomerName: '',
      modalContactNo: '',
      payment_status: 'UnPaid',
      paymentMode: '',
      formErrors: {
        modalCustomerName: '',
        modalContactNo: '',
        modalproductName: '',
        modalpurchaseRate: '',
        modalsaleRate: '',
        modalproductName: '',
        modalproductType: '',
        modalproductCategory: '',

      },
      modalCustomerNameValid: false,
      modalContactNoValid: false,
      modalpurchaseRateValid: false,
      modalsaleRateValid: false,
      modalproductNameValid: false,
      modalproductTypeValid: false,
      modalproductCategoryValid: false,

    }
    this.setState({
      date: date,
    })
  }
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let modalCustomerNameValid = this.state.modalCustomerNameValid;
    let modalContactNoValid = this.state.modalContactNoValid;

    switch (fieldName) {
      case 'modalCustomerName':
        modalCustomerNameValid = value.match(/^([a-zA-Z]+)([a-zA-Z ])*$/);
        fieldValidationErrors.CustomerName = modalCustomerNameValid ? '' : ' is InCorrect';
        break;

      case 'modalContactNo':
        modalContactNoValid = value.match(/^(\d{10})$/);
        fieldValidationErrors.ContactNo = modalContactNoValid ? '' : ' is InCorrect';
        break;

      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      modalCustomerNameValid: modalCustomerNameValid,
      modalContactNoValid: modalContactNoValid,

    }, this.validateForm);
  }
  validateForm() {

    this.setState({
      formValid:
        this.state.modalCustomerNameValid
        && this.state.modalContactNoValid


    });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }
  validateField1(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;

    let modalproductNameValid = this.state.modalproductNameValid;
    let modalpurchaseRateValid = this.state.modalpurchaseRateValid;
    let modalsaleRateValid = this.state.modalsaleRateValid;
    let modalproductTypeValid = this.state.modalproductTypeValid;
    let modalproductCategoryValid = this.state.modalproductCategoryValid;

    switch (fieldName) {

      case 'modalproductName':
        modalproductNameValid = value.length >= 2;
        fieldValidationErrors.ProductName = modalproductNameValid ? '' : ' is InCorrect';
        break;

      case 'modalsaleRate':
        modalsaleRateValid = value.length >= 1;
        fieldValidationErrors.SaleRate = modalsaleRateValid ? '' : ' is InCorrect';
        break;
      case 'modalpurchaseRate':
        modalpurchaseRateValid = value.length >= 1;
        fieldValidationErrors.PurchaseRate = modalpurchaseRateValid ? '' : ' is InCorrect';
        break;

      case 'modalproductType':
        modalproductTypeValid = value.length >= 1;
        fieldValidationErrors.ProductType = modalproductTypeValid ? '' : ' is not selected';
        break;


      case 'modalproductCategory':
        modalproductCategoryValid = value.length >= 1;
        fieldValidationErrors.ProductCategory = modalproductCategoryValid ? '' : ' is not selected';
        break;

      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,

      modalproductNameValid: modalproductNameValid,
      modalsaleRateValid: modalsaleRateValid,
      modalpurchaseRateValid: modalpurchaseRateValid,
      modalproductCategoryValid: modalproductCategoryValid,
      modalproductTypeValid: modalproductTypeValid,

    }, this.validateForm1);
  }
  validateForm1() {

    this.setState({
      formValid1:
        this.state.modalproductNameValid
        && this.state.modalsaleRateValid
        && this.state.modalpurchaseRateValid
        && this.state.modalproductCategoryValid
        && this.state.modalproductTypeValid
    });
  }
  errorClass1(error) {
    return (error.length === 0 ? '' : 'has-error');
  }
  handleUserInputProduct = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value },
      () => { this.validateField1(name, value) });
  }
  handleUserInputProductType = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.state.modalquantity = 0;
    this.state.modalquantityLimit = 0;

    if (value == "service") {
      $("#quantity2").hide();
      $("#quantityLimit2").hide();
    }
    else if (value == "product" && this.state.modalproductCategory == "Purchase") {
      $("#quantity2").hide();
      $("#quantityLimit2").show();
    }
    else if (value == "product" && this.state.modalproductCategory == "Own") {

      $("#quantity2").show();
      $("#quantityLimit2").show();
    }

    this.setState({ [name]: value },
      () => { this.validateField1(name, value) });



  }

  handleUserInputProductCategory = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.state.modalquantity = 0;
    this.state.modalquantityLimit = 0;

    if (this.state.modalproductType == "service") {
      $("#quantity2").hide();
      $("#quantityLimit2").hide();
    }
    else if (this.state.modalproductType == "product" && value == "Purchase") {
      $("#quantity2").hide();
      $("#quantityLimit2").show();
    }
    else if (this.state.modalproductType == "product" && value == "Own") {

      $("#quantity2").show();
      $("#quantityLimit2").show();
    }


    this.setState({ [name]: value },
      () => { this.validateField1(name, value) });



  }

  AddProductFunc() {
    var self = this;
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });

    if (self.state.modalproductCategory == "Purchase") {
      self.state.modalquantity = 0;
    }

    var errorData = "No";
    if (this.state.modalproductType == "service") {

    }
    else if (this.state.modalproductType == "product" && this.state.modalproductCategory == "Purchase") {

      if (this.state.modalquantityLimit == '') {
        errorData = "Yes";
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Kindly Add Quantity Limit',
          showConfirmButton: false,
          timer: 2000
        })
      }

    }
    else if (this.state.modalproductType == "product" && this.state.modalproductCategory == "Own") {



      if (Number(this.state.modalquantity) == 0 || this.state.modalquantityLimit == '') {
        errorData = "Yes";

        if (Number(this.state.modalquantity) == 0) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Kindly Add Quantity',
            showConfirmButton: false,
            timer: 2000
          })
        } else if (this.state.modalquantityLimit == '') {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Kindly Add Quantity Limit',
            showConfirmButton: false,
            timer: 2000
          })
        }
      }

    }

    if (errorData == "No") {
      if (this.state.modalproductName.trim().length > 0) {
        $.ajax({
          type: 'POST',
          data: JSON.stringify({
            productName: Case.capital(this.state.modalproductName),
            productType: this.state.modalproductType,
            productCategory: this.state.modalproductCategory,
            quantity: this.state.modalquantity,
            quantityLimit: this.state.modalquantityLimit,
            cgst: this.state.modalcgst,
            sgst: this.state.modalsgst,
            igst: this.state.modaligst,
            hsnCode: this.state.modalhsnCode,
            description: this.state.modaldescription,
            companyId: this.state.companyId,
            saleRate: (Math.round(this.state.modalsaleRate * 100) / 100).toFixed(2),
            purchaseRate: (Math.round(this.state.modalpurchaseRate * 100) / 100).toFixed(2),


          }),
          url: " http://15.206.129.105:8080/MerchandiseAPI/master/addproduct",
          contentType: "application/json",
          dataType: 'json',
          async: false,
          success: function (data, textStatus, jqXHR) {
            if (data.productName == "ProductName") {

              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'The product name is Already Exists',
                showConfirmButton: false,
                timer: 2000
              })

            }
            else {

              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Successfully Added Product ',
                showConfirmButton: false,
                timer: 2000
              })
              ReactDOM.render(
                <Router >
                  <div>
                    <Route path="/" component={Estimate1} />
                  </div>
                </Router>, document.getElementById('contentRender'));
              self.SelectCustomer();
              self.state.modalproductName = "";
              self.state.modaldescription = "";
              self.state.modalhsnCode = "";
              self.state.modalsaleRate = "";
              self.state.modalpurchaseRate = "";
              self.state.modalquantity = 0;
              self.state.modalquantityLimit = "";
              self.state.modalcgst = 0;
              self.state.modalsgst = 0;
              self.state.modaligst = 0;
              self.state.formValid1 = false;
              self.state.modalproductNameValid = false;

              self.state.modalquantityLimitValid = false;
              self.state.modalsaleRateValid = false;
              self.state.modalproductTypeValid = false;
              self.state.modalpurchaseValid = false;
              self.state.modalproductCategoryValid = false;



              $('[name=modalproductType]').val('');
              $('[name=modalproductCategory]').val('');
              $("#quantity2").show();
              $("#quantityLimit2").show();
              self.setState({
                modalproductName: '',
                modaldescription: '',
                modalproductCategory: '',
                modalsaleRate: '',
                modalpurchaseRate: '',
                modalquantity: 0,
                modalquantityLimit: '',
                modalhsnCode: '',
                modalproductType: '',
                modalcgst: 0,
                modalsgst: 0,
                modaligst: 0,
                formValid1: false,
                modalproductNameValid: false,
                modalsaleRateValid: false,
                modalproductTypeValid: false,
                modalquantityLimitValid: false,
                modalpurchaseRateValid: false,
                modalproductCategoryValid: false,

              });
              self.SelectCustomer();
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
          title: 'Enter Product Name',
          showConfirmButton: false,
          timer: 2000
        })
      }
    }
  }


  ClearProductFunc() {
    var self = this;


    $('[name=modalproductCategory]').val('');
    $('[name=modalproductType]').val('');
    this.state.modalproductName = "";
    this.state.modaldescription = "";
    this.state.modalquantityLimit = "";
    this.state.modalhsnCode = "";
    this.state.modalsaleRate = "";
    this.state.modalpurchaseRate = "";
    this.state.modalquantity = 0;
    this.state.modalcgst = 0;
    this.state.modalsgst = 0;
    this.state.modaligst = 0;
    self.setState({
      modalproductName: self.state.modalproductName,
      modaldescription: self.state.modaldescription,
      modalquantityLimit: self.state.modalquantityLimit,
      modalhsnCode: self.state.modalhsnCode,
      modalsaleRate: self.state.modalsaleRate,
      modalpurchaseRate: self.state.modalpurchaseRate,
      modalquantity: self.state.modalquantity,
      modalproductCategory: self.state.modalproductCategory,
      modalproductType: self.state.modalproductType,
      modalcgst: self.state.modalcgst,
      modalsgst: self.state.modalsgst,
      modaligst: self.state.modaligst,

    })
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    staffData = [];
    $("#tableHeadings").hide();
    $("#tableHeadingsEnquiry").hide();
    $("#tableHeadingsEnquiry_Header").hide();
    $("#paymentmodetd").hide();
    $("#insufficientdiv").hide();
    $(".producttype").hide();
    this.selectStaff();
    this.DeleteButton();
    var self = this;
    var customerName;
    var productName;
    window.scrollTo(0, 0);
    customerarray.length = 0;
    $('#dueDate').datepicker({
      onSelect: function (date) {
        var dt = new Date(date);
        dt.setDate(dt.getDate() - 1);
        $("#invoiceDate").datepicker("option", "maxDate", dt);
        self.setState({
          dueDate: date,
        });

      },
      dateFormat: 'yy-mm-dd',
      minDate: '-3M',
      maxDate: '3M',
      numberOfMonths: 1
    });
    $('#invoiceDate').datepicker({
      onSelect: function (date) {
        var dt = new Date(date);
        dt.setDate(dt.getDate() + 1);
        $("#dueDate").datepicker("option", "minDate", dt);
        self.setState({
          invoiceDate: date,
        });
      },
      dateFormat: 'yy-mm-dd',
      minDate: '-3M',
      maxDate: 'M',
      numberOfMonths: 1
    });
    $("#invoiceDate").datepicker().datepicker("setDate", new Date());
    $("#dueDate").datepicker().datepicker("setDate", new Date());
    $('#customerName').html('');

    var paymentOptions1 = [];
    paymentOptions1.push({ label: "Cash", value: "Cash" });
    paymentOptions1.push({ label: "Card", value: "Card" });
    paymentOptions1.push({ label: "Cheque", value: "Cheque" });
    paymentOptions1.push({ label: "Online", value: "Online" });
    paymentOptions1.push({ label: "Discount", value: "Discount" });

    self.state.paymentoptions = paymentOptions1;
    this.setState({
      paymentoptions: self.state.paymentoptions
    })

    this.SelectCustomer();

    this.selectProduct();
    //this.GetInvoiceNo();
  }


  SelectCustomer() {
    var self = this;
    var customerName;
    customerarray = [];
    saleRateArray = [];

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,

      }),
      url: " http://15.206.129.105:8080/MerchandiseAPI/saleorder/selectcustomer",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        var options1 = [];
        var options = [];
        customerName += '<option value ="" disabled selected hidden >Select a customer</option>';
        $.each(data.selectcustomernamelist, function (i, item) {
          /* if (item.companyName != "-") {
             self.state.customerName = item.companyName;
             self.setState({
               customerName: self.state.customerName,
             })
           } else {
             self.state.customerName = item.customerName;
             self.setState({
               customerName: self.state.customerName,
             })
           }*/
          //  customerName += '<option value="' + item.customerId + '">' + item.customerName + '</option>'

          options1.push({ label: item.customerName + ' ' + item.contactNo, value: item.customerId });
          if (item.lastVisit == null) {
            self.state.lastVisitInter = "-";
            self.setState({
              lastVisitInter: self.state.lastVisitInter,

            })
          } else {
            self.state.lastVisitInter = item.lastVisit;
            self.setState({
              lastVisitInter: self.state.lastVisitInter,

            })
          }
          if (item.totalRevenue == null) {
            self.state.totalRevenueInter = "-";
            self.setState({
              totalRevenueInter: self.state.totalRevenueInter,

            })
          } else {
            self.state.totalRevenueInter = item.totalRevenue;
            self.setState({
              totalRevenueInter: self.state.totalRevenueInter,

            })
          }


          var content = JSON.stringify({
            customerName: item.customerName,
            orderNumber: item.eorderNumber,
            customerId: item.customerId,
            contactNo: item.contactNo,
            address: item.address,
            gstNo: item.gstNo,
            email: item.email,
            companyName: item.companyName,
            lastVisit: self.state.lastVisitInter,
            totalRevenue: self.state.totalRevenueInter,
            enqdetails: item.selectEnqDetailsList,
            serviceBy: item.serviceBy,
            customerRewardPointDB: item.rewardPoint,
            customerExpiryDateDB: item.expiryDate,

          });

          customerarray.push(content);

        });

        self.state.options1 = options1;
        self.setState({
          options1: self.state.options1,
        })
        //  $("#customerName").append(customerName);
        $.each(data.selectsaleproductlist, function (i, item) {

          var feed = JSON.stringify({
            productName: item.productName,
            rate: item.saleRate,
            description: item.description,
            productType: item.productType,
            quantity: item.quantity,
            productId: item.productId,
            quantityLimit: item.quantityLimit
          });
          saleRateArray.push(feed);

        });
        // $("#productName").append(productName);



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
  SelectProductB4Customer() {


    var self = this;

    saleRateArray = [];

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,

      }),
      url: " http://15.206.129.105:8080/MerchandiseAPI/saleorder/selectcustomer",


      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {



        $.each(data.selectsaleproductlist, function (i, item) {
          var feed = JSON.stringify({
            productName: item.productName,
            rate: item.saleRate,
            description: item.description,
            productType: item.productType,
            quantity: item.quantity,
            productId: item.productId,
            quantityLimit: item.quantityLimit


          });
          saleRateArray.push(feed);


        });



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

  GetInvoiceNo() {
    var invoiceNumber;
    var self = this;
    $.ajax({

      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,

      }),
      url: " http://15.206.129.105:8080/MerchandiseAPI/saleorder/estimateinvoiceNo",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        $.each(data.selectEstimateInvoiceNoList, function (i, item) {
          self.state.invoiceNumber = item.invoiceNo;

          self.setState({
            invoiceNo: item.invoiceNo,
          })
        });


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
  AddCustomerFunc() {
    var self = this;
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });
    if (this.state.modalContactNo.trim().length > 2) {

      $.ajax({
        type: 'POST',
        data: JSON.stringify({
          customerName: Case.capital(this.state.modalCustomerName),
          contactNo: this.state.modalContactNo,
          companyId: this.state.companyId,

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


            self.state.modalCustomerName = "";
            self.state.modalContactNo = "";
            self.state.formValid = false;

            // $('[name=city]').val('');

            self.setState({
              modalCustomerName: '',
              modalContactNo: '',
              formValid: false,


            });


            ReactDOM.render(
              <Router >
                <div>
                  <Route path="/" component={Estimate1} />
                </div>
              </Router>, document.getElementById('contentRender'));
            $('#customerName').html('');
            self.SelectCustomer();

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
        title: 'Fill all the details',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }


  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }
  handleMinRewardRedeemPointCalc = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      value: value,
    })
    var self = this;
    if (Number(this.state.subtotal1) == 0 || (this.state.customerName.length == 0)) {
      alert("Add To cart is Empty or Customer is not selected" + value);
      this.state.redeemPointToUse = 0;
      this.setState({ [name]: this.state.redeemPointToUse },
      );
    } else {
      if (Number(value) > Number(this.state.customerRewardPointDB)) {
        alert("Redeem Point Exceeds Reward Point" + value);
        this.state.redeemPointToUse = 0;
        this.state.redeemAmountToUse = 0;
        this.setState({ [name]: this.state.redeemPointToUse, redeemAmountToUse: this.state.redeemAmountToUse, },

        );

      }
      else {
        this.state.redeemPointToUse = value;
        this.setState({ [name]: this.state.redeemPointToUse },
        );
        if (Number(this.state.redeemPointToUse) == 0) {
          self.state.redeemAmountToUse = 0;
        } else {
          self.state.redeemAmountToUse = Math.round(Number(self.state.redeemPointToUse) * (Math.round(Number(self.state.redeemAmount)/(Number(self.state.redeemPoint)))));

        }

        if (Number(self.state.redeemAmountToUse) > Number(this.state.subtotal1)) {
          alert("Redeem Amount Exceeds Net Amount" + Number(self.state.redeemAmountToUse));
          this.state.redeemPointToUse = 0;
          self.state.redeemAmountToUse = 0;
          self.setState({
            redeemAmountToUse: self.state.redeemAmountToUse,
            redeemPointToUse: self.state.redeemPointToUse,
          })
        } else {
          self.state.redeemAmountToUse = Math.round(Number(self.state.redeemPointToUse) *(Math.round(Number(self.state.redeemAmount)/(Number(self.state.redeemPoint)))));
          this.state.redeemPointToUse = value;
          this.setState({ [name]: this.state.redeemPointToUse },
          );
          self.setState({
            redeemAmountToUse: self.state.redeemAmountToUse,
          })
        }

        this.state.balance_amount = Math.round(Number(this.state.subtotal1) - (Number(this.state.advance) + Number(this.state.discount) + Number(this.state.redeemAmountToUse)));
        if (this.state.balance_amount == 0) {
          this.state.payment_status = "Paid";
          $("#paymentmodetd").show();
        } else if (this.state.subtotal1 == this.state.balance_amount) {
          this.state.payment_status = "UnPaid";
          $("#paymentmodetd").hide();
        } else {
          this.state.payment_status = "PartiallyPaid";
          $("#paymentmodetd").show();
        }
        this.setState({
          advance: this.state.advance,
          discount: this.state.discount,
          balance_amount: this.state.balance_amount,
          payment_status: this.state.payment_status,
        })
      }
    }
  }
  handleUserHeightWidth = (e) => {

    const name = e.target.name;
    const value = e.target.value;

    var value1 = value;
    var cleanNum;


    if (value1 != "") {

      var isNumberDt = $.isNumeric(value1);
      if (isNumberDt !== false) {
        var sign_data = Math.sign(value1);

        if (sign_data != -1) {

          cleanNum = value1.match(/^\d+\.?\d{0,2}/);
          /*this.state[name] = cleanNum;
          this.setState({ [name]: cleanNum });
          */
          if (value == "0") {
            alert("Value Cant Be Zero");
          }
          else {
            this.state[name] = cleanNum;
            this.setState({ [name]: cleanNum });
            this.handleUserHeightWidthComplete();
          }

        } else {

          //  $("#"+name).val(); // get current row 1st TD value
          this.state[name] = '';
          this.setState({ [name]: '' });

        }
      } else {

        // $("#"+name).val(); // get current row 1st TD value
        this.state[name] = '';
        this.setState({ [name]: '' });

      }

    } else {

      this.state[name] = '';
      this.setState({ [name]: '' });
      this.handleUserHeightWidthComplete();
    }

  }

  handleUserQuantity = (e) => {

    const name = e.target.name;
    const value = e.target.value;

    var value1 = value;
    var cleanNum;



    if (value1 != "") {

      var isNumberDt = $.isNumeric(value1);
      if (isNumberDt !== false) {
        var sign_data = Math.sign(value1);
        if (sign_data != -1) {

          cleanNum = value1.match(/^\d+\.?\d{0,2}/);
          if (value == "0") {
            alert("Value Cant Be Zero");
          }
          else {

            if (Number(value1) <= Number(currentItemQuantity)) {
              this.state[name] = cleanNum;
              this.setState({ [name]: cleanNum });
              this.handleUserHeightWidthComplete();
              $("#quantityalertmsg").empty();
            } else {
              this.state[name] = '';
              this.setState({ [name]: '' });
              $("#quantityalertmsg").empty();
              $("#quantityalertmsg").append("! Available Quantity In Stock " + currentItemQuantity);
            }

          }

        } else {

          //  $("#"+name).val(); // get current row 1st TD value
          this.state[name] = '';
          this.setState({ [name]: '' });

        }
      } else {

        // $("#"+name).val(); // get current row 1st TD value
        this.state[name] = '';
        this.setState({ [name]: '' });

      }

    } else {

      this.state[name] = '';
      this.setState({ [name]: '' });
      this.handleUserHeightWidthComplete();

    }

  }

  handleUserHeightWidthComplete() {
    var self = this;

    if (this.state.productType == "service") {
      self.state.total = self.state.rate;

    } else {
      self.state.total = Math.round(Number(self.state.rate) * Number(self.state.quantity));
    }


    self.state.finalAmount = Math.round(Number(self.state.total));
    self.setState({

      total: self.state.total,
      finalAmount: self.state.finalAmount,

    });

  }

  AdvanceCalc = (e) => {

    const name = e.target.name;
    const value = e.target.value;
    //If Entered Amount Exceed the subtotal
    var state_value = 0;

    var value1 = value;

    if (value1 != "") {
      var isNumberDt = $.isNumeric(value1);
      if (isNumberDt !== false) {
        var sign_data = Math.sign(value1);
        // alert("SIGN VALUE :"+sign_data);
        if (sign_data != -1) {

          var decimal_data = (value1 - Math.floor(value1)) !== 0;
          //   alert("DECIMAL DATA :"+decimal_data);
          if (decimal_data == false) {

            this.state[name] = value1;
            this.setState({ [name]: value1 });

          } else {

            //   $("#"+name).val(); // get current row 1st TD value
            this.state[name] = 0;
            this.setState({ [name]: 0 });
            // alert("NO NUMBER FOR DECI");
            /*  confirmAlert({
                        title: 'Error',                        // Title dialog
                        message: 'Decimal Values Not Accepted',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    });
                    */
          }

        } else {

          //  $("#"+name).val(); // get current row 1st TD value
          this.state[name] = 0;
          this.setState({ [name]: 0 });

        }
        //   alert("NO NUMBER IN -");
      } else {

        // $("#"+name).val(); // get current row 1st TD value
        this.state[name] = 0;
        this.setState({ [name]: 0 });
        /*  confirmAlert({
                title: 'Error',                        // Title dialog
                message: 'Kindly Enter An Number To Proceed',               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
            }); */
        //alert("NO NUMBER FOR CHAR");
      }

    } else {
      this.state[name] = 0;
      this.setState({ [name]: 0 });

      //   alert("NO NUMBER FOR EMPTY STRING ");
    }



    if (isNumberDt != false && sign_data != -1 && decimal_data != true) {


      if (value1 > this.state.subtotal1) {


        alert("Advance Exceeds Total" + value1);

        state_value = 0;
        this.AdvanceCalcComplete(value1, state_value);

      } else {

        state_value = value1;
        this.AdvanceCalcComplete(value1, state_value);

      }
    } else {


      if (value1 > this.state.subtotal1) {


        alert("Advance Exceeds Total" + value1);
        state_value = 0;
        this.AdvanceCalcComplete(value1, state_value);

      } else {

        state_value = 0;
        this.AdvanceCalcComplete(value1, state_value);


      }
    }
    /*$(".delete").keyup(function(event) {
     if (event.keyCode === 13) {
       //  $("#saleinvoice").click();
     }
    });
    */
  }

  AdvanceCalcComplete(value1, state_value) {

    this.state.advance = state_value;

    var tot_adv_diff = Math.round(Number(this.state.subtotal1) - Number(this.state.advance));

    if (this.state.subtotal1 == this.state.advance) {

      $('#discount').prop('disabled', true)
      this.state.discount = 0;

    } else if (this.state.discount > tot_adv_diff) {
      this.state.discount = 0;
      $('#discount').prop('disabled', false)

    } else {
      $('#discount').prop('disabled', false)

    }

    this.state.balance_amount = Math.round(Number(this.state.subtotal1) - (Number(this.state.advance) + Number(this.state.discount)));

    if (this.state.balance_amount == 0) {
      this.state.payment_status = "Paid";
      $("#paymentmodetd").show();

    } else if (this.state.subtotal1 == this.state.balance_amount) {
      this.state.payment_status = "UnPaid";
      $("#paymentmodetd").hide();
    } else {
      this.state.payment_status = "PartiallyPaid";
      $("#paymentmodetd").show();
    }



    this.setState({
      advance: state_value,
      discount: this.state.discount,
      balance_amount: this.state.balance_amount,
      payment_status: this.state.payment_status,
    })

  }

  DiscountCalc = (e) => {

    const name = e.target.name;
    const value = e.target.value;

    var value1 = value;
    var state_value = 0;

    if (value1 != "") {

      var isNumberDt = $.isNumeric(value1);
      if (isNumberDt !== false) {
        var sign_data = Math.sign(value1);
        // alert("SIGN VALUE :"+sign_data);
        if (sign_data != -1) {

          var decimal_data = (value1 - Math.floor(value1)) !== 0;
          //   alert("DECIMAL DATA :"+decimal_data);
          if (decimal_data == false) {

            this.state[name] = value1;
            this.setState({ [name]: value1 });

          } else {

            //   $("#"+name).val(); // get current row 1st TD value
            this.state[name] = 0;
            this.setState({ [name]: 0 });

            /*  confirmAlert({
                        title: 'Error',                        // Title dialog
                        message: 'Decimal Values Not Accepted',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    });  */
          }
        } else {

          //  $("#"+name).val(); // get current row 1st TD value
          this.state[name] = 0;
          this.setState({ [name]: 0 });
          /* confirmAlert({
                 title: 'Error',                        // Title dialog
                 message: 'Negative Values Not Accepted',               // Message dialog
                 confirmLabel: 'Ok',                           // Text button confirm
             }); */
        }
      } else {

        // $("#"+name).val(); // get current row 1st TD value
        this.state[name] = 0;
        this.setState({ [name]: 0 });
        /* confirmAlert({
               title: 'Error',                        // Title dialog
               message: 'Kindly Enter An Number To Proceed',               // Message dialog
               confirmLabel: 'Ok',                           // Text button confirm
           }); */
      }

    } else {
      this.state[name] = 0;
      this.setState({ [name]: 0 });
    }


    if (isNumberDt != false && sign_data != -1 && decimal_data != true) {
      var tot_minus_adv = Math.round(Number(this.state.subtotal1) - Number(this.state.advance));
      //If discount Exceeds the balance Amount
      if (value1 > tot_minus_adv) {
        alert("Exceeds Balance" + value1);
        state_value = 0;
        this.DiscountCalcComplete(value1, state_value);

      } else {

        state_value = value1;
        this.DiscountCalcComplete(value1, state_value);

      }


    } else {
      var tot_minus_adv = Math.round(Number(this.state.subtotal1) - Number(this.state.advance));
      //If discount Exceeds the balance Amount
      if (value1 > tot_minus_adv) {
        alert("Exceeds Balance" + value1);
        state_value = 0;
        this.DiscountCalcComplete(value1, state_value);
      } else {

        state_value = 0;
        this.DiscountCalcComplete(value1, state_value);

      }
    }






  }
  DiscountCalcComplete(value1, state_value) {

    this.state.discount = state_value;
    this.state.balance_amount = Math.round(Number(this.state.subtotal1) - (Number(this.state.advance) + Number(this.state.discount) + Number(this.state.redeemAmountToUse)));
    if (this.state.balance_amount == 0) {
      this.state.payment_status = "Paid";
      $("#paymentmodetd").show();

    } else if (this.state.subtotal1 == this.state.balance_amount) {
      this.state.payment_status = "UnPaid";
      $("#paymentmodetd").hide();
    } else {
      this.state.payment_status = "PartiallyPaid";
      $("#paymentmodetd").show();
    }



    this.setState({
      discount: state_value,
      balance_amount: this.state.balance_amount,
      payment_status: this.state.payment_status,
    })
  }

  selectProduct() {
    var self = this;
    var options = [];
    for (var k = 0; k < saleRateArray.length; k++) {
      var temp = JSON.parse(saleRateArray[k]);
      if (temp.productType == "product") {
        console.log("product_type", temp.productName);
        options.push({ label: temp.productName + " ( " + temp.quantity + " ) ", value: temp.productName });
      }
      else {
        options.unshift({ label: temp.productName, value: temp.productName });
        console.log("service", temp.productName);
      }
      self.state.options = options;
      self.setState({
        options: options,
      })
    }
    console.log("Isale RATE ARRAY AT ADD TO CART:", saleRateArray);
  }

  handleCustomerDetails = (e) => {
    const name = e.name;
    const value = e.value;
    this.state.customerId = value;
    this.state.productName = "";
    this.state.quantity = "";
    rougharray.push(this.state.customerId);
    this.emptyFunc();
    this.SelectProductB4Customer();
    this.selectProduct();

    this.setState({
      [name]: value,
      selectedCustomerName: e,
      customerNameValid: true
    });

    var self = this;
    self.state.enqdetails = "";
    self.setState({
      enqdetails: self.state.enqdetails,
    })
    $("#tablecontents").empty();
    $("#tableHeadings").hide();
    $("#tablecontentsenquiry").empty();
    $("#tableHeadingsEnquiry").hide();
    $("#tableHeadingsEnquiry_Header").hide();
    for (var k = 0; k < customerarray.length; k++) {
      var temp = JSON.parse(customerarray[k]);

      if (temp.customerId == this.state.customerId) {
  
        $("#tablecontentsenquiry").empty();
        self.state.orderNumber = temp.orderNumber ;
        self.state.customerId = temp.customerId;
        self.state.contactNo = temp.contactNo;
        self.state.customerName = temp.customerName;
        self.state.address = temp.address;
        self.state.email = temp.email;
        self.state.lastVisit = temp.lastVisit;
        self.state.totalRevenue = temp.totalRevenue;
        self.state.enqdetails = temp.enqdetails;
        self.state.staffName1 = temp.serviceBy;
        self.state.customerId1 = temp.customerId;
        self.state.customerRewardPointDB = temp.customerRewardPointDB;
        self.state.customerExpiryDateDB = temp.customerExpiryDateDB;

        if (temp.companyName == " " || temp.companyName == "null" || temp.companyName == "-") {
          self.state.companyName = " "
        }
        else {
          self.state.companyName = temp.companyName;
        }
        if (temp.gstNo == " ") {
          self.state.gstNo = '-';
        } else {
          self.state.gstNo = temp.gstNo;
        }
        if (temp.serviceBy == " " || temp.serviceBy == "null" || temp.serviceBy == "-") {
          self.state.staffName1 = " "
        }
        else {
          self.state.staffName1 = temp.serviceBy;
        }
        self.setState({
          customerId1: self.state.customerId1,
          enqdetails: self.state.enqdetails,
        

        })
        console.log("enqDetails", self.state.enqdetails)
        var NUll = null;
        if (temp.enqdetails != NUll) {
          var size = temp.enqdetails.length;


          if (temp.enqdetails.length > 0) {
          
            $.each(self.state.enqdetails, function (i, item) {

            


              for (var k = 0; k < saleRateArray.length; k++) {
                var temp = JSON.parse(saleRateArray[k]);

                if ((temp.productName == item.enqProductName)) {


                  if ((self.state.customerId1 == item.customerId)) {
                    console.log("enqProductName", item.enqProductName);
                    console.log("customerId", item.customerId)
                    console.log("this customerId", self.state.customerId1)
                    console.log("temp.quantity", temp.quantity)
                    console.log("item.enqQuantity", item.enqQuantity)

                    if ((Number(temp.quantity) > 0) && (Number(temp.quantity) >= Number(item.enqQuantity))) {

                      if (temp.productType == "product") {
                        self.state.productName = temp.productName;
                        self.state.quantity = item.enqQuantity;
                        self.state.total = "";
                        self.state.finalAmount = "";
                        self.state.description = temp.description;
                        self.state.rate = temp.rate;

                        self.state.productType = temp.productType;
                        self.state.productQuantity = temp.quantity;
                        self.state.productId = temp.productId;
                        currentItemQuantity = temp.quantity;
                        currentItemLimitQuantity = temp.quantityLimit;
                        self.setState({
                          productName: temp.productName,
                          quantity: item.enqQuantity

                        })
                        self.state.total = Math.round(Number(self.state.rate) * Number(self.state.quantity));

                        self.state.finalAmount = Math.round(Number(self.state.total));
                        self.setState({
                          total: self.state.total,
                          finalAmount: self.state.finalAmount,

                          productName: self.state.productName1,
                        });
                        if ((self.state.staffName1.length != 0) && (self.state.productName != 0)) {


                          var currentproductvalue;

                          self.AddToCartQuantityUpdate();
                          self.selectProduct();



                          //var tab = '<thead><tr class="headcolor" style="color: white; background-color: #486885; font-size: 12px;">  <th>ProductName</th><th>Size</th><th>Rate</th><th>Amount</th><th>Quantity</th><th>Total</th><th>CGST (%)</th><th>SGST (%)</th><th>IGST (%)</th><th>Final Amount</th></tr></thead>';
                          self.state.subtotal1 = Math.round(Number(self.state.subtotal1) + (Number(self.state.finalAmount)));


                          if (self.state.quantity != "-") {
                            self.state.totalitemqty = Math.round(Number(self.state.totalitemqty) + Number(self.state.quantity));
                          }




                          var payament_status_details;



                          var tab = '<tr style={{backgroundColor: "white",fontColor:"black",fontWeight:"bold"}} id="tabletextcol" >'
                            + '<td>' + temp.productName + '</td><td>' + self.state.rate + '</td>'
                            + '<td>' + item.enqQuantity + '</td><td>' + self.state.total + '</td>'

                            + '<td  id="finalAmountcal" >' + self.state.finalAmount + '</td>'
                            + ' <td> ' + self.state.staffName1 + ' </td>'
                            + '<td  class="heightWidth" >' + self.state.description + '</td>'
                            + '<td  class="heightWidth" >' + self.state.productId + '</td>'
                            + '<td class="producttype">' + self.state.productType + '</td>'
                            + '<td><button id="delete">Delete</button></td>'
                            + '</tr>';

                          $("#tableHeadings").append(tab);
                          $("#tableHeadings").show();
                          $(".producttype").hide();

                          $("#advance").bind('keydown', function (event) {
                            if (event.keyCode === 13) {
                              event.preventDefault();
                              //  $("#saleinvoice").click();
                            }
                          });

                          $("#discount").bind('keydown', function (event) {
                            if (event.keyCode === 13) {
                              event.preventDefault();
                              //  $("#saleinvoice").click();
                            }
                          });



                          self.state.description = "";
                          self.state.rate = "";
                          self.state.quantity = "";
                          self.state.total = "";


                          self.state.finalAmount = "";
                          self.state.productId = "";


                          $('[name=productName]').val('');
                          $("#quantity").show();
                          $("#quantity1").show();
                          $('[name=staffName]').val('');
                          $("#total").show();
                          $("#total1_Input").show();
                          $("#total1").show();
                          $("#quantity1_Input").show();
                          self.setState({

                            description: '',
                            rate: '',
                            amount: '',
                            quantity: '',
                            total: '',


                            finalAmount: '',
                            productName: '',
                            productId: '',


                            totalitemqty: self.state.totalitemqty,
                            balance_amount: self.state.subtotal1,
                            subtotal1: self.state.subtotal1,
                            discount: 0,
                            advance: 0,
                            staffName1: '',

                          });

                          var numtoword = numberToWord(Number(self.state.subtotal1));
                          $("#numWords").text(Case.capital(numtoword));
                          $(".heightWidth").hide();

                          break;
                        }
                        break;
                        break;
                      }
                      else {
                        self.state.productName = temp.productName;
                        self.state.quantity = item.enqQuantity;
                        self.state.total = "";
                        self.state.finalAmount = "";
                        self.state.description = temp.description;
                        self.state.rate = temp.rate;


                        self.state.productType = temp.productType;
                        self.state.productQuantity = temp.quantity;
                        self.state.productId = temp.productId;
                        currentItemQuantity = temp.quantity;
                        currentItemLimitQuantity = temp.quantityLimit;

                        if (temp.productType == "service") {
                          $("#quantity").hide();
                          $("#quantity1").hide();
                          $("#quantity1_Input").hide();
                          $("#total").hide();
                          $("#total1").hide();
                          $("#total_Input").hide();
                          self.state.total = self.state.rate;
                          self.state.quantity1 = "-";
                          self.setState({
                            quantity1: self.state.quantity1,
                          })
                        }
                        self.setState({
                          productName: temp.productName,
                          quantity: item.enqQuantity

                        })
                        self.state.total = Math.round(Number(self.state.rate) * Number(self.state.quantity));
                        self.state.finalAmount = Math.round(Number(self.state.total));

                        self.setState({
                          total: self.state.total,
                          finalAmount: self.state.finalAmount,

                        });

                        if ((self.state.staffName1.length != 0) && (self.state.productName != 0)) {

                          var currentproductvalue;

                          self.AddToCartQuantityUpdate();
                          self.selectProduct();



                          //var tab = '<thead><tr class="headcolor" style="color: white; background-color: #486885; font-size: 12px;">  <th>ProductName</th><th>Size</th><th>Rate</th><th>Amount</th><th>Quantity</th><th>Total</th><th>CGST (%)</th><th>SGST (%)</th><th>IGST (%)</th><th>Final Amount</th></tr></thead>';
                          self.state.subtotal1 = Math.round(Number(self.state.subtotal1) + (Number(self.state.finalAmount)));
                          if (self.state.quantity1 != "-") {
                            self.state.totalitemqty = Math.round(Number(self.state.totalitemqty) + Number(self.state.quantity));
                          }



                          var payament_status_details;



                          var tab = '<tr style={{backgroundColor: "white",fontColor:"black",fontWeight:"bold"}} id="tabletextcol" >'
                            + '<td>' + self.state.productName + '</td><td>' + self.state.rate + '</td>'
                            + '<td>' + self.state.quantity1 + '</td><td>' + self.state.total + '</td>'


                            + '<td  id="finalAmountcal" >' + self.state.finalAmount + '</td>'
                            + ' <td> ' + self.state.staffName1 + ' </td>'
                            + '<td  class="heightWidth" >' + self.state.description + '</td>'
                            + '<td  class="heightWidth" >' + self.state.productId + '</td>'
                            + '<td class="producttype">' + self.state.productType + '</td>'
                            + '<td><button id="delete">Delete</button></td>'
                            + '</tr>';

                          $("#tableHeadings").append(tab);
                          $("#tableHeadings").show();
                          $(".producttype").hide();

                          $("#advance").bind('keydown', function (event) {
                            if (event.keyCode === 13) {
                              event.preventDefault();
                              //  $("#saleinvoice").click();
                            }
                          });

                          $("#discount").bind('keydown', function (event) {
                            if (event.keyCode === 13) {
                              event.preventDefault();
                              //  $("#saleinvoice").click();
                            }
                          });



                          self.state.description = "";
                          self.state.rate = "";
                          self.state.quantity = "";
                          self.state.total = "";


                          self.state.finalAmount = "";
                          self.state.productId = "";


                          $('[name=productName]').val('');
                          $("#quantity").show();
                          $("#quantity1").show();
                          $('[name=staffName]').val('');
                          $("#total").show();
                          $("#total1_Input").show();
                          $("#total1").show();
                          $("#quantity1_Input").show();
                          self.setState({

                            description: '',
                            rate: '',
                            amount: '',
                            quantity: '',
                            total: '',


                            finalAmount: '',
                            productName: '',
                            productId: '',


                            totalitemqty: self.state.totalitemqty,
                            balance_amount: self.state.subtotal1,
                            subtotal1: self.state.subtotal1,
                            discount: 0,
                            advance: 0,
                            staffName1: '',

                          });

                          var numtoword = numberToWord(Number(self.state.subtotal1));
                          $("#numWords").text(Case.capital(numtoword));
                          $(".heightWidth").hide();


                        }
                        break;
                      }


                      break;
                    }
                    else {
                   
                      if (temp.productType == "product") {
                        self.state.productName = temp.productName;
                        self.state.quantity = temp.quantity;
                        self.state.total = "";
                        self.state.finalAmount = "";
                        self.state.description = temp.description;
                        self.state.rate = temp.rate;
                        self.state.productType = temp.productType;
                        self.state.productQuantity = temp.quantity;
                        self.state.productId = temp.productId;
                        currentItemQuantity = temp.quantity;
                        currentItemLimitQuantity = temp.quantityLimit;
                        self.setState({
                          productName: temp.productName,
                          quantity: temp.quantity

                        })

                     

                        self.state.enqtableQuan = Math.round(Number(item.enqQuantity) - Math.round(Number(temp.quantity)));
                        self.setState({
                          enqtableQuan: self.state.enqtableQuan,
                        })

                        var tab1 = '<tr style={{backgroundColor: "white",fontColor:"black",fontWeight:"bold"}} id="tabletextcol" >'
                          + '<td>' + temp.productName + '</td>'
                          + '<td>' + self.state.enqtableQuan + '</td>'

                          + '<td><button id="delete">Delete</button></td>'
                          + '</tr>';
                        $("#tableHeadingsEnquiry").append(tab1);
                        $("#tableHeadingsEnquiry_Header").show();
                        $("#tableHeadingsEnquiry").show();
                        $(".producttype").hide();
                        break;
                      }
                      else {
                        self.state.productName = temp.productName;
                        self.state.quantity = temp.quantity;
                        self.state.total = "";
                        self.state.finalAmount = "";
                        self.state.description = temp.description;
                        self.state.rate = temp.rate;

                        self.state.productType = temp.productType;
                        self.state.productQuantity = temp.quantity;
                        self.state.productId = temp.productId;
                        self.state.enqtableQuan = 1;
                        currentItemQuantity = temp.quantity;
                        currentItemLimitQuantity = temp.quantityLimit;

                      
                      
                        self.state.enqtableQuan = Math.round(Number(item.enqQuantity) - Math.round(Number(temp.quantity)));
                        self.setState({
                          enqtableQuan: self.state.enqtableQuan,
                        })
                        var tab1 = '<tr style={{backgroundColor: "white",fontColor:"black",fontWeight:"bold"}} id="tabletextcol" >'
                          + '<td>' + temp.productName + '</td>'
                          + '<td>' + self.state.enqtableQuan + '</td>'

                          + '<td><button id="delete">Delete</button></td>'
                          + '</tr>';
                        $("#tableHeadingsEnquiry").append(tab1);
                        $("#tableHeadingsEnquiry_Header").show();
                        $("#tableHeadingsEnquiry").show();
                        $(".producttype").hide();
                        break;
                      }


                      break;
                    }
                    break;
                  }

                  break;
                }


              }

            })

          }
        }
        self.setState({
          orderNumber: Number(self.state.orderNumber) + 1,
          customerId: self.state.customerId,
          contactNo: self.state.contactNo,
          address: self.state.address,
          gstNo: self.state.gstNo,
          email: self.state.email,
          companyName: self.state.companyName,
          customerName: self.state.customerName,
          lastVisit: self.state.lastVisit,
          totalRevenue: self.state.totalRevenue,
          customerRewardPointDB: self.state.customerRewardPointDB,
          customerExpiryDateDB: self.state.customerExpiryDateDB,

        })
        self.redeemShowHide();
        break;
      }
    }

  }
  redeemShowHide() {
    var self = this;
    if ((self.state.customerRewardPointDB < self.state.minRedeemRewardPoint) || (self.state.date > self.state.customerExpiryDateDB) || (self.state.customerExpiryDateDB == null)) {

      $("#redeemPoint").hide();
      $("#redeemPoint1").hide();

      self.state.redeemPointToUse = 0;
      self.state.redeemAmountToUse = 0;
      self.setState({
        redeemPointToUse: self.state.redeemPointToUse,
        redeemAmountToUse: self.state.redeemAmountToUse,
      })

    }
    else {

      $("#redeemPoint").show();
      $("#redeemPoint1").show();
    }
  }
  handleProductDetails = (e) => {

    const name = e.name;
    const value = e.value;
    this.state.productName = value;

    testarray.push(this.state.productName);


    this.setState({
      [name]: value,
      selectedProductName: e,
      productNameValid: true
    });

    var self = this;


    for (var k = 0; k < saleRateArray.length; k++) {
      var temp = JSON.parse(saleRateArray[k]);

      if (temp.productName == self.state.productName) {
        if (temp.productType == "product") {
          if (temp.quantity != 0) {


            self.state.quantity = 1;
            self.state.total = "";
            self.state.finalAmount = "";

            self.state.description = temp.description;
            self.state.rate = temp.rate;
            self.state.productType = temp.productType;
            //   self.state.quantity = temp.quantity;
            self.state.productId = temp.productId;
            currentItemQuantity = temp.quantity;
            currentItemLimitQuantity = temp.quantityLimit;
            self.setState({
              description: temp.description,
              rate: temp.rate,
              quantity: "1",
              total: "",
              finalAmount: "",
              //     quantity: temp.quantity,
              productType: temp.productType,
              productId: temp.productId,

            })

            if (this.state.productType == "service") {
              $("#quantity").hide();
              $("#quantity1").hide();

              $("#total").hide();
              $("#total1").hide();
              self.state.total = self.state.rate;
              this.state.quantity = "-";
              this.setState({
                quantity: this.state.quantity,
              })
            } else {
              self.state.total = Math.round(Number(self.state.rate) * Number(self.state.quantity));
            }

            self.state.finalAmount = Math.round(Number(self.state.total));


            self.setState({
              total: self.state.total,
              finalAmount: self.state.finalAmount,
            });
            // alert(" handleProductDetails unit is pcs total", self.state.amount, self.state.total, self.state.finalAmount);

            break;

          } else {

            // Swal.fire({
            //   position: 'center',
            //   icon: 'warning',
            //   title: 'The Product ' + self.state.productName + ' Is Not In Stock',
            //   showConfirmButton: false,
            //   timer: 2000
            // })

            self.state.quantity = 1;

            self.setState({
              quantity: 1,
            });

            Swal.mixin({
              //input: 'text',
              confirmButtonText: 'Next &rarr;',
              showCancelButton: true,
              progressSteps: ['1', '2',]
            }).queue([
              {
                title: ' Product Name ',
                input: 'text',
                //html:self.state.productName,
                inputValue: self.state.productName,
                //input: 'text',
                //inputValue: inputValue,
                // html: '<input id="swal-input1" placeholder= self.state.productName class="swal2-input">',
                inputPlaceholder: self.state.productName,
              },
              {
                title: 'Quantity',
                input: 'number',
                inputValue: self.state.quantity,
              },
              /*        'Question 2',
                     'Question 3' */
            ]).then((result) => {
              if (result.value) {
                const answers = JSON.stringify(result.value)
                self.state.quantity = result.value[1];
                self.setState({
                  quantity: self.state.quantity,
                })

                self.AddToEnquiry();

                /* Swal.fire({
                 title: 'All done!',
                 html: `Your answers:<pre><code>${answers}</code></pre>`,
                 confirmButtonText: 'Soon Will Update!'
               
                }) */
                /* if (accept) {
                 this.AddToCart();
               
                } */
              }
            })

          }
        }
        else {
          self.state.quantity = 1;
          self.state.total = "";
          self.state.finalAmount = "";

          self.state.description = temp.description;
          self.state.rate = temp.rate;
          self.state.productType = temp.productType;
          //   self.state.quantity = temp.quantity;
          self.state.productId = temp.productId;
          currentItemQuantity = temp.quantity;
          currentItemLimitQuantity = temp.quantityLimit;
          self.setState({
            description: temp.description,
            rate: temp.rate,
            quantity: "1",
            total: "",
            finalAmount: "",
            //     quantity: temp.quantity,
            productType: temp.productType,
            productId: temp.productId,

          })

          if (this.state.productType == "service") {
            $("#quantity").hide();
            $("#quantity1").hide();

            $("#total").hide();
            $("#total1").hide();
            self.state.total = self.state.rate;
            this.state.quantity = "-";
            this.setState({
              quantity: this.state.quantity,
            })
          } else {
            self.state.total = Math.round(Number(self.state.rate) * Number(self.state.quantity));
          }

          self.state.finalAmount = Math.round(Number(self.state.total));


          self.setState({
            total: self.state.total,
            finalAmount: self.state.finalAmount,
          });
          // alert(" handleProductDetails unit is pcs total", self.state.amount, self.state.total, self.state.finalAmount);

          break;
        }

      }
    }

  }

  handlePaymentModeDetails = (e) => {
    const name = e.name;
    const value = e.value;
    this.state.paymentMode = value;

    this.setState({
      [name]: value,
      selectedPaymentMode: e,
      paymentModeValid: true
    });


  }

  EstimateInvoiceFunc() {
    var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var enquirytablelength = $('#tablecontentsenquiry tr').length;

    var self = this;
    if (this.state.payment_status == "UnPaid") {
      this.state.paymentMode = "-";
    }
    if (Number(this.state.subtotal1) >= Number(this.state.rewardAmount)) {
      if (self.state.customerExpiryDateDB == null) {
        var dateAdd = moment().add(self.state.expiryDuration, 'd').toDate();
        var expiryDate = dateAdd.getFullYear() + '-' + (dateAdd.getMonth() + 1) + '-' + dateAdd.getDate();
        self.state.customerRewardPointCalc = Math.round((Number(self.state.subtotal1) / Number(self.state.rewardAmount)) * Number(self.state.rewardPoint));


        self.state.customerRewardPoint1 = Math.round(Number(self.state.customerRewardPointCalc) + Number(self.state.customerRewardPointDB));
        self.setState({
          customerRewardPoint1: self.state.customerRewardPoint1,
        })
        if (Number(self.state.customerRewardPoint1) <= Number(self.state.maxRewardLimit)) {
          self.state.customerRewardPoint = Math.round(Number(self.state.customerRewardPointCalc) + Number(self.state.customerRewardPointDB));

          self.state.RewardPointLiability = self.state.customerRewardPoint;
          self.setState({

            customerRewardPoint: self.state.customerRewardPoint,
            RewardPointLiability: self.state.RewardPointLiability,
          })
        }
        else {
          self.state.customerRewardPoint = Number(self.state.maxRewardLimit);
          self.state.RewardPointLiability = self.state.customerRewardPoint;
          self.setState({

            customerRewardPoint: self.state.customerRewardPoint,
            RewardPointLiability: self.state.RewardPointLiability,
          })
        }

        self.state.expiryDate = expiryDate;
        self.setState({
          expiryDate: self.state.expiryDate,


        })
        console.log("CustomerRewardPoint for null expirydate:", self.state.customerRewardPoint);
        console.log("expiryDate for null expirydate:", self.state.expiryDate);
      }
      else if (self.state.date <= self.state.customerExpiryDateDB) {
        self.state.customerRewardPointCalc = Math.round((Number(self.state.subtotal1) / Number(self.state.rewardAmount)) * Number(self.state.rewardPoint));
        self.state.customerRewardPoint1 = Math.round(Number(self.state.customerRewardPointCalc) + (Number(self.state.customerRewardPointDB) - Number(self.state.redeemPointToUse)));
        self.state.expiryDate = self.state.customerExpiryDateDB;
        self.setState({
          customerRewardPoint1: self.state.customerRewardPoint1,
        })
        if (Number(self.state.customerRewardPoint1) <= Number(self.state.maxRewardLimit)) {
          self.state.customerRewardPoint = Math.round(Number(self.state.customerRewardPointCalc) + (Number(self.state.customerRewardPointDB) - Number(self.state.redeemPointToUse)));
          self.state.RewardPointLiability = Math.round(Number(self.state.customerRewardPointCalc) + (Number(self.state.customerRewardPointDB)));
          self.setState({

            customerRewardPoint: self.state.customerRewardPoint,
            RewardPointLiability: self.state.RewardPointLiability,
          })
        } else {
          self.state.customerRewardPoint = Number(self.state.maxRewardLimit);
          self.state.RewardPointLiability = self.state.customerRewardPoint;
          self.setState({

            customerRewardPoint: self.state.customerRewardPoint,
            RewardPointLiability: self.state.RewardPointLiability,
          })
        }
        self.setState({
          expiryDate: self.state.expiryDate,


        })
        console.log("CustomerRewardPoint for null expirydate:", self.state.customerRewardPoint);
        console.log("expiryDate for null expirydate:", self.state.expiryDate);
      }
      else if ((self.state.date) > (self.state.customerExpiryDateDB)) {
        //alert(Date(self.state.customerExpiryDateDB))
        var dateAdd1 = moment().add(self.state.expiryDuration, 'd').toDate();
        var expiryDate = dateAdd1.getFullYear() + '-' + (dateAdd1.getMonth() + 1) + '-' + dateAdd1.getDate();
        self.state.customerRewardPointCalc = Math.round((Number(self.state.subtotal1) / Number(self.state.rewardAmount)) * Number(self.state.rewardPoint));
        self.state.customerRewardPoint1 = Math.round(Number(self.state.customerRewardPointCalc));

        self.state.expiryDate = expiryDate;
        self.setState({
          customerRewardPoint1: self.state.customerRewardPoint1,
        })
        if (Number(self.state.customerRewardPoint1) <= Number(self.state.maxRewardLimit)) {
          self.state.customerRewardPoint = Math.round(Number(self.state.customerRewardPointCalc));
          self.state.RewardPointLiability = Math.round(Number(self.state.customerRewardPointCalc));
          self.setState({

            customerRewardPoint: self.state.customerRewardPoint,
            RewardPointLiability: self.state.RewardPointLiability,
          })
        } else {
          self.state.customerRewardPoint = Number(self.state.maxRewardLimit);
          self.state.RewardPointLiability = self.state.customerRewardPoint;
          self.setState({

            customerRewardPoint: self.state.customerRewardPoint,
            RewardPointLiability: self.state.RewardPointLiability,
          })
        }

        self.setState({
          expiryDate: self.state.expiryDate,

        })
        console.log("expirydate >:", this.state.expiryDate);
        console.log("CustomerRewardPoint for null expirydate:", self.state.customerRewardPoint);
        console.log("expiryDate for null expirydate:", self.state.expiryDate);
      }
    } else {
      self.state.customerRewardPoint = Math.round(Number(self.state.customerRewardPointDB));
      self.state.expiryDate = self.state.customerExpiryDateDB;
      self.setState({
        expiryDate: self.state.expiryDate,
        customerRewardPoint: self.state.customerRewardPoint,
      })
      console.log("CustomerRewardPoint for null expirydate:", self.state.customerRewardPoint);
      console.log("expiryDate for null expirydate:", self.state.expiryDate);
    }
    console.log("CustomerRewardPoint:", this.state.customerRewardPoint);
    console.log("expirydate:", this.state.expiryDate);
    var arrData = [];
    var enqarrData = [];
    staffData = [];
    var checkboxArray = [];
    var checkboxArray1 = [];
    $.each($("input[name='sms']:checked"), function () {
      checkboxArray.push($(this).val());
    });
    $.each($("input[name='emailoption']:checked"), function () {
      checkboxArray1.push($(this).val());
    });
    this.state.sms = checkboxArray.toString();
    this.state.emailoption = checkboxArray1.toString();
    this.setState({
      sms: this.state.sms,
      emailoption: this.state.emailoption,
      // message:this.state.message
    });

    // loop over each table row (tr)
    $("#tablecontents tr").each(function () {
      var currentRow = $(this);
      var productName = currentRow.find("td:eq(0)").text();
      var rate = (Math.round(currentRow.find("td:eq(1)").text() * 100) / 100).toFixed(2);
      var quantity = currentRow.find("td:eq(2)").text();
      var total = (Math.round(currentRow.find("td:eq(3)").text() * 100) / 100).toFixed(2);
      var staffId1 = currentRow.find("td:eq(4)").text();
      var description = currentRow.find("td:eq(5)").text();
      var productId = currentRow.find("td:eq(6)").text();
      var productType = currentRow.find("td:eq(7)").text();
      if (description == "") {
        description = '-';
      }

      arrData.push(productName + "@");
      arrData.push(rate + "@");
      arrData.push(quantity + "@");
      arrData.push(total + "@");
      arrData.push(description + "@");
      arrData.push(productId + "@");
      arrData.push(staffId1 + "@");
      arrData.push(productType + "@");

      staffData.push(staffId1);

    });
    if (enquirytablelength > 0) {
      $("#tablecontentsenquiry tr").each(function () {
        var currentRow = $(this);
        var enqproductName = currentRow.find("td:eq(0)").text();
        var enqquantity = currentRow.find("td:eq(1)").text();

        enqarrData.push(enqproductName + "@");
        enqarrData.push(enqquantity + "@");




      });

    }
    this.state.enquiryData = enqarrData.toString();

    this.setState({

      enquiryData: enqarrData.toString(),

    });
    this.state.invoiceData = arrData.toString();
    this.state.staffData1 = staffData.toString();



    this.setState({
      invoiceData: arrData.toString(),
      staffData1: staffData.toString(),
    });




    if ((this.state.customerName.length > 0)) {
      if ((this.state.invoiceData.trim().length > 1)) {

        if ((this.state.invoiceDate.trim().length > 1) && (this.state.dueDate.trim().length > 1)) {
          if ((this.state.paymentMode != "")) {
            $.ajax({
              type: 'POST',
              data: JSON.stringify({
                customerName: this.state.customerName,
                orderNumber: this.state.orderNumber,
                invoiceDate: this.state.invoiceDate,
                dueDate: this.state.dueDate,
                saleType: this.state.saleType,
                organizationName: companyName,
                invoiceData: this.state.invoiceData.toString(),
                enquiryData: this.state.enquiryData.toString(),
                staffData1: staffData.toString(),
                date: this.state.date,
                customerId: this.state.customerId,
                contactNo: this.state.contactNo,
                totalitemqty: this.state.totalitemqty,
                payment_status: this.state.payment_status,
                companyId: this.state.companyId,
                address: this.state.address,
                gstNo: this.state.gstNo,
                email: this.state.email,
                companyName: this.state.companyName,
                sms: this.state.sms,
                emailoption: this.state.emailoption,
                paymentMode: this.state.paymentMode,
                discount: (Math.round(this.state.discount * 100) / 100).toFixed(2),
                subtotal1: (Math.round(this.state.subtotal1 * 100) / 100).toFixed(2),
                balance_amount: (Math.round(this.state.balance_amount * 100) / 100).toFixed(2),
                advance: (Math.round(this.state.advance * 100) / 100).toFixed(2),
                customerRewardPoint: self.state.customerRewardPoint,
                customerExpiryDate: self.state.expiryDate,
                redeemPointToUse: self.state.redeemPointToUse,
                redeemAmountToUse: this.state.redeemAmountToUse,
                rewardPointLiability: this.state.RewardPointLiability,

                staffId: self.state.staffId,
                employeeName: self.state.employeeName,
                role: self.state.role,


              }),

              url: " http://15.206.129.105:8080/MerchandiseAPI/saleorder/addestimateorder",

              contentType: "application/json",
              dataType: 'json',
              async: false,
              success: function (data, textStatus, jqXHR) {



                if (data.invoiceResponseData == "Invoice_Failed") {

                  Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Invoice Failed Due To Insufficient Quantity',
                    showConfirmButton: false,
                    timer: 2000
                  })

                  self.ResponseCalculation(data);

                }
                if (data.invoiceResponseData == "Invoice_Success") {

                  var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Estimate order [' + data.invoiceNo + '] for amount Rs.' + self.state.subtotal1 + ' is Generated, Would you like to view the slip ? ',               // Message dialog
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Yes, view it!',
                    cancelButtonText: 'No, cancel it'
                    //   timer: 1500
                  }).then((result) => {
                    if (result.value) {
                      self.ViewFunc()

                      // For more information about handling dismissals please visit
                      // https://sweetalert2.github.io/#handling-dismissals
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Cancelled View of Estimate order [' + data.invoiceNo + '] ' ,
                        showConfirmButton: false,
                        timer: 2000,
                      })
                    }
                  })
                  //  self.state.invoiceNo = "";
                  self.state.orderNumber = "";
                  self.state.invoiceDate = "";
                  self.state.dueDate = "";
                  self.state.description = "";
                  self.state.rate = "";
                  self.state.quantity = "";
                  self.state.total = "";
                  self.state.productId = "";
                  self.state.finalAmount = "";
                  self.state.payment_status = "";
                  self.state.subtotal1 = 0;

                  self.state.totalitemqty = 0;
                  self.state.discount = 0;
                  self.state.advance = "";
                  self.state.formValid = false;
                  self.state.formValid1 = false;
                  self.state.redeemPointToUse = 0;
                  self.state.redeemAmountToUse = 0;
                  self.state.selectedProductName = "";
                  self.state.selectedCustomerName = "";
                  self.state.selectedPaymentMode = "";
                  self.state.lastVisit = "";
                  self.state.totalVisit = "";
                  self.state.totalRevenue = "";
                  self.state.customerRewardPointDB = "";
                  $("#tablecontents").empty();
                  $("#tableHeadings").hide();
                  $("#tableHeadingsEnquiry").hide();
                  $("#tableHeadingsEnquiry_Header").hide();
                  $('[name=saleType]').val('');
                  $('[name=productName]').val('');
                  $('#productName').html('');
                  $('[name=customerName]').val('');
                  $('#customerName').html('');
                  //  $('#customerName').html('');
                  var today = new Date();
                  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

                  self.setState({
                    customerName: '',
                    // invoiceNo: '',
                    orderNumber: '',
                    invoiceDate: date,
                    dueDate: date,
                    description: '',
                    rate: '',
                    quantity: '',
                    total: '',
                    finalAmount: '',
                    saleType: '',
                    productName: '',
                    productId: '',
                    payment_status: 'UnPaid',
                    subtotal1: 0,
                    totalitemqty: 0,
                    selectedProductName: '',
                    selectedCustomerName: '',
                    selectedPaymentMode: '',
                    lastVisit: '',
                    totalVisit: '',
                    totalRevenue: '',
                    customerRewardPointDB: '',
                    balance_amount: '',
                    advance: '',
                    discount: 0,
                    balance: '',
                    formValid: false,
                    selectedPaymentMode: '',
                    paymentMode: '',
                    staffName: '',
                    totalitemqty: 0,
                    redeemPointToUse: 0,
                    redeemAmountToUse: 0,

                  });
                  //    self.GetInvoiceNo();
                  self.SelectCustomer();
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
            if (this.state.paymentMode == "") {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Kindly Select PaymentMode',
                showConfirmButton: false,
                timer: 2000
              })
            }
          }
        } else {

          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Please Select Due Dates',
            showConfirmButton: false,
            timer: 2000
          })
        }

      } else {


        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No items in Cart',
          showConfirmButton: false,
          timer: 2000
        })
      }

    } else {

      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Please Select Customer Name',
        showConfirmButton: false,
        timer: 2000
      })
    }
    var numtoword = numberToWord(Number(self.state.subtotal1));
    $("#numWords").text(Case.capital(numtoword));

  }

  AddToEnquiry() {
    //  alert("enquiry");
    var self = this;


    var tab = '<tr style={{backgroundColor: "white",fontColor:"black",fontWeight:"bold"}} id="tabletextcol" >'
      + '<td>' + self.state.productName + '</td>'
      + '<td>' + self.state.quantity + '</td>'

      + '<td><button id="delete">Delete</button></td>'
      + '</tr>';
    $("#tableHeadingsEnquiry").append(tab);
    $("#tableHeadingsEnquiry_Header").show();
    $("#tableHeadingsEnquiry").show();
    $(".producttype").hide();

    self.state.quantity = "";
    self.state.productName = "";
    self.setState({
      quantity: '',
      productName: '',
    })

  }

  ResponseCalculation(data) {

    var self = this;
    $("#tablecontents").empty();


    var tab = "";



    self.state.subtotal1 = 0;
    self.state.totalitemqty = 0;


    $.each(data.responseListdata, function (i, item) {

      //CALCULATION FOR sale ROW 


      if (item.productType == "service") {
        self.state.total = item.rate;  //near quantity

      } else {
        self.state.total = Math.round(Number(item.rate) * Number(item.quantity));
      }


      self.setState({
        total: self.state.total,
      });


      //CALCULATION FOR FINAL AMOUNTS
      self.state.subtotal1 = Math.round(Number(self.state.subtotal1) + Number(self.state.total));
      if (item.quantity != "-") {
        self.state.totalitemqty = Math.round(Number(self.state.totalitemqty) + Number(item.quantity));
      }



      self.setState({

        totalitemqty: self.state.totalitemqty,
        balance_amount: self.state.subtotal1,
        discount: 0,
        advance: 0,

      });


      tab += '<tr style={{backgroundColor: "white",fontColor:"black",fontWeight:"bold"}} id="tabletextcol" >'
        + '<td>' + item.productName + '</td><td>' + item.rate + '</td><td>' + item.quantity + '</td>'
        + '<td>' + self.state.total + '</td>'
        + '<td >' + item.staffName + '</td>'
        + '<td  class="heightWidth" >' + item.description + '</td>'
        + '<td  class="heightWidth" >' + item.productId + '</td>'
        + '<td class="producttype">' + item.productType + '</td>'
        + '<td><button id="delete">Delete</button></td></tr>';



    });

    // advancebalance_calc = self.state.subtotal1;

    var numtoword = numberToWord(Number(self.state.subtotal1));
    $("#numWords").text(Case.capital(numtoword));
    $(".heightWidth").hide();


    $("#tableHeadings").append(tab);
    $(".heightWidth").hide();
    $(".producttype").hide();

    var tabInfo = "";

    $("#insufficienttable").empty();
    $.each(data.responseListdataInfo, function (i, item) {

      tabInfo += '<tr style={{backgroundColor: "white",fontColor:"black",fontWeight:"bold"}} id="tabletextcol" >'
        + '<td>' + item.productName + '</td><td> - ' + item.quantity + '</td></tr>';


    })

    $("#insufficienttable").append(tabInfo);
    $("#insufficientdiv").show();


  }


  ViewFunc() {

    ReactDOM.render(
      <Router >
        <div>
          <Route path="/" component={EstimateList} />
        </div>
      </Router>, document.getElementById('contentRender'));
  }
  NoAction() {

    ReactDOM.render(
      <Router >
        <div>
          <Route path="/" component={Estimate1} />
        </div>
      </Router>, document.getElementById('contentRender'));
  }
  emptyFunc() {
    var self = this;
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    //   self.state.invoiceNo = "";
    self.state.orderNumber = "";
    self.state.totalVisit = "";
    self.state.lastVisit = "";
    self.state.totalRevenue = "";
    self.state.description = "";
    self.state.rate = "";
    self.state.quantity = 1;
    self.state.total = "";

    self.state.finalAmount = "";
    self.state.payment_status = "Unpaid";
    self.state.subtotal1 = 0;

    self.state.totalitemqty = 0;
    self.state.discount = 0;
    self.state.advance = "";

    self.state.formValid = false;
    self.state.formValid1 = false;
    self.state.productName = "";
    $("#tablecontents").empty();
    $("#tableHeadings").hide();
    $("#tableHeadingsEnquiry").hide();
    $("#tableHeadingsEnquiry_Header").hide();

    self.setState({

      //  invoiceNo: '',
      orderNumber: '',
      totalVisit: '',
      invoiceDate: date,
      dueDate: date,
      description: '',
      rate: '',
      quantity: 1,
      total: '',

      finalAmount: '',
      lastVisit: '',
      totalRevenue: '',

      productName: '',
      totalqty: '',
      subtotal1: 0,

      totalitemqty: 0,

      balance_amount: '',
      advance: '',
      discount: 0,
      balance: '',
      saleSale: '',
      purchaseSale: '',
      payment_status: 'UnPaid',
      formValid: false,
      formValid1: false,
      paymentMode: '',
      selectedPaymentMode: '',
      staffName: '',


    });
    var numtoword = numberToWord(Number(self.state.subtotal1));
    $("#numWords").text(Case.capital(numtoword));

  }
  selectStaff() {
    var staffName;
    var self = this;
    window.scrollTo(0, 0);
    var options2 = [];
    var EmpList = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('EmpList'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    staffName += '<option  value="" disabled selected hidden>EmployeeName</option>';

    $.each(EmpList, function (i, item) {
      staffName += '<option value="' + item.staffName + '">' + item.staffName + '</option>'
    });
    $("#staffName").append(staffName);

  }

  DeleteButton() {


    var self = this;
    $("#tableHeadingsEnquiry").on('click', "#delete", function () {
      var currentRow = $(this).closest("tr");
      currentRow.remove();

    });
    $("#tableHeadings").on('click', "#delete", function () {

      var currentRow = $(this).closest("tr");

      var productName_item_qty_rowcell = currentRow.find("td:eq(0)").html();
      var rate_item_qty_rowcell = currentRow.find("td:eq(1)").html(); // get current row 2nd table cell TD value
      var total_item_qty_rowcell = currentRow.find("td:eq(2)").html(); // get current row 2nd table cell TD value

      var subtotalvaluedecrement = currentRow.find("td:eq(3)").html(); // get current row 2nd table cell TD value



      self.DeleteQuantityUpdate(productName_item_qty_rowcell, total_item_qty_rowcell);


      self.state.subtotal1 = Math.round(Number(self.state.subtotal1) - Number(subtotalvaluedecrement));

      if (total_item_qty_rowcell != "-") {
        self.state.totalitemqty = Math.round(Number(self.state.totalitemqty) - Number(total_item_qty_rowcell));
      }

      self.state.redeemAmountToUse = 0;
      self.state.redeemPointToUse = 0;

      self.setState({
        subtotal1: self.state.subtotal1,
        payment_status: "Unpaid",
        totalitemqty: self.state.totalitemqty,
        advance: 0,
        discount: 0,
        balance_amount: self.state.subtotal1,
        redeemAmountToUse: 0,
        redeemPointToUse: 0,


      });


      currentRow.remove();
      var subtotal1 = self.state.subtotal1;

      if (subtotal1 == 0) {
        $("#tableHeadings").hide();
      }
      var numtoword = numberToWord(Number(self.state.subtotal1));
      $("#numWords").text(Case.capital(numtoword));



    });
  }

  AddToCart() {
    var self = this;

    if ((this.state.staffName.length != 0) && (this.state.productName != 0)) {
      var currentproductvalue;

      this.AddToCartQuantityUpdate();
      self.selectProduct();
      self.state.redeemAmountToUse = 0;
      self.state.redeemPointToUse = 0;

      self.setState({

        redeemPointToUse: self.state.redeemPointToUse,
        redeemAmountToUse: self.state.redeemAmountToUse,
      })
      //var tab = '<thead><tr class="headcolor" style="color: white; background-color: #486885; font-size: 12px;">  <th>ProductName</th><th>Size</th><th>Rate</th><th>Amount</th><th>Quantity</th><th>Total</th><th>CGST (%)</th><th>SGST (%)</th><th>IGST (%)</th><th>Final Amount</th></tr></thead>';
      this.state.subtotal1 = Math.round(Number(this.state.subtotal1) + Number(this.state.finalAmount));

      if (this.state.quantity != "-") {
        this.state.totalitemqty = Math.round(Number(this.state.totalitemqty) + Number(this.state.quantity));
      }
      var payament_status_details;



      var tab = '<tr style={{backgroundColor: "white",fontColor:"black",fontWeight:"bold"}} id="tabletextcol" >'
        + '<td>' + self.state.productName + '</td><td>' + self.state.rate + '</td>'
        + '<td>' + self.state.quantity + '</td><td>' + self.state.total + '</td>'
        + '<td >' + self.state.staffName + '</td>'
        + '<td  class="heightWidth" >' + self.state.description + '</td>'
        + '<td  class="heightWidth" >' + self.state.productId + '</td>'
        + '<td  class="heightWidth" >' + self.state.productType + '</td>'
        + '<td><button id="delete">Delete</button></td></tr>';

      $("#tableHeadings").append(tab);
      $("#tableHeadings").show();

      $("#advance").bind('keydown', function (event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          //  $("#saleinvoice").click();
        }
      });

      $("#discount").bind('keydown', function (event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          //  $("#saleinvoice").click();
        }
      });

      self.state.description = "";
      self.state.rate = "";
      self.state.quantity = "";
      self.state.total = "";
      self.state.finalAmount = "";
      self.state.productId = "";
      $('[name=staffName]').val('');
      $('[name=productName]').val('');
      $("#quantity").show();
      $("#quantity1").show();
      // self.state.selectedProductName= '',
      this.state.staffName = "";
      $("#total").show();
      $("#total1").show();

      self.setState({
        description: '',
        rate: '',
        quantity: '',
        total: '',
        finalAmount: '',
        productName: '',
        productId: '',
        totalitemqty: this.state.totalitemqty,
        balance_amount: this.state.subtotal1,
        staffName:'',
        discount: 0,
        advance: 0,
        staffName: '',

      });

      var numtoword = numberToWord(Number(this.state.subtotal1));
      $("#numWords").text(Case.capital(numtoword));
      $(".heightWidth").hide();

    } else {

      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Select Product,EmployeeName and Make sure rate is specified',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }

  AddToCartQuantityUpdate() {

    var self = this;

    for (var k = 0; k < saleRateArray.length; k++) {
      var temp = JSON.parse(saleRateArray[k]);

      if (temp.productName == self.state.productName) {

        var productName = temp.productName;
        var rate = temp.rate;
        var description = temp.description;


        var productType = temp.productType;
        //  var quantity= temp.quantity;

        var quantity = Number(temp.quantity) - Number(self.state.quantity);


        var productId = temp.productId;
        var quantityLimit = temp.quantityLimit;


        saleRateArray.splice(k, 1);

        //INSERT NEW UPDATED QUANTITY INTO ARRAY
        var feed = JSON.stringify({
          productName: productName,
          rate: rate,
          description: description,

          productType: productType,
          quantity: quantity,
          quantityLimit: quantityLimit,
          productId: productId


        });
        saleRateArray.push(feed);

        if (Number(quantity) <= Number(quantityLimit)) {


          toaster.notify(<div style={{ color: "Red" }}>Stock Below Limit - {this.state.productName}</div>, {
            position: "top", // top-left, top, top-right, bottom-left, bottom, bottom-right
            duration: null, // This notification will not automatically close
          });

        }
        break;
      }

    }

  }


  DeleteQuantityUpdate(productName_item_qty_rowcell, total_item_qty_rowcell) {
    for (var k = 0; k < saleRateArray.length; k++) {
      var temp = JSON.parse(saleRateArray[k]);

      if (temp.productName == productName_item_qty_rowcell) {

        var productName = temp.productName;
        var rate = temp.rate;
        var description = temp.description;



        var productType = temp.productType;
        //  var quantity= temp.quantity;
        var quantity = Number(temp.quantity) + Number(total_item_qty_rowcell);
        var productId = temp.productId;
        var quantityLimit = temp.quantityLimit;


        saleRateArray.splice(k, 1);

        //INSERT NEW UPDATED QUANTITY INTO ARRAY
        var feed = JSON.stringify({
          productName: productName,
          rate: rate,
          description: description,

          productType: productType,
          quantity: quantity,
          quantityLimit: quantityLimit,
          productId: productId
        });
        saleRateArray.push(feed);
        break;
      }

    }

  }

  cancelFunc() {

    //EMPTY THE STATES
    this.state.customerName = "";
    this.state.selectedCustomerName = "";
    this.state.orderNumber = "";
    this.state.totalVisit = "";
    this.state.lastVisit = "";
    this.state.totalRevenue = "";
    this.state.invoiceDate = this.state.date;  //current date
    this.state.dueDate = this.state.date; //current date
    this.state.productName = "";
    this.state.selectedProductName = "";
    this.state.description = "";
    this.state.rate = "";
    this.state.quantity = 1;
    this.state.total = "";

    this.state.finalAmount = "";
    staffData = [];
    //EMPTY THE CART
    $("#tableHeadings").hide();
    $("#tablecontents").empty();


    this.state.subtotal1 = 0;
    this.state.advance = 0;
    this.state.discount = 0;
    this.state.balance_amount = 0;
    this.state.payment_status = "UnPaid";
    this.state.staffName = "";
    this.state.selectedstaffName = "";
    //this.state.options2=[];
    this.state.paymentMode = "";
    this.state.selectedPaymentMode = "";
    this.state.redeemPointToUse = 0;
    this.state.redeemAmountToUse = 0;

    this.setState({

      customerName: this.state.customerName,
      selectedCustomerName: this.state.selectedCustomerName,
      orderNumber: this.state.orderNumber,
      totalVisit: this.state.totalVisit,
      lastVisit: this.state.lastVisit,
      totalRevenue: this.state.totalRevenue,
      invoiceDate: this.state.invoiceDate,//current date
      dueDate: this.state.dueDate,//current date
      productName: this.state.productName,
      selectedProductName: this.state.selectedProductName,
      description: this.state.description,
      rate: this.state.rate,
      quantity: this.state.quantity = 1,
      total: this.state.total,

      finalAmount: this.state.finalAmount,
      redeemAmountToUse: this.state.redeemAmountToUse,
      redeemPointToUse: this.state.redeemPointToUse,



      subtotal1: this.state.subtotal1,
      advance: this.state.advance,
      discount: this.state.discount,
      balance_amount: this.state.balance_amount,
      payment_status: this.state.payment_status,
      staffName: this.state.staffName,
      selectedstaffName: this.state.selectedstaffName,
      //this.state.options2=[];
      paymentMode: this.state.paymentMode,
      selectedPaymentMode: this.state.selectedPaymentMode,






    })

  }
  ClearFunc() {
    var dirtyValue = "false";

    var finalRowCount = $('#tableHeadings tbody tr').length;

    if ((this.state.customerName.length == 0) && this.state.orderNumber.length == 0 && (finalRowCount == 0)) {
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

  CancelFunc() {

    //EMPTY THE STATES
    this.state.customerName = "";
    this.state.selectedCustomerName = "";
    this.state.orderNumber = "";
    this.state.totalVisit = "";
    this.state.lastVisit = "";
    this.state.totalRevenue = "";
    this.state.invoiceDate = this.state.date;  //current date
    this.state.dueDate = this.state.date; //current date
    this.state.productName = "";
    this.state.selectedProductName = "";
    this.state.description = "";
    this.state.rate = "";
    this.state.quantity = 1;
    this.state.total = "";

    this.state.finalAmount = "";
    staffData = [];
    //EMPTY THE CART
    $("#tableHeadings").hide();
    $("#tablecontents").empty();
    $("#numWords").val('');
    var numinwords=$("#numwords");
    numinwords.val("");
    $("#numWords").hide();
    //EMPTY THE FINAL DATA

    this.state.subtotal1 = 0;
    this.state.advance = 0;
    this.state.discount = 0;
    this.state.balance_amount = 0;
    this.state.payment_status = "UnPaid";
    this.state.staffName = "";
    this.state.selectedstaffName = "";
    //this.state.options2=[];
    this.state.paymentMode = "";
    this.state.selectedPaymentMode = "";
    this.state.redeemPointToUse = 0;
    this.state.redeemAmountToUse = 0;

    this.setState({

      customerName: this.state.customerName,
      selectedCustomerName: this.state.selectedCustomerName,
      orderNumber: this.state.orderNumber,
      totalVisit: this.state.totalVisit,
      lastVisit: this.state.lastVisit,
      totalRevenue: this.state.totalRevenue,
      invoiceDate: this.state.invoiceDate,//current date
      dueDate: this.state.dueDate,//current date
      productName: this.state.productName,
      selectedProductName: this.state.selectedProductName,
      description: this.state.description,
      rate: this.state.rate,
      quantity: this.state.quantity = 1,
      total: this.state.total,
   
      finalAmount: this.state.finalAmount,
      redeemAmountToUse: this.state.redeemAmountToUse,
      redeemPointToUse: this.state.redeemPointToUse,

      subtotal1: this.state.subtotal1,
      advance: this.state.advance,
      discount: this.state.discount,
      balance_amount: this.state.balance_amount,
      payment_status: this.state.payment_status,
      staffName: this.state.staffName,
      selectedstaffName: this.state.selectedstaffName,
      //this.state.options2=[];
      paymentMode: this.state.paymentMode,
      selectedPaymentMode: this.state.selectedPaymentMode,






    })



  }

  BackbtnFunc() {

    var finalRowCount = $('#tableHeadings tbody tr').length;

    if ((this.state.customerName.length == 0) && this.state.orderNumber.length == 0 &&
      (finalRowCount == 0)) {
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


  clearFunc() {
    var self = this;
    self.state.modalCustomerName = "";
    self.state.modalContactNo = "";

    self.setState({
      modalCustomerName: self.state.modalCustomerName,
      modalContactNo: self.state.modalContactNo,
    })

  }

  ClearCustomerFunc() {
    var self = this;
    self.state.modalCustomerName = "";
    self.state.modalContactNo = "";

    self.setState({
      modalCustomerName: self.state.modalCustomerName,
      modalContactNo: self.state.modalContactNo,
    })

  }



  closeFunc() {

    var self = this;

    self.state.modalCustomerNameValid = false;
    self.state.modalContactNoValid = false;
    self.state.modalCustomerName = "";
    self.state.modalContactNo = "";

    self.setState({

      modalCustomerNameValid: self.state.modalCustomerNameValid,
      modalContactNoValid: self.state.modalContactNoValid,
      modalCustomerName: self.state.modalCustomerName,
      modalContactNo: self.state.modalContactNo,


    })


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
          <div class="card-header" style={{ backgroundColor: "white" }}>
            <h4 style={{ fontWeight: "300", color: "black", fontSize: "30px" }}>Estimate Invoice</h4>
            <hr></hr>
          </div>
          <div>
            <div class="card-body">
              <form class="form-horizontal form-bordered">
                <div class="form-group">
                  <label class="control-label col-sm-2" for="customerName">Customer Name</label>
                  <div class="col-sm-10">
                    {/* <select id="customerName" className="form-control" onChange={this.handleCustomerDetails} name="customerName"
                      style={{ marginBottom: "15px" }} >

                    </select>   */}

                    <SelectSearch options={this.state.options1} value={this.state.selectedCustomerName} onChange={(e) => this.handleCustomerDetails(e)} name="customerName" placeholder="Select Customer " />


                  </div>
                  <label class="control-label col-sm-2" for="customerName"></label>

                  <div class="text-center" class="col-sm-10">

                    <a href="#myModal" data-toggle="modal" data-target="#myModal" >
                      <span
                        style={{
                          color: "blue",
                        }}>  +Add Customer</span>    </a></div>
                </div>


                <div class="form-group">
                  <label class="control-label col-sm-2" for="orderNumber">Order Number</label>
                  <div class="col-sm-10">
                    <input type="text" readOnly class="form-control" value={this.state.orderNumber} onChange={this.handleUserInput} name="orderNumber" id="orderNumber" />
                  </div>
                </div>
                <div class="form-group">

                  <label class="control-label col-sm-2">Invoice Date</label>
                  <div class="col-sm-4">
                    <input type="text" class="form-control" value={this.state.invoiceDate} id="invoiceDate" name="invoiceDate"
                      onChange={this.handleUserInput} />
                  </div>
                  <label class="control-label col-sm-2">Due Date</label>
                  <div class="col-sm-4">
                    <input type="text" class="form-control" value={this.state.dueDate} id="dueDate" name="dueDate"
                      onChange={this.handleUserInput} />
                  </div>
                </div>

                <div class="form-group">
                  <label class="control-label selectpicker col-sm-2" for="productName">Product</label>
                  <div class="col-sm-4"  >
                    <SelectSearch options={this.state.options} value={this.state.selectedProductName}
                      onChange={(e) => this.handleProductDetails(e)} name="productName" placeholder="Select Product " />

                    <div class="text-center" class="col-sm-4">
                      <a href="#myModal1" data-toggle="modal" data-target="#myModal1" >
                        <span
                          style={{
                            color: "blue"
                          }}> +Add_Product</span>    </a>
                    </div>
                  </div>


                  <label class="control-label col-sm-2" for="description">Description</label>
                  <div class="col-sm-4">
                    <textarea type="text" class="form-control" value={this.state.description} onChange={this.handleUserInputDescription} name="description" id="description" ></textarea>
                  </div>

                </div>
                <hr></hr>

                <div class="table-responsive">
                  <table class="table" style={{ marginBottom: "0px" }}>
                    <thead>
                      <tr>
                        <th>Reward Points</th>
                        <th>Total Visit</th>
                        <th>Last Visit</th>
                        <th>Total Revenue(Rs)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <input type="text" readOnly class="form-control"
                            value={this.state.customerRewardPointDB}
                            name="customerRewardPoint " id="customerRewardPoint " />
                        </td>
                        <td>
                          <input type="text" readOnly class="form-control"
                            value={this.state.orderNumber}
                            name="totalVisit " id="totalVisit " />
                        </td>
                        <td>
                          <input type="text" readOnly class="form-control"
                            value={this.state.lastVisit}
                            name="lastVisit " id="lastVisit " />
                        </td>
                        <td>
                          <input type="text" readOnly class="form-control"
                            value={this.state.totalRevenue}
                            name="totalRevenue " id="totalRevenue " />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Rate</th>
                        <th id="quantity1">Quantity</th>
                        <th id="total1">Total</th>
                        <th>ServiceBy</th>
                        <th></th>

                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><input class="col-sm-3" type="text" min="1" class="form-control" value={this.state.rate} onChange={this.handleUserHeightWidth} name="rate" id="rate" />
                        </td>
                        <td><input type="text" min="1" class="form-control" value={this.state.quantity} onChange={this.handleUserQuantity} name="quantity" id="quantity" />
                          <span id="quantityalertmsg" style={{ color: "red" }}></span>
                        </td>
                        <td><input readOnly type="text" class="form-control" value={this.state.total} onChange={this.handleUserHeightWidth} name="total" id="total" />
                        </td>
                        <td>  <select id="staffName" className="form-control" onChange={this.handleUserInput} name="staffName" required>
                        </select></td>
                        <td> <button type="button" onClick={() => this.AddToCart()} style={{ marginRight: "5px" }} class="btn btn-primary pull-right">AddToCart</button> <span></span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <hr></hr>
                <div id="insufficientdiv">
                  <span>Insufficient Quantity For The Products</span>
                  <table id="insufficienttable">
                  </table>
                  <span style={{ color: "red" }}>**Cart Is Updated With Available Quantity </span>
                </div>

                <div id="tableOverflow">
                  <table class="table" id="tableHeadings">
                    <thead>
                      <tr>
                        <th>ProductName</th>
                        <th>Rate</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>ServiceBy</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody id="tablecontents" style={{ backgroundColor: "white" }}></tbody>
                  </table>
                </div>
                {/* section 2.1 enquiry table for selected products */}
                <h4 id="tableHeadingsEnquiry_Header">Enquiry Products</h4>
                <div id="tableOverflow" style={{ width: "max-content", backgroundColor: "darkgray" }}>
                  <table class="table" id="tableHeadingsEnquiry">
                    <thead>
                      <tr>
                        <th>ProductName</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody id="tablecontentsenquiry" style={{ backgroundColor: "white" }}></tbody>
                  </table>
                </div>
                <hr></hr>
                <div class="form-group">

                  <div class="col-sm-6">
                    <p class="lead">Total Qty: {this.state.totalitemqty} <span name="totalitemqty" id="totalitemqty"></span></p>
                    <p class="lead">Amount In Words:   <span id="numWords"></span>Rupees Only</p>


                  </div>
                  <div class="col-sm-6">
                    <div class="table-responsive">
                      <table class="table">
                        <tbody>
                          <tr><th style={{ width: "50%" }}>Subtotal:</th>
                            <td><input name="subtotal" readOnly type="text" value={this.state.subtotal1} id="subtotal" onChange={this.subtotalcalculationFunc} class="form-control" />{/* ₹ <span id="subtotal"></span> */}</td>
                            <input type="hidden" name="subtotal1" id="subtotal1" />  </tr>
                          <tr id="redeemPoint"><th style={{ width: "50%" }}>RedeemPoint:</th>
                            <td><input name="redeemPointToUse" onChange={this.handleMinRewardRedeemPointCalc} type="number" value={this.state.redeemPointToUse} id="redeemPointToUse" class="form-control" />{/* ₹ <span id="subtotal"></span> */}</td>
                            <input type="hidden" name="redeemPointToUse" id="redeemPointToUse" /> </tr>
                          <tr id="redeemPoint1"><th style={{ width: "50%" }}>RedeemAmount(Rs):</th>
                            <td><input name="redeemAmountToUse" readOnly type="number" value={this.state.redeemAmountToUse} id="redeemAmountToUse" class="form-control" />{/* ₹ <span id="subtotal"></span> */}</td>
                            <input type="hidden" name="redeemAmountToUse" id="redeemAmountToUse" /> </tr>



                          <tr><th>Advance:</th>
                            <td>
                              <input name="advance" type="text" id="advance" onkeyup="final_total();" value={this.state.advance} onChange={this.AdvanceCalc} class="form-control advance" /></td>
                          </tr>
                          <tr><th>Discount(Rs):</th><td>
                            <input name="discount" type="text" id="discount" onkeyup="final_total();" value={this.state.discount} onChange={this.DiscountCalc} class="form-control discount" /></td>
                          </tr>
                          <tr> <th>Balance Amount:</th>
                            <td name="balance" class="grand_total" >₹  {this.state.balance_amount} <span id="total"></span></td>
                          </tr>
                          <tr> <th>Payment Status:</th>
                            <td name="payment_status" class="grand_total" >₹  {this.state.payment_status} <span id="payment_status"></span></td>
                          </tr>
                          <tr id="paymentmodetd"><th>Payment Mode</th>
                            <td >
                              <SelectSearch options={this.state.paymentoptions} value={this.state.selectedPaymentMode}
                                onChange={(e) => this.handlePaymentModeDetails(e)} name="paymentMode" placeholder="Select Payment Mode " />
                            </td>
                          </tr>

                          <tr > <th></th>
                            <td> <input type="checkbox" class="CheckBoxClass" name="sms" value="sms" onChange={this.handleUserInput} id="defaultUnchecked" />
                              <label class="custom-control-label" for="defaultUnchecked"> SMS</label>
                            </td>
                          </tr>
                          <tr >  <th></th>
                            <td><input type="checkbox" class="CheckBoxClass" name="emailoption" onChange={this.handleUserInput} value="emailoption" id="defaultUnchecked" />
                              <label class="custom-control-label" for="defaultUnchecked"> Email</label></td>
                          </tr>
                          <tr><th></th>
                            <td>
                              <button type="button" id="estimateInvoice" onClick={() => this.EstimateInvoiceFunc()} style={{ marginRight: "5px" }} class="btn btn-primary pull-right">EstimateInvoice</button> <span></span>
                            </td>
                            <td style={{ borderTop: "none", width: "92px" }}> <button onClick={() => this.ClearFunc()} type="button" /* style={{ marginRight: "5px" }}*/ class="btn btn-primary ">Cancel</button>
                              </td>
                              <td style={{ borderTop: "none" }}> <button onClick={() => this.CancelFunc()} type="button" style={{ marginRight: "5px" }} class="btn btn-primary ">Clear</button> <span></span>
                              </td>

                          </tr>

                        </tbody>
                      </table></div>

                  </div>
                </div>
              </form>
            </div>
          </div></div>
        <div style={{ position: " ", zIndex: "0" }}>
          <div class="modal fade" id="myModal"  >
            <div class="modal-dialog">

              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title" style={{ align: "center", display: "contents" }}>Add Customer</h4>
                  <button type="button" class="close" onClick={() => this.closeFunc()} data-dismiss="modal">&times;</button>

                </div>
                <div class="modal-body" >
                  <div class="form-body">
                    <div style={{ color: "red" }} className="panel panel-default">
                      <FormErrors style={{ color: "red" }} formErrors={this.state.formErrors} />
                    </div>

                    <form class="form-horizontal form-bordered" name="submissions">
                      <div className={`form-group ${this.errorClass(this.state.formErrors.modalCustomerName)}`}>
                        <label class="control-label col-sm-5 font-weight-bold" for="modalCustomerName">Customer Name<span style={{ color: "red" }}>*</span></label>
                        <div class="col-sm-7">
                          <input type="text" class="form-control" id="modalCustomerName" name="modalCustomerName" value={this.state.modalCustomerName} onChange={this.handleUserInput} placeholder="Customer Name" />
                        </div>
                      </div>

                      <div className={`form-group ${this.errorClass(this.state.formErrors.modalContactNo)}`}>
                        <label style={{ fontWeight: "bold" }} class="control-label col-sm-5" for="modalContactNo"> Contact no.<span style={{ color: "red" }}>*</span></label>
                        <div class="col-sm-7">
                          <input type="number" class="form-control" min="1" maxlength="10" name="modalContactNo" value={this.state.modalContactNo} onChange={this.handleUserInput} id="modalContactNo" placeholder="Contact no" />
                        </div>
                      </div>
                      <div class="modal-footer">
                        <div class="form-group">
                          <div class="row" style={{ marginLeft: "2px" }}>
                            <div class="col-sm-offset-4 col-sm-8">
                              <button style={{ fontWeight: "bold" }} type="button" disabled={!this.state.formValid} onClick={() => this.AddCustomerFunc()} data-dismiss="modal" class="btn btn-primary">Submit</button> <span></span>
                              <button style={{ fontWeight: "bold" }} type="button" onClick={() => this.ClearCustomerFunc()} class="btn btn-primary">Clear</button>
                            </div>
                          </div>
                        </div></div>
                    </form>

                  </div>


                </div>
              </div>

            </div>

          </div>

        </div>
        <div style={{ position: " ", zIndex: "0" }}>
          <div class="modal fade" id="myModal1"  >
            <div class="modal-dialog">

              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title" style={{ align: "center", display: "contents" }}>Add Product</h4>
                  <button type="button" onClick={() => this.closeFunc()} class="close" data-dismiss="modal">&times;</button>

                </div>
                <div class="modal-body" >
                  <div class="form-body">
                    <div style={{ color: "red" }} className="panel panel-default">
                      <FormErrors style={{ color: "red" }} formErrors={this.state.formErrors} />
                    </div>

                    <form class="form-horizontal form-bordered" name="submissions">
                      <div className={`form-group ${this.errorClass1(this.state.formErrors.modalproductName)}`}>
                        <label class="control-label col-sm-2 remove" for="modalproductName">Product Name<span style={{ color: "red" }}>*</span></label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" value={this.state.modalproductName} onChange={this.handleUserInputProduct} name="modalproductName" id="modalproductName" placeholder="Product Name" />
                        </div>
                      </div>
                      <div className={`form-group ${this.errorClass1(this.state.formErrors.modalproductType)}`}>
                        <label class="control-label col-sm-2 " for="modalproductType">Product Type<span style={{ color: "red" }}>*</span></label>
                        <div class=" col-sm-10">
                          <select name="modalproductType" id="modalproductType" onChange={this.handleUserInputProductType} class="form-control">
                            <option disabled selected hidden value="">--Select--</option>
                            <option value="product">Product</option>
                            <option value="service">Service</option>
                          </select>
                        </div>
                      </div>
                      <div className={`form-group ${this.errorClass1(this.state.formErrors.modalproductCategory)}`}>
                        <label class="control-label col-sm-2 " for="modalproductCategory">Product Category<span style={{ color: "red" }}>*</span></label>
                        <div class="col-sm-10">
                          <select name="modalproductCategory" id="modalproductCategory" onChange={this.handleUserInputProductCategory} class="form-control">
                            <option disabled selected hidden value="">--Select--</option>
                            <option value="Own">Own</option>
                            <option value="Purchase">Purchase</option>
                          </select>

                        </div>
                      </div>
                      <div className="form-group " id="quantity2">
                        <label class="control-label col-sm-2" for="modalquantity"> Quantity<span style={{ color: "red" }}>*</span></label>
                        <div class=" col-sm-10">
                          <input type="number" min="0" class="form-control" value={this.state.modalquantity} onChange={this.handleUserInputProduct} name="modalquantity" id="modalquantity" placeholder="Quantity...  " />

                        </div>
                      </div>

                      <div class="form-group" id="quantityLimit2">
                        <label class="control-label col-sm-2 remove" for="modalquantityLimit">Quantity Limit<span style={{ color: "red" }}>*</span></label>
                        <div class=" col-sm-10">
                          <input type="number" min="0" class="form-control" value={this.state.modalquantityLimit} onChange={this.handleUserInputProduct} name="modalquantityLimit" id="modalquantityLimit" placeholder="Quantity alert limit...  " />
                        </div>
                        <label class="control-label col-sm-2 remove" for="modalquantityLimit"></label>
                        <div class=" col-sm-10">
                          <span style={{ color: "red" }}>*Enter quantity when do you want an alert ?</span>
                        </div>
                      </div>


                      <div class="form-group">
                        <label class="control-label col-sm-2">CGST</label>
                        <div class="col-sm-10">

                          <input type="number" min="0" class="form-control" value={this.state.modalcgst} onChange={this.handleUserInputProduct} name="modalcgst" id="modalcgst" placeholder="CGST...  " />


                        </div>
                      </div>
                      <div class="form-group">
                        <label class="control-label col-sm-2">SGST</label>
                        <div class="col-sm-10">
                          <input type="number" min="0" class="form-control" value={this.state.modalsgst} onChange={this.handleUserInputProduct} name="modalsgst" id="modalsgst" placeholder="SGST...  " />

                        </div>
                      </div>

                      <div class="form-group">
                        <label class="control-label col-sm-2">IGST</label>
                        <div class="col-sm-10">
                          <input type="number" min="0" class="form-control" value={this.state.modaligst} onChange={this.handleUserInputProduct} name="modaligst" id="modaligst" placeholder="IGST...  " />

                        </div>
                      </div>
                      <div class="form-group">
                        <label class="control-label col-sm-2" for="modalhsnCode"> HSN Code</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" value={this.state.modalhsnCode} onChange={this.handleUserInputProduct} name="modalhsnCode" id="modalhsnCode" placeholder="HSN Code" />
                        </div>
                      </div>
                      <div className={`form-group ${this.errorClass1(this.state.formErrors.modalsaleRate)}`}>
                        <label class="control-label col-sm-2" for="modalsaleRate"> Sale Rate (Rs)<span style={{ color: "red" }}>*</span></label>
                        <div class="col-sm-10">
                          <input type="number" min="0" class="form-control" value={this.state.modalsaleRate} onChange={this.handleUserInputProduct} name="modalsaleRate" id="modalsaleRate" placeholder="saleRate...  " />
                        </div>
                      </div>

                      <div className={`form-group ${this.errorClass1(this.state.formErrors.modalpurchaseRate)}`}>
                        <label class="control-label col-sm-2" for="modalpurchaseRate"> Purchase Rate (Rs)<span style={{ color: "red" }}>*</span></label>
                        <div class="col-sm-10">
                          <input type="number" min="0" class="form-control" value={this.state.modalpurchaseRate} onChange={this.handleUserInputProduct} name="modalpurchaseRate" id="modalpurchaseRate" placeholder="purchaseRate..  " />
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="control-label col-sm-2 remove" for="modaldescription">description</label>
                        <div class="col-sm-10">
                          <textarea rows="2" cols="20" class="form-control" value={this.state.modaldescription} onChange={this.handleUserInputProduct} name="modaldescription" id="modaldescription" > </textarea>
                        </div>
                      </div>

                      <div class="modal-footer">
                        <div class="form-group">
                          <div class="row" style={{ marginLeft: "2px" }}>
                            <div class="col-sm-offset-4 col-sm-8">
                              <button style={{ fontWeight: "bold" }} type="button" disabled={!this.state.formValid1} onClick={() => this.AddProductFunc()} class="btn btn-primary">Submit</button> <span></span>
                              <button style={{ fontWeight: "bold" }} type="button" onClick={() => this.ClearProductFunc()} class="btn btn-primary">Clear</button>

                            </div>
                          </div>
                        </div></div>
                    </form>
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

export default Estimate1;