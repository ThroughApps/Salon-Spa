import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import $ from 'jquery';
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import Case from "case";
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
//css
import 'react-confirm-alert/src/react-confirm-alert.css' // Import csst
import './datepicker.css';
import CryptoJS from 'crypto-js';
import { FormErrors } from './FormErrors';
import QuotationList from './QuotationList';
import SelectSearch from 'react-select';

//import 'siiimple-toast/dist/style.css';// style required
import Notifications, {notify} from 'react-notify-toast';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css"; // optional styles
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';

var numberToWord = require('npm-number-to-word');

var inputarray = [];
var testarray = [];
var customerarray = [];
var rougharray = [];
var tablecontentarray = [];
var insertarray = [];
var advancebalance_calc;
var subtotal_cgst = 0;
var subtotal_sgst = 0;
var subtotal_igst = 0;

var currentItemQuantity;
var currentItemLimitQuantity;

class GSTQuotation1 extends Component {
  constructor(data) {
    super(data)
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
   
   
    this.state = {
      date: date,
      modalproductName: '',
      modalproductCategory: '',
      modalproductType:'',
      modalquantity:0,
      modalquantityLimit:0,
      modalcgst: 0,
      modalsgst: 0,
      modaligst: 0,
      modalhsnCode: '',
      modalpurchaseRate: '',
      modalsaleRate: '',
      modaldescription: '',
      customerName: '',
      contactNo: '',
      staffId:staffId,
      employeeName:employeeName,
     role:role,    
     
     // invoiceNo: '',
      invoiceDate: date,
      dueDate: date,
      companyId:companyId,
      invoiceData: '',
      productName: '',
      saleType: '',
      description: '',  
      rate: '',      
      quantity: '1',
      total: '',
      cgsta: '',
      sgsta: '',
      igsta: '',
      finalAmount: '',
      totalqty: '',
      subtotal1: 0,
      totalitemqty: 0,
      totalgst: 0,
      balance_amount: '',
      adjustment: '',
      discount: 0,
      TotalWithoutGST:0,
      balance: '',
      saleSale: '',
      purchaseSale: '',
      payment_status: 'UnPaid',
      modalCustomerName:'',
      modalContactNo:'',
      options:[],
      formErrors: {
        modalCustomerName: '',
        modalContactNo: '',
        modalproductName:'',
        modalpurchaseRate:'',
        modalsaleRate:'',
        modalproductType:'',
        modalproductCategory: '',
      },
      modalCustomerNameValid: false,
      modalContactNoValid: false,
      modalpurchaseRateValid:false,
      modalsaleRateValid:false,
      modalproductNameValid:false,
      modalproductTypeValid:false,
      modalproductCategoryValid:false,


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
      modalContactNoValid = value.length == 10;
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
 
      modalproductNameValid:modalproductNameValid,
      modalsaleRateValid:modalsaleRateValid,
      modalpurchaseRateValid:modalpurchaseRateValid,
      modalproductCategoryValid:modalproductCategoryValid,
      modalproductTypeValid:modalproductTypeValid,

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
                    <Route path="/" component={GSTQuotation1} />
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

    $("#tableHeadings").hide();
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
    this.SelectCustomer();
    //this.GetInvoiceNo();
  }
  SelectCustomer(){
    var self = this;
    var customerName;
    customerarray=[];
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId:this.state.companyId,
        
      }),
      url: " http://15.206.129.105:8080/MerchandiseAPI/quotation/selectcustomer",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        var options1 = [];
        var options =[];
        customerName += '<option value ="" disabled selected hidden >Select a customer</option>';
        $.each(data.selectcustomernamelist, function (i, item) {
          // if (item.companyName != "-") {
          //   self.state.customerName = item.companyName;
          //   self.setState({
          //     customerName: self.state.customerName,
          //   })
          // } else {
          //   self.state.customerName = item.customerName;
          //   self.setState({
          //     customerName: self.state.customerName,
          //   })
          // }
      //    customerName += '<option value="' + item.customerId + '">' + self.state.customerName + '</option>'
      options1.push({ label: item.customerName, value: item.customerId });  
      var content = JSON.stringify({
            customerName: item.customerName,
            customerId: item.customerId,
            contactNo: item.contactNo,
            address: item.address,
            gstNo: item.gstNo,
            email: item.email,
            companyName:item.companyName,
          });

          customerarray.push(content);

        });
        //$("#customerName").append(customerName);
        self.state.options1 = options1;
        self.setState({
          options1: self.state.options1,
        })

        $.each(data.selectsaleproductlist, function (i, item) {
          options.push({label: item.productName, value: item.productName},);
     
         // productName += '<option value="' + item.productName + '">' + item.productName + '</option>'
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
            quantityLimit:item.quantityLimit

          });
          inputarray.push(feed);
       
        });
    //    $("#productName").append(productName);
    self.state.options=options;
    self.setState({
      options:options,
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
                companyId:this.state.companyId,
                
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
                      title:  'The Mobile Number Already Exists',  
                      showConfirmButton: false,
                      timer: 2000
                    })

                } 
        else {
              //  confirmAlert({
               //     title: 'Success',                        // Title dialog
               //     message: 'Successfully Added Customer Details',               // Message dialog
              //      confirmLabel: 'Ok',                           // Text button confirm
             //   });
                self.state.modalCustomerName = "";               
                self.state.modalContactNo = "";
                self.state.formValid=false;
            

               // $('[name=city]').val('');

                self.setState({
                  modalCustomerName: '',                   
                    modalContactNo: '',
                    formValid:false,
                    

                });

               
                 ReactDOM.render(
                    <Router >
                        <div>
                            <Route path="/" component={GSTQuotation1} />
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
          title:  'Fill all the details',  
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
          
          if(Number(value1) <=  Number(currentItemQuantity)){
          this.state[name] = cleanNum;
          this.setState({ [name]: cleanNum });
          this.handleUserHeightWidthComplete();
          $("#quantityalertmsg").empty();
          }else{
            this.state[name] = '';
            this.setState({ [name]: '' });
            $("#quantityalertmsg").empty();
            $("#quantityalertmsg").append("! Available Quantity In Stock "+currentItemQuantity);
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

handleUserHeightWidth = (e) => {

  const name = e.target.name;
  const value = e.target.value;

  var value1=value;
  var cleanNum ;


if(value1!=""){
 
  var isNumberDt=$.isNumeric(value1);
  if(isNumberDt!==false){
    var sign_data=Math.sign(value1);
  // alert("SIGN VALUE :"+sign_data);
    if(sign_data!=-1){

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

    }else{

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
}else{

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

}else{

this.state[name] = '';
this.setState({ [name]: '' });
this.handleUserHeightWidthComplete();
}

}


handleUserHeightWidthComplete() {

  // alert("self.state.quantity" +self.state.quantity);
   var self = this;


     if(this.state.productType=="service"){
       self.state.total=self.state.rate;

     }else{
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

  
AdjustmentShippingCalc = (e) => {

  const name = e.target.name;
  const value = e.target.value;
 
  var state_value=0;
  var value1=value;

  if(value1!=""){
    var isNumberDt=$.isNumeric(value1);
    if(isNumberDt!==false){
      var sign_data=Math.sign(value1);
    // alert("SIGN VALUE :"+sign_data);
      if(sign_data!=-1){

          var decimal_data = (value1 - Math.floor(value1)) !== 0; 
         // alert("DECIMAL DATA :"+decimal_data);
          if(decimal_data==false){
         
            this.state[name] = value1;
          this.setState({ [name]: value1 });
         
              }else{

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
              
      }else{

      //  $("#"+name).val(); // get current row 1st TD value
      this.state[name] = 0;
      this.setState({ [name]: 0 });
       /* confirmAlert({
              title: 'Error',                        // Title dialog
              message: 'Negative Values Not Accepted',               // Message dialog
              confirmLabel: 'Ok',                           // Text button confirm
          }); */
      }
   //   alert("NO NUMBER IN -");
  }else{

   // $("#"+name).val(); // get current row 1st TD value
   this.state[name] = 0;
   this.setState({ [name]: 0 });
  /*  confirmAlert({
          title: 'Error',                        // Title dialog
          message: 'Kindly Enter An Number To Proceed',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
      }); */
     // alert("NO NUMBER FOR CHAR");
  }

}else{
  this.state[name] = '';
  this.setState({ [name]: '' });

//   alert("NO NUMBER FOR EMPTY STRING ");
}


if(isNumberDt!=false  && sign_data!=-1  &&  decimal_data!=true){

  state_value=value1;
//  this.AdjustmentShippingCalcComplete(state_value,name);

  this.state[name] = state_value;

    var total = Math.round(Number(this.state.subtotal1) + Number(this.state.adjustment) +Number(this.state.shipping));

    this.state.finalAmountTotal=total;
    this.setState({
      name:state_value,
      finalAmountTotal:total,
    })
    var numtoword = numberToWord(Number(this.state.finalAmountTotal));
    $("#numWords").text(Case.capital(numtoword));

}else{
  state_value=0;
 // this.AdjustmentShippingCalcComplete(state_value,name);

  this.state[name] = state_value;

    var total = Math.round(Number(this.state.subtotal1) + Number(this.state.adjustment) +Number(this.state.shipping));

    this.state.finalAmountTotal=total;
    this.setState({
      name:state_value,
      finalAmountTotal:total,
    })
    var numtoword = numberToWord(Number(this.state.finalAmountTotal));
    $("#numWords").text(Case.capital(numtoword));

}






   /* this.state[name] = value;

    var total = Math.round(Number(this.state.subtotal1) + Number(this.state.adjustment) +Number(this.state.shipping));

    this.state.finalAmountTotal=total;
    this.setState({
      name:value,
      finalAmountTotal:total,
    })
    var numtoword = numberToWord(Number(this.state.finalAmountTotal));
    $("#numWords").text(Case.capital(numtoword));
*/
   
}

DiscountCalc = (e) => {
  const name = e.target.name;
  const value = e.target.value;

  var state_value=0;
  var value1=value;

  if(value1!=""){
    var isNumberDt=$.isNumeric(value1);
    if(isNumberDt!==false){
      var sign_data=Math.sign(value1);
    // alert("SIGN VALUE :"+sign_data);
      if(sign_data!=-1){
          var decimal_data = (value1 - Math.floor(value1)) !== 0; 
       //   alert("DECIMAL DATA :"+decimal_data);
          if(decimal_data==false){
            this.state[name] = value1;
          this.setState({ [name]: value1 });
              }else{

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
              
      }else{

      //  $("#"+name).val(); // get current row 1st TD value
      this.state[name] = 0;
      this.setState({ [name]: 0 });
       /* confirmAlert({
              title: 'Error',                        // Title dialog
              message: 'Negative Values Not Accepted',               // Message dialog
              confirmLabel: 'Ok',                           // Text button confirm
          }); */
      }
   //   alert("NO NUMBER IN -");
  }else{

   // $("#"+name).val(); // get current row 1st TD value
   this.state[name] = 0;
   this.setState({ [name]: 0 });
  /*  confirmAlert({
          title: 'Error',                        // Title dialog
          message: 'Kindly Enter An Number To Proceed',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
      }); */
      alert("NO NUMBER FOR CHAR");
  }

}else{
  this.state[name] = '';
  this.setState({ [name]: '' });

//   alert("NO NUMBER FOR EMPTY STRING ");
}


if(isNumberDt!=false  && sign_data!=-1  &&  decimal_data!=true){

  state_value=value1;   
 this.state[name] = state_value;
 var sum =Math.round( Number(this.state.subtotal1) + Number(this.state.adjustment) +Number(this.state.shipping));

 if (value > sum) {
  alert("Exceeds Balance" + value);
  state_value=0;
  this.state.discount = state_value;
  this.state.finalAmountTotal = Math.round(Number(sum) -  Number(this.state.discount));

  this.setState({
    discount: state_value,
    finalAmountTotal: this.state.finalAmountTotal,
  })

  var numtoword = numberToWord(Number(this.state.finalAmountTotal));

  $("#numWords").text(Case.capital(numtoword));

} else {
  this.state.discount = value;
  this.state.finalAmountTotal = Math.round(Number(sum) -  Number(this.state.discount));

  this.setState({
    discount: state_value,
    finalAmountTotal: this.state.finalAmountTotal,
  })
}
var numtoword = numberToWord(Number(this.state.finalAmountTotal));

$("#numWords").text(Case.capital(numtoword));




}else{
  state_value=0;
   this.state[name] = state_value;
   var sum =Math.round( Number(this.state.subtotal1) + Number(this.state.adjustment) +Number(this.state.shipping));

   if (value > sum) {
    alert("Exceeds Balance" + value);
    this.state.discount = state_value;
    this.state.finalAmountTotal = Math.round(Number(sum) -  Number(this.state.discount));

    this.setState({
      discount: state_value,
      finalAmountTotal: this.state.finalAmountTotal,
    })
  
    var numtoword = numberToWord(Number(this.state.finalAmountTotal));

    $("#numWords").text(Case.capital(numtoword));

  } else {
    this.state.discount = state_value;
    this.state.finalAmountTotal = Math.round(Number(sum) -  Number(this.state.discount));

    this.setState({
      discount: state_value,
      finalAmountTotal: this.state.finalAmountTotal,
    })
  }
  var numtoword = numberToWord(Number(this.state.finalAmountTotal));

  $("#numWords").text(Case.capital(numtoword));

}







 /* var sum =Math.round( Number(this.state.subtotal1) + Number(this.state.adjustment) +Number(this.state.shipping));

 
  //If discount Exceeds the balance Amount
  if (value > sum) {
    alert("Exceeds Balance" + value);

  } else {
    this.state.discount = value;
    this.state.finalAmountTotal = Math.round(Number(sum) -  Number(this.state.discount));

    this.setState({
      discount: value,
      finalAmountTotal: this.state.finalAmountTotal,
    })
  }
  var numtoword = numberToWord(Number(this.state.finalAmountTotal));

  $("#numWords").text(Case.capital(numtoword));
*/
}


  
  //Onchange For Discount
 /* DiscountCalc = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    var sum = Number(this.state.subtotal1) + Number(this.state.adjustment) + Number(this.state.shipping);


    //If discount Exceeds the balance Amount
    if (value > sum) {
      alert("Exceeds Balance" + value);

    } else {
      this.state.discount = value;
      this.state.finalAmountTotal = Number(sum) - Number(this.state.discount);

      this.setState({
        discount: value,
        finalAmountTotal: this.state.finalAmountTotal,
      })
    }
    var numtoword = numberToWord(Number(this.state.finalAmountTotal));

    $("#numWords").text(Case.capital(numtoword));

  }
*/

  handleCustomerDetails = (e) => {
    const name = e.name;
    const value = e.value;
    this.state.customerId = value;

    rougharray.push(this.state.customerId);
  

    this.setState({
      [name]: value,
      selectedCustomerName: e,
      customerNameValid: true
    });

    var self = this;
    for (var k = 0; k < customerarray.length; k++) {
      var temp = JSON.parse(customerarray[k]);
     
      if (temp.customerId == this.state.customerId) {

        self.state.orderNumber = temp.orderNumber + 1;
        self.state.customerId = temp.customerId;
        self.state.contactNo = temp.contactNo;
        self.state.customerName = temp.customerName;
     //   self.state.address=temp.address;
        if(temp.companyName== " " || temp.companyName=="null" || temp.companyName=="-" )
        {
          self.state.companyName=" "
        }
        else{
          self.state.companyName=temp.companyName;
        }

        if(temp.address== " " || temp.address=="null" || temp.address=="-" )
        {
          self.state.address="-"
        }
        else{
          self.state.address=temp.address;
        }

        if (temp.gstNo == " ") {
          self.state.gstNo = '-';
        } else {
          self.state.gstNo = temp.gstNo;
        }
        self.state.email = temp.email;
        self.setState({
          orderNumber: self.state.orderNumber,
          customerId: self.state.customerId,
          contactNo: self.state.contactNo,
          address:self.state.address,
          gstNo: self.state.gstNo,
          email: self.state.email,
          companyName:self.state.companyName,
          customerName:self.state.customerName,
        })

        break;
      }
    }

  }

  handleProductDetails = (e) => {

    const name = e.name;
    const value = e.value;
    this.state.productName = value;

    $("#quantity").show();
    $("#total1").show();    
    $("#quantity1").show();
    $("#total").show();

    testarray.push(this.state.productName);
    

    this.setState({
      [name]: value,
      selectedProductName: e,
      productNameValid: true
    });

    var self = this;


    for (var k = 0; k < inputarray.length; k++) {
      var temp = JSON.parse(inputarray[k]);

   
      
        if (temp.productName == self.state.productName) {    
          if(temp.productType=="product")
        {
          if(temp.quantity!=0){   
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
            currentItemQuantity=temp.quantity;
            currentItemLimitQuantity=temp.quantityLimit;
  
            self.setState({
              description: temp.description,
              rate: temp.rate,
              cgsta: temp.cgsta,
              sgsta: temp.sgsta,
              igsta: temp.igsta,
              productQuantity: temp.quantity,
              productType: temp.productType,
              productId: temp.productId,           
              quantity: "1",
              total: "",
              finalAmount: "",
            
            })
  
  if(this.state.productType=="service"){
    $("#quantity").hide();
    $("#quantity1").hide();
  
    $("#total").hide();
    $("#total1").hide();
    self.state.total=self.state.rate;
    this.state.quantity="-";
    this.setState({
      quantity:this.state.quantity,
    })
  }else{
    $("#quantity").show();
    $("#quantity1").show();
    $("#total").show();
    $("#total1").show();
    self.state.total = Math.round(Number(self.state.rate) * Number(self.state.quantity));
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
          
          
        }else{
      
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'The Product '+self.state.productName+ ' Is Not In Stock',   
            showConfirmButton: false,
            timer: 2000
          })
      }
        }
        else{
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
          currentItemQuantity=temp.quantity;
          currentItemLimitQuantity=temp.quantityLimit;

          self.setState({
            description: temp.description,
            rate: temp.rate,
            cgsta: temp.cgsta,
            sgsta: temp.sgsta,
            igsta: temp.igsta,
            productQuantity: temp.quantity,
            productType: temp.productType,
            productId: temp.productId,           
            quantity: "1",
            total: "",
            finalAmount: "",
          
          })

if(this.state.productType=="service"){
  $("#quantity").hide();
  $("#quantity1").hide();

  $("#total").hide();
  $("#total1").hide();
  self.state.total=self.state.rate;
  this.state.quantity="-";
  this.setState({
    quantity:this.state.quantity,
  })
}else{
  $("#quantity").show();
  $("#quantity1").show();
  $("#total").show();
  $("#total1").show();
  self.state.total = Math.round(Number(self.state.rate) * Number(self.state.quantity));
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

  GSTQuotationFunc() {

    var self = this;

    var arrData = [];
    // loop over each table row (tr)
    $("#tablecontents tr").each(function () {
      var currentRow = $(this);

      var productName = currentRow.find("td:eq(0)").text();      
      var rate = currentRow.find("td:eq(1)").text();
      var quantity = currentRow.find("td:eq(2)").text();
      var total = currentRow.find("td:eq(3)").text();
      var cgst = currentRow.find("td:eq(4)").text();
      var sgst = currentRow.find("td:eq(5)").text();
      var igst = currentRow.find("td:eq(6)").text();
      var finalAmount = currentRow.find("td:eq(7)").text();  
      var description = currentRow.find("td:eq(8)").text();
      var productId = currentRow.find("td:eq(9)").text();
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

    });

    this.state.saleType = "saleSale";
    this.state.invoiceData = arrData.toString();

    this.setState({
      invoiceData: arrData.toString(),
      saleType: self.state.saleType,
    });

   // alert("customerId"+this.state.customerId);
    if ((this.state.customerName.length > 0)) {
      if((this.state.invoiceData.trim().length>1)){
      if ((this.state.invoiceDate.trim().length > 1) && (this.state.dueDate.trim().length > 1)) {
        $.ajax({
          type: 'POST',
          data: JSON.stringify({
            customerName: this.state.customerName,
          //  invoiceNo: this.state.invoiceNo,
            invoiceDate: this.state.invoiceDate,
            dueDate: this.state.dueDate,
            date:this.state.date,
            saleType: this.state.saleType,
            invoiceData: this.state.invoiceData.toString(),
            customerId: this.state.customerId,
            contactNo: this.state.contactNo,
            totalcgst: subtotal_cgst,
            totalsgst: subtotal_sgst,
            totaligst: subtotal_igst,
            discount: this.state.discount,
            subtotal1: this.state.subtotal1,
            totalgst: this.state.totalgst_rs,
            finalAmountTotal: this.state.finalAmountTotal,
            adjustment: this.state.adjustment,
            totalitemqty: this.state.totalitemqty,
            address: this.state.address,
            gstNo: this.state.gstNo,
            email: this.state.email,
            shipping:this.state.shipping,
            companyId:this.state.companyId,
            companyName:this.state.companyName,
          //  customerId:this.state.customerId,
          staffId: self.state.staffId,
          employeeName: self.state.employeeName,
          role: self.state.role,
          }),

          url: " http://15.206.129.105:8080/MerchandiseAPI/quotation/addgstquotationorder",
          contentType: "application/json",
          dataType: 'json',
          async: false,
          success: function (data, textStatus, jqXHR) {

                       Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Successfully Updated ',    
                        showConfirmButton: false,
                        timer: 2000
                      })

            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        


           // self.state.invoiceNo = "";

  
            self.state.description = "";          
            self.state.rate = "";          
            self.state.quantity = "";
            self.state.total = "";
            self.state.cgsta = "";
            self.state.sgsta = "";
            self.state.igsta = "";
            self.state.finalAmount = "";
            self.state.finalAmountTotal = "";
            self.state.subtotal1 = 0;
            self.state.totalgst = 0;
            self.state.totalitemqty = 0;
            self.state.discount = 0;
            self.state.adjustment =0;
            self.state.TotalWithoutGST=0;
            self.state.shipping=0;
            $("#tablecontents").empty();
            $("#tableHeadings").hide();
          self.state.selectedCustomerName="";
           
            $('[name=productName]').val('');
            $('[name=customerName]').val('');
            $('#productName').html('');
            $('#customerName').html('');
           // $('#customerName').html('');
            self.setState({
            //  customerName: '',
            //  invoiceNo: '',
              invoiceDate: date,
              dueDate: date,
              description: '',             
              rate: '',            
              quantity: '',
              total: '',
              selectedCustomerName:'',
              cgsta: '',
              sgsta: '',
              igsta: '',
              finalAmount: '',
              saleType: '',
              productName: '',
              totalqty: '',
              subtotal1: 0,
              totalitemqty: 0,
              TotalWithoutGST:0,
              totalgst: 0,
              finalAmountTotal: 0,
              adjustment: '',
              discount: 0,
              shipping: 0,
              balance: '',
              saleSale: '',
              purchaseSale: '',
            
            });
         //   self.GetInvoiceNo();
            self.SelectCustomer();
          



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
    else{
     
      Swal.fire({
        position: 'center',
        icon: 'error',
        title:  'No items in Cart', 
        showConfirmButton: false,
        timer: 2000
      })
    }}
    
    else {
         
      Swal.fire({
        position: 'center',
        icon: 'error',
        title:'Kindly Select Customer Name', 
        showConfirmButton: false,
        timer: 2000
      })
      
    }
    var numtoword = numberToWord(Number(self.state.finalAmountTotal));
    $("#numWords").text(Case.capital(numtoword));
   
  }

ViewFunc(){
  ReactDOM.render(
    <Router >
      <div>
        <Route path="/" component={QuotationList} />
      </div>
    </Router>, document.getElementById('contentRender'));

}
NoAction(){

  ReactDOM.render(
    <Router >
      <div>
        <Route path="/" component={GSTQuotation1} />
      </div>
    </Router>, document.getElementById('contentRender'));
}
AddToCart() {
  var self = this;


  if (this.state.finalAmount != 0 ) {
    var currentproductvalue;

    this.AddToCartQuantityUpdate();


    //var tab = '<thead><tr class="headcolor" style="color: white; background-color: #486885; font-size: 12px;">  <th>ProductName</th><th>Size</th><th>Rate</th><th>Amount</th><th>Quantity</th><th>Total</th><th>CGST (%)</th><th>SGST (%)</th><th>IGST (%)</th><th>Final Amount</th></tr></thead>';
    this.state.subtotal1 = Math.round(Number(this.state.subtotal1) + Number(this.state.finalAmount));
    if(this.state.quantity!="-")
    {
      this.state.totalitemqty = Math.round(Number(this.state.totalitemqty) + Number(this.state.quantity));
    }
  
    this.state.totalgst = Math.round(Number(this.state.totalgst) + Math.round(Number(this.state.totalgst_rs)));
    this.state.TotalWithoutGST = Math.round(Number(this.state.TotalWithoutGST) + Number(this.state.total));


    subtotal_cgst = Math.round(Number(subtotal_cgst) + ((0.01 * Number(self.state.cgsta)) * Number(self.state.total)));
    subtotal_sgst = Math.round(Number(subtotal_sgst) + ((0.01 * Number(self.state.sgsta)) * Number(self.state.total)));
    subtotal_igst = Math.round(Number(subtotal_igst) + ((0.01 * Number(self.state.igsta)) * Number(self.state.total)));

    var payament_status_details;

 

    var tab = '<tr style={{backgroundColor: "white",fontColor:"black",fontWeight:"bold"}} id="tabletextcol" ><td>' + self.state.productName + '</td><td>' + self.state.rate + '</td><td>' + self.state.quantity + '</td><td>' + self.state.total + '</td><td>' + self.state.cgsta + '</td><td>' + self.state.sgsta + '</td><td  id="Gstcal" >' + self.state.igsta + '</td><td  id="finalAmountcal" >' + self.state.finalAmount + '</td><td  class="heightWidth" >' + self.state.description + '</td><td  class="heightWidth" >' + self.state.productId + '</td><td><button id="delete">Delete</button></td></tr>';

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
    self.state.cgsta = "";
    self.state.sgsta = "";
    self.state.igsta = "";
    self.state.finalAmount = "";
    self.state.productId="";
    //   self.state.TotalWithoutGST="";
    self.state.selectedProductName = "";
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
      cgsta: '',
      sgsta: '',
      igsta: '',
      finalAmount: '',
      productName: '',
      selectedProductName: '',
      totalgst: this.state.totalgst,
      totalitemqty: this.state.totalitemqty,
      finalAmountTotal: this.state.subtotal1,
      TotalWithoutGST:this.state.TotalWithoutGST,
      discount: 0,
      adjustment: 0,
      shipping: 0
    });
    advancebalance_calc = this.state.subtotal1;
  
    var numtoword = numberToWord(Number(self.state.subtotal1));
    $("#numWords").text(Case.capital(numtoword));
    $(".heightWidth").hide();


  } else {
   
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Select Product and Make sure rate is specified',     
      showConfirmButton: false,
      timer: 2000
    })

  }
}


AddToCartQuantityUpdate(){

  var self=this;

  for (var k = 0; k < inputarray.length; k++) {
    var temp = JSON.parse(inputarray[k]);

    if (temp.productName == self.state.productName) {

      var productName= temp.productName;
      var rate= temp.rate;
      var description= temp.description;
      var cgsta= temp.cgsta;
      var sgsta= temp.sgsta;
      var igsta= temp.igsta;
     
   
      var productType= temp.productType;
    //  var quantity= temp.quantity;
 
      var quantity=Number(temp.quantity)-Number(self.state.quantity);
    
      var productId= temp.productId;
      var quantityLimit=temp.quantityLimit;
    

      inputarray.splice(k, 1);

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
        quantityLimit:quantityLimit,
        productId:productId
              });
              inputarray.push(feed);

      if(Number(quantity) <= Number(quantityLimit)){
    
    
   toaster.notify(<div style={{color:"Red"}}>Stock Below Limit - {this.state.productName}</div>,{
    position: "top", // top-left, top, top-right, bottom-left, bottom, bottom-right
    duration: null, // This notification will not automatically close
   });

      }
      break;
    }

  }
 
}
ToastMsg(productName){
  ToastsStore.warning("Stock Under Limit - "+productName);
}

  DeleteButton() {


    var self = this;
    $("#tableHeadings").on('click', "#delete", function () {

      var currentRow = $(this).closest("tr");


     
    var amount_item_qty_rowcell = currentRow.find("td:eq(3)").html(); // get current row 2nd table cell TD value
    var total_item_qty_rowcell = currentRow.find("td:eq(2)").html(); // get current row 2nd table cell TD value
    var cgst_item_qty_rowcell = currentRow.find("td:eq(4)").html(); // get current row 2nd table cell TD value
    var sgst_item_qty_rowcell = currentRow.find("td:eq(5)").html(); // get current row 2nd table cell TD value
    var igst_item_qty_rowcell = currentRow.find("td:eq(6)").html(); // get current row 2nd table cell TD value
    var TotalWithoutGST_rowcell = currentRow.find("td:eq(3)").html(); // get current row 2nd table cell TD value



    var subtotalvaluedecrement = currentRow.find("td:eq(7)").html(); // get current row 2nd table cell TD value

      self.state.subtotal1 = Number(self.state.subtotal1) - Number(subtotalvaluedecrement);

      self.state.totalitemqty = Number(self.state.totalitemqty) - Number(total_item_qty_rowcell);



      // self.state.totalgst = Number(self.state.totalgst) - (Number(cgst_item_qty_rowcell) + Number(sgst_item_qty_rowcell) + Number(igst_item_qty_rowcell));

      //gst calculation

      /* var In_rs_gst = Number(0.01 * (cgst_item_qty_rowcell)) * Number(amount_item_qty_rowcell)
                    + Number(0.01 * (sgst_item_qty_rowcell)) * Number(amount_item_qty_rowcell)
                    + Number(0.01 * (igst_item_qty_rowcell)) * Number(amount_item_qty_rowcell);
  */
      var In_rs_gst = (Number(cgst_item_qty_rowcell) + Number(sgst_item_qty_rowcell) + Number(igst_item_qty_rowcell)) * 0.01 * Number(amount_item_qty_rowcell);
      
      self.state.totalgst = Math.round(Number(self.state.totalgst) - Number(In_rs_gst));

      self.state.TotalWithoutGST= Number(self.state.TotalWithoutGST) - Number(TotalWithoutGST_rowcell);
    
      subtotal_cgst = Number(subtotal_cgst) - ((0.01 * Number(cgst_item_qty_rowcell)) * Number(amount_item_qty_rowcell));
      subtotal_sgst = Number(subtotal_sgst) - ((0.01 * Number(sgst_item_qty_rowcell)) * Number(amount_item_qty_rowcell));
      subtotal_igst = Number(subtotal_igst) - ((0.01 * Number(igst_item_qty_rowcell)) * Number(amount_item_qty_rowcell));


     
      var cgst_item_qty_rowcell = (0.01 * (Number(cgst_item_qty_rowcell)) * Number(subtotalvaluedecrement));
      var cgst_item_qty_rowcell_another = (0.01 * (Number(cgst_item_qty_rowcell)) * (subtotalvaluedecrement));

     

      self.setState({
        subtotal1: self.state.subtotal1,
        TotalWithoutGST:self.state.TotalWithoutGST,
        totalitemqty: self.state.totalitemqty,
        totalgst: self.state.totalgst,
        adjustment: 0,
        discount: 0,
        finalAmountTotal: self.state.subtotal1,
        shipping: 0,
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
  cancelFunc() {

    ReactDOM.render(<GSTQuotation1 />, document.getElementById("contentRender"));
  }

  BackbtnFunc() {
    //   alert(this.state.backButtonVariable)
    var dirtyValue ="false";
   
    var finalRowCount= $('#tableHeadings tbody tr').length;

     if((this.state.customerName.length==0  ) && (finalRowCount==0))
       {
         ReactDOM.render(
           <Router>
             <div>           
               <Route path="/" component={DashboardOverall} />         
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
  
            <Route path="/" component={DashboardOverall} />
  
  
          </div>
        </Router>,
        document.getElementById('contentRender'));
      registerServiceWorker();
    }
    CancelBack(){


   
    }
  
clearFunc() {
  var self=this;
  self.state.modalCustomerName = ""; 
  self.state.modalContactNo = "";

  self.setState({
    modalCustomerName:self.state.modalCustomerName ,
    modalContactNo:self.state.modalContactNo ,
  })

}

closeFunc() {
 //alert("MODAL CLOSE");
  var self=this;
 
  self.state.modalCustomerNameValid =false;
  self.state.modalContactNoValid=false;
  self.state.modalCustomerName = ""; 
  self.state.modalContactNo = "";
 
  self.setState({
    
    modalCustomerNameValid:self.state.modalCustomerNameValid,
    modalContactNoValid:self.state.modalContactNoValid,
    modalCustomerName:self.state.modalCustomerName ,
    modalContactNo:self.state.modalContactNo ,
    

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

  CancelFunc() {
    ReactDOM.render(<GSTQuotation1 />, document.getElementById("contentRender"));

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
        <div class="card-header" style={{backgroundColor:"white"}}>
        <h4 style={{fontWeight:"300",color:"black",fontSize:"30px"}}>GST Quotation</h4>
        <hr></hr>
      </div>
          <div>
            <div class="card-body">
              <form class="form-horizontal form-bordered" >
                <div class="form-group">
                  <label class="control-label col-sm-2" for="customerName">Customer Name</label>
                  <div class="col-sm-10">
                    {/* <select id="customerName" className="form-control" onChange={this.handleCustomerDetails} name="customerName"
                      style={{ marginBottom: "15px" }} >

                    </select>  */}
                    
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
                  <table class="table">
                    <thead>
                      <tr>
                      <th>Rate</th>
                        <th id="quantity1">Quantity</th>
                        <th id="total1">Total</th>
                 </tr>
                    </thead>
                    <tbody>
                      <tr>
                      <td><input class="col-sm-3" type="text"
                          class="form-control" value={this.state.rate}
                          onChange={this.handleUserHeightWidth} name="rate" id="rate" />
                        </td>
                        <td><input type="text" min="1"
                          class="form-control" value={this.state.quantity}
                          onChange={this.handleUserQuantity} name="quantity" id="quantity" />
                          <span id="quantityalertmsg" style={{color:"red"}}></span>
                        </td>
                        <td><input type="text"  readOnly
                          class="form-control" value={this.state.total}
                          onChange={this.handleUserHeightWidth} name="total" id="total" />
                        </td>


                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                   
                        <th>CGST(%)</th>
                        <th>SGST(%)</th>
                        <th>IGST(%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                       
                        <td><input type="text" readOnly class="form-control" value={this.state.cgsta} onChange={this.handleUserInput} name="cgsta " id="cgsta " />
                        </td>
                        <td><input type="text" readOnly class="form-control" value={this.state.sgsta} onChange={this.handleUserInput} name="sgsta " id="sgsta " />
                        </td>
                        <td><input type="number" class="form-control" value={this.state.igsta} onChange={this.handleCgstSgstIgst} name="igsta" id="igsta" autocomplete="off" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>

                        <th>Final Amount</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                      
                        <td><input readOnly type="text" class="form-control" value={this.state.finalAmount} onChange={this.handleUserHeightWidth} name="finalAmount " id="finalAmount " />
                        </td>
                        <td>
                          <button type="button" onClick={() => this.AddToCart()} style={{ marginRight: "5px" }} class="btn btn-primary pull-right">AddToCart</button> <span></span>

                        </td>

                      </tr>
                    </tbody>
                  </table>
                </div>
                <hr></hr>

                <div id="tableOverflow">
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
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody id="tablecontents" style={{ backgroundColor: "white" }}></tbody>
                  </table>
                </div>
                <hr></hr>

                <div class="form-group">

                  <div class="col-sm-6">
                    <p class="lead">Total Qty: {this.state.totalitemqty} <span name="totalitemqty" id="totalitemqty"></span></p>
                    <p class="lead">Amount In Words:   <span id="numWords"> Rupees only</span></p>

                  </div>

                  <div class="col-sm-6">
                    <div class="table-responsive">
                      <table class="table">
                        <tbody>
                        <tr><th style={{ width: "50%" }}>Total(withoutGST):</th>
                          <td><input name="TotalWithoutGST" readOnly type="text" value={this.state.TotalWithoutGST} id="TotalWithoutGST"  class="form-control" />{/* ₹ <span id="subtotal"></span> */}</td>
                          <input type="hidden" name="TotalWithoutGST" id="TotalWithoutGST" />  </tr>

                        <tr><th>Total GST</th>
                            <td> ₹ {this.state.totalgst} <span id="tgst"></span></td>
                          </tr>
                          <tr><th style={{ width: "50%" }}>Subtotal:</th>
                            <td><input name="subtotal" readOnly type="text" value={this.state.subtotal1} id="subtotal" onChange={this.subtotalcalculationFunc} class="form-control" />{/* ₹ <span id="subtotal"></span> */}</td>
                            <input type="hidden" name="subtotal1" id="subtotal1" />  </tr>
                        
                          <tr><th>Shipping:</th>
                            <td>
                              <input name="shipping" type="text" id="shipping" value={this.state.shipping} onkeyup="final_total();" onChange={this.AdjustmentShippingCalc} class="form-control" /></td>
                          </tr>
                          <tr><th>Adjustment:</th>
                            <td>
                              <input name="adjustment" value={this.state.adjustment} type="number" min="1" id="adjustment" onkeyup="final_total();" onChange={this.AdjustmentShippingCalc} class="form-control" /></td>
                          </tr>
                          <tr><th>Discount(Rs):</th><td>
                            <input name="discount" type="number" min="1" value={this.state.discount} id="discount" onkeyup="final_total();" onChange={this.DiscountCalc} class="form-control" /></td>
                          </tr>
                          <tr> <th>Total:</th>
                            <td name="finalAmountTotal" class="grand_total" >₹  {this.state.finalAmountTotal} <span id="finalAmountTotal"></span></td>
                          </tr>

                          <tr><th></th>

                            <td>
                              <button type="button" id="saleinvoice" onClick={() => this.GSTQuotationFunc()} style={{ marginRight: "5px" }} class="btn btn-primary pull-right">Save Quotation</button> <span></span>
                            </td>
                            <td> <button type="button" onClick={() => this.CancelFunc()} style={{ marginRight: "5px" }} class="btn btn-primary pull-right">cancel</button> <span></span>
                            </td>
                          </tr>

                        </tbody>
                      </table></div>

                  </div>
                </div>
              </form>
            </div>
          </div></div>

          <div style={{ position: " ",zIndex: "0" }}>
          <div class="modal fade" id="myModal"  >
            <div class="modal-dialog">

              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title" style={{ align: "center",display: "contents" }}>Add Customer</h4>
                  <button type="button" class="close"    onClick={() => this.closeFunc()} data-dismiss="modal">&times;</button>

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
                        <input type="text" class="form-control" id="modalCustomerName" 
                        name="modalCustomerName" value={this.state.modalCustomerName} 
                        onChange={this.handleUserInput} placeholder="Customer Name" />
                      </div>
                    </div>

                    <div className={`form-group ${this.errorClass(this.state.formErrors.modalContactNo)}`}>
                      <label style={{ fontWeight: "bold" }} class="control-label col-sm-5" for="contactNo"> Contact no.<span style={{ color: "red" }}>*</span></label>
                    
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
                  <h4 class="modal-title" style={{ align: "center",display: "contents" }}>Add Product</h4>
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
            <option  disabled selected hidden value="">--Select--</option>
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

          <div>
        <ToastsContainer store={ToastsStore} />
    </div>
        </div>
      </div>
    );
  }
}

export default GSTQuotation1;