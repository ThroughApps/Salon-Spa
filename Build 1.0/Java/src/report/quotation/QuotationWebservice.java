package report.quotation;

import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;



@Path(value="/QuotationReport")
public class QuotationWebservice {

	
	/*
	 * API CALL FOR DELETING DATA IN QUOTAION 
	 * WITH GST
	 */
	@POST
	@Path("/DeleteGSTQuotationReport")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	public Response DailyPurchaseReport(QuotationJSON json)
	     {
	
		
		QuotationJSON deletedata=new  QuotationJSON();
		json.setTableName("GSTQuotationTable");
		deletedata =QuotationLogic.DeleteReport(json);
		
		return Response.status(200).entity(deletedata).build();
		
	
	     }   
	
	
	/*
	 * API CALL FOR DELETING DATA IN QUOTAION 
	 * WITHOUT GST
	 */
	@POST
	@Path("/DeleteWithoutGSTQuotationReport")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	public Response DeleteWithoutGSTQuotationReport(QuotationJSON json)
	     {
		
		
		QuotationJSON deletedata=new  QuotationJSON();
		json.setTableName("WithoutGSTQuotationTable");
		deletedata =QuotationLogic.DeleteReport(json);
		
		return Response.status(200).entity(deletedata).build();
		
	
	     }    
	
	 	
	 	/*
	 	 * API CALL FOR VIEWING DATA IN QUOTAION 
	 	 * WITH GST
	 	 */
	 	@POST
	 	@Path("/ViewGSTQuotationReport")
	 	@Consumes(value= {"application/json"})
	 	@Produces(value={"application/json"})
	 	public Response ViewGSTQuotationReport(QuotationJSON json) {
	 	    
	 	
	 		
	 		ArrayList <QuotationJSON> quotationDataList=new ArrayList <QuotationJSON>();
	 		quotationDataList =QuotationLogic.ViewGSTReport(json);
	 		
	 		return Response.status(200).entity(quotationDataList).build();
	 		
	 	
	 	     }       
	
	
		/*
	 	 * API CALL FOR VIEWING DATA IN QUOTAION 
	 	 * WITH GST
	 	 */
	 	@POST
	 	@Path("/ViewWithoutGSTQuotationReport")
	 	@Consumes(value= {"application/json"})
	 	@Produces(value={"application/json"})
	 	public Response ViewWithoutGSTQuotationReport(QuotationJSON json) {
	 	    
	 		
	 		
	 		ArrayList <QuotationJSON> quotationDataList=new ArrayList <QuotationJSON>();
	 		quotationDataList =QuotationLogic.ViewWithoutGSTReport(json);
	 		
	 	
	 		return Response.status(200).entity(quotationDataList).build();
	 		
	 	
	 	     }   
	
}