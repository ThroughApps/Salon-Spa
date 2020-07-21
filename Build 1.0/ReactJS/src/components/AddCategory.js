import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import VendorEntryForm from './VendorEntryForm';
import CustomerList from './CustomerList';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';
import './datepicker.css';

import { FormErrors } from './FormErrors';
import Expense from './Expense';
import AddUser from './AddUser';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import CryptoJS from 'crypto-js';
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import FooterText from './FooterText';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import './DownloadButton.css';
import Case from 'case';
import "./MainPageRedirectButton.css";


class AddCategory1 extends Component {
    constructor(){
        super()
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
       
        this.state={
            date: date,
            categoryName:'',
            companyId:companyId,
            staffId:staffId,
            employeeName:employeeName,
           role:role,
            data:[],
            columns:[],
            
            
            formErrors: {
                categoryName:'',                   
            },
            categoryNameValid:false,
        }
        this.setState({
            date: date,
           }) 
      
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let categoryNameValid = this.state.categoryNameValid;
    

        switch (fieldName) {
            case 'categoryName':
                categoryNameValid = value.length >= 2;
                fieldValidationErrors.CategoryName = categoryNameValid ? '' : ' is InCorrect';
                break;
          default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            categoryNameValid: categoryNameValid,      
                  }, this.validateForm);
    }
    validateForm() {

        this.setState({
            formValid:       
                this.state.categoryNameValid                       

        });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) }
     );
      }
      handleUserInputDate = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value,
           });
  
    }
    
      
    AddCategoryFunc()
    {
       var self=this;
       if (this.state.categoryName.trim().length > 0) {
        $.ajax({
            type: 'POST',
            data: JSON.stringify({    
          companyId:this.state.companyId,
          categoryName: Case.capital(this.state.categoryName),
          staffId: self.state.staffId,
          employeeName: self.state.employeeName,
          role: self.state.role,
             
            }),
        
            url: " http://15.206.129.105:8080/MerchandiseAPI/expense/addcategory",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                if (data.categoryName == "CategoryName") {
        
                    Swal.fire({
                      position: 'center',
                      icon: 'warning',
                      title: 'The Category name '+ data.categoryName  + ' Already Exists',   
                      showConfirmButton: false,
                      timer: 2000
                    })

                } else {
                    var Categorylist = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('CategoryList'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
                    Categorylist.push({ categoryName: self.state.categoryName });
                 
                    localStorage.setItem('CategoryList', CryptoJS.AES.encrypt(JSON.stringify(Categorylist), "shinchanbaby"));
      
                              Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title:'Successfully Added Category ', 
                                showConfirmButton: false,
                                timer: 2000
                              })

                              self.state.categoryName = "";
                              self.state.formValid=false;
                              self.state.categoryNameValid=false;

                              self.setState({
                                   categoryName: '',
                                   formValid:false,
                                   categoryNameValid:false,
                               })
                            
                            }
                    
                            $("#tableHeadings").empty();
                            self.Initialize();
                            $("#nodata").hide();
                        
      
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
    }
    else {
        
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Enter Category Name',  
          showConfirmButton: false,
          timer: 2000
        })
    }
      }
    
 componentDidMount() {
    window.scrollTo(0, 0);    
    $("#nodata").hide();  
    $("#tableHeadings").hide();
   var self=this;
     this.Initialize();
   

}
NoAction() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={AddCategory1} />
        </div>
      </Router>,
      document.getElementById('contentRender'));

  }
Initialize(){
    var self=this;

    self.state.data=[];
    self.setState({
      data:self.state.data,
    })

    $.ajax({
        type: 'POST',
        data: JSON.stringify({
            companyId:this.state.companyId,
            
          }),
       url: " http://15.206.129.105:8080/MerchandiseAPI/expense/categoryreport",
        contentType: "application/json",
        dataType: 'json',
        async: false,
  
        success: function (data, textStatus, jqXHR) {
            var no;
      
          if(data.categoryRetrievelist.length!=0){
     var tab = '<thead><tr class="headcolor"><th>S.No</th><th>CategoryName</th><th>Date</th></tr></thead>';
      $.each(data.categoryRetrievelist, function (i, item) {
        no=parseInt(i)+1;
        tab += '<tbody id= "myTable" ><tr id="tabletextcol" ><td>' + no + '</td><td>' + item.categoryName + '</td><td>' + item.categoryDate + '</td></tr></tbody>';
     
        self.state.data[i] = {
            "SNo":no,
            "CategoryName":  item.categoryName,
            "Date": item.date,
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
         
      
            
        };
    
    
    
    
    });
      $("#tableHeadings").append(tab);
      self.state.columns = self.GetColumns();
    }
    else{
        $("#nodata").show();
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

  
  GetColumns(){

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
 
             if (column.Header == "Delete") {
 
                if(rowInfo!=undefined){
                   

            
                  self.state.categoryName=rowInfo.original["CategoryName"];
                  self.state.id = rowInfo.original["ExpenseId"];
              
                  
                    
                      self.setState({    
                          categoryName:self.state.categoryName, 
                          id:self.state.id,     
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

                 
                  
                  
                  
          
                       }
  
               
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
            categoryName:self.state.categoryName,
            companyId:this.state.companyId,
            staffId: self.state.staffId,
employeeName: self.state.employeeName,
role: self.state.role,
            
          }),
         url: " http://15.206.129.105:8080/MerchandiseAPI/expense/deletecategory",
          contentType: "application/json",
          dataType: 'json',
          async: false,
    
          success: function (data, textStatus, jqXHR) {
  
             
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
  
Expense(){
    ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={Expense} />
              </div>
        </Router>,
        document.getElementById('contentRender'));
}
AddCategory(){
    ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={AddCategory1} />
              </div>
        </Router>,
        document.getElementById('contentRender'));

}
AddUser(){
    ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={AddUser} />
              </div>
        </Router>,
        document.getElementById('contentRender'));

}
cancelFunc() {
       
    
    ReactDOM.render(<AddCategory1 />, document.getElementById("contentRender"));
}
BackbtnFunc() {
  if((this.state.categoryName.length==0))
  {
   
    this.setState({
      categoryNameValid:false,
    })
  }
  if((this.state.categoryName.length==0))
{
  ReactDOM.render(
    <Router>
      <div>
      
        <Route path="/" component={DashboardOverall} />
      

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
  ConfirmBack() {
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={DashboardOverall} />


        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }
  CancelBack() {}
    render() {
      const  downloadButtonData=<span style={{fontWeight:"700",fontWeight: "900",fontSize:"15px"}}>Download</span>
               
  
        return(
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
          <ul class="nav nav-tabs">
    <li><a  style={{color:"black",fontWeight:"bold"}}  className="active"  onClick={() => this.Expense()}><span style={{display:"inline-grid"}}>Expense</span></a></li>
    <li class="active"><a  style={{color:"black",fontWeight:"bold"}}   onClick={() => this.AddCategory()}><span style={{display:"inline-grid"}}>Add Category</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold"}}   onClick={() => this.AddUser()}><span style={{display:"inline-grid"}}>Add User</span></a></li>
                    
  </ul>

                        <div class="card">
                  <div class="card-header" style={{backgroundColor:""}}>
                    <h4 style={{fontWeight:"300",fontSize:"30px"}}>Add Category</h4>
                  </div>
                 
                  <div class="card-body">
                  <div className="panel panel-default">
                                <FormErrors formErrors={this.state.formErrors} />
                            </div>
                   <form class="form-horizontal form-bordered">
              <div className={`form-group ${this.errorClass(this.state.formErrors.categoryName)}`}>
                <label class="control-label col-sm-2" for="categoryName">Category Name<span style={{color:"red"}}>*</span></label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" value={this.state.categoryName} onChange={this.handleUserInput} name="categoryName" id="categoryName" placeholder="Category Name"/>
                </div></div>
             
              <div class="form-group"> 
              <div class="row" style={{marginLeft:"3px"}}>
                <div class="col-sm-offset-2 col-sm-10">
                  <button type="button"   disabled={!this.state.formValid}  style={{fontWeight:"bold"}} onClick={() => this.AddCategoryFunc()} class="btn btn-primary">Submit</button> <span></span>
                  <button type="button"  style={{fontWeight:"bold"}} onClick={() => this.cancelFunc()} class="btn btn-primary">Clear</button>
                </div>
                </div>
              </div>
              </form></div>
              <div    style={{ display: "grid" }}>
                <h4 style={{fontWeight:"300",fontSize:"30px"}}>Category List</h4>

{/*<div  class="buttonright" >
<ReactHTMLTableToExcel
                   
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="tableHeadings"
                    filename="Category_List"
                    sheet="tablexls"
                    buttonText="Download Category List"/>
                    </div>
                    */}
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
                     filename="Category_List"
                    sheet="tablexls"
					         className="pageredirectbtn download-table-xls-button "
                    buttonText={downloadButtonData}      />
                </div>
</div>
        </div>
        <div id="tableOverflow">
          <table style={{ margin: "auto",marginBottom:"5%"}} class="table table-bordered"  id="tableHeadings">

          </table>
        </div>
       
        </div>
        <ReactTable style={{overflow:"auto"}}
              data={this.state.data}
              columns={this.state.columns}
              noDataText="No Data Available"
              filterable={false}
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
              </div> </div>
                    );
    }

}
export default AddCategory1;