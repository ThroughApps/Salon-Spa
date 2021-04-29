package settings.messagecenter;

import java.sql.Connection;




import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;



import DBUtil.DatabaseUtil;
import master.MasterDao;



public class MailLogic {

	/*
	 * FUNCTION FOR GETTING CUSTOMER LIST FOR MAILING
	 */
	public static ArrayList<MailJSON> SelectMailCustomerList(MailJSON json) {
		Connection connection=null;
		ArrayList <MailJSON> customerList=new ArrayList <MailJSON>();
		
		
		try {
			connection=DatabaseUtil.getDBConnection();
			String querySelect=QueryConstants.CUSTOMER_EMAIL_DETAILS;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getCompanyId());
			ResultSet rs=preparedStmt.executeQuery();
			while(rs.next()) {
				
				MailJSON mailData=new MailJSON();
				mailData.setCustomerName(rs.getString("CustomerName"));
				mailData.setCompanyName(rs.getString("CompanyName"));
				mailData.setEmailId(rs.getString("Email"));
				customerList.add(mailData); 

			}
			
			
			
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return customerList;
	}

	/*
	 * FUNCTION FOR GETTING CUSTOMER LIST FOR MESSAGING
	 */
	public static ArrayList<MailJSON> SelectMessageCustomerList(MailJSON json) {
		Connection connection=null;
		ArrayList <MailJSON> customerList=new ArrayList <MailJSON>();
		
		
		try {
			connection=DatabaseUtil.getDBConnection();
			String querySelect=QueryConstants.CUSTOMER_MESG_DETAILS;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getCompanyId());
			ResultSet rs=preparedStmt.executeQuery();
			while(rs.next()) {
				
				MailJSON mobileData=new MailJSON();
				mobileData.setCustomerName(rs.getString("CustomerName"));
				mobileData.setCompanyName(rs.getString("CompanyName"));
				mobileData.setContactNo(rs.getString("contactNo"));
				customerList.add(mobileData); 

			}
			
			
			
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return customerList;

	}

	public MailJSON MessageCenterReportDisplay(MailJSON json) {
		ArrayList<MailJSON> MessageCenterReportList = new ArrayList<MailJSON>();	
	
		MailJSON res=new MailJSON();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.EMP_MESSAGE_CENTER_REPORT;
		
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getCompanyId());
			preparedStmt.setString(2,json.getFromDate());
			preparedStmt.setString(3,json.getToDate());
			//preparedStmt.setString(2,details.getDate());
			
	        ResultSet rs=preparedStmt.executeQuery();
	               
	        while(rs.next())
	        {
	        	MailJSON employeeRetrieveobj = new MailJSON();
	        	employeeRetrieveobj.setSuperiorId(rs.getString("SuperiorId"));
	        	employeeRetrieveobj.setName(rs.getString("Name"));
	        	employeeRetrieveobj.setRole(rs.getString("Role"));
	        	employeeRetrieveobj.setType(rs.getString("Type"));
	        	employeeRetrieveobj.setSendTo(rs.getString("SendTo"));
	        	employeeRetrieveobj.setMessageSent(rs.getString("MessageSent"));  
	        	employeeRetrieveobj.setDate(rs.getString("Date"));
	        	employeeRetrieveobj.setTime(rs.getString("Time"));
	      
	        	MessageCenterReportList.add(employeeRetrieveobj);
	        }
	        
	        res.setMessageCenterReportList(MessageCenterReportList);
	        String querySelect2=QueryConstants.MSG_CENTER_COUNT;
	  				
	  					PreparedStatement preparedStmt2= connection.prepareStatement(querySelect2);
	  					preparedStmt2.setString(1,json.getCompanyId());
	  					preparedStmt2.setString(2,json.getFromDate());
	  					preparedStmt2.setString(3,json.getToDate());
	  					//preparedStmt.setString(2,details.getDate());
	  					
	  			        ResultSet rs3=preparedStmt2.executeQuery();
	  			        while(rs3.next())
	  			        {  
	  			        	res.setMsgCount(rs3.getInt("SMSCount"));
	  			        }
	  			     
	    
	         connection.close();  
	        } catch (SQLException e)
	        {
	        e.printStackTrace();
	        }
	         	
		   finally {
			
		}
	        
		   return res;
		
    }

	public MailJSON ConfigValueSettings(MailJSON json) {
		
		Connection connection = null;
	
		try {
		
			connection =DatabaseUtil.getDBConnection();
			String querySelect2 = QueryConstants.Config_Settings;
			PreparedStatement preparedStmt2 = connection.prepareStatement(querySelect2);
			preparedStmt2.setInt(1, json.getConfigValue());
			preparedStmt2.setString(2, json.getCompanyId());

			
			preparedStmt2.executeUpdate();
		
			
			MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), "-","-","Config Value Updated",json.getCompanyId());
			connection.close();
		} catch (SQLException e) {

			e.printStackTrace();
		}

		return json;
	}
	
	public MailJSON toggleValueSettings(MailJSON json) {
		
		Connection connection = null;
	
		try {
			
			connection =DatabaseUtil.getDBConnection();
			String querySelect2 = QueryConstants.Config_Settings;
			PreparedStatement preparedStmt2 = connection.prepareStatement(querySelect2);
			preparedStmt2.setInt(1, json.getToggleValue());
			preparedStmt2.setString(2, json.getCompanyId());

			
			preparedStmt2.executeUpdate();
		
			
			connection.close();
		} catch (SQLException e) {

			e.printStackTrace();
		}

		return json;
	}

	public MailJSON RewardRedeemPoints(MailJSON json) {
		// TODO Auto-generated method stub
		Connection connection =null;
		try {
			connection=DatabaseUtil.getDBConnection();
			
			String RewardRedeemPointsQuery=QueryConstants.Update_RewardRedeemPoints;
			PreparedStatement preparestmnt=connection.prepareStatement(RewardRedeemPointsQuery);
			preparestmnt.setString(1, json.getRewardAmount());
			preparestmnt.setString(2, json.getRewardPoint());
			preparestmnt.setString(3, json.getMaxRewardLimit());
			preparestmnt.setString(4, json.getExpiryDuration());
			preparestmnt.setString(5, json.getRedeemAmount());
			preparestmnt.setString(6, json.getRedeemPoint());
			preparestmnt.setString(7, json.getMinRedeemRewardPoint());
			preparestmnt.setString(8, json.getCompanyId());
			preparestmnt.executeUpdate();
			MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), "-","-","Reward Redeem Configuration Updated",json.getCompanyId());
			connection.close();
		
		}
		catch(SQLException e){
			e.printStackTrace();
		}
		return json;
	}

}
