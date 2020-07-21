package DBUtil;

import java.sql.Connection;



import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;


public class DatabaseUtil {
	public static Connection getDBConnection() {
		Connection connection = null;
        
        try {
	        Context init = new InitialContext();
	        Context ctx = (Context) init.lookup(QueryConstants.DB_CONTEXT_LOOKUP_NAME);
	        DataSource ds = (DataSource) ctx.lookup(QueryConstants.DB_LOOKUP_NAME);
	        connection = ds.getConnection();
	        ctx.close();
        } catch (Exception e) {
        	e.printStackTrace();
        }
        
        return connection;
	}
	
	public static void closeConnection(Connection connection) {
		try {
			if(connection != null) {
				connection.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
