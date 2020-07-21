package password;

import java.util.Random;

import javax.annotation.Resource;
import javax.ejb.Stateless;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;




@Path("/Password")
/*
 * @Stateless annotated bean is an EJB which by default provides Container-Managed-Transactions. 
 * CMT will by default create a new transaction if the client of the EJB did not provide one.
 */

@Stateless
public class PasswordWebservice {


	@Resource(name="java:jboss/mail/Gmail")
	private Session session;

	@POST
	@Path("/ForgetPassword")
    public Response ForgetPassword(PasswordJSON json) {
		  int flag=1;
		  String subject="Password Recovery";
		  Random rnd = new Random();
		  String to=json.getEmailId();
	      int valid=PasswordLogic.vaildmailid(json);
	      if (valid==0)
	      {
		  int OTP= 100000 + rnd.nextInt(900000);
		  String body="	\n" + 
		  		" \n" + 
		  		"Hello ," + to +
		  		"\n \n" + 
		  		"\n \n" + 
		  		"You asked us to reset your forgotten password. To complete the process, Kindly  enter the OTP:\n" + 
		  		"\n \n" + 
		  		 "\n \n" + OTP +
		  		"\n" + 
		  		"\n \n" + 
		  		"\n \n" + 
		  		"Thank you,\n\n" + 
		  		" ThroughApps\n" + 
		  		" 	\n" + 
		  		" \n" + 
		  		"	\n" ;
	
		PasswordLogic.storeOtp(to,OTP);
		try {
	        MimeMessage message=new MimeMessage(session);
			message.setRecipients(Message.RecipientType.TO,InternetAddress.parse(to));
			message.setSubject(subject);
			message.setContent(body, "text/plain");
			Transport.send(message);
           flag=0;
		}catch(MessagingException e) {
		
		}
		}
	    String result=Integer.toString(flag);
		return Response.status(200).entity(result).build();

	
	
}   
    
    /*
	 * API CALL FOR VERIFYING THE OTP
	 */
	@POST
	@Path("/verifyOTP")
	@Consumes(value= {"application/json"})
	public Response verifyOTP(PasswordJSON json)
	{   
	   
	  
	    PasswordJSON json1=new PasswordJSON();
	     json1 =PasswordLogic.otpVerify(json);
		return Response.status(200).entity(json1).build();
		
		}  
    
	/*
	 * API CALL FOR UPDATING THE NEW PASSWORD
	 */
	@POST
	@Path("/updatePassword")
	@Consumes(value= {"application/json"})
	public Response updatepswd(PasswordJSON json) {
		
		 
	    int  update =PasswordLogic.updatePassword(json);
	   
	    String result=Integer.toString(update);
		return Response.status(200).entity(result).build();
		
	}
    
	
}
