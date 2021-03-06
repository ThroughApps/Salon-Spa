import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';


//import './d.css';
import './LandingPage_tasalooncss.css';
import t_l1 from './image/dpalogo1.png';
import s1_desktop from './image/desktop.jpg';
import t_l2 from './image/dpalogo2.png';

/* sec4_1 */
import sec1_1 from './image/nodemcucover.png';

import sec4_1 from './image/register35.png';
import sec4_2 from './image/toggles.png';
import sec4_3 from './image/trophy.png';

import LoginPage from '../LoginPage';
import '../LoginPage.css';

//faeures icons
import f1 from './image/features/management.png';
import f2 from './image/features/marketing.png';
import f3 from './image/features/rewards1.png';
import f4 from './image/features/calender.png';
import f5 from './image/features/inventory.png';
import f6 from './image/features/research.png';
import f7 from './image/features/support.png';
import f8 from './image/features/emailsms.png';
import f9 from './image/features/adminc.png';
import f10 from './image/features/invoice.png';
import f11 from './image/features/empset.png';
import f12 from './image/features/reports.png';


import slide_1 from './image/sections/secinventorymix1.png';
//import slide_2 from './image/sections/textemail.png';
import slide_2 from './image/sections/textemail.png';
import slide_3 from './image/sections/reportschedule.png';
import CustomerAppointments from '../CustomerAppointments';


class LandingPage_tasaloon extends Component {
    constructor() {
        super();
        this.state = {
            emailId: "",
            name: "",
            comments: "",
            password: "",
            date: "",
            formErrors: { emailId: "", password: "" },
            emailIdValid: false,
            passwordValid: false
        };
    }

    handleUserInput = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    };

    /*  Fpassword() {
       ReactDOM.render(<ForgotPassword />, document.getElementById("root"));
     } */

    /*  LoginBtn() {
         ReactDOM.render(<LoginPage />, document.getElementById("root"));
     } */

    componentDidMount() {
        // The function toggles more (hidden) text when the user clicks on "Read more".
        //The IF ELSE statement ensures that the text 'read more' and 'read less' changes
        //interchangeably when clicked on.


        /*  SignUpFunc() {
           ReactDOM.render(<SiteRegister />, document.getElementById("root"));
         } */

    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
        );
    }

    login(){

        ReactDOM.render(
            <Router>
                <div >	
                    <Route exact path="/" component={LoginPage} />
                  
                    </div>
            </Router>, document.getElementById('root'));
    }

    Appointment(){

        ReactDOM.render(
            <Router>
                <div >	
                    <Route exact path="/" component={CustomerAppointments} />
                  
                    </div>
            </Router>, document.getElementById('root'));
    }
    Submit() {
        var self = this;
        if (this.state.name.trim().length > 0 && this.state.emailId.trim().length > 0 && this.state.comments.trim().length > 0) {
            $.ajax({
                type: "POST",
                data: JSON.stringify({
                    emailId: this.state.emailId,
                    userName: this.state.name,
                    comments: this.state.comments
                }),
                //url:"http://15.206.129.105:8080/EmployeeAttendenceAPI/ContactPageMail/ContactPage",
                url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/ContactPageMail/ContactPage",
                contentType: "application/json",
                dataType: "json",
                async: false,
                success: function (data, textStatus, jqXHR) {
                    confirmAlert({
                        title: "Success", // Title dialog
                        message: "Message Sent Successfully. ", // Message dialog
                        confirmLabel: "Ok" // Text button confirm
                    });
                    self.state.emailId = "";
                    self.state.name = "";
                    self.state.comments = "";
                },

                error: function (data) {
                    confirmAlert({
                        title: "Error", // Title dialog
                        message: "Try Again Later", // Message dialog
                        confirmLabel: "Ok" // Text button confirm
                    });
                }
            });
        } else {
            confirmAlert({
                title: "Error", // Title dialog
                message: "Enter all the Fields", // Message dialog
                confirmLabel: "Ok" // Text button confirm /* col-xs-12 col-md-3 col-lg-3 ++++ col-xs-12 col-md-9 col-lg-9 */
            });
        }
    }
    render() {
        return (

            <div class="landingpage">

                <div className="body_menu" id="myPage" data-spy="scroll" data-target="#myScrollspy" data-offset="60">

                    <div class="row" /* style={{ backgroundColor: "red" }} */>
                        <div className="col-sm-0 col-xs-0 col-md-1 col-lg-1 navbar_lg_screens" style={{ backgroundColor: "#121d30" }}>
                           {/*  <img src={t_l1} className="tasalon_logo" /> */}
                            <nav class="circle" id="myScrollspy" >
                                <ul class="nav nav-pills nav-stacked nav_vert">
                                      <li><img src={t_l1} className="tasalon_logo" /></li> 
                                    <li class=""><a href="#section1"><i class="fa fa-home  fa_icon "></i><p className="menu_text ">HOME</p></a></li>
                                    <li><a href="#section2" class=""><i class="fa fa-th-large  fa_icon"></i><p className="menu_text">FEATURES</p></a></li>
                                    <li><a href="#section3" class=""><i class="fa fa-building  fa_icon"></i><p className="menu_text">ABOUT</p></a></li>
                                    <li><a href="#section3" class=""><i class="fa fa-bookmark  fa_icon"></i><p className="menu_text">TESTIMONIAL</p></a></li>
                                    <li><a href="#section4" class=""><i class="fa fa-envelope  fa_icon"></i><p className="menu_text">CONTACT</p></a></li>
                                    {/* <li><a href="#contact" class=""><i class="fa fa-envelope fa-3x w3-xxlarge"></i>
                    <p>CONTACT</p>
                  </a></li> */}
                                </ul>
                            </nav>

                        </div>
                        <nav class="navbar navbar_mobile" id="myScrollspy" style={{ /* backgroundColor: "blue" */ }}>
                            <ul class="nav nav-stacked">
                                <li class="active"><a href="#section1">Section 1</a></li>
                                <li><a href="#section2">Section 2</a></li>
                                <li><a href="#section3">Section 3</a></li>
                                <li><a href="#section4">Section 4</a></li>
                            </ul>
                        </nav>


                        <div class="col-sm-12 col-xs-12 col-md-11 col-lg-11 dis_content" style={{ backgroundColor: "" }}>

                            <div>
                                <section className="banner_bg">
                                    <div class="header-cta">
      
                                        <button type="button" data-modal="book-demo" class="modal-trigger button1 button-primary">
                                            Book For a Demo
                                          </button>
                                          <button type="button" onClick={()=> this.Appointment()} style={{marginRight:"0px"}} class="modal-trigger button3 button-primary ">
                                           Appointment
                                          </button>
                                        <button type="button" onClick={()=> this.login()} class="modal-trigger button2">
                                            Login
                                                 </button>

                                    </div>
                                </section>
                            </div>


                            <div className="container-fluid" style={{ marginTop: "50px" }} className="sec_1_cont" id="section1">
                                <section className="sect_1">
                                    <div className="row">
                                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
                                            <div className="sect_parag shape" id="">
                                                <h1 class="text-purple text_base">Organized, Simple, Quick
                                        <p className="text_base_p"> Salon & Spa Businesses</p></h1>
                                                <h2 class="text-purple_tagline">Committed for better future,</h2>
                                                <h2 class="text-purple_tagline">committed for better freedom</h2>
                                                {/*   <div class="text-purple"><p>Closed doors doesn’t have to mean a closed till. Keep revenue coming in until your salon is ready to reopen with online gift vouchers.</p>
                                                                   </div> */}

                                                <button type="button" data-modal="book-demo" class="button_sect1">
                                                    Free Trial
          </button>


                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                            <img src={s1_desktop} className="s1_img" />
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <div>
                                <section>
                                    <div class="container-fluid sec1_3">
                                        <h1 class="sec1_3h1">Salon &amp; Spa professionals trust </h1>
                                        <img src={t_l2} className="tasalon_logo_sec1_3" />
                                    </div>
                                </section>
                                <hr class="new5"></hr>

                            </div>
                            <div id="section2">
                                <section>
                                    <div class=" container-fluid feat_container">
                                        <div class="row">
                                            <div class="column col_sec1_3">
                                                <div class="card">
                                                    <img src={f1} className="feat_image" />
                                                    <h3 className="feat_title">Salon Management</h3>
                                                    <h3 className="feat_title_head">No More Admins</h3>
                                                    <p className="feat_title_para">because lorem ipsum consectetur adipiscing elit, sed do eiusmod tempor
                                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
           consequat.</p>
                                                </div>
                                            </div>

                                            <div class="column col_sec1_3">
                                                <div class="card">
                                                    <img src={f2} className="feat_image" />
                                                    <h3 className="feat_title">Salon Marketing Tools</h3>
                                                    <h3 className="feat_title_head">Own your brand</h3>
                                                    <p className="feat_title_para">because lorem ipsum consectetur adipiscing elit, sed do eiusmod tempor
                                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
           consequat.</p>
                                                </div>
                                            </div>

                                            <div class="column col_sec1_3">
                                                <div class="card">
                                                    <img src={f3} className="feat_image" />
                                                    <h3 className="feat_title">Rewards</h3>
                                                    <h3 className="feat_title_head">Expand Customer Devotion</h3>
                                                    <p className="feat_title_para">because lorem ipsum consectetur adipiscing elit, sed do eiusmod tempor
                                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
           consequat.</p>
                                                </div>
                                            </div>

                                            <div class="column col_sec1_3">
                                                <div class="card">
                                                    <img src={f4} className="feat_image" />
                                                    <h3 className="feat_title">Scheduling</h3>
                                                    <h3 className="feat_title_head">Get More Bookings</h3>
                                                    <p className="feat_title_para">because lorem ipsum consectetur adipiscing elit, sed do eiusmod tempor
                                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
           consequat.</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 
                                        <div class="row">
                                            <div class="column col_sec1_3">
                                                <div class="card">
                                                    <img src={f5} className="feat_image" />
                                                    <h3 className="feat_title">Inventory Management</h3>
                                                    <h3 className="feat_title_head">Staying Stocked, Not Overstocked</h3>
                                                    <p className="feat_title_para">because lorem ipsum consectetur adipiscing elit, sed do eiusmod tempor
                                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
           consequat.</p>
                                                </div>
                                            </div>

                                            <div class="column col_sec1_3">
                                                <div class="card">
                                                    <img src={f6} className="feat_image" />
                                                    <h3 className="feat_title">Research &amp; Analytics</h3>
                                                    <h3 className="feat_title_head">Serious Business Smarts</h3>
                                                    <p className="feat_title_para">because lorem ipsum consectetur adipiscing elit, sed do eiusmod tempor
                                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
           consequat.</p>
                                                </div>
                                            </div>

                                            <div class="column col_sec1_3">
                                                <div class="card">
                                                    <img src={f7} className="feat_image" />
                                                    <h3 className="feat_title">Support</h3>
                                                    <h3 className="feat_title_head">Above and beyond</h3>
                                                    <p className="feat_title_para">because lorem ipsum consectetur adipiscing elit, sed do eiusmod tempor
                                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
           consequat.</p>
                                                </div>
                                            </div>

                                            <div class="column col_sec1_3">
                                                <div class="card">
                                                    <img src={f8} className="feat_image" />
                                                    <h3 className="feat_title">Text &amp; Email</h3>
                                                    <h3 className="feat_title_head">No-Hassle Communications</h3>
                                                    <p className="feat_title_para">because lorem ipsum consectetur adipiscing elit, sed do eiusmod tempor
                                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
           consequat.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="column col_sec1_3">
                                                <div class="card">
                                                    <img src={f9} className="feat_image" />
                                                    <h3 className="feat_title">Admin Control</h3>
                                                    <h3 className="feat_title_head">Configure others View</h3>
                                                    <p className="feat_title_para">because lorem ipsum consectetur adipiscing elit, sed do eiusmod tempor
                                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
           consequat.</p>
                                                </div>
                                            </div>

                                            <div class="column col_sec1_3">
                                                <div class="card">
                                                    <img src={f10} className="feat_image" />
                                                    <h3 className="feat_title">Invoices</h3>
                                                    <h3 className="feat_title_head">Enjoy to Bill</h3>
                                                    <p className="feat_title_para">because lorem ipsum consectetur adipiscing elit, sed do eiusmod tempor
                                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
           consequat.</p>
                                                </div>
                                            </div>

                                            <div class="column col_sec1_3">
                                                <div class="card">
                                                    <img src={f11} className="feat_image" />
                                                    <h3 className="feat_title">Employee Attendance &amp; Management</h3>
                                                    <h3 className="feat_title_head">Improve Your Bussiness Area</h3>
                                                    <p className="feat_title_para">because lorem ipsum consectetur adipiscing elit, sed do eiusmod tempor
                                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
           consequat.</p>
                                                </div>
                                            </div>

                                            <div class="column col_sec1_3">
                                                <div class="card">
                                                    <img src={f12} className="feat_image" />
                                                    <h3 className="feat_title">Appointment Booking</h3>
                                                    <h3 className="feat_title_head">There’s Always More</h3>
                                                    <p className="feat_title_para">because lorem ipsum consectetur adipiscing elit, sed do eiusmod tempor
                                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
           consequat.</p>
                                                </div>
                                                 </div>
                                            </div>
                                             */}


                                    </div>
                                </section>


                                <div>
                                    <section>
                                        <div class="container sec1_4_cont">
                                            <div class="row">
                                                <div class="column-66">
                                                    <div className="sect_1_4_con">
                                                        <h3 className="feat_title_sec1_4">Inventory Management</h3>
                                                        <h3 className="feat_title_head_sec1_4">Staying Stocked, Not Overstocked</h3>
                                                        <p className="feat_title_para_sec1_4">because lorem ipsum consectetur adipiscing elit, sed do eiusmod tempor
                                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                                        consequat.</p>
                                                    </div>

                                                    <div className="sect_1_4_con">
                                                        <h3 className="feat_title_sec1_4">Research &amp; Analytics</h3>
                                                        <h3 className="feat_title_head_sec1_4">Serious Business Smarts</h3>
                                                        <p className="feat_title_para_sec1_4">because lorem ipsum consectetur adipiscing elit, sed do eiusmod tempor
                                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                                        consequat.</p>
                                                    </div>

                                                    <div className="sect_1_4_con">
                                                        <h3 className="feat_title_sec1_4">Support</h3>
                                                        <h3 className="feat_title_head_sec1_4">Above and beyond</h3>
                                                        <p className="feat_title_para_sec1_4">because lorem ipsum consectetur adipiscing elit, sed do eiusmod tempor
                                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                                        consequat.</p>
                                                    </div>

                                                </div>
                                                <div class="column-33">
                                                    <h1 class="xlarge-font"><b>Why buy it?</b></h1>
                                                    <h1 class="large-font" style={{ color: "MediumSeaGreen" }}><b> Everything you need to smoothly manage your salon.</b></h1>
                                                    <img className="img_sec1_4" src={slide_1} width="335" height="471" />
                                                </div>
                                            </div>
                                        </div>


                                        <div class="container sec1_4_cont" style={{ backgroundColor: "#f1f1f1" }}>
                                            <div class="row">
                                                <div class="column-33">
                                                    <h1 class="xlarge-font"><b>Clarity</b></h1>
                                                    <h1 class="large-font" style={{ color: "#41b0ab" }}><b> Get your clients back in more often, spending more & generating referrals!</b></h1>
                                                    <img className="img_sec1_4" src={slide_2} alt="App" width="335" height="471" />
                                                
                                           {/*      <svg id="prefix__Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.89 595.28">
    <defs>
        <style>
            </style>
    </defs>
    <path d="M622.62 406.36v9.14a10.61 10.61 0 01-10.36 10.78h-15.65a10.44 10.44 0 00-9.8-7.33h-92.35v2a11 11 0 01-1.38 5.34h103.53a10.84 10.84 0 01.55 3.45v9.14a10.61 10.61 0 01-10.36 10.78h-56.18v4.57a10.8 10.8 0 01-6.7 10.08h53.9a10.61 10.61 0 0110.36 10.78v9.14A10.61 10.61 0 01577.83 495h-235.6a10.61 10.61 0 01-10.36-10.78v-9.14a10.81 10.81 0 016.71-10.08h-53.92a10.61 10.61 0 01-10.36-10.78v-9.14a10.61 10.61 0 0110.36-10.78h56.18v-2.58H248.5a10.61 10.61 0 01-10.36-10.78v-9.14a10.94 10.94 0 014.17-8.63h-14a10.61 10.61 0 01-10.31-10.8v-9.14a10.61 10.61 0 0110.36-10.78H244a11.06 11.06 0 01-.54-3.44v-9.14a10.61 10.61 0 0110.36-10.78H310v-4.56a10.82 10.82 0 016.71-10.09h-53.92a10.61 10.61 0 01-10.36-10.78v-9.14a10.61 10.61 0 0110.36-10.78H498.4a10.61 10.61 0 0110.36 10.78v9.14a10.8 10.8 0 01-6.76 10.08h54a10.61 10.61 0 0110.36 10.78v9.14A10.61 10.61 0 01556 364.44h-56.22V367h92.34a10.61 10.61 0 0110.36 10.78v9.14a10.94 10.94 0 01-4.17 8.63h14a10.61 10.61 0 0110.31 10.81z" fill="#ededed"/>
    <path class="prefix__cls-2" d="M476.41 385.28v-53.6a8.33 8.33 0 00-8.34-8.34h-79a8.33 8.33 0 00-8.33 8.34v53.95"/>
    <path class="prefix__cls-3" d="M505.51 227.07s-5.24-19.53-1.24-21.68c15.13-8.15 41.6 25 24.6 31.77-21 8.31-20 2.16-20 2.16z"/>
    <path class="prefix__cls-4" d="M431.62 227.53s-2.31 43.45-2.31 50.19-5 10.94 5.68 10.94 69.66-1.05 75-1.05 5.62-54 3.73-60.07-12.47.9-19.62 2-62.48-2.01-62.48-2.01z"/>
    <path class="prefix__cls-5" d="M426.58 227.25l83.42 1-41.71 27.52-41.71-28.52z"/>
    <path class="prefix__cls-5" d="M427.54 232.09v53.35h83.41v-55.93l-41.7 27.53-41.71-24.95zM505.47 220.42a13.1 13.1 0 0113.1 13.1M505.47 208.19a25.34 25.34 0 0125.33 25.33M505.47 220.42a13.1 13.1 0 0113.1 13.1M505.47 213.44a20.08 20.08 0 0120.08 20.08"/>
    <text transform="translate(456.03 279.7)" style={{ fontSize:"35.83", fontFamily:"MyriadPro-Regular,Myriad Pro" ,fill:"#f6a039"}}>
        @
    </text>
    <path d="M397.53 259.06l7.81 18.35a4.94 4.94 0 005.17 3 3.51 3.51 0 002.5-1.52 4 4 0 00.29-3.79l-10.5-24.68a6.6 6.6 0 00-7.32-3.92 10.31 10.31 0 00-1.28.34 7.6 7.6 0 00-4.41 10.21L404 290.49a10.55 10.55 0 0010.53 6.51l.78-.09a9.87 9.87 0 007.52-13.66l-13.21-31M330.24 385.55l-15.22.38c-1.69 0-3.15 4-3.44 9.84a32 32 0 00.52 7.92c.63 3.07 1.67 4.75 2.69 4.72l20.47-.52c2.37-.06 4.3-6 4.58-14.33 0-1.15.06-2.35.06-3.59 0-12-3.05-22-6.4-21.87l-27.7.7c-3.46.09-6.42 7.93-7.2 19.75q-.07 1-.12 2.05c-.81 17 3.28 33.46 8.19 33.33l25.73-.65" style="stroke:#069999;stroke-width:4px;stroke-miterlimit:10;fill:none"/>
    <path d="M436.88 399.08l55.32-19.31a.91.91 0 011.21.86v72.71h-131v-72.72a.9.9 0 011.2-.86l56.64 19.43" fill="#fff" stroke-width="4" stroke-miterlimit="10" stroke="#123759"/>
    <path class="prefix__cls-2" d="M380.74 335.68h95.67"/>
    <rect class="prefix__cls-9" x="397.7" y="343.64" width="61.75" height="4.25" rx="2.12" ry="2.12"/>
    <rect class="prefix__cls-10" x="397.23" y="353.89" width="61.75" height="4.25" rx="2.12" ry="2.12"/>
    <rect class="prefix__cls-9" x="397.84" y="364.76" width="61.75" height="4.25" rx="2.12" ry="2.12"/>
    <rect class="prefix__cls-9" x="363.81" y="436.01" width="127.81" height="4.25" rx="2.12" ry="2.12"/>
    <rect class="prefix__cls-9" x="364.34" y="464.26" width="127.81" height="4.25" rx="2.12" ry="2.12"/>
    <rect class="prefix__cls-9" x="404.02" y="471.51" width="50.97" height="4.25" rx="2.12" ry="2.12"/>
    <rect class="prefix__cls-9" x="497.36" y="464.26" width="17.02" height="4.25" rx="2.12" ry="2.12"/>
    <rect class="prefix__cls-11" x="520.57" y="451.22" width="17.02" height="4.25" rx="2.12" ry="2.12"/>
    <rect class="prefix__cls-11" x="541.99" y="451.22" width="4.25" height="4.25" rx="2.12" ry="2.12"/>
    <rect class="prefix__cls-11" x="318.9" y="451.22" width="17.02" height="4.25" rx="2.12" ry="2.12"/>
    <rect class="prefix__cls-9" x="345.4" y="464.26" width="17.02" height="4.25" rx="2.12" ry="2.12"/>
    <rect x="339.02" y="451.22" width="178.46" height="4.25" rx="2.12" ry="2.12" fill="#0c3f3b" stroke-miterlimit="10" stroke="#123759"/>
    <rect class="prefix__cls-10" x="397.37" y="375.01" width="61.75" height="4.25" rx="2.12" ry="2.12"/>
    <path class="prefix__cls-2" d="M476.41 372.26l14.91 7.09a.39.39 0 010 .73l-14.87 5.19-39.53 13.81M380.74 371.18L365 379.53a.4.4 0 00.06.73l15.66 5.37 39.51 13.56"/>
    <circle class="prefix__cls-2" cx="428.57" cy="400.43" r="8.42"/>
    <path fill="#fff" d="M347.07 344.18l.25.83.68-.53-.29.82.87-.03-.71.49.71.49-.87-.02.29.81-.68-.53-.25.83-.24-.83-.69.53.3-.81-.87.02.71-.49-.71-.49.87.03-.3-.82.69.53.24-.83z"/>
    <path class="prefix__cls-9" d="M369.74 346.78l-5.31-2.45 4.2-4.07-5.74 1.14 1-5.76-4 4.29-2.57-5.25-.69 5.81-5.17-2.74 2.86 5.1-5.79.82 5.31 2.45-4.2 4.07 5.74-1.14-1 5.76 4-4.29 2.57 5.25.69-5.81 5.17 2.74-2.81-5.1zm-9.78 1l-.85 2.79-.79-2.81-2.32 1.75 1-2.74h-2.92l2.42-1.62-2.39-1.67 2.92.11-.95-2.76 2.29 1.8.85-2.79.79 2.81 2.33-1.75-1 2.74h2.92l-2.42 1.62 2.39 1.67-2.92-.11.95 2.76zM520.57 365.71L519 365l1.23-1.19-1.68.33.3-1.69-1.16 1.26-.75-1.54-.2 1.7-1.51-.8.84 1.49-1.7.24 1.55.72-1.23 1.19 1.68-.33-.3 1.69 1.16-1.26.75 1.54.2-1.7 1.51.8-.84-1.49zm-2.86.29l-.25.82-.23-.82-.68.51.29-.8H516l.71-.48-.7-.49h.85l-.28-.81.67.53.25-.82.23.82.68-.51-.29.8h.88l-.71.48.7.49h-.85l.28.81zM465.73 311.75l-3.08-1.42 2.44-2.36-3.33.66.59-3.34-2.35 2.49-1.49-3-.4 3.37-3-1.59 1.66 3-3.36.48 3.08 1.42-2.44 2.36 3.33-.66-.59 3.34 2.31-2.49 1.49 3 .4-3.37 3 1.59-1.66-3zm-5.68.58l-.5 1.62-.46-1.63-1.35 1 .58-1.59h-1.69l1.41-.94-1.39-1 1.69.07-.55-1.6 1.33 1 .5-1.62.46 1.63 1.35-1-.58 1.59h1.69l-1.41.94 1.39 1-1.69-.07.55 1.6zM509.37 326.09l-2-.92 1.58-1.52-2.15.43.38-2.16-1.49 1.61-1-2-.26 2.18-1.94-1 1.07 1.91-2.17.31 2 .92-1.58 1.52 2.15-.43-.38 2.16 1.49-1.61 1 2 .26-2.18 1.94 1-1.07-1.91zm-3.67.37l-.32 1-.3-1.05-.87.66.38-1h-1.09l.91-.61-.9-.63h1.09l-.36-1 .86.68.32-1 .3 1.05.87-.66-.38 1h1.09l-.91.61.9.63h-1.09l.36 1z"/>
    <circle cx="356.79" cy="314.49" r="5.09" stroke="#00a19a" stroke-width="4" stroke-miterlimit="10" fill="none"/>
    <circle cx="426.17" cy="306.86" r="2.54" stroke-width="2" stroke="#00a19a" stroke-miterlimit="10" fill="none"/>
    <path class="prefix__cls-16" d="M495.08 418s1.54-1.59 4.09-4.39"/>
    <path d="M507.29 404.3c5.35-6.34 11.8-14.43 17.91-23.29" stroke-dasharray="3.8 11.39 12.34 3.8" stroke="#29235c" stroke-width="2" stroke-miterlimit="10" fill="none"/>
    <path d="M526.28 379.45c13.2-19.45 24.44-42.21 19-58.09-10.2-30.79-31.28-26.49-39.05-20.2s-18.5 22.39-5 38.34 44.24 9.12 61.18-9.08c11.59-12.42 18.5-29.8 21.74-39.66" stroke-dasharray="11.39 12.34 3.8 11.39 12.34 3.8" stroke="#29235c" stroke-width="2" stroke-miterlimit="10" fill="none"/>
    <path class="prefix__cls-16" d="M584.74 288.92c1.12-3.57 1.64-5.77 1.64-5.77M436.52 337.64s-1.67-1.39-4.52-3.94"/>
    <path d="M422.17 324.61c-6.34-6.07-14.16-14-22.17-23" stroke-dasharray="4.12 12.37 13.4 4.12" stroke="#29235c" stroke-width="2" stroke-miterlimit="10" fill="none"/>
    <path d="M398.64 300.05c-23.57-27-48.1-63.64-40.65-93.44 12.19-50.1 42.43-50.27 53.93-43.18s27.93 28.18 9.92 56.76-62.12 28-87.52 5.65c-18.7-16.42-30.16-43.49-34.91-56.65" stroke-dasharray="12.37 13.4 4.12 12.37 13.4 4.12" stroke="#29235c" stroke-width="2" stroke-miterlimit="10" fill="none"/>
    <path class="prefix__cls-16" d="M298.72 167.26c-1.24-3.57-1.86-5.7-1.86-5.7"/>
    <path fill="#ec6568" d="M265.24 160.31l27-1.75 9.63 19.45 1.77-18.78 34.92 9.2 1.85-68.67-75.17 60.55z"/>
    <path fill="#ab2a30" d="M301.87 178.01l-9.63-19.45 48.17-58.8-36.77 59.47-1.77 18.78z"/>
    <path fill="#7f171b" d="M301.87 178.01l10.67-16.44-8.9-2.34-1.77 18.78z"/>
    <path class="prefix__cls-3" d="M254.25 237.17l32.71-27.42-11.22-15.52-3.62 15.5-16.41-7.47 3.18 18.47-16.27.35 11.63 16.09z"/>
    <path fill="#c66e14" d="M291.73 216.35l-32.71 27.43-4.77-6.61 32.71-27.42 4.77 6.6z"/>
    <path class="prefix__cls-4" d="M271.11 227.92a4.2 4.2 0 013.74-4.33c8.84-.57 31.43-1.67 46.73.7 19.39 3 33.28-6 39.11-2.07l4.11 2.79a4.4 4.4 0 011.87 3.39c.83 13.73 4.65 86.43-7.46 86.09-13.37-.37-87.44-2.62-88.1-7.86a18.06 18.06 0 010-6.74z"/>
    <path class="prefix__cls-5" d="M268.44 232.55h97.61v81.23h-97.61zM277.84 222.43h78.82a9.4 9.4 0 019.4 9.4v.72h-97.62v-.72a9.4 9.4 0 019.4-9.4zM273.12 244.36h16.23M273.12 249.06h16.23M273.12 253.76h16.23"/>
    <path class="prefix__cls-5" d="M347.18 297.15h8.9a11.92 11.92 0 01-10.61 6.92A12.19 12.19 0 01334 295h-36.4a8.36 8.36 0 01-15.14-.55h6.38v-8h-6.69a8.47 8.47 0 0116.25.55H334a12.19 12.19 0 0111.46-9.1 12.06 12.06 0 0111.09 8h-9.38z"/>
    <ellipse class="prefix__cls-3" cx="274.97" cy="227.96" rx="1.85" ry="2.01"/>
    <ellipse class="prefix__cls-3" cx="281.08" cy="227.96" rx="1.85" ry="2.01"/>
    <ellipse class="prefix__cls-3" cx="286.94" cy="227.96" rx="1.85" ry="2.01"/>
</svg>
 */}
                                               
                                                </div>
                                                <div class="column-66">
                                                    <div className="sect_1_4_con">
                                                        <h3 className="feat_title_sec1_4">Text &amp; Email</h3>
                                                        <h3 className="feat_title_head_sec1_4">No-Hassle Communications</h3>
                                                        <p className="feat_title_para_sec1_4">because lorem ipsum consectetur adipiscing elit, sed do eiusmod tempor
                                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                                        consequat.</p>
                                                    </div>

                                                    <div className="sect_1_4_con">
                                                        <h3 className="feat_title_sec1_4">Admin Control</h3>
                                                        <h3 className="feat_title_head_sec1_4">Configure others View</h3>
                                                        <p className="feat_title_para_sec1_4">because lorem ipsum consectetur adipiscing elit, sed do eiusmod tempor
                                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                                        consequat.</p>
                                                    </div>

                                                    <div className="sect_1_4_con">
                                                        <h3 className="feat_title_sec1_4">Invoices</h3>
                                                        <h3 className="feat_title_head_sec1_4">Enjoy to Bill</h3>
                                                        <p className="feat_title_para_sec1_4">because lorem ipsum consectetur adipiscing elit, sed do eiusmod tempor
                                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                                        consequat.</p>
                                                    </div>

                                                    <button class="button btn_sec1_4">Read More</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="container sec1_4_cont">
                                            <div class="row">
                                                <div class="column-66">
                                                    <div className="sect_1_4_con">
                                                        <h3 className="feat_title_sec1_4">Employee Attendance &amp; Management</h3>
                                                        <h3 className="feat_title_head_sec1_4">Staying Stocked, Not Overstocked</h3>
                                                        <p className="feat_title_para_sec1_4">because lorem ipsum consectetur adipiscing elit, sed do eiusmod tempor
                                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                                        consequat.</p>
                                                    </div>

                                                    <div className="sect_1_4_con">
                                                        <h3 className="feat_title_sec1_4">Reports</h3>
                                                        <h3 className="feat_title_head_sec1_4">Serious Business Smarts</h3>
                                                        <p className="feat_title_para_sec1_4">because lorem ipsum consectetur adipiscing elit, sed do eiusmod tempor
                                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                                        consequat.</p>
                                                    </div>

                                                    <div className="sect_1_4_con">
                                                        <h3 className="feat_title_sec1_4">Support</h3>
                                                        <h3 className="feat_title_head_sec1_4">Above and beyond</h3>
                                                        <p className="feat_title_para_sec1_4">because lorem ipsum consectetur adipiscing elit, sed do eiusmod tempor
                                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                                        consequat.</p>
                                                    </div>

                                                </div>
                                                <div class="column-33">
                                                    {/* <h1 class="xlarge-font"><b>Why buy it?</b></h1> */}
                                                    <h1 class="large-font" style={{ color: "#ec8507" }}>
                                                        <b>Your 24/7 salon receptionist, taking bookings day and night.</b>
                                                    </h1>


                                                    <img className="img_sec1_4" src={slide_3} width="335" height="471" />
                                                </div>
                                            </div>
                                        </div>


                                    </section>
                                </div>


                                <div id="section4">
                                    <section>

                                        <div className="container-fliud sect_contact" >
                                            <div style={{ textAlign: "center", padding: "30px" }}>
                                                <h1>Ready to try <span className="span_text" >TA Salon &amp; Spa Management</span>  for yourself?</h1>
                                                <button type="button" data-modal="book-demo" class="modal-trigger button1 button-primary">
                                                    Book For a Demo
                                          </button>
                                               {/*  <button type="button" data-modal="book-quote" class="modal-trigger button2">
                                                    Login
                                                 </button> */}
                                            </div>
                                            <hr class="new6"></hr>
                                        </div>
                                    
                                    <div className="container-fluid" style={{backgroundColor: "#cccccc"}}>
                                        <div className="row cont_row" >
                                            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                                            <h3 className="feat_title_sec1_5">ABOUT US</h3>
                                                        <p className="feat_title_para_sec1_5">because lorem ipsum consectetur adipiscing elit, sed do eiusmod tempor
                                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                                        consequat.</p>
                                                </div>

                                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                                                <h3 className="feat_title_sec1_5">OUR MISSION</h3>
                                                         <p className="feat_title_para_sec1_5">because lorem ipsum consectetur adipiscing elit, sed do eiusmod tempor
                                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                                        consequat.</p>
                                                </div>

                                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                                                <h3 className="feat_title_sec1_5">GET IN TOUCH</h3>
                                                         <p className="feat_title_para_sec1_5"> Contact Us and we'll get back within 24 hours</p>
                                                         <p className="feat_title_para_sec1_5"> Chennai, INDIA</p>
                                                         <p className="feat_title_para_sec1_5"> +91 90030 15420</p>
                                                         <p className="feat_title_para_sec1_5">  throughapps@gmail.com</p>
                     
                                                </div>

                                        </div>
                                        </div>


                                    </section>
                                </div>

                            </div>
                            {/*  <div id="section2">
                <h1>Section 2</h1>
                <p>Try to scroll this section and look at the navigation list while scrolling!</p>
              </div>
              <div id="section3">
                <h1>Section 3</h1>
                <p>Try to scroll this section and look at the navigation list while scrolling!</p>
              </div>
              <div id="section4">
                <h1>Section 4-1</h1>
                <p>Try to scroll this section and look at the navigation list while scrolling!</p>
              </div>
              <div id="section42">
                <h1>Section 4-2</h1>
                <p>Try to scroll this section and look at the navigation list while scrolling!</p>
              </div> */}
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}


export default LandingPage_tasaloon;
