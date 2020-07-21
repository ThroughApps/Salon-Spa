
import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import VendorEntryForm from './VendorEntryForm';


import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import VendorList from './VendorList';
import ProductList from './ProductList';
import SaleOrder from './SaleOrder';
import InvoiceList from './InvoiceList';
import Estimate from './Estimate';
import EstimateList from './EstimateList';
import PurchaseInvoice from './PurchaseInvoice';
import AddProduct from './AddProduct';
import CustomerList from './CustomerList';
import Expense from './Expense';
import PurchaseInvoiceList from './PurchaseInvoice';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import StaffListView from './StaffListView';
import StaffListEdit from './StaffListEdit';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import './DownloadButton.css';
import "./MainPageRedirectButton.css";
import AddStaff from './AddStaff';

class StaffList1 extends Component {
  constructor(data) {
    super(data)
    var staffId1 = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
   
    var today = new Date();
    today = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    this.state={
      contactNo:'',
      data:[],
      columns:[],
      staffId1:staffId1,
      employeeName:employeeName,
     role:role, 
 
    }
  }
  componentDidMount() {
    var self=this;
    $("#nodata").hide();
    $("#tableHeadings").hide();
    window.scrollTo(0, 0);
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state.companyId = companyId;
        this.setState({
            companyId: companyId,
        });
    var self=this;

self.state.data=[];
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId:this.state.companyId,
        
      }),
     url: " http://15.206.129.105:8080/MerchandiseAPI/staff/selectstaff",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {
      
        if(data.staffRetrievelist.length!=0){
    var tab = '<thead><tr class="headcolor"><th>Staff Id</th>'
    +'<th>StaffName</th><th>Address</th>'
    +'<th>Contact</th><th>Designation</th><th>Salary</th>'
    +'<th>City</th><th>DOB</th><th>Gender</th>'
    +'<th>Nationality</th><th>Date-Of-Joining</th><th>Eamil</th></tr></thead>';
   
    $.each(data.staffRetrievelist, function (i, item) {
      tab += '<tbody id= "myTable" ><tr  id="tabletextcol" ><td>' + item.staffId + '</td>'
      +'<td>' + item.staffName + '</td><td>' + item.address + '</td>'
      +'<td>' + item.contactNo + '</td><td>' + item.roleName + '</td>'
      +'<td>' + item.salary + '</td><td class="city">' + item.city + '</td>'
      +'<td class="dob">' + item.dob + '</td><td class="gender">' + item.gender + '</td>'
      +'<td class="nationality">' + item.nationality + '</td>'
      +'<td class="joiningDate">' + item.joiningDate + '</td><td class="email">' + item.email + '</td>'
      +'</tr></tbody>';
   
      self.state.data[i] = {
        "EmpId":item.staffId,
        "Name":  item.staffName,
        "Address": item.address,
        "Contact": item.contactNo ,
        "Designation":item.roleName,
        "Salary":item.salary ,
        "City":item.city,
        "DOB":item.dob ,
        "Gender":item.gender,
        "Religion":item.religion ,
        "Nationality":item.nationality ,
        "JoiningDate": item.joiningDate,  
        "Email":item.email,
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

        
    };
   
   
   
    });
    $("#tableHeadings").append(tab);
    self.state.columns = self.getColumns();

    $(".city").hide();
    $(".dob").hide();
    $(".gender").hide();
    $(".religion").hide();
    $(".nationality").hide();
    $(".joiningDate").hide();
    $(".email").hide();
  }else{
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

  NoAction() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={StaffList1} />
        </div>
      </Router>,
      document.getElementById('contentRender'));

  }

  
  getColumns(){

    return Object.keys(this.state.data[0]).map(key => {
     if (

       key != "City" &&
       key != "DOB" &&
       key != "Gender" &&
       key != "Religion" &&
       key != "Nationality" &&
       key != "JoiningDate" &&
       key != "Email" 
     
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
                self.state.staffId =rowInfo.original["EmpId"];
                self.state.staffName = rowInfo.original["Name"];
                self.state.address =rowInfo.original["Address"]; // get current row 1st TD value
                self.state.contactNo =rowInfo.original["Contact"];
                self.state.roleName =rowInfo.original["Designation"];
                self.state.salary = rowInfo.original["Salary"]; // get current row 1st TD value
                self.state.city =rowInfo.original["City"];
                self.state.dob = rowInfo.original["DOB"];
                self.state.gender = rowInfo.original["Gender"];
                self.state.religion = rowInfo.original["Religion"];
                self.state.nationality = rowInfo.original["Nationality"];
                self.state.joiningDate =rowInfo.original["JoiningDate"];
                self.state.email = rowInfo.original["Email"];
          
                self.state.oldStaffName = self.state.staffName;  
                self.state.oldAddress = self.state.address;
                self.state.oldContactNo = self.state.contactNo;
                self.state.oldRoleName = self.state.roleName;
                self.state.oldSalary = self.state.salary;
                self.state.oldCity = self.state.city;
                self.state.oldDob = self.state.dob;  
                self.state.oldGender = self.state.gender;
                self.state.oldReligion = self.state.religion;
                self.state.oldNationality = self.state.nationality;
                self.state.oldJoiningDate = self.state.joiningDate;
                self.state.oldEmail = self.state.email;
               
          
          
          if( self.state.address =="null" || self.state.address =="-" )
          {
            self.state.address=" ";
          } if(self.state.contactNo =="null" || self.state.contactNo =="-")
          {
            self.state.contactNo=" ";
          } if(self.state.roleName =="null" || self.state.roleName =="-")
          {
            self.state.roleName=" ";
          } if(self.state.salary =="null" || self.state.salary =="-")
          {
            self.state.salary=" ";
          }if(self.state.city =="null" || self.state.city =="-")
          {
            self.state.city=" ";
          }
          if(self.state.dob =="null" || self.state.dob =="-")
          {
            self.state.dob=" ";
          }if(self.state.gender =="null" || self.state.gender =="-")
          {
            self.state.gender=" ";
          }if(self.state.religion =="null" || self.state.religion =="-")
          {
            self.state.religion=" ";
          }if(self.state.nationality =="null" || self.state.nationality =="-")
          {
            self.state.nationality=" ";
          }if(self.state.joiningDate =="null" || self.state.joiningDate =="-")
          {
            self.state.joiningDate=" ";
          }
          
          if(self.state.email =="null" || self.state.email =="-")
          {
            self.state.email=" ";
          }
          
          
                self.setState({
                  staffId: self.state.staffId,
                  staffName: self.state.staffName,
                  address: self.state.address,
                  contactNo: self.state.contactNo,
                  city: self.state.city,
                  roleName: self.state.roleName,
                  salary: self.state.salary,
                  email: self.state.email,
                  dob:self.state.dob,
                  gender:self.state.gender,
                  religion:self.state.religion,
                  nationality:self.state.nationality,
                  joiningDate:self.state.joiningDate,
          
                  oldStaffName :self.state.oldStaffName,  
                  oldAddress :self.state.oldAddress,
                  oldContactNo :self.state.oldContactNo,
                  oldRoleName :self.state.oldRoleName,
                  oldSalary : self.state.oldSalary,
                  oldCity : self.state.oldCity,
                  oldDob : self.state.oldDob,
                  oldGender : self.state.oldGender,
                  oldReligion : self.state.oldReligion,
                  oldNationality :self.state.oldNationality,
                  oldJoiningDate :self.state.oldJoiningDate,
                  oldEmail :self.state.oldEmail,
          
               
                
          
          
                })
                ReactDOM.render(<StaffListEdit staffId={self.state.staffId}
                  staffName={self.state.staffName} 
                  address={self.state.address} contactNo={self.state.contactNo} 
                  city={self.state.city} roleName={self.state.roleName} 
                  email={self.state.email} salary={self.state.salary} 
                  dob={self.state.dob}  gender={self.state.gender} religion={self.state.religion}
                  nationality={self.state.nationality} joiningDate={self.state.joiningDate}
                  oldStaffName = {self.state.oldStaffName}  
                  oldAddress = {self.state.oldAddress}
                  oldContactNo = {self.state.oldContactNo}
                  oldRoleName = {self.state.oldRoleName}
                  oldSalary = {self.state.oldSalary}
                  oldCity = {self.state.oldCity}
                  oldDob = {self.state.oldDob}
                  oldGender = {self.state.oldGender}
                  oldReligion = {self.state.oldReligion}
                  oldNationality = {self.state.oldNationality}
                  oldJoiningDate = {self.state.oldJoiningDate}
                  oldEmail = {self.state.oldEmail}
               />, document.getElementById("contentRender"));
          
          
            
              }

             
           } else if (column.Header == "Delete") {
             
       

             if(rowInfo!=undefined){
            
              self.state.staffId =rowInfo.original["EmpId"];
              self.state.contactNo =rowInfo.original["Contact"];
              self.state.staffName = rowInfo.original["Name"];
         
                self.setState({
                  staffName:self.state.staffName,
              contactNo:self.state.contactNo,
              staffId:self.state.staffId,
                })

                var rowIndexValue=rowInfo.index;
     
         
     
       Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Do you Want to Delete '+self.state.staffName,
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
            title:'Cancelled Deletion Of '+self.state.staffName,
            showConfirmButton: false,
            timer:2000,
          })
        }
      })
             }
           }else if (column.Header == "View") {
             
             if(rowInfo!=undefined){
              self.state.staffId =rowInfo.original["EmpId"];
              self.state.staffName = rowInfo.original["Name"];
              self.state.address =rowInfo.original["Address"]; // get current row 1st TD value
              self.state.contactNo =rowInfo.original["Contact"];
              self.state.roleName =rowInfo.original["Designation"];
              self.state.salary = rowInfo.original["Salary"]; // get current row 1st TD value
              self.state.city =rowInfo.original["City"];
              self.state.dob = rowInfo.original["DOB"];
              self.state.gender = rowInfo.original["Gender"];
              self.state.religion = rowInfo.original["Religion"];
              self.state.nationality = rowInfo.original["Nationality"];
              self.state.joiningDate =rowInfo.original["JoiningDate"];
              self.state.email = rowInfo.original["Email"];
        
        if( self.state.address =="null" || self.state.address =="-" )
        {
          self.state.address=" ";
        } if(self.state.contactNo =="null" || self.state.contactNo =="-")
        {
          self.state.contactNo=" ";
        } if(self.state.roleName =="null" || self.state.roleName =="-")
        {
          self.state.roleName=" ";
        } if(self.state.salary =="null" || self.state.salary =="-")
        {
          self.state.salary=" ";
        }if(self.state.city =="null" || self.state.city =="-")
        {
          self.state.city=" ";
        }
        if(self.state.dob =="null" || self.state.dob =="-")
        {
          self.state.dob=" ";
        }if(self.state.gender =="null" || self.state.gender =="-")
        {
          self.state.gender=" ";
        }if(self.state.religion =="null" || self.state.religion =="-")
        {
          self.state.religion=" ";
        }if(self.state.nationality =="null" || self.state.nationality =="-")
        {
          self.state.nationality=" ";
        }if(self.state.joiningDate =="null" || self.state.joiningDate =="-")
        {
          self.state.joiningDate=" ";
        }
        
        if(self.state.email =="null" || self.state.email =="-")
        {
          self.state.email=" ";
        }
        
        
              self.setState({
                staffId: self.state.staffId,
                staffName: self.state.staffName,
                address: self.state.address,
                contactNo: self.state.contactNo,
                city: self.state.city,
                roleName: self.state.roleName,
                salary: self.state.salary,
                email: self.state.email,
                dob:self.state.dob,
                gender:self.state.gender,
                religion:self.state.religion,
                nationality:self.state.nationality,
                joiningDate:self.state.joiningDate,
        
        
              
        
        
              })
              ReactDOM.render(<StaffListView staffId={self.state.staffId}
                staffName={self.state.staffName} 
                address={self.state.address} contactNo={self.state.contactNo} 
                city={self.state.city} roleName={self.state.roleName} 
                email={self.state.email} salary={self.state.salary} 
                dob={self.state.dob}  gender={self.state.gender} religion={self.state.religion}
                nationality={self.state.nationality} joiningDate={self.state.joiningDate}
             />, document.getElementById("contentRender"));
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
            contactNo:self.state.contactNo,
            companyId:this.state.companyId,
            staffId1: this.state.staffId1,
                   employeeName: this.state.employeeName,
                   role: this.state.role,
                   staffName:this.state.staffName,
                   staffId: this.state.staffId,
          }),
         url: " http://15.206.129.105:8080/MerchandiseAPI/staff/deletestaff",
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
              <Route path="/" component={StaffList1} />
          </div>
      </Router>,
      document.getElementById('contentRender'));

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

AddEmployeePageFunc(){
  ReactDOM.render(
    <Router>
      <div>
      
        <Route path="/" component={AddStaff} />
      

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
                <div class="card-header">
         <h3 style={{fontWeight:"300",color:"black"}}>Employee Report</h3>
         <hr></hr>   </div>   
      <div>
      <div class="card-body">

       
        <div    style={{ display: "grid" }}>

                     <div className="row">
        <div className="col-sm-4 col-lg-8 col-md-8">
        
        </div>
        <div className="col-sm-4 col-lg-2 col-md-2">
        <a class="pageredirectbtn" href="#"  onClick={() => this.AddEmployeePageFunc()}>
          <span style={{fontWeight:"700",fontWeight: "900",fontSize:"15px"}}>+ Employee</span>
         </a>
</div>
<div className="col-sm-4 col-lg-2 col-md-2">
    
<div class="buttonright" >
                  <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                     table="tableHeadings"
                     filename="Staff_List"
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
        </div>
</div>
      
      </div>
    );
  }

}

export default StaffList1;