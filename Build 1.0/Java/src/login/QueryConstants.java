package login;

public interface QueryConstants {

	String LOGIN_VERIFY = "SELECT staffId,roleName,companyId,password,staffName FROM StaffTable WHERE ( EmailId = ? OR contactNo = ? )  ";
	
	 String ROLE_PERMISSION="SELECT Permission,HeaderPermission FROM PermissionTable where roleName = ? and companyId = ?";
	 String Bank_Details="Select bankName,branchName,accountNo,ifscCode,accountName from BankTable where status='0' and companyId= ? limit 1";
	 String EMP_LIST="SELECT DISTINCT staffId,staffName FROM StaffTable where companyId= ? and status='0' order by staffName asc "; 
	 String Ven_LIST="SELECT DISTINCT vendorId,vendorName FROM VendorTable where companyId= ? and status='0'  order by vendorName asc "; 
	 String Cus_LIST="SELECT DISTINCT customerId,customerName FROM CustomerTable where companyId= ? and status='0' order by customerName asc   "; 
	 String Cat_LIST="SELECT DISTINCT categoryId,categoryName FROM Category where companyId= ? and status='0' order by categoryName asc "; 
	 String User_Report="select userId,userName,contactNo,description from UserTable where status='0' and companyId= ?  order by userName asc ";
	 
	 String EMP_GET_ROLE="SELECT DISTINCT roleName FROM RoleTable where companyid=? ";  
	   
	 String Select_CompanyAddress="SELECT address FROM StaffTable where staffId = '1' ";

	 String companyName="SELECT companyName,licenseKey,status,fromdate,todate,"
	 		+ "companyAddress,emailId,contactNo,doorNo,street,city,floor,place,staffName,"
	 		+ "landlineNo,feedbackNo,configValue,gstNo,fileName,toggleValue,"
	 		+ "rewardAmount,rewardPoint,maxRewardLimit,expiryDuration,"
	 		+ "redeemPoint,redeemAmount,minRedeemRewardPoint,zipCode,area,plan FROM CompanyTable where companyId = ?";

	 
	 String UPDATE_ACTIVE="UPDATE CompanyTable set status='active' where companyId= ? " ;
	 
	 String UPDATE_EXPIRED="UPDATE CompanyTable set status='expired' where companyId= ? "  ;
	 
	 String Status_Update="UPDATE CompanyTable set status= 'active' where companyId = ? ";
	 
	 String VALID_MAILID="SELECT staffName FROM StaffTable Where EmailId = ? or contactNo = ?";
	
	 String LOGO_VERIFY = "SELECT FileName FROM CompanyTable WHERE companyId= ?  ";
	 
	 String  File_Insert="UPDATE CompanyTable set FileName = ? where companyId= ?";

		
}

