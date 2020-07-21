package pagingconcept;

import java.sql.Connection;

import java.sql.PreparedStatement;
import java.util.ArrayList;

import java.sql.ResultSet;

import java.sql.Connection;
import DBUtil.DatabaseUtil;

public class PagingLogic {

	
	/*
	 * FUNCTION FOR PAGINNG CONCEPT
	 */
	public static ArrayList<PagingJSON> PagingTesting(PagingJSON json) {
		
		Connection connection=null;
		ArrayList<PagingJSON>customerList=new ArrayList<PagingJSON>();
		PagingJSON countData=new PagingJSON();
		int dataEndCount=json.getDataCount()+10;
		
		
		
		
		
		try {
			connection=DatabaseUtil.getDBConnection();
			
			
	/*	String SELECT_EMP_ID = "SELECT EmployeeId,CONCAT (FirstName,' ',LastName) AS Name ,Type,"
					+ "Department,Role FROM CompanyId = ? AND Status = '0' AND Role <> 'Propertier' limit ? , ? ";
		*/	
				
			String querySelect=PagingQueryConstants.SELECT_EMP_ID;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1, json.getCompanyId());
			preparedStmt.setInt(2,json.getDataCount());
			preparedStmt.setInt(3,dataEndCount);
			ResultSet rs=preparedStmt.executeQuery();
			
			while(rs.next()) {
				PagingJSON empData=new PagingJSON();
				empData.setEmployeeId(rs.getString("EmployeeId"));
				empData.setEmployeeName(rs.getString("Name"));
				empData.setType(rs.getString("Type"));
				empData.setDept(rs.getString("Department"));
				empData.setRole(rs.getString("Role"));
				customerList.add(empData);
				
			}
		
		
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		
		countData.setDataCount(dataEndCount);
		customerList.add(countData);
		
		return customerList;
	}

	
	
	
}
