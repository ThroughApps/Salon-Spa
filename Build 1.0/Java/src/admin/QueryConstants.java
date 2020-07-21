package admin;

public interface QueryConstants {

	
	String Role_Insert ="insert into RoleTable(roleName,roleDate,companyId) VALUES(?,now(),?)";
	
	String Role_Report ="select roleId,roleName,roleDate from RoleTable where companyId=? ";
	
	String User_Insert ="insert into AdminAddUserTable(roleName,userName,email,password,companyId) VALUES(?,?,?,?,?)";
	
	String User_Report="select adminAddUserId,roleName,userName,email,password from AdminAddUserTable where companyId= ? ";
	
	String UPDATE_NEW_PASSWORD="UPDATE StaffTable set Password = ? where staffId=? and companyId = ? ";
	
	String Role_VERIFY="select roleName from RoleTable where roleName=? and companyId= ? ";
	 
	String Permission_Role_Insert ="insert into PermissionTable(roleName,companyId) VALUES(?,?)";
}
