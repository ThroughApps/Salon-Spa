package pagingconcept;
import java.util.ArrayList;


import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;



@Path(value="/paging")
public class PagingWebservice {

	
	/*
	 * API CALL FOR PAGING CONCEPT TESTING
	 */
	@POST
	@Path("/pagingtesting")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	public Response pagingtesting(PagingJSON json)
	     {
	
		ArrayList <PagingJSON> pagingList=new ArrayList <PagingJSON>();
		pagingList =PagingLogic.PagingTesting(json);

		return Response.status(200).entity(pagingList).build();
		
	     }  
	
	
	
	
	
}
