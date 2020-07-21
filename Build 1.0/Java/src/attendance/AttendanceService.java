package attendance;

import java.text.ParseException;


import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;



@Path(value="/attendance")
public class AttendanceService {
	
	  /*
	 * API for retrieving staff list 	
	 */
		  
    
    @POST
    @Produces(value="application/json" )
    @Path(value="/selectstaff")
    @Consumes(value="application/json")
    public Response selectstaff(AttendanceJSON json) throws ParseException {
    			    		    
    	AttendanceController staffList =new AttendanceController();
    	json=staffList.selectstaff(json);
    	
     	return Response.status(200).entity(json).build();
    }
    
	/*
	 * API for registering and adding new category	
	 */
		
		    @POST
		    @Produces(value="application/json" )
		    @Path(value="/addattendance")
		    @Consumes(value="application/json")
		 
		 public Response addattendance(AttendanceJSON json) throws ParseException {
		    
		    	AttendanceController exp=new AttendanceController();
		    	exp.addattendance(json);		
		    	
		     	return Response.status(200).entity(json).build();
	}

			  /*
			 * API for retrieving staff Attendancelist 	
			 */
				  
		    
		    @POST
		    @Produces(value="application/json" )
		    @Path(value="/StaffAttendance")
		    @Consumes(value="application/json")
		    public Response StaffAttendance(AttendanceJSON json) throws ParseException {
		    	    		    
		    	AttendanceController staffList =new AttendanceController();
		    	json=staffList.StaffAttendance(json);
		    	
		    	
		     	return Response.status(200).entity(json).build();
		    }  

			  /*
					 * API for retrieving Monthly Attendance
					 */
						  
				    
				    @POST
				    @Produces(value="application/json" )
				    @Path(value="/StaffMonthlyAttendance")
				    @Consumes(value="application/json")
				    public Response MonthlyAttendance(AttendanceJSON json) throws ParseException {
				    	
				    	AttendanceController staffList =new AttendanceController();
				    	json=staffList.MonthlyAttendance(json);
				    	
				    
				        return Response.status(200).entity(json).build();
				    }  
				    
				    /*
					 * API for retrieving Period Attendance
					 */
						  
				    
				    @POST
				    @Produces(value="application/json" )
				    @Path(value="/StaffPeriodAttendance")
				    @Consumes(value="application/json")
				    public Response PeriodAttendance(AttendanceJSON json) throws ParseException {
				    	
				    	AttendanceController staffList =new AttendanceController();
				    	json=staffList.PeriodAttendance(json);
				    	
				        
				        return Response.status(200).entity(json).build();
				    }  

}
