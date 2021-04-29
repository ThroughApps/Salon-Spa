package organization;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.ParseException;

import javax.annotation.Resource;
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





@Path(value="/SiteRegistration")
public class OrganizationWebService {
	@Resource(name = "java:jboss/mail/Gmail")

	Session session;
	/*
	 * API for registering and adding new customer	
	 */
		
		    @POST
		    @Produces(value="application/json" )
		    @Path(value="/RegisterSite")
		    @Consumes(value="application/json")
		 
		 public Response siteregistration(OrganizationJSON json) throws ParseException {
		    	int otp=0;
				String to=json.getEmailId();
				
				OrganizationJSON org1=new OrganizationJSON();
				org1=OrganizationController.CreateSite(json);
			   	if(org1.getOtp()!=0) {
			   		String subject="Email Id Verification By ThroughApps";
			   		
				
					
					String body="	\n" + 
					  		" \n" + 
					  		"Hello ," + to +
					  		"\n \n" + 
					  		"\n \n" + 
					  		"Kindly  enter the OTP for completing the Registration process\n" + 
					  		"\n \n" + 
					  		"Your OTP is :\n"+
					  		 "\n \n" + org1.getOtp() +
					  		"\n" + 
					  		"\n \n" + 
					  		"\n \n" + 
					  		"Thank you,\n\n" + 
					  		"ThroughApps\n" + 
					  		" 	\n" + 
					  		" \n" + 
					  		"	\n" ;
					
					try {
				    	
						Message message=new MimeMessage(session);
						Multipart MultiPart = new MimeMultipart();
						message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
						message.setSubject(subject);
						
											
						// BodyPart for Sending Alert message 
						MimeBodyPart messageBodyPart = new MimeBodyPart();
						messageBodyPart.setContent(body,"text/plain");
						MultiPart.addBodyPart(messageBodyPart);
					
						message.setContent(MultiPart);
						Transport.send(message);
					 
				    	 
						} catch (MessagingException e) {
							e.printStackTrace();
							
						}	
					json.setResponse("Mailed_Otp");
					
				
					HttpURLConnection httpConnection = null;
					try {
							// Url that will be called to submit the message
						String url="http://websms.textidea.com/app/smsapi/index.php?username=throughapps&password=throughapps123&campaign=7539&routeid=3&type=text&contacts="+org1.getMobileNo()+"&senderid=TAPSMS&msg=Kindly  enter the OTP for completing the Registration process " + " " + " Your OTP is :"+" " + org1.getOtp()+  " " +" Thank you,"+ " " + "ThroughApps";
						if(url.contains(" "))
							url = url.replace(" ", "%20");
						URL sendUrl = new URL(url);
					
						String username = "throughapps";
						String password = "throughapps123";
						String type = "0";
						String message = "Hello,  \n" +

								"Kindly  enter the OTP for completing the Registration process \n" + "\n" + "Your OTP is :\n"+
						  		 "\n \n" + org1.getOtp() +
								
						  		"\n \n" + 
						  		"Thank you,\n\n" + 
						  		"ThroughApps\n" ;
						String phn = org1.getMobileNo();
					
						httpConnection = (java.net.HttpURLConnection) sendUrl.openConnection();
						httpConnection.addRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:25.0) Gecko/20100101 Firefox/25.0");

						// This method sets the method type to POST so that
						// will be send as a POST request
						httpConnection.setRequestMethod("POST");
						// This method is set as true wince we intend to send
						// input to the server
						httpConnection.setDoInput(true);
						// This method implies that we intend to receive data from server.
						httpConnection.setDoOutput(true);
						// Implies do not use cached data
						httpConnection.setUseCaches(false);
						// Data that will be sent over the stream to the server.
					/*	DataOutputStream dataStreamToServer = new DataOutputStream(httpConnection.getOutputStream());
						dataStreamToServer.writeBytes("username=" + URLEncoder.encode(username, "UTF-8") + "&password="
								+ URLEncoder.encode(password, "UTF-8") + "&type=" + URLEncoder.encode("0", "UTF-8") + "&dlr="
								+ URLEncoder.encode("1", "UTF-8") + "&destination=" + URLEncoder.encode(phn, "UTF-8") + "&source="
								+ URLEncoder.encode("TICTOK", "UTF-8") + "&message=" + URLEncoder.encode(message, "UTF-8"));
						dataStreamToServer.flush();

						dataStreamToServer.close();*/
						// Here take the output value of the server.
						BufferedReader dataStreamFromUrl = new BufferedReader(
								new InputStreamReader(httpConnection.getInputStream()));
						String dataFromUrl = "", dataBuffer = "";
						// Writing information from the stream to the buffer
						while ((dataBuffer = dataStreamFromUrl.readLine()) != null) {
							dataFromUrl += dataBuffer;
							
						}
						if (dataFromUrl.contains("SMS-SHOOT-ID")) {
							// EmployeeShiftLogic.IncreaseCount(details);
						}
						/**
						 * Now dataFromUrl variable contains the Response received from the server so we
						 * can parse the response and process it accordingly.
						 */
						dataStreamFromUrl.close();
						
					} catch (Exception ex) {
						ex.printStackTrace();
					} finally {
						if (httpConnection != null) {
							httpConnection.disconnect();
						}
					}
					
				    	}else {
				    	
				    				
				    	}
			    
			   	
				return Response.status(200).entity(org1).build();
	}
			/*
			 * API for registering and adding new customer	
			 */
				
				    @POST
				    @Produces(value="application/json" )
				    @Path(value="/InsertSite")
				    @Consumes(value="application/json")
				 
				 public Response insertsite(OrganizationJSON json) throws ParseException, ClassNotFoundException {
				    	
				    	String to="throughapps@gmail.com";
				    	
				    	OrganizationController mas=new OrganizationController();
				    	mas.siteregistration(json);
				    	if(json.getLicenseKey()!=null) {
					   		String subject="Email Id Verification By ThroughApps";
					   		
							
							
							String body="	\n" + 
							  		" \n" + 
							  		"Hello ," + json.getEmailId() +
							  		"\n \n" + 
							  		"\n \n" + 
							  		"Kindly  enter the license key for your Organization\n" + 
							  		"\n \n" + 
							  		"Your LICENSE KEY is :\n"+
							  		 "\n \n" + json.getLicenseKey() +
							  		"\n" + 
							  		 "\n"+
							  		 "\n"+
							  		 "UserName:"+ json.getEmailId()+ " "+"or" + " "+json.getContactNo()+
							  		 "\n"+
							  		 "Default Password: Omr@1234"+
							  		"\n \n" + 
							  		"\n \n" + 
							  		"Thank you,\n\n" + 
							  		"ThroughApps\n" + 
							  		" 	\n" + 
							  		" \n" + 
							  		"	\n" ;
							
							try {
						    	
								Message message=new MimeMessage(session);
								Multipart MultiPart = new MimeMultipart();
								message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
								message.setSubject(subject);
								
							
								
								// BodyPart for Sending Alert message 
								MimeBodyPart messageBodyPart = new MimeBodyPart();
								messageBodyPart.setContent(body,"text/plain");
								MultiPart.addBodyPart(messageBodyPart);
							
								message.setContent(MultiPart);
								Transport.send(message);
							 
						    	 
								} catch (MessagingException e) {
									e.printStackTrace();
									
								}	
							json.setResponse("Mailed_Otp");

						
							HttpURLConnection httpConnection = null;
							try {
								// Url that will be called to submit the message
								String url="http://websms.textidea.com/app/smsapi/index.php?username=throughapps&password=throughapps123&campaign=7539&routeid=3&type=text&contacts=9003015420&senderid=TAPSMS&msg=Hello" +" license key for"+" "+json.getEmailId() + ","+" " + json.getLicenseKey()+ " " +"UserName:"+" "+ json.getEmailId()+ " "+"or" + " "+json.getContactNo()+"."+" "+"Default Password: Omr@1234"+ "" +" "+" Thank you,"+ " " + "ThroughApps";
									
								if(url.contains(" "))
									url = url.replace(" ", "%20");
								URL sendUrl = new URL(url);

								String username = "throughapps";
								String password = "throughapps123";
								String type = "0";
								String message = "license key for, " + json.getEmailId() + " \n" +

										" \n" + "\n" + "LICENSE KEY is :\n"+
								 	 "\n \n" + json.getLicenseKey() +
										
								 	"\n \n" + 
								 	"Thank you,\n\n" + 
								 	"ThroughApps\n" ;
								String phn = "8682971235";
								
								httpConnection = (java.net.HttpURLConnection) sendUrl.openConnection();
								httpConnection.addRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:25.0) Gecko/20100101 Firefox/25.0");

								// This method sets the method type to POST so that
								// will be send as a POST request
								httpConnection.setRequestMethod("POST");
								// This method is set as true wince we intend to send
								// input to the server
								httpConnection.setDoInput(true);
								// This method implies that we intend to receive data from server.
								httpConnection.setDoOutput(true);
								// Implies do not use cached data
								httpConnection.setUseCaches(false);
								// Data that will be sent over the stream to the server.
							/*	DataOutputStream dataStreamToServer = new DataOutputStream(httpConnection.getOutputStream());
								dataStreamToServer.writeBytes("username=" + URLEncoder.encode(username, "UTF-8") + "&password="
										+ URLEncoder.encode(password, "UTF-8") + "&type=" + URLEncoder.encode("0", "UTF-8") + "&dlr="
										+ URLEncoder.encode("1", "UTF-8") + "&destination=" + URLEncoder.encode(phn, "UTF-8") + "&source="
										+ URLEncoder.encode("TICTOK", "UTF-8") + "&message=" + URLEncoder.encode(message, "UTF-8"));
								dataStreamToServer.flush();

								dataStreamToServer.close();*/
								// Here take the output value of the server.
								BufferedReader dataStreamFromUrl = new BufferedReader(
										new InputStreamReader(httpConnection.getInputStream()));
								String dataFromUrl = "", dataBuffer = "";
								// Writing information from the stream to the buffer
								while ((dataBuffer = dataStreamFromUrl.readLine()) != null) {
									dataFromUrl += dataBuffer;
								
								}
								if (dataFromUrl.contains("SMS-SHOOT-ID")) {
									// EmployeeShiftLogic.IncreaseCount(details);
								}
								/**
								 * Now dataFromUrl variable contains the Response received from the server so we
								 * can parse the response and process it accordingly.
								 */
								dataStreamFromUrl.close();
							
							} catch (Exception ex) {
								ex.printStackTrace();
							} finally {
								if (httpConnection != null) {
									httpConnection.disconnect();
								}
							}
						
						    	}else {
						    	
						    				
						    	}
				    	
				    
				     	return Response.status(200).entity(json).build();
			}
				

}
