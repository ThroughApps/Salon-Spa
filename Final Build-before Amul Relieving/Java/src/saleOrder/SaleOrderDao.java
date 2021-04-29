package saleOrder;

import java.sql.Connection;


import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import DBUtil.DatabaseUtil;
import master.MasterDao;
import saleOrder.SaleOrderJSON;
import saleOrder.QueryConstants;

public class SaleOrderDao {

	public SaleOrderJSON selectCustomer(SaleOrderJSON json)  throws NumberFormatException{
		
		ArrayList<SaleOrderJSON> selectcustomernamelist = new ArrayList<SaleOrderJSON>();
		ArrayList<SaleOrderJSON> selectsaleproductlist = new ArrayList<SaleOrderJSON>();
		ArrayList<SaleOrderJSON> selectInvoiceNoList = new ArrayList<SaleOrderJSON>();
		ArrayList<SaleOrderJSON> selectEnqDetailsList =new ArrayList<SaleOrderJSON>();
		SaleOrderJSON res = new SaleOrderJSON();
		Connection connection = null;
		String gstNo = "-";
		String invoiceNumber = "";
		int customerId = 0;
		String customerName=null;
		String customerRewardPoint=null;
		String saleRevenue=null;
		String estRevenue=null;
		try {

			connection = DatabaseUtil.getDBConnection();

			String querySelect = QueryConstants.Select_Customer_Name;
			
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			// preparedStmt.setString(1,json.getProductCategory());
			preparedStmt.setString(1, json.getCompanyId());
			ResultSet rs = preparedStmt.executeQuery();
			while (rs.next()) {
				
				SaleOrderJSON selectCustomerNameobj = new SaleOrderJSON();
				customerName=rs.getString("customerName");
				selectCustomerNameobj.setCustomerName(rs.getString("customerName"));
				selectCustomerNameobj.setOrderNumber(rs.getInt("orderNumber"));
				customerId=rs.getInt("customerId");
				String querySelect2=QueryConstants.Select_Last_Vist_And_Amount;
				PreparedStatement preparedStmt2=connection.prepareStatement(querySelect2);
				preparedStmt2.setInt(1,customerId);
				preparedStmt2.setString(2, json.getCompanyId());
				ResultSet rs2=preparedStmt2.executeQuery();
				while(rs2.next())
				{
				
					selectCustomerNameobj.setLastVisit(rs2.getString("lastVisit"));
					selectCustomerNameobj.setTotalRevenue(rs2.getString("totalRevenue"));
					selectCustomerNameobj.setServiceBy(rs2.getString("serviceBy"));
					
				 saleRevenue=rs2.getString("totalRevenue");
					
				}
				
				String querySelectest=QueryConstants.Select_Last_Est_Amount;
				PreparedStatement preparedStmtest=connection.prepareStatement(querySelectest);
				preparedStmtest.setInt(1,customerId);
				preparedStmtest.setString(2, json.getCompanyId());
				ResultSet rsest=preparedStmtest.executeQuery();
				while(rsest.next())
				{
				
					selectCustomerNameobj.setTotalRevenueEst(rsest.getString("totalRevenue"));
		
					
					 estRevenue=rsest.getString("totalRevenue");
					
				}
				
				//int FinalTotalRevenue=Integer.parseInt(saleRevenue)+Integer.parseInt(estRevenue);
				
				String querySelect3=QueryConstants.Select_Enquired_Product_Quantity;
				PreparedStatement preparedStmt3=connection.prepareStatement(querySelect3);
				preparedStmt3.setInt(1,customerId);
				
				preparedStmt3.setString(2,json.getCompanyId());
				ResultSet rs3=preparedStmt3.executeQuery();
				
				while(rs3.next())
				{
					
					SaleOrderJSON selectEnqDetails = new SaleOrderJSON();
					selectEnqDetails.setEnqProductName(rs3.getString("productName"));
					selectEnqDetails.setEnqQuantity(rs3.getString("quantity"));
					selectEnqDetails.setCustomerId(rs3.getInt("customerId"));
					selectEnqDetails.setCustomerName(rs3.getString("customerName"));
					selectEnqDetailsList.add(selectEnqDetails);
					selectCustomerNameobj.setSelectEnqDetailsList(selectEnqDetailsList);
					
				}
			
				//selectEnqDetailsList.clear();
			
					
				selectCustomerNameobj.setCustomerId(customerId);
			//	selectCustomerNameobj.setFinalRevenue(FinalTotalRevenue);
				selectCustomerNameobj.setContactNo(rs.getString("contactNo"));
				selectCustomerNameobj.setEorderNumber(rs.getInt("eorderNumber"));
				selectCustomerNameobj.setAddress(rs.getString("address"));
				gstNo = rs.getString("gstNo");
				selectCustomerNameobj.setGstNo(gstNo);
				selectCustomerNameobj.setEmail(rs.getString("email"));
				selectCustomerNameobj.setCompanyName(rs.getString("companyName"));
				selectCustomerNameobj.setRewardPoint(rs.getString("rewardPoint"));
				selectCustomerNameobj.setExpiryDate(rs.getString("expiryDate"));
				selectcustomernamelist.add(selectCustomerNameobj);
			
			}
		
		
			String querySelect1 = QueryConstants.Select_Product_Name_Rate;
			
			PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1, json.getCompanyId());
			ResultSet rs1 = preparedStmt1.executeQuery();
			while (rs1.next()) {
				SaleOrderJSON selectsaleproductobj = new SaleOrderJSON();
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
		
			
			
			
			res.setSelectcustomernamelist(selectcustomernamelist);
			res.setSelectsaleproductlist(selectsaleproductlist);

			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		catch (NumberFormatException nfe) {
			nfe.printStackTrace();
		}

		finally {
			DatabaseUtil.closeConnection(connection);
		}

		return res;

	}

	public SaleOrderJSON addsaleorder(SaleOrderJSON json) {
		ArrayList<SaleOrderJSON> productdatalist = new ArrayList<SaleOrderJSON>();
		ArrayList<SaleOrderJSON> arrdatalist = new ArrayList<SaleOrderJSON>();
		ArrayList<SaleOrderJSON> selectInvoiceNoList = new ArrayList<SaleOrderJSON>();
		ArrayList<SaleOrderJSON> responseListdata = new ArrayList<SaleOrderJSON>();
		ArrayList<SaleOrderJSON> responseListdataInfo = new ArrayList<SaleOrderJSON>();
		SaleOrderJSON res = new SaleOrderJSON();

		Connection connection = null;
		String invoiceData = null;
		String enquiryData =null;
		String productName = null;
		String rate = null;
		String quantity = null;
		String total = null;
		String cgst = null;
		String sgst = null;
		String igst = null;
		String finalAmount = null;
		String productId = null;
		String description = "-";
		String invoiceNumber = "";
		String dbQuantity = null;
		String staffId = null;
		String productType = null;
		String enqproductName=null;
		String enqquantity=null;
		String dbProductName = null;
		String AuditCustomerId=null;
		String empStatStaffId=null;
		String empStatRole=null;
		json.setInvoiceResponseData("Invoice_Failed");

		try {
			connection = DatabaseUtil.getDBConnection();

			invoiceData = json.getInvoiceData();
			enquiryData =json.getEnquiryData();
			
			if (enquiryData == null || enquiryData.equals("-") || enquiryData.equals("")) {
				
				String deleteQuerySelect=QueryConstants.Enquiry_Delete;
				PreparedStatement preparestmnt=connection.prepareStatement(deleteQuerySelect);
				preparestmnt.setInt(1, json.getCustomerId());
				preparestmnt.setString(2, json.getCompanyId());
				preparestmnt.executeUpdate();
			}else {
				String enquiryDatawithoutLastCharacter = enquiryData.substring(0, enquiryData.length() - 1);
		List<String> eList = Arrays.asList(enquiryDatawithoutLastCharacter.split("@,"));
				
				String deleteQuerySelect=QueryConstants.Enquiry_Delete;
				PreparedStatement preparestmnt=connection.prepareStatement(deleteQuerySelect);
				preparestmnt.setInt(1, json.getCustomerId());
				preparestmnt.setString(2, json.getCompanyId());
				preparestmnt.executeUpdate();
			
				int size=0;
				size=eList.size();
				if(size>0) {
					for (int i = 0; i < eList.size(); i = i +2 ) {
						enqproductName=eList.get(i);
						enqquantity=eList.get(i+1);
						
	
						String enquiryQuerySelect=QueryConstants.INSERT_ENQUIRY;
						PreparedStatement preparestmt=connection.prepareStatement(enquiryQuerySelect);
						preparestmt.setString(1,enqproductName);
						preparestmt.setString(2,enqquantity);
						preparestmt.setInt(3, json.getCustomerId());
						preparestmt.setString(4, json.getCustomerName());
						preparestmt.setString(5, json.getCompanyId());
						preparestmt.executeUpdate();
					}	
				}
			}
			
			String invoiceDatawithoutLastCharacter = invoiceData.substring(0, invoiceData.length() - 1);
			

			String insertData = "Yes";

			// CHECKING IF ALL PRODUCT ARE BELOW OR EQUAL TO THE PRESENT STOCK COUNT

			List<String> aListProductQtyCheck = Arrays.asList(invoiceDatawithoutLastCharacter.split("@,"));
			for (int i = 0; i < aListProductQtyCheck.size(); i = i + 12) {
		

				productName = aListProductQtyCheck.get(i);
				rate = aListProductQtyCheck.get(i + 1);
				quantity = aListProductQtyCheck.get(i + 2);
				total = aListProductQtyCheck.get(i + 3);
				cgst = aListProductQtyCheck.get(i + 4);
				sgst = aListProductQtyCheck.get(i + 5);
				igst = aListProductQtyCheck.get(i + 6);
				finalAmount = aListProductQtyCheck.get(i + 7);
				description = aListProductQtyCheck.get(i + 8);
				productId = aListProductQtyCheck.get(i + 9);
				staffId = aListProductQtyCheck.get(i + 10);
				productType = aListProductQtyCheck.get(i + 11);

				// to be implemented in frontend
				if (quantity == null || quantity.equals("-") || quantity.equals(" ")) {
					quantity = "0";
				}

				dbProductName = null;
				if (productType.equals("product")) {
									
					String querySelectGetQTY = QueryConstants.GET_QUANTITY;
					PreparedStatement preparedStmtGetQTY = connection.prepareStatement(querySelectGetQTY);
					preparedStmtGetQTY.setString(1, productId);
					preparedStmtGetQTY.setString(2, json.getCompanyId());
					ResultSet rsGetQTY = preparedStmtGetQTY.executeQuery();
					while (rsGetQTY.next()) {
						dbQuantity = rsGetQTY.getString("Quantity");

						if (Integer.parseInt(dbQuantity) < Integer.parseInt(quantity)) {
							json.setInvoiceResponseData("Invoice_Failed");
							insertData = "No";
							aListProductQtyCheck.set(i + 2, dbQuantity);

							SaleOrderJSON responseDataINFO = new SaleOrderJSON();
							responseDataINFO.setProductName(productName);
							responseDataINFO.setQuantity(dbQuantity);
							responseListdataInfo.add(responseDataINFO);
						}

					}

					// break;
					// }

			

				}

			}

			if (insertData.equals("Yes")) {
			
				

				String querySelect3 = QueryConstants.SaleOrder_Insert_SELECT;
				PreparedStatement preparedStmt3 = connection.prepareStatement(querySelect3);
				preparedStmt3.setString(1, json.getCompanyId());
				ResultSet rs = preparedStmt3.executeQuery();
				while (rs.next()) {
					if (rs.getString("invoiceNo") != null) {
			
						invoiceNumber = rs.getString("invoiceNo");
						// data=rs.getString("data");

					} else {
						invoiceNumber = "INV-0";
					
					}
				}
				String[] data = invoiceNumber.split("-");
			

				int result = Integer.parseInt(data[1]);
				int invoiceNumber1 = result + 1;
				String invoiceNo = String.format("INV-%s", invoiceNumber1);
				;
				// SaleOrderJSON selectInvoiceNoObj = new SaleOrderJSON();
				json.setInvoiceNo(invoiceNo);

				String querySelect2 = QueryConstants.Cus_Statement_Insert;
				PreparedStatement preparedStmt2 = connection.prepareStatement(querySelect2);
				preparedStmt2.setString(1, invoiceNo);
				preparedStmt2.setString(2, json.getAdvance());
				preparedStmt2.setString(3, json.getDiscount());
				preparedStmt2.setString(4, json.getSubtotal1());
				preparedStmt2.setString(5, json.getDate());
				preparedStmt2.setString(6, json.getCustomerName());
				preparedStmt2.setString(7, json.getBalance_amount());
				preparedStmt2.setString(8, json.getAddress());
				preparedStmt2.setString(9, json.getGstNo());
				preparedStmt2.setString(10, json.getEmail());
				preparedStmt2.setInt(11, json.getCustomerId());
				preparedStmt2.setString(12, json.getCompanyId());
				preparedStmt2.setString(13, json.getPaymentMode());
				preparedStmt2.executeUpdate();

				String querySelectReward = QueryConstants.Customer_Update;
				PreparedStatement preparedStmtReward = connection.prepareStatement(querySelectReward);
				preparedStmtReward.setString(1, json.getCustomerExpiryDate());
				preparedStmtReward.setString(2, json.getCustomerRewardPoint());
				preparedStmtReward.setInt(3,  json.getCustomerId());	
				preparedStmtReward.setString(4,  json.getCompanyId());
				preparedStmtReward.executeUpdate();
				
		
				
				String pointsliabilityQuery=QueryConstants.Insert_Points_Redeem_Expiry_Details;
				PreparedStatement prepareStmntpoints=connection.prepareStatement(pointsliabilityQuery);
				prepareStmntpoints.setInt(1, json.getCustomerId());
				prepareStmntpoints.setString(2, json.getCustomerName());
				prepareStmntpoints.setString(3, json.getCustomerExpiryDate());
				prepareStmntpoints.setString(4, json.getRewardPointLiability());
				prepareStmntpoints.setString(5, json.getRedeemPointToUse());
				prepareStmntpoints.setString(6, json.getRedeemAmountToUse());
				prepareStmntpoints.setString(7, json.getCompanyId());
				
		
			
				
				// if(json.getInvoiceData()!=null) {
				List<String> aList = Arrays.asList(invoiceDatawithoutLastCharacter.split("@,"));
				for (int i = 0; i < aList.size(); i = i + 12) {
				

					productName = aList.get(i);
					rate = aList.get(i + 1);
					quantity = aList.get(i + 2);
					total = aList.get(i + 3);
					cgst = aList.get(i + 4);
					sgst = aList.get(i + 5);
					igst = aList.get(i + 6);
					finalAmount = aList.get(i + 7);
					description = aList.get(i + 8);
					productId = aList.get(i + 9);
					staffId = aList.get(i + 10);
					productType = aList.get(i + 11);

				
					if (quantity == null || quantity.equals("-") || quantity.equals("")) {
						quantity = "0";
					}
				if(productType.equals("service"))
				{
					System.out.println("productType"
							+productType);
					String EmpStatStaffName=staffId.substring(1);
					System.out.println("staffName"+staffId);
					System.out.println("withoutSpaceStaffName"+EmpStatStaffName);
			
					String querySelectRoleId = QueryConstants.Select_Staff_Name;
					PreparedStatement preparedStmtRoleId = connection.prepareStatement(querySelectRoleId);
					preparedStmtRoleId.setString(1, json.getCompanyId());
					preparedStmtRoleId.setString(2,EmpStatStaffName );
					ResultSet rsRoleId = preparedStmtRoleId.executeQuery();
					while (rsRoleId.next()) {
					
				
							empStatStaffId = rsRoleId.getString("staffId");
							empStatRole = rsRoleId.getString("roleName");
							// data=rs.getString("data");

						
					}
					System.out.println("staffId"+empStatStaffId);
					System.out.println("rolename"+empStatRole);
					
					
					System.out.println("To Insert staffName"+EmpStatStaffName);
					System.out.println("To Insert staffId"+empStatStaffId);
					System.out.println("To Insert roleName"+empStatRole);
					System.out.println("To Insert finalAmount"+finalAmount);
					System.out.println("To Insert companyId"+json.getCompanyId());
					System.out.println("To Insert date"+json.getInvoiceDate());
					
					String employeeStatisticsQuery=QueryConstants.Employee_Stat_Insert;
					PreparedStatement preparedStmtEmp=connection.prepareStatement(employeeStatisticsQuery);
					preparedStmtEmp.setString(1,EmpStatStaffName);
					preparedStmtEmp.setString(2,empStatStaffId);
					preparedStmtEmp.setString(3,empStatRole);
					preparedStmtEmp.setString(4,finalAmount);
					preparedStmtEmp.setString(5,json.getInvoiceDate());
					preparedStmtEmp.setString(6,json.getCompanyId());
					preparedStmtEmp.setString(7,productName);
					preparedStmtEmp.setString(8,"service");
					preparedStmtEmp.executeUpdate();
					
				}
				
					String querySelect = QueryConstants.SaleOrder_Insert;
					PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
					preparedStmt.setString(1, json.getCustomerName());
					preparedStmt.setString(2, invoiceNo);
					preparedStmt.setInt(3, json.getOrderNumber());
					preparedStmt.setString(4, json.getInvoiceDate());
					preparedStmt.setString(5, json.getDueDate());
					preparedStmt.setString(6, json.getSaleType());
					preparedStmt.setString(7, productName);
					preparedStmt.setString(8, description);
					preparedStmt.setString(9, rate);
					preparedStmt.setString(10, quantity);
					preparedStmt.setString(11, total);
					preparedStmt.setString(12, cgst);
					preparedStmt.setString(13, sgst);
					preparedStmt.setString(14, igst);
					preparedStmt.setString(15, finalAmount);
					preparedStmt.setString(16, json.getDate());
					preparedStmt.setString(17, json.getContactNo());
					preparedStmt.setString(18, json.getTotalcgst());
					preparedStmt.setString(19, json.getTotalsgst());
					preparedStmt.setString(20, json.getTotaligst());
					preparedStmt.setString(21, json.getTotalitemqty());
					preparedStmt.setString(22, json.getSubtotal1());
					preparedStmt.setString(23, json.getTotalgst());
					preparedStmt.setString(24, json.getAdvance());
					preparedStmt.setString(25, json.getDiscount());
					preparedStmt.setString(26, json.getBalance_amount());
					preparedStmt.setString(27, json.getPayment_status());
					preparedStmt.setString(28, json.getAddress());
					preparedStmt.setString(29, json.getGstNo());
					preparedStmt.setString(30, json.getEmail());
					preparedStmt.setInt(31, json.getCustomerId());
					preparedStmt.setString(32, json.getCompanyId());
					preparedStmt.setString(33, json.getCompanyName());
					preparedStmt.setString(34, productId);
					preparedStmt.setString(35, json.getPaymentMode());
					preparedStmt.setString(36, staffId);
					preparedStmt.setString(37, json.getStaffData1());
					preparedStmt.setString(38, json.getCustomerRewardPoint());
					preparedStmt.setString(39, json.getRedeemPointToUse());
					preparedStmt.setString(40, json.getRedeemAmountToUse());

					preparedStmt.executeUpdate();
					// String updatedQuantity=
					if (quantity == null || quantity.equals("-") || quantity.equals("")) {
						quantity = "0";
					}
					String querySelect1 = QueryConstants.Update_Quantity;
					PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
					preparedStmt1.setString(1, quantity);
					preparedStmt1.setString(2, productId);
					preparedStmt1.setString(3, json.getCompanyId());
					preparedStmt1.executeUpdate();

					
					
				}
				AuditCustomerId=String.valueOf(json.getCustomerId());
				MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), AuditCustomerId,json.getCustomerName(),"Sale Invoice Generated",json.getCompanyId());


			
				String querySelect1 = QueryConstants.Customer_OrderNumber;
				PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
				preparedStmt1.setInt(1, json.getOrderNumber());
				preparedStmt1.setInt(2, json.getCustomerId());
				preparedStmt1.setString(3, json.getCompanyId());
				preparedStmt1.executeUpdate();

				

				json.setInvoiceResponseData("Invoice_Success");

			} else {
				

				// RETURN THE CART DATA FOR RECALCULATION
				for (int i = 0; i < aListProductQtyCheck.size(); i = i + 12) {

					productName = aListProductQtyCheck.get(i);
					rate = aListProductQtyCheck.get(i + 1);
					quantity = aListProductQtyCheck.get(i + 2);
					total = aListProductQtyCheck.get(i + 3);
					cgst = aListProductQtyCheck.get(i + 4);
					sgst = aListProductQtyCheck.get(i + 5);
					igst = aListProductQtyCheck.get(i + 6);
					finalAmount = aListProductQtyCheck.get(i + 7);
					description = aListProductQtyCheck.get(i + 8);
					productId = aListProductQtyCheck.get(i + 9);
					staffId = aListProductQtyCheck.get(i + 10);
					productType = aListProductQtyCheck.get(i + 11);

					SaleOrderJSON responseData = new SaleOrderJSON();
					responseData.setProductName(productName);
					responseData.setRate(rate);
					responseData.setQuantity(quantity);
					responseData.setTotal(total);
					responseData.setCgst(cgst);
					responseData.setSgst(sgst);
					responseData.setIgst(igst);
					responseData.setFinalAmount(finalAmount);
					responseData.setDescription(description);
					responseData.setProductId(productId);
					responseData.setProductType(productType);
					responseData.setStaffName(staffId);
					responseListdata.add(responseData);

				}

				json.setResponseListdata(responseListdata);
				json.setResponseListdataInfo(responseListdataInfo);

			}
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {

			DatabaseUtil.closeConnection(connection);
		}
		return json;

	}

	public SaleOrderJSON estimateinvoiceNo(SaleOrderJSON json) {

		String invoiceNumber = "";

	
		ArrayList<SaleOrderJSON> selectEstimateInvoiceNoList = new ArrayList<SaleOrderJSON>();
		SaleOrderJSON res = new SaleOrderJSON();
		Connection connection = null;
		try {

			connection = DatabaseUtil.getDBConnection();
			String querySelect1 = QueryConstants.EstimateOrder_Insert_SELECT;
			PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1, json.getCompanyId());
			ResultSet rs = preparedStmt1.executeQuery();
			while (rs.next()) {
				if (rs.getString("invoiceNo") != null) {
			
					invoiceNumber = rs.getString("invoiceNo");

				} else {
					invoiceNumber = "EST-0";
				
				}
			}
			String[] data = invoiceNumber.split("-");
		

			int result = Integer.parseInt(data[1]);
			int invoiceNumber1 = result + 1;
			String invoiceNo = String.format("EST-%s", invoiceNumber1);
			SaleOrderJSON selectEstimateInvoiceNoObj = new SaleOrderJSON();
			selectEstimateInvoiceNoObj.setInvoiceNo(invoiceNo);
			selectEstimateInvoiceNoList.add(selectEstimateInvoiceNoObj);
			res.setSelectEstimateInvoiceNoList(selectEstimateInvoiceNoList);

			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {
			DatabaseUtil.closeConnection(connection);
		}

		return res;
	}

	public SaleOrderJSON addestimateorder(SaleOrderJSON json) {
		ArrayList<SaleOrderJSON> estimateproductdatalist = new ArrayList<SaleOrderJSON>();
		ArrayList<SaleOrderJSON> arrdatalist = new ArrayList<SaleOrderJSON>();
		ArrayList<SaleOrderJSON> responseListdata = new ArrayList<SaleOrderJSON>();
		ArrayList<SaleOrderJSON> responseListdataInfo = new ArrayList<SaleOrderJSON>();

		Connection connection = null;
		String invoiceData = null;
		String productName = null;
		String rate = null;
		String quantity = null;
		String productId = null;
		String total = null;
		String staffId = null;
		String productType = null;
		String description = "-";
		String invoiceNumber = "";
		String dbQuantity = null;
		String dbProductName = null;
		String enquiryData =null;
		  String enqproductName=null;
	      String enqquantity=null;
	      String AuditCustomerId=null;
		json.setInvoiceResponseData("Invoice_Failed");

		try {
			connection = DatabaseUtil.getDBConnection();

			invoiceData = json.getInvoiceData();
		       enquiryData =json.getEnquiryData();
		       
		         if (enquiryData == null || enquiryData.equals("-") || enquiryData.equals("")) {
		           
		            String deleteQuerySelect=QueryConstants.Enquiry_Delete;
		            PreparedStatement preparestmnt=connection.prepareStatement(deleteQuerySelect);
		            preparestmnt.setInt(1, json.getCustomerId());
		            preparestmnt.setString(2, json.getCompanyId());
		            preparestmnt.executeUpdate();
		         }else {
		            String enquiryDatawithoutLastCharacter = enquiryData.substring(0, enquiryData.length() - 1);
		      List<String> eList = Arrays.asList(enquiryDatawithoutLastCharacter.split("@,"));
		     ;
		            String deleteQuerySelect=QueryConstants.Enquiry_Delete;
		            PreparedStatement preparestmnt=connection.prepareStatement(deleteQuerySelect);
		            preparestmnt.setInt(1, json.getCustomerId());
		            preparestmnt.setString(2, json.getCompanyId());
		            preparestmnt.executeUpdate();
		            
		            
		          
		            int size=0;
		            size=eList.size();
		            if(size>0) {
		               for (int i = 0; i < eList.size(); i = i +2 ) {
		                  enqproductName=eList.get(i);
		                  enqquantity=eList.get(i+1);
		                  
		            
		                  String enquiryQuerySelect=QueryConstants.INSERT_ENQUIRY;
		                  PreparedStatement preparestmt=connection.prepareStatement(enquiryQuerySelect);
		                  preparestmt.setString(1,enqproductName);
		                  preparestmt.setString(2,enqquantity);
		                  preparestmt.setInt(3, json.getCustomerId());
		                  preparestmt.setString(4, json.getCustomerName());
		                  preparestmt.setString(5, json.getCompanyId());
		                  preparestmt.executeUpdate();
		               }   
		            }
		         }
		         
			String invoiceDatawithoutLastCharacter = invoiceData.substring(0, invoiceData.length() - 1);
			  String insertData="Yes";
              
              //CHECKING IF ALL PRODUCT ARE BELOW OR EQUAL TO THE PRESENT STOCK COUNT
			  List<String> aListProductQtyCheck= Arrays.asList(invoiceDatawithoutLastCharacter.split("@,"));
              for(int i=0;i<aListProductQtyCheck.size();i=i+8)
              {
                         
                          
                          productName=aListProductQtyCheck.get(i);                     
                          rate=aListProductQtyCheck.get(i+1);                  
                          quantity=aListProductQtyCheck.get(i+2);
                          total=aListProductQtyCheck.get(i+3);                  
                          description=aListProductQtyCheck.get(i+4);
                          productId=aListProductQtyCheck.get(i+5);
                         staffId=aListProductQtyCheck.get(i+6);
                          productType=aListProductQtyCheck.get(i+7);
                       
                          //to be implemented in frontend
                          if(quantity==null || quantity.equals("-") || quantity.equals(" "))
                          {
                             quantity="0";
                          }
                       
                          dbProductName=null;
                          if(productType.equals("product")) {
                             
                    
                                
                                 String querySelectGetQTY=QueryConstants.GET_QUANTITY;
                                   PreparedStatement preparedStmtGetQTY=connection.prepareStatement(querySelectGetQTY);
                                   preparedStmtGetQTY.setString(1,productId);
                                   preparedStmtGetQTY.setString(2,json.getCompanyId());
                                   ResultSet rsGetQTY=preparedStmtGetQTY.executeQuery();
                                   while(rsGetQTY.next()) {
                                      dbQuantity=rsGetQTY.getString("Quantity");
                                      
                                      if(Integer.parseInt(dbQuantity) < Integer.parseInt(quantity)) {
                                         json.setInvoiceResponseData("Invoice_Failed");
                                         insertData="No";
                                         aListProductQtyCheck.set(i+2,dbQuantity);
                                         
                                         
                                         SaleOrderJSON responseDataINFO=new SaleOrderJSON();
                                         responseDataINFO.setProductName(productName);
                                         responseDataINFO.setQuantity(dbQuantity);
                                         responseListdataInfo.add(responseDataINFO);
                                      }
                                      
                                   }
                             
                             
                                //break;
                             //   }
                             
                             
                         
                          }
           
              }
              
              
              
              
              if(insertData.equals("Yes")) {
			String querySelect3 = QueryConstants.EstimateOrder_Insert_SELECT;
			PreparedStatement preparedStmt3 = connection.prepareStatement(querySelect3);
			preparedStmt3.setString(1, json.getCompanyId());
			ResultSet rs = preparedStmt3.executeQuery();
			while (rs.next()) {
				if (rs.getString("invoiceNo") != null) {
					
					invoiceNumber = rs.getString("invoiceNo");

				} else {
					invoiceNumber = "EST-0";
					
				}
			}
			String[] data = invoiceNumber.split("-");
		

		
			int result = Integer.parseInt(data[1]);
			int invoiceNumber1 = result + 1;
			String invoiceNo = String.format("EST-%s", invoiceNumber1);
			// SaleOrderJSON selectEstimateInvoiceNoObj = new SaleOrderJSON();
			json.setInvoiceNo(invoiceNo);

		
			String querySelect2 = QueryConstants.Est_Statement_Insert;
			PreparedStatement preparedStmt2 = connection.prepareStatement(querySelect2);
			preparedStmt2.setString(1, invoiceNo);
			preparedStmt2.setString(2, json.getAdvance());
			preparedStmt2.setString(3, json.getDiscount());
			preparedStmt2.setString(4, json.getSubtotal1());
			preparedStmt2.setString(5, json.getDate());
			preparedStmt2.setString(6, json.getCustomerName());
			preparedStmt2.setString(7, json.getBalance_amount());
			preparedStmt2.setString(8, json.getAddress());
			preparedStmt2.setString(9, json.getGstNo());
			preparedStmt2.setString(10, json.getEmail());
			preparedStmt2.setInt(11, json.getCustomerId());
			preparedStmt2.setString(12, json.getCompanyId());
			preparedStmt2.setString(13, json.getPaymentMode());
			preparedStmt2.executeUpdate();
			
			
	            String querySelectReward = QueryConstants.Customer_Update;
	            PreparedStatement preparedStmtReward = connection.prepareStatement(querySelectReward);
	            preparedStmtReward.setString(1, json.getCustomerExpiryDate());
	            preparedStmtReward.setString(2, json.getCustomerRewardPoint());
	            preparedStmtReward.setInt(3, json.getCustomerId());   
	            preparedStmtReward.setString(4, json.getCompanyId());
	            preparedStmtReward.executeUpdate();
	            

	            
	            String pointsliabilityQuery=QueryConstants.Insert_Points_Redeem_Expiry_Details;
	            PreparedStatement prepareStmntpoints=connection.prepareStatement(pointsliabilityQuery);
	            prepareStmntpoints.setInt(1, json.getCustomerId());
	            prepareStmntpoints.setString(2, json.getCustomerName());
	            prepareStmntpoints.setString(3, json.getCustomerExpiryDate());
	            prepareStmntpoints.setString(4, json.getRewardPointLiability());
	            prepareStmntpoints.setString(5, json.getRedeemPointToUse());
	            prepareStmntpoints.setString(6, json.getRedeemAmountToUse());
	            prepareStmntpoints.setString(7, json.getCompanyId());
	       
	            

			if (json.getInvoiceData() != null) {
				List<String> aList = Arrays.asList(invoiceDatawithoutLastCharacter.split("@,"));
				for (int i = 0; i < aList.size(); i = i + 8) {
					

					productName = aList.get(i);
					rate = aList.get(i + 1);
					quantity = aList.get(i + 2);
					total = aList.get(i + 3);
					description = aList.get(i + 4);
					productId = aList.get(i + 5);
					staffId = aList.get(i + 6);
					productType = aList.get(i + 7);
					if (quantity == null || quantity.equals("-") || quantity.equals("")) {
						quantity = "0";
					}

				
					String querySelect = QueryConstants.EstimateOrder_Insert;
					PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
					preparedStmt.setString(1, json.getCustomerName());
					preparedStmt.setString(2, invoiceNo);
					preparedStmt.setInt(3, json.getOrderNumber());
					preparedStmt.setString(4, json.getInvoiceDate());
					preparedStmt.setString(5, json.getDueDate());
					preparedStmt.setString(6, productName);
					preparedStmt.setString(7, description);
					preparedStmt.setString(8, rate);
					preparedStmt.setString(9, quantity);
					preparedStmt.setString(10, total);
					preparedStmt.setString(11, json.getDate());
					preparedStmt.setString(12, json.getContactNo());
					preparedStmt.setString(13, json.getTotalitemqty());
					preparedStmt.setString(14, json.getSubtotal1());
					preparedStmt.setString(15, json.getAdvance());
					preparedStmt.setString(16, json.getDiscount());
					preparedStmt.setString(17, json.getBalance_amount());
					preparedStmt.setString(18, json.getPayment_status());
					preparedStmt.setInt(19, json.getCustomerId());
					preparedStmt.setString(20, json.getCompanyId());
					preparedStmt.setString(21, json.getCompanyName());
					preparedStmt.setString(22, json.getAddress());
					preparedStmt.setString(23, json.getGstNo());
					preparedStmt.setString(24, json.getEmail());
					preparedStmt.setString(25, productId);
					preparedStmt.setString(26, json.getPaymentMode());
					preparedStmt.setString(27, staffId);
					preparedStmt.setString(28, json.getStaffData1());
					   preparedStmt.setString(29, json.getCustomerRewardPoint());
		               preparedStmt.setString(30, json.getRedeemPointToUse());
		               preparedStmt.setString(31, json.getRedeemAmountToUse());
					preparedStmt.executeUpdate();

					if (quantity == null || quantity.equals("-") || quantity.equals("")) {
						quantity = "0";
					}
					String querySelect4 = QueryConstants.Update_Quantity;
					PreparedStatement preparedStmt4 = connection.prepareStatement(querySelect4);
					preparedStmt4.setString(1, quantity);
					preparedStmt4.setString(2, productId);
					preparedStmt4.setString(3, json.getCompanyId());
					preparedStmt4.executeUpdate();
					

				}
				AuditCustomerId=String.valueOf(json.getCustomerId());
				MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), AuditCustomerId,json.getCustomerName(),"Estimate Invoice Generated",json.getCompanyId());
			
			}

			String querySelect1 = QueryConstants.Customer_EOrderNumber;
			PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
			preparedStmt1.setInt(1, json.getOrderNumber());
			preparedStmt1.setInt(2, json.getCustomerId());
			preparedStmt1.setString(3, json.getCompanyId());
			preparedStmt1.executeUpdate();
			
			json.setInvoiceResponseData("Invoice_Success");
			
		}
              else {
					
					
					
					//RETURN THE CART DATA FOR RECALCULATION
					for(int i=0;i<aListProductQtyCheck.size();i=i+8) {
						
					
						
						
						productName=aListProductQtyCheck.get(i);							
						rate=aListProductQtyCheck.get(i+1);						
						quantity=aListProductQtyCheck.get(i+2);
						total=aListProductQtyCheck.get(i+3);						
						description=aListProductQtyCheck.get(i+4);
						productId=aListProductQtyCheck.get(i+5);
						productType=aListProductQtyCheck.get(i+7);
						 staffId=aListProductQtyCheck.get(i+6);
						SaleOrderJSON responseData=new SaleOrderJSON();
						responseData.setProductName(productName);
						responseData.setRate(rate);
						responseData.setQuantity(quantity);
						responseData.setTotal(total);
						responseData.setDescription(description);
						responseData.setProductId(productId);
						responseData.setProductType(productType);
						responseData.setStaffName(staffId);
						responseListdata.add(responseData);
						
		
					}

					json.setResponseListdata(responseListdata);
					json.setResponseListdataInfo(responseListdataInfo);
					
					
					
				}
              connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {

			DatabaseUtil.closeConnection(connection);
		}
		return json;

	}

	public SaleOrderJSON saleinvoicereport(SaleOrderJSON json) throws NumberFormatException{
		ArrayList<SaleOrderJSON> saleinvoicereportlist = new ArrayList<SaleOrderJSON>();
		ArrayList<SaleOrderJSON> selectEnqDetailsList =new ArrayList<SaleOrderJSON>();
		SaleOrderJSON res = new SaleOrderJSON();
		List<String> invList = new ArrayList<String>();
		Connection connection = null;
		String payment_status = " ";
		String saleRevenue=null;
		String estRevenue=null;
		try {

			connection = DatabaseUtil.getDBConnection();

			String querySelect1 = QueryConstants.SELECT_GST_INV.replace("$tableName", "SaleInvoiceTable");
			PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
			// preparedStmt.setString(1,json.getDate());
			preparedStmt1.setString(1, json.getCompanyId());
			ResultSet rs1 = preparedStmt1.executeQuery();
			while (rs1.next()) {
				invList.add(rs1.getString("invoiceNo"));
			}

			for (int i = (invList.size() - 1); i >= 0; i--) {

				String querySelect = QueryConstants.SaleInvoice_Report;
			
				PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
				// preparedStmt.setString(1,json.getMonth());
				preparedStmt.setString(1, json.getCompanyId());
				preparedStmt.setString(2, invList.get(i));

				ResultSet rs = preparedStmt.executeQuery();
				// int res1=rs.getString("subtotal1").compareTo(rs.getString("balance_amount"));

				// if(res1==0)
				// {
				// payment_status="UnPaid";
				// }else if(rs.getString("balance_amount")=="0")
				// {
				// payment_status="Paid";
				// }else
				// {
				// payment_status="PartiallyPaid";
				// }
				while (rs.next()) {
					SaleOrderJSON saleinvoicereportobj = new SaleOrderJSON();
					saleinvoicereportobj.setSaleInvoiceId(rs.getString("saleInvoiceId"));
					saleinvoicereportobj.setInvoiceNo(rs.getString("invoiceNo"));
					saleinvoicereportobj.setDate(rs.getString("date"));
					saleinvoicereportobj.setCustomerName(rs.getString("customerName"));
					saleinvoicereportobj.setContactNo(rs.getString("contactNo"));
					saleinvoicereportobj.setBalance_amount(rs.getString("balance_amount"));
					saleinvoicereportobj.setSubtotal1(rs.getString("subtotal1"));
					saleinvoicereportobj.setPayment_status(rs.getString("payment_status"));
					saleinvoicereportobj.setAdvance(rs.getString("advance"));
					saleinvoicereportobj.setCompanyName(rs.getString("companyName"));
					saleinvoicereportobj.setCustomerId(rs.getInt("customerId"));
					saleinvoicereportobj.setOrderNumber(rs.getInt("orderNumber"));
					saleinvoicereportobj.setInvoiceDate(rs.getString("invoiceDate"));
					saleinvoicereportobj.setDueDate(rs.getString("dueDate"));
					saleinvoicereportobj.setAddress(rs.getString("address"));
					saleinvoicereportobj.setGstNo(rs.getString("gstNo"));
					saleinvoicereportobj.setEmail(rs.getString("email"));
					saleinvoicereportobj.setDiscount(rs.getString("discount"));
					saleinvoicereportobj.setStaffId(rs.getString("staffId"));
					saleinvoicereportobj.setPaymentMode(rs.getString("paymentMode"));
					
					saleinvoicereportobj.setRewardPoint(rs.getString("rewardPoint"));
					String querySelect2=QueryConstants.Select_Last_Vist_And_Amount;
					PreparedStatement preparedStmt2=connection.prepareStatement(querySelect2);
					preparedStmt2.setInt(1,rs.getInt("customerId"));
					preparedStmt2.setString(2,json.getCompanyId());
					ResultSet rs2=preparedStmt2.executeQuery();
					while(rs2.next())
					{
					
						saleinvoicereportobj.setLastVisit(rs2.getString("lastVisit"));
						saleinvoicereportobj.setTotalRevenue(rs2.getString("totalRevenue"));
						saleinvoicereportobj.setServiceBy(rs2.getString("serviceBy"));
						
						 saleRevenue=rs2.getString("totalRevenue");
							
					}
					String querySelectExpiryDate=QueryConstants.Select_Expiry_Date;
					PreparedStatement preparedStmtExpiryDate=connection.prepareStatement(querySelectExpiryDate);
					preparedStmtExpiryDate.setInt(1,rs.getInt("customerId"));
					preparedStmtExpiryDate.setString(2,json.getCompanyId());
					ResultSet rsExpiryDate=preparedStmtExpiryDate.executeQuery();
					while(rsExpiryDate.next())
					{
					
						saleinvoicereportobj.setExpiryDate(rsExpiryDate.getString("expiryDate"));
						
						
							
					}
					
					String querySelectest=QueryConstants.Select_Last_Est_Amount;
					PreparedStatement preparedStmtest=connection.prepareStatement(querySelectest);
					preparedStmtest.setInt(1,rs.getInt("customerId"));
					preparedStmtest.setString(2, json.getCompanyId());
					ResultSet rsest=preparedStmtest.executeQuery();
					while(rsest.next())
					{
					
						saleinvoicereportobj.setTotalRevenueEst(rsest.getString("totalRevenue"));
			
						
						 estRevenue=rsest.getString("totalRevenue");
						
					}
					
				//	int FinalTotalRevenue=Integer.parseInt(saleRevenue)+Integer.parseInt(estRevenue);
						String querySelect3=QueryConstants.Select_Enquired_Product_Quantity;
					PreparedStatement preparedStmt3=connection.prepareStatement(querySelect3);
					preparedStmt3.setInt(1,rs.getInt("customerId"));
					preparedStmt3.setString(2,json.getCompanyId());
					ResultSet rs3=preparedStmt3.executeQuery();
					
					while(rs3.next())
					{
						
						SaleOrderJSON selectEnqDetails = new SaleOrderJSON();
						selectEnqDetails.setEnqProductName(rs3.getString("productName"));
						selectEnqDetails.setEnqQuantity(rs3.getString("quantity"));
						selectEnqDetails.setCustomerId(rs3.getInt("customerId"));
						selectEnqDetails.setCustomerName(rs3.getString("customerName"));
						selectEnqDetailsList.add(selectEnqDetails);
						saleinvoicereportobj.setSelectEnqDetailsList(selectEnqDetailsList);
						
					}

				//	saleinvoicereportobj.setFinalRevenue(FinalTotalRevenue);
					saleinvoicereportlist.add(saleinvoicereportobj);
				}
			}


			res.setSaleinvoicereportlist(saleinvoicereportlist);

			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		catch (NumberFormatException nfe) {
			nfe.printStackTrace();
		}
		finally {
			DatabaseUtil.closeConnection(connection);
		}

		return res;

	}

	public SaleOrderJSON estimateinvoicereport(SaleOrderJSON json) {
		ArrayList<SaleOrderJSON> estimateinvoicereportlist = new ArrayList<SaleOrderJSON>();
		ArrayList<SaleOrderJSON> selectEnqDetailsList =new ArrayList<SaleOrderJSON>();
		SaleOrderJSON res = new SaleOrderJSON();
		List<String> invList = new ArrayList<String>();
		Connection connection = null;
	    String payment_status = " ";
		try {

			connection = DatabaseUtil.getDBConnection();
			String querySelect1 = QueryConstants.SELECT_GST_INV.replace("$tableName", "EstimateInvoiceTable");
			PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
			// preparedStmt.setString(1,json.getDate());
			preparedStmt1.setString(1, json.getCompanyId());
			ResultSet rs1 = preparedStmt1.executeQuery();
			while (rs1.next()) {
				invList.add(rs1.getString("invoiceNo"));
			}

			for (int i = (invList.size() - 1); i >= 0; i--) {
				String querySelect = QueryConstants.EstimateInvoice_Report;
				
				PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
				// preparedStmt.setString(1,json.getMonth());
				preparedStmt.setString(1, json.getCompanyId());
				preparedStmt.setString(2, invList.get(i));
				ResultSet rs = preparedStmt.executeQuery();

				while (rs.next()) {
					SaleOrderJSON setEstimateinvoicereportobj = new SaleOrderJSON();
					setEstimateinvoicereportobj.setEstimateId(rs.getString("estimateId"));
					setEstimateinvoicereportobj.setInvoiceNo(rs.getString("invoiceNo"));
					setEstimateinvoicereportobj.setDate(rs.getString("date"));
					setEstimateinvoicereportobj.setCustomerName(rs.getString("customerName"));
					setEstimateinvoicereportobj.setContactNo(rs.getString("contactNo"));
					setEstimateinvoicereportobj.setBalance_amount(rs.getString("balance_amount"));
					setEstimateinvoicereportobj.setSubtotal1(rs.getString("subtotal1"));
					setEstimateinvoicereportobj.setPayment_status(rs.getString("payment_status"));
					setEstimateinvoicereportobj.setAdvance(rs.getString("advance"));
					setEstimateinvoicereportobj.setCompanyName(rs.getString("companyName"));
					setEstimateinvoicereportobj.setCustomerId(rs.getInt("customerId"));
					setEstimateinvoicereportobj.setOrderNumber(rs.getInt("orderNumber"));
					setEstimateinvoicereportobj.setInvoiceDate(rs.getString("invoiceDate"));
					setEstimateinvoicereportobj.setDueDate(rs.getString("dueDate"));
					setEstimateinvoicereportobj.setAddress(rs.getString("address"));
					setEstimateinvoicereportobj.setGstNo(rs.getString("gstNo"));
					setEstimateinvoicereportobj.setEmail(rs.getString("email"));
					setEstimateinvoicereportobj.setDiscount(rs.getString("discount"));
					setEstimateinvoicereportobj.setPaymentMode(rs.getString("paymentMode"));
					setEstimateinvoicereportobj.setStaffId(rs.getString("staffId"));
					
					setEstimateinvoicereportobj.setRewardPoint(rs.getString("rewardPoint"));
					String querySelect2=QueryConstants.Select_Last_Vist_And_Amount;
					PreparedStatement preparedStmt2=connection.prepareStatement(querySelect2);
					preparedStmt2.setInt(1,rs.getInt("customerId"));
					preparedStmt2.setString(2,json.getCompanyId());
					ResultSet rs2=preparedStmt2.executeQuery();
					while(rs2.next())
					{
					
						setEstimateinvoicereportobj.setLastVisit(rs2.getString("lastVisit"));
						setEstimateinvoicereportobj.setTotalRevenue(rs2.getString("totalRevenue"));
						setEstimateinvoicereportobj.setServiceBy(rs2.getString("serviceBy"));
						
						
							
					}
					String querySelectExpiryDate=QueryConstants.Select_Expiry_Date;
					PreparedStatement preparedStmtExpiryDate=connection.prepareStatement(querySelectExpiryDate);
					preparedStmtExpiryDate.setInt(1,rs.getInt("customerId"));
					preparedStmtExpiryDate.setString(2,json.getCompanyId());
					ResultSet rsExpiryDate=preparedStmtExpiryDate.executeQuery();
					while(rsExpiryDate.next())
					{
					
						setEstimateinvoicereportobj.setExpiryDate(rsExpiryDate.getString("expiryDate"));
						
						
							
					}
					
					String querySelectest=QueryConstants.Select_Last_Est_Amount;
					PreparedStatement preparedStmtest=connection.prepareStatement(querySelectest);
					preparedStmtest.setInt(1,rs.getInt("customerId"));
					preparedStmtest.setString(2, json.getCompanyId());
					ResultSet rsest=preparedStmtest.executeQuery();
					while(rsest.next())
					{
					
						setEstimateinvoicereportobj.setTotalRevenueEst(rsest.getString("totalRevenue"));
			
						
						
						
					}
					
			
					estimateinvoicereportlist.add(setEstimateinvoicereportobj);
				}
			}


			res.setEstimateinvoicereportlist(estimateinvoicereportlist);

			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {
			DatabaseUtil.closeConnection(connection);
		}

		return res;

	}

	public static String GetEmailId(String contactNo, String companyId) {
		SaleOrderJSON res = new SaleOrderJSON();
		Connection connection = null;
		String emailId = null;
		try {

			connection = DatabaseUtil.getDBConnection();

			String querySelect = QueryConstants.GET_EMAIL_ID;

			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1, contactNo);
			preparedStmt.setString(2, companyId);
			ResultSet rs = preparedStmt.executeQuery();

			while (rs.next()) {
				emailId = rs.getString("Email");
			}

			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {
			DatabaseUtil.closeConnection(connection);
		}

		return emailId;

	}

	public SaleOrderJSON updatesaleorder(SaleOrderJSON json) {
		ArrayList<SaleOrderJSON> productdatalist = new ArrayList<SaleOrderJSON>();
		ArrayList<SaleOrderJSON> arrdatalist = new ArrayList<SaleOrderJSON>();
		ArrayList<SaleOrderJSON> selectInvoiceNoList = new ArrayList<SaleOrderJSON>();
		ArrayList<SaleOrderJSON> responseListdata = new ArrayList<SaleOrderJSON>();
		ArrayList<SaleOrderJSON> responseListdataInfo = new ArrayList<SaleOrderJSON>();
		SaleOrderJSON res = new SaleOrderJSON();

		Connection connection = null;
		String invoiceData = null;
		String updateQuantity = null;
		String productName = null;
		
		String rate = null;
		String amount = null;
		String quantity = null;
		String quantity5 = null;
		String total = null;
		String cgst = null;
		String sgst = null;
		String igst = null;
		String finalAmount = null;	
		String description = "-";
		String productName1 = null;
		String size1 = null;
		String rate1 = null;
		String quantity1 = null;
		String productId = null;
		String invoiceNumber = "";
		String dueAmount = null;
		String discount = null;
		String advance = null;
		String balanceAmt = null;
		String status = null;
		String productId5 = null;
		String companyId5 = null;
		String dbQuantity = null;
		String staffId = null;
		String productType = null;
		String dbProductName = null;
		String staffName = null;
		 String enqproductName=null;
	      String enqquantity=null;
	      String enquiryData =null;
		json.setInvoiceResponseData("Invoice_Failed");


		try {
			connection = DatabaseUtil.getDBConnection();

			invoiceData = json.getInvoiceData();
			
		
	  
	      
	         
			String invoiceDatawithoutLastCharacter = invoiceData.substring(0, invoiceData.length() - 1);

			updateQuantity = json.getUpdateQuantity();

			String insertData = "Yes";
			

			// CHECKING IF ALL PRODUCT ARE BELOW OR EQUAL TO THE PRESENT STOCK COUNT
			List<String> aListProductQtyCheck = Arrays.asList(invoiceDatawithoutLastCharacter.split("@,"));
			for (int i = 0; i < aListProductQtyCheck.size(); i = i + 13) {
		
			productName = aListProductQtyCheck.get(i);
			rate = aListProductQtyCheck.get(i + 1);
			quantity = aListProductQtyCheck.get(i + 2);
			total = aListProductQtyCheck.get(i + 3);
			cgst = aListProductQtyCheck.get(i + 4);
			sgst = aListProductQtyCheck.get(i + 5);
			igst = aListProductQtyCheck.get(i + 6);
			finalAmount = aListProductQtyCheck.get(i + 7);
			description = aListProductQtyCheck.get(i + 8);
			productId = aListProductQtyCheck.get(i + 9);
			status = aListProductQtyCheck.get(i + 10);
			staffName = aListProductQtyCheck.get(i + 11);
			productType = aListProductQtyCheck.get(i + 12);
		
			// to be implemented in frontend
			if (quantity == null || quantity.equals("-") || quantity.equals(" ")) {
			quantity = "0";
			}
			dbProductName = null;
			if (productType.equals("product") && status.equals("New") ) {
			
			String querySelectGetQTY = QueryConstants.GET_QUANTITY;
			PreparedStatement preparedStmtGetQTY = connection.prepareStatement(querySelectGetQTY);
			preparedStmtGetQTY.setString(1, productId);
			preparedStmtGetQTY.setString(2, json.getCompanyId());
			ResultSet rsGetQTY = preparedStmtGetQTY.executeQuery();
			while (rsGetQTY.next()) {
			dbQuantity = rsGetQTY.getString("Quantity");
			if (Integer.parseInt(dbQuantity) < Integer.parseInt(quantity)) {
			json.setInvoiceResponseData("Invoice_Failed");
			insertData = "No";
			aListProductQtyCheck.set(i + 2, dbQuantity);
			SaleOrderJSON responseDataINFO = new SaleOrderJSON();
			responseDataINFO.setProductName(productName);
			responseDataINFO.setQuantity(dbQuantity);
			responseListdataInfo.add(responseDataINFO);
			}
			}
			// break;
			// }
		
			}
			}
			if (insertData.equals("Yes")) {
		
			String querySelect2 = QueryConstants.Cus_Statement_Insert;
			PreparedStatement preparedStmt2 = connection.prepareStatement(querySelect2);
			preparedStmt2.setString(1, json.getInvoiceNo());
			preparedStmt2.setInt(2, 0);
			preparedStmt2.setInt(3, 0);
			preparedStmt2.setString(4, json.getBalance_amount());
			preparedStmt2.setString(5, json.getDate());
			preparedStmt2.setString(6, json.getCustomerName());
			preparedStmt2.setString(7, json.getBalance_amount());
			preparedStmt2.setString(8, json.getAddress());
			preparedStmt2.setString(9, json.getGstNo());
			preparedStmt2.setString(10, json.getEmail());
			preparedStmt2.setInt(11, json.getCustomerId());
			preparedStmt2.setString(12, json.getCompanyId());
			preparedStmt2.setString(13, "-");
			preparedStmt2.executeUpdate();

			String querySelectReward = QueryConstants.Customer_Update;
			PreparedStatement preparedStmtReward = connection.prepareStatement(querySelectReward);
			preparedStmtReward.setString(1, json.getCustomerExpiryDate());
			preparedStmtReward.setString(2, json.getCustomerRewardPoint());
			preparedStmtReward.setInt(3,  json.getCustomerId());	
			preparedStmtReward.setString(4,  json.getCompanyId());
			preparedStmtReward.executeUpdate();
			
			String querySelect3 = QueryConstants.DAILY_SALES_REPORT_DEL;
			PreparedStatement preparedStmt3 = connection.prepareStatement(querySelect3);
			preparedStmt3.setString(1, json.getInvoiceNo());
			preparedStmt3.setInt(2, json.getCustomerId());
			preparedStmt3.setString(3, json.getCompanyId());
			preparedStmt3.executeUpdate();

		

			if (json.getInvoiceData() != null) {
				List<String> aList = Arrays.asList(invoiceDatawithoutLastCharacter.split("@,"));
				for (int i = 0; i < aList.size(); i = i + 13) {
					

					productName = aList.get(i);
					rate = aList.get(i + 1);
					quantity = aList.get(i + 2);
					total = aList.get(i + 3);
					cgst = aList.get(i + 4);
					sgst = aList.get(i + 5);
					igst = aList.get(i + 6);
					finalAmount = aList.get(i + 7);
					description = aList.get(i + 8);
					productId = aList.get(i + 9);
					status = aList.get(i + 10);
					staffId = aList.get(i + 11);
					productType=aList.get(i+12);
					
					  
		               if (quantity == null || quantity.equals("-") || quantity.equals("")) {
		                  quantity = "0";
		               }
					 
				
					String querySelect = QueryConstants.SaleOrder_Insert;
					PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
					preparedStmt.setString(1, json.getCustomerName());
					preparedStmt.setString(2, json.getInvoiceNo());
					preparedStmt.setInt(3, json.getOrderNumber());
					preparedStmt.setString(4, json.getInvoiceDate());
					preparedStmt.setString(5, json.getDueDate());
					preparedStmt.setString(6, json.getSaleType());
					preparedStmt.setString(7, productName);
					preparedStmt.setString(8, description);
					preparedStmt.setString(9, rate);
					preparedStmt.setString(10, quantity);
					preparedStmt.setString(11, total);
					preparedStmt.setString(12, cgst);
					preparedStmt.setString(13, sgst);
					preparedStmt.setString(14, igst);
					preparedStmt.setString(15, finalAmount);
					preparedStmt.setString(16, json.getDate());
					preparedStmt.setString(17, json.getContactNo());
					preparedStmt.setString(18, json.getTotalcgst());
					preparedStmt.setString(19, json.getTotalsgst());
					preparedStmt.setString(20, json.getTotaligst());
					preparedStmt.setString(21, json.getTotalitemqty());
					preparedStmt.setString(22, json.getSubtotal1());
					preparedStmt.setString(23, json.getTotalgst());
					preparedStmt.setString(24, json.getAdvance());
					preparedStmt.setString(25, json.getDiscount());
					preparedStmt.setString(26, json.getBalance_amount());
					preparedStmt.setString(27, json.getPayment_status());
					preparedStmt.setString(28, json.getAddress());
					preparedStmt.setString(29, json.getGstNo());
					preparedStmt.setString(30, json.getEmail());
					preparedStmt.setInt(31, json.getCustomerId());
					preparedStmt.setString(32, json.getCompanyId());
					preparedStmt.setString(33, json.getCompanyName());
					preparedStmt.setString(34, productId);
					preparedStmt.setString(35, "-");
					preparedStmt.setString(36, staffId);
					preparedStmt.setString(37, json.getStaffData1());
					preparedStmt.setString(38, json.getCustomerRewardPoint());
					preparedStmt.setString(39, json.getRedeemPointToUse());
					preparedStmt.setString(40, json.getRedeemAmountToUse());
					preparedStmt.executeUpdate();
				
					Integer.parseInt(productId);
					   if (quantity == null || quantity.equals("-") || quantity.equals("")) {
			                  quantity = "0";
			               }

					if (!status.equals("Exist")) {
						String querySelect4 = QueryConstants.Update_Quantity;
						PreparedStatement preparedStmt4 = connection.prepareStatement(querySelect4);
						preparedStmt4.setString(1, quantity);
						preparedStmt4.setString(2, productId);
						preparedStmt4.setString(3, json.getCompanyId());
						preparedStmt4.executeUpdate();
					}


				}
				MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), json.getInvoiceNo(),json.getCustomerName(),"Sale Invoice Updated",json.getCompanyId());
				
			}

	
			if ( (!json.getUpdateQuantity().equals(""))) {
				
				List<String> arList = Arrays.asList(updateQuantity.split(","));
				for (int j = 0; j < arList.size(); j = j + 3) {

					quantity5 = arList.get(j);
					productId5 = arList.get(j + 1);
					companyId5 = arList.get(j + 2);
						   if (quantity5 == null || quantity5.equals("-") || quantity5.equals("")) {
						  int quantity6 = 0;
						  int quantity7=Integer.parseInt(quantity5)+quantity6;
						   String querySelect5 = QueryConstants.Update_Quantity_Exist;
							PreparedStatement preparedStmt5 = connection.prepareStatement(querySelect5);
							preparedStmt5.setInt(1, quantity7);
							preparedStmt5.setString(2, productId5);
							preparedStmt5.setString(3, companyId5);
							preparedStmt5.executeUpdate();
							
			               }else {
			            	   int quantity8=Integer.parseInt(quantity5);
			            		String querySelectGetQTY = QueryConstants.GET_QUANTITY;
			        			PreparedStatement preparedStmtGetQTY = connection.prepareStatement(querySelectGetQTY);
			        			preparedStmtGetQTY.setString(1, productId5);
			        			preparedStmtGetQTY.setString(2, json.getCompanyId());
			        			ResultSet rsGetQTY = preparedStmtGetQTY.executeQuery();
			        			while (rsGetQTY.next()) {
			        			dbQuantity = rsGetQTY.getString("Quantity");
			        			}
			        			 int quantity7=Integer.parseInt(quantity5)+quantity8;
			            	   
			            		String querySelect5 = QueryConstants.Update_Quantity_Exist;
								PreparedStatement preparedStmt5 = connection.prepareStatement(querySelect5);
								preparedStmt5.setInt(1,quantity7);
								preparedStmt5.setString(2, productId5);
								preparedStmt5.setString(3, companyId5);
								preparedStmt5.executeUpdate();
								
			               }
						   
			               }
				
				
			}
			json.setInvoiceResponseData("Invoice_Success");
			}else {
				

				// RETURN THE CART DATA FOR RECALCULATION
				for (int i = 0; i < aListProductQtyCheck.size(); i = i + 13) {

				productName = aListProductQtyCheck.get(i);
				rate = aListProductQtyCheck.get(i + 1);
				quantity = aListProductQtyCheck.get(i + 2);
				total = aListProductQtyCheck.get(i + 3);
				cgst = aListProductQtyCheck.get(i + 4);
				sgst = aListProductQtyCheck.get(i + 5);
				igst = aListProductQtyCheck.get(i + 6);
				finalAmount = aListProductQtyCheck.get(i + 7);
				description = aListProductQtyCheck.get(i + 8);
				productId = aListProductQtyCheck.get(i + 9);
				status = aListProductQtyCheck.get(i + 10);
				staffName=aListProductQtyCheck.get(i + 11);
				productType=aListProductQtyCheck.get(i + 12);

				SaleOrderJSON responseData = new SaleOrderJSON();
				responseData.setProductName(productName);
				responseData.setRate(rate);
				responseData.setQuantity(quantity);
				responseData.setTotal(total);
				responseData.setCgst(cgst);
				responseData.setSgst(sgst);
				responseData.setIgst(igst);
				responseData.setFinalAmount(finalAmount);
				responseData.setDescription(description);
				responseData.setProductId(productId);
				responseData.setProductType(productType);
				responseData.setStatus(status);
				responseData.setStaffName(staffName);

				responseListdata.add(responseData);

				}

				json.setResponseListdata(responseListdata);
				json.setResponseListdataInfo(responseListdataInfo);

			}
		
			connection.close();

		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {

			DatabaseUtil.closeConnection(connection);
		}
		return json;
	}

	
	public SaleOrderJSON updateestimateorder(SaleOrderJSON json) {
		ArrayList<SaleOrderJSON> estimateproductdatalist = new ArrayList<SaleOrderJSON>();
		ArrayList<SaleOrderJSON> arrdatalist = new ArrayList<SaleOrderJSON>();
		ArrayList<SaleOrderJSON> responseListdata = new ArrayList<SaleOrderJSON>();
		ArrayList<SaleOrderJSON> responseListdataInfo = new ArrayList<SaleOrderJSON>();


		Connection connection = null;
		String invoiceData = null;
		String productName = null;
		String rate = null;
		String quantity = null;
		String total = null;
		String description = "-";
		String invoiceNumber = "";
		String productId = "";
		String staffId="";
		String updateQuantity = null;
		String status = null;
		String quantity5=null;
		String productId5=null;
		String companyId5=null;
		String dbQuantity = null;
		String dbProductName = null;
		String productType = null;
		json.setInvoiceResponseData("Invoice_Failed");


		try {
		connection = DatabaseUtil.getDBConnection();

		invoiceData = json.getInvoiceData();
		String invoiceDatawithoutLastCharacter = invoiceData.substring(0, invoiceData.length() - 1);

		updateQuantity = json.getUpdateQuantity();


		 String insertData="Yes";
		 
		 
		//CHECKING IF ALL PRODUCT ARE BELOW OR EQUAL TO THE PRESENT STOCK COUNT
		 List<String> aListProductQtyCheck= Arrays.asList(invoiceDatawithoutLastCharacter.split("@,"));
		          for(int i=0;i<aListProductQtyCheck.size();i=i+9)
		          {
		                      
		                      productName=aListProductQtyCheck.get(i);                    
		                      rate=aListProductQtyCheck.get(i+1);                  
		                      quantity=aListProductQtyCheck.get(i+2);
		                      total=aListProductQtyCheck.get(i+3);                  
		                      description=aListProductQtyCheck.get(i+4);
		                      productId=aListProductQtyCheck.get(i+5);
		                     staffId=aListProductQtyCheck.get(i+6);
		                      status=aListProductQtyCheck.get(i+7);
		                      productType=aListProductQtyCheck.get(i+8);
		                     
		                   
		                    
		                      //to be implemented in frontend
		                      if(quantity==null || quantity.equals("-") || quantity.equals(" "))
		                      {
		                         quantity="0";
		                      }
		                   
		                      dbProductName=null;
		                      if(productType.equals("product") && status.equals("New")) {
		                        
		               
		                           
		                             String querySelectGetQTY=QueryConstants.GET_QUANTITY;
		                               PreparedStatement preparedStmtGetQTY=connection.prepareStatement(querySelectGetQTY);
		                               preparedStmtGetQTY.setString(1,productId);
		                               preparedStmtGetQTY.setString(2,json.getCompanyId());
		                               ResultSet rsGetQTY=preparedStmtGetQTY.executeQuery();
		                               while(rsGetQTY.next()) {
		                                  dbQuantity=rsGetQTY.getString("Quantity");
		                                 
		                                  if(Integer.parseInt(dbQuantity) < Integer.parseInt(quantity)) {
		                                     json.setInvoiceResponseData("Invoice_Failed");
		                                     insertData="No";
		                                     aListProductQtyCheck.set(i+2,dbQuantity);
		                                     
		                                     
		                                     SaleOrderJSON responseDataINFO=new SaleOrderJSON();
		                                     responseDataINFO.setProductName(productName);
		                                     responseDataINFO.setQuantity(dbQuantity);
		                                     responseListdataInfo.add(responseDataINFO);
		                                  }
		                                 
		                               }
		                         
		                       
		                      }
		 
		          }


		        if(insertData.equals("Yes")) {
		
		String querySelect2 = QueryConstants.Est_Statement_Insert;
		PreparedStatement preparedStmt2 = connection.prepareStatement(querySelect2);
		preparedStmt2.setString(1, json.getInvoiceNo());
		preparedStmt2.setInt(2, 0);
		preparedStmt2.setInt(3, 0);
		preparedStmt2.setString(4, json.getBalance_amount());
		preparedStmt2.setString(5, json.getDate());
		preparedStmt2.setString(6, json.getCustomerName());
		preparedStmt2.setString(7, json.getBalance_amount());
		preparedStmt2.setString(8, json.getAddress());
		preparedStmt2.setString(9, json.getGstNo());
		preparedStmt2.setString(10, json.getEmail());
		preparedStmt2.setInt(11, json.getCustomerId());
		preparedStmt2.setString(12, json.getCompanyId());
		preparedStmt2.setString(13, "-");
		preparedStmt2.executeUpdate();

		 String querySelectReward = QueryConstants.Customer_Update;
         PreparedStatement preparedStmtReward = connection.prepareStatement(querySelectReward);
         preparedStmtReward.setString(1, json.getCustomerExpiryDate());
         preparedStmtReward.setString(2, json.getCustomerRewardPoint());
         preparedStmtReward.setInt(3, json.getCustomerId());   
         preparedStmtReward.setString(4, json.getCompanyId());
         preparedStmtReward.executeUpdate();

		String querySelect3 = QueryConstants.DAILY_ESTIMATE_REPORT_DEL;
		PreparedStatement preparedStmt3 = connection.prepareStatement(querySelect3);
		preparedStmt3.setString(1, json.getInvoiceNo());
		preparedStmt3.setInt(2, json.getCustomerId());
		preparedStmt3.setString(3, json.getCompanyId());
		preparedStmt3.executeUpdate();
	
		if (json.getInvoiceData() != null) {
		List<String> aList = Arrays.asList(invoiceDatawithoutLastCharacter.split("@,"));

		for (int i = 0; i < aList.size(); i = i + 9) {
		

		productName = aList.get(i);
		rate = aList.get(i + 1);
		quantity = aList.get(i + 2);
		total = aList.get(i + 3);
		description = aList.get(i + 4);
		productId = aList.get(i + 5);
		staffId = aList.get(i + 6);
		status = aList.get(i + 7);
		productType = aList.get(i + 8);

		if (quantity == null || quantity.equals("-") || quantity.equals("")) {
		                quantity = "0";
		             }
		
		String querySelect = QueryConstants.EstimateOrder_Insert;
		PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
		preparedStmt.setString(1, json.getCustomerName());
		preparedStmt.setString(2, json.getInvoiceNo());
		preparedStmt.setInt(3, json.getOrderNumber());
		preparedStmt.setString(4, json.getInvoiceDate());
		preparedStmt.setString(5, json.getDueDate());
		preparedStmt.setString(6, productName);
		preparedStmt.setString(7, description);
		preparedStmt.setString(8, rate);
		preparedStmt.setString(9, quantity);
		preparedStmt.setString(10, total);
		preparedStmt.setString(11, json.getDate());
		preparedStmt.setString(12, json.getContactNo());
		preparedStmt.setString(13, json.getTotalitemqty());
		preparedStmt.setString(14, json.getSubtotal1());
		preparedStmt.setString(15, json.getAdvance());
		preparedStmt.setString(16, json.getDiscount());
		preparedStmt.setString(17, json.getBalance_amount());
		preparedStmt.setString(18, json.getPayment_status());
		preparedStmt.setInt(19, json.getCustomerId());
		preparedStmt.setString(20, json.getCompanyId());
		preparedStmt.setString(21, json.getCompanyName());
		preparedStmt.setString(22, json.getAddress());
		preparedStmt.setString(23, json.getGstNo());
		preparedStmt.setString(24, json.getEmail());
		preparedStmt.setString(25, productId);
		preparedStmt.setString(26, "-");
		preparedStmt.setString(27, staffId);
		preparedStmt.setString(28, json.getStaffData1());
		   preparedStmt.setString(29, json.getCustomerRewardPoint());
           preparedStmt.setString(30, json.getRedeemPointToUse());
           preparedStmt.setString(31, json.getRedeemAmountToUse());
		preparedStmt.executeUpdate();
		
		Integer.parseInt(productId);
		if (quantity == null || quantity.equals("-") || quantity.equals("")) {
		                quantity = "0";
		             }
		if (!status.equals("Exist")) {
		String querySelect4 = QueryConstants.Update_Quantity;
		PreparedStatement preparedStmt4 = connection.prepareStatement(querySelect4);
		preparedStmt4.setString(1, quantity);
		preparedStmt4.setString(2, productId);
		preparedStmt4.setString(3, json.getCompanyId());
		preparedStmt4.executeUpdate();
		

		}
		}

		}
		MasterDao.AuditReport(json.getStaffId(),json.getEmployeeName(),json.getRole(), json.getInvoiceNo(),json.getCustomerName(),"Estimate Invoice Updated",json.getCompanyId());
		
		
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

		json.setInvoiceResponseData("Invoice_Success");

		        }else {
		       

		//RETURN THE CART DATA FOR RECALCULATION
		for(int i=0;i<aListProductQtyCheck.size();i=i+9) {


		productName=aListProductQtyCheck.get(i);
		rate=aListProductQtyCheck.get(i+1);
		quantity=aListProductQtyCheck.get(i+2);
		total=aListProductQtyCheck.get(i+3);
		description=aListProductQtyCheck.get(i+4);
		productId=aListProductQtyCheck.get(i+5);
		staffId=aListProductQtyCheck.get(i+6);
		status=aListProductQtyCheck.get(i+7);
		productType=aListProductQtyCheck.get(i+8);

		SaleOrderJSON responseData=new SaleOrderJSON();
		responseData.setProductName(productName);
		responseData.setRate(rate);
		responseData.setQuantity(quantity);
		responseData.setTotal(total);
		responseData.setDescription(description);
		responseData.setProductId(productId);
		responseData.setProductType(productType);
		responseData.setStaffName(staffId);
		responseData.setStatus(status);
		responseListdata.add(responseData);


		}

		json.setResponseListdata(responseListdata);
		json.setResponseListdataInfo(responseListdataInfo);



		        }
		connection.close();

		} catch (SQLException e) {
		e.printStackTrace();
		}

		finally {

		DatabaseUtil.closeConnection(connection);
		}
		return json;

		}
	
	
	public SaleOrderJSON UpdateQuantityForExistingProduct(SaleOrderJSON json) {
		Connection connection = null;
		try {
		
			connection = DatabaseUtil.getDBConnection();

			String querySelect4 = QueryConstants.Update_Quantity_Exist;
			PreparedStatement preparedStmt4 = connection.prepareStatement(querySelect4);
			preparedStmt4.setString(1, json.getQuantity());
			preparedStmt4.setString(2, json.getProductId());
			preparedStmt4.setString(3, json.getCompanyId());
			preparedStmt4.executeUpdate();
			

			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {

			DatabaseUtil.closeConnection(connection);
		}
		return json;

	}

}
