package Excel;

import java.io.IOException;


import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.json.stream.JsonParser;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;


import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;
import org.json.JSONArray;
import org.json.JSONObject;

import com.fasterxml.jackson.annotation.JsonSubTypes.Type;


@Path(value="/Excel")
public class ExcelWebservice {
	
	
	/*
	 * API FOR STORING THE FILENAME INTO DATABASE ON DOWNLOAD (Export)
	 */
	
	@POST
	@Path("/ExportCustomerFile")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	
	public Response importcustomerfile(ExcelJSON json) throws IOException, SQLException, ClassNotFoundException, Exception {
	
	
	ExcelJSON initialJson=new ExcelJSON();
	ExcelLogic.StoreCustomerFileName(json);
		return Response.status(200).entity(initialJson).build();

	}
	
	
	/*
	 * API FOR GETTING THE FILENAME FROM DATABASE
	 */
	
	@POST
	@Path("/GetCustomerFileName")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	
	public Response getfilename(ExcelJSON json) throws IOException, SQLException, ClassNotFoundException, Exception {
	

	ExcelJSON initialJson=new ExcelJSON();
	ExcelLogic.GetStoredCustomerFileName(json);
		return Response.status(200).entity(json).build();

	}
	
	
	@POST
	@Path("/UploadCustomerData")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	
	public Response uploadCustomerData(String data) throws IOException, SQLException, ClassNotFoundException, Exception {
	
	
	ArrayList<ExcelJSON>returnXl=new ArrayList<ExcelJSON>();
	ExcelJSON exceljson=new ExcelJSON();
	JSONObject json =new JSONObject(data);
	
	String companyId=(String) json.get("companyId");

	

	JSONArray arr = json.getJSONArray("testlist");
	
	returnXl=ExcelLogic.UploadCustomerData(companyId,arr);
	exceljson.setReturnXl(returnXl);
	
	for(ExcelJSON s1:returnXl) {

	}
	
	
		return Response.status(200).entity(exceljson).build();

	}
	
	

	

	/*
	 * API FOR STORING THE FILENAME INTO DATABASE ON DOWNLOAD (Export)
	 */
	
	@POST
	@Path("/ExportVendorFile")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	
	public Response importvendorfile(ExcelJSON json) throws IOException, SQLException, ClassNotFoundException, Exception {
	
	
	ExcelJSON initialJson=new ExcelJSON();
	ExcelLogic.StoreVendorFileName(json);
		return Response.status(200).entity(initialJson).build();

	}
	
	
	/*
	 * API FOR GETTING THE FILENAME FROM DATABASE
	 */
	
	@POST
	@Path("/GetVendorFileName")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	
	public Response getVendorfilename(ExcelJSON json) throws IOException, SQLException, ClassNotFoundException, Exception {
	
	ExcelJSON initialJson=new ExcelJSON();
	ExcelLogic.GetStoredVendorFileName(json);
		return Response.status(200).entity(json).build();

	}
	
	
	@POST
	@Path("/UploadVendorData")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	
	public Response uploadVendorData(String data) throws IOException, SQLException, ClassNotFoundException, Exception {
	
	ArrayList<ExcelJSON>returnXl=new ArrayList<ExcelJSON>();
	ExcelJSON exceljson=new ExcelJSON();
	JSONObject json =new JSONObject(data);
	
	String companyId=(String) json.get("companyId");
	
	JSONArray arr = json.getJSONArray("testlist");
	
	returnXl=ExcelLogic.UploadVendorData(companyId,arr);
	exceljson.setReturnXl(returnXl);
	
	for(ExcelJSON s1:returnXl) {

	}
	
	
		return Response.status(200).entity(exceljson).build();

	}
	
	
	/*
	 * API FOR STORING THE FILENAME INTO DATABASE ON DOWNLOAD (Export)
	 */
	
	@POST
	@Path("/ExportProductFile")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	
	public Response importproductfile(ExcelJSON json) throws IOException, SQLException, ClassNotFoundException, Exception {
	
	ExcelJSON initialJson=new ExcelJSON();
	ExcelLogic.StoreProductFileName(json);
		return Response.status(200).entity(initialJson).build();

	}
	
	
	/*
	 * API FOR GETTING THE FILENAME FROM DATABASE
	 */
	
	@POST
	@Path("/GetProductFilename")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	
	public Response getproductfilename(ExcelJSON json) throws IOException, SQLException, ClassNotFoundException, Exception {
	
	
	ExcelJSON initialJson=new ExcelJSON();
	ExcelLogic.GetStoredProductFileName(json);
		return Response.status(200).entity(json).build();

	}
	
	
	@POST
	@Path("/UploadProductData")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	
	public Response uploadProductData(String data) throws IOException, SQLException, ClassNotFoundException, Exception {
	

	ArrayList<ExcelJSON>returnXl=new ArrayList<ExcelJSON>();
	ExcelJSON exceljson=new ExcelJSON();
	JSONObject json =new JSONObject(data);
	
	String companyId=(String) json.get("companyId");
	

	JSONArray arr = json.getJSONArray("productNameList");
	
	String quantity=(String) json.get("quantity");
	
	
	String quantityLimit=(String) json.get("quantityLimit");

	
	String cgst=(String) json.get("cgst");

	
	String sgst=(String) json.get("sgst");

	
	String igst=(String) json.get("igst");
	
	
	String saleRate=(String) json.get("saleRate");
	
	
	String purchaseRate=(String) json.get("purchaseRate");
	
	String serviceTime=(String) json.get("serviceTime");
	
	
	returnXl=ExcelLogic.UploadProductData(companyId,arr,quantity,quantityLimit,cgst,sgst,igst,saleRate,purchaseRate,serviceTime);
	exceljson.setReturnXl(returnXl);
	
	for(ExcelJSON s1:returnXl) {
	
	}
	
	
		return Response.status(200).entity(exceljson).build();

	}
	
	
	
	/*
	 * API FOR STORING THE FILENAME INTO DATABASE ON DOWNLOAD (Export)
	 */
	
	@POST
	@Path("/ExportEmployeeFile")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	
	public Response importemployeefile(ExcelJSON json) throws IOException, SQLException, ClassNotFoundException, Exception {
	

	ExcelJSON initialJson=new ExcelJSON();
	ExcelLogic.StoreEmployeeFileName(json);
		return Response.status(200).entity(initialJson).build();

	}
	
	
	/*
	 * API FOR GETTING THE FILENAME FROM DATABASE
	 */
	
	@POST
	@Path("/GetEmployeeFilename")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	
	public Response getemployeefilename(ExcelJSON json) throws IOException, SQLException, ClassNotFoundException, Exception {
	

	ExcelJSON initialJson=new ExcelJSON();
	ExcelLogic.GetStoredEmployeeFileName(json);
		return Response.status(200).entity(json).build();

	}
	
	

	@POST
	@Path("/UploadEmployeeData")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	
	public Response uploadEmployeeData(String data) throws IOException, SQLException, ClassNotFoundException, Exception {
	

	ArrayList<ExcelJSON>returnXl=new ArrayList<ExcelJSON>();
	ExcelJSON exceljson=new ExcelJSON();
	JSONObject json =new JSONObject(data);
	
	String companyId=(String) json.get("companyId");

	JSONArray arr = json.getJSONArray("testlist");
	
	returnXl=ExcelLogic.UploadEmployeeData(companyId,arr);
	exceljson.setReturnXl(returnXl);
	
	for(ExcelJSON s1:returnXl) {
	
	}
	
	
		return Response.status(200).entity(exceljson).build();

	}
	
	

	
	
	
	

}
