import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';

var array = [];
var checkBoxarray = [];

class Attendance extends Component {

    constructor() {
        super();
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
     //   var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
       var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
       var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
       var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
       var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
      
      

        this.state = {
            employeeId: '',
            employeeName: '',
            date: date,
            superiorId: '',
            status: '',
            companyId:companyId,
            staffId:staffId,
            employeeName:employeeName,
           role:role, 
        
        };
        this.setState({
            date: date,
        })
    }
    componentDidMount() {

        $(document).ready(function () {
            $(".CheckBoxClass").click(function () {
                 $(".checkBoxClass").prop('checked', $(this).prop('checked'));
              
            });
        });


        var self = this;
        window.scrollTo(0, 0);

        this.AttendanceList();

        $(document).ready(function () {
            $(".SelectOption").change(function () {
                var currentRow = $(this).closest("tr");
                var tdObject = $(this).closest("tr").find("td:eq(7)").text(); 
              
                if(tdObject=="Exist" || tdObject=="Exist_Changed"){
                    $(this).closest("tr").find("td:eq(7)").text("Exist_Changed");

                }else{
                $(this).closest("tr").find("td:eq(7)").text("Changed");
                }

            });
          
        });

    }

    AttendanceList() {

        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
         var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
       
       
        this.state.companyId = companyId;
        this.state.employeeId = employeeId;
        this.state.companyName = companyName;
        this.setState({
            date: this.state.date,
            companyId: this.state.companyId,
            employeeId: this.state.employeeId,
            companyName: this.state.CompanyName,
        });
        //  report=this.state.CompanyName+"DailyReport"+this.state.date;
        var self = this;
        var category="Staff";
        var getAttenanceData="{'companyId':'"+this.state.companyId+"','date':'"+this.state.date+"','category':'"+category+"'}";

        $.ajax({
            type: 'GET',
         
  
         url: "https://wildfly.tictoks.in:443/EmployeeAttendenceAPI/AttendanceAPICall/GetAttendanceData/"+getAttenanceData,
 
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
              
                var status;
                
                if (data.employeeRetrievelist.length != 0) {
                    var tab = '<thead><tr class="headcolor"  class="headcolor" style="color: white; background-color: #374850;" ><th><input class="CheckBoxClass" name="checkbox" type="checkbox" id="ckbCheckAll" /></th><th>Id</th><th>Employee Name</th><th>Mobile No</th><th>Status</th></tr></thead>';

                    $.each(data.employeeRetrievelist, function (i, item) {

                      
                            if (item.status == "P") {
                                status = "Present";
                             } else if (item.status == "A") {
                                status = "Absent";
                             } else if (item.status == "L") {
                                status = "Leave";
                            } else {
                                status = "Holiday";
                            }
                        //  tab += '<tbody id= "myTable" ><tr style="background-color:' + color + ';" ><td>' + item.employeeId + '</td><td>' + item.name + '</td><td>' + item.department + '</td><td>' + item.employeeType + '</td><td>' + item.checkinTime + '</td><td>' + item.checkinLocation + '</td><td>' + item.checkoutTime + '</td><td>' + item.checkoutLocation + '</td><td>' + item.totalWorkHour + '</td><td>' + status + '</td><td>' + item.authorizedBy + '</td></tr></tbody>';

                        tab += '<tbody id= "myTable" ><tr class="success"  id="tabletextcol" ><td><input class="checkBoxClass" name="checkbox" id="myCheckBox" type="checkbox"  /></td><td>' + item.employeeId + '</td><td>' + item.name + '</td><td class="hide">' + item.department + '</td><td class="hide">' + item.employeeType + '</td><td>' + item.mobileNo + '</td><td width="auto"><select id="Emp' + item.employeeId + '"class=SelectOption><option value="A">Absent</option> <option value="P">Present</option>  <option value="L">Leave</option> <option value="H">Holiday</option></select></td><td id="Status' + item.employeeId + '" class="ChangedStatus">Not_Changed</td></tr></tbody>';

                    });
                    $("#tableHeadings").append(tab);
                    $(".ChangedStatus").hide();
                    $.each(data.employeeRetrievelist, function (i, item) {
                     
                        if(item.category=="DB"){
                            $("#Status" + item.employeeId).html('Exist');
                        }
                        if (item.status == "P") {
                            $("#Emp" + item.employeeId).val("P").change();
                          
                        }else if (item.status == "L") {
                            $("#Emp" + item.employeeId).val("L").change();
                         //   $("#Status" + item.employeeId).html('Exist');
                        }else if(item.status == "H"){
                            $("#Emp" + item.employeeId).val("H").change();
                        }
                    });
                    $(".hideContent").show();
                    $(".hide").css("visibility","hidden");
            
                } else {
                    $("#tableHeadings").append('<h4 align="center">No Data</h4>');
                    $(".hideContent").hide();
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

            }

        });
       
    }
    Submit() {
         var rows = $('#tableHeadings tbody >tr');
         var columns;
         var insertArray=[];
         var updateArray=[];
         
         for (var i = 0; i < rows.length; i++) {
             columns = $(rows[i]).find('td');
 
            
             if($(columns[0]).find('input').is(':checked')){
             
                var changeStatus=$(columns[7]).html();
          
                 if((changeStatus != "Not_Changed") && (changeStatus != "Exist") ){
                    var employeeId=$(columns[1]).html();
                    var employeeName=$(columns[2]).html();
                    var department=$(columns[3]).html();
                    var type=$(columns[4]).html();
                    var status=$(columns[6]).find(".SelectOption").val();
                     
                   
                     if(changeStatus == "Changed"){
                     
                     insertArray.push(employeeId);
                     insertArray.push(employeeName);
                     insertArray.push(department);
                     insertArray.push(type);
                     insertArray.push(status);
                     }
                     else{
                       
                        updateArray.push(employeeId);
                        updateArray.push(employeeName);
                        updateArray.push(department);
                        updateArray.push(type);
                        updateArray.push(status);
                     }
 
                 }else{

                 }
 
             }else{
                 
             }
                
         }
            var self=this;
        
         if((insertArray.length>0 )|| (updateArray.length>0 )){
          
            var category="Staff";
         
            var manualAttenanceData="{'companyId':'" + this.state.companyId + "','date':'" + this.state.date + "','category':'" + category + "','insertArray':'" + insertArray.toString() + "','updateArray':'" + updateArray.toString() + "'}";

         $.ajax({
             type: 'GET',
     
            url:"https://wildfly.tictoks.in:443/EmployeeAttendenceAPI/AttendanceAPICall/ManualAttendance/"+manualAttenanceData,
  
            contentType: "application/json",
             dataType: 'json',
             async: false,
             success: function (data, textStatus, jqXHR) {
              
                 Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Attendance Updated Successfully.',    
                    showConfirmButton: false,
                    timer: 2000
                  })
 
                 insertArray=[];
                 updateArray=[];
                 $("#ckbCheckAll").removeAttr("checked");
                 $("#tableHeadings").empty();
                 self.AttendanceList();

             },
 
 
             error: function (data) {
                insertArray=[];
                updateArray=[];
                
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Network Connection Problem',
                    showConfirmButton: false,
                    timer: 2000
                })
 
             }
 
 
         });
         array = [];
     }else{
            
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No Change', 
            showConfirmButton: false,
            timer: 2000
        })
     } 
        $(document).ready(function () {
            $(".CheckBoxClass").click(function () {
                $(".checkBoxClass").prop('checked', $(this).prop('checked'));
            });
        });

        $(document).ready(function () {
            $(".SelectOption").change(function () {
                var currentRow = $(this).closest("tr");
                var tdObject = $(this).closest("tr").find("td:eq(7)").text(); 
             
                if(tdObject=="Exist" || tdObject=="Exist_Changed"){
                    $(this).closest("tr").find("td:eq(7)").text("Exist_Changed");

                }else{
                $(this).closest("tr").find("td:eq(7)").text("Changed");
                }
            });
        });
    }

    cancelFunc() {
        $("#tableHeadings").empty();
        
        $(document).ready(function () {
            $(".CheckBoxClass").click(function () {
                 $(".checkBoxClass").prop('checked', $(this).prop('checked'));
              
            });
        });


        var self = this;
        window.scrollTo(0, 0);

        this.AttendanceList();

        $(document).ready(function () {
            $(".SelectOption").change(function () {
                var currentRow = $(this).closest("tr");
                var tdObject = $(this).closest("tr").find("td:eq(7)").text(); 
              
                if(tdObject=="Exist" || tdObject=="Exist_Changed"){
                    $(this).closest("tr").find("td:eq(7)").text("Exist_Changed");

                }else{
                $(this).closest("tr").find("td:eq(7)").text("Changed");
                }

            });
          
        });
    }

  
    render() {
        return (
            <div class="container"style={{marginBottom:"5%",marginTop:"0px",paddingTop:"0px"}}>
                <div class="card">
                    <div class="card-header" style={{ backgroundColor: "" }}>
              
              
                <br/>
                        <h4 align="center">Manual Attendance - Employee</h4>
                    </div>
                    <div>
                        <div class="card-body">

                            <div id="tableOverflow">
                                <table class="table" id="tableHeadings" style={{ marginBottom: "2%" }}>
                                </table>
                            </div>
                            <div class="form-group hideContent">
                                <div class="row">
                                    <div class="col-sm-offset-2 col-sm-10">
                                        <button type="button" style={{ fontWeight: "bold" }} onClick={() => this.Submit()} class="btn btn-primary">Submit</button> <span></span>
                                        <button type="button" style={{ fontWeight: "bold" }} onClick={() => this.cancelFunc()} class="btn btn-primary">Cancel</button>
                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>
                </div></div>


        );
    }

}
export default Attendance;