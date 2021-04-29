import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';


import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js';
import ChatBotExcelValidationMessage from './ChatBotExcelValidationMessage';
import ChatBotExcelImportResponse from './ChatBotExcelImportResponse';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import * as XLSX from 'xlsx';
import _ from 'underscore';
var testarray = [];
var inputarray = [];
var emailArrary = [];
var dataList = [];
var oldChatBotFileNames;
var errorMessageArray = [];
var name;
var result;
class ChatBotCommunication extends Component {


  constructor() {

    super()
    //  var superiorId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    //  var sms = CryptoJS.AES.decrypt(localStorage.getItem('SMS'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

    var superiorId = '094'
    this.state = {
      country: "",
      origin: "",
      product: "Tictoks,Through Books,Digital Print App,School Management System",
      hardware: "Wireless Bio-metric,Wireless RFID ,no",
      superiorId: superiorId,
      // sms:sms,
      file: "",
      fileName: "",
      imageAttached: "",
      message: "",
    };
  }
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.state[name] = value;
    this.setState({ [name]: value },
    );
    //console.log("this.satte",this.state);

    //console.log("filter by",filterBy);
    var result;
    if (this.state.country == "" && this.state.origin == "" && this.state.product == "" && this.state.hardware == "") {
      // All value is selected
      result = dataList;
    }
    else {
      var countryarray = this.state.country.split(",");
      var originarray = this.state.origin.split(",");
      //console.log("Country array",countryarray);
      var productarray = this.state.product.split(",");
      //console.log("product array",productarray);
      var hardwarearray = this.state.hardware.split(",");
      //console.log("hardwarearray array",hardwarearray);

      var filterBy = { country: countryarray,origin: originarray, software: productarray, hardware: hardwarearray };
      //    console.log("filterBy",filterBy);
      //        console.log("Datalist",dataList);
      result = dataList.filter(function (o) {
        return Object.keys(filterBy).every(function (k) {
          return filterBy[k].some(function (f) {
            return o[k] == f;
          });
        });
      });
    }
    console.log(result);
    var tab;
    $("#MasterSelectBox").empty();
    $.each(result, function (i, item) {
      //console.log("afetr add",inputarray)
      tab += '<option value= "' + item.id + '">' + item.userName + " " + item.emailId + '</option>';
    });
    $("#MasterSelectBox").append(tab);
  }
  handleUserInputMsg = (e) => {
    const name = e.target.name;

    const value = e.target.value;
    this.state[name] = value;
    this.setState({ [name]: value },
    );
  }
  SelectAll() {
    var self = this;
    $.ajax({
      type: 'POST',
      //url: "http://15.206.129.105:8080/EmployeeAttendenceAPI/ChatBot/SelectAllChaBot",
      //  url: "https://wildfly.tictoks.in:443/EmployeeAttendenceAPI/ChatBot/SelectAllChaBot",
      url: " http://15.206.129.105:8080/MerchandiseAPI/ChatBot/SelectAllChaBot",


      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        console.log("ORIGIN LIST:",data.originList);
        console.log("Data from Backend:",data);
        if (data.length != 0) {
          var tab;
          $("#MasterSelectBox").empty();
          dataList = data.chatbotList;
          $.each(data.chatbotList, function (i, item) {
            var feed = JSON.stringify({
              id: item.id,
              emailId: item.emailId
            });
            inputarray.push(feed);
            //console.log("afetr add",inputarray)
            tab += '<option value= "' + item.id + '">' + item.userName + " " + item.emailId + '</option>';
          });
          $("#MasterSelectBox").append(tab);

          var country = "";
          var country_All = [];
          $.each(data.countryList, function (i, item) {

            country += '<option value= "' + item.country + '">' + item.country + '</option>';
            country_All.push(item.country);
          });
          country += '<option value="' + country_All + '" >All</option></option>';
          $("#country").append(country);
          self.state.country = country_All.toString();
          self.setState({
            country: self.state.country,
          });
console.log("ORIGIN LIST:",data.originList);

          var origin = "";
          var origin_All = [];
          $.each(data.originList, function (i, item) {

            origin += '<option value= "' + item.origin + '">' + item.origin + '</option>';
            origin_All.push(item.origin);
          });
          origin += '<option value="' + origin_All + '" >All</option></option>';
          $("#origin").append(origin);
          self.state.origin = origin_All.toString();
          self.setState({
            origin: self.state.origin,
          });

        } else {
          $("#MasterSelectBox").empty();
        }

      },

    });

  }
  myFunction() {
    var x = document.getElementById("authPassword");
    if (x.type == "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  componentDidMount() {

    testarray = [];
    emailArrary = [];
    inputarray = [];
    $("#customerimportarea").hide();
    errorMessageArray = [];
    $(document).ready(function () {
      $('#chatBotfiles').change(handleFileChatBot);

    });
    function handleFileChatBot(e) {

      console.log("inside handle chatbot file")
      var files = e.target.files;
      errorMessageArray = [];
      var i, f;
      for (i = 0, f = files[i]; i != files.length; ++i) {
        var reader = new FileReader();
        name = f.name;
        console.log("FILE NAME inside handle chatbot file : " + name);
        reader.onload = function (e) {
          var data = e.target.result;
          //console.log("DATA : " +data);
          var binary = "";
          var bytes = new Uint8Array(e.target.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          /* if binary string, read with type 'binary' */

          var workbook = XLSX.read(binary, { type: 'binary' });
          //console.log("WORK BOOK : " +workbook);
          /* DO SOMETHING WITH workbook HERE */
          //   workbook.SheetNames.forEach(function (sheetName) {
          var sheetName = workbook.SheetNames[0];

          //   var workbook = XLSX.readFile('./assets/yourfile.xlsx');// ./assets is where your relative path directory where excel file is, if your excuting js file and excel file in same directory just igore that part
          var sheet_name_list = workbook.SheetNames; // SheetNames is an ordered list of the sheets in the workbook
          var data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]); //if you have multiple sheets

          // read from a XLS file

          // get first sheet
          let first_sheet_name = workbook.SheetNames[0];
          let worksheet = workbook.Sheets[first_sheet_name];

          var errorStatus = 0;

          if (data.length > 0) {
            result = data;

            for (var key in data) {
              var keyValue = key;
              keyValue = Number(keyValue) + 2; //row no

              //USER NAME VALIDATON
              var userName = data[key]['Name'];
              if (userName != undefined) {

                if (!userName.match(/^([a-zA-Z]+)([a-zA-Z ])*$/)) {

                  errorStatus++;
                  console.log("ErrorStatus", errorStatus)
                  errorMessageArray.push("Check for Name Format( Only Alphabets ) At Row " + keyValue);

                }

              } else {
                // alert("STUDENT FIRST NAME IS EMPTY AT "+keyValue);
                errorStatus++;
                console.log("ErrorStatus", errorStatus)
                errorMessageArray.push("Name Empty At Row " + keyValue);
              }

              //EMAIL ID VALIDATION           
              var emailId = data[key]['EmailId'];
              if (emailId != undefined) {

                var regExp = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

                if (!regExp.test(emailId)) {
                  errorStatus++;
                  console.log("ErrorStatus", errorStatus)
                  errorMessageArray.push("Check for Email Id Format At Row " + keyValue);
                }
              } else {
                errorStatus++;
                errorMessageArray.push("EmailId Empty At Row " + keyValue );
               }
              //CONTACT NO VALIDATION
              var mobileNo = data[key]['MobileNo'];


              if (mobileNo != undefined) {
                var regExpConNo = /^\d{10}$/;
                if (!regExpConNo.test(mobileNo)) {
                  errorStatus++;
                  console.log("ErrorStatus", errorStatus)
                  errorMessageArray.push("Check for Mobile No Format At Row " + keyValue);
                }
              } else {
                //   alert("CONTACT NO IS EMPTY AT "+keyValue);
                errorStatus++;
                errorMessageArray.push("MobileNo Empty At Row " + keyValue );
              }




              // //DAte VALIDATION
              // var date = data[key]['Date'];
              // if (date != undefined) {

              // } else {
              //   // alert("ADDRESS IS EMPTY AT "+keyValue);
              //   // errorStatus++;
              // }

              //Software VALIDATION
              var software = data[key]['Software'];
              if (software != undefined) {

              } else {
                // alert("ADDRESS IS EMPTY AT "+keyValue);
                // errorStatus++;
              }

              //Hardware VALIDATION
              var hardware = data[key]['Hardware'];
              if (hardware != undefined) {

              } else {
                // alert("ADDRESS IS EMPTY AT "+keyValue);
                // errorStatus++;
              }

              //City VALIDATION
              var city = data[key]['City'];
              if (city != undefined) {

              } else {
                // alert("ADDRESS IS EMPTY AT "+keyValue);
                // errorStatus++;
              }
              //Country VALIDATION
              var country = data[key]['Country'];
              if (country != undefined) {

              } else {
                // alert("ADDRESS IS EMPTY AT "+keyValue);
                // errorStatus++;
              }
              //Origin VALIDATION
              var origin = data[key]['Origin'];
              if (origin != undefined) {

              } else {
                // alert("ADDRESS IS EMPTY AT "+keyValue);
                // errorStatus++;
              }



              console.log("KEY VALUE PAIR  name:", userName + "KEY :" + key);
              console.log("KEY VALUE PAIR Email Id :", emailId + "KEY :" + key);
              console.log("KEY VALUE PAIR contactNo :", mobileNo + "KEY :" + key);
              console.log("KEY VALUE PAIR software :", software + "KEY :" + key);
              console.log("KEY VALUE PAIR hardware :", hardware + "KEY :" + key);
              console.log("KEY VALUE PAIR city :", city + "KEY :" + key);
              console.log("KEY VALUE PAIR country :", country + "KEY :" + key);

              console.log("KEY VALUE PAIR origin:", origin + "KEY :" + key);
           //   console.log("KEY VALUE PAIR date:", date + "KEY :" + key);


            }

            alert("ERROR STATUS VALUE :"+errorStatus);
            if (errorStatus == 0) {
              //PROCEED WITH UPLOAD ENABLE THE SUBMIT BUTTON
              console.log("ErrorStatus Value success:", errorStatus)
              $("#submit").prop("disabled", false);

            } else {
              //SHOW THE ERROR VALIDATION PAGE
              console.log("ErrorStatus Value fail:", errorStatus)
              ReactDOM.render(
                <Router>
                  <div>

                    <Route path="/" component={() => <ChatBotExcelValidationMessage errorData={errorMessageArray} />} />

                  </div>
                </Router>,
                document.getElementById('contentRender'));


            }


          } else {


            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'An Empty File cannot be Uploaded',
              showConfirmButton: false,
              timer: 2000
            })

          }



        };
        reader.readAsArrayBuffer(f);
      }


    }
    this.SelectAll();

    $('#btnAdd').click(function (e) {
      var selectedOpts = $('#MasterSelectBox option:selected');
      var i = testarray.length;

      if (selectedOpts.length == 0) {
        e.preventDefault();
        var len = $('#MasterSelectBox').children('option').length;
        if (len == 0) {
          confirmAlert({
            title: ' Error',                        // Title dialog
            message: 'No Recipients to Add',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
          });
        } else {

          confirmAlert({
            title: ' Error',                        // Title dialog
            message: 'Please Select Recipients to Add',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
          });
        }
      }

      $('#PairedSelectBox').append($(selectedOpts).clone())

      var selectedData = "";
      var flag = "false";
      $('#MasterSelectBox option:selected').each(function () {
        $(this).attr('selected', 'selected');
        selectedData = $(this).val();
        testarray.push(selectedData);


        for (var k = 0; k < inputarray.length; k++) {
          var temp = JSON.parse(inputarray[k]);

          console.log("emailArray add" + JSON.stringify(temp));
          if (temp.id == selectedData) {
            emailArrary.push(temp.emailId);
          }
        }


      });
      console.log("emailArray" + emailArrary);
      console.log("empIdArray" + testarray);

      $(selectedOpts).remove();
      e.preventDefault();
    });


    $('#btnRemove').click(function (e) {
      var selectedOpts = $('#PairedSelectBox option:selected');
      if (selectedOpts.length == 0) {
        e.preventDefault();
        var len = $('#PairedSelectBox').children('option').length;
        if (len == 0) {
          confirmAlert({
            title: ' Error',                        // Title dialog
            message: 'No Recipients to Remove',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
          });
        } else {
          confirmAlert({
            title: ' Error',                        // Title dialog
            message: 'Please Select Recipients to Remove',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
          });
        }
      }

      $('#MasterSelectBox').append($(selectedOpts).clone());


      var selectedData = "";
      $('#PairedSelectBox option:selected').each(function () {
        $(this).attr('selected', 'selected');
        selectedData = $(this).val();
        for (var i = testarray.length - 1; i >= 0; i--) {
          if (testarray[i] == selectedData) {
            testarray.splice(i, 1);
            emailArrary.splice(i, 1);

          }
        }
      });

      console.log("emailArray" + emailArrary);
      console.log("empIdArray" + testarray);

      $(selectedOpts).remove();
      e.preventDefault();
    });


    $('#btnAddAll').click(function (e) {

      var selectedOpts = $('#MasterSelectBox option');
      if (selectedOpts.length == 0) {
        e.preventDefault();
        confirmAlert({
          title: ' Error',                        // Title dialog
          message: 'No Recipients to Add',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
        });
      }

      $('#PairedSelectBox').append($(selectedOpts).clone());

      var selectedData = "";
      //    console.log("bef", testarray);
      $('#MasterSelectBox option').each(function () {
        $(this).attr('selected', 'selected');
        selectedData = $(this).val();
        testarray.push(selectedData);
        // console.log("aft",testarray);
        // alert("hi" + testarray);
        for (var k = 0; k < inputarray.length; k++) {
          // console.log("inp", inputarray);
          var temp = JSON.parse(inputarray[k]);
          console.log("inpy addall", JSON.stringify(temp));
          if (temp.id == selectedData) {
            emailArrary.push(temp.emailId);
            console.log("emailArray" + emailArrary);
            console.log("empIdArray" + testarray);

          }
        }
      });
      $("#seperateddata").append(selectedData);
      console.log("emailArray" + emailArrary);
      console.log("empIdArray" + testarray);

      $(selectedOpts).remove();
      e.preventDefault();


    });


    $('#btnRemoveAll').click(function (e) {
      var selectedOpts = $('#PairedSelectBox option');
      if (selectedOpts.length == 0) {
        e.preventDefault();
        confirmAlert({
          title: ' Error',                        // Title dialog
          message: 'No Recipients to Remove',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
        });
      }
      // inputarray = [];
      $('#MasterSelectBox').append($(selectedOpts).clone());
      var selectedData = "";
      testarray.splice(0, testarray.length);
      emailArrary.splice(0, emailArrary.length);
      console.log("emailArray" + emailArrary);
      console.log("empIdArray" + testarray);

      $(selectedOpts).remove();
      e.preventDefault();
    });
    window.scrollTo(0, 0);

  }


      Submit(e) {
         // var password = CryptoJS.AES.decrypt(localStorage.getItem('Password'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
         // password=CryptoJS.AES.decrypt(password, "ShinchanThroughAppsShinchanThroughApps").toString(CryptoJS.enc.Utf8);
         // if(password==this.state.authPassword){
          this.SentEmail();
  //         var self = this;

  //         if (testarray.length != 0) {

  //             if (this.state.message != "" ) {
  //             console.log("file valid",this.state.file ); 
  //                 if(this.state.file != ""){
  //                     if(this.state.message==""){
  //                        this.state.message="Image Sent";
  //                     }
  //             console.log("file valid",this.state.file != "" );

  //         var form = document.getElementById("file-upload").files[0];
  //         console.log("Form", form);
  //         var formData = new FormData();
  //         formData.append("formData", form);
  //         console.warn("formdata", formData);
  //         var xhr = new XMLHttpRequest();
  //         xhr.open(
  //           "POST",
  //           "https://wildfly.tictoks.in:443/EmployeeAttendenceAPI/ChatBot/UploadFile"
  //         );
  //         //xhr.setRequestHeader("Cache-Control", "no-cache");
  //         //xhr.setRequestHeader("Postman-Token", "1599c58c-a146-3f42-3514-55bf0e52b273");
  //        e.preventDefault();
  //         xhr.withCredentials = false;
  //         xhr.send(formData);
  //         xhr.onreadystatechange = function() {//Call a function when the state changes.
  //             e.preventDefault();    
  //             if (xhr.readyState== 4) {
  //                     if (xhr.status== 200) {
  //                      /*  alert("Error 1");
  //                       alert(xhr.responseText); */
  //                     }
  //                /*  alert(xhr.responseText);
  //                 */ self.SentEmail();

  //         }else{
  //          console.log(" Error sending mail with image. ",this.responseText);
  //         /*  confirmAlert({
  //              title: ' Error', // Title dialog
  //              message: 'Error sending mail with image.', // Message dialog
  //              confirmLabel: 'Ok', // Text button confirm
  //          });
  //       */
  //        }
  //      }
  //      /*    xhr.addEventListener("readystatechange", function() {
  //           if (this.readyState== 4) {
  //             console.log(" Response ",this.responseText);
  //             self.SentEmail();

  //            }else{
  //             console.log(" Error sending mail with image. ",this.responseText);
  //             confirmAlert({
  //                 title: ' Error', // Title dialog
  //                 message: 'Error sending mail with image.', // Message dialog
  //                 confirmLabel: 'Ok', // Text button confirm
  //             });

  //           }
  //         }); */

  //     }else{
  //         //Sending Chat bot data without image
  //         self.SentEmail(); 
  //     }

  //     } else {
  //         confirmAlert({
  //             title: ' Error', // Title dialog
  //             message: 'Please Enter your message', // Message dialog
  //             confirmLabel: 'Ok', // Text button confirm


  //         });
  //     }
  // } else {
  //     confirmAlert({
  //         title: ' Error', // Title dialog
  //         message: 'Missing Mail Recipients, Kindly Add Recipients to proceed', // Message dialog
  //         confirmLabel: 'Ok', // Text button confirm

  //     });

  // }
  // }else{
  // confirmAlert({
  //     title: 'Authentication Failed', // Title dialog
  //     message: 'Password Incorrect Try Again ', // Message dialog
  //     confirmLabel: 'Ok', // Text button confirm


  // });

  // }
        }


  SentEmail() {
    var self = this;

    //   var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var companyId = '094';
    this.state.companyId = companyId;
    this.state.employeeId = testarray.toString();
    this.state.mailIdList = emailArrary.toString();
    this.setState({
      companyId: this.state.companyId,
      employeeId: this.state.employeeId.toString(),
      mailIdList: this.state.mailIdList,
    });

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,
        sendTo: this.state.mailIdList,
        employeeId: this.state.employeeId.toString(),
        superiorId: this.state.superiorId,
        message: this.state.message,
        fileName: this.state.fileName,
      }),
      //url: "http://15.206.129.105:8080/EmployeeAttendenceAPI/ChatBot/SendChatBotMail",
      //   url: "https://wildfly.tictoks.in:443/EmployeeAttendenceAPI/ChatBot/SendChatBotMail",

      url: " http://15.206.129.105:8080/MerchandiseAPI/ChatBot/SendChatBotMail",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        $("#PairedSelectBox").empty();
        testarray = [];
        emailArrary = [];
        inputarray = [];
        self.state.message = "";
        self.state.file = "";
        self.state.fileName = "";
        $("#file").val("");
        self.SelectAll();
        confirmAlert({
          title: 'Success', // Title dialog
          message: 'Message Sent Successfully. ', // Message dialog
          confirmLabel: 'Ok', // Text button confirm


        });

      },
      error: function (data) {
        confirmAlert({
          title: 'No Internet',                        // Title dialog
          message: 'Network Connection Problem',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
        });
      }

    });

  }
  handleFile(e) {
    let file = e.target.files[0];
    this.state.file = file;
    this.setState({
      file: file,
      fileName: file.name,
    });
    if (this.state.file != "") {
      var bytes = this.state.file.size;
      console.log("Size ", bytes);
      var size = 0;
      //  event.preventDefault();
      if (bytes < 1048576) {
        console.log("Size in kb", (bytes / 1024).toFixed(3));
        size = (bytes / 1024).toFixed(3);
      }
      if (size > 0 && size <= 500) {
      } else {
        //  event.preventDefault();
        confirmAlert({
          title: "Error", // Title dialog
          message: "File Size is Too Large Can't Upload ", // Message dialog
          confirmLabel: "Ok" // Text button confirm
        });
        this.state.file = "";
        this.state.fileName = "";
        $("#file").val("");
      }
    } else {
      confirmAlert({
        title: "Error", // Title dialog
        message: "Kindly Upload Image. ", // Message dialog
        confirmLabel: "Ok" // Text button confirm
      });
    }
    console.log("file name", file.name);

  }
  ChatBotExportDownloadFunc() {



    // var companyId = CryptoJS.AES.decrypt(
    //     localStorage.getItem("CompanyId"),
    //     "shinchanbaby"
    //   ).toString(CryptoJS.enc.Utf8);

    var companyId = '094';
    this.state.companyId = companyId;
    var today = new Date();
    var today1 =
      today.getFullYear() +
      "_" +
      (today.getMonth() + 1) +
      "_" +
      today.getDate();

    var totalName =
      companyId +
      "_" +
      today.getHours() +
      "_" +
      today.getMinutes() +
      "_" +
      today.getSeconds() +
      "_" +
      today1 + "ChatBot" +
      ".xlsx";

    this.state.chatBotFileName = totalName;


    this.setState({
      chatBotFileName: this.state.chatBotFileName,
      companyId: this.state.companyId
    });

    $.ajax({
      type: "POST",
      data: JSON.stringify({
        chatBotFileName: this.state.chatBotFileName,
        companyId: this.state.companyId
      }),


      //   url: " http://15.206.129.105:8080/MerchandiseAPI/Excel/ExportVendorFile",

      url: " http://15.206.129.105:8080/MerchandiseAPI/ChatBot/ExportChatBotFile",
      contentType: "application/json",
      dataType: "json",
      async: false,
      success: function (data, textStatus, jqXHR) {

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "The File Requested For Import Is Downloaded Successfully", // Message dialog
          showConfirmButton: false,
          timer: 2000
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
      }
    });
  }
  CustomerImportFunc() {

    $("#customerimportarea").show();


    this.GetCustomerFileName();
  }
  GetCustomerFileName() {

    // var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    var companyId = '094';
    oldChatBotFileNames = "";
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: companyId,

      }),


      url: " http://15.206.129.105:8080/MerchandiseAPI/ChatBot/GetChatBotFileName",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        console.log(data.chatBotFileName);
        oldChatBotFileNames = data.chatBotFileName;

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
  ChatBotUpload() {

    var chatBotFileArray = oldChatBotFileNames.split(",");
    console.log("FILE ARRAY", chatBotFileArray);
    console.log("UPLOADED FILE NAME :", name);



    var chatBotFileNameStatus = _.contains(chatBotFileArray, name);
    var length = chatBotFileArray.length;

    if (chatBotFileNameStatus == true) {


      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'File Upload will be Done Shortly',
        showConfirmButton: false,
        timer: 2000
      })


      // var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
      //console.log("INSIDE UPLOAD FUNCTION");
      //console.log("RESULT DATA : " +JSON.stringify(result));
      var companyId = '094';
      var resultData = JSON.stringify(result);
      this.state.result1 = resultData.toString();

      var self = this;

      $.ajax({


        type: 'POST',
        data: JSON.stringify({
          companyId: companyId,
          // companyId:"001",
          testlist: result
        }),

        url: " http://15.206.129.105:8080/MerchandiseAPI/ChatBot/UploadChatBotData",
        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {
          console.log(data);
          // self.increaseBar("100");


          if (data.returnXl.length != 0) {
            ReactDOM.render(
              <Router>
                <div>

                  <Route path="/" component={() => <ChatBotExcelImportResponse data={data} />} />


                </div>
              </Router>,
              document.getElementById('contentRender'));
            registerServiceWorker();
          } else {

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Your File Has Been Uploaded Successfully',
              showConfirmButton: false,
              timer: 2000
            })

           // self.componentDidMount()




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





    } else {

      Swal.fire({
        position: 'center',
        icon: 'error',
        title: "You Have Uploaded An Invalid File Please Upload A Valid File ",
        showConfirmButton: false,
        timer: 2000
      })
    }


  }


  render() {


    return (

      <div class="container" style={{ marginBottom: "0%", paddingTop: "0px" }}>

        {/*       <ul class="previous disabled" id="backbutton"
                    style={{
                        backgroundColor: "#f1b6bf",
                        float: "none",
                        display: "inline-block",
                        marginLeft: "5px",
                        borderRadius: "5px",
                        padding: "3px 7px 3px 7px"
                    }}>
                    <a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i></a></ul>
 */}

        <h4 className="centerAlign" style={{ textAlign: "center" }}>Email Message</h4>

        {/*                 <div id='horMenu'>
                    <ul>
                        <li><a className="active col-sm-6 col-xs-12 col-lg-6" onClick={() => this.EmailAlert()}><span className="glyphicon glyphicon-envelope">Email</span></a></li>
                        <li><a className="col-sm-6 col-xs-12 col-lg-6" onClick={() => this.MessageAlert()}><span className="glyphicon glyphicon-th-large">SMS
 </span></a></li>
                    </ul>
                </div> */}
        <form style={{ paddingBottom: '20px', position: 'inline-block' }}>
          <div class="row">
            <div class="col-lg-6 col-md-6 col-xs-6">

            </div>
            <div class="col-lg-3 col-md-3 col-xs-3">
              <a
                href="ChatBotExport.xlsx"

                download={this.state.chatBotFileName}
                onClick={() => this.ChatBotExportDownloadFunc()}
              //  style={{ backgroundColor: "#677785", color: "white" }}
              >  <span style={{ fontSize: "20px" }}
                class="glyphicon glyphicon-download"

              >
                  <span style={{ paddingLeft: "10px", fontSize: "14px" }}>Export</span></span>
              </a>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-3">

              <a href="#" onClick={() => this.CustomerImportFunc()}  >
                <span style={{ fontSize: "20px" }} class="glyphicon glyphicon-import">
                  <span style={{ paddingLeft: "10px", fontSize: "14px" }}>Import</span>
                </span> &nbsp;</a>

              <div id="customerimportarea" >

                <div >
                  <input type="file" id="chatBotfiles" name="files" />
                  <br />
                  <button type="button" id="submit" onClick={() => this.ChatBotUpload()} className="btn btn-primary" style={{ marginLeft: "20px", marginLeft: "auto", marginRight: "auto", marginBottom: "45px", marginTop: "20px", display: "block" }}>Submit</button>


                </div>


              </div>

            </div>
          </div>
          <div class="row">
            <div class="col-sm-3" >
              <div className="col-xs-12 col-sm-12 col-lg-12" style={{ marginBottom: "10px" }} >
                <label>
                  Country</label>
                <select
                  id="country"
                  className="form-control country"
                  onChange={this.handleUserInput}

                  name="country"
                  style={{ marginBottom: "0px" }}
                >
                  <option value="" disabled selected hidden>Select Country</option>
                </select>


              </div>


            </div>
            <div class="col-sm-3" >
              <div className="col-xs-12 col-sm-12 col-lg-12" style={{ marginBottom: "10px" }} >
                <label>
                  Origin</label>
                <select
                  id="origin"
                  className="form-control origin"
                  onChange={this.handleUserInput}

                  name="origin"
                  style={{ marginBottom: "0px" }}
                >
                  <option value="" disabled selected hidden>Select Origin</option>
                </select>


              </div>


            </div>
            <div class="col-sm-3" style={{ marginBottom: "10px" }}>
              <div className="col-xs-12 col-sm-12 col-lg-12">
                <label>
                  Product</label>
                <select
                  id="product"
                  className="form-control product"
                  onChange={this.handleUserInput}
                  name="product"
                  style={{ marginBottom: "0px" }}
                >
                  <option value="" disabled selected hidden>Select Product</option>
                  <option value="Tictoks" >Tictoks</option>
                  <option value="Through Books" >Through Books</option>
                  <option value="Digital Print App" >Digital Print App</option>
                  <option value="School Management System" >School Management System</option>
                  <option value="Tictoks,Through Books,Digital Print App,School Management System" >All</option>
                </select>
              </div></div>

            <div class="col-sm-3">
              <div className="col-xs-12 col-sm-12 col-lg-12" style={{ marginTop: "10px", marginBottom: "10px" }}>
                <label>
                  Hardware  </label>

                <select
                  id="hardware"
                  className="form-control hardware"
                  onChange={this.handleUserInput}
                  name="hardware"
                  style={{ marginBottom: "0px" }}
                >
                  <option value="Wireless Bio-metric,Wireless RFID,no" >All</option>
                  <option value="Wireless Bio-metric">Wireless Bio-metric</option>
                  <option value="Wireless RFID">Wireless RFID</option>
                  <option value="no">No</option>
                </select>

              </div>
            </div>


          </div>


          {/* <div id="divResult"></div>
 <label for="MasterSelectBox">Employee Details:</label>
 <div class="row">

 <div >
 <select style={{ height: "100px" }} id="MasterSelectBox" multiple>
 </select>
 </div>



 </div> */} <div id="divResult"></div>

          <div class="row">
            <div class="col-sm-5">
              <select
                className="selectTextfield"
                style={{ height: "100px" }} id="MasterSelectBox" multiple >
              </select>
            </div>

            <div class="col-sm-2" style={{ marginTop: "5px", textAlign: "center" }}>
              <button id="btnAdd" style={{ width: "95px", marginBottom: "10px" }} value=">">Add</button><br />
              <button id="btnAddAll" style={{ width: "95px", marginBottom: "10px" }} value="<">Add All</button><br />
              <button id="btnRemoveAll" style={{ width: "95px", marginBottom: "10px" }} value="<">RemoveAll</button><br />
              <button id="btnRemove" style={{ width: "95px", marginBottom: "10px" }} value="<">Remove</button>
            </div>


            <div class="col-sm-5" id="object">
              <select
                className="selectTextfield"

                style={{ height: "100px", marginLeft: "0px" }} id="PairedSelectBox" multiple>
              </select>
            </div>
          </div>
          <br />


          <label for="comment">Message Content:</label>
          <textarea
            className="textfield"
            onChange={this.handleUserInputMsg}
            name="message"
            placeholder="Your message.."
            value={this.state.message}
            required style={{ height: '200px' }}
            class="form-control"
            rows="5" id="message"
          ></textarea>
          <label
            for="file-upload"
            class="custom-file-upload"
            style={{
              border: "1px solid #ccc",
              display: "inline-block",
              padding: " 6px 12px",
              cursor: "pointer",
              float: "left",
            }}
          >
            Upload Image
              </label>
          <br />
          <input id="file-upload" onChange={(e) => this.handleFile(e)} accept="image/*" type="file" style={{ display: "none" }} />{this.state.fileName}
          <br />
          <br />
          {/*  <button type="button"
                        onClick={() => this.Submit()}
                        className="btn btn-primary"
                        style={{
                            marginLeft: "20px",
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginBottom: "45px",
                            marginTop: "20px",
                            display: "block"
                        }}>
                        Submit</button>
 */}

          <button type="button"
            class="btn btn-primary"
            style={{
              marginLeft: "20px",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "45px",
              marginTop: "20px",
              display: "block"
            }}
            data-toggle="modal" data-target="#myModal">
            Submit
            </button>
          <div class="modal fade" id="myModal">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Authentication</h4>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <div class="modal-body" style={{ display: "grid" }}>

                  <label for="firstName">
                    Enter Password*
                     </label>

                  {/*  <div>
                           <input type="text"
                            onChange={this.handleUserInput}
                            id="firstName"
                            name="firstName"
                            placeholder="*************"
                            value={this.state.firstName}
                            required /><span  class="glyphicon glyphicon-eye-close" ></span>
                           
                    </div> */}

                  {/*            <input id="password-field" placeholder="*************" type="password" class="form-control" name="password"  value="{this.state.password}" />
              <span style={divStyle} toggle="#password-field" class="glyphicon glyphicon-eye-close toggle-password"></span>
         */}
                  <input type="password"
                    className="textfield"
                    onChange={this.handleUserInput}
                    value={this.state.authPassword}
                    id="authPassword"
                    name="authPassword"
                    placeholder="Enter the Password.." required />


                  <input type="checkbox" onClick={() => this.myFunction()} />Show Password

        </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" onClick={(e) => this.Submit(e)}/* {() => this.Submit()} */
                    data-dismiss="modal">Submit</button>

                  <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                </div>

              </div>
            </div>
          </div>

          {/* 
                    <div class="row">
                         <div class="col-sm-4">

                            <div className="col-xs-12 col-sm-12 col-lg-12">
                                <button
                                    type="button"
                                   

                                    class="btn btn-success">Submit</button>

                            </div>
                        </div>

                    </div> */}
        </form>


      </div>





    );
  }

}
export default ChatBotCommunication;







