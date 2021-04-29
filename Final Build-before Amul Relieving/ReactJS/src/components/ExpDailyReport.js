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
import ReportMenuPage from './ReportMenuPage';
import ReportMenuPagePremium from './ReportMenuPagePremium';
import ReportMenuPageBasic from './ReportMenuPageBasic';
import ExpenseReportEdit from './ExpenseReportEdit';
import ExpenseReportView from './ExpenseReportView';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import './DownloadButton.css';

var  currentRow;
class ExpDailyReport extends Component {

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
        columns: [],
        dataList: [],
        
      };



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

componentDidMount(){
  $("#nodata").hide();
  $("#tableHeadings").hide();
    this.GetData();
    window.scrollTo(0, 0);
}
GetData(){

  var self=this;

    $.ajax({
        type: 'POST',
        data: JSON.stringify({
            date:this.state.date,
            companyId:this.state.companyId,
        }),
       url: " http://15.206.129.105:8080/MerchandiseAPI/ExpenseReport/DailyExpenseReport",
        contentType: "application/json",
        dataType: 'json',
        async: false,
  
        success: function (data, textStatus, jqXHR) {
     var no;
     self.state.dataList=[];
   if(data.length!=0){ 
    var tab = '<thead><tr class="headcolor"><th>S.No</th><th>CategoryName</th><th>UserName</th><th>Amount</th><th>Date</th></tr></thead>';
   
   $.each(data, function (i, item) {
      no=parseInt(i)+1;

      tab += '<tbody id= "myTable" ><tr  id="tabletextcol" ><td>' + no + '</td><td>' + item.categoryName + '</td><td>' + item.userName + '</td><td>' + item.amount + '</td><td>' + item.date + '</td></tr></tbody>';

        self.state.dataList[i] = {
          "SNo":no,
          "CategoryName":item.categoryName,
          "UserName":item.userName,
          "Amount":item.amount,
          "Date":item.date,            
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

        self.state.totalSubTotal=Number(self.state.totalSubTotal)+Number(item.amount);

self.setState({
  totalSubTotal:self.state.totalSubTotal,
})
      });
      $("#tableHeadings").append(tab);
      if (self.state.dataList.length > 0) {
        self.state.columns = self.getColumns();
      }
    
    }else{
        $("#nodata").show();
        $("#totalSale").hide();
        $("#test-table-xls-button").hide();
        $("#myInput").hide();
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

getColumns() {
  return Object.keys(this.state.dataList[0]).map(key => {
      
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
        var categoryName =rowInfo.original["CategoryName"];
        var userName = rowInfo.original["UserName"];
        var amount =rowInfo.original["Amount"];
        var date = rowInfo.original["Date"];
     
      
       
        this.state.id = id;
        this.state.categoryName = categoryName;
        this.state.userName = userName;
        this.state.amount = amount;
        this.state.date = date;
        this.state.oldCategoryName = this.state.categoryName;
        this.state.oldUserName = this.state.userName ;
        this.state.oldAmount = this.state.amount;   
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
        var id =  rowInfo.original["ExpenseId"];
        var date =rowInfo.original["Date"];
        var categoryName =rowInfo.original["CategoryName"];
      
     
        this.state.id = id;
        this.state.date = date;
        this.state.categoryName = categoryName;
        this.setState({
          id: this.state.id,
          date:this.state.date,
          categoryName:this.state.categoryName,
        });
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
        var categoryName =rowInfo.original["CategoryName"];
        var userName = rowInfo.original["UserName"];
        var amount =rowInfo.original["Amount"];
        var date = rowInfo.original["Date"];
      
       
       
       
        this.state.id = id;
        this.state.categoryName = categoryName;
        this.state.userName = userName;
        this.state.amount = amount;
        this.state.date = date;
 
        self.setState({
          categoryName:self.state.categoryName,
          userName:self.state.userName,
          amount:self.state.amount,
          date:self.state.date,
  
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

          var array = [...self.state.dataList]; // make a new copy of array instead of mutating the same array directly.
          array.splice(rowIndexValue, 1);
          self.state.dataList=[];
          self.state.dataList=array;
          self.setState({dataList: array});

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





handleUserInput =(e) =>{

    const name = e.target.name;
    const value = e.target.value;
    this.setState({
         [name]: value 
        },
        );

}
printdiv(printarea) {
  var originalContents = document.body.innerHTML;
  $("#test-table-xls-button").hide();
  $("#backbutton").hide();
  $("#print").hide();
  $("#myInput").hide();
  $("#sidebar").hide();
  $("#navbar_company_name").hide();


window.print(originalContents);
$("#sidebar").show();
  $("#navbar_company_name").show();
  $("#backbutton").show();
  $("#print").show();
  $("#test-table-xls-button").show();
  $("#myInput").show();
  // $(w.document.body).html(html);

}





    render() {
      const  downloadButtonData=<span style={{fontWeight:"700",fontWeight: "900",fontSize:"15px"}}>Download</span>
    
        return (
          <div className="container" style={{ paddingTop: "0px" }}>
          <div class="card">
          <div className="row">
                          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4">
                          <ul class="previous disabled" id="backbutton"
                      style={{
                          backgroundColor: "#f1b6bf",
                          float: "none",
                          display: "inline-block",
                          marginLeft: "5px",
                          borderRadius: "5px",
                          padding: "3px 7px 3px 7px",
                          marginTop:"13px",
                          display:"inline-block"
                      }}>
                      <a  href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i>Back</a></ul>
  
                          </div>
                          <div className="col-lg-9 col-md-9 col-sm-8 col-xs-8">
                          <div class="card-header">
                          <h3 style={{marginLeft:"150px"}}> {this.state.companyName}</h3>
                  
                  <h4 style={{marginLeft:"130px"}}>Expense Daily Report</h4>
             
                    
                      </div>
              </div>
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
filename="dailyExpense_list"
sheet="tablexls"
buttonText="Download" />


                    </div>
                    </div> 
                </div>
              <div id="tableOverflow">
          <table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">

          </table>
        </div>
        <div class="card-body">
          <div class="form-horizontal form-bordered">
          
      </div>
  
          <div style={{ display: "grid" }}>
            <div id="tableOverflow" class="hideContent">
          
              <ReactTable style={{overflow:"auto"}}
                data={this.state.dataList}
                columns={this.state.columns}
                noDataText="No Data Available"
                filterable
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
  
          <h4 id="nodata" class="hideContent" style={{ textAlign: "center" }}>
            No Data
        </h4>
  
        </div>
     
      </div>
            </div>



);
}
}

export default ExpDailyReport;