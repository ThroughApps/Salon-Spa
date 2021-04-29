package inventoryreport;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import DBUtil.DatabaseUtil;
import master.QueryConstants;

public class InventoryReportLogic {

	
	/*
	 * FUNCTION FOR GETTING AVAILABLE STOCK REPORT
	 */
	public static ArrayList<InventoryReportJSON> GetAvailableStock(InventoryReportJSON json) {
	
		Connection connection=null;
		String ProductName=null;
		String productId =null;
		ArrayList <InventoryReportJSON> reportDataList=new ArrayList <InventoryReportJSON>();
		try {
		      connection = DatabaseUtil.getDBConnection();
		  String querySelect0=InventoryReportQueryConstants.GET_PRODUCT_DETAILS;
		PreparedStatement preparedStmt0 = connection.prepareStatement(querySelect0);
		preparedStmt0.setString(1,json.getCompanyId());
		ResultSet rs0=preparedStmt0.executeQuery();
		
		while(rs0.next()) {
			InventoryReportJSON reportData=new InventoryReportJSON();
			reportData.setProductId(rs0.getString("ProductId"));
			reportData.setProductName(rs0.getString("ProductName"));
			reportData.setQuantity(rs0.getString("Quantity"));
			reportData.setQuantityLimit(rs0.getString("QuantityLimit"));
			reportData.setProductCategory(rs0.getString("ProductCategory"));
			reportData.setProductType(rs0.getString("ProductType"));
			reportDataList.add(reportData);
			
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
		return reportDataList;
		

	}

	/*
	 * FUNCTION FOR UPDATING OWN PRODUCT INVENTORY
	 */
	public static InventoryReportJSON UpdateOwnProductsInventory(InventoryReportJSON json) {
		Connection connection=null;
		String ProductName=null;
		String productId =null;
		json.setProductCategory("Fail");
		try {
		      connection = DatabaseUtil.getDBConnection();
		  String querySelect0=InventoryReportQueryConstants.UPDATE_OWN_PRODUCT_DETAILS;
		PreparedStatement preparedStmt0 = connection.prepareStatement(querySelect0);
		preparedStmt0.setString(1,json.getQuantity());
		preparedStmt0.setString(2,json.getCompanyId());
		preparedStmt0.setString(3,json.getProductId());
		preparedStmt0.executeUpdate();
		
		json.setProductCategory("Success");
		
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

	/*
	 * FUNCTION FOR GENERATING INVENTORY SUMMARY REPORT
	 */
	public static ArrayList<InventoryReportJSON> InventorySummaryReport(InventoryReportJSON json) {
		Connection connection=null;
		String ProductName=null;
		String productId =null;
		ArrayList <InventoryReportJSON> reportDataList=new ArrayList <InventoryReportJSON>();
		
		try {
		      connection = DatabaseUtil.getDBConnection();
		  String querySelect=InventoryReportQueryConstants.INVENTORY_SUMMARY_REPORT;
		PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
		preparedStmt.setString(1,json.getCompanyId());
		ResultSet rs=preparedStmt.executeQuery();
		while(rs.next()) {
			InventoryReportJSON reportData=new InventoryReportJSON();
			reportData.setProductId(rs.getString("ProductId"));
			reportData.setProductName(rs.getString("ProductName"));
			reportData.setQuantity(rs.getString("Quantity"));
			reportData.setSaleRate(rs.getString("saleRate"));
			reportData.setPurchaseRate(rs.getString("purchaseRate"));
			reportData.setProductType(rs.getString("ProductType"));
			reportDataList.add(reportData);
			
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
		return reportDataList;
	}

}
