
import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import SalesReportEdit from './SalesReportEdit';
import SalesReportDisplay from './SalesReportDisplay';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import SalesReportUpdate from './SalesReportUpdate';
// import 'sweetalert2/src/sweetalert2.scss';
// import Swal from 'sweetalert2/dist/sweetalert2.js';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import './DownloadButton.css';
import './ImportMenuPage.css';
import _ from 'underscore';
import * as XLSX from 'xlsx';
import moment from 'moment';


import CustomerExcelValidationMessage from './CustomerExcelValidationMessage';
import CustomerExcelImportResponse from './CustomerExcelImportResponse';
import CustomerList1 from './CustomerList';

import EmployeeExcelValidationMessage from './EmployeeExcelValidationMessage';
import EmployeeExcelImportResponse from './EmployeeExcelImportResponse';
import StaffList from './StaffList';

import ProductExcelValidationMessage from './ProductExcelValidationMessage';
import ExcelImportResponse from './ProductExcelImportResponse';
import ProductList from './ProductList';

import VendorExcelValidationMessage from './VendorExcelValidationMessage';
import VendorExcelImportResponse from './VendorExcelImportResponse';
import VendorList1 from './VendorList';

//FOR CUSTOMER
var result;
var oldCustomerFileNames;
var name;
var errorMessageArray=[];

//FOR PRODUCT
var oldFileNames;
var productNameArray=[];
var quantityArray=[];
var quantityLimitArray=[];
var cgstArray=[];
var sgstArray=[];
var igstArray=[];
var SaleRateArray=[];
var PurchaseRateArray=[];
var serviceTimeArray=[];
var errorStatus=0;

//FOR VENDOR
var oldVendorFileNames;

//FOR Employee
var oldEmployeeFilename;

class ImportMenuPage extends Component {
  constructor(data) {
    super(data)

    var today = new Date();
    var today1 = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var month= today.getMonth() + 1; 
    
   
   
   
    this.state = {
      date: today1,
      companyId: companyId,
      month:month,
      data:[],
      columns:[],


    };

    this.setState({

      companyId: companyId,

    })

  }
  

  componentDidMount() {
    $("#customerimportarea").hide();
    $("#productimportarea").hide();  
    $("#employeeimportarea").hide();  
    $("#vendorimportarea").hide();

    errorMessageArray=[];

    $(document).ready(function(){
        $('#customerfiles').change(handleFileCustomer);
        $('#employeefiles').change(handleFileEmployee);
        $('#productfiles').change(handleFileProduct);
        $('#vendorfiles').change(handleFileVendor);
      });
    
    
    function handleFileCustomer(e) {
       
    
            var files = e.target.files;
            errorMessageArray=[];
            var i, f;
            for (i = 0, f = files[i]; i != files.length; ++i) {
                var reader = new FileReader();
                name = f.name;
        //  console.log("FILE NAME : " +name);
                reader.onload = function (e) {
                    var data = e.target.result;
     //console.log("DATA : " +data);
      var binary = "";
        var bytes = new Uint8Array(e.target.result);
        var length = bytes.byteLength;
        for (var i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
                    /* if binary string, read with type 'binary' */
                    
                    var workbook = XLSX.read(binary, { type: 'binary' });
     //console.log("WORK BOOK : " +workbook);
                    /* DO SOMETHING WITH workbook HERE */
                 //   workbook.SheetNames.forEach(function (sheetName) {
                  var sheetName = workbook.SheetNames[0];
    
               //   var workbook = XLSX.readFile('./assets/yourfile.xlsx');// ./assets is where your relative path directory where excel file is, if your excuting js file and excel file in same directory just igore that part
                  var sheet_name_list = workbook.SheetNames; // SheetNames is an ordered list of the sheets in the workbook
                    var data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]); //if you have multiple sheets
                
                    // read from a XLS file
    
    // get first sheet
    let first_sheet_name = workbook.SheetNames[0];
    let worksheet = workbook.Sheets[first_sheet_name];
    
                    var errorStatus=0;
    
                  if (data.length > 0) {
                    result = data;
                   
                  for(var key in data){
                    var keyValue=key;
                     keyValue=Number(keyValue)+2; //row no
    
                     //CUSTOMER NAME VALIDATON
                              var customerName=data[key]['CustomerName'] ;
                              if(customerName !=undefined){
                                
                               if(! customerName.match(/^([a-zA-Z]+)([a-zA-Z ])*$/)){
                                 
                                errorStatus++;
                                errorMessageArray.push("Check for Customer Name Format( Only Alphabets ) At Row "+keyValue);
                         
                               }
    
                              }else{
                                 // alert("STUDENT FIRST NAME IS EMPTY AT "+keyValue);
                                  errorStatus++;
                                  errorMessageArray.push("Customer Name Empty At Row "+keyValue);
                              }
    
                    //COMPANY NAME VALIDATION
                              var companyName=data[key]['CompanyName'] ;
                              if(companyName !=undefined){
    
                             
                                 
                              }else{
                                            }
    
                    
                    //CONTACT NO VALIDATION
                              var contactNo=data[key]['ContactNo'];
                         
                            
                              if(contactNo !=undefined){
                              
                                var regExpConNo=/^\d{10}$/;
                              
                              
                              
                                if(! regExpConNo.test(contactNo)){
                                  errorStatus++;
                                  errorMessageArray.push("Check for Contact No Format At Row "+keyValue);
                           
    }
    
    
                                
                                // if(! contactNo.match("[0-9]+") || contactNo.length != 10){
                                 
                                //   errorStatus++;
                                //   errorMessageArray.push("Check for Contact No Format( Only Numbers ) & Digits At Row "+keyValue);
                           
                                //  }
    
                              }else{
                                   //   alert("CONTACT NO IS EMPTY AT "+keyValue);
                                      errorStatus++;
                                      errorMessageArray.push("ContactNo Empty At Row "+keyValue);
                                  }
                  
                  //ALTERNATE CONTACT NO VALIDATION
                                 var alternateNo=data[key]['AlternateNo'];
                                  if(alternateNo !=undefined){
    
    
    
                                    var regExpAltNo=/^\d{10}$/;
                                 
                                    if(! regExpAltNo.test(alternateNo )){
                                      errorStatus++;
                                      errorMessageArray.push("Check for Alternate No Format At Row "+keyValue);
                               
    }
    
                                    // if(! alternateNo.match("[0-9]+") || alternateNo.length != 10){
                                 
                                    //   errorStatus++;
                                    //   errorMessageArray.push("Check for Alternate Contact No Format( Only Numbers ) & Digits At Row "+keyValue);
                               
                                    //  }
    
                                  }else{
                                     // alert("ALTERNATE CONTACT NO IS EMPTY AT "+keyValue);
                                    //  errorStatus++;
                                  }
    
                 //EMAIL ID VALIDATION           
                                  var emailId=data[key]['EmailId'];
                                  if(emailId !=undefined){
                                    
                                    var regExp=/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
                                 
                                    if(! regExp.test(emailId) ){
                                      errorStatus++;
                                      errorMessageArray.push("Check for Email Id Format At Row "+keyValue);
                               
    }
    
    
    
                                    // if(! emailId.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
                                 
                                    //   errorStatus++;
                                    //   errorMessageArray.push("Check for Email Id Format At Row "+keyValue);
                               
                                    //  }
    
    
                              }else{
                                //  alert("EMAIL ID IS EMPTY AT "+keyValue);
                               //   errorStatus++;
                               //   errorMessageArray.push("Email Id Empty At Row "+keyValue);
                              }
             
     
              //ADDRESS VALIDATION
                                  var address=data[key]['Address'];
                                  if(address !=undefined){
    
                              }else{
                                 // alert("ADDRESS IS EMPTY AT "+keyValue);
                                 // errorStatus++;
                                  }
    
                                     //State VALIDATION
                                     var state=data[key]['State'];
                                     if(state !=undefined){
       
                                 }else{
                                    // alert("ADDRESS IS EMPTY AT "+keyValue);
                                    // errorStatus++;
                                     }
    
                                          //GSTNo VALIDATION
                                          var gstNo=data[key]['GSTNo'];
                                          if(gstNo !=undefined){
            
                                      }else{
                                         // alert("ADDRESS IS EMPTY AT "+keyValue);
                                         // errorStatus++;
                                          }
       
    
                            
                    console.log("KEY VALUE PAIR customer name:",customerName +"KEY :"+key);
                    console.log("KEY VALUE PAIR companyName :",companyName +"KEY :"+key);
                    console.log("KEY VALUE PAIR address :",address +"KEY :"+key);
                    console.log("KEY VALUE PAIR contactNo :",contactNo +"KEY :"+key);
                    console.log("KEY VALUE PAIR alternateNo :",alternateNo +"KEY :"+key);
                    console.log("KEY VALUE PAIR Email Id :",emailId +"KEY :"+key);
                    console.log("KEY VALUE PAIR gstNo:",gstNo +"KEY :"+key);
                    console.log("KEY VALUE PAIR state:",state +"KEY :"+key);
            
    
                }
    
    //alert("ERROR STATUS VALUE :"+errorStatus);
    if( errorStatus==0){
      //PROCEED WITH UPLOAD ENABLE THE SUBMIT BUTTON
      $("#submit").prop("disabled", false);
    
    }else{
      //SHOW THE ERROR VALIDATION PAGE
    
            ReactDOM.render(
              <Router>
                <div>
      
                  <Route path="/" component={() => <CustomerExcelValidationMessage errorData={errorMessageArray} />} />
      
                </div>
              </Router>,
              document.getElementById('contentRender'));
    
    
    }
    
    
                }else{
    
              
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'An Empty File cannot be Uploaded',
                  showConfirmButton: false,
                  timer: 2000
                })
    
                }
    
    
                 
                };
                reader.readAsArrayBuffer(f);
            }
    
        
           }


   function handleFileProduct(e) {
   
    var self=this;

            var files = e.target.files;
            errorMessageArray=[];
            var i, f;
            for (i = 0, f = files[i]; i != files.length; ++i) {
                var reader = new FileReader();
                name = f.name;
        //  console.log("FILE NAME : " +name);
                reader.onload = function (e) {
                    var data = e.target.result;
     
      var binary = "";
        var bytes = new Uint8Array(e.target.result);
        var length = bytes.byteLength;
        for (var i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
                    /* if binary string, read with type 'binary' */
                    
                    var workbook = XLSX.read(binary, { type: 'binary' });
     console.log("WORK BOOK : " +workbook);
                    /* DO SOMETHING WITH workbook HERE */
                 //   workbook.SheetNames.forEach(function (sheetName) {
                  var sheetName = workbook.SheetNames[0];
    
               //   var workbook = XLSX.readFile('./assets/yourfile.xlsx');// ./assets is where your relative path directory where excel file is, if your excuting js file and excel file in same directory just igore that part
                  var sheet_name_list = workbook.SheetNames; // SheetNames is an ordered list of the sheets in the workbook
                    var data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]); //if you have multiple sheets
                    console.log("DATA : " +data);
                    // read from a XLS file
    
            
    
    // get first sheet
    let first_sheet_name = workbook.SheetNames[0];
    let worksheet = workbook.Sheets[first_sheet_name];
    
                    var errorStatus=0;
    
                    productNameArray=[];
                    quantityArray=[];
                    quantityLimitArray=[];
                    cgstArray=[];
                    sgstArray=[];
                    igstArray=[];
                    SaleRateArray=[];
                    PurchaseRateArray=[];
                    serviceTimeArray=[];
    
                  if (data.length > 0) {
                    result = data;
                   
                  for(var key in data){
                    var keyValue=key;
                     keyValue=Number(keyValue)+2; //row no
    
                     //PRODUCT NAME VALIDATON
                              var productName=data[key]['ProductName'] ;
                        
                              if(productName ==undefined){
                                                            
                                  errorStatus++;
                                  errorMessageArray.push("product Name Empty At Row "+keyValue);
                              }else{
    
                                if(productNameArray.length==0){
                                productNameArray.push(productName);
                                }else{
                                  var containsValue=_.contains(productNameArray,productName);
                                  console.log("ARRAY DATA :",productNameArray);
                                  console.log("CONATINS VALUE :",containsValue);
                                  if(containsValue==true){
                                    errorStatus++;
                                     errorMessageArray.push("Duplicate Product Name  At Row "+keyValue);
                                  }else{
                                    productNameArray.push(productName);
                                  }
                                }
    
                              }
    
                    //PRODUCT TYPE VALIDATION
                              var productType=data[key]['ProductType'] ;
                              if(productType ==undefined){
                               
                                  errorStatus++;
                                  errorMessageArray.push("Product Type Empty At Row "+keyValue);
                              }
    
                    //PRODUCT CATEGORY VALIDATION
                               var productCategory=data[key]['ProductCategory'] ;
                               if(productCategory ==undefined){
                                
                                   errorStatus++;
                                   errorMessageArray.push("Product Category Empty At Row "+keyValue);
                               }
    
                                 //QUANTITY VALIDATION 
                                
                                 var quantity=data[key]['Quantity'] ;
  
                                  //QUANTITY LIMIT VALIDATION
                                  var quantityLimit=data[key]['QuantityLimit'] ;

                                  //CGST VALIDATION
                                  var cgst=data[key]['CGST'] ;
                                  if(cgst !=undefined){
                                      //validation for numbers
    
                                      var regExp=/^[0-9]*$/;
                                  
                                    if(regExp.test(cgst) ){
                                      //true for 23,0023,2300
                                      //false for 23.00,+23,-23, NUMBER + ALPHANUMERIC
                                      var regExpLeadingZero = /^0[0-9].*$/;
                                      if(regExpLeadingZero.test(cgst)){
                                        errorStatus++;
                                        errorMessageArray.push("CGST Has Leading Zero At "+keyValue);
                                      }else{
                                        cgstArray.push(cgst);
                                      }
                                    }else{
                                      errorStatus++;
                                      errorMessageArray.push("CGST Is Not A Number At "+keyValue);
                                    }
    
                                    }else{

                                     cgstArray.push(0);
                                  }
                                  
    
                                //SGST VALIDATION
                                var sgst=data[key]['SGST'] ;
                                  if(sgst !=undefined){
                                     //validation for numbers
                                     var regExp=/^[0-9]*$/;
                                    
    
                                     if(regExp.test(sgst)){
                                       //true for 23,0023,2300
                                       //false for 23.00,+23,-23, NUMBER + ALPHANUMERIC
                                       var regExpLeadingZero = /^0[0-9].*$/;
                                       if(regExpLeadingZero.test(sgst)){
                                         errorStatus++;
                                         errorMessageArray.push("SGST Has Leading Zero At "+keyValue);
                                       }else{
                                         sgstArray.push(sgst);
                                       }
                                     }else{
                                       errorStatus++;
                                       errorMessageArray.push("SGST Is Not A Number At "+keyValue);
                                     }
    
                              
                                 }else{
                                   sgstArray.push(0);
                                  }
                                
                              //IGST VALIDATION
                              var igst=data[key]['IGST'] ;
                              if(igst !=undefined){
                                 //validation for numbers
                                 var regExp=/^[0-9]*$/;
                                
                                 if(regExp.test(igst)){
                                   //true for 23,0023,2300
                                   //false for 23.00,+23,-23, NUMBER + ALPHANUMERIC
                                   var regExpLeadingZero = /^0[0-9].*$/;
                                   if(regExpLeadingZero.test(igst)){
                                     errorStatus++;
                                     errorMessageArray.push("IGST Has Leading Zero At "+keyValue);
                                   }else{
                                    igstArray.push(igst);
                                   }
                                 }else{
                                   errorStatus++;
                                   errorMessageArray.push("IGST Is Not A Number At "+keyValue);
                                 }
    
                           }else{
                         
                                 igstArray.push(0);
                                }
    
    
                                //SALES RATE VALIDATION
                                var saleRate=data[key]['SaleRate(/Unit)'] ;
                           
                                //PURCHASE RATE VALIDATION
                                var purchaseRate=data[key]['PurchaseRate(/Unit)'] ;
                         
                                //SERVICE TIME
                                var serviceTime=data[key]['ServiceTime(HH:mm)'] ;
                    console.log("KEY VALUE PAIR product name :",productName +"KEY :"+key);
                    console.log("KEY VALUE PAIR product type :",productType +"KEY :"+key);
                    console.log("KEY VALUE PAIR product category :",productCategory +"KEY :"+key);
    
                    console.log("KEY VALUE PAIR quantity :",quantity +"KEY :"+key);
                    console.log("KEY VALUE PAIR quanttitylimit :",quantityLimit +"KEY :"+key);
                    console.log("KEY VALUE PAIR cgst:",cgst +"KEY :"+key);
    
                    console.log("KEY VALUE PAIR sgst:",sgst +"KEY :"+key);
                    console.log("KEY VALUE PAIR igst:",igst +"KEY :"+key);
                    console.log("KEY VALUE PAIR sale rate :",saleRate +"KEY :"+key);
                    console.log("KEY VALUE PAIR purchase rate :",purchaseRate +"KEY :"+key);
                    console.log("KEY VALUE PAIR service time :",serviceTime +"KEY :"+key);
                 
    
                    if(productType == "service"){
                      /* --->no qty , no qty limit , no purchase amt
                       --->yes sales amt ,servicetime */

                       quantityArray.push(0);
                       quantityLimitArray.push(0);
                       PurchaseRateArray.push(0);

                       if(saleRate !=undefined){
                     
                         var regExpDecimal=/^\d+(\.\d{1,2})$/;

                       var decimal_data = (saleRate - Math.floor(saleRate)) !== 0;
                         var numberData=Number.isInteger(saleRate)
                         var regExp=/^[0-9]*$/;
                         
                         if(decimal_data==true){
                           
                           if(saleRate < 0 || isNaN(saleRate)){
                             errorStatus++;
                             errorMessageArray.push("Sale Rate Is Not A Number"+keyValue);
                       
                           }else{
                             saleRate=Number(saleRate).toFixed(2);
                             SaleRateArray.push(saleRate);
                           }
                         }else if(regExp.test(saleRate)){
                           //true for 23,0023,2300
                           //false for 23.00,-23, NUMBER + ALPHANUMERIC
                           var regExpLeadingZero = /^0[0-9].*$/;
                           if(regExpLeadingZero.test(saleRate)){
                             errorStatus++;
                             errorMessageArray.push("Sale Rate Has Leading Zero At "+keyValue);
                           }else{
                             SaleRateArray.push(saleRate);
                           }

                         }else{
                             
                           errorStatus++;
                           errorMessageArray.push("Sale Rate Is Not Number At "+keyValue);
                         }


                           }else{
                                 
                               errorStatus++;
                               errorMessageArray.push("Sale Rate Empty At Row "+keyValue);
                             }


                                //SERVICE TIME VALIDATION
                      if(serviceTime!=undefined){
                       // var regExp=/^\d{2,2}:\d{2,2}$/;
                      //  var regExp=/^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/;
                   
                  /*    var regExp=/^([01]\d|2[0123]):([012345]\d)$/;
                      if(serviceTime < 0 || isNaN(serviceTime)){
                        if(regExp.test(serviceTime)){
                          serviceTimeArray.push(serviceTime);
                        }
                      }else{
                        errorStatus++;
                        errorMessageArray.push("Service Time is Not In Format At Row "+keyValue);
                      }
                      */
                     var time=serviceTime;
              
                /*    let day_time = serviceTime % 1
                      let meridiem = "AMPM"
                      let hour = Math.floor(day_time * 24)
                      let minute = Math.floor(Math.abs(day_time * 24 * 60) % 60)
                      let second = Math.floor(Math.abs(day_time * 24 * 60 * 60) % 60)
                      hour >= 12 ? meridiem = meridiem.slice(2, 4) : meridiem = meridiem.slice(0, 2)
                      hour > 12 ? hour = hour - 12 : hour = hour
                      hour = hour < 10 ? "0" + hour : hour
                      minute = minute < 10 ? "0" + minute : minute
                      second = second < 10 ? "0" + second : second
                      let daytime = "" + hour + ":" + minute + ":" + second + " " + meridiem
                      var timeopted= time ? daytime : (new Date(0, 0, serviceTime, 0, -new Date(0).getTimezoneOffset(), 0)).toLocaleDateString(navigator.language, {}) + " " + daytime
                      */
                      
                     let day_time = serviceTime % 1
                     let meridiem = "AMPM"
                     let hour = Math.floor(day_time * 24)
                     let minute = Math.floor(Math.abs(day_time * 24 * 60) % 60)
                     let second = Math.floor(Math.abs(day_time * 24 * 60 * 60) % 60)
                     hour >= 12 ? meridiem = meridiem.slice(2, 4) : meridiem = meridiem.slice(0, 2)
                     hour > 12 ? hour ='Error' : hour = hour
                     hour = hour < 10 ? "0" + hour : hour
                     minute = minute < 10 ? "0" + minute : minute
                     second = second < 10 ? "0" + second : second
                     let daytime = "" + hour + ":" + minute + ":" + second + " " + meridiem
                     let serviceTimeOpted=hour+":"+minute
                     var timeopted= time ? daytime : (new Date(0, 0, serviceTime, 0, -new Date(0).getTimezoneOffset(), 0)).toLocaleDateString(navigator.language, {}) + " " + daytime
                   
                     console.log("SERVICE TIME  :",timeopted);

                     if(timeopted=="NaN:NaN:NaN AM "||timeopted=="NaN:NaN:NaN PM"){
                       alert("NANA");
                     }
                     
                     if(hour=="Error" || timeopted=="NaN:NaN:NaN AM" || timeopted=="NaN:NaN:NaN PM" ){
                      errorStatus++;
                      errorMessageArray.push("Check For Service Time Format At Row "+keyValue);
                     }else{
                     
                       serviceTimeArray.push(serviceTimeOpted)
                     }

                      console.log("SERVICE TIME ARRAY :",serviceTimeArray);

                      }else{
                        errorStatus++;
                        errorMessageArray.push("Service Time Empty At Row "+keyValue);
                      }
                      
             


                     }else if(productType == "product" && productCategory =="Own"){
                       /*--->yes qty, yes qty limit, yes sales rate
                        --->no purchase rate ,no service time */
                        PurchaseRateArray.push(0);
                        serviceTimeArray.push("-");
                       //  Quantity_Limit_SalesRate_Validation = () =>(quantity,quantityLimit,saleRate,keyValue);
                       new Quantity_Limit_SalesRate_Validation(quantity,quantityLimit,saleRate,keyValue);
                     }else if(productType == "product" && productCategory =="Purchase"){
                       //--->yes qty,yes qty limit,yes sales rate,yes purchase rate
                       //--->no servicetime
                    //    Quantity_Limit_SalesRate_Validation = () => (quantity,quantityLimit,saleRate,keyValue);
                    serviceTimeArray.push("-");
                    
                    new Quantity_Limit_SalesRate_Validation(quantity,quantityLimit,saleRate,keyValue);
                       if(purchaseRate !=undefined){
                         //validation for numbers
             

                         var decimal_data = (purchaseRate - Math.floor(purchaseRate)) !== 0;
                         var numberData=Number.isInteger(purchaseRate)
                         var regExp=/^[0-9]*$/;
                         
                         if(decimal_data ==true){

                          if(purchaseRate < 0 || isNaN(purchaseRate)){
                            errorStatus++;
                            errorMessageArray.push("Purchase Rate Is Not A Number"+keyValue);
                       
                          }else{
                            purchaseRate=Number(purchaseRate).toFixed(2);
                            PurchaseRateArray.push(purchaseRate);
                          }
                       
                          
                         }else if(regExp.test(purchaseRate)){
                           //true for 23,0023,2300
                           //false for 23.00,-23, NUMBER + ALPHANUMERIC
                           var regExpLeadingZero = /^0[0-9].*$/;
                           if(regExpLeadingZero.test(purchaseRate)){
                             errorStatus++;
                             errorMessageArray.push("Purchase Rate Has Leading Zero At "+keyValue);
                           }else{
                            PurchaseRateArray.push(purchaseRate);
                           }

                         }else{
                             
                           errorStatus++;
                           errorMessageArray.push("Purchase Rate Is Not Number At "+keyValue);
                         }
                      }else{
                            
                          errorStatus++;
                          errorMessageArray.push("Purchase Rate Empty At Row "+keyValue);
                        }





                     }


                     
                }
    







    //alert("ERROR STATUS VALUE :"+errorStatus);
    if( errorStatus==0){
      //PROCEED WITH UPLOAD ENABLE THE SUBMIT BUTTON
      $("#submit").prop("disabled", false);
    
    }else{
      //SHOW THE ERROR VALIDATION PAGE
    
      
            ReactDOM.render(
              <Router>
                <div>
      
                  <Route path="/" component={() => <ProductExcelValidationMessage errorData={errorMessageArray} />} />
      
                </div>
              </Router>,
              document.getElementById('contentRender'));
    
    
    }
    
    
                }else{
    
    
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'An Empty File cannot be Uploaded',
                  showConfirmButton: false,
                  timer: 2000
                })
    
                }
    
    
                 
                };
                reader.readAsArrayBuffer(f);
            }
    
        
           }


   function handleFileVendor(e) {
   

            var files = e.target.files;
            errorMessageArray=[];
            var i, f;
            for (i = 0, f = files[i]; i != files.length; ++i) {
                var reader = new FileReader();
                name = f.name;
        //  console.log("FILE NAME : " +name);
                reader.onload = function (e) {
                    var data = e.target.result;
     //console.log("DATA : " +data);
      var binary = "";
        var bytes = new Uint8Array(e.target.result);
        var length = bytes.byteLength;
        for (var i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
                    /* if binary string, read with type 'binary' */
                    
                    var workbook = XLSX.read(binary, { type: 'binary' });
     //console.log("WORK BOOK : " +workbook);
                    /* DO SOMETHING WITH workbook HERE */
                 //   workbook.SheetNames.forEach(function (sheetName) {
                  var sheetName = workbook.SheetNames[0];
    
               //   var workbook = XLSX.readFile('./assets/yourfile.xlsx');// ./assets is where your relative path directory where excel file is, if your excuting js file and excel file in same directory just igore that part
                  var sheet_name_list = workbook.SheetNames; // SheetNames is an ordered list of the sheets in the workbook
                    var data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]); //if you have multiple sheets
                
                    // read from a XLS file
    
    // get first sheet
    let first_sheet_name = workbook.SheetNames[0];
    let worksheet = workbook.Sheets[first_sheet_name];
    
                    var errorStatus=0;
    
                  if (data.length > 0) {
                    result = data;
                   
                  for(var key in data){
                    var keyValue=key;
                     keyValue=Number(keyValue)+2; //row no
    
                     //CUSTOMER NAME VALIDATON
                              var vendorName=data[key]['VendorName'] ;
                              if(vendorName !=undefined){
                                
                               if(! vendorName.match(/^([a-zA-Z]+)([a-zA-Z ])*$/)){
                                 
                                errorStatus++;
                                errorMessageArray.push("Check for Vendor Name Format( Only Alphabets ) At Row "+keyValue);
                         
                               }
    
                              }else{
                                 // alert("STUDENT FIRST NAME IS EMPTY AT "+keyValue);
                                  errorStatus++;
                                  errorMessageArray.push("Vendor Name Empty At Row "+keyValue);
                              }
    
                    //COMPANY NAME VALIDATION
                              var companyName=data[key]['CompanyName'] ;
                              if(companyName !=undefined){
    
                             
                                 
                              }else{
                                            }
    
                    
                    //CONTACT NO VALIDATION
                              var contactNo=data[key]['ContactNo'];
                         
                            
                              if(contactNo !=undefined){
                              
                                var regExpConNo=/^\d{10}$/;
                              
                              
                              
                                if(! regExpConNo.test(contactNo)){
                                  errorStatus++;
                                  errorMessageArray.push("Check for Contact No Format At Row "+keyValue);
                           
    }
    
    
                                
                                // if(! contactNo.match("[0-9]+") || contactNo.length != 10){
                                 
                                //   errorStatus++;
                                //   errorMessageArray.push("Check for Contact No Format( Only Numbers ) & Digits At Row "+keyValue);
                           
                                //  }
    
                              }else{
                                   //   alert("CONTACT NO IS EMPTY AT "+keyValue);
                                      errorStatus++;
                                      errorMessageArray.push("ContactNo Empty At Row "+keyValue);
                                  }
                  
                  //ALTERNATE CONTACT NO VALIDATION
                                 var alternateNo=data[key]['AlternateNo'];
                                  if(alternateNo !=undefined){
    
    
    
                                    var regExpAltNo=/^\d{10}$/;
                                 
                                    if(! regExpAltNo.test(alternateNo )){
                                      errorStatus++;
                                      errorMessageArray.push("Check for Alternate No Format At Row "+keyValue);
                               
    }
    
                                    // if(! alternateNo.match("[0-9]+") || alternateNo.length != 10){
                                 
                                    //   errorStatus++;
                                    //   errorMessageArray.push("Check for Alternate Contact No Format( Only Numbers ) & Digits At Row "+keyValue);
                               
                                    //  }
    
                                  }else{
                                     // alert("ALTERNATE CONTACT NO IS EMPTY AT "+keyValue);
                                    //  errorStatus++;
                                  }
    
                 //EMAIL ID VALIDATION           
                                  var emailId=data[key]['EmailId'];
                                  if(emailId !=undefined){
                                    
                                    var regExp=/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
                                 
                                    if(! regExp.test(emailId) ){
                                      errorStatus++;
                                      errorMessageArray.push("Check for Email Id Format At Row "+keyValue);
                               
    }
    
    
    
                                    // if(! emailId.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
                                 
                                    //   errorStatus++;
                                    //   errorMessageArray.push("Check for Email Id Format At Row "+keyValue);
                               
                                    //  }
    
    
                              }else{
                                //  alert("EMAIL ID IS EMPTY AT "+keyValue);
                               //   errorStatus++;
                               //   errorMessageArray.push("Email Id Empty At Row "+keyValue);
                              }
             
     
              //ADDRESS VALIDATION
                                  var address=data[key]['Address'];
                                  if(address !=undefined){
    
                              }else{
                                 // alert("ADDRESS IS EMPTY AT "+keyValue);
                                 // errorStatus++;
                                  }
    
                                     //State VALIDATION
                                     var state=data[key]['State'];
                                     if(state !=undefined){
       
                                 }else{
                                    // alert("ADDRESS IS EMPTY AT "+keyValue);
                                    // errorStatus++;
                                     }
    
                                          //GSTNo VALIDATION
                                          var gstNo=data[key]['GSTNo'];
                                          if(gstNo !=undefined){
            
                                      }else{
                                         // alert("ADDRESS IS EMPTY AT "+keyValue);
                                         // errorStatus++;
                                          }
       
                                            //GSTNo VALIDATION
                                            var description=data[key]['Description'];
                                            if(description !=undefined){
              
                                        }else{
                                           // alert("ADDRESS IS EMPTY AT "+keyValue);
                                           // errorStatus++;
                                            }
    
                            
                    console.log("KEY VALUE PAIR vendor name:",vendorName +"KEY :"+key);
                    console.log("KEY VALUE PAIR companyName :",companyName +"KEY :"+key);
                    console.log("KEY VALUE PAIR address :",address +"KEY :"+key);
                    console.log("KEY VALUE PAIR contactNo :",contactNo +"KEY :"+key);
                    console.log("KEY VALUE PAIR alternateNo :",alternateNo +"KEY :"+key);
                    console.log("KEY VALUE PAIR Email Id :",emailId +"KEY :"+key);
                    console.log("KEY VALUE PAIR gstNo:",gstNo +"KEY :"+key);
                    console.log("KEY VALUE PAIR state:",state +"KEY :"+key);
                    console.log("KEY VALUE PAIR description:",description +"KEY :"+key);
            
    
                }
    
    //alert("ERROR STATUS VALUE :"+errorStatus);
    if( errorStatus==0){
      //PROCEED WITH UPLOAD ENABLE THE SUBMIT BUTTON
      $("#submit").prop("disabled", false);
    
    }else{
      //SHOW THE ERROR VALIDATION PAGE
    
            ReactDOM.render(
              <Router>
                <div>
      
                  <Route path="/" component={() => <VendorExcelValidationMessage errorData={errorMessageArray} />} />
      
                </div>
              </Router>,
              document.getElementById('contentRender'));
    
    
    }
    
    
                }else{
    
                
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'An Empty File cannot be Uploaded',
                  showConfirmButton: false,
                  timer: 2000
                })
    
                }
    
    
                 
                };
                reader.readAsArrayBuffer(f);
            }
    
        
           }

/*
 *FUNCTION FOR FIELD VALIDATION IN  PRODUCT IMPORT EXCEL
 */
 function Quantity_Limit_SalesRate_Validation(quantity,quantityLimit,saleRate,keyValue){

  console.log("VALIDATION FUNC CALLED");

              //QUANTITY VALIDATION
              if(quantity !=undefined ){
                //validation for numbers
                var regExp=/^[0-9]*$/;

                if(regExp.test(quantity)){
                  //true for 23,0023,2300
                  //false for 23.26,+23,-23, NUMBER + ALPHANUMERIC
                  var regExpLeadingZero = /^0[0-9].*$/;
                  if(regExpLeadingZero.test(quantity)){
                    errorStatus++;
                    errorMessageArray.push("Quantity Has Leading Zero At "+keyValue);
                  }else{
                    quantityArray.push(quantity);
                  }
                }else{
                  errorStatus++;
                  errorMessageArray.push("Quantity Is Not A Number At "+keyValue);
                }

            }else{
              
                errorStatus++;
                errorMessageArray.push("Quantity Empty At Row "+keyValue);
            }

            //QUANTITY LIMIT VALIDATION
            if(quantityLimit !=undefined ){
              //validation for numbers

              var regExp=/^[0-9]*$/;

              if(regExp.test(quantityLimit)){
                //true for 23,0023,2300
                //false for 23.00,+23,-23, NUMBER + ALPHANUMERIC
                var regExpLeadingZero = /^0[0-9].*$/;

                if(regExpLeadingZero.test(quantityLimit)){
                  errorStatus++;
                  errorMessageArray.push("Quantity Limit Has Leading Zero At "+keyValue);
                }else{
                  quantityLimitArray.push(quantity);
                }
              }else{
                errorStatus++;
                errorMessageArray.push("Quantity Limit Is Not A Number At "+keyValue);
              }

            
            }else{
            
                errorStatus++;
                errorMessageArray.push("Quantity Limit Empty At Row "+keyValue);
            }

            //SALE RATE VALIDATION
            if(saleRate !=undefined){
                                        
              var regExpDecimal=/^\d+(\.\d{1,2})$/;

            var decimal_data = (saleRate - Math.floor(saleRate)) !== 0;
            var numberData=Number.isInteger(saleRate)
            var regExp=/^[0-9]*$/;

            if(decimal_data==true){

            if(saleRate < 0 || isNaN(saleRate)){
            errorStatus++;
            errorMessageArray.push("Sale Rate Is Not A Number"+keyValue);

            }else{
            saleRate=Number(saleRate).toFixed(2);
            SaleRateArray.push(saleRate);
            }
            }else if(regExp.test(saleRate)){
            //true for 23,0023,2300
            //false for 23.00,-23, NUMBER + ALPHANUMERIC
            var regExpLeadingZero = /^0[0-9].*$/;
            if(regExpLeadingZero.test(saleRate)){
            errorStatus++;
            errorMessageArray.push("Sale Rate Has Leading Zero At "+keyValue);
            }else{
            SaleRateArray.push(saleRate);
            }

            }else{

            errorStatus++;
            errorMessageArray.push("Sale Rate Is Not Number At "+keyValue);
            }


            }else{
              
            errorStatus++;
            errorMessageArray.push("Sale Rate Empty At Row "+keyValue);
            }

         
}


  function handleFileEmployee(e) {


            var files = e.target.files;
            errorMessageArray = [];
            var i, f;
            for (i = 0, f = files[i]; i != files.length; ++i) {
                var reader = new FileReader();
                name = f.name;
                //  console.log("FILE NAME : " +name);
                reader.onload = function (e) {
                    var data = e.target.result;

                    var binary = "";
                    var bytes = new Uint8Array(e.target.result);
                    var length = bytes.byteLength;
                    for (var i = 0; i < length; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    /* if binary string, read with type 'binary' */

                    var workbook = XLSX.read(binary, { type: 'binary' });
                    console.log("WORK BOOK : " + workbook);
                    /* DO SOMETHING WITH workbook HERE */
                    //   workbook.SheetNames.forEach(function (sheetName) {
                    var sheetName = workbook.SheetNames[0];

                    //   var workbook = XLSX.readFile('./assets/yourfile.xlsx');// ./assets is where your relative path directory where excel file is, if your excuting js file and excel file in same directory just igore that part
                    var sheet_name_list = workbook.SheetNames; // SheetNames is an ordered list of the sheets in the workbook
                    var data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]); //if you have multiple sheets
                    console.log("DATA : " + data);
                    // read from a XLS file



                    // get first sheet
                    let first_sheet_name = workbook.SheetNames[0];
                    let worksheet = workbook.Sheets[first_sheet_name];

                    var errorStatus = 0;

              

                    if (data.length > 0) {
                        result = data;

                        for (var key in data) {
                            var keyValue = key;
                            keyValue = Number(keyValue) + 2; //row no

                            //STAFF NAME VALIDATON
                            var staffName = data[key]['EmployeeName'];
                            if (staffName == undefined) {
                                errorStatus++;
                                errorMessageArray.push("Staff Name Empty At Row " + keyValue);
                            } else {
                                if (!staffName.match(/^([a-zA-Z]+)([a-zA-Z ])*$/)) {
                                    errorStatus++;
                                    errorMessageArray.push("Check for Employee Name Format( Only Alphabets ) At Row " + keyValue);
                                }
                            }
                            //CONTACT NO VALIDATION
                            var contactNo = data[key]['ContactNo'];
                            if (contactNo != undefined) {
                                var regExpConNo = /^\d{10}$/;
                                if (!regExpConNo.test(contactNo)) {
                                    errorStatus++;
                                    errorMessageArray.push("Check for Contact No Format At Row " + keyValue);
                                }
                            } else {
                                errorStatus++;
                                errorMessageArray.push("ContactNo Empty At Row " + keyValue);
                            }
                            //SALARY VALIDATION
                            var salary = data[key]['Salary'];
                            if (salary == undefined) {
                                errorStatus++;
                                errorMessageArray.push("Salary Empty At Row " + keyValue);
                            }
                            //EMAIL ID VALIDATION           
                            var emailId = data[key]['EmailId'];
                            if (emailId != undefined) {
                                var regExp = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
                                if (!regExp.test(emailId)) {
                                    errorStatus++;
                                    errorMessageArray.push("Check for Email Id Format At Row " + keyValue);
                                }
                            } else {
                                errorStatus++;
                                errorMessageArray.push("Email Id Empty At Row " + keyValue);
                            }
                            //ADDRESS VALIDATION
                            var address = data[key]['Address'];
                            if (address != undefined) {
                            } else {
                                errorStatus++;
                                errorMessageArray.push("Address Empty At Row " + keyValue);
                            }

                               //Designation VALIDATION
                               var roleName = data[key]['Designation'];
                               if (roleName != undefined) {
                               } else {
                                   errorStatus++;
                                  errorMessageArray.push("Designation Empty At Row " + keyValue);
                               }

                            //State VALIDATION
                            var state = data[key]['State'];
                            if (state != undefined) {
                            } else {
                             }


                            //DOB ID VALIDATION           
                            var dob = data[key]['DOB(DD/MM/YYYY)'];
                            if (dob != undefined) {
                                var regExp = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
                                if (!regExp.test(dob)) {
                                    errorStatus++;
                                    errorMessageArray.push("Check for Date Format Of DOB At Row " + keyValue);
                                }
                            } else {
                            }


                            //Nationality VALIDATION
                            var nationality = data[key]['Nationality'];
                            if (nationality != undefined) {
                            } else {
                              }


                         
                        }

                        //alert("ERROR STATUS VALUE :"+errorStatus);
                        if (errorStatus == 0) {
                            //PROCEED WITH UPLOAD ENABLE THE SUBMIT BUTTON
                            $("#submit").prop("disabled", false);

                        } else {
                            //SHOW THE ERROR VALIDATION PAGE


                            ReactDOM.render(
                                <Router>
                                    <div>

                                        <Route path="/" component={() => <EmployeeExcelValidationMessage errorData={errorMessageArray} />} />

                                    </div>
                                </Router>,
                                document.getElementById('contentRender'));


                        }


                    } else {

                        confirmAlert({
                            title: 'Uploading File Failed',                        // Title dialog
                            message: 'An Empty File cannot be Uploaded',
                            confirmLabel: 'Ok',                           // Text button confirm


                        });

                    }



                };
                reader.readAsArrayBuffer(f);
            }


        }

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

  CustomerImportFunc(){

    $("#customerimportarea").show();
    $("#productimportarea").hide();  
    $("#employeeimportarea").hide();  
    $("#vendorimportarea").hide();

    this.GetCustomerFileName();
  }

 
  GetCustomerFileName(){

    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    oldCustomerFileNames="";
$.ajax({
            type: 'POST',
              data:JSON.stringify({
                companyId:companyId,
            //    companyId:"001",
                }),
    
           // data:resultData,
        //   url:" http://15.206.129.105:8080/ERPDetails/Excel/GetFilename",
            url:" http://15.206.129.105:8080/MerchandiseAPI/Excel/GetCustomerFileName",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
          console.log(data);
          oldCustomerFileNames=data.customerFileName;
        
        /*  var filename=data.fileName.split(",");

          for(var i=0;i<filename.length;i++){
            oldFileNames.push(filename[i]);
          }
*/
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

CustomerUpload(){
    
var customerFileArray = oldCustomerFileNames.split(",");
console.log("FILE ARRAY",customerFileArray);
console.log("UPLOADED FILE NAME :",name);



var customerFileNameStatus=_.contains(customerFileArray, name);
var length=customerFileArray.length;

if(customerFileNameStatus==true){
 

                   Swal.fire({
                     position: 'center',
                     icon: 'success',
                     title: 'File Upload will be Done Shortly',  
                     showConfirmButton: false,
                     timer: 2000
                   })

            
var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
//console.log("INSIDE UPLOAD FUNCTION");
//console.log("RESULT DATA : " +JSON.stringify(result));

var resultData=JSON.stringify(result);
this.state.result1=resultData.toString();

var self=this;

$.ajax({

 
           type: 'POST',
             data:JSON.stringify({
               companyId:companyId,
             // companyId:"001",
               testlist:result}),
   
        url:" http://15.206.129.105:8080/MerchandiseAPI/Excel/UploadCustomerData",
           contentType: "application/json",
           dataType: 'json',
           async: false,
           success: function (data, textStatus, jqXHR) {
         console.log(data);
        // self.increaseBar("100");


         if(data.returnXl.length != 0){
          ReactDOM.render(
         <Router>
           <div>
             
             <Route path="/" component={() => <CustomerExcelImportResponse data={data} />} />


           </div>
         </Router>,
         document.getElementById('contentRender'));
       registerServiceWorker();
          }else{
           
                  Swal.fire({
           position: 'center',
           icon: 'success',
           title:  'Your File Has Been Uploaded Successfully',   
           showConfirmButton: false,
           timer: 2000
         })

           ReactDOM.render(
             <Router>
             <div>
             <Route path="/" component={CustomerList1} />
             </div>
             </Router>,
             document.getElementById('contentRender'));

       


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





}else{

         Swal.fire({
           position: 'center',
           icon: 'error',
           title:  "You Have Uploaded An Invalid File Please Upload A Valid File ",    
           showConfirmButton: false,
           timer: 2000
         })
}


}

/*
*EMPLOYEE IMPORT FUNCTIONS
*/

  EmployeeImportFunc(){

    $("#customerimportarea").hide();
    $("#productimportarea").hide();  
    $("#employeeimportarea").show();  
    $("#vendorimportarea").hide();

    this.GetEmployeeFileName();
  }

  GetEmployeeFileName() {

    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    oldEmployeeFilename="";
    $.ajax({
        type: 'POST',
        data: JSON.stringify({
            companyId: companyId,
            //    companyId:"001",
        }),

        // data:resultData,

        url: " http://15.206.129.105:8080/MerchandiseAPI/Excel/GetEmployeeFilename",
        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            oldEmployeeFilename = data.employeeFileName;
        },
        error: function (data) {
            confirmAlert({
                title: 'No Internet',                        // Title dialog
                message: 'Network Connection Problem',               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
            });
        },
    });

}


  EmployeeUpload(){
    var fileArray = oldEmployeeFilename.split(",");
    console.log("FILE ARRAY", fileArray);
    console.log("UPLOADED FILE NAME :", name);



    var fileNameStatus = _.contains(fileArray, name);
    var length = fileArray.length;

    if (fileNameStatus == true) {



        confirmAlert({
            title: 'Uploading File',                        // Title dialog
            message: 'File Upload will be Done Shortly',
            confirmLabel: 'Ok',                           // Text button confirm


        });


        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        //console.log("INSIDE UPLOAD FUNCTION");
        //console.log("RESULT DATA : " +JSON.stringify(result));

        var resultData = JSON.stringify(result);
        this.state.result1 = resultData.toString();

        var self = this;

        $.ajax({


            type: 'POST',
            data: JSON.stringify({
                companyId: companyId,
                testlist: result,
               
            }),

            url: " http://15.206.129.105:8080/MerchandiseAPI/Excel/UploadEmployeeData",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                // self.increaseBar("100");


                if (data.returnXl.length != 0) {

                    ReactDOM.render(
                        <Router>
                            <div>

                                <Route path="/" component={() => <EmployeeExcelImportResponse data={data} />} />


                            </div>
                        </Router>,
                        document.getElementById('contentRender'));

                    registerServiceWorker();
                } else {

                    confirmAlert({
                        title: 'Uploaded File Successfully',                        // Title dialog
                        message: 'Your File Has Been Uploaded Successfully',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    });

                    ReactDOM.render(
                        <Router>
                            <div>
                                <Route path="/" component={StaffList} />
                            </div>
                        </Router>,
                        document.getElementById('contentRender'));


                }


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
            title: 'File Upload Error',                        // Title dialog
            message: "You Have Uploaded An Invalid File Please Upload A Valid File ",               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm


        });
    }



  }
  

  /*
  *PRODUCT IMPORT FUNCTIONS
  */
  ProductImportFunc(){

    $("#customerimportarea").hide();
    $("#productimportarea").show();  
    $("#employeeimportarea").hide();  
    $("#vendorimportarea").hide();

    this.GetProductFileName();

  }
 
  GetProductFileName(){

    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    oldFileNames="";
$.ajax({
            type: 'POST',
              data:JSON.stringify({
                companyId:companyId,
            //    companyId:"001",
                }),
    
           // data:resultData,
     
            url:" http://15.206.129.105:8080/MerchandiseAPI/Excel/GetProductFilename",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
          console.log(data);
          oldFileNames=data.productFileName;
          

        /*  var filename=data.fileName.split(",");

          for(var i=0;i<filename.length;i++){
            oldFileNames.push(filename[i]);
          }
*/
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
  ProductUpload(){
    var fileArray = oldFileNames.split(",");
    console.log("FILE ARRAY",fileArray);
    console.log("UPLOADED FILE NAME :",name);
   
   
   
   var fileNameStatus=_.contains(fileArray, name);
   var length=fileArray.length;
   
   if(fileNameStatus==true){
     
                       Swal.fire({
                         position: 'center',
                         icon: 'success',
                         title: 'File Upload will be Done Shortly',  
                         showConfirmButton: false,
                         timer: 2000
                       })
   
                
   var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
   //console.log("INSIDE UPLOAD FUNCTION");
   //console.log("RESULT DATA : " +JSON.stringify(result));
   
   var resultData=JSON.stringify(result);
   this.state.result1=resultData.toString();
   
   var self=this;
   
    $.ajax({
   
     
               type: 'POST',
                 data:JSON.stringify({
                   companyId:companyId,
                   productNameList:result,
                   quantity:quantityArray.toString(),
                   quantityLimit:quantityLimitArray.toString(),
                   cgst:cgstArray.toString(),
                   sgst:sgstArray.toString(),
                   igst:igstArray.toString(),
                   saleRate:SaleRateArray.toString(),
                   purchaseRate:PurchaseRateArray.toString(),
                   serviceTime:serviceTimeArray.toString(),
                 }),
       
               url:" http://15.206.129.105:8080/MerchandiseAPI/Excel/UploadProductData",
               contentType: "application/json",
               dataType: 'json',
               async: false,
               success: function (data, textStatus, jqXHR) {
             console.log(data);
            // self.increaseBar("100");
   
   
             if(data.returnXl.length != 0){
           
               ReactDOM.render(
             <Router>
               <div>
                 
                 <Route path="/" component={() => <ExcelImportResponse data={data} />} />
   
   
               </div>
             </Router>,
             document.getElementById('contentRender'));
             
           registerServiceWorker();
              }else{
   
               Swal.fire({
                 position: 'center',
                 icon: 'success',
                 title: 'Your File Has Been Uploaded Successfully',    
                 showConfirmButton: false,
                 timer: 2000
               })
   
   
               ReactDOM.render(
                 <Router>
                 <div>
                 <Route path="/" component={ProductList} />
                 </div>
                 </Router>,
                 document.getElementById('contentRender'));
   
   
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
   
   
   
   
   
   }else{
   
             Swal.fire({
               position: 'center',
               icon: 'error',
               title: "You Have Uploaded An Invalid File Please Upload A Valid File ",  
               showConfirmButton: false,
               timer: 2000
             })
   }
   
   
   
   
  }

   /*
  *VENDOR IMPORT FUNCTIONS
  */

  VendorImportFunc(){

    $("#customerimportarea").hide();
    $("#productimportarea").hide();  
    $("#employeeimportarea").hide();  
    $("#vendorimportarea").show();

    this.GetVendorFileName();
  }

  GetVendorFileName(){

    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    oldVendorFileNames="";
$.ajax({
            type: 'POST',
              data:JSON.stringify({
                companyId:companyId,
            //    companyId:"001",
                }),
    
           // data:resultData,
        //   url:" http://15.206.129.105:8080/ERPDetails/Excel/GetFilename",
            url:" http://15.206.129.105:8080/MerchandiseAPI/Excel/GetVendorFileName",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
          console.log(data);
          oldVendorFileNames=data.vendorFileName;
        
        /*  var filename=data.fileName.split(",");

          for(var i=0;i<filename.length;i++){
            oldFileNames.push(filename[i]);
          }
*/
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

  VendorUpload(){
    var vendorFileArray = oldVendorFileNames.split(",");
    console.log("FILE ARRAY",vendorFileArray);
    console.log("UPLOADED FILE NAME :",name);
   
   
   
   var vendorFileNameStatus=_.contains(vendorFileArray, name);
   var length=vendorFileArray.length;
   
   if(vendorFileNameStatus==true){
                         
                      Swal.fire({
               position: 'center',
               icon: 'success',
               title: 'File Upload will be Done Shortly',
               showConfirmButton: false,
               timer: 2000
             })
   
                
   var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
   //console.log("INSIDE UPLOAD FUNCTION");
   //console.log("RESULT DATA : " +JSON.stringify(result));
   
   var resultData=JSON.stringify(result);
   this.state.result1=resultData.toString();
   
   var self=this;
   
    $.ajax({
   
     
               type: 'POST',
                 data:JSON.stringify({
                   companyId:companyId,
                 // companyId:"001",
                   testlist:result}),
       
    url:" http://15.206.129.105:8080/MerchandiseAPI/Excel/UploadVendorData",
               contentType: "application/json",
               dataType: 'json',
               async: false,
               success: function (data, textStatus, jqXHR) {
             console.log(data);
            // self.increaseBar("100");
   
   
             if(data.returnXl.length != 0){
              ReactDOM.render(
             <Router>
               <div>
                 
                 <Route path="/" component={() => <VendorExcelImportResponse data={data} />} />
   
   
               </div>
             </Router>,
             document.getElementById('contentRender'));
           registerServiceWorker();
              }else{
   
              
               Swal.fire({
                 position: 'center',
                 icon: 'success',
                 title: 'Your File Has Been Uploaded Successfully',     
                 showConfirmButton: false,
                 timer: 2000
               })
   
               ReactDOM.render(
                 <Router>
                 <div>
                 <Route path="/" component={VendorList1} />
                 </div>
                 </Router>,
                 document.getElementById('contentRender'));
   
           
   
   
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
   
   
   
   
   
   }else{
   
             
     Swal.fire({
       position: 'center',
       icon: 'error',
       title:  "You Have Uploaded An Invalid File Please Upload A Valid File ", 
       showConfirmButton: false,
       timer: 2000
     })
   }
   
   
   
   
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
          <div class="card-header" >
            <h4 style={{ fontWeight: "300", fontSize: "30px" }}>Import Menu</h4>
          </div>
          <div>
            <div class="card-body">
            <div>
            <ul>

               
                  {/* CUSTOMER FUNC */}
                  <div id="rcorners1">
                  <a  href="#" >
                  <span onClick={() => this.CustomerImportFunc()}  class="glyphicon glyphicon-import">
                  <span style={{ paddingLeft: "10px" ,textAlign:"center"}}>Customer</span>
                  </span> &nbsp;</a>
                  </div>

                 <br/>

             
                
                <div id="customerimportarea" >
               
                 <div>
                <h3>Instructions For Successful File Upload</h3>
                <p>1.Ensure Customer contains only Alphabets</p>
                <p>2.Ensure ContactNo, AlternateNo are only Numbers</p>
                <p>3.Ensure Email Id is of correct Format</p>

                </div>
                <br/>
                <br/>
                <div >
                <input type="file" id="customerfiles" name="files"/>
                <br/>
                    <button type="button" id="submit" onClick={() => this.CustomerUpload()} className="btn btn-primary" style={{ marginLeft: "20px", marginLeft: "auto", marginRight: "auto", marginBottom: "45px", marginTop: "20px", display: "block" }}>Submit</button>


                </div>


                </div>




                <br/>
                {/* EMPLOYEE FUNC */}
                <div id="rcorners1">
                  <a href="#">
                  <span onClick={() => this.EmployeeImportFunc()} class="glyphicon glyphicon-import">
               
               <span style={{ paddingLeft: "10px" }}>Employee</span>
                  </span> &nbsp;</a>
                </div>
                <br/>

                <div id="employeeimportarea">
                <div>
                    <h3>Instructions For Successful File Upload</h3>
                    <p>1.Ensure EmployeeName,Address,EmailId,contactNo,Salary,Designation Are Filled For Sure</p>
                    <p>2.Ensure State,Nationality are only alphabets</p>
                    <p>3.Date Formats of <b>DOB</b> Should be Provided in DD-MM-YYYY Format (date formats should be followed strictly)</p>
                </div>
                
                <div >
                    <input type="file" id="employeefiles" name="files" />
                    <br />
                    <button type="button" id="submit" onClick={() => this.EmployeeUpload()} className="btn btn-primary" style={{ marginLeft: "20px", marginLeft: "auto", marginRight: "auto", marginBottom: "45px", marginTop: "20px", display: "block" }}>Submit</button>


                </div>
                </div>





                <br/>
            {/* PRODUCT FUNC */}
            <div id="rcorners1">
            <a href="#">
            <span onClick={() => this.ProductImportFunc()} class="glyphicon glyphicon-import">
               
               <span style={{ paddingLeft: "10px" }}>Product</span>
                  </span> &nbsp;</a>
                  </div>
                    <br/>
            
         
                <div id="productimportarea">
                <div>
            <h3>Instructions For Successful File Upload</h3>
            <p>1.Ensure ProductName,ProductType,Productategory Are Filled For Sure</p>
            <p>2.Ensure Quantity,QuantityLimit,CGST,SGST,IGST are only Numbers</p>
            <p>3.Ensure SaleRate,PurchaseRate are Numbers or Numbers With 2 Decimals Places</p>
            <p>4.Ensure Service Time is Mentioned For Services</p>
            </div>

            <br/>
            <br/>
            <div >
            <input type="file" id="productfiles" name="files"/>
            <br/>
                <button type="button" id="submit" onClick={() => this.ProductUpload()} className="btn btn-primary" style={{ marginLeft: "20px", marginLeft: "auto", marginRight: "auto", marginBottom: "45px", marginTop: "20px", display: "block" }}>Submit</button>


            </div>
                

                </div>





                <br/>
                   {/* VENDOR FUNC */}
             <div id="rcorners1">
            <a href="#">
            <span onClick={() => this.VendorImportFunc()}  class="glyphicon glyphicon-import">
               
               <span style={{ paddingLeft: "10px" }}>Vendor</span>
                  </span> &nbsp;</a>
                    </div>
                    <br/>
                   
                <div id="vendorimportarea">
                 <div>
                <h3>Instructions For Successful File Upload</h3>
                <p>1.Ensure Vendor Name contains only Alphabets</p>
                <p>2.Ensure ContactNo, AlternateNo are only Numbers</p>
                <p>3.Ensure Email Id is of correct Format</p>

                </div>
                <br/>
                <br/>
                <div >
            <input type="file" id="vendorfiles" name="files"/>
            <br/>
                <button type="button" id="submit" onClick={() => this.VendorUpload()} className="btn btn-primary" style={{ marginLeft: "20px", marginLeft: "auto", marginRight: "auto", marginBottom: "45px", marginTop: "20px", display: "block" }}>Submit</button>


            </div>

                

          </div>
                 </ul>


            
            
            </div>
            
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default ImportMenuPage;