package password;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;


import DBUtil.DatabaseUtil;



public class PasswordLogic {

	/*
	 * verifying where EmailID is Valid 
	 */
	
	public static int vaildmailid(PasswordJSON json) {
		
		int flag=1;//false
		Connection connection=null;
		
		try {
			connection=DatabaseUtil.getDBConnection();
			String querySelect=QueryConstants.VALID_MAILID;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1, json.getEmailId());
			preparedStmt.setString(2, json.getEmailId());
			
	        ResultSet result=preparedStmt.executeQuery();
	       
	        if(result.next()) {
	        		        	flag=0; //set the flag value 0 if it is valid email id otherwise it return 1 means invalid
	        	
	        }
	        connection.close();
		} catch (Exception e) {
			e.printStackTrace();
		  }finally {
			  DatabaseUtil.closeConnection(connection);
		    }
	        
	     return flag;   
    }
	
	/*
	 * Storing OTP in database
	 */

	public static void storeOtp(String to,int otp)
	{
		Connection connection=null;
		try {
			connection=DatabaseUtil.getDBConnection();
			String querySelect=QueryConstants.STORE_OTP;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setInt(1, otp);
			preparedStmt.setString(2, to);
			preparedStmt.setString(3, to);
			
			
			preparedStmt.executeUpdate();
			connection.close();
		}
		catch (Exception e) {
					e.printStackTrace();
				} finally {
					DatabaseUtil.closeConnection(connection);
				}	
		}
	
	

/*
 * OTP verification 
 */
public static PasswordJSON otpVerify(PasswordJSON json){
    Connection connection=null;
	int flag=1;
	String employeeId;
	String companyId;
	try {
		connection =DatabaseUtil.getDBConnection();
		String querySelect=QueryConstants.OTP_VERIFY;
		PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
	    preparedStmt.setString(1, json.getEmailId());
	   
	    ResultSet result=preparedStmt.executeQuery();
        while(result.next()) {
        	int Otp=result.getInt("OTP");
        	json.setStaffId(result.getString("StaffId"));
        	if((Otp==json.getOtp())) {
        		flag=0;  //set the flag value 0 if the entered otp is correct
        	   json.setOtp(flag);
        		break;
        	}

        }
        connection.close();
	}catch (Exception e) {
		e.printStackTrace();
	} finally {
		DatabaseUtil.closeConnection(connection);
	}
        
     return json;   
}
	
/*
 * Updating the new password in database
 */
	
public static int updatePassword(PasswordJSON  json)
{   
	int flag=1;
	Connection connection=null;
	try {
		connection=DatabaseUtil.getDBConnection();
		String querySelect=QueryConstants.UPADTE_NEW_PASSWORD;
		PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
		preparedStmt.setString(1, json.getPassword());
		preparedStmt.setString(2, json.getEmailId());
	
		preparedStmt.executeUpdate();
		
		connection.close();
	
	}
	catch (Exception e) {
			e.printStackTrace();
	} finally {
		DatabaseUtil.closeConnection(connection);
	}	
	return flag;
}
	
}
