package login;

import java.io.File;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.ParseException;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;




@Path("/Login")
public class LoginWebservice {
	
private static final String SERVER_UPLOAD_LOCATION_FOLDER = "/home/ec2-user/Logo/";
	
	//private static final String SERVER_UPLOAD_LOCATION_FOLDER = "/home/lenovo/Documents/ReactJs/merchandise/public/";
	

	/*
	 * API CALL FOR LOGIN
	 */
	@POST
	@Path("/LoginCheck")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	public Response LoginCheck(LoginJSON json)
	     {

		
		LoginJSON login=new LoginJSON();
		login =LoginLogic.LoginCheck(json);
		
		
		return Response.status(200).entity(login).build();
		
	
	     }  
	/*
	 * API CALL FOR LOGIN
	 */
	@POST
	@Path("/LoginCheck1")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	public Response LoginCheck1(LoginJSON json)
	     {
	
		
		LoginJSON login=new LoginJSON();
		login =LoginLogic.LoginCheck1(json);
		
		
		return Response.status(200).entity(login).build();
		
	
	     }  
	
    /*
	 	 * API CALL FOR DAILY EXPENSE REPORT UPDATE
	 	 */
	 	@POST
	 	@Path("/UpdateStatus")
	 	@Consumes(value= {"application/json"})
	 	@Produces(value={"application/json"})
	 	public Response UpdateStatus(LoginJSON json)
	 	     {
	 	
	 		
	 		LoginJSON dailyExpenseList=new LoginJSON();
	 		dailyExpenseList =LoginLogic.UpdateStatus(json);
	 		
	 	
	 		return Response.status(200).entity(dailyExpenseList).build();
	 		
	 	
	 	     }  
	 	 /*
	 	 * API CALL FOR FILE UPLOAD
	 	 */
	 	
	 	  @POST
		   @Produces(value="application/json" )
		   @Path(value="/fileUpload")
		   @Consumes(value="application/json")

		public Response fileUpload(LoginJSON json) throws ParseException {
		
		  
		   	LoginLogic adm=new LoginLogic();
		   	adm.FileUpload(json);	
		
		    return Response.status(200).entity(json).build();
		}
		  

	 	  @POST
	 	    @Path("/UploadFile")
	 	    @Consumes(MediaType.MULTIPART_FORM_DATA)
	 	    public Response uploadFile(MultipartFormDataInput input) {
	 	 
	 	        String fileName = "";
	 	 
	 	        Map<String, List<InputPart>> formParts = input.getFormDataMap();
	 	  
	 	        List<InputPart> fileName1=formParts.get("newName");
	 	        List<InputPart> inPart = formParts.get("formData");
	 	      
	 	        for (InputPart inputPart : inPart) {
	 	 
	 	             try {
	 	 
	 	                // Retrieve headers, read the Content-Disposition header to obtain the original name of the file
	 	                MultivaluedMap<String, String> headers = inputPart.getHeaders();
	 	            
	 	                fileName = parseFileName(headers);
	 	 
	 	                // Handle the body of that part with an InputStream
	 	                InputStream istream = inputPart.getBody(InputStream.class,null);
	 	 
	 	                fileName = SERVER_UPLOAD_LOCATION_FOLDER + fileName;
	 	              
	 	                saveFile(istream,fileName);
	 	             
	 	              } catch (IOException e) {
	 	                e.printStackTrace();
	 	              }
	 	 
	 	            }
	 	 
	 	                String output = "File saved to server location : " + fileName;
	 	 
	 	        return Response.status(200).entity(output).build();
	 	    }
	 	  
	 	    // Parse Content-Disposition header to get the original file name
	 	    private String parseFileName(MultivaluedMap<String, String> headers) {
	 	 
	 	        String[] contentDispositionHeader = headers.getFirst("Content-Disposition").split(";");
	 	       
	 	        for (String name : contentDispositionHeader) {
	 	        	
	 	            if ((name.trim().startsWith("filename"))) {
	 	            	 
	 	            	 String[] tmp = name.split("=");
	 	                 
	 	                String fileName =  tmp[1].trim().replaceAll("\"","");
	 	               
	 	                return fileName;
	 	            }
	 	        }
	 	        return "randomName";
	 	    }
	 	   private void saveFile(InputStream uploadedInputStream,
	 		        String serverLocation) {
	 		 
	 		        try {
	 		            OutputStream outpuStream = new FileOutputStream(new File(serverLocation));
	 		            int read = 0;
	 		            byte[] bytes = new byte[1024];
	 		 
	 		            outpuStream = new FileOutputStream(new File(serverLocation));
	 		            while ((read = uploadedInputStream.read(bytes)) != -1) {
	 		                outpuStream.write(bytes, 0, read);
	 		            }
	 		            
	 		            
	 		            outpuStream.flush();
	 		            outpuStream.close();
	 		        } catch (IOException e) {
	 		 
	 		            e.printStackTrace();
	 		        }
	 		    }
	 	   
	 	  @POST
	        @Path("/downloadFile")
	       // @Produces(value="application/json" )
	        @Produces({ MediaType.APPLICATION_OCTET_STREAM})
	        
	      //  @Consumes({MediaType.APPLICATION_JSON,MediaType.APPLICATION_OCTET_STREAM})
	        public Response downloadFile(LoginJSON json) {
	       
	        //	FileUploadJSON json=new FileUploadJSON();
	          File file = new File("/home/ec2-user/Logo/"+json.getFileName());
	       
	            ResponseBuilder response = Response.ok((Object) file);
	            response.header("Content-Disposition",
	                "attachment; filename=\""+json.getFileName()+"\"");
	            return response.build();
	        }
}
