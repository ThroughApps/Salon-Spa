package taskmapping;

import java.sql.Connection;


import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


import DBUtil.DatabaseUtil;
import master.MasterDao;


public class TaskMappingLogic {

	public static TaskMappingJSON RetreivePermission(TaskMappingJSON config) {

		TaskMappingJSON reportAndCount=new TaskMappingJSON();
	    
		ArrayList<TaskMappingJSON> employeePermisionlist=new ArrayList<TaskMappingJSON>();
        
		Connection connection=null;
		String permission=null;	
			try {
		
				connection =DatabaseUtil.getDBConnection();
				  String querySelect=QueryConstants.ROLE_PERMISSION;
					PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
					preparedStmt.setString(1,config.getRoleName());					
					preparedStmt.setString(2,config.getCompanyId());
					ResultSet rs=preparedStmt.executeQuery();
					  while(rs.next()) {
						  permission=rs.getString("permission");
						  
		        	       }  
					 
						if(permission!=null) {
					    List<String> aList= Arrays.asList(permission.split(","));
						for(int i=0;i<aList.size();i++)
						{
					
						TaskMappingJSON empConf=new TaskMappingJSON();
						empConf.setPermission(aList.get(i));
						employeePermisionlist.add(empConf);
						}
						
						}     
			        	
						reportAndCount.setEmployeePermisionlist(employeePermisionlist);
				    	
				
				connection.close();
			}
			catch (SQLException e)
		    {
		    e.printStackTrace();
		    }
		     	
		   finally {
			
		}

		return reportAndCount;	
	}

	public static TaskMappingJSON SetPermission(TaskMappingJSON config) {

		Connection connection=null;
		ArrayList<TaskMappingJSON> employeePermisionlist=new ArrayList<TaskMappingJSON>();
		String permission = null;
		
		
		try {
			
			connection =DatabaseUtil.getDBConnection();
		
			
			String querySelect=QueryConstants.EMP_SET_PERMISSION;
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,config.getPermission());
			preparedStmt.setString(2,config.getRoleName());
			preparedStmt.setString(3,config.getCompanyId());
			
			preparedStmt.executeUpdate();		
		
				
			
			 permission=config.getPermission();
		      
			if(config.getPermission()!=null) {
			    List<String> aList= Arrays.asList(permission.split(","));
				for(int i=0;i<aList.size();i++)
				{
				
				TaskMappingJSON empConf=new TaskMappingJSON();
				empConf.setPermission(aList.get(i));
				employeePermisionlist.add(empConf);
			
				}
				config.setPermisionlist(employeePermisionlist);
			}
		
		
			connection.close();
		}
		catch (SQLException e)
	    {
	    e.printStackTrace();
	    }
	     	
	   finally {
		
	}
		return config;
	}
	/*
	 * function to taskMappingPermission ----//BY jeeva //-----
	 */

	public static TaskMappingJSON taskMappingPermission(TaskMappingJSON config) {
		Connection connection = null;
		ArrayList<TaskMappingJSON> employeePermisionlist = new ArrayList<TaskMappingJSON>();
		ArrayList<TaskMappingJSON> permissionHeaderlist = new ArrayList<TaskMappingJSON>();

		String permission = null;
		String permissionHeader = null;
		String reportManagerId = null;
		String existingDataValue = "Not_Exist";
		config.setAuthorization(existingDataValue);

		try {
			
		
			connection = DatabaseUtil.getDBConnection();

	

				String querySelect = QueryConstants.EMP_SET_PERMISSION_NEW;

				PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
				preparedStmt.setString(1, config.getPermission());
				preparedStmt.setString(2, config.getPermissionHeader());
				preparedStmt.setString(3, config.getRoleName());
				preparedStmt.setString(4, config.getCompanyId());

				preparedStmt.executeUpdate();

				MasterDao.AuditReport(config.getStaffId(),config.getEmployeeName(),config.getRole(), config.getRoleName(),config.getPermission(),"Sets Permission for ",config.getCompanyId());


				permission = config.getPermission();

				if (config.getPermission() != null) {
					List<String> aList = Arrays.asList(permission.split(","));
					for (int i = 0; i < aList.size(); i++) {
						
						TaskMappingJSON empConf = new TaskMappingJSON();
						empConf.setPermission(aList.get(i));
						employeePermisionlist.add(empConf);

					}
					config.setPermissionList(employeePermisionlist);
				}
		
			// permission for header

			permissionHeader = config.getPermissionHeader();

			if (config.getPermissionHeader() != null) {
				List<String> headerList = Arrays.asList(permissionHeader.split(","));
				for (int i = 0; i < headerList.size(); i++) {
					
					TaskMappingJSON empConf1 = new TaskMappingJSON();
					empConf1.setPermissionHeader(headerList.get(i));
					permissionHeaderlist.add(empConf1);

				}
				config.setHeaderPermissionList(permissionHeaderlist);
			} else {
				

			}

		
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {
			DatabaseUtil.closeConnection(connection);
		}
		return config;

	}
	public static TaskMappingJSON RetreivePermissionNew(TaskMappingJSON config) {

		TaskMappingJSON reportAndCount = new TaskMappingJSON();

		ArrayList<TaskMappingJSON> employeePermisionlist = new ArrayList<TaskMappingJSON>();
		ArrayList<TaskMappingJSON> headerPermisionlist = new ArrayList<TaskMappingJSON>();
		Connection connection = null;
		String permission = null;
		String headerPermission = null;
		try {
			
			connection = DatabaseUtil.getDBConnection();
			String querySelect = QueryConstants.ROLE_PERMISSION_NEW;
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1, config.getRoleName());
			preparedStmt.setString(2, config.getCompanyId());

			ResultSet rs = preparedStmt.executeQuery();
			while (rs.next()) {
				permission = rs.getString("Permission");
				headerPermission = rs.getString("HeaderPermission");

			}
		
			if (permission != null) {
				List<String> aList = Arrays.asList(permission.split(","));
				for (int i = 0; i < aList.size(); i++) {
					
					TaskMappingJSON empConf = new TaskMappingJSON();
					empConf.setPermission(aList.get(i));
					employeePermisionlist.add(empConf);
				}

			}

			if (headerPermission != null) {
				List<String> headerList = Arrays.asList(headerPermission.split(","));
				for (int i = 0; i < headerList.size(); i++) {
					
					TaskMappingJSON empConf = new TaskMappingJSON();
					empConf.setPermission(headerList.get(i));
					headerPermisionlist.add(empConf);
				}

			}

			reportAndCount.setEmployeePermisionlist(employeePermisionlist);
			reportAndCount.setHeaderPermissionList(headerPermisionlist);

			
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {
			DatabaseUtil.closeConnection(connection);
		}

		return reportAndCount;

	}
}
