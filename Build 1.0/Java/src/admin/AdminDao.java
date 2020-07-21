package admin;

import java.sql.Connection;



import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import DBUtil.DatabaseUtil;
import master.MasterDao;



public class AdminDao {

	public AdminJSON addrole(AdminJSON json) {
		Connection connection=null;
		String RoleName=null;
		try {
			       connection = DatabaseUtil.getDBConnection();
			       String querySelect01=QueryConstants.Role_VERIFY;			
					PreparedStatement preparedStmt01 = connection.prepareStatement(querySelect01);			
					preparedStmt01.setString(1,json.getRoleName());	
					preparedStmt01.setString(2,json.getCompanyId());	
					ResultSet rs01=preparedStmt01.executeQuery();			
					while(rs01.next()) {
						RoleName = rs01.getString("roleName");
						
						
					}
					if(RoleName==null) {
						String querySelect1=QueryConstants.Permission_Role_Insert;
						PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);	
						preparedStmt1.setString(1,json.getRoleName());	
						preparedStmt1.setString(2,json.getCompanyId());
						preparedStmt1.executeUpdate();
						
					String querySelect=QueryConstants.Role_Insert;
					PreparedStatement preparedStmt = connection.prepareStatement(querySelect);	
					preparedStmt.setString(1,json.getRoleName());
					preparedStmt.setString(2,json.getCompanyId());
				//	preparedStmt.setString(2,json.getDate());
					preparedStmt.executeUpdate();

					
					MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), "-",json.getRoleName(),"New Role Added",json.getCompanyId());
					connection.close();     
					}
					else if(RoleName!=null){
						json.setRoleName("RoleName");
						
						
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

	public AdminJSON roleReport(AdminJSON json) {
		ArrayList<AdminJSON> roleRetrievelist = new ArrayList<AdminJSON>();	
		AdminJSON res=new AdminJSON();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.Role_Report;
		
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getCompanyId());
	        ResultSet rs=preparedStmt.executeQuery();
	               
	        while(rs.next())
	        {
	        	AdminJSON roleRetrieveobj = new AdminJSON();
	        	roleRetrieveobj.setRoleId(rs.getString("roleId"));
	        	roleRetrieveobj.setRoleName(rs.getString("roleName"));
	        	roleRetrieveobj.setRoleDate(rs.getString("roleDate"));	        		        	
	        	roleRetrievelist.add(roleRetrieveobj);
	        }
	               
	        
	        res.setRoleRetrievelist(roleRetrievelist);
	        
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

	public AdminJSON addadminuser(AdminJSON json) {
		Connection connection=null;
		try {
			       connection = DatabaseUtil.getDBConnection();
			       
					String querySelect=QueryConstants.User_Insert;
					PreparedStatement preparedStmt = connection.prepareStatement(querySelect);	
					preparedStmt.setString(1,json.getRoleName());
					preparedStmt.setString(2,json.getUserName());
					preparedStmt.setString(3,json.getEmail());
					preparedStmt.setString(4,json.getPassword());	
					preparedStmt.setString(5,json.getCompanyId());	
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

	public AdminJSON userreport(AdminJSON json) {
		ArrayList<AdminJSON> userRetrievelist = new ArrayList<AdminJSON>();	
		AdminJSON res=new AdminJSON();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.User_Report;
		
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);		
			preparedStmt.setString(1,json.getCompanyId());
	        ResultSet rs=preparedStmt.executeQuery();
	               
	        while(rs.next())
	        {
	        	AdminJSON userRetrieveobj = new AdminJSON();
	        	userRetrieveobj.setAdminAddUserId(rs.getString("adminAddUserId"));
	        	userRetrieveobj.setRoleName(rs.getString("roleName"));
	        	userRetrieveobj.setUserName(rs.getString("userName"));	
	        	userRetrieveobj.setEmail(rs.getString("email"));
	        	userRetrieveobj.setPassword(rs.getString("password"));
	        	userRetrievelist.add(userRetrieveobj);
	        }
       
	        
	        res.setUserRetrievelist(userRetrievelist);
	        
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

	public int updatePassword(AdminJSON json) {
		int flag=1;
		Connection connection=null;
		try {
			connection=DatabaseUtil.getDBConnection();
		
			String querySelect=QueryConstants.UPDATE_NEW_PASSWORD;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1, json.getPassword());	
			preparedStmt.setString(2, json.getStaffId());
			preparedStmt.setString(3, json.getCompanyId());
			preparedStmt.executeUpdate();
			flag=0;
			   connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
			DatabaseUtil.closeConnection(connection);
		}	
		return flag;
	}

}
