package report.purchase;

import java.sql.Connection;






import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import DBUtil.DatabaseUtil;
import master.MasterDao;










public class PurchaseReportLogic {


	/*
	 * FUNCTION FOR GENERATING DALIY PURCHASE REPORT
	 */
	public static ArrayList<PurchaseReportJSON> DailyReport(PurchaseReportJSON json) {
		Connection connection=null;
		ArrayList <PurchaseReportJSON> dailyPurchaseList=new ArrayList <PurchaseReportJSON>();
		 List<String> invList =  new ArrayList<String>();
		
		try {
			connection=DatabaseUtil.getDBConnection();
			//saleInvoiceId invoiceNo invoiceDate customerName contactNo status balance_amount  total
			
			String querySelect=QueryConstants.SELECT_DAILY_PURCHASE_INV;
				PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
				preparedStmt.setString(1,json.getDate());
				preparedStmt.setString(2,json.getCompanyId());
				ResultSet rs=preparedStmt.executeQuery();
				while(rs.next()) {
					invList.add(rs.getString("invoiceNo"));
				}
			
				
				
				for(int i=0;i<invList.size();i++) {
			
			String querySelect1=QueryConstants.DAILY_PURCHASE_REPORT;
			PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1,json.getDate());
			preparedStmt1.setString(2,json.getCompanyId());
			preparedStmt1.setString(3,invList.get(i));
			ResultSet rs1=preparedStmt1.executeQuery();
			while(rs1.next()) {
				
				PurchaseReportJSON dailyPurchase=new PurchaseReportJSON();
				//dailyPurchase.setId(rs1.getString("PurchaseId"));
				dailyPurchase.setInvoiceNo(rs1.getString("invoiceNo"));
				dailyPurchase.setDate(rs1.getString("Date"));
				dailyPurchase.setUserName(rs1.getString("vendorName"));
				dailyPurchase.setContact(rs1.getString("contactNo"));
				dailyPurchase.setStatus(rs1.getString("Payment_status"));
				dailyPurchase.setFinalAmountTotal(rs1.getString("finalAmountTotal"));
				dailyPurchase.setSubtotal1(rs1.getString("subtotal1"));
				dailyPurchase.setVendorId(rs1.getString("vendorId"));
				dailyPurchaseList.add(dailyPurchase); 

			}
			
				}
			
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return dailyPurchaseList;
	}

	/*
	 * FUNCTION FOR DELETING DALIY PURCHASE REPORT
	 */
	public static PurchaseReportJSON DailyReportDelete(PurchaseReportJSON json) {
		Connection connection=null;
		ArrayList <PurchaseReportJSON> dailyExpenseList=new ArrayList <PurchaseReportJSON>();
		
		
		try {
			connection=DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.DAILY_PURCHASE_REPORT_DEL;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getId());
			preparedStmt.setString(2,json.getCompanyId());
			preparedStmt.executeUpdate();
			

			String querySelect1=QueryConstants.DAILY_VENDOR_STATE_DEL;
			PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1,json.getId());
			preparedStmt1.setString(2,json.getCompanyId());
			preparedStmt1.executeUpdate();
			
			
			 String querySelect2=QueryConstants.UPDATE_ORDERNUMBER;
		     PreparedStatement preparedStmt2=connection.prepareStatement(querySelect2);
			 preparedStmt2.setString(1,json.getContactNo());				
			 preparedStmt2.setString(2,json.getCompanyId());	
					    
				preparedStmt2.executeUpdate();
			
				MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), json.getId(),json.getVendorName(),"Purchase Invoice Deleted",json.getCompanyId());
				
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		return json;
	}

	/*
	 * FUNCTION FOR  MONTHLY PURCHASE REPORT
	 */
	public static 	ArrayList <PurchaseReportJSON> MonthlyReport(PurchaseReportJSON json) {
		Connection connection=null;
		ArrayList <PurchaseReportJSON> monthlyPurchaseList=new ArrayList <PurchaseReportJSON>();
		 List<String> invList =  new ArrayList<String>();
			
			
		
		try {
			connection=DatabaseUtil.getDBConnection();
			//saleInvoiceId invoiceNo invoiceDate customerName contactNo status balance_amount  total
			
			String querySelect=QueryConstants.SELECT_MONTHLY_PURCHASE_INV;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getMonth());
			preparedStmt.setString(2,json.getCompanyId());
			ResultSet rs=preparedStmt.executeQuery();
			while(rs.next()) {
				invList.add(rs.getString("invoiceNo"));
			}
		
			
			
			for(int i=0;i<invList.size();i++) {

			
			
			String querySelect1=QueryConstants.MONTHLY_PURCHASE_REPORT;
			PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1,json.getMonth());
			preparedStmt1.setString(2,json.getCompanyId());
			preparedStmt1.setString(3,invList.get(i));
			ResultSet rs1=preparedStmt1.executeQuery();
			while(rs1.next()) {
				
				PurchaseReportJSON monthlyPurchase=new PurchaseReportJSON();
				//monthlyPurchase.setId(rs1.getString("PurchaseId"));
				monthlyPurchase.setInvoiceNo(rs1.getString("invoiceNo"));
				monthlyPurchase.setDate(rs1.getString("Date"));
				monthlyPurchase.setUserName(rs1.getString("vendorName"));
				monthlyPurchase.setContact(rs1.getString("contactNo"));
				monthlyPurchase.setStatus(rs1.getString("Payment_status"));
				monthlyPurchase.setFinalAmountTotal(rs1.getString("finalAmountTotal"));
				monthlyPurchase.setSubtotal1(rs1.getString("subtotal1"));
				monthlyPurchase.setVendorId(rs1.getString("vendorId"));
				monthlyPurchaseList.add(monthlyPurchase); 

			}
			
			}
			
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return monthlyPurchaseList;
	}

	/*
	 * FUNCTION FOR  YEARLY PURCHASE REPORT
	 */
	public static ArrayList<PurchaseReportJSON> YearlyReport(PurchaseReportJSON json) {
		Connection connection=null;
		ArrayList <PurchaseReportJSON> monthlyPurchaseList=new ArrayList <PurchaseReportJSON>();
		 List<String> invList =  new ArrayList<String>();
			
			
		
		try {
			connection=DatabaseUtil.getDBConnection();
			//saleInvoiceId invoiceNo invoiceDate customerName contactNo status balance_amount  total
			
			String querySelect=QueryConstants.SELECT_YEARLY_PURCHASE_INV;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getFromDate());
			preparedStmt.setString(2,json.getToDate());
			preparedStmt.setString(3,json.getCompanyId());
			ResultSet rs=preparedStmt.executeQuery();
			while(rs.next()) {
				invList.add(rs.getString("invoiceNo"));
			}
		
		
			
			for(int i=0;i<invList.size();i++) {

			
			
			
			String querySelect1=QueryConstants.YEARLY_PURCHASE_REPORT;
			PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1,json.getFromDate());
			preparedStmt1.setString(2,json.getToDate());
			preparedStmt1.setString(3,json.getCompanyId());
			preparedStmt1.setString(4,invList.get(i));
			ResultSet rs1=preparedStmt1.executeQuery();
			while(rs1.next()) {
				
				PurchaseReportJSON monthlyPurchase=new PurchaseReportJSON();
			//	monthlyPurchase.setId(rs1.getString("PurchaseId"));
				monthlyPurchase.setInvoiceNo(rs1.getString("invoiceNo"));
				monthlyPurchase.setDate(rs1.getString("Date"));
				monthlyPurchase.setUserName(rs1.getString("vendorName"));
				monthlyPurchase.setContact(rs1.getString("contactNo"));
				monthlyPurchase.setStatus(rs1.getString("Payment_status"));
				monthlyPurchase.setFinalAmountTotal(rs1.getString("finalAmountTotal"));
				monthlyPurchase.setSubtotal1(rs1.getString("subtotal1"));
				monthlyPurchase.setVendorId(rs1.getString("vendorId"));
				monthlyPurchaseList.add(monthlyPurchase); 

			}
			
			}
			
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return monthlyPurchaseList;
	}

	/*
	 * FUNCTION FOR  DATE WISE PURCHASE REPORT
	 */
	public static ArrayList<PurchaseReportJSON> DateWiseReport(PurchaseReportJSON json) {
		Connection connection=null;
		ArrayList <PurchaseReportJSON> datewisePurchaseList=new ArrayList <PurchaseReportJSON>();
		 List<String> invList =  new ArrayList<String>();
			
			
		
		try {
			connection=DatabaseUtil.getDBConnection();
			//saleInvoiceId invoiceNo invoiceDate customerName contactNo status balance_amount  total
			
			String querySelect=QueryConstants.SELECT_DATE_WISE_PURCHASE_INV;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getFromDate());
			preparedStmt.setString(2,json.getToDate());
			preparedStmt.setString(3,json.getCompanyId());
			ResultSet rs=preparedStmt.executeQuery();
			while(rs.next()) {
				invList.add(rs.getString("invoiceNo"));
			}
		
			
			
			for(int i=0;i<invList.size();i++) {
	
			String querySelect1=QueryConstants.DATE_WISE_PURCHASE_REPORT;
			PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1,json.getFromDate());
			preparedStmt1.setString(2,json.getToDate());
			preparedStmt1.setString(3,json.getCompanyId());
			preparedStmt1.setString(4,invList.get(i));
			ResultSet rs1=preparedStmt1.executeQuery();
			while(rs1.next()) {
				
				PurchaseReportJSON dateWisePurchase=new PurchaseReportJSON();
				//dateWisePurchase.setId(rs1.getString("PurchaseId"));
				dateWisePurchase.setInvoiceNo(rs1.getString("invoiceNo"));
				dateWisePurchase.setDate(rs1.getString("Date"));
				dateWisePurchase.setUserName(rs1.getString("vendorName"));
				dateWisePurchase.setContact(rs1.getString("contactNo"));
				dateWisePurchase.setStatus(rs1.getString("Payment_status"));
				dateWisePurchase.setFinalAmountTotal(rs1.getString("finalAmountTotal"));
				dateWisePurchase.setSubtotal1(rs1.getString("subtotal1"));
				dateWisePurchase.setVendorId(rs1.getString("vendorId"));
				datewisePurchaseList.add(dateWisePurchase); 

			}
			
			}
			
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return datewisePurchaseList;
	}

	
	
	/*
	 * FUNCTION FOR GETTING DAILY PURCHASE REPORT DATA
	 */
	public static ArrayList<PurchaseReportJSON> DailyReportView(PurchaseReportJSON json) {
		Connection connection=null;
		ArrayList <PurchaseReportJSON> purchaseDataList=new ArrayList <PurchaseReportJSON>();
		String mobileNo = null;
	//	,,,,,,,,,,,"
		//		+",,,,,,,,,,"
		//		+" from saleinvoicetable where customerName= ? and date(date)= ? and saleInvoiceId = ?
		
		try {
			connection=DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.PURCHASE_REPORT_VIEW;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getId());
			preparedStmt.setString(2,json.getCompanyId());
			ResultSet rs=preparedStmt.executeQuery();
			while(rs.next()) {
				PurchaseReportJSON purchaseData=new PurchaseReportJSON();
				purchaseData.setUserName(rs.getString("vendorName"));
			//	salesData.setAddress(rs.getString("address"));
				purchaseData.setContact(rs.getString("contactno"));
				mobileNo=purchaseData.getContact();
				//salesData.setGstNo(rs.getString("gstno"));
				//salesData.setEmail(rs.getString("email"));
				purchaseData.setInvoiceDate(rs.getString("Invoicedate"));
				purchaseData.setDueDate(rs.getString("duedate"));
				purchaseData.setProduct(rs.getString("productname"));
				purchaseData.setSize(rs.getString("size"));
				purchaseData.setUnit(rs.getString("unit"));
				purchaseData.setQty(rs.getString("quantity"));
				purchaseData.setRate(rs.getString("rate"));
				purchaseData.setTotal(rs.getString("total"));
				purchaseData.setCgst(rs.getString("cgsta"));
				purchaseData.setSgst(rs.getString("sgsta"));
				purchaseData.setIgst(rs.getString("igsta"));
				purchaseData.setAmount(rs.getString("finalamount"));
				purchaseData.setSubtotal1(rs.getString("subtotal1"));
				purchaseData.setTotalGst(rs.getString("totalgst"));
				purchaseData.setAdjustment(rs.getString("adjustment"));
				purchaseData.setDiscount(rs.getString("discount"));
				purchaseData.setShipping(rs.getString("Shipping"));
				purchaseData.setHeight(rs.getString("height"));
				purchaseData.setWidth(rs.getString("width"));
				purchaseData.setDescription(rs.getString("description"));
				purchaseData.setAmount1(rs.getString("amount"));
				purchaseData.setTotalcgst(rs.getString("totalcgst"));
				purchaseData.setTotalsgst(rs.getString("totalsgst"));
				purchaseData.setTotaligst(rs.getString("totaligst"));
				purchaseData.setFinalAmountTotal(rs.getString("finalAmountTotal"));
				purchaseData.setProductId(rs.getString("productId"));
				
				purchaseDataList.add(purchaseData); 
		
				//		stotal --total
				//amount --finalamt
				
				//subtotal--subtotal1
		
			}
			
			String querySelect1=QueryConstants.PURCHASE_REPORT_VIEW_CUST_DETAIL;
			PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1,mobileNo);
			preparedStmt1.setString(2,json.getCompanyId());
			ResultSet rs1=preparedStmt1.executeQuery();
			while(rs1.next()) {
				PurchaseReportJSON custData=new PurchaseReportJSON();
				custData.setAddress(rs1.getString("address"));
				custData.setGstNo(rs1.getString("gstno"));
				custData.setEmail(rs1.getString("email"));
				purchaseDataList.add(custData);
			}
			
		
			
			
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return purchaseDataList;
	}

	public PurchaseReportJSON PurchaseReportEdit(PurchaseReportJSON json) {
	Connection connection=null;
		
		try {

		       connection = DatabaseUtil.getDBConnection();
		       String querySelect1=QueryConstants.Purchase_Invoice_BalanceAmt;
				PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
				preparedStmt1.setString(1,json.getBalanceAmt());
				preparedStmt1.setString(2,json.getInvoiceNo());	
				preparedStmt1.setString(3,json.getCompanyId());	    
				preparedStmt1.executeUpdate();
			
		   	
					String querySelect=QueryConstants.Vend_Statement_Insert;
					PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
					preparedStmt.setString(1,json.getInvoiceNo());
					preparedStmt.setString(2,json.getUserName());
					preparedStmt.setString(3,json.getBalanceAmt());
					preparedStmt.setString(4,json.getDiscount());
					preparedStmt.setString(5,json.getPay());
					preparedStmt.setString(6,json.getDate());
					preparedStmt.setString(7,json.getDueAmount());
					preparedStmt.setString(8,json.getPaymentMode());
					preparedStmt.setString(9,json.getVendorId());
					preparedStmt.setString(10,json.getCompanyId());
					preparedStmt.executeUpdate();
					
					MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), json.getInvoiceNo(),json.getUserName(),"Payment was done",json.getCompanyId());
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

	public PurchaseReportJSON invoicepaymentreport(PurchaseReportJSON json) {
		ArrayList<PurchaseReportJSON> invoicepaymentreportlist = new ArrayList<PurchaseReportJSON>();	
		PurchaseReportJSON res=new PurchaseReportJSON();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.InvoicePayment_Report;
			
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getCompanyId());			
	        ResultSet rs=preparedStmt.executeQuery();
	               
	        while(rs.next())
	        {
	        	PurchaseReportJSON categoryRetrieveobj = new PurchaseReportJSON();
	        	categoryRetrieveobj.setDate(rs.getString("date"));
	        	categoryRetrieveobj.setInvoiceNo(rs.getString("invoiceNo"));
	        	categoryRetrieveobj.setVendorName(rs.getString("vendorName"));
	        	categoryRetrieveobj.setDueAmount(rs.getString("dueAmount"));
	        	categoryRetrieveobj.setDiscount(rs.getString("discount"));
	        	categoryRetrieveobj.setPay(rs.getString("pay"));
	        	categoryRetrieveobj.setBalanceAmt(rs.getString("balanceAmt"));
	        	categoryRetrieveobj.setPaymentMode(rs.getString("paymentMode"));
	        	invoicepaymentreportlist.add(categoryRetrieveobj);
	        }
	             
	        
	        res.setInvoicepaymentreportlist(invoicepaymentreportlist);
	        
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

	public PurchaseReportJSON vendorstatementreport(PurchaseReportJSON json) {
		ArrayList<PurchaseReportJSON> invoicepaymentreportlist = new ArrayList<PurchaseReportJSON>();	
		PurchaseReportJSON res=new PurchaseReportJSON();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.VendorStatement_Report;
		
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getFromDate());
			preparedStmt.setString(2,json.getToDate());
			preparedStmt.setString(3,json.getVendorId());			
			preparedStmt.setString(4,json.getCompanyId());
	        ResultSet rs=preparedStmt.executeQuery();
	               
	        while(rs.next())
	        {
	        	PurchaseReportJSON categoryRetrieveobj = new PurchaseReportJSON();
	        	categoryRetrieveobj.setDate(rs.getString("date"));
	        	categoryRetrieveobj.setInvoiceNo(rs.getString("invoiceNo"));
	        	categoryRetrieveobj.setVendorName(rs.getString("vendorName"));
	        	categoryRetrieveobj.setDueAmount(rs.getString("dueAmount"));
	        	categoryRetrieveobj.setDiscount(rs.getString("discount"));
	        	categoryRetrieveobj.setPay(rs.getString("pay"));
	        	categoryRetrieveobj.setBalanceAmt(rs.getString("balanceAmt"));
	        	categoryRetrieveobj.setPaymentMode(rs.getString("paymentMode"));
	        	invoicepaymentreportlist.add(categoryRetrieveobj);
	        }
	               
	        
	        res.setInvoicepaymentreportlist(invoicepaymentreportlist);
	        
	    	String querySelect1=QueryConstants.VendorStatement_CUST_DETAIL;
			PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1,json.getVendorId());
			preparedStmt1.setString(2,json.getCompanyId());
			ResultSet rs1=preparedStmt1.executeQuery();
			while(rs1.next()) {
				
				res.setVendorName(rs1.getString("vendorName"));
				res.setAddress(rs1.getString("address"));
				res.setGstNo(rs1.getString("gstno"));
				res.setEmail(rs1.getString("email"));
				res.setContactNo(rs1.getString("contactNo"));
				
			}
			String Invoice_Amount = QueryConstants.Invoice_Amount;
			PreparedStatement preparedStmt2 = connection.prepareStatement(Invoice_Amount);
			preparedStmt2.setString(1,json.getFromDate());
			preparedStmt2.setString(2,json.getToDate());
			preparedStmt2.setString(3,json.getVendorId());
			preparedStmt2.setString(4,json.getCompanyId());
			ResultSet rs2 = preparedStmt2.executeQuery();
			while (rs2.next()) {

				res.setInvoice_Amount(rs2.getString("SaleInvoice_Total_Amt"));
		
		
			}
			
			String Amount_Paid = QueryConstants.Amount_Paid;
			PreparedStatement preparedStmt3 = connection.prepareStatement(Amount_Paid);
			preparedStmt3.setString(1,json.getFromDate());
			preparedStmt3.setString(2,json.getToDate());
			preparedStmt3.setString(3,json.getVendorId());
			preparedStmt3.setString(4,json.getCompanyId());
			ResultSet rs3 = preparedStmt3.executeQuery();
			while (rs3.next()) {

				res.setAmount_Paid(rs3.getString("Amount_Paid"));
				res.setDiscount(rs3.getString("Discount"));
				
			
		
			}
	        
	        
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
	
	
	
	
	
	
