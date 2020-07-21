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
import CryptoJS from 'crypto-js';
import ProductList from './ProductList';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import Case from 'case';

var id;
var discount = 0;
var pay = 0;
var minimumServiceTimeOptions=[];
class PurchaseListEdit extends Component {

    constructor(props) {
        super(props)
        var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state = {
            productName: this.props.productName,
            productType: this.props.productType,
            productCategory: this.props.productCategory,
            purchaseRate: this.props.purchaseRate,
            cgst: this.props.cgst,
            sgst: this.props.sgst,
            igst: this.props.igst,
            hsnCode: this.props.hsnCode,
            saleRate: this.props.saleRate,
            description: this.props.description,
            quantityLimit: this.props.quantityLimit,
            productId: this.props.productId,
            quantity: this.props.quantity,

            oldProductName: this.props.oldProductName,
            oldCgst: this.props.oldCgst,
            oldSgst: this.props.oldSgst,
            oldIgst: this.props.oldIgst,
            oldHsnCode: this.props.oldHsnCode,
           
            oldProductType: this.props.oldProductType,
            OldDescription: this.props.OldDescription,
            OldQuantityLimit: this.props.OldQuantityLimit,
            date: date,
            companyId: companyId,
            staffId:staffId,
            employeeName:employeeName,
           role:role,
           formErrors: {
            productName: '',
            productType: '',
            productCategory: '',
            cgst: 0,
            sgst: 0,
            igst: 0, 
            saleRate:'',
            purchaseRate:'',
            quantityLimit: '',
           },
           productNameValid: false,
           productTypeValid: false,
           saleRateValid:false,
           purchaseRateValid:false,
           quantityLimitValid: false, 
           productCategoryValid: false,
          
        };
        this.setState({
            date: date,
        })


    }



    componentDidMount() {

  
        window.scrollTo(0, 0);

       
        if(this.props.productType=="service")
        {
          $(".service").hide();
          $("#fieldName").prop("readonly", true);
        }
    var startMin="00:15";
    var timingArray=[];

    minimumServiceTimeOptions=[];
    
    timingArray.push(startMin);
    minimumServiceTimeOptions.push({ label: startMin, value: startMin}); 
    
    var count=30;
    
        for(var i=0;i<count;i++){
    
          startMin=timingArray[i];
    
          var hr=startMin.split(":")[0];
          var min=startMin.split(":")[1];
    
          var totalMin=Number(hr)*60+Number(min);
          totalMin=Number(totalMin)+15;
    
        var hours = Math.floor(totalMin / 60);  
          hours=('0'+(hours)).slice(-2) ;
    
          var minutes = totalMin % 60;
          minutes=('0'+(minutes)).slice(-2) ;
    
          var timings= hours + ":" + minutes;    
          timingArray.push(timings);
          minimumServiceTimeOptions.push({ label: timings, value: timings});   
                   
       
          count--;
        }
    
        this.state.minimumServiceTimeOptions=minimumServiceTimeOptions;
        this.setState({
          minimumServiceTimeOptions:this.state.minimumServiceTimeOptions,
        })
    
    

    }



    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
    
        this.setState({ [name]: value },
          () => { this.validateField(name, value) });
    
    
    
      }
    
      validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let productNameValid = this.state.productNameValid;
        let saleRateValid = this.state.saleRateValid;
        let productTypeValid = this.state.productTypeValid;
        let productCategoryValid = this.state.productCategoryValid;
        let quantityLimitValid = this.state.quantityLimitValid;
        let purchaseRateValid = this.state.purchaseRateValid;
    
        switch (fieldName) {
          case 'productName':
            productNameValid = value.length >= 2;
            fieldValidationErrors.ProductName = productNameValid ? '' : ' is InCorrect';
            break;
          case 'saleRate':
            saleRateValid = value.length >= 1;
            fieldValidationErrors.SaleRate = saleRateValid ? '' : ' is InCorrect';
            break;
          case 'purchaseRate':
            purchaseRateValid = value.length >= 1;
            fieldValidationErrors.PurchaseRate = purchaseRateValid ? '' : ' is InCorrect';
            break;
    
          case 'productType':
            productTypeValid = value.length >= 1;
            fieldValidationErrors.ProductType = productTypeValid ? '' : ' is not selected';
            break;
    
    
          case 'productCategory':
            productCategoryValid = value.length >= 1;
            fieldValidationErrors.ProductCategory = productCategoryValid ? '' : ' is not selected';
            break;
    
    
          default:
            break;
        }
        this.setState({
          formErrors: fieldValidationErrors,
          productNameValid: productNameValid,
          saleRateValid: saleRateValid,
          productTypeValid: productTypeValid,
          purchaseRateValid: purchaseRateValid,
          productCategoryValid: productCategoryValid,
        }, this.validateForm);
      }
      validateForm() {
    
        this.setState({
          formValid:
            this.state.productNameValid
            && this.state.saleRateValid
            && this.state.productTypeValid
            && this.state.purchaseRateValid
            && this.state.productCategoryValid
        });
      }
    
      errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
      }

    handleUserInputProductType = (e) => {
        const name = e.target.name;
        const value = e.target.value;
    
        this.state.quantity = 0;
        this.state.quantityLimit = 0;
    
        if (value == "service") {
    
    
          this.state.purchaseRateValid = true;
          this.state.productCategoryValid = true;
    
    
          $("#quantity1").hide();
          $("#quantityLimit1").hide();
          $("#productCategory1").hide();
          $("#serviceminimumtime").show();
    
          this.state.productCategory = "-";
          $("#purchaseRate1").hide();
          this.state.purchaseRate = "-";
    
    
          this.setState({
            productCategory: this.state.productCategory,
            purchaseRate: this.state.purchaseRate,
          })
        } else if (value == "product") {
    
          this.state.purchaseRateValid = false;
          this.state.productCategoryValid = false;
          $("#quantity1").show();
          $("#quantityLimit1").show();
          $("#productCategory1").show();
          $("#serviceminimumtime").hide();
    
    
          this.state.productCategory = "";
          $("#purchaseRate1").show();
          this.state.purchaseRate = "";
        }
        else if (value == "product" && this.state.productCategory == "Purchase") {
          $("#quantity1").hide();
          $("#quantityLimit1").show();
        }
        else if (value == "product" && this.state.productCategory == "Own") {
    
          $("#quantity1").show();
          $("#quantityLimit1").show();
        }
    
        this.setState({ [name]: value },
          () => { this.validateField(name, value) });
    
    
    
      }
    
      handleUserInputProductCategory = (e) => {
        const name = e.target.name;
        const value = e.target.value;
    
        this.state.quantity = 0;
        this.state.quantityLimit = 0;
    
        if (this.state.productType == "service") {
    
    
          $("#quantity1").hide();
          $("#quantityLimit1").hide();
          $("#productCategory1").hide();
          $("#purchaseRate1").hide();
           $("#serviceminimumtime").show();
    
          this.state.productCategory = "-";
          this.state.purchaseRate = "-";
          this.state.purchaseRateValid = true;
          this.state.productCategoryValid = true;
    
          this.setState({
            productCategory: this.state.productCategory,
            purchaseRate: this.state.purchaseRate,
          })
    
        }
        else if (this.state.productType == "product") {
          this.state.purchaseRateValid = false;
          this.state.productCategoryValid = false;
          $("#quantity1").show();
          $("#quantityLimit1").show();
          $("#productCategory1").show();
          $("#serviceminimumtime").hide();
    
          this.state.productCategory = "";
          $("#purchaseRate1").show();
          this.state.purchaseRate = "";
        }
        else if (this.state.productType == "product" && value == "Purchase") {
          $("#quantity1").hide();
          $("#quantityLimit1").show();
        }
        else if (this.state.productType == "product" && value == "Own") {
    
          $("#quantity1").show();
          $("#quantityLimit1").show();
        }
    
    
        this.setState({ [name]: value },
          () => { this.validateField(name, value) });
    
    
    
      }


    UpdateSubmit() {

        var self = this;

        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                productName: Case.capital(self.state.productName),
                cgst: self.state.cgst,
                sgst: self.state.sgst,
                igst: self.state.igst,
                hsnCode: self.state.hsnCode,
                saleRate: self.state.saleRate,
                description: self.state.description,
                productId: self.state.productId,
                productType: self.state.productType,
                quantityLimit: self.state.quantityLimit,
                productCategory: self.state.productCategory,
                purchaseRate: self.state.purchaseRate,
                quantity:self.state.quantity,

                oldProductName: self.state.oldProductName,

                oldCgst: self.state.oldCgst,
                oldSgst: self.state.oldSgst,
                oldIgst: self.state.oldIgst,
                oldHsnCode: self.state.oldHsnCode,
             
                oldDescription: self.state.oldDescription,

                companyId: this.state.companyId,
                staffId: self.state.staffId,
                   employeeName: self.state.employeeName,
                   role: self.state.role,

            }),
            url: " http://15.206.129.105:8080/MerchandiseAPI/master/ProductDetailsUpdate",
            contentType: "application/json",
            dataType: 'json',
            async: false,

            success: function (data, textStatus, jqXHR) {

                var tab;

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Product Details Updated Successfully',      
                    showConfirmButton: false,
                    timer: 2000
                  })

                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={ProductList} />


                        </div>
                    </Router>,
                    document.getElementById('contentRender'));
                registerServiceWorker();


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

                    <Route path="/" component={ProductList} />


                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }




    render() {
        return (


            <div class="container" style={{ height: "20px" }}>
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
                        <h4 style={{ fontWeight: "300", fontSize: "30px" }}>Edit Product Details</h4> </div>
                    <div>
                        <div class="card-body">
                            <form class="form-horizontal form-bordered" >
                                <div class="form-group">
                                    <label class="control-label col-sm-2" for="productName">Product Name</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control"
                                            onChange={this.handleUserInput}
                                            value={this.state.productName}
                                            id="productName"
                                            name="productName" readOnly
                                            
                                        />
                                    </div></div>

                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="description">Product Type</label>
                                    <div class="col-sm-10">

                                    <input type="text" class="form-control"
                                            onChange={this.handleUserInput}
                                            value={this.state.productType}
                                            id="productType"
                                            name="productType" readOnly
                                            
                                        />
                                     

                                    </div></div>


                                <div class="form-group">
                                    <label class="control-label col-sm-2 " for="productCategory">Product Category</label>
                                    <div class=" col-sm-10">

                                    <input type="text" class="form-control"
                                            onChange={this.handleUserInput}
                                            value={this.state.productCategory}
                                            id="productCategory"
                                            name="productCategory" readOnly
                                            
                                        />
                                     
                                    </div>
                                </div>

                                <div className="form-group service" id="quantity1">
                                    <label class="control-label col-sm-2" for="quantity">Quantity</label>
                                    <div class="col-sm-10">

                                        <input type="number" min="0" class="form-control" value={this.state.quantity} onChange={this.handleUserInput} name="quantity" id="quantity" placeholder="Enter Quantity...  " />
                                    </div>
                                </div>

                                <div className="form-group service">
                                    <label class="control-label col-sm-2" for="quantityLimit">Quantity Limit</label>
                                    <div class="col-sm-10">

                                        <input type="number" min="0" class="form-control" value={this.state.quantityLimit} onChange={this.handleUserInput} name="quantityLimit" id="quantityLimit" placeholder="Quantity alert limit...  " />
                                    </div>
                                </div>
                            

                             

                                <div className="form-group ">

<label class="control-label col-sm-2">CGST(%)</label>
<div class=" col-sm-10">

  <input type="number" min="0" class="form-control" value={this.state.cgst} onChange={this.handleUserInput} name="cgst" id="cgst" placeholder="CGST...  " />

</div>
</div>
<div className="form-group">

<label class="control-label col-sm-2">SGST(%)</label>
<div class=" col-sm-10">
  <input type="number" min="0" class="form-control" value={this.state.sgst} onChange={this.handleUserInput} name="sgst" id="sgst" placeholder="SGST...  " />

</div>
</div>
<div className="form-group ">

<label class="control-label col-sm-2">IGST(%)</label>
<div class=" col-sm-10">
  <input type="number" min="0" class="form-control" value={this.state.igst} onChange={this.handleUserInput} name="igst" id="igst" placeholder="IGST...  " />

</div>
</div>



                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="hsnCode">Hsn Code</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.hsnCode}
                                            id="hsnCode"
                                            name="hsnCode" />
                                    </div></div>



                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="city">Sale Rate</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.saleRate}
                                            id="saleRate"
                                            name="saleRate" />
                                    </div></div>


                                <div className="form-group service">
                                    <label class="control-label col-sm-2" for="city">Purchase Rate</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.purchaseRate}
                                            id="purchaseRate"
                                            name="purchaseRate" />
                                    </div></div>



                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="description">Description</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.description}
                                            id="description"
                                            name="description" />
                                    </div></div>


                            </form>
                        </div>

                    </div>
                    <div class="form-group" style={{ marginBottom: "5%" }}>
                        <div class="row">
                            <div class="col-sm-offset-2 col-sm-10">
                                <button type="button" style={{ fontWeight: "bold" }} class="btn btn-primary" onClick={() => this.UpdateSubmit()}>Update</button>

                            </div></div></div>


                </div></div>
        );
    }
}

export default PurchaseListEdit;