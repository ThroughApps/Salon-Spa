package attendance;

import java.sql.Connection;


import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import DBUtil.DatabaseUtil;






public class AttendanceDao {

	public AttendanceJSON addattendance(AttendanceJSON json) {
		Connection connection=null;
		try {
			       connection = DatabaseUtil.getDBConnection();
			       List<String> attendList = new ArrayList<String>();
					
			       attendList = Arrays.asList((json.getAttendArray().split(",")));
			       for (int i = 0; i < attendList.size(); i=i+3) {
						
						String Status=attendList.get(i+2);
						String StaffName=attendList.get(i+1);
						String StaffId=attendList.get(i);
						
							
						
						String querySelect1=QueryConstants.Attendance_Update;
						PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
						preparedStmt1.setString(1,Status);
						preparedStmt1.setString(2,StaffId);	
						preparedStmt1.setString(3, StaffName);	
						preparedStmt1.setString(4, json.getDate());
						preparedStmt1.setString(5, json.getCompanyId());
						preparedStmt1.executeUpdate();
						
					   
					}
					
					connection.close();     
					
					}
					catch (SQLException e)
		        {
		        e.printStackTrace();
		        }
		         	
			   finally {
				   DatabaseUtil.closeConnection(connection);
			}
				return json;
				
		
	}

	public AttendanceJSON selectstaff(AttendanceJSON json) {
		ArrayList<AttendanceJSON> staffRetrievelist = new ArrayList<AttendanceJSON>();			
		AttendanceJSON res=new AttendanceJSON();
		Connection connection=null;
		try {
			String StaffId;
			connection =DatabaseUtil.getDBConnection();
			String querySelect1=QueryConstants.StaffId;
			PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
			ResultSet rs1=preparedStmt1.executeQuery();
			 while(rs1.next())
		        {
				 StaffId = rs1.getString("staffId");
				 String querySelect=QueryConstants.Attendance;
				
					PreparedStatement preparedStmt = connection.prepareStatement(querySelect);			
					preparedStmt.setString(1,json.getDate());									
			        ResultSet rs=preparedStmt.executeQuery();
			               
			        while(rs.next())
			        {
			        	AttendanceJSON staffRetrieveobj = new AttendanceJSON();
			        	staffRetrieveobj.setStaffId(StaffId);
			        	staffRetrieveobj.setStaffName(rs.getString("staffName"));
			        	staffRetrieveobj.setAddress(rs.getString("address"));
			        	staffRetrieveobj.setContactNo(rs.getString("contactNo"));	
			        	staffRetrieveobj.setRoleName(rs.getString("roleName"));
			        	staffRetrieveobj.setSalary(rs.getString("salary"));	
			        	staffRetrieveobj.setStatus(rs.getString("status"));	
			        	staffRetrievelist.add(staffRetrieveobj);
			        }
			       	       
			        
			        res.setStaffRetrievelist(staffRetrievelist);	       
				
		        }   
			 connection.close();  
	         }catch (SQLException e)
	        {
	        e.printStackTrace();
	        }
	         	
		   finally {
			DatabaseUtil.closeConnection(connection);
		}
	        
		   return res;
		
	}
	
	
	public AttendanceJSON StaffAttendance(AttendanceJSON json) {
		ArrayList<AttendanceJSON> staffRetrievelist = new ArrayList<AttendanceJSON>();			
		AttendanceJSON res=new AttendanceJSON();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
			String querySelect1=QueryConstants.Staff_Attendance;
			PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1,json.getDate());	
			preparedStmt1.setString(2,json.getCompanyId());
			ResultSet rs=preparedStmt1.executeQuery();
			 while(rs.next())
		        {		
			        	AttendanceJSON staffRetrieveobj = new AttendanceJSON();
			        	staffRetrieveobj.setStaffId(rs.getString("staffId"));
			        	staffRetrieveobj.setStaffName(rs.getString("staffName"));
			        	staffRetrieveobj.setContactNo(rs.getString("contactNo"));
			        	
			        	staffRetrieveobj.setStatus(rs.getString("status"));	
			        	staffRetrievelist.add(staffRetrieveobj);
			        }
			        
			        
			        res.setStaffRetrievelist(staffRetrievelist);	       
				
		          
			 connection.close();  
	         }catch (SQLException e)
	        {
	        e.printStackTrace();
	        }
	         	
		   finally {
			DatabaseUtil.closeConnection(connection);
		}
	        
		   return res;
		
	}
	
	
	/*
	 * Monthly Attendance
	 */

	public AttendanceJSON MonthlyAttendance(AttendanceJSON json) throws ParseException {
		ArrayList<AttendanceJSON> staffRetrievelist = new ArrayList<AttendanceJSON>();			
		AttendanceJSON res=new AttendanceJSON();
		Connection connection=null;
			
			
			DateFormat inputDF  = new SimpleDateFormat("yy-MM-dd");
			Date date1 = inputDF.parse(json.getDate());
			 
			Calendar cal = Calendar.getInstance();
			cal.setTime(date1);
			 
			int month = (cal.get(Calendar.MONTH))+1;
		
			int year = cal.get(Calendar.YEAR);
			
			
					try {
						connection =DatabaseUtil.getDBConnection();
						
						String querySelect=QueryConstants.STAFF_MONTHLYREPORT;
						PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
						preparedStmt.setInt(1,month);
						preparedStmt.setInt(2,year);
						preparedStmt.setString(3,json.getCompanyId());
						
						ResultSet rs=preparedStmt.executeQuery();
				        while(rs.next())
				        {
				        AttendanceJSON staffRetrieveobj = new AttendanceJSON();
			        	staffRetrieveobj.setStaffId(rs.getString("staffId"));
			        	staffRetrieveobj.setStaffName(rs.getString("staffName"));
			        	staffRetrieveobj.setRoleName(rs.getString("roleName"));
			        	staffRetrieveobj.setDate(rs.getString("Date"));
			        	staffRetrieveobj.setStatus(rs.getString("status"));	
			        	staffRetrievelist.add(staffRetrieveobj);
			          }
				        res.setStaffRetrievelist(staffRetrievelist);	
			
				        connection.close();  
				        } catch (SQLException e)
				        {
				        e.printStackTrace();
				        }
				         	
		  
	         	
		   finally {
			DatabaseUtil.closeConnection(connection);
		}
	        
		   return res;
		
	}
	/*
	 * Period attendance
	 */
	
	public AttendanceJSON PeriodAttendance(AttendanceJSON json) {
		ArrayList<AttendanceJSON> staffRetrievelist = new ArrayList<AttendanceJSON>();			
		AttendanceJSON res=new AttendanceJSON();
		Connection connection=null;
		try {
			connection =DatabaseUtil.getDBConnection();
			
		
			String querySelect=QueryConstants.STAFF_PERIODREPORT;
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getFromDate());
			preparedStmt.setString(2,json.getToDate());
			preparedStmt.setString(3,json.getCompanyId());
			ResultSet rs=preparedStmt.executeQuery();
	        while(rs.next())
	        {
	        AttendanceJSON staffRetrieveobj = new AttendanceJSON();
        	staffRetrieveobj.setStaffId(rs.getString("staffId"));
        	staffRetrieveobj.setStaffName(rs.getString("staffName"));
        	staffRetrieveobj.setRoleName(rs.getString("roleName"));
        	staffRetrieveobj.setDate(rs.getString("Date"));
        	staffRetrieveobj.setStatus(rs.getString("status"));	
        	staffRetrievelist.add(staffRetrieveobj);
        	 
         }
	        res.setStaffRetrievelist(staffRetrievelist);	
	        connection.close();  
	        } catch (SQLException e)
	        {
	        e.printStackTrace();
	        }
	         	
		  
	         	
		   finally {
			DatabaseUtil.closeConnection(connection);
		}
		   return res;
		
	}
}
