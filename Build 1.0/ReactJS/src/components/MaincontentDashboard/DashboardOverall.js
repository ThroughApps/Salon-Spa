import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import CryptoJS from 'crypto-js';
import ReactDOM from 'react-dom';
import $ from 'jquery';
//import "../../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import 'bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import { Pie, Bar, HorizontalBar, Doughnut, Bubble, Line } from 'react-chartjs-2';
import { Chart } from "react-google-charts";

//components
import AddProduct from '../AddProduct';
import VendorEntryForm from '../VendorEntryForm';
import SaleOrder from '../SaleOrder';
import GSTQuotation from '../GSTQuotation';
import InvoiceList from '../InvoiceList';
//css
import './DashboardOverallCss.css'
import AvailableStockReport from '../AvailableStockReport.js';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import registerServiceWorker from '../registerServiceWorker';
var dashboardData;
var i = 1;
const data1 = [
  ["Task", "Hours per Day"],
  ["Work" + ' (11)', 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
  ["Work1" + ' (11)', 11],
  ["Eat1", 2],
  ["Commute1", 2],
  ["Watch TV1", 2],
  ["Sleep1", 7],
  ["Work2" + ' (11)', 11],
  ["Eat2", 2],
  ["Commute3", 2],
  ["Watch TV4", 2],
  ["Sleep4", 7]// CSS-style declaration
];
const options = {
  title: "",
  pieHole: 10,
  is3D: true,
  sliceVisibilityThreshold: 0
};



class DashboardOverall extends Component {

  constructor() {
    super()
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var configValue = CryptoJS.AES.decrypt(localStorage.getItem('ConfigValue'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    /*  var companyId = "001";
     var configValue = "0"; */

    this.state = {

      date: '',
      current_Month: '',
      current_Year: '',
      companyId: companyId,
      configValue: configValue,
      SaleInvoice_Total_Amt: 0,
      EstimateInvoice_Total_Amt: 0,
      monthly_Purchase: 0,
      monthly_Expense: 0,
      monthly_Profit: 0,
      monthly_PurchaseInvoice: 0,
      monthly_ExpenseInvoice: 0,
      total_No_of_Vendors: 0,
      total_No_of_Customers: 0,
      total_No_of_ProductList: 0,
      total_No_of_SaleInvoice: 0,
      total_No_of_WithGST_Quotation: 0,
      total_No_of_SaleInvoice_Qty: 0,
      total_No_of_SaleInvoice_Qty_Estimate: 0,
      total_No_of_Salary_paid: 0,

      total_Sales_Amount_Annually: 0,
      total_Estimate_Amount_Annually: 0,
      total_Purchase_Amount_Annually: 0,
      yearlyExpense: 0,
      dailyExpense: 0,
      dailySales: 0,
      yearlySales: 0,

      sale: 0,
      purchase: 0,
      expense: 0,
      profits: 0,
      last_sale: 0,
      last_purchase: 0,
      last_expense: 0,
      last_profit: 0,



      chartData: {

        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        datasets: [{
          label: 'Sales',
          backgroundColor: '#fd923ed6',
          borderColor: '#ca6414d6',
          borderWidth: 1,
          hoverBackgroundColor: '#f57817d6',
          hoverBorderColor: '#ca6414d6',
        },

        {
          label: 'Purchase',
          backgroundColor: '#75c1ce',
          borderColor: '#528790',
          borderWidth: 1,
          hoverBackgroundColor: '#40b2c5',
          hoverBorderColor: '#528790',
        },
        ],
      },
      doughnutData: {

        labels: ['Sale Qty', 'Paid Salary', 'Total Expense'],
        datasets: [{
          label: 'Statistics',
          backgroundColor: [
            '#f75f00',
            '#13abc4',
            '#2b580c'

          ],
          data: [65, 59, 80]

        },

        ]
      },

      googleChart_payment_Data: [],
      googleChart_statistics: [],
      google_Bargraph_Employees: [],
      google_Bargraph_TopSelling_Product: [],
      google_Bargraph_Critical_Product: [],

      formErrors: { passwordValid: '', },
    }
    this.setState({
      configValue: configValue,
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.DashboardDisplayFunc();
    var configValue = CryptoJS.AES.decrypt(localStorage.getItem('ConfigValue'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    /*  var configValue = "0"; */
    if (configValue == 0) {

      $("#ContentPlaceHolder1_Lbl_monthlysale").append(Number(this.state.SaleInvoice_Total_Amt));
      this.state.monthly_Profit = Math.round(((Number(this.state.SaleInvoice_Total_Amt) - Number(this.state.monthly_PurchaseInvoice)) - Number(this.state.monthly_ExpenseInvoice)));

    } else {
      $("#ContentPlaceHolder1_Lbl_monthlysale").append((Number(this.state.SaleInvoice_Total_Amt) + Number(this.state.EstimateInvoice_Total_Amt)));
      this.state.monthly_Profit = Math.round((((Number(this.state.SaleInvoice_Total_Amt) + Number(this.state.EstimateInvoice_Total_Amt)) - Number(this.state.monthly_PurchaseInvoice)) - Number(this.state.monthly_ExpenseInvoice)));

    }

    console.log("", this.state.monthly_Profit, this.state.SaleInvoice_Total_Amt, this.state.monthly_PurchaseInvoice, this.state.monthly_ExpenseInvoice, this.state.EstimateInvoice_Total_Amt);



    /* 
        $(document).ready(function(){
          $('.minimize_btn_plus').click(function(){
            //alert("open");
            //$(this).addClass('active');
            //$('.minimize_btn').addClass('active');
            $('.minimize_btn_plus').css({"background-color": "", "display": "none"});
            $('.maximize_btn_minus').css({"background-color": "", "display": "block"});
          });
        
          $('.maximize_btn_minus').click(function(){
            //alert("close");
           // $(this).removeClass('active');
            //$('.maximize_btn').removeClass('active');
            $('.maximize_btn_minus').css({"background-color": "", "display": "none"});
            $('.minimize_btn_plus').css({"background-color": "", "display": "block"});
    
          });
        });
     */
  }
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }
  componentWillUnmount() {
    clearInterval(this.state.interval_refresh);

  }


  DashboardDisplayFunc(value) {

    var today = new Date();
    this.state.date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    this.state.current_Month = today.getMonth() + 1;
    this.state.current_Year = today.getFullYear();
    console.log("2020", this.state.current_Year);

    var self = this;

    console.log("this.state.date", this.state.date);

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        date: this.state.date,
        current_Month: this.state.current_Month,
        current_Year: this.state.current_Year,
        companyId: this.state.companyId,

      }),

      url: " http://15.206.129.105:8080/MerchandiseAPI/DashboardDisplay/DashboardDisplayFrontpage",

      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        dashboardData = data;
        console.log("dt", data);
        console.log("monthly_SalesInvoice", data.monthly_SalesInvoice);
        console.log("monthly_PurchaseInvoice", data.monthly_PurchaseInvoice);
        console.log("daily monthly sales");
        self.state.current_type = "Daily";
        self.state.last_current_type = "Yesterday";

        self.RepeatData();

/*         $.each(data.dailyList, function (i, item) {

          if (item.dailySales != null) {
            self.state.sale = item.dailySales;

          }

          if (item.dailyExpense != null) {
            self.state.expense = item.dailyExpense;
          }

          if (item.daily_PurchaseInvoice != null) {
            self.state.purchase = item.daily_PurchaseInvoice;
          }
          /** yesterday value Replace  item.dailySales with yesterday sale value*
          if (item.dailySales != null) {
            self.state.last_sale = 0;

          }

          if (item.dailyExpense != null) {
            self.state.last_expense = 0;
          }

          if (item.daily_PurchaseInvoice != null) {
            self.state.last_purchase = 0;
          }
        });

        self.state.profit = Number(self.state.sale) - (Number(self.state.expense) + Number(self.state.purchase));
        self.state.last_profit = Number(self.state.last_sale) - (Number(self.state.last_expense) + Number(self.state.last_purchase));

        i = 2; */


        /*  if (data.monthly_SalesInvoice != null) {
           self.state.SaleInvoice_Total_Amt = data.monthly_SalesInvoice;
         }
         else {
           self.state.SaleInvoice_Total_Amt = "0";
         }
         if (data.monthly_EstimateInvoice != null) {
           self.state.EstimateInvoice_Total_Amt = data.monthly_EstimateInvoice;
         }
         else {
           self.state.EstimateInvoice_Total_Amt = "0";
         }
 
         if (data.monthly_PurchaseInvoice != null) {
           self.state.monthly_PurchaseInvoice = data.monthly_PurchaseInvoice;
         } else {
 
           self.state.monthly_PurchaseInvoice = "0";
         } */
        //  alert("monthlypurchasevaluenot"+self.state.monthly_PurchaseInvoice)

        if (data.monthly_ExpenseInvoice != null)
          self.state.monthly_ExpenseInvoice = data.monthly_ExpenseInvoice;

        self.state.total_No_of_Vendors = data.total_No_of_Vendors;
        self.state.total_No_of_Customers = data.total_No_of_Customers;
        self.state.total_No_of_ProductList = data.total_No_of_ProductList;
        self.state.total_No_of_SaleInvoice = data.total_No_of_SaleInvoice;
        self.state.total_No_of_WithGST_Quotation = data.total_No_of_WithGST_Quotation;

        if (data.total_No_of_SaleInvoice_Qty != null)
          self.state.total_No_of_SaleInvoice_Qty = data.total_No_of_SaleInvoice_Qty;

        if (data.total_No_of_SaleInvoice_Qty_Estimate != null)
          self.state.total_No_of_SaleInvoice_Qty_Estimate = data.total_No_of_SaleInvoice_Qty_Estimate;

        if (data.total_No_of_Salary_paid != null)
          self.state.total_No_of_Salary_paid = data.total_No_of_Salary_paid;

        if (data.total_Sales_Amount_Annually != null)
          self.state.total_Sales_Amount_Annually = data.total_Sales_Amount_Annually;

        if (data.total_Estimate_Amount_Annually != null)
          self.state.total_Estimate_Amount_Annually = data.total_Estimate_Amount_Annually;


        if (data.total_Purchase_Amount_Annually != null)
          self.state.total_Purchase_Amount_Annually = data.total_Purchase_Amount_Annually;

        if (data.total_No_of_SaleInvoice_Qty == null)
          self.state.doughnutData.datasets[0].data[0] = 99;

        if (data.total_No_of_Salary_paid != null)
          self.state.doughnutData.datasets[0].data[1] = self.state.total_No_of_Salary_paid;

        if (data.monthly_ExpenseInvoice != null)
          self.state.doughnutData.datasets[0].data[2] = self.state.monthly_ExpenseInvoice;

        var configValue = CryptoJS.AES.decrypt(localStorage.getItem('ConfigValue'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        //alert("sale_amt_annual"+self.state.total_Sales_Amount_Annually);
        //alert("Estimate_amt_annual"+self.state.total_Estimate_Amount_Annually);

        if (configValue == 0) {

          $("#sale_amount_annual").append(Number(self.state.total_Sales_Amount_Annually));
          // this.state.monthly_Profit = Math.round(((Number(this.state.SaleInvoice_Total_Amt) - Number(this.state.monthly_PurchaseInvoice)) - Number(this.state.monthly_ExpenseInvoice)));

        } else {
          $("#sale_amount_annual").append((Number(self.state.total_Sales_Amount_Annually) + Number(self.state.total_Estimate_Amount_Annually)));
          //     this.state.monthly_Profit = Math.round((((Number(this.state.SaleInvoice_Total_Amt) + Number(this.state.EstimateInvoice_Total_Amt)) - Number(this.state.monthly_PurchaseInvoice)) - Number(this.state.monthly_ExpenseInvoice)));

        }

        var janvalue = 0;
        var febvalue = 0;
        var marvalue = 0;
        var aprvalue = 0;
        var mayvalue = 0;
        var junvalue = 0;
        var julvalue = 0;
        var augvalue = 0;
        var sepvalue = 0;
        var octvalue = 0;
        var novvalue = 0;
        var decvalue = 0;
        $.each(data.dashboard_LineChart_List_estimate, function (i, item) {
          if (item.current_Month == 1) {
            // console.log("mothlyestimateJan",data.monthly_EstimateInvoice)
            self.state.janEstimateValue = item.monthly_EstimateInvoice;
            self.setState({
              janEstimateValue: self.state.janEstimateValue,
            })

          }
          else if (item.current_Month == 2) {
            self.state.FebEstimateValue = item.monthly_EstimateInvoice;
            self.setState({
              FebEstimateValue: self.state.FebEstimateValue,
            })


          } else if (item.current_Month == 3) {

            self.state.MarEstimateValue = item.monthly_EstimateInvoice;
            self.setState({
              MarEstimateValue: self.state.MarEstimateValue,
            })

          } else if (item.current_Month == 4) {
            self.state.AprilEstimateValue = item.monthly_EstimateInvoice;
            self.setState({
              AprilEstimateValue: self.state.AprilEstimateValue,
            })
            console.log("aprilestimate" + self.state.AprilEstimateValue)

          } else if (item.current_Month == 5) {

            self.state.MayEstimateValue = item.monthly_EstimateInvoice;
            self.setState({
              MayEstimateValue: self.state.MayEstimateValue,
            })
            console.log("Mayestimate" + self.state.MayEstimateValue)

          } else if (item.current_Month == 6) {

            self.state.JuneEstimateValue = item.monthly_EstimateInvoice;
            self.setState({
              JuneEstimateValue: self.state.JuneEstimateValue,
            })
            console.log("Juneestimate" + self.state.JuneEstimateValue)

          } else if (item.current_Month == 7) {

            self.state.JulyEstimateValue = item.monthly_EstimateInvoice;
            self.setState({
              JulyEstimateValue: self.state.JulyEstimateValue,
            })


          } else if (item.current_Month == 8) {

            self.state.AugEstimateValue = item.monthly_EstimateInvoice;
            self.setState({
              AugEstimateValue: self.state.AugEstimateValue,
            })


          } else if (item.current_Month == 9) {

            self.state.SepEstimateValue = item.monthly_EstimateInvoice;
            self.setState({
              SepEstimateValue: self.state.SepEstimateValue,
            })


          }
          else if (item.current_Month == 10) {

            self.state.OctEstimateValue = item.monthly_EstimateInvoice;
            self.setState({
              OctEstimateValue: self.state.OctEstimateValue,
            })

          } else if (item.current_Month == 11) {

            self.state.NovEstimateValue = item.monthly_EstimateInvoice;
            self.setState({
              NovEstimateValue: self.state.NovEstimateValue,
            })


          }
          else if (item.current_Month == 12) {

            self.state.DecEstimateValue = item.monthly_EstimateInvoice;
            self.setState({
              DecEstimateValue: self.state.DecEstimateValue,
            })


          }
        });

        if (configValue == 0) {
          $.each(data.dashboard_LineChart_List, function (i, item) {
            if (item.current_Month == 1) {

              janvalue = item.monthly_SalesInvoice;


            }
            else if (item.current_Month == 2) {

              febvalue = item.monthly_SalesInvoice;

            } else if (item.current_Month == 3) {

              marvalue = item.monthly_SalesInvoice;

            } else if (item.current_Month == 4) {

              aprvalue = item.monthly_SalesInvoice;

            } else if (item.current_Month == 5) {

              mayvalue = item.monthly_SalesInvoice;

            } else if (item.current_Month == 6) {

              junvalue = item.monthly_SalesInvoice;

            } else if (item.current_Month == 7) {

              julvalue = item.monthly_SalesInvoice;

            } else if (item.current_Month == 8) {

              augvalue = item.monthly_SalesInvoice;

            } else if (item.current_Month == 9) {

              sepvalue = item.monthly_SalesInvoice;

            }
            else if (item.current_Month == 10) {

              octvalue = item.monthly_SalesInvoice;

            } else if (item.current_Month == 11) {

              novvalue = item.monthly_SalesInvoice;

            }
            else if (item.current_Month == 12) {

              decvalue = item.monthly_SalesInvoice;

            }
          });

        } else {
          $.each(data.dashboard_LineChart_List, function (i, item) {
            if (item.current_Month == 1) {

              janvalue = Math.round(Number(item.monthly_SalesInvoice) + Number(self.state.janEstimateValue));


            }
            else if (item.current_Month == 2) {

              febvalue = Math.round(Number(item.monthly_SalesInvoice) + Number(self.state.FebEstimateValue));

            } else if (item.current_Month == 3) {

              marvalue = Math.round(Number(item.monthly_SalesInvoice) + Number(self.state.MarEstimateValue));

            } else if (item.current_Month == 4) {
              console.log("aprilestimate" + self.state.AprilEstimateValue)
              aprvalue = Math.round(Number(item.monthly_SalesInvoice) + Number(self.state.AprilEstimateValue));

            } else if (item.current_Month == 5) {
              console.log("mayestimate" + self.state.MayEstimateValue)
              mayvalue = Math.round(Number(item.monthly_SalesInvoice) + Number(self.state.MayEstimateValue));

            } else if (item.current_Month == 6) {
              console.log("juneestimate" + self.state.JuneEstimateValue)
              junvalue = Math.round(Number(item.monthly_SalesInvoice) + Number(self.state.JuneEstimateValue));

            } else if (item.current_Month == 7) {

              julvalue = Math.round(Number(item.monthly_SalesInvoice) + Number(self.state.JulyEstimateValue));

            } else if (item.current_Month == 8) {

              augvalue = Math.round(Number(item.monthly_SalesInvoice) + Number(self.state.AugEstimateValue));

            } else if (item.current_Month == 9) {

              sepvalue = Math.round(Number(item.monthly_SalesInvoice) + Number(self.state.SepEstimateValue));

            }
            else if (item.current_Month == 10) {

              octvalue = Math.round(Number(item.monthly_SalesInvoice) + Number(self.state.OctEstimateValue));

            } else if (item.current_Month == 11) {

              novvalue = Math.round(Number(item.monthly_SalesInvoice) + Number(self.state.NovEstimateValue));

            }
            else if (item.current_Month == 12) {

              decvalue = Math.round(Number(item.monthly_SalesInvoice) + Number(self.state.DecEstimateValue));

            }
          });
        }


        self.state.chartData.datasets[0].data[0] = janvalue;
        self.state.chartData.datasets[0].data[1] = febvalue;
        self.state.chartData.datasets[0].data[2] = marvalue;
        self.state.chartData.datasets[0].data[3] = aprvalue;
        self.state.chartData.datasets[0].data[4] = mayvalue;
        self.state.chartData.datasets[0].data[5] = junvalue;
        self.state.chartData.datasets[0].data[6] = julvalue;
        self.state.chartData.datasets[0].data[7] = augvalue;
        self.state.chartData.datasets[0].data[8] = sepvalue;
        self.state.chartData.datasets[0].data[9] = octvalue;
        self.state.chartData.datasets[0].data[10] = novvalue;
        self.state.chartData.datasets[0].data[11] = decvalue;
        janvalue = 0;
        febvalue = 0;
        marvalue = 0;
        aprvalue = 0;
        mayvalue = 0;
        junvalue = 0;
        julvalue = 0;
        augvalue = 0;
        sepvalue = 0;
        octvalue = 0;
        novvalue = 0;
        decvalue = 0;

        $.each(data.dashboard_LineChart_List_purchase, function (i, item) {
          if (item.current_Month == 1) {
            janvalue = item.monthly_PurchaseInvoice;


          }
          else if (item.current_Month == 2) {
            febvalue = item.monthly_PurchaseInvoice;

          } else if (item.current_Month == 3) {
            // alert("monthlyPurchaseinvoicevalue"+item.monthly_PurchaseInvoice);
            marvalue = item.monthly_PurchaseInvoice;

          } else if (item.current_Month == 4) {
            aprvalue = item.monthly_PurchaseInvoice;

          } else if (item.current_Month == 5) {
            mayvalue = item.monthly_PurchaseInvoice;

          } else if (item.current_Month == 6) {
            junvalue = item.monthly_PurchaseInvoice;

          } else if (item.current_Month == 7) {
            julvalue = item.monthly_PurchaseInvoice;

          } else if (item.current_Month == 8) {
            augvalue = item.monthly_PurchaseInvoice;

          } else if (item.current_Month == 9) {
            sepvalue = item.monthly_PurchaseInvoice;

          }
          else if (item.current_Month == 10) {
            octvalue = item.monthly_PurchaseInvoice;

          } else if (item.current_Month == 11) {
            novvalue = item.monthly_PurchaseInvoice;

          }
          else if (item.current_Month == 12) {
            decvalue = item.monthly_PurchaseInvoice;

          }
        });


        self.state.chartData.datasets[1].data[0] = janvalue;
        self.state.chartData.datasets[1].data[1] = febvalue;
        self.state.chartData.datasets[1].data[2] = marvalue;
        self.state.chartData.datasets[1].data[3] = aprvalue;
        self.state.chartData.datasets[1].data[4] = mayvalue;
        self.state.chartData.datasets[1].data[5] = junvalue;
        self.state.chartData.datasets[1].data[6] = julvalue;
        self.state.chartData.datasets[1].data[7] = augvalue;
        self.state.chartData.datasets[1].data[8] = sepvalue;
        self.state.chartData.datasets[1].data[9] = octvalue;
        self.state.chartData.datasets[1].data[10] = novvalue;
        self.state.chartData.datasets[1].data[11] = decvalue;

        console.log("chartdata", self.state.chartData)
        self.setState({
          SaleInvoice_Total_Amt: self.state.SaleInvoice_Total_Amt,
          EstimateInvoice_Total_Amt: self.state.EstimateInvoice_Total_Amt,
          monthly_PurchaseInvoice: self.state.monthly_PurchaseInvoice,
          monthly_ExpenseInvoice: self.state.monthly_ExpenseInvoice,
          total_No_of_Vendors: self.state.total_No_of_Vendors,
          total_No_of_Customers: self.state.total_No_of_Customers,
          total_No_of_ProductList: self.state.total_No_of_ProductList,
          total_No_of_SaleInvoice: self.state.total_No_of_SaleInvoice,
          total_No_of_WithGST_Quotation: self.state.total_No_of_WithGST_Quotation,
          total_No_of_SaleInvoice_Qty: self.state.total_No_of_SaleInvoice_Qty,
          total_No_of_SaleInvoice_Qty_Estimate: self.state.total_No_of_SaleInvoice_Qty_Estimate,
          total_No_of_Salary_paid: self.state.total_No_of_Salary_paid,
          total_Sales_Amount_Annually: self.state.total_Sales_Amount_Annually,
          total_Estimate_Amount_Annually: self.state.total_Estimate_Amount_Annually,
          total_Purchase_Amount_Annually: self.state.total_Purchase_Amount_Annually,


        });

        console.log("this.state.date", data, data.SaleInvoice_Total_Amt, data.EstimateInvoice_Total_Amt, self.state.EstimateInvoice_Total_Amt, self.state.SaleInvoice_Total_Amt, self.state.dashboard_LineChart_List);
        var no;
        var tab = '<thead style="overflow:auto;"><tr class="headcolor" style="background-color: #91c5f5;"><th>S.No</th><th>Invoice</th><th>Date</th><th>Name</th><th>Status</th><th>Total</th></tr></thead>';
        console.log("recent s", data.dailyInvoiceList);
        if (data.dailyInvoiceList != null) {
          $.each(data.dailyInvoiceList, function (i, item) {
            no = parseInt(i) + 1;
            tab += '<tbody id= "myTable" ><tr class="" style:"background-color:white;" id="tabletextcol" ><td>' + no + '</td><td>' + item.invoiceNo + '</td><td>' + item.date + '</td><td>' + item.userName + '</td>'
              + '<td>' + item.status + '</td><td>' + item.subTotal + '</td></tr></tbody>';


          });
          $("#tableHeadings").append(tab);
          /*dummy */
          /*  $("#tableHeadings1").append(tab);
           $("#tableHeadings2").append(tab); */

        } else {
          $("#tableHeadings").append('<h4>No Recent Sales</h3>');
          $("#loginSubmitButton").hide();

        }


        var no;
        var tab = '<thead><tr class="headcolor" style="background-color: #91c5f5;"><th>S.No</th><th>Name</th><th>Quantity</th></tr></thead>';

        if (data.topSalesPerMonth != null) {
          $.each(data.topSalesPerMonth, function (i, item) {
            no = parseInt(i) + 1;
            tab += '<tbody id= "myTable" ><tr class=""  id="tabletextcol" ><td>' + no + '</td>'
              + '<td>' + item.productName + '</td><td>' + item.quantity + '</td></tr></tbody>';


          });
          $("#salesofmonth").append(tab);

        } else {
          $("#salesofmonth").append('<h4>No Recent Sales</h3>');
          $("#loginSubmitButton").hide();

        }


        var no;
        var tab = '<thead><tr class="headcolor" style="background-color: #91c5f5;"><th>S.No</th><th>Name</th><th>Quantity</th></tr></thead>';

        if (data.topSalesPerYear != null) {
          $.each(data.topSalesPerYear, function (i, item) {
            no = parseInt(i) + 1;
            tab += '<tbody id= "myTable" ><tr class=""  id="tabletextcol" ><td>' + no + '</td>'
              + '<td>' + item.productName + '</td><td>' + item.quantity + '</td></tr></tbody>';


          });
          $("#salesofyear").append(tab);

        } else {
          $("#salesofyear").append('<h4>No Recent Sales</h3>');
          $("#loginSubmitButton").hide();

        }

        var no;
        var tab = '<thead><tr class="headcolor" style="background-color: #91c5f5;"><th>S.No</th><th>ProductName</th><th>Quantity</th></tr></thead>';
        /*  alert(data.criticalReportDataList); */
        if (data.criticalReportDataList != null) {
          $.each(data.criticalReportDataList, function (i, item) {
            no = parseInt(i) + 1;
            tab += '<tbody id= "myTable" ><tr class=""  id="tabletextcol" ><td>' + no + '</td>'
              + '<td>' + item.productName + '</td><td>' + item.quantity + '</td></tr></tbody>';


          });
          $("#tableHeadings1").append(tab);

        } else {
          $("#tableHeadings1").append('<h4>No Product</h3>');
          $("#viewAllButton").hide();

        }

        /*     /*DAILY EXPENSE *
            if (data.dailyExpense != null)
              self.state.dailyExpense = data.dailyExpense;
    
    
            /*YEARLY EXPENSE *
    
            if (data.yearlyExpense != null)
              self.state.yearlyExpense = data.yearlyExpense;
    
            /*DAILY SALES *
    
            if (data.dailySales != null)
              self.state.dailySales = data.dailySales;
    
            /*MONTHLY SALES *
    
            if (data.monthlySales != null)
              self.state.monthlySales = data.monthlySales;
    
            /*YEARLY SALES *
    
            if (data.yearlySales != null)
              self.state.yearlySales = data.yearlySales; */


        //jeeva googlechart payment data statistics

        /* 
                var chart_data = [
                  ["type", "amount"],
                  [" Cash " + (data.dailyList[0].dailyCashPaymentStatics), Number(data.dailyList[0].dailyCashPaymentStatics)],
                  [" Card " + (data.dailyList[0].dailyCardPaymentStatics), Number(data.dailyList[0].dailyCardPaymentStatics)],
                  [" Cheque " + (data.dailyList[0].dailyChequePaymentStatics), Number(data.dailyList[0].dailyChequePaymentStatics)],
                  [" Online " + (data.dailyList[0].dailyOnlinePaymentStatics), Number(data.dailyList[0].dailyOnlinePaymentStatics)]
                ];
        
                self.state.googleChart_payment_Data = chart_data;
                self.setState({
                  googleChart_payment_Data: self.state.googleChart_payment_Data
                })
                console.log("googlechart", data, "self.state.googleChart_payment_Data.data ", self.state.googleChart_payment_Data)
         */
        //googlechart for expense statistics

        var dailyExpense = data.dailyList[0].dailyExpense;
        if (data.dailyList[0].dailyExpense == null) {
          dailyExpense = 0;
        }
        var dailyQty = data.dailyList[0].quantity;
        if (data.dailyList[0].quantity == null) {
          dailyQty = 0;
        }


        /* 
                var googleChart_statistics_data = [
                  ["type", "amount"],
                  /*  [" Expense " + (data.dailyList[0].dailyCashPaymentStatics), Number(data.dailyList[0].dailyCashPaymentStatics)],
                   [" Tax " + (data.dailyList[0].dailyCardPaymentStatics), Number(data.dailyList[0].dailyCardPaymentStatics)],
                   [" Sale Quantity " + (data.dailyList[0].dailyChequePaymentStatics), Number(data.dailyList[0].dailyChequePaymentStatics)],
            */
        /* [" Tax " + (data.dailyList[0].taxAmount), Number(data.dailyList[0].taxAmount)], 
        [" Expense " + (dailyExpense), Number(dailyExpense)],*
        [" Sale Qty " + (dailyQty), Number(dailyQty)],
        [" Daily Netsale " + (self.state.sale), Number(self.state.sale)],
        [" Daily Purchase " + (self.state.purchase), Number(self.state.purchase)],
        [" Daily Expense " + (self.state.expense), Number(self.state.expense)],
        [" Daily profits " + (self.state.profit), Number(self.state.profit)],

        [" Tax " + (data.dailyList[0].taxAmount), Number(data.dailyList[0].taxAmount)],

        /*  [" Expense1" + (2020), Number(2020)],
         [" Tax1 " + (800), Number(800)],
         [" Sale Qty1 " + (200), Number(200)],
         [" Expense3" + (2020), Number(2020)],
         [" Tax3 " + (800), Number(800)],
         [" Sale Qty3 " + (200), Number(200)],
         [" Sale Qty4 " + (200), Number(200)],
         [" Expense4" + (2020), Number(2020)],
         [" Tax4 " + (800), Number(800)],
         [" Sale Qty4 " + (200), Number(200)] *

      ];

      self.state.googleChart_statistics = googleChart_statistics_data;
      self.setState({
        googleChart_statistics: self.state.googleChart_statistics
      })
      console.log("googlechart", data, "self.state.googleChart_statistics.data ", self.state.googleChart_statistics)

*/
self.state.interval_refresh = setInterval(() => self.RepeatData(), 5000);

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
  RepeatData() {

    var self = this;
   // console.log("dashboard", dashboardData, " len ", dashboardData.dailyList.length);
    switch (i) {
      case 1:
        if (dashboardData.dailyList.length > 0) {

          $.each(dashboardData.dailyList, function (i, item) {
            self.state.current_type = "Daily";
            self.state.last_current_type = "Yesterday";

            if (item.dailySales != null) {
              self.state.sale = item.dailySales;
            }
            else {
              self.state.sale = 0;
            }

            if (item.dailyExpense != null) {
              self.state.expense = item.dailyExpense;
            }
            else {
              self.state.expense = 0;
            }

            if (item.daily_PurchaseInvoice != null) {
              self.state.purchase = item.daily_PurchaseInvoice;
            }
            else {
              self.state.purchase = 0;
            }

            //jeeva google chart data
            var chart_data_Daily = [
              ["type", "amount"],
              /*  [" Cash " + 20,(20)],
               [" Card " + 20,(20)],
               [" Cheque " + 20,(20)],
               [" Online " + 20,(20)], */

              [" Cash " + (dashboardData.dailyList[0].dailyCashPaymentStatics), Number(dashboardData.dailyList[0].dailyCashPaymentStatics)],
              [" Card " + (dashboardData.dailyList[0].dailyCardPaymentStatics), Number(dashboardData.dailyList[0].dailyCardPaymentStatics)],
              [" Cheque " + (dashboardData.dailyList[0].dailyChequePaymentStatics), Number(dashboardData.dailyList[0].dailyChequePaymentStatics)],
              [" Online " + (dashboardData.dailyList[0].dailyOnlinePaymentStatics), Number(dashboardData.dailyList[0].dailyOnlinePaymentStatics)]
            ];

              self.state.googleChart_payment_Data = chart_data_Daily;
            console.log("payment stst ",chart_data_Daily);
            //jeeva google chart data for overall Statistics
            var googleChart_statistics_data_Daily = [
              ["type", "amount"],

              [" Sale Qty " + (3333), Number(3333)],
              [" Netsale " + (self.state.sale), Number(self.state.sale)],
              [" Purchase " + (self.state.purchase), Number(self.state.purchase)],
              [" Expense " + (self.state.expense), Number(self.state.expense)],
              /*  [" profits " + (self.state.profit), Number(self.state.profit)], */
              [" Tax " + (dashboardData.dailyList[0].taxAmount), Number(dashboardData.dailyList[0].taxAmount)],
            ];

            self.state.googleChart_statistics = googleChart_statistics_data_Daily;

            console.log("googlechart", dashboardData, "self.state.googleChart_statistics.data ", self.state.googleChart_statistics)

 /********************************* */
            //jeeva google graph data for Employees Graph

            var barGraph_Emp_Array = [["Employee Name", "No of services", " Service Amount"]];

            //amul kindly replace the value of criticalreportdatalist and
            // it should be daily services & daily service Amount
            // ["Employee Name", "Daily_No of services", "Daily_Service Amount"]
            // format value should be ['Arun,hairStylist', 30, 800],


            $.each(dashboardData.dailyEmployeeStatisticsDataList, function (i, item) {

              barGraph_Emp_Array.push([item.staffName + " , " + item.roleName, Number(item.noOfService), Number(item.serviceAmount)])

            });
            console.log("barGraph_Emp_Array", barGraph_Emp_Array);

            self.state.google_Bargraph_Employees = barGraph_Emp_Array;

            console.log("googlechart", dashboardData, "self.state.google_Bargraph_Employees.data ", self.state.google_Bargraph_Employees)

/********************************************* */
            //jeeva google graph data for google_Bargraph_TopSelling_Product Graph

            var barGraph_Top_Selling_ProductList_Array = [["Product Name", "Sale Qty",]];

            //amul kindly replace the value of criticalreportdatalist and
            // it should be daily services & daily service Amount
            // ["Product Name", "Sale Qty",]
            // format value should be ['lorel shampoo', 30,],

            $.each(dashboardData.criticalReportDataList, function (i, item) {

              barGraph_Top_Selling_ProductList_Array.push([item.productName, Number(item.quantity)])

            });
            console.log("barGraph_Emp_Array", barGraph_Top_Selling_ProductList_Array);

            self.state.google_Bargraph_TopSelling_Product = barGraph_Top_Selling_ProductList_Array;

            console.log("googlechart", dashboardData, "self.state.google_Bargraph_TopSelling_Product.data ", self.state.google_Bargraph_TopSelling_Product)

   /********************************** */
            //jeeva google graph data for google_Bargraph_Critical_Product Graph

            var barGraph_Top_Selling_Critical_Productlist_Array = [["Product Name", "Sale Qty",]];

            //amul kindly replace the value of criticalreportdatalist and
            // it should be daily services & daily service Amount
            // ["Product Name", "Sale Qty",]
            // format value should be ['lorel shampoo', 30,],

            $.each(dashboardData.criticalReportDataList, function (i, item) {

              barGraph_Top_Selling_Critical_Productlist_Array.push([item.productName, Number(item.quantity)])

            });
            console.log("barGraph_Emp_Array", barGraph_Top_Selling_ProductList_Array);

            self.state.google_Bargraph_Critical_Product = barGraph_Top_Selling_ProductList_Array;

            console.log("googlechart", dashboardData, "self.state.google_Bargraph_Critical_Product.data ", self.state.google_Bargraph_Critical_Product)


            //last value
            /** yesterday value Replace  item.dailySales with yesterday sale value*/
            if (item.dailySales != null) {
              self.state.last_sale = 0;

            }

            if (item.dailyExpense != null) {
              self.state.last_expense = 0;
            }

            if (item.daily_PurchaseInvoice != null) {
              self.state.last_purchase = 0;
            }

          });
          self.state.profit = Number(self.state.sale) - (Number(self.state.expense) + Number(self.state.purchase));
          self.state.last_profit = Number(self.state.last_sale) - (Number(self.state.last_expense) + Number(self.state.last_purchase));

          i = i + 1;
          this.setState({
            sale: this.state.sale,
            purchase: this.state.purchase,
            expense: this.state.expense,

            last_sale: this.state.last_sale,
            last_purchase: this.state.last_purchase,
            last_expense: this.state.last_expense,
            last_profit: this.state.last_profit,
            current_type: this.state.current_type,
            last_current_type: this.state.last_current_type,

            googleChart_payment_Data: this.state.googleChart_payment_Data,
            googleChart_statistics: this.state.googleChart_statistics,
            google_Bargraph_Employees: this.state.google_Bargraph_Employees,
            google_Bargraph_TopSelling_Product:this.state.google_Bargraph_TopSelling_Product,
            google_Bargraph_Critical_Product:this.state.google_Bargraph_Critical_Product,

          });
        }
        break;

      case 2:
        if (dashboardData.monthlyList.length > 0) {

          $.each(dashboardData.monthlyList, function (i, item) {
            self.state.current_type = "Monthly";
            self.state.last_current_type = "Last Month";

            if (item.monthlySales != null) {
              self.state.sale = item.monthlySales;
            } else {
              self.state.sale = 0;
            }

            if (item.monthly_ExpenseInvoice != null) {
              self.state.expense = item.monthly_ExpenseInvoice;
            } else {
              self.state.expense = 0;
            }

            if (item.monthly_PurchaseInvoice != null) {
              self.state.purchase = item.monthly_PurchaseInvoice;
            }
            else {
              self.state.purchase = 0;
            }

            //jeeva google chart data
            var chart_data_Monthly = [
              ["type", "amount"],
              /* [" Cash " + 40,(40)],
              [" Card " + 0,(0)],
              [" Cheque " + 40,(40)],
              [" Online " + 0,(0)], */

              [" Cash " + (dashboardData.monthlyList[0].monthlyCashPaymentStatics), Number(dashboardData.monthlyList[0].monthlyCashPaymentStatics)],
              [" Card " + (dashboardData.monthlyList[0].monthlyCardPaymentStatics), Number(dashboardData.monthlyList[0].monthlyCardPaymentStatics)],
              [" Cheque " + (dashboardData.monthlyList[0].monthlyChequePaymentStatics), Number(dashboardData.monthlyList[0].monthlyChequePaymentStatics)],
              [" Online " + (dashboardData.monthlyList[0].monthlyOnlinePaymentStatics), Number(dashboardData.monthlyList[0].monthlyOnlinePaymentStatics)]
            ];


            if (dashboardData.monthlyList != null) {
              self.state.googleChart_payment_Data = chart_data_Monthly;

            } else {
              self.state.googleChart_payment_Data = 0;
            }


            //jeeva google chart data for overall Statistics


            var googleChart_statistics_data_Monthly = [
              ["type", "amount"],
              [" Sale Qty " + (3333), Number(3333)],
              [" Netsale " + (self.state.sale), Number(self.state.sale)],
              [" Purchase " + (self.state.purchase), Number(self.state.purchase)],
              [" Expense " + (self.state.expense), Number(self.state.expense)],
              /*  [" profits " + (self.state.profit), Number(self.state.profit)], */
              [" Tax " + (dashboardData.dailyList[0].taxAmount), Number(dashboardData.dailyList[0].taxAmount)],
            ];

            self.state.googleChart_statistics = googleChart_statistics_data_Monthly;

            console.log("googlechart", dashboardData, "self.state.googleChart_statistics.data ", self.state.googleChart_statistics)

            
 /********************************* */
            //jeeva google graph data for Employees Graph

            var barGraph_Emp_Array = [["Employee Name", "No of services", " Service Amount"]];

            //amul kindly replace the value of criticalreportdatalist and
            // it should be daily services & daily service Amount
            // ["Employee Name", "Daily_No of services", "Daily_Service Amount"]
            // format value should be ['Arun,hairStylist', 30, 800],
          //  alert("monthlyEmployeeStatisticsDataList"+dashboardData.monthlyEmployeeStatisticsDataList);
            $.each(dashboardData.monthlyEmployeeStatisticsDataList, function (i, item) {

              barGraph_Emp_Array.push([item.staffName + " , " + item.roleName, Number(item.noOfService), Number(item.serviceAmount)])

            });
            console.log("barGraph_Emp_Array", barGraph_Emp_Array);

            self.state.google_Bargraph_Employees = barGraph_Emp_Array;

            console.log("googlechart", dashboardData, "self.state.google_Bargraph_Employees.data ", self.state.google_Bargraph_Employees)

/********************************************* */
            //jeeva google graph data for google_Bargraph_TopSelling_Product Graph

            var barGraph_Top_Selling_ProductList_Array = [["Product Name", "Sale Qty",]];

            //amul kindly replace the value of criticalreportdatalist and
            // it should be daily services & daily service Amount
            // ["Product Name", "Sale Qty",]
            // format value should be ['lorel shampoo', 30,],

            $.each(dashboardData.criticalReportDataList, function (i, item) {

              barGraph_Top_Selling_ProductList_Array.push([item.productName, Number(item.quantity)])

            });
            console.log("barGraph_Emp_Array", barGraph_Top_Selling_ProductList_Array);

            self.state.google_Bargraph_TopSelling_Product = barGraph_Top_Selling_ProductList_Array;

            console.log("googlechart", dashboardData, "self.state.google_Bargraph_TopSelling_Product.data ", self.state.google_Bargraph_TopSelling_Product)

   /********************************** */
            //jeeva google graph data for google_Bargraph_Critical_Product Graph

            var barGraph_Top_Selling_Critical_Productlist_Array = [["Product Name", "Sale Qty",]];

            //amul kindly replace the value of criticalreportdatalist and
            // it should be daily services & daily service Amount
            // ["Product Name", "Sale Qty",]
            // format value should be ['lorel shampoo', 30,],

            $.each(dashboardData.criticalReportDataList, function (i, item) {

              barGraph_Top_Selling_Critical_Productlist_Array.push([item.productName, Number(item.quantity)])

            });
            console.log("barGraph_Emp_Array", barGraph_Top_Selling_ProductList_Array);

            self.state.google_Bargraph_Critical_Product = barGraph_Top_Selling_ProductList_Array;

            console.log("googlechart", dashboardData, "self.state.google_Bargraph_Critical_Product.data ", self.state.google_Bargraph_Critical_Product)



            //last value
            /** yesterday value Replace  item.dailySales with yesterday sale value*/
            if (item.dailySales != null) {
              self.state.last_sale = 0;

            }

            if (item.dailyExpense != null) {
              self.state.last_expense = 0;
            }

            if (item.daily_PurchaseInvoice != null) {
              self.state.last_purchase = 0;
            }

          });
          self.state.profit = Number(self.state.sale) - (Number(self.state.expense) + Number(self.state.purchase));
          self.state.last_profit = Number(self.state.last_sale) - (Number(self.state.last_expense) + Number(self.state.last_purchase));

          i = i + 1;
          this.setState({
            sale: this.state.sale,
            purchase: this.state.purchase,
            expense: this.state.expense,

            last_sale: this.state.last_sale,
            last_purchase: this.state.last_purchase,
            last_expense: this.state.last_expense,
            last_profit: this.state.last_profit,
            current_type: this.state.current_type,
            last_current_type: this.state.last_current_type,

            googleChart_payment_Data: this.state.googleChart_payment_Data,
            googleChart_statistics: this.state.googleChart_statistics,
            google_Bargraph_Employees: this.state.google_Bargraph_Employees,
            google_Bargraph_TopSelling_Product:this.state.google_Bargraph_TopSelling_Product,
            google_Bargraph_Critical_Product:this.state.google_Bargraph_Critical_Product,



          });
        }
        break;

      case 3:
        if (dashboardData.yearlyList.length > 0) {

          $.each(dashboardData.yearlyList, function (i, item) {
            self.state.current_type = "Yearly";
            self.state.last_current_type = "Last Year";

            if (item.yearlySales != null) {
              self.state.sale = item.yearlySales;
            }
            else {
              self.state.sale = 0;
            }

            if (item.yearlyExpense != null) {
              self.state.expense = item.yearlyExpense;
            }
            else {
              self.state.expense = 0;
            }
            if (item.yearly_PurchaseInvoice != null) {
              self.state.purchase = item.yearly_PurchaseInvoice;
            }
            else {
              self.state.purchase = 0;
            }

            //jeeva google chart data 

            var chart_data_Yearly = [
              ["type", "amount"],
              /*   [" Cash " + 10,(10)],
                [" Card " + 0,(0)],
                [" Cheque " + 0,(0)],
                [" Online " + 0,(0)], */

              [" Cash " + (dashboardData.yearlyList[0].yearlyCashPaymentStatics), Number(dashboardData.yearlyList[0].yearlyCashPaymentStatics)],
              [" Card " + (dashboardData.yearlyList[0].yearlyCardPaymentStatics), Number(dashboardData.yearlyList[0].yearlyCardPaymentStatics)],
              [" Cheque " + (dashboardData.yearlyList[0].yearlyChequePaymentStatics), Number(dashboardData.yearlyList[0].yearlyChequePaymentStatics)],
              [" Online " + (dashboardData.yearlyList[0].yearlyOnlinePaymentStatics), Number(dashboardData.yearlyList[0].yearlyOnlinePaymentStatics)]
            ];


            if (dashboardData.yearlyList != null) {
              self.state.googleChart_payment_Data = chart_data_Yearly;

            } else {
              self.state.googleChart_payment_Data = 0;
            }

            //jeeva google chart data for overall Statistics


            var googleChart_statistics_data_Yearly = [
              ["type", "amount"],
              [" Sale Qty " + (200), Number(200)],
              [" Netsale " + (self.state.sale), Number(self.state.sale)],
              [" Purchase " + (self.state.purchase), Number(self.state.purchase)],
              [" Expense " + (self.state.expense), Number(self.state.expense)],
              /*  [" profits " + (self.state.profit), Number(self.state.profit)], */
              [" Tax " + (dashboardData.dailyList[0].taxAmount), Number(dashboardData.dailyList[0].taxAmount)],
            ];

            self.state.googleChart_statistics = googleChart_statistics_data_Yearly;

            console.log("googlechart", dashboardData, "self.state.googleChart_statistics.data ", self.state.googleChart_statistics)


            
 /********************************* */
            //jeeva google graph data for Employees Graph

            var barGraph_Emp_Array = [["Employee Name", "No of services", " Service Amount"]];

            //amul kindly replace the value of criticalreportdatalist and
            // it should be daily services & daily service Amount
            // ["Employee Name", "Daily_No of services", "Daily_Service Amount"]
            // format value should be ['Arun,hairStylist', 30, 800],

          //  alert("yearlyEmployeeStatisticsDataList"+dashboardData.yearlyEmployeeStatisticsDataList);
            $.each(dashboardData.yearlyEmployeeStatisticsDataList, function (i, item) {

              barGraph_Emp_Array.push([item.staffName + " , " + item.roleName, Number(item.noOfService), Number(item.serviceAmount)])

            });
            console.log("barGraph_Emp_Array", barGraph_Emp_Array);

            self.state.google_Bargraph_Employees = barGraph_Emp_Array;

            console.log("googlechart", dashboardData, "self.state.google_Bargraph_Employees.data ", self.state.google_Bargraph_Employees)

/********************************************* */
            //jeeva google graph data for google_Bargraph_TopSelling_Product Graph

            var barGraph_Top_Selling_ProductList_Array = [["Product Name", "Sale Qty",]];

            //amul kindly replace the value of criticalreportdatalist and
            // it should be daily services & daily service Amount
            // ["Product Name", "Sale Qty",]
            // format value should be ['lorel shampoo', 30,],

            $.each(dashboardData.criticalReportDataList, function (i, item) {

              barGraph_Top_Selling_ProductList_Array.push([item.productName, Number(item.quantity)])

            });
            console.log("barGraph_Emp_Array", barGraph_Top_Selling_ProductList_Array);

            self.state.google_Bargraph_TopSelling_Product = barGraph_Top_Selling_ProductList_Array;

            console.log("googlechart", dashboardData, "self.state.google_Bargraph_TopSelling_Product.data ", self.state.google_Bargraph_TopSelling_Product)

   /********************************** */
            //jeeva google graph data for google_Bargraph_Critical_Product Graph

            var barGraph_Top_Selling_Critical_Productlist_Array = [["Product Name", "Sale Qty",]];

            //amul kindly replace the value of criticalreportdatalist and
            // it should be daily services & daily service Amount
            // ["Product Name", "Sale Qty",]
            // format value should be ['lorel shampoo', 30,],

            $.each(dashboardData.criticalReportDataList, function (i, item) {

              barGraph_Top_Selling_Critical_Productlist_Array.push([item.productName, Number(item.quantity)])

            });
            console.log("barGraph_Emp_Array", barGraph_Top_Selling_ProductList_Array);

            self.state.google_Bargraph_Critical_Product = barGraph_Top_Selling_ProductList_Array;

            console.log("googlechart", dashboardData, "self.state.google_Bargraph_Critical_Product.data ", self.state.google_Bargraph_Critical_Product)



            //last value
            /** yesterday value Replace  item.dailySales with yesterday sale value*/
            if (item.dailySales != null) {
              self.state.last_sale = 0;

            }

            if (item.dailyExpense != null) {
              self.state.last_expense = 0;
            }

            if (item.daily_PurchaseInvoice != null) {
              self.state.last_purchase = 0;
            }

          });
          self.state.profit = Number(self.state.sale) - (Number(self.state.expense) + Number(self.state.purchase));
          self.state.last_profit = Number(self.state.last_sale) - (Number(self.state.last_expense) + Number(self.state.last_purchase));

          i = 1;
          this.setState({
            sale: this.state.sale,
            purchase: this.state.purchase,
            expense: this.state.expense,

            last_sale: this.state.last_sale,
            last_purchase: this.state.last_purchase,
            last_expense: this.state.last_expense,
            last_profit: this.state.last_profit,
            current_type: this.state.current_type,
            last_current_type: this.state.last_current_type,

            googleChart_payment_Data: this.state.googleChart_payment_Data,
            googleChart_statistics: this.state.googleChart_statistics,
            google_Bargraph_Employees: this.state.google_Bargraph_Employees,
            google_Bargraph_TopSelling_Product:this.state.google_Bargraph_TopSelling_Product,
            google_Bargraph_Critical_Product:this.state.google_Bargraph_Critical_Product,



          });
        }



    }





  }
  viewAll() {
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={InvoiceList} />
        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }
  viewAllReport() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={AvailableStockReport} />
        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }



  addProduct() {
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={AddProduct} />
        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }
  addQuotation() {
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={GSTQuotation} />
        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }
  addSalesInvoice() {
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={SaleOrder} />
        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }
  addVendors() {
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={VendorEntryForm} />
        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }

  render() {
    return (
      <div className="container-fluid" style={{ backgroundColor: "#eee" }}>

        <div class="btn-group" style={{ marginTop: "10px", float: "right" }}>
          <button type="button" style={{ backgroundColor: "#47595a" }} class="btn btn-primary">Daily</button>
          <button type="button" style={{ backgroundColor: "#47595a" }} class="btn btn-primary">Monthly</button>
          <button type="button" style={{ backgroundColor: "#47595a" }} class="btn btn-primary">Yearly</button>
        </div>

        <div className="row" style={{ marginTop: "40px" }}>
          <div className="col-md-3 col-sm-6 col-xs-12">
            <div className="info-box infobox1_1" style={{ backgroundImage: "linear-gradient(120deg, rgb(150, 149, 117) 0%, rgba(13, 95, 136, 0.76) 100%)" }}>
              <span className="info-box-icon bg-aqua">
                <i class="fa fa-dollar glyicon_style" />
              </span>
              <div className="info-box-content">
                <span className="info-box-text">{this.state.current_type} Netsale</span>
                <span className="info-box-number"><span class="info-currency">₹ </span><span>{Math.round(this.state.sale)}</span><small></small></span>
              </div>
              {/* /.info-box-content */}
            </div>
            {/* seconday info */}

            <div className="info-box_sec infobg1">

              <div className="info-box-content_sec">
                <span className="info-box-text_sec">{this.state.last_current_type} Netsale</span>
                <span className="info-box-icon_sec bg-aqua">
                  <i class="glyphicon glyphicon-menu-right " /></span>
                <span className="info-box-number_sec"><span class="info-currency-sec">₹ </span > {this.state.last_sale}{/* 90<small>%</small> */}</span>
              </div>
            </div>

            {/* /.info-box */}
          </div>
          <div className="col-md-3 col-sm-6 col-xs-12">
            <div className="info-box  infobox1_1" style={{ backgroundImage: "linear-gradient(120deg, rgb(150, 149, 117) 0%, rgba(13, 95, 136, 0.76) 100%)" }}>
              <span className="info-box-icon bg-aqua"><i class="fa fa-shopping-cart glyicon_style" /></span>
              <div className="info-box-content">
                <span className="info-box-text">{this.state.current_type} Purchase</span>
                <span className="info-box-number"><span class="info-currency">₹ </span>  <span>{Math.round(this.state.purchase)}</span>{/* 900<small></small> */}</span>
              </div>
              {/* /.info-box-content */}
            </div>
            {/* seconday info */}

            <div className="info-box_sec infobg1">

              <div className="info-box-content_sec">
                <span className="info-box-text_sec">{this.state.last_current_type} Purchase</span>
                <span className="info-box-icon_sec bg-aqua">
                  <i class="glyphicon glyphicon-menu-right " /></span>
                <span className="info-box-number_sec"><span class="info-currency-sec">₹ </span> {this.state.last_purchase}{/* 9000<small></small> */}</span>
              </div>
            </div>

            {/* /.info-box */}
          </div>
          <div className="col-md-3 col-sm-6 col-xs-12">
            <div className="info-box  infobox1_1" style={{ backgroundImage: "linear-gradient(120deg, rgb(150, 149, 117) 0%, rgba(13, 95, 136, 0.76) 100%)" }}>
              <span className="info-box-icon bg-aqua"><i class="fa fa-money glyicon_style" /></span>
              <div className="info-box-content">
                <span className="info-box-text">{this.state.current_type} Expense</span>
                <span className="info-box-number"><span class="info-currency">₹ </span>  <span>{Math.round(this.state.expense)}</span></span>
              </div>
              {/* /.info-box-content */}
            </div>
            {/* seconday info */}

            <div className="info-box_sec infobg1">

              <div className="info-box-content_sec">
                <span className="info-box-text_sec">{this.state.last_current_type} Expense</span>
                <span className="info-box-icon_sec bg-aqua">
                  <i class="glyphicon glyphicon-menu-right " /></span>
                <span className="info-box-number_sec"><span class="info-currency-sec">₹ </span> {this.state.last_expense} </span>
              </div>
            </div>

            {/* /.info-box */}
          </div>  <div className="col-md-3 col-sm-6 col-xs-12">
            <div className="info-box  infobox1_1" style={{ backgroundImage: "linear-gradient(120deg, rgb(150, 149, 117) 0%, rgba(13, 95, 136, 0.76) 100%)" }}>
              <span className="info-box-icon bg-aqua"><i class="glyphicon glyphicon-triangle-top  glyicon_style" /></span>
              <div className="info-box-content">
                <span className="info-box-text">{this.state.current_type} Profits</span>
                <span className="info-box-number"><span class="info-currency">₹ </span> <span>{Math.round(this.state.profit)}</span></span>
              </div>
              {/* /.info-box-content */}
            </div>
            {/* seconday info */}

            <div className="info-box_sec infobg1">

              <div className="info-box-content_sec">
                <span className="info-box-text_sec">{this.state.last_current_type} Profits</span>
                <span className="info-box-icon_sec bg-aqua">
                  <i class="glyphicon glyphicon-menu-right " /></span>
                <span className="info-box-number_sec"><span class="info-currency-sec">₹ </span> {this.state.last_profit}</span>
              </div>
            </div>

            {/* /.info-box */}
          </div>
        </div>


        {/* section 2.0 Employee Information*/}


        {/*   <div>
          <div class="row" style={{ padding: "0px 0px", textAlign: "center", margin: "0px" }}>
            <div class="col-lg-3 col-sm-12 col-xs-12" style={{ marginBottom: "20px" }}>


              <div style={{ padding: " 0 15px !important" }} >
                <div class="s12">
                  <div class="s13">
                    <span class="fa fa-trophy s_fa_12"> </span>
                    <div style={{
                      borderTop: "1px solid #eee",
                      marginTop: " 20px"
                    }}>

                    </div>
                  </div>
                  <h4 onClick={() => this.AddEmpFunc()}
                    className=" sec2header" > Sandhiya </h4>
                </div>


              </div>
            </div>
            <div class="col-lg-3 col-sm-12 col-xs-12" style={{ marginBottom: "20px" }}>


              <div style={{ padding: " 0 15px !important" }} >
                <div class="s12">
                  <div class="s13">
                    <span class="fa fa-trophy "> </span>
                    <div style={{
                      borderTop: "1px solid #eee",
                      marginTop: " 20px"
                    }}>

                    </div>
                  </div>
                  <h4 onClick={() => this.EmployeeLocationPage()}
                    className=" sec2header" >Priyanka </h4>
                </div>


              </div>
            </div>
            <div class="col-lg-3 col-sm-12 col-xs-12" style={{ marginBottom: "20px" }}>


              <div style={{ padding: " 0 15px !important" }} >
                <div class="s12">
                  <div class="s13">
                    <span class="fa fa-trophy "> </span>
                    <div style={{
                      borderTop: "1px solid #eee",
                      marginTop: " 20px"
                    }}>

                    </div>
                  </div>
                  <h4 onClick={() => this.MessageFunc()}
                    className=" sec2header" >Amul </h4>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-sm-12 col-xs-12" style={{ marginBottom: "20px" }}>


              <div style={{ padding: " 0 15px !important" }} >
                <div class="s12">
                  <div class="s13">
                    <span class="fa fa-trophy "> </span>
                    <div style={{
                      borderTop: "1px solid #eee",
                      marginTop: " 20px"
                    }}>

                    </div>
                  </div>
                  <h4 onClick={() => this.ConfigurationFunc()}
                    className=" sec2header" >Jeeva </h4>
                </div>


              </div>
            </div>

          </div>
        </div> */}

        <section>
          <div class="row" style={{ paddingBottom: "0px" }}>


            {/* Doughnut chart  */}

            <div class="col-lg-6 " style={{ paddingTop: "0px", border: " 5px solid rgb(238, 238, 238)", backgroundColor: "white" }}>
              <div>
                <h3 className="Dashboard_sub_head" >{this.state.current_type} Payment Statistics</h3>
                <button data-toggle="collapse" className="minimize_btn" data-target="#pay_stat"
                  aria-expanded="true"
                ></button>
                <div id="pay_stat" >
                  {/*  <div class="col-lg-9 " style={{ textAlign: "-webkit-center", paddingBottom: "20px" }}>

                    <Doughnut width={"250"} height={"180"}  /* style={{ height: "250px!important",width: "400px!important"}}  
                      data={this.state.doughnutData_payment}
                      options={{
                        maintainAspectRatio: false
                      }} />
                  </div> */}

                  <div class="" style={{ textAlign: "-webkit-center" }}>

                    <Chart
                      width={'100%'}
                      height={'300px'}
                      chartType="PieChart"
                      loader={<div>Loading Chart</div>}
                      data={this.state.googleChart_payment_Data}
                      options={options}
                      rootProps={{ 'data-testid': '2' }}
                    />
                  </div>
                  {/*     <div class="col-lg-3 ">
                    <div class="col-xl-3 m-b-2 text-center">
                      <h6 class="f-14">Cash</h6>
                      <h4 id="Donut1">{this.state.total_No_of_SaleInvoice_Qty}</h4>
                    </div>
                    <div class="col-xl-3 m-b-2 text-center">
                      <h6 class="f-14">Card</h6>
                      <h4 id="Donut2">{this.state.total_No_of_Salary_paid}</h4>
                    </div>
                    <div class="col-xl-3 m-b-2 text-center">
                      <h6 class="f-14">Cheque</h6>
                      <h4 id="Donut3">{this.state.monthly_ExpenseInvoice}</h4>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div class="col-lg-6" style={{ paddingTop: "0px", border: "5px solid rgb(238, 238, 238)", backgroundColor: "white" }}>
              <div>
                <h3 className="Dashboard_sub_head" >{this.state.current_type} Statistics</h3>
                <button data-toggle="collapse" className="minimize_btn" data-target="#pay_stat2"
                ></button>
                <div id="pay_stat2" >
                  {/* 
                  <div class="col-lg-9 " style={{ textAlign: "-webkit-center", paddingBottom: "20px" }}>

                    <Doughnut width={"250"} height={"180"}  /* style={{ height: "250px!important",width: "400px!important"}}  
                      data={this.state.doughnutData}
                      options={{
                        maintainAspectRatio: false
                      }} />
                  </div> */}
                  <div class=" " style={{ textAlign: "-webkit-center" }}>

                    <Chart
                      width={'100%'}
                      height={'300px'}
                      chartType="PieChart"
                      loader={<div>Loading Chart</div>}
                      data={this.state.googleChart_statistics}
                      options={options}
                      rootProps={{ 'data-testid': '2' }}
                    />
                  </div>

                </div>
              </div>

            </div>




          </div>

        </section>
        <div class="row" style={{ backgroundColor: "white" }}>
          <div class="col-12">
            <div class="col-lg-6 info-box_chart" style={{ border: "5px solid rgb(238, 238, 238)" }}>

              <div class="d-flex flex-wrap">
                <div>
                  <h3 className="Dashboard_sub_head" >Yearly Earning {this.state.current_Year} </h3>
                </div>
                <button data-toggle="collapse" className="minimize_btn" data-target="#Yearly_earnings"
                ></button>
                <div id="Yearly_earnings" className="">

                  <div>
                    <Bar data={this.state.chartData}
                      width={"827px"} height={"330px"}

                      options={{
                        maintainAspectRatio: false
                      }}
                      style={{
                        width: "827px",
                        height: "330px!important",

                      }}

                      options={{

                        responsive: true,
                        scales: {
                          yAxes: [
                            {
                              ticks: {
                                beginAtZero: true
                              }
                            }
                          ]
                        }

                      }} />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6" style={{ border: " 5px solid rgb(238, 238, 238)" }}>
              <h3 className="Dashboard_sub_head" >{this.state.current_type} Statistics</h3>
              <button data-toggle="collapse" className="minimize_btn" data-target="#employee_Graph"
              ></button>

              <div id="employee_Graph">
                <Chart
                  width={'500px'}
                  height={'300px'}
                  chartType="BarChart"
                  loader={<div>Loading Chart</div>}
                  data={this.state.google_Bargraph_Employees}
                  options={{
                    title: '',
                    chartArea: { width: '50%' },
                    colors: ['#6c567b', '#f67280'],
                    hAxis: {
                      title: 'Services',
                      minValue: 0,
                    },
                    vAxis: {
                      title: 'Employee Name',
                    },
                  }}
                  // For tests
                  rootProps={{ 'data-testid': '4' }}
                />
              </div>
              {/*       <div>
                <h3 className="Dashboard_sub_head" > Recent Sales</h3>
                <button data-toggle="collapse" className="minimize_btn" data-target="#recent_sales"
                ></button>
                <div id="recent_sales" className="">

                  <button type="button" id="loginSubmitButton" style={{
                    float: "right", fontSize: "11px",
                    marginTop: "-35px", marginRight: "25px", backgroundColor: "rgb(38, 66, 92)"
                  }} onClick={() => this.viewAll()} className="btn btn-md-primary" >ViewAll</button>
                  <p></p>
                  <div className=" table-responsive">
                    <table /*style={{ margin: "auto" }} * class="table table-responsive" id="tableHeadings">

                    </table>
                  </div>
                </div>
              </div> */}
            </div>


          </div>

        </div>



        <section>
          <div className="row">
            <div class="col-lg-12" style={{ backgroundColor: "white", border: " 5px solid rgb(238, 238, 238)" }}>
              <div>
                <h3 className="Dashboard_sub_head" >Quick Links</h3>

                <div>
                  <div className="row">
                    <div className="column column_4box" style={{ backgroundColor: '#aaa', backgroundImage: "linear-gradient(to left,rgb(135, 248, 255) 0%, rgba(49, 112, 143, 0.76) 100%)" }}>
                    <a href="#" onClick={() => this.addVendors()}><i class="glyphicon glyphicon-plus gly_plus " /><h3>{this.state.total_No_of_Vendors}</h3>
                      <p >Vendors</p>
                      <div><span className="span_4box"> </span></div></a>
                    </div>
                    <div className="column column_4box" style={{ backgroundColor: '#bbb', backgroundImage: "linear-gradient(to right, #e95377 0%, #ffb199 100%)" }}>
                    <a href="#" onClick={() => this.addProduct()}><i class="glyphicon glyphicon-plus gly_plus " /><h3>{this.state.total_No_of_ProductList}</h3>
                      <p>Products</p>
                      <div><span className="span_4box"></span></div></a>
                    </div>
                    <div className="column column_4box" style={{ backgroundColor: '#ccc', backgroundImage: "linear-gradient(to right, #f2886a 0%, #f2db6c 100%)" }}>
                    <a href="#" onClick={() => this.addSalesInvoice()}><i class="glyphicon glyphicon-plus gly_plus " /><h3>{this.state.total_No_of_SaleInvoice}</h3>
                      <p>Invoices</p>
                      <div><span className="span_4box"></span></div></a>

                    </div>
                    <div className="column column_4box" style={{ backgroundColor: '#ddd', backgroundImage: "linear-gradient(to right, #9f9a9a 0%, #9bc5c3 100%)" }}>
                    <a href="#" onClick={() => this.addQuotation()}><i class="glyphicon glyphicon-plus gly_plus " /> <h3>{this.state.total_No_of_Customers}</h3>
                      <p>Clients</p>
                      <div><span className="span_4box"></span></div></a>

                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/*TOP SALES OF THE MONTH */}
        <div class="row" style={{ paddingBottom: "20px", paddingTop: " 2%" }}>

          <div class="col-lg-6" style={{ backgroundColor: "white", border: "5px solid rgb(238, 238, 238)" }}>
            <div>
              <h3 className="Dashboard_sub_head">Top Selling Product {this.state.current_type} </h3>
              <button data-toggle="collapse" className="minimize_btn" data-target="#tab1_Top_Product"
              ></button>
              {/*  <button  type="button" data-toggle="collapse" data-target="#tab1" className="btn_max_min" 
                aria-expanded="true" aria-controls="tab1" >
              <i class="glyphicon glyphicon-plus minimize_btn_plus " id="minimize_btn_plus" />
              <i class="glyphicon glyphicon-minus maximize_btn_minus" id="maximize_btn_minus" style={{display:"none"}} />
                </button> */}

              {/*   <button data-toggle="collapse" className="maximize_btn" data-target="#tab1"
              ><i class="glyphicon glyphicon-minus maximise_btn" id="maximise_btn" />  </button> */}
            </div>
            {/* <p></p>
            <div className="" id="tab1" >
              <table /*style={{ margin: "auto" }} * class="table table-responsive " id="salesofmonth">

              </table>
              <table class="table table-responsive" id="salesofmonth">

              </table>
            </div> */}

            <div className="" id="tab1_Top_Product" >
              <Chart
                width={'500px'}
                height={'300px'}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={this.state.google_Bargraph_TopSelling_Product}
                /* data={[
                  ['Prouct Name', 'Sale Qty'],
                  ['lorel Shampoo', 8000],
                  ['Treseme', 7000],
                  ['Hair Conditioner', 6000],
                  ['Garnier', 3000],
                  ['Ved Hair Oil ', 700],
                ]} */
                options={{
                  title: ' ',
                  chartArea: { width: '50%' },
                  colors: ['#7fcd91'],
                  hAxis: {
                    title: 'Sale Qty',
                    minValue: 0,
                  },
                  vAxis: {
                    title: 'Product Name',
                  },
                }}
                // For tests 
                rootProps={{ 'data-testid': '4' }}
              />
            </div>
          </div>



          {/*TOP SALES OF THE YEAR */}

          <div class="col-lg-6" style={{ backgroundColor: "white", border: "5px solid rgb(238, 238, 238)" }}>

            <div>
              <h3 className="Dashboard_sub_head">{this.state.current_type} Critical Resources</h3>
              <button data-toggle="collapse" className="minimize_btn" data-target="#tab2_Critical_res"
              ></button>
            </div>
            <p></p>
            <div className="" id="tab2_Critical_res" >
              <button type="button" id="viewAllButton"
                style={{
                  float: "right", fontSize: "11px",
                  marginTop: "-35px", marginRight: "25px", backgroundColor: "rgb(38, 66, 92)", color: "white"
                }}
                onClick={() => this.viewAllReport()} className="btn btn-md-primary" >ViewAll</button>
              <p></p>
              <div>

                <div className="" id="tab1_Top_Product" >
                  <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={this.state.google_Bargraph_Critical_Product}
                    /* data={[
                      ['Prouct Name', 'Sale Qty'],
                      ['lorel Shampoo', 8000],
                      ['Treseme', 7000],
                      ['Hair Conditioner', 6000],
                      ['Garnier', 3000],
                      ['Ved Hair Oil ', 700],
                    ]} */
                    options={{
                      title: ' ',
                      chartArea: { width: '50%' },
                      colors: ['#b80d57'],
                      hAxis: {
                        title: 'Sale Qty',
                        minValue: 0,
                      },
                      vAxis: {
                        title: 'Product Name',
                      },
                    }}
                    // For tests 
                    rootProps={{ 'data-testid': '4' }}
                  />
                </div>


              </div>
            </div>
          </div>
        </div>



      </div>
    );
  }
}
export default DashboardOverall;