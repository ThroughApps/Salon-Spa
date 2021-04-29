import datepicker from 'jquery-ui/ui/widgets/datepicker';
import './datepicker.css';
import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';
import CryptoJS from 'crypto-js';
import registerServiceWorker from './registerServiceWorker';
import ReportMenuPage from './ReportMenuPage';
import ReportMenuPagePremium from './ReportMenuPagePremium';
import ReportMenuPageBasic from './ReportMenuPageBasic';
import { confirmAlert } from 'react-confirm-alert';
import FooterText from './FooterText';
import { appendFile } from 'fs';
import _ from 'underscore';
import moment from 'moment';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import EstimateReportEdit from './EstimateReportEdit';
import EstimateReportDisplay from './EstimateReportDisplay';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import './DownloadButton.css';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

var i;
var days1;
var  currentRow;
class GSTQuotationReportMonthYear extends Component {
  constructor(props) {
    super(props)
    var today = new Date();
    today = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
     var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
   
  
    this.state = {
      date: today,
          
            companyId: companyId,
            companyName: companyName,
            totalSubTotal: '0',
            totalBalance:'0',
            data:[],
            columns:[],
    }

  }
  componentDidMount() {
    window.scrollTo(0, 0);
    $("#tableHeadings").hide();
    $("#totalSale").hide();
    $(document).ready(function () {
        $("#myInput").on("keyup", function () {
          var value = $(this).val().toLowerCase();
          $("#myTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });
    $("#nodata").hide();
    $("#totalSale").hide();
    $("#myInput").hide();


    $(".hideContent").hide();
    var self = this;
    $(".monthPicker").datepicker({
      dateFormat: "MM yy",
      changeMonth: true,
      changeYear: true,
      showButtonPanel: true,
      yearRange: new Date().getFullYear() - 10 + ":" + new Date().getFullYear(),
      onClose: function(dateText, inst) {
        var month = $(
          "#ui-datepicker-div .ui-datepicker-month :selected"
        ).val();
        var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
        $(this).val($.datepicker.formatDate("MM yy", new Date(year, month, 1)));
        var selectedMonth = Number(month) + 1;
        self.state.monthName = moment().month(selectedMonth-1).format('MMMM');
        self.state.dispyear=year;
        self.GetMonthData(selectedMonth, year);
      }
    });

    $(".monthPicker").focus(function() {
      $(".ui-datepicker-calendar").hide();
      $("#ui-datepicker-div").position({
        my: "center top",
        at: "center bottom",
        of: $(this)
      });
    });
    
  }

  GetMonthData(selectedMonth, year) {
    var today = new Date();
    var currentMonth = today.getMonth() + 1;
    days1 = new Date(year, selectedMonth, 0).getDate();
    
    if (
      selectedMonth == "01" ||
      selectedMonth == "03" ||
      selectedMonth == "05" ||
      selectedMonth == "07" ||
      selectedMonth == "08" ||
      selectedMonth == "10" ||
      selectedMonth == "12"
    ) {
      if (selectedMonth == currentMonth) {
        this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
        this.state.toDate = year + "-" + selectedMonth + "-" + today.getDate();
      } else {
        this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
        this.state.toDate = year + "-" + selectedMonth + "-" + "31";
      }

      this.setState({
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
        month: this.state.month
      });
    } else if (
      selectedMonth == "04" ||
      selectedMonth == "06" ||
      selectedMonth == "09" ||
      selectedMonth == "11"
    ) {
      if (selectedMonth == currentMonth) {
        this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
        this.state.toDate = year + "-" + selectedMonth + "-" + today.getDate();
      } else {
        this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
        this.state.toDate = year + "-" + selectedMonth + "-" + "30";
      }
      this.setState({
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
        month: this.state.month
      });
    } else if (selectedMonth == "02") {
      if (year % 100 == 0 && year % 400 == 0 && year % 4 == 0) {
        if (selectedMonth == currentMonth) {
          this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
          this.state.toDate =
            year + "-" + selectedMonth + "-" + today.getDate();
        } else {
          this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
          this.state.toDate = year + "-" + selectedMonth + "-" + "29";
        }
        this.setState({
          fromDate: this.state.fromDate,
          toDate: this.state.toDate,
          month: this.state.month
        });
      } else {
        if (selectedMonth == currentMonth) {
          this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
          this.state.toDate =
            year + "-" + selectedMonth + "-" + today.getDate();
        } else {
          this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
          this.state.toDate = year + "-" + selectedMonth + "-" + "28";
        }
        this.setState({
          fromDate: this.state.fromDate,
          toDate: this.state.toDate,
          month: this.state.month
        });
      }
    }

 
    this.Submit();
  }
  Submit() {
  
    var CurrentDate = new Date();
    var GivenDate = new Date(this.state.fromDate);
    var self=this;
    if (this.state.fromDate.trim().length > 0 && this.state.toDate.trim().length > 0) {
      if (GivenDate > CurrentDate) {
        this.state.fromDate = "";
        this.state.today = "";
       
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: "You Cannot See Reports For Future Dates.", 
          showConfirmButton: false,
          timer: 2000
        })
        $(".monthPicker").val("");
      } else {
   
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
   
    this.setState({
      companyId: this.state.companyId,
    
      month: this.state.month,
    });
    // alert("fromDate:"+this.state.fromDate);
    // alert("toDate:"+this.state.toDate);
    // alert("companyId:"+this.state.companyId);
    var self = this;
    self.state.data=[];
    $.ajax({
        type: 'POST',
        data: JSON.stringify({
            fromDate:this.state.fromDate,
            toDate:this.state.toDate,
            companyId:this.state.companyId,
       
    }),
    url: " http://15.206.129.105:8080/MerchandiseAPI/quotation/gstquotationreportmonthyear",
    contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {
            self.state.totalSubTotal="";
            $(".hideContent").show();
var no;
if(data.gstquotationreportlist.length!=0){
    $("#tableHeadings").empty();
    var tab = '<thead><tr class="headcolor"><th>S.No</th><th>Invoice</th><th>date</th><th>Name</th><th>Contact</th><th>Address</th><th>Total</th></tr></thead>';
    var ivalue=0;
    $.each(data.gstquotationreportlist, function (i, item) {
      no=parseInt(i)+1;
      tab += '<tbody id= "myTable" ><tr id="tabletextcol" ><td>' + no + '</td><td>' + item.invoiceNo + '</td><td>' + item.date + '</td><td>' + item.customerName + '</td><td>' + item.contactNo + '</td><td>' + item.address +'</td><td>' + item.subtotal1 + '</td></tr></tbody>';
      self.state.totalSubTotal=Number(self.state.totalSubTotal)+Number(item.subtotal1);

      self.setState({
        totalSubTotal:self.state.totalSubTotal,
      })
      self.state.data[i] = {
        "SNo":no,
        "Invoice":  item.invoiceNo,
        "Date":item.date,
        "Name":item.customerName,
        "Contact": item.contactNo,
        "Address": item.address,        
        "Total":item.subtotal1,
       
        };
    
        ivalue=i;

    });

    self.state.data[Number(ivalue)+1] = {
      "SNo":"",
      "Invoice": "",
      "Date":"",
      "Name":"",
      "Contact": "",
      "Address":<div style={{fontWeight:"600"}}>{"Total Amount"}</div>,
      "Total":<div style={{fontWeight:"600"}}>{self.state.totalSubTotal}</div>
     };
 self.state.columns = self.GetColumns();
 
    $("#tableHeadings").append(tab);
    $("#nodata").hide();
  
  }else{
    $("#nodata").show();
    $("#myInput").hide();
    $("#totalSale").hide();    
    $("#test-table-xls-button").hide();
    $("#tableHeadings").empty();
}
self.setState({
  data:self.state.data,
  columns:self.state.columns
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
} else {
  
  Swal.fire({
    position: 'center',
    icon: 'error',
    title: "Select Month And Year", 
    showConfirmButton: false,
    timer: 2000
  })

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


BackbtnFunc() {
  var planName = CryptoJS.AES.decrypt(localStorage.getItem("PlanName"),"shinchanbaby").toString(CryptoJS.enc.Utf8);

//	 alert("plantype"+planName);
 if(planName.toLowerCase() =="basic"){
    
     ReactDOM.render(
         <Router>
             <div >
                 <Route exact path="/" component={ReportMenuPageBasic} />
             
                 </div>
         </Router>, document.getElementById('contentRender'));
     registerServiceWorker();
 }
 else if(planName.toLowerCase() =="premium"){
   
     ReactDOM.render(
         <Router>
             <div >			
                 <Route exact path="/" component={ReportMenuPagePremium} />
              
             </div>
         </Router>,
            document.getElementById('contentRender'));
     registerServiceWorker();
 }
else if(planName.toLowerCase() =="elite"){


 ReactDOM.render(
     <Router>
         <div >	
             <Route exact path="/" component={ReportMenuPage} />
           
             </div>
     </Router>, 
     document.getElementById('contentRender'));
 registerServiceWorker();
}

}

 
  render() {
    const downloadButtonData = <span style={{ fontWeight: "700", fontWeight: "900", fontSize: "15px" }}>Download</span>


    return (
      <div className="container" style={{ paddingTop: "0px", paddingBottom: "10px" }}>
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
     <h4 className="centerAlign " style={{ textAlign: "center" }}>GSTQuotation Report  <span className="centerAlign hideContent"> for {this.state.monthName} {this.state.dispyear}</span> </h4>
        <div class="btn-group" style={{ marginBottom: "0%" }}>
        <label for="month">Select Month and Year:  </label>
          <input
            type="text"
            id="month"
            name="month"
            style={{ color: "black", marginBottom: "0px" }}
            class="monthPicker form-control"
            autocomplete="off"
            placeholder="Select Month And Year"
          />
                </div>
                <div class="row">
          <div class="col-lg-9 col-md-9 col-sm-6 col-xs-6">

          </div>
          <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6">
            <div class="buttonright" >
            <ReactHTMLTableToExcel

id="test-table-xls-button"
className="download-table-xls-button"
table="tableHeadings"
filename="GSTQuotation_List"
sheet="tablexls"
buttonText="Download" />
            </div>
          </div>
        </div>

        <div id="tableOverflow">
          <table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">

          </table>
        </div>
        <br />  <div class="row" id="totalSale" style={{marginBottom:"5%"}}>
                            <div class="col-lg-8 col-md-8 text-right">
                            </div>
                            <div class="col-lg-4 col-md-4 text-right">

                                <div class="table-responsive">
                                <table class="table table-bordered">
                                        <tbody><tr>
                                            <th style={{ width: "30%" }}>Total Amount:</th>
                                            <td style={{ width: "30%" ,color: "red",textAlign:"left" }}>₹ <span style={{ color: "red",textAlign:"left" }} id="ContentPlaceHolder1_lbl_subtotal">{this.state.totalSubTotal}</span></td>
                                        </tr>
                                      
                                        </tbody></table>

                                </div>
                            </div>
</div>
        {/* <div id="nodata"><p>No Data</p></div> */}
        <ReactTable style={{overflow:"auto"}}
              data={this.state.data}
              columns={this.state.columns}
              noDataText="No Data Available"
              filterable={true}
              defaultPageSize={5}
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
          
            />


      </div>









    );
  }

}
export default GSTQuotationReportMonthYear;