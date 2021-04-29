package Location;

import java.text.ParseException;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;


@Path(value = "/LocationAPI")
public class LocationWebService {
	@POST
	@Path(value = "/AddLocation")
	@Consumes(value = { "application/json" })
	@Produces(value = { "application/json" })
	public Response AddLocation(LocationJSON json) {
		
		json = LocationLogic.AddLocation(json);	
		return Response.status(200).entity(json).build();
	}

	
	/*
	 * API call for Selecting Location
	 */

	@POST
	@Path(value = "/SelectLocationList")
	@Consumes(value = { "application/json" })
	@Produces(value = { "application/json" })
	public Response SelectLocationList(LocationJSON json) throws ParseException {
		
		json=LocationLogic.SelectLocationList(json);	
		return Response.status(200).entity(json).build();

	}
	/*
	 * API call for deleting Location
	 */

	@POST
	@Path(value = "/DeleteLocation")
	@Consumes(value = { "application/json" })
	@Produces(value = { "application/json" })
	public Response DeleteLocation(LocationJSON json) throws ParseException {
	
		json=LocationLogic.DeleteLocation(json);	
		return Response.status(200).entity(json).build();

	}
	/*
	 * API call for Editing Location
	 */

	@POST
	@Path(value = "/EditLocation")
	@Consumes(value = { "application/json" })
	@Produces(value = { "application/json" })
	public Response EditLocation(LocationJSON json) throws ParseException {
	
		json=LocationLogic.EditLocation(json);	
		return Response.status(200).entity(json).build();

	}
}
