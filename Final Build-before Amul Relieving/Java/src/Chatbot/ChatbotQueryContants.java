package Chatbot;

public interface ChatbotQueryContants {
	String STORE_CHAT_BOT = "Insert into ChatBotTable (Date ,UserName ,EmailId ,MobileNo ,Software , Hardware ,Trial ,City,Country) Values(Now(), ? , ? , ?, ?, ?, ?, ?, ?)";

	String SELECT_CHATBOT_LIST = "Select * from ChatBotTable";

	String SELECT_CHATBOT_DATA = "Select * from ChatBotTable where Date(Date) Between ? and ?";

	String SELECT_COUNTRY_LIST = "select Distinct Country from ChatBotTable where country IS NOT NULL";

	String SELECT_ORIGIN_LIST = "select Distinct origin from ChatBotTable";

	
	String EMP_AUDIT_ROLE_NAME = "SELECT CONCAT(FirstName,' ',LastName) AS Name , Role from EmployeeTable WHERE EmployeeId = ? AND CompanyId = ? and Role != 'TAPropertier'  ";

	String STORE_MESSAGE_CENTER = "Insert into MessageCenterTable (CompanyId ,SuperiorId, Name ,Role, Type,SendTo,MessageSent,SMSCount) values( ? , ? , ? , ? , ? , ? ,? , ?) ";

	/* QUERY FOR FILE EXPORT PRODUCT (DOWNLOAD) */
	String SELECT_CHATBOT_FILENAME = "SELECT chatBotFileName FROM CompanyTable WHERE CompanyId = ? ";
	
	String UPDATE_CHATBOT_FILENAME_WHOLE = "UPDATE CompanyTable SET chatBotFileName = ? where companyId = ? ";

	String UPDATE_CHATBOT_FILENAME=" update CompanyTable set chatBotFileName = if(find_in_set(?,chatBotFileName),"
			+"chatBotFileName,   CONCAT(chatBotFileName, ',', ?)  )  where companyid= ? ";

	 String Chatbot_Insert ="insert into ChatBotTable(UserName,"
	 		+ "EmailId,MobileNo,Software,Hardware,"
	    		+ "City,Country,Origin"
	    		+ ")"
	    		+ " VALUES(?,?,?,?,?,?,?,?)";

}

