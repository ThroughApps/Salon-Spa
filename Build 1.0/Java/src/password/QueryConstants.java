package password;

public interface QueryConstants {

	//----QUERY FOR FORGET PASSWORD ---//
	
	String VALID_MAILID="SELECT StaffId FROM StaffTable Where EmailId = ? or ContactNo = ?  ";
	
	String STORE_OTP="UPDATE StaffTable set Otp = ? where EmailId= ? or ContactNo = ?  ";
	
	String OTP_VERIFY="SELECT Otp,StaffId FROM StaffTable where EmailId= ?  ";
	  
	String UPADTE_NEW_PASSWORD="UPDATE StaffTable set Password = ? where EmailId= ? ";

	
}
