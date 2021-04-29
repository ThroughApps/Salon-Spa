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
import EstimateList from './EstimateList';


import toaster from "toasted-notes";
import "toasted-notes/src/styles.css"; // optional styles
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import moment from 'moment';
var numberToWord = require('npm-number-to-word');

var inputarray = [];
var testarray = [];
var customerarray = [];
var rougharray = [];
var tablecontentarray = [];
var advancebalance_calc;
var updateData = [];
var staffData = [];

//const numToWords = require('num-to-words');

var currentItemQuantity;
var currentItemLimitQuantity;

class EstimateReportUpdate1 extends Component {

    getInitialState() {
        return { height: '' }
    }
    constructor(props) {
        super(props)
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        // this.state.companyId = companyId;
        var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var rewardAmount = CryptoJS.AES.decrypt(localStorage.getItem('RewardAmount'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        var rewardPoint = CryptoJS.AES.decrypt(localStorage.getItem('RewardPoint'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        var expiryDuration = CryptoJS.AES.decrypt(localStorage.getItem('ExpiryDuration'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        var maxRewardLimit = CryptoJS.AES.decrypt(localStorage.getItem('MaxRewardLimit'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        var redeemAmount = CryptoJS.AES.decrypt(localStorage.getItem('RedeemAmount'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        var redeemPoint = CryptoJS.AES.decrypt(localStorage.getItem('RedeemPoint'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        var minRedeemRewardPoint = CryptoJS.AES.decrypt(localStorage.getItem('MinRedeemRewardPoint'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
      
        this.state = {
            date: date,

            customerName: this.props.customerName,
            contactNo: this.props.contact,
            id: this.props.id,
            orderNumber: this.props.orderNumber,
            invoiceDate: this.props.invoiceDate,
            dueDate: this.props.dueDate,
            address: this.props.address,
            gstNo: this.props.gstNo,
            email: this.props.email,
            customerId: this.props.customerId,
            payment_status: this.props.status,
            staffId:staffId,
            employeeName:employeeName,
           role:role, 
            email: this.props.email,
            address: this.props.address,
            companyName: this.props.companyName,
            balanceAmt: this.props.balanceAmt,
            advance: this.props.advance,
            discount: this.props.discount,
            lastVisit:this.props.lastVisit,
      totalRevenue:this.props.totalRevenue,
      enqdetails:this.props.enqdetails,
serviceBy:this.props.serviceBy,
customerRewardPointDB:this.props.customerRewardPointDB,
customerExpiryDateDB:this.props.customerExpiryDateDB,
rewardAmount: rewardAmount,
rewardPoint: rewardPoint,
maxRewardLimit: maxRewardLimit,
expiryDuration: expiryDuration,
redeemAmount: redeemAmount,
redeemPoint: redeemPoint,
minRedeemRewardPoint: minRedeemRewardPoint,
redeemPointToUse: 0,
redeemAmountToUse: 0,
 
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
            updateQuantity: '',
            //  staffId:this.props.staffId,
            productName: '',
            description: '',
            rate: '',
            quantity: '1',
            total: '',

            companyId: companyId,
            finalAmount: '',
            totalqty: '',

            subtotal1: 0,
            totalitemqty: 0,

            balance_amount: '',

            balance: '',
            modalCustomerName: '',
            modalContactNo: '',
            options: [],
            saleSale: '',
            purchaseSale: '',
            // payment_status: 'UnPaid',
            updateQuantity: '',
            staffName: '',

            formErrors: {
               
                modalproductName: '',
                modalproductType: '',
                modalproductCategory: '',
                modalpurchaseRate: '',
                modalsaleRate: '',
        
              },
             
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
                        <Route path="/" component={EstimateReportUpdate1} />
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
    SelectCustomer() {
        var self = this;
        var customerName;
        customerarray = [];
        updateData = [];
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

                $.each(data.selectsaleproductlist, function (i, item) {
                    options.push({ label: item.productName, value: item.productName });

                    //    productName += '<option value="' + item.productName + '">' + item.productName + '</option>'
                    var feed = JSON.stringify({
                        productName: item.productName,
                        rate: item.saleRate,
                        description: item.description,
                        productType: item.productType,
                        quantity: item.quantity,
                        productId: item.productId,
                        quantityLimit: item.quantityLimit

                    });
                    inputarray.push(feed);
                    
                });
                // $("#productName").append(productName);

                self.state.options = options;
                self.setState({
                    options: options,
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

            }
        });
    }


    componentDidMount() {

        window.scrollTo(0, 0);
        $("#insufficientdiv").hide();
        var rowCount= $('#tableHeadings tr').length;
        this.state.rowCount=rowCount;
        this.setState({
          rowCount:rowCount,
        })
        updateData = [];
        staffData = [];
     
        this.SelectCustomer();
        this.GetOrderDetails();
        this.DeleteButton();
        this.calculationFunc();
        this.selectStaff();
        this.redeemShowHide();
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
    selectStaff() {
        var staffName;
        var self = this;
        window.scrollTo(0, 0);
        var options2 = [];
        var EmpList = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('EmpList'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
        staffName += '<option  value="" disabled selected hidden>EmployeeName</option>';

        $.each(EmpList, function (i, item) {
            staffName += '<option value=" ' + item.staffName + '"> ' + item.staffName + '</option>'
        });
        $("#staffName").append(staffName);


    }
    calculationFunc() {
        var self = this;
        self.state.subtotal1 = "0 ";
        self.state.totalitemqty = "0";


        self.setState({
            rate: self.state.rate,
            quantity: self.state.quantity,
            totalitemqty: self.state.totalitemqty,

            total: self.state.total,
            subtotal1: self.state.subtotal1,
            finalAmount: self.state.finalAmount,
            balanceAmt: self.state.balanceAmt,

        })
        $("#tablecontents tr").each(function () {
            var currentRow = $(this);

            self.state.rate = currentRow.find("td:eq(1)").text();
            self.state.quantity = currentRow.find("td:eq(2)").text();
            self.state.finalAmount = currentRow.find("td:eq(3)").text();

            //  self.state.finalAmount = currentRow.find("td:eq(10)").text();




            self.state.subtotal1 = Math.round((Number(self.state.subtotal1) + Number(self.state.finalAmount)));

            if (self.state.quantity != "-") {
                self.state.totalitemqty = Math.round(Number(self.state.totalitemqty) + Number(self.state.quantity));
            }
            self.state.balanceAmt1 = Math.round((Number(self.state.subtotal1) - Number(self.state.balanceAmt)));
            if (Math.round((Number(self.state.subtotal1) - Number(self.state.balanceAmt))) == 0) {
                self.state.payment_status = "Paid";
            } else if (self.state.subtotal1 == self.state.balanceAmt) {
                self.state.payment_status = "UnPaid";
            } else {
                self.state.payment_status = "PartiallyPaid";
            }


        });
        self.state.description = "";
        self.state.rate = "";
        self.state.quantity = "";
        self.state.total = "";

        self.state.finalAmount = "";

        $('[name=productName]').val('');

        self.setState({

            description: '',
            rate: '',
            amount: '',
            quantity: '',
            total: '',

            finalAmount: '',
            productName: '',
            balance_amount: self.state.balanceAmt,
            balanceAmt: self.state.balanceAmt1,

            subtotal1: self.state.subtotal1,

            totalitemqty: self.state.totalitemqty,
            payament_status: self.state.payament_status,

            discount: self.state.discount,
            advance: self.state.advance,

        });
    }
    GetOrderDetails() {

        var self = this;

     

        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                date: this.props.date,
                id: this.props.id,
                companyId: this.state.companyId,
            }),
            url: " http://15.206.129.105:8080/MerchandiseAPI/EstimateReport/DailyEstimateReportData",
            contentType: "application/json",
            dataType: 'json',
            async: false,

            success: function (data, textStatus, jqXHR) {

          

                var tab;
                var count = data.length;
                
                var no;
                $.each(data, function (i, item) {
                    no = parseInt(i + 1);
                    if (item.product != null) {
                        if (item.qty == '-') {
                            self.state.totalitemqty = 0;

                        }

                        self.state.productName = item.product;
                        self.state.rate = item.rate;
                        self.state.quantity = item.qty;
                        self.state.total = item.total;
                        self.state.description = item.description;
                        self.state.staffName1 = item.serviceBy;
                        self.state.productId = item.productId;


                        self.setState({
                            productName: self.state.productName,
                            rate: self.state.rate,
                            quantity: self.state.quantity,
                            total: self.state.total,
                            description: self.state.description,
                            staffName1: self.state.staffName1,
                            totalitemqty: self.state.totalitemqty,
                            productId: self.state.productId,
                        })

                        tab += '<tr><td>' + self.state.productName + '</td>'
                            + '<td>' + self.state.rate + '</td><td>' + self.state.quantity + '</td><td>' + self.state.total + '</td><td>' + self.state.staffName1 + '</td>'
                            + '<td  class="heightWidth" >' + self.state.description + '</td><td  class="heightWidth">' + self.state.productId + '</td><td  class="heightWidth" >Exist</td><td><button id="delete">Delete</button></td></tr>';


                    }
                })

                $("#tablecontents").append(tab);
                $(".heightWidth").hide();
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
        this.setState({ [name]: value });
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
                // alert("SIGN VALUE :"+sign_data);
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

                    this.state[name] = '';
                    this.setState({ [name]: '' });

                }
            } else {

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
            size: self.state.size,
            amount: self.state.amount,
            total: self.state.total,
            finalAmount: self.state.finalAmount,



        });



    }


    AdvanceCalc = (e) => {

        /* $("#delete").keyup(function(event) {
           if (event.keyCode === 13) {
             e.preventDefault();
             //  $("#saleinvoice").click();
           }
         });*/

        const name = e.target.name;
        const value = e.target.value;

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
                //   alert("NO NUMBER FOR CHAR");
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


        this.state.balance_amount = Math.round((Number(this.state.subtotal1) - Number(this.state.balanceAmt)) - (Number(this.state.advance) + Number(this.state.discount)));

        if (this.state.balance_amount == 0) {
            this.state.payment_status = "Paid";

        } else if (this.state.subtotal1 == this.state.balance_amount) {
            this.state.payment_status = "UnPaid";

        } else {
            this.state.payment_status = "PartiallyPaid";

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

                    }
                } else {

                    this.state[name] = 0;
                    this.setState({ [name]: 0 });

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
        this.state.balance_amount = Math.round((Number(this.state.subtotal1) - Number(this.state.balanceAmt)) - (Number(this.state.advance) + Number(this.state.discount)));
        if (this.state.balance_amount == 0) {
            this.state.payment_status = "Paid";

        } else if (this.state.subtotal1 == this.state.balance_amount) {
            this.state.payment_status = "UnPaid";

        } else {
            this.state.payment_status = "PartiallyPaid";

        }

        this.setState({
            discount: state_value,
            balance_amount: this.state.balance_amount,
            payment_status: this.state.payment_status,
        })
    }
    handleProductDetails = (e) => {

        const name = e.name;
        const value = e.value;
        this.state.productName = value;

        testarray.push(this.state.productName);
        $("#quantity").show();
        $("#total1").show();
        $("#quantity1").show();
        $("#total").show();

        this.setState({
            [name]: value,
            selectedProductName: e,
            productNameValid: true
        });

        var self = this;


        for (var k = 0; k < inputarray.length; k++) {
            var temp = JSON.parse(inputarray[k]);

            if (temp.productName == self.state.productName) {

                if (temp.productType == "product") {
                    if (temp.quantity != 0) {


                        self.state.quantity = 1;
                        self.state.total = "";
                        self.state.finalAmount = "";

                        self.state.description = temp.description;
                        self.state.rate = temp.rate;
                        self.state.productType = temp.productType;
                        self.state.productQuantity = temp.quantity;
                        self.state.productId = temp.productId;
                        currentItemQuantity = temp.quantity;
                        currentItemLimitQuantity = temp.quantityLimit;
                        self.state.productType = temp.productType;

                        self.setState({
                            description: temp.description,
                            rate: temp.rate,
                            quantity: "1",
                            total: "",
                            finalAmount: "",
                            productQuantity: temp.quantity,
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
                   
                        break;

                    } else {
                        confirmAlert({
                            title: 'Cant Proceed Billing',                        // Title dialog
                            message: 'The Product ' + self.state.productName + ' Is Not In Stock',               // Message dialog
                            confirmLabel: 'Ok',                           // Text button confirm

                        });
                    }

                } else {
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
               
                    break;
                }


            }
        }

    }









    EstimateInvoiceFunc() {


        var self = this;
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

alert("CustomerRewardPoint :"+ self.state.customerRewardPoint);
          alert("expiryDate :"+ self.state.expiryDate);
        var arrData = [];
        staffData = [];
        // loop over each table row (tr)
        $("#tablecontents tr").each(function () {
            var currentRow = $(this);

            var productName = currentRow.find("td:eq(0)").text();
            var rate = currentRow.find("td:eq(1)").text();
            var quantity = currentRow.find("td:eq(2)").text();
            var total = currentRow.find("td:eq(3)").text();
            var staffId1 = currentRow.find("td:eq(4)").text();
            var description = currentRow.find("td:eq(5)").text();
            var productId = currentRow.find("td:eq(6)").text();

            var status = currentRow.find("td:eq(7)").text();
            var productType = currentRow.find("td:eq(8)").text();


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
            arrData.push(status + "@");
            arrData.push(productType + "@");
            staffData.push(staffId1);
        });

        this.state.invoiceData = arrData.toString();
        self.state.staffData1 = staffData.toString();

        this.setState({
            invoiceData: arrData.toString(),
            staffData1: staffData.toString(),

        });

        if ((this.state.customerName.length > 0)) {
            if ((this.state.invoiceData.trim().length > 1)) {
                if ((this.state.invoiceDate.trim().length > 1) && (this.state.dueDate.trim().length > 1)) {
                    $.ajax({
                        type: 'POST',
                        data: JSON.stringify({
                            customerName: this.state.customerName,
                            invoiceNo: this.state.id,
                            orderNumber: this.state.orderNumber,
                            companyName: this.state.companyName,
                            invoiceDate: this.state.invoiceDate,
                            dueDate: this.state.dueDate,
                            updateQuantity: this.state.updateQuantity.toString(),

                            staffData1: staffData.toString(),
                            invoiceData: this.state.invoiceData.toString(),
                            date: this.state.date,
                            customerId: this.state.customerId,
                            contactNo: this.state.contactNo,

                            discount: this.state.discount,
                            subtotal1: this.state.subtotal1,

                            balance_amount: this.state.balance_amount,
                            advance: this.state.advance,
                            totalitemqty: this.state.totalitemqty,

                            payment_status: this.state.payment_status,
                            address: this.state.address,
                            gstNo: this.state.gstNo,
                            email: this.state.email,
                            companyId: this.state.companyId,
                            // staffId:this.state.staffId,
                            staffId: self.state.staffId,
                            employeeName: self.state.employeeName,
                            role: self.state.role,
                            customerRewardPoint: self.state.customerRewardPoint,
                            customerExpiryDate: self.state.expiryDate,
                            redeemPointToUse: self.state.redeemPointToUse,
                            redeemAmountToUse: this.state.redeemAmountToUse,
                            rewardPointLiability: this.state.RewardPointLiability,
            
                        }),

                      //  url: " http://15.206.129.105:8080/MerchandiseAPI/saleorder/updateestimateorder",
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
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Estimate order is Updated Successfully',
                                    showConfirmButton: false,
                                    timer: 2000
                                })

                                ReactDOM.render(
                                    <Router >
                                        <div>
                                            <Route path="/" component={EstimateList} />
                                        </div>
                                    </Router>, document.getElementById('contentRender'));

                                var today = new Date();
                                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

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
                }
                else {

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
                    <Route path="/" component={EstimateList} />
                </div>
            </Router>, document.getElementById('contentRender'));
    }
    NoAction() {
        ReactDOM.render(
            <Router >
                <div>
                    <Route path="/" component={EstimateReportUpdate1} />
                </div>
            </Router>, document.getElementById('contentRender'));
    }


    AddToCart() {
        var self = this;

        if ((this.state.staffName.length != 0) && this.state.finalAmount != 0) {
            var currentproductvalue;

            this.AddToCartQuantityUpdate();

            this.state.subtotal1 = Math.round(Number(this.state.subtotal1) + Number(this.state.finalAmount));

            if (this.state.quantity != "-") {
                this.state.totalitemqty = Math.round(Number(this.state.totalitemqty) + Number(this.state.quantity));
            }
            var payament_status_details;
            var payament_status_details;
            self.state.balance_amount = Math.round(Number(this.state.subtotal1) - Number(this.state.balanceAmt));

         

            var tab = '<tr style={{backgroundColor: "white",fontColor:"black",fontWeight:"bold"}} id="tabletextcol" >'
                + '<td>' + self.state.productName + '</td><td>' + self.state.rate + '</td><td>' + self.state.quantity + '</td>'
                + '<td>' + self.state.total + '</td><td>' + self.state.staffName + '</td><td  class="heightWidth" >' + self.state.description + '</td>'
                + '<td  class="heightWidth" >' + self.state.productId + '</td>'
                + '<td  class="heightWidth" >New</td><td  class="heightWidth" >' + self.state.productType + '</td><td><button id="delete">Delete</button></td></tr>';

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
            $('[name=productName]').val('');
            $("#quantity").show();
            $("#quantity1").show();

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
                balance_amount: this.state.balance_amount,
                discount: this.state.discount,
                advance: this.state.advance,

            });

            var numtoword = numberToWord(Number(this.state.subtotal1));
            $("#numWords").text(Case.capital(numtoword));
            $(".heightWidth").hide();

        } else {

            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Select Product and Employee and Make sure rate is specified',
                showConfirmButton: false,
                timer: 2000
            })
        }
    }


    AddToCartQuantityUpdate() {

        var self = this;

        for (var k = 0; k < inputarray.length; k++) {
            var temp = JSON.parse(inputarray[k]);

            if (temp.productName == self.state.productName) {

                var productName = temp.productName;
                var rate = temp.rate;
                var description = temp.description;



                var productType = temp.productType;
                //  var quantity= temp.quantity;

                var quantity = Number(temp.quantity) - Number(self.state.quantity);
              

                var productId = temp.productId;
                var quantityLimit = temp.quantityLimit;


                inputarray.splice(k, 1);

                //INSERT NEW UPDATED QUANTITY INTO ARRAY
                var feed = JSON.stringify({
                    productName: productName,
                    rate: rate,
                    description: description,


                    productType: productType,
                    quantity: quantity,
                    quantityLimit: quantityLimit,
                    productId: productId,


                });
                inputarray.push(feed);

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
        for (var k = 0; k < inputarray.length; k++) {
            var temp = JSON.parse(inputarray[k]);

            if (temp.productName == productName_item_qty_rowcell) {

                var productName = temp.productName;
                var rate = temp.rate;
                var description = temp.description;
                var productType = temp.productType;
                var quantity = Number(temp.quantity) + Number(total_item_qty_rowcell);
                var productId = temp.productId;
                var quantityLimit = temp.quantityLimit;

                inputarray.splice(k, 1);
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
                inputarray.push(feed);
                break;
            }

        }
       
    }

    DeleteButton() {

        var self = this;
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

        $("#tableHeadings").on('click', "#delete", function () {

            var currentRow = $(this).closest("tr");

            var productName_item_qty_rowcell = currentRow.find("td:eq(0)").html();
            var rate_item_qty_rowcell = currentRow.find("td:eq(1)").html(); // get current row 2nd table cell TD value
            var total_item_qty_rowcell = currentRow.find("td:eq(2)").html(); // get current row 2nd table cell TD value
            var subtotalvaluedecrement = currentRow.find("td:eq(3)").html(); // get current row 2nd table cell TD value
            var productId = currentRow.find("td:eq(5)").html();
            var status = currentRow.find("td:eq(7)").html(); // get current row 2nd table cell TD value
            var zero = "Exist";
            self.DeleteQuantityUpdate(productName_item_qty_rowcell, total_item_qty_rowcell);

            if ((String(status) === String(zero))) {

                updateData.push(total_item_qty_rowcell);
                updateData.push(productId);
                updateData.push(self.state.companyId);


                self.state.updateQuantity = updateData.toString();

                self.setState({
                    updateQuantity: updateData.toString(),
                })
                self.state.subtotal1 = Math.round(Number(self.state.subtotal1) - Number(subtotalvaluedecrement));
                self.state.balance_amount = Math.round(Number(self.state.subtotal1) - Number(self.state.balanceAmt));

                if (total_item_qty_rowcell != "-") {
                    self.state.totalitemqty = Math.round(Number(self.state.totalitemqty) - Number(total_item_qty_rowcell));
                }
                if (self.state.balance_amount == 0) {
                    self.state.payment_status = "Paid";

                } else if (self.state.subtotal1 == self.state.balance_amount) {
                    self.state.payment_status = "UnPaid";

                } else {
                    self.state.payment_status = "PartiallyPaid";

                }

                self.setState({
                    subtotal1: self.state.subtotal1,
                    payment_status: self.state.payment_status,
                    totalitemqty: self.state.totalitemqty,
                    advance: self.state.advance,
                    discount: self.state.discount,
                    balance_amount: self.state.balance_amount,



                });


                currentRow.remove();
                var subtotal1 = self.state.subtotal1;

                if (subtotal1 == 0) {
                    $("#tableHeadings").hide();
                }
                var numtoword = numberToWord(Number(self.state.subtotal1));
                $("#numWords").text(Case.capital(numtoword));


            } else {
                self.state.subtotal1 = Math.round(Number(self.state.subtotal1) - Number(subtotalvaluedecrement));
                self.state.balance_amount = Math.round(Number(self.state.subtotal1) - Number(self.state.balanceAmt));

                if (total_item_qty_rowcell != "-") {
                    self.state.totalitemqty = Math.round(Number(self.state.totalitemqty) - Number(total_item_qty_rowcell));
                }
                if (self.state.balance_amount == 0) {
                    self.state.payment_status = "Paid";

                } else if (self.state.subtotal1 == self.state.balance_amount) {
                    self.state.payment_status = "UnPaid";

                } else {
                    self.state.payment_status = "PartiallyPaid";

                }

                self.setState({
                    subtotal1: self.state.subtotal1,
                    payment_status: self.state.payment_status,
                    totalitemqty: self.state.totalitemqty,
                    advance: self.state.advance,
                    discount: self.state.discount,
                    balance_amount: self.state.balance_amount,



                });


                currentRow.remove();
                var subtotal1 = self.state.subtotal1;

                if (subtotal1 == 0) {
                    $("#tableHeadings").hide();
                }
                var numtoword = numberToWord(Number(self.state.subtotal1));
                $("#numWords").text(Case.capital(numtoword));


            }


        });
    }

    BackbtnFunc() {
        var finalRowCount= $('#tableHeadings tbody tr').length;
    
        if(this.state.rowCount==finalRowCount){
          ReactDOM.render(
            <Router>
              <div>  
                <Route path="/" component={EstimateList} />  
              </div>
            </Router>,
            document.getElementById('contentRender'));
          registerServiceWorker();
        }
        else{
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
      ConfirmBack(){
        ReactDOM.render(
          <Router>
            <div>
    
              <Route path="/" component={EstimateList} />
    
    
            </div>
          </Router>,
          document.getElementById('contentRender'));
        registerServiceWorker();
      }
      CancelBack(){
    
    
     
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

    render() {
        return (

            <div class="container" style={{ width: "auto" }}>
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
           
             <div class="">
                <div class="" style={{ backgroundColor: "white" }}>
                 <h4 style={{ fontWeight: "300", color: "black", fontSize: "30px" }}>Estimate Invoice</h4>
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
               <input readOnly type="text" class="form-control" value={this.state.customerName} onChange={this.handleUserInput} name="customerName" id="customerName" />
                     
            </div>
                    <div class="col-xs-12 col-sm-4 col-lg-4 ">
                     <label class="control-label selectpicker " for="productName">Product</label>
                   
            <SelectSearch options={this.state.options} value={this.state.selectedProductName}
                                 onChange={(e) => this.handleProductDetails(e)} name="productName" placeholder="Select Product " />
            
            <a href="#myModal1" data-toggle="modal" data-target="#myModal1" >
                      <span
                       style={{
                        color: "blue"
                       }}> +Add_Product</span>
                     </a>
                    </div>
         
       <div class="col-xs-12 col-sm-4 col-lg-4 ">
         
         <label class="control-label selectpicker" for="quantity" id="quantity1">Quantity</label>
              
        <input type="text" min="1"
                     class="form-control" value={this.state.quantity}
                     onChange={this.handleUserQuantity} name="quantity" id="quantity" />
                     <span id="quantityalertmsg" style={{ color: "red" }}></span>
         </div> </div>
           <div class="" style={{ backgroundColor: "" }}>
                    <div class="table-responsive">
                     <table class="table" style={{ marginBottom: "0px" }}>
                      <thead>
                       <tr>
                        <th>Order Number</th>
                        <th>Invoice Date</th>
                        <th>Due Date</th>
                       
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
                  
                       </tr>
                      </tbody>
                     </table>
                    </div>
                   </div>
            <div class="row" style={{ backgroundColor: "" }}>
                    <div class="col-xs-12 col-sm-4 col-lg-4 ">
                     <label class="control-label selectpicker" for="customerName">Service By</label>
            
           <select id="staffName" className="form-control" onChange={this.handleUserInput} name="staffName" required>
                                   </select>
            </div>
                    <div class="col-xs-12 col-sm-4 col-lg-4 ">
                     <label class="control-label selectpicker " for="customerName">Description</label>
                    
              <textarea type="text" class="form-control" value={this.state.description} onChange={this.handleUserInputDescription} name="description" id="description" ></textarea>
                         
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
            
                         <th id="total1">Total</th>
                         <th>Final Amount</th>
                       
                        </tr>
                       </thead>
                       <tbody>
                           <tr>
            <td><input class="col-sm-3" type="text"
                                     class="form-control" value={this.state.rate}
                                     onChange={this.handleUserHeightWidth} name="rate" id="rate" />
                                   </td>
            
           <td><input type="text" readOnly
                                     class="form-control" value={this.state.total}
                                     onChange={this.handleUserHeightWidth} name="total" id="total" />
                                   </td>
            
             </tr>
                       </tbody>
                      </table>
                     </div>
             <div id="insufficientdiv">
                      <span>Insufficient Quantity For The Products</span>
                      <table id="insufficienttable">
                      </table>
                      <span style={{ color: "red" }}>**Cart Is Updated With Available Quantity </span>
                     </div>
              <div id="tableOverflow" style={{ overflow: "auto" }}>
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
             </form>
                   </div>
                  </div>
            <div className="col-lg-4" style={{ borderRadius: "30px", backgroundColor: "rgba(202, 198, 198, 0.19)", border: "1px #423b3882 solid" }}>
                   {/* section 3 grand total calculation */}
                   <div className="row">
                    <div class="form-group">
                
                     <div class="">
                      <div class="table-responsive">
                       <table class="table" style={{ borderTop: "none", marginTop: "20px" }} >
                        <tbody>
           <tr><th style={{ width: "50%" }}>Subtotal(Rs):</th>
                                       <td><input name="subtotal" readOnly type="text" value={this.state.subtotal1} id="subtotal" class="form-control" />{/* ₹ <span id="subtotal"></span> */}</td>
                                       <input type="hidden" name="subtotal1" id="subtotal1" /> </tr>
                                       <tr id="redeemPoint"><th style={{ width: "50%" }}>RedeemPoint:</th>
                          <td><input name="redeemPointToUse" onChange={this.handleMinRewardRedeemPointCalc} type="number" value={this.state.redeemPointToUse} id="redeemPointToUse" class="form-control" />{/* ₹ <span id="subtotal"></span> */}</td>
                          <input type="hidden" name="redeemPointToUse" id="redeemPointToUse" /> </tr>
                         <tr id="redeemPoint1"><th style={{ width: "50%" }}>RedeemAmount(Rs):</th>
                          <td><input name="redeemAmountToUse" readOnly type="number" value={this.state.redeemAmountToUse} id="redeemAmountToUse" class="form-control" />{/* ₹ <span id="subtotal"></span> */}</td>
                          <input type="hidden" name="redeemAmountToUse" id="redeemAmountToUse" /> </tr>
                                     <tr><th>Paid Amount(Rs):</th>
                                       <td>
                                         <input name="balanceAmt" type="text" id="balanceAmt"
                                           value={this.state.balanceAmt}
                                           readOnly class="form-control balanceAmt" /></td>
                                     </tr>
                                     <tr> <th>Balance Amount(Rs):</th>
                                       <td name="balance" class="grand_total" >₹ {this.state.balance_amount} <span id="total"></span></td>
                                     </tr>
                                     <tr> <th>Payment Status:</th>
                                       <td name="payment_status" class="grand_total" >₹ {this.state.payment_status} <span id="payment_status"></span></td>
                                     </tr>
                                     <tr><th></th>
            <td>
                                         <button type="button" onClick={() => this.EstimateInvoiceFunc()} style={{ marginRight: "5px" }} class="btn btn-primary pull-right">SaveInvoice</button> <span></span>
                                       </td>
                                       <td> <button onClick={() => this.CancelFunc()} type="button" style={{ marginRight: "5px" }} class="btn btn-primary pull-right">cancel</button> <span></span>
            
            
                                       </td>
                                     </tr>
                                   </tbody>
                                 </table></div>
            
            </div>
                    </div>
                   </div>
                  </div>
           
               
            <div style={{ position: " ", zIndex: "0" }}>
                <div class="modal fade" id="myModal1" >
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
                        <input type="number" min="0" class="form-control" value={this.state.modalquantity} onChange={this.handleUserInputProduct} name="modalquantity" id="modalquantity" placeholder="Quantity... " />
                       </div>
                      </div>
                      <div class="form-group" id="quantityLimit2">
                       <label class="control-label col-sm-2 remove" for="modalquantityLimit">Quantity Limit<span style={{ color: "red" }}>*</span></label>
                       <div class=" col-sm-10">
                        <input type="number" min="0" class="form-control" value={this.state.modalquantityLimit} onChange={this.handleUserInputProduct} name="modalquantityLimit" id="modalquantityLimit" placeholder="Quantity alert limit... " />
                       </div>
                       <label class="control-label col-sm-2 remove" for="modalquantityLimit"></label>
                       <div class=" col-sm-10">
                        <span style={{ color: "red" }}>*Enter quantity when do you want an alert ?</span>
                       </div>
                      </div>
                      <div class="form-group">
                       <label class="control-label col-sm-2">CGST(%)</label>
                       <div class="col-sm-10">
                        <input type="number" min="0" class="form-control" value={this.state.modalcgst} onChange={this.handleUserInputProduct} name="modalcgst" id="modalcgst" placeholder="CGST... " />
                       </div>
                      </div>
                      <div class="form-group">
                       <label class="control-label col-sm-2">SGST(%)</label>
                       <div class="col-sm-10">
                        <input type="number" min="0" class="form-control" value={this.state.modalsgst} onChange={this.handleUserInputProduct} name="modalsgst" id="modalsgst" placeholder="SGST... " />
                       </div>
                      </div>
                      <div class="form-group">
                       <label class="control-label col-sm-2">IGST(%)</label>
                       <div class="col-sm-10">
                        <input type="number" min="0" class="form-control" value={this.state.modaligst} onChange={this.handleUserInputProduct} name="modaligst" id="modaligst" placeholder="IGST... " />
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
                        <input type="number" min="0" class="form-control" value={this.state.modalsaleRate} onChange={this.handleUserInputProduct} name="modalsaleRate" id="modalsaleRate" placeholder="saleRate... " />
                       </div>
                      </div>
                      <div className={`form-group ${this.errorClass1(this.state.formErrors.modalpurchaseRate)}`}>
                       <label class="control-label col-sm-2" for="modalpurchaseRate"> Purchase Rate (Rs)<span style={{ color: "red" }}>*</span></label>
                       <div class="col-sm-10">
                        <input type="number" min="0" class="form-control" value={this.state.modalpurchaseRate} onChange={this.handleUserInputProduct} name="modalpurchaseRate" id="modalpurchaseRate" placeholder="purchaseRate.. " />
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
            </div></div></div>
                  
           
              );
    }
}

export default EstimateReportUpdate1;