package ReportsPaging;

import java.time.LocalDate;
import java.util.ArrayList;


public class ReportsPagingJSON {


	private String employeeId;
	private String dob;
	private String emailId;
	private String mobileNo;
	private String address;
	private String employeeType;
	private String role;
	

	private String department;
	private String fromDate;
	private String toDate;
	private String name;
	private String search;
	private String date;
	private String companyId;
	private String checkinTime;
	private String checkoutTime;
	private String status;
	private String totalWorkHour;
	private LocalDate fromDate1;
	private LocalDate toDate1;
	private String DBPreviousLocation;
	private String shiftType;
	private String startDate;
	private String endDate;
	private String supervisor;
	
	private String shiftLoop;
	private String timingsLoop;
	private String descriptionLoop;
	private String workLocationLoop;
	private String description;
	private String shiftDescription;
	
	String shift;
	String previousLocation;
	String currentLocation;
	String siteName;
	String area;
	String location;
	int dataCount;
	int totlaItemCount;
	String month;
	String year;
	String previousMonth;
	String previousYear;
	private String shiftNo;
	private String empCount;
	String grade;
	String empCode;
	int totalItemCount;
	
	private String shiftSupervisorName;
	private String shiftSuperVisorId;
	ArrayList<ReportsPagingJSON> allShiftGrade = new ArrayList<ReportsPagingJSON>();
	ArrayList<ReportsPagingJSON> allShiftDetails = new ArrayList<ReportsPagingJSON>();	
	ArrayList<ReportsPagingJSON> employeeRetrievelist = new ArrayList<ReportsPagingJSON>();
	ArrayList<ReportsPagingJSON> shiftList = new ArrayList<ReportsPagingJSON>();
	ArrayList<ReportsPagingJSON> prevShiftList = new ArrayList<ReportsPagingJSON>();
	ArrayList<ReportsPagingJSON> vacancyReportlist = new ArrayList<ReportsPagingJSON>();
	ArrayList<ReportsPagingJSON> expiredShiftReportList=new ArrayList<ReportsPagingJSON>();
	ArrayList<ReportsPagingJSON> expiredShiftReportListExcel=new ArrayList<ReportsPagingJSON>();
	
	ArrayList<ReportsPagingJSON> deletedShiftReportList=new ArrayList<ReportsPagingJSON>();
	ArrayList<ReportsPagingJSON> deletedShiftReportListExcel=new ArrayList<ReportsPagingJSON>();
	
	ArrayList<ReportsPagingJSON> scheduledShiftReportList=new ArrayList<ReportsPagingJSON>();
	
	


	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public ArrayList<ReportsPagingJSON> getScheduledShiftReportList() {
		return scheduledShiftReportList;
	}

	public void setScheduledShiftReportList(ArrayList<ReportsPagingJSON> scheduledShiftReportList) {
		this.scheduledShiftReportList = scheduledShiftReportList;
	}

	public String getSupervisor() {
		return supervisor;
	}

	public void setSupervisor(String supervisor) {
		this.supervisor = supervisor;
	}

	public ArrayList<ReportsPagingJSON> getDeletedShiftReportList() {
		return deletedShiftReportList;
	}

	public void setDeletedShiftReportList(ArrayList<ReportsPagingJSON> deletedShiftReportList) {
		this.deletedShiftReportList = deletedShiftReportList;
	}

	public ArrayList<ReportsPagingJSON> getDeletedShiftReportListExcel() {
		return deletedShiftReportListExcel;
	}

	public void setDeletedShiftReportListExcel(ArrayList<ReportsPagingJSON> deletedShiftReportListExcel) {
		this.deletedShiftReportListExcel = deletedShiftReportListExcel;
	}

	public ArrayList<ReportsPagingJSON> getExpiredShiftReportListExcel() {
		return expiredShiftReportListExcel;
	}

	public void setExpiredShiftReportListExcel(ArrayList<ReportsPagingJSON> expiredShiftReportListExcel) {
		this.expiredShiftReportListExcel = expiredShiftReportListExcel;
	}

	public ArrayList<ReportsPagingJSON> getExpiredShiftReportList() {
		return expiredShiftReportList;
	}

	public void setExpiredShiftReportList(ArrayList<ReportsPagingJSON> expiredShiftReportList) {
		this.expiredShiftReportList = expiredShiftReportList;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getShiftType() {
		return shiftType;
	}

	public void setShiftType(String shiftType) {
		this.shiftType = shiftType;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	
	public ArrayList<ReportsPagingJSON> getVacancyReportlist() {
		return vacancyReportlist;
	}

	public void setVacancyReportlist(ArrayList<ReportsPagingJSON> vacancyReportlist) {
		this.vacancyReportlist = vacancyReportlist;
	}

	public String getDBPreviousLocation() {
		return DBPreviousLocation;
	}

	public void setDBPreviousLocation(String dBPreviousLocation) {
		DBPreviousLocation = dBPreviousLocation;
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

	
	public String getShiftSupervisorName() {
		return shiftSupervisorName;
	}

	public void setShiftSupervisorName(String shiftSupervisorName) {
		this.shiftSupervisorName = shiftSupervisorName;
	}

	public String getShiftSuperVisorId() {
		return shiftSuperVisorId;
	}

	public void setShiftSuperVisorId(String shiftSuperVisorId) {
		this.shiftSuperVisorId = shiftSuperVisorId;
	}
	public String getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
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

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getTotalWorkHour() {
		return totalWorkHour;
	}

	public void setTotalWorkHour(String totalWorkHour) {
		this.totalWorkHour = totalWorkHour;
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

	public String getSiteName() {
		return siteName;
	}

	public void setSiteName(String siteName) {
		this.siteName = siteName;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public int getDataCount() {
		return dataCount;
	}

	public void setDataCount(int dataCount) {
		this.dataCount = dataCount;
	}

	public int getTotlaItemCount() {
		return totlaItemCount;
	}

	public void setTotlaItemCount(int totlaItemCount) {
		this.totlaItemCount = totlaItemCount;
	}

	public ArrayList<ReportsPagingJSON> getEmployeeRetrievelist() {
		return employeeRetrievelist;
	}

	public void setEmployeeRetrievelist(ArrayList<ReportsPagingJSON> employeeRetrievelist) {
		this.employeeRetrievelist = employeeRetrievelist;
	}

	public ArrayList<ReportsPagingJSON> getShiftList() {
		return shiftList;
	}

	public void setShiftList(ArrayList<ReportsPagingJSON> shiftList) {
		this.shiftList = shiftList;
	}

	public ArrayList<ReportsPagingJSON> getPrevShiftList() {
		return prevShiftList;
	}

	public void setPrevShiftList(ArrayList<ReportsPagingJSON> prevShiftList) {
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

	public String getShiftNo() {
		return shiftNo;
	}

	public void setShiftNo(String shiftNo) {
		this.shiftNo = shiftNo;
	}

	public String getEmpCount() {
		return empCount;
	}

	public void setEmpCount(String empCount) {
		this.empCount = empCount;
	}

	public ArrayList<ReportsPagingJSON> getAllShiftDetails() {
		return allShiftDetails;
	}

	public void setAllShiftDetails(ArrayList<ReportsPagingJSON> allShiftDetails) {
		this.allShiftDetails = allShiftDetails;
	}

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	public String getEmpCode() {
		return empCode;
	}

	public void setEmpCode(String empCode) {
		this.empCode = empCode;
	}

	public ArrayList<ReportsPagingJSON> getAllShiftGrade() {
		return allShiftGrade;
	}

	public void setAllShiftGrade(ArrayList<ReportsPagingJSON> allShiftGrade) {
		this.allShiftGrade = allShiftGrade;
	}

	public int getTotalItemCount() {
		return totalItemCount;
	}

	public void setTotalItemCount(int totalItemCount) {
		this.totalItemCount = totalItemCount;
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

	public String getWorkLocationLoop() {
		return workLocationLoop;
	}

	public void setWorkLocationLoop(String workLocationLoop) {
		this.workLocationLoop = workLocationLoop;
	}
	

	
	
	
	
	
	
}