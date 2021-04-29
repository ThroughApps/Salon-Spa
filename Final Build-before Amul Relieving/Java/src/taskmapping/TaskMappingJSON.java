package taskmapping;

import java.util.ArrayList;





public class TaskMappingJSON {
	private String roleName;
	private String permission;
	private String authorization;
	private String companyId;
	private int avoidAttendance=2;
	private int supervisorAuthority=2;
	private ArrayList<TaskMappingJSON> roleRetrievelist;
	private ArrayList<TaskMappingJSON> employeePermisionlist;
	private ArrayList<TaskMappingJSON> permisionlist;
	private ArrayList<TaskMappingJSON> headerPermissionList;
	private ArrayList<TaskMappingJSON> permissionList;	
	private String permissionHeader;
	private String employeeName;
	private String role;
	private String staffId;
	
	
	
	
	
	public String getEmployeeName() {
		return employeeName;
	}
	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getStaffId() {
		return staffId;
	}
	public void setStaffId(String staffId) {
		this.staffId = staffId;
	}
	public ArrayList<TaskMappingJSON> getPermissionList() {
		return permissionList;
	}
	public void setPermissionList(ArrayList<TaskMappingJSON> permissionList) {
		this.permissionList = permissionList;
	}
	public String getPermissionHeader() {
		return permissionHeader;
	}
	public void setPermissionHeader(String permissionHeader) {
		this.permissionHeader = permissionHeader;
	}
	public ArrayList<TaskMappingJSON> getHeaderPermissionList() {
		return headerPermissionList;
	}
	public void setHeaderPermissionList(ArrayList<TaskMappingJSON> headerPermissionList) {
		this.headerPermissionList = headerPermissionList;
	}
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	public ArrayList<TaskMappingJSON> getPermisionlist() {
		return permisionlist;
	}
	public void setPermisionlist(ArrayList<TaskMappingJSON> permisionlist) {
		this.permisionlist = permisionlist;
	}
	public int getAvoidAttendance() {
		return avoidAttendance;
	}
	public void setAvoidAttendance(int avoidAttendance) {
		this.avoidAttendance = avoidAttendance;
	}
	public String getAuthorization() {
		return authorization;
	}
	public void setAuthorization(String authorization) {
		this.authorization = authorization;
	}
	public int getSupervisorAuthority() {
		return supervisorAuthority;
	}
	public void setSupervisorAuthority(int supervisorAuthority) {
		this.supervisorAuthority = supervisorAuthority;
	}
	public String getPermission() {
		return permission;
	}
	public void setPermission(String permission) {
		this.permission = permission;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public ArrayList<TaskMappingJSON> getRoleRetrievelist() {
		return roleRetrievelist;
	}
	public void setRoleRetrievelist(ArrayList<TaskMappingJSON> roleRetrievelist) {
		this.roleRetrievelist = roleRetrievelist;
	}
	public ArrayList<TaskMappingJSON> getEmployeePermisionlist() {
		return employeePermisionlist;
	}
	public void setEmployeePermisionlist(ArrayList<TaskMappingJSON> employeePermisionlist) {
		this.employeePermisionlist = employeePermisionlist;
	}
	
	

}
