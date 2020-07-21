
import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


import BankReportEdit from './BankReportEdit';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import FooterText from './FooterText';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import './DownloadButton.css';
import "./MainPageRedirectButton.css";
import AddBank from './AddBank';


var currentRow;
class BankReport extends Component {
  constructor(data) {
    super(data)

    var today = new Date();
    today = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
 var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
 var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    this.state = {
      bankId:'',
      month:'',
      staffId:staffId,
      employeeName:employeeName,
     role:role,  
      data:[],
      columns:[],
      
    };

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
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId:this.state.companyId,
        
      }),
     url: " http://15.206.129.105:8080/MerchandiseAPI/staff/bankreport",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {
        var no;
        if(data.bankRetrieveList.length!=0){
    var tab = '<thead><tr class="headcolor"><th>S.No</th><th>BankName</th>'
    +'<th>Acc.Name</th><th>Acc.No</th><th>Branch</th><th>IFSC Code</th>'
    +'</tr></thead>';
    
    
    $.each(data.bankRetrieveList, function (i, item) {
        no = parseInt(i) + 1;
      tab += '<tbody id= "myTable" ><tr id="tabletextcol" ><td>' +no  + '</td><td>' + item.bankName + '</td>'
      +'<td>' + item.accountName + '</td><td>' + item.accountNo + '</td><td>' + item.branchName + '</td>'
      +'<td>' + item.ifscCode + '</td>'
    
        self.state.data[i] = {
          "SNo":no,
          "BankName":  item.bankName,
          "AccName": item.accountName,
          "AccNo": item.accountNo ,
          "Branch": item.branchName ,
          "IFSC Code":item.ifscCode,
          "BankId":item.bankId ,
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
      

          
      };
  
  
  
  
    });

    self.state.columns = self.getColumns();

    $("#tableHeadings").append(tab);
    $(".bankId").hide();
  }else{
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
     if (
       key != "BankId" 
    
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

              self.state.bankName = rowInfo.original["BankName"];
              self.state.accountName = rowInfo.original["AccName"]; // get current row 1st TD value
              self.state.accountNo = rowInfo.original["AccNo"];
              self.state.branchName =rowInfo.original["Branch"];
              self.state.ifscCode = rowInfo.original["IFSC Code"];
              self.state.bankId = rowInfo.original["BankId"];// get current row 1st TD value
           
        
              self.setState({
                bankName: self.state.bankName,
                accountName: self.state.accountName,
                accountNo: self.state.accountNo,
                branchName: self.state.branchName,
                ifscCode: self.state.ifscCode,
                bankId: self.state.bankId,
            
        
        
              })
              ReactDOM.render(<BankReportEdit bankName={self.state.bankName}
                accountName={self.state.accountName} accountNo={self.state.accountNo} branchName={self.state.branchName} ifscCode={self.state.ifscCode} bankId={self.state.bankId} 
                  />, document.getElementById("contentRender"));
        
              }
    
             
           } else if (column.Header == "Delete") {
             
           
            

             if(rowInfo!=undefined){
           
              self.state.accountNo = rowInfo.original["AccNo"];
              self.state.bankId = rowInfo.original["BankId"];// get current row 1st TD value
       
             var rowIndexValue=rowInfo.index;
         
              self.setState({
                bankId:self.state.bankId,
                accountNo:self.state.accountNo,
          
          
              })
     
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Do you Want to Delete '+self.state.accountNo,
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
            title:'Cancelled Deletion Of '+self.state.accountNo,
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

  NoAction() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={BankReport} />
        </div>
      </Router>,
      document.getElementById('contentRender'));

  }
    DeleteFunc(rowIndexValue)
    {

    
  var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
  this.state.companyId = companyId;
  this.setState({
      companyId: companyId,
  });
  var self=this;
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                accountNo:self.state.accountNo,            
                companyId:this.state.companyId,
                staffId: self.state.staffId,
                   employeeName: self.state.employeeName,
                   role: self.state.role,
            }),
           url: " http://15.206.129.105:8080/MerchandiseAPI/staff/deleteBank",
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

    AddBankPageFunc(){
      ReactDOM.render(
        <Router>
          <div>
          
            <Route path="/" component={AddBank} />
          
    
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
         <h3 style={{fontWeight:"300",color:"black"}}>Bank Report</h3>
         <hr></hr>   </div>
      <div>
      <div class="card-body">

        <div    style={{ display: "grid" }}>
   
                       <div className="row">
        <div className="col-sm-4 col-lg-8 col-md-8">
        
        </div>
        <div className="col-sm-4 col-lg-2 col-md-2">
        <a class="pageredirectbtn" href="#"  onClick={() => this.AddBankPageFunc()}>
          <span style={{fontWeight:"700",fontWeight: "900",fontSize:"15px"}}>+ Bank</span>
         </a>
</div>
<div className="col-sm-4 col-lg-2 col-md-2">
    
<div class="buttonright" >
                  <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                     table="tableHeadings"
                     filename="BankList_Report"
                    sheet="tablexls"
					         className="pageredirectbtn download-table-xls-button "
                    buttonText={downloadButtonData}      />
                </div>
</div>
        </div>
        <div id="tableOverflow">
          <table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">

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
        </div>
        </div>
</div>
      
      </div>
    );
  }

}

export default BankReport;