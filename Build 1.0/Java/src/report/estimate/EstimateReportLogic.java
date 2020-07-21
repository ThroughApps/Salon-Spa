package report.estimate;

import java.sql.Connection;





import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;



import DBUtil.DatabaseUtil;
import master.MasterDao;











public class EstimateReportLogic {

	/*
	 * FUNCTION FOR GENERATING DALIY ESTIMATE REPORT
	 */
	public static ArrayList<EstimateReportJSON> DailyReport(EstimateReportJSON json) {
		
			Connection connection=null;
			ArrayList <EstimateReportJSON> dailyEstimateList=new ArrayList <EstimateReportJSON>();
			  List<String> invList =  new ArrayList<String>();;
				
				
			
			try {
				connection=DatabaseUtil.getDBConnection();
				//saleInvoiceId invoiceNo invoiceDate customerName contactNo status balance_amount  total
				String querySelect=QueryConstants.SELECT_DAILY_ESTIMATE_INV;
				PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
				preparedStmt.setString(1,json.getDate());
				preparedStmt.setString(2,json.getCompanyId());
				ResultSet rs=preparedStmt.executeQuery();
				while(rs.next()) {
					invList.add(rs.getString("invoiceNo"));
				}
			
			
				
				for(int i=0;i<invList.size();i++) {

				
				
				String querySelect1=QueryConstants.DAILY_ESTIMATE_REPORT;
				PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
				preparedStmt1.setString(1,json.getDate());
				preparedStmt1.setString(2,json.getCompanyId());
				preparedStmt1.setString(3,invList.get(i));
				ResultSet rs1=preparedStmt1.executeQuery();
				while(rs1.next()) {
					
					EstimateReportJSON dailyEstimate=new EstimateReportJSON();
					//dailyEstimate.setId(rs1.getString("EstimateId"));
					dailyEstimate.setInvoiceNo(rs1.getString("invoiceNo"));
					dailyEstimate.setDate(rs1.getString("Date"));
					dailyEstimate.setUserName(rs1.getString("customerName"));
					dailyEstimate.setContact(rs1.getString("contactNo"));
					dailyEstimate.setStatus(rs1.getString("Payment_status"));
					dailyEstimate.setBalanceAmt(rs1.getString("balance_amount"));
					dailyEstimate.setSubtotal1(rs1.getString("subtotal1"));
					dailyEstimate.setCustomerId(rs1.getString("customerId"));
					dailyEstimateList.add(dailyEstimate); 
	
				}
				
				}
				
				connection.close(); 
			}
			catch (Exception e) {
					e.printStackTrace();
			} finally {
					
				
			}
			
			return dailyEstimateList;
		}

	/*
	 * FUNCTION FOR DELETING DALIY ESTIMATE REPORT
	 */
	public static EstimateReportJSON DailyReportDelete(EstimateReportJSON json) {
		Connection connection=null;
		ArrayList <EstimateReportJSON> dailyExpenseList=new ArrayList <EstimateReportJSON>();
		
		
		try {
			connection=DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.DAILY_ESTIMATE_REPORT_DEL;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getId());
			preparedStmt.setString(2,json.getCompanyId());
			//preparedStmt.setString(2,json.getDate());
			preparedStmt.executeUpdate();
			
			String querySelect1=QueryConstants.DAILY_ESTIMATE_STATE_DEL;
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
				
				MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), json.getId(),json.getCustomerName(),"Estimate Invoice Deleted",json.getCompanyId());
				
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		return json;
	}

	/*
	 * FUNCTION FOR GENERATING MONTHLY ESTIMATE REPORT
	 */
	public static ArrayList<EstimateReportJSON> MonthlyReport(EstimateReportJSON json) {
	
		Connection connection=null;
		ArrayList <EstimateReportJSON> monthlyEstimateList=new ArrayList <EstimateReportJSON>();
		  List<String> invList =  new ArrayList<String>();;
			
			
		  
		
		try {
			connection=DatabaseUtil.getDBConnection();
			//saleInvoiceId invoiceNo invoiceDate customerName contactNo status balance_amount  total
			

			String querySelect=QueryConstants.SELECT_MONTHLY_ESTIMATE_INV;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getMonth());
			preparedStmt.setString(2,json.getCompanyId());
			ResultSet rs=preparedStmt.executeQuery();
			while(rs.next()) {
				invList.add(rs.getString("invoiceNo"));
			}
		

			
			for(int i=0;i<invList.size();i++) {

			
			String querySelect1=QueryConstants.MOTHLY_ESTIMATE_REPORT;
			PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1,json.getMonth());
			preparedStmt1.setString(2,json.getCompanyId());
			preparedStmt1.setString(3,invList.get(i));
			ResultSet rs1=preparedStmt1.executeQuery();
			while(rs1.next()) {
				
				EstimateReportJSON monthlyEstimate=new EstimateReportJSON();
				//monthlyEstimate.setId(rs1.getString("EstimateId"));
				monthlyEstimate.setInvoiceNo(rs1.getString("invoiceNo"));
				monthlyEstimate.setDate(rs1.getString("Date"));
				monthlyEstimate.setUserName(rs1.getString("customerName"));
				monthlyEstimate.setContact(rs1.getString("contactNo"));
				monthlyEstimate.setStatus(rs1.getString("Payment_status"));
				monthlyEstimate.setBalanceAmt(rs1.getString("balance_amount"));
				monthlyEstimate.setSubtotal1(rs1.getString("subtotal1"));
				monthlyEstimate.setCustomerId(rs1.getString("customerId"));
				monthlyEstimateList.add(monthlyEstimate); 

			}
			}
			
			
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return monthlyEstimateList;
	}

	/*
	 * FUNCTION FOR GENERATING YEARLY ESTIMATE REPORT
	 */
	public static ArrayList<EstimateReportJSON> YearlyReport(EstimateReportJSON json) {
		Connection connection=null;
		ArrayList <EstimateReportJSON> yearlyEstimateList=new ArrayList <EstimateReportJSON>();
		  List<String> invList =  new ArrayList<String>();;
			
			
		  
		
		try {
			connection=DatabaseUtil.getDBConnection();
			//saleInvoiceId invoiceNo invoiceDate customerName contactNo status balance_amount  total
			
			String querySelect=QueryConstants.SELECT_YEARLY_ESTIMATE_INV;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getFromDate());
			preparedStmt.setString(2,json.getToDate());
			preparedStmt.setString(3,json.getCompanyId());
			ResultSet rs=preparedStmt.executeQuery();
			while(rs.next()) {
				invList.add(rs.getString("invoiceNo"));
			}
		
			
			
			
			for(int i=0;i<invList.size();i++) {

			
			
			String querySelect1=QueryConstants.YEARLY_ESTIMATE_REPORT;
			PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1,json.getFromDate());
			preparedStmt1.setString(2,json.getToDate());
			preparedStmt1.setString(3,json.getCompanyId());
			preparedStmt1.setString(4,invList.get(i));
			ResultSet rs1=preparedStmt1.executeQuery();
			while(rs1.next()) {
				
				EstimateReportJSON yearlyEstimate=new EstimateReportJSON();
				
				yearlyEstimate.setInvoiceNo(rs1.getString("invoiceNo"));
				yearlyEstimate.setDate(rs1.getString("Date"));
				yearlyEstimate.setUserName(rs1.getString("customerName"));
				yearlyEstimate.setContact(rs1.getString("contactNo"));
				yearlyEstimate.setStatus(rs1.getString("Payment_status"));
				yearlyEstimate.setBalanceAmt(rs1.getString("balance_amount"));
				yearlyEstimate.setSubtotal1(rs1.getString("subtotal1"));
				yearlyEstimate.setCustomerId(rs1.getString("customerId"));
				yearlyEstimateList.add(yearlyEstimate); 

			}
			
			}
			
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return yearlyEstimateList;
	}

	/*
	 * FUNCTION FOR GENERATING DATE WISE ESTIMATE REPORT
	 */
	public static ArrayList<EstimateReportJSON> DateWiseReport(EstimateReportJSON json) {
		Connection connection=null;
		ArrayList <EstimateReportJSON> dateWiseEstimateList=new ArrayList <EstimateReportJSON>();
		  List<String> invList =  new ArrayList<String>();;
			
			
		  
		
		try {
			connection=DatabaseUtil.getDBConnection();
			//saleInvoiceId invoiceNo invoiceDate customerName contactNo status balance_amount  total
			
			String querySelect=QueryConstants.SELECT_DATE_WISE_ESTIMATE_INV;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getFromDate());
			preparedStmt.setString(2,json.getToDate());
			preparedStmt.setString(3,json.getCompanyId());
			ResultSet rs=preparedStmt.executeQuery();
			while(rs.next()) {
				invList.add(rs.getString("invoiceNo"));
			}
		
		
			
			for(int i=0;i<invList.size();i++) {

			String querySelect1=QueryConstants.DATE_WISE_ESTIMATE_REPORT;
			PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1,json.getFromDate());
			preparedStmt1.setString(2,json.getToDate());
			preparedStmt1.setString(3,json.getCompanyId());
			preparedStmt1.setString(4,invList.get(i));
			ResultSet rs1=preparedStmt1.executeQuery();
			while(rs1.next()) {
				
				EstimateReportJSON dateWiseEstimate=new EstimateReportJSON();
				//dateWiseEstimate.setId(rs.getString("EstimateId"));
				dateWiseEstimate.setInvoiceNo(rs1.getString("invoiceNo"));
				dateWiseEstimate.setDate(rs1.getString("Date"));
				dateWiseEstimate.setUserName(rs1.getString("customerName"));
				dateWiseEstimate.setContact(rs1.getString("contactNo"));
				dateWiseEstimate.setStatus(rs1.getString("Payment_status"));
				dateWiseEstimate.setBalanceAmt(rs1.getString("balance_amount"));
				dateWiseEstimate.setSubtotal1(rs1.getString("subtotal1"));
				dateWiseEstimate.setCustomerId(rs1.getString("customerId"));
				dateWiseEstimateList.add(dateWiseEstimate); 

			}
			
			}
			
			
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return dateWiseEstimateList;
	}

	
	/*
	 * FUNCTION FOR GETTING DAILY ESTIMATE REPORT DATA
	 */
	public static ArrayList<EstimateReportJSON> DailyReportView(EstimateReportJSON json) {
		Connection connection=null;
		ArrayList <EstimateReportJSON> estimateDataList=new ArrayList <EstimateReportJSON>();
		String mobileNo = null;
	
		try {
			connection=DatabaseUtil.getDBConnection();
			//saleInvoiceId invoiceNo invoiceDate customerName contactNo status balance_amount  total
			String querySelect=QueryConstants.ESTIMATE_REPORT_VIEW;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getId());
			preparedStmt.setString(2,json.getCompanyId());
			//preparedStmt.setString(2,json.getDate());
			ResultSet rs=preparedStmt.executeQuery();
			while(rs.next()) {
				EstimateReportJSON estimateData=new EstimateReportJSON();
				estimateData.setUserName(rs.getString("customername"));
			//	salesData.setAddress(rs.getString("address"));
				estimateData.setContact(rs.getString("contactno"));
				mobileNo=estimateData.getContact();
				//salesData.setGstNo(rs.getString("gstno"));
				//salesData.setEmail(rs.getString("email"));
				estimateData.setInvoiceDate(rs.getString("Invoicedate"));
				estimateData.setDueDate(rs.getString("duedate"));
				estimateData.setProduct(rs.getString("productname"));
				estimateData.setSize(rs.getString("size"));
				estimateData.setUnit(rs.getString("unit"));
				estimateData.setQty(rs.getString("quantity"));
				estimateData.setRate(rs.getString("rate"));
				estimateData.setTotal(rs.getString("total"));
				estimateData.setBalanceAmount(rs.getString("balance_amount"));
				estimateData.setSubtotal1(rs.getString("subtotal1"));
				estimateData.setAdvance(rs.getString("advance"));
				estimateData.setDiscount(rs.getString("discount"));
				estimateData.setAmount(rs.getString("amount"));
				estimateData.setHeight(rs.getString("height"));
				estimateData.setWidth(rs.getString("width"));
				estimateData.setDescription(rs.getString("description"));
				estimateData.setServiceBy(rs.getString("serviceBy"));
				estimateData.setProductId(rs.getString("productId"));
				estimateDataList.add(estimateData); 
		
		
			}
			
			String querySelect1=QueryConstants.ESTIMATE_REPORT_VIEW_CUST_DETAIL;
			PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1,mobileNo);
			preparedStmt1.setString(2,json.getCompanyId());
			ResultSet rs1=preparedStmt1.executeQuery();
			while(rs1.next()) {
				EstimateReportJSON custData=new EstimateReportJSON();
				custData.setAddress(rs1.getString("address"));
				custData.setGstNo(rs1.getString("gstno"));
				custData.setEmail(rs1.getString("email"));
				estimateDataList.add(custData);
			}
			
		
			
			
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return estimateDataList;
	}

	public EstimateReportJSON EstimateReportEdit(EstimateReportJSON json) {
Connection connection=null;
String advance=null;
String discount=null;
float updateAdvance;
float updateDiscount;
		
		try {

		       connection = DatabaseUtil.getDBConnection();
		       
		   
				
		       String querySelect2=QueryConstants.Invoice_Advance;
				PreparedStatement preparedStmt2=connection.prepareStatement(querySelect2);
			
				preparedStmt2.setString(1,json.getInvoiceNo());	
				preparedStmt2.setString(2,json.getCompanyId());		    
				ResultSet rs1=preparedStmt2.executeQuery();
				while(rs1.next()) {						
				advance=rs1.getString("advance");	
				discount=rs1.getString("discount");
				}
				Float f1=Float.parseFloat(advance);
				Float f2=Float.parseFloat(json.getPay());
				//Float f3=f1+f2;
				Float f3=Float.parseFloat(discount);
				Float f4=Float.parseFloat(json.getDiscount());
				//Float f3=f1+f2;
				updateAdvance=f1+f2;
				updateDiscount=f3+f4;
		       String querySelect1=QueryConstants.Invoice_BalanceAmt;
				PreparedStatement preparedStmt1=connection.prepareStatement(querySelect1);
				preparedStmt1.setString(1,json.getBalanceAmt());
				preparedStmt1.setFloat(2,updateAdvance);
				preparedStmt1.setFloat(3,updateDiscount);
				preparedStmt1.setString(4,json.getInvoiceNo());	
				preparedStmt1.setString(5,json.getCompanyId());		    
				preparedStmt1.executeUpdate();
				
					String querySelect=QueryConstants.Est_Statement_Insert;
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

	public EstimateReportJSON invoicepaymentreport(EstimateReportJSON json) {
		ArrayList<EstimateReportJSON> invoicepaymentreportlist = new ArrayList<EstimateReportJSON>();	
		EstimateReportJSON res=new EstimateReportJSON();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.InvoicePayment_Report;
		
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getCompanyId());
						
	        ResultSet rs=preparedStmt.executeQuery();
	               
	        while(rs.next())
	        {
	        	EstimateReportJSON categoryRetrieveobj = new EstimateReportJSON();
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

	public EstimateReportJSON Estimatecustomerstatementreport(EstimateReportJSON json) {
		ArrayList<EstimateReportJSON> invoicepaymentreportlist = new ArrayList<EstimateReportJSON>();	
		EstimateReportJSON res=new EstimateReportJSON();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.EstimateCustomerStatement_Report;
		
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getFromDate());
			preparedStmt.setString(2,json.getToDate());
			preparedStmt.setString(3,json.getCustomerId());			
			preparedStmt.setString(4,json.getCompanyId());	
	        ResultSet rs=preparedStmt.executeQuery();
	               
	        while(rs.next())
	        {
	        	EstimateReportJSON categoryRetrieveobj = new EstimateReportJSON();
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
	


	public static ArrayList<EstimateReportJSON>AuditReportDisplay(EstimateReportJSON details) {
		
		ArrayList<EstimateReportJSON> employeeRetrievelist = new ArrayList<EstimateReportJSON>();
		Connection connection=null;
	

		EstimateReportJSON employeeRetrieveobj1 = new EstimateReportJSON();
    	
		
		try {
			connection =DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.EMP_SELECT_AUDIT_REPORT;
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,details.getCompanyId());
			preparedStmt.setString(2,details.getFromDate());
			preparedStmt.setString(3,details.getToDate());
		
			//preparedStmt.setString(2,details.getDate());
			
	        ResultSet rs=preparedStmt.executeQuery();
	        
	       
	        while(rs.next())
	        {
	        	EstimateReportJSON employeeRetrieveobj = new EstimateReportJSON();
	        	employeeRetrieveobj.setSuperiorId(rs.getString("staffId"));
	        	employeeRetrieveobj.setName(rs.getString("staffName"));
	        	employeeRetrieveobj.setRole(rs.getString("Role"));
	        	employeeRetrieveobj.setOperation(rs.getString("Operation"));
	        	employeeRetrieveobj.setEmployeeId(rs.getString("affectedId"));
	         	employeeRetrieveobj.setEmployeeName(rs.getString("affectedName"));
	        	employeeRetrieveobj.setDate(rs.getString("Date"));
	        	employeeRetrieveobj.setTime(rs.getString("Time"));
	        	
	        	
	        	employeeRetrievelist.add(employeeRetrieveobj);
					       	
	       
			}
	     	
	        connection.close();  
	        } catch (SQLException e)
	        {
	        e.printStackTrace();
	        }
	         	
		   finally {
			DatabaseUtil.closeConnection(connection);
		}
	        
		   return employeeRetrievelist;
		
			
	    }
}