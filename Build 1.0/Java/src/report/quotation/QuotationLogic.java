package report.quotation;

import java.sql.Connection;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import DBUtil.DatabaseUtil;
import master.MasterDao;



public class QuotationLogic {

	/*
	 * FUNCTION FOR DELETING BOTH WITH AND 
	 * WITHOUT GST DATA 
	 */
	public static QuotationJSON DeleteReport(QuotationJSON json) {
		Connection connection=null;
			
		try {
			connection=DatabaseUtil.getDBConnection();
			
			String querySelect=QueryContants.QUOTATION_REPORT_DEL.replace("$tableName",json.getTableName());
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getInvoiceNo());
			preparedStmt.setString(2,json.getCompanyId());
			preparedStmt.executeUpdate();
			
			MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), json.getInvoiceNo(),json.getCustomerName()," Quotation deleted",json.getCompanyId());
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		return json;
	}
	/*
	  * FUNCTION FOR VIEWING WITH GST DATA 
	 */
	public static ArrayList<QuotationJSON> ViewGSTReport(QuotationJSON json) {
		Connection connection=null;
		
		ArrayList <QuotationJSON> quotationDataList=new ArrayList <QuotationJSON>();

		
		try {
			connection=DatabaseUtil.getDBConnection();
			
			String querySelect=QueryContants.SELECT_GSTREPORT_DATA;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getInvoiceNo());
			preparedStmt.setString(2,json.getCompanyId());
			ResultSet rs=preparedStmt.executeQuery();
			while(rs.next()) {
				QuotationJSON gstQuotationData=new QuotationJSON();
				gstQuotationData.setInvoiceDate(rs.getString("invoiceDate"));
				gstQuotationData.setDueDate(rs.getString("dueDate"));
				gstQuotationData.setCustomerName(rs.getString("customerName"));
				gstQuotationData.setAddress(rs.getString("address"));
				gstQuotationData.setContactNo(rs.getString("contactNo"));
				gstQuotationData.setGstNo(rs.getString("gstNo"));
				gstQuotationData.setProductName(rs.getString("productName"));
				gstQuotationData.setSize(rs.getString("size"));
				gstQuotationData.setUnit(rs.getString("unit"));
				gstQuotationData.setQuantity(rs.getString("quantity"));
				gstQuotationData.setRate(rs.getString("rate"));
				gstQuotationData.setTotal(rs.getString("total"));
				gstQuotationData.setCgsta(rs.getString("cgsta"));
				gstQuotationData.setSgsta(rs.getString("sgsta"));
				gstQuotationData.setIgsta(rs.getString("igsta"));
				gstQuotationData.setFinalAmount(rs.getString("finalAmount"));
				gstQuotationData.setSubtotal1(rs.getString("subtotal1"));
				gstQuotationData.setTotalgst(rs.getString("totalgst"));
				gstQuotationData.setShipping(rs.getString("shipping"));
				gstQuotationData.setAdjustment(rs.getString("adjustment"));
				gstQuotationData.setDiscount(rs.getString("discount"));
				gstQuotationData.setFinalAmountTotal(rs.getString("finalAmountTotal"));
				gstQuotationData.setHeight(rs.getString("height"));
				gstQuotationData.setWidth(rs.getString("width"));
				quotationDataList.add(gstQuotationData);
				
			}
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		return quotationDataList;
	}


	/*
	  * FUNCTION FOR VIEWING WITHOUT GST DATA 
	 */
	public static ArrayList<QuotationJSON> ViewWithoutGSTReport(QuotationJSON json) {
	Connection connection=null;
		
		ArrayList <QuotationJSON> quotationDataList=new ArrayList <QuotationJSON>();

		
		try {
			connection=DatabaseUtil.getDBConnection();
			
			String querySelect=QueryContants.SELECT_WITHOUT_GSTREPORT_DATA;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getInvoiceNo());
			preparedStmt.setString(2,json.getCompanyId());
			ResultSet rs=preparedStmt.executeQuery();
			while(rs.next()) {
				QuotationJSON gstQuotationData=new QuotationJSON();
				gstQuotationData.setInvoiceDate(rs.getString("invoiceDate"));
				gstQuotationData.setDueDate(rs.getString("dueDate"));
				gstQuotationData.setCustomerName(rs.getString("customerName"));
				gstQuotationData.setAddress(rs.getString("address"));
				gstQuotationData.setContactNo(rs.getString("contactNo"));
				gstQuotationData.setGstNo(rs.getString("gstNo"));
				gstQuotationData.setProductName(rs.getString("productName"));
				gstQuotationData.setSize(rs.getString("size"));
				gstQuotationData.setUnit(rs.getString("unit"));
				gstQuotationData.setQuantity(rs.getString("quantity"));
				gstQuotationData.setRate(rs.getString("rate"));
				gstQuotationData.setTotal(rs.getString("total"));
				gstQuotationData.setSubtotal1(rs.getString("subtotal1"));
				//gstQuotationData.setTotalgst(rs.getString("totalgst"));
				gstQuotationData.setShipping(rs.getString("shipping"));
				gstQuotationData.setAdjustment(rs.getString("adjustment"));
				gstQuotationData.setDiscount(rs.getString("discount"));
				gstQuotationData.setFinalAmountTotal(rs.getString("finalAmountTotal"));
				gstQuotationData.setHeight(rs.getString("height"));
				gstQuotationData.setWidth(rs.getString("width"));
				quotationDataList.add(gstQuotationData);
				
			}
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		return quotationDataList;
	}



}