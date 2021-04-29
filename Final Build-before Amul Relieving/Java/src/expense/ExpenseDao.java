package expense;

import java.sql.Connection;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

import expense.QueryConstants;
import master.MasterDao;
import master.MasterJSON;
import DBUtil.DatabaseUtil;

public class ExpenseDao {

	public ExpenseJSON addcategory(ExpenseJSON json) {

		Connection connection=null;
		String CategoryName=null;
try {
	       connection = DatabaseUtil.getDBConnection();
	       String querySelect01=QueryConstants.Category_VERIFY;			
			PreparedStatement preparedStmt01 = connection.prepareStatement(querySelect01);			
			preparedStmt01.setString(1,json.getCategoryName());		
			preparedStmt01.setString(2,json.getCompanyId());	
			ResultSet rs01=preparedStmt01.executeQuery();			
			while(rs01.next()) {
				CategoryName = rs01.getString("categoryName");
			
				
			}
			if(CategoryName==null) {
			String querySelect=QueryConstants.Category_Insert;
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1, json.getCategoryName());
			preparedStmt.setString(2, json.getCompanyId());
		//	preparedStmt.setString(2,json.getDate());
			preparedStmt.executeUpdate();
		
			
			MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), "-",json.getCategoryName(),"Category Added",json.getCompanyId());
			connection.close();     
			
			}
			else if(CategoryName!=null){
				json.setCategoryName("CategoryName");
			
				
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

	public ExpenseJSON adduser(ExpenseJSON json) {
		
				Connection connection=null;
				String MobileNo=null;
		try {
			       connection = DatabaseUtil.getDBConnection();
			       String querySelect01=QueryConstants.User_VERIFY;			
					PreparedStatement preparedStmt01 = connection.prepareStatement(querySelect01);			
					preparedStmt01.setString(1,json.getContactNo());	
					preparedStmt01.setString(2,json.getCompanyId());
					ResultSet rs01=preparedStmt01.executeQuery();			
					while(rs01.next()) {
						MobileNo = rs01.getString("contactNo");
						
						
					}
					if(MobileNo==null) {
					String querySelect=QueryConstants.User_Insert;
					PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
					preparedStmt.setString(1, json.getUserName());
					preparedStmt.setString(2,json.getContactNo());
					preparedStmt.setString(3,json.getDescription());	
					preparedStmt.setString(4,json.getCompanyId());
					preparedStmt.executeUpdate();
				
					MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), "-",json.getUserName(),"User Added",json.getCompanyId());
					
					
					connection.close();     
					}
					else if(MobileNo!=null){
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

	public ExpenseJSON addexpense(ExpenseJSON json) {

		Connection connection=null;
		String CategoryName=null;
try {
	       connection = DatabaseUtil.getDBConnection();
	    
			String querySelect=QueryConstants.Expense_Insert;
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getCategoryName());
			preparedStmt.setString(2,json.getUserName());
			preparedStmt.setString(3,json.getAmount());
			preparedStmt.setString(4,json.getCompanyId());
		
			preparedStmt.executeUpdate();
			
			
			MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), json.getUserName(),json.getCategoryName(),"Expense Added",json.getCompanyId());
			
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

	public ExpenseJSON categoryReport(ExpenseJSON json) {
	 	ArrayList<ExpenseJSON> categoryRetrievelist = new ArrayList<ExpenseJSON>();	
	 	ExpenseJSON res=new ExpenseJSON();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.Category_Report;
		
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getCompanyId());
	        ResultSet rs=preparedStmt.executeQuery();
	               
	        while(rs.next())
	        {
	        	ExpenseJSON categoryRetrieveobj = new ExpenseJSON();
	        	categoryRetrieveobj.setCategoryId(rs.getString("categoryId"));
	        	categoryRetrieveobj.setCategoryName(rs.getString("categoryName"));
	        	categoryRetrieveobj.setCategoryDate(rs.getString("categoryDate"));	        		        	
	        	categoryRetrievelist.add(categoryRetrieveobj);
	        }
	   	       
	        
	        res.setCategoryRetrievelist(categoryRetrievelist);
	        
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

	public ExpenseJSON userreport(ExpenseJSON json) {
		ArrayList<ExpenseJSON> userRetrievelist = new ArrayList<ExpenseJSON>();	
	 	ExpenseJSON res=new ExpenseJSON();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.User_Report;
		
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getCompanyId());
	        ResultSet rs=preparedStmt.executeQuery();
	               
	        while(rs.next())
	        {
	        	ExpenseJSON userRetrieveobj = new ExpenseJSON();
	        	userRetrieveobj.setUserId(rs.getString("userId"));
	        	userRetrieveobj.setUserName(rs.getString("userName"));
	        	userRetrieveobj.setContactNo(rs.getString("contactNo"));
	        	userRetrieveobj.setDescription(rs.getString("description"));
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

	public ExpenseJSON expensereport(ExpenseJSON json) {
		ArrayList<ExpenseJSON> expenseRetrievelist = new ArrayList<ExpenseJSON>();	
	 	ExpenseJSON res=new ExpenseJSON();
	 	String date=null;
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.Expense_Report;
	
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getCompanyId());
	        ResultSet rs=preparedStmt.executeQuery();
	               
	        while(rs.next())
	        {
	        	ExpenseJSON expenseRetrieveobj = new ExpenseJSON();
	        	expenseRetrieveobj.setExpenseId(rs.getString("expenseId"));
	        	expenseRetrieveobj.setCategoryName(rs.getString("categoryName"));
	        	expenseRetrieveobj.setUserName(rs.getString("userName"));
	        	expenseRetrieveobj.setAmount(rs.getString("amount"));
	        	expenseRetrieveobj.setDate(rs.getString("date"));
	        	expenseRetrievelist.add(expenseRetrieveobj);
	        }
	      	       
	        
	        res.setExpenseRetrievelist(expenseRetrievelist);
	        
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

	public ExpenseJSON deletecategory(ExpenseJSON json) {
        Connection connection=null;
        try {
			connection=DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.DELETE_CATEGORY;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getCategoryName());
			preparedStmt.setString(2,json.getCompanyId());
		//	preparedStmt.setString(2,json.getDate());
			preparedStmt.executeUpdate();
			MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), "-",json.getCategoryName(),"Category Deleted",json.getCompanyId());
			
			
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		return json;
	}

	public ExpenseJSON deleteuser(ExpenseJSON json) {
		Connection connection=null;
        try {
			connection=DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.DELETE_USER;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getUserName());
			preparedStmt.setString(2,json.getCompanyId());
			//preparedStmt.setString(2,json.getDate());
			preparedStmt.executeUpdate();
			MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), "-",json.getUserName(),"User Deleted",json.getCompanyId());
			
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		return json;
	}

	public ExpenseJSON deleteexpense(ExpenseJSON json) {
		Connection connection=null;
        try {
			connection=DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.DELETE_EXPENSE;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getCategoryName());
			preparedStmt.setString(2,json.getCompanyId());
			//preparedStmt.setString(2,json.getDate());
			preparedStmt.executeUpdate();
				
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		return json;
	}

}
