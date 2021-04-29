package Excel;

import java.sql.Connection;


import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;

import DBUtil.DatabaseUtil;
import master.QueryConstants;

public class ExcelLogic {

	/*
	 * Function For Storing File Name
	 */

	public static void StoreCustomerFileName(ExcelJSON json) {

		Connection connection = null;
		String customerFileName = null;

		try {

			connection = DatabaseUtil.getDBConnection();
			String querySelect0 = ExcelQueryConstants.SELECT_CUSTOMER_FILENAME;
			PreparedStatement preparedStmt0 = connection.prepareStatement(querySelect0);
			preparedStmt0.setString(1, json.getCompanyId());
			ResultSet rs0 = preparedStmt0.executeQuery();
			while (rs0.next()) {
				customerFileName = rs0.getString("CustomerFileName");
			}

			if (customerFileName == null) {

				
				customerFileName = json.getCustomerFileName();
				ImportCustomerFileNew(customerFileName, json.getCompanyId());

			} else {

				
				int customerFileNameLength = customerFileName.split(",").length;
				

				if (customerFileNameLength >= 5) {
					

					ArrayList<String> customerFileNames = new ArrayList<>(Arrays.asList(customerFileName.split(",")));
					customerFileNames.remove(0);
				

					customerFileNames.add(json.getCustomerFileName());

					String customerFileNameAsString = String.join(",", customerFileNames);
					

					ImportCustomerFileNew(customerFileNameAsString, json.getCompanyId());

				} else {
					

					ImportCustomerFileOld(json.getCustomerFileName(), json.getCompanyId());

				}

			}

			connection.close();

		} catch (SQLException e) {

			e.printStackTrace();
		}

	}

	/*
	 * FUNCTION FOR STORING THE FILE NAME IF FILENAME HAS NO VALUE YET IF FILENAME
	 * LENGTH > 5
	 */
	private static void ImportCustomerFileNew(String customerFileName, String companyId) {

		Connection connection = null;

		try {
	
			connection = DatabaseUtil.getDBConnection();
			String querySelect1 = ExcelQueryConstants.UPDATE_CUSTOMER_FILENAME_WHOLE;
			PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1, customerFileName);
			preparedStmt1.setString(2, companyId);
			preparedStmt1.executeUpdate();
			connection.close();

		} catch (SQLException e) {

			e.printStackTrace();
		}

	}

	/*
	 * FUNCTION FOR STORING THE FILE NAME IF FILE NAME HAS VALUE ALREADY IF FILE
	 * NAME LENGTH < 2
	 */
	private static void ImportCustomerFileOld(String customerFileName, String companyId) {

		Connection connection = null;

		try {

			connection = DatabaseUtil.getDBConnection();
			String querySelect1 = ExcelQueryConstants.UPDATE_CUSTOMER_FILENAME;
			PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1, customerFileName);
			preparedStmt1.setString(2, customerFileName);
			preparedStmt1.setString(3, companyId);
			preparedStmt1.executeUpdate();
			connection.close();

		} catch (SQLException e) {

			e.printStackTrace();
		}

	}

	/*
	 * FUNCTION FOR GETTING STORED FILENAME FROM DB
	 */
	public static void GetStoredCustomerFileName(ExcelJSON json) {

		Connection connection = null;

		try {

			connection = DatabaseUtil.getDBConnection();
			String querySelect1 = ExcelQueryConstants.SELECT_CUSTOMER_FILENAME;
			PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1, json.getCompanyId());
			ResultSet rs = preparedStmt1.executeQuery();
			while (rs.next()) {
				json.setCustomerFileName(rs.getString("CustomerFileName"));
			}

			connection.close();

		} catch (SQLException e) {

			e.printStackTrace();
		}

	}

	/*
	 * FUNCTION FOR UPLOADING DATA INTO DB
	 */
	public static ArrayList<ExcelJSON> UploadCustomerData(String companyId, JSONArray arr)
			throws ClassNotFoundException, JSONException {

		Connection connection = null;
		ArrayList<ExcelJSON> xlList = new ArrayList<ExcelJSON>();

		String customerName = "-";
		String companyName = "-";
		String contactNo = "-";
		String address = "-";
		String state = "-";
		String alternateNo = "-";
		String gstNo = "-";
		String emailId = "-";

		
		String mobileNoDB = null;
		int successRate = 0;
		int failureRate = 0;

		try {
			connection = DatabaseUtil.getDBConnection();

			for (int i = 0; i < arr.length(); i++) {

				customerName = "-";
				companyName = "-";
				contactNo = "-";
				address = "-";
				state = "-";
				alternateNo = "-";
				gstNo = "-";
				emailId = "-";

			
				mobileNoDB = null;

				ExcelJSON xl = new ExcelJSON();
			
			
				// (json.has("status")
				if (arr.getJSONObject(i).has("CustomerName")) {
					customerName = arr.getJSONObject(i).getString("CustomerName");
				} else {
					customerName = "-";
				}

				if (arr.getJSONObject(i).has("CompanyName")) {
					companyName = arr.getJSONObject(i).getString("CompanyName");
				} else {
					companyName = "-";
				}

				if (arr.getJSONObject(i).has("ContactNo")) {
					contactNo = arr.getJSONObject(i).getString("ContactNo");
				} else {
					contactNo = "-";
				}
				
				if (arr.getJSONObject(i).has("Address")) {
					address = arr.getJSONObject(i).getString("Address");
				} else {
					address = "-";
				}
				
				if (arr.getJSONObject(i).has("State")) {
					state = arr.getJSONObject(i).getString("State");
				} else {
					state = "-";
				}

				if (arr.getJSONObject(i).has("AlternateNo")) {
					alternateNo = arr.getJSONObject(i).getString("AlternateNo");
				} else {
					alternateNo = "-";
				}

				if (arr.getJSONObject(i).has("GSTNo")) {
					gstNo = arr.getJSONObject(i).getString("GSTNo");
				} else {
					gstNo = "-";
				}
				if (arr.getJSONObject(i).has("EmailId")) {
					emailId = arr.getJSONObject(i).getString("EmailId");
				} else {
					emailId = "-";
				}


				String querySelect01 = QueryConstants.CUS_VERIFY_MOBILENO;
				PreparedStatement preparedStmt01 = connection.prepareStatement(querySelect01);
				preparedStmt01.setString(1,contactNo);
				preparedStmt01.setString(2,companyId);
				ResultSet rs01 = preparedStmt01.executeQuery();
				while (rs01.next()) {
				mobileNoDB = rs01.getString("contactNo");
			
				}
			



				if (mobileNoDB == null || mobileNoDB.equals("-")) {
		

					String querySelect=QueryConstants.Customer_Insert;
					PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
					preparedStmt.setString(1,customerName);
					preparedStmt.setString(2,companyName);
					preparedStmt.setString(3,address);
					preparedStmt.setString(4,state);
					preparedStmt.setString(5,contactNo);
					preparedStmt.setString(6,alternateNo);
					preparedStmt.setString(7,gstNo);
					preparedStmt.setString(8,emailId);
					preparedStmt.setString(9,companyId);
					preparedStmt.setString(10,"-");
					
					preparedStmt.executeUpdate();
						

					
				} else {

					// xl.setEmployeeId("-");
					xl.setCustomerName(customerName);
					xl.setCompanyName(companyName);
					xl.setAddress(address);
					xl.setState(state);
					xl.setContactNo(contactNo);
					xl.setAlternateNo(alternateNo);					
					xl.setGstNo(gstNo);
					xl.setEmailId(emailId);
					xl.setCompanyId(companyId);

				

					if (mobileNoDB != null) {
						xl.setMobileNoDB("Mobile No Already Exist");
					
					} else {
						xl.setMobileNoDB("-");

					}
					xlList.add(xl);

				}

			} // for loop close
			connection.close();

		} catch (SQLException e) {

			e.printStackTrace();
		}
		return xlList;

	} // func close
	
	
	
	/*
	 * Function For Storing vendor File Name
	 */

	public static void StoreVendorFileName(ExcelJSON json) {

		Connection connection = null;
		
		String vendorFileName = null;

		try {

			connection = DatabaseUtil.getDBConnection();
			String querySelect0 = ExcelQueryConstants.SELECT_VENDOR_FILENAME;
			PreparedStatement preparedStmt0 = connection.prepareStatement(querySelect0);
			preparedStmt0.setString(1, json.getCompanyId());
			ResultSet rs0 = preparedStmt0.executeQuery();
			while (rs0.next()) {
				vendorFileName = rs0.getString("VendorFileName");
			}

			if (vendorFileName == null) {

				
				vendorFileName = json.getVendorFileName();
				ImportFileNewVendor(vendorFileName, json.getCompanyId());

			} else {

				
				int vendorFileNameLength = vendorFileName.split(",").length;
				

				if (vendorFileNameLength >= 5) {
					

					ArrayList<String> vendorFileNames = new ArrayList<>(Arrays.asList(vendorFileName.split(",")));
					vendorFileNames.remove(0);
			

					vendorFileNames.add(json.getVendorFileName());

					String vendorFileNameAsString = String.join(",", vendorFileNames);
				

					ImportFileNewVendor(vendorFileNameAsString, json.getCompanyId());

				} else {
				

					ImportFileOldVendor(json.getVendorFileName(), json.getCompanyId());

				}

			}

			connection.close();

		} catch (SQLException e) {

			e.printStackTrace();
		}

	}

	/*
	 * FUNCTION FOR STORING THE FILE NAME IF FILENAME HAS NO VALUE YET IF FILENAME
	 * LENGTH > 5
	 */
	private static void ImportFileNewVendor(String vendorFileName, String companyId) {

		Connection connection = null;

		try {
			
			connection = DatabaseUtil.getDBConnection();
			String querySelect1 = ExcelQueryConstants.UPDATE_VENDOR_FILENAME_WHOLE;
			PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1, vendorFileName);
			preparedStmt1.setString(2, companyId);
			preparedStmt1.executeUpdate();
			connection.close();

		} catch (SQLException e) {

			e.printStackTrace();
		}

	}

	/*
	 * FUNCTION FOR STORING THE FILE NAME IF FILE NAME HAS VALUE ALREADY IF FILE
	 * NAME LENGTH < 2
	 */
	private static void ImportFileOldVendor(String vendorFileName, String companyId) {

		Connection connection = null;

		try {

			connection = DatabaseUtil.getDBConnection();
			String querySelect1 = ExcelQueryConstants.UPDATE_VENDOR_FILENAME;
			PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1, vendorFileName);
			preparedStmt1.setString(2, vendorFileName);
			preparedStmt1.setString(3, companyId);
			preparedStmt1.executeUpdate();
			connection.close();

		} catch (SQLException e) {

			e.printStackTrace();
		}

	}

	/*
	 * FUNCTION FOR GETTING STORED FILENAME FROM DB
	 */
	public static void GetStoredVendorFileName(ExcelJSON json) {

		Connection connection = null;

		try {

			connection = DatabaseUtil.getDBConnection();
			String querySelect1 = ExcelQueryConstants.SELECT_VENDOR_FILENAME;
			PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
			preparedStmt1.setString(1, json.getCompanyId());
			ResultSet rs = preparedStmt1.executeQuery();
			while (rs.next()) {
				json.setVendorFileName(rs.getString("VendorFileName"));
			}

			connection.close();

		} catch (SQLException e) {

			e.printStackTrace();
		}

	}

	/*
	 * FUNCTION FOR UPLOADING DATA INTO DB
	 */
	public static ArrayList<ExcelJSON> UploadVendorData(String companyId, JSONArray arr)
			throws ClassNotFoundException, JSONException {

		Connection connection = null;
		ArrayList<ExcelJSON> xlList = new ArrayList<ExcelJSON>();

		String vendorName = "-";
		String companyName = "-";
		String contactNo = "-";
		String address = "-";
		String state = "-";
		String alternateNo = "-";
		String gstNo = "-";
		String emailId = "-";
		String description = "-";

		
		String mobileNoDB = null;
		int successRate = 0;
		int failureRate = 0;

		try {
			connection = DatabaseUtil.getDBConnection();

			for (int i = 0; i < arr.length(); i++) {

				vendorName = "-";
				companyName = "-";
				contactNo = "-";
				address = "-";
				state = "-";
				alternateNo = "-";
				gstNo = "-";
				emailId = "-";

			
				mobileNoDB = null;

				ExcelJSON xl = new ExcelJSON();
			
			
				// (json.has("status")
				if (arr.getJSONObject(i).has("VendorName")) {
					vendorName = arr.getJSONObject(i).getString("VendorName");
				} else {
					vendorName = "-";
				}

				if (arr.getJSONObject(i).has("CompanyName")) {
					companyName = arr.getJSONObject(i).getString("CompanyName");
				} else {
					companyName = "-";
				}

				if (arr.getJSONObject(i).has("ContactNo")) {
					contactNo = arr.getJSONObject(i).getString("ContactNo");
				} else {
					contactNo = "-";
				}
				
				if (arr.getJSONObject(i).has("Address")) {
					address = arr.getJSONObject(i).getString("Address");
				} else {
					address = "-";
				}
				
				if (arr.getJSONObject(i).has("State")) {
					state = arr.getJSONObject(i).getString("State");
				} else {
					state = "-";
				}

				if (arr.getJSONObject(i).has("AlternateNo")) {
					alternateNo = arr.getJSONObject(i).getString("AlternateNo");
				} else {
					alternateNo = "-";
				}

				if (arr.getJSONObject(i).has("GSTNo")) {
					gstNo = arr.getJSONObject(i).getString("GSTNo");
				} else {
					gstNo = "-";
				}
				if (arr.getJSONObject(i).has("EmailId")) {
					emailId = arr.getJSONObject(i).getString("EmailId");
				} else {
					emailId = "-";
				}
				if (arr.getJSONObject(i).has("Description")) {
					description = arr.getJSONObject(i).getString("Description");
				} else {
					description = "-";
				}


		

				String querySelect01 = QueryConstants.Ven_VERIFY_MOBILENO;
				PreparedStatement preparedStmt01 = connection.prepareStatement(querySelect01);
				preparedStmt01.setString(1,contactNo);
				preparedStmt01.setString(2,companyId);
				ResultSet rs01 = preparedStmt01.executeQuery();
				while (rs01.next()) {
				mobileNoDB = rs01.getString("contactNo");
			
				}
			



				if (mobileNoDB == null || mobileNoDB.equals("-")) {
		

					String querySelect=QueryConstants.Vendor_Insert;
					PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
					preparedStmt.setString(1,vendorName);
					preparedStmt.setString(2,companyName);
					preparedStmt.setString(3,address);
					preparedStmt.setString(4,state);
					preparedStmt.setString(5,contactNo);
					preparedStmt.setString(6,alternateNo);
					preparedStmt.setString(7,gstNo);
					preparedStmt.setString(8,emailId);
					preparedStmt.setString(9,companyId);
					preparedStmt.setString(10,description);
					preparedStmt.executeUpdate();
  

					
				} else {

					// xl.setEmployeeId("-");
					xl.setVendorName(vendorName);
					xl.setCompanyName(companyName);
					xl.setAddress(address);
					xl.setState(state);
					xl.setContactNo(contactNo);
					xl.setAlternateNo(alternateNo);					
					xl.setGstNo(gstNo);
					xl.setEmailId(emailId);
					xl.setCompanyId(companyId);
					xl.setDescription(description);
					
					if (mobileNoDB != null) {
						xl.setMobileNoDB("Mobile No Already Exist");
					
					} else {
						xl.setMobileNoDB("-");

					}
					xlList.add(xl);

				}

			} // for loop close
			connection.close();

		} catch (SQLException e) {

			e.printStackTrace();
		}
		return xlList;

	} // func close
	
	

	/*
	 * Function For Storing File Name
	 */

		public static void StoreProductFileName(ExcelJSON json) {
		
		Connection connection = null;
		  
		String productFileName=null;
		
	try {
		  
			connection = DatabaseUtil.getDBConnection();
		 	String querySelect0=ExcelQueryConstants.SELECT_PRODUCT_FILENAME;
		 	PreparedStatement preparedStmt0 = connection.prepareStatement(querySelect0);
		    preparedStmt0.setString(1,json.getCompanyId());
		    ResultSet rs0=preparedStmt0.executeQuery();
		    while(rs0.next()) {
		    	productFileName=rs0.getString("ProductFileName");
		    }
		    
		 	if(productFileName==null) {
		 		
		 
		 	productFileName=json.getProductFileName();
		 	ImportProductFileNew(productFileName,json.getCompanyId());
		 	
		 	}else {
		 		
		 	
		 	int productFileNameLength=productFileName.split(",").length;
		 	
		 	
		 	if(productFileNameLength>=5) {
		 		
		 		
		 		ArrayList<String> productFileNames = new ArrayList<>(Arrays.asList(productFileName.split(",")));      
		 		productFileNames.remove(0) ;
		     
		 		
		     	productFileNames.add(json.getProductFileName());
		 		
		     	String productFileNameAsString = String.join(",", productFileNames);
		       
		 		
		        
		        ImportProductFileNew(productFileNameAsString,json.getCompanyId());
		    	
			    
		 	}else {
		 		
		 		
		 		ImportProductFileOld(json.getProductFileName(),json.getCompanyId());
		 		
		 	}
		 	
		 	
		 	}
		    
		   
	    	    connection.close();	    
	    	   
		} catch (SQLException e) {

		e.printStackTrace();
		}

		}
		
		
		/*
		 * FUNCTION FOR STORING THE FILE NAME 
		 * IF FILENAME HAS NO VALUE YET 
		 * IF FILENAME LENGTH > 5
		 */
		private static void ImportProductFileNew(String productFileName, String companyId) {
			
			Connection connection = null;
			
			try {
			  
				connection = DatabaseUtil.getDBConnection();
				String querySelect1=ExcelQueryConstants.UPDATE_PRODUCT_FILENAME_WHOLE;
				PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
			    preparedStmt1.setString(1,productFileName);
			    preparedStmt1.setString(2,companyId);
			    preparedStmt1.executeUpdate();	
			    connection.close();	
			    
			}catch (SQLException e) {

			e.printStackTrace();
			}
			
			}

		
		
		/*
		 * FUNCTION FOR STORING THE FILE NAME
		 *  IF FILE NAME HAS VALUE ALREADY
		 *  IF FILE NAME LENGTH < 2
		 */
		private static void ImportProductFileOld(String productFileName, String companyId) {
			
			Connection connection = null;
			
			try {
			  
				connection = DatabaseUtil.getDBConnection();
				String querySelect1=ExcelQueryConstants.UPDATE_PRODUCT_FILENAME;
				PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
			    preparedStmt1.setString(1,productFileName);
			    preparedStmt1.setString(2,productFileName);
			    preparedStmt1.setString(3,companyId);
			    preparedStmt1.executeUpdate();	
			    connection.close();	
			    
			}catch (SQLException e) {

			e.printStackTrace();
			}
			
			}
		
		
		/*
		 * FUNCTION FOR GETTING STORED FILENAME FROM DB
		 */
		public static void GetStoredProductFileName(ExcelJSON json) {
			
			Connection connection = null;
				
				try {
				  
					connection = DatabaseUtil.getDBConnection();
				String querySelect1=ExcelQueryConstants.SELECT_PRODUCT_FILENAME;
				PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
				    preparedStmt1.setString(1,json.getCompanyId());
				    ResultSet rs=preparedStmt1.executeQuery();
				    while(rs.next()) {
				    json.setProductFileName(rs.getString("ProductFileName"));	
				    }
				    
				    connection.close();	
				 	
				}catch (SQLException e) {

				e.printStackTrace();
				}
				
				
				}


		/*
		* FUNCTION FOR UPLOADING DATA INTO DB
		*/
		public static ArrayList<ExcelJSON> UploadProductData(String companyId, JSONArray arr, String quantity, 
				String quantityLimit, String cgst, String sgst, String igst, String saleRate, String purchaseRate,String serviceTime) throws ClassNotFoundException, JSONException {

		Connection connection = null;
		ArrayList<ExcelJSON> xlList=new ArrayList <ExcelJSON>();
		List<String> productList=new ArrayList<String>();
		List<String> quantityArray = new ArrayList<String>(Arrays.asList(quantity.split(",")));
		List<String> quantityLimitArray = new ArrayList<String>(Arrays.asList(quantityLimit.split(",")));
		List<String> cgstArray = new ArrayList<String>(Arrays.asList(cgst.split(",")));
		List<String> sgstArray = new ArrayList<String>(Arrays.asList(sgst.split(",")));
		List<String> igstArray = new ArrayList<String>(Arrays.asList(igst.split(",")));
		List<String> saleRateArray = new ArrayList<String>(Arrays.asList(saleRate.split(",")));
		List<String> purchaseRateArray = new ArrayList<String>(Arrays.asList(purchaseRate.split(",")));
		List<String> serviceTimeArray = new ArrayList<String>(Arrays.asList(serviceTime.split(",")));
		
		
		
		
		
		String HSNCode="";
		String description="";
	

		 String productNameDB=null;


		try {
		connection = DatabaseUtil.getDBConnection();
		 

		  
		    String querySelect=ExcelQueryConstants.GET_PRODUCT_NAME;
		PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
		   preparedStmt.setString(1,companyId);
		   ResultSet rs=preparedStmt.executeQuery();
		   while(rs.next()){
			  
			   productList.add(rs.getString("ProductName"));
			  
			   
		   }
		   
	

		   for (int i = 0; i < arr.length(); i++)
		{
			 HSNCode="";
			 description="";
			 productNameDB=null;


		    ExcelJSON xl=new ExcelJSON();

		    if(arr.getJSONObject(i).has("HSNCode")){
		    HSNCode=arr.getJSONObject(i).getString("HSNCode");
		    }else{
		    	HSNCode="-";
		    }
		   
		    if(arr.getJSONObject(i).has("Description")){
		    	description=arr.getJSONObject(i).getString("Description");
		    }else{
		    	description="-";
		    }
		   
		    
		 

		
			
		    String productName=description=arr.getJSONObject(i).getString("ProductName");
		    
		    boolean validData;
		  
		    	validData=productList.contains(productName);
		    
		     if(validData == false ){
		   

		  	String querySelectProductInsert=QueryConstants.Product_Insert;
			PreparedStatement preparedStmtProductInsert = connection.prepareStatement(querySelectProductInsert);
			preparedStmtProductInsert.setString(1,productName);		
			preparedStmtProductInsert.setString(2,cgstArray.get(i)); //cgst
			preparedStmtProductInsert.setString(3,sgstArray.get(i)); //sgst
			preparedStmtProductInsert.setString(4,igstArray.get(i)); //igst
			preparedStmtProductInsert.setString(5,HSNCode); 
			preparedStmtProductInsert.setString(6,description);				
			preparedStmtProductInsert.setString(7,saleRateArray.get(i));		//salerate			
			preparedStmtProductInsert.setString(8,companyId);				//companyid
			preparedStmtProductInsert.setString(9,arr.getJSONObject(i).getString("ProductType"));			//producttype
			preparedStmtProductInsert.setString(10,quantityLimitArray.get(i));		//quantitylimit
			preparedStmtProductInsert.setString(11,arr.getJSONObject(i).getString("ProductCategory"));      //productcategory
			preparedStmtProductInsert.setString(12,quantityArray.get(i));				//quantity
			preparedStmtProductInsert.setString(13,purchaseRateArray.get(i));         //purchaserate
			preparedStmtProductInsert.setString(14,serviceTimeArray.get(i));  //servicetime
			preparedStmtProductInsert.executeUpdate();
				

			
			
				productList.add(productName);
		
		          }else {
		         
		          xl.setProductName(productName);

		          xlList.add(xl);
		       
		          }
		         

		     
		     } //for loop close
		        connection.close();

		} catch (SQLException e) {

		e.printStackTrace();
		}
		return xlList;



		} //func close



		
		
		/*
		 * Function For Storing File Name
		 */

			public static void StoreEmployeeFileName(ExcelJSON json) {
			
			Connection connection = null;
			  
			   String employeeFileName=null;
			
		try {
			  
				connection = DatabaseUtil.getDBConnection();
			 	String querySelect0=ExcelQueryConstants.SELECT_EMPLOYEE_FILENAME;
			 	PreparedStatement preparedStmt0 = connection.prepareStatement(querySelect0);
			    preparedStmt0.setString(1,json.getCompanyId());
			    ResultSet rs0=preparedStmt0.executeQuery();
			    while(rs0.next()) {
			    	employeeFileName=rs0.getString("EmployeeFileName");
			    }
			    
			 	if(employeeFileName==null) {
	
			 	employeeFileName=json.getEmployeeFileName();
			 	ImportEmployeeFileNew(employeeFileName,json.getCompanyId());
			 	
			 	}else {
			 		
			 
			 	int employeeFileNameLength=employeeFileName.split(",").length;
			 	
			 	
			 	if(employeeFileNameLength>=5) {
			 	
			 		
			 		
			 		ArrayList<String> employeeFileNames = new ArrayList<>(Arrays.asList(employeeFileName.split(",")));      
			 		employeeFileNames.remove(0) ;
			  
			 		
			     	employeeFileNames.add(json.getEmployeeFileName());
			 		
			     	String employeeFileNameAsString = String.join(",", employeeFileNames);
			    
			 		
			        
			        ImportEmployeeFileNew(employeeFileNameAsString,json.getCompanyId());
			    	
				    
			 	}else {
			 	
			 		
			 		ImportEmployeeFileOld(json.getEmployeeFileName(),json.getCompanyId());
			 		
			 	}
			 	
			 	
			 	}
			    
			   
		    	    connection.close();	    
		    	   
			} catch (SQLException e) {

			e.printStackTrace();
			}

			}
			
			
			/*
			 * FUNCTION FOR STORING THE FILE NAME 
			 * IF FILENAME HAS NO VALUE YET 
			 * IF FILENAME LENGTH > 5
			 */
			private static void ImportEmployeeFileNew(String employeeFileName, String companyId) {
				
				Connection connection = null;
				
				try {
				  
					connection = DatabaseUtil.getDBConnection();
					String querySelect1=ExcelQueryConstants.UPDATE_EMPLOYEE_FILENAME_WHOLE;
					PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
				    preparedStmt1.setString(1,employeeFileName);
				    preparedStmt1.setString(2,companyId);
				    preparedStmt1.executeUpdate();	
				    connection.close();	
				    
				}catch (SQLException e) {

				e.printStackTrace();
				}
				
				}

			
			
			/*
			 * FUNCTION FOR STORING THE FILE NAME
			 *  IF FILE NAME HAS VALUE ALREADY
			 *  IF FILE NAME LENGTH < 2
			 */
			private static void ImportEmployeeFileOld(String employeeFileName, String companyId) {
				
				Connection connection = null;
				
				try {
				  
					connection = DatabaseUtil.getDBConnection();
					String querySelect1=ExcelQueryConstants.UPDATE_EMPLOYEE_FILENAME;
					PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
				    preparedStmt1.setString(1,employeeFileName);
				    preparedStmt1.setString(2,employeeFileName);
				    preparedStmt1.setString(3,companyId);
				    preparedStmt1.executeUpdate();	
				    connection.close();	
				    
				}catch (SQLException e) {

				e.printStackTrace();
				}
				
				}
			
			
			/*
			 * FUNCTION FOR GETTING STORED FILENAME FROM DB
			 */
			public static void GetStoredEmployeeFileName(ExcelJSON json) {
				
				Connection connection = null;
					
					try {
					  
						connection = DatabaseUtil.getDBConnection();
					String querySelect1=ExcelQueryConstants.SELECT_EMPLOYEE_FILENAME;
					PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
					    preparedStmt1.setString(1,json.getCompanyId());
					    ResultSet rs=preparedStmt1.executeQuery();
					    while(rs.next()) {
					    json.setEmployeeFileName(rs.getString("EmployeeFileName"));	
					    }
					    
					    connection.close();	
					 	
					}catch (SQLException e) {

					e.printStackTrace();
					}
					
					
					}


			/*
			 * FUNCTION FOR UPLOADING DATA INTO DB
			 */
			public static ArrayList<ExcelJSON> UploadEmployeeData(String companyId, JSONArray arr)
					throws ClassNotFoundException, JSONException {

				Connection connection = null;
				ArrayList<ExcelJSON> xlList = new ArrayList<ExcelJSON>();
				List<String> roleList = new ArrayList<String>();
				String staffName = "-";
				String contactNo = "-";
				String salary = "-";
				String emailId = "-";
				String address = "-";
				String roleName = "-";
				String state = "-";
				String gender = "-";				
				String nationality = "-";
				String dob="-";
				
				String mobileNoDB = null;
				String emailIdDB=null;
				int successRate = 0;
				int employeeNo = 0;
				int failureRate = 0;
				

				try {
					connection = DatabaseUtil.getDBConnection();
					
					String querySelect1=ExcelQueryConstants.GET_ROLENAME;
					PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
					preparedStmt1.setString(1,companyId);
					   ResultSet rs1=preparedStmt1.executeQuery();
					   while(rs1.next()){
						   roleList.add(rs1.getString("roleName"));
					   }
					   

					for (int i = 0; i < arr.length(); i++) {

						staffName = "-";
						contactNo = "-";
						salary = "-";
						emailId = "-";
						address = "-";
						roleName = "-";
						state = "-";
						gender = "-";				
						nationality = "-";
						dob="-";
						

					
						mobileNoDB = null;
						emailIdDB=null;

						ExcelJSON xl = new ExcelJSON();
					
					
						// (json.has("status")
						if (arr.getJSONObject(i).has("EmployeeName")) {
							staffName = arr.getJSONObject(i).getString("EmployeeName");
						} else {
							staffName = "-";
						}

				
						if (arr.getJSONObject(i).has("ContactNo")) {
							contactNo = arr.getJSONObject(i).getString("ContactNo");
						} else {
							contactNo = "-";
						}
						if (arr.getJSONObject(i).has("Salary")) {
							salary = arr.getJSONObject(i).getString("Salary");
						} else {
							salary = "-";
						}
						if (arr.getJSONObject(i).has("Address")) {
							address = arr.getJSONObject(i).getString("Address");
						} else {
							address = "-";
						}
						
						if (arr.getJSONObject(i).has("Designation")) {
							roleName = arr.getJSONObject(i).getString("Designation");
						} else {
							roleName = "-";
						}

						if (arr.getJSONObject(i).has("State")) {
							state = arr.getJSONObject(i).getString("State");
						} else {
							state = "-";
						}

					    if(arr.getJSONObject(i).has("DOB(DD/MM/YYYY)")){
							dob=arr.getJSONObject(i).getString("DOB(DD/MM/YYYY)");
							}else{
							dob= "NULL";
							}

						if (arr.getJSONObject(i).has("Gender")) {
							gender = arr.getJSONObject(i).getString("Gender");
						} else {
							gender = "-";
						}
						if (arr.getJSONObject(i).has("Nationality")) {
							nationality = arr.getJSONObject(i).getString("Nationality");
						} else {
							nationality = "-";
						}
						if (arr.getJSONObject(i).has("EmailId")) {
							emailId = arr.getJSONObject(i).getString("EmailId");
						} else {
							emailId = "-";
						}


						

						String querySelect01 = ExcelQueryConstants.Staff_VERIFY_MOBILENO;
						PreparedStatement preparedStmt01 = connection.prepareStatement(querySelect01);
						preparedStmt01.setString(1,contactNo);
						preparedStmt01.setString(2,companyId);
						ResultSet rs01 = preparedStmt01.executeQuery();
						while (rs01.next()) {
						mobileNoDB = rs01.getString("contactNo");
					
						}
					


						String querySelect02 = ExcelQueryConstants.Staff_VERIFY_MAIL;
						PreparedStatement preparedStmt02 = connection.prepareStatement(querySelect02);
						preparedStmt02.setString(1,emailId);
						preparedStmt02.setString(2,companyId);
						ResultSet rs02= preparedStmt02.executeQuery();
						while (rs02.next()) {
							emailIdDB = rs02.getString("emailId");
						
						}
					

						  String roleNameCheck="-";

						if (mobileNoDB == null || mobileNoDB.equals("-") ||emailIdDB==null || emailIdDB.equals("-") ) {
							

							
							 if(roleList.contains(roleName)) {
							      roleNameCheck="ok";
							      
							      }else {
							    	  roleNameCheck="Error";
							   
							   
							      }

							 if(roleNameCheck=="ok") {
								 
								
									
									String driver = "com.mysql.jdbc.Driver";
									 String tictoksConnection = "jdbc:mysql://ec2-13-126-195-214.ap-south-1.compute.amazonaws.com:3306/EmployeeAttendance";
									String user = "root";
									 String password = "Employee@123";
								
									Class.forName(driver);
									Connection tictoksCon = DriverManager.getConnection(tictoksConnection, user, password);

								
									
									String querySelect = ExcelQueryConstants.EMP_INSERT_SELECT;
									PreparedStatement preparedStmt = tictoksCon.prepareStatement(querySelect);
									preparedStmt.setString(1,companyId);
									ResultSet rs = preparedStmt.executeQuery();
									while (rs.next()) {
										employeeNo = rs.getInt("EmployeeId");
									
									}
									
									int employeeId1 = employeeNo + 1;
									String employeeId = String.format("%03d", employeeId1);
									
									
									String querySelectINS = ExcelQueryConstants.INSERT_STAFF_TIC;
									PreparedStatement preparedStmtINS = tictoksCon.prepareStatement(querySelectINS);
									preparedStmtINS.setString(1, companyId);
									preparedStmtINS.setString(2, employeeId);
									preparedStmtINS.setString(3, staffName);// Firstname
									preparedStmtINS.setString(4," "); // Lastname
									preparedStmtINS.setString(5, emailId);
									preparedStmtINS.setString(6, contactNo); // Mobile NO
									preparedStmtINS.setString(7, address);
									preparedStmtINS.setString(8, dob);
									preparedStmtINS.setString(9, dob);
									preparedStmtINS.setString(10,"Permanent");
									preparedStmtINS.setString(11,"Staff");
									preparedStmtINS.setString(12, "Staff");
									preparedStmtINS.setString(13,"1");
									preparedStmtINS.setString(14,"Staff");
									preparedStmtINS.setString(15,"Chennai");
									preparedStmtINS.setString(16,"Weekend");
									preparedStmtINS.executeUpdate();
									tictoksCon.close();

									
										 
								String querySelectStaff=ExcelQueryConstants.Staff_Insert;
								PreparedStatement preparedStmtStaff = connection.prepareStatement(querySelectStaff);
								preparedStmtStaff.setString(1,staffName);
								preparedStmtStaff.setString(2,address);
								preparedStmtStaff.setString(3,state);
								preparedStmtStaff.setString(4,contactNo);
								preparedStmtStaff.setString(5,dob);
								preparedStmtStaff.setString(6,gender);			
								preparedStmtStaff.setString(7,nationality);
								preparedStmtStaff.setString(8,salary);
								preparedStmtStaff.setString(9,dob);
								preparedStmtStaff.setString(10,roleName);
								preparedStmtStaff.setString(11,emailId);
								preparedStmtStaff.setString(12,companyId);
								preparedStmtStaff.setString(13,employeeId);
								preparedStmtStaff.executeUpdate();
								
							 }
							 else {
							   
						         
						         
						          xl.setStaffName(staffName);
									xl.setAddress(address);
									xl.setState(state);
									xl.setContactNo(contactNo);
									xl.setDob(dob);		
									xl.setGender(gender);					
									xl.setNationality(nationality);
									xl.setSalary(salary);
									xl.setRoleName(roleNameCheck);
									xl.setEmailId(emailId);
									xl.setCompanyId(companyId);
									
						          xl.setEmailIdDB("-");
						          xl.setMobileNoDB("-");
						     
						        xlList.add(xl);
							 }
							
							
						} else {

							// xl.setEmployeeId("-");
							xl.setStaffName(staffName);
							xl.setAddress(address);
							xl.setState(state);
							xl.setContactNo(contactNo);
							xl.setDob(dob);		
							xl.setGender(gender);					
							xl.setNationality(nationality);
							xl.setSalary(salary);
							xl.setRoleName(roleName);
							xl.setEmailId(emailId);
							xl.setCompanyId(companyId);
							

							if (mobileNoDB != null) {
								xl.setMobileNoDB("Mobile No Already Exist");
							
							} else {
								xl.setMobileNoDB("-");

							}
							if (emailIdDB != null) {
								xl.setEmailIdDB("Email Id Already Exist");
								
							} else {
								xl.setEmailIdDB("-");

							}
							xlList.add(xl);

						}

					} // for loop close
					connection.close();

				} catch (SQLException e) {

					e.printStackTrace();
				}
				return xlList;

			} // func close
			

}
