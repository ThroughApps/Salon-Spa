package payroll;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import DBUtil.DatabaseUtil;

public class PayrollLogic {

	
	/*
	 * FUNCTION FOR GETTING EMP DETAILS
	 */
	public static ArrayList<PayrollJSON> GetEmpDetaiils(PayrollJSON json) {
		Connection connection=null;
		ArrayList <PayrollJSON> empDetailsList=new ArrayList <PayrollJSON>();
		  List<String> invList =  new ArrayList<String>();;
			String staffId=null;
			String salary=null;
			
		
		try {
			connection=DatabaseUtil.getDBConnection();
		
			
			String querySelect0=QueryConstants.SELECT_EMP_SALARY_DATA;
			PreparedStatement preparedStmt0=connection.prepareStatement(querySelect0);
			preparedStmt0.setString(1,json.getMonth());
			preparedStmt0.setString(2,json.getStaffId());
			preparedStmt0.setString(3,json.getCompanyId());
			ResultSet rs0=preparedStmt0.executeQuery();
			while(rs0.next()) {
				staffId=rs0.getString("StaffId");
				
			}
			
			if(staffId==null) {
			
				String querySelect00=QueryConstants.SELECT_EMP_SALARY_CALC;
				PreparedStatement preparedStmt00=connection.prepareStatement(querySelect00);
				preparedStmt00.setString(1,json.getStaffId());
				preparedStmt00.setString(2,json.getCompanyId());
				ResultSet rs00=preparedStmt00.executeQuery();
				while(rs00.next()) {
					salary=rs00.getString("salary");
					
				}
				
			String querySelect=QueryConstants.SELECT_EMP_PRESENT_COUNT;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getStaffId());
			preparedStmt.setString(2,json.getFromDate());
			preparedStmt.setString(3,json.getToDate());
			preparedStmt.setString(4,json.getCompanyId());
			ResultSet rs=preparedStmt.executeQuery();
			while(rs.next()) {
				PayrollJSON presentDays=new PayrollJSON();
				presentDays.setPresentDays(rs.getString("PresentDays"));
		
				empDetailsList.add(presentDays);
			
			}
			
			String querySelect1=QueryConstants.SELECT_EMP_ABSENT_COUNT;
			PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1,json.getStaffId());
			preparedStmt1.setString(2,json.getFromDate());
			preparedStmt1.setString(3,json.getToDate());
			preparedStmt1.setString(4,json.getCompanyId());
			ResultSet rs1=preparedStmt1.executeQuery();
			while(rs1.next()) {
				PayrollJSON absentDays=new PayrollJSON();
				absentDays.setAbsentDays(rs1.getString("AbsentDays"));
				empDetailsList.add(absentDays);
			
			}
			
			
			String querySelect2=QueryConstants.SELECT_EMP_LEAVE_COUNT;
			PreparedStatement preparedStmt2=connection.prepareStatement(querySelect2);
			preparedStmt2.setString(1,json.getStaffId());
			preparedStmt2.setString(2,json.getFromDate());
			preparedStmt2.setString(3,json.getToDate());
			preparedStmt2.setString(4,json.getCompanyId());
			ResultSet rs2=preparedStmt2.executeQuery();
			while(rs2.next()) {
				PayrollJSON leaveDays=new PayrollJSON();
				leaveDays.setLeaveDays(rs2.getString("LeaveDays"));
				empDetailsList.add(leaveDays);
			
			}
			
			String querySelect3=QueryConstants.SELECT_EMP_HOLIDAY_COUNT;
			PreparedStatement preparedStmt3=connection.prepareStatement(querySelect3);
			preparedStmt3.setString(1,json.getStaffId());
			preparedStmt3.setString(2,json.getFromDate());
			preparedStmt3.setString(3,json.getToDate());
			preparedStmt3.setString(4,json.getCompanyId());
			ResultSet rs3=preparedStmt3.executeQuery();
			while(rs3.next()) {
				PayrollJSON holidayDays=new PayrollJSON();
				holidayDays.setHolidayDays(rs3.getString("HolidayDays"));
				empDetailsList.add(holidayDays);
			}
			PayrollJSON dbSalary=new PayrollJSON();
			dbSalary.setSalary(salary);
			empDetailsList.add(dbSalary);
			}else {
				PayrollJSON presentDays=new PayrollJSON();
				presentDays.setPresentDays("Salary_Granted");
				empDetailsList.add(presentDays);
			}
			
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		return empDetailsList;
	}
	
	/*
	 * FUNCTION FOR INSERTING EMP SALARY
	 */
	public static PayrollJSON AddSalary(PayrollJSON json) {
		Connection connection=null;
		String staffName = null;
		try {
			connection=DatabaseUtil.getDBConnection();
			
			String querySelect1=QueryConstants.SELECT_EMP_NAME;
			PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1,json.getStaffId());
			preparedStmt1.setString(2,json.getCompanyId());
			ResultSet rs1=preparedStmt1.executeQuery();
			while(rs1.next()) {
				staffName=rs1.getString("StaffName");
			}
		
			
			String querySelect=QueryConstants.INSERT_EMP_SALARY_DATA;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getStaffId());
			preparedStmt.setString(2,json.getMonth());
			preparedStmt.setString(3,json.getCompanyWorkingHrs());
			preparedStmt.setString(4,json.getDays());
			preparedStmt.setString(5,json.getPresentDays());
			preparedStmt.setString(6,json.getAbsentDays());
			preparedStmt.setString(7,json.getLeaveDays());
			preparedStmt.setString(8,json.getHolidayDays());
			preparedStmt.setString(9,json.getTotalWorkingHrs());
			preparedStmt.setString(10,json.getWorkingHrs());
			preparedStmt.setString(11,json.getOtWorkingHrs());
			preparedStmt.setString(12,json.getCompanyWorkingHrsSalary());
			preparedStmt.setString(13,json.getCompanyOtHrsSalary());
			preparedStmt.setString(14,json.getEmpTotalWorkingHrsSalary());
			preparedStmt.setString(15,staffName);
			preparedStmt.setString(16,json.getCompanyId());
			preparedStmt.executeUpdate();
			
		
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return json;
	}

	
	
	/*
	 * FUNCTION FOR GENERATING SALARY REPORT
	 */
	
	public static ArrayList<PayrollJSON> SalaryReport(PayrollJSON json) {
		Connection connection=null;
		ArrayList <PayrollJSON> salaryList=new ArrayList <PayrollJSON>();
		
		String staffName = null;
		try {
			connection=DatabaseUtil.getDBConnection();
			
				
			String querySelect=QueryConstants.SELECT_EMP_SALARY;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			//preparedStmt.setString(1,json.getStaffId());
			preparedStmt.setString(1,json.getCompanyId());
			ResultSet rs=preparedStmt.executeQuery();
			while(rs.next()) {
				PayrollJSON salaryData=new PayrollJSON();
				salaryData.setStaffId(rs.getString("StaffId"));
				salaryData.setStaffName(rs.getString("StaffName"));
				salaryData.setMonth(rs.getString("SalaryMonth"));
				salaryData.setTotalWorkingHrs(rs.getString("TotalWorkingHrs"));
				salaryData.setWorkingHrs(rs.getString("GeneralWorkingHrs"));
				salaryData.setOtWorkingHrs(rs.getString("OTWorkingHrs"));
				salaryData.setEmpTotalWorkingHrsSalary(rs.getString("empTotalWorkingHrsSalary"));
				salaryList.add(salaryData);
			}
		
		
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		return salaryList;
	}

	/*
	 * FUNCTION FOR DELETING SALARY
	 */
	public static PayrollJSON SalaryReportDelete(PayrollJSON json) {
		Connection connection=null;
		ArrayList <PayrollJSON> salaryList=new ArrayList <PayrollJSON>();
		
		String staffName = null;
		try {
			connection=DatabaseUtil.getDBConnection();
			
				
			String querySelect=QueryConstants.DELETE_EMP_SALARY;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getStaffId());
			preparedStmt.setString(2,json.getMonth());
			preparedStmt.setString(3,json.getCompanyId());
			preparedStmt.executeUpdate();
			connection.close(); 
			
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return json;
	}

	/*
	 * FUNCTION FOR SALARY REPORT VIEW
	 */
	public static ArrayList<PayrollJSON> SalaryReportView(PayrollJSON json) {
		Connection connection=null;
		ArrayList <PayrollJSON> salaryList=new ArrayList <PayrollJSON>();
		
		String staffName = null;
		try {
			connection=DatabaseUtil.getDBConnection();
			     
			  
			  
					String querySelect0=QueryConstants.SELECT_EMP_DETAIL;
					PreparedStatement preparedStmt0=connection.prepareStatement(querySelect0);
					preparedStmt0.setString(1,json.getStaffId());
					preparedStmt0.setString(2,json.getCompanyId());
					ResultSet rs0=preparedStmt0.executeQuery();
					while(rs0.next()) {
						PayrollJSON staffData=new PayrollJSON();
						staffData.setAddress(rs0.getString("Address"));
						staffData.setContactNo(rs0.getString("ContactNo"));
						salaryList.add(staffData);
					}
					
					
			  
			String querySelect=QueryConstants.SELECT_EMP_SALARY_VIEW;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getStaffId());
			preparedStmt.setString(2,json.getMonth());
			preparedStmt.setString(3,json.getCompanyId());
			ResultSet rs=preparedStmt.executeQuery();
			while(rs.next()) {
				PayrollJSON salaryData=new PayrollJSON();
				salaryData.setStaffId(rs.getString("StaffId"));
				salaryData.setStaffName(rs.getString("StaffName"));
				salaryData.setMonth(rs.getString("SalaryMonth"));
				salaryData.setTotalWorkingHrs(rs.getString("TotalWorkingHrs"));
				salaryData.setWorkingHrs(rs.getString("GeneralWorkingHrs"));
				salaryData.setOtWorkingHrs(rs.getString("OTWorkingHrs"));
				salaryData.setEmpTotalWorkingHrsSalary(rs.getString("empTotalWorkingHrsSalary"));
				salaryData.setCompanyWorkingHrs(rs.getString("CompanyWorkingHrs"));
				salaryData.setDays(rs.getString("TotalDays"));
				salaryData.setPresentDays(rs.getString("PresentDays"));
				salaryData.setAbsentDays(rs.getString("AbsentDays"));
				salaryData.setLeaveDays(rs.getString("LeaveDays"));
				salaryData.setHolidayDays(rs.getString("HolidayDays"));
				salaryData.setCompanyWorkingHrsSalary(rs.getString("CompanyWorkingHrsSalary"));
				salaryData.setCompanyOtHrsSalary(rs.getString("CompanyOTWorkingHrsSalary"));
				salaryList.add(salaryData);
		
			}
			connection.close(); 
			
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return salaryList;
	}

}