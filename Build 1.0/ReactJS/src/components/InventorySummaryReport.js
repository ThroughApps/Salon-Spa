
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import './datepicker.css';
import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import {
    BrowserRouter as Router,
    Route,
    NavLink
} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import ReportMenuPage from './ReportMenuPage';
import ReportMenuPagePremium from './ReportMenuPagePremium';
import ReportMenuPageBasic from './ReportMenuPageBasic';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert';
import moment from 'moment';
import './ProfitLossReport.css';
import _ from 'underscore';
import HSBar from "react-horizontal-stacked-bar-chart";
import * as bootstrap from "bootstrap";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import Case from "case";
var numberToWord = require('npm-number-to-word');


var days1;
var today;
var currentRow;
var greaterNo;
var totalcost=0;
class InventorySummaryReport extends Component {

 

    constructor(props) {
         today = new Date();
         var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
  
        super(props)
        this.state = {
            fromDate: '',
            toDate: '',
            companyId: companyId,
            period:'',
            data:[],
            columns:[],

        }

    }
  
    componentDidMount() {

       
        window.scrollTo(0, 0);
        var self = this;
 
        
        var currentYear = today.getFullYear();

        
        this.GetInventorySummaryReport();
    
    }

   
 


  
  
   
    GetInventorySummaryReport(){

        var date=today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
        var self=this;
      
        
        
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                companyId: this.state.companyId,
                          
            }),

            url: " http://15.206.129.105:8080/MerchandiseAPI/InventoryReport/InventorySummaryReport",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {

   

                var tab=' <thead><tr class="headcolor"><th class="headcolor">SNo</th><th class="headcolor">Name</th>'
                + '<th class="headcolor">Avaialble Stock</th><th>PurchaseRate/Unit</th>'
                +'<th>SaleRate/Unit</th><th>Total InventoryAmount</th></tr></thead>';
                var no=0;
                self.state.data=[];
                var ivalue=0;
                totalcost=0;

                $.each(data, function (i, item) {

                    no=Number(no)+Number(1);
                    
                    if(item.productType=="product"){

                        var cost=Number(item.quantity)*Number(item.saleRate);

                        totalcost=Number(totalcost)+Number(cost);
                        tab+=  '<tbody id= "myTable" ><tr class="" style=" background-color: white;">'
                        +'<td class="hide">'+item.productId+'</td>'
                        +'<td>' +no+'</td><td>'+item.productName+'</td>'
                        +'<td>'+item.quantity+'</td><td>'+item.purchaseRate+'</td>'
                        +'<td>'+item.saleRate+'</td><td>'+cost+'</td></tr></tbody >';
    
                        self.state.data[i]={
                            "ProductId":item.productId,
                            "SNO":no,
                            "Name":item.productName,
                            "Quantity":item.quantity,
                            "PurchaseRate":item.purchaseRate,
                            "SaleRate":item.saleRate,
                            "Total InventoryAmount":cost
    
                        }

                    }else{

                        var cost=item.saleRate;

                        totalcost=Number(totalcost)+Number(cost);
                        tab+=  '<tbody id= "myTable" ><tr class="" style=" background-color: white;">'
                        +'<td class="hide">'+item.productId+'</td>'
                        +'<td>' +no+'</td><td>'+item.productName+'</td>'
                        +'<td>'+item.quantity+'</td><td>'+item.purchaseRate+'</td>'
                        +'<td>'+item.saleRate+'</td><td>'+cost+'</td></tr></tbody >';
    
                        self.state.data[i]={
                            "ProductId":item.productId,
                            "SNO":no,
                            "Name":item.productName,
                            "Quantity":"-",
                            "PurchaseRate":"-",
                            "SaleRate":item.saleRate,
                            "Total InventoryAmount":cost
    
                        }
                    }
                   
                    ivalue=i;
                });

                self.state.data[Number(ivalue)+1]={
                    "ProductId":"",
                        "SNO":"",
                        "Name":"",
                        "Quantity":"",
                        "PurchaseRate":"",
                        "SaleRate":<div style={{fontWeight:"600"}}>{"Inventory Amount"}</div>,
                        "Total InventoryAmount":<div style={{fontWeight:"600"}}>{Number(totalcost).toFixed(2)}</div>
                    
                }
                self.state.columns = self.GetColumns();

                if(totalcost==0){
                    $("#numWords").text("Zero");
                }else{
                    var totalcostRound=Number(totalcost).toFixed(2);
                    var numtoword = numberToWord(totalcostRound);
                    $("#numWords").text(Case.capital(numtoword));
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
  
    GetColumns(){

        return Object.keys(this.state.data[0]).map(key => {
         if (
           key != "ProductId" 
          
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


     BackbtnFunc() {
        var planName = CryptoJS.AES.decrypt(localStorage.getItem("PlanName"),"shinchanbaby").toString(CryptoJS.enc.Utf8);
      
      //	 alert("plantype"+planName);
       if(planName.toLowerCase() =="basic"){

           ReactDOM.render(
               <Router>
                   <div >
                       <Route exact path="/" component={ReportMenuPageBasic} />
                   
                       </div>
               </Router>, document.getElementById('contentRender'));
           registerServiceWorker();
       }
       else if(planName.toLowerCase() =="premium"){
   
           ReactDOM.render(
               <Router>
                   <div >			
                       <Route exact path="/" component={ReportMenuPagePremium} />
                    
                   </div>
               </Router>,
                  document.getElementById('contentRender'));
           registerServiceWorker();
       }
      else if(planName.toLowerCase() =="elite"){
    
      
       ReactDOM.render(
           <Router>
               <div >	
                   <Route exact path="/" component={ReportMenuPage} />
                 
                   </div>
           </Router>, 
           document.getElementById('contentRender'));
       registerServiceWorker();
      }
      
      }

    render() {


        return (

            <div className="container">
                      <div class="card">
                <div class="row">
          <div class="col-sm-2 ">
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

          </div> 
          <div class="col-sm-10 ">
                    <div class="card-header">
                          <h3 id="companyHeader" style={{marginLeft:"150px"}}> {this.state.companyName}</h3>
                  
                  <h4  id="reportHeader" style={{marginLeft:"130px"}}>Stock Summary Report</h4>
             
                    
                      </div>
                    </div> 
 </div>
    <ReactTable style={{overflow:"auto"}}
              data={this.state.data}
              columns={this.state.columns}
              noDataText="No Data Available"
              filterable={false}
              defaultPageSize={5}
              PageSize={this.state.data.length}
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
          
            />
   
             

                <div class="col-sm-6" id="amountinwordsdiv">
                 <p class="lead">Amount In Words:   <span id="numWords"></span> Rupees Only</p>

                  </div>

</div>
            </div>
        );
    }

}
export default InventorySummaryReport;