import React, { Component } from 'react'
import './GenericDashboardCSS.css'
import $ from "jquery";
import '../../../node_modules/jquery/dist/jquery.min.js';
//import "../../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';
import { Pie, Bar, HorizontalBar, Doughnut, Bubble, Line } from 'react-chartjs-2';

//css

//Components

import DashboardOverall from '../MaincontentDashboard/DashboardOverall';

import CustomerList1 from '../CustomerList';
import VendorEntryForm1 from '../VendorEntryForm';
import VendorList1 from '../VendorList';
import VendorEntryForm from '../VendorEntryForm';
import AddProduct from '../AddProduct';
import CustomerList from '../CustomerList';
import VendorList from '../VendorList';
import ProductList from '../ProductList';
import SaleOrder from '../SaleOrder';
import InvoiceList from '../InvoiceList';
import Estimate from '../Estimate';
import EstimateList from '../EstimateList';
import PurchaseInvoice from '../PurchaseInvoice';
import GSTQuotation from '../GSTQuotation';
import PurchaseInvoiceList from '../PurchaseInvoiceList';
import registerServiceWorker from '../registerServiceWorker';
import Expense from '../Expense';
import WithoutGSTQuotation from '../WithoutGSTQuotation';
import QuotationList from '../QuotationList';
import AddStaff from '../AddStaff';
import StaffList from '../StaffList';

import GST3B from '../GST3B';

import GSTR1 from '../GSTR1';
import ReportMenuPage from '../ReportMenuPage';

import AddBank from '../AddBank';
import BankReport from '../BankReport';

import Help from '../Help';
import ImportLogo from '../ImportLogo';

import LoginPage from '../LoginPage';
import AddRole from '../AddRole';
import ChangePassword from '../ChangePassword';
import ExportMenuPage from '../ExportMenuPage';
import ImportMenuPage from '../ImportMenuPage';
import CustomerEntryForm from '../CustomerEntryForm';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import TaskMappingBasic from '../TaskMappingBasic'; 
import ReportMenuPageBasic from '../ReportMenuPageBasic';
export default class GenericDashboardBasic extends Component {
 constructor() {
 super()
 var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
 var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
 var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
 var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
 var companyName_mobile;

 if(companyName.length>20){
 companyName_mobile=companyName.substr(0,20)+"..";
 }else{
 companyName_mobile= companyName;
 }

 this.state = {

 companyId: companyId,
 companyName: companyName,
 companyName_mobile:companyName_mobile,
 staffId:staffId,
 employeeName:employeeName,
 }
 }
 variableChanged = (val) => {
 this.setState({backButtonVariable: val});
 }
 componentDidMount() {

 $(document).ready(function () {
 
 $('#side-menu a[data-toggle="collapse"]').on("click", function (e) {
 var ulId1 = this.getAttribute("href");

 $('.collapsiable').not(ulId1).removeClass('show in');
 // $(ulId1).slideToggle("slow").addClass("show");
 $(ulId1).addClass("show");
 // $('.collapsiable').removeClass('show').addClass('collapsed');
 
 });
 })
 
 
 $(document).ready(function () {
 
 $('#sidebarCollapse').on('click', function () {
 /* $('#side-menu span').not.collapse("hide"); */
 /* $('.dashboard_List').css('opacity', '1'); */
 $('#sidebar').toggleClass('active');
 /* $("#sidebar").show(); */
 
 });
 });
 
 
 $(document).ready(function () {
 
 $('.contentRender').on('click', function () {
 $('#sidebar').addClass('active');
 });
 });
 
 $(document).ready(function () {
 
 $('.sidemenu_autoclose').on('click', function () {
 $('#sidebar').addClass('active');
 
 });
 });
 $(document).ready(function () {
 
 $('.sidemenu_autoclose_settings').on('click', function () {
 $('#sidebar').addClass('active');
 });
 });
 

 this.Dashboard();
 
 }
 Dashboard() {

 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={DashboardOverall}
 />
 </div>
 </Router>,
 document.getElementById("contentRender"));

 }
 ImportFunc() {
 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={ImportLogo} />
 </div>
 </Router>,
 document.getElementById("contentRender")
 );
 
 }
 
 LogoutFunc() {
 localStorage.clear();
 ReactDOM.render(
 <Router>
 <div>
 
 <Route path="/" component={LoginPage} />
 
 </div>
 </Router>, document.getElementById('root'));
 }
 HelpFunc() {
 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={Help} />
 </div>
 </Router>,
 document.getElementById('contentRender'));
 
 }
 ChangePassword(){
 // helpFuncValue= "helpchangepassword";
 
 ReactDOM.render(
 <Router>
 <div>
 
 <Route path="/" component={ChangePassword} />
 </div>
 </Router>,
 document.getElementById('contentRender'));
 }

 DashBoardDisplay() {
 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={DashboardOverall}
 />
 </div>
 </Router>,
 document.getElementById('contentRender'));
 
 }
 CustomerEntryForm() {


 var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
 
 var flag = 1;//false
 var i = permission.length;
 
 $.each(permission, function (i, item) { 
 if (item.permission == "addCustomer") {
 flag = 0;//true
 }
 });
 
 if (flag == 0) {
 
 ReactDOM.render(
 <Router>
 <div>
 
 <Route path="/" component={CustomerEntryForm} />
 </div>
 </Router>,
 document.getElementById('contentRender'));
 }
 else {
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }
 
 
 
 }
 CustomerList() {
 var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
 
 var flag = 1;//false
 var i = permission.length;
 $.each(permission, function (i, item) {
 
 if (item.permission == "listOfCustomer") {
 flag = 0;//true
 }
 });
 
 if (flag == 0) {
 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={CustomerList1} />
 </div>
 </Router>,
 document.getElementById('contentRender'));
 }
 else {
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }
 
 
 
 }
 
 VendorEntryForm() {

 var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

 var flag = 1;//false
 var i = permission.length;
 $.each(permission, function (i, item) {

 if (item.permission == "addVendor") {
 flag = 0;//true
 }
 });

 if (flag == 0) {

 ReactDOM.render(
 <Router>
 <div>

 <Route path="/" component={VendorEntryForm1} />
 </div>
 </Router>,
 document.getElementById('contentRender'));
 }
 else {
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }


 }
 
 VendorList() {
 var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

 var flag = 1;//false
 var i = permission.length;
 $.each(permission, function (i, item) {

 if (item.permission == "listOfVendor") {
 flag = 0;//true
 }
 });

 if (flag == 0) {

 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={VendorList1} />
 </div>
 </Router>,
 document.getElementById('contentRender'));
 }
 else {
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }



 }
 
 AddProduct() {
 var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

 var flag = 1;//false
 var i = permission.length;
 $.each(permission, function (i, item) {

 if (item.permission == "addProduct") {
 flag = 0;//true
 }
 });

 if (flag == 0) {

 ReactDOM.render(
 <Router>
 <div>

 <Route path="/" component={AddProduct} />
 </div>
 </Router>,
 document.getElementById('contentRender'));
 }
 else {
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }


 }
 
 ProductList() {
 var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

 var flag = 1;//false
 var i = permission.length;
 $.each(permission, function (i, item) {

 if (item.permission == "listOfProduct") {
 flag = 0;//true
 }
 });

 if (flag == 0) {

 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={ProductList} />
 </div>
 </Router>,
 document.getElementById('contentRender'));
 }
 else {
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }



 }
 
 SaleOrder() {
 var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

 var flag = 1;//false
 var i = permission.length;
 $.each(permission, function (i, item) {

 if (item.permission == "saleOrder") {
 flag = 0;//true
 }
 });

 if (flag == 0) {
 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={SaleOrder} />
 </div>
 </Router>,
 document.getElementById('contentRender'));

 }
 else {
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }



 }
 
 InvoiceList() {
 var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

 var flag = 1;//false
 var i = permission.length;
 $.each(permission, function (i, item) {

 if (item.permission == "saleInvoice") {
 flag = 0;//true
 }
 });

 if (flag == 0) {
 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={InvoiceList} />
 </div>
 </Router>,
 document.getElementById('contentRender'));

 }
 else {
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }


 }
 Estimate() {
 var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

 var flag = 1;//false
 var i = permission.length;
 $.each(permission, function (i, item) {

 if (item.permission == "estimateOrder") {
 flag = 0;//true
 }
 });

 if (flag == 0) {
 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={Estimate} />
 </div>
 </Router>,
 document.getElementById('contentRender'));


 }
 else {
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }

 }
 EstimateList() {
 var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

 var flag = 1;//false
 var i = permission.length;
 $.each(permission, function (i, item) {

 if (item.permission == "estimateInvoice") {
 flag = 0;//true
 }
 });

 if (flag == 0) {
 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={EstimateList} />
 </div>
 </Router>,
 document.getElementById('contentRender'));

 }
 else {
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }


 }
 PurchaseInvoice() {
 var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

 var flag = 1;//false
 var i = permission.length;
 $.each(permission, function (i, item) {

 if (item.permission == "purchaseOrder") {
 flag = 0;//true
 }
 });

 if (flag == 0) {
 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={PurchaseInvoice} />
 </div>
 </Router>,
 document.getElementById('contentRender'));

 }
 else {
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }


 }

 PurchaseInvoiceList() {
 var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

 var flag = 1;//false
 var i = permission.length;
 $.each(permission, function (i, item) {

 if (item.permission == "purchaseInvoice") {
 flag = 0;//true
 }
 });

 if (flag == 0) {
 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={PurchaseInvoiceList} />
 </div>
 </Router>,
 document.getElementById('contentRender'));

 }
 else {
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }



 }

 Expense() {


 var PermissionHeader = JSON.parse(
   CryptoJS.AES.decrypt(
     localStorage.getItem("PermissionHeader"),
     "shinchanbaby"
   ).toString(CryptoJS.enc.Utf8)
 );
 
 var flag = 1; //false
 var i = PermissionHeader.length;
 $.each(PermissionHeader, function (i, item) {
   if (item.permissionHeader == "expense") {
     flag = 0; //true
   }
 });
 if (flag == 0) {
 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={Expense} />
 </div>
 </Router>,
 document.getElementById('contentRender'));

 }
 else {
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }




 }
 GSTQuotation() {

 var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

 var flag = 1;//false
 var i = permission.length;
 $.each(permission, function (i, item) {

 if (item.permission == "gstQuotation") {
 flag = 0;//true
 }
 });

 if (flag == 0) {
 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={GSTQuotation} />
 </div>
 </Router>,
 document.getElementById('contentRender'));

 }
 else {
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }


 }
 WithoutGSTQuotation() {
 var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

 var flag = 1;//false
 var i = permission.length;
 $.each(permission, function (i, item) {

 if (item.permission == "withoutGSTQuotation") {
 flag = 0;//true
 }
 });

 if (flag == 0) {
 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={WithoutGSTQuotation} />
 </div>
 </Router>,
 document.getElementById('contentRender'));

 }
 else {
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }


 }
 QuotationList() {
 var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

 var flag = 1;//false
 var i = permission.length;
 $.each(permission, function (i, item) {

 if (item.permission == "listOfQuotation") {
 flag = 0;//true
 }
 });

 if (flag == 0) {
 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={QuotationList} />
 </div>
 </Router>,
 document.getElementById('contentRender'));

 }
 else {
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }

 }
 AddStaff() {
 var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

 var flag = 1;//false
 var i = permission.length;
 $.each(permission, function (i, item) {

 if (item.permission == "addEmployee") {
 flag = 0;//true
 }
 });

 if (flag == 0) {
 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={AddStaff} />
 </div>
 </Router>,
 document.getElementById('contentRender'));

 }
 else {
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }


 }
 StaffList() {
 var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

 var flag = 1;//false
 var i = permission.length;
 $.each(permission, function (i, item) {

 if (item.permission == "listOfEmployee") {
 flag = 0;//true
 }
 });

 if (flag == 0) {
 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={StaffList} />
 </div>
 </Router>,
 document.getElementById('contentRender'));

 }
 else {
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }


 }

 AddRole(){
   var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

   var flag = 1;//false
   var i = permission.length;
   $.each(permission, function (i, item) {
  
   if (item.permission == "addRole") {
   flag = 0;//true
   }
   });
   if (flag == 0) {
 ReactDOM.render(
 <Router>
 <div>
 
 <Route path="/" component={AddRole} />
 </div>
 </Router>,
 document.getElementById('contentRender'));
   }
   else {
      var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
      w.document.write('You are not Allowed to Access this Page')
      w.focus()
      setTimeout(function () { w.close(); }, 2000)
      }
 }
 

 Bank() {
   var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

   var flag = 1;//false
   var i = permission.length;
   $.each(permission, function (i, item) {
  
   if (item.permission == "addBank") {
   flag = 0;//true
   }
   });
   if (flag == 0) {
 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={AddBank} />
 </div>
 </Router>,
 document.getElementById('contentRender'));
}
 else {
   var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
   w.document.write('You are not Allowed to Access this Page')
   w.focus()
   setTimeout(function () { w.close(); }, 2000)
   }

 }
 BankDetails() {
   var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

   var flag = 1;//false
   var i = permission.length;
   $.each(permission, function (i, item) {
  
   if (item.permission == "listOfBank") {
   flag = 0;//true
   }
   });
   if (flag == 0) {
 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={BankReport} />
 </div>
 </Router>,
 document.getElementById('contentRender'));
   }
   else {
      var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
      w.document.write('You are not Allowed to Access this Page')
      w.focus()
      setTimeout(function () { w.close(); }, 2000)
      }
 }
 
 GST3B() {
 var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

 var flag = 1;//false
 var i = permission.length;
 $.each(permission, function (i, item) {

 if (item.permission == "GST3B") {
 flag = 0;//true
 }
 });

 if (flag == 0) {

 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={GST3B} />
 </div>
 </Router>,
 document.getElementById('contentRender'));

 }
 else {
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }


 }
 GSTR1() {

 var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

 var flag = 1;//false
 var i = permission.length;
 $.each(permission, function (i, item) {

 if (item.permission == "GSTR1") {
 flag = 0;//true
 }
 });

 if (flag == 0) {

 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={GSTR1} />
 </div>
 </Router>,
 document.getElementById('contentRender'));

 }
 else {
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }

 }
 

 
 ReportFunc() {

   var PermissionHeader = JSON.parse(
      CryptoJS.AES.decrypt(
        localStorage.getItem("PermissionHeader"),
        "shinchanbaby"
      ).toString(CryptoJS.enc.Utf8)
    );

    var flag = 1; //false
    var i = PermissionHeader.length;
    $.each(PermissionHeader, function (i, item) {
      if (item.permissionHeader == "reports") {
        flag = 0; //true
      }
    });

 if (flag == 0) {


 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={ReportMenuPageBasic} />
 </div>
 </Router>,
 document.getElementById('contentRender'));

 }
 else {
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }


 }

 


   TaskMappingBasic(){
      var PermissionHeader = JSON.parse(
         CryptoJS.AES.decrypt(
           localStorage.getItem("PermissionHeader"),
           "shinchanbaby"
         ).toString(CryptoJS.enc.Utf8)
       );
      
       var flag = 1; //false
       var i = PermissionHeader.length;
       $.each(PermissionHeader, function (i, item) {
         if (item.permissionHeader == "taskMapping") {
           flag = 0; //true
         }
       });
   
    if (flag == 0) {
      ReactDOM.render(
         <Router>
         <div>
         <Route path="/" component={TaskMappingBasic} />
         </div>
         </Router>,
         document.getElementById("contentRender")
         );
      }
      else {
         var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
         w.document.write('You are not Allowed to Access this Page')
         w.focus()
         setTimeout(function () { w.close(); }, 2000)
        
         }

   }
  
 ExportFunc(){
 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={ExportMenuPage} />
 </div>
 </Router>,
 document.getElementById('contentRender'));
 }

 ImportFunc(){
 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={ImportMenuPage} />
 </div>
 </Router>,
 document.getElementById('contentRender'));
 }

 ImportLogoFunc() {
 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={ImportLogo} />
 </div>
 </Router>,
 document.getElementById("contentRender")
 );

 

 }
 
 render() {
 return (
 <div>
 <div className="main_header">
 <div className="header_sm_device">
 <a href="index2.html" className="logo header_sm_device_logo">
 {/* mini logo for sidebar mini 50x50 pixels 
 <span className="logo-mini"><b>A</b>LT</span>*/}
 {/* logo for regular state and mobile devices */}
 <span className="logo-lg"><b style={{fontWeight: "100",fontSize: "17px"}}> 
 {this.state.companyName_mobile}</b></span>
 </a>
 </div>

 <a class="navbar_company_name" id="navbar_company_name" style={{ backgroundColor: "" }}>Throughbooks</a>
 <nav class="navbar navbar-inverse navbar_css">
 <div class="navbar-header" style={{ position: " absolute" }}>
 <a class="navbar-brand"  style={{color:"#ffffff" }} href="#" id="sidebarCollapse"><span class="glyphicon glyphicon-menu-hamburger"></span> &nbsp;</a>
 <a class="navbar-brand"  style={{color:"#ffffff" }} href="#" ><span onClick={() => this.DashBoardDisplay()} class="glyphicon glyphicon-home"></span> &nbsp;</a>
 <a class="navbar-brand nav_brand_client_sm"  style={{color:"#ffffff" }} href="#"> {this.state.companyName}</a>
 </div>

 <ul class="nav navbar-nav navbar-right pull-right " style={{ display: "flex", marginRight: "15px" }}>
 <li>
 <a href="#" class="dropdown-toggle user_profile sidemenu_autoclose_settings " data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" >
 <span class="glyphicon glyphicon-cog glyphicon-spin" style={{color:"#ffffff" }} ></span> &nbsp;</a>
 <ul class="dropdown-menu" style={{marginLeft: "-110px",zIndex: "20"}}>
 <li><a href="#" className="user_p_menu">Emp_ID: {this.state.staffId}</a></li>
 <li role="separator" className="set_divider" />
 <li><a href="#" className="user_p_menu"
 style={{ backgroundColor: "", color: "black" }}>
 <span
 class="glyphicon glyphicon-user"
 style={{
 float: "",color:"#3c3b3b"
 }}>
 <span className="settings_Top_Submenu" style={{ paddingLeft: "10px" }}>{this.state.employeeName}</span>
 </span>
 </a>
 </li>
 
 <li role="separator" class=" set_divider" ></li>
 <li><a href="#" className="user_p_menu"
 style={{ backgroundColor: "", color: "black" }}>
 <span
 class="glyphicon glyphicon-import"
 onClick={() => this.ImportLogoFunc()}
 style={{
 float: "",color:"#3c3b3b"
 }}>
 <span className="settings_Top_Submenu" style={{ paddingLeft: "10px" }}>Import&ensp;Logo</span>
 </span>
 </a>
 </li>
 <li role="separator" class=" set_divider" ></li>
 <li><a href="#" className="user_p_menu"
 style={{ backgroundColor: "", color: "black" }}>
 <span
 class="glyphicon glyphicon-export"
 onClick={() => this.ExportFunc()}
 style={{
 float: "",color:"#3c3b3b"
 }}>
 <span className="settings_Top_Submenu" style={{ paddingLeft: "10px" }}>Export&ensp;Excel</span>
 </span>
 </a>
 </li>

 <li role="separator" class=" set_divider" ></li>
 <li><a href="#" className="user_p_menu"
 style={{ backgroundColor: "", color: "black" }}>
 <span
 class="glyphicon glyphicon-import"
 onClick={() => this.ImportFunc()}
 style={{
 float: "",color:"#3c3b3b"
 }}>
 <span className="settings_Top_Submenu" style={{ paddingLeft: "10px" }}>Import&ensp;Excel</span>
 </span>
 </a>
 </li>
 
 
 <li role="separator" className="set_divider" />
 <li><a href="#" className="user_p_menu"
 style={{ backgroundColor: "", color: "black" }}>
 <span
 class="glyphicon glyphicon-question-sign"
 onClick={() => this.HelpFunc()}
 style={{
 float: "",color:"#3c3b3b"
 }}>
 <span className="settings_Top_Submenu" style={{ paddingLeft: "10px" }}>Help</span>
 </span>
 </a>
 </li>
 <li role="separator" className="set_divider" />
 <li><a href="#" className="user_p_menu"
 style={{ backgroundColor: "", color: "black" }}>
 <span
 class="glyphicon glyphicon-eye-open"
 onClick={() => this.ChangePassword()}
 style={{
 float: "",color:"#3c3b3b"
 }}>
 <span className="settings_Top_Submenu" style={{ paddingLeft: "10px" }}>Change Password</span>
 </span>
 </a>
 </li>
 <li role="separator" className="set_divider" />
 <li><a href="#" className="user_p_menu"
 style={{ backgroundColor: "", color: "black" }}>
 <span
 class="glyphicon glyphicon-log-out"
 onClick={() => this.LogoutFunc()}
 style={{
 float: "",color:"#3c3b3b"
 }}>
 <span className="settings_Top_Submenu" style={{ paddingLeft: "10px" }}>Logout</span>
 </span>
 </a>
 </li>
 <li role="separator" className="set_divider" />
 
 </ul>
 </li>
 </ul>

 </nav>
 
 
 
 

 
 
 </div>

 <div class="wrapper">
 {/* <!-- Sidebar --> */}
 <div>

 <div id="side-menu" className="">

 <nav id="sidebar" className = "active" style={{ zIndex: "20" }} >
 <div className="dasdboard_div"><a onClick={() => this.DashBoardDisplay()}>
 <i class="fa fa-pie-chart fa-chart" aria-hidden="true">
 </i><span id="span_dash" className="span_dash"> DASHBOARD</span></a></div>
 <div className="screen_overlay" >
 <ul class="list-unstyled components" style={{ paddingTop: "0px", fontSize: "11px",paddingBottom: "100px" }} >
 
 <li >
 <div>
 <a href="#MasterSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle"
 ><i class="fa fa-universal-access i_sidebar" style={{ border: "none", display: "inline-block",paddingRight: "14px" }} aria-hidden="true"></i><span id="spanmas" className="sidebar_Title"> ERP Master</span></a>

 <ul class="collapse list-unstyled collapsiable" id="MasterSubmenu">

 <li><a className="sidemenu_autoclose" onClick={() => this.CustomerEntryForm()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> Add Customer</span></a></li>
 <li><a className="sidemenu_autoclose" onClick={() => this.CustomerList()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> List of Customer</span></a></li>
 <li><a className="sidemenu_autoclose" onClick={() => this.VendorEntryForm()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> Add Vendor</span></a></li>
 <li><a className="sidemenu_autoclose" onClick={() => this.VendorList()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> List of Vendor</span></a></li>
 <li><a className="sidemenu_autoclose" onClick={() => this.AddProduct()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> Add Product</span></a></li>
 <li><a className="sidemenu_autoclose" onClick={() => this.ProductList()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> List of Product</span></a></li>
 </ul>
 </div>

 </li>
 <li>
 <a href="#SaleSubmenu" data-toggle="collapse" aria-expanded="false"
 class="dropdown-toggle" ><i class="fa fa-dollar i_sidebar" style={{ border: "none", display: "inline-block" }} aria-hidden="true"></i><span id="spansale"className="sidebar_Title"> Sale</span></a>
 <ul class="collapse list-unstyled collapsiable" id="SaleSubmenu">
 <li><a className="sidemenu_autoclose" onClick={() => this.SaleOrder()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> Sale Order</span></a></li>
 <li><a className="sidemenu_autoclose" onClick={() => this.InvoiceList()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> Sale Invoice</span></a></li>
 <li><a className="sidemenu_autoclose" onClick={() => this.Estimate()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> Estimate</span></a></li>
 <li><a className="sidemenu_autoclose" onClick={() => this.EstimateList()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> Estimate Invoice</span></a></li>
 </ul>
 </li>
 <li>
 <a href="#InvoiceSubmenu" data-toggle="collapse" aria-expanded="false"
 class="dropdown-toggle"><i class="fa fa-shopping-cart i_sidebar" style={{ border: "none", display: "inline-block",paddingRight: "11px" }} aria-hidden="true"></i><span id="spanpurchase"className="sidebar_Title"> Purchase</span></a>
 <ul class="collapse list-unstyled collapsiable" id="InvoiceSubmenu">
 <li><a className="sidemenu_autoclose" onClick={() => this.PurchaseInvoice()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> Purchase Order</span></a></li>
 <li><a className="sidemenu_autoclose" onClick={() => this.PurchaseInvoiceList()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> Purchase Invoice</span></a></li>

 </ul>
 </li>
 


 <li>
 <a href="#ExpenseSubmenu"
 class="dropdown-toggle sidemenu_autoclose" onClick={() => this.Expense()}>
 <i class="fa fa-money i_sidebar" style={{ border: "none", display: "inline-block",paddingRight: "13px" }} aria-hidden="true"></i><span id="spanexpense"className="sidebar_Title"> Expense</span></a>

 </li>
 <li >
 <a href="#QuotationSubmenu" data-toggle="collapse" aria-expanded="false"
 class="dropdown-toggle"><i class="fa fa-print i_sidebar" style={{ border: "none", display: "inline-block",paddingRight: "16px" }} aria-hidden="true"></i><span id="spanquo" className="sidebar_Title"> Quotation</span></a>
 <ul class="collapse list-unstyled collapsiable" id="QuotationSubmenu">
 <li><a className="sidemenu_autoclose" onClick={() => this.GSTQuotation()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> GST Quotation</span></a></li>
 <li><a className="sidemenu_autoclose" onClick={() => this.WithoutGSTQuotation()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> Without GST Quotation</span></a></li>
 <li><a className="sidemenu_autoclose" onClick={() => this.QuotationList()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> List of Quotation</span></a></li>
 </ul>
 </li>
 <li >
 <a href="#StaffSubmenu" data-toggle="collapse" aria-expanded="false"
 class="dropdown-toggle"><i class="fa fa-users i_sidebar" style={{ border: "none", display: "inline-block",paddingRight: "13px" }} aria-hidden="true"></i><span id="spanemp"className="sidebar_Title"> Employee</span></a>
 <ul class="collapse list-unstyled collapsiable" id="StaffSubmenu">
 <li><a className="sidemenu_autoclose" onClick={() => this.AddStaff()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> Add Employee</span></a></li>
 <li><a className="sidemenu_autoclose" onClick={() => this.StaffList()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> List of Employee</span></a></li>
 <li><a className="sidemenu_autoclose" onClick={() => this.AddRole()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> Add Role</span></a></li>
 
 </ul>
 </li>
 <li >
 <a href="#BankSubmenu" data-toggle="collapse" aria-expanded="false"
 class="dropdown-toggle" ><i class="fa fa-university i_sidebar" style={{ border: "none", display: "inline-block",paddingRight: "12px" }} aria-hidden="true"></i><span id="spanbank"className="sidebar_Title"> Bank</span></a>
 <ul class="collapse list-unstyled collapsiable" id="BankSubmenu">
 <li><a className="sidemenu_autoclose" onClick={() => this.Bank()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> Add Bank</span></a></li>
 <li><a className="sidemenu_autoclose" onClick={() => this.BankDetails()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> List of Bank</span></a></li>
 </ul>
 </li>
 <li >
 <a href="#GSTSubmenu" data-toggle="collapse" aria-expanded="false"
 class="dropdown-toggle" ><i class="fa fa-shield i_sidebar" style={{ border: "none", display: "inline-block",paddingRight: "20px" }} aria-hidden="true"></i><span id="spangst"className="sidebar_Title"> File GST</span></a>
 <ul class="collapse list-unstyled collapsiable" id="GSTSubmenu">
 <li><a className="sidemenu_autoclose" onClick={() => this.GST3B()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> GST 3B</span></a></li>
 <li><a className="sidemenu_autoclose" onClick={() => this.GSTR1()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> GSTR 1</span></a></li>
 <li><a className="sidemenu_autoclose" href="https://www.gst.gov.in/download/returns"><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> GSTR Offline Tool</span></a></li>
 </ul>
 </li>
 
 <li>
 <a className="sidemenu_autoclose" onClick={() => this.ReportFunc()}><i class="fa fa-clipboard i_sidebar" style={{ border: "none", display: "inline-block",paddingRight: "13px"}} aria-hidden="true"></i><span id="spanrep"className="sidebar_Title"> Reports</span></a>
 </li>


 <li>
 <a className="sidemenu_autoclose" onClick={() => this.TaskMappingBasic()}><i class="fa fa-superpowers i_sidebar" style={{ border: "none", display: "inline-block" ,paddingRight: "14px"}} aria-hidden="true"></i><span id="spantask" className="sidebar_Title"> Task Mapping</span></a>
 </li>

 </ul>
 {/* <div className="side_menu_image">
 </div> */}
 </div>
 </nav>

 </div>
 </div>


 {/* 
 <!-- Page Content --> */}


 <div id="contentRender" className="contentRender">
 {/* 
 <nav class="navbar navbar-expand-lg navbar-light bg-light">
 <div class="container-fluid">

 <button type="button" id="sidebarCollapse" class="btn btn-info">
 <i class="fas fa-align-left"></i>
 <span>Toggle Sidebar</span>
 </button>
 </div>
 </nav> */}


 </div>

 </div>

 </div>
 )
 }
}
