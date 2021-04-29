package report.sales;

import java.sql.Connection;




import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.ws.rs.Path;

import DBUtil.DatabaseUtil;
import master.MasterDao;







@Path(value="/SalesReport")
public class SalesReportLogic {

	/*
	 * FUNCTION FOR GENERATING DALIY SALES REPORT
	 */
	public static ArrayList<SalesReportJSON> DailyReport(SalesReportJSON json) {
		Connection connection=null;
		ArrayList <SalesReportJSON> dailyInvoiceList=new ArrayList <SalesReportJSON>();
		ArrayList <SalesReportJSON> dailySalesList=new ArrayList <SalesReportJSON>();
		  List<String> invList =  new ArrayList<String>();;
		  //Arrays.asList(json.getMondayStaffId().split(","));
			
		
		
		try {
			connection=DatabaseUtil.getDBConnection();
			//saleInvoiceId invoiceNo invoiceDate customerName contactNo status balance_amount  total
			
			
			String querySelect=QueryConstants.SELECT_DAILY_SALES_INV;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getDate());
			preparedStmt.setString(2,json.getCompanyId());
			ResultSet rs=preparedStmt.executeQuery();
			while(rs.next()) {
				invList.add(rs.getString("invoiceNo"));
			}
		
	
			
			for(int i=0;i<invList.size();i++) {

			
			String querySelect1=QueryConstants.DAILY_SALES_REPORT;
			PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1,json.getDate());
			preparedStmt1.setString(2,json.getCompanyId());
			preparedStmt1.setString(3,invList.get(i));
			ResultSet rs1=preparedStmt1.executeQuery();
			while(rs1.next()) {
				SalesReportJSON dailySales=new SalesReportJSON();
				dailySales.setInvoiceNo(rs1.getString("invoiceNo"));
				dailySales.setDate(rs1.getString("Date"));
				dailySales.setUserName(rs1.getString("customerName"));
				dailySales.setContact(rs1.getString("contactNo"));
				dailySales.setStatus(rs1.getString("Payment_Status"));
				dailySales.setBalanceAmt(rs1.getString("balance_amount"));
				dailySales.setSubtotal1(rs1.getString("subtotal1"));
				dailySales.setCustomerId(rs1.getString("customerId"));
				dailyInvoiceList.add(dailySales); 
				
			}
			
			}
			
			
			
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return dailyInvoiceList;
	}

	/*
	 * FUNCTION FOR DELETING DALIY SALES REPORT
	 */
	public static SalesReportJSON DailyReportDelete(SalesReportJSON json) {
		Connection connection=null;
		ArrayList <SalesReportJSON> dailyExpenseList=new ArrayList <SalesReportJSON>();
		
		
		try {
			connection=DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.DAILY_SALES_REPORT_DEL;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getId());
			preparedStmt.setString(2,json.getCompanyId());
			preparedStmt.executeUpdate();
			
			String querySelect1=QueryConstants.DAILY_CUST_STATE_DEL;
			PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1,json.getId());
			preparedStmt1.setString(2,json.getCompanyId());
			//preparedStmt.setString(2,json.getDate());
			preparedStmt1.executeUpdate();
		
			 String querySelect2=QueryConstants.UPDATE_ORDERNUMBER;
		     PreparedStatement preparedStmt2=connection.prepareStatement(querySelect2);
			 preparedStmt2.setString(1,json.getContactNo());				
			 preparedStmt2.setString(2,json.getCompanyId());	
					    
				preparedStmt2.executeUpdate();
			
				MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), json.getId(),json.getCustomerName(),"Sale Invoice Deleted",json.getCompanyId());
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		return json;
	}
	
	
	/*
	 * FUNCTION FOR GENERATING MONTHLY SALES REPORT
	 */

	public static ArrayList<SalesReportJSON> MonthlyReport(SalesReportJSON json) {
		Connection connection=null;
		ArrayList <SalesReportJSON> monthlySalesList=new ArrayList <SalesReportJSON>();
		  List<String> invList =  new ArrayList<String>();;
			
		
		try {
			connection=DatabaseUtil.getDBConnection();
			//saleInvoiceId invoiceNo invoiceDate customerName contactNo status balance_amount  total
			
			
			String querySelect=QueryConstants.SELECT_MONTHLY_SALES_INV;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getMonth());
			preparedStmt.setString(2,json.getCompanyId());
			ResultSet rs=preparedStmt.executeQuery();
			while(rs.next()) {
				invList.add(rs.getString("invoiceNo"));
			}

			
			for(int i=0;i<invList.size();i++) {

			
			String querySelect1=QueryConstants.MONTHLY_SALES_REPORT;
			PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1,json.getMonth());
			preparedStmt1.setString(2,json.getCompanyId());
			preparedStmt1.setString(3,invList.get(i));
			ResultSet rs1=preparedStmt1.executeQuery();
			while(rs1.next()) {
				SalesReportJSON monthlySales=new SalesReportJSON();
				monthlySales.setId(rs1.getString("SaleInvoiceId"));
				monthlySales.setInvoiceNo(rs1.getString("invoiceNo"));
				monthlySales.setDate(rs1.getString("Date"));
				monthlySales.setUserName(rs1.getString("customerName"));
				monthlySales.setContact(rs1.getString("contactNo"));
				monthlySales.setStatus(rs1.getString("Payment_status"));
				monthlySales.setBalanceAmt(rs1.getString("balance_amount"));
				monthlySales.setSubtotal1(rs1.getString("subtotal1"));
				monthlySales.setCustomerId(rs1.getString("customerId"));
				monthlySalesList.add(monthlySales); 
				
				
			}
			
			}
			
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return monthlySalesList;
	}

	

	/*
	 * FUNCTION FOR GENERATING YEARLY SALES REPORT
	 */
	public static ArrayList<SalesReportJSON> YearlyReport(SalesReportJSON json) {
		Connection connection=null;
		ArrayList <SalesReportJSON> yearlySalesList=new ArrayList <SalesReportJSON>();
		  List<String> invList =  new ArrayList<String>();;
			
		
		try {
			connection=DatabaseUtil.getDBConnection();
			//saleInvoiceId invoiceNo invoiceDate customerName contactNo status balance_amount  total
			
			
			String querySelect=QueryConstants.SELECT_YEARLY_SALES_INV;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getFromDate());
			preparedStmt.setString(2,json.getToDate());
			preparedStmt.setString(3,json.getCompanyId());
			ResultSet rs=preparedStmt.executeQuery();
			while(rs.next()) {
				invList.add(rs.getString("invoiceNo"));
			}
		

			
			for(int i=0;i<invList.size();i++) {

			String querySelect1=QueryConstants.YERALY_SALES_REPORT;
			PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1,json.getFromDate());
			preparedStmt1.setString(2,json.getToDate());
			preparedStmt1.setString(3,json.getCompanyId());
			preparedStmt1.setString(4,invList.get(i));
			ResultSet rs1=preparedStmt1.executeQuery();
			while(rs1.next()) {
				SalesReportJSON yearlySales=new SalesReportJSON();
				yearlySales.setId(rs1.getString("SaleInvoiceId"));
				yearlySales.setInvoiceNo(rs1.getString("invoiceNo"));
				yearlySales.setDate(rs1.getString("Date"));
				yearlySales.setUserName(rs1.getString("customerName"));
				yearlySales.setContact(rs1.getString("contactNo"));
				yearlySales.setStatus(rs1.getString("Payment_status"));
				yearlySales.setBalanceAmt(rs1.getString("balance_amount"));
				yearlySales.setSubtotal1(rs1.getString("subtotal1"));
				yearlySales.setCustomerId(rs1.getString("customerId"));
				yearlySalesList.add(yearlySales); 
				
				
			}
			
			}
			
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return yearlySalesList;
	}

	/*
	 * FUNCTION FOR GENERATING DATE WISE SALES REPORT
	 */
	
	public static ArrayList<SalesReportJSON> DateWiseReport(SalesReportJSON json) {
		Connection connection=null;
		ArrayList <SalesReportJSON> yearlySalesList=new ArrayList <SalesReportJSON>();
		  List<String> invList =  new ArrayList<String>();;
			
		
		try {
			connection=DatabaseUtil.getDBConnection();
			//saleInvoiceId invoiceNo invoiceDate customerName contactNo status balance_amount  total
			
			
			String querySelect=QueryConstants.SELECT_DATE_WISE_SALES_INV;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getFromDate());
			preparedStmt.setString(2,json.getToDate());
			preparedStmt.setString(3,json.getCompanyId());
			ResultSet rs=preparedStmt.executeQuery();
			while(rs.next()) {
				invList.add(rs.getString("invoiceNo"));
			}
		
			
			for(int i=0;i<invList.size();i++) {

			String querySelect1=QueryConstants.DATE_WISE_SALES_REPORT;
			PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1,json.getFromDate());
			preparedStmt1.setString(2,json.getToDate());
			preparedStmt1.setString(3,json.getCompanyId());
			preparedStmt1.setString(4,invList.get(i));
			ResultSet rs1=preparedStmt1.executeQuery();
			while(rs1.next()) {
				SalesReportJSON yearlySales=new SalesReportJSON();
				yearlySales.setId(rs1.getString("SaleInvoiceId"));
				yearlySales.setInvoiceNo(rs1.getString("invoiceNo"));
				yearlySales.setDate(rs1.getString("Date"));
				yearlySales.setUserName(rs1.getString("customerName"));
				yearlySales.setContact(rs1.getString("contactNo"));
				yearlySales.setStatus(rs1.getString("Payment_status"));
				yearlySales.setBalanceAmt(rs1.getString("balance_amount"));
				yearlySales.setSubtotal1(rs1.getString("subtotal1"));
				yearlySales.setCustomerId(rs1.getString("customerId"));
				yearlySalesList.add(yearlySales); 
				
				
			}
			
			}
			
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return yearlySalesList;
	}

	/*
	 * FUNCTION FOR GENERATING CUSTOMER STATEMENT 
	 */
	public static ArrayList<SalesReportJSON> CustomerStatementReport(SalesReportJSON json) {
		Connection connection=null;
		ArrayList <SalesReportJSON> yearlySalesList=new ArrayList <SalesReportJSON>();
		
		
		try {
			connection=DatabaseUtil.getDBConnection();
			//saleInvoiceId invoiceNo invoiceDate customerName contactNo status balance_amount  total
			String querySelect=QueryConstants.CUST_SALES_REPORT;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getFromDate());
			preparedStmt.setString(2,json.getToDate());
			ResultSet rs=preparedStmt.executeQuery();
			while(rs.next()) {
				SalesReportJSON yearlySales=new SalesReportJSON();
				yearlySales.setId(rs.getString("SaleInvoiceId"));
				yearlySales.setInvoiceNo(rs.getString("invoiceNo"));
				yearlySales.setDate(rs.getString("Date"));
				yearlySales.setUserName(rs.getString("customerName"));
				yearlySales.setContact(rs.getString("contactNo"));
				yearlySales.setStatus(rs.getString("Status"));
				yearlySales.setBalanceAmt(rs.getString("balance_amount"));
				yearlySales.setSubtotal1(rs.getString("subtotal1"));
				yearlySalesList.add(yearlySales); 
				
				
			}
			
			
			
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return yearlySalesList;
	}

	/*
	 * FUNCTION FOR GETTING DAILY SALES REPORT DATA
	 */
	public static ArrayList<SalesReportJSON> DailyReportView(SalesReportJSON json) {
		Connection connection=null;
		ArrayList <SalesReportJSON> salesDataList=new ArrayList <SalesReportJSON>();
		SalesReportJSON companyData=new SalesReportJSON();
		String mobileNo = null;
	//	,,,,,,,,,,,"
		//		+",,,,,,,,,,"
		//		+" from saleinvoicetable where customerName= ? and date(date)= ? and saleInvoiceId = ?
		
		try {
			connection=DatabaseUtil.getDBConnection();
			//saleInvoiceId invoiceNo invoiceDate customerName contactNo status balance_amount  total
			String querySelect=QueryConstants.SALES_REPORT_VIEW;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getId());
			preparedStmt.setString(2,json.getCompanyId());
			
			//preparedStmt.setString(2,json.getDate());
			ResultSet rs=preparedStmt.executeQuery();
			while(rs.next()) {
				SalesReportJSON salesData=new SalesReportJSON();
				salesData.setUserName(rs.getString("customername"));
			//	salesData.setAddress(rs.getString("address"));
				salesData.setContact(rs.getString("contactno"));
				mobileNo=salesData.getContact();
				//salesData.setGstNo(rs.getString("gstno"));
				//salesData.setEmail(rs.getString("email"));
				salesData.setInvoiceDate(rs.getString("Invoicedate"));
				salesData.setDueDate(rs.getString("duedate"));
				salesData.setProduct(rs.getString("productname"));			
				salesData.setQty(rs.getString("quantity"));
				salesData.setRate(rs.getString("rate"));
				salesData.setsTotal(rs.getString("total"));
				salesData.setCgst(rs.getString("cgsta"));
				salesData.setSgst(rs.getString("sgsta"));
				salesData.setIgst(rs.getString("igsta"));
				salesData.setsAmount(rs.getString("amount"));
				salesData.setAmount(rs.getString("finalamount"));
				salesData.setSubtotal1(rs.getString("subtotal1"));
				salesData.setTotalGst(rs.getString("totalgst"));
				salesData.setAdvance(rs.getString("advance"));
				salesData.setDiscount(rs.getString("discount"));		
				salesData.setTotalcgst(rs.getString("totalcgst"));
				salesData.setTotalsgst(rs.getString("totalsgst"));
				salesData.setTotaligst(rs.getString("totaligst"));
				salesData.setDescription(rs.getString("description"));
				salesData.setProductId(rs.getString("productId"));
				salesData.setServiceBy(rs.getString("serviceBy"));
				salesData.setStaffId(rs.getString("staffId"));
				salesDataList.add(salesData); 
		
		
		
			}
			
			String querySelect1=QueryConstants.SALES_REPORT_VIEW_CUST_DETAIL;
			PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1,mobileNo);
			preparedStmt1.setString(2,json.getCompanyId());
			ResultSet rs1=preparedStmt1.executeQuery();
			while(rs1.next()) {
				SalesReportJSON custData=new SalesReportJSON();
				custData.setAddress(rs1.getString("address"));
				custData.setGstNo(rs1.getString("gstno"));
				custData.setEmail(rs1.getString("email"));
				salesDataList.add(custData);
			}
			
	
			
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return salesDataList;
	}

	public SalesReportJSON SalesReportEdit(SalesReportJSON json) {
		// TODO Auto-generated method stub
		Connection connection=null;
		
		try {

		       connection = DatabaseUtil.getDBConnection();
		       String querySelect1=QueryConstants.Invoice_BalanceAmt;
				PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
				preparedStmt1.setString(1,json.getBalanceAmt());
				preparedStmt1.setString(2,json.getInvoiceNo());	
				preparedStmt1.setString(3,json.getCompanyId());	
					    
				preparedStmt1.executeUpdate();
				
		   	
					String querySelect=QueryConstants.Cust_Statement_Insert;
					PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
					preparedStmt.setString(1,json.getInvoiceNo());
					preparedStmt.setString(2,json.getUserName());
					preparedStmt.setString(3,json.getBalanceAmt());
					preparedStmt.setString(4,json.getDiscount());
					preparedStmt.setString(5,json.getPay());
					preparedStmt.setString(6,json.getDate());
					preparedStmt.setString(7,json.getDueAmount());
					preparedStmt.setString(8,json.getPaymentMode());
					preparedStmt.setString(9,json.getCustomerId());
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

	public SalesReportJSON invoicepaymentreport(SalesReportJSON json) {
		ArrayList<SalesReportJSON> invoicepaymentreportlist = new ArrayList<SalesReportJSON>();	
		SalesReportJSON res=new SalesReportJSON();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.InvoicePayment_Report;
		
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getCompanyId());				
	        ResultSet rs=preparedStmt.executeQuery();
	               
	        while(rs.next())
	        {
	        	SalesReportJSON categoryRetrieveobj = new SalesReportJSON();
	        	categoryRetrieveobj.setDate(rs.getString("date"));
	        	categoryRetrieveobj.setInvoiceNo(rs.getString("invoiceNo"));
	        	categoryRetrieveobj.setUserName(rs.getString("userName"));
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

	public SalesReportJSON salescustomerstatementreport(SalesReportJSON json) {
		ArrayList<SalesReportJSON> invoicepaymentreportlist = new ArrayList<SalesReportJSON>();	
		ArrayList <SalesReportJSON> salesDataList=new ArrayList <SalesReportJSON>();
		
		SalesReportJSON res=new SalesReportJSON();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.SalesCustomerStatement_Report;
	
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getFromDate());
			preparedStmt.setString(2,json.getToDate());
			preparedStmt.setString(3,json.getCustomerId());
			preparedStmt.setString(4,json.getCompanyId());
	        ResultSet rs=preparedStmt.executeQuery();
	               
	        while(rs.next())
	        {
	        	SalesReportJSON categoryRetrieveobj = new SalesReportJSON();
	        	categoryRetrieveobj.setDate(rs.getString("date"));
	        	categoryRetrieveobj.setInvoiceNo(rs.getString("invoiceNo"));
	        	categoryRetrieveobj.setUserName(rs.getString("userName"));
	        	categoryRetrieveobj.setDueAmount(rs.getString("dueAmount"));
	        	categoryRetrieveobj.setDiscount(rs.getString("discount"));
	        	categoryRetrieveobj.setPay(rs.getString("pay"));
	        	categoryRetrieveobj.setBalanceAmt(rs.getString("balanceAmt"));
	        	categoryRetrieveobj.setPaymentMode(rs.getString("paymentMode"));
	        	invoicepaymentreportlist.add(categoryRetrieveobj);
	        }
	           
	        
	        res.setInvoicepaymentreportlist(invoicepaymentreportlist);
	        
	    	String querySelect1=QueryConstants.SalesCustomerStatement_CUST_DETAIL;
			PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1,json.getCustomerId());
			preparedStmt1.setString(2,json.getCompanyId());
			ResultSet rs1=preparedStmt1.executeQuery();
			while(rs1.next()) {
				//SalesReportJSON custData=new SalesReportJSON();
				res.setCustomerName(rs1.getString("customerName"));
				res.setAddress(rs1.getString("address"));
				res.setGstNo(rs1.getString("gstno"));
				res.setEmail(rs1.getString("email"));
				res.setContactNo(rs1.getString("contactNo"));
			
			}
			
			     
			String Invoice_Amount = QueryConstants.Invoice_Amount;
			PreparedStatement preparedStmt2 = connection.prepareStatement(Invoice_Amount);
			preparedStmt2.setString(1,json.getFromDate());
			preparedStmt2.setString(2,json.getToDate());
			preparedStmt2.setString(3,json.getCustomerId());
			preparedStmt2.setString(4,json.getCompanyId());
			ResultSet rs2 = preparedStmt2.executeQuery();
			while (rs2.next()) {

				res.setInvoice_Amount(rs2.getString("SaleInvoice_Total_Amt"));
				
			
		
			}
			
			String Amount_Paid = QueryConstants.Amount_Paid;
			PreparedStatement preparedStmt3 = connection.prepareStatement(Amount_Paid);
			preparedStmt3.setString(1,json.getFromDate());
			preparedStmt3.setString(2,json.getToDate());
			preparedStmt3.setString(3,json.getCustomerId());
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