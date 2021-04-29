package Chatbot;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;

import org.json.JSONArray;
import org.json.JSONException;

import DBUtil.DatabaseUtil;
import Excel.ExcelJSON;
import Excel.ExcelQueryConstants;
import master.QueryConstants;
public class ChatBotLogic {
	/*
	 * function for Selecting Chat Bot list
	 */

	public static ChatBotJSON SelectChatBotList(ChatBotJSON json) {

		ArrayList<ChatBotJSON> chatbotList = new ArrayList<ChatBotJSON>();
		ArrayList<ChatBotJSON> countryList = new ArrayList<ChatBotJSON>();
		ArrayList<ChatBotJSON> originList = new ArrayList<ChatBotJSON>();
		ChatBotJSON chatJSON = new ChatBotJSON();
		Connection connection = null;
		try {
			connection = DatabaseUtil.getDBConnection();
			String querySelect3 = ChatbotQueryContants.SELECT_CHATBOT_LIST;
			PreparedStatement preparedStmt3 = connection.prepareStatement(querySelect3);
			ResultSet rs3 = preparedStmt3.executeQuery();

			while (rs3.next()) {
				ChatBotJSON obj = new ChatBotJSON();
				obj.setEmailId(rs3.getString("EmailId"));
				obj.setMobileNo(rs3.getString("MobileNo"));
				obj.setUserName(rs3.getString("UserName"));
				obj.setSoftware(rs3.getString("Software"));
				obj.setHardware(rs3.getString("Hardware"));
				obj.setTrial(rs3.getString("Trial"));
				obj.setCountry(rs3.getString("Country"));
				obj.setDate(rs3.getString("Date"));
				obj.setCity(rs3.getString("City"));
				obj.setId(rs3.getString("Id"));
				obj.setOrigin(rs3.getString("Origin"));

				chatbotList.add(obj);
			}
			String querySelect4 = ChatbotQueryContants.SELECT_COUNTRY_LIST;
			PreparedStatement preparedStmt4 = connection.prepareStatement(querySelect4);
			ResultSet rs4 = preparedStmt4.executeQuery();

			while (rs4.next()) {
				ChatBotJSON obj = new ChatBotJSON();
				obj.setCountry(rs4.getString("Country"));
				countryList.add(obj);

			}
			
			String querySelect5 =ChatbotQueryContants.SELECT_ORIGIN_LIST;
			PreparedStatement preparedStmt5=connection.prepareStatement(querySelect5);
			ResultSet rs5=preparedStmt5.executeQuery();
			while(rs5.next()) {
				
				ChatBotJSON obj =new ChatBotJSON();
				obj.setOrigin(rs5.getString("origin"));
				originList.add(obj);
			}
			
			
			
			chatJSON.setOriginList(originList);

			chatJSON.setChatbotList(chatbotList);
			chatJSON.setCountryList(countryList);
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {
			DatabaseUtil.closeConnection(connection);
		}

		return chatJSON;

	}

	/*
	 * function for Selecting chat Bot list in Particular limit
	 */

	public static ChatBotJSON SelectChatBotData(ChatBotJSON json) {

		ArrayList<ChatBotJSON> chatbotList = new ArrayList<ChatBotJSON>();
		ArrayList<ChatBotJSON> countryList = new ArrayList<ChatBotJSON>();
		ArrayList<ChatBotJSON> originList = new ArrayList<ChatBotJSON>();
		ChatBotJSON chatJSON = new ChatBotJSON();
		Connection connection = null;
		try {
			connection = DatabaseUtil.getDBConnection();

			String querySelect3 = ChatbotQueryContants.SELECT_CHATBOT_DATA;
			PreparedStatement preparedStmt3 = connection.prepareStatement(querySelect3);
			preparedStmt3.setString(1, json.getFromDate());
			preparedStmt3.setString(2, json.getToDate());
			ResultSet rs3 = preparedStmt3.executeQuery();

			while (rs3.next()) {
				ChatBotJSON obj = new ChatBotJSON();
				obj.setEmailId(rs3.getString("EmailId"));
				obj.setMobileNo(rs3.getString("MobileNo"));
				obj.setUserName(rs3.getString("UserName"));
				obj.setSoftware(rs3.getString("Software"));
				obj.setHardware(rs3.getString("Hardware"));
				obj.setTrial(rs3.getString("Trial"));
				obj.setCountry(rs3.getString("Country"));
				obj.setDate(rs3.getString("Date"));
				obj.setCity(rs3.getString("City"));
				obj.setId(rs3.getString("Id"));
				obj.setOrigin(rs3.getString("Origin"));

				chatbotList.add(obj);
			}
			String querySelect4 = ChatbotQueryContants.SELECT_COUNTRY_LIST;
			PreparedStatement preparedStmt4 = connection.prepareStatement(querySelect4);
			ResultSet rs4 = preparedStmt4.executeQuery();

			while (rs4.next()) {
				ChatBotJSON obj = new ChatBotJSON();
				obj.setCountry(rs4.getString("Country"));
				countryList.add(obj);

			}
			String querySelect5 =ChatbotQueryContants.SELECT_ORIGIN_LIST;
			PreparedStatement preparedStmt5=connection.prepareStatement(querySelect5);
			ResultSet rs5=preparedStmt5.executeQuery();
			while(rs5.next()) {
				
				ChatBotJSON obj =new ChatBotJSON();
				obj.setOrigin(rs5.getString("origin"));
				originList.add(obj);
			}
			
			
			
			chatJSON.setOriginList(originList);

			chatJSON.setChatbotList(chatbotList);
			chatJSON.setCountryList(countryList);
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {
			DatabaseUtil.closeConnection(connection);
		}

		return chatJSON;

	}

	public static ChatBotJSON StoreChatBotFileName(ChatBotJSON json) {

		Connection connection = null;
		  
		String chatBotFileName=null;
		
	try {
		  
			connection = DatabaseUtil.getDBConnection();
		    System.out.println("companyid"+json.getCompanyId());
		 	String querySelect0=ChatbotQueryContants.SELECT_CHATBOT_FILENAME;
		 	PreparedStatement preparedStmt0 = connection.prepareStatement(querySelect0);
		    preparedStmt0.setString(1,json.getCompanyId());
		    ResultSet rs0=preparedStmt0.executeQuery();
		    while(rs0.next()) {
		    	chatBotFileName=rs0.getString("chatBotFileName");
		    }
		    System.out.println("chatbotfilename from DB"+chatBotFileName+json.getCompanyId());
		 	if(chatBotFileName==null) {
		 		
		 
		 		chatBotFileName=json.getChatBotFileName();
		 	ImportProductFileNew(chatBotFileName,json.getCompanyId());
		 	
		 	}else {
		 		
		 	
		 	int chatBotFileNameLength=chatBotFileName.split(",").length;
		 	
		 	
		 	if(chatBotFileNameLength>=5) {
		 		
		 		
		 		ArrayList<String> chatBotFileNames = new ArrayList<>(Arrays.asList(chatBotFileName.split(",")));      
		 		chatBotFileNames.remove(0) ;
		     
		 		
		 		chatBotFileNames.add(json.getChatBotFileName());
		 		
		     	String chatBotFileNameAsString = String.join(",", chatBotFileNames);
		       
		 		
		        
		        ImportProductFileNew(chatBotFileNameAsString,json.getCompanyId());
		    	
			    
		 	}else {
		 		
		 		
		 		ImportProductFileOld(json.getChatBotFileName(),json.getCompanyId());
		 		
		 	}
		 	
		 	
		 	}
		    
		   
	    	    connection.close();	    
	    	   
		} catch (SQLException e) {

		e.printStackTrace();
		}
	return json;
	}
	
	/*
	 * FUNCTION FOR STORING THE FILE NAME 
	 * IF FILENAME HAS NO VALUE YET 
	 * IF FILENAME LENGTH > 5
	 */
	private static void ImportProductFileNew(String chatBotFileName, String companyId) {
		
		Connection connection = null;
		
		try {
		  
			connection = DatabaseUtil.getDBConnection();
			System.out.println("new file");
			String querySelect1=ChatbotQueryContants.UPDATE_CHATBOT_FILENAME_WHOLE;
			PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
		    preparedStmt1.setString(1,chatBotFileName);
		    preparedStmt1.setString(2,companyId);
		    preparedStmt1.executeUpdate();	
		    connection.close();	
		    
		}catch (SQLException e) {

		e.printStackTrace();
		}
		
		}

	
	
	/*
	 * FUNCTION FOR STORING THE FILE NAME
	 *  IF FILE NAME HAS VALUE ALREADY
	 *  IF FILE NAME LENGTH < 2
	 */
	private static void ImportProductFileOld(String chatBotFileName, String companyId) {
		
		Connection connection = null;
		
		try {
		  
			connection = DatabaseUtil.getDBConnection();
			System.out.println("old file");
			String querySelect1=ChatbotQueryContants.UPDATE_CHATBOT_FILENAME;
			PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
		    preparedStmt1.setString(1,chatBotFileName);
		    preparedStmt1.setString(2,chatBotFileName);
		    preparedStmt1.setString(3,companyId);
		    preparedStmt1.executeUpdate();	
		    connection.close();	
		    
		}catch (SQLException e) {

		e.printStackTrace();
		}
		
		}

	public static void GetStoredChatBotFileName(ChatBotJSON json) {
		Connection connection = null;

		try {

			connection = DatabaseUtil.getDBConnection();
			String querySelect1 = ChatbotQueryContants.SELECT_CHATBOT_FILENAME;
			PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1, json.getCompanyId());
			ResultSet rs = preparedStmt1.executeQuery();
			while (rs.next()) {
				json.setChatBotFileName(rs.getString("chatBotFileName"));
			}

			connection.close();

		} catch (SQLException e) {

			e.printStackTrace();
		}
	}

	public static ArrayList<ChatBotJSON> UploadCustomerData(String companyId, JSONArray arr) throws JSONException {

		Connection connection = null;
		ArrayList<ChatBotJSON> xlList = new ArrayList<ChatBotJSON>();

		String name = "-";
		String emailId = "-";
		String mobileNo = "-";
		String software = "-";
		String hardware = "-";
		String city = "-";
		String country = "-";
		String origin = "-";
		String date="-";
		

		
		String mobileNoDB = null;
		int successRate = 0;
		int failureRate = 0;

		try {
			connection = DatabaseUtil.getDBConnection();

			for (int i = 0; i < arr.length(); i++) {

				name = "-";
				emailId = "-";
				mobileNo = "-";
				software = "-";
				hardware = "-";
				city = "-";
				country = "-";
				origin = "-";
				date="-";
				

			
				mobileNoDB = null;

				ExcelJSON xl = new ExcelJSON();
			
			
				// (json.has("status")
				if (arr.getJSONObject(i).has("Name")) {
					name = arr.getJSONObject(i).getString("Name");
				} else {
					name = "-";
				}
				if (arr.getJSONObject(i).has("EmailId")) {
					emailId = arr.getJSONObject(i).getString("EmailId");
				} else {
					emailId = "-";
				}
				if (arr.getJSONObject(i).has("MobileNo")) {
					mobileNo = arr.getJSONObject(i).getString("MobileNo");
				} else {
					mobileNo = "-";
				}
				if (arr.getJSONObject(i).has("Software")) {
					software = arr.getJSONObject(i).getString("Software");
				} else {
					software = "-";
				}
              if (arr.getJSONObject(i).has("Hardware")) {
					hardware = arr.getJSONObject(i).getString("Hardware");
				} else {
					hardware = "-";
				}
				
				if (arr.getJSONObject(i).has("City")) {
					city = arr.getJSONObject(i).getString("City");
				} else {
					city = "-";
				}

				if (arr.getJSONObject(i).has("Country")) {
					country = arr.getJSONObject(i).getString("Country");
				} else {
					country = "-";
				}

				if (arr.getJSONObject(i).has("Origin")) {
					origin = arr.getJSONObject(i).getString("Origin");
				} else {
					origin = "ChatBot";
				}
			
			/*	if (arr.getJSONObject(i).has("Date")) {
					date = arr.getJSONObject(i).getString("Date");
				} else {
					date = "-";
				}*/
			


			
		

					String querySelect=ChatbotQueryContants.Chatbot_Insert;
					PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
					preparedStmt.setString(1,name);
					preparedStmt.setString(2,emailId);
					preparedStmt.setString(3,mobileNo);
					preparedStmt.setString(4,software);
					preparedStmt.setString(5,hardware);
					preparedStmt.setString(6,city);
					preparedStmt.setString(7,country);
					preparedStmt.setString(8,origin);
				//	preparedStmt.setString(9,date);
					
					
					preparedStmt.executeUpdate();
						

					
			
			} // for loop close
			connection.close();

		} catch (SQLException e) {

			e.printStackTrace();
		}
		return xlList;
	}
}
