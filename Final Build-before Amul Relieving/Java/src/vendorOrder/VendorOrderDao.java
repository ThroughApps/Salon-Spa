package vendorOrder;

import java.sql.Connection;






import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import DBUtil.DatabaseUtil;
import master.MasterDao;











public class VendorOrderDao {

	public VendorOrderJSON selectvendor(VendorOrderJSON json) {
	
		ArrayList<VendorOrderJSON> selectvendornamelist = new ArrayList<VendorOrderJSON>();	
		ArrayList<VendorOrderJSON> selectsaleproductlist = new ArrayList<VendorOrderJSON>();	
		VendorOrderJSON res=new VendorOrderJSON();
	
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();	
			
			
			String querySelect=QueryConstants.Select_Vendor_Name;
		
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);	
			//preparedStmt.setString(1,json.getProductCategory());	
			preparedStmt.setString(1,json.getCompanyId());
	        ResultSet rs=preparedStmt.executeQuery();	               
	        while(rs.next())
	        {
	        	VendorOrderJSON selectvendorNameobj = new VendorOrderJSON();
	        	selectvendorNameobj.setVendorName(rs.getString("vendorName"));	
	        	selectvendorNameobj.setOrderNumber(rs.getInt("orderNumber"));
	        	selectvendorNameobj.setVendorId(rs.getInt("vendorId"));
	        	selectvendorNameobj.setContactNo(rs.getString("contactNo"));
	        	selectvendorNameobj.setCompanyName(rs.getString("companyName"));
	          	selectvendorNameobj.setAddress(rs.getString("address"));
	          	selectvendorNameobj.setGstNo(rs.getString("gstNo"));
	          	selectvendorNameobj.setEmail(rs.getString("email"));
	        	selectvendornamelist.add(selectvendorNameobj);
	        }
			
	           
	        res.setSelectvendornamelist(selectvendornamelist);
	      
	        String querySelect1=QueryConstants.Select_Product_Name_Rate;
			
			PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);	
		    preparedStmt1.setString(1,json.getCompanyId());	
	        ResultSet rs1=preparedStmt1.executeQuery();	               
	        while(rs1.next())
	        {
	        	VendorOrderJSON selectsaleproductobj = new VendorOrderJSON();
	        	selectsaleproductobj.setProductName(rs1.getString("productName"));
	        	selectsaleproductobj.setProductType(rs1.getString("productType"));
	        	selectsaleproductobj.setDescription(rs1.getString("description"));
	        	selectsaleproductobj.setProductCategory(rs1.getString("productCategory"));
	        	selectsaleproductobj.setSaleRate(rs1.getString("saleRate"));
	        	selectsaleproductobj.setPurchaseRate(rs1.getString("purchaseRate"));
	        	selectsaleproductobj.setCgst(rs1.getString("cgst"));
	        	selectsaleproductobj.setSgst(rs1.getString("sgst"));
	        	selectsaleproductobj.setIgst(rs1.getString("igst"));
	        	selectsaleproductobj.setQuantity(rs1.getString("quantity"));	        
	        	selectsaleproductobj.setProductId(rs1.getString("productId"));
	        	selectsaleproductlist.add(selectsaleproductobj);
	        }
	          
	        res.setSelectsaleproductlist(selectsaleproductlist);
	        
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



	
	public VendorOrderJSON addpurchaseorder(VendorOrderJSON json) {
		ArrayList<VendorOrderJSON> productdatalist = new ArrayList<VendorOrderJSON>();	
		ArrayList<VendorOrderJSON> arrdatalist = new ArrayList<VendorOrderJSON>();	
		 
		Connection connection=null;
		String invoiceData=null;
		String productName=null;
		String size=null;
		String rate=null;
		String amount=null;
		String quantity=null;
		String total=null;
		String cgst=null;
		String sgst=null;
		String igst=null;
		String finalAmount=null;
		String unit=null;
		String  height="0";
		String width="0";
		String description="-";
		String pay="0";
		String invoiceNumber="";
		String productId="";
		String AuditVendorId=null;
		int subtotalwithshippingadjustment=0;
		try {
			       connection = DatabaseUtil.getDBConnection();
			     
					
					invoiceData=json.getInvoiceData();
					String invoiceDatawithoutLastCharacter = invoiceData.substring(0, invoiceData.length() - 1);
					
				
					  String querySelect3=QueryConstants.PurchaseOrder_Insert_SELECT;
						PreparedStatement preparedStmt3 = connection.prepareStatement(querySelect3);
						
						preparedStmt3.setString(1,json.getCompanyId());
						ResultSet rs=preparedStmt3.executeQuery();
						while(rs.next()) {
						if(rs.getString("invoiceNo")!=null) {
							
						   invoiceNumber = rs.getString("invoiceNo");
						   
						}else {
							invoiceNumber="PO-0";
							
						}
						}
						String[] data = invoiceNumber.split("-");
						
						
						int result = Integer.parseInt(data[1]);	
						int invoiceNumber1= result + 1;
						String invoiceNo = String.format("PO-%s", invoiceNumber1);
					//	VendorOrderJSON selectInvoiceNoObj = new VendorOrderJSON();
						json.setInvoiceNo(invoiceNo);
						
						
						
						int subtotal = Integer.parseInt(json.getSubtotal1());	
						int shipping = Integer.parseInt(json.getShipping());	
						int adjustment = Integer.parseInt(json.getAdjustment());	
						subtotalwithshippingadjustment=subtotal+shipping+adjustment;
						String querySelect2=QueryConstants.ven_Statement_Insert;
						PreparedStatement preparedStmt2 = connection.prepareStatement(querySelect2);
						preparedStmt2.setString(1,invoiceNo);
						preparedStmt2.setString(2,pay);
						preparedStmt2.setString(3,json.getDiscount());
						preparedStmt2.setInt(4,subtotalwithshippingadjustment);				
						preparedStmt2.setString(5,json.getDate());
						preparedStmt2.setString(6,json.getVendorName());
						preparedStmt2.setString(7,json.getFinalAmountTotal());				
						preparedStmt2.setInt(8,json.getVendorId());
						preparedStmt2.setString(9,json.getCompanyId());	
						preparedStmt2.setString(10,json.getAddress());
						preparedStmt2.setString(11,json.getGstNo());
						preparedStmt2.setString(12,json.getEmail());
						
						preparedStmt2.executeUpdate();
						
						
						
						
						if(json.getInvoiceData()!=null) {
						    List<String> aList= Arrays.asList(invoiceDatawithoutLastCharacter.split("@,"));
							for(int i=0;i<aList.size();i=i+10)
							{
						
											
							productName=aList.get(i);							
							rate=aList.get(i+1);							
							quantity=aList.get(i+2);
							total=aList.get(i+3);
							cgst=aList.get(i+4);
							sgst=aList.get(i+5);
							igst=aList.get(i+6);
							finalAmount=aList.get(i+7);							
							description=aList.get(i+8);
							productId=aList.get(i+9);
							
							String querySelect=QueryConstants.PurchaseOrder_Insert;
							PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
							preparedStmt.setString(1, json.getVendorName());
							preparedStmt.setString(2,invoiceNo);
							preparedStmt.setInt(3,json.getOrderNumber());
							preparedStmt.setString(4,json.getInvoiceDate());
							preparedStmt.setString(5,json.getDueDate());							
							preparedStmt.setString(6,productName);
							preparedStmt.setString(7,description);							
							preparedStmt.setString(8,rate);							
							preparedStmt.setString(9,quantity);
							preparedStmt.setString(10,total);
							preparedStmt.setString(11,cgst);
							preparedStmt.setString(12,sgst);
							preparedStmt.setString(13,igst);
							preparedStmt.setString(14,finalAmount);
							preparedStmt.setString(15,json.getDate());
							preparedStmt.setString(16,json.getContactNo());
							preparedStmt.setString(17,json.getTotalcgst());
							preparedStmt.setString(18,json.getTotalsgst());
							preparedStmt.setString(19,json.getTotaligst());
							preparedStmt.setString(20,json.getTotalitemqty());
							preparedStmt.setString(21,json.getSubtotal1());
							preparedStmt.setString(22,json.getTotalgst());					
							preparedStmt.setString(23,json.getAdjustment());
							preparedStmt.setString(24,json.getDiscount());
							preparedStmt.setString(25,json.getFinalAmountTotal());
							preparedStmt.setString(26,json.getShipping());
							preparedStmt.setString(27, json.getPayment_status());					
							preparedStmt.setInt(28, json.getVendorId());
							preparedStmt.setString(29, json.getCompanyId());
							preparedStmt.setString(30, json.getCompanyName());
							preparedStmt.setInt(31,subtotalwithshippingadjustment);
							preparedStmt.setString(32,json.getAddress());
							preparedStmt.setString(33,json.getEmail());
							preparedStmt.setString(34,json.getGstNo());
							preparedStmt.setString(35,productId);
							preparedStmt.setString(36,json.getExpiryDate());
							preparedStmt.executeUpdate();
							 String querySelect1=QueryConstants.Update_Quantity;
								PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
								preparedStmt1.setString(1,quantity);	
								preparedStmt1.setString(2,productId);	
								preparedStmt1.setString(3,json.getCompanyId());
								preparedStmt1.executeUpdate();
				
						
							
							}
							AuditVendorId=String.valueOf(json.getVendorId());
							MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), AuditVendorId,json.getVendorName(),"Purchase Invoice Generated",json.getCompanyId());
						
							
						}
					
						  String querySelect1=QueryConstants.Customer_OrderNumber;
							PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
							preparedStmt1.setInt(1,json.getOrderNumber());	
							preparedStmt1.setInt(2,json.getVendorId());	
							preparedStmt1.setString(3,json.getCompanyId());	
							preparedStmt1.executeUpdate();
							
							
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


	public VendorOrderJSON purchaseinvoicereport(VendorOrderJSON json) {
		ArrayList<VendorOrderJSON> purchaseinvoicereportlist = new ArrayList<VendorOrderJSON>();	
		VendorOrderJSON res=new VendorOrderJSON();
		List<String> invList =  new ArrayList<String>();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
			String querySelect1=QueryConstants.SELECT_GST_INV.replace("$tableName","PurchaseInvoiceTable");
			PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1,json.getCompanyId());
			ResultSet rs1=preparedStmt1.executeQuery();
			while(rs1.next()) {
				invList.add(rs1.getString("invoiceNo"));
			}
			
			
			for(int i=(invList.size()-1);i>=0;i--) {
			String querySelect=QueryConstants.PurchaseInvoice_Report;
			
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			//preparedStmt.setString(1,json.getMonth());
			preparedStmt.setString(1,json.getCompanyId());
			preparedStmt.setString(2,invList.get(i));			
	        ResultSet rs=preparedStmt.executeQuery();
	               
	        while(rs.next())
	        {
	        	VendorOrderJSON purchaseinvoicereportobj = new VendorOrderJSON();
	        	purchaseinvoicereportobj.setPurchaseId(rs.getString("purchaseId"));
	        	purchaseinvoicereportobj.setInvoiceNo(rs.getString("invoiceNo"));
	        	purchaseinvoicereportobj.setDate(rs.getString("date"));
	        	purchaseinvoicereportobj.setVendorName(rs.getString("vendorName"));
	        	purchaseinvoicereportobj.setContactNo(rs.getString("contactNo"));	 
	        	purchaseinvoicereportobj.setFinalAmountTotal(rs.getString("finalAmountTotal"));
	        	purchaseinvoicereportobj.setSubtotal1(rs.getString("subtotal1"));
	        	purchaseinvoicereportobj.setPayment_status(rs.getString("payment_status"));
	        	purchaseinvoicereportobj.setShipping(rs.getString("shipping"));
	        	purchaseinvoicereportobj.setVendorId(rs.getInt("vendorId"));
	        	purchaseinvoicereportobj.setCompanyName(rs.getString("companyName"));
	           	purchaseinvoicereportobj.setOrderNumber(rs.getInt("orderNumber"));
	           	purchaseinvoicereportobj.setInvoiceDate(rs.getString("invoiceDate"));
	         	purchaseinvoicereportobj.setDueDate(rs.getString("dueDate"));
	         	purchaseinvoicereportobj.setAddress(rs.getString("address"));
	         	purchaseinvoicereportobj.setGstNo(rs.getString("gstNo"));
	         	purchaseinvoicereportobj.setEmail(rs.getString("email"));
	         	purchaseinvoicereportobj.setAdjustment(rs.getString("adjustment"));
	         	purchaseinvoicereportobj.setDiscount(rs.getString("discount"));
	         	purchaseinvoicereportobj.setDescription(rs.getString("description"));
	        	purchaseinvoicereportlist.add(purchaseinvoicereportobj);
	        }
			}
	         
	        
	        res.setPurchaseinvoicereportlist(purchaseinvoicereportlist);
	        
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
	
	public static String GetEmailId(String contactNo) {
		VendorOrderJSON res=new VendorOrderJSON();
		Connection connection=null;
		String emailId = null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
	       
			String querySelect=QueryConstants.GET_EMAIL_ID;
			
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,contactNo);	
	        ResultSet rs=preparedStmt.executeQuery();
	               
	        while(rs.next())
	        {
	        	emailId=rs.getString("Email");
	        }
	         
	        connection.close();  
	        } catch (SQLException e)
	        {
	        e.printStackTrace();
	        }
	         	
		   finally {
			DatabaseUtil.closeConnection(connection);
		}
	        
		   return emailId;
		
	}
	
	public VendorOrderJSON updatepurchaseorder(VendorOrderJSON json) {
		ArrayList<VendorOrderJSON> productdatalist = new ArrayList<VendorOrderJSON>();	
		ArrayList<VendorOrderJSON> arrdatalist = new ArrayList<VendorOrderJSON>();	
		 
		Connection connection=null;
		String invoiceData=null;
		String productName=null;
		String size=null;
		String rate=null;
		String amount=null;
		String quantity=null;
		String total=null;
		String cgst=null;
		String sgst=null;
		String igst=null;
		String finalAmount=null;
		String unit=null;
		String  height="0";
		String width="0";
		String description="-";
		String pay="0";
		String invoiceNumber="";
		String productId=null;
		String AuditVendorId=null;
		String updateQuantity = null;
		String status = null;
		String quantity5 = null;
		String productId5 = null;
		String companyId5 = null;
		int subtotalwithshippingadjustment=0;
		try {
			       connection = DatabaseUtil.getDBConnection();
			     
					
					invoiceData=json.getInvoiceData();
					String invoiceDatawithoutLastCharacter = invoiceData.substring(0, invoiceData.length() - 1);
					updateQuantity = json.getUpdateQuantity();
				
				
					
					String querySelect1=QueryConstants.VendorStat_DEL;
					PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
					preparedStmt1.setString(1,json.getInvoiceNo());
					preparedStmt1.setInt(2,json.getVendorId());
					preparedStmt1.setString(3,json.getCompanyId());
					preparedStmt1.executeUpdate();
						
						
						int subtotal = Integer.parseInt(json.getSubtotal1());	
						int shipping = Integer.parseInt(json.getShipping());	
						int adjustment = Integer.parseInt(json.getAdjustment());	
						subtotalwithshippingadjustment=subtotal+shipping+adjustment;
						String querySelect2=QueryConstants.ven_Statement_Insert;
						PreparedStatement preparedStmt2 = connection.prepareStatement(querySelect2);
						preparedStmt2.setString(1,json.getInvoiceNo());
						preparedStmt2.setString(2,pay);
						preparedStmt2.setString(3,json.getDiscount());
						preparedStmt2.setInt(4,subtotalwithshippingadjustment);				
						preparedStmt2.setString(5,json.getDate());
						preparedStmt2.setString(6,json.getVendorName());
						preparedStmt2.setString(7,json.getFinalAmountTotal());				
						preparedStmt2.setInt(8,json.getVendorId());
						preparedStmt2.setString(9,json.getCompanyId());	
						preparedStmt2.setString(10,json.getAddress());
						preparedStmt2.setString(11,json.getGstNo());
						preparedStmt2.setString(12,json.getEmail());
						preparedStmt2.executeUpdate();
						
	
						
						String querySelect3=QueryConstants.DAILY_PURCHASE_REPORT_DEL;
						PreparedStatement preparedStmt3=connection.prepareStatement(querySelect3);
						preparedStmt3.setString(1,json.getInvoiceNo());
						preparedStmt3.setInt(2,json.getVendorId());
						preparedStmt3.setString(3,json.getCompanyId());
						preparedStmt3.executeUpdate();
						
						

						if(json.getInvoiceData()!=null) {
						    List<String> aList= Arrays.asList(invoiceDatawithoutLastCharacter.split("@,"));
							for(int i=0;i<aList.size();i=i+11)
							{
										
							productName=aList.get(i);							
							rate=aList.get(i+1);							
							quantity=aList.get(i+2);
							total=aList.get(i+3);
							cgst=aList.get(i+4);
							sgst=aList.get(i+5);
							igst=aList.get(i+6);
							finalAmount=aList.get(i+7);							
							description=aList.get(i+8);
							productId=aList.get(i+9);
							status=aList.get(i+10);
							//if (description == null || description.equals("-") || description.equals("")) {
							//	description = "0";
				          //   }
						
							String querySelect=QueryConstants.PurchaseOrder_Insert;
							PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
							preparedStmt.setString(1, json.getVendorName());
							preparedStmt.setString(2,json.getInvoiceNo());
							preparedStmt.setInt(3,json.getOrderNumber());
							preparedStmt.setString(4,json.getInvoiceDate());
							preparedStmt.setString(5,json.getDueDate());							
							preparedStmt.setString(6,productName);
							preparedStmt.setString(7,description);							
							preparedStmt.setString(8,rate);							
							preparedStmt.setString(9,quantity);
							preparedStmt.setString(10,total);
							preparedStmt.setString(11,cgst);
							preparedStmt.setString(12,sgst);
							preparedStmt.setString(13,igst);
							preparedStmt.setString(14,finalAmount);
							preparedStmt.setString(15,json.getDate());
							preparedStmt.setString(16,json.getContactNo());
							preparedStmt.setString(17,json.getTotalcgst());
							preparedStmt.setString(18,json.getTotalsgst());
							preparedStmt.setString(19,json.getTotaligst());
							preparedStmt.setString(20,json.getTotalitemqty());
							preparedStmt.setString(21,json.getSubtotal1());
							preparedStmt.setString(22,json.getTotalgst());					
							preparedStmt.setString(23,json.getAdjustment());
							preparedStmt.setString(24,json.getDiscount());
							preparedStmt.setString(25,json.getFinalAmountTotal());
							preparedStmt.setString(26,json.getShipping());
							preparedStmt.setString(27, json.getPayment_status());					
							preparedStmt.setInt(28,json.getVendorId());
							preparedStmt.setString(29, json.getCompanyId());
							preparedStmt.setString(30, json.getCompanyName());
							preparedStmt.setInt(31,subtotalwithshippingadjustment);
							preparedStmt.setString(32,json.getAddress());
							preparedStmt.setString(33,json.getEmail());
							preparedStmt.setString(34,json.getGstNo());
							preparedStmt.setString(35,productId);
							preparedStmt.executeUpdate();
							AuditVendorId=String.valueOf(json.getVendorId());
							
							Integer.parseInt(productId);
							
							   if (quantity == null || quantity.equals("-") || quantity.equals("")) {
					                  quantity = "0";
							   }
							if(!status.equals("Exist")) {
							 String querySelect4=QueryConstants.Update_Quantity;
								PreparedStatement preparedStmt4=connection.prepareStatement(querySelect4);
								preparedStmt4.setString(1,quantity);	
								preparedStmt4.setString(2,productId);	
								preparedStmt4.setString(3,json.getCompanyId());
								preparedStmt4.executeUpdate();
							}
							
							}
							MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), AuditVendorId,json.getVendorName(),"Purchase Invoice Updated",json.getCompanyId());
							
						}
						if ( (!json.getUpdateQuantity().equals(""))) {
							
							List<String> arList = Arrays.asList(updateQuantity.split(","));
							for (int j = 0; j < arList.size(); j = j + 3) {

								quantity5 = arList.get(j);
								productId5 = arList.get(j + 1);
								companyId5 = arList.get(j + 2);
									   if (quantity5 == null || quantity5.equals("-") || quantity5.equals("")) {
									   quantity5 = "0";
						               }
								String querySelect5 = QueryConstants.Update_Quantity_Exist;
								PreparedStatement preparedStmt5 = connection.prepareStatement(querySelect5);
								preparedStmt5.setString(1, quantity5);
								preparedStmt5.setString(2, productId5);
								preparedStmt5.setString(3, companyId5);
								preparedStmt5.executeUpdate();
								
							}
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

}
