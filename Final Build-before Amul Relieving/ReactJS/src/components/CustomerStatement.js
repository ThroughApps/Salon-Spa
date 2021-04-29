import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
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
import CryptoJS from 'crypto-js';
import FooterText from './FooterText';
// import ReactTable from "react-table";
// import "react-table/react-table.css";
import "./ReactTableCSS.css";


var balance;
var total;
var numberToWord = require('npm-number-to-word');


class CustomerStatement extends Component {

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


        var id = props.id;

        this.state = {

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
            landlineNo: landlineNo,
            feedbackNo: feedbackNo,
            // data:[],
            // columns:[],
        };


    }
    BackbtnFunc() {
        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={ReportMenuPage} />


                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        // $("#producttable").hide();
        // $("#duetable").hide();

  
        if(this.props.data.vendorName!="null"){
            $("#ContentPlaceHolder1_lbl_customer_name").append(this.props.data.vendorName)
        } if(this.props.data.customerName!="null"){
            $("#ContentPlaceHolder1_lbl_customer_name").append(this.props.data.customerName)
        }

        $("#ContentPlaceHolder1_lbl_customer_address").append(this.props.data.address);
        $("#ContentPlaceHolder1_lbl_customer_contact").append(this.props.data.contactNo);
        $("#ContentPlaceHolder1_lbl_gst_no").append(this.props.data.gstNo);
        $("#ContentPlaceHolder1_lbl_email").append(this.props.data.email);
        $("#ContentPlaceHolder1_lbl_order_no").append(this.props.data.invoice_Amount);
        $("#ContentPlaceHolder1_lbl_amount_paid").append(this.props.data.amount_Paid);
        $("#ContentPlaceHolder1_lbl_discount").append(this.props.data.discount);

        var invoice_Amount = this.props.data.invoice_Amount;
        var intermediateResult = Number(this.props.data.amount_Paid) + Number(this.props.data.discount);
        var Balance_Amount = Number(invoice_Amount) - Number(intermediateResult);
        $("#ContentPlaceHolder1_lbl_balance_amount").append(Balance_Amount);
        $("#ContentPlaceHolder1_lbl_subtotal").append(Balance_Amount);

        var numtoword = numberToWord(Number(Balance_Amount));
        $("#numWords").text(Case.capital(numtoword));

        var tab;
        var self = this;

        var ivalue=0;
        self.state.data=[];
        self.setState({
        data:self.state.data,
        })

        if (this.props.data.invoicepaymentreportlist.length != 0) {

            $.each(this.props.data.invoicepaymentreportlist, function (i, item) {
                var date = new Date(item.date);

                var date = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

                self.setState({
                    date: self.state.date,

                });
                tab += '<tr><td>' + date + '</td><td>' + item.invoiceNo + '</td><td>' + item.dueAmount + '</td><td>' + item.discount + '</td>'
                    + '<td>' + item.pay + '</td><td>' + item.balanceAmt + '</td></tr>';
                  
                    self.state.data[i] = {
                        "Date":date,
                        "Invoice":  item.invoiceNo,
                        "Due":item.dueAmount,
                        "Discount":item.discount,
                        "Pay": item.pay,
                        "Balance":item.balanceAmt,
                        
                        };
                    
                        ivalue=i;


            });
            self.state.data[Number(ivalue)+1] = {
                "Date":"",
                "Invoice":  "",
                "Due":"",
                "Discount":"",
                "Pay":<div style={{fontWeight:"600"}}>{"Due"}</div>,
                "Balance":<div style={{fontWeight:"600"}}>{Balance_Amount}</div>
                };

                self.state.columns = self.GetColumns();
            $("#producttable").append(tab);


        }



    }

    GetColumns(){

        return Object.keys(this.state.data[0]).map(key => {
               
            return {
              Header: key,
              accessor: key,
       
          };
          
        });
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
                    <div class="col-sm-4 ">
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

                    </div>
                    <div class="col-sm-4 ">
                    <h3 class="text-black"><span style={{textAlign:"center"}}>Customer Statement</span> </h3>
                
                    </div>
                    
                     <div class="col-sm-4 ">
                        <div class="row">
                            <div class="col-sm-3 pull-right">   <button type="button" id="print" class="btn btn-default " onClick={() => this.printdiv('dropHere')} ><i class="fa fa-print" aria-hidden="true" style={{ fontSize: "17px", border: "none" }}> Print1</i></button>
                            </div>
                            <div class="col-sm-3 pull-right">
                            </div>   </div>
                    </div>    </div>

                <div id="dropHere" style={{ fontSize: "12px" }} class="card">

                    <div class="card-body">


                        <div class="row">
                            <div class="col-sm-7 invoice-col">


                            </div>

                            <div class="col-sm-5 invoice-col text-right">


                                <h4> <strong> <span id="ContentPlaceHolder1_lbl_company_name">  {this.state.companyName}</span></strong></h4>
                                <span id="ContentPlaceHolder1_lbl_company_address" style={{ fontSize: "12px", lineHeight: "5pt" }} >{this.state.doorNo}, {this.state.floor},</span><br />
                                <span id="ContentPlaceHolder1_lbl_company_address" style={{ fontSize: "12px", lineHeight: "5pt" }} >{this.state.street},</span><br />
                                <span id="ContentPlaceHolder1_lbl_company_address" style={{ fontSize: "12px", lineHeight: "5pt" }} >{this.state.place}, {this.state.state}</span><br />


                                <b><span class="glyphicon glyphicon-phone"></span> </b>  <span style={{ fontSize: "12px", lineHeight: "5pt" }} id="ContentPlaceHolder1_lbl_company_contact">{this.state.contactNo} <b><span class="glyphicon glyphicon-phone-alt"></span> </b> {this.state.landlineNo}</span><br />
                                <b><span class="glyphicon glyphicon-comment"></span><span> </span></b>  <span style={{ fontSize: "12px", lineHeight: "5pt" }} >{this.state.feedbackNo}</span><br />
                                <b>GST No:</b>  <span style={{ fontSize: "12px", lineHeight: "5pt" }} > 33HFYPS0763C1Z1</span><br />

                                <b><span class="glyphicon glyphicon-envelope"></span> <span> </span></b>  <span style={{ fontSize: "12px", lineHeight: "5pt" }} id="ContentPlaceHolder1_lbl_company_email">{this.state.companyEmail}</span>

                            </div>
                        </div>


                        <div class="row">
                            <div class="col-sm-8 invoice-col pull-left"> To
                    <address>
                                    <strong>
                                        <b>  <span id="ContentPlaceHolder1_lbl_customer_name"></span></b></strong><br />
                                    <b>Phone:</b>  <span id="ContentPlaceHolder1_lbl_customer_contact"></span> <br />
                                    <b>GST no:</b> <span id="ContentPlaceHolder1_lbl_gst_no"></span> <br />
                                    <span style={{clear:"left",display:"inline-block",maxWidth:"44ch"}} id="ContentPlaceHolder1_lbl_customer_address"></span><br />

                                </address>
                            </div>

                            <div style={{ paddingLeft: "50px" }} class="col-sm-4 invoice-col text-right pull-right">
                                <p></p>
                                <div class="table-responsive">
                                    <table class="table table-bordered">
                                        <tbody>

                                            <tr>


                                                <th style={{ fontSize: "12px", textAlign: "left", width: "200px", overflow: "hidden", wordWrap: "breakWord" }}>Invoice Amount:</th>
                                                <td><span id="ContentPlaceHolder1_lbl_order_no"></span></td>
                                            </tr>

                                            <tr>
                                                <th>Amount Paid:</th>
                                                <td><span id="ContentPlaceHolder1_lbl_amount_paid"></span></td>
                                            </tr>

                                            <tr>
                                                <th>Discount:</th>
                                                <td><span id="ContentPlaceHolder1_lbl_discount"></span></td>
                                            </tr>
                                            <tr>
                                                <th style={{ fontSize: "12px", textAlign: "left", width: "200px", overflow: "hidden", wordWrap: "breakWord" }}>Balance Amount:</th>
                                                <td><span id="ContentPlaceHolder1_lbl_balance_amount"></span></td>
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
                                            <th scope="col">Date</th>
                                            <th scope="col">Invoice</th>
                                            <th scope="col">Due</th>
                                            <th scope="col">Discount</th>
                                            <th scope="col">Payment</th>
                                            <th scope="col">Balance</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                    </tbody>

                                </table>
                            </div>

                        </div>


                        <div class="row">
                            <div class="col-lg-8 col-md-8 text-right">
                            </div>
                            <div class="col-lg-4 col-md-4 text-right">

                                <div class="table-responsive">
                                    <table class="table table-bordered" id="duetable">
                                        <tbody><tr>
                                            <th style={{ width: "50%" }}>Due Balance:</th>
                                            <td style={{ color: "red" }}>₹ <span id="ContentPlaceHolder1_lbl_subtotal"></span></td>
                                        </tr>

                                        </tbody></table>


                                </div>
                            </div>

                {/* <ReactTable  style={{overflow:"auto"}}
                            data={this.state.data}
                            columns={this.state.columns}
                            noDataText="No Data Available"
                            filterable={true}
                            defaultPageSize={10}
                            className="-striped -highlight"
                            defaultFilterMethod={(filter, row, column) => {
                                const id = filter.pivotId || filter.id;
                                return row[id] !== undefined
                                ? String(row[id])
                                    .toLowerCase()
                                    .indexOf(filter.value.toLowerCase()) !== -1
                                : true;
                            }}
                            showPaginationTop={true}
                            showPaginationBottom={false}
                            getTdProps={this.onRowClick}
                        
                            /> */}

                            <div class="col-md-12"><div style={{ borderTop: "1px solid rgba(0,0,0,.1)", borderBottom: "1px solid rgba(0,0,0,.1)", padding: "5px" }}>
                                <span ><b>Amount Chargeable In Words : </b><span id="numWords"></span> Rupees Only</span>
                            </div></div>


                        </div>
 </div>
                </div>
            </div >

        );
    }
}

export default CustomerStatement;