package login;

import java.io.InputStream;



import javax.ws.rs.FormParam;
 
import org.jboss.resteasy.annotations.providers.multipart.PartType;
public class MyMultipartForm {
	  @FormParam("file")
	    @PartType("image/png")
	    private InputStream file_input;
	 
	    public InputStream getFile_input() {
	        return file_input;
	    }
	 
	    public void setFile_input(InputStream file_input) {
	        this.file_input = file_input;
	    }
}
