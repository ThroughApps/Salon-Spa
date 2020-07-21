import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import $ from 'jquery';
import SalesDailyReport from './SalesDailyReport';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import registerServiceWorker from './registerServiceWorker';
import ReportMenuPage from './ReportMenuPage';
import ReportMenuPagePremium from './ReportMenuPagePremium';
import ReportMenuPageBasic from './ReportMenuPageBasic';
import Case from "case";
import InvoiceList from './InvoiceList';
import SalesReportDisplay from './SalesReportDisplay';
 import r1 from './image/talogocolornodemcu.png';
 import Swal from 'sweetalert2/dist/sweetalert2.js'
 import 'sweetalert2/src/sweetalert2.scss';

//import 'jquery-printme.js';
var balance;
var total;
var numberToWord = require('npm-number-to-word');


class PrintFormat1 extends Component {

    constructor(props) {
        super(props)
        var today = new Date();
        var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        // this.state.companyId = companyId;
        var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var companyAddress = CryptoJS.AES.decrypt(localStorage.getItem('CompanyAddress'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var companyEmail = CryptoJS.AES.decrypt(localStorage.getItem('CompanyEmailId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var contactNo = CryptoJS.AES.decrypt(localStorage.getItem('ContactNo'), "shinchanbaby").toString(CryptoJS.enc.Utf8)


        var doorNo = CryptoJS.AES.decrypt(localStorage.getItem('DoorNo'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

        var floor = CryptoJS.AES.decrypt(localStorage.getItem('Floor'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var street = CryptoJS.AES.decrypt(localStorage.getItem('Street'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var place = CryptoJS.AES.decrypt(localStorage.getItem('Place'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var state = CryptoJS.AES.decrypt(localStorage.getItem('State'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var landlineNo = CryptoJS.AES.decrypt(localStorage.getItem('LandlineNo'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var feedbackNo = CryptoJS.AES.decrypt(localStorage.getItem('FeedbackNo'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var bankName = CryptoJS.AES.decrypt(localStorage.getItem('BankName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var branchName = CryptoJS.AES.decrypt(localStorage.getItem('BranchName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var accountNo = CryptoJS.AES.decrypt(localStorage.getItem('AccountNo'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var ifscCode = CryptoJS.AES.decrypt(localStorage.getItem('IfscCode'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var accountName = CryptoJS.AES.decrypt(localStorage.getItem('AccountName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var GstNo = CryptoJS.AES.decrypt(localStorage.getItem('GSTNo'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var companyLogo = CryptoJS.AES.decrypt(localStorage.getItem('CompanyLogo'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

        var area = CryptoJS.AES.decrypt(localStorage.getItem('Area'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var zipCode = CryptoJS.AES.decrypt(localStorage.getItem('Zipcode'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

        if (companyName == "OMR ART PRINTER") {
            companyName = "FUTURE SIGN";

        }


        var id = props.id;
        this.state = {
            date: today1,
            GstNo:GstNo,
            companyId: companyId,
            companyName: companyName,
            companyAddress: companyAddress,
            companyEmail: companyEmail,
            companyLogo:companyLogo,
            contactNo: contactNo,
            doorNo: doorNo,
            floor: floor,
            street: street,
            area:area,
            zipCode:zipCode,
            place: place,
            state: state,
            landlineNo: landlineNo,
            feedbackNo: feedbackNo,
            bankName:bankName,
            branchName:branchName,
            accountNo:accountNo,
            ifscCode:ifscCode,
            accountName:accountName,
        };
        this.setState({
            //   companyId: companyId,
        });

    }
    BackbtnFunc() {
        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={SalesReportDisplay} />


                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }
    PrintFunc() {
        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={PrintFormat1} />


                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }
    componentDidMount() {
     
        var fileName = this.state.companyLogo;
        let xhr = new XMLHttpRequest();
   
       xhr.open('POST', ' http://15.206.129.105:8080/MerchandiseAPI/Login/downloadFile');
       xhr.setRequestHeader("Content-type", "application/json");
       var fileName = JSON.stringify({ "fileName": fileName })

       xhr.send(fileName);
       console.warn("dataToBackEnd",JSON.parse(fileName));

        xhr.responseType = 'blob';
      
        xhr.onload = function (e) {

          if (this.status == 200) {

            // var arrayBufferView = new Uint8Array( this.response );
            // var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
            // var urlCreator = window.URL || window.webkitURL;
            // var imageUrl = urlCreator.createObjectURL( blob );
            // var img = document.querySelector( "#photo" );
            // img.src = imageUrl;
       
         var blob = new Blob([this.response], { type: 'image/pdf' });
         var urlCreator = window.URL || window.webkitURL;
         var imageUrl = urlCreator.createObjectURL( blob );
         var img = document.querySelector( "#photo" );
     
         img.src = imageUrl;
         $('img')
         .attr('src',  img.src)
         .width('100px')
         .height('70px');

        // img = new Image();
        // img.onload = function() {
        //     alert(img.width + " " + img.height);
        // };;

             let image_uri = { uri: blob};
             var BlobImage = URL.createObjectURL(blob);
//          







         
        //      let a = document.createElement("a");
        //    a.style = "display: none";
        //      document.body.appendChild(a);
          
        //      let url = window.URL.createObjectURL(blob);
        //     a.href = url;
           
        //      a.download = 'MyFile.pdf';
        //      var jsonObj = JSON.parse(fileName);
        //    a.download = jsonObj.fileName;
           
        //      a.click();
           
        //      window.URL.revokeObjectURL(url);
           } else {
         
           alert("Network Error")
           }
        };
        document.getElementById('container').setAttribute("style", "backgroundColor:inherit");
       
        window.scrollTo(0, 0);
      
        this.GetOrderDetails();
        var self=this;
self.state.balanceAmt=this.props.balanceAmt;
self.setState({
    balanceAmt:self.state.balanceAmt,
})

        $("#ContentPlaceHolder1_lbl_invoice_no ").append(this.props.id);
        $("#ContentPlaceHolder1_lbl_status").append(this.props.status);
        //$("#ContentPlaceHolder1_lbl_order_no").append(this.props.id);
        $("#ContentPlaceHolder1_lbl_balance").append(this.props.balanceAmt);
        $("#ContentPlaceHolder1_lbl_total").append(this.props.total);
        //   $("#ContentPlaceHolder1_lbl_companyName").append(this.props.companyName);
// alert(this.props.companyName);
// alert(this.props.userName);
// alert(this.props.companyName == " ");

        if (this.props.companyName == " " || this.props.companyName == "null" || this.props.companyName == "-") {
            $("#ContentPlaceHolder1_lbl_customer_name").append(this.props.userName);
        } else {
            $("#ContentPlaceHolder1_lbl_customer_name").append(this.props.companyName);
        }
      //  $(document).ready(function () {
            
                // CHANGE THE WIDTH AND HEIGHT AND SEE THE RESULT.
       // });

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
            url: " http://15.206.129.105:8080/MerchandiseAPI/SalesReport/DailySalesReportData",
            contentType: "application/json",
            dataType: 'json',
            async: false,

            success: function (data, textStatus, jqXHR) {

              

                var tab;
                var count = data.length;
               
                var no; self.state.totalQty = 0;
                self.state.totalAmount = 0;
                self.state.totalFinalAmount = 0;
                //  subtotal_cgst=0;
                $.each(data, function (i, item) {
                    no = parseInt(i + 1);
                    if (item.product != null) {
                  
                             tab += '<tr><td style="padding: 0px 10px; font-size:9px;vertical-align: top;line-height:15px;text-align:center;">' + no + '</td><td style=" padding: 0px 6px;font-size:9px;vertical-align:top;line-height:15px;text-align:left;">' + item.product + '</td><td style="padding: 0px 25px;font-size:9px;vertical-align: top;line-height:15px;text-align:left;">' + item.rate + '</td><td style="padding: 0px 43px; font-size:9px;vertical-align: top;line-height:15px;text-align:left;">' + item.qty + '</td>'
                            + '<td style="padding: 0px 0px;font-size:9px;vertical-align:top;line-height:15px;text-align:left;">' + item.sTotal + '</td><td style="font-size:9px;vertical-align:top;line-height:15px;text-align:left;">' + item.cgst + '</td><td style="padding: 0px 10px;font-size:9px;vertical-align:top;line-height:15px;text-align:left;">' + Math.round(((0.01 * Number(item.cgst)) * Number(item.sTotal))) + '</td><td style="padding: 0px 6px; font-size:9px;vertical-align:top;line-height:15px;text-align:left;">' + item.sgst + '</td><td style="padding: 0px 20px;font-size:9px;vertical-align:top;line-height:15px;text-align:left;">' + Math.round(((0.01 * Number(item.sgst)) * Number(item.sTotal))) + '</td>'
                            + '<td style="paddingLeft:21px;font-size:9px;vertical-align:top;line-height:15px;text-align:left;">' + item.amount + '</td></tr>';


                        self.state.totalAmount = Math.round(Number(self.state.totalAmount)) + Math.round(Number(item.sTotal));
                        self.state.totalQty = Math.round(Number(self.state.totalQty)) + Math.round(Number(item.qty));
                        self.state.totalcgst = item.totalcgst;
                        self.state.totalsgst = item.totalsgst;
                        self.state.totaligst = item.totaligst;
                        self.state.totalgst = item.totalGst;
                        self.state.totalFinalAmount = Math.round(Number(self.state.totalFinalAmount)) + Math.round(Number(item.amount));
                        self.state.advance = item.advance;
                        self.state.discount = item.discount;
                        self.state.subtotal1 = item.subtotal1;

                        self.setState({
                            totalQty: self.state.totalQty,
                            totalAmount: self.state.totalAmount,
                            totalcgst: self.state.totalcgst,
                            totalsgst: self.state.totalsgst,
                            totaligst: self.state.totaligst,
                            totalFinalAmount: self.state.totalFinalAmount,
                            advance: self.state.advance,
                            discount: self.state.discount,
                            subtotal1: self.state.subtotal1,
                            totalgst: self.state.totalgst,
                        })
                    }
                })

                //   $("#producttable").append(tab);
                $("#billdetailstbody").append(tab);
                var inDate = new Date(data[0].invoiceDate);
                var duDate = new Date(data[0].dueDate);
                //   alert("invoicedate"+inDate);
                //   var inDate=data[0].invoiceDate;
                var invoiceDate = inDate.getDate() + '-' + (inDate.getMonth() + 1) + '-' + inDate.getFullYear();
                var dueDate = duDate.getDate() + '-' + (duDate.getMonth() + 1) + '-' + duDate.getFullYear();

                var SubtotalwithoutGst = (Number(data[0].subtotal1)) - (Number((data[0].totalGst)));
                self.setState({
                    invoiceDate: self.state.invoiceDate,
                    dueDate: self.state.dueDate,
                    SubtotalwithoutGst: self.state.SubtotalwithoutGst,
                });


                // alert("SubtotalwithoutGst",+self.state.SubtotalwithoutGst);
                $("#ContentPlaceHolder1_lbl_invoice_date").append(invoiceDate);
                $("#ContentPlaceHolder1_lbl_due_date").append(dueDate);

                $("#ContentPlaceHolder1_lbl_customer_address").append(data[parseInt(count) - 1].address);
                $("#ContentPlaceHolder1_lbl_customer_contact").append(data[0].contact);
                $("#ContentPlaceHolder1_lbl_gst_no").append(data[parseInt(count) - 1].gstNo);
                $("#ContentPlaceHolder1_lbl_email").append(data[parseInt(count) - 1].email);

                $("#ContentPlaceHolder1_lbl_subtotal").append(data[0].subtotal1);
                var numtoword = numberToWord(Number(data[0].subtotal1));
                $("#numWords").text(Case.capital(numtoword));
                $("#ContentPlaceHolder1_lbl_total_gst").append(data[0].totalGst);
                $("#ContentPlaceHolder1_lbl_adjustment").append(data[0].advance);
                $("#ContentPlaceHolder1_lbl_discount").append(data[0].discount);
                $("#ContentPlaceHolder1_lbl_word").text(Case.capital(numberToWord(data[0].subtotal1)));
                $("#ContentPlaceHolder1_lbl_subtotalwithoutGST").append(SubtotalwithoutGst);
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

                    <Route path="/" component={InvoiceList} />


                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }

    printdiv(dropHere) {
        var originalContents = document.body.innerHTML;
        $("#backbutton").hide();
        $("#print").hide();

        $("#sidebar").hide();
        $("#navbar_company_name").hide();
    
    
     window.print(originalContents);
     $("#sidebar").show();
        $("#navbar_company_name").show();
        $("#backbutton").show();
        $("#print").show();
        // $(w.document.body).html(html);

    }
    printData() {
        var divToPrint = document.getElementById("dropHere");

        var newWin = window.open("");
        newWin.document.write(divToPrint.outerHTML);
        newWin.print();
        newWin.close();
    }


    render() {
        return (
            <div class="container" id="container" >
                <div class="row">
                    <div class="col-sm-6 ">
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

                    </div> <div class="col-sm-6 ">
                        <div class="row">
                            <div class="col-sm-3 " >
                                <button type="button" id="print" class="btn btn-default " onClick={() => this.printdiv('dropHere')}  ><i class="fa fa-print" aria-hidden="true" style={{ fontSize: "17px", border: "none" }}> Print </i></button>
                            </div>
                            <div class="col-sm-3 pull-right">
                            </div>   </div>
                    </div>    </div>

                <table class="page-wrapper-table" style={{ width: "700px", margin: "0px auto", position: "relative" }} id="dropHere">
                    <tbody>

                        <tr class="page-wrapper-tr" style={{ pageBreakInside: "avoid", pageBreakAfter: "auto", position: "relative" }}><td>
                            <div class="page-wrapper" style={{ height: "1010px", width: "700px", paddingBottom: "50px", borderBottom: "3px dashed #000", margin: "0px auto", position: "relative" }}>

                                <div class="page-header" style={{ position: "relative", marginBottom: "0px" }}>

                                    <table cellspacing="0" cellpadding="0" class="branding " width="100%" style={{ borderLeft: "1px solid", borderRight: " 1px solid", borderTop: "1px solid", borderColor: "#0070C0" }} >
                                        <colgroup><col style={{ width: "30%" }}></col><col style={{ width: "40%" }}></col><col style={{ width: "30%" }}></col>
                                        </colgroup>
                                        <tbody><tr>
                                            <td style={{ position: "relative", verticalAlign: "top" }}>
                                                 <img id="photo" style={{ height: "12%", padding: "0.1%", margin: "0", padding: "14px", border: "0", fontSize: "100%", font: "inherit", verticalAlign: "baseline" }} /> 
                                            
                                                 {/* <img id="photo"/> */}

                                   
                                            </td>
                                            <td style={{ position: "relative", verticalAlign: "top", textAlign: "center" }}>
                                                <table cellspacing="0" cellpadding="0" width="100%">

                                                    <tbody><tr>
                                                        <td style={{ verticalAlign: "top", fontSize: "23px", textAlign: "center", fontWeight: "bold", lineHeight: "30px", paddingLeft: "0px", paddingBottom: "5px", paddingRight: "0px" }}>
                                                            <span id="lbl_company_name"> {this.state.companyName}</span>						</td>
                                                    </tr>
                                                        <tr>
                                                            <td style={{ verticalAlign: "top", fontSize: "13px", fontWeight: "normal", lineHeight: "15px", height: "43px", paddingLeft: "0px" }}>
                                                                <span style={{ fontSize: "12px", lineHeight: "5pt" }} >{this.state.doorNo},{this.state.floor},</span><br />
                                                                <span style={{ fontSize: "12px", lineHeight: "5pt" }}>{this.state.street},</span><br />
                                                                <span style={{ fontSize: "12px", lineHeight: "5pt" }}>{this.state.place},{this.state.state}</span><br />
                                                            </td>
                                                        </tr>


                                                    </tbody></table>


                                            </td>

                                            <td style={{ textAlign: "right", verticalAlign: "bottom", float: "right", marginRight: "5%", marginTop: "10%" }}>
                                                <table cellspacing="0" cellpadding="0">

                                                    <tbody>
                                                        <tr>
                                                            <td style={{ lineHeight: "17px", fontSize: "12px" }}>
                                                                <b>Phone: </b>  <span style={{ fontSize: "12px", lineHeight: "5pt" }} id="ContentPlaceHolder1_lbl_company_contact">{this.state.contactNo}</span><br />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ lineHeight: "17px", fontSize: "12px" }}>
                                                                <b>Email:</b>  <span style={{ fontSize: "12px", lineHeight: "5pt" }} id="ContentPlaceHolder1_lbl_company_email">{this.state.companyEmail}</span>
                                                            </td>
                                                        </tr>
                                                    </tbody></table>
                                            </td>

                                        </tr>
                                        </tbody></table>

                                    <table cellspacing="0" cellpadding="0" style={{ border: "1px solid #0070C0", padding: "0", margin: "0" }} class="invoice"><tbody>
                                        <tr>
                                            <td class="main-border" style={{ width: "700px", borderBottom: "none", border: "1px solid #0070C0", padding: "0", margin: "0" }}>
                                                <table cellspacing="0" border="0" cellpadding="0" class="header">
                                                    <tbody><tr>
                                                        <td style={{ width: "700px", verticalAlign: "middle", borderBottom: "1px solid #0070C0" }} class="header-row">
                                                            <table cellspacing="0" cellpadding="0">
                                                                <tbody><tr>
                                                                    <td style={{ width: "40%", paddingLeft: "7px" }} class="gstin"><span >GSTIN :</span> <span style={{ fontWeight: "bold", textAlign: "left" }} id="lbl_company_gst">33ABIPL4812E1Z1</span></td>
                                                                    <td style={{ width: "50%", textAlign: "center", fontSize: "20px", color: "#0070C0", padding: "3px 82px", fontWeight: "bold" }} class="invoice-title">TAX INVOICE</td>
                                                                    <td style={{ width: "35%", textAlign: "right", paddingRight: "5px", fontSize: "11px", fontWeight: "bold" }} class="copyname"></td>
                                                                </tr>
                                                                </tbody></table>
                                                        </td>
                                                    </tr>
                                                    </tbody></table>
                                                <table><tbody><tr>
                                                    <td style={{ borderBottom: "1px solid #0070C0" }}>
                                                        <table cellspacing="0" class="customerdata " style={{ tableLayout: "fixed" }}><tbody><tr>
                                                            <td colspan="2" style={{ textAlign: "middle", fontWeight: "bold", borderRight: "1px solid #0070C0", borderBottom: "1px solid #0070C0", width: "700px", textAlign: "center", padding: "2px 5px 3px 5px", fontSize: "11px", verticalAlign: "top", lineHeight: "13px" }}>Customer Detail</td></tr>
                                                            <tr>
                                                                <td style={{ fontWeight: "bold", padding: "2px 5px 3px 5px", fontSize: "11px", verticalAlign: "top", lineHeight: "13px" }}>Customer</td>
                                                                <td style={{ borderRight: "1px solid #0070C0", height: "20px", overflow: "hidden", padding: "2px 5px 3px 5px", fontSize: "11px", verticalAlign: "top", lineHeight: "13px" }}><span id="ContentPlaceHolder1_lbl_customer_name"></span></td>
                                                            </tr>

                                                            <tr>
                                                                <td style={{ fontWeight: "bold", padding: "2px 5px 3px 5px", fontSize: "11px", verticalAlign: "top", lineHeight: "13px" }}>Phone</td>
                                                                <td style={{ borderRight: "1px solid #0070C0", padding: "2px 5px 3px 5px", fontSize: "11px", verticalAlign: "top", lineHeight: "13px" }}><span id="ContentPlaceHolder1_lbl_customer_contact"></span></td>
                                                            </tr>
                                                            {/* <tr>
                                                                <td style={{ fontWeight: "bold", padding: "2px 5px 3px 5px", fontSize: "11px", verticalAlign: "top", lineHeight: "13px" }}>
                                                                    GSTIN							</td>
                                                                <td style={{ borderRight: "1px solid #0070C0", padding: "2px 5px 3px 5px", fontSize: "11px", verticalAlign: "top", lineHeight: "13px" }}><span id="ContentPlaceHolder1_lbl_gst_no"></span></td>
                                                            </tr> */}

                                                            <tr>
                                                                <td style={{ fontWeight: "bold", padding: "2px 5px 3px 5px", fontSize: "11px", verticalAlign: "top", lineHeight: "13px" }}>Email</td>
                                                                <td style={{ borderRight: "1px solid #0070C0", padding: "2px 5px 3px 5px", fontSize: "11px", verticalAlign: "top", lineHeight: "13px" }}><span id="ContentPlaceHolder1_lbl_email"></span></td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ fontWeight: "bold", padding: "2px 5px 3px 5px", fontSize: "11px", verticalAlign: "top", lineHeight: "13px" }}>Address</td>
                                                                <td style={{ borderRight: "1px solid #0070C0", padding: "2px 5px 3px 5px", fontSize: "11px", verticalAlign: "top", lineHeight: "13px" }}><div style={{ height: "50px", overflow: "hidden" }}><span id="ContentPlaceHolder1_lbl_customer_address"></span></div></td>
                                                            </tr>
                                                        </tbody></table>
                                                    </td>

                                                    <td style={{ width: "700px", borderBottom: "1px solid #0070C0", verticalAlign: "top" }}>
                                                        <table cellspacing="0" class="invoicedata ">
                                                            <tbody><tr>
                                                                <td style={{ fontWeight: "bold", padding: "3px 5px 6px 5px", fontSize: "11px", verticalAlign: " top", lineHeight: "13px" }}>Invoice No.</td>
                                                                <td style={{ fontWeight: "bold", fontSize: "12px", padding: "3px 5px 6px 5px", fontSize: "11px", verticalAlign: " top", lineHeight: "13px" }}><span id="ContentPlaceHolder1_lbl_invoice_no"></span></td>

                                                            </tr>
                                                                <tr>
                                                                    <td style={{ fontWeight: "bold", padding: "3px 5px 6px 5px", fontSize: "11px", verticalAlign: " top", lineHeight: "13px" }}>Invoice Date</td>
                                                                    <td style={{ padding: "3px 5px 6px 5px", fontSize: "11px", verticalAlign: " top", lineHeight: "13px" }}><span id="ContentPlaceHolder1_lbl_invoice_date"></span></td>
                                                                     <td style={{ fontWeight: "bold", padding: "3px 5px 6px 5px", fontSize: "11px", verticalAlign: " top", lineHeight: "13px" }}>Due Date</td>
                                                                    <td style={{ padding: "3px 5px 6px 5px", fontSize: "11px", verticalAlign: " top", lineHeight: "13px" }}><span id="ContentPlaceHolder1_lbl_due_date"></span></td> 
                                                                </tr>

                                                                <tr>
                                                                    <td style={{ fontWeight: "bold", padding: "3px 5px 6px 5px", fontSize: "11px", verticalAlign: " top", lineHeight: "13px" }}>Order No.</td>
                                                                    <td style={{ padding: "3px 5px 6px 5px", fontSize: "11px", verticalAlign: " top", lineHeight: "13px" }} colspan="3"><span id="lbl_order_no">8</span></td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ fontWeight: "bold", padding: "3px 5px 6px 5px", fontSize: "11px", verticalAlign: " top", lineHeight: "13px" }}>Due Amount</td>
                                                                    <td style={{ padding: "3px 5px 6px 5px", fontSize: "11px", verticalAlign: " top", lineHeight: "13px" }} colspan="3"><span >{this.state.balanceAmt}.00</span></td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ fontWeight: "bold", padding: "3px 5px 6px 5px", fontSize: "11px", verticalAlign: " top", lineHeight: "13px" }}>Status</td>
                                                                    <td style={{ padding: "3px 5px 6px 5px", fontSize: "11px", verticalAlign: " top", lineHeight: "13px" }} colspan="3"><span id="ContentPlaceHolder1_lbl_status" style={{ color: "Green", backgroundColor: "White" }}></span></td>
                                                                </tr>

                                                            </tbody></table>

                                                    </td>
                                                </tr>
                                                </tbody></table>
                                                <br></br>
                                            </td></tr></tbody></table>

                                    <table class="billdetailsthead" style={{ width: "100%" }} cellspacing="0" border="0" cellpadding="0">
                                        <colgroup>
                                            <col style={{ width: "3%" }}></col>
                                            <col style={{ width: "22%" }}></col>
                                            <col style={{ width: "8%" }}></col>
                                            <col style={{ width: "9%" }}></col>
                                            <col style={{ width: "8%" }}></col>
                                            <col style={{ width: "7%" }}></col>
                                            <col style={{ width: "8%" }}></col>
                                            <col style={{ width: "4.5%" }}></col>
                                            <col style={{ width: "8%" }}></col>
                                            <col style={{ width: "4.5%" }}></col>
                                            <col style={{ width: "8%" }}></col>
                                            <col style={{ width: "10%" }}></col>


                                        </colgroup>

                                        <tbody><tr>
                                            <td class="valign-mid" style={{ verticalAlign: "middle", fontSize: "9px", backgroundColor: "#E8F3FD", border: "1px solid #0070C0", borderCollapse: "collapse", textAlign: "center", fontWeight: "bold", padding: "5px 2px" }} rowspan="2">S.No</td>
                                            <td class="valign-mid" style={{ verticalAlign: "middle", fontSize: "9px", backgroundColor: "#E8F3FD", border: "1px solid #0070C0", borderCollapse: "collapse", textAlign: "center", fontWeight: "bold", padding: "5px 2px" }} rowspan="2">Name of Product / Service</td>
                                            <td class="valign-mid" style={{ verticalAlign: "middle", fontSize: "9px", backgroundColor: "#E8F3FD", border: "1px solid #0070C0", borderCollapse: "collapse", textAlign: "center", fontWeight: "bold", padding: "5px 2px" }} rowspan="2">Rate</td>
                                            <td class="valign-mid" style={{ verticalAlign: "middle", fontSize: "9px", backgroundColor: "#E8F3FD", border: "1px solid #0070C0", borderCollapse: "collapse", textAlign: "center", fontWeight: "bold", padding: "5px 2px" }} rowspan="2">Qty</td>

                                            <td class="valign-mid" style={{ verticalAlign: "middle", fontSize: "9px", backgroundColor: "#E8F3FD", border: "1px solid #0070C0", borderCollapse: "collapse", textAlign: "center", fontWeight: "bold", padding: "5px 2px" }} rowspan="2">Taxable Value</td>
                                            <td class="valign-mid" style={{ fontSize: "9px", backgroundColor: "#E8F3FD", border: "1px solid #0070C0", borderCollapse: "collapse", textAlign: "center", fontWeight: "bold", padding: "5px 2px" }} colspan="2" >CGST</td>
                                            <td class="valign-mid" style={{ fontSize: "9px", backgroundColor: "#E8F3FD", border: "1px solid #0070C0", borderCollapse: "collapse", textAlign: "center", fontWeight: "bold", padding: "5px 2px" }} colspan="2" >SGST</td>
                                            <td class="valign-mid" style={{ fontSize: "9px", backgroundColor: "#E8F3FD", border: "1px solid #0070C0", borderCollapse: "collapse", textAlign: "center", fontWeight: "bold", padding: "5px 2px" }} rowspan="2">Total </td>
                                        </tr>
                                            <tr>


                                                <td style={{ fontSize: "9px", borderLeft: "none", backgroundColor: "#E8F3FD", border: "1px solid #0070C0", borderCollapse: "collapse", textAlign: "center", fontWeight: "bold", padding: "5px 2px" }}>%</td>
                                                <td style={{ fontSize: "9px", backgroundColor: "#E8F3FD", border: "1px solid #0070C0", borderCollapse: "collapse", textAlign: "center", fontWeight: "bold", padding: "5px 2px" }}>Amount</td>
                                                <td style={{ fontSize: "9px", backgroundColor: "#E8F3FD", border: "1px solid #0070C0", borderCollapse: "collapse", textAlign: "center", fontWeight: "bold", padding: "5px 2px" }}>%</td>
                                                <td style={{ fontSize: "9px", backgroundColor: "#E8F3FD", border: "1px solid #0070C0", borderCollapse: "collapse", textAlign: "center", fontWeight: "bold", padding: "5px 2px" }}>Amount</td>

                                            </tr>
                                        </tbody></table>


                                </div>

                                <div class="page-content" style={{ height: "250px", position: "relative",marginTop:"-11px" }}>
                                    <table class="tableboxLinetable" style={{ border: "1px solid #0070C0", width: "100%", position: "absolute", top: "0", left: "0" }} cellspacing="0" cellpadding="0" border="0">
                                        <colgroup>
                                        <col style={{ width: "3.5%" }}></col>
                                            <col style={{ width: "27.5%" }}></col>                                       
                                            <col style={{ width: "9%" }}></col>
                                            <col style={{ width: "11%" }}></col>
                                            <col style={{ width: "10%" }}></col>
                                            <col style={{ width: "8.5%" }}></col>
                                            <col style={{ width: "9%" }}></col>
                                            <col style={{ width: "5.5%" }}></col>
                                            <col style={{ width: "10%" }}></col>
                                            <col style={{ width: "10%" }}></col>
                                         </colgroup> 

                                        <tbody style={{ height: " 100%" }}><tr>
                                            <td class="tableboxLine linebox1" style={{ width: "3.5%", left: " 0px", height: " 250px", borderRight: "1px  solid #0070C0", borderLeft: "1px  solid #0070C0", borderCollapse: "collapse", top: "0", boxSizing: "borderBox", mozBoxSizing: "borderBox", webkitBoxSizing: "borderBox" }}></td>
                                            <td class="tableboxLine linebox2" style={{ width: "27.5%", left: " 3%", height: "250px", borderRight: "1px  solid #0070C0", borderLeft: "1px  solid #0070C0", borderCollapse: "collapse", top: "0", boxSizing: "borderBox", mozBoxSizing: "borderBox", webkitBoxSizing: "borderBox" }}></td>
                                            <td class="tableboxLine linebox5" style={{ width: "9%", left: "42%", height: "250px", borderRight: "1px  solid #0070C0", borderLeft: "1px  solid #0070C0", borderCollapse: "collapse", top: "0", boxSizing: "borderBox", mozBoxSizing: "borderBox", webkitBoxSizing: "borderBox" }}></td>
                                            <td class="tableboxLine linebox6" style={{ width: "11%", left: "50%", height: "250px", borderRight: "1px  solid #0070C0", borderLeft: "1px  solid #0070C0", borderCollapse: "collapse", top: "0", boxSizing: "borderBox", mozBoxSizing: "borderBox", webkitBoxSizing: "borderBox" }}></td>
                                            <td class="tableboxLine linebox7" style={{ width: "10%", left: "57%", height: "250px", borderRight: "1px  solid #0070C0", borderLeft: "1px  solid #0070C0", borderCollapse: "collapse", top: "0", boxSizing: "borderBox", mozBoxSizing: "borderBox", webkitBoxSizing: "borderBox" }}></td>
                                            <td class="tableboxLine linebox8" style={{ width: "8.5%", left: "65%", height: "250px", borderRight: "1px  solid #0070C0", borderLeft: "1px  solid #0070C0", borderCollapse: "collapse", top: "0", boxSizing: "borderBox", mozBoxSizing: "borderBox", webkitBoxSizing: "borderBox" }}></td>
                                            <td class="tableboxLine linebox9" style={{ width: "9%", left: "69.5%", height: "250px", borderRight: "1px  solid #0070C0", borderLeft: "1px  solid #0070C0", borderCollapse: "collapse", top: "0", boxSizing: "borderBox", mozBoxSizing: "borderBox", webkitBoxSizing: "borderBox" }}></td>
                                            <td class="tableboxLine linebox10" style={{ width: "5.5%", left: "77.5%", height: " 250px", borderRight: "1px  solid #0070C0", borderLeft: "1px  solid #0070C0", borderCollapse: "collapse", top: "0", boxSizing: "borderBox", mozBoxSizing: "borderBox", webkitBoxSizing: "borderBox" }}></td>
                                            <td class="tableboxLine linebox11" style={{ width: "10%", left: "82%", height: "250px", borderRight: "1px  solid #0070C0", borderLeft: "1px  solid #0070C0", borderCollapse: "collapse", top: "0", boxSizing: "borderBox", mozBoxSizing: "borderBox", webkitBoxSizing: "borderBox" }}></td>
                                            <td class="tableboxLine linebox12" style={{ width: "10%", left: "90%", height: "250px", borderRight: "1px  solid #0070C0", borderLeft: "1px  solid #0070C0", borderCollapse: "collapse", top: "0", boxSizing: "borderBox", mozBoxSizing: "borderBox", webkitBoxSizing: "borderBox" }}></td>
                                        </tr></tbody>
                                        </table>


                                    <table class="billdetailstbody" id="billdetailstbody" cellspacing="0" border="0" cellpadding="0" style={{ padding: "5px 2px", fontSize: "11px", verticalAlign: "top", lineHeight: "15px" }}>
                                      
                                        <colgroup>
                                            <col style={{ width: "3%" }}></col>
                                            <col style={{ width: "22%" }}></col>
                                            <col style={{ width: "8%" }}></col>
                                            <col style={{ width: "9%" }}></col>
                                            <col style={{ width: "8%" }}></col>
                                            <col style={{ width: "7%" }}></col>
                                            <col style={{ width: "8%" }}></col>
                                            <col style={{ width: "4.5%" }}></col>
                                            <col style={{ width: "8%" }}></col>
                                            <col style={{ width: "4.5%" }}></col>
                                            <col style={{ width: "8%" }}></col>
                                            <col style={{ width: "10%" }}></col>


                                        </colgroup>
                                      
                                    </table>

                                </div>
                                <div class="page-footer">

                                    <table class="invoicedataFooter" cellspacing="0" style={{ width: "100%" }}>
                                    <colgroup>
                                            <col style={{ width: "40.7%" }}></col>
                                            <col style={{ width: "10.1%" }}></col>                                           
                                            <col style={{ width: "11.1%" }}></col>
                                            <col style={{ width: "8.1%" }}></col>
                                            <col style={{ width: "8.7%" }}></col>
                                            <col style={{ width: "6.1%" }}></col>
                                            <col style={{ width: "9.5%" }}></col>
                                            <col style={{ width: "0%" }}></col>
                                            <col style={{ width: "0%" }}></col>
                                       </colgroup>
                                        <tbody><tr>
                                            <td class="txt-bold txt-right" style={{ textAlign: "right", fontSize: "10px", backgroundColor: "#E8F3FD", padding: "5px 1px 5px 0px", border: "1px solid #0070C0" }}><span>Total </span></td>
                                            <td class="txt-bold txt-right" style={{ textAlign: "right", fontSize: "10px", backgroundColor: "#E8F3FD", padding: "5px 1px 5px 0px", border: "1px solid #0070C0" }}><span> {this.state.totalQty}</span></td>

                                            <td class="txt-bold txt-right" style={{ textAlign: "right", fontSize: "10px", backgroundColor: "#E8F3FD", padding: "5px 1px 5px 0px", border: "1px solid #0070C0" }}><span id="lbl_total_taxable">{this.state.totalAmount}</span></td>
                                            <td class="txt-bold txt-right" style={{ textAlign: "right", fontSize: "10px", backgroundColor: "#E8F3FD", padding: "5px 1px 5px 0px", border: "1px solid #0070C0" }}><span></span></td>
                                            <td class="txt-bold txt-right" style={{ textAlign: "right", fontSize: "10px", backgroundColor: "#E8F3FD", padding: "5px 1px 5px 0px", border: "1px solid #0070C0" }}><span id="lbl_total_cgst">{this.state.totalcgst}</span></td>
                                            <td class="txt-bold txt-right" style={{ textAlign: "right", fontSize: "10px", backgroundColor: "#E8F3FD", padding: "5px 1px 5px 0px", border: "1px solid #0070C0" }}><span></span></td>
                                            <td class="txt-bold txt-right" style={{ textAlign: "right", fontSize: "10px", backgroundColor: "#E8F3FD", padding: "5px 1px 5px 0px", border: "1px solid #0070C0" }}><span id="lbl_total_sgst">{this.state.totalsgst}</span></td>
                                            <td class="txt-bold txt-right" style={{ textAlign: "right", fontSize: "10px", backgroundColor: "#E8F3FD", padding: "5px 1px 5px 0px", border: "1px solid #0070C0" }}><span id="lbl_sub_total">{this.state.totalFinalAmount}</span></td>
                                        </tr>
                                        </tbody></table>


                                    <table cellspacing="0" cellpadding="0" class="invoice" style={{ width: "700px" }}>
                                        <tbody><tr>
                                            <td class="main-border" style={{ width: "700px", borderBottom: "none", borderTop: "none", border: "1px solid #0070C0", padding: "0", margin: "0" }}>
                                                <br></br>
                                                <table cellspacing="0" style={{ width: "100%" }}>

                                                    <tbody><tr>
                                                        <td style={{ borderTop: "none", borderRight: "none", borderLeft: "none", verticalAlign: "top" }}>

                                                            <table cellspacing="0" style={{ width: "100%", borderCollapse: "collapse" }} class="invoiceInfo">
                                                                <tbody><tr>
                                                                    <td colspan="2" style={{ width: "100%", textAlign: "center", borderBottom: "none", padding: "3px 5px", fontSize: "11px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}>Invoice Total in words</td>
                                                                </tr>
                                                                    <tr>
                                                                        <td colspan="2" style={{ width: "100%", textAlign: "center", fontSize: "11px", lineHeight: "15px", height: "30px", verticalAlign: "middle", textTransform: "capitalize", padding: "3px 5px", fontSize: "11px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}>
                                                                            <span id="numWords"></span> Rupees Only</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td colspan="2" style={{ width: "100%", textAlign: "center", borderBottom: "none", padding: "3px 5px", fontSize: "11px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}>Bank Details</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ borderRight: "none", borderBottom: "none", fontWeight: "normal", padding: "3px 5px", fontSize: "11px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}>Accountant Name</td>
                                                                        <td style={{ borderLeft: "none", borderBottom: "none", fontWeight: "normal", padding: "3px 5px", fontSize: "11px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}><span id="lbl_bank_name">{this.state.accountName}</span> </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ borderRight: "none", borderBottom: "none", fontWeight: "normal", padding: "3px 5px", fontSize: "11px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}>Bank Name</td>
                                                                        <td style={{ borderLeft: "none", borderBottom: "none", fontWeight: "normal", padding: "3px 5px", fontSize: "11px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}><span id="lbl_bank_name">{this.state.bankName}</span> </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ borderRight: "none", borderBottom: "none", borderTop: "none", fontWeight: "normal", padding: "3px 5px", fontSize: "11px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}>Branch Name</td>
                                                                        <td style={{ borderLeft: "none", borderBottom: "none", borderTop: "none", fontWeight: "normal", padding: "3px 5px", fontSize: "11px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}><span id="lbl_branch_name">{this.state.branchName}</span> </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ borderRight: "none", borderTop: "none", borderBottom: "none", fontWeight: "normal", padding: "3px 5px", fontSize: "11px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}>Bank Account Number</td>
                                                                        <td style={{ borderLeft: "none", borderTop: "none", borderBottom: "none", fontWeight: "normal", padding: "3px 5px", fontSize: "11px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}><span id="lbl_ac_no">{this.state.accountNo}</span> </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ borderRight: "none", borderTop: "none", fontWeight: "normal", padding: "3px 5px", fontSize: "11px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}>Bank Branch IFSC</td>
                                                                        <td style={{ borderLeft: "none", borderTop: "none", fontWeight: "normal", padding: "3px 5px", fontSize: "11px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}><span id="lbl_ifsc">{this.state.ifscCode}</span> </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td colspan="2" style={{ width: "100%", textAlign: "center", borderBottom: "none", padding: "0px 5px", fontSize: "11px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}>Terms and Conditions</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td colspan="2" style={{ width: "100%", borderBottom: "none", padding: "3px 5px", fontSize: "11px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}>

                                                                            <div style={{ height: "90px", width: "100%", overflow: "hidden", fontWeight: "bold", fontSize: "10px", borderBottom: "none" }}>1. Subject to our home Jurisdiction.<br />2. Our Responsibility Ceases as soon as goods leaves our Premises.<br />3. Amount once paid will not be refunded.<br />4. Delivery Ex-Premises.</div></td>
                                                                    </tr>
                                                                </tbody></table>
                                                        </td>
                                                        <td style={{ borderTop: "none", verticalAlign: "top" }}>
                                                            <table cellspacing="0" style={{ width: "100%", borderCollapse: "collapse" }} class="invoiceTotal">

                                                                <tbody><tr>
                                                                    <td class="txt-bg" style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}>Taxable Amount(Rs)</td>
                                                                    <td class="txt-bg txt-right" style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}><span id="lbl_total_taxable2">{this.state.totalAmount}.00</span></td>
                                                                </tr>
                                                                    <tr>
                                                                        <td style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}>CGST(Rs)</td>
                                                                        <td class=" txt-right" style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}><span id="lbl_total_cgst2">{this.state.totalcgst}</span></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}>SGST(Rs)</td>
                                                                        <td class=" txt-right" style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}><span id="lbl_total_sgst2">{this.state.totalsgst}</span></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}>IGST(Rs)</td>
                                                                        <td class=" txt-right" style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}><span id="lbl_total_igst2">{this.state.totaligst}</span></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="txt-bg" style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}>Total Tax(Rs)</td>
                                                                        <td class="txt-bg txt-right" style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}><span id="lbl_total_gst">{this.state.totalgst}</span></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="txt-bg" style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}>Total Amount After Tax(Rs)</td>
                                                                        <td class="txt-bg txt-right" style={{ padding: "3px 5px", fontSize: "13px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}><span id="lbl_sub_total2">{this.state.totalFinalAmount}.00</span></td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td class="txt-bg" style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}>Advance(Rs)</td>
                                                                        <td class="txt-bg txt-right" style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}><span id="lbl_adjustment">{this.state.advance}</span></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="txt-bg" style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}>Discount(Rs)</td>
                                                                        <td class="txt-bg txt-right" style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}><span id="lbl_discount">{this.state.discount}</span></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="txt-bg" style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}><b>Grand Total(Rs)</b></td>
                                                                        <td class="txt-bg txt-right" style={{ padding: "3px 5px", fontSize: "14px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}><span id="lbl_grand_total">{this.state.subtotal1}.00</span></td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td colspan="2" style={{ borderBottom: "none", textAlign: "center", fontSize: "8px", padding: "3px 5px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none" }}>Certified that the particulars given above are true and correct.</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td colspan="2" style={{ borderTop: "none", borderBottom: "none", textAlign: "center", fontSize: "12px", padding: "3px 5px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none" }}>For, <span id="lbl_company_name2">{this.state.companyName}</span></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td colspan="2" style={{ borderBottom: "none", height: "60px", textAlign: "center", padding: "3px 5px", fontSize: "14px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none" }}>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td colspan="2" style={{ borderBottom: "none", textAlign: "center", fontSize: "8px", padding: "3px 5px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none" }}>Authorised Sign</td>
                                                                    </tr>
                                                                </tbody></table>
                                                        </td>
                                                    </tr>
                                                    </tbody></table>
                                            </td></tr>
                                        </tbody></table>
                                    <table cellspacing="0" cellpadding="0" class="branding_table"><tbody><tr class="branding_rt" style={{ opacity: "1", visibility: "visible" }}><td style={{ textAlign: "left", padding: "5px 0 0", fontWeight: " bold", color: "#7A7A7A", fontSize: "10px", lineHeight: "20px", textTransform: "uppercase" }}></td>
                                    </tr></tbody></table>
                                </div>
                            </div></td></tr></tbody></table>

                <p></p>


            </div >

        );
    }
}

export default PrintFormat1;