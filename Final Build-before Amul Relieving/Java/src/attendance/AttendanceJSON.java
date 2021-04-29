package attendance;

import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonInclude;

public class AttendanceJSON {
	private String staffId;
	private String date;
	private String staffName;
	private String status;
	private String contactNo;
	private String address;
	private String designation;
	private String salary;
	private String attendArray;
	private String fromDate;
	private String toDate;
	private String roleName;
	private String companyId;
	
	private ArrayList<AttendanceJSON> staffRetrievelist;
	private ArrayList<AttendanceJSON> staffsIdlist;
	
	
	
	
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public String getStaffId() {
		return staffId;
	}
	public void setStaffId(String staffId) {
		this.staffId = staffId;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getStaffName() {
		return staffName;
	}
	public void setStaffName(String staffName) {
		this.staffName = staffName;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getContactNo() {
		return contactNo;
	}
	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getDesignation() {
		return designation;
	}
	public void setDesignation(String designation) {
		this.designation = designation;
	}
	public String getSalary() {
		return salary;
	}
	public void setSalary(String salary) {
		this.salary = salary;
	}
	public ArrayList<AttendanceJSON> getStaffRetrievelist() {
		return staffRetrievelist;
	}
	public void setStaffRetrievelist(ArrayList<AttendanceJSON> staffRetrievelist) {
		this.staffRetrievelist = staffRetrievelist;
	}
	public ArrayList<AttendanceJSON> getStaffsIdlist() {
		return staffsIdlist;
	}
	public void setStaffsIdlist(ArrayList<AttendanceJSON> staffsIdlist) {
		this.staffsIdlist = staffsIdlist;
	}
	public String getAttendArray() {
		return attendArray;
	}
	public void setAttendArray(String attendArray) {
		this.attendArray = attendArray;
	}
	public String getFromDate() {
		return fromDate;
	}
	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}
	public String getToDate() {
		return toDate;
	}
	public void setToDate(String toDate) {
		this.toDate = toDate;
	}
	
	
	
	
	
	
	

}
