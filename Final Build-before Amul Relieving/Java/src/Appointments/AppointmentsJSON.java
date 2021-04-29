package Appointments;

import java.util.ArrayList;
import java.util.List;

public class AppointmentsJSON {

	String companyId;
	String companyName;
	String serviceName;
	String serviceRate;
	String productId;
	String employeeName;
	String employeeId;
	String mobileNo;
	String customerName;
	String gender;
	String appointmentDate;
	String bookingDate;
	String appointmentTime;
	String service;
	String employeedetails;
	String appointmentBy;
	String modeofAppointment;
	String response;
	String appointmentId;
	String updateArray;
	String deleteArray;
	String date;
	String serviceTime;
	String appointmentEndTime;
	String getDataType;
	String fromDate;
	String toDate;
	String acceptrejectStatus;
	String status;
	String description;
	String currentDate;
	
	List<AppointmentsJSON>saloonDetails=new ArrayList<AppointmentsJSON>();
	List<AppointmentsJSON>serviceDetails=new ArrayList<AppointmentsJSON>();
	List<AppointmentsJSON>employeeDetails=new ArrayList<AppointmentsJSON>();
	List<AppointmentsJSON>appointmentDetails=new ArrayList<AppointmentsJSON>();
	
	
	
	
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getServiceName() {
		return serviceName;
	}
	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}
	public String getServiceRate() {
		return serviceRate;
	}
	public void setServiceRate(String serviceRate) {
		this.serviceRate = serviceRate;
	}
	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
	}
	public String getEmployeeName() {
		return employeeName;
	}
	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}
	public String getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}
	public List<AppointmentsJSON> getSaloonDetails() {
		return saloonDetails;
	}
	public void setSaloonDetails(List<AppointmentsJSON> saloonDetails) {
		this.saloonDetails = saloonDetails;
	}
	public List<AppointmentsJSON> getServiceDetails() {
		return serviceDetails;
	}
	public void setServiceDetails(List<AppointmentsJSON> serviceDetails) {
		this.serviceDetails = serviceDetails;
	}
	public List<AppointmentsJSON> getEmployeeDetails() {
		return employeeDetails;
	}
	public void setEmployeeDetails(List<AppointmentsJSON> employeeDetails) {
		this.employeeDetails = employeeDetails;
	}
	public String getMobileNo() {
		return mobileNo;
	}
	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getAppointmentDate() {
		return appointmentDate;
	}
	public void setAppointmentDate(String appointmentDate) {
		this.appointmentDate = appointmentDate;
	}
	public String getBookingDate() {
		return bookingDate;
	}
	public void setBookingDate(String bookingDate) {
		this.bookingDate = bookingDate;
	}
	public String getAppointmentTime() {
		return appointmentTime;
	}
	public void setAppointmentTime(String appointmentTime) {
		this.appointmentTime = appointmentTime;
	}
	public String getService() {
		return service;
	}
	public void setService(String service) {
		this.service = service;
	}
	public String getEmployeedetails() {
		return employeedetails;
	}
	public void setEmployeedetails(String employeedetails) {
		this.employeedetails = employeedetails;
	}
	public String getAppointmentBy() {
		return appointmentBy;
	}
	public void setAppointmentBy(String appointmentBy) {
		this.appointmentBy = appointmentBy;
	}
	public String getModeofAppointment() {
		return modeofAppointment;
	}
	public void setModeofAppointment(String modeofAppointment) {
		this.modeofAppointment = modeofAppointment;
	}
	public String getResponse() {
		return response;
	}
	public void setResponse(String response) {
		this.response = response;
	}
	public String getAppointmentId() {
		return appointmentId;
	}
	public void setAppointmentId(String appointmentId) {
		this.appointmentId = appointmentId;
	}
	public String getUpdateArray() {
		return updateArray;
	}
	public void setUpdateArray(String updateArray) {
		this.updateArray = updateArray;
	}
	public String getDeleteArray() {
		return deleteArray;
	}
	public void setDeleteArray(String deleteArray) {
		this.deleteArray = deleteArray;
	}
	public List<AppointmentsJSON> getAppointmentDetails() {
		return appointmentDetails;
	}
	public void setAppointmentDetails(List<AppointmentsJSON> appointmentDetails) {
		this.appointmentDetails = appointmentDetails;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getServiceTime() {
		return serviceTime;
	}
	public void setServiceTime(String serviceTime) {
		this.serviceTime = serviceTime;
	}
	public String getAppointmentEndTime() {
		return appointmentEndTime;
	}
	public void setAppointmentEndTime(String appointmentEndTime) {
		this.appointmentEndTime = appointmentEndTime;
	}
	public String getGetDataType() {
		return getDataType;
	}
	public void setGetDataType(String getDataType) {
		this.getDataType = getDataType;
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
	public String getAcceptrejectStatus() {
		return acceptrejectStatus;
	}
	public void setAcceptrejectStatus(String acceptrejectStatus) {
		this.acceptrejectStatus = acceptrejectStatus;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getCurrentDate() {
		return currentDate;
	}
	public void setCurrentDate(String currentDate) {
		this.currentDate = currentDate;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
