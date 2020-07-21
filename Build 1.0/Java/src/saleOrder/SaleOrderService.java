package saleOrder;

import java.io.BufferedReader;

import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.text.ParseException;

import javax.mail.internet.MimeMessage;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.annotation.Resource;
import java.io.ByteArrayOutputStream;
import java.io.OutputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;

import javax.mail.util.ByteArrayDataSource;
//import javax.swing.text.Document;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

@Path(value = "/saleorder")
public class SaleOrderService {

	@Resource(name = "java:jboss/mail/Gmail")
	private Session session;

	/*
	 * API for retrieving cutomer name
	 */

	@POST
	@Produces(value = "application/json")
	@Path(value = "/selectcustomer")
	@Consumes(value = "application/json")

	public Response selectcustomer(SaleOrderJSON json) throws ParseException {

		SaleOrderController mas = new SaleOrderController();
		json = mas.selectcustomer(json);
	
		return Response.status(200).entity(json).build();
	}
	/*
	 * API for retrieving product name
	 */



	/*
	 * API for registering and adding new sale order
	 */

	@POST
	@Produces(value = "application/json")
	@Path(value = "/addsaleorder")
	@Consumes(value = "application/json")

	public Response addsaleorder(SaleOrderJSON json) throws ParseException, DocumentException {
	
		SaleOrderController mas = new SaleOrderController();
		mas.addsaleorder(json);
		
			if(json.getInvoiceResponseData().equals("Invoice_Success")) {
		if(json.getEmailoption().equals("emailoption")) {
		
		String subject = "Sale Invoice";
		String to = SaleOrderDao.GetEmailId(json.getContactNo(), json.getCompanyId());
		if (to != "null" || to != " ") {
			String body = "	\n" + " \n" + " Hello, " + to + "\n \n" + "\n \n" + " Welcome to " + json.getOrganizationName() + " \n"
					+ "\n \n" + " Your invoice " + json.getInvoiceNo() + " has been created." +

					"\n \n" + " Your Invoice Amount is Rs." + json.getBalance_amount() + "\n \n" + "\n \n"
					+ "Thank you,\n\n" + " " + json.getOrganizationName() + "\n" + " 	\n" + " \n" + "	\n";

			ByteArrayOutputStream outputStream = null;
			try {

					/*
					 * // construct the text body part MimeBodyPart textBodyPart = new
					 * MimeBodyPart(); textBodyPart.setText(body);
					 * 
					 * // now write the PDF content to the output stream outputStream = new
					 * ByteArrayOutputStream(); writePdf(outputStream, json); byte[] bytes =
					 * outputStream.toByteArray();
					 * 
					 * // construct the pdf body part DataSource dataSource = new
					 * ByteArrayDataSource(bytes, "application/pdf"); MimeBodyPart pdfBodyPart = new
					 * MimeBodyPart(); pdfBodyPart.setDataHandler(new DataHandler(dataSource));
					 * pdfBodyPart.setFileName("test.pdf");
					 * 
					 * // construct the mime multi part MimeMultipart mimeMultipart = new
					 * MimeMultipart(); mimeMultipart.addBodyPart(textBodyPart);
					 * mimeMultipart.addBodyPart(pdfBodyPart);
					 * 
					 * MimeMessage message = new MimeMessage(session);
					 * message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
					 * message.setSubject(subject); message.setContent(mimeMultipart);
					 * Transport.send(message);
					 */
				MimeMessage message = new MimeMessage(session);
				message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
				message.setSubject(subject);
				message.setContent(body, "text/plain");
				Transport.send(message);

			} catch (MessagingException e) {
				
			}
		}
}
if(json.getSms().equals("sms")) {

		HttpURLConnection httpConnection = null;
		try {
			// Url that will be called to submit the message
			String url="http://websms.textidea.com/app/smsapi/index.php?username=throughapps&password=throughapps123&campaign=7539&routeid=3&type=text&contacts="+json.getContactNo()+"&senderid=TAPSMS&msg=Hello" + json.getCustomerName() + " ," +"Welcome to " + json.getOrganizationName() + " " + " " + " Your invoice " + json.getInvoiceNo()+ " has been  created. " + " " +" Your Invoice Amount is Rs." + json.getBalance_amount();
			if(url.contains(" "))
				url = url.replace(" ", "%20");
			URL sendUrl = new URL(url);

			String username = "throughapps";
			String password = "throughapps123";
			String type = "0";
			String message = "Hello, " + json.getCustomerName() + " \n" +

					"Welcome to " + json.getOrganizationName() + " \n" + "\n" + " Your invoice " + json.getInvoiceNo()
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

}	
}
		

		return Response.status(200).entity(json).build();

	}

	private void writePdf(ByteArrayOutputStream outputStream, SaleOrderJSON json) throws DocumentException {
		Document document = new Document();
		PdfWriter.getInstance(document, outputStream);
		String subject = "Sale Invoice";
		String to = SaleOrderDao.GetEmailId(json.getContactNo(), json.getCompanyId());

		String body = "	\n" + " \n" + " Hello, " + to + "\n \n" + "\n \n" + " Welcome to " + json.getOrganizationName() + " \n" + "\n \n"
				+ " Your invoice " + json.getInvoiceNo() + " has been created." +

				"\n \n" + " Your Invoice Amount is Rs." + json.getBalance_amount() + "\n \n" + "\n \n"
				+ "Thank you,\n\n" + " " + json.getOrganizationName() + "\n" + " 	\n" + " \n" + "	\n";
		document.open();

		document.addTitle("Test PDF");
		document.addSubject("Testing email PDF");
		document.addKeywords("iText, email");
		document.addAuthor("Jee Vang");
		document.addCreator("Jee Vang");

		Paragraph paragraph = new Paragraph();
		paragraph.add(new Chunk(body));
		document.add(paragraph);

		document.close();

	}
	/*
	 * API for retrieving cutomer name
	 */

	@POST
	@Produces(value = "application/json")
	@Path(value = "/saleinvoicereport")
	@Consumes(value = "application/json")

	public Response saleinvoicereport(SaleOrderJSON json) throws ParseException {
		
		SaleOrderController mas = new SaleOrderController();
		json = mas.saleinvoicereport(json);
	
		return Response.status(200).entity(json).build();

	}



	@POST
	@Produces(value = "application/json")
	@Path(value = "/estimateinvoiceNo")
	@Consumes(value = "application/json")

	public Response estimateinvoiceNo(SaleOrderJSON json) throws ParseException {
		
		SaleOrderController mas = new SaleOrderController();
		json = mas.estimateinvoiceNo(json);
	

		return Response.status(200).entity(json).build();
	}

	/*
	 * API for registering and adding new sale order
	 */

	@POST
	@Produces(value = "application/json")
	@Path(value = "/addestimateorder")
	@Consumes(value = "application/json")

	public Response addestimateorder(SaleOrderJSON json) throws ParseException {

		SaleOrderController mas = new SaleOrderController();
		mas.addestimateorder(json);
		
		
		if(json.getInvoiceResponseData().equals("Invoice_Success")) {
		if(json.getEmailoption().equals("emailoption")) {
		String subject = "Estimate Invoice";
		String to = SaleOrderDao.GetEmailId(json.getContactNo(), json.getCompanyId());
		if (to != "null" || to != " ") {
			String body = "	\n" + " \n" + "Hello ," + to + "\n \n" + "\n \n" + "Welcome to " + json.getOrganizationName() + " \n" + "\n \n"
					+ " Your invoice" + json.getInvoiceNo() + " has been created" + "\n" + "\n \n"
					+ "Your Invoice Amount is" + json.getSubtotal1() + "\n \n" + "\n \n" + "Thank you,\n\n"
					+ " " + json.getOrganizationName() + "\n" + " 	\n" + " \n" + "	\n";
			try {
				MimeMessage message = new MimeMessage(session);
				message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
				message.setSubject(subject);
				message.setContent(body, "text/plain");
				Transport.send(message);

			} catch (MessagingException e) {
				
			}
		}
		}
		if(json.getSms().equals("sms")) {
		HttpURLConnection httpConnection = null;
		try {
			// Url that will be called to submit the message
			String url="http://websms.textidea.com/app/smsapi/index.php?username=throughapps&password=throughapps123&campaign=7539&routeid=3&type=text&contacts="+json.getContactNo()+"&senderid=TAPSMS&msg=Hello" + json.getCustomerName() + " " +"Welcome to " + json.getOrganizationName() + " " + "" + " Your invoice" + json.getInvoiceNo()+ " has been created" + "" +"Your Invoice Amount is" + json.getSubtotal1();
			if(url.contains(" "))
				url = url.replace(" ", "%20");
			URL sendUrl = new URL(url);		
		//	URL sendUrl = new URL("http://alerts.digimiles.in/sendsms/bulksms?");

			String username = "throughapps";
			String password = "throughapps123";
			String type = "0";
			String message = "Hello ," + json.getCustomerName() + " \n" +

					"Welcome to " + json.getOrganizationName() + " \n" + "\n \n" + " Your invoice" + json.getInvoiceNo()
					+ " has been created" + "\n" +

					"Your Invoice Amount is" + json.getSubtotal1();
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

		}
		}
		return Response.status(200).entity(json).build();
	}
	/*
	 * API for retrieving cutomer name
	 */

	@POST
	@Produces(value = "application/json")
	@Path(value = "/estimateinvoicereport")
	@Consumes(value = "application/json")

	public Response estimateinvoicereport(SaleOrderJSON json) throws ParseException {
		
		SaleOrderController mas = new SaleOrderController();
		json = mas.estimateinvoicereport(json);
		
		return Response.status(200).entity(json).build();
	}
	
	/*
	 * API for retrieving cutomer name
	 */

	@POST
	@Produces(value = "application/json")
	@Path(value = "/updatesaleorder")
	@Consumes(value = "application/json")
	public Response updatesaleorder(SaleOrderJSON json) throws ParseException {
		
		SaleOrderController mas = new SaleOrderController();
		mas.updatesaleorder(json);
			

		return Response.status(200).entity(json).build();

	}
	/*
	 * API for retrieving cutomer name
	 */

	@POST
	@Produces(value = "application/json")
	@Path(value = "/updateestimateorder")
	@Consumes(value = "application/json")
	public Response updateestimateorder(SaleOrderJSON json) throws ParseException {
		
		SaleOrderController mas = new SaleOrderController();
		mas.updateestimateorder(json);
		

		return Response.status(200).entity(json).build();

	}
	
	/*
	 * API for retrieving cutomer name
	 */

	@POST
	@Produces(value = "application/json")
	@Path(value = "/UpdateQuantityForExisting")
	@Consumes(value = "application/json")
	public Response UpdateQuantityForExistingProduct(SaleOrderJSON json) throws ParseException {
		
		SaleOrderController mas = new SaleOrderController();
		mas.UpdateQuantityForExisting(json);
	

		return Response.status(200).entity(json).build();

	}	

}
