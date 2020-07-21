package inventoryreport;

import java.text.ParseException;
import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import master.MasterController;
import master.MasterJSON;

@Path(value="/InventoryReport")
public class InventoryReportWebservice {

	
	/*
	 * API FOR AVAILABLE INVENTORY REPORT
	 */
		
		    @POST
		    @Produces(value="application/json" )
		    @Path(value="/AvailableStockReport")
		    @Consumes(value="application/json")
		 
		 public Response AvailableStockREPORT(InventoryReportJSON json) throws ParseException {
		    	
		    	ArrayList <InventoryReportJSON> reportDataList=new ArrayList <InventoryReportJSON>();
		    	reportDataList=InventoryReportLogic.GetAvailableStock(json);
		    
		     	return Response.status(200).entity(reportDataList).build();
	}
	
			/*
			 * API FOR UPDATING  INVENTORY FOR OWN PRODUCTS 
			 */
				
				    @POST
				    @Produces(value="application/json" )
				    @Path(value="/ProductUpdate")
				    @Consumes(value="application/json")
				 
				 public Response UpdatingOwnProducts(InventoryReportJSON json) throws ParseException {
				    
				    	json=InventoryReportLogic.UpdateOwnProductsInventory(json);
				    	
				     	return Response.status(200).entity(json).build();
			}
	
			/*
			 * API FOR GENERATING INVENTORY SUMMARY REPORT
			 */
						
					@POST
					@Produces(value="application/json" )
					@Path(value="/InventorySummaryReport")
					@Consumes(value="application/json")
						 
				public Response InventorySummaryReport(InventoryReportJSON json) throws ParseException {
					
						ArrayList <InventoryReportJSON> reportDataList=new ArrayList <InventoryReportJSON>();
						reportDataList=InventoryReportLogic.InventorySummaryReport(json);
						
						return Response.status(200).entity(reportDataList).build();
					}
			
	
	
}
