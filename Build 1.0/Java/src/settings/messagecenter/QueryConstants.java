package settings.messagecenter;

public class QueryConstants {

	public static final String CUSTOMER_EMAIL_DETAILS = " SELECT CustomerName,CompanyName,Email FROM CustomerTable where status='0' and companyId= ? and  email!='abc@gmail.com' ";
	
	public static final String CUSTOMER_MESG_DETAILS = "SELECT CustomerName,CompanyName,contactNo FROM CustomerTable where status='0' and companyId=? ";

	static String STORE_MESSAGE_CENTER="Insert into MessageCenterTable (CompanyId ,SuperiorId, Name ,Role, Type,SendTo,MessageSent,SMSCount) values( ? , ? , ? , ? , ? , ? ,? , ?) ";

	static String EMP_MESSAGE_CENTER_REPORT="SELECT superiorId,Name,Role,Type,SendTo,MessageSent,date(date) as date,time(date) as time from MessageCenterTable where CompanyId = ? And   date(Date) BETWEEN ? AND ?";
	
	static String MSG_CENTER_COUNT="Select Sum(SMSCount) as  SMSCount from MessageCenterTable where CompanyId = ? And   date(Date) BETWEEN ? AND ?";
	
	static String Config_Settings = "Update CompanyTable set configValue= ? where companyId = ? ";
	static String Toggle_Settings = "Update CompanyTable set toggleValue= ? where companyId = ? ";
	
	static String Update_RewardRedeemPoints="Update CompanyTable set rewardAmount=?,rewardPoint=?,maxRewardLimit=?,"
			+ "expiryDuration=?,redeemAmount=?,redeemPoint=?,minRedeemRewardPoint=? where companyId = ?";
	

}
