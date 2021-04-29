import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
//import GenericDashboard from '.components/Topnavbar/GenericDashboard';
//import GenericDashboard from './components/Topnavbar/GenericDashboard'
//import LandingPageDigitalPrinter from './components/LandingPageDigitalPrinter';
//import registerServiceWorker from './registerServiceWorker';
import FooterText from './components/FooterText';
import CryptoJS from 'crypto-js';
import GenericDashboardBasic from './components/Topnavbar/GenericDashboardBasic';
import GenericDashboardPremium from './components/Topnavbar/GenericDashboardPremium';
import GenericDashboardElite from './components/Topnavbar/GenericDashboardElite';
import registerServiceWorker from './components/registerServiceWorker';

import LandingPage_tasaloon from './components/LandingPage_tasaloon/LandingPage_tasaloon';
//import './components/LandingPage_tasaloon/LandingPage_tasalooncss.css';

/* ReactDOM.render(<LandingPageDigitalPrinter/>, document.getElementById('root'));
 */

 
if (localStorage.getItem('isLoggedIn')) {
	var login = CryptoJS.AES.decrypt(localStorage.getItem('isLoggedIn'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
	if (login == "true") {
		
		window.scrollTo(0, 0);
		var planName = CryptoJS.AES.decrypt(localStorage.getItem("PlanName"),"shinchanbaby").toString(CryptoJS.enc.Utf8);
	
   //	 alert("plantype"+planName);
	   if(planName.toLowerCase() =="basic"){
		   console.log("basicplan", planName);
		   ReactDOM.render(
			   <Router>
				   <div >
					   <Route exact path="/" component={GenericDashboardBasic} />
				   
					   </div>
			   </Router>, document.getElementById('root'));
		   registerServiceWorker();
	   }
	   else if(planName.toLowerCase() =="premium"){
		   console.log("premiumplan", planName);
		   ReactDOM.render(
			   <Router>
				   <div >			
					   <Route exact path="/" component={GenericDashboardPremium} />
					
				   </div>
			   </Router>, document.getElementById('root'));
		   registerServiceWorker();
	   }
   else if(planName.toLowerCase() =="elite"){
	   console.log("eliteplan", planName.toLowerCase());

	   ReactDOM.render(
		   <Router>
			   <div >	
				   <Route exact path="/" component={GenericDashboardElite} />
				 
				   </div>
		   </Router>, document.getElementById('root'));
	   registerServiceWorker();
   }

	
	}
	else {
		window.scrollTo(0, 0);      
   
		ReactDOM.render( 
		<Router>
		<div >

        <Route  path="/" component={LandingPage_tasaloon}/>
		 *{/*  <Route  path="/" component={LoginPage}/> 
	 */}
</div>
		</Router>
		, document.getElementById("root"));
	
	}

}
else {
	window.scrollTo(0, 0);      
   
	ReactDOM.render(
		<Router>
		<div >
	    <Route  path="/" component={LandingPage_tasaloon}/>
	{/* 	 <Route  path="/" component={LoginPage}/> 
	 */}	</div>
		</Router>
		, document.getElementById("root"));
	
}
	
