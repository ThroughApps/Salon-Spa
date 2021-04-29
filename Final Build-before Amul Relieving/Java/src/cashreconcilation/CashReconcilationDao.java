package cashreconcilation;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


import DBUtil.DatabaseUtil;

public class CashReconcilationDao {

	public CashReconcilationJSON addCashReconcilation(CashReconcilationJSON json) {
		// TODO Auto-generated method stub
		Connection connection=null;
		String totalCash=null;
		try {
			connection=DatabaseUtil.getDBConnection();
			if(json.getUserStatus().equals("No")){				
			
				String querySelect=CashReconcilationQueryConstants.Sale_Total_Cash;
				PreparedStatement prepareStmnt=connection.prepareStatement(querySelect);
				prepareStmnt.setString(1,json.getDate());
				prepareStmnt.setString(2,json.getCompanyId());
				ResultSet rs=prepareStmnt.executeQuery();	
				while(rs.next()) {
					totalCash=rs.getString("totalCash");
				}
				if(totalCash.equals(json.getTotalAmount())) {
					String querySelect1=CashReconcilationQueryConstants.Insert_Cash_Details;
					PreparedStatement preparestmnt1=connection.prepareStatement(querySelect1);
					preparestmnt1.setString(1, json.getCompanyId());
					preparestmnt1.setString(2,json.getDate());
					preparestmnt1.setString(3, json.getDenomination());
					preparestmnt1.setString(4, json.getTotalAmount());
					preparestmnt1.executeUpdate();
			}else {
				json.setStatus("Not_Equal");
			}
				
				
			}else if(json.getUserStatus().equals("Yes")) {
				String querySelect1=CashReconcilationQueryConstants.Insert_Cash_Details;
				PreparedStatement preparestmnt1=connection.prepareStatement(querySelect1);
				preparestmnt1.setString(1, json.getCompanyId());
				preparestmnt1.setString(2,json.getDate());
				preparestmnt1.setString(3, json.getDenomination());
				preparestmnt1.setString(4, json.getTotalAmount());
				preparestmnt1.executeUpdate();
			}
			connection.close();
			
		}catch (SQLException e) {
		e.printStackTrace();
		}finally {
			DatabaseUtil.closeConnection(connection);
		}
		return json;
	}

}
