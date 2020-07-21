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
import CryptoJS from 'crypto-js';


var id;
var discount=0;
var pay=0;
class ExpenseReportView extends Component {

    constructor(props) {
        super(props)
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state = {
        date: date,
        categoryName:this.props.categoryName,
        userName:this.props.userName,
        amount:this.props.amount,
        date:this.props.date,
        oldCategoryName:this.props.oldCategoryName,
        oldUserName:this.props.oldUserName,
        oldAmount:this.props.oldAmount,
        oldDate:this.props.oldDate,
        id:this.props.id,
        companyId:companyId,
};
      this.setState({
        date: date,
       }) 


}


/*validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let discountValid  = this.state.discountValid ;
    let payValid  = this.state.payValid ;
     let paymentModeValid=this.state.paymentModeValid;
   
    switch (fieldName) {
        case 'discount':
    discountValid = value.match(/^(\d*\.)?\d+$/);
            fieldValidationErrors.disount = discountValid ? '' : ' is InCorrect';
            break;
        case 'pay':
            payValid = value.match(/^(\d*\.)?\d+$/);
            fieldValidationErrors.pay = payValid ? '' : ' is InCorrect';
            break;
      case 'paymentMode':
            paymentModeValid = value.length > 0;  
            fieldValidationErrors.paymentMode = paymentModeValid ? '' : ' is InCorrect';
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

 */


componentDidMount(){



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
    ReactDOM.render(
      <Router>
        <div>
        
          <Route path="/" component={ReportMenuPage} />
        
  
        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }




render() {
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
                        <h4 style={{fontWeight:"300",fontSize:"30px"}}>Expense Report View</h4>   </div>              
                    <div>
                        <div class="card-body">
                        <form class="form-horizontal form-bordered" >
                        <div class="form-group">
                <label class="control-label col-sm-2" for="categoryName">Category Name</label>
                <div class="col-sm-10">
                <input type="text" class="form-control"
 onChange={this.handleUserInput}
 value={this.state.categoryName}
 id="categoryname"
 name="categoryName" readOnly/>


                  </div></div>
                  <div class="form-group">
                <label class="control-label col-sm-2" for="userName">User Name<span style={{color:"red"}}>*</span></label>
                <div class="col-sm-10">
                <input type="text" class="form-control"
 onChange={this.handleUserInput}
 value={this.state.userName}
 id="userName"
 name="userName" readOnly /> 
                 </div>
                </div>
<div className="form-group">
 <label  class="control-label col-sm-2" for="amount">Amount</label> 
 <div class="col-sm-10">
 <input class="form-control" type="text"
 onChange={this.handleUserInput}
 value={this.state.amount}
 id="amount"
 name="amount" readOnly/></div>
  </div>
  <div className="form-group">
<label class="control-label col-sm-2" for="date">Date</label> 
<div class="col-sm-10">
 <input class="form-control" type="text"
 onChange={this.handleUserInput}
 value={this.state.date}
 id="date"
 name="date" readOnly />
 </div></div>
 </form>
  </div>

</div>


</div></div>
);
}
}

export default ExpenseReportView;