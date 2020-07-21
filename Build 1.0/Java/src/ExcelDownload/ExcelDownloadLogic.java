package ExcelDownload;

import java.sql.Connection;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;

import DBUtil.DatabaseUtil;
import ReportsPaging.ReportsPagingJSON;
import ReportsPaging.ReportsPagingQueries;

public class ExcelDownloadLogic {

	/*
	 * function for generating employee maintenance report
	 */

	public static ArrayList<ExcelDownloadJSON> EmployeeMaintenanceReport(ExcelDownloadJSON details) {

		ArrayList<ExcelDownloadJSON> employeeRetrievelist = new ArrayList<ExcelDownloadJSON>();
		Connection connection = null;
		int dataEndCount = details.getDataCount() + 10;
		ExcelDownloadJSON employeeRetrieveobj1 = new ExcelDownloadJSON();

		try {
			connection = DatabaseUtil.getDBConnection();

			String querySelect = ExcelDownloadQueryConstants.EMP_MAINTENANCE_REPORT;
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1, details.getCompanyId());
			ResultSet rs = preparedStmt.executeQuery();
			while (rs.next()) {
				ExcelDownloadJSON employeeRetrieveobj = new ExcelDownloadJSON();
				employeeRetrieveobj.setEmployeeId(rs.getString("EmployeeId"));
				employeeRetrieveobj.setFirstName(rs.getString("FirstName"));
				employeeRetrieveobj.setLastName(rs.getString("LastName"));
				employeeRetrieveobj.setEmployeeType(rs.getString("Type"));
				employeeRetrieveobj.setDepartment(rs.getString("Department"));
				employeeRetrieveobj.setRole(rs.getString("Role"));
				employeeRetrieveobj.setMobileNo(rs.getString("MobileNo"));

				employeeRetrievelist.add(employeeRetrieveobj);
			}
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {
			DatabaseUtil.closeConnection(connection);
		}

		return employeeRetrievelist;

	}

	/*
	 * function for generating audit report
	 */

	public static ArrayList<ExcelDownloadJSON> AuditReportDisplay(ExcelDownloadJSON details) {

		ArrayList<ExcelDownloadJSON> employeeRetrievelist = new ArrayList<ExcelDownloadJSON>();
		Connection connection = null;
		ExcelDownloadJSON employeeRetrieveobj1 = new ExcelDownloadJSON();

		try {
			connection = DatabaseUtil.getDBConnection();

			String querySelect = ExcelDownloadQueryConstants.EMP_SELECT_AUDIT_REPORT;
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1, details.getCompanyId());
			preparedStmt.setString(2, details.getFromDate().toString());
			preparedStmt.setString(3, details.getToDate().toString());

			ResultSet rs = preparedStmt.executeQuery();

			while (rs.next()) {
				ExcelDownloadJSON employeeRetrieveobj = new ExcelDownloadJSON();
				employeeRetrieveobj.setSuperiorId(rs.getString("SuperiorId"));
				employeeRetrieveobj.setName(rs.getString("Name"));
				employeeRetrieveobj.setRole(rs.getString("Role"));
				employeeRetrieveobj.setOperation(rs.getString("Operation"));
				employeeRetrieveobj.setEmployeeId(rs.getString("EmployeeId"));
				employeeRetrieveobj.setDate(rs.getString("Date"));
				employeeRetrieveobj.setTime(rs.getString("Time"));

				employeeRetrievelist.add(employeeRetrieveobj);

			}

			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {
			DatabaseUtil.closeConnection(connection);
		}

		return employeeRetrievelist;

	}

	/*
	 * FUNCTION FOR Retrieving All Device Report
	 */

	public static ArrayList<ExcelDownloadJSON> DeviceReportIndividual(ExcelDownloadJSON json) {
		Connection connection = null;
		ArrayList<ExcelDownloadJSON> List = new ArrayList<ExcelDownloadJSON>();
		ExcelDownloadJSON dev1 = new ExcelDownloadJSON();
		try {
			connection = DatabaseUtil.getDBConnection();
			String querySelect = ExcelDownloadQueryConstants.SELECT_ONE_DEVICE_REPORT;
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1, json.getCompanyId());
			preparedStmt.setString(2, json.getFromDate().toString());
			preparedStmt.setString(3, json.getToDate().toString());
			ResultSet rs = preparedStmt.executeQuery();
			while (rs.next()) {
				ExcelDownloadJSON dev = new ExcelDownloadJSON();
				dev.setDeviceId(rs.getString("DeviceId"));
				dev.setCompanyId(rs.getString("CompanyId"));
				dev.setDeviceStatus(rs.getString("DeviceStatus"));
				dev.setDate(rs.getString("Date"));

				List.add(dev);
			}

			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {
			DatabaseUtil.closeConnection(connection);
		}
		return List;
	}

	/*
	 * function for generating Message Center report for email
	 */

	public static ArrayList<ExcelDownloadJSON> MessageCenterReportEmail(ExcelDownloadJSON details) {

		ArrayList<ExcelDownloadJSON> employeeRetrievelist = new ArrayList<ExcelDownloadJSON>();

		ExcelDownloadJSON employeeRetrieveobj1 = new ExcelDownloadJSON();

		Connection connection = null;
		int dataEndCount = details.getDataCount() + 10;
		try {
			connection = DatabaseUtil.getDBConnection();

			String querySelect = ExcelDownloadQueryConstants.EMP_MESSAGE_CENTER_REPORT_EMAIL;
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1, details.getCompanyId());
			preparedStmt.setString(2, details.getFromDate().toString());
			preparedStmt.setString(3, details.getToDate().toString());
			// preparedStmt.setString(2,details.getDate());
			ResultSet rs = preparedStmt.executeQuery();
			while (rs.next()) {
				ExcelDownloadJSON employeeRetrieveobj = new ExcelDownloadJSON();
				employeeRetrieveobj.setSuperiorId(rs.getString("SuperiorId"));
				employeeRetrieveobj.setName(rs.getString("Name"));
				employeeRetrieveobj.setRole(rs.getString("Role"));
				employeeRetrieveobj.setType(rs.getString("Type"));
				employeeRetrieveobj.setSendTo(rs.getString("SendTo"));
				employeeRetrieveobj.setMessageSent(rs.getString("MessageSent"));
				employeeRetrieveobj.setDate(rs.getString("Date"));
				employeeRetrieveobj.setTime(rs.getString("Time"));
				employeeRetrievelist.add(employeeRetrieveobj);
			}

			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {
			DatabaseUtil.closeConnection(connection);
		}

		return employeeRetrievelist;

	}

	/*
	 * function for generating Message Center report for sms
	 */

	public static ExcelDownloadJSON MessageCenterReportSMS(ExcelDownloadJSON details) {

		ArrayList<ExcelDownloadJSON> employeeRetrievelist = new ArrayList<ExcelDownloadJSON>();
		ExcelDownloadJSON res = new ExcelDownloadJSON();
		ExcelDownloadJSON employeeRetrieveobj1 = new ExcelDownloadJSON();

		Connection connection = null;
		int dataEndCount = details.getDataCount() + 10;

		try {

			connection = DatabaseUtil.getDBConnection();

			String querySelect = ExcelDownloadQueryConstants.EMP_MESSAGE_CENTER_REPORT_SMS;
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1, details.getCompanyId());
			preparedStmt.setString(2, details.getFromDate().toString());
			preparedStmt.setString(3, details.getToDate().toString());

			ResultSet rs = preparedStmt.executeQuery();

			while (rs.next()) {
				ExcelDownloadJSON employeeRetrieveobj = new ExcelDownloadJSON();
				employeeRetrieveobj.setSuperiorId(rs.getString("SuperiorId"));
				employeeRetrieveobj.setName(rs.getString("Name"));
				employeeRetrieveobj.setRole(rs.getString("Role"));
				employeeRetrieveobj.setType(rs.getString("Type"));
				employeeRetrieveobj.setSendTo(rs.getString("SendTo"));
				employeeRetrieveobj.setMessageSent(rs.getString("MessageSent"));
				employeeRetrieveobj.setDate(rs.getString("Date"));
				employeeRetrieveobj.setTime(rs.getString("Time"));
				employeeRetrievelist.add(employeeRetrieveobj);
			}

			System.out.println("list length...." + employeeRetrievelist.size());
			String querySelect1 = ExcelDownloadQueryConstants.MSG_CENTER_COUNT;
			PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1, details.getCompanyId());
			preparedStmt1.setString(2, details.getFromDate().toString());
			preparedStmt1.setString(3, details.getToDate().toString());
			ResultSet rs1 = preparedStmt1.executeQuery();
			while (rs1.next()) {
				res.setCheckInOutCount(rs1.getInt("SMSCount"));
			}
			String querySelect2 = ExcelDownloadQueryConstants.CHECKINOUT_MSG_COUNT;
			PreparedStatement preparedStmt2 = connection.prepareStatement(querySelect2);
			preparedStmt2.setString(1, details.getCompanyId());
			preparedStmt2.setString(2, details.getFromDate().toString());
			preparedStmt2.setString(3, details.getToDate().toString());

			ResultSet rs3 = preparedStmt2.executeQuery();
			while (rs3.next()) {
				res.setSmsCount(rs3.getInt("SMSCount"));
			}

			res.setEmployeeRetrievelist(employeeRetrievelist);

			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {
			DatabaseUtil.closeConnection(connection);
		}

		return res;

	}

	/*
	 * function for Trip History Report
	 */

	public static ExcelDownloadJSON TripHistoryReport(ExcelDownloadJSON details) {

		ArrayList<ExcelDownloadJSON> tripList = new ArrayList<ExcelDownloadJSON>();
		Connection connection = null;

		try {
			connection = DatabaseUtil.getDBConnection();
			String querySelect = ExcelDownloadQueryConstants.TRIP_HISTORY_REPORT;
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1, details.getCompanyId());
			preparedStmt.setString(2, details.getFromDate().toString());
			preparedStmt.setString(3, details.getToDate().toString());

			ResultSet rs = preparedStmt.executeQuery();

			while (rs.next()) {
				ExcelDownloadJSON dev = new ExcelDownloadJSON();
				dev.setDeviceId(rs.getString("DeviceId"));
				dev.setEmployeeId(rs.getString("EmployeeId"));
				dev.setEmployeeName(rs.getString("EmployeeName"));
				dev.setTripNo(rs.getString("TripNo"));
				dev.setLocation(rs.getString("Location"));
				dev.setStartTime(rs.getString("TripStartTime"));
				dev.setStartLocation(rs.getString("TripStartLocation"));
				dev.setEndTime(rs.getString("TripEndTime"));
				dev.setEndLocation(rs.getString("TripEndLocation"));
				dev.setTotalHr(rs.getString("TotalTripTime"));
				dev.setDate(rs.getString("StartDate"));
				dev.setEndDate(rs.getString("EndDate"));
				dev.setVehicleName(rs.getString("VehicleName"));
				dev.setVehicleNumber(rs.getString("VehicleNumber"));
				tripList.add(dev);
			}
			details.setVehicleList(tripList);
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {
			DatabaseUtil.closeConnection(connection);
		}

		return details;

	}

	/*
	 * FUNCTION FOR GENERATING SHIFT WISE REPORT FOR DOWNLOAD
	 */

	public static ExcelDownloadJSON ShiftWiseReport(ExcelDownloadJSON details) {

		// TODO Auto-generated method stub
		ArrayList<ExcelDownloadJSON> employeeRetrievelist = new ArrayList<ExcelDownloadJSON>();
		ArrayList<ExcelDownloadJSON> employeeRetrievelist1 = new ArrayList<ExcelDownloadJSON>();
		ArrayList<ExcelDownloadJSON> prevShiftList = new ArrayList<ExcelDownloadJSON>();
		Connection connection = null;

		ExcelDownloadJSON employeeRetrieveobj1 = new ExcelDownloadJSON();
		String EmpId = "";
		String empId = "";
		String empId1 = "";
		try {
			connection = DatabaseUtil.getDBConnection();
			if (!details.getShift().equals("all")) {
				if (!details.getShift().equals("1")) {

					LocalDate fromDate1 = LocalDate.of(details.getFromDate1().getYear(),
							(details.getFromDate1().getMonth().getValue()), details.getFromDate1().getDayOfMonth());
					// LocalDate toDate1 =
					// LocalDate.of(json.getToDate1().getYear(),(json.getToDate1().getMonth().getValue()),json.getToDate1().getDayOfMonth());

					LocalDate prevDate = fromDate1.minusDays(1);
					System.out.println("PreviousDate:" + prevDate);
					System.out.println("Date:" + details.getDate());
					String querySelect1 = ExcelDownloadQueryConstants.EMP_SHIFT_WISE__REPORT1;
					PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
					preparedStmt1.setString(1, details.getCompanyId());
					preparedStmt1.setString(2, details.getDate());
					preparedStmt1.setString(3, details.getShift());

					ResultSet rs = preparedStmt1.executeQuery();
					while (rs.next()) {

						int numberOfRows = rs.getRow();
						// System.out.println("Shift Report Data Table\t :"+numberOfRows);
						System.out.println("SHIFT REPORT DATA TABLE \t :" + numberOfRows);
						ExcelDownloadJSON shiftData = new ExcelDownloadJSON();
						shiftData.setEmployeeId(rs.getString("EmployeeId"));
						shiftData.setName(rs.getString("Name"));
						shiftData.setEmployeeType(rs.getString("Type"));
						shiftData.setDepartment(rs.getString("Department"));
						shiftData.setShift(rs.getString("Shift"));
						shiftData.setDate(rs.getString("Date"));
						shiftData.setCurrentLocation(rs.getString("CurrentLocation"));
						shiftData.setShiftSuperVisorId(rs.getString("ShiftSupervisorId"));
						String querySelectSupervisor = ReportsPagingQueries.GET_SUPERVISOR;
						PreparedStatement preparedStmtSupervisor = connection.prepareStatement(querySelectSupervisor);
						preparedStmtSupervisor.setString(1, details.getCompanyId());
						preparedStmtSupervisor.setString(2, rs.getString("ShiftSupervisorId"));
						ResultSet rsSupervisor = preparedStmtSupervisor.executeQuery();
						while (rsSupervisor.next()) {
							shiftData.setShiftSupervisorName(rsSupervisor.getString("supervisorName"));
						}
						shiftData.setGrade(rs.getString("grade"));
						shiftData.setEmpCode(rs.getString("EmpCode"));
						System.out.print("BEFORE EMP-ID :\t" + empId);
						System.out.println("EMPLOYEID :\t" + shiftData.getEmployeeId() + "\t LOCATION :\t"
								+ shiftData.getCurrentLocation());

						if (!empId.equals(shiftData.getEmployeeId())) {
							System.out.println("IN PREV IF LOOP \n" + empId + "," + shiftData.getEmployeeId());
							String querySelectPrevShift = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT;
							PreparedStatement preparedStmtPrevShift = connection.prepareStatement(querySelectPrevShift);
							preparedStmtPrevShift.setString(1, details.getCompanyId());
							preparedStmtPrevShift.setString(2, prevDate.toString());
							// preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
							preparedStmtPrevShift.setString(3, shiftData.getEmployeeId());
							ResultSet rsPrevShift = preparedStmtPrevShift.executeQuery();
							// System.out.println("IN PREV LOOP next() value\n"+rsPrevShift2.next());
							// rsPrevShift2.beforeFirst();
							if (Boolean.valueOf(rsPrevShift.next()).equals(true)) {
								// while (rs.next()) {
								// System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t
								// :"+rs.next()+','+date);
								rsPrevShift.beforeFirst();
								while (rsPrevShift.next()) {
									System.out.println("IN yesterday Date loop \n");

									ExcelDownloadJSON prevShiftData = new ExcelDownloadJSON();
									prevShiftData.setEmployeeId(shiftData.getEmployeeId());
									prevShiftData.setCurrentLocation(rsPrevShift.getString("CurrentLocation"));
									shiftData.setPreviousLocation(rsPrevShift.getString("CurrentLocation"));
									System.out.println(
											"IN yesterday Date Location \n" + rsPrevShift.getString("CurrentLocation"));
									prevShiftList.add(prevShiftData);
								}
							}

							else if (Boolean.valueOf(rsPrevShift.next()).equals(false)) {
								// rs.beforeFirst();

								rsPrevShift.afterLast();
								System.out.println("else if loop when data is not in prev date \t :");
								String querySelectPrevShift4 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT1;
								PreparedStatement preparedStmtPrevShift4 = connection
										.prepareStatement(querySelectPrevShift4);
								preparedStmtPrevShift4.setString(1, details.getCompanyId());
								preparedStmtPrevShift4.setString(2, details.getFromDate1().toString());
								// preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
								preparedStmtPrevShift4.setString(3, shiftData.getEmployeeId());
								ResultSet rsPrevShift4 = preparedStmtPrevShift4.executeQuery();
								System.out.println("BEFORE NO previous date but there is a data \t :");
								if (Boolean.valueOf(rsPrevShift4.next()).equals(true)) {
									System.out.println("NO previous date but there is a data \t :");
									// while (rs.next()) {
									// System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t
									// :"+rs.next()+','+date);
									rsPrevShift4.beforeFirst();
									while (rsPrevShift4.next()) {
										System.out.println(
												"NO previous date but there is a data so select data for shift1\t :");
										String querySelectShiftLocation1 = ReportsPagingQueries.GET_SHIFT_LOC;
										PreparedStatement preparedStmtSupervisorLocation1 = connection
												.prepareStatement(querySelectShiftLocation1);
										preparedStmtSupervisorLocation1.setString(1, details.getCompanyId());

										ResultSet rsSupervisorLocation1 = preparedStmtSupervisorLocation1
												.executeQuery();
										while (rsSupervisorLocation1.next()) {
											shiftData.setPreviousLocation(
													rsSupervisorLocation1.getString("CurrentLocation"));
										}
										// System.out.println("NO previous date but there is a data so shift1 Value\t
										// :"+rsSupervisorLocation1.getString("CurrentLocation"));
									}
								} else if (Boolean.valueOf(rsPrevShift4.next()).equals(false)) {
									// rs.beforeFirst();
									rsPrevShift4.afterLast();
									System.out.println("NO data at all \t :");

									while (rsPrevShift4.next()) {

										shiftData.setPreviousLocation("-");
										System.out.println(
												"NO data at all location\t :" + shiftData.getPreviousLocation());
									}
								}

							}

							empId = shiftData.getEmployeeId();
							details.setPrevShiftList(prevShiftList);
							System.out.println("Prev shift list \n" + prevShiftList);
						} else {
							empId = shiftData.getEmployeeId();
							System.out.print("ELSE EMP-ID :\t" + empId);
						}

						employeeRetrievelist.add(shiftData);
					}

					details.setEmployeeRetrievelist(employeeRetrievelist);

				} else {

					System.out.println("SHIFT IS 1\n");

					LocalDate fromDate1 = LocalDate.of(details.getFromDate1().getYear(),
							(details.getFromDate1().getMonth().getValue()), details.getFromDate1().getDayOfMonth());
					// LocalDate toDate1 =
					// LocalDate.of(json.getToDate1().getYear(),(json.getToDate1().getMonth().getValue()),json.getToDate1().getDayOfMonth());

					LocalDate prevDate = fromDate1.minusDays(1);
					System.out.println("PreviousDate:" + prevDate);
					String querySelectEmp = ExcelDownloadQueryConstants.EMP_MONTH_WISE_SHIFT_HISTORY_REPORT_Emp1;
					PreparedStatement preparedStmtEmp = connection.prepareStatement(querySelectEmp);
					preparedStmtEmp.setString(1, details.getCompanyId());
					preparedStmtEmp.setString(2, details.getShift());

					ResultSet rsEmp = preparedStmtEmp.executeQuery();

					while (rsEmp.next()) {

						int numberOfRows = rsEmp.getRow();
						System.out.println("EMPLOYEE TABLE \t :" + numberOfRows);
						ExcelDownloadJSON shiftData1 = new ExcelDownloadJSON();
						shiftData1.setEmployeeId(rsEmp.getString("EmployeeId"));

						shiftData1.setName(rsEmp.getString("Name"));
						shiftData1.setEmployeeType(rsEmp.getString("Type"));
						shiftData1.setDepartment(rsEmp.getString("Department"));
						shiftData1.setShift("1");
						shiftData1.setDate(details.getDate());
						String querySelectShiftLocation = ReportsPagingQueries.GET_SHIFT_LOC;
						PreparedStatement preparedStmtSupervisorLocation = connection
								.prepareStatement(querySelectShiftLocation);
						preparedStmtSupervisorLocation.setString(1, details.getCompanyId());

						ResultSet rsSupervisorLocation = preparedStmtSupervisorLocation.executeQuery();
						while (rsSupervisorLocation.next()) {
							shiftData1.setCurrentLocation(rsSupervisorLocation.getString("CurrentLocation"));
						}
						shiftData1.setShiftSuperVisorId("-");
						String querySelectSupervisor = ReportsPagingQueries.GET_SUPERVISOR;
						PreparedStatement preparedStmtSupervisor = connection.prepareStatement(querySelectSupervisor);
						preparedStmtSupervisor.setString(1, details.getCompanyId());
						preparedStmtSupervisor.setString(2, rsEmp.getString("ReportingManagerId"));
						ResultSet rsSupervisor = preparedStmtSupervisor.executeQuery();
						while (rsSupervisor.next()) {
							shiftData1.setShiftSupervisorName("-");
						}
						shiftData1.setGrade(rsEmp.getString("grade"));
						shiftData1.setEmpCode(rsEmp.getString("EmployeeCode"));

						System.out.print("BEFORE EMP-ID :\t" + empId1);
						System.out.println("EMPLOYEID :\t" + shiftData1.getEmployeeId() + "\t LOCATION :\t"
								+ shiftData1.getCurrentLocation());

						if (!empId1.equals(shiftData1.getEmployeeId())) {
							System.out.println("IN PREV IF LOOP \n" + empId1 + "," + shiftData1.getEmployeeId());
							String querySelectPrevShift2 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT;
							PreparedStatement preparedStmtPrevShift2 = connection
									.prepareStatement(querySelectPrevShift2);
							preparedStmtPrevShift2.setString(1, details.getCompanyId());
							preparedStmtPrevShift2.setString(2, prevDate.toString());
							// preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
							preparedStmtPrevShift2.setString(3, shiftData1.getEmployeeId());
							ResultSet rsPrevShift2 = preparedStmtPrevShift2.executeQuery();
							// System.out.println("IN PREV LOOP next() value\n"+rsPrevShift2.next());
							// rsPrevShift2.beforeFirst();
							if (Boolean.valueOf(rsPrevShift2.next()).equals(true)) {
								// while (rs.next()) {
								// System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t
								// :"+rs.next()+','+date);
								rsPrevShift2.beforeFirst();
								while (rsPrevShift2.next()) {
									System.out.println("IN yesterday Date loop \n");

									ExcelDownloadJSON prevShiftData = new ExcelDownloadJSON();
									prevShiftData.setEmployeeId(shiftData1.getEmployeeId());
									prevShiftData.setCurrentLocation(rsPrevShift2.getString("CurrentLocation"));
									shiftData1.setPreviousLocation(rsPrevShift2.getString("CurrentLocation"));
									System.out.println("IN yesterday Date Location \n"
											+ rsPrevShift2.getString("CurrentLocation"));
									prevShiftList.add(prevShiftData);
								}
							}

							else if (Boolean.valueOf(rsPrevShift2.next()).equals(false)) {
								// rs.beforeFirst();

								rsPrevShift2.afterLast();
								System.out.println("else if loop when data is not in prev date \t :");
								String querySelectPrevShift3 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT1;
								PreparedStatement preparedStmtPrevShift3 = connection
										.prepareStatement(querySelectPrevShift3);
								preparedStmtPrevShift3.setString(1, details.getCompanyId());
								preparedStmtPrevShift3.setString(2, details.getFromDate1().toString());
								// preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
								preparedStmtPrevShift3.setString(3, shiftData1.getEmployeeId());
								ResultSet rsPrevShift3 = preparedStmtPrevShift3.executeQuery();
								System.out.println("BEFORE NO previous date but there is a data \t :");
								if (Boolean.valueOf(rsPrevShift3.next()).equals(true)) {
									System.out.println("NO previous date but there is a data \t :");
									// while (rs.next()) {
									// System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t
									// :"+rs.next()+','+date);
									rsPrevShift3.beforeFirst();
									while (rsPrevShift3.next()) {
										System.out.println(
												"NO previous date but there is a data so select shift1 data\t :");
										String querySelectShiftLocation1 = ReportsPagingQueries.GET_SHIFT_LOC;
										PreparedStatement preparedStmtSupervisorLocation1 = connection
												.prepareStatement(querySelectShiftLocation1);
										preparedStmtSupervisorLocation1.setString(1, details.getCompanyId());

										ResultSet rsSupervisorLocation1 = preparedStmtSupervisorLocation1
												.executeQuery();
										while (rsSupervisorLocation1.next()) {
											shiftData1.setPreviousLocation(
													rsSupervisorLocation1.getString("CurrentLocation"));
										}
										// System.out.println("NO previous date but there is a data Shift1 Value\t
										// :"+rsSupervisorLocation.getString("CurrentLocation"));
									}

								} else if (Boolean.valueOf(rsPrevShift3.next()).equals(false)) {
									// rs.beforeFirst();
									rsPrevShift3.afterLast();
									while (rsPrevShift3.next()) {
										System.out.println("NO data at all \t :");

										shiftData1.setPreviousLocation("-");
										System.out.println(
												"NO data at all location\t :" + shiftData1.getPreviousLocation());
									}
								}

							}

							empId1 = shiftData1.getEmployeeId();
							details.setPrevShiftList(prevShiftList);
							System.out.println("Prev shift list \n" + prevShiftList);
						} else {
							empId1 = shiftData1.getEmployeeId();

						}
						System.out.print("EmployeeId from employee Table:" + empId1);
						employeeRetrievelist1.add(shiftData1);
						/// i=i+1;
					}

					details.setEmployeeRetrievelist(employeeRetrievelist1);
				}

			} else {

				String querySelect = ExcelDownloadQueryConstants.EMP_DATE_WISE_SHIFT__EMP_ID;
				PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
				preparedStmt.setString(1, details.getCompanyId());

				ResultSet rsEmp1 = preparedStmt.executeQuery();

				while (rsEmp1.next()) {

					EmpId = rsEmp1.getString("EmployeeId");

					System.out.println("SELECTING DATA OF EMPLOYEE \t :" + EmpId);

					System.out.println("Date:" + details.getDate());
					String querySelect1 = ReportsPagingQueries.EMP_MONTH_WISE_SHIFT_HISTORY_REPORT1;
					PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
					preparedStmt1.setString(1, details.getCompanyId());
					preparedStmt1.setString(2, details.getDate());
					preparedStmt1.setString(3, EmpId);
					ResultSet rs = preparedStmt1.executeQuery();
					// System.out.println("For checking loop condition \t :"+rs
					// +','+rs.next()+','+date);
					LocalDate fromDate1 = LocalDate.of(details.getFromDate1().getYear(),
							(details.getFromDate1().getMonth().getValue()), details.getFromDate1().getDayOfMonth());
					// LocalDate toDate1 =
					// LocalDate.of(json.getToDate1().getYear(),(json.getToDate1().getMonth().getValue()),json.getToDate1().getDayOfMonth());

					LocalDate prevDate = fromDate1.minusDays(1);
					System.out.println("PreviousDate:" + prevDate);
					if (Boolean.valueOf(rs.next()).equals(true)) {
						// while (rs.next()) {
						// System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t
						// :"+rs.next()+','+date);
						rs.beforeFirst();
						while (rs.next()) {
							System.out.println("SHIFT REPORT DATA TABLE \t :");
							ExcelDownloadJSON shiftData = new ExcelDownloadJSON();
							shiftData.setEmployeeId(rs.getString("EmployeeId"));
							shiftData.setName(rs.getString("Name"));
							shiftData.setEmployeeType(rs.getString("Type"));
							shiftData.setDepartment(rs.getString("Department"));
							shiftData.setShift(rs.getString("Shift"));
							shiftData.setDate(rs.getString("Date"));
							shiftData.setCurrentLocation(rs.getString("CurrentLocation"));
							shiftData.setShiftSuperVisorId(rs.getString("ShiftSupervisorId"));
							String querySelectSupervisor = ReportsPagingQueries.GET_SUPERVISOR;
							PreparedStatement preparedStmtSupervisor = connection
									.prepareStatement(querySelectSupervisor);
							preparedStmtSupervisor.setString(1, details.getCompanyId());
							preparedStmtSupervisor.setString(2, rs.getString("ShiftSupervisorId"));
							ResultSet rsSupervisor = preparedStmtSupervisor.executeQuery();
							while (rsSupervisor.next()) {
								shiftData.setShiftSupervisorName(rsSupervisor.getString("supervisorName"));
							}
							shiftData.setGrade(rs.getString("grade"));
							shiftData.setEmpCode(rs.getString("EmpCode"));
							System.out.print("BEFORE EMP-ID :\t" + empId);
							System.out.println("EMPLOYEID :\t" + shiftData.getEmployeeId() + "\t LOCATION :\t"
									+ shiftData.getCurrentLocation());

							if (!empId.equals(shiftData.getEmployeeId())) {
								System.out.println("IN PREV IF LOOP \n" + empId + "," + shiftData.getEmployeeId());
								String querySelectPrevShift = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT;
								PreparedStatement preparedStmtPrevShift = connection
										.prepareStatement(querySelectPrevShift);
								preparedStmtPrevShift.setString(1, details.getCompanyId());
								preparedStmtPrevShift.setString(2, prevDate.toString());
								// preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
								preparedStmtPrevShift.setString(3, shiftData.getEmployeeId());
								ResultSet rsPrevShift = preparedStmtPrevShift.executeQuery();
								// System.out.println("IN PREV LOOP next() value\n"+rsPrevShift2.next());
								// rsPrevShift2.beforeFirst();
								if (Boolean.valueOf(rsPrevShift.next()).equals(true)) {
									// while (rs.next()) {
									// System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t
									// :"+rs.next()+','+date);
									rsPrevShift.beforeFirst();
									while (rsPrevShift.next()) {
										System.out.println("IN yesterday Date loop \n");

										ExcelDownloadJSON prevShiftData = new ExcelDownloadJSON();
										prevShiftData.setEmployeeId(shiftData.getEmployeeId());
										prevShiftData.setCurrentLocation(rsPrevShift.getString("CurrentLocation"));
										shiftData.setPreviousLocation(rsPrevShift.getString("CurrentLocation"));
										System.out.println("IN yesterday Date Location \n"
												+ rsPrevShift.getString("CurrentLocation"));
										prevShiftList.add(prevShiftData);
									}
								}

								else if (Boolean.valueOf(rsPrevShift.next()).equals(false)) {
									// rs.beforeFirst();

									rsPrevShift.afterLast();
									System.out.println("else if loop when data is not in prev date \t :");
									String querySelectPrevShift4 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT1;
									PreparedStatement preparedStmtPrevShift4 = connection
											.prepareStatement(querySelectPrevShift4);
									preparedStmtPrevShift4.setString(1, details.getCompanyId());
									preparedStmtPrevShift4.setString(2, details.getFromDate1().toString());
									// preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
									preparedStmtPrevShift4.setString(3, shiftData.getEmployeeId());
									ResultSet rsPrevShift4 = preparedStmtPrevShift4.executeQuery();
									System.out.println("BEFORE NO previous date but there is a data \t :");
									if (Boolean.valueOf(rsPrevShift4.next()).equals(true)) {
										System.out.println("NO previous date but there is a data \t :");
										// while (rs.next()) {
										// System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t
										// :"+rs.next()+','+date);
										rsPrevShift4.beforeFirst();
										while (rsPrevShift4.next()) {
											System.out.println(
													"NO previous date but there is a data so select data for shift1\t :");
											String querySelectShiftLocation1 = ReportsPagingQueries.GET_SHIFT_LOC;
											PreparedStatement preparedStmtSupervisorLocation1 = connection
													.prepareStatement(querySelectShiftLocation1);
											preparedStmtSupervisorLocation1.setString(1, details.getCompanyId());

											ResultSet rsSupervisorLocation1 = preparedStmtSupervisorLocation1
													.executeQuery();
											while (rsSupervisorLocation1.next()) {
												shiftData.setPreviousLocation(
														rsSupervisorLocation1.getString("CurrentLocation"));
											}
											// System.out.println("NO previous date but there is a data so shift1
											// Value\t :"+rsSupervisorLocation1.getString("CurrentLocation"));
										}
									} else if (Boolean.valueOf(rsPrevShift4.next()).equals(false)) {
										// rs.beforeFirst();
										rsPrevShift4.afterLast();
										System.out.println("NO data at all \t :");

										while (rsPrevShift4.next()) {

											shiftData.setPreviousLocation("-");
											System.out.println(
													"NO data at all location\t :" + shiftData.getPreviousLocation());
										}
									}

								}

								/*
								 * while (rsPrevShift.next()) { System.out.println("IN PREV LOOP \n");
								 * 
								 * ReportsPagingJSON prevShiftData = new ReportsPagingJSON();
								 * prevShiftData.setEmployeeId(shiftData.getEmployeeId());
								 * prevShiftData.setCurrentLocation(rsPrevShift.getString("CurrentLocation"));
								 * shiftData.setPreviousLocation(rsPrevShift.getString("CurrentLocation"));
								 * 
								 * prevShiftList.add(prevShiftData); }
								 */
								empId = shiftData.getEmployeeId();
								details.setPrevShiftList(prevShiftList);
								System.out.println("Prev shift list \n" + prevShiftList);
							} else {
								empId = shiftData.getEmployeeId();
								System.out.print("ELSE EMP-ID :\t" + empId);
							}

							employeeRetrievelist.add(shiftData);
						}

						// json.setShiftList(shiftList1);

					} else if (Boolean.valueOf(rs.next()).equals(false)) {
						rs.afterLast();

						System.out.println("EMPLOYEE TABLE \t :");
						String querySelectEmp = ReportsPagingQueries.EMP_MONTH_WISE_SHIFT_HISTORY_REPORT_Emp;
						PreparedStatement preparedStmtEmp = connection.prepareStatement(querySelectEmp);
						preparedStmtEmp.setString(1, details.getCompanyId());
						preparedStmtEmp.setString(2, EmpId);

						ResultSet rsEmp = preparedStmtEmp.executeQuery();

						while (rsEmp.next()) {
							rsEmp.first();
							rsEmp.last();
							int numberOfRows = rsEmp.getRow();
							System.out.println("EMPLOYEE TABLE \t :" + numberOfRows);
							ExcelDownloadJSON shiftData1 = new ExcelDownloadJSON();
							shiftData1.setEmployeeId(rsEmp.getString("EmployeeId"));

							shiftData1.setName(rsEmp.getString("Name"));
							shiftData1.setEmployeeType(rsEmp.getString("Type"));
							shiftData1.setDepartment(rsEmp.getString("Department"));
							shiftData1.setShift("1");
							shiftData1.setDate(details.getDate());
							String querySelectShiftLocation = ReportsPagingQueries.GET_SHIFT_LOC;
							PreparedStatement preparedStmtSupervisorLocation = connection
									.prepareStatement(querySelectShiftLocation);
							preparedStmtSupervisorLocation.setString(1, details.getCompanyId());

							ResultSet rsSupervisorLocation = preparedStmtSupervisorLocation.executeQuery();
							while (rsSupervisorLocation.next()) {
								shiftData1.setCurrentLocation(rsSupervisorLocation.getString("CurrentLocation"));
							}
							shiftData1.setShiftSuperVisorId("-");
							String querySelectSupervisor = ReportsPagingQueries.GET_SUPERVISOR;
							PreparedStatement preparedStmtSupervisor = connection
									.prepareStatement(querySelectSupervisor);
							preparedStmtSupervisor.setString(1, details.getCompanyId());
							preparedStmtSupervisor.setString(2, rsEmp.getString("ReportingManagerId"));
							ResultSet rsSupervisor = preparedStmtSupervisor.executeQuery();
							while (rsSupervisor.next()) {
								shiftData1.setShiftSupervisorName("-");
							}
							shiftData1.setGrade(rsEmp.getString("grade"));
							shiftData1.setEmpCode(rsEmp.getString("EmployeeCode"));

							System.out.print("BEFORE EMP-ID :\t" + empId1);
							System.out.println("EMPLOYEID :\t" + shiftData1.getEmployeeId() + "\t LOCATION :\t"
									+ shiftData1.getCurrentLocation());

							if (!empId1.equals(shiftData1.getEmployeeId())) {
								System.out.println("IN PREV IF LOOP \n" + empId1 + "," + shiftData1.getEmployeeId());
								String querySelectPrevShift2 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT;
								PreparedStatement preparedStmtPrevShift2 = connection
										.prepareStatement(querySelectPrevShift2);
								preparedStmtPrevShift2.setString(1, details.getCompanyId());
								preparedStmtPrevShift2.setString(2, prevDate.toString());
								// preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
								preparedStmtPrevShift2.setString(3, shiftData1.getEmployeeId());
								ResultSet rsPrevShift2 = preparedStmtPrevShift2.executeQuery();
								// System.out.println("IN PREV LOOP next() value\n"+rsPrevShift2.next());
								// rsPrevShift2.beforeFirst();
								if (Boolean.valueOf(rsPrevShift2.next()).equals(true)) {
									// while (rs.next()) {
									// System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t
									// :"+rs.next()+','+date);
									rsPrevShift2.beforeFirst();
									while (rsPrevShift2.next()) {
										System.out.println("IN yesterday Date loop \n");

										ExcelDownloadJSON prevShiftData = new ExcelDownloadJSON();
										prevShiftData.setEmployeeId(shiftData1.getEmployeeId());
										prevShiftData.setCurrentLocation(rsPrevShift2.getString("CurrentLocation"));
										shiftData1.setPreviousLocation(rsPrevShift2.getString("CurrentLocation"));
										System.out.println("IN yesterday Date Location \n"
												+ rsPrevShift2.getString("CurrentLocation"));
										prevShiftList.add(prevShiftData);
									}
								}

								else if (Boolean.valueOf(rsPrevShift2.next()).equals(false)) {
									// rs.beforeFirst();

									rsPrevShift2.afterLast();
									System.out.println("else if loop when data is not in prev date \t :");
									String querySelectPrevShift3 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT1;
									PreparedStatement preparedStmtPrevShift3 = connection
											.prepareStatement(querySelectPrevShift3);
									preparedStmtPrevShift3.setString(1, details.getCompanyId());
									preparedStmtPrevShift3.setString(2, details.getFromDate1().toString());
									// preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
									preparedStmtPrevShift3.setString(3, shiftData1.getEmployeeId());
									ResultSet rsPrevShift3 = preparedStmtPrevShift3.executeQuery();
									System.out.println("BEFORE NO previous date but there is a data \t :");
									if (Boolean.valueOf(rsPrevShift3.next()).equals(true)) {
										System.out.println("NO previous date but there is a data \t :");
										// while (rs.next()) {
										// System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t
										// :"+rs.next()+','+date);
										rsPrevShift3.beforeFirst();
										while (rsPrevShift3.next()) {
											System.out.println(
													"NO previous date but there is a data so select shift1 data\t :");
											String querySelectShiftLocation1 = ReportsPagingQueries.GET_SHIFT_LOC;
											PreparedStatement preparedStmtSupervisorLocation1 = connection
													.prepareStatement(querySelectShiftLocation1);
											preparedStmtSupervisorLocation1.setString(1, details.getCompanyId());

											ResultSet rsSupervisorLocation1 = preparedStmtSupervisorLocation1
													.executeQuery();
											while (rsSupervisorLocation1.next()) {
												shiftData1.setPreviousLocation(
														rsSupervisorLocation1.getString("CurrentLocation"));
											}
											// System.out.println("NO previous date but there is a data Shift1 Value\t
											// :"+rsSupervisorLocation.getString("CurrentLocation"));
										}

									} else if (Boolean.valueOf(rsPrevShift3.next()).equals(false)) {
										// rs.beforeFirst();
										rsPrevShift3.afterLast();
										while (rsPrevShift3.next()) {
											System.out.println("NO data at all \t :");

											shiftData1.setPreviousLocation("-");
											System.out.println(
													"NO data at all location\t :" + shiftData1.getPreviousLocation());
										}
									}

								}

								/*
								 * while (rsPrevShift.next()) { System.out.println("IN PREV LOOP \n");
								 * 
								 * ReportsPagingJSON prevShiftData = new ReportsPagingJSON();
								 * prevShiftData.setEmployeeId(shiftData.getEmployeeId());
								 * prevShiftData.setCurrentLocation(rsPrevShift.getString("CurrentLocation"));
								 * shiftData.setPreviousLocation(rsPrevShift.getString("CurrentLocation"));
								 * 
								 * prevShiftList.add(prevShiftData); }
								 */
								empId1 = shiftData1.getEmployeeId();
								details.setPrevShiftList(prevShiftList);
								System.out.println("Prev shift list \n" + prevShiftList);
							} else {
								empId1 = shiftData1.getEmployeeId();

							}
							System.out.print("EmployeeId from employee Table:" + empId1);
							employeeRetrievelist1.add(shiftData1);
							/// i=i+1;
						}
					}
				}
				employeeRetrievelist.addAll(employeeRetrievelist1);

				System.out.print("ShiftList Content:" + employeeRetrievelist.size());
				System.out.print("ShiftList1 Content:" + employeeRetrievelist1.size());

				details.setEmployeeRetrievelist(employeeRetrievelist);

			}

			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {
			DatabaseUtil.closeConnection(connection);
		}

		return details;
	}

	/*
	 * FUCNTION FOR GENERTING DATE WISE SHIFT HISTORY REPORT FOR DONLOAD
	 */

	public static ExcelDownloadJSON DateWiseShiftWiseReport(ExcelDownloadJSON details) {
		ArrayList<ExcelDownloadJSON> employeeRetrievelist = new ArrayList<ExcelDownloadJSON>();
		ArrayList<ExcelDownloadJSON> employeeRetrievelist1 = new ArrayList<ExcelDownloadJSON>();
		ArrayList<ExcelDownloadJSON> prevShiftList = new ArrayList<ExcelDownloadJSON>();

		String EmpId = "";
		String empId = "";
		String empId1 = "";

		int i = 1;

		Connection connection = null;

		try {
			connection = DatabaseUtil.getDBConnection();

			String querySelectEmpId = ExcelDownloadQueryConstants.EMP_PERIOD_WISE_SHIFT_HISTORY_REPORT_EMP_ID;
			PreparedStatement preparedStmtEmpId = connection.prepareStatement(querySelectEmpId);
			preparedStmtEmpId.setString(1, details.getCompanyId());

			ResultSet rsEmpId = preparedStmtEmpId.executeQuery();
			while (rsEmpId.next()) {

				EmpId = rsEmpId.getString("EmployeeId");

				System.out.println("SELECTING DATA OF EMPLOYEE \t :" + EmpId);

				LocalDate fromDate1 = LocalDate.of(details.getFromDate1().getYear(),
						(details.getFromDate1().getMonth().getValue()), details.getFromDate1().getDayOfMonth());

				LocalDate prevDate = fromDate1.minusDays(1);
				System.out.println("PreviousDate:" + prevDate);

				System.out.println("Date:" + details.getDate());
				String querySelect = ExcelDownloadQueryConstants.EMP_MONTH_WISE_SHIFT_HISTORY_REPORT1;
				PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
				preparedStmt.setString(1, details.getCompanyId());
				preparedStmt.setString(2, details.getDate());
				preparedStmt.setString(3, EmpId);
				ResultSet rs = preparedStmt.executeQuery();
				if (Boolean.valueOf(rs.next()).equals(true)) {
					// while (rs.next()) {
					// System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t
					// :"+rs.next()+','+date);
					rs.beforeFirst();
					while (rs.next()) {
						System.out.println("SHIFT REPORT DATA TABLE \t :");
						ExcelDownloadJSON shiftData = new ExcelDownloadJSON();
						shiftData.setEmployeeId(rs.getString("EmployeeId"));
						shiftData.setName(rs.getString("Name"));
						shiftData.setEmployeeType(rs.getString("Type"));
						shiftData.setDepartment(rs.getString("Department"));
						shiftData.setShift(rs.getString("Shift"));
						shiftData.setDate(rs.getString("Date"));
						shiftData.setCurrentLocation(rs.getString("CurrentLocation"));
						shiftData.setShiftSuperVisorId(rs.getString("ShiftSupervisorId"));
						String querySelectSupervisor = ExcelDownloadQueryConstants.GET_SUPERVISOR;
						PreparedStatement preparedStmtSupervisor = connection.prepareStatement(querySelectSupervisor);
						preparedStmtSupervisor.setString(1, details.getCompanyId());
						preparedStmtSupervisor.setString(2, rs.getString("ShiftSupervisorId"));
						ResultSet rsSupervisor = preparedStmtSupervisor.executeQuery();
						while (rsSupervisor.next()) {
							shiftData.setShiftSupervisorName(rsSupervisor.getString("supervisorName"));
						}
						shiftData.setGrade(rs.getString("grade"));
						shiftData.setEmpCode(rs.getString("EmpCode"));
						System.out.print("BEFORE EMP-ID :\t" + empId);
						System.out.println("EMPLOYEID :\t" + shiftData.getEmployeeId() + "\t LOCATION :\t"
								+ shiftData.getCurrentLocation());

						if (!empId.equals(shiftData.getEmployeeId())) {
							System.out.println("IN PREV LOOP IF LOOP \n" + empId + "," + shiftData.getEmployeeId());
							String querySelectPrevShift = ExcelDownloadQueryConstants.SELECT_EMP_PREV_SHIFT;
							PreparedStatement preparedStmtPrevShift = connection.prepareStatement(querySelectPrevShift);
							preparedStmtPrevShift.setString(1, details.getCompanyId());
							preparedStmtPrevShift.setString(2, prevDate.toString());
							preparedStmtPrevShift.setString(3, shiftData.getEmployeeId());
							ResultSet rsPrevShift = preparedStmtPrevShift.executeQuery();
							System.out.println("IN PREV LOOP \n");
							if (Boolean.valueOf(rsPrevShift.next()).equals(true)) {
								// while (rs.next()) {
								// System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t
								// :"+rs.next()+','+date);
								rsPrevShift.beforeFirst();
								while (rsPrevShift.next()) {
									System.out.println("IN yesterday Date loop \n");

									ExcelDownloadJSON prevShiftData = new ExcelDownloadJSON();
									prevShiftData.setEmployeeId(shiftData.getEmployeeId());
									prevShiftData.setCurrentLocation(rsPrevShift.getString("CurrentLocation"));
									shiftData.setPreviousLocation(rsPrevShift.getString("CurrentLocation"));
									System.out.println(
											"IN yesterday Date Location \n" + rsPrevShift.getString("CurrentLocation"));
									prevShiftList.add(prevShiftData);
								}
							} else if (Boolean.valueOf(rsPrevShift.next()).equals(false)) {
								// rs.beforeFirst();

								rsPrevShift.afterLast();
								System.out.println("else if loop when data is not in prev date \t :");
								String querySelectPrevShift4 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT1;
								PreparedStatement preparedStmtPrevShift4 = connection
										.prepareStatement(querySelectPrevShift4);
								preparedStmtPrevShift4.setString(1, details.getCompanyId());
								preparedStmtPrevShift4.setString(2, details.getFromDate1().toString());
								preparedStmtPrevShift4.setString(3, shiftData.getEmployeeId());
								ResultSet rsPrevShift4 = preparedStmtPrevShift4.executeQuery();
								System.out.println("BEFORE NO previous date but there is a data \t :");
								if (Boolean.valueOf(rsPrevShift4.next()).equals(true)) {
									System.out.println("NO previous date but there is a data \t :");
									// while (rs.next()) {
									// System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t
									// :"+rs.next()+','+date);
									rsPrevShift4.beforeFirst();
									while (rsPrevShift4.next()) {
										System.out.println(
												"NO previous date but there is a data so select data for shift1\t :");
										String querySelectShiftLocation1 = ReportsPagingQueries.GET_SHIFT_LOC;
										PreparedStatement preparedStmtSupervisorLocation1 = connection
												.prepareStatement(querySelectShiftLocation1);
										preparedStmtSupervisorLocation1.setString(1, details.getCompanyId());

										ResultSet rsSupervisorLocation1 = preparedStmtSupervisorLocation1
												.executeQuery();
										while (rsSupervisorLocation1.next()) {
											shiftData.setPreviousLocation(
													rsSupervisorLocation1.getString("CurrentLocation"));
										}
										// System.out.println("NO previous date but there is a data so shift1 Value\t
										// :"+rsSupervisorLocation1.getString("CurrentLocation"));
									}
								} else if (Boolean.valueOf(rsPrevShift4.next()).equals(false)) {
									// rs.beforeFirst();
									rsPrevShift4.afterLast();
									System.out.println("NO data at all \t :");

									while (rsPrevShift4.next()) {

										shiftData.setPreviousLocation("-");
										System.out.println(
												"NO data at all location\t :" + shiftData.getPreviousLocation());
									}
								}

							}

							empId = shiftData.getEmployeeId();
							details.setPrevShiftList(prevShiftList);
							System.out.println("Prev shift list \n" + prevShiftList);

						} else {
							empId = shiftData.getEmployeeId();
							System.out.print("ELSE EMP-ID :\t" + empId);
						}

						employeeRetrievelist.add(shiftData);
					}

					// json.setShiftList(shiftList1);
				}

				else if (Boolean.valueOf(rs.next()).equals(false)) {
					// rs.beforeFirst();

					rs.afterLast();

					// System.out.println("EMPLOYEE TABLE \t :"+i);
					String querySelectEmp = ExcelDownloadQueryConstants.EMP_MONTH_WISE_SHIFT_HISTORY_REPORT_Emp;
					PreparedStatement preparedStmtEmp = connection.prepareStatement(querySelectEmp);
					preparedStmtEmp.setString(1, details.getCompanyId());
					preparedStmtEmp.setString(2, EmpId);
					ResultSet rsEmp = preparedStmtEmp.executeQuery();

					while (rsEmp.next()) {
						rsEmp.first();
						rsEmp.last();
						int numberOfRows = rsEmp.getRow();
						System.out.println("EMPLOYEE TABLE \t :" + i + ',' + numberOfRows);
						ExcelDownloadJSON shiftData1 = new ExcelDownloadJSON();
						shiftData1.setEmployeeId(rsEmp.getString("EmployeeId"));

						shiftData1.setName(rsEmp.getString("Name"));
						shiftData1.setEmployeeType(rsEmp.getString("Type"));
						shiftData1.setDepartment(rsEmp.getString("Department"));
						shiftData1.setShift("1");
						shiftData1.setDate(details.getDate());
						// shiftData1.setCurrentLocation(rsEmp.getString("CurrentLocation"));

						String querySelectShiftLocation = ReportsPagingQueries.GET_SHIFT_LOC;
						PreparedStatement preparedStmtSupervisorLocation = connection
								.prepareStatement(querySelectShiftLocation);
						preparedStmtSupervisorLocation.setString(1, details.getCompanyId());

						ResultSet rsSupervisorLocation = preparedStmtSupervisorLocation.executeQuery();
						while (rsSupervisorLocation.next()) {
							shiftData1.setCurrentLocation(rsSupervisorLocation.getString("CurrentLocation"));
						}
						shiftData1.setShiftSuperVisorId("-");
						String querySelectSupervisor = ExcelDownloadQueryConstants.GET_SUPERVISOR;
						PreparedStatement preparedStmtSupervisor = connection.prepareStatement(querySelectSupervisor);
						preparedStmtSupervisor.setString(1, details.getCompanyId());
						preparedStmtSupervisor.setString(2, rsEmp.getString("ReportingManagerId"));
						ResultSet rsSupervisor = preparedStmtSupervisor.executeQuery();
						while (rsSupervisor.next()) {
							shiftData1.setShiftSupervisorName("-");
						}
						shiftData1.setGrade(rsEmp.getString("grade"));
						shiftData1.setEmpCode(rsEmp.getString("EmployeeCode"));

						if (!empId1.equals(shiftData1.getEmployeeId())) {
							System.out.println("IN PREV  IF LOOP \n" + empId1 + "," + shiftData1.getEmployeeId());
							String querySelectPrevShift2 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT;
							PreparedStatement preparedStmtPrevShift2 = connection
									.prepareStatement(querySelectPrevShift2);
							preparedStmtPrevShift2.setString(1, details.getCompanyId());
							preparedStmtPrevShift2.setString(2, prevDate.toString());
							preparedStmtPrevShift2.setString(3, shiftData1.getEmployeeId());
							ResultSet rsPrevShift2 = preparedStmtPrevShift2.executeQuery();

							if (Boolean.valueOf(rsPrevShift2.next()).equals(true)) {
								rsPrevShift2.beforeFirst();
								while (rsPrevShift2.next()) {
									System.out.println("IN yesterday Date loop \n");

									ExcelDownloadJSON prevShiftData = new ExcelDownloadJSON();
									prevShiftData.setEmployeeId(shiftData1.getEmployeeId());
									prevShiftData.setCurrentLocation(rsPrevShift2.getString("CurrentLocation"));
									shiftData1.setPreviousLocation(rsPrevShift2.getString("CurrentLocation"));
									System.out.println("IN yesterday Date Location \n"
											+ rsPrevShift2.getString("CurrentLocation"));
									prevShiftList.add(prevShiftData);
								}
							}

							else if (Boolean.valueOf(rsPrevShift2.next()).equals(false)) {
								// rs.beforeFirst();

								rsPrevShift2.afterLast();
								System.out.println("else if loop when data is not in prev date \t :");
								String querySelectPrevShift3 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT1;
								PreparedStatement preparedStmtPrevShift3 = connection
										.prepareStatement(querySelectPrevShift3);
								preparedStmtPrevShift3.setString(1, details.getCompanyId());
								preparedStmtPrevShift3.setString(2, details.getFromDate1().toString());
								// preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
								preparedStmtPrevShift3.setString(3, shiftData1.getEmployeeId());
								ResultSet rsPrevShift3 = preparedStmtPrevShift3.executeQuery();
								System.out.println("BEFORE NO previous date but there is a data \t :");
								if (Boolean.valueOf(rsPrevShift3.next()).equals(true)) {
									System.out.println("NO previous date but there is a data \t :");
									// while (rs.next()) {
									// System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t
									// :"+rs.next()+','+date);
									rsPrevShift3.beforeFirst();
									while (rsPrevShift3.next()) {
										System.out.println(
												"NO previous date but there is a data so select shift1 data\t :");
										String querySelectShiftLocation1 = ReportsPagingQueries.GET_SHIFT_LOC;
										PreparedStatement preparedStmtSupervisorLocation1 = connection
												.prepareStatement(querySelectShiftLocation1);
										preparedStmtSupervisorLocation1.setString(1, details.getCompanyId());

										ResultSet rsSupervisorLocation1 = preparedStmtSupervisorLocation1
												.executeQuery();
										while (rsSupervisorLocation1.next()) {
											shiftData1.setPreviousLocation(
													rsSupervisorLocation1.getString("CurrentLocation"));
										}
										// System.out.println("NO previous date but there is a data Shift1 Value\t
										// :"+rsSupervisorLocation.getString("CurrentLocation"));
									}

								} else if (Boolean.valueOf(rsPrevShift3.next()).equals(false)) {
									// rs.beforeFirst();
									rsPrevShift3.afterLast();
									while (rsPrevShift3.next()) {
										System.out.println("NO data at all \t :");

										shiftData1.setPreviousLocation("-");
										System.out.println(
												"NO data at all location\t :" + shiftData1.getPreviousLocation());
									}
								}

							}

							empId1 = shiftData1.getEmployeeId();
							details.setPrevShiftList(prevShiftList);
							System.out.println("Prev shift list \n" + prevShiftList);

						} else {
							empId = shiftData1.getEmployeeId();

						}
						System.out.print("EmployeeId from employee Table:" + empId);
						employeeRetrievelist1.add(shiftData1);
						i = i + 1;

					}

					// json.setShiftList(shiftList);

				}

				// }

			}

			employeeRetrievelist.addAll(employeeRetrievelist1);
			details.setEmployeeRetrievelist(employeeRetrievelist);
			details.setPrevShiftList(prevShiftList);

			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {
			DatabaseUtil.closeConnection(connection);
		}

		return details;
	}

	/*
	 * FUCNTION FOR GENERTING PERIOD WISE SHIFT HISTORY REPORT FOR DONLOAD
	 */

	public static ExcelDownloadJSON PeriodWiseShiftWiseReport(ExcelDownloadJSON details) {

		Connection connection = null;
		ArrayList<ExcelDownloadJSON> employeeRetrievelist = new ArrayList<ExcelDownloadJSON>();
		ArrayList<ExcelDownloadJSON> employeeRetrievelist1 = new ArrayList<ExcelDownloadJSON>();
		ArrayList<ExcelDownloadJSON> prevShiftList = new ArrayList<ExcelDownloadJSON>();
		ArrayList<ExcelDownloadJSON> vacancyReportlist = new ArrayList<ExcelDownloadJSON>();
		String EmpId = "";
		String empId = "";
		String empId1 = "";

		int i = 1;

		try {

			connection = DatabaseUtil.getDBConnection();

			String querySelectEmpId = ExcelDownloadQueryConstants.EMP_PERIOD_WISE_SHIFT_HISTORY_REPORT_EMP_ID;
			PreparedStatement preparedStmtEmpId = connection.prepareStatement(querySelectEmpId);
			preparedStmtEmpId.setString(1, details.getCompanyId());

			ResultSet rsEmpId = preparedStmtEmpId.executeQuery();
			while (rsEmpId.next()) {

				EmpId = rsEmpId.getString("EmployeeId");

				System.out.println("SELECTING DATA OF EMPLOYEE \t :" + EmpId);

				LocalDate fromDate1 = LocalDate.of(details.getFromDate1().getYear(),
						(details.getFromDate1().getMonth().getValue()), details.getFromDate1().getDayOfMonth());
				LocalDate toDate1 = LocalDate.of(details.getToDate1().getYear(),
						(details.getToDate1().getMonth().getValue()), details.getToDate1().getDayOfMonth());

				LocalDate prevDate = fromDate1.minusDays(1);
				System.out.println("PreviousDate:" + prevDate);
				for (LocalDate date = fromDate1; !date.isAfter(toDate1); date = date.plusDays(1)) {
					System.out.println("Date:" + date);
					String querySelect = ExcelDownloadQueryConstants.EMP_MONTH_WISE_SHIFT_HISTORY_REPORT1;
					PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
					preparedStmt.setString(1, details.getCompanyId());
					preparedStmt.setString(2, date.toString());
					preparedStmt.setString(3, EmpId);
					ResultSet rs = preparedStmt.executeQuery();
					if (Boolean.valueOf(rs.next()).equals(true)) {
						// while (rs.next()) {
						// System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t
						// :"+rs.next()+','+date);
						rs.beforeFirst();
						while (rs.next()) {
							System.out.println("SHIFT REPORT DATA TABLE \t :");
							ExcelDownloadJSON shiftData = new ExcelDownloadJSON();
							shiftData.setEmployeeId(rs.getString("EmployeeId"));
							shiftData.setName(rs.getString("Name"));
							shiftData.setEmployeeType(rs.getString("Type"));
							shiftData.setDepartment(rs.getString("Department"));
							shiftData.setShift(rs.getString("Shift"));
							shiftData.setDate(rs.getString("Date"));
							shiftData.setCurrentLocation(rs.getString("CurrentLocation"));
							shiftData.setShiftSuperVisorId(rs.getString("ShiftSupervisorId"));
							String querySelectSupervisor = ExcelDownloadQueryConstants.GET_SUPERVISOR;
							PreparedStatement preparedStmtSupervisor = connection
									.prepareStatement(querySelectSupervisor);
							preparedStmtSupervisor.setString(1, details.getCompanyId());
							preparedStmtSupervisor.setString(2, rs.getString("ShiftSupervisorId"));
							ResultSet rsSupervisor = preparedStmtSupervisor.executeQuery();
							while (rsSupervisor.next()) {
								shiftData.setShiftSupervisorName(rsSupervisor.getString("supervisorName"));
							}
							shiftData.setGrade(rs.getString("grade"));
							shiftData.setEmpCode(rs.getString("EmpCode"));
							System.out.print("BEFORE EMP-ID :\t" + empId);
							System.out.println("EMPLOYEID :\t" + shiftData.getEmployeeId() + "\t LOCATION :\t"
									+ shiftData.getCurrentLocation());

							if (!empId.equals(shiftData.getEmployeeId())) {
								System.out.println("IN PREV LOOP IF LOOP \n" + empId + "," + shiftData.getEmployeeId());
								String querySelectPrevShift = ExcelDownloadQueryConstants.SELECT_EMP_PREV_SHIFT;
								PreparedStatement preparedStmtPrevShift = connection
										.prepareStatement(querySelectPrevShift);
								preparedStmtPrevShift.setString(1, details.getCompanyId());
								preparedStmtPrevShift.setString(2, prevDate.toString());
								preparedStmtPrevShift.setString(3, shiftData.getEmployeeId());
								ResultSet rsPrevShift = preparedStmtPrevShift.executeQuery();
								System.out.println("IN PREV LOOP \n");
								if (Boolean.valueOf(rsPrevShift.next()).equals(true)) {
									// while (rs.next()) {
									// System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t
									// :"+rs.next()+','+date);
									rsPrevShift.beforeFirst();
									while (rsPrevShift.next()) {
										System.out.println("IN yesterday Date loop \n");

										ExcelDownloadJSON prevShiftData = new ExcelDownloadJSON();
										prevShiftData.setEmployeeId(shiftData.getEmployeeId());
										prevShiftData.setCurrentLocation(rsPrevShift.getString("CurrentLocation"));
										shiftData.setPreviousLocation(rsPrevShift.getString("CurrentLocation"));
										System.out.println("IN yesterday Date Location \n"
												+ rsPrevShift.getString("CurrentLocation"));
										prevShiftList.add(prevShiftData);
									}
								} else if (Boolean.valueOf(rsPrevShift.next()).equals(false)) {
									// rs.beforeFirst();

									rsPrevShift.afterLast();
									System.out.println("else if loop when data is not in prev date \t :");
									String querySelectPrevShift4 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT1;
									PreparedStatement preparedStmtPrevShift4 = connection
											.prepareStatement(querySelectPrevShift4);
									preparedStmtPrevShift4.setString(1, details.getCompanyId());
									preparedStmtPrevShift4.setString(2, details.getFromDate());
									preparedStmtPrevShift4.setString(3, shiftData.getEmployeeId());
									ResultSet rsPrevShift4 = preparedStmtPrevShift4.executeQuery();
									System.out.println("BEFORE NO previous date but there is a data \t :");
									if (Boolean.valueOf(rsPrevShift4.next()).equals(true)) {
										System.out.println("NO previous date but there is a data \t :");
										// while (rs.next()) {
										// System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t
										// :"+rs.next()+','+date);
										rsPrevShift4.beforeFirst();
										while (rsPrevShift4.next()) {
											System.out.println(
													"NO previous date but there is a data so select data for shift1\t :");
											String querySelectShiftLocation1 = ReportsPagingQueries.GET_SHIFT_LOC;
											PreparedStatement preparedStmtSupervisorLocation1 = connection
													.prepareStatement(querySelectShiftLocation1);
											preparedStmtSupervisorLocation1.setString(1, details.getCompanyId());

											ResultSet rsSupervisorLocation1 = preparedStmtSupervisorLocation1
													.executeQuery();
											while (rsSupervisorLocation1.next()) {
												shiftData.setPreviousLocation(
														rsSupervisorLocation1.getString("CurrentLocation"));
											}
											// System.out.println("NO previous date but there is a data so shift1
											// Value\t :"+rsSupervisorLocation1.getString("CurrentLocation"));
										}
									} else if (Boolean.valueOf(rsPrevShift4.next()).equals(false)) {
										// rs.beforeFirst();
										rsPrevShift4.afterLast();
										System.out.println("NO data at all \t :");

										while (rsPrevShift4.next()) {

											shiftData.setPreviousLocation("-");
											System.out.println(
													"NO data at all location\t :" + shiftData.getPreviousLocation());
										}
									}

								}

								empId = shiftData.getEmployeeId();
								details.setPrevShiftList(prevShiftList);
								System.out.println("Prev shift list \n" + prevShiftList);

							} else {
								empId = shiftData.getEmployeeId();
								System.out.print("ELSE EMP-ID :\t" + empId);
							}

							employeeRetrievelist.add(shiftData);
						}

						// json.setShiftList(shiftList1);
					}

					else if (Boolean.valueOf(rs.next()).equals(false)) {
						// rs.beforeFirst();

						rs.afterLast();

						// System.out.println("EMPLOYEE TABLE \t :"+i);
						String querySelectEmp = ExcelDownloadQueryConstants.EMP_MONTH_WISE_SHIFT_HISTORY_REPORT_Emp;
						PreparedStatement preparedStmtEmp = connection.prepareStatement(querySelectEmp);
						preparedStmtEmp.setString(1, details.getCompanyId());
						preparedStmtEmp.setString(2, EmpId);
						ResultSet rsEmp = preparedStmtEmp.executeQuery();

						while (rsEmp.next()) {
							rsEmp.first();
							rsEmp.last();
							int numberOfRows = rsEmp.getRow();
							System.out.println("EMPLOYEE TABLE \t :" + i + ',' + numberOfRows);
							ExcelDownloadJSON shiftData1 = new ExcelDownloadJSON();
							shiftData1.setEmployeeId(rsEmp.getString("EmployeeId"));

							shiftData1.setName(rsEmp.getString("Name"));
							shiftData1.setEmployeeType(rsEmp.getString("Type"));
							shiftData1.setDepartment(rsEmp.getString("Department"));
							shiftData1.setShift("1");
							shiftData1.setDate(date.toString());
							// shiftData1.setCurrentLocation(rsEmp.getString("CurrentLocation"));
							String querySelectShiftLocation = ReportsPagingQueries.GET_SHIFT_LOC;
							PreparedStatement preparedStmtSupervisorLocation = connection
									.prepareStatement(querySelectShiftLocation);
							preparedStmtSupervisorLocation.setString(1, details.getCompanyId());

							ResultSet rsSupervisorLocation = preparedStmtSupervisorLocation.executeQuery();
							while (rsSupervisorLocation.next()) {
								shiftData1.setCurrentLocation(rsSupervisorLocation.getString("CurrentLocation"));
							}

							shiftData1.setShiftSuperVisorId("-");
							String querySelectSupervisor = ExcelDownloadQueryConstants.GET_SUPERVISOR;
							PreparedStatement preparedStmtSupervisor = connection
									.prepareStatement(querySelectSupervisor);
							preparedStmtSupervisor.setString(1, details.getCompanyId());
							preparedStmtSupervisor.setString(2, rsEmp.getString("ReportingManagerId"));
							ResultSet rsSupervisor = preparedStmtSupervisor.executeQuery();
							while (rsSupervisor.next()) {
								shiftData1.setShiftSupervisorName("-");
							}
							shiftData1.setGrade(rsEmp.getString("grade"));
							shiftData1.setEmpCode(rsEmp.getString("EmployeeCode"));

							if (!empId1.equals(shiftData1.getEmployeeId())) {
								System.out.println("IN PREV  IF LOOP \n" + empId1 + "," + shiftData1.getEmployeeId());
								String querySelectPrevShift2 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT;
								PreparedStatement preparedStmtPrevShift2 = connection
										.prepareStatement(querySelectPrevShift2);
								preparedStmtPrevShift2.setString(1, details.getCompanyId());
								preparedStmtPrevShift2.setString(2, prevDate.toString());
								preparedStmtPrevShift2.setString(3, shiftData1.getEmployeeId());
								ResultSet rsPrevShift2 = preparedStmtPrevShift2.executeQuery();

								if (Boolean.valueOf(rsPrevShift2.next()).equals(true)) {
									rsPrevShift2.beforeFirst();
									while (rsPrevShift2.next()) {
										System.out.println("IN yesterday Date loop \n");

										ExcelDownloadJSON prevShiftData = new ExcelDownloadJSON();
										prevShiftData.setEmployeeId(shiftData1.getEmployeeId());
										prevShiftData.setCurrentLocation(rsPrevShift2.getString("CurrentLocation"));
										shiftData1.setPreviousLocation(rsPrevShift2.getString("CurrentLocation"));
										System.out.println("IN yesterday Date Location \n"
												+ rsPrevShift2.getString("CurrentLocation"));
										prevShiftList.add(prevShiftData);
									}
								}

								else if (Boolean.valueOf(rsPrevShift2.next()).equals(false)) {
									// rs.beforeFirst();

									rsPrevShift2.afterLast();
									System.out.println("else if loop when data is not in prev date \t :");
									String querySelectPrevShift3 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT1;
									PreparedStatement preparedStmtPrevShift3 = connection
											.prepareStatement(querySelectPrevShift3);
									preparedStmtPrevShift3.setString(1, details.getCompanyId());
									preparedStmtPrevShift3.setString(2, details.getFromDate());
									// preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
									preparedStmtPrevShift3.setString(3, shiftData1.getEmployeeId());
									ResultSet rsPrevShift3 = preparedStmtPrevShift3.executeQuery();
									System.out.println("BEFORE NO previous date but there is a data \t :");
									if (Boolean.valueOf(rsPrevShift3.next()).equals(true)) {
										System.out.println("NO previous date but there is a data \t :");
										// while (rs.next()) {
										// System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t
										// :"+rs.next()+','+date);
										rsPrevShift3.beforeFirst();
										while (rsPrevShift3.next()) {
											System.out.println(
													"NO previous date but there is a data so select shift1 data\t :");
											String querySelectShiftLocation1 = ReportsPagingQueries.GET_SHIFT_LOC;
											PreparedStatement preparedStmtSupervisorLocation1 = connection
													.prepareStatement(querySelectShiftLocation1);
											preparedStmtSupervisorLocation1.setString(1, details.getCompanyId());

											ResultSet rsSupervisorLocation1 = preparedStmtSupervisorLocation1
													.executeQuery();
											while (rsSupervisorLocation1.next()) {
												shiftData1.setPreviousLocation(
														rsSupervisorLocation1.getString("CurrentLocation"));
											}
											// System.out.println("NO previous date but there is a data Shift1 Value\t
											// :"+rsSupervisorLocation.getString("CurrentLocation"));
										}

									} else if (Boolean.valueOf(rsPrevShift3.next()).equals(false)) {
										// rs.beforeFirst();
										rsPrevShift3.afterLast();
										while (rsPrevShift3.next()) {
											System.out.println("NO data at all \t :");

											shiftData1.setPreviousLocation("-");
											System.out.println(
													"NO data at all location\t :" + shiftData1.getPreviousLocation());
										}
									}

								}

								empId1 = shiftData1.getEmployeeId();
								details.setPrevShiftList(prevShiftList);
								System.out.println("Prev shift list \n" + prevShiftList);

							} else {
								empId = shiftData1.getEmployeeId();

							}
							System.out.print("EmployeeId from employee Table:" + empId);
							employeeRetrievelist1.add(shiftData1);
							vacancyReportlist.add(shiftData1);
							i = i + 1;

						}

						// json.setShiftList(shiftList);

					}

				}

			}

			employeeRetrievelist.addAll(employeeRetrievelist1);
			details.setEmployeeRetrievelist(employeeRetrievelist);
			details.setVacancyReportlist(vacancyReportlist);
			details.setPrevShiftList(prevShiftList);

			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {
			DatabaseUtil.closeConnection(connection);
		}
		return details;
	}

	/*
	 * FUCNTION FOR GENERTING MONTH WISE SHIFT HISTORY REPORT FOR DONLOAD
	 */
	public static ExcelDownloadJSON MonthWiseShiftWiseReport(ExcelDownloadJSON details) {
		Connection connection = null;
		ArrayList<ExcelDownloadJSON> shiftList = new ArrayList<ExcelDownloadJSON>();
		ArrayList<ExcelDownloadJSON> shiftList1 = new ArrayList<ExcelDownloadJSON>();
		ArrayList<ExcelDownloadJSON> prevShiftList = new ArrayList<ExcelDownloadJSON>();

		String EmpId = "";
		String empId = "";
		String empId1 = "";

		int i = 1;

		try {

			connection = DatabaseUtil.getDBConnection();

			/*
			 * String querySelect =
			 * ExcelDownloadQueryConstants.EMP_MONTH_WISE_SHIFT_HISTORY_REPORT;
			 * PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			 * preparedStmt.setString(1, details.getCompanyId()); preparedStmt.setString(2,
			 * details.getMonth()); preparedStmt.setString(3, details.getYear());
			 * 
			 * ResultSet rs = preparedStmt.executeQuery();
			 */
			String querySelectEmpId = ExcelDownloadQueryConstants.EMP_PERIOD_WISE_SHIFT_HISTORY_REPORT_EMP_ID;
			PreparedStatement preparedStmtEmpId = connection.prepareStatement(querySelectEmpId);
			preparedStmtEmpId.setString(1, details.getCompanyId());

			ResultSet rsEmpId = preparedStmtEmpId.executeQuery();
			while (rsEmpId.next()) {

				EmpId = rsEmpId.getString("EmployeeId");

				System.out.println("SELECTING DATA OF EMPLOYEE \t :" + EmpId);

				LocalDate fromDate1 = LocalDate.of(details.getFromDate1().getYear(),
						(details.getFromDate1().getMonth().getValue()), details.getFromDate1().getDayOfMonth());
				LocalDate toDate1 = LocalDate.of(details.getToDate1().getYear(),
						(details.getToDate1().getMonth().getValue()), details.getToDate1().getDayOfMonth());

				LocalDate prevDate = fromDate1.minusDays(1);
				System.out.println("PreviousDate:" + prevDate);
				for (LocalDate date = fromDate1; !date.isAfter(toDate1); date = date.plusDays(1)) {
					System.out.println("Date:" + date);
					String querySelect = ExcelDownloadQueryConstants.EMP_MONTH_WISE_SHIFT_HISTORY_REPORT1;
					PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
					preparedStmt.setString(1, details.getCompanyId());
					preparedStmt.setString(2, date.toString());
					preparedStmt.setString(3, EmpId);
					ResultSet rs = preparedStmt.executeQuery();
					if (Boolean.valueOf(rs.next()).equals(true)) {
						// while (rs.next()) {
						// System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t
						// :"+rs.next()+','+date);
						rs.beforeFirst();
						while (rs.next()) {
							System.out.println("SHIFT REPORT DATA TABLE \t :");
							ExcelDownloadJSON shiftData = new ExcelDownloadJSON();
							shiftData.setEmployeeId(rs.getString("EmployeeId"));
							shiftData.setName(rs.getString("Name"));
							shiftData.setEmployeeType(rs.getString("Type"));
							shiftData.setDepartment(rs.getString("Department"));
							shiftData.setShift(rs.getString("Shift"));
							shiftData.setDate(rs.getString("Date"));
							shiftData.setCurrentLocation(rs.getString("CurrentLocation"));
							shiftData.setShiftSuperVisorId(rs.getString("ShiftSupervisorId"));
							String querySelectSupervisor = ExcelDownloadQueryConstants.GET_SUPERVISOR;
							PreparedStatement preparedStmtSupervisor = connection
									.prepareStatement(querySelectSupervisor);
							preparedStmtSupervisor.setString(1, details.getCompanyId());
							preparedStmtSupervisor.setString(2, rs.getString("ShiftSupervisorId"));
							ResultSet rsSupervisor = preparedStmtSupervisor.executeQuery();
							while (rsSupervisor.next()) {
								shiftData.setShiftSupervisorName(rsSupervisor.getString("supervisorName"));
							}
							shiftData.setGrade(rs.getString("grade"));
							shiftData.setEmpCode(rs.getString("EmpCode"));
							System.out.print("BEFORE EMP-ID :\t" + empId);
							System.out.println("EMPLOYEID :\t" + shiftData.getEmployeeId() + "\t LOCATION :\t"
									+ shiftData.getCurrentLocation());

							if (!empId.equals(shiftData.getEmployeeId())) {
								System.out.println("IN PREV LOOP IF LOOP \n" + empId + "," + shiftData.getEmployeeId());
								String querySelectPrevShift = ExcelDownloadQueryConstants.SELECT_EMP_PREV_SHIFT;
								PreparedStatement preparedStmtPrevShift = connection
										.prepareStatement(querySelectPrevShift);
								preparedStmtPrevShift.setString(1, details.getCompanyId());
								preparedStmtPrevShift.setString(2, prevDate.toString());
								preparedStmtPrevShift.setString(3, shiftData.getEmployeeId());
								ResultSet rsPrevShift = preparedStmtPrevShift.executeQuery();
								System.out.println("IN PREV LOOP \n");
								if (Boolean.valueOf(rsPrevShift.next()).equals(true)) {
									// while (rs.next()) {
									// System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t
									// :"+rs.next()+','+date);
									rsPrevShift.beforeFirst();
									while (rsPrevShift.next()) {
										System.out.println("IN yesterday Date loop \n");

										ExcelDownloadJSON prevShiftData = new ExcelDownloadJSON();
										prevShiftData.setEmployeeId(shiftData.getEmployeeId());
										prevShiftData.setCurrentLocation(rsPrevShift.getString("CurrentLocation"));
										shiftData.setPreviousLocation(rsPrevShift.getString("CurrentLocation"));
										System.out.println("IN yesterday Date Location \n"
												+ rsPrevShift.getString("CurrentLocation"));
										prevShiftList.add(prevShiftData);
									}
								} else if (Boolean.valueOf(rsPrevShift.next()).equals(false)) {
									// rs.beforeFirst();

									rsPrevShift.afterLast();
									System.out.println("else if loop when data is not in prev date \t :");
									String querySelectPrevShift4 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT1;
									PreparedStatement preparedStmtPrevShift4 = connection
											.prepareStatement(querySelectPrevShift4);
									preparedStmtPrevShift4.setString(1, details.getCompanyId());
									preparedStmtPrevShift4.setString(2, details.getFromDate());
									preparedStmtPrevShift4.setString(3, shiftData.getEmployeeId());
									ResultSet rsPrevShift4 = preparedStmtPrevShift4.executeQuery();
									System.out.println("BEFORE NO previous date but there is a data \t :");
									if (Boolean.valueOf(rsPrevShift4.next()).equals(true)) {
										System.out.println("NO previous date but there is a data \t :");
										// while (rs.next()) {
										// System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t
										// :"+rs.next()+','+date);
										rsPrevShift4.beforeFirst();
										while (rsPrevShift4.next()) {
											System.out.println(
													"NO previous date but there is a data so select data for shift1\t :");
											String querySelectShiftLocation1 = ReportsPagingQueries.GET_SHIFT_LOC;
											PreparedStatement preparedStmtSupervisorLocation1 = connection
													.prepareStatement(querySelectShiftLocation1);
											preparedStmtSupervisorLocation1.setString(1, details.getCompanyId());

											ResultSet rsSupervisorLocation1 = preparedStmtSupervisorLocation1
													.executeQuery();
											while (rsSupervisorLocation1.next()) {
												shiftData.setPreviousLocation(
														rsSupervisorLocation1.getString("CurrentLocation"));
											}
											// System.out.println("NO previous date but there is a data so shift1
											// Value\t :"+rsSupervisorLocation1.getString("CurrentLocation"));
										}
									} else if (Boolean.valueOf(rsPrevShift4.next()).equals(false)) {
										// rs.beforeFirst();
										rsPrevShift4.afterLast();
										System.out.println("NO data at all \t :");

										while (rsPrevShift4.next()) {

											shiftData.setPreviousLocation("-");
											System.out.println(
													"NO data at all location\t :" + shiftData.getPreviousLocation());
										}
									}

								}

								empId = shiftData.getEmployeeId();
								details.setPrevShiftList(prevShiftList);
								System.out.println("Prev shift list \n" + prevShiftList);

							} else {
								empId = shiftData.getEmployeeId();
								System.out.print("ELSE EMP-ID :\t" + empId);
							}

							shiftList.add(shiftData);
						}

						// json.setShiftList(shiftList1);
					}

					else if (Boolean.valueOf(rs.next()).equals(false)) {
						// rs.beforeFirst();

						rs.afterLast();

						// System.out.println("EMPLOYEE TABLE \t :"+i);
						String querySelectEmp = ExcelDownloadQueryConstants.EMP_MONTH_WISE_SHIFT_HISTORY_REPORT_Emp;
						PreparedStatement preparedStmtEmp = connection.prepareStatement(querySelectEmp);
						preparedStmtEmp.setString(1, details.getCompanyId());
						preparedStmtEmp.setString(2, EmpId);
						ResultSet rsEmp = preparedStmtEmp.executeQuery();

						while (rsEmp.next()) {
							rsEmp.first();
							rsEmp.last();
							int numberOfRows = rsEmp.getRow();
							System.out.println("EMPLOYEE TABLE \t :" + i + ',' + numberOfRows);
							ExcelDownloadJSON shiftData1 = new ExcelDownloadJSON();
							shiftData1.setEmployeeId(rsEmp.getString("EmployeeId"));

							shiftData1.setName(rsEmp.getString("Name"));
							shiftData1.setEmployeeType(rsEmp.getString("Type"));
							shiftData1.setDepartment(rsEmp.getString("Department"));
							shiftData1.setShift("1");
							shiftData1.setDate(date.toString());
							// shiftData1.setCurrentLocation(rsEmp.getString("CurrentLocation"));
							String querySelectShiftLocation = ReportsPagingQueries.GET_SHIFT_LOC;
							PreparedStatement preparedStmtSupervisorLocation = connection
									.prepareStatement(querySelectShiftLocation);
							preparedStmtSupervisorLocation.setString(1, details.getCompanyId());

							ResultSet rsSupervisorLocation = preparedStmtSupervisorLocation.executeQuery();
							while (rsSupervisorLocation.next()) {
								shiftData1.setCurrentLocation(rsSupervisorLocation.getString("CurrentLocation"));
							}

							shiftData1.setShiftSuperVisorId("-");
							String querySelectSupervisor = ExcelDownloadQueryConstants.GET_SUPERVISOR;
							PreparedStatement preparedStmtSupervisor = connection
									.prepareStatement(querySelectSupervisor);
							preparedStmtSupervisor.setString(1, details.getCompanyId());
							preparedStmtSupervisor.setString(2, rsEmp.getString("ReportingManagerId"));
							ResultSet rsSupervisor = preparedStmtSupervisor.executeQuery();
							while (rsSupervisor.next()) {
								shiftData1.setShiftSupervisorName("-");
							}
							shiftData1.setGrade(rsEmp.getString("grade"));
							shiftData1.setEmpCode(rsEmp.getString("EmployeeCode"));

							if (!empId1.equals(shiftData1.getEmployeeId())) {
								System.out.println("IN PREV  IF LOOP \n" + empId1 + "," + shiftData1.getEmployeeId());
								String querySelectPrevShift2 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT;
								PreparedStatement preparedStmtPrevShift2 = connection
										.prepareStatement(querySelectPrevShift2);
								preparedStmtPrevShift2.setString(1, details.getCompanyId());
								preparedStmtPrevShift2.setString(2, prevDate.toString());
								preparedStmtPrevShift2.setString(3, shiftData1.getEmployeeId());
								ResultSet rsPrevShift2 = preparedStmtPrevShift2.executeQuery();

								if (Boolean.valueOf(rsPrevShift2.next()).equals(true)) {
									rsPrevShift2.beforeFirst();
									while (rsPrevShift2.next()) {
										System.out.println("IN yesterday Date loop \n");

										ExcelDownloadJSON prevShiftData = new ExcelDownloadJSON();
										prevShiftData.setEmployeeId(shiftData1.getEmployeeId());
										prevShiftData.setCurrentLocation(rsPrevShift2.getString("CurrentLocation"));
										shiftData1.setPreviousLocation(rsPrevShift2.getString("CurrentLocation"));
										System.out.println("IN yesterday Date Location \n"
												+ rsPrevShift2.getString("CurrentLocation"));
										prevShiftList.add(prevShiftData);
									}
								}

								else if (Boolean.valueOf(rsPrevShift2.next()).equals(false)) {
									// rs.beforeFirst();

									rsPrevShift2.afterLast();
									System.out.println("else if loop when data is not in prev date \t :");
									String querySelectPrevShift3 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT1;
									PreparedStatement preparedStmtPrevShift3 = connection
											.prepareStatement(querySelectPrevShift3);
									preparedStmtPrevShift3.setString(1, details.getCompanyId());
									preparedStmtPrevShift3.setString(2, details.getFromDate());
									// preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
									preparedStmtPrevShift3.setString(3, shiftData1.getEmployeeId());
									ResultSet rsPrevShift3 = preparedStmtPrevShift3.executeQuery();
									System.out.println("BEFORE NO previous date but there is a data \t :");
									if (Boolean.valueOf(rsPrevShift3.next()).equals(true)) {
										System.out.println("NO previous date but there is a data \t :");
										// while (rs.next()) {
										// System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t
										// :"+rs.next()+','+date);
										rsPrevShift3.beforeFirst();
										while (rsPrevShift3.next()) {
											System.out.println(
													"NO previous date but there is a data so select shift1 data\t :");
											String querySelectShiftLocation1 = ReportsPagingQueries.GET_SHIFT_LOC;
											PreparedStatement preparedStmtSupervisorLocation1 = connection
													.prepareStatement(querySelectShiftLocation1);
											preparedStmtSupervisorLocation1.setString(1, details.getCompanyId());

											ResultSet rsSupervisorLocation1 = preparedStmtSupervisorLocation1
													.executeQuery();
											while (rsSupervisorLocation1.next()) {
												shiftData1.setPreviousLocation(
														rsSupervisorLocation1.getString("CurrentLocation"));
											}
											// System.out.println("NO previous date but there is a data Shift1 Value\t
											// :"+rsSupervisorLocation.getString("CurrentLocation"));
										}

									} else if (Boolean.valueOf(rsPrevShift3.next()).equals(false)) {
										// rs.beforeFirst();
										rsPrevShift3.afterLast();
										while (rsPrevShift3.next()) {
											System.out.println("NO data at all \t :");

											shiftData1.setPreviousLocation("-");
											System.out.println(
													"NO data at all location\t :" + shiftData1.getPreviousLocation());
										}
									}

								}

								empId1 = shiftData1.getEmployeeId();
								details.setPrevShiftList(prevShiftList);
								System.out.println("Prev shift list \n" + prevShiftList);

							} else {
								empId = shiftData1.getEmployeeId();

							}
							System.out.print("EmployeeId from employee Table:" + empId);
							shiftList1.add(shiftData1);
							i = i + 1;

						}

						// json.setShiftList(shiftList);

					}

				}

			}

			shiftList.addAll(shiftList1);
			details.setShiftList(shiftList);
			details.setPrevShiftList(prevShiftList);

			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {
			DatabaseUtil.closeConnection(connection);
		}
		return details;
	}

	public static ExcelDownloadJSON VacancyReport(ExcelDownloadJSON details) {

		Connection connection = null;

		ArrayList<ExcelDownloadJSON> prevShiftList = new ArrayList<ExcelDownloadJSON>();
		ArrayList<ExcelDownloadJSON> vacancyReportlist = new ArrayList<ExcelDownloadJSON>();
		String EmpId = "";
		String empId = "";
		String empId1 = "";

		int i = 1;

		try {

			connection = DatabaseUtil.getDBConnection();
			LocalDate fromDate1 = LocalDate.of(details.getFromDate1().getYear(),
					(details.getFromDate1().getMonth().getValue()), details.getFromDate1().getDayOfMonth());
			LocalDate toDate1 = LocalDate.of(details.getToDate1().getYear(),
					(details.getToDate1().getMonth().getValue()), details.getToDate1().getDayOfMonth());

			LocalDate prevDate = fromDate1.minusDays(1);
			System.out.println("PreviousDate:" + prevDate);

			String querySelectEmpId = ExcelDownloadQueryConstants.EMP_VACENCY_REPORT_EMP_ID;
			PreparedStatement preparedStmtEmpId = connection.prepareStatement(querySelectEmpId);
			preparedStmtEmpId.setString(1, details.getCompanyId());
			preparedStmtEmpId.setString(2, toDate1.toString());

			ResultSet rsEmpId = preparedStmtEmpId.executeQuery();
			while (rsEmpId.next()) {

				EmpId = rsEmpId.getString("EmployeeId");

				System.out.println("SELECTING DATA OF EMPLOYEE \t :" + EmpId);

				

						String querySelectEmp = ExcelDownloadQueryConstants.EMP_VACANCY_REPORT_Emp;
						PreparedStatement preparedStmtEmp = connection.prepareStatement(querySelectEmp);
						preparedStmtEmp.setString(1, details.getCompanyId());
						preparedStmtEmp.setString(2, EmpId);
						ResultSet rsEmp = preparedStmtEmp.executeQuery();

						while (rsEmp.next()) {

							int numberOfRows = rsEmp.getRow();
							System.out.println("EMPLOYEE TABLE \t :" + i + ',' + numberOfRows);
							ExcelDownloadJSON shiftData1 = new ExcelDownloadJSON();
							shiftData1.setEmployeeId(rsEmp.getString("EmployeeId"));

							shiftData1.setName(rsEmp.getString("Name"));
							shiftData1.setEmployeeType(rsEmp.getString("Type"));
							shiftData1.setDepartment(rsEmp.getString("Department"));
							shiftData1.setShift("1");
							shiftData1.setDate(toDate1.toString());

							String querySelectShiftLocation = ReportsPagingQueries.GET_SHIFT_LOC;
							PreparedStatement preparedStmtSupervisorLocation = connection
									.prepareStatement(querySelectShiftLocation);
							preparedStmtSupervisorLocation.setString(1, details.getCompanyId());

							ResultSet rsSupervisorLocation = preparedStmtSupervisorLocation.executeQuery();
							while (rsSupervisorLocation.next()) {
								shiftData1.setCurrentLocation(rsSupervisorLocation.getString("CurrentLocation"));
							}

							shiftData1.setShiftSuperVisorId("-");
							String querySelectSupervisor = ExcelDownloadQueryConstants.GET_SUPERVISOR;
							PreparedStatement preparedStmtSupervisor = connection
									.prepareStatement(querySelectSupervisor);
							preparedStmtSupervisor.setString(1, details.getCompanyId());
							preparedStmtSupervisor.setString(2, rsEmp.getString("ReportingManagerId"));
							ResultSet rsSupervisor = preparedStmtSupervisor.executeQuery();
							while (rsSupervisor.next()) {
								shiftData1.setShiftSupervisorName("-");
							}
							shiftData1.setGrade(rsEmp.getString("grade"));
							shiftData1.setEmpCode(rsEmp.getString("EmployeeCode"));

							if (!empId1.equals(shiftData1.getEmployeeId())) {
								System.out.println("IN PREV  IF LOOP \n" + empId1 + "," + shiftData1.getEmployeeId());
								String querySelectPrevShift2 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT;
								PreparedStatement preparedStmtPrevShift2 = connection
										.prepareStatement(querySelectPrevShift2);
								preparedStmtPrevShift2.setString(1, details.getCompanyId());
								preparedStmtPrevShift2.setString(2, prevDate.toString());
								preparedStmtPrevShift2.setString(3, shiftData1.getEmployeeId());
								ResultSet rsPrevShift2 = preparedStmtPrevShift2.executeQuery();

								if (Boolean.valueOf(rsPrevShift2.next()).equals(true)) {
									rsPrevShift2.beforeFirst();
									while (rsPrevShift2.next()) {
										System.out.println("IN yesterday Date loop \n");

										ExcelDownloadJSON prevShiftData = new ExcelDownloadJSON();
										prevShiftData.setEmployeeId(shiftData1.getEmployeeId());
										prevShiftData.setCurrentLocation(rsPrevShift2.getString("CurrentLocation"));
										shiftData1.setPreviousLocation(rsPrevShift2.getString("CurrentLocation"));
										System.out.println("IN yesterday Date Location \n"
												+ rsPrevShift2.getString("CurrentLocation"));
										prevShiftList.add(prevShiftData);
									}
								}

								else if (Boolean.valueOf(rsPrevShift2.next()).equals(false)) {

									rsPrevShift2.afterLast();
									System.out.println("else if loop when data is not in prev date \t :");
									String querySelectPrevShift3 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT1;
									PreparedStatement preparedStmtPrevShift3 = connection
											.prepareStatement(querySelectPrevShift3);
									preparedStmtPrevShift3.setString(1, details.getCompanyId());
									preparedStmtPrevShift3.setString(2, details.getFromDate());
									preparedStmtPrevShift3.setString(3, shiftData1.getEmployeeId());
									ResultSet rsPrevShift3 = preparedStmtPrevShift3.executeQuery();
									System.out.println("BEFORE NO previous date but there is a data \t :");
									if (Boolean.valueOf(rsPrevShift3.next()).equals(true)) {
										System.out.println("NO previous date but there is a data \t :");
										rsPrevShift3.beforeFirst();
										while (rsPrevShift3.next()) {
											System.out.println(
													"NO previous date but there is a data so select shift1 data\t :");
											String querySelectShiftLocation1 = ReportsPagingQueries.GET_SHIFT_LOC;
											PreparedStatement preparedStmtSupervisorLocation1 = connection
													.prepareStatement(querySelectShiftLocation1);
											preparedStmtSupervisorLocation1.setString(1, details.getCompanyId());

											ResultSet rsSupervisorLocation1 = preparedStmtSupervisorLocation1
													.executeQuery();
											while (rsSupervisorLocation1.next()) {
												shiftData1.setPreviousLocation(
														rsSupervisorLocation1.getString("CurrentLocation"));
											}
										}

									} else if (Boolean.valueOf(rsPrevShift3.next()).equals(false)) {

										rsPrevShift3.afterLast();
										while (rsPrevShift3.next()) {
											System.out.println("NO data at all \t :");

											shiftData1.setPreviousLocation("-");
											System.out.println(
													"NO data at all location\t :" + shiftData1.getPreviousLocation());
										}
									}

								}

								empId1 = shiftData1.getEmployeeId();
								details.setPrevShiftList(prevShiftList);
								System.out.println("Prev shift list \n" + prevShiftList);

							} else {
								empId = shiftData1.getEmployeeId();

							}
							System.out.print("EmployeeId from employee Table:" + empId);

							vacancyReportlist.add(shiftData1);
							i = i + 1;

						}
					//}
				}
			
			details.setVacancyReportlist(vacancyReportlist);
			details.setPrevShiftList(prevShiftList);
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {
			DatabaseUtil.closeConnection(connection);
		}
		return details;
	}

	public static ExcelDownloadJSON expiredShiftReport(ExcelDownloadJSON details) {
		// TODO Auto-generated method stub
		Connection connection = null;
		int ShiftCount = 0;

		ArrayList<ExcelDownloadJSON> expiredShiftReportListExcel = new ArrayList<ExcelDownloadJSON>();
		try {
			connection = DatabaseUtil.getDBConnection();

			LocalDate fromDate1 = LocalDate.of(details.getFromDate1().getYear(),
					(details.getFromDate1().getMonth().getValue()), details.getFromDate1().getDayOfMonth());
			LocalDate toDate1 = LocalDate.of(details.getToDate1().getYear(),
					(details.getToDate1().getMonth().getValue()), details.getToDate1().getDayOfMonth());

			System.out.println("FromDate \t :" + fromDate1);
			System.out.println("ToDate \t :" + toDate1);

			String querySelect1 = ReportsPagingQueries.select_expired_report_Excel;
			PreparedStatement preparestmt1 = connection.prepareStatement(querySelect1);
			preparestmt1.setString(1, details.getCompanyId());
			preparestmt1.setString(2, fromDate1.toString());
			preparestmt1.setString(3, toDate1.toString());
			preparestmt1.setString(4, fromDate1.toString());
			preparestmt1.setString(5, toDate1.toString());

			ResultSet rs1 = preparestmt1.executeQuery();
			while (rs1.next()) {
				ExcelDownloadJSON expiredData = new ExcelDownloadJSON();
				expiredData.setShiftType(rs1.getString("shiftType"));
				expiredData.setStartDate(rs1.getString("startDate"));
				expiredData.setEndDate(rs1.getString("endDate"));
				expiredData.setCurrentLocation(rs1.getString("CurrentLocation"));
				expiredData.setDescription(rs1.getString("Description"));
				expiredShiftReportListExcel.add(expiredData);
			}

			details.setExpiredShiftReportListExcel(expiredShiftReportListExcel);
			connection.close();

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseUtil.closeConnection(connection);
		}

		return details;
	}

	public static ExcelDownloadJSON deletedShiftReport(ExcelDownloadJSON details) {
		// TODO Auto-generated method stub

		ArrayList<ExcelDownloadJSON> deletedShiftReportListExcel = new ArrayList<ExcelDownloadJSON>();
		Connection connection = null;
		try {
			connection = DatabaseUtil.getDBConnection();

			LocalDate fromDate1 = LocalDate.of(details.getFromDate1().getYear(),
					(details.getFromDate1().getMonth().getValue()), details.getFromDate1().getDayOfMonth());
			LocalDate toDate1 = LocalDate.of(details.getToDate1().getYear(),
					(details.getToDate1().getMonth().getValue()), details.getToDate1().getDayOfMonth());

			System.out.println("FromDate \t :" + fromDate1);
			System.out.println("ToDate \t :" + toDate1);

			String querySelect1 = ReportsPagingQueries.select_deleted_shift_Excel;
			PreparedStatement preparestmnt1 = connection.prepareStatement(querySelect1);
			preparestmnt1.setString(1, details.getCompanyId());
			preparestmnt1.setString(2, fromDate1.toString());
			preparestmnt1.setString(3, toDate1.toString());
			preparestmnt1.setString(4, fromDate1.toString());
			preparestmnt1.setString(5, toDate1.toString());

			ResultSet rs1 = preparestmnt1.executeQuery();
			while (rs1.next()) {
				ExcelDownloadJSON deletedReport = new ExcelDownloadJSON();
				deletedReport.setShiftType(rs1.getString("shiftType"));
				deletedReport.setStartDate(rs1.getString("startDate"));
				deletedReport.setEndDate(rs1.getString("endDate"));
				deletedReport.setStatus(rs1.getString("status"));
				deletedReport.setCurrentLocation(rs1.getString("CurrentLocation"));
				deletedReport.setDescription(rs1.getString("Description"));
				deletedShiftReportListExcel.add(deletedReport);
			}

			details.setDeletedShiftReportListExcel(deletedShiftReportListExcel);

			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DatabaseUtil.closeConnection(connection);
		}
		return details;
	}

	/*
	 * FUCNTION FOR GENERTING PERIOD WISE SHIFT HISTORY REPORT FOR DONLOAD
	 */

	public static ExcelDownloadJSON supervisorbasedReport(ExcelDownloadJSON json) {

		Connection connection = null;
		ArrayList<ExcelDownloadJSON> employeeRetrievelist = new ArrayList<ExcelDownloadJSON>();
		ArrayList<ExcelDownloadJSON> employeeRetrievelist1 = new ArrayList<ExcelDownloadJSON>();
		ArrayList<ExcelDownloadJSON> prevShiftList = new ArrayList<ExcelDownloadJSON>();
		ArrayList<ExcelDownloadJSON> vacancyReportlist = new ArrayList<ExcelDownloadJSON>();
		String EmpId = "";
		String empId = "";
		String empId1 = "";

		int i = 1;

		try {

			connection = DatabaseUtil.getDBConnection();

			
			if (!json.getSupervisor().equals("all")) {
				LocalDate fromDate1 = LocalDate.of(json.getFromDate1().getYear(),
						(json.getFromDate1().getMonth().getValue()), json.getFromDate1().getDayOfMonth());
				LocalDate toDate1 = LocalDate.of(json.getToDate1().getYear(), (json.getToDate1().getMonth().getValue()),
						json.getToDate1().getDayOfMonth());

				String querySelectEmpId = ExcelDownloadQueryConstants.EMP_SUPERVISOR_BASED_EMP_ID;
				PreparedStatement preparedStmtEmpId = connection.prepareStatement(querySelectEmpId);
				preparedStmtEmpId.setString(1, json.getCompanyId());
				preparedStmtEmpId.setString(2, json.getSupervisor());
				preparedStmtEmpId.setString(3, fromDate1.toString());
				preparedStmtEmpId.setString(4, toDate1.toString());
			
				ResultSet rsEmpId = preparedStmtEmpId.executeQuery();
				while (rsEmpId.next()) {

					EmpId = rsEmpId.getString("EmployeeId");

					System.out.println("SELECTING DATA OF EMPLOYEE \t :" + EmpId);

					LocalDate prevDate = fromDate1.minusDays(1);
					System.out.println("PreviousDate:" + prevDate);
					for (LocalDate date = fromDate1; !date.isAfter(toDate1); date = date.plusDays(1)) {
						System.out.println("Date:" + date);
						String querySelect = ReportsPagingQueries.EMP_SUPERVISOR_REPORT;
						PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
						preparedStmt.setString(1, json.getCompanyId());
						// preparedStmt.setString(2, json.getMonth());
						// preparedStmt.setString(3, json.getYear());
						preparedStmt.setString(2, date.toString());
						preparedStmt.setString(3, EmpId);
						preparedStmt.setString(4, json.getSupervisor());
						
						ResultSet rs = preparedStmt.executeQuery();
						// System.out.println("For checking loop condition \t :"+rs
						// +','+rs.next()+','+date);

						if (Boolean.valueOf(rs.next()).equals(true)) {
							// while (rs.next()) {
							// System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t
							// :"+rs.next()+','+date);
							rs.beforeFirst();
							while (rs.next()) {
								System.out.println("SHIFT REPORT DATA TABLE \t :");
								ExcelDownloadJSON employeeRetrieveobj = new ExcelDownloadJSON();
								employeeRetrieveobj.setEmployeeId(rs.getString("EmployeeId"));
								employeeRetrieveobj.setName(rs.getString("Name"));
								employeeRetrieveobj.setEmployeeType(rs.getString("Type"));
								employeeRetrieveobj.setDepartment(rs.getString("Department"));
								employeeRetrieveobj.setShift(rs.getString("Shift"));
								employeeRetrieveobj.setDate(rs.getString("Date"));
								employeeRetrieveobj.setCurrentLocation(rs.getString("CurrentLocation"));
								employeeRetrieveobj.setShiftSuperVisorId(rs.getString("ShiftSupervisorId"));
								String querySelectSupervisor = ReportsPagingQueries.GET_SUPERVISOR;
								PreparedStatement preparedStmtSupervisor = connection
										.prepareStatement(querySelectSupervisor);
								preparedStmtSupervisor.setString(1, json.getCompanyId());
								preparedStmtSupervisor.setString(2, rs.getString("ShiftSupervisorId"));
								ResultSet rsSupervisor = preparedStmtSupervisor.executeQuery();
								while (rsSupervisor.next()) {
									employeeRetrieveobj
											.setShiftSupervisorName(rsSupervisor.getString("supervisorName"));
								}
								employeeRetrieveobj.setGrade(rs.getString("grade"));
								employeeRetrieveobj.setEmpCode(rs.getString("EmpCode"));
								System.out.print("BEFORE EMP-ID :\t" + empId);
								System.out.println("EMPLOYEID :\t" + employeeRetrieveobj.getEmployeeId()
										+ "\t LOCATION :\t" + employeeRetrieveobj.getCurrentLocation());

								if (!empId.equals(employeeRetrieveobj.getEmployeeId())) {
									System.out.println(
											"IN PREV  IF LOOP \n" + empId + "," + employeeRetrieveobj.getEmployeeId());
									String querySelectPrevShift = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT;
									PreparedStatement preparedStmtPrevShift = connection
											.prepareStatement(querySelectPrevShift);
									preparedStmtPrevShift.setString(1, json.getCompanyId());
									preparedStmtPrevShift.setString(2, prevDate.toString());
									// preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
									preparedStmtPrevShift.setString(3, employeeRetrieveobj.getEmployeeId());
									ResultSet rsPrevShift = preparedStmtPrevShift.executeQuery();
									// System.out.println("IN PREV LOOP next() value\n"+rsPrevShift2.next());
									// rsPrevShift2.beforeFirst();
									if (Boolean.valueOf(rsPrevShift.next()).equals(true)) {
										// while (rs.next()) {
										// System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t
										// :"+rs.next()+','+date);
										rsPrevShift.beforeFirst();
										while (rsPrevShift.next()) {
											System.out.println("IN yesterday Date loop \n");

											ExcelDownloadJSON prevShiftData = new ExcelDownloadJSON();
											prevShiftData.setEmployeeId(employeeRetrieveobj.getEmployeeId());
											prevShiftData.setCurrentLocation(rsPrevShift.getString("CurrentLocation"));
											employeeRetrieveobj
													.setPreviousLocation(rsPrevShift.getString("CurrentLocation"));
											System.out.println("IN yesterday Date Location \n"
													+ rsPrevShift.getString("CurrentLocation"));
											prevShiftList.add(prevShiftData);
										}
									}

									else if (Boolean.valueOf(rsPrevShift.next()).equals(false)) {
										// rs.beforeFirst();

										rsPrevShift.afterLast();
										System.out.println("else if loop when data is not in prev date \t :");
										String querySelectPrevShift4 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT1;
										PreparedStatement preparedStmtPrevShift4 = connection
												.prepareStatement(querySelectPrevShift4);
										preparedStmtPrevShift4.setString(1, json.getCompanyId());
										preparedStmtPrevShift4.setString(2, json.getFromDate());
										// preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
										preparedStmtPrevShift4.setString(3, employeeRetrieveobj.getEmployeeId());
										ResultSet rsPrevShift4 = preparedStmtPrevShift4.executeQuery();
										System.out.println("BEFORE NO previous date but there is a data \t :");
										if (Boolean.valueOf(rsPrevShift4.next()).equals(true)) {
											System.out.println("NO previous date but there is a data \t :");
											// while (rs.next()) {
											// System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t
											// :"+rs.next()+','+date);
											rsPrevShift4.beforeFirst();
											while (rsPrevShift4.next()) {
												System.out.println(
														"NO previous date but there is a data so select data for shift1\t :");
												String querySelectShiftLocation1 = ReportsPagingQueries.GET_SHIFT_LOC;
												PreparedStatement preparedStmtSupervisorLocation1 = connection
														.prepareStatement(querySelectShiftLocation1);
												preparedStmtSupervisorLocation1.setString(1, json.getCompanyId());

												ResultSet rsSupervisorLocation1 = preparedStmtSupervisorLocation1
														.executeQuery();
												while (rsSupervisorLocation1.next()) {
													employeeRetrieveobj.setPreviousLocation(
															rsSupervisorLocation1.getString("CurrentLocation"));
												}
												// System.out.println("NO previous date but there is a data so shift1
												// Value\t :"+rsSupervisorLocation1.getString("CurrentLocation"));
											}
										} else if (Boolean.valueOf(rsPrevShift4.next()).equals(false)) {
											// rs.beforeFirst();
											rsPrevShift4.afterLast();
											System.out.println("NO data at all \t :");

											while (rsPrevShift4.next()) {

												employeeRetrieveobj.setPreviousLocation("-");
												System.out.println("NO data at all location\t :"
														+ employeeRetrieveobj.getPreviousLocation());
											}
										}

									}

									empId = employeeRetrieveobj.getEmployeeId();
									json.setPrevShiftList(prevShiftList);
									System.out.println("Prev shift list \n" + prevShiftList);

								} else {
									empId = employeeRetrieveobj.getEmployeeId();
									System.out.print("ELSE EMP-ID :\t" + empId);
								}

								employeeRetrievelist.add(employeeRetrieveobj);
							}

							// json.setShiftList(shiftList1);
						} else if (Boolean.valueOf(rs.next()).equals(false)) {
							// rs.beforeFirst();
						}
					}
				}

				// employeeRetrievelist.addAll(employeeRetrievelist1);

				System.out.print("ShiftList Content:" + employeeRetrievelist.size());

				json.setEmployeeRetrievelist(employeeRetrievelist);
				json.setVacancyReportlist(vacancyReportlist);
			} else {
				LocalDate fromDate1 = LocalDate.of(json.getFromDate1().getYear(),
						(json.getFromDate1().getMonth().getValue()), json.getFromDate1().getDayOfMonth());
				LocalDate toDate1 = LocalDate.of(json.getToDate1().getYear(), (json.getToDate1().getMonth().getValue()),
						json.getToDate1().getDayOfMonth());

				String querySelectEmpId = ExcelDownloadQueryConstants.EMP_SUPERVISOR_BASED_EMP_ID_ALL;
				PreparedStatement preparedStmtEmpId = connection.prepareStatement(querySelectEmpId);
				preparedStmtEmpId.setString(1, json.getCompanyId());
				preparedStmtEmpId.setString(2, fromDate1.toString());
				preparedStmtEmpId.setString(3, toDate1.toString());
				
				ResultSet rsEmpId = preparedStmtEmpId.executeQuery();
				while (rsEmpId.next()) {

					EmpId = rsEmpId.getString("EmployeeId");

					System.out.println("SELECTING DATA OF EMPLOYEE \t :" + EmpId);

					LocalDate prevDate = fromDate1.minusDays(1);
					System.out.println("PreviousDate:" + prevDate);
					for (LocalDate date = fromDate1; !date.isAfter(toDate1); date = date.plusDays(1)) {
						System.out.println("Date:" + date);
						String querySelect = ReportsPagingQueries.EMP_SUPERVISOR_REPORT1;
						PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
						preparedStmt.setString(1, json.getCompanyId());
						// preparedStmt.setString(2, json.getMonth());
						// preparedStmt.setString(3, json.getYear());
						preparedStmt.setString(2, date.toString());
						preparedStmt.setString(3, EmpId);
						ResultSet rs = preparedStmt.executeQuery();
						// System.out.println("For checking loop condition \t :"+rs
						// +','+rs.next()+','+date);

						if (Boolean.valueOf(rs.next()).equals(true)) {
							// while (rs.next()) {
							// System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t
							// :"+rs.next()+','+date);
							rs.beforeFirst();
							while (rs.next()) {
								System.out.println("SHIFT REPORT DATA TABLE \t :");
								ExcelDownloadJSON employeeRetrieveobj = new ExcelDownloadJSON();
								employeeRetrieveobj.setEmployeeId(rs.getString("EmployeeId"));
								employeeRetrieveobj.setName(rs.getString("Name"));
								employeeRetrieveobj.setEmployeeType(rs.getString("Type"));
								employeeRetrieveobj.setDepartment(rs.getString("Department"));
								employeeRetrieveobj.setShift(rs.getString("Shift"));
								employeeRetrieveobj.setDate(rs.getString("Date"));
								employeeRetrieveobj.setCurrentLocation(rs.getString("CurrentLocation"));
								employeeRetrieveobj.setShiftSuperVisorId(rs.getString("ShiftSupervisorId"));
								String querySelectSupervisor = ReportsPagingQueries.GET_SUPERVISOR;
								PreparedStatement preparedStmtSupervisor = connection
										.prepareStatement(querySelectSupervisor);
								preparedStmtSupervisor.setString(1, json.getCompanyId());
								preparedStmtSupervisor.setString(2, rs.getString("ShiftSupervisorId"));
								ResultSet rsSupervisor = preparedStmtSupervisor.executeQuery();
								while (rsSupervisor.next()) {
									employeeRetrieveobj
											.setShiftSupervisorName(rsSupervisor.getString("supervisorName"));
								}
								employeeRetrieveobj.setGrade(rs.getString("grade"));
								employeeRetrieveobj.setEmpCode(rs.getString("EmpCode"));
								System.out.print("BEFORE EMP-ID :\t" + empId);
								System.out.println("EMPLOYEID :\t" + employeeRetrieveobj.getEmployeeId()
										+ "\t LOCATION :\t" + employeeRetrieveobj.getCurrentLocation());

								if (!empId.equals(employeeRetrieveobj.getEmployeeId())) {
									System.out.println(
											"IN PREV  IF LOOP \n" + empId + "," + employeeRetrieveobj.getEmployeeId());
									String querySelectPrevShift = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT;
									PreparedStatement preparedStmtPrevShift = connection
											.prepareStatement(querySelectPrevShift);
									preparedStmtPrevShift.setString(1, json.getCompanyId());
									preparedStmtPrevShift.setString(2, prevDate.toString());
									// preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
									preparedStmtPrevShift.setString(3, employeeRetrieveobj.getEmployeeId());
									ResultSet rsPrevShift = preparedStmtPrevShift.executeQuery();
									// System.out.println("IN PREV LOOP next() value\n"+rsPrevShift2.next());
									// rsPrevShift2.beforeFirst();
									if (Boolean.valueOf(rsPrevShift.next()).equals(true)) {
										// while (rs.next()) {
										// System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t
										// :"+rs.next()+','+date);
										rsPrevShift.beforeFirst();
										while (rsPrevShift.next()) {
											System.out.println("IN yesterday Date loop \n");

											ExcelDownloadJSON prevShiftData = new ExcelDownloadJSON();
											prevShiftData.setEmployeeId(employeeRetrieveobj.getEmployeeId());
											prevShiftData.setCurrentLocation(rsPrevShift.getString("CurrentLocation"));
											employeeRetrieveobj
													.setPreviousLocation(rsPrevShift.getString("CurrentLocation"));
											System.out.println("IN yesterday Date Location \n"
													+ rsPrevShift.getString("CurrentLocation"));
											prevShiftList.add(prevShiftData);
										}
									}

									else if (Boolean.valueOf(rsPrevShift.next()).equals(false)) {
										// rs.beforeFirst();

										rsPrevShift.afterLast();
										System.out.println("else if loop when data is not in prev date \t :");
										String querySelectPrevShift4 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT1;
										PreparedStatement preparedStmtPrevShift4 = connection
												.prepareStatement(querySelectPrevShift4);
										preparedStmtPrevShift4.setString(1, json.getCompanyId());
										preparedStmtPrevShift4.setString(2, json.getFromDate());
										// preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
										preparedStmtPrevShift4.setString(3, employeeRetrieveobj.getEmployeeId());
										ResultSet rsPrevShift4 = preparedStmtPrevShift4.executeQuery();
										System.out.println("BEFORE NO previous date but there is a data \t :");
										if (Boolean.valueOf(rsPrevShift4.next()).equals(true)) {
											System.out.println("NO previous date but there is a data \t :");
											// while (rs.next()) {
											// System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t
											// :"+rs.next()+','+date);
											rsPrevShift4.beforeFirst();
											while (rsPrevShift4.next()) {
												System.out.println(
														"NO previous date but there is a data so select data for shift1\t :");
												String querySelectShiftLocation1 = ReportsPagingQueries.GET_SHIFT_LOC;
												PreparedStatement preparedStmtSupervisorLocation1 = connection
														.prepareStatement(querySelectShiftLocation1);
												preparedStmtSupervisorLocation1.setString(1, json.getCompanyId());

												ResultSet rsSupervisorLocation1 = preparedStmtSupervisorLocation1
														.executeQuery();
												while (rsSupervisorLocation1.next()) {
													employeeRetrieveobj.setPreviousLocation(
															rsSupervisorLocation1.getString("CurrentLocation"));
												}
												// System.out.println("NO previous date but there is a data so shift1
												// Value\t :"+rsSupervisorLocation1.getString("CurrentLocation"));
											}
										} else if (Boolean.valueOf(rsPrevShift4.next()).equals(false)) {
											// rs.beforeFirst();
											rsPrevShift4.afterLast();
											System.out.println("NO data at all \t :");

											while (rsPrevShift4.next()) {

												employeeRetrieveobj.setPreviousLocation("-");
												System.out.println("NO data at all location\t :"
														+ employeeRetrieveobj.getPreviousLocation());
											}
										}

									}

									empId = employeeRetrieveobj.getEmployeeId();
									json.setPrevShiftList(prevShiftList);
									System.out.println("Prev shift list \n" + prevShiftList);

								} else {
									empId = employeeRetrieveobj.getEmployeeId();
									System.out.print("ELSE EMP-ID :\t" + empId);
								}

								employeeRetrievelist.add(employeeRetrieveobj);
							}

							// json.setShiftList(shiftList1);
						} else if (Boolean.valueOf(rs.next()).equals(false)) {

						}
					}
				}
				System.out.print("ShiftList Content:" + employeeRetrievelist.size());
				json.setEmployeeRetrievelist(employeeRetrievelist);

			}
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {
			DatabaseUtil.closeConnection(connection);
		}
		return json;
	}

	public static ExcelDownloadJSON ScheduledShiftReport(ExcelDownloadJSON json) {

		int ShiftCount=0;
		
	
		ArrayList<ExcelDownloadJSON> scheduledShiftReportListExcel=new ArrayList<ExcelDownloadJSON>();
	
		Connection connection=null;
		try {
			connection=DatabaseUtil.getDBConnection();
		String querySelect=ReportsPagingQueries.ScheduledShiftReport_Count;
			PreparedStatement preparestmnt=connection.prepareStatement(querySelect);
			preparestmnt.setString(1, json.getCompanyId());
			preparestmnt.setString(2,json.getDate());			
		
			ResultSet rs=preparestmnt.executeQuery();
			while(rs.next()) {
				ExcelDownloadJSON scheduledShiftReport=new ExcelDownloadJSON();
				scheduledShiftReport.setShiftLoop(rs.getString("ShiftLoop"));
				scheduledShiftReport.setTimingsLoop(rs.getString("TimingsLoop"));
				scheduledShiftReport.setDescriptionLoop(rs.getString("DescriptionLoop"));
				scheduledShiftReport.setWorkLocationLoop(rs.getString("WorkLocationLoop"));
				scheduledShiftReport.setFromDate(rs.getString("FromDate"));
				scheduledShiftReport.setToDate(rs.getString("ToDate"));
				scheduledShiftReport.setShiftDescription(rs.getString("ShiftDescription"));
		
				scheduledShiftReportListExcel.add(scheduledShiftReport);	
			}	
			
		
			json.setScheduledShiftReportListExcel(scheduledShiftReportListExcel);
		
			
		connection.close();
		}catch (SQLException e) {
		e.printStackTrace();}
		finally {
			DatabaseUtil.closeConnection(connection);
		}
		
		return json;
	
	}

}
