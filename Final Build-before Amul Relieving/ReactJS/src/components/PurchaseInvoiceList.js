import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
//import './gstdashboard.css';
import PurchaseReportEdit from './PurchaseReportEdit';
import PurchaseReportDisplay from './PurchaseReportDisplay';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import PurchaseReportUpdate from './PurchaseReportUpdate';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import './DownloadButton.css';
import "./MainPageRedirectButton.css";
import PurchaseInvoice1 from './PurchaseInvoice';

var  currentRow;
class PurchaseInvoiceList1 extends Component {
  constructor(data) {
    super(data)
    var today = new Date();
    var today1 = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
     var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
     var month= today.getMonth() + 1; 
     var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
     var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
     var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    
    
    this.state = {
      date: today1,
      companyId: companyId,
      month:month,
      staffId:staffId,
      employeeName:employeeName,
     role:role, 
      data:[],
      columns:[],
      

    };
  }
  componentDidMount() {   
    var today = new Date();

    $("#tableHeadings").hide();
    var today1 = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var month= today.getMonth() + 1; 
  

    var self=this;
    window.scrollTo(0, 0);
    this.setState({
        date: this.state.date,
     
      });
      var self=this;
      $.ajax({
        type: 'POST',
        data: JSON.stringify({
          companyId:this.state.companyId,
          month:month,
       
    }),
    url: " http://15.206.129.105:8080/MerchandiseAPI/vendororder/purchaseinvoicereport",
    contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {
          if(data.purchaseinvoicereportlist.length!=0){

    var tab = '<thead><tr class="headcolor"><th>S.No</th><th>Invoice</th><th>Date     </th><th>Vendor  </th><th>Description</th><th>Contact</th><th>Status</th><th>Total(Rs)</th><th>Shipping(Rs)</th><th>Balance(Rs)</th></tr></thead>';
    var no;
    $.each(data.purchaseinvoicereportlist, function (i, item) {
      no=parseInt(i)+1;

      if ((item.subtotal1 == item.finalAmountTotal) || (item.subtotal1 < item.finalAmountTotal ) ) {
        self.state.payment_status = "UnPaid";

        self.setState({
          payment_status: self.state.payment_status,
        })
      }
      if (item.finalAmountTotal == 0) {
        self.state.payment_status = "Paid";
        self.setState({
          payment_status: self.state.payment_status,
        })
      }

      if ((item.subtotal1 > item.finalAmountTotal) && (item.finalAmountTotal != 0)) {
        self.state.payment_status = "PartiallyPaid";
        self.setState({
          payment_status: self.state.payment_status,
        })
      }

     
      tab += '<tbody id= "myTable" ><tr id="tabletextcol" ><td>' + no + '</td>'
      +'<td>' + item.invoiceNo + '</td><td>' + item.date + '</td>'
      +'<td>' + item.vendorName + '</td><td>' + item.description + '</td><td>' + item.contactNo + '</td>'
      +'<td>' + self.state.payment_status +'</td><td>' + item.subtotal1 + '</td>'
      +'<td>' + item.shipping + '</td><td>' + item.finalAmountTotal + '</td></tr></tbody>';
  
     self.state.data[i] = {
      "SNo":no,
      "Invoice":  item.invoiceNo,
      "Date": item.date,
      "Vendor": item.vendorName ,
      "Description":item.description,
      "Contact": item.contactNo ,
      "Status":self.state.payment_status,
      "Total(Rs)":item.subtotal1 ,
      "Shiiping(Rs)":item.shipping,
      "Balance(Rs)":item.finalAmountTotal,
     "VendorId": item.vendorId ,
      "CompanyName": item.companyName,
      "orderNumber": item.orderNumber,
     "invoiceDate": item.invoiceDate ,
      "dueDate": item.dueDate,
      "address": item.address,
      "gstNo":item.gstNo ,
      "email": item.email ,
      "adjustment": item.adjustment ,
      "discount": item.discount,
     "Edit": < div class="updatedevice" id="updatedevice" style={{ textAlign: "center" }}><span style={{
        fontSize: '1em', color: 'white', padding: "3px 3px 5px 4px",
        fontSize: "1em",
        borderRadius: "12px",
        backgroundColor: "mediumseagreen"
    }}>
        <i class="glyphicon glyphicon-pencil" style={{ border: "none" }}></i>
    </span></div>,
    "Delete": < div class="updatedevice" id="updatedevice" style={{ textAlign: "center" }}><span style={{ fontSize: '1em', color: 'white' }}>
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
"Pay": < div class="updatedevice" id="updatedevice" style={{ textAlign: "center" }}><span style={{ fontSize: '1em', color: 'white' }}>
<i class='fas fa-wallet'  style={{
    border: "none",
    padding: "6px 7px 5px 7px",
    fontSize: "1em",
    color: "white",
    borderRadius: "18px",
    backgroundColor: "#2050ec"
}}></i>
</span></div>,
      
  };
    });

    self.state.columns = self.getColumns();

    $("#tableHeadings").append(tab);




   
         }
         else{
       
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

  NoAction() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={PurchaseInvoiceList1} />
        </div>
      </Router>,
      document.getElementById('contentRender'));
  
  }
DeleteFunc(rowIndexValue)
{
    var self=this;

    $.ajax({
        type: 'POST',
        data: JSON.stringify({
            id:self.state.id,
            date:self.state.date,
            contactNo:self.state.contactNo,
            companyId:self.state.companyId,
            staffId: self.state.staffId,
                   employeeName: self.state.employeeName,
                   role: self.state.role,
                   vendorName: self.state.vendorName,
        }),
       url: " http://15.206.129.105:8080/MerchandiseAPI/PurchaseReport/DailyPurchaseReportDelete",
        contentType: "application/json",
        dataType: 'json',
        async: false,
  
        success: function (data, textStatus, jqXHR) {

          var array = [...self.state.data]; // make a new copy of array instead of mutating the same array directly.
          array.splice(rowIndexValue, 1);
        
          self.state.data=[];
          self.state.data=array;
          self.setState({data: array});

         
          Swal.fire({
            position: 'center',
            icon: 'success',
            title:"Successfully Removed Invoice" + self.state.id,
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

getColumns(){

  return Object.keys(this.state.data[0]).map(key => {
   if (
  
     key != "VendorId" &&
     key != "CompanyName" &&
     key != "orderNumber" &&
     key != "invoiceDate" &&
     key != "dueDate" &&
     key != "address" &&
     key != "gstNo" &&
     key !="email" &&
     key !="adjustment" &&
     key !="discount"
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

         if (column.Header == "Edit") {

            if(rowInfo!=undefined){
         
             self.state.id = rowInfo.original["Invoice"];
            self.state.date = rowInfo.original["Date"];
            self.state.vendorName = rowInfo.original["Vendor"];
            self.state.contact = rowInfo.original["Contact"];
            self.state.status = rowInfo.original["Status"];
            self.state.balanceAmt = rowInfo.original["Balance(Rs)"];
            self.state.subtotal1 =rowInfo.original["Total(Rs)"];
            self.state.vendorId = rowInfo.original["VendorId"];
            self.state.companyName = rowInfo.original["CompanyName"];
            self.state.orderNumber =  rowInfo.original["orderNumber"];
            self.state.invoiceDate = rowInfo.original["invoiceDate"];
            self.state.dueDate = rowInfo.original["dueDate"];
            self.state.address = rowInfo.original["address"];
            self.state.gstNo = rowInfo.original["gstNo"];
            self.state.email = rowInfo.original["email"];
            self.state.adjustment = rowInfo.original["adjustment"];
            self.state.discount =rowInfo.original["discount"];

            self.state.shipping =rowInfo.original["Shiiping(Rs)"];

        
        self.setState({
          id: self.state.id,
          vendorName: self.state.vendorName,        
          date: self.state.date,
          vendorId: self.state.vendorId,
          companyName: self.state.companyName,
          orderNumber: self.state.orderNumber,
          invoiceDate: self.state.invoiceDate,
          dueDate: self.state.dueDate,
          address:self.state.address,
          gstNo:self.state.gstNo,
          email:self.state.email,
          adjustment:self.state.adjustment,
          discount:self.state.discount,
          shipping:self.state.shipping,
          contact:self.state.contact,
          status:self.state.status,
          balanceAmt:self.state.balanceAmt,
          subtotal1:self.state.subtotal1,
  
  
  
        })
  
  
        ReactDOM.render(<PurchaseReportUpdate id={self.state.id}
          date={self.state.date}  vendorName={self.state.vendorName} orderNumber={self.state.orderNumber} invoiceDate={self.state.invoiceDate} dueDate={self.state.dueDate} contact={self.state.contact}
          status={self.state.status} balanceAmt={self.state.balanceAmt} subtotal1={self.state.subtotal1} vendorId={self.state.vendorId} companyName={self.state.companyName} address={self.state.address}
          gstNo={self.state.gstNo} email={self.state.email} adjustment={self.state.adjustment} discount={self.state.discount} shipping={self.state.shipping} />, document.getElementById("contentRender"));
  
  
         
            }

           
         } else if (column.Header == "Delete") {
           
         
     

           if(rowInfo!=undefined){
         
            self.state.id = rowInfo.original["Invoice"]; // get current row 1st TD value
           self.state.date =rowInfo.original["Date"];
           self.state.vendorName = rowInfo.original["Vendor"];
           self.state.contactNo = rowInfo.original["Contact"];
     
     
           self.setState({
     
             id: self.state.id,
             date: self.state.date,
             vendorName: self.state.vendorName,
             contactNo: self.state.contactNo,
     
           })

         


           var rowIndexValue=rowInfo.index;
       
          
                      
            

             Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Do you Want to Delete '+self.state.id,
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
                  title:'Cancelled Deletion Of '+self.state.id,
                  showConfirmButton: false,
                  timer:2000,
                })
              }
            })

           }
         }else if (column.Header == "View") {
           
           if(rowInfo!=undefined){
       
        self.state.id =rowInfo.original["Invoice"];
   self.state.date = rowInfo.original["Date"];
   self.state.userName = rowInfo.original["Vendor"];// get current row 1st TD value
   self.state.contact = rowInfo.original["Contact"];
   self.state.status = rowInfo.original["Status"];
   
   self.state.subtotal1 = rowInfo.original["Total(Rs)"];
   self.state.vendorId =rowInfo.original["VendorId"];
   self.state.companyName =rowInfo.original["CompanyName"];
 self.state.description =rowInfo.original["Description"];
  self.state.finalAmountTotal=rowInfo.original["Balance(Rs)"];
  

 

self.setState({

   userName:self.state.userName,
   amount:self.state.amount,
   date:self.state.date,
   id:self.state.id,
   invoiceNo:self.state.invoiceNo,
   companyName:self.state.companyName,
   description:self.state.description,
})


ReactDOM.render(<PurchaseReportDisplay description={self.state.description} id={self.state.id} invoiceNo={self.state.invoiceNo}
   date={self.state.date} userName={self.state.userName}  contact={self.state.contact}
   companyName={self.state.companyName}  status={self.state.status} finalAmountTotal={self.state.finalAmountTotal} subtotal1={self.state.subtotal1} />, document.getElementById("contentRender"));


 
    }

         }else if(column.Header=="Pay"){
                
            
           
             if(rowInfo!=undefined){

           self.state.invoiceNo =rowInfo.original["Invoice"];
             self.state.date = rowInfo.original["Date"];
             self.state.userName =rowInfo.original["Vendor"]; // get current row 1st TD value
             self.state.contact = rowInfo.original["Contact"];
             self.state.status = rowInfo.original["Status"];
             self.state.finalAmountTotal =rowInfo.original["Balance(Rs)"];
             self.state.subtotal1 = rowInfo.original["Total(Rs)"];
             self.state.vendorId =rowInfo.original["VendorId"];
     
        
         
          self.setState({
      
              invoiceNo:self.state.invoiceNo,
              date:self.state.date,
              userName:self.state.userName ,
              contact:self.state.contact,
              status:self.state.status,
              finalAmountTotal:self.state.finalAmountTotal,
              subtotal1:self.state.subtotal1,
              vendorId:self.state.vendorId,
      
          })
      
        
      
      
        ReactDOM.render(<PurchaseReportEdit invoiceNo={self.state.invoiceNo} 
              date={self.state.date} userName={self.state.userName}  contact={self.state.contact}
              status={self.state.status} finalAmountTotal={self.state.finalAmountTotal} subtotal1={self.state.subtotal1} vendorId={self.state.vendorId} />, document.getElementById("contentRender"));
          
           
              }
             
         }
     }
 };
};

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

AddPurchaseInvoicePageFunc(){
  ReactDOM.render(
    <Router>
      <div>
      
        <Route path="/" component={PurchaseInvoice1} />
      

      </div>
    </Router>,
    document.getElementById('contentRender'));
  registerServiceWorker();
}
  render() {
    const  downloadButtonData=<span style={{fontWeight:"700",fontWeight: "900",fontSize:"15px"}}>Download</span>
  
    return (
        
      <div class="container">
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
              
                <div class="card">
                <div class="card-header" style={{backgroundColor:""}}>
        <h4 style={{fontWeight:"300",fontSize:"30px"}}>Purchase Invoice Report</h4>
      </div>
      <div>
      <div class="card-body">


      <div    style={{ display: "grid" }}>
      {/*
<div class="buttonright" >
<ReactHTMLTableToExcel
                   
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="tableHeadings"
                    filename="Purchase_Invoice_List"
                    sheet="tablexls"
                    buttonText="Download Invoice List"/>
                    </div>
                    */}
       <div className="row">
        <div className="col-sm-4 col-lg-8 col-md-8">
        
        </div>
        <div className="col-sm-4 col-lg-2 col-md-2">
        <a class="pageredirectbtn" href="#"  onClick={() => this.AddPurchaseInvoicePageFunc()}>
          <span style={{fontWeight:"700",fontWeight: "900",fontSize:"15px"}}>+ PurchaseInvoice</span>
         </a>
</div>
<div className="col-sm-4 col-lg-2 col-md-2">
    
<div class="buttonright" >
                  <ReactHTMLTableToExcel
                     id="test-table-xls-button"
                     className="download-table-xls-button"
                     table="tableHeadings"
                     filename="Purchase_Invoice_List"
                     sheet="tablexls"
					 className="pageredirectbtn download-table-xls-button "
                    buttonText={downloadButtonData}      />
                </div>

                <div id="tableOverflow">
          <table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">

          </table>
        </div>
  
</div>
        </div>
  
        </div>
        

                     <ReactTable style={{overflow:"auto"}}
              data={this.state.data}
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
</div>
      </div>
    );
  }

}

export default PurchaseInvoiceList1;