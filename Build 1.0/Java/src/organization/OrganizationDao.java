package organization;

import java.sql.Connection;


import java.sql.DriverManager;
import java.util.UUID;



import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Year;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Calendar;
import java.util.Random;


import DBUtil.DatabaseUtil;






public class OrganizationDao {

	public OrganizationJSON siteregistration(OrganizationJSON json)  throws ClassNotFoundException {
		// TODO Auto-generated method stub
		
		Connection connection=null;
		 int check;
		  int licenseKey = 0;
		
		  json.setStaffId(null);
		String mobileNo=null;
		String email=null;
		String companyId = null;
		
		try {

		       connection = DatabaseUtil.getDBConnection();
		    
			
              if(json.getStaffId()==null) {
             	
             	json.setLicenseKey(generateString());
             	 
              }
             	 
		       String querySelect02=QueryConstants.ORG_VERIFY_EMAIL;			
				PreparedStatement preparedStmt02 = connection.prepareStatement(querySelect02);			
				preparedStmt02.setString(1,json.getEmailId());			
				ResultSet rs02=preparedStmt02.executeQuery();			
				while(rs02.next()) {
					email = rs02.getString("EmailId");
				
					
				}
		       
            String querySelect01=QueryConstants.ORG_VERIFY_MOBILENO;			
			PreparedStatement preparedStmt01 = connection.prepareStatement(querySelect01);			
			preparedStmt01.setString(1,json.getContactNo());			
			ResultSet rs01=preparedStmt01.executeQuery();			
			while(rs01.next()) {
				mobileNo = rs01.getString("contactNo");
								
			}
			
			if(email==null && mobileNo==null) {
				/*
				 * INSERT INTO TICTOKS FIRST LATER INSERT THE DATA INTO ERP DETAILS WITH COMPANY ID FROM TICTOKS
				 */
			    String driver = "com.mysql.jdbc.Driver";
			    String tictoksConnection = "jdbc:mysql://ec2-13-126-195-214.ap-south-1.compute.amazonaws.com:3306/EmployeeAttendance";
			    String user = "root";
			    String password = "Employee@123";
			
			    Class.forName(driver);
			    Connection tictoksCon = DriverManager.getConnection(tictoksConnection, user, password);
			   
			 
			 
			    
			    
			    String address=json.getDoorNo()+","+json.getFloor()+","+json.getStreet()+","+json.getArea()+","+json.getZipCode();
			    
					    
				String querySelectINS = QueryConstants.SITE_INSERT_COMPANY;
				PreparedStatement preparedStmtINS = tictoksCon.prepareStatement(querySelectINS);
				preparedStmtINS.setString(1, json.getCompanyName());
				preparedStmtINS.setString(2, address);
				preparedStmtINS.setString(3, json.getCity());
				preparedStmtINS.setString(4, json.getZipCode()); //PINCODE
				preparedStmtINS.setString(5, ""); //STATE
				preparedStmtINS.setString(6, ""); //COUNTRY
				preparedStmtINS.setString(7, json.getContactNo());
				preparedStmtINS.setString(8, json.getEmailId());
				preparedStmtINS.setString(9, ""); //COMPANY TYPE
				preparedStmtINS.setString(10, ""); //PLAN

				preparedStmtINS.executeUpdate();

				
				
				String querySelectSELORGIDTICTOKS = QueryConstants.SITE_SELECTID_TICTOKS;
				PreparedStatement preparedStmtSELORGIDTICTOKS = tictoksCon.prepareStatement(querySelectSELORGIDTICTOKS);
				preparedStmtSELORGIDTICTOKS.setString(1, json.getEmailId());
				preparedStmtSELORGIDTICTOKS.setString(2, json.getContactNo());
				ResultSet rsSELORGIDTICTOKS = preparedStmtSELORGIDTICTOKS.executeQuery();
				while (rsSELORGIDTICTOKS.next()) {
					companyId = rsSELORGIDTICTOKS.getString("CompanyId");
				}
				
				/*
				 * CREATE HOLIDAY TABLE FOR NEWLY INSERTED COMPANY
				 */
				CreateTable(companyId,tictoksCon,json);
				String address1=json.getDoorNo()+','+json.getFloor()+','+json.getCity()+','+json.getStreet()+','+json.getPincode();
				
				
					
				String querySelect=QueryConstants.Organization_Insert;
				PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
				preparedStmt.setString(1,json.getCompanyName());
				preparedStmt.setString(2,json.getEmailId());
				preparedStmt.setString(3,json.getContactNo());				
				preparedStmt.setString(4,json.getPlanName());
				preparedStmt.setString(5,json.getLicenseKey());
				preparedStmt.setString(6,json.getFromdate());
				preparedStmt.setString(7,json.getTodate());
				preparedStmt.setString(8,json.getDoorNo());
				preparedStmt.setString(9,json.getFloor());
				preparedStmt.setString(10,json.getCity());
				preparedStmt.setString(11,json.getStreet());
				preparedStmt.setString(12,json.getPincode());
				preparedStmt.setString(13,"Proprietor");		
				preparedStmt.setString(14,address1);				
				preparedStmt.setString(15,companyId);	
				preparedStmt.setString(16,json.getZipCode());
				preparedStmt.setString(17, json.getArea());
				
				
				preparedStmt.executeUpdate();
				
				
				 String companyName=json.getCompanyName(); //as reference for initial employee nane
				json.setCompanyName("INSERTED");
				
				
				int employeeNo=0;
				
				
				String querySelect_staffselect = staff.QueryConstants.EMP_INSERT_SELECT;
				PreparedStatement preparedStmtstaffselect = tictoksCon.prepareStatement(querySelect_staffselect);
				preparedStmtstaffselect.setString(1, json.getCompanyId());
				ResultSet rsstaffselect = preparedStmtstaffselect.executeQuery();
				while (rsstaffselect.next()) {
					employeeNo = rsstaffselect.getInt("EmployeeId");
				
				}
			

				int employeeId1 = employeeNo + 1;
				String employeeId = String.format("%03d", employeeId1);
				

				
				//**amul**//
				String querySelectINSTic = QueryConstants.INSERT_STAFF_TIC;
				PreparedStatement preparedStmtINSTic = tictoksCon.prepareStatement(querySelectINSTic);
				preparedStmtINSTic.setString(1, companyId);
				preparedStmtINSTic.setString(2, employeeId);
				preparedStmtINSTic.setString(3,"Proprietor");// Firstname
				preparedStmtINSTic.setString(4," "); // Lastname
				preparedStmtINSTic.setString(5, json.getEmailId());
				preparedStmtINSTic.setString(6, json.getContactNo()); // Mobile NO
				preparedStmtINSTic.setString(7, json.getAddress());
				preparedStmtINSTic.setString(8,"-");
				preparedStmtINSTic.setString(9,"-");
				preparedStmtINSTic.setString(10,"Permanent");
				preparedStmtINSTic.setString(11,"Admin");
				preparedStmtINSTic.setString(12,"Admin");
				preparedStmtINSTic.setString(13,"1");
				preparedStmtINSTic.setString(14,"Admin");
				preparedStmtINSTic.setString(15,json.getCity());
				preparedStmtINSTic.setString(16,"Weekend");
				preparedStmtINSTic.executeUpdate();
				tictoksCon.close();

				
				//**amul**//	   
				String employeeName=companyName;
				String querySelect0 = QueryConstants.STAFF_Insert;
				PreparedStatement preparedStmt0 = connection.prepareStatement(querySelect0);
				preparedStmt0.setString(1, "Proprietor");
				preparedStmt0.setString(2, address1);
				preparedStmt0.setString(3, json.getCity());
				preparedStmt0.setString(4, json.getContactNo());			
				preparedStmt0.setString(5, "-");
				preparedStmt0.setString(6, "-");
				preparedStmt0.setString(7, "-");
				preparedStmt0.setString(8, "Proprietor");
				preparedStmt0.setString(9, json.getEmailId());
				preparedStmt0.setString(10, companyId);				
				preparedStmt0.setString(11, employeeId);
				preparedStmt0.executeUpdate();
				
			     String config=QueryConstants.SITE_INSERTPERMISSION_TABLE;
								PreparedStatement preparedStmtconfig = connection.prepareStatement(config);
								preparedStmtconfig.setString(1,companyId);
								preparedStmtconfig.setString(2,json.getPermission());
								preparedStmtconfig.setString(3,json.getPermissionHeader());
						//		preparedStmtconfig.setString(3,companyId);
						//		preparedStmtconfig.setString(4,json.getPermission());							
								preparedStmtconfig.executeUpdate();
								
								   String config2=QueryConstants.SITE_INSERTPERMISSION_TABLEADMIN;
									PreparedStatement preparedStmtconfig2 = connection.prepareStatement(config2);
									preparedStmtconfig2.setString(1,companyId);
									preparedStmtconfig2.setString(2,json.getPermission());
									preparedStmtconfig2.setString(3,json.getPermissionHeader());
											
									preparedStmtconfig2.executeUpdate();
									
							     String config1=QueryConstants.SITE_INSERTROLE_TABLE;
									PreparedStatement preparedStmtconfig1 = connection.prepareStatement(config1);
									preparedStmtconfig1.setString(1,companyId);
							preparedStmtconfig1.executeUpdate();

							  String admin=QueryConstants.SITE_INSERTAdminROLE_TABLE;
								PreparedStatement preparedStmtadmin = connection.prepareStatement(admin);
								preparedStmtadmin.setString(1,companyId);
								preparedStmtadmin.executeUpdate();

						
				
				
						connection.close();     
			}else if(mobileNo!=null){
				json.setContactNo("MOBILE");
				
				
			}
			else if(email!=null){
				json.setEmailId("EMAILID");
			
				
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



	public OrganizationJSON CreateSite(OrganizationJSON json) {
		// TODO Auto-generated method stub
		
		Connection connection=null;
		  int check;
		  int otp = 0;
		  
		  OrganizationJSON org1=new OrganizationJSON();
		  org1.setStaffId(null);
		 try {
			 connection = DatabaseUtil.getDBConnection();
				
					
				org1=CheckOrganizationAlreadyExist(json);
				  if((org1.getEmailId()==null)&&(org1.getContactNo()==null)) {
              	
              	 org1.setOtp(GenerateOTP());
             
               	 
               }
				  connection.close();	 
		 }
		  	catch (Exception e) {
		  		e.printStackTrace();
		  	} finally {
		  		 DatabaseUtil.closeConnection(connection);
		  	}
			 
		return org1;
		
	}
	

	/*
	 * FUNCTION FOR CHECKING WHETHER SITE WITH 
	 * SAME NAME(EMAILID & MOBILR NO) ALREADY EXIST
	 */
	private static OrganizationJSON CheckOrganizationAlreadyExist(OrganizationJSON org) {
		 Connection connection=null;
		 int check=0;
		 String emailId = null;
		 String mobileNo = null;
		 String tableName=null;
		
		  
		 try {
			 connection = DatabaseUtil.getDBConnection();
			
			
				String querySelectEMAIL=QueryConstants.SITE_ALREADYEXIST_EMAILID;
				PreparedStatement preparedStmtEMAIL = connection.prepareStatement(querySelectEMAIL);
				preparedStmtEMAIL.setString(1,org.getEmailId());
				ResultSet rsEMAIL=preparedStmtEMAIL.executeQuery();
				
				while(rsEMAIL.next()) {
					emailId=rsEMAIL.getString("EmailId");
					
				}
				
				
				String querySelectMOB=QueryConstants.SITE_ALREADYEXIST_MOBILENO;
				PreparedStatement querySelectMOBp = connection.prepareStatement(querySelectMOB);
				querySelectMOBp.setString(1,org.getContactNo());
				ResultSet rsMOB=querySelectMOBp.executeQuery();
				
				while(rsMOB.next()) {
					mobileNo=rsMOB.getString("ContactNo");
					
				}
				
				
			
			
				if(emailId==null && mobileNo==null ) {
					String MobileNoOTP=org.getContactNo();
					org.setMobileNo(MobileNoOTP);
					org.setEmailId(null);
					org.setContactNo(null);
					
					//both new
				
					
				}else if(mobileNo!=null) {
					org.setContactNo("MOBILE");
					
					
				}else {
					org.setEmailId("EMAILID");
				
				}
				connection.close();
				
				
		 }
		  	catch (Exception e) {
		  		e.printStackTrace();
		  	} finally {
		  		 DatabaseUtil.closeConnection(connection);
		  	}
			 return org;	
	}

	/*
	 * FUNCTION FOR GENERATING OTP IF A NEW ORGANIZATIION IS REGISTERING
	 */
	public static int GenerateOTP() {
		
		Random rnd = new Random();
		int OTP= 100000 + rnd.nextInt(900000);
		System.out.println("OTP"+OTP);
		return OTP;
	}

	    public static String generateString() {
	        String uuid = UUID.randomUUID().toString();
	    	System.out.println("LicenseKey"+uuid);
	        return  uuid;
	    
	}
	    
		/*
		 * FUNCTION TO CREATE TABLE OF HOLIDAY 
		 */

		private static void CreateTable(String companyId,Connection tictoksCon, OrganizationJSON json) {
			Connection connection=null;
	        int employeeNo=0;
	        String tableName=companyId+"HolidayTable";
	      //  String tableName1=companyId+"LeaveTable";
	     //   String salaryTableName=companyId+"SalaryTable";
	        
			 try {
				//	connection =DBUtil.getDBConnection();
				
					String querySelect=QueryConstants.CREATE_TABLE_HOLIDAY.replace("$tableName",tableName);
					PreparedStatement preparedStmt = tictoksCon.prepareStatement(querySelect);
					preparedStmt.executeUpdate();
			
				
					
					  String year= json.getDate().split("-")[0];
					
						
					//Parsing the date
					LocalDate dateBefore = LocalDate.parse(json.getDate());
					LocalDate dateAfter = LocalDate.parse(year+"-"+"12"+"-"+"31");
						
					//calculating number of days in between
					int daysInYear = (int) ChronoUnit.DAYS.between(dateBefore, dateAfter);
		    	 
					
				
					InsertIntoHolidayTable(json,companyId,json.getDate(),daysInYear,tictoksCon);
					
					//GENERFATE NEXT YEAR HOLIDAY TABLE IF REGISTRATION OCCURS AFTER 22nd OF DEC
				
					if(json.getHolidayTableNextYear().equals("Yes")){
						
						  Calendar nextYear = Calendar.getInstance();
						  nextYear.add(Calendar.YEAR, 1);
						    int year1= nextYear.get(Calendar.YEAR);
					
							
							
							String startDate=year1+"-"+"01"+"-"+"01";
						
							
							int daysInYear1 = Year.of( year1 ).length();
							daysInYear1=daysInYear1-1;
					    	
						
						InsertIntoHolidayTable(json,companyId,startDate,daysInYear1,tictoksCon);
				
					}
					
					
					
			 }
			 catch (Exception e) {
			  		e.printStackTrace();
			  	} finally {
			  
			  	}
		
	    
		}
	    
		/*
		 * FUNCTION TO INSERT & UPDATE DATA IN HOLIDAY TABLE
		 */
		
		public static void InsertIntoHolidayTable(OrganizationJSON org, String companyId, String startDate, int daysInYear, Connection tictoksCon) {
			
		
			int employeeNo = 0;
			String tableName = companyId + "HolidayTable";
		
				
			try {
			
		    	  
		 			String querySelect10 = QueryConstants.INSERT_HOLIDAYTABLE.replace("$tableName", tableName);
		 			PreparedStatement preparedStmt10 = tictoksCon.prepareStatement(querySelect10);
		 			preparedStmt10.setString(1,startDate);
		 			preparedStmt10.setInt(2, daysInYear);
		 			preparedStmt10.executeUpdate();
		 			

					
					String querySelect20 = QueryConstants.UPDATE_HOLIDAYTABLE.replace("$tableName", tableName);
					PreparedStatement preparedStmt20 = tictoksCon.prepareStatement(querySelect20);
					preparedStmt20.executeUpdate();
			
					
			}catch (Exception e) {
				e.printStackTrace();
			} finally {
				
			}
			
			
		}	    

}