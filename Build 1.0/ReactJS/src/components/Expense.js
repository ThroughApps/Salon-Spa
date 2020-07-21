import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import VendorEntryForm from './VendorEntryForm';
import CustomerList from './CustomerList';
import AddCategory from './AddCategory';
import AddUser from './AddUser';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';
import './datepicker.css';

import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import { FormErrors } from './FormErrors';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import './DownloadButton.css';

import "./MainPageRedirectButton.css";

//import Help from './Help';
var helpFuncValue="expense";
var helpClassValue;
var userarray = [];
class Expense1 extends Component {
    constructor(){
        super()
        var today = new Date();
       // var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
         var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
       
        this.state={
            categoryName:'',
            date: date,
            userName:'',
            amount:'',
            companyId:companyId,
            staffId:staffId,
            employeeName:employeeName,
           role:role,
           // CategoryNameList:CategoryNameList,
            dateValid:false,
            formErrors: {
                amount:'',                     
            },
            amountValid: false,
            data:[],
            columns:[],
            
        }
        this.setState({
            date: date,
           }) 
    }

    componentDidMount() {     
        
    
      $("#nodata").hide();
      $("#tableHeadings").hide();
   
        window.scrollTo(0, 0);      
       var self=this;
       var userarray = [];
     self.Initialize();
  
  
 
}
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) }
     );
      }
      handleAmount= (e) => {

        const name = e.target.name;
        const value = e.target.value;
    
        var value1 = value;
        var cleanNum;
    
    
        if (value1 != "") {
    
          var isNumberDt = $.isNumeric(value1);
          if (isNumberDt !== false) {
            var sign_data = Math.sign(value1);
     
            if (sign_data != -1) {
    
              cleanNum = value1.match(/^\d+\.?\d{0,2}/);
            
            
                this.state[name] = cleanNum;
                this.setState({ [name]: cleanNum },
                  () => { this.validateField(name, cleanNum) }
           );
                
              
              
    
            } else {
    
       
              this.state[name] = '';
              this.setState({ [name]: '' });
           
            }
          } else {
    
           
            this.state[name] = '';
            this.setState({ [name]: '' });
          
          }
    
        } else {
    
          this.state[name] = '';
          this.setState({ [name]: '' });
       
        }
    
      }
   
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let amountValid = this.state.amountValid;
    

        switch (fieldName) {
            case 'amount':
                amountValid = value.length >= 0;
                fieldValidationErrors.Amount = amountValid ? '' : ' is InCorrect';
                break;
          default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            amountValid: amountValid,      
                  }, this.validateForm);
    }
    validateForm() {

        this.setState({
            formValid:       
                this.state.amountValid                       

        });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }
      
    AddExpenseFunc()
    {
       var self=this;

       var inDate = new Date(this.state.date);      
    //   var date=inDate.getFullYear() + '-' +(inDate.getMonth() + 1) + '-' +inDate.getDate();
       var date=inDate.getDate() + '-' +(inDate.getMonth() + 1) + '-' +inDate.getFullYear();
        
        self.setState({
          date:self.state.date,          
             });
     
       if ((this.state.categoryName.length >0) && (this.state.userName.length >0) && (this.state.amount.length >0) ){
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                categoryName: this.state.categoryName,
                userName:this.state.userName,
                amount:this.state.amount, 
                companyId:this.state.companyId,
             //   date: this.state.date,
             staffId: this.state.staffId,
                   employeeName: this.state.employeeName,
                   role: this.state.role,
                          
            }),
          
              url: " http://15.206.129.105:8080/MerchandiseAPI/expense/addexpense",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
             

                              Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Successfully Added Expense ',   
                                showConfirmButton: false,
                                timer: 2000
                              })

                              $("#tableHeadings").empty();
                              $("#userName").empty();
                              $("#categoryName").empty();
                              self.state.amount="";
                              self.state.date="";
                              self.setState({
                                amount: '',
                                date: '',
                                               
                           })
      
                         //  $('#mytable tr:last').before("<tr><td>new row</td></tr>")  
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
          title: 'Enter All Details',   
          showConfirmButton: false,
          timer: 2000
        })
    }
      }
     
      Initialize(){
        var userarray = [];
          var self=this;
          var categoryName;
          var userName;
          var userName1;
          var CategoryList = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('CategoryList'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
        
          categoryName += '<option  value="" disabled selected hidden>Select a category</option>';
          $.each(CategoryList, function (i, item) {
      
            categoryName += '<option value="' + item.categoryName + '">' + item.categoryName + '</option>'
      
          });
          $("#categoryName").append(categoryName);

          var UserList = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('UserList'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
          var userName;
          userName += '<option  value="" disabled selected hidden>Select a user</option>';
          $.each(UserList, function (i, item) {
      
         
            var content = JSON.stringify({
              userName: item.userName,          
            });
  
            userarray.push(content);
          });
         
          var EmpList = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('EmpList'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
     
          
         
          $.each(EmpList, function (i, item) {
         
     
               var content = JSON.stringify({
                userName: item.staffName,          
              });
    
              userarray.push(content);
             
              });
   
              for (var k = 0; k < userarray.length; k++) {
                var temp = JSON.parse(userarray[k]);
                userName1 += '<option value="' + temp.userName + '">' + temp.userName + '</option>'


              }
              $("#userName").append(userName1);

          self.state.data=[];
          self.setState({
            data:self.state.data,
          })
     $.ajax({
         type: 'POST',
         data: JSON.stringify({
            companyId:this.state.companyId,
            
          }),
        url: " http://15.206.129.105:8080/MerchandiseAPI/expense/expensereport",
         contentType: "application/json",
         dataType: 'json',
         async: false,
   
         success: function (data, textStatus, jqXHR) {
             var no;
         
           if(data.expenseRetrievelist.length!=0){
      var tab = '<thead><tr class="headcolor"><th>S.No</th><th>CategoryName</th><th>UserName</th><th>Amount</th><th>Date</th></tr></thead>';
       $.each(data.expenseRetrievelist, function (i, item) {
    
        no=parseInt(i)+1;
         tab += '<tbody id= "myTable" ><tr id="tabletextcol" ><td>' + no + '</td><td>' + item.categoryName + '</td>'
         +'<td>' + item.userName + '</td><td>' + item.amount + '</td><td>' + item.date + '</td></tr></tbody>';
     
         self.state.data[i] = {
          "SNo":no,
          "CategoryName":  item.categoryName,
          "UserName":item.userName,
          "Amount":item.amount,
          "Date": item.date,
          "ExpenseId":item.expenseId,

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
        self.state.columns = self.GetColumns();
        
       $("#tableHeadings").append(tab);
       $(".expenseId").hide();
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
                    
                    self.state.userName = rowInfo.original["UserName"];
                    
                      
                        self.setState({    
                            categoryName:self.state.categoryName, 
                            id:self.state.id,    
                            userName:self.state.userName, 
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
                id:self.state.id,
                categoryName:self.state.categoryName,
                userName:self.state.userName,
                companyId:this.state.companyId,
                staffId: self.state.staffId,
employeeName: self.state.employeeName,
role: self.state.role,
                
              }),
             url: " http://15.206.129.105:8080/MerchandiseAPI/ExpenseReport/DailyExpenseReportDelete",
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
    
NoAction() {
  ReactDOM.render(
    <Router>
      <div>
        <Route path="/" component={Expense1} />
      </div>
    </Router>,
    document.getElementById('contentRender'));

}

AddCategory(){
  helpFuncValue="helpaddcategory";
    ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={AddCategory} />
              </div>
        </Router>,
        document.getElementById('contentRender'));
}
AddUser(){
  helpFuncValue="helpadduser";
    ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={AddUser} />
              </div>
        </Router>,
        document.getElementById('contentRender'));

}
Expense()
{
  helpFuncValue="helpaddexpense";

    ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={Expense1} />
              </div>
        </Router>,
        document.getElementById('contentRender'));
}


cancelFunc() {
       
    ReactDOM.render(<Expense1 />, document.getElementById("contentRender"));
}

BackbtnFunc() {
  if((this.state.amount.length==0))
  {
   
    this.setState({
      amountValid:false,
    })
  }
  if((this.state.amount.length==0)&&(this.state.categoryName.length==0))
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
    <li class="active"><a  style={{color:"black",fontWeight:"bold"}}  className="active"  onClick={() => this.Expense()}><span style={{display:"inline-grid"}}>Expense</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold"}}   onClick={() => this.AddCategory()}><span style={{display:"inline-grid"}}>Add Category</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold"}}   onClick={() => this.AddUser()}><span style={{display:"inline-grid"}}>Add User</span></a></li>
                    
  </ul>
           
                        <div class="card">
                        <div class="card-header" style={{backgroundColor:""}}>
        <h4 style={{fontWeight:"300",fontSize:"30px"}}>Expense </h4>
      </div>
                 
                  <div class="card-body">
                  <div className="panel panel-default">
                                <FormErrors formErrors={this.state.formErrors} />
                            </div>
                   <form class="form-horizontal form-bordered" action="/action_page.php">
              <div class="form-group">
                <label class="control-label col-sm-2" for="categoryName">Category Name<span style={{color:"red"}}>*</span></label>
                <div class="col-sm-10">
                <select id="categoryName" className="form-control" onChange={this.handleUserInput} name="categoryName"
                            style={{ marginBottom: "15px" }} >
                         
                          </select> 
                  </div>
                </div>
                <div class="form-group">
                <label class="control-label col-sm-2" for="userName">User Name<span style={{color:"red"}}>*</span></label>
                <div class="col-sm-10">
         
                <select id="userName" className="form-control" onChange={this.handleUserInput} name="userName"
                            style={{ marginBottom: "15px" }} >
                           
                          </select> 
                 </div>
                </div>
                <div class="form-group">
                <label class="control-label col-sm-2" for="amount">Amount<span style={{color:"red"}}>*</span></label>
                <div class="col-sm-10">
              
                  <input type="number" min="0" class="form-control" value={this.state.amount} onChange={this.handleUserInput} name="amount" id="amount" placeholder="amount"/>
                </div>
                </div>
            
              
                
              <div class="form-group"> 
              <div class="row" style={{marginLeft:"3px"}}>
                <div class="col-sm-offset-2 col-sm-10" >
                  <button type="button" disabled={!this.state.formValid}  style={{fontWeight:"bold"}} onClick={() => this.AddExpenseFunc()}  class="btn btn-primary">Submit</button> <span></span>
                  <button type="button"  style={{fontWeight:"bold"}} onClick={() => this.cancelFunc()} class="btn btn-primary">cancel</button>
                </div>
                </div>
              </div>
              </form></div>

                <div    style={{ display: "grid" }}>
                <h4 style={{fontWeight:"300",fontSize:"30px"}}>Expense List</h4>


                       <div className="row">
        <div className="col-sm-4 col-lg-8 col-md-8">
        
        </div>
        <div className="col-sm-4 col-lg-2 col-md-2">
       
</div>
<div className="col-sm-4 col-lg-2 col-md-2">
    
<div class="buttonright" >
<ReactHTMLTableToExcel
                   
                   id="test-table-xls-button"
                   className="pageredirectbtn download-table-xls-button"
                   table="tableHeadings"
                   filename="Expense_List"
                   sheet="tablexls"
                   style={{ display:"flex",justifyContent:"flex-end",
                   width:"100%",padding:"0"}}
                   buttonText={downloadButtonData}/>
                </div>
</div>
        </div>
        <div id="tableOverflow">
          <table style={{ margin: "auto",marginBottom:"5%" }} class="table table-bordered" id="tableHeadings">

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
export default Expense1