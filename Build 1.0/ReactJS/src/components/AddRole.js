import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import VendorEntryForm from './VendorEntryForm';
import CustomerList from './CustomerList';
import AddCategory from './AddCategory';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';
import './datepicker.css';

import AddRole from './AddRole';
import ChangePassword from './ChangePassword';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import FooterText from './FooterText';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import './DownloadButton.css';
import Case from 'case';

import "./MainPageRedirectButton.css";


class AddRole1 extends Component {
    constructor(){
        super()
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
       
        this.state={
            roleName:'',
            userName:'',            
            email:'',
            companyId:companyId,
            password:'',
            staffId:staffId,
            employeeName:employeeName,
           role:role, 
            data:[],
            columns:[],
            formErrors: {
                roleName:'',                   
            },
            
           roleNameValid: false,

               }
      
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let roleNameValid = this.state.roleNameValid;
    

        switch (fieldName) {
            case 'roleName':
                roleNameValid = value.length >= 2;
                fieldValidationErrors.RoleName = roleNameValid ? '' : ' is InCorrect';
                break;
          default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            roleNameValid: roleNameValid,      
                  }, this.validateForm);
    }
    validateForm() {

        this.setState({
            formValid:       
                this.state.roleNameValid                       

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
   
      AddRoleFunc()
      {
      var self=this;
      var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
      this.state.companyId = companyId;
      this.setState({
          companyId: companyId,
      });
      if (this.state.roleName.trim().length > 0) {
          $.ajax({
              type: 'POST',
              data: JSON.stringify({
                  roleName:  Case.capital(this.state.roleName),
                  companyId:this.state.companyId,
            //      date: this.state.date
            
            staffId: self.state.staffId,
            employeeName: self.state.employeeName,
            role: self.state.role,
              }),
          
             url: " http://15.206.129.105:8080/MerchandiseAPI/admin/addrole",
              contentType: "application/json",
              dataType: 'json',
              async: false,
              success: function (data, textStatus, jqXHR) {
                  if (data.roleName == "RoleName") {
                                           
				     Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'The roleName Already Exists',  
                        showConfirmButton: false,
                        timer: 2000
                      })
                      
  
  
                  } else {
                    var roles = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Roles'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
     roles.push({roleName:self.state.roleName});
     localStorage.setItem('Roles', CryptoJS.AES.encrypt(JSON.stringify(roles), "shinchanbaby"));

                                Swal.fire({
                                    position: 'center',
                                    icon: 'sucess',
                                    title:'Successfully Added role ',  
                                    showConfirmButton: false,
                                    timer: 2000
                                  })

                                $("#tableHeadings").empty();
                                self.state.roleName = "";
                                self.state.formValid=false;
                                self.state.roleNameValid=false;
                                self.setState({
                                  roleName: '',
                                  formValid:false,
                                  roleNameValid:false,
                                 })  
                                  
                              self.Initialize();
                              $("#nodata").hide();  
                                            
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
            
        
              },
          });
      }
      else {
                 
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Enter Role Name',  
            showConfirmButton: false,
            timer: 2000
          })
      }
        }
  
Initialize(){
  var self=this;
  $.ajax({
    type: 'POST',
    data: JSON.stringify({
        companyId:this.state.companyId,
        
      }),
      url: " http://15.206.129.105:8080/MerchandiseAPI/admin/rolereport",
       
    contentType: "application/json",
    dataType: 'json',
    async: false,

    success: function (data, textStatus, jqXHR) {
        var no;
     
      if(data.roleRetrievelist.length!=0){
        var tab = '<thead><tr class="headcolor"><th>S.No</th><th>Role</th><th>Date</th></tr></thead>';
          $.each(data.roleRetrievelist, function (i, item) {
            no=parseInt(i)+1;
            tab += '<tbody id= "myTable" ><tr id="tabletextcol" ><td>' + no + '</td><td>' + item.roleName + '</td>'
            +'<td>' + item.roleDate + '</td></tr></tbody>';
        
        
            self.state.data[i] = {
              "SNo":no,
              "Role":  item.roleName,
              "Date": item.roleDate
  
          };
        
        
        
          });
          $("#tableHeadings").append(tab);
          self.state.columns = self.getColumns();
          self.setState({
            data:self.state.data,
            columns:self.state.columns
          })
        }
      else{
        $("#nodata").show();
        $("#test-table-xls-button").hide();
      
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

getColumns(){

  return Object.keys(this.state.data[0]).map(key => {
               
    return {
      Header: key,
      accessor: key,

  };
  
});
}
      
componentDidMount() {
    var self=this;
    var customerName;
    var roleName;
    self.Initialize();
    window.scrollTo(0, 0);
    $("#nodata").hide(); 
    $("#tableHeadings").hide();
   


    }
      ChangePassword(){
        ReactDOM.render(
            <Router>
                <div>
      
                    <Route path="/" component={ChangePassword} />
                  </div>
            </Router>,
            document.getElementById('contentRender'));
      }
      AddRole(){
        ReactDOM.render(
            <Router>
                <div>
      
                    <Route path="/" component={AddRole1} />
                  </div>
            </Router>,
            document.getElementById('contentRender'));
      }
  
      
      
      cancelFunc() {
        ReactDOM.render(<AddRole1 />, document.getElementById("contentRender"));
      }
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
    render() {
      const  downloadButtonData=<span style={{fontWeight:"700",fontWeight: "900",fontSize:"15px"}}>Download</span>
               
  
        return(
            <div class="container">
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
                        <h3 >Add Role</h3>   </div>
                  
                    </div>
            </div>
          
                 
                  <div class="card-body">
                  <form class="form-horizontal form-bordered" >
                   <div className={`form-group ${this.errorClass(this.state.formErrors.roleName)}`}>
                <label class="control-label col-sm-2" for="roleName">Role Name<span style={{color:"red"}}>*</span></label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" value={this.state.roleName} onChange={this.handleUserInput} name="roleName" id="roleName" placeholder="Role Name"/>
                </div></div>
              
              <div class="form-group"> 
              <div class="row"  style={{marginLeft:"3px"}}>
                <div class="col-sm-offset-2 col-sm-10">
                  <button style={{fontWeight:"bold"}} type="button"  disabled={!this.state.formValid}  onClick={() => this.AddRoleFunc()} class="btn btn-primary">Submit</button> <span></span>
                  <button style={{fontWeight:"bold"}} type="button" onClick={() => this.cancelFunc()} class="btn btn-primary">Clear</button>
                </div>
                </div>
              </div>
              </form></div>
              <div    style={{ display: "grid" }}>
                <h4 style={{fontWeight:"300",fontSize:"30px"}}>Role List</h4>



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
                     filename="Role_List"
                    sheet="tablexls"
					 className="pageredirectbtn download-table-xls-button "
                    buttonText={downloadButtonData}      />
                </div>
</div>
        </div>
        <div id="tableOverflow">
          <table style={{ margin: "auto",marginBottom:"5%" }} class="table table-bordered" id="tableHeadings">

          </table>
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

        </div>
        <h2 id="nodata" style={{textAlign:"center"}}>No Data</h2>        
              </div> </div>
                    );
    }

}
export default AddRole1;