package gst;

import java.text.ParseException;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

@Path(value="/gst")

public class GSTService {
	 /*
	 * API for retrieving customer list 	
	 */
		  
    
    @POST
    @Produces(value="application/json" )
    @Path(value="/salereport")
    @Consumes(value="application/json")
    public Response salereport(GSTJSON json) throws ParseException {
    	    		    
    	GSTController saleList =new GSTController();
    	json=saleList.salereport(json);
    	
    	
     	return Response.status(200).entity(json).build();
    }
    /*
   	 * API for retrieving customer list 	
   	 */
   		  
       
       @POST
       @Produces(value="application/json" )
       @Path(value="/purchasereport")
       @Consumes(value="application/json")
       public Response purchasereport(GSTJSON json) throws ParseException {
        
       	GSTController purchaseList =new GSTController();
       	json=purchaseList.purchasereport(json);
       	
       
        	return Response.status(200).entity(json).build();
       }
       /*
      	 * API for retrieving customer list 	
      	 */
      		  
          
          @POST
          @Produces(value="application/json" )
          @Path(value="/businesstobusinessreport")
          @Consumes(value="application/json")
          public Response businesstobusinessreport(GSTJSON json) throws ParseException {
          	    		    
          	GSTController businesstobusinessList =new GSTController();
          	json=businesstobusinessList.businesstobusinessreport(json);
          	
          
           	return Response.status(200).entity(json).build();
          }
          /*
        	 * API for retrieving customer list 	
        	 */
        		  
            
            @POST
            @Produces(value="application/json" )
            @Path(value="/businesstocustomerreport")
            @Consumes(value="application/json")
            public Response businesstocustomerreport(GSTJSON json) throws ParseException {
            	 
            	GSTController businesstocustomerList =new GSTController();
            	json=businesstocustomerList.businesstocustomerreport(json);
            	
            	
             	return Response.status(200).entity(json).build();
            }
}
