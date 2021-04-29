package settings.messagecenter;

import java.io.BufferedReader;





import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Resource;
import javax.ejb.Stateless;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;


import DBUtil.DatabaseUtil;



@Path(value="/MessageCenter")


@Stateless
public class MailWebservice {


	@Resource(name="java:jboss/mail/Gmail")
	private Session session;
	
	
	
	/*
	 * API CALL FOR GETTING CUSTOMER LIST
	 */
	@POST
	@Path("/GetMailCustomerDetails")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	public Response GetCustomerDetails(MailJSON json)
	     {
	
		
		ArrayList <MailJSON> customerList=new ArrayList <MailJSON>();
		customerList =MailLogic.SelectMailCustomerList(json);
		
		
		return Response.status(200).entity(customerList).build();
		
	
	     }    
	   @POST
	    @Produces(value="application/json" )
	    @Path(value="/MessageCenterReport")
	    @Consumes(value="application/json")
	    public Response MessageCenterReport(MailJSON json) throws ParseException {
	    
	    //	ArrayList<MailJSON> MessageCenterReportList = new ArrayList<MailJSON>();
	    	MailLogic MessageCenterReportList=new MailLogic();
	    	MailJSON testJson=new MailJSON();
	    	testJson=MessageCenterReportList.MessageCenterReportDisplay(json);
	    	
	     	return Response.status(200).entity(testJson).build();
	    }
	
	/*
	 * API CALL FOR SENDING EMAIL
	 */
	@POST
	@Path("/SendMail")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	public Response SendMail(MailJSON json)
	     {

		
		List<String> emailIdList = Arrays.asList(json.getSendTo().split(","));
		String subject="Message Center Notification ";
		  String body=json.getMessage();
		
	
		  try {
	    
	       MimeMessage message=new MimeMessage(session);
	       
	       
	        for(int i=0;i<emailIdList.size();i++)
			{
	        message.addRecipients(Message.RecipientType.BCC, InternetAddress.parse(emailIdList.get(i)));
			}
	                  
			message.setSubject(subject);
			message.setContent(body, "text/html");
			Transport.send(message);
			json.setType("Email");
			StoreMessageCenter(json,0);
		}catch(MessagingException e) {
		
		
		}
	 
		
		return Response.status(200).entity(json).build();
		
	
	     } 
	
	 	/*
	 	 * API CALL FOR GETTING CUSTOMER LIST FOR MESSAGE
	 	 */
	 	@POST
	 	@Path("/GetMessageCustomerDetails")
	 	@Consumes(value= {"application/json"})
	 	@Produces(value={"application/json"})
	 	public Response   GetMessageCustomerDetails(MailJSON json)
	 	     {
	 	
	 		
	 		ArrayList <MailJSON> customerList=new ArrayList <MailJSON>();
	 		customerList =MailLogic.SelectMessageCustomerList(json);
	 		
	 		
	 		return Response.status(200).entity(customerList).build();
	 		
	 	
	 	     }  
	
	/*
	 * API CALL FOR SENDING MESSAGE
	 */
	@POST
	@Path("/SendMessage")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	
	  public Response SendMessage(MailJSON json) throws SQLException {
		
	
	 	

	HttpURLConnection httpConnection = null;
try {
//Url that will be called to submit the message
//URL sendUrl = new URL("http://alerts.digimiles.in/sendsms/bulksms?");
//
//String username="di80-arun";   
//String password="digimile";


//
	
//	"http://sms.textidea.com/app/smsapi/index.php?key=45D1481F1B98AF&campaign=XXXXXX&routeid=XXXXXX&type=text&contacts=97656XXXXX,98012XXXXX&senderid=XXXXXX&msg=Hello+People%2C+have+a+great+day&time=2019-07-26+11%3A35";

	//http://websms.textidea.com/app/smsapi/index.php?username=throughapps&password=XXXXXX&campaign=XXXXXX&routeid=XXXXXX&type=text&contacts=97656XXXXX,98012XXXXX&senderid=XXXXXX&msg=Hello+People%2C+have+a+great+day&time=2019-07-30+18%3A19
	String url="http://websms.textidea.com/app/smsapi/index.php?username=throughapps&password=throughapps123&campaign=7539&routeid=3&type=text&contacts="+json.getSendTo()+"&senderid=TAPSMS&msg="+json.getMessage();
	if(url.contains(" "))
		url = url.replace(" ", "%20");
	URL sendUrl = new URL(url);		
//	
//	username=demotext3&password=XXXXXX&campaign=XXXXXX&routeid=XXXXXX&type=text&contacts=97656XXXXX,98012XXXXX&senderid=XXXXXX&msg=Hello+People%2C+have+a+great+day&time=2019-07-26+11%3A35";
//	
String username="throughapps";   
String password="throughapps123";
String type="0";

String meessage=json.getMessage();
String phn=json.getSendTo();


httpConnection = (java.net.HttpURLConnection) sendUrl.openConnection();
httpConnection.addRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:25.0) Gecko/20100101 Firefox/25.0");
//This method sets the method type to POST so that
//will be send as a POST request
httpConnection.setRequestMethod("POST");
//This method is set as true wince we intend to send
//input to the server
httpConnection.setDoInput(true);
//This method implies that we intend to receive data from server.
httpConnection.setDoOutput(true);
//Implies do not use cached data
httpConnection.setUseCaches(false);
//Data that will be sent over the stream to the server.

//BufferedReader reader = new BufferedReader(new InputStreamReader(((HttpURLConnection) (sendUrl).openConnection()).getInputStream(), Charset.forName("UTF-8")));
/*DataOutputStream dataStreamToServer = new
DataOutputStream( httpConnection.getOutputStream());
dataStreamToServer.writeBytes("username="
+ URLEncoder.encode(username, "UTF-8") + "&password="
+ URLEncoder.encode(password, "UTF-8") + "&type="
+URLEncoder.encode("0", "UTF-8") + "&dlr="
+ URLEncoder.encode("1", "UTF-8") + "&destination="
+ URLEncoder.encode(phn, "UTF-8") + "&source="
+ URLEncoder.encode("TICTOK", "UTF-8") + "&message="
+ URLEncoder.encode(meessage, "UTF-8"));
dataStreamToServer.flush();

dataStreamToServer.close();*/


//Here take the output value of the server.
BufferedReader dataStreamFromUrl = new BufferedReader( new
InputStreamReader(httpConnection.getInputStream()));String
dataFromUrl = "", dataBuffer = "";
//Writing information from the stream to the buffer
while ((dataBuffer = dataStreamFromUrl.readLine()) != null)
{ dataFromUrl += dataBuffer;

}
if(dataFromUrl.contains("SMS-SHOOT-ID")){
//EmployeeShiftLogic.IncreaseCount(details);
	
	json.setType("Text Message");
	List<String> empList = Arrays.asList(json.getSendTo().split(","));
	 int smsCount=empList.size()*json.getMsgCount();
	
	StoreMessageCenter(json,smsCount);
	json.setSendTo("");
}
/**
* Now dataFromUrl variable contains the Response received from the
* server so we can parse the response and process it accordingly.
*/
dataStreamFromUrl.close();

} catch (Exception ex) {
ex.printStackTrace();
} finally {
if (httpConnection != null) {
httpConnection.disconnect();
}
}

	

	  return Response.status(200).entity(json).build();

}

public void StoreMessageCenter(MailJSON json,int smsCount ){
		
		String role="-";
		String name="-";
		Connection connection=null;
		try {
			
			connection=DatabaseUtil.getDBConnection();
		
		String querySelect1=QueryConstants.STORE_MESSAGE_CENTER;
		PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
		preparedStmt1.setString(1,json.getCompanyId());
		preparedStmt1.setString(2,json.getStaffId());
		 preparedStmt1.setString(3,name);
		    preparedStmt1.setString(4,role);
		   
	    preparedStmt1.setString(5,json.getType());
	    preparedStmt1.setString(6,json.getSendTo());
	    preparedStmt1.setString(7,json.getMessage());
	    preparedStmt1.setInt(8,smsCount);
		   
	    preparedStmt1.executeUpdate();
	    connection.close(); 
		}
		catch (Exception e) {
			e.printStackTrace();
		  }finally {
			
		    }
	}
	
/*
 * API call for Config Value settings
 */

@POST
@Path("/ConfigValueSettings")
@Produces(value="application/json" )
@Consumes(value= "application/json")
	
public Response ConfigValueSettings (MailJSON json)throws ParseException
{  
	
	MailLogic configValue=new MailLogic();
	MailJSON configJson=new MailJSON();
	configJson=configValue.ConfigValueSettings(json);
	

	
	return Response.status(200).entity(configJson).build();
	
	}

/*
 * API call for Toggle Value settings
 */

@POST
@Path("/toggleValueSettings")
@Produces(value="application/json" )
@Consumes(value= "application/json")
	
public Response toggleValueSettings (MailJSON json)throws ParseException
{  
	
	MailLogic toggleValue=new MailLogic();
	MailJSON toggleJson=new MailJSON();
	toggleJson=toggleValue.toggleValueSettings(json);
	

	
	return Response.status(200).entity(toggleJson).build();
	
	}


/*
 * API call for Toggle Value settings
 */

@POST
@Path("/RewardRedeemPoints")
@Produces(value="application/json" )
@Consumes(value= "application/json")
	
public Response RewardRedeemPointsSettings (MailJSON json)throws ParseException
{  

	MailLogic RewardRedeemPointslogic=new MailLogic();
	MailJSON RewardRedeemPointsjson=new MailJSON();
	RewardRedeemPointsjson=RewardRedeemPointslogic.RewardRedeemPoints(json);
	

	
	return Response.status(200).entity(RewardRedeemPointsjson).build();
	
	}

@POST
@Path("/ContactPage")
public Response sendmail(MailJSON json) {
	  int flag=1;
	  String subject="Enquiry from Contact Page ";
	  String to="throughapps@gmail.com";
     
	  String body="	\n" + 
	  		" \n" + 
	  		" From " + json.getUserName()+" "+json.getEmailId() + ","+
	  		"\n \n" + 
	  		"\n" +json.getComments()+ 
	  		"\n \n" + 
	  		 "\n \n" +
	  		"\n \n" ;
	try {
        MimeMessage message=new MimeMessage(session);
		message.setRecipients(Message.RecipientType.TO,InternetAddress.parse(to));
		message.setSubject(subject);
		message.setContent(body, "text/plain");
		Transport.send(message);
       flag=0;
     
	}catch(MessagingException e) {
	
	}
	
    String result=Integer.toString(flag);
	return Response.status(200).entity(result).build();


}
	
}
