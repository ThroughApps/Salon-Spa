package cashreconcilation;

import java.text.ParseException;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;


@Path(value="/CashReconcilation")
public class CashReconcilationService {
	/*
	 * API for registering and adding new CashReconcilation	
	 */
		
		    @POST
		    @Produces(value="application/json" )
		    @Path(value="/addCashReconcilation")
		    @Consumes(value="application/json")
		 
		 public Response addCashReconcilation(CashReconcilationJSON json) throws ParseException {
		    
		    	CashReconcilationController adm=new CashReconcilationController();
		    	adm.addCashReconcilation(json);		
		    
		     	return Response.status(200).entity(json).build();
	}
}
