package master;

import java.sql.Connection;




import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;



import DBUtil.DatabaseUtil;
import master.QueryConstants;
import pagingconcept.PagingJSON;
import report.expense.ExpenseReportJSON;


public class MasterDao {

	public MasterJSON addcustomer(MasterJSON json) {
		// TODO Auto-generated method stub
		Connection connection=null;
		String mobileNo=null;
		String email=null;
		String customerName=null;
		String customerId=null;
		try {

		       connection = DatabaseUtil.getDBConnection();
		 
            String querySelect01=QueryConstants.CUS_VERIFY_MOBILENO;			
			PreparedStatement preparedStmt01 = connection.prepareStatement(querySelect01);			
			preparedStmt01.setString(1,json.getContactNo());		
			preparedStmt01.setString(2,json.getCompanyId());	
			ResultSet rs01=preparedStmt01.executeQuery();			
			while(rs01.next()) {
				mobileNo = rs01.getString("contactNo");
				
				
			}
			email=json.getEmail();
		
			if(email==null)
			{
				email=" ";
				
			}
			else {
				email=json.getEmail();
			}
			
			if(mobileNo==null) {
					String querySelect=QueryConstants.Customer_Insert;
					PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
					preparedStmt.setString(1,json.getCustomerName());
					preparedStmt.setString(2,json.getCompanyName());
					preparedStmt.setString(3,json.getAddress());
					preparedStmt.setString(4,json.getCity());
					preparedStmt.setString(5,json.getContactNo());
					preparedStmt.setString(6,json.getAlternateContactNo());
					preparedStmt.setString(7,json.getGstNo());
					preparedStmt.setString(8,email);
					preparedStmt.setString(9,json.getCompanyId());
					preparedStmt.setString(10,json.getLandlineNo());
					preparedStmt.executeUpdate();
					
					   String querySelect02=QueryConstants.select_customerid;			
						PreparedStatement preparedStmt02 = connection.prepareStatement(querySelect02);			
						preparedStmt02.setString(1,json.getContactNo());		
						preparedStmt02.setString(2,json.getCompanyId());	
						ResultSet rs02=preparedStmt02.executeQuery();			
						while(rs02.next()) {
							customerId = rs02.getString("customerId");
							
							
						}
						
						 MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), customerId, json.getCustomerName(),"Added Customer",json.getCompanyId());

							connection.close();     
			}else if(mobileNo!=null){
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

	public MasterJSON customerReport(MasterJSON json) {
	  	ArrayList<MasterJSON> customerRetrievelist = new ArrayList<MasterJSON>();	
	  	MasterJSON res=new MasterJSON();	
	  //	MasterJSON countData=new MasterJSON();
		Connection connection=null;
		
		
		try {
			
			connection =DatabaseUtil.getDBConnection();
	
			String querySelect=QueryConstants.Customer_Report;				
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getCompanyId());	
		
	        ResultSet rs=preparedStmt.executeQuery();
	     
	        while(rs.next())
	        {
	        	MasterJSON customerRetrieveobj = new MasterJSON();
	        	customerRetrieveobj.setCustomerId(rs.getString("customerId"));
	        	customerRetrieveobj.setCustomerName(rs.getString("customerName"));
	        	customerRetrieveobj.setCompanyName(rs.getString("companyName"));
	        	customerRetrieveobj.setAddress(rs.getString("address"));
	        	customerRetrieveobj.setContactNo(rs.getString("contactNo"));	        	
	         	customerRetrieveobj.setCity(rs.getString("city"));	        	
	         	customerRetrieveobj.setAlternateContactNo(rs.getString("alternatecontactNo"));	        	
	         	customerRetrieveobj.setGstNo(rs.getString("gstNo"));	        	
	        	customerRetrieveobj.setEmail(rs.getString("email"));	        	
		  	    
	          	customerRetrieveobj.setLandlineNo(rs.getString("landlineNo"));
	        	customerRetrievelist.add(customerRetrieveobj);
	        }
	        
	        res.setCustomerRetrievelist(customerRetrievelist);
	        
	        connection.close();  
	        } catch (SQLException e)
	        {
	        e.printStackTrace();
	        }
	         	
		   finally {
			DatabaseUtil.closeConnection(connection);
		}
		

		
		//res.setDataCount(dataEndCount);
		//customerRetrievelist.add(res);
		   
		   return res;
		
		
	}
	
	public MasterJSON customerReportrough(MasterJSON json) {
	  	ArrayList<MasterJSON> customerRetrievelist = new ArrayList<MasterJSON>();	
	  	MasterJSON res=new MasterJSON();	
	  	MasterJSON countData=new MasterJSON();
		Connection connection=null;
		int dataEndCount=json.getDataCount()+10;
	
		
		try {
			
			connection =DatabaseUtil.getDBConnection();
	
			String querySelect=QueryConstants.Customer_Report_Rough;				
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getCompanyId());	
			preparedStmt.setInt(2,json.getDataCount());
			preparedStmt.setInt(3,dataEndCount);
	        ResultSet rs=preparedStmt.executeQuery();
	     
	        while(rs.next())
	        {
	        	MasterJSON customerRetrieveobj = new MasterJSON();
	        	customerRetrieveobj.setCustomerId(rs.getString("customerId"));
	        	customerRetrieveobj.setCustomerName(rs.getString("customerName"));
	        	customerRetrieveobj.setCompanyName(rs.getString("companyName"));
	        	customerRetrieveobj.setAddress(rs.getString("address"));
	        	customerRetrieveobj.setContactNo(rs.getString("contactNo"));	        	
	         	customerRetrieveobj.setCity(rs.getString("city"));	        	
	         	customerRetrieveobj.setAlternateContactNo(rs.getString("alternatecontactNo"));	        	
	         	customerRetrieveobj.setGstNo(rs.getString("gstNo"));	        	
	        	customerRetrieveobj.setEmail(rs.getString("email"));	        	
		  	    
	        	
	        	customerRetrievelist.add(customerRetrieveobj);
	        }
	         
	        
	        res.setCustomerRetrievelist(customerRetrievelist);
	        
	        connection.close();  
	        } catch (SQLException e)
	        {
	        e.printStackTrace();
	        }
	         	
		   finally {
			DatabaseUtil.closeConnection(connection);
		}
		

		countData.setDataCount(dataEndCount);
		customerRetrievelist.add(countData);
		
		//res.setDataCount(dataEndCount);
		//customerRetrievelist.add(res);
		   
		   return res;
		
		
	}

	public MasterJSON addvendor(MasterJSON json) {
		// TODO Auto-generated method stub
		Connection connection=null;
		String mobileNo=null;
		String email=null;
		String vendorId=null;
		try {
			       connection = DatabaseUtil.getDBConnection();
				  
			       String querySelect01=QueryConstants.Ven_VERIFY_MOBILENO;			
					PreparedStatement preparedStmt01 = connection.prepareStatement(querySelect01);			
					preparedStmt01.setString(1,json.getContactNo());	
					preparedStmt01.setString(2,json.getCompanyId());
					ResultSet rs01=preparedStmt01.executeQuery();			
					while(rs01.next()) {
						mobileNo = rs01.getString("contactNo");
						
						
					}
					email=json.getEmail();
					
					if(email==null)
					{
						email=" ";
						
					}
					else {
						email=json.getEmail();
					}
					if(mobileNo==null) {
					String querySelect=QueryConstants.Vendor_Insert;
					PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
					preparedStmt.setString(1,json.getVendorName());
					preparedStmt.setString(2,json.getCompanyName());
					preparedStmt.setString(3,json.getAddress());
					preparedStmt.setString(4,json.getCity());
					preparedStmt.setString(5,json.getContactNo());
					preparedStmt.setString(6,json.getAlternateContactNo());
					preparedStmt.setString(7,json.getGstNo());
					preparedStmt.setString(8,email);
					preparedStmt.setString(9,json.getCompanyId());
					preparedStmt.setString(10,json.getDescription());
					preparedStmt.executeUpdate();
						
					
					
					 String querySelect02=QueryConstants.select_vendorid;			
						PreparedStatement preparedStmt02 = connection.prepareStatement(querySelect02);			
						preparedStmt02.setString(1,json.getContactNo());		
						preparedStmt02.setString(2,json.getCompanyId());	
						ResultSet rs02=preparedStmt02.executeQuery();			
						while(rs02.next()) {
							vendorId = rs02.getString("vendorId");
							
							
						}
						
						MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), vendorId, json.getVendorName(),"Added Vendor",json.getCompanyId());

						connection.close();     
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

	public MasterJSON vendorReport(MasterJSON json) {
		// TODO Auto-generated method stub	
		ArrayList<MasterJSON> vendorRetrievelist = new ArrayList<MasterJSON>();	
	  	MasterJSON res=new MasterJSON();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.Vendor_Report;
	
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getCompanyId());				
	        ResultSet rs=preparedStmt.executeQuery();
	               
	        while(rs.next())
	        {
	        	MasterJSON vendorRetrieveobj = new MasterJSON();
	        	vendorRetrieveobj.setVendorId(rs.getString("vendorId"));
	        	vendorRetrieveobj.setVendorName(rs.getString("vendorName"));
	        	vendorRetrieveobj.setCompanyName(rs.getString("companyName"));
	        	vendorRetrieveobj.setAddress(rs.getString("address"));
	        	vendorRetrieveobj.setContactNo(rs.getString("contactNo"));	 
	        	
	        	vendorRetrieveobj.setCity(rs.getString("city"));	        	
	        	vendorRetrieveobj.setAlternateContactNo(rs.getString("alternatecontactNo"));	        	
	        	vendorRetrieveobj.setGstNo(rs.getString("gstNo"));	        	
	        	vendorRetrieveobj.setEmail(rs.getString("email"));
	        	vendorRetrieveobj.setDescription(rs.getString("description"));
	        	vendorRetrievelist.add(vendorRetrieveobj);
	        }
	             
	        
	        res.setVendorRetrievelist(vendorRetrievelist);
	        
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

	public MasterJSON addproduct(MasterJSON json) {
		// TODO Auto-generated method stub
		Connection connection=null;
		String ProductName=null;
		String productId =null;
		try {
			       connection = DatabaseUtil.getDBConnection();
				   	String querySelect0=QueryConstants.VERIFY_ProductName;
								PreparedStatement preparedStmt0 = connection.prepareStatement(querySelect0);
								preparedStmt0.setString(1,json.getProductName());								
								preparedStmt0.setString(2,json.getCompanyId());
								ResultSet rs0=preparedStmt0.executeQuery();
								
								while(rs0.next()) {
									ProductName=rs0.getString("productName");
								
									
								}
								if(ProductName==null) {
					String querySelect=QueryConstants.Product_Insert;
					PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
					preparedStmt.setString(1,json.getProductName());		
					preparedStmt.setString(2,json.getCgst());
					preparedStmt.setString(3,json.getSgst());
					preparedStmt.setString(4,json.getIgst());
					preparedStmt.setString(5,json.getHsnCode());
					preparedStmt.setString(6,json.getDescription());				
					preparedStmt.setString(7,json.getSaleRate());					
					preparedStmt.setString(8,json.getCompanyId());
					preparedStmt.setString(9,json.getProductType());					
					preparedStmt.setString(10,json.getQuantityLimit());
					preparedStmt.setString(11,json.getProductCategory());
					preparedStmt.setString(12,json.getQuantity());
					preparedStmt.setString(13,json.getPurchaseRate());
					preparedStmt.setString(14,json.getMinimumServiceTime());
					preparedStmt.executeUpdate();
					
					
				 	String querySelectProductId=QueryConstants.Select_ProductID;
				
					PreparedStatement preparedStmtProductId = connection.prepareStatement(querySelectProductId);
					preparedStmtProductId.setString(1,json.getProductName());				
					preparedStmtProductId.setString(2,json.getCompanyId());
					ResultSet rsProductId=preparedStmtProductId.executeQuery();
					
					while(rsProductId.next()) {
						productId=rsProductId.getString("productId");
					
						
						
					}
				
						String querySelectInventory=QueryConstants.Inventory_Insert;
						PreparedStatement preparedStmtInven=connection.prepareStatement(querySelectInventory);
						preparedStmtInven.setString(1, json.getProductName());				
						preparedStmtInven.setString(2, json.getCompanyId());						
						preparedStmtInven.setString(3, productId);						
						preparedStmtInven.executeUpdate();
						
					
						MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), productId, json.getProductName(),"Added Product",json.getCompanyId());

					connection.close();     
							
								
								}
								else if(ProductName!=null){
									json.setProductName("ProductName");
									
									
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

	public MasterJSON saleproductReport(MasterJSON json) {
		ArrayList<MasterJSON> saleProductRetrievelist = new ArrayList<MasterJSON>();	
	  	MasterJSON res=new MasterJSON();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.Sale_Product_Report;
			
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getCompanyId());				
	        ResultSet rs=preparedStmt.executeQuery();
	               
	        while(rs.next())
	        {
	        	MasterJSON saleProductRetrieveobj = new MasterJSON();
	        	saleProductRetrieveobj.setProductId(rs.getString("productId"));
	        	saleProductRetrieveobj.setProductName(rs.getString("productName"));	    
	          	saleProductRetrieveobj.setProductType(rs.getString("productType"));
	        	saleProductRetrieveobj.setProductCategory(rs.getString("productCategory"));
	        	saleProductRetrieveobj.setCgst(rs.getString("cgst"));
	        	saleProductRetrieveobj.setSgst(rs.getString("sgst"));
	        	saleProductRetrieveobj.setIgst(rs.getString("igst"));
	        	saleProductRetrieveobj.setHsnCode(rs.getString("hsnCode"));
	        	saleProductRetrieveobj.setSaleRate(rs.getString("saleRate"));     
	        	saleProductRetrieveobj.setPurchaseRate(rs.getString("purchaseRate"));  
	        	saleProductRetrieveobj.setDescription(rs.getString("description"));
	        	saleProductRetrieveobj.setQuantityLimit(rs.getString("quantityLimit"));
	        	saleProductRetrieveobj.setQuantity(rs.getString("quantity"));	      
	        	saleProductRetrievelist.add(saleProductRetrieveobj);
	        }
	             
	        
	        res.setSaleProductRetrievelist(saleProductRetrievelist);
	        
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

	public MasterJSON purchaseproductReport(MasterJSON json) {
		ArrayList<MasterJSON> purchaseProductRetrievelist = new ArrayList<MasterJSON>();	
	  	MasterJSON res=new MasterJSON();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.Purchase_Product_Report;
		
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);	
			preparedStmt.setString(1,json.getCompanyId());		
	        ResultSet rs=preparedStmt.executeQuery();	               
	        while(rs.next())
	        {
	        	MasterJSON purchaseProductRetrieveobj = new MasterJSON();
	        	purchaseProductRetrieveobj.setProductId(rs.getString("productId"));
	        	purchaseProductRetrieveobj.setProductName(rs.getString("productName"));
	        	purchaseProductRetrieveobj.setUnit(rs.getString("unit"));
	        	purchaseProductRetrieveobj.setCgst(rs.getString("cgst"));
	        	purchaseProductRetrieveobj.setSgst(rs.getString("sgst"));
	        	purchaseProductRetrieveobj.setIgst(rs.getString("igst"));
	        	purchaseProductRetrieveobj.setHsnCode(rs.getString("hsnCode"));
	        	purchaseProductRetrieveobj.setSaleRate(rs.getString("saleRate"));
	        	purchaseProductRetrieveobj.setPurchaseRate(rs.getString("purchaseRate"));
	        	purchaseProductRetrieveobj.setProductCategory(rs.getString("productCategory"));	
	        	purchaseProductRetrieveobj.setDescription(rs.getString("description"));
	        	purchaseProductRetrievelist.add(purchaseProductRetrieveobj);
	        }
	          
	        
	        res.setPurchaseProductRetrievelist(purchaseProductRetrievelist);
	        
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

	public MasterJSON deletecustomer(MasterJSON json) {
		Connection connection=null;

		
		
		try {
			connection=DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.DELETE_CUSTOMER;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getContactNo());
			preparedStmt.setString(2,json.getCompanyId());
			//preparedStmt.setString(2,json.getDate());
			preparedStmt.executeUpdate();
			
			MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), json.getCustomerId(), json.getCustomerName(),"Deleted Customer",json.getCompanyId());

			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		return json;
	}

	public MasterJSON deletevendor(MasterJSON json) {
	Connection connection=null;

		
		
		try {
			connection=DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.DELETE_VENDOR;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getContactNo());
			preparedStmt.setString(2,json.getCompanyId());
			//preparedStmt.setString(2,json.getDate());
			preparedStmt.executeUpdate();
			MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), json.getVendorId(), json.getVendorName(),"Deleted Vendor",json.getCompanyId());

			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		return json;
		
	}

	public MasterJSON deletesaleproduct(MasterJSON json) {
       Connection connection=null;

	try {
			connection=DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.DELETE_SALE_PRODUCT;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getProductName());
			preparedStmt.setString(2,json.getProductId());
			preparedStmt.setString(3,json.getCompanyId());
			//preparedStmt.setString(2,json.getDate());
			preparedStmt.executeUpdate();
			
			MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), json.getProductId(), json.getProductName(),"Deleted Product Details",json.getCompanyId());

			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		return json;	
		
	
	}

	public MasterJSON deletepurchaseproduct(MasterJSON json) {
		  Connection connection=null;

			try {
					connection=DatabaseUtil.getDBConnection();
					
					String querySelect=QueryConstants.DELETE_PURCHASE_PRODUCT;
					PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
					preparedStmt.setString(1,json.getProductName());
					preparedStmt.setString(2,json.getProductCategory());
					preparedStmt.setString(3,json.getCompanyId());
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

public MasterJSON updatecustomer(MasterJSON json) {
		Connection connection=null;
		ArrayList <MasterJSON> CustomerList=new ArrayList <MasterJSON>();
		
		
		try {
			connection=DatabaseUtil.getDBConnection();

			String querySelect=QueryConstants.CustomerList_UPDATE;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getCompanyName());
			preparedStmt.setString(2,json.getAddress());
			preparedStmt.setString(3,json.getCity());
			preparedStmt.setString(4,json.getContactNo());
			preparedStmt.setString(5,json.getAlternateContactNo());
			preparedStmt.setString(6,json.getGstNo());
			preparedStmt.setString(7,json.getEmail());	
			preparedStmt.setString(8,json.getCustomerName());	
			preparedStmt.setString(9,json.getCustomerId());		
			//preparedStmt.setString(9,json.getOldContactNo());		
			preparedStmt.setString(10,json.getCompanyId());
			preparedStmt.executeUpdate();
			
		
			
			
			MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), json.getCustomerId(), json.getCustomerName(),"Updated Customer",json.getCompanyId());

			
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		return json;
	}

public MasterJSON updatevendor(MasterJSON json) {
	Connection connection=null;
	ArrayList <MasterJSON> CustomerList=new ArrayList <MasterJSON>();
	
	
	try {
		connection=DatabaseUtil.getDBConnection();
	  
		String querySelect=QueryConstants.VendorList_UPDATE;
		PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
		preparedStmt.setString(1,json.getCompanyName());
		preparedStmt.setString(2,json.getAddress());
		preparedStmt.setString(3,json.getCity());
		preparedStmt.setString(4,json.getContactNo());
		preparedStmt.setString(5,json.getAlternateContactNo());
		preparedStmt.setString(6,json.getGstNo());
		preparedStmt.setString(7,json.getEmail());			
		preparedStmt.setString(8,json.getVendorId());
		preparedStmt.setString(9,json.getCompanyId());
		preparedStmt.executeUpdate();
		
		MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), json.getVendorId(), json.getVendorName(),"Updated Vendor Details",json.getCompanyId());

		connection.close(); 
	}
	catch (Exception e) {
			e.printStackTrace();
	} finally {
			
		
	}
	return json;
}

public MasterJSON updateproduct(MasterJSON json) {
	Connection connection=null;
	ArrayList <MasterJSON> CustomerList=new ArrayList <MasterJSON>();
	
	
	try {
		connection=DatabaseUtil.getDBConnection();
	 
		String querySelect=QueryConstants.ProductList_UPDATE;
		PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
	
		preparedStmt.setString(1,json.getCgst());
		preparedStmt.setString(2,json.getSgst());
		preparedStmt.setString(3,json.getIgst());
		preparedStmt.setString(4,json.getHsnCode());
		preparedStmt.setString(5,json.getSaleRate());			
		preparedStmt.setString(6,json.getDescription());
		preparedStmt.setString(7,json.getProductType());
		preparedStmt.setString(8,json.getProductCategory());
		preparedStmt.setString(9,json.getQuantityLimit());
		preparedStmt.setString(10,json.getProductName());
		preparedStmt.setString(11,json.getPurchaseRate());
		preparedStmt.setString(12,json.getQuantity());
		preparedStmt.setString(13,json.getProductId());			
		preparedStmt.setString(14,json.getCompanyId());
		
		preparedStmt.executeUpdate();
			
		MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), json.getProductId(), json.getProductName(),"Updated Product Details",json.getCompanyId());

		connection.close(); 
	}
	catch (Exception e) {
			e.printStackTrace();
	} finally {
			
		
	}
	return json;
}

/*
 * Function for inserting data into Audit Table
 */

public static void AuditReport(String staffId,String staffName,String role, String affectedId,String affectedName, String operation, String companyId) {

	


	
	Connection connection = null;
	try {
		connection = DatabaseUtil.getDBConnection();
	
			String querySelectAR = QueryConstants.EMP_AUDIT_REPORT;
		PreparedStatement preparedStmtAR = connection.prepareStatement(querySelectAR);
		preparedStmtAR.setString(1, staffId);
		preparedStmtAR.setString(2, role);
		preparedStmtAR.setString(3, affectedId);
		preparedStmtAR.setString(4, operation);
		preparedStmtAR.setString(5, companyId);
		preparedStmtAR.setString(6, staffName);
		preparedStmtAR.setString(7, affectedName);
		preparedStmtAR.executeUpdate();

		connection.close();
	} catch (SQLException e) {
		e.printStackTrace();
	}
}

}
