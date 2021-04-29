import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import $ from 'jquery';
import Case from "case";
import CustomerEntryForm from './CustomerEntryForm';
import { FormErrors } from './FormErrors';
//import datepicker from 'jquery-ui/ui/widgets/datepicker';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
//css

import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
//import './datepicker.css';
import CryptoJS from 'crypto-js';
import InvoiceList from './InvoiceList';
import SelectSearch from 'react-select';
import { thisExpression } from '@babel/types';
import _ from 'underscore';
//import toast from 'siiimple-toast';
//import 'siiimple-toast/dist/style.css';// style required
import Notifications, { notify } from 'react-notify-toast';
import { ToastsContainer, ToastsStore } from 'react-toasts';

import toaster from "toasted-notes";
import "toasted-notes/src/styles.css"; // optional styles
import Select from 'react-select';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
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
var advancebalance_calc;
var subtotal_cgst = 0;
var subtotal_sgst = 0;
var subtotal_igst = 0;
var enqarrData = [];

//const numToWords = require('num-to-words');

var currentItemQuantity;
var currentItemLimitQuantity;



class SaleOrder1 extends Component {

  getInitialState() {
    return { height: '' }
  }
  constructor(data) {
    super(data)
    this.show = notify.createShowQueue();
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var rewardAmount = CryptoJS.AES.decrypt(localStorage.getItem('RewardAmount'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var rewardPoint = CryptoJS.AES.decrypt(localStorage.getItem('RewardPoint'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var expiryDuration = CryptoJS.AES.decrypt(localStorage.getItem('ExpiryDuration'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var maxRewardLimit = CryptoJS.AES.decrypt(localStorage.getItem('MaxRewardLimit'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var redeemAmount = CryptoJS.AES.decrypt(localStorage.getItem('RedeemAmount'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var redeemPoint = CryptoJS.AES.decrypt(localStorage.getItem('RedeemPoint'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var minRedeemRewardPoint = CryptoJS.AES.decrypt(localStorage.getItem('MinRedeemRewardPoint'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

    // this.state.companyId = companyId;

    this.state = {
      date: date,
    
      modalproductName: '',
      modalproductCategory: '',
      modalproductType: '',
      modalquantity: 0,
      modalquantityLimit: 0,
      modalcgst: 0,
      modalsgst: 0,
      modaligst: 0,
      modalhsnCode: '',
      modalpurchaseRate: '',
      modalsaleRate: '',
      modaldescription: '',
      redeemPointToUse: 0,
      redeemAmountToUse: 0,
      staffId: staffId,
      employeeName: employeeName,
      role: role,
      customerName: '',
      totalVisit: '',
      contactNo: '',
      lastVisit: '',
      totalRevenue: '',
      // invoiceNo: '',
      rewardAmount: rewardAmount,
      rewardPoint: rewardPoint,
      maxRewardLimit: maxRewardLimit,
      expiryDuration: expiryDuration,
      redeemAmount: redeemAmount,
      redeemPoint: redeemPoint,
      minRedeemRewardPoint: minRedeemRewardPoint,
      orderNumber: '',
      invoiceDate: date,
      dueDate: date,
      productName: '',

      description: '',
      sms: '',
      emailoption: '',
      rate: '',

      quantity: '1',
      total: '',
      cgsta: '',
      sgsta: '',
      igsta: '',
      companyId: companyId,
      finalAmount: '',
      totalqty: '',
      TotalWithoutGST: 0,
      subtotal1: 0,
      totalitemqty: 0,
      totalgst: 0,
      balance_amount: '',
      advance: 0,
      discount: 0,
      balance: '',
      modalCustomerName: '',
      modalContactNo: '',
      options: [],
      saleSale: '',
      purchaseSale: '',
      paymentoptions: [],
      payment_status: 'UnPaid',
      paymentMode: '',
      staffName: '',
      formErrors: {
        modalCustomerName: '',
        modalContactNo: '',
        modalproductName: '',
        modalproductType: '',
        modalproductCategory: '',
        modalpurchaseRate: '',
        modalsaleRate: '',

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
      //    companyId: companyId,

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
        modalContactNoValid = value.match(/^[0-9]{8,10}$/);
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
                    <Route path="/" component={SaleOrder1} />
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
    $(".producttype").hide();
    $("#insufficientdiv").hide();
    this.DeleteButton();
    var self = this;
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
    this.selectStaff();
    this.SelectCustomer();
    this.selectProduct();

  }

  selectProduct() {
    var self = this;
    var options = [];
    for (var k = 0; k < saleRateArray.length; k++) {
      var temp = JSON.parse(saleRateArray[k]);
      if (temp.productType == "product") {
     
        options.push({ label: temp.productName + " ( " + temp.quantity + " ) ", value: temp.productName });
      }
      else {
        options.unshift({ label: temp.productName, value: temp.productName });
        
      }
      self.state.options = options;
      self.setState({
        options: options,
      })
    }
   
  }
  selectStaff() {
    var staffName;
    var self = this;
    window.scrollTo(0, 0);
    var options2 = [];
    var EmpList = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('EmpList'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    staffName += '<option  value="" disabled selected hidden>EmployeeName</option>';

    $.each(EmpList, function (i, item) {

      staffName += '<option value="' + item.staffName + '"> ' + item.staffName + '</option>'

    });
    $("#staffName").append(staffName);


  }
  validateField2(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let staffNameValid = this.state.staffNameValid;

    switch (fieldName) {

      case 'staffName':
        if (value == "NO") {
          staffNameValid = value.length < 0;
          fieldValidationErrors.StaffName = staffNameValid ? '' : ' is InCorrect';
          break;
        } else {
          staffNameValid = value.length >= 1;
          fieldValidationErrors.StaffName = staffNameValid ? '' : ' is InCorrect';
          break;
        }


      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      staffNameValid: staffNameValid,

    }, this.validateForm2);
  }
  validateForm2() {

    this.setState({
      formValid:
        this.state.staffNameValid
    });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
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

          // customerName += '<option value="' + item.customerId + '">' + item.customerName + '</option>'
          var content = JSON.stringify({
            customerName: item.customerName,
            orderNumber: item.orderNumber,
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

        // $("#customerName").append(customerName);
        self.state.options1 = options1;
        self.setState({
          options1: self.state.options1,
        })

        $.each(data.selectsaleproductlist, function (i, item) {

          var arr = item.producttype;
          var arr1 = item.producttype;




          //    options.push({ label: item.productName, value: item.productName });
          //   productName += '<option value="' + item.productName + '">' + item.productName + '</option>'
          var feed = JSON.stringify({
            productName: item.productName,
            rate: item.saleRate,
            description: item.description,
            cgsta: item.cgst,
            sgsta: item.sgst,
            igsta: item.igst,
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
            cgsta: item.cgst,
            sgsta: item.sgst,
            igsta: item.igst,
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



  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // alert("value"+e.target.value)
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }


  handleUserInputMobileNo = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });

    var isNumberDt = $.isNumeric(value);
    if (isNumberDt !== false) {
      var sign_data = Math.sign(value);
      // alert("SIGN VALUE :"+sign_data);
      if (sign_data != -1) {

        var decimal_data = (value - Math.floor(value)) !== 0;
        //   alert("DECIMAL DATA :"+decimal_data);
        if (decimal_data == false) {
          $("input[name=modalContactNo]").val(); // get current row 1st TD value



        } else {
          $("input[name=modalContactNo]").val(); // get current row 1st TD value

          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Decimal Values Not Accepted',
            showConfirmButton: false,
            timer: 2000
          })

        }
      } else {

        $("input[name=modalContactNo]").val(); // get current row 1st TD value

        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Negative Values Not Accepted',
          showConfirmButton: false,
          timer: 2000
        })

      }
    } else {

      $("input[name=modalContactNo]").val(); // get current row 1st TD value

      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Kindly Enter An Number To Proceed',
        showConfirmButton: false,
        timer: 2000
      })

    }


  }
  handleCgstSgstIgst = (e) => {

    const name = e.target.name;
    const value = e.target.value;

    var value1 = value;
    var cleanNum;


    if (value1 != "") {

      var isNumberDt = $.isNumeric(value1);
      if (isNumberDt !== false) {
        var sign_data = Math.sign(value1);
        // alert("SIGN VALUE :"+sign_data);
        if (sign_data != -1) {

          cleanNum = value1.match(/^\d+\.?\d{0,2}/);
          /*this.state[name] = cleanNum;
          this.setState({ [name]: cleanNum });
          */

          this.state[name] = cleanNum;
          this.setState({ [name]: cleanNum });
          this.handleUserHeightWidthComplete();


        } else {

          //  $("#"+name).val(); // get current row 1st TD value
          this.state[name] = '';
          this.setState({ [name]: '' });
          /*   confirmAlert({
                   title: 'Error',                        // Title dialog
                   message: 'Negative Values Not Accepted',               // Message dialog
                   confirmLabel: 'Ok',                           // Text button confirm
               });
               */
        }
      } else {

        // $("#"+name).val(); // get current row 1st TD value
        this.state[name] = '';
        this.setState({ [name]: '' });
        /*  confirmAlert({
                title: 'Error',                        // Title dialog
                message: 'Kindly Enter An Number To Proceed',               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
            });
            */
      }

    } else {

      this.state[name] = '';
      this.setState({ [name]: '' });
      this.handleUserHeightWidthComplete();
    }

  }
  handleMinRewardRedeemPointCalc = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      value: value,
    })
    var self = this;
    this.state.advance=0;
    this.state.balance_amount=this.state.subtotal1;
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
          self.state.redeemAmountToUse = Math.round(Number(self.state.redeemPointToUse) *(Math.round(Number(self.state.redeemAmount)/(Number(self.state.redeemPoint)))));

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
          self.state.redeemAmountToUse = Math.round(Number(self.state.redeemPointToUse) * (Math.round(Number(self.state.redeemAmount)/(Number(self.state.redeemPoint)))));
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
          if (value == "0") {
            alert("Value Cant Be Zero");
          }
          else {
            this.state[name] = cleanNum;
            this.setState({ [name]: cleanNum });
            this.handleUserHeightWidthComplete();
            //--test here
          }

        } else {

          //  $("#"+name).val(); // get current row 1st TD value
          this.state[name] = '';
          this.setState({ [name]: '' });
          /*   confirmAlert({
                   title: 'Error',                        // Title dialog
                   message: 'Negative Values Not Accepted',               // Message dialog
                   confirmLabel: 'Ok',                           // Text button confirm
               });
               */
        }
      } else {

        // $("#"+name).val(); // get current row 1st TD value
        this.state[name] = '';
        this.setState({ [name]: '' });
        /*  confirmAlert({
                title: 'Error',                        // Title dialog
                message: 'Kindly Enter An Number To Proceed',               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
            });
            */
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
          /*   confirmAlert({
                   title: 'Error',                        // Title dialog
                   message: 'Negative Values Not Accepted',               // Message dialog
                   confirmLabel: 'Ok',                           // Text button confirm
               });
               */
        }
      } else {

        // $("#"+name).val(); // get current row 1st TD value
        this.state[name] = '';
        this.setState({ [name]: '' });
        /*  confirmAlert({
                title: 'Error',                        // Title dialog
                message: 'Kindly Enter An Number To Proceed',               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
            });
            */
      }

    } else {

      this.state[name] = '';
      this.setState({ [name]: '' });
      this.handleUserHeightWidthComplete();

    }

  }

  ToastMsg(productName) {
    ToastsStore.warning("Stock Under Limit - " + productName);
  }
  handleUserHeightWidthComplete() {

    // alert("self.state.quantity" +self.state.quantity);
    var self = this;


    if (this.state.productType == "service") {
      self.state.total = self.state.rate;

    } else {
      self.state.total = Math.round(Number(self.state.rate) * Number(self.state.quantity));
    }
    self.state.finalAmount = Math.round(Number(self.state.total) + ((0.01 * Number(self.state.cgsta)) * Number(self.state.total)) + (0.01 * Number(self.state.sgsta) * Number(self.state.total)) + (0.01 * Number(self.state.igsta) * Number(self.state.total)));

    self.state.totalgst_rs = Math.round(((0.01 * Number(self.state.cgsta)) * Number(self.state.total)) + (0.01 * Number(self.state.sgsta) * Number(self.state.total)) + (0.01 * Number(self.state.igsta) * Number(self.state.total)));

    self.setState({
      total: self.state.total,
      finalAmount: self.state.finalAmount,
      totalgst_rs: self.state.totalgst_rs,
    });


  }


  AdvanceCalc = (e) => {

    const name = e.target.name;
    const value = e.target.value;
    //If Entered Amount Exceed the subtotal
    var state_value = 0;

    var value1 = value;
var self=this;
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
        //   alert("NO NUMBER FOR CHAR");
      }

    } else {
      this.state[name] = 0;
      this.setState({ [name]: 0 });

      //   alert("NO NUMBER FOR EMPTY STRING ");
    }



    if (isNumberDt != false && sign_data != -1 && decimal_data != true) {

self.state.compareValue=this.state.subtotal1;
self.state.compareValue1=Math.round(Number(self.state.compareValue)-Number(self.state.redeemAmountToUse));
self.setState({
  compareValue:self.state.compareValue,
  compareValue1:self.state.compareValue1,
})
      if (value1 > self.state.compareValue1) {


        alert("Advance Exceeds Total" + value1);

        state_value = 0;
        this.AdvanceCalcComplete(value1, state_value);

      } else {

        state_value = value1;
        this.AdvanceCalcComplete(value1, state_value);

      }
    } else {
      self.state.compareValue=this.state.subtotal1;
      self.state.compareValue1=Math.round(Number(self.state.compareValue)-Number(self.state.redeemAmountToUse));
      self.setState({
        compareValue:self.state.compareValue,
        compareValue1:self.state.compareValue1,
      })

      if (value1 > self.state.compareValue1) {


        alert("Advance Exceeds Total" + value1);
        state_value = 0;
        this.AdvanceCalcComplete(value1, state_value);

      } else {

        state_value = 0;
        this.AdvanceCalcComplete(value1, state_value);


      }
    }

  }


  AdvanceCalcComplete(value1, state_value) {

    this.state.advance = state_value;
    var self=this;
    var tot_adv_diff = Math.round(Number(this.state.subtotal1) - (Number(this.state.advance)+Number(this.state.redeemAmountToUse)));
var advanceRedeemamount=(Number(this.state.advance)+Number(this.state.redeemAmountToUse));
    if (this.state.subtotal1 == advanceRedeemamount) {

      $('#discount').prop('disabled', true)
      this.state.discount = 0;

    } else if (this.state.discount > tot_adv_diff) {
      this.state.discount = 0;
      $('#discount').prop('disabled', false)

    } else {
      $('#discount').prop('disabled', false)

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
      advance: state_value,
      discount: this.state.discount,
      balance_amount: this.state.balance_amount,
      payment_status: this.state.payment_status,
    })

  }


  //Onchange For Discount
  DiscountCalc = (e) => {

    const name = e.target.name;
    const value = e.target.value;

    var value1 = value;
    var state_value = 0;
    var self=this;
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
      var tot_minus_adv = Math.round(Number(this.state.subtotal1) - (Number(this.state.advance)+Number(this.state.redeemAmountToUse)));
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
      var tot_minus_adv = Math.round(Number(this.state.subtotal1) - (Number(this.state.advance)+Number(this.state.redeemAmountToUse)));
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

    var self=this;
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

  handleCustomerDetails = (e) => {
    const name = e.name;
    const value = e.value;
    this.state.customerId = value;
    this.state.productName = "";
    this.state.quantity = "";
    this.emptyFunc();
    this.SelectProductB4Customer();
    this.selectProduct();
    rougharray.push(this.state.customerId);


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
        self.state.orderNumber = temp.orderNumber + 1;
        self.state.customerId = temp.customerId;
        self.state.contactNo = temp.contactNo;
        self.state.address = temp.address;
        self.state.customerName = temp.customerName;
        self.state.lastVisit = temp.lastVisit;
        self.state.totalRevenue = temp.totalRevenue;
        self.state.enqdetails = temp.enqdetails;
        self.state.staffName1 = temp.serviceBy;
        self.state.customerId1 = temp.customerId;
        self.state.customerRewardPointDB = temp.customerRewardPointDB;
        self.state.customerExpiryDateDB = temp.customerExpiryDateDB;

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

        self.state.email = temp.email;
   
        var NUll = null;
        if (temp.enqdetails != NUll) {
          var size = temp.enqdetails.length;


          if (temp.enqdetails.length > 0) {

            $.each(self.state.enqdetails, function (i, item) {

         


              for (var k = 0; k < saleRateArray.length; k++) {
                var temp = JSON.parse(saleRateArray[k]);

                if ((temp.productName == item.enqProductName)) {


                  if ((self.state.customerId1 == item.customerId)) {
                

                    if ((Number(temp.quantity) > 0) && (Number(temp.quantity) >= Number(item.enqQuantity))) {

                      if (temp.productType == "product") {
                        self.state.productName = temp.productName;
                        self.state.quantity = item.enqQuantity;
                        self.state.total = "";
                        self.state.finalAmount = "";
                        self.state.description = temp.description;
                        self.state.rate = temp.rate;
                        self.state.cgsta = temp.cgsta;
                        self.state.sgsta = temp.sgsta;
                        self.state.igsta = temp.igsta;
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

                        self.state.finalAmount = Math.round(Number(self.state.total) + ((0.01 * Number(self.state.cgsta)) * Number(self.state.total)) + (0.01 * Number(self.state.sgsta) * Number(self.state.total)) + (0.01 * Number(self.state.igsta) * Number(self.state.total)));
                        self.state.totalgst_rs = Math.round(Number(((0.01 * Number(self.state.cgsta)) * Number(self.state.total)))
                          + Number(((0.01 * Number(self.state.sgsta)) * Number(self.state.total)))
                          + Number(((0.01 * Number(self.state.igsta)) * Number(self.state.total))));

                        self.setState({
                          total: self.state.total,
                          finalAmount: self.state.finalAmount,
                          totalgst_rs: self.state.totalgst_rs,
                          productName: self.state.productName1,
                        });
                        if ((self.state.staffName1.length != 0) && self.state.finalAmount != 0 && self.state.cgsta.length != 0 && self.state.sgsta.length != 0 && self.state.igsta.length != 0) {
                          var currentproductvalue;

                          self.AddToCartQuantityUpdate();
                          self.selectProduct();



                          //var tab = '<thead><tr class="headcolor" style="color: white; background-color: #486885; font-size: 12px;">  <th>ProductName</th><th>Size</th><th>Rate</th><th>Amount</th><th>Quantity</th><th>Total</th><th>CGST (%)</th><th>SGST (%)</th><th>IGST (%)</th><th>Final Amount</th></tr></thead>';
                          self.state.subtotal1 = Math.round(Number(self.state.subtotal1) + (Number(self.state.finalAmount)));


                          if (self.state.quantity != "-") {
                            self.state.totalitemqty = Math.round(Number(self.state.totalitemqty) + Number(self.state.quantity));
                          }

                          self.state.totalgst = Math.round(Number(self.state.totalgst) + Math.round(Number(self.state.totalgst_rs)));
                          self.state.TotalWithoutGST = Math.round(Number(self.state.TotalWithoutGST) + Number(self.state.total));


                          subtotal_cgst = Math.round(Number(subtotal_cgst) + ((0.01 * Number(self.state.cgsta)) * Number(self.state.total)));
                          subtotal_sgst = Math.round(Number(subtotal_sgst) + ((0.01 * Number(self.state.sgsta)) * Number(self.state.total)));
                          subtotal_igst = Math.round(Number(subtotal_igst) + ((0.01 * Number(self.state.igsta)) * Number(self.state.total)));

                          var payament_status_details;



                          var tab = '<tr style={{backgroundColor: "white",fontColor:"black",fontWeight:"bold"}} id="tabletextcol" >'
                            + '<td>' + temp.productName + '</td><td>' + self.state.rate + '</td>'
                            + '<td>' + item.enqQuantity + '</td><td>' + self.state.total + '</td>'
                            + '<td>' + self.state.cgsta + '</td><td>' + self.state.sgsta + '</td>'
                            + '<td  id="Gstcal" >' + self.state.igsta + '</td>'
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
                          self.state.cgsta = "";
                          self.state.sgsta = "";
                          self.state.igsta = "";
                          self.state.finalAmount = "";
                          self.state.productId = "";
                          //   self.state.TotalWithoutGST="";
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
                            cgsta: '',
                            sgsta: '',
                            igsta: '',
                            finalAmount: '',
                            productName: '',
                            productId: '',
                            TotalWithoutGST: self.state.TotalWithoutGST,
                            totalgst: self.state.totalgst,
                            totalitemqty: self.state.totalitemqty,
                            balance_amount: self.state.subtotal1,
                            subtotal1: self.state.subtotal1,
                            discount: 0,
                            advance: 0,
                            staffName1: '',

                          });
                          advancebalance_calc = self.state.subtotal1;

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
                        self.state.cgsta = temp.cgsta;
                        self.state.sgsta = temp.sgsta;
                        self.state.igsta = temp.igsta;
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
                        self.state.finalAmount = Math.round(Number(self.state.total) + ((0.01 * Number(self.state.cgsta)) * Number(self.state.total)) + (0.01 * Number(self.state.sgsta) * Number(self.state.total)) + (0.01 * Number(self.state.igsta) * Number(self.state.total)));
                        self.state.totalgst_rs = Math.round(Number(((0.01 * Number(self.state.cgsta)) * Number(self.state.total)))
                          + Number(((0.01 * Number(self.state.sgsta)) * Number(self.state.total)))
                          + Number(((0.01 * Number(self.state.igsta)) * Number(self.state.total))));

                        self.setState({
                          total: self.state.total,
                          finalAmount: self.state.finalAmount,
                          totalgst_rs: self.state.totalgst_rs,
                        });

                        if ((self.state.staffName1.length != 0) && self.state.finalAmount != 0 && self.state.cgsta.length != 0 && self.state.sgsta.length != 0 && self.state.igsta.length != 0) {
                          var currentproductvalue;

                          self.AddToCartQuantityUpdate();
                          self.selectProduct();



                          //var tab = '<thead><tr class="headcolor" style="color: white; background-color: #486885; font-size: 12px;">  <th>ProductName</th><th>Size</th><th>Rate</th><th>Amount</th><th>Quantity</th><th>Total</th><th>CGST (%)</th><th>SGST (%)</th><th>IGST (%)</th><th>Final Amount</th></tr></thead>';
                          self.state.subtotal1 = Math.round(Number(self.state.subtotal1) + (Number(self.state.finalAmount)));
                          if (self.state.quantity1 != "-") {
                            self.state.totalitemqty = Math.round(Number(self.state.totalitemqty) + Number(self.state.quantity));
                          }

                          self.state.totalgst = Math.round(Number(self.state.totalgst) + Math.round(Number(self.state.totalgst_rs)));
                          self.state.TotalWithoutGST = Math.round(Number(self.state.TotalWithoutGST) + Number(self.state.total));


                          subtotal_cgst = Math.round(Number(subtotal_cgst) + ((0.01 * Number(self.state.cgsta)) * Number(self.state.total)));
                          subtotal_sgst = Math.round(Number(subtotal_sgst) + ((0.01 * Number(self.state.sgsta)) * Number(self.state.total)));
                          subtotal_igst = Math.round(Number(subtotal_igst) + ((0.01 * Number(self.state.igsta)) * Number(self.state.total)));

                          var payament_status_details;



                          var tab = '<tr style={{backgroundColor: "white",fontColor:"black",fontWeight:"bold"}} id="tabletextcol" >'
                            + '<td>' + self.state.productName + '</td><td>' + self.state.rate + '</td>'
                            + '<td>' + self.state.quantity1 + '</td><td>' + self.state.total + '</td>'
                            + '<td>' + self.state.cgsta + '</td><td>' + self.state.sgsta + '</td>'
                            + '<td  id="Gstcal" >' + self.state.igsta + '</td>'
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
                          self.state.cgsta = "";
                          self.state.sgsta = "";
                          self.state.igsta = "";
                          self.state.finalAmount = "";
                          self.state.productId = "";
                          //   self.state.TotalWithoutGST="";
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
                            cgsta: '',
                            sgsta: '',
                            igsta: '',
                            finalAmount: '',
                            productName: '',
                            productId: '',
                            TotalWithoutGST: self.state.TotalWithoutGST,
                            totalgst: self.state.totalgst,
                            totalitemqty: self.state.totalitemqty,
                            balance_amount: self.state.subtotal1,
                            subtotal1: self.state.subtotal1,
                            discount: 0,
                            advance: 0,
                            staffName1: '',

                          });
                          advancebalance_calc = self.state.subtotal1;

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
                        self.state.cgsta = temp.cgsta;
                        self.state.sgsta = temp.sgsta;
                        self.state.igsta = temp.igsta;
                        self.state.productType = temp.productType;
                        self.state.productQuantity = temp.quantity;
                        self.state.productId = temp.productId;
                        currentItemQuantity = temp.quantity;
                        currentItemLimitQuantity = temp.quantityLimit;
                        self.setState({
                          productName: temp.productName,
                          quantity: temp.quantity

                        })
                        self.state.total = Math.round(Number(self.state.rate) * Number(self.state.quantity));

                        self.state.finalAmount = Math.round(Number(self.state.total) + ((0.01 * Number(self.state.cgsta)) * Number(self.state.total)) + (0.01 * Number(self.state.sgsta) * Number(self.state.total)) + (0.01 * Number(self.state.igsta) * Number(self.state.total)));
                        self.state.totalgst_rs = Math.round(Number(((0.01 * Number(self.state.cgsta)) * Number(self.state.total)))
                          + Number(((0.01 * Number(self.state.sgsta)) * Number(self.state.total)))
                          + Number(((0.01 * Number(self.state.igsta)) * Number(self.state.total))));

                        self.setState({
                          total: self.state.total,
                          finalAmount: self.state.finalAmount,
                          totalgst_rs: self.state.totalgst_rs,
                        });
                        if ((self.state.staffName1.length != 0) && self.state.finalAmount != 0 && self.state.cgsta.length != 0 && self.state.sgsta.length != 0 && self.state.igsta.length != 0) {
                          var currentproductvalue;

                          self.AddToCartQuantityUpdate();
                          self.selectProduct();


                          //var tab = '<thead><tr class="headcolor" style="color: white; background-color: #486885; font-size: 12px;">  <th>ProductName</th><th>Size</th><th>Rate</th><th>Amount</th><th>Quantity</th><th>Total</th><th>CGST (%)</th><th>SGST (%)</th><th>IGST (%)</th><th>Final Amount</th></tr></thead>';
                          self.state.subtotal1 = Math.round(Number(self.state.subtotal1) + (Number(self.state.finalAmount)));
                          if (self.state.quantity != "-") {
                            self.state.totalitemqty = Math.round(Number(self.state.totalitemqty) + Number(self.state.quantity));
                          }

                          self.state.totalgst = Math.round(Number(self.state.totalgst) + Math.round(Number(self.state.totalgst_rs)));
                          self.state.TotalWithoutGST = Math.round(Number(self.state.TotalWithoutGST) + Number(self.state.total));


                          subtotal_cgst = Math.round(Number(subtotal_cgst) + ((0.01 * Number(self.state.cgsta)) * Number(self.state.total)));
                          subtotal_sgst = Math.round(Number(subtotal_sgst) + ((0.01 * Number(self.state.sgsta)) * Number(self.state.total)));
                          subtotal_igst = Math.round(Number(subtotal_igst) + ((0.01 * Number(self.state.igsta)) * Number(self.state.total)));

                          var payament_status_details;



                          var tab = '<tr style={{backgroundColor: "white",fontColor:"black",fontWeight:"bold"}} id="tabletextcol" >'
                            + '<td>' + self.state.productName + '</td><td>' + self.state.rate + '</td>'
                            + '<td>' + temp.quantity + '</td><td>' + self.state.total + '</td>'
                            + '<td>' + self.state.cgsta + '</td><td>' + self.state.sgsta + '</td>'
                            + '<td  id="Gstcal" >' + self.state.igsta + '</td>'
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
                          self.state.cgsta = "";
                          self.state.sgsta = "";
                          self.state.igsta = "";
                          self.state.finalAmount = "";
                          self.state.productId = "";
                          //   self.state.TotalWithoutGST="";
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
                            cgsta: '',
                            sgsta: '',
                            igsta: '',
                            finalAmount: '',
                            productName: '',
                            productId: '',
                            TotalWithoutGST: self.state.TotalWithoutGST,
                            totalgst: self.state.totalgst,
                            totalitemqty: self.state.totalitemqty,
                            balance_amount: self.state.subtotal1,
                            subtotal1: self.state.subtotal1,
                            discount: 0,
                            advance: 0,
                            staffName1: '',

                          });
                          advancebalance_calc = self.state.subtotal1;

                          var numtoword = numberToWord(Number(self.state.subtotal1));
                          $("#numWords").text(Case.capital(numtoword));
                          $(".heightWidth").hide();


                        }

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
                        self.state.cgsta = temp.cgsta;
                        self.state.sgsta = temp.sgsta;
                        self.state.igsta = temp.igsta;
                        self.state.productType = temp.productType;
                        self.state.productQuantity = temp.quantity;
                        self.state.productId = temp.productId;
                        self.state.enqtableQuan = 1;
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
                          quantity: temp.quantity

                        })
                        self.state.finalAmount = Math.round(Number(self.state.total) + ((0.01 * Number(self.state.cgsta)) * Number(self.state.total)) + (0.01 * Number(self.state.sgsta) * Number(self.state.total)) + (0.01 * Number(self.state.igsta) * Number(self.state.total)));
                        self.state.totalgst_rs = Math.round(Number(((0.01 * Number(self.state.cgsta)) * Number(self.state.total)))
                          + Number(((0.01 * Number(self.state.sgsta)) * Number(self.state.total)))
                          + Number(((0.01 * Number(self.state.igsta)) * Number(self.state.total))));

                        self.setState({
                          total: self.state.total,
                          finalAmount: self.state.finalAmount,
                          totalgst_rs: self.state.totalgst_rs,
                        });

                        if ((self.state.staffName1.length != 0) && self.state.finalAmount != 0 && self.state.cgsta.length != 0 && self.state.sgsta.length != 0 && self.state.igsta.length != 0) {
                          var currentproductvalue;

                          self.AddToCartQuantityUpdate();
                          self.selectProduct();


                          //var tab = '<thead><tr class="headcolor" style="color: white; background-color: #486885; font-size: 12px;">  <th>ProductName</th><th>Size</th><th>Rate</th><th>Amount</th><th>Quantity</th><th>Total</th><th>CGST (%)</th><th>SGST (%)</th><th>IGST (%)</th><th>Final Amount</th></tr></thead>';
                          self.state.subtotal1 = Math.round(Number(self.state.subtotal1) + (Number(self.state.finalAmount)));


                          if (self.state.quantity1 != "-") {
                            self.state.totalitemqty = Math.round(Number(self.state.totalitemqty) + Number(self.state.quantity));
                          }

                          self.state.totalgst = Math.round(Number(self.state.totalgst) + Math.round(Number(self.state.totalgst_rs)));
                          self.state.TotalWithoutGST = Math.round(Number(self.state.TotalWithoutGST) + Number(self.state.total));


                          subtotal_cgst = Math.round(Number(subtotal_cgst) + ((0.01 * Number(self.state.cgsta)) * Number(self.state.total)));
                          subtotal_sgst = Math.round(Number(subtotal_sgst) + ((0.01 * Number(self.state.sgsta)) * Number(self.state.total)));
                          subtotal_igst = Math.round(Number(subtotal_igst) + ((0.01 * Number(self.state.igsta)) * Number(self.state.total)));

                          var payament_status_details;



                          var tab = '<tr style={{backgroundColor: "white",fontColor:"black",fontWeight:"bold"}} id="tabletextcol" >'
                            + '<td>' + self.state.productName + '</td><td>' + self.state.rate + '</td>'
                            + '<td>' + self.state.quantity1 + '</td><td>' + self.state.total + '</td>'
                            + '<td>' + self.state.cgsta + '</td><td>' + self.state.sgsta + '</td>'
                            + '<td  id="Gstcal" >' + self.state.igsta + '</td>'
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
                          self.state.cgsta = "";
                          self.state.sgsta = "";
                          self.state.igsta = "";
                          self.state.finalAmount = "";
                          self.state.productId = "";
                          //   self.state.TotalWithoutGST="";
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
                            cgsta: '',
                            sgsta: '',
                            igsta: '',
                            finalAmount: '',
                            productName: '',
                            productId: '',
                            TotalWithoutGST: self.state.TotalWithoutGST,
                            totalgst: self.state.totalgst,
                            totalitemqty: self.state.totalitemqty,
                            balance_amount: self.state.subtotal1,
                            subtotal1: self.state.subtotal1,
                            discount: 0,
                            advance: 0,
                            staffName1: '',

                          });
                          advancebalance_calc = self.state.subtotal1;

                          var numtoword = numberToWord(Number(self.state.subtotal1));
                          $("#numWords").text(Case.capital(numtoword));
                          $(".heightWidth").hide();


                        }

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
          orderNumber: self.state.orderNumber,
          customerId: self.state.customerId,
          contactNo: self.state.contactNo,
          address: self.state.address,
          gstNo: self.state.gstNo,
          email: self.state.email,
          customerName: self.state.customerName,
          companyName: self.state.companyName,
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
    const product_Quantity = e.quantity;


    this.state.productName = value;
    this.state.prod_quantity = product_Quantity;

    $("#quantity").show();
    $("#total1").show();
    $("#quantity1").show();
    $("#total").show();
    $("#quantity1_Input").show();
    $("#total_Input").show();

    testarray.push(this.state.productName + " " + this.state.currentItemQuantity);


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

          if (Number(temp.quantity) != 0) {
            self.state.quantity = 1;
            self.state.total = "";
            self.state.finalAmount = "";
            self.state.description = temp.description;
            self.state.rate = temp.rate;
            self.state.cgsta = temp.cgsta;
            self.state.sgsta = temp.sgsta;
            self.state.igsta = temp.igsta;
            self.state.productType = temp.productType;
            self.state.productQuantity = temp.quantity;
            self.state.productId = temp.productId;
            currentItemQuantity = temp.quantity;
            currentItemLimitQuantity = temp.quantityLimit;

            self.setState({
              description: temp.description,
              rate: temp.rate,
              cgsta: temp.cgsta,
              sgsta: temp.sgsta,
              igsta: temp.igsta,
              productQuantity: temp.quantity,
              productType: temp.productType,
              productId: temp.productId,
              quantity: 1,
              total: "",
              finalAmount: "",

            })

            // if (this.state.productType == "service") {
            //   $("#quantity").hide();
            //   $("#quantity1").hide();

            //   $("#total").hide();
            //   $("#total1").hide();
            //   self.state.total = self.state.rate;
            //   this.state.quantity = "-";
            //   this.setState({
            //     quantity: this.state.quantity,
            //   })
            // } else {
            self.state.total = Math.round(Number(self.state.rate) * Number(self.state.quantity));
            // }
            self.state.finalAmount = Math.round(Number(self.state.total) + ((0.01 * Number(self.state.cgsta)) * Number(self.state.total)) + (0.01 * Number(self.state.sgsta) * Number(self.state.total)) + (0.01 * Number(self.state.igsta) * Number(self.state.total)));
            self.state.totalgst_rs = Math.round(Number(((0.01 * Number(self.state.cgsta)) * Number(self.state.total)))
              + Number(((0.01 * Number(self.state.sgsta)) * Number(self.state.total)))
              + Number(((0.01 * Number(self.state.igsta)) * Number(self.state.total))));

            self.setState({
              total: self.state.total,
              finalAmount: self.state.finalAmount,
              totalgst_rs: self.state.totalgst_rs,
            });

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
          self.state.cgsta = temp.cgsta;
          self.state.sgsta = temp.sgsta;
          self.state.igsta = temp.igsta;
          self.state.productType = temp.productType;
          self.state.productQuantity = temp.quantity;
          self.state.productId = temp.productId;
          currentItemQuantity = temp.quantity;
          currentItemLimitQuantity = temp.quantityLimit;

          self.setState({
            description: temp.description,
            rate: temp.rate,
            cgsta: temp.cgsta,
            sgsta: temp.sgsta,
            igsta: temp.igsta,
            productQuantity: temp.quantity,
            productType: temp.productType,
            productId: temp.productId,
            quantity: 1,
            total: "",
            finalAmount: "",

          })

          if (this.state.productType == "service") {
            $("#quantity").hide();
            $("#quantity1").hide();
            $("#quantity1_Input").hide();
            $("#total").hide();
            $("#total1").hide();
            $("#total_Input").hide();
            self.state.total = self.state.rate;
            this.state.quantity = "-";
            this.setState({
              quantity: this.state.quantity,
            })
          }
          self.state.finalAmount = Math.round(Number(self.state.total) + ((0.01 * Number(self.state.cgsta)) * Number(self.state.total)) + (0.01 * Number(self.state.sgsta) * Number(self.state.total)) + (0.01 * Number(self.state.igsta) * Number(self.state.total)));
          self.state.totalgst_rs = Math.round(Number(((0.01 * Number(self.state.cgsta)) * Number(self.state.total)))
            + Number(((0.01 * Number(self.state.sgsta)) * Number(self.state.total)))
            + Number(((0.01 * Number(self.state.igsta)) * Number(self.state.total))));

          self.setState({
            total: self.state.total,
            finalAmount: self.state.finalAmount,
            totalgst_rs: self.state.totalgst_rs,
          });
          break;


        }

      }

    }
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

            self.setState({
              modalCustomerName: '',
              modalContactNo: '',
              formValid: false,
            });


            ReactDOM.render(
              <Router >
                <div>
                  <Route path="/" component={SaleOrder1} />
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

  ClearCustomerFunc() {
    var self = this;
    self.state.modalCustomerName = "";
    self.state.modalContactNo = "";

    self.setState({
      modalCustomerName: self.state.modalCustomerName,
      modalContactNo: self.state.modalContactNo,
    })

  }

  ClearProductFunc() {
    var self = this;

    $('[name=modalproductCategory]').val('');
    $('[name=modalproductType]').val('');
    this.state.modalproductName = "";
    this.state.modaldescription = "";
    this.state.modalpurchaseRate = "";
    this.state.modalhsnCode = "";
    this.state.modalsaleRate = "";
    this.state.modalcgst = 0;
    this.state.modaligst = 0;
    this.state.modalsgst = 0;

    self.setState({
      modalproductName: self.state.modalproductName,
      modaldescription: self.state.modaldescription,
      modalpurchaseRate: self.state.modalpurchaseRate,
      modalhsnCode: self.state.modalhsnCode,
      modalsaleRate: self.state.modalsaleRate,
      modalproductCategory: self.state.modalproductCategory,
      modalproductType: self.state.modalproductType,
      modalcgst: this.state.modalcgst,
      modalsgst: this.state.modalsgst,
      modaligst: this.state.modaligst
    })
  }

  closeFunc() {
    //alert("MODAL CLOSE");
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







  SaleInvoiceFunc() {
    var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    var enquirytablelength = $('#tablecontentsenquiry tr').length;
    var self = this;
    var rewardAmount = CryptoJS.AES.decrypt(localStorage.getItem('RewardAmount'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
 
    if (Number(this.state.subtotal1) >= Number(rewardAmount)) {
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
   
      }
    } else {
      self.state.customerRewardPoint = Math.round(Number(self.state.customerRewardPointDB));
      self.state.expiryDate = self.state.customerExpiryDateDB;
      self.setState({
        expiryDate: self.state.expiryDate,
        customerRewardPoint: self.state.customerRewardPoint,
      })
   
    }

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

    // alert("checkboxArray"+this.state.sms);
    // loop over each table row (tr)
    $("#tablecontents tr").each(function () {
      var currentRow = $(this);


      var productName = currentRow.find("td:eq(0)").text();
      var rate = (Math.round(currentRow.find("td:eq(1)").text() * 100) / 100).toFixed(2);
      var quantity = currentRow.find("td:eq(2)").text();
      var total = (Math.round(currentRow.find("td:eq(3)").text() * 100) / 100).toFixed(2);
      var cgst = currentRow.find("td:eq(4)").text();
      var sgst = currentRow.find("td:eq(5)").text();
      var igst = currentRow.find("td:eq(6)").text();
      var finalAmount = (Math.round(currentRow.find("td:eq(7)").text() * 100) / 100).toFixed(2);
      //  var staffId1 = currentRow.find("td:eq(8)").find(".SelectOption").val();
      var staffId1 = currentRow.find("td:eq(8)").text();
      var description = currentRow.find("td:eq(9)").text();
      var productId = currentRow.find("td:eq(10)").text();
      var productType = currentRow.find("td:eq(11)").text();
      if (description == "") {
        description = '-';
      }

      arrData.push(productName + "@");
      arrData.push(rate + "@");
      arrData.push(quantity + "@");
      arrData.push(total + "@");
      arrData.push(cgst + "@");
      arrData.push(sgst + "@");
      arrData.push(igst + "@");
      arrData.push(finalAmount + "@");
      arrData.push(description + "@");
      arrData.push(productId + "@");
      arrData.push(staffId1 + "@");
      arrData.push(productType + "@");
      staffData.push(staffId1);
    });
    //  alert(enquirytablelength)
    //  alert(enquirytablelength>0)
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

    self.state.staffData1 = staffData.toString();

    self.setState({
      staffData1: staffData.toString(),
    })

    this.setState({
      invoiceData: arrData.toString(),


    });

    if (this.state.payment_status == "UnPaid") {
      this.state.paymentMode = "-";
    }



alert("invoiceData"+this.state.invoiceData.toString());

    if ((this.state.customerName.length > 0)) {
      if ((this.state.invoiceData.trim().length > 1)) {
        if ((this.state.invoiceDate.trim().length > 1) && (this.state.dueDate.trim().length > 1)) {
          if ((this.state.paymentMode != "")) {
            $.ajax({
              type: 'POST',
              data: JSON.stringify({
                customerName: this.state.customerName,
                //  invoiceNo: this.state.invoiceNo,
                orderNumber: this.state.orderNumber,
                companyName: this.state.companyName,
                invoiceDate: this.state.invoiceDate,
                dueDate: this.state.dueDate,
                organizationName: companyName,
                invoiceData: this.state.invoiceData.toString(),
                enquiryData: this.state.enquiryData.toString(),
                staffData1: staffData.toString(),
                date: this.state.date,
                customerId: this.state.customerId,
                contactNo: this.state.contactNo,
                totalcgst: (Math.round(subtotal_cgst * 100) / 100).toFixed(2),
                totalsgst: (Math.round(subtotal_sgst * 100) / 100).toFixed(2),
                totaligst: (Math.round(subtotal_igst * 100) / 100).toFixed(2),
                discount: (Math.round(this.state.discount * 100) / 100).toFixed(2),
                subtotal1: (Math.round(this.state.subtotal1 * 100) / 100).toFixed(2),
                totalgst: (Math.round(this.state.totalgst * 100) / 100).toFixed(2),
                balance_amount: (Math.round(this.state.balance_amount * 100) / 100).toFixed(2),
                advance: (Math.round(this.state.advance * 100) / 100).toFixed(2),
                totalitemqty: this.state.totalitemqty,
                payment_status: this.state.payment_status,
                address: this.state.address,
                gstNo: this.state.gstNo,
                email: this.state.email,
                companyId: this.state.companyId,
                sms: this.state.sms,
                emailoption: this.state.emailoption,
                paymentMode: this.state.paymentMode,
                customerRewardPoint: self.state.customerRewardPoint,
                customerExpiryDate: self.state.expiryDate,
                redeemPointToUse: self.state.redeemPointToUse,
                redeemAmountToUse: this.state.redeemAmountToUse,
                rewardPointLiability: this.state.RewardPointLiability,
                //    staffId: this.state.staffName.toString(),
                staffId: self.state.staffId,
                employeeName: self.state.employeeName,
                role: self.state.role,

              }),

              url: " http://15.206.129.105:8080/MerchandiseAPI/saleorder/addsaleorder",
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
                    title: 'Hello ' + self.state.customerName + ' Welcome To ' + companyName + ' Your Invoice [' + data.invoiceNo + '] '
                      + ' Has Been Created. Your Invoice Amount is Rs. ' + self.state.subtotal1, // Message dialog  
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
                        title: 'View Cancelled For Sale order [' + data.invoiceNo + '] for amount Rs.' + self.state.subtotal1 + ' is Generated', // Message dialog  
                        showConfirmButton: false,
                        timer: 2000,
                      })

                      ReactDOM.render(<SaleOrder1 />, document.getElementById("contentRender"));

                    }
                  })

                  var today = new Date();
                  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();




                  //   self.state.invoiceNo = "";
                  self.state.orderNumber = "";
                  self.state.totalVisit = "";
                  self.state.lastVisit = "";
                  self.state.totalRevenue = "";
                  self.state.description = "";
                  self.state.rate = "";
                  self.state.quantity = "";
                  self.state.total = "";
                  self.state.cgsta = "";
                  self.state.sgsta = "";
                  self.state.igsta = "";
                  self.state.finalAmount = "";
                  self.state.payment_status = "";
                  self.state.subtotal1 = 0;
                  self.state.totalgst = 0;
                  self.state.totalitemqty = 0;
                  self.state.discount = 0;
                  self.state.advance = "";
                  self.state.TotalWithoutGST = 0;
                  self.state.formValid = false;
                  self.state.formValid1 = false;
                  self.state.redeemPointToUse = 0;
                  self.state.redeemAmountToUse = 0;
                  $("#tablecontents").empty();
                  $("#tableHeadings").hide();
                  $("#tableHeadingsEnquiry").hide();
                  $("#tableHeadingsEnquiry_Header").hide();
                  $('[name=productName]').val('');
                  $('[name=customerName]').val('');
                  $('#productName').html('');
                  $('#customerName').html('');
                  self.setState({
                    customerName: '',
                    //  invoiceNo: '',
                    orderNumber: '',
                    totalVisit: '',
                    invoiceDate: date,
                    dueDate: date,
                    description: '',
                    rate: '',
                    quantity: '',
                    total: '',
                    cgsta: '',
                    sgsta: '',
                    igsta: '',
                    finalAmount: '',
                    lastVisit: '',
                    totalRevenue: '',

                    productName: '',
                    totalqty: '',
                    subtotal1: 0,
                    TotalWithoutGST: 0,
                    totalitemqty: 0,
                    redeemPointToUse: 0,
                    redeemAmountToUse: 0,
                    totalgst: 0,
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

                  subtotal_cgst = 0;
                  subtotal_igst = 0;
                  subtotal_sgst = 0;
                  //  self.GetInvoiceNo();
                  self.SelectCustomer();
                  //    self.handleCustomerDetails();






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
            title: 'Kindly Select Due Dates',
            showConfirmButton: false,
            timer: 2000
          })
        }

      }
      else {


        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No items in Cart',
          showConfirmButton: false,
          timer: 2000
        })
      }

    }
    else {


      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Kindly Select Customer Name',
        showConfirmButton: false,
        timer: 2000
      })
    }
    var numtoword = numberToWord(Number(self.state.subtotal1));
    $("#numWords").text(Case.capital(numtoword));
  }

  ViewFunc() {
    ReactDOM.render(
      <Router >
        <div>
          <Route path="/" component={InvoiceList} />
        </div>
      </Router>, document.getElementById('contentRender'));
  }
  NoAction() {
    ReactDOM.render(
      <Router >
        <div>
          <Route path="/" component={SaleOrder1} />
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
    self.state.cgsta = "";
    self.state.sgsta = "";
    self.state.igsta = "";
    self.state.finalAmount = "";
    self.state.payment_status = "Unpaid";
    self.state.subtotal1 = 0;
    self.state.totalgst = 0;
    self.state.totalitemqty = 0;
    self.state.discount = 0;
    self.state.advance = "";
    self.state.TotalWithoutGST = 0;
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
      cgsta: '',
      sgsta: '',
      igsta: '',
      finalAmount: '',
      lastVisit: '',
      totalRevenue: '',

      productName: '',
      totalqty: '',
      subtotal1: 0,
      TotalWithoutGST: 0,
      totalitemqty: 0,
      totalgst: 0,
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
    subtotal_cgst = 0;
    subtotal_igst = 0;
    subtotal_sgst = 0;
  }
  AddToCart() {
    var self = this;

    $("#numWords").show();
    if ((this.state.staffName.length != 0) && this.state.finalAmount != 0 && this.state.cgsta.length != 0 && this.state.sgsta.length != 0 && this.state.igsta.length != 0) {
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
      this.state.subtotal1 = Math.round(Number(this.state.subtotal1) + (Number(this.state.finalAmount)));

      if (this.state.quantity != "-") {
        this.state.totalitemqty = Math.round(Number(this.state.totalitemqty) + Number(this.state.quantity));
      }

      this.state.totalgst = Math.round(Number(this.state.totalgst) + Math.round(Number(this.state.totalgst_rs)));
      this.state.TotalWithoutGST = Math.round(Number(this.state.TotalWithoutGST) + Number(this.state.total));


      subtotal_cgst = Math.round(Number(subtotal_cgst) + ((0.01 * Number(self.state.cgsta)) * Number(self.state.total)));
      subtotal_sgst = Math.round(Number(subtotal_sgst) + ((0.01 * Number(self.state.sgsta)) * Number(self.state.total)));
      subtotal_igst = Math.round(Number(subtotal_igst) + ((0.01 * Number(self.state.igsta)) * Number(self.state.total)));

      var payament_status_details;



      var tab = '<tr style={{backgroundColor: "white",fontColor:"black",fontWeight:"bold"}} id="tabletextcol" >'
        + '<td>' + self.state.productName + '</td><td>' + self.state.rate + '</td>'
        + '<td>' + self.state.quantity + '</td><td>' + self.state.total + '</td>'
        + '<td>' + self.state.cgsta + '</td><td>' + self.state.sgsta + '</td>'
        + '<td  id="Gstcal" >' + self.state.igsta + '</td>'
        + '<td  id="finalAmountcal" >' + self.state.finalAmount + '</td>'
        + ' <td> ' + self.state.staffName + ' </td>'
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

if(Number(this.state.subtotal1)<Number(this.state.rewardAmount)){
  $("#redeemPoint").hide();
      $("#redeemPoint1").hide();

}else{
  $("#redeemPoint").show();
  $("#redeemPoint1").show();
}

      self.state.description = "";
      self.state.rate = "";
      self.state.quantity = "";
      self.state.total = "";
      self.state.cgsta = "";
      self.state.sgsta = "";
      self.state.igsta = "";
      self.state.finalAmount = "";
      self.state.productId = "";
      self.state.selectedProductName = "";
      //   self.state.TotalWithoutGST="";
      $('[name=productName]').val('');
      $("#quantity").show();
      $("#quantity1").show();
      $('[name=staffName]').val('');
      $("#total").show();
      $("#total1_Input").show();
      $("#total1").show();
      $("#quantity1_Input").show();
      $("#paymentmodetd").show();
  
      self.setState({

        description: '',
        rate: '',
        amount: '',
        quantity: '',
        total: '',
        cgsta: '',
        sgsta: '',
        igsta: '',
        finalAmount: '',
        productName: '',
        productId: '',
        selectedProductName: '',
        TotalWithoutGST: this.state.TotalWithoutGST,
        totalgst: this.state.totalgst,
        totalitemqty: this.state.totalitemqty,
        balance_amount: this.state.subtotal1,
        discount: 0,
        advance: this.state.subtotal1,
        staffName: '',

      });
      advancebalance_calc = this.state.subtotal1;

      var numtoword = numberToWord(Number(self.state.subtotal1));
      $("#numWords").text(Case.capital(numtoword));
      $(".heightWidth").hide();


    } else {

      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Select Product, StaffName and Make sure rate is specified',
        showConfirmButton: false,
        timer: 2000
      })
    }
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
      var cgst_item_qty_rowcell = currentRow.find("td:eq(4)").html(); // get current row 2nd table cell TD value
      var sgst_item_qty_rowcell = currentRow.find("td:eq(5)").html(); // get current row 2nd table cell TD value
      var igst_item_qty_rowcell = currentRow.find("td:eq(6)").html();
      var TotalWithoutGST_rowcell = currentRow.find("td:eq(3)").html(); // get current row 2nd table cell TD value


      var subtotalvaluedecrement = currentRow.find("td:eq(7)").html(); // get current row 2nd table cell TD value

      self.DeleteQuantityUpdate(productName_item_qty_rowcell, total_item_qty_rowcell);


      self.state.TotalWithoutGST = Math.round(Number(self.state.TotalWithoutGST) - Number(TotalWithoutGST_rowcell));
      self.state.subtotal1 = Math.round(Number(self.state.subtotal1) - (Number(subtotalvaluedecrement)));

      if (total_item_qty_rowcell != "-") {
        self.state.totalitemqty = Math.round(Number(self.state.totalitemqty) - Number(total_item_qty_rowcell));
      }

      var In_rs_gst = Math.round(((Number(cgst_item_qty_rowcell) + Number(sgst_item_qty_rowcell) + Number(igst_item_qty_rowcell)) * 0.01) * Number(TotalWithoutGST_rowcell));
      self.state.totalgst = Math.round(Number(self.state.totalgst) - Number(In_rs_gst));

      subtotal_cgst = Math.round(Number(subtotal_cgst) - ((0.01 * Number(cgst_item_qty_rowcell)) * Number(TotalWithoutGST_rowcell)));
      subtotal_sgst = Math.round(Number(subtotal_sgst) - ((0.01 * Number(sgst_item_qty_rowcell)) * Number(TotalWithoutGST_rowcell)));
      subtotal_igst = Math.round(Number(subtotal_igst) - ((0.01 * Number(igst_item_qty_rowcell)) * Number(TotalWithoutGST_rowcell)));


      var cgst_item_qty_rowcell = Math.round((0.01 * (Number(cgst_item_qty_rowcell)) * Number(subtotalvaluedecrement)));
      var cgst_item_qty_rowcell_another = Math.round((0.01 * (Number(cgst_item_qty_rowcell)) * (subtotalvaluedecrement)));

      self.state.redeemAmountToUse = 0;
      self.state.redeemPointToUse = 0;
      self.setState({
        subtotal1: self.state.subtotal1,
        TotalWithoutGST: self.state.TotalWithoutGST,
        totalitemqty: self.state.totalitemqty,
        totalgst: self.state.totalgst,
        advance: 0,
        discount: 0,
        balance_amount: self.state.subtotal1,
        payment_status: "Unpaid",
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

  AddToCartQuantityUpdate() {

    var self = this;

    for (var k = 0; k < saleRateArray.length; k++) {
      var temp = JSON.parse(saleRateArray[k]);

      if (temp.productName == self.state.productName) {

        var productName = temp.productName;
        var rate = temp.rate;
        var description = temp.description;
        var cgsta = temp.cgsta;
        var sgsta = temp.sgsta;
        var igsta = temp.igsta;


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
          cgsta: cgsta,
          sgsta: sgsta,
          igsta: igsta,

          productType: productType,
          quantity: quantity,
          quantityLimit: quantityLimit,
          productId: productId
        });
        saleRateArray.push(feed);

        if (Number(quantity) <= Number(quantityLimit)) {


          toaster.notify(<div><div style={{ color: "Red" }}>Stock Below Limit - {this.state.productName}</div>
            <div style={{ color: "Red" }}>Available Quantity - {quantity}</div></div>, {
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
        var cgsta = temp.cgsta;
        var sgsta = temp.sgsta;
        var igsta = temp.igsta;


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
          cgsta: cgsta,
          sgsta: sgsta,
          igsta: igsta,

          productType: productType,
          quantity: quantity,
          quantityLimit: quantityLimit,
          productId: productId


        });
        saleRateArray.push(feed);
        this.selectProduct();
        break;
      }

    }

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
    this.state.cgsta = "";
    this.state.sgsta = "";
    this.state.igsta = "";
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
    this.state.TotalWithoutGST = "";
    this.state.totalgst = 0;
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
      cgsta: this.state.cgsta,
      sgsta: this.state.sgsta,
      igsta: this.state.igsta,
      finalAmount: this.state.finalAmount,
      redeemAmountToUse: this.state.redeemAmountToUse,
      redeemPointToUse: this.state.redeemPointToUse,

      TotalWithoutGST: this.state.TotalWithoutGST,
      totalgst: this.state.totalgst,
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
    //   alert(this.state.backButtonVariable)
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

  ResponseCalculation(data) {

    var self = this;
    $("#tablecontents").empty();


    var tab = "";

    var subtotal_cgst = 0;
    var subtotal_sgst = 0;
    var subtotal_igst = 0;
    self.state.TotalWithoutGST = 0;
    self.state.totalgst = 0;
    self.state.subtotal1 = 0;
    self.state.totalitemqty = 0;


    $.each(data.responseListdata, function (i, item) {

      //CALCULATION FOR sale ROW


      if (item.productType == "service") {
        self.state.total = item.rate;  //near quantity

      } else {
        self.state.total = Math.round(Number(item.rate) * Number(item.quantity));
      }

      self.state.finalAmount = Math.round(Number(self.state.total) + ((0.01 * Number(item.cgst)) * Number(self.state.total)) +
        (0.01 * Number(item.sgst) * Number(self.state.total)) + (0.01 * Number(item.igst) * Number(self.state.total)));

      self.state.totalgst_rs = Math.round(((0.01 * Number(item.cgst)) * Number(self.state.total)) +
        (0.01 * Number(item.sgst) * Number(self.state.total)) + (0.01 * Number(item.igst) * Number(self.state.total)));

      self.setState({
        total: self.state.total,
        finalAmount: self.state.finalAmount,
        totalgst_rs: self.state.totalgst_rs,
      });


      //CALCULATION FOR FINAL AMOUNTS
      self.state.subtotal1 = Math.round(Number(self.state.subtotal1) + (Number(self.state.finalAmount)));


      if (item.quantity != "-") {
        self.state.totalitemqty = Math.round(Number(self.state.totalitemqty) + Number(item.quantity));
      }

      self.state.totalgst = Math.round(Number(self.state.totalgst) + Math.round(Number(self.state.totalgst_rs)));
      self.state.TotalWithoutGST = Math.round(Number(self.state.TotalWithoutGST) + Number(self.state.total));


      subtotal_cgst = Math.round(Number(subtotal_cgst) + ((0.01 * Number(item.cgst)) * Number(self.state.total)));
      subtotal_sgst = Math.round(Number(subtotal_sgst) + ((0.01 * Number(item.sgst)) * Number(self.state.total)));
      subtotal_igst = Math.round(Number(subtotal_igst) + ((0.01 * Number(item.igst)) * Number(self.state.total)));

      self.setState({

        TotalWithoutGST: self.state.TotalWithoutGST,
        totalgst: self.state.totalgst,
        totalitemqty: self.state.totalitemqty,
        balance_amount: self.state.subtotal1,
        discount: 0,
        advance: 0,

      });


      tab += '<tr style={{backgroundColor: "white",fontColor:"black",fontWeight:"bold"}} id="tabletextcol" >'
        + '<td>' + item.productName + '</td><td>' + item.rate + '</td><td>' + item.quantity + '</td>'
        + '<td>' + self.state.total + '</td><td>' + item.cgst + '</td><td>' + item.sgst + '</td>'
        + '<td  id="Gstcal" >' + item.igst + '</td><td  id="finalAmountcal" >' + self.state.finalAmount + '</td>'
        + ' <td class="heightWidth" > ' + item.staffName + ' </td>'
        + '<td  class="heightWidth" >' + item.description + '</td><td  class="heightWidth" >' + item.productId + '</td>'
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

        <div class="">
          <div class="" style={{ backgroundColor: "white" }}>
            <h4 style={{ fontWeight: "300", color: "black", fontSize: "30px" }}>Sale Invoice</h4>
            {/* <hr></hr> */}
          </div>
          <div>
            {/* section 1.0 new frame */}
            {/* section 1 selction for bill */}
            <div className="row" style={{}} >







              <div className="col-lg-8" style={{ backgroundColor: "", }}>
                <div class="row" style={{ backgroundColor: "" }}>
                  <div class="col-xs-12 col-sm-4 col-lg-4 ">
                    <label class="control-label selectpicker" for="customerName">Customer Name</label>
                    <SelectSearch options={this.state.options1} value={this.state.selectedCustomerName}
                      onChange={(e) => this.handleCustomerDetails(e)} name="customerName" placeholder="Select Customer " />
                    <a href="#myModal" data-toggle="modal" data-target="#myModal" >
                      <span
                        style={{
                          color: "blue",
                        }}> +Add Customer</span>
                    </a>
                  </div>
                  <div class="col-xs-12 col-sm-4 col-lg-4 ">
                    <label class="control-label selectpicker " for="customerName">Product</label>
                    <SelectSearch options={this.state.options} value={this.state.selectedProductName} id="productName"
                      onChange={(e) => this.handleProductDetails(e)} name="productName" placeholder="Select Product " />

                    <a href="#myModal1" data-toggle="modal" data-target="#myModal1" >
                      <span
                        style={{
                          color: "blue"
                        }}> +Add_Product</span>
                    </a>
                  </div>
                  <div class="col-xs-12 col-sm-4 col-lg-4 ">
                    <label class="control-label selectpicker" id="quantity" for="customerName">Quantity</label>
                    <input type="number" min="1"
                      class="form-control" value={this.state.quantity}
                      onChange={this.handleUserQuantity} name="quantity" id="quantity1_Input" />
                    <span id="quantityalertmsg" style={{ color: "red" }}></span>
                  </div>
               
                </div>
                <div class="" style={{ backgroundColor: "" }}>
                  <div class="table-responsive">
                    <table class="table" style={{ marginBottom: "0px" }}>
                      <thead>
                        <tr>
                          <th>Order Number</th>
                          <th>Invoice Date</th>
                          <th>Due Date</th>
                          {/*  <th>Customer Name</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <input readOnly type="text" class="form-control" value={this.state.orderNumber} onChange={this.handleUserInput} name="orderNumber" id="orderNumber" />
                          </td>
                          <td>
                            <input type="text" class="form-control" value={this.state.invoiceDate} id="invoiceDate" name="invoiceDate"
                              onChange={this.handleUserInput} />
                          </td>
                          <td>
                            <input type="text" class="form-control" value={this.state.dueDate} id="dueDate" name="dueDate"
                              onChange={this.handleUserInput} />
                          </td>
                          {/* <td>
              <SelectSearch options={this.state.options1} value={this.state.selectedCustomerName} onChange={(e) => this.handleCustomerDetails(e)} name="customerName" placeholder="Select Customer " />
             </td> */}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* section old */}
                <div class="row" style={{ backgroundColor: "" }}>
                  <div class="col-xs-12 col-sm-4 col-lg-4 ">
                    <label class="control-label selectpicker" for="customerName">Service By</label>


                    <select id="staffName" className="form-control" onChange={this.handleUserInput} name="staffName" required>
                    </select>




                  </div>
                  <div class="col-xs-12 col-sm-4 col-lg-4 ">
                    <label class="control-label selectpicker " for="customerName">Description</label>
                    <textarea type="text" class="form-control" value={this.state.description} onChange={this.handleUserInput} name="description" id="description" ></textarea>

                  </div>
                  <div class="col-xs-12 col-sm-4 col-lg-4 ">
                    <label>
                      <button type="button" onClick={() => this.AddToCart()} style={{ marginTop: "30px" }} class="btn btn-primary pull-right">AddToCart</button> <span></span>
                    </label>
                  </div>
                </div>
                <div class="">
                  <form class="form-horizontal form-bordered">
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
                      <table class="table" style={{ marginBottom: "0px" }}>
                        <thead>
                          <tr>
                            <th>Rate</th>
                            {/* <th id="quantity1">Quantity</th> */}
                            <th id="total1">Total</th>
                            <th>CGST(%)</th>
                            <th>SGST(%)</th>
                            <th>IGST(%)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><input class="col-sm-3" type="text"
                              class="form-control" value={this.state.rate}
                              onChange={this.handleUserHeightWidth} name="rate" id="rate" />
                            </td>
                  
                            <td id="total_Input"><input type="text" readOnly
                              class="form-control" value={this.state.total}
                              onChange={this.handleUserHeightWidth} name="total" id="total" />
                            </td>
                            <td>
                              <td><input type="number" class="form-control" value={this.state.cgsta} onChange={this.handleCgstSgstIgst} name="cgsta" id="cgsta" autocomplete="off" />
                              </td>
                            </td>
                            <td>
                              <input type="number" class="form-control" value={this.state.sgsta} onChange={this.handleCgstSgstIgst} name="sgsta" id="sgsta" autocomplete="off" />
                            </td>
                            <td>
                              <input type="number" class="form-control" value={this.state.igsta} onChange={this.handleCgstSgstIgst} name="igsta" id="igsta" autocomplete="off" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
               
                    <div style={{ paddingTop: "10px" }}>
                      <form class="form-inline">
                        <label style={{ padding: " 0px 10px" }}>
                          Final Amount </label>
                        <input type="text" readOnly class="form-control"
                          value={this.state.finalAmount} onChange={this.handleUserHeightWidth}
                          name="finalAmount " id="finalAmount " />
                      </form>
                    </div>
                    {/* section 1 end */}
                    <div id="insufficientdiv">
                      <span>Insufficient Quantity For The Products</span>
                      <table id="insufficienttable">
                      </table>
                      <span style={{ color: "red" }}>**Cart Is Updated With Available Quantity </span>
                    </div>
                    {/* section 2 table for selected products */}
                    <div id="tableOverflow" style={{ overflow: "auto" }}>
                      <table class="table" id="tableHeadings">
                        <thead>
                          <tr>
                            <th>ProductName</th>
                            <th>Rate</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>CGST (%)</th>
                            <th>SGST (%)</th>
                            <th>IGST (%)</th>
                            <th>Final Amount</th>
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

                    {/*///// section 2 end*/}
                  </form>
                </div>
              </div>
              <div className="col-lg-4" style={{ borderRadius: "30px", backgroundColor: "rgba(202, 198, 198, 0.19)", border: "1px #423b3882 solid" }}>
                {/* section 3 grand total calculation */}
                <div className="row">
                  <div class="form-group">
                    {/*  <div class="col-sm-6">
          <p class="lead">Total Qty: {this.state.totalitemqty} <span name="totalitemqty" id="totalitemqty"></span></p>
          <p class="lead">Amount In Words:  <span id="numWords"></span> Rupees Only</p>
padding-top: 30px;
}
         </div> */}
                    <div class="">
                      <div class="table-responsive">
                        <table class="table" style={{ borderTop: "none", marginTop: "20px" }} >
                          <tbody>
                            <tr><th style={{ width: "50%", borderTop: "none" }}>TotalWithoutGST(Rs):</th>
                              <td style={{ borderTop: "none",width:"175%" }}><input name="TotalWithoutGST"  readOnly type="text" value={this.state.TotalWithoutGST} id="TotalWithoutGST" class="form-control" />{/* ₹ <span id="subtotal"></span> */}</td>
                              <input type="hidden" name="TotalWithoutGST" id="TotalWithoutGST" /> </tr>
                            <tr><th style={{ width: "50%", borderTop: "none" }}>Total GST(Rs)</th>
                              <td style={{ borderTop: "none" }}><input name="totalgst" readOnly type="text" value={this.state.totalgst} id="totalgst" class="form-control" />{/* ₹ <span id="subtotal"></span> */}</td>
                              <input type="hidden" name="totalgst" id="totalgst" />
                              {/*  <td> ₹ {this.state.totalgst} <span id="tgst"></span></td>*/}
                            </tr>
                            <tr><th style={{ width: "50%", borderTop: "none" }}>NetAmount(Rs):</th>
                              <td style={{ borderTop: "none" }}><input name="subtotal" readOnly type="text" value={this.state.subtotal1} id="subtotal" class="form-control" />{/* ₹ <span id="subtotal"></span> */}</td>
                              <input type="hidden" name="subtotal1" id="subtotal1" /> </tr>

                            <tr id="redeemPoint"><th style={{ width: "50%" }}>RedeemPoint:</th>
                              <td><input name="redeemPointToUse" onChange={this.handleMinRewardRedeemPointCalc} type="number" value={this.state.redeemPointToUse} id="redeemPointToUse" class="form-control" />{/* ₹ <span id="subtotal"></span> */}</td>
                              <input type="hidden" name="redeemPointToUse" id="redeemPointToUse" /> </tr>
                            <tr id="redeemPoint1"><th style={{ width: "50%" }}>RedeemAmount(Rs):</th>
                              <td><input name="redeemAmountToUse" readOnly type="number" value={this.state.redeemAmountToUse} id="redeemAmountToUse" class="form-control" />{/* ₹ <span id="subtotal"></span> */}</td>
                              <input type="hidden" name="redeemAmountToUse" id="redeemAmountToUse" /> </tr>

                              <tr><th style={{ width: "50%", borderTop: "none" }}>Discount(Rs):</th>
                              <td style={{ borderTop: "none" }}>
                                <input name="discount" type="text" id="discount"
                                  value={this.state.discount}
                                  onChange={this.DiscountCalc} class="form-control discount" /></td>
                            </tr>


                            <tr><th style={{ width: "50%", borderTop: "none" }}>Amount Paid(Rs):</th>
                              <td style={{ borderTop: "none" }}>
                                <input name="advance" type="text" id="advance"
                                  value={this.state.advance}
                                  onChange={this.AdvanceCalc} class="form-control advance" /></td>
                            </tr>
                         
                            <tr> <th style={{ width: "50%", borderTop: "none" }}>Balance Amount(Rs):</th>
                              <td style={{ borderTop: "none" }} name="balance" class="grand_total" >₹ {this.state.balance_amount} <span id="total"></span></td>
                            </tr>
                            <tr> <th style={{ width: "50%", borderTop: "none" }}>Total Qty:</th>
                              <td style={{ borderTop: "none" }} name="" class="" > {this.state.totalitemqty} </td>
                            </tr>
                            <tr> <th style={{ width: "50%", borderTop: "none" }}>Net Amount In Words:</th>
                              <td style={{ borderTop: "none" }} name="" class="" > <span id="numWords"></span> Rupees Only </td>
                            </tr>
                            <tr> <th style={{ width: "50%", borderTop: "none" }}>Payment Status:</th>
                              <td style={{ borderTop: "none" }} name="payment_status" class="grand_total" >₹ {this.state.payment_status} <span id="payment_status"></span></td>
                            </tr>
                            <tr id="paymentmodetd"><th style={{ borderTop: "none" }}>Payment Mode</th>
                              <td style={{ borderTop: "none" }} >
                                <SelectSearch options={this.state.paymentoptions} value={this.state.selectedPaymentMode}
                                  onChange={(e) => this.handlePaymentModeDetails(e)} name="paymentMode" placeholder="Select Payment Mode " />
                              </td>
                            </tr>
                            <tr > <th style={{ borderTop: "none" }}></th>
                              <td style={{ borderTop: "none" }}>
                                <input type="checkbox" class="CheckBoxClass" name="sms" value="sms" onChange={this.handleUserInput} id="defaultUnchecked" />
                                <label class="custom-control-label" for="defaultUnchecked"> SMS</label>
                              </td>
                            </tr>
                            <tr > <th style={{ borderTop: "none" }}></th>
                              <td style={{ borderTop: "none" }}>
                                <input type="checkbox" class="CheckBoxClass" name="emailoption" onChange={this.handleUserInput} value="emailoption" id="defaultUnchecked" />
                                <label class="custom-control-label" for="defaultUnchecked"> Email</label></td>
                            </tr>
                            <tr>
                              <td style={{ borderTop: "none" }}>
                                <button type="button" onClick={() => this.SaleInvoiceFunc()} style={{ marginRight: "5px" }} class="btn btn-primary pull-right">SaveInvoice</button> <span></span>
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
                </div>
              </div>
              {/* row ends */}
            </div>
          </div>
        </div>
        <div style={{ position: " ", zIndex: "0" }}>
          <div class="modal fade" id="myModal"  >
            <div class="modal-dialog">

              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title" style={{ align: "center", display: "contents" }}>Add Customer</h4>
                  <button type="button" class="close" style={{ color: "black" }}
                    onClick={() => this.closeFunc()} data-dismiss="modal">&times;</button>


                </div>
                <div id="mymodal" class="modal-body" >
                  <div class="form-body">
                    <div style={{ color: "red" }} className="panel panel-default">
                      <FormErrors style={{ color: "red" }} formErrors={this.state.formErrors} />
                    </div>

                    <form class="form-horizontal form-bordered" name="submissions">
                      <div className={`form-group ${this.errorClass(this.state.formErrors.modalCustomerName)}`}>
                        <label class="control-label col-sm-5 font-weight-bold" for="modalCustomerName">CustomerName<span style={{ color: "red" }}>*</span></label>
                        <div class="col-sm-7">
                          <input type="text" class="form-control" id="modalCustomerName"
                            name="modalCustomerName" value={this.state.modalCustomerName}
                            onChange={this.handleUserInput} placeholder="Customer Name" />
                        </div>
                      </div>

                      <div className={`form-group ${this.errorClass(this.state.formErrors.modalContactNo)}`}>
                        <label style={{ fontWeight: "bold" }} class="control-label col-sm-5" for="contactNo"> Contact no<span style={{ color: "red" }}>*</span></label>

                        <div class="col-sm-7">
                          <input type="number" min="1" maxLength="10" class="form-control"
                            name="modalContactNo"
                            value={this.state.modalContactNo} onChange={this.handleUserInput}
                            id="modalContactNo" placeholder="Contact no" />
                        </div>
                      </div>
                      <div class="modal-footer">
                        <div class="form-group">
                          <div class="row" style={{ marginLeft: "2px" }}>
                            <div class="col-sm-offset-4 col-sm-8">
                              <button style={{ fontWeight: "bold" }} type="button"
                                disabled={!this.state.formValid} onClick={() => this.AddCustomerFunc()}
                                data-dismiss="modal" class="btn btn-primary">Submit</button> <span></span>

                              <button style={{ fontWeight: "bold" }} type="button"
                                onClick={() => this.ClearCustomerFunc()}
                                class="btn btn-primary">Clear</button>
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
                        <label class="control-label col-sm-2">CGST(%)</label>
                        <div class="col-sm-10">

                          <input type="number" min="0" class="form-control" value={this.state.modalcgst} onChange={this.handleUserInputProduct} name="modalcgst" id="modalcgst" placeholder="CGST...  " />


                        </div>
                      </div>
                      <div class="form-group">
                        <label class="control-label col-sm-2">SGST(%)</label>
                        <div class="col-sm-10">
                          <input type="number" min="0" class="form-control" value={this.state.modalsgst} onChange={this.handleUserInputProduct} name="modalsgst" id="modalsgst" placeholder="SGST...  " />

                        </div>
                      </div>

                      <div class="form-group">
                        <label class="control-label col-sm-2">IGST(%)</label>
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

          <div className='main'>
            <Notifications />
            ...
        </div>


          <div>
            <ToastsContainer store={ToastsStore} />
          </div>



        </div>
      </div>
    );
  }
}

export default SaleOrder1;