import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';


var testarray = [];
var inputarray = [];
var smsArrary = [];

class MessageCenterMessagePage extends Component {


    constructor() {

        super()
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

        this.state = {
            department: '',
            TotalNoShift: '',
            shift: '',
            count: '',
            role: '',
            valid: false,
            companyId: companyId,
            superiorId: '',
            employeeId: [],
            message: '',
            answer: '',
            copy: '',

            authPassword: '',

        };
    }

    componentDidMount() {


        smsArrary = [];

        var self = this;

        this.GetData();


        $('#btnAdd').click(function (e) {
            var selectedOpts = $('#customerListTable option:selected');
            if (selectedOpts.length == 0) {
                e.preventDefault();
                var len = $('#customerListTable').children('option').length;
                if (len == 0) {
                    confirmAlert({
                        title: ' Error',                        // Title dialog
                        message: 'No Recipients to Add',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    });
                } else {

                    confirmAlert({
                        title: ' Error',                        // Title dialog
                        message: 'Please Select Recipients to Add',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    });
                }
            }

            $('#PairedSelectBox').append($(selectedOpts).clone())

            var selectedData = "";
            $('#customerListTable option:selected').each(function () {
                $(this).attr('selected', 'selected');
                selectedData = $(this).val();
                smsArrary.push(selectedData);

            });

            $(selectedOpts).remove();
            e.preventDefault();
        });


        $('#btnRemove').click(function (e) {
            var selectedOpts = $('#PairedSelectBox option:selected');
            if (selectedOpts.length == 0) {
                e.preventDefault();
                var len = $('#PairedSelectBox').children('option').length;
                if (len == 0) {
                    confirmAlert({
                        title: ' Error',                        // Title dialog
                        message: 'No Recipients to Remove',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    });
                } else {
                    confirmAlert({
                        title: ' Error',                        // Title dialog
                        message: 'Please Select Recipients to Remove',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    });
                }
            }

            $('#customerListTable').append($(selectedOpts).clone());

            var selectedData = "";
            $('#PairedSelectBox option:selected').each(function () {
                $(this).attr('selected', 'selected');
                selectedData = $(this).val();


                for (var i = smsArrary.length - 1; i >= 0; i--) {
                    if (smsArrary[i] === selectedData) {
                        smsArrary.splice(i, 1);
                       
                    }
                }

            });

            $(selectedOpts).remove();
            e.preventDefault();
        });


        $('#btnAddAll').click(function (e) {

            var selectedOpts = $('#customerListTable option');


            if (selectedOpts.length == 0) {
                e.preventDefault();
                confirmAlert({
                    title: ' Error',                        // Title dialog
                    message: 'No Recipients to Add',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                });
            }

            $('#PairedSelectBox').append($(selectedOpts).clone());

            var selectedData = "";
            $('#customerListTable option').each(function () {
                $(this).attr('selected', 'selected');
                selectedData = $(this).val();
                smsArrary.push(selectedData);

            });
            $("#seperateddata").append(selectedData);

            $(selectedOpts).remove();
            e.preventDefault();


        });


        $('#btnRemoveAll').click(function (e) {
            var selectedOpts = $('#PairedSelectBox option');
            if (selectedOpts.length == 0) {
                e.preventDefault();
                confirmAlert({
                    title: ' Error',                        // Title dialog
                    message: 'No Recipients to Remove',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                });
            }

            $('#customerListTable').append($(selectedOpts).clone());
            var selectedData = "";
            smsArrary.splice(0, smsArrary.length);
           
            $(selectedOpts).remove();
            e.preventDefault();
        });


    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
        );
    }


    Submit() {

        var self = this;

        this.state.contactNo = smsArrary.toString();
        this.setState({
            contactNo: this.state.contactNo,
            message: this.state.message
        });



         $.ajax({
                    type: 'POST',
                    data: JSON.stringify({
                        sendTo:this.state.contactNo,
                        message:this.state.message,
                        msgCount:this.state.msgCount,
                        staffId:this.state.staffId,
                        companyId:this.state.companyId,
                    }),
                    url: " http://15.206.129.105:8080/MerchandiseAPI/MessageCenter/SendMessage",
                  contentType: "application/json",
                    dataType: 'json',
                    async: false,

                    success: function (data, textStatus, jqXHR) {
                        $("#PairedSelectBox").empty();
                         smsArrary = [];
                        self.state.message = "";
                        self.GetData();
                   
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title:'Message Sent Succerssfully. ',   
                            showConfirmButton: false,
                            timer: 2000
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

                alert("remsg"+self.state.message);

    }

    GetData() {

        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                companyId: this.state.companyId,

            }),
            url: "http://15.206.129.105:8080/MerchandiseAPI/MessageCenter/GetMessageCustomerDetails",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
               // alert("SUCCESS"); 
    

                if (data.length != 0) {
                    //alert("data 1");
                    //   $("#MasterSelectBox").empty();
                    $("#customerListTable").empty();

                    var tab;
                    $.each(data, function (i, item) {


                        tab += '<option value= "' + item.contactNo + '">' + item.customerName + "  " + item.companyName + "  " + item.contactNo + '</option>';

                    });
                }
                //alert("data 2 ");
               // $("#MasterSelectBox").append(tab);
                $("#customerListTable").append(tab);

            },
            error: function (data, textStatus, jqXHR) {
                confirmAlert({
                    title: 'No Internet',                        // Title dialog
                    message: 'Network Connection Problem',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                });
            }


        })
    }



    render() {


        return (

            <div class="container" style={{ marginBottom: "80px" }}>
                <h3 className="centerAlign" style={{ textAlign: "center" }}>SMS sds Message</h3>


                <div class="row" >
                    <div class="col-sm-5">

                        <select style={{ height: "100px", width: "100%" }} id="customerListTable" multiple>
                        </select>
                    </div>

                    <div class="col-sm-2" style={{ marginTop: "5px", textAlign: "center" }}>
                        <button id="btnAdd" style={{ width: "95px", marginBottom: "10px" }} value=">">Add</button><br />
                        <button id="btnAddAll" style={{ width: "95px", marginBottom: "10px" }} value="<">Add All</button><br />
                        <button id="btnRemoveAll" style={{ width: "95px", marginBottom: "10px" }} value="<">RemoveAll</button><br />
                        <button id="btnRemove" style={{ width: "95px", marginBottom: "10px" }} value="<">Remove</button>
                    </div>
                    <div class="col-sm-5" style={{}}>
                        <select style={{ height: "100px", width: "100%" }} id="PairedSelectBox" multiple>
                        </select>
                    </div>
                </div>
                <br />
                <br />

                <br />


                <label for="comment">Message Content:</label>
                <textarea
                    onChange={this.handleUserInput}
                    name="message"
                    placeholder="Your message.."
                    value={this.state.message}
                    required style={{ height: '200px' }}
                    class="form-control"
                    rows="5" id="message"
                ></textarea>

                <br />
                <br />

                <button onClick={() => this.Submit()}>
                    Submit
            </button>
            </div>

        );
    }

}
export default MessageCenterMessagePage;
