
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
import ReactTable from "react-table";
import "react-table/react-table.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import Case from "case";
var numberToWord = require('npm-number-to-word');

var days1;
var today;
var sizeDataValue;
class ProfitLossReport extends Component {

 

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
           SizeData:0,
            

        }

    }
  
    componentDidMount() {

       
        window.scrollTo(0, 0);
        var self = this;
     
        var currentYear = today.getFullYear();
    
        
        $("#amountinwordsdiv").hide();

    $(".monthPicker").datepicker({
      dateFormat: "MM yy",
      changeMonth: true,
      changeYear: false,
      showButtonPanel: true,
      yearRange: new Date().getFullYear() - 10 + ":" + new Date().getFullYear(),
      onClose: function(dateText, inst) {
          if(self.state.period=="monthly"){
        var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
        if(month > today.getMonth()+1){
         
                        
            Swal.fire({
                position: 'center',
                icon: 'error',
                title:  'Kindly Select Current or Previous Month To Proceed',  
                showConfirmButton: false,
                timer: 2000
            })
        }else{
        var year = currentYear;
        $(this).val($.datepicker.formatDate("MM yy", new Date(year, month, 1)));
        var selectedMonth = Number(month) + 1;
        self.state.monthName = moment().month(selectedMonth-1).format('MMMM');
        self.state.dispyear=year;
        self.GetMonthData(selectedMonth, year);
        }
          }else{
         
            Swal.fire({
                position: 'center',
                icon: 'error',
                title:'Kindly Select Period To Proceed',   
                showConfirmButton: false,
                timer: 2000
              })
              
          }
      }
    });

    $(".monthPicker").focus(function() {
     $(".ui-datepicker-year").hide();
      $(".ui-datepicker-calendar").hide();
      $("#ui-datepicker-div").position({
        my: "center top",
        at: "center bottom",
        of: $(this)
      });
    
    });


    $('.yearPicker').datepicker({
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'yy',
        onClose: function(dateText, inst) { 
            if(self.state.period=="yearly"){
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            if(year > today.getFullYear()){
               
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Kindly Select Current or Previous Years To Proceed',    
                    showConfirmButton: false,
                    timer: 2000
                  })

            }else{
            $(this).datepicker('setDate', new Date(year, 1));
            $(".ui-datepicker-month").hide();
            $(".ui-datepicker-calendar").hide();
            self.YearSubmit(year);
            }
            }else{
               
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Kindly Select Period To Proceed', 
                    showConfirmButton: false,
                    timer: 2000
                  })
              }
        }
    });
    

$(".yearPicker").focus(function () {
        $(".ui-datepicker-month").hide();
        $(".ui-datepicker-calendar").hide();
        $("#ui-datepicker-div").position({
            my: "center top",
            at: "center bottom",
            of: $(this)
          });
    });
    
  

    
    }


    handleUserInput = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });

        if(value=="daily"){
           // $( ".monthPicker" ).datepicker( "option", "disabled", true );
           // $( ".yearPicker" ).datepicker( "option", "disabled", true );

            $("#monthdiv").hide();
            $("#yeardiv").hide();
            $("#tableheading").empty();
            $("#amountinwordsdiv").hide();

            this.state.data=[];
          this.state.columns=[];
           

            this.DailySubmit();

        }else if(value=="weekly"){
         //   $( ".monthPicker" ).datepicker( "option", "disabled", true );
          //  $( ".yearPicker" ).datepicker( "option", "disabled", true );

          $("#monthdiv").hide();
          $("#yeardiv").hide();
          $("#tableheading").empty();
          $("#amountinwordsdiv").hide();

          this.state.data=[];
          this.state.columns=[];
           

            this.WeeklySubmit();
        }else if(value=="monthly"){
          //  $( ".monthPicker" ).datepicker( "option", "disabled", false );
          //  $( ".yearPicker" ).datepicker( "option", "disabled", true );

          $("#monthdiv").show();
          $("#yeardiv").hide();
          $("#tableheading").empty();
          $("#amountinwordsdiv").hide();

          this.state.data=[];
          this.state.columns=[];
          

        }else if(value=="yearly"){
        //  $( ".monthPicker" ).datepicker( "option", "disabled", true );
        //  $( ".yearPicker" ).datepicker( "option", "disabled", false );

        $("#monthdiv").hide();
        $("#yeardiv").show();
        $("#tableheading").empty();
        $("#amountinwordsdiv").hide();

        this.state.data=[];
        this.state.columns=[];
          
        }

    }


    GetMonthData(selectedMonth, year) {
        var self=this;
        var today = new Date();
        var currentMonth = today.getMonth() + 1;
        days1 = new Date(year, selectedMonth, 0).getDate();
        
        if (
          selectedMonth == "01" ||
          selectedMonth == "03" ||
          selectedMonth == "05" ||
          selectedMonth == "07" ||
          selectedMonth == "08" ||
          selectedMonth == "10" ||
          selectedMonth == "12"
        ) {
          if (selectedMonth == currentMonth) {
            this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
            this.state.toDate = year + "-" + selectedMonth + "-" + today.getDate();
          } else {
            this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
            this.state.toDate = year + "-" + selectedMonth + "-" + "31";
          }
    
          this.setState({
            fromDate: this.state.fromDate,
            toDate: this.state.toDate,
            month: this.state.month
          });
        } else if (
          selectedMonth == "04" ||
          selectedMonth == "06" ||
          selectedMonth == "09" ||
          selectedMonth == "11"
        ) {
          if (selectedMonth == currentMonth) {
            this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
            this.state.toDate = year + "-" + selectedMonth + "-" + today.getDate();
          } else {
            this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
            this.state.toDate = year + "-" + selectedMonth + "-" + "30";
          }
          this.setState({
            fromDate: this.state.fromDate,
            toDate: this.state.toDate,
            month: this.state.month
          });
        } else if (selectedMonth == "02") {
          if (year % 100 == 0 && year % 400 == 0 && year % 4 == 0) {
            if (selectedMonth == currentMonth) {
              this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
              this.state.toDate =
                year + "-" + selectedMonth + "-" + today.getDate();
            } else {
              this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
              this.state.toDate = year + "-" + selectedMonth + "-" + "29";
            }
            this.setState({
              fromDate: this.state.fromDate,
              toDate: this.state.toDate,
              month: this.state.month
            });
          } else {
            if (selectedMonth == currentMonth) {
              this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
              this.state.toDate =
                year + "-" + selectedMonth + "-" + today.getDate();
            } else {
              this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
              this.state.toDate = year + "-" + selectedMonth + "-" + "28";
            }
            this.setState({
              fromDate: this.state.fromDate,
              toDate: this.state.toDate,
              month: this.state.month
            });
          }
        }
    
        this.MonthSubmit(selectedMonth);
      }

  
   
    DailySubmit(){

        var date=today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
        var self=this;
    

        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                companyId: this.state.companyId,
                date: date,
             
            }),

            url: " http://15.206.129.105:8080/MerchandiseAPI/ProfitLossReport/Daily",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {

            
                var salesAmount=0;
                var estimateAmount=0;
                var purchaseAmount=0;
                var expenseAmount=0;
                var totalgstAmount=0;
                

                if(data.totalSales!=null){
                    salesAmount=data.totalSales;
                }
                if(data.totalEstimate!=null){
                    estimateAmount=data.totalEstimate;
                }
                if(data.totalPurchase!=null){
                    purchaseAmount=data.totalPurchase;
                }
                if(data.totalExpense!=null){
                    expenseAmount=data.totalExpense;
                }
                if(data.totalGST!=null){
                    totalgstAmount=data.totalGST
                }
                var loss=Number(purchaseAmount)+Number(expenseAmount)+Number(totalgstAmount);
                var profit=Number(Number(salesAmount)+Number(estimateAmount))-Number(loss);

                var profitNum= Math.sign(profit);
                if(profitNum==-1 || profitNum==-0){
                    profit=0;
                }
              

                if(data.configValue==0){
                  
                    self.state.data=[];
                         self.state.data[0] = {
                            "Sales": salesAmount,
                            "Tax":totalgstAmount,
                            "Purchase": purchaseAmount,
                            "Expense": expenseAmount,
                            "Profit": profit,
                            "Loss": loss
                            
                        };
                        self.state.columns = self.getColumnsWithoutEstimate();
                   
                        self.state.SizeData=1;
                        self.state.pagination=false;
           

                    if(profit==0){
                        $("#numWordsProfit").text("Zero");
                    }else{
                        var numtowordProfit = numberToWord(Number(profit));
                        $("#numWordsProfit").text(Case.capital(numtowordProfit));
                    }
                    if(loss==0){
                        $("#numWordsLoss").text("Zero");
                    }else{
                    var numtowordLoss = numberToWord(Number(loss));
                    $("#numWordsLoss").text(Case.capital(numtowordLoss));
                    }

                }else if(data.configValue==1){
              
                    self.state.data=[];
                 self.state.data[0] = {
                    "Sales": salesAmount,
                    "Estimate": estimateAmount,
                    "Tax":totalgstAmount,
                    "Purchase": purchaseAmount,
                    "Expense": expenseAmount,
                    "Profit": profit,
                    "Loss": loss
                    
                };
               
                 self.state.SizeData=1;
              
                 self.state.pagination=false;
                 self.state.columns = self.getColumnsWithEstimate();
                 
                 if(profit==0){
                    $("#numWordsProfit").text("Zero");
                }else{
                    var numtowordProfit = numberToWord(Number(profit));
                    $("#numWordsProfit").text(Case.capital(numtowordProfit));
                }
                if(loss==0){
                    $("#numWordsLoss").text("Zero");
                }else{
                var numtowordLoss = numberToWord(Number(loss));
                $("#numWordsLoss").text(Case.capital(numtowordLoss));
                }
         
            }
                
            $("#amountinwordsdiv").show();

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
  
    WeeklySubmit(){

        var self=this;

        var date=today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
      
        var startOfWeek = moment().startOf('week').toDate();
        var endOfWeek   = moment().endOf('week').toDate();

        var fromDate=moment(startOfWeek).format('YYYY-MM-DD');
      

        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                companyId: this.state.companyId,
                fromDate:fromDate,
                toDate:date
             
            }),

            url: " http://15.206.129.105:8080/MerchandiseAPI/ProfitLossReport/Weekly",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
             
                var configValue=data.slice(-1)[0].configValue;

                
               
                    $("#tableheading").empty();
                    var tabHeading='<h3>Weekly  Report - '+fromDate+ " to " +date+'</h3>';
                    $("#tableheading").append(tabHeading);
               
                if(configValue==0){
                    var totalProfit=0;
                    var totalLoss=0;
                    self.state.data=[];
                    var ivalue=0;

                    for(var i=0;i<data.length-1;i++){

                        var salesAmount=0;
                        var estimateAmount=0;
                        var purchaseAmount=0;
                        var expenseAmount=0;
                        var totalgstAmount=0;
        
                        if(data[i].totalSales!=null){
                            salesAmount=data[i].totalSales;
                        }
                        if(data[i].totalPurchase!=null){
                            purchaseAmount=data[i].totalPurchase;
                        }
                        if(data[i].totalExpense!=null){
                            expenseAmount=data[i].totalExpense;
                        }
                        if(data[i].totalGST!=null){
                            totalgstAmount=data[i].totalGST;
                        }
        
                        var loss=Number(purchaseAmount)+Number(expenseAmount)+Number(totalgstAmount);
                        var profit=Number(salesAmount)-Number(loss);
                        totalProfit=Number(totalProfit)+Number(profit);
                        totalLoss=Number(totalLoss)+Number(loss);
                     
                        var profitNum= Math.sign(profit);
                        if(profitNum==-1 || profitNum==-0){
                            profit=0;
                        }

                        var totalprofitNum= Math.sign(totalProfit);
                        if(totalprofitNum==-1 || totalprofitNum==-0){
                            totalProfit=0;
                        }

                         self.state.data[i] = {
                            "Date":data[i].date,
                           "Sales": salesAmount,
                           "Tax":totalgstAmount,
                           "Purchase": purchaseAmount,
                           "Expense": expenseAmount,
                           "Profit": profit,
                           "Loss": loss
                           
                       };
                       ivalue=i;
                    }
                    self.state.SizeData=9;
                    self.state.pagination=false;
                    self.state.columns = self.getColumnsWithoutEstimate();

                    
                     
                }else if(configValue==1){
             
                     var totalProfit=0;
                     var totalLoss=0;
                     self.state.data=[];
                     var ivalue=0;
                     var totalgstAmount=0;

                for(var i=0;i<data.length-1;i++){

                    var salesAmount=0;
                    var estimateAmount=0;
                    var purchaseAmount=0;
                    var expenseAmount=0;
    
                    if(data[i].totalSales!=null){
                        salesAmount=data[i].totalSales;
                    }
                    if(data[i].totalEstimate!=null){
                        estimateAmount=data[i].totalEstimate;
                    }
                    if(data[i].totalPurchase!=null){
                        purchaseAmount=data[i].totalPurchase;
                    }
                    if(data[i].totalExpense!=null){
                        expenseAmount=data[i].totalExpense;
                    }
                    if(data[i].totalGST!=null){
                        totalgstAmount=data[i].totalGST;
                    }
    
                    var loss=Number(purchaseAmount)+Number(expenseAmount)+Number(totalgstAmount);
                    totalLoss=Number(totalLoss)+Number(loss);
                    var profit=Number(Number(salesAmount)+Number(estimateAmount))-Number(loss);
                    totalProfit=Number(totalProfit)+Number(profit);
                  
                    var profitNum= Math.sign(profit);
                    if(profitNum==-1 || profitNum==-0){
                        profit=0;
                    }
                  
                    var totalprofitNum= Math.sign(totalProfit);
                    if(totalprofitNum==-1 || totalprofitNum==-0){
                        totalProfit=0;
                    }

              
                 self.state.data[i] = {
                     "Date":data[i].date,
                    "Sales": salesAmount,
                    "Estimate": estimateAmount,
                    "Tax":totalgstAmount,
                    "Purchase": purchaseAmount,
                    "Expense": expenseAmount,
                    "Profit": profit,
                    "Loss": loss
                    
                };
                ivalue=i;
                }
                self.state.SizeData=9;
                self.state.pagination=false;
                self.state.columns = self.getColumnsWithEstimate();
        
               

            }
       
            self.state.data[Number(ivalue)+1] = {
                "Date":"",
                "Sales": "",
                "Estimate": "",
                "Purchase": "",
                "Expense": "",
                "Profit": <div style={{fontWeight:"600"}}>{"Total Profit"}</div>,
                "Loss": <div style={{fontWeight:"600"}}>{totalProfit}</div>
              };

              self.state.data[Number(ivalue)+2] = {
                "Date":"",
                "Sales": "",
                "Estimate": "",
                "Purchase": "",
                "Expense": "",
                "Profit": <div style={{fontWeight:"600"}}>{"Total Loss"}</div>,
                "Loss": <div style={{fontWeight:"600"}}>{totalLoss}</div>
              };

              self.setState({
                data:self.state.data,
                columns:self.state.columns
            })

            if(totalProfit==0){
                $("#numWordsProfit").text("Zero");
            }else{
                var numtowordProfit = numberToWord(Number(totalProfit));
                $("#numWordsProfit").text(Case.capital(numtowordProfit));
            }
            if(totalLoss==0){
                $("#numWordsLoss").text("Zero");
            }else{
            var numtowordLoss = numberToWord(Number(totalLoss));
            $("#numWordsLoss").text(Case.capital(numtowordLoss));
            }
          
                   
            $("#amountinwordsdiv").show();

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

    MonthSubmit(selectedMonth){

        var self=this;
 
     

        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                companyId: this.state.companyId,
                fromDate: this.state.fromDate,
                toDate:this.state.toDate
             
            }),

            url: " http://15.206.129.105:8080/MerchandiseAPI/ProfitLossReport/Weekly",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {

          
                var configValue=data.slice(-1)[0].configValue;

                var shortMonthName = moment().month(selectedMonth-1).format('MMM');
                  

                    $("#tableheading").empty();
                    var tabHeading='<h3>Monthly Report - '+shortMonthName+ " - " +today.getFullYear()+'</h3>';
                    $("#tableheading").append(tabHeading);
               
                if(configValue==0){
                   
                    var totalProfit=0;
                    var totalLoss=0;
                    self.state.data=[];
                    var ivalue=0;
                   
                   
                    for(var i=0;i<data.length-1;i++){

                        var salesAmount=0;
                        var estimateAmount=0;
                        var purchaseAmount=0;
                        var expenseAmount=0;
                        var totalgstAmount=0;
        
                        if(data[i].totalSales!=null){
                            salesAmount=data[i].totalSales;
                        }
                        if(data[i].totalPurchase!=null){
                            purchaseAmount=data[i].totalPurchase;
                        }
                        if(data[i].totalExpense!=null){
                            expenseAmount=data[i].totalExpense;
                        }
                        if(data[i].totalGST!=null){
                            totalgstAmount=data[i].totalGST;
                        }

                        var loss=Number(purchaseAmount)+Number(expenseAmount)+Number(totalgstAmount);
                        var profit=Number(salesAmount)-Number(loss);
                        totalProfit=Number(totalProfit)+Number(profit);
                        totalLoss=Number(totalLoss)+Number(loss);

                        var profitNum= Math.sign(profit);
                        if(profitNum==-1 || profitNum==-0){
                            profit=0;
                        }

                        var totalprofitNum= Math.sign(totalProfit);
                        if(totalprofitNum==-1 || totalprofitNum==-0){
                            totalProfit=0;
                        }
                     
                         self.state.data[i] = {
                             "Date":data[i].date,
                            "Sales": salesAmount,
                            "Purchase": purchaseAmount,
                            "Tax":totalgstAmount,
                            "Expense": expenseAmount,
                            "Profit": profit,
                            "Loss": loss
                            
                        };
                        ivalue=i;

                    }
                    self.state.SizeData=self.state.data.length;
                    self.state.pagination=true;
                    self.state.columns = self.getColumnsWithoutEstimate();

                  
                     
                }else if(configValue==1){
               
                     var totalProfit=0;
                     var totalLoss=0;
                     self.state.data=[];
                    var ivalue=0;
                    
                for(var i=0;i<data.length-1;i++){

                    var salesAmount=0;
                    var estimateAmount=0;
                    var purchaseAmount=0;
                    var expenseAmount=0;
                    var totalgstAmount=0;
    
                    if(data[i].totalSales!=null){
                        salesAmount=data[i].totalSales;
                    }
                    if(data[i].totalEstimate!=null){
                        estimateAmount=data[i].totalEstimate;
                    }
                    if(data[i].totalPurchase!=null){
                        purchaseAmount=data[i].totalPurchase;
                    }
                    if(data[i].totalExpense!=null){
                        expenseAmount=data[i].totalExpense;
                    }
                    if(data[i].totalGST!=null){
                        totalgstAmount=data[i].totalGST;
                    }

                    var loss=Number(purchaseAmount)+Number(expenseAmount)+Number(totalgstAmount);
                    totalLoss=Number(totalLoss)+Number(loss);
                    var profit=Number(Number(salesAmount)+Number(estimateAmount))-Number(loss);
                    totalProfit=Number(totalProfit)+Number(profit);
                  
                    var profitNum= Math.sign(profit);
                    if(profitNum==-1 || profitNum==-0){
                        profit=0;
                    }
              
                    var totalprofitNum= Math.sign(totalProfit);
                    if(totalprofitNum==-1 || totalprofitNum==-0){
                        totalProfit=0;
                    }

                    self.state.data[i] = {
                        "Date":data[i].date,
                       "Sales": salesAmount,
                       "Estimate": estimateAmount,
                       "Purchase": purchaseAmount,
                       "Tax":totalgstAmount,
                       "Expense": expenseAmount,
                       "Profit": profit,
                       "Loss": loss
                       
                   };

                   ivalue=i;
                }
             
                self.state.SizeData=10;
                self.state.pagination=false;
                self.state.columns = self.getColumnsWithEstimate();
            }
                
            self.state.data[Number(ivalue)+1] = {
                "Date":"",
                "Sales": "",
                "Estimate": "",
                "Purchase": "",
                "Expense": "",
                "Profit": <div style={{fontWeight:"600"}}>{"Total Profit"}</div>,
                "Loss": <div style={{fontWeight:"600"}}>{totalProfit}</div>
              };

              self.state.data[Number(ivalue)+2] = {
                "Date":"",
                "Sales": "",
                "Estimate": "",
                "Purchase": "",
                "Expense": "",
                "Profit": <div style={{fontWeight:"600"}}>{"Total Loss"}</div>,
                "Loss": <div style={{fontWeight:"600"}}>{totalLoss}</div>
              };

            self.setState({
                data:self.state.data,
                columns:self.state.columns
            })
        
            if(totalProfit==0){
                $("#numWordsProfit").text("Zero");
            }else{
                var numtowordProfit = numberToWord(Number(totalProfit));
                $("#numWordsProfit").text(Case.capital(numtowordProfit));
            }
            if(totalLoss==0){
                $("#numWordsLoss").text("Zero");
            }else{
            var numtowordLoss = numberToWord(Number(totalLoss));
            $("#numWordsLoss").text(Case.capital(numtowordLoss));
            }

                   
            $("#amountinwordsdiv").show();

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

    YearSubmit(year){

        var currentMonth;
        var monthArray=[];
        var self=this;

        

            if(year==today.getFullYear()){
                currentMonth=today.getMonth()+1;
                for(var i=1;i<=currentMonth;i++){
                    monthArray.push(i);
                }
            }else if(year<today.getFullYear()){
                currentMonth=12;
                for(var i=1;i<=currentMonth;i++){
                    monthArray.push(i);
                }
    
            }

            $.ajax({
                type: 'POST',
                data: JSON.stringify({
                    companyId: this.state.companyId,
                    months:monthArray.toString(),
                    year:year,
                }),
    
                url: " http://15.206.129.105:8080/MerchandiseAPI/ProfitLossReport/Yearly",
                contentType: "application/json",
                dataType: 'json',
                async: false,
                success: function (data, textStatus, jqXHR) {
    
                 
                  
                    var configValue=data.slice(-1)[0].configValue;
    
                    var data1=data.slice(0, -1);  
                      
                    
                        $("#tableheading").empty();
                        var tabHeading='<h3>Yearly Report - '+year+'</h3>';
                      $("#tableheading").append(tabHeading);

                      
                      
                        
                       
                        

                    if(configValue==0){
                       
                          var totalProfit=0;
                           var totalLoss=0;
                           self.state.data=[];
                           self.state.columns=[];

                           self.setState({
                               data:self.state.data,
                               columns:self.state.columns
                           })
                           var monthNameArray=[];
                           var dataArray=[];
                           self.state.SizeData=6;
                           self.state.pagination=false;

                         
                           self.state.columns[0]={
                            Header: "Category/Month",
                            accessor: "Category/Month",
                            show: true
                         }

                         var profitArray=[];
                         var lossArray=[];
                     

                           for(var z=0;z<data1.length;z++){
                               var salesAmount=0;
                               var estimateAmount=0;
                               var expenseAmount=0;
                               var purchaseAmount=0;
                               var totalgst=0;
                        
                            var shortMonthName = moment().month(data1[z].month-1).format('MMM');

                          self.state.columns[Number(z)+1]={
                            Header: shortMonthName,
                            accessor: shortMonthName,
                            show: true
                           }

                           if(data1[z].totalSales!=null){
                               salesAmount=data1[z].totalSales;
                           }
                         
                           if(data1[z].totalEstimate!=null){
                            estimateAmount=data1[z].totalEstimate;
                           }

                           
                           if(data1[z].totalExpense!=null){
                            expenseAmount=data1[z].totalExpense;
                           }

                           if(data1[z].totalPurchase!=null){
                            purchaseAmount=data1[z].totalPurchase;
                           }
                           if(data1[z].totalGST!=null){
                            totalgst=data1[z].totalGST;
                           }


                           var profit=Number(salesAmount)+Number(estimateAmount);
                           var loss=Number(expenseAmount)+Number(purchaseAmount)+Number(totalgst);
                            totalProfit=Number(profit)+Number(totalProfit);
                            totalLoss=Number(loss)+Number(totalLoss);

                           var profitNum= Math.sign(profit);
                           if(profitNum==-1 || profitNum==-0){
                            profit=0;
                           }

                           profitArray.push(profit);
                           lossArray.push(loss);

                           var profitNum= Math.sign(totalProfit);
                           if(profitNum==-1 || profitNum==-0){
                            totalProfit=0;
                           }


                        }
                      
                           
                           self.state.data[0]={
                            "Category/Month":"Sales"
                        }
                        
                        for(var i=0;i<data1.length;i++){

                            var salesAmount=0;
                            if(data1[i].totalSales!=null){
                                salesAmount=data1[i].totalSales;
                            }
                           
                            var shortMonthName = moment().month(data1[i].month-1).format('MMM');
                            self.state.data[0][shortMonthName] = salesAmount;
                        }
        

                        self.state.data[1]={
                            "Category/Month":"Tax"
                        }
                        
                        for(var e=0;e<data1.length;e++){

                            var gstAmount=0;
                            if(data1[e].totalGST!=null){
                                gstAmount=data1[e].totalGST;
                            }

                            var shortMonthName = moment().month(data1[e].month-1).format('MMM');
                           
                            self.state.data[1][shortMonthName] = gstAmount;
                        }

                        
                        self.state.data[2]={
                            "Category/Month":"Expense"
                        }
                        
                        for(var j=0;j<data1.length;j++){

                            var expenseAmount=0;
                            if(data1[j].totalExpense!=null){
                                expenseAmount=data1[j].totalExpense;
                            }

                            var shortMonthName = moment().month(data1[j].month-1).format('MMM');
                           
                            self.state.data[2][shortMonthName] = expenseAmount;
                        }

                        
                     

                        self.state.data[3]={
                            "Category/Month":"Purchase"
                        }
                        
                        for(var k=0;k<data1.length;k++){
                            var purchaseAmount=0;
                            if(data1[k].totalPurchase!=null){
                                purchaseAmount=data1[k].totalPurchase;
                            }
                            var shortMonthName = moment().month(data1[k].month-1).format('MMM');
                           
                            self.state.data[3][shortMonthName] = purchaseAmount;
                        }

                        self.state.data[4]={
                            "Category/Month":<div><span style={{fontWeight:"600"}}>Profit</span></div>
                        }
                        
                        for(var l=0;l<profitArray.length;l++){
                           

                            var shortMonthName = moment().month(data1[l].month-1).format('MMM');
                           
                            self.state.data[4][shortMonthName] = <div><span style={{fontWeight:"600"}}>{profitArray[l]}</span></div>;
                        }

                        self.state.data[5]={
                            "Category/Month":<div><span style={{fontWeight:"600"}}>Loss</span></div>
                        }
                        
                        for(var m=0;m<lossArray.length;m++){
                            var shortMonthName = moment().month(data1[m].month-1).format('MMM');
                           
                            self.state.data[5][shortMonthName] = <div><span style={{fontWeight:"600"}}>{lossArray[m]}</span></div>;
                        }

                        if(totalProfit==0){
                            $("#numWordsProfit").text("Zero");
                        }else{
                            var numtowordProfit = numberToWord(Number(totalProfit));
                            $("#numWordsProfit").text(Case.capital(numtowordProfit));
                        }
                        if(totalLoss==0){
                            $("#numWordsLoss").text("Zero");
                        }else{
                        var numtowordLoss = numberToWord(Number(totalLoss));
                        $("#numWordsLoss").text(Case.capital(numtowordLoss));
                        }
                     
                    }else if(configValue==1){
                 
                     
                         var totalProfit=0;
                           var totalLoss=0;
                           self.state.data=[];
                           self.state.columns=[];

                           self.setState({
                               data:self.state.data,
                               columns:self.state.columns
                           })
                           var monthNameArray=[];
                           var dataArray=[];
                           self.state.SizeData=7;
                           self.state.pagination=false;

                         
                           self.state.columns[0]={
                            Header: "Category/Month",
                            accessor: "Category/Month",
                            show: true
                         }

                         var profitArray=[];
                         var lossArray=[];
                         var totalGstArray=[];

                           for(var z=0;z<data1.length;z++){
                               var salesAmount=0;
                               var estimateAmount=0;
                               var expenseAmount=0;
                               var purchaseAmount=0;
                               var totalgst=0;
                        
                            var shortMonthName = moment().month(data1[z].month-1).format('MMM');

                          self.state.columns[Number(z)+1]={
                            Header: shortMonthName,
                            accessor: shortMonthName,
                            show: true
                           }

                           if(data1[z].totalSales!=null){
                               salesAmount=data1[z].totalSales;
                           }
                         
                           if(data1[z].totalEstimate!=null){
                            estimateAmount=data1[z].totalEstimate;
                           }

                           
                           if(data1[z].totalExpense!=null){
                            expenseAmount=data1[z].totalExpense;
                           }

                           if(data1[z].totalPurchase!=null){
                            purchaseAmount=data1[z].totalPurchase;
                           }
                           if(data1[z].totalGST!=null){
                            totalgst=data1[z].totalGST;
                           }


                           var profit=Number(salesAmount)+Number(estimateAmount);
                           var loss=Number(expenseAmount)+Number(purchaseAmount)+Number(totalgst);
                            totalProfit=Number(profit)+Number(totalProfit);

                           var profitNum= Math.sign(profit);
                           if(profitNum==-1 || profitNum==-0){
                            profit=0;
                           }

                           profitArray.push(profit);
                           lossArray.push(loss);

                           var profitNum= Math.sign(totalProfit);
                           if(profitNum==-1 || profitNum==-0){
                            totalProfit=0;
                           }

                        }
                      
                           
                           self.state.data[0]={
                            "Category/Month":"Sales"
                        }
                        
                        for(var i=0;i<data1.length;i++){

                            var salesAmount=0;
                            if(data1[i].totalSales!=null){
                                salesAmount=data1[i].totalSales;
                            }
                           
                            var shortMonthName = moment().month(data1[i].month-1).format('MMM');
                            self.state.data[0][shortMonthName] = salesAmount;
                        }
        
                        self.state.data[1]={
                            "Category/Month":"Estimate"
                        }
                        
                        for(var n=0;n<data1.length;n++){

                            var estimateAmount=0;
                            if(data1[n].totalEstimate!=null){
                                estimateAmount=data1[n].totalEstimate;
                            }

                            var shortMonthName = moment().month(data1[n].month-1).format('MMM');
                           
                            self.state.data[1][shortMonthName] = estimateAmount;
                        }

                        self.state.data[2]={
                            "Category/Month":"Tax"
                        }
                        
                        for(var e=0;e<data1.length;e++){

                            var gstAmount=0;
                            if(data1[e].totalGST!=null){
                                gstAmount=data1[e].totalGST;
                            }

                            var shortMonthName = moment().month(data1[e].month-1).format('MMM');
                           
                            self.state.data[2][shortMonthName] = gstAmount;
                        }

                        
                        self.state.data[3]={
                            "Category/Month":"Expense"
                        }
                        
                        for(var j=0;j<data1.length;j++){

                            var expenseAmount=0;
                            if(data1[j].totalExpense!=null){
                                expenseAmount=data1[j].totalExpense;
                            }

                            var shortMonthName = moment().month(data1[j].month-1).format('MMM');
                           
                            self.state.data[3][shortMonthName] = expenseAmount;
                        }

                        
                     

                        self.state.data[4]={
                            "Category/Month":"Purchase"
                        }
                        
                        for(var k=0;k<data1.length;k++){
                            var purchaseAmount=0;
                            if(data1[k].totalPurchase!=null){
                                purchaseAmount=data1[k].totalPurchase;
                            }
                            var shortMonthName = moment().month(data1[k].month-1).format('MMM');
                           
                            self.state.data[4][shortMonthName] = purchaseAmount;
                        }

                        self.state.data[5]={
                            "Category/Month":<div><span style={{fontWeight:"600"}}>Profit</span></div>
                        }
                        
                        for(var l=0;l<profitArray.length;l++){
                           

                            var shortMonthName = moment().month(data1[l].month-1).format('MMM');
                           
                            self.state.data[5][shortMonthName] = <div><span style={{fontWeight:"600"}}>{profitArray[l]}</span></div>;
                        }

                        self.state.data[6]={
                            "Category/Month":<div><span style={{fontWeight:"600"}}>Loss</span></div>
                        }
                        
                        for(var m=0;m<lossArray.length;m++){
                            var shortMonthName = moment().month(data1[m].month-1).format('MMM');
                           
                            self.state.data[6][shortMonthName] = <div><span style={{fontWeight:"600"}}>{lossArray[m]}</span></div>;
                        }

                        if(totalProfit==0){
                            $("#numWordsProfit").text("Zero");
                        }else{
                            var numtowordProfit = numberToWord(Number(totalProfit));
                            $("#numWordsProfit").text(Case.capital(numtowordProfit));
                        }
                        if(totalLoss==0){
                            $("#numWordsLoss").text("Zero");
                        }else{
                        var numtowordLoss = numberToWord(Number(totalLoss));
                        $("#numWordsLoss").text(Case.capital(numtowordLoss));
                        }
              
                }

                   
            $("#amountinwordsdiv").show();


            self.state.columns=self.getColumnsWithEstimate();
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
    
    
                },
            });
       

    }

    getColumnsWithoutEstimate(){

        return Object.keys(this.state.data[0]).map(key => {
            return {
                Header: key,
                accessor: key,
         
            };
          });

    }

    getColumnsWithEstimate(){

                return Object.keys(this.state.data[0]).map(key => {
           
              return {
                Header: key,
                accessor: key,
         
            };
            
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

                    <h3 className="centerAlign">Profit & Loss Report</h3>
            
            <form style={{display: "inline-flex",backgroundColor: "#d3d3d3ab"}}>
        
                      <span><label htmlFor="fromDate" style={{ paddingRight: '50px',fontWeight:'600'}}> Period:</label>
                        <select name="period" id="period"  onChange={this.handleUserInput} class="form-control">
                        <option value="" disabled selected hidden>--Select--</option>    
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                    </select> </span>


                         <div class="btn-group month" id="monthdiv" style={{ marginBottom: "0%" }}>
                   <span style={{paddingLeft: "22px"}}  > <label for="month" style={{fontWeight:'600'}}>Month:  </label>
                   <input
                        type="text"
                        id="month"
                        name="month"
                        style={{ color: "black", marginBottom: "0px"}}
                        class="monthPicker form-control"
                        autocomplete="off"
                        placeholder="Select Month"  /></span>
                </div>

                  

                    
                         <div class="btn-group year" id="yeardiv" style={{ marginBottom: "0%" }}>
                   <span style={{paddingLeft: "22px"}}> <label for="year" style={{fontWeight:'600'}}>Year:  </label>
                    <input
                        type="text"
                        id="year"
                        name="year"
                        style={{ color: "black", marginBottom: "0px"}}
                        class="yearPicker form-control"
                        autocomplete="off"
                        placeholder="Select Year"  /></span>
                </div>

                      </form>
    
          <h3 id="tableheading" style={{textAlign:"center"}}></h3>
        
    <ReactTable id="reacttableid"
              data={this.state.data}
              columns={this.state.columns}
              noDataText="No Data Available"
              filterable={false}
              pageSize={this.state.SizeData}
              className="-striped -highlight"
              defaultFilterMethod={(filter, row, column) => {
                const id = filter.pivotId || filter.id;
                return row[id] !== undefined
                  ? String(row[id])
                      .toLowerCase()
                      .indexOf(filter.value.toLowerCase()) !== -1
                  : true;
              }}
              showPaginationTop={this.state.pagination}
              showPaginationBottom={false}
          
            />

                <div class="col-sm-6" id="amountinwordsdiv">
                 <p class="lead">Profit Amount In Words:   <span id="numWordsProfit"></span> Rupees Only</p>
                 <p class="lead">Loss Amount In Words:   <span id="numWordsLoss"></span> Rupees Only</p>

                  </div>
        

            </div>
        );
    }

}
export default ProfitLossReport;

