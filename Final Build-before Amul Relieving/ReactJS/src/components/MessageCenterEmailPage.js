import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';

var testarray = [];
var inputarray = [];
var emailArrary = [];

class MessageCenterEmailPage extends Component {


    constructor() {

        super()
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)


        this.state = {
            department: '',
            TotalNoShift: '',
            shift: '',
            count: '',
            role: '',
            valid: false,
            //  companyId: '',
            companyId: companyId,
            staffId: staffId,
            superiorId: '',
            employeeId: [],
            message: '',
            answer: '',
            copy: '',

            authPassword: '',

        };
    }

    /* 
        SelectAll() {
            var self = this;
            $.ajax({
                type: 'POST',
                data: JSON.stringify({
                    companyId: this.state.companyId,
    
    
                }),
                url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeshiftmanagement/SelectAllEmployee",
                contentType: "application/json",
                dataType: 'json',
                async: false,
                success: function (data, textStatus, jqXHR) {
    
                    if (data.length != 0) {
                        var tab;
    
    
                        $("#MasterSelectBox").empty();
                        $.each(data, function (i, item) {
                            var feed = JSON.stringify({
                                empId: item.employeeId,
                                mobileNo: item.mobileNo
                            });
                            inputarray.push(feed);
                          
                            tab += '<option value= "' + item.employeeId + '">' + item.employeeId + " " + item.employeeName + " " + item.mobileNo + '</option>';
                        });
                        $("#MasterSelectBox").append(tab);
    
                    } else {
                        $("#MasterSelectBox").empty();
                    }
    
                },
    
            });
    
    
    
        } */

    componentDidMount() {
        emailArrary = [];
        var self = this;
        $(document).ready(function () {
            $(".CheckBoxClass").click(function () {
                $(".checkBoxClass").prop('checked', $(this).prop('checked'));
            });
        });


        this.GetData();


        $('#btnAdd').click(function (e) {
            var selectedOpts = $('#customerListTable option:selected');
            if (selectedOpts.length == 0) {
                e.preventDefault();
                var len = $('#customerListTable').children('option').length;
                if (len == 0) {

                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'No Recipients to Add',
                        showConfirmButton: false,
                        timer: 2000
                    })
                } else {


                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Kindly Select Recipients to Add',
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
            }

            $('#PairedSelectBox').append($(selectedOpts).clone())

            var selectedData = "";
            $('#customerListTable option:selected').each(function () {
                $(this).attr('selected', 'selected');
                selectedData = $(this).val();
                emailArrary.push(selectedData);

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

                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'No Recipients to Remove',
                        showConfirmButton: false,
                        timer: 2000
                    })

                } else {

                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Kindly Select Recipients to Remove',
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
            }

            $('#customerListTable').append($(selectedOpts).clone());

            var selectedData = "";
            $('#PairedSelectBox option:selected').each(function () {
                $(this).attr('selected', 'selected');
                selectedData = $(this).val();


                for (var i = emailArrary.length - 1; i >= 0; i--) {
                    if (emailArrary[i] === selectedData) {
                        emailArrary.splice(i, 1);

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

                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No Recipients to Add',
                    showConfirmButton: false,
                    timer: 2000
                })
            }

            $('#PairedSelectBox').append($(selectedOpts).clone());

            var selectedData = "";
            $('#customerListTable option').each(function () {
                $(this).attr('selected', 'selected');
                selectedData = $(this).val();
                emailArrary.push(selectedData);

            });
            $("#seperateddata").append(selectedData);

            $(selectedOpts).remove();
            e.preventDefault();


        });


        $('#btnRemoveAll').click(function (e) {
            var selectedOpts = $('#PairedSelectBox option');
            if (selectedOpts.length == 0) {
                e.preventDefault();

                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No Recipients to Remove',
                    showConfirmButton: false,
                    timer: 2000
                })
            }

            $('#customerListTable').append($(selectedOpts).clone());
            var selectedData = "";
            emailArrary.splice(0, emailArrary.length);

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


        $.each($("input[name='email']:checked"), function () {
            emailArrary.push($(this).val());
        });

        this.state.emailId = emailArrary.toString();
        this.setState({
            emailId: this.state.emailId,
            message: this.state.message
        });

        if (emailArrary.length != 0) {
            if (this.state.message != "") {

        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                sendTo: this.state.emailId,
                message: this.state.message,
                companyId: this.state.companyId,
                staffId: this.state.staffId,
            }),
            url: " http://15.206.129.105:8080/MerchandiseAPI/MessageCenter/SendMail",

            contentType: "application/json",
            dataType: 'json',
            async: false,

            success: function (data, textStatus, jqXHR) {
                $("#PairedSelectBox").empty();
                emailArrary = [];
                self.state.message = "";
                self.setState({
                    message:'',
                })
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Message Sent Succerssfully. ',
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
    }
    else {
        confirmAlert({
            title: ' Error', // Title dialog
            message: 'Please Enter your message', // Message dialog
            confirmLabel: 'Ok', // Text button confirm


        });
    }
} else {
    confirmAlert({
        title: ' Error', // Title dialog
        message: 'Missing Mail Recipients, Kindly Add Recipients to proceed', // Message dialog
        confirmLabel: 'Ok', // Text button confirm

    });
    
}
    }

    GetData() {

        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                companyId: this.state.companyId,

            }),
            url: " http://15.206.129.105:8080/MerchandiseAPI/MessageCenter/GetMailCustomerDetails",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {


                if (data.length != 0) {

                    //   $("#MasterSelectBox").empty();
                    $("#customerListTable").empty();
                    var tab;

                    //var tab = '<thead><tr class="headcolor"  class="headcolor" style="color: white; background-color: #486885;" ><th><input class="CheckBoxClass" name="checkbox" type="checkbox" id="ckbCheckAll" /></th><th>CustomerName</th><th>CompanyName</th><th>EmailId</th></tr></thead>';


                    $.each(data, function (i, item) {
                        
                        tab += '<option value= "' + item.emailId + '">' + item.customerName + "  " + item.companyName + "  " + item.emailId + '</option>';
                        // tab += '<tr><td><input type="checkbox" class="checkBoxClass" id="mailcheckBox" name="email" value = " ' + item.emailId + ' " /></td><td>' + item.customerName + '</td><td>' + item.companyName + '</td><td>' + item.emailId + '</td><tr>';

                    });
                }
                //$("#MasterSelectBox").append(tab);
                $("#customerListTable").append(tab);
            },
            error: function (data, textStatus, jqXHR) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Network Connection Problem',
                    showConfirmButton: false,
                    timer: 2000
                })
            }


        })
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


    render() {


        return (

            <div class="container" style={{ marginBottom: "80px" }}>
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
    
                {/* /***************** */}
                <div class="container" style={{ marginBottom: "" }}>



                    <h3 className="centerAlign" style={{ textAlign: "center" }}>Email Message</h3>


                    <div class="row" >
                        <div class="col-sm-5">

                            <select className="selectTextfield" 
                                style={{ height: "100px", width: "100%" }} id="customerListTable" multiple>
                            </select>
                        </div>


                        <div class="col-sm-2" style={{ marginTop: "5px", textAlign: "center" }}>
                            <button id="btnAdd" style={{ width: "95px", marginBottom: "10px" }} value=">">Add</button><br />
                            <button id="btnAddAll" style={{ width: "95px", marginBottom: "10px" }} value="<">Add All</button><br />
                            <button id="btnRemoveAll" style={{ width: "95px", marginBottom: "10px" }} value="<">RemoveAll</button><br />
                            <button id="btnRemove" style={{ width: "95px", marginBottom: "10px" }} value="<">Remove</button>
                        </div>

                        <div class="col-sm-5"  >
                            <select  /* className="selectTextfield"  */
                                style={{ height: "100px", width: "100%" }} id="PairedSelectBox" multiple>
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






            </div>





        );
    }

}
export default MessageCenterEmailPage;