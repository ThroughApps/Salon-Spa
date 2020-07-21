package ExcelDownload;

import java.time.LocalDate;
import java.util.ArrayList;


import ReportsPaging.ReportsPagingJSON;


public class ExcelDownloadJSON {

	private String employeeId;
	private String firstName;
	private String lastName;
	private String dob;
	private String emailId;
//	private Long mobileNo;
	private String address;
	private String employeeType;
	private String role;
	private String department;
	private String proofType;
	private String proofNo;
	private String fromDate;
	private String toDate;
	private String employeeName;
	private String search;
	private String date;
	private String companyId;
	private String authorizedBy;
	private String reportingManagerId;
	private String reportingManagerRole;
	private String reportingManagerName;
	private String superiorId;
	private String fingerPrint;
	private int absentCount;
	private String qualification;
	private String gender;
	private String maritialStatus;
	private String doj;
	private String doexp;
	private String salary;
	private String contactNo;
	private LocalDate fromDate1;
	private LocalDate toDate1;
	private String supervisor;
	private String description;
	String baseLocation;
	String workLocation;
	String baseSite;
	String baseArea;
	String workSite;
	String workArea;
	int totalItemCount;
	int totlaItemCount;
	
	String name;
	String checkinTime;
	String checkoutTime;
	String totalWorkHour="-";
	String status="-";
	String EmployeeName;
	String operation;
	String time;
	int permanentCountLeave;
	int temporaryCountLeave;
	int contractCountLeave;
	int noOfDaysLeave;
	String checkinLocation;
	String checkoutLocation;
	String type;
	String sendTo;
	String MessageSent;
	String checkInOutTimings;
	String category;
	String checkInReason="-";
	String checkOutReason="-";
	int dataCount;
	String mobileNo;
	
	
	private String organizationName;
	private String biometric;
	private String sms;
	private String rfid;
	private String deviceId;
	private String deviceKey;
	private String onlineTime;
	private String offlineTime;
	private String keyStatus;
	private String deviceStatus;
	private String activeStatus;
	private String deactivatedTime;
	private int trackLocation;
	private String locationName;
	private String latLongArray;
	private String empDeviceKey;
	private String shiftLoop;
	private String timingsLoop;
	private String descriptionLoop;
	private String workLocationLoop;
	
	private String shiftDescription;
	
	
	private int checkInOutCount=0;
	private int smsCount=0;
	private ArrayList<ExcelDownloadJSON> employeeRetrievelist ;
	//private ArrayList<ExcelDownloadJSON> prevShiftList ;
	

	private String vehicleName;
	private String vehicleNumber;
	private String oldVehicleName;
	private String oldVehicleNumber;
	private ArrayList<ExcelDownloadJSON> vehicleList;
	double latitude = 0.0;
	double longitude = 0.0;
	String location;
	String startLocation;
	String endLocation;
	String startTime;
	String endTime;
	String totalHr;
	String endDate;
	String tripNo; 
	String VehicleName;
	String TripStartTime;
	String TripStartLocation;
	String TripEndTime;
	String TripEndLocation;
	String TotalTripTime;
	
	
	String shift;
	String previousLocation;
	String currentLocation;
	String month;
	String year;
	String previousMonth;
	String previousYear;
	private String empCode;
	private String grade;
	private String shiftSuperVisorId;
	private String shiftType;
	private String startDate;
	private String shiftSupervisorName;
	
	ArrayList<ExcelDownloadJSON> prevShiftList = new ArrayList<ExcelDownloadJSON>();
	ArrayList<ExcelDownloadJSON> shiftList = new ArrayList<ExcelDownloadJSON>();

	ArrayList<ReportsPagingJSON> allShiftGrade = new ArrayList<ReportsPagingJSON>();
	ArrayList<ReportsPagingJSON> allShiftDetails = new ArrayList<ReportsPagingJSON>();
	ArrayList<ExcelDownloadJSON> vacancyReportlist = new ArrayList<ExcelDownloadJSON>();
	ArrayList<ExcelDownloadJSON> expiredShiftReportListExcel=new ArrayList<ExcelDownloadJSON>();
	ArrayList<ExcelDownloadJSON> deletedShiftReportListExcel=new ArrayList<ExcelDownloadJSON>();
	ArrayList<ExcelDownloadJSON> scheduledShiftReportListExcel=new ArrayList<ExcelDownloadJSON>();
	

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getWorkLocationLoop() {
		return workLocationLoop;
	}

	public void setWorkLocationLoop(String workLocationLoop) {
		this.workLocationLoop = workLocationLoop;
	}

	public String getShiftLoop() {
		return shiftLoop;
	}

	public void setShiftLoop(String shiftLoop) {
		this.shiftLoop = shiftLoop;
	}

	public String getTimingsLoop() {
		return timingsLoop;
	}

	public void setTimingsLoop(String timingsLoop) {
		this.timingsLoop = timingsLoop;
	}

	public String getDescriptionLoop() {
		return descriptionLoop;
	}

	public void setDescriptionLoop(String descriptionLoop) {
		this.descriptionLoop = descriptionLoop;
	}

	public String getShiftDescription() {
		return shiftDescription;
	}

	public void setShiftDescription(String shiftDescription) {
		this.shiftDescription = shiftDescription;
	}


	public ArrayList<ExcelDownloadJSON> getScheduledShiftReportListExcel() {
		return scheduledShiftReportListExcel;
	}

	public void setScheduledShiftReportListExcel(ArrayList<ExcelDownloadJSON> scheduledShiftReportListExcel) {
		this.scheduledShiftReportListExcel = scheduledShiftReportListExcel;
	}

	public String getShiftType() {
		return shiftType;
	}

	public void setShiftType(String shiftType) {
		this.shiftType = shiftType;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	

	public String getSupervisor() {
		return supervisor;
	}

	public void setSupervisor(String supervisor) {
		this.supervisor = supervisor;
	}

	public ArrayList<ExcelDownloadJSON> getExpiredShiftReportListExcel() {
		return expiredShiftReportListExcel;
	}

	public void setExpiredShiftReportListExcel(ArrayList<ExcelDownloadJSON> expiredShiftReportListExcel) {
		this.expiredShiftReportListExcel = expiredShiftReportListExcel;
	}

	public ArrayList<ExcelDownloadJSON> getDeletedShiftReportListExcel() {
		return deletedShiftReportListExcel;
	}

	public void setDeletedShiftReportListExcel(ArrayList<ExcelDownloadJSON> deletedShiftReportListExcel) {
		this.deletedShiftReportListExcel = deletedShiftReportListExcel;
	}

	public ArrayList<ExcelDownloadJSON> getVacancyReportlist() {
		return vacancyReportlist;
	}

	public void setVacancyReportlist(ArrayList<ExcelDownloadJSON> vacancyReportlist) {
		this.vacancyReportlist = vacancyReportlist;
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

	public LocalDate getToDate1() {
		return toDate1;
	}

	public void setToDate1(String toDate1) {
		this.toDate1 =  LocalDate.parse(toDate1);
	}

	public LocalDate getFromDate1() {
		return fromDate1;
	}

	public void setFromDate1(String fromDate1) {
		this.fromDate1 = LocalDate.parse(fromDate1);
	}

	public String getEmpCode() {
		return empCode;
	}
	public void setEmpCode(String empCode) {
		this.empCode = empCode;
	}
	public String getGrade() {
		return grade;
	}
	public void setGrade(String grade) {
		this.grade = grade;
	}

	public String getShiftSupervisorName() {
		return shiftSupervisorName;
	}
	public void setShiftSupervisorName(String shiftSupervisorName) {
		this.shiftSupervisorName = shiftSupervisorName;
	}
	public String getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getDob() {
		return dob;
	}
	public void setDob(String dob) {
		this.dob = dob;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getShiftSuperVisorId() {
		return shiftSuperVisorId;
	}
	public void setShiftSuperVisorId(String shiftSuperVisorId) {
		this.shiftSuperVisorId = shiftSuperVisorId;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getEmployeeType() {
		return employeeType;
	}
	public void setEmployeeType(String employeeType) {
		this.employeeType = employeeType;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getProofType() {
		return proofType;
	}
	public void setProofType(String proofType) {
		this.proofType = proofType;
	}
	public String getProofNo() {
		return proofNo;
	}
	public void setProofNo(String proofNo) {
		this.proofNo = proofNo;
	}


	public String getEmployeeName() {
		return employeeName;
	}
	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}
	public String getSearch() {
		return search;
	}
	public void setSearch(String search) {
		this.search = search;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	public String getAuthorizedBy() {
		return authorizedBy;
	}
	public void setAuthorizedBy(String authorizedBy) {
		this.authorizedBy = authorizedBy;
	}
	public String getReportingManagerId() {
		return reportingManagerId;
	}
	public void setReportingManagerId(String reportingManagerId) {
		this.reportingManagerId = reportingManagerId;
	}
	public String getReportingManagerRole() {
		return reportingManagerRole;
	}
	public void setReportingManagerRole(String reportingManagerRole) {
		this.reportingManagerRole = reportingManagerRole;
	}
	public String getReportingManagerName() {
		return reportingManagerName;
	}
	public void setReportingManagerName(String reportingManagerName) {
		this.reportingManagerName = reportingManagerName;
	}
	public String getSuperiorId() {
		return superiorId;
	}
	public void setSuperiorId(String superiorId) {
		this.superiorId = superiorId;
	}
	public String getFingerPrint() {
		return fingerPrint;
	}
	public void setFingerPrint(String fingerPrint) {
		this.fingerPrint = fingerPrint;
	}
	public int getAbsentCount() {
		return absentCount;
	}
	public void setAbsentCount(int absentCount) {
		this.absentCount = absentCount;
	}
	public String getQualification() {
		return qualification;
	}
	public void setQualification(String qualification) {
		this.qualification = qualification;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getMaritialStatus() {
		return maritialStatus;
	}
	public void setMaritialStatus(String maritialStatus) {
		this.maritialStatus = maritialStatus;
	}
	public String getDoj() {
		return doj;
	}
	public void setDoj(String doj) {
		this.doj = doj;
	}
	public String getDoexp() {
		return doexp;
	}
	public void setDoexp(String doexp) {
		this.doexp = doexp;
	}
	public String getSalary() {
		return salary;
	}
	public void setSalary(String salary) {
		this.salary = salary;
	}
	public String getContactNo() {
		return contactNo;
	}
	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}
	public String getBaseLocation() {
		return baseLocation;
	}
	public void setBaseLocation(String baseLocation) {
		this.baseLocation = baseLocation;
	}
	public String getWorkLocation() {
		return workLocation;
	}
	public void setWorkLocation(String workLocation) {
		this.workLocation = workLocation;
	}
	public String getBaseSite() {
		return baseSite;
	}
	public void setBaseSite(String baseSite) {
		this.baseSite = baseSite;
	}
	public String getBaseArea() {
		return baseArea;
	}
	public void setBaseArea(String baseArea) {
		this.baseArea = baseArea;
	}
	public String getWorkSite() {
		return workSite;
	}
	public void setWorkSite(String workSite) {
		this.workSite = workSite;
	}
	public String getWorkArea() {
		return workArea;
	}
	public void setWorkArea(String workArea) {
		this.workArea = workArea;
	}
	public int getDataCount() {
		return dataCount;
	}
	public void setDataCount(int dataCount) {
		this.dataCount = dataCount;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCheckinTime() {
		return checkinTime;
	}
	public void setCheckinTime(String checkinTime) {
		this.checkinTime = checkinTime;
	}
	public String getCheckoutTime() {
		return checkoutTime;
	}
	public void setCheckoutTime(String checkoutTime) {
		this.checkoutTime = checkoutTime;
	}
	public String getTotalWorkHour() {
		return totalWorkHour;
	}
	public void setTotalWorkHour(String totalWorkHour) {
		this.totalWorkHour = totalWorkHour;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getOperation() {
		return operation;
	}
	public void setOperation(String operation) {
		this.operation = operation;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public int getPermanentCountLeave() {
		return permanentCountLeave;
	}
	public void setPermanentCountLeave(int permanentCountLeave) {
		this.permanentCountLeave = permanentCountLeave;
	}
	public int getTemporaryCountLeave() {
		return temporaryCountLeave;
	}
	public void setTemporaryCountLeave(int temporaryCountLeave) {
		this.temporaryCountLeave = temporaryCountLeave;
	}
	public int getContractCountLeave() {
		return contractCountLeave;
	}
	public void setContractCountLeave(int contractCountLeave) {
		this.contractCountLeave = contractCountLeave;
	}
	public int getNoOfDaysLeave() {
		return noOfDaysLeave;
	}
	public void setNoOfDaysLeave(int noOfDaysLeave) {
		this.noOfDaysLeave = noOfDaysLeave;
	}
	public String getCheckinLocation() {
		return checkinLocation;
	}
	public void setCheckinLocation(String checkinLocation) {
		this.checkinLocation = checkinLocation;
	}
	public String getCheckoutLocation() {
		return checkoutLocation;
	}
	public void setCheckoutLocation(String checkoutLocation) {
		this.checkoutLocation = checkoutLocation;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getSendTo() {
		return sendTo;
	}
	public void setSendTo(String sendTo) {
		this.sendTo = sendTo;
	}
	public String getMessageSent() {
		return MessageSent;
	}
	public void setMessageSent(String messageSent) {
		MessageSent = messageSent;
	}
	public String getCheckInOutTimings() {
		return checkInOutTimings;
	}
	public void setCheckInOutTimings(String checkInOutTimings) {
		this.checkInOutTimings = checkInOutTimings;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getCheckInReason() {
		return checkInReason;
	}
	public void setCheckInReason(String checkInReason) {
		this.checkInReason = checkInReason;
	}
	public String getCheckOutReason() {
		return checkOutReason;
	}
	public void setCheckOutReason(String checkOutReason) {
		this.checkOutReason = checkOutReason;
	}
	public String getMobileNo() {
		return mobileNo;
	}
	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}
	public String getOrganizationName() {
		return organizationName;
	}
	public void setOrganizationName(String organizationName) {
		this.organizationName = organizationName;
	}
	public String getBiometric() {
		return biometric;
	}
	public void setBiometric(String biometric) {
		this.biometric = biometric;
	}
	public String getSms() {
		return sms;
	}
	public void setSms(String sms) {
		this.sms = sms;
	}
	public String getRfid() {
		return rfid;
	}
	public void setRfid(String rfid) {
		this.rfid = rfid;
	}
	public String getDeviceId() {
		return deviceId;
	}
	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}
	public String getDeviceKey() {
		return deviceKey;
	}
	public void setDeviceKey(String deviceKey) {
		this.deviceKey = deviceKey;
	}
	public String getOnlineTime() {
		return onlineTime;
	}
	public void setOnlineTime(String onlineTime) {
		this.onlineTime = onlineTime;
	}
	public String getOfflineTime() {
		return offlineTime;
	}
	public void setOfflineTime(String offlineTime) {
		this.offlineTime = offlineTime;
	}
	public String getKeyStatus() {
		return keyStatus;
	}
	public void setKeyStatus(String keyStatus) {
		this.keyStatus = keyStatus;
	}
	public String getDeviceStatus() {
		return deviceStatus;
	}
	public void setDeviceStatus(String deviceStatus) {
		this.deviceStatus = deviceStatus;
	}
	public String getActiveStatus() {
		return activeStatus;
	}
	public void setActiveStatus(String activeStatus) {
		this.activeStatus = activeStatus;
	}
	public String getDeactivatedTime() {
		return deactivatedTime;
	}
	public void setDeactivatedTime(String deactivatedTime) {
		this.deactivatedTime = deactivatedTime;
	}
	public int getTrackLocation() {
		return trackLocation;
	}
	public void setTrackLocation(int trackLocation) {
		this.trackLocation = trackLocation;
	}
	public String getLocationName() {
		return locationName;
	}
	public void setLocationName(String locationName) {
		this.locationName = locationName;
	}
	public String getLatLongArray() {
		return latLongArray;
	}
	public void setLatLongArray(String latLongArray) {
		this.latLongArray = latLongArray;
	}
	public String getEmpDeviceKey() {
		return empDeviceKey;
	}
	public void setEmpDeviceKey(String empDeviceKey) {
		this.empDeviceKey = empDeviceKey;
	}
	public int getCheckInOutCount() {
		return checkInOutCount;
	}
	public void setCheckInOutCount(int checkInOutCount) {
		this.checkInOutCount = checkInOutCount;
	}
	public int getSmsCount() {
		return smsCount;
	}
	public void setSmsCount(int smsCount) {
		this.smsCount = smsCount;
	}
	public ArrayList<ExcelDownloadJSON> getEmployeeRetrievelist() {
		return employeeRetrievelist;
	}
	public void setEmployeeRetrievelist(ArrayList<ExcelDownloadJSON> employeeRetrievelist) {
		this.employeeRetrievelist = employeeRetrievelist;
	}
	public String getVehicleName() {
		return vehicleName;
	}
	public void setVehicleName(String vehicleName) {
		this.vehicleName = vehicleName;
	}
	public String getVehicleNumber() {
		return vehicleNumber;
	}
	public void setVehicleNumber(String vehicleNumber) {
		this.vehicleNumber = vehicleNumber;
	}
	public String getOldVehicleName() {
		return oldVehicleName;
	}
	public void setOldVehicleName(String oldVehicleName) {
		this.oldVehicleName = oldVehicleName;
	}
	public String getOldVehicleNumber() {
		return oldVehicleNumber;
	}
	public void setOldVehicleNumber(String oldVehicleNumber) {
		this.oldVehicleNumber = oldVehicleNumber;
	}
	public ArrayList<ExcelDownloadJSON> getVehicleList() {
		return vehicleList;
	}
	public void setVehicleList(ArrayList<ExcelDownloadJSON> vehicleList) {
		this.vehicleList = vehicleList;
	}
	public double getLatitude() {
		return latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public double getLongitude() {
		return longitude;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getStartLocation() {
		return startLocation;
	}
	public void setStartLocation(String startLocation) {
		this.startLocation = startLocation;
	}
	public String getEndLocation() {
		return endLocation;
	}
	public void setEndLocation(String endLocation) {
		this.endLocation = endLocation;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	public String getTotalHr() {
		return totalHr;
	}
	public void setTotalHr(String totalHr) {
		this.totalHr = totalHr;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public String getTripNo() {
		return tripNo;
	}
	public void setTripNo(String tripNo) {
		this.tripNo = tripNo;
	}
	public String getTripStartTime() {
		return TripStartTime;
	}
	public void setTripStartTime(String tripStartTime) {
		TripStartTime = tripStartTime;
	}
	public String getTripStartLocation() {
		return TripStartLocation;
	}
	public void setTripStartLocation(String tripStartLocation) {
		TripStartLocation = tripStartLocation;
	}
	public String getTripEndTime() {
		return TripEndTime;
	}
	public void setTripEndTime(String tripEndTime) {
		TripEndTime = tripEndTime;
	}
	public String getTripEndLocation() {
		return TripEndLocation;
	}
	public void setTripEndLocation(String tripEndLocation) {
		TripEndLocation = tripEndLocation;
	}
	public String getTotalTripTime() {
		return TotalTripTime;
	}
	public void setTotalTripTime(String totalTripTime) {
		TotalTripTime = totalTripTime;
	}
	public String getShift() {
		return shift;
	}
	public void setShift(String shift) {
		this.shift = shift;
	}
	public String getPreviousLocation() {
		return previousLocation;
	}
	public void setPreviousLocation(String previousLocation) {
		this.previousLocation = previousLocation;
	}
	public String getCurrentLocation() {
		return currentLocation;
	}
	public void setCurrentLocation(String currentLocation) {
		this.currentLocation = currentLocation;
	}
	public ArrayList<ExcelDownloadJSON> getPrevShiftList() {
		return prevShiftList;
	}
	public void setPrevShiftList(ArrayList<ExcelDownloadJSON> prevShiftList) {
		this.prevShiftList = prevShiftList;
	}
	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		this.month = month;
	}
	public String getYear() {
		return year;
	}
	public void setYear(String year) {
		this.year = year;
	}
	public String getPreviousMonth() {
		return previousMonth;
	}
	public void setPreviousMonth(String previousMonth) {
		this.previousMonth = previousMonth;
	}
	public String getPreviousYear() {
		return previousYear;
	}
	public void setPreviousYear(String previousYear) {
		this.previousYear = previousYear;
	}
	public ArrayList<ExcelDownloadJSON> getShiftList() {
		return shiftList;
	}
	public void setShiftList(ArrayList<ExcelDownloadJSON> shiftList) {
		this.shiftList = shiftList;
	}
	public int getTotalItemCount() {
		return totalItemCount;
	}
	public void setTotalItemCount(int totalItemCount) {
		this.totalItemCount = totalItemCount;
	}
	public int getTotlaItemCount() {
		return totlaItemCount;
	}
	public void setTotlaItemCount(int totlaItemCount) {
		this.totlaItemCount = totlaItemCount;
	}
	public ArrayList<ReportsPagingJSON> getAllShiftGrade() {
		return allShiftGrade;
	}
	public void setAllShiftGrade(ArrayList<ReportsPagingJSON> allShiftGrade) {
		this.allShiftGrade = allShiftGrade;
	}
	public ArrayList<ReportsPagingJSON> getAllShiftDetails() {
		return allShiftDetails;
	}
	public void setAllShiftDetails(ArrayList<ReportsPagingJSON> allShiftDetails) {
		this.allShiftDetails = allShiftDetails;
	}
	
	
	
	
}
