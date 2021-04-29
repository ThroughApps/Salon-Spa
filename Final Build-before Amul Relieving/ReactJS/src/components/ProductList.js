import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';
import './datepicker.css';

import datepicker from 'jquery-ui/ui/widgets/datepicker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Purchase from './Purchase';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import ProductListView from './ProductListView';
import ProductListEdit from './ProductListEdit';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import './DownloadButton.css';
import "./MainPageRedirectButton.css";
import AddProduct1 from './AddProduct';
import Case from "case";

var currentRow;
class ProductList1 extends Component {
  constructor(data) {
    super(data)
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    var today = new Date();
    today = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

    this.state = {
      date: today,
      productName: '',
      description: '',

      staffId: staffId,
      employeeName: employeeName,
      role: role,
      columns: [],
      dataList: [],
    };
  }

  componentDidMount() {

    $("#nodata").hide();
    $("#tableOverflow1").hide();

    this.GetData();
    window.scrollTo(0, 0);

  }
  GetData() {
    var self = this;
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,

      }),
      contentType: "application/json",
      dataType: 'json',
      url: " http://15.206.129.105:8080/MerchandiseAPI/master/saleproductreport",
      async: false,
      crossDomain: true,
      success: function (data, textStatus, jqXHR) {
        var no;
        self.state.dataList = [];
        if (data.saleProductRetrievelist.length != 0) {

          var tab = '<thead><tr class="headcolor"><th>S.No</th><th>Product Name</th><th>Product Type</th><th>Product Category</th><th>Quantity</th><th>QuantityLimit</th><th>CGST(%)</th><th>SGST(%)</th><th>IGST(%)</th><th>HSN Code</th><th style="width: 5px; ">Sale Rate(Rs)</th><th style="width: 5px; ">Purchase Rate(Rs)</th><th>Description</th></tr></thead>';

          $.each(data.saleProductRetrievelist, function (i, item) {
            no = parseInt(i) + 1;
            tab += '<tbody id= "myTable" ><tr  id="tabletextcol" ><td>' + no + '</td><td>' + item.productName + '</td><td>' + item.productType + '</td><td>' + item.productCategory + '</td><td>' + item.quantity + '</td><td>' + item.quantityLimit + '</td><td>' + item.cgst + '</td><td>' + item.sgst + '</td><td>' + item.igst + '</td><td>' + item.hsnCode + '</td><td>' + item.saleRate + '</td><td>' + item.purchaseRate + '</td><td class="description">' + item.description + '</td></tr></tbody>';
            //  if(item.productType=="service"){

            //  }

            self.state.dataList[i] = {
              "SNo": no,
              "ProductName": item.productName,
              "CGST(%)": item.cgst,
              "SGST(%)": item.sgst,
              "HSN Code": item.hsnCode,
              "SaleRate(Rs)": item.saleRate,
              "PurchaseRate(Rs)": item.purchaseRate,
              "ProductType": Case.capital(item.productType),
              "Quantity": item.quantity,
              "IGST(%)": item.igst,
              "Description": item.description,
              "ProductId": item.productId,
              "QuantityLimit": item.quantityLimit,

              "ProductCategory": item.productCategory,

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
              "Update": < div class="updatedevice" id="updatedevice" style={{ textAlign: "center" }}><span style={{
                fontSize: '1em', color: 'white', padding: "3px 3px 5px 4px",
                fontSize: "1em",
                borderRadius: "12px",
                backgroundColor: "mediumseagreen"
              }}>
                <i class="glyphicon glyphicon-pencil" style={{ border: "none" }}></i>
              </span></div>
            };
          });
          $("#tableHeadings").append(tab);
          if (self.state.dataList.length > 0) {
            self.state.columns = self.getColumns();
          }
        }
        else {
          $("#nodata").show();

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

  getColumns() {
    return Object.keys(this.state.dataList[0]).map(key => {

      if (
        key != "Description" &&
        key != "ProductId" &&
        key != "QuantityLimit" &&
        key != "IGST(%)" &&
        key != "ProductCategory" &&
        key != "HSN Code"
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
    var self = this;
    return {

      onClick: (e, handleOriginal) => {

        if (column.Header === "Update") {

          if (rowInfo != undefined) {
            var rowIndexValue = rowInfo["index"];

            var productName = rowInfo.original["ProductName"];
            var cgst = rowInfo.original["CGST(%)"];
            var sgst = rowInfo.original["SGST(%)"];
            var igst = rowInfo.original["IGST(%)"];
            var hsnCode = rowInfo.original["HSN Code"];
            var saleRate = rowInfo.original["SaleRate(Rs)"];
            var purchaseRate = rowInfo.original["PurchaseRate(Rs)"];
            var description = rowInfo.original["Description"];
            var productId = rowInfo.original["ProductId"];
            var quantityLimit = rowInfo.original["QuantityLimit"];
            var productType = rowInfo.original["ProductType"];
            var productCategory = rowInfo.original["ProductCategory"];
            var quantity = rowInfo.original["Quantity"];



            this.state.productName = productName;
            this.state.cgst = cgst;
            this.state.sgst = sgst;
            this.state.igst = igst;
            this.state.hsnCode = hsnCode;
            this.state.saleRate = saleRate;
            this.state.purchaseRate = purchaseRate;
            this.state.description = description;
            this.state.productId = productId;
            this.state.quantityLimit = quantityLimit;
            this.state.productType = productType.toLowerCase();
            this.state.productCategory = productCategory;
            this.state.quantity = quantity;

            if (self.state.cgst == "null" || self.state.cgst == "-") {
              self.state.cgst = " ";
            } if (self.state.sgst == "null" || self.state.sgst == "-") {
              self.state.sgst = " ";
            } if (self.state.igst == "null" || self.state.igst == "-") {
              self.state.igst = " ";
            } if (self.state.hsnCode == "null" || self.state.hsnCode == "-") {
              self.state.hsnCode = " ";
            } if (self.state.saleRate == "null" || self.state.saleRate == "-") {
              self.state.saleRate = " ";
            }
            if (self.state.purchaseRate == "null" || self.state.purchaseRate == "-") {
              self.state.purchaseRate = " ";
            }
            if (self.state.productCategory == "null" || self.state.productCategory == "-") {
              self.state.productCategory = " ";
            }
            if (self.state.description == "null" || self.state.description == "-") {
              self.state.description = " ";
            }

            this.setState({
              productName: this.state.productName,
              cgst: this.state.cgst,
              sgst: this.state.sgst,
              igst: this.state.igst,
              hsnCode: this.state.hsnCode,
              saleRate: this.state.saleRate,
              purchaseRate: this.state.purchaseRate,
              description: this.state.description,
              productId: this.state.productId,
              quantityLimit: this.state.quantityLimit,
              productType: this.state.productType,
              productCategory: this.state.ProductCategory,
              quantity: this.state.quantity
            });
            ReactDOM.render(
              <Router>
                <div>

                  <Route path="/" component={() => <ProductListEdit
                    productName={this.state.productName}
                    cgst={this.state.cgst} sgst={this.state.sgst}
                    igst={this.state.igst} hsnCode={this.state.hsnCode}
                    saleRate={this.state.saleRate} purchaseRate={this.state.purchaseRate}
                    description={this.state.description}
                    productId={this.state.productId}
                    quantityLimit={this.state.quantityLimit} productType={this.state.productType}
                    productCategory={this.state.productCategory}
                    quantity={this.state.quantity}

                  />} />

                </div>
              </Router>,
              document.getElementById('contentRender'));
          }

        } else if (column.Header === "Delete") {

          if (rowInfo != undefined) {
            var rowIndexValue = rowInfo["index"];
            var productId = rowInfo.original["ProductId"];
            var productName = rowInfo.original["ProductName"];

            this.state.productId = productId;
            this.state.productName = productName;

            this.setState({
              productId: this.state.productId,
              productName: this.state.productName,
            });
            var rowIndexValue = rowInfo.index;


            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Do you Want to Delete ' + self.state.productName,
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
                  position: 'center',
                  icon: 'warning',
                  title: 'Cancelled Deletion Of ' + self.state.productName,
                  showConfirmButton: false,
                  timer: 2000,
                })
              }
            })

          }

        } else if (column.Header === "View") {

          if (rowInfo != undefined) {
            var rowIndexValue = rowInfo["index"];

            var productName = rowInfo.original["ProductName"];
            var cgst = rowInfo.original["CGST(%)"];
            var sgst = rowInfo.original["SGST(%)"];
            var igst = rowInfo.original["IGST(%)"];
            var hsnCode = rowInfo.original["HSN Code"];
            var saleRate = rowInfo.original["SaleRate(Rs)"];
            var purchaseRate = rowInfo.original["PurchaseRate(Rs)"];
            var description = rowInfo.original["Description"];
            var productId = rowInfo.original["ProductId"];
            var quantityLimit = rowInfo.original["QuantityLimit"];
            var productType = rowInfo.original["ProductType"];
            var productCategory = rowInfo.original["ProductCategory"];
            var quantity = rowInfo.original["Quantity"];



            this.state.productName = productName;
            this.state.cgst = cgst;
            this.state.sgst = sgst;
            this.state.igst = igst;
            this.state.hsnCode = hsnCode;
            this.state.saleRate = saleRate;
            this.state.purchaseRate = purchaseRate;
            this.state.description = description;
            this.state.productId = productId;
            this.state.quantityLimit = quantityLimit;
            this.state.productType = productType;
            this.state.productCategory = productCategory;
            this.state.quantity = quantity;

            if (self.state.cgst == "null" || self.state.cgst == "-") {
              self.state.cgst = " ";
            } if (self.state.sgst == "null" || self.state.sgst == "-") {
              self.state.sgst = " ";
            } if (self.state.igst == "null" || self.state.igst == "-") {
              self.state.igst = " ";
            } if (self.state.hsnCode == "null" || self.state.hsnCode == "-") {
              self.state.hsnCode = " ";
            } if (self.state.saleRate == "null" || self.state.saleRate == "-") {
              self.state.saleRate = " ";
            }
            if (self.state.purchaseRate == "null" || self.state.purchaseRate == "-") {
              self.state.purchaseRate = " ";
            }
            if (self.state.productCategory == "null" || self.state.productCategory == "-") {
              self.state.productCategory = " ";
            }


            if (self.state.description == "null" || self.state.description == "-") {
              self.state.description = " ";
            }
            this.setState({
              productName: this.state.productName,
              cgst: this.state.cgst,
              sgst: this.state.sgst,
              igst: this.state.igst,
              hsnCode: this.state.hsnCode,
              saleRate: this.state.saleRate,
              purchaseRate: this.state.purchaseRate,
              description: this.state.description,
              productId: this.state.productId,
              quantityLimit: this.state.quantityLimit,
              productType: this.state.productType,
              productCategory: this.state.ProductCategory,
              quantity: this.state.quantity

            });
            ReactDOM.render(
              <Router>
                <div>

                  <Route path="/" component={() => <ProductListView
                    productName={this.state.productName}
                    cgst={this.state.cgst} sgst={this.state.sgst}
                    igst={this.state.igst} hsnCode={this.state.hsnCode}
                    saleRate={this.state.saleRate} purchaseRate={this.state.purchaseRate}
                    description={this.state.description}
                    productId={this.state.productId}
                    quantityLimit={this.state.quantityLimit} productType={this.state.productType}
                    productCategory={this.state.productCategory}
                    quantity={this.state.quantity}
                  />} />

                </div>
              </Router>,
              document.getElementById('contentRender'));

          }
        }
      }
    };
  };


  DeleteFunc(rowIndexValue) {
    var self = this;

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        productName: self.state.productName,
        productId: self.state.productId,
        companyId: self.state.companyId,
        staffId: self.state.staffId,
        employeeName: self.state.employeeName,
        role: self.state.role,

      }),
      url: " http://15.206.129.105:8080/MerchandiseAPI/master/deletesaleproduct",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {

        var array = [...self.state.dataList]; // make a new copy of array instead of mutating the same array directly.
        array.splice(rowIndexValue, 1);
        self.state.dataList = [];
        self.state.dataList = array;
        self.setState({ dataList: array });

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
          <Route path="/" component={ProductList1} />
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

  AddProductPageFunc() {
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={AddProduct1} />


        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }
  render() {
    const downloadButtonData = <span style={{ fontWeight: "700", fontWeight: "900", fontSize: "15px" }}>Download</span>


    return (
      <div className="container" style={{ paddingTop: "0px" }}>
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
                  marginTop: "13px",
                  display: "inline-block"
                }}>
                <a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i>Back</a></ul>

            </div>
            <div className="col-lg-9 col-md-9 col-sm-8 col-xs-8">
              <div class="card-header">
                <h3>Product List</h3>   </div>

            </div>
          </div>
          <div class="card-body">
            <div class="form-horizontal form-bordered">

            </div>

            <div style={{ display: "grid",overflow:"auto" }}>


              <div className="row">
                <div className="col-sm-4 col-lg-8 col-md-8">

                </div>
                <div className="col-sm-4 col-lg-2 col-md-2">
                  <a class="pageredirectbtn" href="#" onClick={() => this.AddProductPageFunc()}>
                    <span style={{ fontWeight: "700", fontWeight: "900", fontSize: "15px" }}>+ Product</span>
                  </a>
                </div>
                <div className="col-sm-4 col-lg-2 col-md-2">

                  <div class="buttonright" >
                    <ReactHTMLTableToExcel
                      id="test-table-xls-button"
                      className="pageredirectbtn download-table-xls-button "
                      table="tableHeadings"
                      filename="Customer_List"
                      sheet="tablexls"
                      buttonText={downloadButtonData} />
                  </div>
                </div>
              </div>


              <div id="tableOverflow1">
                <table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">

                </table>
              </div>

              <div id="tableOverflow" class="hideContent">

                <ReactTable style={{overflow:"auto"}}
                  data={this.state.dataList}
                  columns={this.state.columns}
                  noDataText="No Data Available"
                  filterable
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
              </div>
            </div>

            <h4 id="nodata" class="hideContent" style={{ textAlign: "center" }}>
              No Data
        </h4>

          </div>
        </div>
      </div>
    );
  }

}
export default ProductList1;