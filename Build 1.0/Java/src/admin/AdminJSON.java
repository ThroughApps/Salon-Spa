package admin;

import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonInclude;

public class AdminJSON {
	private String roleName;
	private String roleDate;
	private String userName;
	private String email;
	private String password;
	private String id;
	private String roleId;
	private ArrayList<AdminJSON> roleRetrievelist;
	private ArrayList<AdminJSON> userRetrievelist;
	private String adminAddUserId;
	private String staffId;
	private String date;
	private String companyId;
	private String role;
	private String employeeName;
	
	
	

	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getEmployeeName() {
		return employeeName;
	}
	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getStaffId() {
		return staffId;
	}
	public void setStaffId(String staffId) {
		this.staffId = staffId;
	}
	public String getRoleId() {
		return roleId;
	}
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
	public String getAdminAddUserId() {
		return adminAddUserId;
	}
	public void setAdminAddUserId(String adminAddUserId) {
		this.adminAddUserId = adminAddUserId;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	
	public String getRoleDate() {
		return roleDate;
	}
	public void setRoleDate(String roleDate) {
		this.roleDate = roleDate;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public ArrayList<AdminJSON> getRoleRetrievelist() {
		return roleRetrievelist;
	}
	public void setRoleRetrievelist(ArrayList<AdminJSON> roleRetrievelist) {
		this.roleRetrievelist = roleRetrievelist;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public ArrayList<AdminJSON> getUserRetrievelist() {
		return userRetrievelist;
	}
	public void setUserRetrievelist(ArrayList<AdminJSON> userRetrievelist) {
		this.userRetrievelist = userRetrievelist;
	}
	
	
}
