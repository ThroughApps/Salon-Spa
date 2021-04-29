package gst;

import java.sql.Connection;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import DBUtil.DatabaseUtil;



public class GSTDao {

	public GSTJSON salereport(GSTJSON json) {
		ArrayList<GSTJSON> saleRetrievelist = new ArrayList<GSTJSON>();	
		GSTJSON res=new GSTJSON();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();			
			String querySelect=QueryConstants.MONTHLY_SALES_REPORT;
		
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getMonth());
			preparedStmt.setString(2,json.getCompanyId());
						
	        ResultSet rs=preparedStmt.executeQuery();
	               
	        while(rs.next())
	        {
	        	GSTJSON saleRetrieveobj = new GSTJSON();
	        	saleRetrieveobj.setTotalgst(rs.getString("totalgst"));
	        	saleRetrieveobj.setTotalcgst(rs.getString("totalcgst"));
	        	saleRetrieveobj.setTotalsgst(rs.getString("totalsgst"));
	        	saleRetrieveobj.setTotaligst(rs.getString("totaligst"));	        	
	        	saleRetrievelist.add(saleRetrieveobj);
	        }
	     	       
	        
	        res.setSaleRetrievelist(saleRetrievelist);
	        
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
	
	public GSTJSON purchasereport(GSTJSON json) {
		ArrayList<GSTJSON> purchaseRetrievelist = new ArrayList<GSTJSON>();	
		GSTJSON res=new GSTJSON();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();			
			String querySelect=QueryConstants.MONTHLY_PURCHASE_REPORT;
			
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getMonth());		
			preparedStmt.setString(2,json.getCompanyId());	
	        ResultSet rs=preparedStmt.executeQuery();
	               
	        while(rs.next())
	        {
	        	GSTJSON purchaseRetrieveobj = new GSTJSON();
	        	purchaseRetrieveobj.setTotalgst(rs.getString("totalgst"));
	        	purchaseRetrieveobj.setTotalcgst(rs.getString("totalcgst"));
	        	purchaseRetrieveobj.setTotalsgst(rs.getString("totalsgst"));
	        	purchaseRetrieveobj.setTotaligst(rs.getString("totaligst"));	        	
	        	purchaseRetrievelist.add(purchaseRetrieveobj);
	        }
	              
	        
	        res.setPurchaseRetrievelist(purchaseRetrievelist);
	        
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

	public GSTJSON businesstobusinessreport(GSTJSON json) {
		ArrayList<GSTJSON> businesstobusinessreportlist = new ArrayList<GSTJSON>();	
		GSTJSON res=new GSTJSON();
		List<String> invList = new ArrayList<String>();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();		
			String querySelect1 = QueryConstants.SELECT_GST_INV.replace("$tableName", "PurchaseInvoiceTable");
			PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
			// preparedStmt.setString(1,json.getDate());
			preparedStmt1.setString(1, json.getCompanyId());
			ResultSet rs1 = preparedStmt1.executeQuery();
			while (rs1.next()) {
				invList.add(rs1.getString("invoiceNo"));
			}
			for (int i = (invList.size() - 1); i >= 0; i--) {
			String querySelect=QueryConstants.BUSINESS_BUSINESS_REPORT;
		
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getMonth());		
			preparedStmt.setString(2,json.getCompanyId());	
			preparedStmt.setString(3, invList.get(i));
	        ResultSet rs=preparedStmt.executeQuery();
	               
	        while(rs.next())
	        {
	        	GSTJSON businesstobusinessreportobj = new GSTJSON();
	        	businesstobusinessreportobj.setInvoiceNo(rs.getString("invoiceNo"));
	        	businesstobusinessreportobj.setInvoiceDate(rs.getString("invoiceDate"));
	        	businesstobusinessreportobj.setVendorName(rs.getString("vendorName"));
	        	businesstobusinessreportobj.setTotalgst(rs.getString("totalgst"));
	        	businesstobusinessreportobj.setTotalcgst(rs.getString("totalcgst"));
	        	businesstobusinessreportobj.setTotalsgst(rs.getString("totalsgst"));
	        	businesstobusinessreportobj.setTotaligst(rs.getString("totaligst"));
	        	businesstobusinessreportobj.setSubtotal1(rs.getString("subtotal1"));	
	        
	        	businesstobusinessreportlist.add(businesstobusinessreportobj);
	        }
	            
			}
	        res.setBusinesstobusinessreportlist(businesstobusinessreportlist);
	        
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

	public GSTJSON businesstocustomerreport(GSTJSON json) {
		ArrayList<GSTJSON> businesstocustomerreportlist = new ArrayList<GSTJSON>();	
		GSTJSON res=new GSTJSON();
		List<String> invList = new ArrayList<String>();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();	
			
			String querySelect1 = QueryConstants.SELECT_GST_INV.replace("$tableName", "SaleInvoiceTable");
			PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
			// preparedStmt.setString(1,json.getDate());
			preparedStmt1.setString(1, json.getCompanyId());
			ResultSet rs1 = preparedStmt1.executeQuery();
			while (rs1.next()) {
				invList.add(rs1.getString("invoiceNo"));
			}
			for (int i = (invList.size() - 1); i >= 0; i--) {
			String querySelect=QueryConstants.BUSINESS_Customer_REPORT;

			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getMonth());	
			preparedStmt.setString(2, json.getCompanyId());
			preparedStmt.setString(3, invList.get(i));
	
	        ResultSet rs=preparedStmt.executeQuery();
	               
	        while(rs.next())
	        {
	        	GSTJSON businesstocustomerreportobj = new GSTJSON();
	        	businesstocustomerreportobj.setInvoiceNo(rs.getString("invoiceNo"));
	        	businesstocustomerreportobj.setInvoiceDate(rs.getString("invoiceDate"));
	        	businesstocustomerreportobj.setCustomerName(rs.getString("customerName"));
	        	businesstocustomerreportobj.setTotalgst(rs.getString("totalgst"));
	        	businesstocustomerreportobj.setTotalcgst(rs.getString("totalcgst"));
	        	businesstocustomerreportobj.setTotalsgst(rs.getString("totalsgst"));
	        	businesstocustomerreportobj.setTotaligst(rs.getString("totaligst"));
	        	businesstocustomerreportobj.setSubtotal1(rs.getString("subtotal1"));	
	                	
	        	businesstocustomerreportlist.add(businesstocustomerreportobj);
	        }
	     	       
			}
	        res.setBusinesstocustomerreportlist(businesstocustomerreportlist);
	        
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
