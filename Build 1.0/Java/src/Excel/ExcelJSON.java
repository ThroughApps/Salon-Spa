package Excel;

import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonInclude;

public class ExcelJSON {

	String customerFileName;
	String vendorFileName;
	String productFileName;
	String employeeFileName;
	String companyId;
	String customerName;
	String companyName;
	String contactNo;
	String address;
	String state;
	String alternateNo;
	String gstNo;
	String emailId;
	String emailIdDB;
	String mobileNoDB;
	String vendorName;
	String description;
	String productName;
	String staffName;
	String salary;
	String gender;
	String nationality;
	String dob;
	String roleName;
	
	
	

	ArrayList<ExcelJSON> returnXl = new ArrayList<ExcelJSON>();

	public String getCustomerFileName() {
		return customerFileName;
	}

	public void setCustomerFileName(String customerFileName) {
		this.customerFileName = customerFileName;
	}

	public String getCompanyId() {
		return companyId;
	}

	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}



	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getContactNo() {
		return contactNo;
	}

	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}



	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getAlternateNo() {
		return alternateNo;
	}

	public void setAlternateNo(String alternateNo) {
		this.alternateNo = alternateNo;
	}

	public String getGstNo() {
		return gstNo;
	}

	public void setGstNo(String gstNo) {
		this.gstNo = gstNo;
	}

	public String getEmailIdDB() {
		return emailIdDB;
	}

	public void setEmailIdDB(String emailIdDB) {
		this.emailIdDB = emailIdDB;
	}

	public String getMobileNoDB() {
		return mobileNoDB;
	}

	public void setMobileNoDB(String mobileNoDB) {
		this.mobileNoDB = mobileNoDB;
	}

	public ArrayList<ExcelJSON> getReturnXl() {
		return returnXl;
	}

	public void setReturnXl(ArrayList<ExcelJSON> returnXl) {
		this.returnXl = returnXl;
	}

	public String getVendorFileName() {
		return vendorFileName;
	}

	public void setVendorFileName(String vendorFileName) {
		this.vendorFileName = vendorFileName;
	}

	public String getVendorName() {
		return vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getProductFileName() {
		return productFileName;
	}

	public void setProductFileName(String productFileName) {
		this.productFileName = productFileName;
	}

	public String getEmployeeFileName() {
		return employeeFileName;
	}

	public void setEmployeeFileName(String employeeFileName) {
		this.employeeFileName = employeeFileName;
	}

	public String getStaffName() {
		return staffName;
	}

	public void setStaffName(String staffName) {
		this.staffName = staffName;
	}

	public String getSalary() {
		return salary;
	}

	public void setSalary(String salary) {
		this.salary = salary;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getNationality() {
		return nationality;
	}

	public void setNationality(String nationality) {
		this.nationality = nationality;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	
	
}
