import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import useravatar from './image/useravatar.png';
import $ from 'jquery';
//import logo from './image/talogoprogress1.png';
import logo from './image/tictokn.png';
import './CustomChatbotcss.css';


//https://github.com/LucasBassetti/react-simple-chatbot/blob/master/lib/ChatBot.jsx  -----Chatbot config details
function CustomChatbot(props) {
    var Content = "";
    var type = "";
    var hardware = "";
    var emailId = "";
    var trial = "";
    var userName = "";
    var mobileNo = "";
    var city = "";
    var country = "";
    var region = "";
    var openStatus = true;
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        openStatus = false;
    }
    const theme = {
        background: "white",
        fontFamily: "Arial, Helvetica, sans-serif",
        headerBgColor: "#2eb398",
        headerFontColor: "#fff",
        headerFontSize: "25px",
        botBubbleColor: "#2eb398",
        botFontColor: "#fff",
        userBubbleColor: "#fff",
        userFontColor: "#4c4c4c",

    };
    const config = {
        width: "300px",
        height: "400px",
        floating: true,
        opened: true,
    };
    const steps = [
        {
            id: "Greet",
            message: "Hi!, I am Emma Bot !!👋 ",
            trigger: "Welcome Text"
        }, {

            id: "Welcome Text",
            message: "We are excited  to welcome you to Through Apps!!",
            asMessage: true,
            trigger: "Ask Name"
        },
        {
            id: "Ask Name",
            message: "Can you please type your name?",
            asMessage: true,
            trigger: "Waiting user input for name"
        },
        {
            id: "Waiting user input for name",
            user: true,
            trigger: "Asking options to get Preference",
            validator: (value) => {
                if (value.length >= 2 && isNaN(value)) {
                    UserName(value);
                    GetLocation();
                    message(value);
                    return true;
                } else {
                    return "Enter Valid Name";
                }

            },

        },
        {
            id: "Asking options to get Preference",
            message: "Awesome {previousValue} !!, Please choose the software which you would like to sign up!",
            trigger: "Displaying options for Software"

        },
        {
            id: "Displaying options for Software",
            options: [
                {
                    value: "Through Books",
                    label: "Through Books",
                    trigger: () => {
                        SoftwareNeed("Through Books");
                        message("Looks for Through Books Software");
                        return "With or WithOut Hardware"
                    }
                },
                {
                    value: "Tictoks",
                    label: "Tictoks",
                    trigger: () => {
                        SoftwareNeed("Tictoks");
                        message("Looks for Tictoks Software");
                        return "With or WithOut Hardware"
                    }
                },
                {
                    value: "Digital Print App",
                    label: "Digital Print App",
                    trigger: () => {
                        SoftwareNeed("Digital Print App");
                        message("Looks for Digital Print App Software");
                        return "With or WithOut Hardware"
                    }
                },
                {
                    value: "School management System",
                    label: "School management System",
                    trigger: () => {
                        SoftwareNeed("School management System");
                        message("Looks for School management System Software");
                        return "With or WithOut Hardware"
                    }
                }
            ]
        },
        {
            id: "With or WithOut Hardware",
            message: "Great Choice! would you like to try our hardware ?",
            trigger: "Displaying options for Hardware"
        },
        {
            id: "Displaying options for Hardware",
            options: [
                {
                    value: "Wireless Bio-metric",
                    label: "Wireless Bio-metric",
                    trigger: () => {
                        Hardware("Wireless Bio-metric");
                        message("With Wireless Bio-metric hardware");
                        return "Ask Email Id"
                    }
                },
                {
                    value: "Wireless RFID",
                    label: "Wireless RFID",
                    trigger: () => {
                        Hardware("Wireless RFID");
                        message("With Wireless RFID hardware");
                        return "Ask Email Id"
                    }
                },
                {
                    value: "No",
                    label: "No",
                    trigger: () => {
                        Hardware("no");
                        message("Without hardware");
                        return "Ask Email Id"
                    }
                },

            ]
        },
        {
            id: "Ask Type of Organisation",
            message: "What Type Of Organisation ?",
            trigger: "Displaying options for Organisation"
        },

        {
            id: "Displaying options for Organisation",
            options: [
                {
                    value: "Educational",
                    label: "Educational",
                    trigger: () => {
                        SoftwareNeed("(Eductional)");
                        message("(Eductional)");
                        return "Ask for Attendance Hardware"
                    }
                },
                {
                    value: "Printers",
                    label: "Printers",
                    trigger: () => {
                        SoftwareNeed("(Printer)");
                        message("(Printer)");
                        return "Ask for Attendance Hardware"
                    }
                }
            ]
        },
        {
            id: "Ask for Attendance Hardware",
            message: "Do you need Software with Attendance Hardware ?",
            trigger: "Displaying options for Attendance Hardware"
        },

        {
            id: "Displaying options for Attendance Hardware",
            options: [
                {
                    value: true,
                    label: "Yes",
                    trigger: () => {
                        Hardware("yes");
                        message("With hardware");
                        return "Ask Email Id"
                    }
                },
                {
                    value: "false",
                    label: "No",
                    trigger: () => {
                        Hardware("no");
                        message("Without hardware");
                        return "Ask Email Id"
                    }
                }
            ]
        },
        {
            id: "Ask Email Id",
            message: "Thank you! We would love to contact you with exciting offers " +
                "Can you leave us your contact details",
            trigger: "Enter Email Id"
        },
        {
            id: "Enter Email Id",
            message: "Enter Email Id ",
            trigger: "Waiting user input for EmailId"
        },
        {
            id: "Waiting user input for EmailId",
            user: true,
            validator: (value) => {

                if (ValidateEmail(value)) {
                    EmailId(value);
                    message(". EmailId For Contact is " + value);
                    return true;
                } else {
                    return 'Enter Valid Email Id';
                }
            },
            trigger: "Ask Mobile No"

        },
        {
            id: "Ask Mobile No",
            message: "Enter Mobile Number",
            trigger: "Waiting user input for Mobile No"
        },
        {
            id: "Waiting user input for Mobile No",
            user: true,
            validator: (value) => {

                if (ValidateMobile(value)) {
                    Mobile(value);
                    message(". Mobile Number For Contact is " + value);
                    sendData();
                    return true;
                } else {
                    return 'Enter Valid Mobile No';
                }
            },
            trigger: "End Greetings 1"

        },

        {
            id: "End Greetings 1",
            message: "That's Great! Thanks for visiting us!",
            trigger: "End Greetings 2"
        },
        {
            id: "End Greetings 2",
            message: "Our associate from Through apps will contact you shortly!!",
            trigger: "Contact Support"
        },

        {
            id: "Contact Support",
            message: "To speak directly to our customer support ," +
                "Please dial +91-9003015420",
            trigger: "Done"
        },


        {
            id: "Displaying options for Trial SignUp",
            options: [
                {
                    value: true,
                    label: "Yes",
                    trigger: () => {
                        Trial("yes");
                        message(" and also need Trial");
                        sendData();
                        return "Click For Trial"
                    }
                },
                {
                    value: "false",
                    label: "No",
                    trigger: () => {
                        Trial("no");
                        message("- No Need Trial");
                        sendData();
                        return "Done"
                    }
                }
            ]
        },
        {
            id: "URL",
            component: (
                <div> <a>https://www.throughbooks.com</a> </div>
            ),
            trigger: () => {
                return "Click For Trial"
            }
        },
        {
            id: "Click For Trial",
            // message: "Click On the above Url Sign in for trial",
            message: "Our Team will Reach You Soon",
            trigger: "Done"
        },
        {
            id: "Done",
            message: "Thanks for Visiting us! Bye!! ",
            end: true
        }
    ];

    function GetLocation() {
        $.getJSON('https://ipapi.co/json/', function (data) {
            city = data.city;
            country = data.country_name;
            region = data.region;
            console.log(city, " ", country);

        });
    }
    function message(val) {
        Content += " " + val;
        console.log("Content ", Content);
    }
    function sendData() {

        Content += ". Location " + city + ", " + region + ", " + country;
        console.log(Content);

        $.ajax({
            type: "POST",
            data: JSON.stringify({
                comments: Content,
                emailId: emailId,
                userName: userName,
                software: type,
                hardware: hardware,
                trial: trial,
                mobileNo: mobileNo,
                city: city,
                country: country,
            }),
            //url: "http://15.206.129.105:8080/EmployeeAttendenceAPI/ChatBot/ChatBotMail",
            url: "http://15.206.129.105:8080/EmployeeAttendenceAPI/ChatBot/ChatBotMail",
            contentType: "application/json",
            dataType: "json",
            async: false,
            success: function (data, textStatus, jqXHR) {

                Content = "";
                userName = "";
                type = "";
                hardware = "";
                trial = "";
                emailId = "";
                mobileNo = "";
            },

            error: function (data) {

            }

        });

    }
    function ValidateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    function ValidateMobile(mobile) {
        var reg = /^\d+$/;
        return (reg.test(mobile) && mobile.length >= 10);
    }
    function UserName(username) {
        userName = username;
    }
    function SoftwareNeed(value) {
        type = type + value;
    }
    function Hardware(value) {
        hardware = value;
    }
    function EmailId(email) {
        emailId = email;
    }
    function Mobile(mobile) {
        mobileNo = mobile;
    }
    function Trial(value) {
        trial = value;
    }
    var style = {

        fontSize: "10px"
    };

    return (
        <div id="chatbot" style={{ height: "250px", width: "250px" }}>
            <ThemeProvider theme={theme}>
                <ChatBot
                    headerTitle={<div><img
                        style={{ width: "40px", height: "36px", marginTop: "0px" }}
                        src={logo}
                        className="logo_Tictoks"
                        alt="Tictoks"
                        width="400"
                        height="300"
                    /> <span style={{ fontSize: "21px" }}>Tictoks</span></div>}
                    bubbleStyle={{ width: "1000px", fontSize: "15px" }}
                    avatarStyle={{ marginLeft: "7px" }}
                    userAvatar={useravatar}
                    bubbleOptionStyle={{ padding: "7px", width: "150px" }}
                    steps={steps} {...config}
                    opened={openStatus}
                />
            </ThemeProvider></div>
    );
}
export default CustomChatbot;

