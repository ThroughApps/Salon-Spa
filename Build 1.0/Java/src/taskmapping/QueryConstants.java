package taskmapping;

public interface QueryConstants {
	
    
	 String ROLE_PERMISSION="SELECT Permission FROM PermissionTable where roleName = ? and companyId= ? "; 
	
	 
	 String EMP_SET_PERMISSION="UPDATE PermissionTable SET Permission =? WHERE roleName = ? and companyId= ? ";
	

	  String ROLE_PERMISSION_NEW="SELECT HeaderPermission,Permission FROM PermissionTable where roleName = ? And CompanyId = ? ";
		
	  String EMP_SET_PERMISSION_NEW="UPDATE PermissionTable SET Permission = ?, HeaderPermission = ? WHERE roleName = ? And CompanyId = ? ";
		 

}
