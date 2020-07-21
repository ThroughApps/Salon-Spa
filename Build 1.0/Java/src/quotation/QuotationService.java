package quotation;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.text.ParseException;

import java.util.ArrayList;

import javax.annotation.Resource;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;

import javax.mail.internet.MimeMultipart;



@Path(value="/quotation")
public class QuotationService {
	@Resource(name="java:jboss/mail/Gmail")
	private Session session;
	
	
	/*
	 * API for retrieving cutomer name
	 */
		
		    @POST
		    @Produces(value="application/json" )
		    @Path(value="/selectcustomer")
		    @Consumes(value="application/json")
		 
		 public Response selectcustomer(QuotationJSON json) throws ParseException {
		   
		    	QuotationController mas=new QuotationController();
		    	json=mas.selectcustomer(json);
		    
		     	return Response.status(200).entity(json).build();
	}
		   
	
				    /*
					 * API for registering and adding new sale order	
					 */
						
						    @POST
						    @Produces(value="application/json" )
						    @Path(value="/addgstquotationorder")
						    @Consumes(value="application/json")
						 
			 public Response addgstquotationorder(QuotationJSON json) throws ParseException {
			 
						    	QuotationController mas=new QuotationController();
						    	mas.addgstquotationorder(json);		
						    
						    	  String subject="GSTQuotation Invoice";
								  String to=QuotationDao.GetEmailId(json.getContactNo(),json.getCompanyId());
								  if(to!="null" || to!=" ") {
								  String body="	\n" + 
								  		" \n" + 
								  		"Hello ," + to +
								  		"\n \n" + 
								  		"\n \n" + 
								  		"Welcome to OMR Art Printer \n" + 
								  		"\n \n" + 
								  		" Your invoice"+ json.getInvoiceNo()+" has been created"+
								  		 "\n \n"  +
								  		"Your Invoice Amount is" + json.getFinalAmountTotal()+ 
								  		"\n \n" + 
								  		"\n \n" + 
								  		"Thank you,\n\n" + 
								  		" OMR ART PRINTERS\n" + 
								  		" 	\n" + 
								  		" \n" + 
								  		"	\n" ;
								try {
					    	        MimeMessage message=new MimeMessage(session);
									message.setRecipients(Message.RecipientType.TO,InternetAddress.parse(to));
									message.setSubject(subject);
									message.setContent(body, "text/plain");
									Transport.send(message);
									
								}catch(MessagingException e) {
							
								}
								  }
								HttpURLConnection httpConnection = null;
								try {
									
									
									
									// Url that will be called to submit the message
									String url="http://websms.textidea.com/app/smsapi/index.php?username=throughapps&password=throughapps123&campaign=7539&routeid=3&type=text&contacts="+json.getContactNo()+"&senderid=TAPSMS&msg=Hello ," +  json.getCustomerName() +" ,"+" Welcome to OMR Art Printer " + " " + " Your invoice"+ json.getInvoiceNo()+" has been created"+""+"Your Invoice Amount is" + json.getFinalAmountTotal();
									if(url.contains(" "))
										url = url.replace(" ", "%20");
									URL sendUrl = new URL(url);

									String username = "throughapps";
									String password = "throughapps123";
									String type = "0";
									String message = "Hello, " + json.getCustomerName() + " \n" +

											"Welcome to OMR Art Printer \n" + "\n" + " Your invoice " + json.getInvoiceNo()
											+ " has been  created. " + " \n" +

											" Your Invoice Amount is Rs." + json.getBalance_amount();
									String phn = json.getContactNo();
							
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

							
						     	return Response.status(200).entity(json).build();
					}
				
						  
								    
								
										    /*
											 * API for registering and adding new sale order	
											 */
												
												    @POST
												    @Produces(value="application/json" )
												    @Path(value="/addwithoutgstquotationorder")
												    @Consumes(value="application/json")
												 
												 public Response addwithoutgstquotationorder(QuotationJSON json) throws ParseException {
												 
												    	QuotationController mas=new QuotationController();
												    	mas.addwithoutgstquotationorder(json);		
												    
												    	  String subject="WithoutGSTQuotation Invoice";
														  String to=QuotationDao.GetEmailId(json.getContactNo(),json.getCompanyId());
														  if(to!="null" || to!=" ") {
														  String body="	\n" + 
														  		" \n" + 
														  		"Hello ," + to +
														  		"\n \n" + 
														  		"\n \n" + 
														  		"Welcome to OMR Art Printer \n" + 
														  		"\n \n" + 
														  		" Your invoice"+ json.getInvoiceNo()+" has been created"+
														  		 "\n \n"  +
														  		"Your Invoice Amount is" + json.getFinalAmountTotal()+ 
														  		"\n \n" + 
														  		"\n \n" + 
														  		"Thank you,\n\n" + 
														  		" OMR ART PRINTERS\n" + 
														  		" 	\n" + 
														  		" \n" + 
														  		"	\n" ;
														try {
											    	        MimeMessage message=new MimeMessage(session);
															message.setRecipients(Message.RecipientType.TO,InternetAddress.parse(to));
															message.setSubject(subject);
															message.setContent(body, "text/plain");
															Transport.send(message);
															
														}catch(MessagingException e) {
													
														}}
														HttpURLConnection httpConnection = null;
														try {
															

															// Url that will be called to submit the message
															String url="http://websms.textidea.com/app/smsapi/index.php?username=throughapps&password=throughapps123&campaign=7539&routeid=3&type=text&contacts="+json.getContactNo()+"&senderid=TAPSMS&msg=Hello ," +  json.getCustomerName() +" "+"Welcome to OMR Art Printer " + " " +" Your Quotation"+ json.getInvoiceNo()+" has been created"+""+"Your Quotation Amount is" + json.getFinalAmountTotal();
															if(url.contains(" "))
																url = url.replace(" ", "%20");
															URL sendUrl = new URL(url);

															String username = "throughapps";
															String password = "throughapps123";
															String type = "0";
															String message = "Hello, " + json.getCustomerName() + " \n" +

																	"Welcome to OMR Art Printer \n" + "\n" + " Your invoice " + json.getInvoiceNo()
																	+ " has been  created. " + " \n" +

																	" Your Invoice Amount is Rs." + json.getBalance_amount();
															String phn = json.getContactNo();
														
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

															
												     	return Response.status(200).entity(json).build();
											}		
												    /*
													 * API for retrieving gst quotation report name
													 */
														
														    @POST
														    @Produces(value="application/json" )
														    @Path(value="/gstquotationreport")
														    @Consumes(value="application/json")
														 
														 public Response gstquotationreport(QuotationJSON json) throws ParseException {
														    
														    	QuotationController mas=new QuotationController();
														    	json=mas.gstquotationreport(json);		
														    	
														     	return Response.status(200).entity(json).build();
													}
														    /*
															 * API for retrieving gst quotation report name
															 */
																
																    @POST
																    @Produces(value="application/json" )
																    @Path(value="/gstquotationreportmonthyear")
																    @Consumes(value="application/json")
																 
																 public Response gstquotationreportmonthyear(QuotationJSON json) throws ParseException {
																
																    	QuotationController mas=new QuotationController();
																    	json=mas.gstquotationreportmonthyear(json);		
																    
																     	return Response.status(200).entity(json).build();
															}
														    /*
															 * API for retrieving without gst quotation report
															 */
																
																    @POST
																    @Produces(value="application/json" )
																    @Path(value="/withoutgstquotationreport")
																    @Consumes(value="application/json")
																 
																 public Response withoutgstquotationreport(QuotationJSON json) throws ParseException {
																
																    	QuotationController mas=new QuotationController();
																    	json=mas.withoutgstquotationreport(json);		
																  
																     	return Response.status(200).entity(json).build();
															}	
																    /*
																	 * API for retrieving without gst quotation report
																	 */
																		
																		    @POST
																		    @Produces(value="application/json" )
																		    @Path(value="/withoutgstquotationreportmonthyear")
																		    @Consumes(value="application/json")
																		 
																		 public Response withoutgstquotationreportmonthyear(QuotationJSON json) throws ParseException {
																		    
																		    	QuotationController mas=new QuotationController();
																		    	json=mas.withoutgstquotationreportmonthyear(json);		
																		    	
																		     	return Response.status(200).entity(json).build();
																	}	
												  
}
