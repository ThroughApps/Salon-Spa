import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js';

var testarray = [];
var inputarray = [];
var emailArrary = [];
var dataList = [];
class ChatBotDetails extends Component {

    constructor() {

        super()
        this.state = {
            country: "",
            origin:"",
            product: "Tictoks,Through Books,Digital Print App,School Management System",
            hardware: "Wireless Bio-metric,Wireless RFID ,no",
            data: [],
            columns: [],
        };
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.state[name] = value;
        this.setState({ [name]: value },
        );
        var self = this;
        var result;
        if (this.state.country== "" && this.state.origin== "" && this.state.product== "" && this.state.hardware== "") {
            // All value is selected
            result = dataList;
        }
        else {
            var countryarray = this.state.country.split(",");
            //console.log("Country array",countryarray);
            var originarray = this.state.origin.split(",");

            var productarray = this.state.product.split(",");
            //console.log("product array",productarray);
            var hardwarearray = this.state.hardware.split(",");
            //console.log("hardwarearray array",hardwarearray);

            var filterBy = { country: countryarray,origin: originarray, software: productarray, hardware: hardwarearray };
            //    console.log("filterBy",filterBy);
            //        console.log("Datalist",dataList);
            result = dataList.filter(function (o) {
                return Object.keys(filterBy).every(function (k) {
                    return filterBy[k].some(function (f) {
                        return o[k]== f;
                    });
                });
            });
        }
        console.log(result);
        var num = 0;
        self.state.data = [];
        $.each(result, function (i, item) {
            num = num + 1;
            self.state.data[i] = {
                " No": num,
                "Date": item.date,
                "Name": item.userName,
                "Email Id": item.emailId,
                "Mobile No": item.mobileNo,
                "Software": item.software,
                "Hardware": item.hardware,
                "City": item.city,
                "Country": item.country,
                "Origin":item.origin
            }
        });
        if (self.state.data.length > 0)
            self.state.columns = self.getColumns();
        else
            self.state.data = [];

        self.setState({
            data: self.state.data,
            country: self.state.country,
            origin:self.state.origin,
        });

    }
    GetData() {
        var self = this;
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                fromDate: this.state.fromDate,
                toDate: this.state.toDate,
            }),
            //url: "http://15.206.129.105:8080/EmployeeAttendenceAPI/ChatBot/SelectChaBot",
         //url: "http://15.206.129.105:8080/EmployeeAttendenceAPI/ChatBot/SelectChaBot",

             url: " http://15.206.129.105:8080/MerchandiseAPI/ChatBot/SelectChaBot",

            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                console.log("Country list:",data.countryList);
                console.log("Origin List:",data.originList);
                var num = 0;
                self.state.data = [];
                if (data.length != 0) {
                    dataList = data.chatbotList;
                    $.each(data.chatbotList, function (i, item) {
                        num = num + 1;
                        self.state.data[i] = {
                            " No": num,
                            "Date": item.date,
                            "Name": item.userName,
                            "Email Id": item.emailId,
                            "Mobile No": item.mobileNo,
                            "Software": item.software,
                            "Hardware": item.hardware,
                            "City": item.city,
                            "Country": item.country,
                            "Origin":item.origin
                        }
                    });
                   // $('#country')[0].options.length = 0;
                   $("#country").empty();
                    var country = "";
                    var country_All = [];
                    country +="<option value='' disabled selected hidden>Select Country</option>";
                    $.each(data.countryList, function (i, item) {

                        country += '<option value= "' + item.country + '">' + item.country + '</option>';
                        country_All.push(item.country);
                    });
                    country += '<option value="' + country_All + '" >All</option></option>';
                    $("#country").append(country);
                    self.state.country = country_All.toString();
                    console.log("ORIGIN LIST:",data.originList);
                    var origin = "";
                    var origin_All = [];
                    $.each(data.originList, function (i, item) {
          
                      origin += '<option value= "' + item.origin + '">' + item.origin + '</option>';
                      origin_All.push(item.origin);
                    });
                    origin += '<option value="' + origin_All + '" >All</option></option>';
                    $("#origin").append(origin);
                    self.state.origin = origin_All.toString();
                    self.setState({
                      origin: self.state.origin,
                    });
          
                    if (self.state.data.length > 0)
                        self.state.columns = self.getColumns();
                    else
                        self.state.data = [];

                    self.setState({
                        data: self.state.data,
                        country: self.state.country,
                        origin:self.state.origin,
                    });


       
                }
            },


        });

    }
    getColumns() {
        return Object.keys(this.state.data[0]).map(key => {
            return {
                Header: key,
                accessor: key
            };
        });
    }

    componentDidMount() {
        var self = this;
        $('#toDate').datepicker({
            onSelect: function (date) {
                var dt = new Date(date);
                dt.setDate(dt.getDate() - 1);
                $("#fromDate").datepicker("option", "maxDate", dt);
                self.setState({
                    toDate: date,
                });
            },
            dateFormat: 'yy-mm-dd',
            changeMonth: true,
            changeYear: true,
            // minDate: '-3M',
            maxDate: 'M',
            numberOfMonths: 1
        });
        $('#fromDate').datepicker({
            onSelect: function (date) {
                var dt = new Date(date);
                dt.setDate(dt.getDate() + 1);
                $("#toDate").datepicker("option", "minDate", dt);
                self.setState({
                    fromDate: date,
                });
            },
            dateFormat: 'yy-mm-dd',
            changeMonth: true,
            changeYear: true,
            //  minDate: '-3M',
            maxDate: 'M',
            numberOfMonths: 1
        });
        var d = new Date();
        this.state.toDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        // console.log(d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate());
        d.setMonth(d.getMonth() - 3);
        this.state.fromDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        // console.log(d.toLocaleDateString());
        this.GetData();
        window.scrollTo(0, 0);

    }

    render() {


        return (

            <div class="container" style={{ marginBottom: "0%", paddingTop: "0px" }}>

                <h4 className="centerAlign" style={{ textAlign: "center" }}>Chat Bot Details</h4>

                <form style={{ paddingBottom: '20px', position: 'inline-block' }}>
                    <div class="row" style={{ marginLeft: "5px" }}>

                        <input
                            className="dateToField"
                            style={{ width: "auto" }}
                            type="text"
                            value={this.state.fromDate}
                            id="fromDate"
                            name="fromDate"
                            onChange={this.handleUserInput} readOnly
                        />
                        <label
                            for="toDate"
                            style={{ marginLeft: "10px", marginRight: "15px" }}
                        >
                            {" "}
                            To:
            </label>

                        <input
                            className="dateToField"
                            style={{ width: "auto" }}
                            type="text"
                            value={this.state.toDate}
                            id="toDate"
                            name="toDate"
                            onChange={this.handleUserInput} readOnly
                        />

                        <button
                            type="button"
                            onClick={() => this.GetData()}
                            className="btn btn-primary"
                            style={{
                                marginLeft: "10px",
                                marginRight: "5px"
                            }}
                        >
                            Submit
                      </button>

                        
                    </div>

                    <div class="row">
                        <div class="col-sm-3" >
                            <div className="col-xs-12 col-sm-12 col-lg-12" style={{ marginBottom: "10px" }} >
                                <label>
                                    Country</label>
                                <select
                                    id="country"
                                    className="form-control country"
                                    onChange={this.handleUserInput}
                                    name="country"
                                    style={{ marginBottom: "0px" }}
                                >
                                    </select>
                            </div>
                        </div>

                        <div class="col-sm-3" >
              <div className="col-xs-12 col-sm-12 col-lg-12" style={{ marginBottom: "10px" }} >
                <label>
                  Origin</label>
                <select
                  id="origin"
                  className="form-control origin"
                  onChange={this.handleUserInput}

                  name="origin"
                  style={{ marginBottom: "0px" }}
                >
                  <option value="" disabled selected hidden>Select Origin</option>
                </select>


              </div>


            </div>

                        <div class="col-sm-3" style={{ marginBottom: "10px" }}>
                            <div className="col-xs-12 col-sm-12 col-lg-12">
                                <label>
                                    Product</label>
                                <select
                                    id="product"
                                    className="form-control product"
                                    onChange={this.handleUserInput}
                                    name="product"
                                    style={{ marginBottom: "0px" }}
                                >
                                    <option value="" disabled selected hidden>Select Product</option>
                                    <option value="Tictoks" >Tictoks</option>
                                    <option value="Through Books" >Through Books</option>
                                    <option value="Digital Print App" >Digital Print App</option>
                                    <option value="School Management System" >School Management System</option>
                                    <option value="Tictoks,Through Books,Digital Print App,School Management System" >All</option>
                                </select>
                            </div></div>

                        <div class="col-sm-3">
                            <div className="col-xs-12 col-sm-12 col-lg-12" style={{ marginTop: "10px", marginBottom: "10px" }}>
                                <label>Hardware  </label>
                                <select
                                    id="hardware"
                                    className="form-control hardware"
                                    onChange={this.handleUserInput}
                                    name="hardware"
                                    style={{ marginBottom: "0px" }}
                                >
                                    <option value="Wireless Bio-metric,Wireless RFID,no" >All</option>
                                    <option value="Wireless Bio-metric">Wireless Bio-metric</option>
                                    <option value="Wireless RFID">Wireless RFID</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div /* style={{ display: "grid" }} */>
                        <div id="tableOverflow" class="hideContent">
                            <ReactTable
                                data={this.state.data}
                                columns={this.state.columns}
                                noDataText="No Data Available"
                                filterable
                                defaultPageSize={5}
                                className="-striped -highlight"
                                defaultFilterMethod={(filter, row, column) => {
                                    const id = filter.pivotId || filter.id;
                                    return row[id] != undefined
                                        ? String(row[id])
                                            .toLowerCase()
                                            .indexOf(filter.value.toLowerCase()) != -1
                                        : true;
                                }}

                            />
                        </div>
                    </div>


                </form>
            </div>
        );
    }

}
export default ChatBotDetails;







