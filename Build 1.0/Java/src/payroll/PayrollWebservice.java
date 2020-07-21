package payroll;

import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;


@Path(value="/Payroll")
public class PayrollWebservice {

	
	/*
	 * API CALL FOR EMPLOYEE DETAILS
	 */
	@POST
	@Path("/StaffDetails")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	public Response StaffDetails(PayrollJSON json)
	     {
		
		
		ArrayList <PayrollJSON> empDetailList=new ArrayList <PayrollJSON>();
		empDetailList =PayrollLogic.GetEmpDetaiils(json);
		
		
		return Response.status(200).entity(empDetailList).build();
		
	
	     }   
	
	
	 	/*
	 	 * API CALL FOR INSERTING SALARY
	 	 */
	 	@POST
	 	@Path("/addsalary")
	 	@Consumes(value= {"application/json"})
	 	@Produces(value={"application/json"})
	 	public Response addsalary(PayrollJSON json)
	 	     {
	 	
	 		
	 		PayrollJSON salaryData=new PayrollJSON();
	 		salaryData =PayrollLogic.AddSalary(json);
	 		
	 		
	 		return Response.status(200).entity(salaryData).build();
	 		
	 	
	 	     } 
	
	
	 	/*
	 	 * API CALL FOR SALARY REPORT
	 	 */
	 	@POST
	 	@Path("/salaryreport")
	 	@Consumes(value= {"application/json"})
	 	@Produces(value={"application/json"})
	 	public Response salaryreport(PayrollJSON json)
	 	     {
	 	
	 		
	 	
	 		ArrayList <PayrollJSON> salaryList=new ArrayList <PayrollJSON>();
	 		salaryList =PayrollLogic.SalaryReport(json);
	 		
	 		
	 		return Response.status(200).entity(salaryList).build();
	 		
	 	
	 	     } 
	
	 	
	 	/*
	 	 * API CALL FOR SALARY REPORT DELETE
	 	 */
	 	@POST
	 	@Path("/salaryreportDelete")
	 	@Consumes(value= {"application/json"})
	 	@Produces(value={"application/json"})
	 	public Response salaryreportDelete(PayrollJSON json)
	 	     {
	 		
	 		
	 	
	 		PayrollJSON salaryData=new PayrollJSON();
	 		salaryData =PayrollLogic.SalaryReportDelete(json);
	 		
	 		
	 		return Response.status(200).entity(salaryData).build();
	 		
	 	
	 	     } 
	 	
		
	 	/*
	 	 * API CALL FOR SALARY REPORT DELETE
	 	 */
	 	@POST
	 	@Path("/salaryreportView")
	 	@Consumes(value= {"application/json"})
	 	@Produces(value={"application/json"})
	 	public Response salaryreportView(PayrollJSON json)
	 	     {
	 		
	 		
	 	
	 		ArrayList <PayrollJSON> salaryList=new ArrayList <PayrollJSON>();
	 		salaryList =PayrollLogic.SalaryReportView(json);
	 		
	 	
	 		return Response.status(200).entity(salaryList).build();
	 		
	 	
	 	     } 
	 	
	 	
	 	
	 	
}