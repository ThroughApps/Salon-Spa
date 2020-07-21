package Chatbot;

import java.io.BufferedReader;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.annotation.Resource;
import javax.ejb.Stateless;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
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
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;

import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;
import org.json.JSONArray;
import org.json.JSONObject;



import DBUtil.DatabaseUtil;
import Excel.ExcelJSON;
import Excel.ExcelLogic;
import master.MasterDao;
import settings.messagecenter.MailJSON;
@Path("/ChatBot")
@Stateless
public class ChatBotMail {
	// private static final String SERVER_UPLOAD_LOCATION_FOLDER =
	// "/home/ec2-user/ChatBot/";
	// private static final String SERVER_UPLOAD_LOCATION_FOLDER = "E://Apk/";
	// private static final String SERVER_DELETE_LOCATION_FOLDER = "E:\\Apk\\";
	private static final String SERVER_UPLOAD_LOCATION_FOLDER = "/home/ec2-user/ChatBot/";
	private static final String SERVER_DELETE_LOCATION_FOLDER = "/home/ec2-user/ChatBot/";

	/*
	 * got the name for the superior id...........0000 got the role for the
	 * superior id...........0000 updated the changes into audit report ab
	 * pathE:\Apk\bio poster.png FileE:\Apk\bio poster.png Exist true File
	 * deleted successfullyfalse Going to Select All ChatBot Data
	 */
	/*
	 * ab pathE:\Apk\bio poster.png FileE:\Apk\bio poster.png Exist true Failed
	 * to delete the file false Going to Select All ChatBot Data going to Select
	 * Chat Bot List............
	 */

	@Resource(name = "java:jboss/mail/Gmail")
	private Session session;

	@POST
	@Path("/ChatBotMail")
	public Response sendmail(ChatBotJSON json) {
		int flag = 1;
		String subject = "Enquiry Done on ChatBot ";
		String to = "throughapps@gmail.com";
		System.out.println("ChatBot -Sending Enquiry Details" + json.getEmailId());
		String body = "	\n" + " \n" + " From Chatbot, " + "\n \n" + "\n " + json.getComments() + "\n \n Thank You"
				+ "\n \n" + "\n \n";
		String replysubject = "Thanks for Contacting us through Chatbot";
		String replyto = json.getEmailId();
		String replybody = "	\n" + " \n" + " Greetings, " + "\n \n"
				+"Thanks for Showing Interest in TICTOKS. We are delighted to provide you a 7 days free trial.\n"
				+"Please Visit  https://www.tictoks.in. Follow the below instruction to Sign-up "
				+"\n1.Click Login Menu to access Sign-up option"
				+"\n2.Please enter the organisation details to experience TICTOKS. "
				+ "For any help, kindly write to throughapps@gmail.com"
				+ "\n \nThanks & Best Regards" + "\n"
				+ "ThroughApps \n" 
				+ "www.throughapps.com\n \n";
		try {
			MimeMessage message = new MimeMessage(session);
			message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
			message.setSubject(subject);
			message.setContent(body, "text/plain");
			Transport.send(message);
			MimeMessage replymsg = new MimeMessage(session);
			replymsg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(replyto));
			replymsg.setSubject(replysubject);
			replymsg.setContent(replybody, "text/plain");
			Transport.send(replymsg);
			flag = 0;
			StoreChatbotData(json);
			System.out.println("Successfully sent mail for Chat Bot");
		} catch (MessagingException e) {
			System.out.println("cannot send mail" + e);
		}

		String result = Integer.toString(flag);
		return Response.status(200).entity(result).build();

	}

	public void StoreChatbotData(ChatBotJSON details) {

		Connection connection = null;
		try {
			

			connection = DatabaseUtil.getDBConnection();
			String querySelect1 = ChatbotQueryContants.STORE_CHAT_BOT;
			PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1, details.getUserName());
			preparedStmt1.setString(2, details.getEmailId());
			preparedStmt1.setString(3, details.getMobileNo());
			preparedStmt1.setString(4, details.getSoftware());
			preparedStmt1.setString(5, details.getHardware());
			preparedStmt1.setString(6, details.getTrial());
			preparedStmt1.setString(7, details.getCity());
			preparedStmt1.setString(8, details.getCountry());

			preparedStmt1.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DatabaseUtil.closeConnection(connection);
		}
	}

	/*
	 * API call for Selecting All Chatbot Details
	 */

	@POST
	@Path(value = "/SelectAllChaBot")
	@Consumes(value = { "application/json" })
	@Produces(value = { "application/json" })
	public Response SelectChatBotList(ChatBotJSON json) throws ParseException {
		System.out.println(" Going to Select All ChatBot Data");
		ChatBotJSON chatJSON = new ChatBotJSON();
		chatJSON = ChatBotLogic.SelectChatBotList(json);
		return Response.status(200).entity(chatJSON).build();

	}

	/*
	 * API call for Selecting All Chatbot Details
	 */

	@POST
	@Path(value = "/SelectChaBot")
	@Consumes(value = { "application/json" })
	@Produces(value = { "application/json" })
	public Response SelectChatBotData(ChatBotJSON json) throws ParseException {
		System.out.println(" Going to Select ChatBot Data");
		ChatBotJSON chatJSON = new ChatBotJSON();
		chatJSON = ChatBotLogic.SelectChatBotData(json);
		return Response.status(200).entity(chatJSON).build();

	}

	@Resource(name = "java:jboss/mail/Gmail")
	private Session session2;

	@POST
	@Path("/SendChatBotMail")
	public Response sendMessageCenterMail(MailJSON details) throws SQLException, IOException {

		String subject = "Through Apps Notification ";
		System.out.println("sending mail to " + details.getSendTo());
		List<String> mailList = Arrays.asList(details.getSendTo().split(","));
		String body = details.getMessage();
		try {
			MimeMessage message = new MimeMessage(session2);
			for (int i = 0; i < mailList.size(); i++) {
				message.addRecipients(Message.RecipientType.BCC, InternetAddress.parse(mailList.get(i)));
			}

			message.setSubject(subject);
			if (!details.getMessage().equals("Image Sent")) {
				body = "<html><body><h4>" + details.getMessage() + "</h4>";
			}
			if (!details.getFileName().equals("")) {
				body += "<img width=\"400\" height=\"300\" src=\"cid:image\">";
				body += "</body></html>";
				// message.setContent(body, "text/html");
				// This mail has 2 part, the BODY and the embedded image
				MimeMultipart multipart = new MimeMultipart("related");
				// first part (the html)
				BodyPart messageBodyPart = new MimeBodyPart();
				messageBodyPart.setContent(body, "text/html");
				// add it
				multipart.addBodyPart(messageBodyPart);
				// second part (the image)
				messageBodyPart = new MimeBodyPart();
				DataSource fds = new FileDataSource(SERVER_UPLOAD_LOCATION_FOLDER + details.getFileName());
				messageBodyPart.setDataHandler(new DataHandler(fds));
				messageBodyPart.setHeader("Content-ID", "<image>");
				// add image to the multipart
				multipart.addBodyPart(messageBodyPart);
				// put everything together
				message.setContent(multipart);
				// Send the actual HTML message, as big as you like
			} else {
				body += "</body></html>";
				message.setContent(body, "text/html");
			}
			Transport.send(message);
			details.setType("Email");
			StoreMessageCenter(details, 0);
			String[] sendTo = details.getSendTo().split(",");
			String contacts = String.join(", ", sendTo);
			//MasterDao.AuditReport(details.getSuperiorId(), "To " + contacts,
			//		"Sent Mail from Chat Bot Communication", details.getCompanyId());

		} catch (MessagingException e) {
			System.out.println("Cannot Send Mail" + e);

		} finally {
			if (!details.getFileName().equals("")) {
				File file = new File(SERVER_DELETE_LOCATION_FOLDER + details.getFileName());
				file.setWritable(true);
				System.out.println("ab path" + file.getAbsolutePath());

				System.out.println("File" + file + " Exist " + file.exists());
				if (file.delete()) {
					System.out.println("File deleted successfully" + file.delete());
				} else {
					System.out.println("Failed to delete the file " + file.delete());
				}
			}
		}

		return Response.status(200).entity(details).build();

	}

	public void StoreMessageCenter(MailJSON details, int smsCount) {

		String role = "-";
		String name = "-";
		Connection connection = null;
		try {
			System.out.println("Storing message center data Sms count"+smsCount);
			connection = DatabaseUtil.getDBConnection();
			String querySelect = ChatbotQueryContants.EMP_AUDIT_ROLE_NAME;
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1, details.getSuperiorId());
			preparedStmt.setString(2, details.getCompanyId());
			ResultSet rs = preparedStmt.executeQuery();
			while (rs.next()) {
				role = rs.getString("Role");
				name = rs.getString("Name");
			}
			String[] sendTo = details.getSendTo().split(",");
			String contacts = String.join(", ", sendTo);
			String querySelect1 = ChatbotQueryContants.STORE_MESSAGE_CENTER;
			PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1, details.getCompanyId());
			preparedStmt1.setString(2, details.getSuperiorId());
			preparedStmt1.setString(3, name);
			preparedStmt1.setString(4, role);
			preparedStmt1.setString(5, details.getType());
			preparedStmt1.setString(6, contacts);
			preparedStmt1.setString(7, details.getMessage());
			preparedStmt1.setInt(8, smsCount);

			preparedStmt1.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DatabaseUtil.closeConnection(connection);
		}
	}

	@POST
	@Path("/UploadFile")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Response uploadFile(MultipartFormDataInput input) {

		String fileName = "";

		Map<String, List<InputPart>> formParts = input.getFormDataMap();

		List<InputPart> inPart = formParts.get("formData");
		System.out.println("Going to Save");
		for (InputPart inputPart : inPart) {

			try {

				// Retrieve headers, read the Content-Disposition header to
				// obtain the original name of the file
				MultivaluedMap<String, String> headers = inputPart.getHeaders();
				fileName = parseFileName(headers);
				// Handle the body of that part with an InputStream
				InputStream istream = inputPart.getBody(InputStream.class, null);
				fileName = SERVER_UPLOAD_LOCATION_FOLDER + fileName;
				saveFile(istream, fileName);
				System.out.println("saved file Save");
			} catch (IOException e) {
				e.printStackTrace();
			}

		}

		String output = "File saved to server location : " + fileName;

		return Response.status(200).entity(output).build();
	}

	// Parse Content-Disposition header to get the original file name
	private String parseFileName(MultivaluedMap<String, String> headers) {

		String[] contentDispositionHeader = headers.getFirst("Content-Disposition").split(";");

		for (String name : contentDispositionHeader) {

			if ((name.trim().startsWith("filename"))) {

				String[] tmp = name.split("=");

				String fileName = tmp[1].trim().replaceAll("\"", "");

				return fileName;
			}
		}
		return "randomName";
	}

	// save uploaded file to a defined location on the server
	private void saveFile(InputStream uploadedInputStream, String serverLocation) {

		try {
			OutputStream outpuStream = new FileOutputStream(new File(serverLocation));
			int read = 0;
			byte[] bytes = new byte[1024];

			outpuStream = new FileOutputStream(new File(serverLocation));
			while ((read = uploadedInputStream.read(bytes)) != -1) {
				outpuStream.write(bytes, 0, read);
			}
			outpuStream.flush();
			outpuStream.close();
		} catch (IOException e) {

			e.printStackTrace();
		}
	}
	
	/*
	 * API FOR STORING THE FILENAME INTO DATABASE ON DOWNLOAD (Export)
	 */
	
	@POST
	@Path("/ExportChatBotFile")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	
	public Response importChatBotFile(ChatBotJSON json) throws IOException, SQLException, ClassNotFoundException, Exception {
		System.out.println("going to store chatbot filename");
		ChatBotJSON chatJSON = new ChatBotJSON();
		chatJSON = ChatBotLogic.StoreChatBotFileName(json);
		System.out.println(" stored chatbot filename");
		return Response.status(200).entity(chatJSON).build();

	}

	/*
	 * API FOR GETTING THE FILENAME FROM DATABASE
	 */
	
	@POST
	@Path("/GetChatBotFileName")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	
	public Response getChatBotFileName(ChatBotJSON json) throws IOException, SQLException, ClassNotFoundException, Exception {
		ChatBotJSON chatJSON = new ChatBotJSON();
		 ChatBotLogic.GetStoredChatBotFileName(json);

		return Response.status(200).entity(json).build();

	}
	
	
	@POST
	@Path("/UploadChatBotData")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	
	public Response UploadChatBotData(String data) throws IOException, SQLException, ClassNotFoundException, Exception {
	
	
	ArrayList<ChatBotJSON>returnXl=new ArrayList<ChatBotJSON>();
	ChatBotJSON exceljson=new ChatBotJSON();
	JSONObject json =new JSONObject(data);
	
	String companyId=(String) json.get("companyId");

	

	JSONArray arr = json.getJSONArray("testlist");
	
	returnXl=ChatBotLogic.UploadCustomerData(companyId,arr);
	exceljson.setReturnXl(returnXl);
	
	for(ChatBotJSON s1:returnXl) {

	}
	
	
		return Response.status(200).entity(exceljson).build();

	}
	
	/*

	 * API CALL FOR SENDING MESSAGE

	 */

	@POST

	@Path("/SendChatBotSMS")

	@Consumes(value= {"application/json"})

	@Produces(value={"application/json"})

	

	  public Response SendMessage(ChatBotJSON json) throws SQLException {

		

	

	 	



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

	

	//StoreMessageCenter(json,smsCount);

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





}
