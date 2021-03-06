import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import { FormErrors } from './FormErrors';
import $ from 'jquery';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import SalesReportDisplay from './SalesReportDisplay';
import SalesDailyReport from './SalesDailyReport';
import ReportMenuPage from './ReportMenuPage';
import ReportMenuPagePremium from './ReportMenuPagePremium';
import ReportMenuPageBasic from './ReportMenuPageBasic';
import EstimateList from './EstimateList';
import CryptoJS from 'crypto-js';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import SelectSearch from 'react-select';
import "./MainPageRedirectButton.css";


var id;
var discount=0;
var pay=0;
class EstimateReportEdit1 extends Component {

    constructor(props) {
        super(props)
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    this.state = {
        date: date,
        discount:'0',
        pay:'0',
        paymentMode:'',
        dueAmount:this.props.balanceAmt,
        userName:this.props.userName,
        invoiceNo:this.props.invoiceNo,
        customerId:this.props.customerId,
        companyId:companyId,
        staffId:staffId,
        employeeName:employeeName,
       role:role,  
        data:[],
        columns:[],
   
        paymentoptions:[],
        formErrors: {  
        discount:'',
        pay:'',
        },

        discountValid : false,
        payValid : false,
        paymentModeValid : false,
      

      };
      this.setState({
        date: date,
       }) 

}

validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let discountValid  = this.state.discountValid ;
    let payValid  = this.state.payValid ;
     let paymentModeValid=this.state.paymentModeValid;
   
    switch (fieldName) {
        case 'discount':
    discountValid = value.match(/^(\d*\.)?\d+$/);
            fieldValidationErrors.Disount = discountValid ? '' : ' is InCorrect';
            break;
        case 'pay':
            payValid = value.match(/^(\d*\.)?\d+$/);
            fieldValidationErrors.Pay = payValid ? '' : ' is InCorrect';
            break;
      case 'paymentMode':
            paymentModeValid = value.length > 0;  
            fieldValidationErrors.PaymentMode = paymentModeValid ? '' : ' is InCorrect';
            break;

        default:
            break;
    }
    this.setState({
        formErrors: fieldValidationErrors,
        discountValid: discountValid,
        payValid: payValid,
        paymentModeValid:paymentModeValid,
       
    }, this.validateForm);
}
validateForm() {

    this.setState({
        formValid:
            this.state.discountValid
            && this.state.payValid
            && this.state.paymentModeValid
        

    });
}

errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
}




componentDidMount(){

  
$("#submit").hide();
$("#tableHeadings").hide();


var paymentOptions1=[];
paymentOptions1.push({ label:"Cash", value:"Cash"});
paymentOptions1.push({ label:"Card", value:"Card"});
paymentOptions1.push({ label:"Cheque", value:"Cheque"});
paymentOptions1.push({ label:"Online", value:"Online"});

this.state.paymentoptions=paymentOptions1;
this.setState({
  paymentoptions:this.state.paymentoptions
})

this.state.selectedPaymentMode={label: "Cash",value: "Cash"};	
this.state.paymentMode="Cash";

var self=this;
$.ajax({
    type: 'POST',
    data: JSON.stringify({
        companyId:this.state.companyId,
        
      }),
   url: " http://15.206.129.105:8080/MerchandiseAPI/EstimateReport/invoicepaymentreport",
    contentType: "application/json",
    dataType: 'json',
    async: false,

    success: function (data, textStatus, jqXHR) {
    
      
 var tab = '<thead><tr class="headcolor"><th>Date</th><th>Invoice</th>'
 +'<th>Customer Name</th><th>Due Amount</th><th>Discount</th><th>Pay</th>'
 +'<th>Balance</th></tr></thead>';

  $.each(data.invoicepaymentreportlist, function (i, item) {
  
    tab += '<tbody id= "myTable" ><tr id="tabletextcol" ><td>' + item.date + '</td>'
    +'<td>' + item.invoiceNo + '</td><td>' + item.userName + '</td>'
    +'<td>' + item.dueAmount + '</td><td>' + item.discount + '</td>'
    +'<td>' + item.pay + '</td><td>' + item.balanceAmt + '</td></tr></tbody>';

 

     
        self.state.data[i] = {
        "Date": item.date ,
        "Invoice":  item.invoiceNo,
        "UserName": item.userName,
        "DueAmount": item.dueAmount,
        "Discount":item.discount,
        "Pay":item.pay,
        "Balance":item.balanceAmt,
        "PaymentMode":item.paymentMode
          };



  });
  $("#tableHeadings").append(tab);

  self.state.columns = self.getColumns();

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
   // this.GetOrderDetails();

}


getColumns(){

    return Object.keys(this.state.data[0]).map(key => {
                 
      return {
        Header: key,
        accessor: key,
  
    };
    
  });
  }

  cancelFunc(){
    this.state.pay="";
    this.state.discount="";
    this.state.selectedPaymentMode="";
    this.state.selectedPaymentMode={label: "Cash",value: "Cash"};	
    this.state.paymentMode="Cash";
 

    this.setState({
      pay:this.state.pay,
      discount:this.state.discount,
      selectedPaymentMode:this.state.selectedPaymentMode,
      paymentMode:this.state.paymentMode
    })
}

handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.state[name]=value;
    this.setState({ [name]: value },
        () => { this.validateField(name, value) });

        this.state.balanceAmt='';

        $("#submit").hide();

        if(Number(this.state.discount) > Number(this.state.dueAmount)){
            discount=1;
            
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title:'Discount Amount Exceeds The Due Amount',     
                showConfirmButton: false,
                timer: 2000
              })
        }

        if(Number(this.state.pay) > Number(this.state.dueAmount)){
            pay=1;
            
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Pay Amount Exceeds The Due Amount',     
                showConfirmButton: false,
                timer: 2000
              })
        }

        if(discount!=1 && pay!=1){
            var total=Number(this.state.dueAmount)-Number(this.state.discount)-Number(this.state.pay);
            this.state.balanceAmt=total;
            
            this.setState({
                balanceAmt:this.state.balanceAmt,
            })
}   

}




Submit(){
var self=this;
if((Number(this.state.pay))!=0 && this.state.paymentMode!=''){   

  
    $.ajax({
        type: 'POST',
        data: JSON.stringify({
            invoiceNo:this.state.invoiceNo,
            userName:this.state.userName,
            balanceAmt:this.state.balanceAmt,
            discount:this.state.discount,
            pay:this.state.pay,
            date:this.state.date,
            dueAmount:this.state.dueAmount,
            paymentMode:this.state.paymentMode,
            customerId:this.state.customerId,
            companyId:this.state.companyId,
            staffId: self.state.staffId,
                   employeeName: self.state.employeeName,
                   role: self.state.role,
            
            
        }),
        url: " http://15.206.129.105:8080/MerchandiseAPI/EstimateReport/EstimateReportEdit",
        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {
       
           
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Successfully Updated Payment Details',     
                showConfirmButton: false,
                timer: 2000
              })
             ReactDOM.render(
                <Router >
                    <div>
                        <Route path="/" component={EstimateList} />
                    </div>
                </Router>, document.getElementById('contentRender'));    
      },
    
        error: function (data) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Network Connection Problem',
                showConfirmButton: false,
                timer: 2000
              })
        },
    });

}else{
   
      Swal.fire({
        position: 'center',
        icon: 'error',
        title:  'Kindly Fill In All The Fields',   
        showConfirmButton: false,
        timer: 2000
      })
}


}
BackbtnFunc() {
  var cash="Cash";
 
   if((this.state.discount == 0))
   {
     this.setState({
       discountValid: false,     
     })
   }
   if((this.state.pay== 0))
   {
     this.setState({
       payValid: false,
     })
   }

     if((this.state.paymentMode == 0))
   {
     this.setState({
       paymentModeValid: false,      
     })
   }

   if((this.state.discount == 0) && (this.state.pay == 0) &&  (this.state.paymentMode=="Cash")){
       ReactDOM.render(
           <Router>
             <div>             
               <Route path="/" component={EstimateList} />          
             </div>
           </Router>,
           document.getElementById('contentRender'));
         registerServiceWorker();
   }else{
       confirmAlert({
           title: "Confirmation", // Title dialog
           message: "Unsaved changes are there. Do you really want to go back?", // Message dialog
           buttons: [
             {
               label: 'Confirm',
               onClick: () => this.ConfirmBack()
             },
             {
               label: 'Cancel',
               onClick: () => this.CancelBack()
             }
           ]
         });
  }
 
 }
 ConfirmBack(){
   ReactDOM.render(
     <Router>
       <div>
      <Route path="/" component={EstimateList} />
       </div>
     </Router>,
     document.getElementById('contentRender'));
   registerServiceWorker();
 }
 CancelBack(){
   
 }



  handlePaymentModeDetails = (e) =>{
    const name = e.name;
    const value = e.value;
    this.state.paymentMode = value;

    this.setState({
      [name]: value,
      selectedPaymentMode: e,
      paymentModeValid: true
    });

  }

 


render() {
    const  downloadButtonData=<span style={{fontWeight:"700",fontWeight: "900",fontSize:"15px"}}>Download</span>
       

    return (


        <div class="container" style={{height:"20px"}}>
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
                <div class="card-header">          
                        <h4 style={{fontWeight:"300",fontSize:"30px"}}>Estimate Invoice Payment</h4>   </div>              
                    <div>
                        <div class="card-body">
                            <div className="panel panel-default">
                                <FormErrors formErrors={this.state.formErrors} />
                            </div>

                            <form class="form-horizontal form-bordered" name="submissions" >
     




 <div className="form-group">
                                    <label class="control-label col-sm-2 font-weight-bold" for="invoiceNo">Invoice<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="invoiceNo" name="invoiceNo" value={this.state.invoiceNo} onChange={this.handleUserInput} readOnly />
                                    </div>
                                </div>

 <div className="form-group">
                                    <label class="control-label col-sm-2 font-weight-bold" for="customerName">Customer Name<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="username" name="userName" value={this.state.userName} onChange={this.handleUserInput}readOnly />
                                    </div>
                                </div>

 <div className="form-group">
                                    <label class="control-label col-sm-2 font-weight-bold" for="customerName">Due Amount<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="dueamount" name="dueAmount" value={this.state.dueAmount} onChange={this.handleUserInput} readOnly />
                                    </div>
                                </div>


 <div className={`form-group ${this.errorClass(this.state.formErrors.discount)}`}>
                                    <label class="control-label col-sm-2 font-weight-bold" for="customerName">Discount<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="discount" name="discount" value={this.state.discount} onChange={this.handleUserInput} />
                                    </div>
                                </div>

 <div className={`form-group ${this.errorClass(this.state.formErrors.pay)}`}>
                                    <label class="control-label col-sm-2 font-weight-bold" for="customerName">Pay<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="pay" name="pay" value={this.state.pay} onChange={this.handleUserInput} />
                                    </div>
                                </div>


  <div className="form-group">
                                    <label class="control-label col-sm-2 font-weight-bold" for="customerName">Payment Mode<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10">
                                     <SelectSearch  options={this.state.paymentoptions} value={this.state.selectedPaymentMode} 
                          onChange={(e) => this.handlePaymentModeDetails(e)} name="paymentMode" placeholder="Select Payment Mode " />			         
  
                                    </div>
                                </div>



<div className="form-group">
<label class="control-label col-sm-2 font-weight-bold" for="balanceAmt">Balance<span style={{ color: "red" }}>*</span></label>
<div class="col-sm-10">
    <input type="text" class="form-control" id="balanceAmt" name="balanceAmt" value={this.state.balanceAmt} onChange={this.handleUserInput} readOnly/>
</div>
</div>

   <div class="form-group">
                                    <div class="row" style={{marginLeft:"2px"}} >
                                        <div class="col-sm-offset-2 col-sm-10">
                                            <button  style={{fontWeight:"bold"}} type="button"  onClick={() => this.Submit()} class="btn btn-primary">Submit</button> <span></span>
                                       <button style={{fontWeight:"bold"}} type="button" onClick={() => this.cancelFunc()} class="btn btn-primary">Cancel</button>
                                     
                                       </div>
                                    </div>
</div>

</form>
 </div>
 <div    style={{ display: "grid" }}>
                <h4 style={{fontWeight:"300",fontSize:"30px"}}>Invoice Payment List</h4>
<div >
  
                     <div className="row">
        <div className="col-sm-4 col-lg-8 col-md-8">
        
        </div>
        <div className="col-sm-4 col-lg-2 col-md-2">
        
</div>
<div className="col-sm-4 col-lg-2 col-md-2">
    
<div class="buttonright" >
                  <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                     table="tableHeadings"
                     filename="Payment_List"
                    sheet="tablexls"
					 className="pageredirectbtn download-table-xls-button "
                    buttonText={downloadButtonData}      />
                </div>
</div>
        </div>
                    </div>

                         <ReactTable style={{overflow:"auto"}}
              data={this.state.data}
              columns={this.state.columns}
              noDataText="No Data Available"
              filterable
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
            />

        <div id="tableOverflow" style={{marginBottom:"5%"}}>
          <table style={{ margin: "auto" }} class="table table-bordered"  id="tableHeadings">

          </table>
        </div>
       

        </div>
 </div>
</div></div>
);
}
}

export default EstimateReportEdit1;