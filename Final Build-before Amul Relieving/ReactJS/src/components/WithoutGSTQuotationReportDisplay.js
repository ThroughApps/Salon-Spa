import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


import $ from 'jquery';
import registerServiceWorker from './registerServiceWorker';
import WithoutGSTQuotation from './WithoutGSTQuotation';
import QuotationList from './QuotationList';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import WithoutGSTQuotationReport from './WithoutGSTQuotationReport';
import Case from "case";
import WithoutGSTQuotationList from './WithoutGSTQuotationList';
//import WithoutGSTQuotationList from './WithoutGSTQuotationList';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';

var balance;
var total;
var numberToWord = require('npm-number-to-word');
class WithoutGSTQuotationReportDisplay extends Component {

    constructor(props) {
        super(props)
        var today = new Date();
        var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
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
     
        var area = CryptoJS.AES.decrypt(localStorage.getItem('Area'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var zipCode = CryptoJS.AES.decrypt(localStorage.getItem('Zipcode'), "shinchanbaby").toString(CryptoJS.enc.Utf8)


        this.state = {
            date: today1,
            companyId: companyId,
            companyName: companyName,
            companyAddress: companyAddress,
            companyEmail: companyEmail,
            contactNo: contactNo,
            doorNo: doorNo,
            floor: floor,
            street: street,
            area:area,
            zipCode:zipCode,
            place: place,
            state: state,
            landlineNo:landlineNo,
            feedbackNo:feedbackNo,
        };



    }


    componentDidMount() {

       

        this.GetOrderDetails();


        $("#ContentPlaceHolder1_lbl_invoice_no ").append(this.props.invoiceNo);
        if(this.props.companyName==" " || this.props.companyName=="null" || this.props.companyName=="-"  ){
            $("#ContentPlaceHolder1_lbl_customer_name").append(this.props.userName);
        }else{
            $("#ContentPlaceHolder1_lbl_customer_name").append(this.props.companyName);
        }
        


    }






    GetOrderDetails() {

        var self = this;

     

        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                date: this.props.date,
                invoiceNo: this.props.invoiceNo,
                companyId: this.state.companyId,
            }),
            url: " http://15.206.129.105:8080/MerchandiseAPI/QuotationReport/ViewWithoutGSTQuotationReport",
            contentType: "application/json",
            dataType: 'json',
            async: false,

            success: function (data, textStatus, jqXHR) {

           

                var tab;
                var count = data.length;
              
var no;
                $.each(data, function (i, item) {
no=parseInt(i+1);
               tab += '<tr><td>'+no+'</td><td>' + item.productName + '</td><td>' + item.rate + '</td><td>' + item.quantity + '</td>'
                        + '<td>' + item.total + '</td></tr>';

                })

                $("#producttable").append(tab);
                var inDate = new Date(data[0].invoiceDate);
                var duDate = new Date(data[0].dueDate);
                var invoiceDate=inDate.getDate() + '-' +(inDate.getMonth() + 1) + '-' +inDate.getFullYear();
                var dueDate=duDate.getDate() + '-' +(duDate.getMonth() + 1) + '-' +duDate.getFullYear();
              
                self.setState({
                     invoiceDate:self.state.invoiceDate,
                     dueDate:self.state.dueDate,
                     });
                $("#ContentPlaceHolder1_lbl_quotation_date").append(invoiceDate);
                $("#ContentPlaceHolder1_lbl_valid_date").append(dueDate);
            //    $("#ContentPlaceHolder1_lbl_customer_name").append(data[0].customerName);
                $("#ContentPlaceHolder1_lbl_customer_address").append(data[parseInt(count) - 1].address);
                $("#ContentPlaceHolder1_lbl_customer_contact").append(data[0].contactNo);
                $("#ContentPlaceHolder1_lbl_gst_no").append(data[parseInt(count) - 1].gstNo);

                /*
                  $("#ContentPlaceHolder1_Repeater2_lbl_product_0").append(data[0].product);
                  $("#ContentPlaceHolder1_Repeater2_lbl_hsn_0").append(data[0].hsn);
                  $("#ContentPlaceHolder1_Repeater2_lbl_height_0").append(data[0].size);
                 $("#ContentPlaceHolder1_Repeater2_Label4_0").append(data[0].unit);
                 $("#ContentPlaceHolder1_Repeater2_lbl_qty_0").append(data[0].qty);
                $("#ContentPlaceHolder1_Repeater2_lbl_rate_0").append(data[0].rate);
                $("#ContentPlaceHolder1_Repeater2_lbl_stotal_0").append(data[0].sTotal);
                $("#ContentPlaceHolder1_Repeater2_lbl_cgst_0").append(data[0].cgst);
                $("#ContentPlaceHolder1_Repeater2_lbl_sgst_0").append(data[0].sgst);
                $("#ContentPlaceHolder1_Repeater2_lbl_igst_0").append(data[0].igst);
                $("#ContentPlaceHolder1_Repeater2_lbl_amount_0").append(data[0].amount);
                */

                $("#ContentPlaceHolder1_lbl_subtotal").append(data[0].subtotal1);
                var numtoword = numberToWord(Number(data[0].subtotal1));
                $("#numWords").text(Case.capital(numtoword));
                //$("#ContentPlaceHolder1_lbl_total_gst").append(data[0].totalgst);
                $("#ContentPlaceHolder1_lbl_shipping").append(data[0].shipping);
                $("#ContentPlaceHolder1_lbl_adjustment").append(data[0].adjustment);
                $("#ContentPlaceHolder1_lbl_discount").append(data[0].discount);
                $("#ContentPlaceHolder1_lbl_balance").append(data[0].finalAmountTotal);

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

                    <Route path="/" component={WithoutGSTQuotationList} />


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

    render() {
        return (


            <div class="container" >
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
                            <div class="col-sm-3 pull-right">   <button type="button" id="print" class="btn btn-default " onClick={() => this.printdiv('dropHere')} ><i class="fa fa-print" aria-hidden="true" style={{ fontSize: "17px", border: "none" }}> Print1</i></button>
                            </div>
                            <div class="col-sm-3 pull-right">
                            </div>   </div>
                    </div>    </div>
                <div id="dropHere" style={{ fontSize: "12px" }} class="card">

                    <div class="card-body">
                        <h3 style={{ textAlign: "center" }}>Quotation</h3>
                        <div class="row">

                            <div class="col-lg-12 m-b-3">

                                <h3 class="text-black"># <span class="invoice" id="ContentPlaceHolder1_lbl_invoice_no"></span>
                                    <span id="ContentPlaceHolder1_lbl_status" class="pay_status" style={{ color: "Red", backgroundColor: "White", marginLeft: "10px" }}></span>
                                    <span class="pull-right"></span> </h3>
                            </div>


                        </div>

                        <div class="row">
                            <div class="col-sm-8 invoice-col">


                            </div>

                            <div class="col-sm-4 invoice-col text-right">

                                <h4> <strong> <span id="ContentPlaceHolder1_lbl_company_name">  {this.state.companyName}</span></strong></h4>
                                <span style={{ fontSize: "12px", lineHeight: "5pt" }} >{this.state.doorNo}, {this.state.floor},</span><br />
                                <span style={{ fontSize: "12px", lineHeight: "5pt" }}>{this.state.street},</span><br />
                                <span style={{ fontSize: "12px", lineHeight: "5pt" }}>{this.state.place}, {this.state.state}</span><br />

                                <b><span class="glyphicon glyphicon-phone"></span> </b>  <span style={{ fontSize: "12px", lineHeight: "5pt" }} id="ContentPlaceHolder1_lbl_company_contact">{this.state.contactNo} <b><span class="glyphicon glyphicon-phone-alt"></span> </b> {this.state.landlineNo}</span><br />
                            <b>Feedback No:</b>  <span style={{ fontSize: "12px", lineHeight: "5pt" }} >{this.state.feedbackNo}</span><br />
                             
                                <b><span class="glyphicon glyphicon-envelope"></span> <span> </span></b>  <span style={{ fontSize: "12px", lineHeight: "5pt" }} id="ContentPlaceHolder1_lbl_company_email">{this.state.companyEmail}</span>
 
                            </div>
                        </div>


                        <div class="row">
                            <div class="col-sm-8 invoice-col pull-left"> To
                    <address>
                                    <strong>
                                        <b>  <span id="ContentPlaceHolder1_lbl_customer_name"></span></b></strong><br />
                                    <b>Phone:</b>  <span id="ContentPlaceHolder1_lbl_customer_contact"></span> <br />
                                 {/*    <b>GST no:</b> <span id="ContentPlaceHolder1_lbl_gst_no"></span> <br />*/}
                                    <span style={{clear:"left",display:"inline-block",maxWidth:"44ch"}}  id="ContentPlaceHolder1_lbl_customer_address"></span><br />
                                </address>
                            </div>

                            <div style={{ paddingLeft: "50px" }} class="col-sm-4 invoice-col text-right pull-right">
                                <p></p> <div id="tableOverflow" class="table-responsive">
                                    <table class="table table-bordered">
                                        <tbody>


                                            <tr>
                                                <th>Quotation Date:</th>
                                                <td style={{ textAlign:"left" }}><span id="ContentPlaceHolder1_lbl_quotation_date"></span></td>
                                            </tr>
                                            <tr>
                                                <th>Valid Date:</th>
                                                <td style={{ textAlign:"left" }}><span id="ContentPlaceHolder1_lbl_valid_date"></span></td>
                                            </tr>

                                        </tbody></table>
                                </div>



                            </div>
                        </div>

                        <div id="tableOverflow" class="table-responsive">
                            <div>

                                <table class="table table-bordered" id="producttable">
                                    <thead id="ContentPlaceHolder1_ths" style={{ color: "black", backgroundColor: "white" }}>
                                        <tr>
                                            <th scope="col"  style={{width:"2%"}}>S.No</th>
                                            <th scope="col"  style={{width:"35%"}}>Product</th>
                                            <th scope="col">Rate</th>
                                            <th scope="col">Qty</th>                                          
                                            <th scope="col" style={{width:"10%"}}>Total</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                    </tbody>

                                </table>
                            </div>

                        </div>


                        <div class="row">



                            <div class="col-lg-12 col-md-12 text-right">

                                <div class="table-responsive">
                                    <table class="table table-bordered">
                                        <tbody><tr>
                                            <td style={{ textAlign: "left" }}>
                                                <b>Subtotal(₹):</b>
                                                <span id="ContentPlaceHolder1_lbl_subtotal"> </span>
                                            </td>
                                            <td style={{ textAlign: "left" }}>
                                                <b>Shipping(₹):</b>
                                                <span id="ContentPlaceHolder1_lbl_shipping"> </span>
                                            </td>

                                            <td style={{ textAlign: "left" }}>
                                                <b>Adjustment:(₹):</b>
                                                <span id="ContentPlaceHolder1_lbl_adjustment"> </span>
                                            </td>
                                     
                                            <td style={{ textAlign: "left" }}>
                                                <b>Balance:(₹):</b>
                                                <span id="ContentPlaceHolder1_lbl_balance"> </span>
                                            </td>

                                        </tr>      </tbody></table>
                                </div>
                            </div>
                        </div>
                        <p></p>
                        <div class="col-md-12">
                            <div style={{ borderTop: "1px solid rgba(0,0,0,.1)", borderBottom: "1px solid rgba(0,0,0,.1)", padding: "5px" }}>
                                <span ><b>Amount Chargeable In Words : </b><span id="numWords"></span> Rupees Only</span>
                            </div>

                            <div class="col-md-12 m-t-6">
                                <div class="row">
                                    <div class="col-md-7"></div>
                                    <div class="col-md-4 pull-right" ></div>
                                    <div class="col-md-1"></div>

                                </div>
                            </div>
                            <div style={{ paddingTop: "50px", paddingBottom: "50px" }} class="col-md-12 m-t-6">
                                <div class="row">
                                    <div class="col-md-7"></div>
                                    <div class="col-md-2 pull-right">Provider Sign</div>
                                    <div class="col-md-3" ></div>


                                </div>
                            </div>
                        </div>












                    </div>
                </div>
            </div >

        );
    }
}

export default WithoutGSTQuotationReportDisplay;









