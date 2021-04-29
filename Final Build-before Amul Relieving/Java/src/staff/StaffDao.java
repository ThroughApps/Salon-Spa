package staff;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import DBUtil.DatabaseUtil;
import master.MasterDao;







public class StaffDao {

	public StaffJSON addstaff(StaffJSON json) throws ClassNotFoundException{
		Connection connection=null;
		String mobileNo=null;
		String email=null;
		int employeeNo = 0;
		try {
			       connection = DatabaseUtil.getDBConnection();
			       
			       
			       
			      	String querySelect0=QueryConstants.Staff_VERIFY_MAIL;
					PreparedStatement preparedStmt0 = connection.prepareStatement(querySelect0);
					preparedStmt0.setString(1,json.getEmail());
					preparedStmt0.setString(2,json.getCompanyId());
					ResultSet rs0=preparedStmt0.executeQuery();
					
					while(rs0.next()) {
						email=rs0.getString("emailId");
					
						
						
					}
			       String querySelect01=QueryConstants.Staff_VERIFY_MOBILENO;			
					PreparedStatement preparedStmt01 = connection.prepareStatement(querySelect01);			
					preparedStmt01.setString(1,json.getContactNo());
					preparedStmt01.setString(2,json.getCompanyId());
					ResultSet rs01=preparedStmt01.executeQuery();			
					while(rs01.next()) {
						mobileNo = rs01.getString("contactNo");
						
						
					}
					if(email==null && mobileNo==null) {
						
						
						
						
						
						String driver = "com.mysql.jdbc.Driver";
						 String tictoksConnection = "jdbc:mysql://ec2-13-126-195-214.ap-south-1.compute.amazonaws.com:3306/EmployeeAttendance";
						String user = "root";
						 String password = "Employee@123";
					
						Class.forName(driver);
						Connection tictoksCon = DriverManager.getConnection(tictoksConnection, user, password);

					
						
						String querySelect = QueryConstants.EMP_INSERT_SELECT;
						PreparedStatement preparedStmt = tictoksCon.prepareStatement(querySelect);
						preparedStmt.setString(1, json.getCompanyId());
						ResultSet rs = preparedStmt.executeQuery();
						while (rs.next()) {
							employeeNo = rs.getInt("EmployeeId");
		
						}
				

						int employeeId1 = employeeNo + 1;
						String employeeId = String.format("%03d", employeeId1);
				

						
						
						String querySelectINS = QueryConstants.INSERT_STAFF_TIC;
						PreparedStatement preparedStmtINS = tictoksCon.prepareStatement(querySelectINS);
						preparedStmtINS.setString(1, json.getCompanyId());
						preparedStmtINS.setString(2, employeeId);
						preparedStmtINS.setString(3, json.getStaffName());// Firstname
						preparedStmtINS.setString(4," "); // Lastname
						preparedStmtINS.setString(5, json.getEmail());
						preparedStmtINS.setString(6, json.getContactNo()); // Mobile NO
						preparedStmtINS.setString(7, json.getAddress());
						preparedStmtINS.setString(8, json.getDate());
						preparedStmtINS.setString(9, json.getDate());
						preparedStmtINS.setString(10,"Permanent");
						preparedStmtINS.setString(11,json.getCategory());
						preparedStmtINS.setString(12, json.getCategory());
						preparedStmtINS.setString(13,"1");
						preparedStmtINS.setString(14,json.getCategory());
						preparedStmtINS.setString(15,"Chennai");
						preparedStmtINS.setString(16,"Weekend");
						preparedStmtINS.executeUpdate();
						tictoksCon.close();

						
							 
					String querySelectStaff=QueryConstants.Staff_Insert;
					PreparedStatement preparedStmtStaff = connection.prepareStatement(querySelectStaff);
					preparedStmtStaff.setString(1,json.getStaffName());
					preparedStmtStaff.setString(2,json.getAddress());
					preparedStmtStaff.setString(3,json.getCity());
					preparedStmtStaff.setString(4,json.getContactNo());
					preparedStmtStaff.setString(5,json.getDob());
					preparedStmtStaff.setString(6,json.getGender());			
					preparedStmtStaff.setString(7,json.getNationality());
					preparedStmtStaff.setString(8,json.getSalary());
					preparedStmtStaff.setString(9,json.getDate());
					preparedStmtStaff.setString(10,json.getRoleName());
					preparedStmtStaff.setString(11,json.getEmail());
					preparedStmtStaff.setString(12,json.getCompanyId());
					preparedStmtStaff.setString(13,employeeId);
					preparedStmtStaff.executeUpdate();
					json.setEmployeeId(employeeId);
				
					MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), employeeId,json.getStaffName(),"Staff Details Added",json.getCompanyId());
					connection.close();     
					}
					else if(email!=null) {
						json.setEmail("Email");
					
						
						
						}
					else if(mobileNo!=null){
						json.setContactNo("Mobile");
					
						
					}
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

	public StaffJSON selectstaff(StaffJSON json) {
	 	ArrayList<StaffJSON> staffRetrievelist = new ArrayList<StaffJSON>();	
	 	StaffJSON res=new StaffJSON();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.Staff_Report;
		
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getCompanyId());			
	        ResultSet rs=preparedStmt.executeQuery();
	               
	        while(rs.next())
	        {
	        	StaffJSON staffRetrieveobj = new StaffJSON();
	        	staffRetrieveobj.setStaffId(rs.getString("staffId"));
	        	staffRetrieveobj.setStaffName(rs.getString("staffName"));
	        	staffRetrieveobj.setAddress(rs.getString("address"));
	        	staffRetrieveobj.setContactNo(rs.getString("contactNo"));	
	        	staffRetrieveobj.setRoleName(rs.getString("roleName"));
	        	staffRetrieveobj.setSalary(rs.getString("salary"));	
	        	staffRetrieveobj.setCity(rs.getString("city"));	
	        	staffRetrieveobj.setDob(rs.getString("dob"));	
	        	staffRetrieveobj.setGender(rs.getString("gender"));
	        	staffRetrieveobj.setReligion(rs.getString("religion"));
	        	staffRetrieveobj.setNationality(rs.getString("nationality"));
	        	staffRetrieveobj.setJoiningDate(rs.getString("joiningDate"));
	        	staffRetrieveobj.setEmail(rs.getString("emailId"));
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

	public StaffJSON addsalary(StaffJSON json) {
		Connection connection=null;
		try {
			       connection = DatabaseUtil.getDBConnection();
					String querySelect=QueryConstants.Salary_Insert;
					PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
					preparedStmt.setString(1,json.getStaffName());
					preparedStmt.setString(2,json.getSalary());
					preparedStmt.setString(3,json.getPay());
					preparedStmt.setString(4,json.getDeduction());
					preparedStmt.setString(5,json.getDate());
					preparedStmt.setString(6,json.getSalaryMonth());
					preparedStmt.setString(7,json.getRemark());
					
					preparedStmt.executeUpdate();
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

	public StaffJSON salaryreport(StaffJSON json) {
		ArrayList<StaffJSON> salaryRetrievelist = new ArrayList<StaffJSON>();	
	 	StaffJSON res=new StaffJSON();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.Salary_Report;
		
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getCompanyId());		
	        ResultSet rs=preparedStmt.executeQuery();
	               
	        while(rs.next())
	        {
	        	StaffJSON setSalaryRetrieveobj = new StaffJSON();
	        	setSalaryRetrieveobj.setSalaryId(rs.getString("salaryId"));
	        	setSalaryRetrieveobj.setStaffName(rs.getString("staffName"));
	        	setSalaryRetrieveobj.setSalary(rs.getString("salary"));
	        	setSalaryRetrieveobj.setPay(rs.getString("pay"));
	        	setSalaryRetrieveobj.setDeduction(rs.getString("deduction"));	
	        	setSalaryRetrieveobj.setDate(rs.getString("date"));
	        	setSalaryRetrieveobj.setRemark(rs.getString("remark"));
	        	salaryRetrievelist.add(setSalaryRetrieveobj);
	        }
	            
	        
	        res.setSalaryRetrievelist(salaryRetrievelist);
	        
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

	public StaffJSON deletestaff(StaffJSON json) {
	Connection connection=null;

		
		
		try {
			connection=DatabaseUtil.getDBConnection();
			
			String driver = "com.mysql.jdbc.Driver";
			String tictoksConnection = "jdbc:mysql://ec2-13-126-195-214.ap-south-1.compute.amazonaws.com:3306/EmployeeAttendance";
			String user = "root";
			String password = "Employee@123";

			Class.forName(driver);
			Connection tictoksCon = DriverManager.getConnection(tictoksConnection, user, password);

			String querySelectTictoks = QueryConstants.DELETE_STAFF_TICTOKS;
			PreparedStatement preparedStmtTictoks = tictoksCon.prepareStatement(querySelectTictoks);
			preparedStmtTictoks.setString(1, json.getContactNo());
			preparedStmtTictoks.setString(2, json.getCompanyId());
		//	preparedStmtTictoks.setString(3,json.getStaffId());
			preparedStmtTictoks.executeUpdate();

			String querySelect=QueryConstants.DELETE_STAFF;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getContactNo());
			preparedStmt.setString(2,json.getCompanyId());	
			//preparedStmt.setString(2,json.getDate());
			preparedStmt.executeUpdate();
			
			MasterDao.AuditReport(json.getStaffId1(),json.getEmployeeName(),json.getRole(),json.getStaffId(),json.getStaffName(),"Staff Details Deleted",json.getCompanyId());
			
			
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		return json;
	}

	public StaffJSON updateemployee(StaffJSON json) {
		Connection connection=null;
		ArrayList <StaffJSON> CustomerList=new ArrayList <StaffJSON>();
		
		
		try {
			connection=DatabaseUtil.getDBConnection();
 
			String querySelect=QueryConstants.EmployeeList_UPDATE;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getAddress());
			preparedStmt.setString(2,json.getCity());
			preparedStmt.setString(3,json.getContactNo());
			preparedStmt.setString(4,json.getDob());
			preparedStmt.setString(5,json.getGender());
		
			preparedStmt.setString(6,json.getNationality());			
			preparedStmt.setString(7,json.getSalary());		
			preparedStmt.setString(8,json.getRoleName());		
			preparedStmt.setString(9,json.getEmail());
			preparedStmt.setString(10,json.getStaffId());
			preparedStmt.setString(11,json.getCompanyId());
			
			preparedStmt.executeUpdate();
			
		
		
			
			
			MasterDao.AuditReport(json.getStaffId1(),json.getEmployeeName(),json.getRole(),json.getStaffId(),json.getStaffName(),"Staff details Updated",json.getCompanyId());
			
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		return json;
	}
	
	 public StaffJSON addBank(StaffJSON json) {
		 Connection connection=null;
		 String accountNo=null;

		 try {
		       connection = DatabaseUtil.getDBConnection();
		      	String querySelect0=QueryConstants.Bank_VERIFY_Acc;
		 PreparedStatement preparedStmt0 = connection.prepareStatement(querySelect0);
		 preparedStmt0.setString(1,json.getAccountNo());
		 preparedStmt0.setString(2,json.getCompanyId());
		 ResultSet rs0=preparedStmt0.executeQuery();

		 while(rs0.next()) {
		 accountNo=rs0.getString("accountNo");
	


		 }
		     
		 if(accountNo==null ) {
		 String querySelect=QueryConstants.Bank_Insert;
		 PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
		 preparedStmt.setString(1,json.getBankName());
		 preparedStmt.setString(2,json.getAccountName());
		 preparedStmt.setString(3,json.getAccountNo());
		 preparedStmt.setString(4,json.getBranchName());
		 preparedStmt.setString(5,json.getIfscCode());	
		 preparedStmt.setString(6,json.getCompanyId());
		 preparedStmt.executeUpdate();
		
		 MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), "-","-","Bank details Added",json.getCompanyId());
		 connection.close();     
		 }
		 else if(accountNo!=null) {
		 json.setAccountNo("AccountNo");
			

		 }	
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

		public StaffJSON bankreport(StaffJSON json) {
			ArrayList<StaffJSON> bankRetrieveList = new ArrayList<StaffJSON>();	
		 	StaffJSON res=new StaffJSON();
			Connection connection=null;
			try {
				
				connection =DatabaseUtil.getDBConnection();
				
				String querySelect=QueryConstants.bank_Report;
			
				PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
				preparedStmt.setString(1,json.getCompanyId());			
		        ResultSet rs=preparedStmt.executeQuery();
		               
		        while(rs.next())
		        {
		        	StaffJSON bankRetrieveobj = new StaffJSON();
		        	bankRetrieveobj.setBankId(rs.getString("bankId"));
		        	bankRetrieveobj.setBankName(rs.getString("bankName"));
		        	bankRetrieveobj.setBranchName(rs.getString("branchName"));
		        	bankRetrieveobj.setAccountNo(rs.getString("accountNo"));
		        	bankRetrieveobj.setAccountName(rs.getString("accountName"));	
		        	bankRetrieveobj.setIfscCode(rs.getString("ifscCode"));
		
		        	bankRetrieveList.add(bankRetrieveobj);
		        }
		           
		        
		        res.setBankRetrieveList(bankRetrieveList);
		        
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

		public StaffJSON deleteBank(StaffJSON json) {
			Connection connection=null;

			
			
			try {
				connection=DatabaseUtil.getDBConnection();
				
				String querySelect=QueryConstants.DELETE_BANK;
				PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
				preparedStmt.setString(1,json.getAccountNo());
				preparedStmt.setString(2,json.getCompanyId());	
				//preparedStmt.setString(2,json.getDate());
				preparedStmt.executeUpdate();
				
				MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), "-","-","Bank details Deleted",json.getCompanyId());
				connection.close(); 
			}
			catch (Exception e) {
					e.printStackTrace();
			} finally {
					
				
			}
			return json;
		}

		public StaffJSON BankDetailsUpdate(StaffJSON json) {
			Connection connection=null;
			ArrayList <StaffJSON> CustomerList=new ArrayList <StaffJSON>();
			
			
			try {
				connection=DatabaseUtil.getDBConnection();
	
				String querySelect=QueryConstants.bank_UPDATE;
				PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
				preparedStmt.setString(1,json.getBankName());
				preparedStmt.setString(2,json.getAccountName());
				preparedStmt.setString(3,json.getAccountNo());
				preparedStmt.setString(4,json.getBranchName());
				preparedStmt.setString(5,json.getIfscCode());			
				preparedStmt.setString(6,json.getBankId());
				preparedStmt.setString(7,json.getCompanyId());
				
				preparedStmt.executeUpdate();
				
		
				MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), "-","-","Bank details Updated",json.getCompanyId());
				
				
				
				
				connection.close(); 
			}
			catch (Exception e) {
					e.printStackTrace();
			} finally {
					
				
			}
			return json;
		}
		
		
	
	}


