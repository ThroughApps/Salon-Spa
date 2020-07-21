
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
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';

var i;
class GST3B1 extends Component {
  constructor(props) {
    super(props)
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
   
    this.state = {
      date: '',
      companyId: '',
      employeeId: '',
      fromDate: '',
      toDate: '',
      companyId:companyId,
      month:'',
      totalgst: 0,
      totalcgst: 0,
      totalsgst: 0,
      totaligst: 0,
      totalgst1: 0,
      totalcgst1: 0,
      totalsgst1: 0,
      totaligst1: 0,
   
    }
    var today = new Date();
    today = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
   
    
  }


  componentDidMount(){
    window.scrollTo(0, 0);      
   
  }
  MonthlyFunc(value) {
    var self=this;
    window.scrollTo(0, 0);
    $(function() {
      $( 'ul.nav li' ).on( 'click', function() {
            $( this ).parent().find( 'li.active' ).removeClass( 'active' );
            $( this ).addClass( 'active' );
           // $('.active').css('background-color', 'blue');
      });
});
    self.state.totalgst = 0;
    self.state.totalcgst = 0;
    self.state.totalsgst = 0;
    self.state.totaligst = 0;
    self.state.totalgst1 = 0;
    self.state.totalcgst1 = 0;
    self.state.totalsgst1 = 0;
    self.state.totaligst1 = 0;
    self.setState({
      totalgst: 0,
      totalcgst: 0,
      totalsgst: 0,
      totaligst: 0,
      totalgst1: 0,
      totalcgst1: 0,
      totalsgst1: 0,
      totaligst1: 0,  
    });
    var today = new Date();

    var val1 = value;

    if (value == ("01") || value == ("03") || value == ("05") || value == ("07") || value == ("08") || value == ("10") || value == ("12")) {

      var j = (i - 1);
      if (j == val1) {

        this.state.fromDate = today.getFullYear() + '-' + val1 + '-' + '01';
        this.state.toDate = today.getFullYear() + '-' + val1 + '-' + today.getDate();
        this.state.month=value;

      } else {

        this.state.fromDate = today.getFullYear() + '-' + value + '-' + '01';
        this.state.toDate = today.getFullYear() + '-' + value + '-' + '31';
         this.state.month=value;
      }
      this.setState({
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
        month:this.state.month,
      });

    }
    else if (value == ("04") || value == ("06") || value == ("09") || value == ("11")) {
      var j = (i - 1);
      if (j == val1) {
        this.state.fromDate = today.getFullYear() + '-' + val1 + '-' + '01';
        this.state.toDate = today.getFullYear() + '-' + val1 + '-' + today.getDate();
         this.state.month=value;
      } else {

        this.state.fromDate = today.getFullYear() + '-' + value + '-' + '01';
        this.state.toDate = today.getFullYear() + '-' + value + '-' + '30';
         this.state.month=value;
      }
      this.setState({
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
        month:this.state.month,
      });
    } else if (value == ("02")) {
      if (today.getFullYear() % 100 == 0 && today.getFullYear() % 400 == 0 && today.getFullYear() % 4 == 0) {
        var j = (i - 1);
        if (j == val1) {
          this.state.fromDate = today.getFullYear() + '-' + val1 + '-' + '01';
          this.state.toDate = today.getFullYear() + '-' + val1 + '-' + today.getDate();
           this.state.month=value;
        } else {

          this.state.fromDate = today.getFullYear() + '-' + value + '-' + '01';
          this.state.toDate = today.getFullYear() + '-' + value + '-' + '29';
           this.state.month=value;
        }
        this.setState({
          fromDate: this.state.fromDate,
          toDate: this.state.toDate,
          month:this.state.month,
        });

      }
      else {
        this.state.fromDate = today.getFullYear() + '-' + value + '-' + '01';
        this.state.toDate = today.getFullYear() + '-' + value + '-' + '28';
         this.state.month=value;
        this.setState({
          fromDate: this.state.fromDate,
          toDate: this.state.toDate,
          month:this.state.month,
        });
      }

    }

   
    this.setState({     
      month: this.state.month,
    });




    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        month: this.state.month,
        companyId:this.state.companyId,
      }),
      url: " http://15.206.129.105:8080/MerchandiseAPI/gst/salereport",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
      //  var tab = '<thead><tr class="headcolor"><th>Total Taxable</th><th>Total CGST</th><th>Total SGST</th><th>Total IGST</th></tr></thead>';
        $.each(data.saleRetrievelist, function (i, item) {

          self.state.totalgst= item.totalgst;
          self.state.totalcgst= item.totalcgst;
          self.state.totalsgst= item.totalsgst;
          self.state.totaligst= item.totaligst;
        
          self.setState({
            totalgst:item.totalgst,
            totalcgst:item.totalcgst,
            totalsgst:item.totalsgst,
            totaligst:item.totaligst,



          }) 


          
          //tab += '<tbody id= "myTable" ><tr class="success"  id="tabletextcol" ><td>' + item.totalgst + '</td><td>' + item.totalcgst + '</td><td>' + item.totalsgst + '</td><td>' + item.totaligst + '</td></tr></tbody>';
        });
     //   $("#tableHeadings").append(tab);

        ReactDOM.render(
          <Router>
            <div>
              <Route path="/" component={GST3B1} />        

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



      },
    });

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        month: this.state.month,
        companyId:this.state.companyId,
      }),
      url: " http://15.206.129.105:8080/MerchandiseAPI/gst/purchasereport",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
      //  var tab = '<thead><tr class="headcolor"><th>Total Taxable</th><th>Total CGST</th><th>Total SGST</th><th>Total IGST</th></tr></thead>';
        $.each(data.purchaseRetrievelist, function (i, item) {

          self.state.totalgst1= item.totalgst;
          self.state.totalcgst1= item.totalcgst;
          self.state.totalsgst1= item.totalsgst;
          self.state.totaligst1= item.totaligst;
        
          self.setState({
            totalgst1:item.totalgst,
            totalcgst1:item.totalcgst,
            totalsgst1:item.totalsgst,
            totaligst1:item.totaligst,

          }) 
          //tab += '<tbody id= "myTable" ><tr class="success"  id="tabletextcol" ><td>' + item.totalgst + '</td><td>' + item.totalcgst + '</td><td>' + item.totalsgst + '</td><td>' + item.totaligst + '</td></tr></tbody>';
        });
     //   $("#tableHeadings").append(tab);

        ReactDOM.render(
          <Router>
            <div>
              <Route path="/" component={GST3B1} />        

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



      },
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
  render() {
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
      <div class="card-header" style={{backgroundColor:"white"}}>
      <ul class="nav nav-tabs">
    <li class="active"><a  style={{color:"black",fontWeight:"bold",cursor: "pointer"}}  className="active"  id="1" onClick={(e) => this.MonthlyFunc("01")}><span style={{display:"inline-grid"}}>January</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold",cursor: "pointer"}}  id="2" onClick={(e) => this.MonthlyFunc("02")}><span style={{display:"inline-grid"}}>Febuary</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold",cursor: "pointer"}}  id="3" onClick={(e) => this.MonthlyFunc("03")}><span style={{display:"inline-grid"}}>March</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold",cursor: "pointer"}}  id="4" onClick={(e) => this.MonthlyFunc("04")}><span style={{display:"inline-grid"}}>April</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold",cursor: "pointer"}}  id="5" onClick={(e) => this.MonthlyFunc("05")}><span style={{display:"inline-grid"}}>May</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold",cursor: "pointer"}}  id="6" onClick={(e) => this.MonthlyFunc("06")}><span style={{display:"inline-grid"}}>June</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold",cursor: "pointer"}}  id="7" onClick={(e) => this.MonthlyFunc("07")}><span style={{display:"inline-grid"}}>July</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold",cursor: "pointer"}}  id="8" onClick={(e) => this.MonthlyFunc("08")}><span style={{display:"inline-grid"}}>August</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold",cursor: "pointer"}}  id="9" onClick={(e) => this.MonthlyFunc("09")}><span style={{display:"inline-grid"}}>September</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold",cursor: "pointer"}}  id="10" onClick={(e) => this.MonthlyFunc("10")}><span style={{display:"inline-grid"}}>October</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold",cursor: "pointer"}}  id="11" onClick={(e) => this.MonthlyFunc("11")}><span style={{display:"inline-grid"}}>November</span></a></li>
    <li><a  style={{color:"black",fontWeight:"bold",cursor: "pointer"}}  id="12" onClick={(e) => this.MonthlyFunc("12")}><span style={{display:"inline-grid"}}>December</span></a></li>
             
  </ul>
      </div> </div>
      <div>
      <div class="card-body">
    
        <div class="form-group">

<div class="col-sm-6">
  <div class="table-responsive">
     <table class="table">
       <tbody>
       <tr><th style={{ width: "50%" }}>TOTALGST:</th>
       <td name="totalgst" >₹  {this.state.totalgst} <span id="totalgst"></span></td>                        
                    </tr>
        
                          <tr><th>TOTALCGST:</th>
                          <td name="totalcgst" >₹  {this.state.totalcgst} <span id="totalcgst"></span></td>
                           </tr>
                      
                        <tr><th>TOTALSGST:</th>
                        <td name="totalsgst" >₹  {this.state.totalsgst} <span id="totalsgst"></span></td>
                            </tr>
  <tr><th>TOTALIGST:</th>
  <td name="totaligst" >₹  {this.state.totaligst} <span id="totaligst"></span></td>
                    
  </tr>
                       
             <tr><th></th>
                <td>
                <p class="pull-right"><strong style={{color:"black"}}>Sale</strong></p>
               </td>    
                
                   </tr>

             </tbody>
              </table></div>

</div>

<div class="col-sm-6">
 <div class="table-responsive">
     <table class="table">
       <tbody>
       <tr><th style={{ width: "50%" }}><span style={{width:"30px"}}>TOTALGST:</span></th>
       <td name="totalgst1" >₹  {this.state.totalgst1} <span id="totalgst1"></span></td>
                     </tr>
        
                          <tr><th>TOTALCGST:</th>
                          <td name="totalcgst1" >₹  {this.state.totalcgst1} <span id="totalcgst1"></span></td>
          </tr>
                  
                        <tr><th>TOTALSGST:</th>
                        <td name="totalsgst1" >₹  {this.state.totalsgst1} <span id="totalsgst1"></span></td>
     
                            </tr>
  <tr><th>TOTALIGST:</th>
  <td name="totaligst1" >₹  {this.state.totaligst1} <span id="totaligst1"></span></td>
     
  
    </tr>
                       
             <tr><th></th>
                <td>
                <p class="pull-right"><strong style={{color:"black"}}>Purchase</strong></p>
               </td>    
                
                   </tr>

             </tbody>
              </table></div>
</div>
</div>
       
        </div>
        </div>
</div>
    );
  }

}

export default GST3B1;