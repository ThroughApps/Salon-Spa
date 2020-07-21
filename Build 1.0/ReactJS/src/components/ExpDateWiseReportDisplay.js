import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import $ from 'jquery';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ReportMenuPage from './ReportMenuPage';
import ReportMenuPagePremium from './ReportMenuPagePremium';
import ReportMenuPageBasic from './ReportMenuPageBasic';
import ExpenseReportEdit from './ExpenseReportEdit';
import ExpenseReportView from './ExpenseReportView';
import ExpDateWiseReport from './ExpDateWiseReport';
import CryptoJS from 'crypto-js';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import './DownloadButton.css';

var  currentRow;

class ExpDateWiseReportdisplay extends Component {


    constructor(data) {
        super(data)

      var today = new Date();
      var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
      var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
     
      var year= today.getFullYear() ;
       
        this.state = {
            year: year,
            fromDate:'',
            toDate:'',
            companyId:companyId,
            companyName:companyName,
            totalSubTotal:'0',
             data:[],
      columns:[],
          };
    
    
    
    }

    

componentDidMount(){

    $("#nodata").hide();
    $("#nodata").hide();
    $("#totalSale").hide();
    $("#myInput").hide();    
    $("#tableOverflow").hide();

 $("#companyname").hide();
 $("#reportheader").hide();
    var self=this;
    
      var no;
      
self.state.data=[];
self.setState({
  data:self.state.data,
})
var ivalue=0;

       if(this.props.data.length!=0){
          var tab = '<thead><tr class="headcolor"><th>S.No</th><th>CategoryName</th><th>UserName</th><th>Amount</th><th>Date</th></tr></thead>';
          $.each(this.props.data, function (i, item) {
            no=parseInt(i)+1;
            tab += '<tbody id= "myTable" ><tr  id="tabletextcol" ><td>' +no + '</td><td>' + item.categoryName + '</td><td>' + item.userName + '</td><td>' + item.amount + '</td><td>' + item.date + '</td>'
            +'</tr></tbody>';
    
            self.state.totalSubTotal=Number(self.state.totalSubTotal)+Number(item.amount);

self.setState({
  totalSubTotal:self.state.totalSubTotal,
})

self.state.data[i] = {
  "SNo":no,
  "Date": item.date,
  "CategoryName":  item.categoryName,
  "UserName":item.userName,     
  "Amount":item.amount,
  "ExpenseId":item.id,

  "Delete":< div class="updatedevice" id="updatedevice" style={{ textAlign: "center" }}><span style={{ fontSize: '1em', color: 'white' }}>
  <i class="fa fa-trash" style={{
      border: "none",
      padding: "6px 7px 5px 7px",
      fontSize: "1em",
      color: "white",
      borderRadius: "18px",
      backgroundColor: "tomato"
    
  }}>  </i>
</span></div>,
  "View": < div class="updatedevice" id="updatedevice" style={{ textAlign: "center" }}><span style={{ fontSize: '1em', color: 'white' }}>
  <i class="glyphicon glyphicon-eye-open" style={{
      border: "none",
      padding: "6px 7px 5px 7px",
      fontSize: "1em",
      color: "white",
      borderRadius: "18px",
      backgroundColor: "#337ab7"
  }}></i>
</span></div>,
  "Update":  < div class="updatedevice" id="updatedevice" style={{ textAlign: "center" }}><span style={{
    fontSize: '1em', color: 'white', padding: "3px 3px 5px 4px",
    fontSize: "1em",
    borderRadius: "12px",
    backgroundColor: "mediumseagreen"
}}>
    <i class="glyphicon glyphicon-pencil" style={{ border: "none" }}></i>
</span></div>      

  };

  ivalue=i;

          });
          $("#tableHeadings").append(tab);
          $(".expenseId").hide();
         
   
          self.state.data[Number(ivalue)+1] = {
            "SNo":"",
            "Date": "",
            "CategoryName": "",
            "UserName":<div style={{fontWeight:"600"}}>{"Total"}</div>,
            "Amount":<div style={{fontWeight:"600"}}>{self.state.totalSubTotal}</div>    
          };
    
          self.state.columns = self.GetColumns();
      
          
        }else{
            $("#nodata").show();
            $("#totalSale").hide();
            $("#test-table-xls-button").hide();
            $("#myInput").hide();

        }
        self.setState({
          data:self.state.data,
          columns:self.state.columns
        })
       
    
    
    
     

      $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    }

    GetColumns() {
      return Object.keys(this.state.data[0]).map(key => {
          
        if (
          key != "ExpenseId" 
        ) {
          return {
            Header: key,
            accessor: key
          };
        } else {
          return {
            Header: key,
            accessor: key,
            show: false
          };
        }
      });
    }

onRowClick = (state, rowInfo, column, instance) => {
  var self=this;
  return {

    onClick: (e, handleOriginal) => {

      if (column.Header === "Update") {

        var rowIndexValue = rowInfo["index"];
       
        var id =rowInfo.original["ExpenseId"];
        var date =rowInfo.original["Date"];
        var categoryName = rowInfo.original["CategoryName"];
        var userName =rowInfo.original["UserName"];
        var amount = rowInfo.original["Amount"];
   
     self.state.categoryName=categoryName;
     self.state.userName=userName;
     self.state.amount=amount;
     self.state.date=date;
     self.state.id=id;
      

        self.state.oldCategoryName=self.state.categoryName;
        self.state.oldUserName= self.state.userName;
        self.state.oldAmount=self.state.amount;
        self.state.oldDate=self.state.date;

       self.setState({

        categoryName:self.state.categoryName,
        userName:self.state.userName,
        amount:self.state.amount,
        date:self.state.date,
        oldCategoryName:self.state.oldCategoryName,
        oldUserName:self.state.oldUserName,
        oldAmount:self.state.oldAmount,
        oldDate:self.state.oldDate,
        id:self.state.id

    })
    ReactDOM.render(<ExpenseReportEdit categoryName={self.state.categoryName} 
      userName={self.state.userName} amount={self.state.amount}  date={self.state.date}
      oldCategoryName={self.state.oldCategoryName} oldUserName={self.state.oldUserName} oldAmount={self.state.oldAmount} oldDate={self.state.oldDate} id={self.state.id} />, document.getElementById("contentRender"));


      } else if (column.Header === "Delete") {

        var rowIndexValue = rowInfo["index"];
       
        var id =rowInfo.original["ExpenseId"];
        var date =rowInfo.original["Date"];
        var categoryName = rowInfo.original["CategoryName"];
        var userName =rowInfo.original["UserName"];
        var amount = rowInfo.original["Amount"];
   
     self.state.categoryName=categoryName;
     self.state.userName=userName;
     self.state.amount=amount;
     self.state.date=date;
     self.state.id=id;
     self.state.totalSubTotal=amount;
      

     self.setState({

      categoryName:self.state.categoryName,
      userName:self.state.userName,
      amount:self.state.amount,
      date:self.state.date,
      totalSubTotal:self.state.amount,
      id:self.state.id

  })

        var rowIndexValue=rowInfo.index;
      

        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Do you Want to Delete '+self.state.categoryName,
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it'
       //   timer: 1500
        }).then((result) => {
          if (result.value) {
            self.DeleteFunc(rowIndexValue) 

          // For more information about handling dismissals please visit
          // https://sweetalert2.github.io/#handling-dismissals
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              position:'center',
              icon:'warning',
              title:'Cancelled Deletion Of '+self.state.categoryName,
              showConfirmButton: false,
              timer:2000,
            })
          }
        })


      } else if (column.Header === "View") {

        var rowIndexValue = rowInfo["index"];
       
       
        var id =rowInfo.original["ExpenseId"];
        var date =rowInfo.original["Date"];
        var categoryName = rowInfo.original["CategoryName"];
        var userName =rowInfo.original["UserName"];
        var amount = rowInfo.original["Amount"];
   
     self.state.categoryName=categoryName;
     self.state.userName=userName;
     self.state.amount=amount;
     self.state.date=date;
     self.state.id=id;
      

       self.setState({

        categoryName:self.state.categoryName,
        userName:self.state.userName,
        amount:self.state.amount,
        date:self.state.date,
   
        id:self.state.id

    })
    ReactDOM.render(<ExpenseReportView categoryName={self.state.categoryName} 
      userName={self.state.userName} amount={self.state.amount}  date={self.state.date}
      oldCategoryName={self.state.oldCategoryName} oldUserName={self.state.oldUserName} oldAmount={self.state.oldAmount} oldDate={self.state.oldDate} id={self.state.id} />, document.getElementById("contentRender"));
      }
    }
  };
};


DeleteFunc(rowIndexValue)
{
    var self=this;

    $.ajax({
        type: 'POST',
        data: JSON.stringify({
            id:self.state.id,
            date:self.state.date,
            companyId:this.state.companyId,
        }),
       url: " http://15.206.129.105:8080/MerchandiseAPI/ExpenseReport/DailyExpenseReportDelete",
        contentType: "application/json",
        dataType: 'json',
        async: false,
  
        success: function (data, textStatus, jqXHR) {

            self.state.totalSubTotal=Number(self.state.totalSubTotal)-Number(self.state.amount);

            self.setState({
              totalSubTotal:self.state.totalSubTotal,
            })

            var array = [...self.state.data]; // make a new copy of array instead of mutating the same array directly.
            array.splice(rowIndexValue, 1);
            self.state.data=[];
            self.state.data=array;
            self.setState({data: array});

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
          
            <Route path="/" component={ExpDateWiseReport} />
          
    
          </div>
        </Router>,
        document.getElementById('contentRender'));
      registerServiceWorker();
    }
    

    printdiv(printarea) {
      var originalContents = document.body.innerHTML;
      $("#test-table-xls-button").hide();
      $("#backbutton").hide();
      $("#print").hide();
      $("#myInput").hide();
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
      $("#myInput").show();
      $("#companyname").hide();
      $("#reportheader").hide(); 
      $("#companyHeader").show();
      $("#reportHeader").show();
  
      // $(w.document.body).html(html);
  
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
                  
                  <h4  id="reportHeader" style={{marginLeft:"130px"}}>Expense Datewise Report</h4>
             
                    
                      </div>
                    </div> 
                    <div class="col-sm-4 ">
                        <div class="row">
                            <div class="col-sm-3 pull-right">   <button type="button" id="print" class="btn btn-default " onClick={() => this.printdiv('printarea')} ><i class="fa fa-print" aria-hidden="true" style={{ fontSize: "17px", border: "none" }}> Print1</i></button>
                            </div>
                            <div class="col-sm-3 pull-right">
                            </div>   </div>
                    </div>    </div>  <div id="printarea">
                         <div style={{ display: "grid" }}>
                         <h3 id="companyname" style={{marginLeft:"150px"}}> {this.state.companyName}</h3>
  <h4 id="reportheader" style={{marginLeft:"130px"}}>Expense Datewise Report</h4>   
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
filename="Expense_List"
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
                                            <th style={{ width: "30%" }}>Total:</th>
                                            <td style={{ width: "30%" ,color: "red",textAlign:"left" }}>₹ <span style={{ color: "red",textAlign:"left" }} id="ContentPlaceHolder1_lbl_subtotal">{this.state.totalSubTotal}</span></td>
                                        </tr>

                                        </tbody></table>


                                </div>
                            </div>
</div>
            </div>
    
    {/* <h2 id="nodata" style={{textAlign:"center"}}>No Data</h2>
   */}

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
    </div>
    </div>
    );
    }
    }
    
    export default ExpDateWiseReportdisplay;
    