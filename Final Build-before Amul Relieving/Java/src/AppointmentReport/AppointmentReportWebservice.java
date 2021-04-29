package AppointmentReport;

import java.text.ParseException;
import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import Appointments.AppointmentsJSON;
import Appointments.AppointmentsLogic;

@Path(value="/AppointmentReport")
public class AppointmentReportWebservice {

	
	/*
	 * API FOR GETTING FUTURE APPOINTMENT
	 */
		
		    @POST
		    @Produces(value="application/json" )
		    @Path(value="/GetFutureAppointment")
		    @Consumes(value="application/json")
		 
		 public Response GetFutureAppointment(AppointmentReportJSON json) throws ParseException {
		    	
		    	
		    	ArrayList<AppointmentReportJSON> appointmentFutureData=new ArrayList<AppointmentReportJSON>();
		    	appointmentFutureData=AppointmentReportLogic.GetFutureAppointment(json);		
		    
		     	return Response.status(200).entity(appointmentFutureData).build();
	}
		    
		    
		    /*
			 * API FOR GETTING  APPOINTMENT HISTORY 
			 */
				
				    @POST
				    @Produces(value="application/json" )
				    @Path(value="/GetAppointmentHistory")
				    @Consumes(value="application/json")
				 
				 public Response GetAppointmentHistory(AppointmentReportJSON json) throws ParseException {
				  
				    	ArrayList<AppointmentReportJSON> appointmentHistoryData=new ArrayList<AppointmentReportJSON>();
				    	appointmentHistoryData=AppointmentReportLogic.GetAppointmentHistory(json);		
				    	
				     	return Response.status(200).entity(appointmentHistoryData).build();
			}
		    
}
