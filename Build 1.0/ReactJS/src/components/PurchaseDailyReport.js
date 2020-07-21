import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


import $ from 'jquery';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
//import SalesReportEdit from './SalesReportEdit';
import PurchaseReportDisplay from './PurchaseReportDisplay';
import ReportMenuPage from './ReportMenuPage';
import ReportMenuPagePremium from './ReportMenuPagePremium';
import ReportMenuPageBasic from './ReportMenuPageBasic';
import PurchaseReportEdit from './PurchaseReportEdit';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import './DownloadButton.css';

var  currentRow;

class PurchaseDailyReport extends Component {

    constructor() {
        super()
    var today = new Date();
    var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state = {
        date: today1,
        companyId:companyId,
        companyName:companyName,
        totalSubTotal:'0',
        totalBalance:'0',
        data:[],
        columns:[],
      };



}


componentDidMount(){

$("#nodata").hide();
$("#tableHeadings").hide();
$("#totalSale").hide();
$("#companyname").hide();
$("#reportheader").hide();
var self=this;
self.state.data=[];
self.setState({
  data:self.state.data,
})

    $.ajax({
        type: 'POST',
        data: JSON.stringify({
            date:this.state.date,
            companyId:this.state.companyId,
        }),
       url: " http://15.206.129.105:8080/MerchandiseAPI/PurchaseReport/DailyPurchaseReport",
        contentType: "application/json",
        dataType: 'json',
        async: false,
  
        success: function (data, textStatus, jqXHR) {
            var no;
   if(data.length!=0){
      var tab = '<thead><tr class="headcolor"><th>S.No</th><th>Invoice</th><th>Date</th><th>Name</th><th>Contact</th><th>Status</th><th>Total</th><th>Balance</th>/tr></thead>';
      var ivalue=0;
      $.each(data, function (i, item) {
        no=parseInt(i)+1;
        tab += '<tbody id= "myTable" ><tr id="tabletextcol" ><td>' + no + '</td><td>' + item.invoiceNo + '</td><td>' + item.date + '</td><td>' + item.userName + '</td><td>' + item.contact + '</td>'
        +'<td>'+item.status+'</td><td>'+item.subtotal1+'</td><td>'+item.finalAmountTotal+'</td></tr></tbody>';
        self.state.totalSubTotal = Number(self.state.totalSubTotal) + Number(item.subtotal1);
        self.state.totalBalance=Number(self.state.totalBalance)+Number(item.finalAmountTotal);
   
        self.setState({
            totalSubTotal:self.state.totalSubTotal,
            totalBalance:self.state.totalBalance,
          })

          self.state.data[i] = {
            "SNo":no,
            "Invoice":  item.invoiceNo,
            "Date":item.date,
            "Name":item.userName,
            "Contact": item.contact,
            "Status":item.status,
            "Total":item.subtotal1,
            "Balance(+GST)":item.finalAmountTotal
            };
        
            ivalue=i;
  
    });


      $("#tableHeadings").append(tab);
  self.state.data[Number(ivalue)+1] = {
        "SNo":"",
        "Invoice": "",
        "Date":"",
        "Name":"",
        "Contact": "",
        "Status":"",
        "Total":<div style={{fontWeight:"600"}}>{"Total Amount"}</div>,
        "Balance(+GST)":<div style={{fontWeight:"600"}}>{self.state.totalSubTotal}</div>
        };

        self.state.data[Number(ivalue)+2] = {
          "SNo":"",
          "Invoice": "",
          "Date":"",
          "Name":"",
          "Contact": "",
          "Status":"",
          "Total":<div style={{fontWeight:"600"}}>{"Balance Amount"}</div>,
          "Balance(+GST)":<div style={{fontWeight:"600"}}>{ self.state.totalBalance}</div>
          };
          self.state.columns = self.GetColumns();
    }else{
        $("#nodata").show();
        $("#totalSale").hide();
        $("#test-table-xls-button").hide();
    }
    
    },
    error: function (data) {
      
      confirmAlert({
        title: 'No Internet',                        // Title dialog
        message: 'Network Connection Problem',               // Message dialog
        confirmLabel: 'Ok',                           // Text button confirm
      });
  
    }
  });




}
GetColumns(){

  return Object.keys(this.state.data[0]).map(key => {
         
      return {
        Header: key,
        accessor: key,
 
    };
    
  });
}


handleUserInput =(e) =>{

    const name = e.target.name;
    const value = e.target.value;
    this.setState({
         [name]: value 
        },
        );

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


  printdiv(printarea) {
    var originalContents = document.body.innerHTML;
    $("#test-table-xls-button").hide();
    $("#backbutton").hide();
    $("#print").hide();

    $("#sidebar").hide();
    $("#navbar_company_name").hide();

    $("#companyname").show();
    $("#reportheader").show();
    $("#companyHeader").hide();
    $("#reportHeader").hide();
   
 window.print(originalContents);
 $("#sidebar").show();
    $("#navbar_company_name").show();
    $("#backbutton").show();
    $("#print").show();
    $("#test-table-xls-button").show();
    // $(w.document.body).html(html);
    $("#companyname").hide();
    $("#reportheader").hide(); 
    $("#companyHeader").show();
    $("#reportHeader").show();

}


    render() {
      const  downloadButtonData=<span style={{fontWeight:"700",fontWeight: "900",fontSize:"15px"}}>Download</span>
    
        return (


            <div class="container" style={{height:"20px"}}>
<div class="card">
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
                    <div class="card-header">
                          <h3 id="companyHeader" style={{marginLeft:"150px"}}> {this.state.companyName}</h3>
                  
                  <h4  id="reportHeader" style={{marginLeft:"130px"}}>Purchase Daily Report</h4>
             
                    
                      </div>
                    </div> 
                    <div class="col-sm-4 ">
                        <div class="row">
                            <div class="col-sm-3 pull-right">   <button type="button" id="print" class="btn btn-default " onClick={() => this.printdiv('printarea')} ><i class="fa fa-print" aria-hidden="true" style={{ fontSize: "17px", border: "none" }}> Print1</i></button>
                            </div>
                            <div class="col-sm-3 pull-right">
                            </div>   </div>
                    </div>    </div>   
                    <div id="printarea">
                    
                                <div style={{ display: "grid" }}>
                                <h3 id="companyname" style={{marginLeft:"150px"}}> {this.state.companyName}</h3>
  <h4 id="reportheader" style={{marginLeft:"130px"}}>Purchase Daily Report</h4>   <hr></hr>
</div>
       



     <div    style={{ display: "grid" }}>

          <div class="row">
                  <div class="col-lg-9 col-md-9 col-sm-6 col-xs-6">
                    
                    </div> 
                    <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                    <div class="buttonright" >

                    <ReactHTMLTableToExcel

id="test-table-xls-button"
className="download-table-xls-button"
table="tableHeadings"
filename="DailyPurchase_List"
sheet="tablexls"
buttonText="Download" />


                    </div>
                    </div> 
                </div>         

        <div id="tableOverflow">
          <table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">

          </table>
        </div>
        <br />  <div class="row" id="totalSale">
                            <div class="col-lg-8 col-md-8 text-right">
                            </div>
                            <div class="col-lg-4 col-md-4 text-right">

                                <div class="table-responsive">
                                    <table class="table table-bordered">
                                        <tbody><tr>
                                            <th style={{ width: "30%" }}>Total Amount:</th>
                                            <td style={{ width: "30%" ,color: "red",textAlign:"left" }}>₹ <span style={{ color: "red",textAlign:"left" }} id="ContentPlaceHolder1_lbl_subtotal">{this.state.totalSubTotal}</span></td>
                                        </tr>
                                        <tr>
                                            <th style={{ width: "30%" }}>Balance Amount:</th>
                                            <td style={{ width: "30%" ,color: "red",textAlign:"left" }}>₹ <span style={{ color: "red",textAlign:"left" }} id="ContentPlaceHolder1_lbl_subtotal">{this.state.totalBalance}</span></td>
                                        </tr>

                                        </tbody></table>


                                </div>
                            </div>
</div>

        </div>

{/* <h2 id="nodata" style={{textAlign:"center"}}>No Data</h2> */}
<ReactTable  style={{overflow:"auto"}}
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


</div>
    </div>

);
}
}

export default PurchaseDailyReport;