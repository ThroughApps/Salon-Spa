package quotation;

import java.sql.Connection;




import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import DBUtil.DatabaseUtil;
import master.MasterDao;

public class QuotationDao {
	public QuotationJSON selectCustomer(QuotationJSON json) {
		
		ArrayList<QuotationJSON> selectcustomernamelist = new ArrayList<QuotationJSON>();
		ArrayList<QuotationJSON> selectsaleproductlist = new ArrayList<QuotationJSON>();	
	  	QuotationJSON res=new QuotationJSON();
		Connection connection=null;
		String gstNo="-";
		try {
			
			connection =DatabaseUtil.getDBConnection();			
			String querySelect=QueryConstants.Select_Customer_Name;

			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);	
			preparedStmt.setString(1,json.getCompanyId());	
	        ResultSet rs=preparedStmt.executeQuery();	               
	        while(rs.next())
	        {
	        	QuotationJSON selectCustomerNameobj = new QuotationJSON();
	        	selectCustomerNameobj.setCustomerName(rs.getString("customerName"));	
	        	selectCustomerNameobj.setOrderNumber(rs.getInt("orderNumber"));
	        	selectCustomerNameobj.setCustomerId(rs.getInt("customerId"));
	        	selectCustomerNameobj.setContactNo(rs.getString("contactNo"));
	        	selectCustomerNameobj.setEorderNumber(rs.getInt("eorderNumber"));
	        	selectCustomerNameobj.setAddress(rs.getString("address"));
	        	selectCustomerNameobj.setCompanyName(rs.getString("companyName"));
	        	gstNo=rs.getString("gstNo");
	        	selectCustomerNameobj.setGstNo(gstNo);	        	
	        	selectCustomerNameobj.setEmail(rs.getString("email"));
	        	
	        	selectcustomernamelist.add(selectCustomerNameobj);
	        }
	       
	        res.setSelectcustomernamelist(selectcustomernamelist);
	        
	        String querySelect1=QueryConstants.Select_Product_Name_Rate;
			
			PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);	
			preparedStmt1.setString(1,json.getCompanyId());	
	        ResultSet rs1=preparedStmt1.executeQuery();	               
	        while(rs1.next())
	        {
	        	QuotationJSON selectsaleproductobj = new QuotationJSON();
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
	        	selectsaleproductobj.setQuantityLimit(rs1.getString("QuantityLimit"));
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

	
	
	public QuotationJSON addgstquotationorder(QuotationJSON json) {
		ArrayList<QuotationJSON> productdatalist = new ArrayList<QuotationJSON>();	
		ArrayList<QuotationJSON> arrdatalist = new ArrayList<QuotationJSON>();	
		 
		Connection connection=null;
		String invoiceData=null;
		String productName=null;	
		String rate=null;	
		String quantity=null;
		String total=null;
		String cgst=null;
		String sgst=null;
		String igst=null;
		String finalAmount=null;
		String invoiceNumber="";
		String description=null;
		String productId=null;

String AuditCustomerId=null;
	
		try {
			       connection = DatabaseUtil.getDBConnection();
			       
					invoiceData=json.getInvoiceData();
					String invoiceDatawithoutLastCharacter = invoiceData.substring(0, invoiceData.length() - 1);
					
					  String querySelect1=QueryConstants.GSTQuotation_Insert_SELECT;
						PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
						preparedStmt1.setString(1,json.getCompanyId());
						ResultSet rs=preparedStmt1.executeQuery();
						while(rs.next()) {
						if(rs.getString("invoiceNo")!=null) {
							
						   invoiceNumber = rs.getString("invoiceNo");
						   
						}else {
							invoiceNumber="QT-0";
							
						}
						}
						String[] data = invoiceNumber.split("-");
						int result = Integer.parseInt(data[1]);	
						int invoiceNumber1= result + 1;
						String invoiceNo = String.format("QT-%s", invoiceNumber1);
						//QuotationJSON selectInvoiceNoObj = new QuotationJSON();
						json.setInvoiceNo(invoiceNo);
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
							
							
							String querySelect=QueryConstants.GSTQuotation_Insert;
							PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
							preparedStmt.setString(1, json.getCustomerName());
							preparedStmt.setString(2,invoiceNo);						
							preparedStmt.setString(3,json.getInvoiceDate());
							preparedStmt.setString(4,json.getDueDate());
							preparedStmt.setString(5,json.getSaleType());
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
							preparedStmt.setString(17,json.getAddress());
							preparedStmt.setString(18,json.getTotalcgst());
							preparedStmt.setString(19,json.getTotalsgst());
							preparedStmt.setString(20,json.getTotaligst());
							preparedStmt.setString(21,json.getTotalitemqty());
							preparedStmt.setString(22,json.getSubtotal1());
							preparedStmt.setString(23,json.getTotalgst());					
							preparedStmt.setString(24,json.getAdjustment());
							preparedStmt.setString(25,json.getDiscount());
							preparedStmt.setString(26,json.getFinalAmountTotal());
							preparedStmt.setString(27, json.getPayment_status());								
							preparedStmt.setString(28, json.getShipping());	
							preparedStmt.setString(29, json.getCompanyId());	
							preparedStmt.setString(30, json.getCompanyName());
							preparedStmt.setInt(31, json.getCustomerId());
							preparedStmt.setString(32, json.getGstNo());
							preparedStmt.setString(33, json.getEmail());
							preparedStmt.setString(34, productId);
							preparedStmt.executeUpdate();
							
							}
							AuditCustomerId=String.valueOf(json.getCustomerId());
							MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), AuditCustomerId,json.getCustomerName(),"GSTQuotation Generated",json.getCompanyId());
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

	

	


	public QuotationJSON addwithoutgstquotationorder(QuotationJSON json) {
		ArrayList<QuotationJSON> withoutgstproductdatalist = new ArrayList<QuotationJSON>();	
		ArrayList<QuotationJSON> arrdatalist = new ArrayList<QuotationJSON>();	
		 

		Connection connection=null;
		String invoiceData=null;
		String productName=null;		
		String rate=null;	
		String quantity=null;
		String total=null;	
		String invoiceNumber="";
		String productId=null;
		String description=null;
		String AuditCustomerId=null;
		try {
			       connection = DatabaseUtil.getDBConnection();
			       String querySelect1=QueryConstants.WithoutGSTQuotation_Insert_SELECT;
					PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
					preparedStmt1.setString(1,json.getCompanyId());
					ResultSet rs=preparedStmt1.executeQuery();
					while(rs.next()) {
					if(rs.getString("invoiceNo")!=null) {
						
					   invoiceNumber = rs.getString("invoiceNo");
					   
					}else {
						invoiceNumber="QT-0";
						
					}
					}
					String[] data = invoiceNumber.split("-");
						int result = Integer.parseInt(data[1]);	
					int invoiceNumber1= result + 1;
					String invoiceNo = String.format("QT-%s", invoiceNumber1);
				//	QuotationJSON selectWithoutGstInvoiceNoObj = new QuotationJSON();
					json.setInvoiceNo(invoiceNo);
					
			       invoiceData=json.getInvoiceData();
					String invoiceDatawithoutLastCharacter = invoiceData.substring(0, invoiceData.length() - 1);
					
			

						if(json.getInvoiceData()!=null) {
						    List<String> aList= Arrays.asList(invoiceDatawithoutLastCharacter.split("@,"));
						    for(int i=0;i<aList.size();i=i+6)
							{
											
							productName=aList.get(i);							
							rate=aList.get(i+1);						
							quantity=aList.get(i+2);
							total=aList.get(i+3);						
							description=aList.get(i+4);
							productId=aList.get(i+5);
							
							String querySelect=QueryConstants.WithoutGSTQuotation_Insert;
							PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
							preparedStmt.setString(1, json.getCustomerName());
							preparedStmt.setString(2,invoiceNo);					
							preparedStmt.setString(3,json.getInvoiceDate());
							preparedStmt.setString(4,json.getDueDate());
							preparedStmt.setString(5,json.getSaleType());
							preparedStmt.setString(6,productName);
							preparedStmt.setString(7,description);						
							preparedStmt.setString(8,rate);			
							preparedStmt.setString(9,quantity);
							preparedStmt.setString(10,total);						
							preparedStmt.setString(11,json.getDate());
							preparedStmt.setString(12,json.getContactNo());	
							preparedStmt.setString(13,json.getAddress());
							preparedStmt.setString(14,json.getTotalitemqty());
							preparedStmt.setString(15,json.getSubtotal1());										
							preparedStmt.setString(16,json.getAdjustment());
							preparedStmt.setString(17,json.getDiscount());
							preparedStmt.setString(18,json.getFinalAmountTotal());
							preparedStmt.setString(19, json.getPayment_status());											
							preparedStmt.setString(20, json.getShipping());
							preparedStmt.setString(21, json.getCompanyId());
							preparedStmt.setString(22, json.getCompanyName());
							preparedStmt.setInt(23, json.getCustomerId());
							preparedStmt.setString(24, json.getGstNo());
							preparedStmt.setString(25, json.getEmail());
							preparedStmt.setString(26,productId);
							preparedStmt.executeUpdate();
												
							}	
						    AuditCustomerId=String.valueOf(json.getCustomerId());
							MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), AuditCustomerId,json.getCustomerName(),"WithoutGSTQuotation Generated",json.getCompanyId());
					
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
	public QuotationJSON gstquotationreport(QuotationJSON json) {
		ArrayList<QuotationJSON> gstquotationreportlist = new ArrayList<QuotationJSON>();	
		QuotationJSON res=new QuotationJSON();
		 List<String> invList =  new ArrayList<String>();
			
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.SELECT_GST_INV.replace("$tableName","GSTQuotationTable");;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getCompanyId());
			ResultSet rs=preparedStmt.executeQuery();
			while(rs.next()) {
				invList.add(rs.getString("invoiceNo"));
			}
		
			
			
			for(int i=(invList.size()-1);i>=0;i--) {
			
			String querySelect1=QueryConstants.GSTQuotation_Report;
			
			PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1,json.getCompanyId());
			preparedStmt1.setString(2,invList.get(i));
	        ResultSet rs1=preparedStmt1.executeQuery();
	               
	        while(rs1.next())
	        {
	        	QuotationJSON gstquotationreportobj = new QuotationJSON();
	        	gstquotationreportobj.setGstQuotationId(rs1.getString("gstQuotationId"));
	        	gstquotationreportobj.setInvoiceNo(rs1.getString("invoiceNo"));
	        	gstquotationreportobj.setDate(rs1.getString("date"));
	        	gstquotationreportobj.setCustomerName(rs1.getString("customerName"));
	        	gstquotationreportobj.setContactNo(rs1.getString("contactNo"));	 
	        	gstquotationreportobj.setAddress(rs1.getString("address"));
	        	gstquotationreportobj.setTotalgst(rs1.getString("totalgst"));
	        	gstquotationreportobj.setSubtotal1(rs1.getString("subtotal1"));
	        	gstquotationreportobj.setPayment_status(rs1.getString("payment_status"));
	        	gstquotationreportobj.setFinalAmountTotal(rs1.getString("finalAmountTotal"));
	         	gstquotationreportobj.setShipping(rs1.getString("shipping"));
	        	gstquotationreportobj.setCompanyName(rs1.getString("companyName"));
	        	gstquotationreportobj.setCustomerId(rs1.getInt("customerId"));
	        	gstquotationreportlist.add(gstquotationreportobj);
	        }
			}
	      
	        
	        res.setGstquotationreportlist(gstquotationreportlist);
	        
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
	
	public QuotationJSON gstquotationreportmonthyear(QuotationJSON json) {
		ArrayList<QuotationJSON> gstquotationreportlist = new ArrayList<QuotationJSON>();	
		QuotationJSON res=new QuotationJSON();
		 List<String> invList =  new ArrayList<String>();
			
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.SELECT_GST_INV1.replace("$tableName","GSTQuotationTable");;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getFromDate());
			preparedStmt.setString(2,json.getToDate());
			preparedStmt.setString(3,json.getCompanyId());
			ResultSet rs=preparedStmt.executeQuery();
			while(rs.next()) {
				invList.add(rs.getString("invoiceNo"));
			}
		
		
			
			for(int i=(invList.size()-1);i>=0;i--) {
			
			String querySelect1=QueryConstants.GSTQuotation_Report1;
			
			PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1,json.getFromDate());
			preparedStmt1.setString(2,json.getToDate());
			preparedStmt1.setString(3,json.getCompanyId());
			preparedStmt1.setString(4,invList.get(i));
	        ResultSet rs1=preparedStmt1.executeQuery();
	               
	        while(rs1.next())
	        {
	        	QuotationJSON gstquotationreportobj = new QuotationJSON();
	        	gstquotationreportobj.setGstQuotationId(rs1.getString("gstQuotationId"));
	        	gstquotationreportobj.setInvoiceNo(rs1.getString("invoiceNo"));
	        	gstquotationreportobj.setDate(rs1.getString("date"));
	        	gstquotationreportobj.setCustomerName(rs1.getString("customerName"));
	        	gstquotationreportobj.setContactNo(rs1.getString("contactNo"));	 
	        	gstquotationreportobj.setAddress(rs1.getString("address"));
	        	gstquotationreportobj.setTotalgst(rs1.getString("totalgst"));
	        	gstquotationreportobj.setSubtotal1(rs1.getString("subtotal1"));
	        	gstquotationreportobj.setPayment_status(rs1.getString("payment_status"));
	        	gstquotationreportobj.setFinalAmountTotal(rs1.getString("finalAmountTotal"));
	         	gstquotationreportobj.setShipping(rs1.getString("shipping"));
	        	gstquotationreportobj.setCompanyName(rs1.getString("companyName"));
	        	gstquotationreportobj.setCustomerId(rs1.getInt("customerId"));
	        	gstquotationreportlist.add(gstquotationreportobj);
	        }
			}
	            
	        
	        res.setGstquotationreportlist(gstquotationreportlist);
	        
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
	
	public QuotationJSON withoutgstquotationreport(QuotationJSON json) {
		ArrayList<QuotationJSON> withoutgstquotationreportlist = new ArrayList<QuotationJSON>();	
		QuotationJSON res=new QuotationJSON();
		 List<String> invList =  new ArrayList<String>();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
			
			
			
			String querySelect=QueryConstants.SELECT_GST_INV.replace("$tableName","WithoutGSTQuotationTable");
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getCompanyId());
			ResultSet rs=preparedStmt.executeQuery();
			while(rs.next()) {
				invList.add(rs.getString("invoiceNo"));
			}
			
			
			for(int i=(invList.size()-1);i>=0;i--) {
			
			
			String querySelect1=QueryConstants.WithoutGSTQuotation_Report;
			
			PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1,json.getCompanyId());
			preparedStmt1.setString(2,invList.get(i));
	        ResultSet rs1=preparedStmt1.executeQuery();
	               
	        while(rs1.next())
	        {
	        	QuotationJSON withoutgstquotationreportobj = new QuotationJSON();
	        	withoutgstquotationreportobj.setWithoutGstQuotationId(rs1.getInt("withoutGstQuotationId"));
	        	withoutgstquotationreportobj.setInvoiceNo(rs1.getString("invoiceNo"));
	        	withoutgstquotationreportobj.setDate(rs1.getString("date"));
	        	withoutgstquotationreportobj.setCustomerName(rs1.getString("customerName"));
	        	withoutgstquotationreportobj.setContactNo(rs1.getString("contactNo"));	 
	        	withoutgstquotationreportobj.setAddress(rs1.getString("address"));
	        	withoutgstquotationreportobj.setSubtotal1(rs1.getString("subtotal1"));
	        	withoutgstquotationreportobj.setPayment_status(rs1.getString("payment_status"));
	        	withoutgstquotationreportobj.setFinalAmountTotal(rs1.getString("finalAmountTotal"));
	        	withoutgstquotationreportobj.setShipping(rs1.getString("shipping"));
	        	withoutgstquotationreportobj.setCompanyName(rs1.getString("companyName"));
	        	withoutgstquotationreportobj.setCustomerId(rs1.getInt("customerId"));
	        	withoutgstquotationreportlist.add(withoutgstquotationreportobj);
	        }
			}
	          res.setWithoutgstquotationreportlist(withoutgstquotationreportlist);
	        
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
	public QuotationJSON withoutgstquotationreportmonthyear(QuotationJSON json) {
		ArrayList<QuotationJSON> withoutgstquotationreportlist = new ArrayList<QuotationJSON>();	
		QuotationJSON res=new QuotationJSON();
		 List<String> invList =  new ArrayList<String>();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();			
			String querySelect=QueryConstants.SELECT_GST_INV1.replace("$tableName","WithoutGSTQuotationTable");
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getFromDate());
			preparedStmt.setString(2,json.getToDate());
			preparedStmt.setString(3,json.getCompanyId());
			ResultSet rs=preparedStmt.executeQuery();
			while(rs.next()) {
				invList.add(rs.getString("invoiceNo"));
			}
			
			
			for(int i=(invList.size()-1);i>=0;i--) {
			
			
			String querySelect1=QueryConstants.WithoutGSTQuotation_Report1;
			
			PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1,json.getFromDate());
			preparedStmt1.setString(2,json.getToDate());
			preparedStmt1.setString(3,json.getCompanyId());
			preparedStmt1.setString(4,invList.get(i));
	        ResultSet rs1=preparedStmt1.executeQuery();
	               
	        while(rs1.next())
	        {
	        	QuotationJSON withoutgstquotationreportobj = new QuotationJSON();
	        	withoutgstquotationreportobj.setWithoutGstQuotationId(rs1.getInt("withoutGstQuotationId"));
	        	withoutgstquotationreportobj.setInvoiceNo(rs1.getString("invoiceNo"));
	        	withoutgstquotationreportobj.setDate(rs1.getString("date"));
	        	withoutgstquotationreportobj.setCustomerName(rs1.getString("customerName"));
	        	withoutgstquotationreportobj.setContactNo(rs1.getString("contactNo"));	 
	        	withoutgstquotationreportobj.setAddress(rs1.getString("address"));
	        	withoutgstquotationreportobj.setSubtotal1(rs1.getString("subtotal1"));
	        	withoutgstquotationreportobj.setPayment_status(rs1.getString("payment_status"));
	        	withoutgstquotationreportobj.setFinalAmountTotal(rs1.getString("finalAmountTotal"));
	        	withoutgstquotationreportobj.setShipping(rs1.getString("shipping"));
	        	withoutgstquotationreportobj.setCompanyName(rs1.getString("companyName"));
	        	withoutgstquotationreportobj.setCustomerId(rs1.getInt("customerId"));
	        	withoutgstquotationreportlist.add(withoutgstquotationreportobj);
	        }
			}
	       
	        res.setWithoutgstquotationreportlist(withoutgstquotationreportlist);
	        
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
	
	public static String GetEmailId(String contactNo,String companyId) {
		QuotationJSON res=new QuotationJSON();
		Connection connection=null;
		String emailId = null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
	       
			String querySelect=QueryConstants.GET_EMAIL_ID;
			
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,contactNo);	
			preparedStmt.setString(2,companyId);
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

}
