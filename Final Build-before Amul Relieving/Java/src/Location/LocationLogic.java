package Location;

import java.sql.Connection;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import DBUtil.DatabaseUtil;

public class LocationLogic {
	/*
	 * Function for Adding Location
	 */
	public static LocationJSON AddLocation(LocationJSON json) {

		Connection connection = null;
		try {
			connection = DatabaseUtil.getDBConnection();

			String querySelect = LocationQuery.SELECT_LOCATION;
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1, json.getCompanyId());
			preparedStmt.setString(2, json.getLocation());
			preparedStmt.setString(3, json.getCompanyId());
			preparedStmt.setString(4, json.getFlatNo());
			preparedStmt.setString(5, json.getStreetName());
			preparedStmt.setString(6, json.getArea());
			preparedStmt.setString(7, json.getCity());
			preparedStmt.setString(8, json.getState());
			ResultSet rs = preparedStmt.executeQuery();

			if (rs.next()) {
						json.setStatus("DUPLICATE");
			} else {
				
				String querySelect1 = LocationQuery.ADD_LOCATION;
				PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
				preparedStmt1.setString(1, json.getCompanyId());
				preparedStmt1.setString(2, json.getLocation());
				preparedStmt1.setString(3, json.getFlatNo());
				preparedStmt1.setString(4, json.getStreetName());
				preparedStmt1.setString(5, json.getArea());
				preparedStmt1.setString(6, json.getCity());
				preparedStmt1.setString(7, json.getState());
				preparedStmt1.executeUpdate();
				
			}
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {
			DatabaseUtil.closeConnection(connection);
		}
		return json;
	}

	/*
	 * function for Deleting Location
	 */

	public static LocationJSON DeleteLocation(LocationJSON json) {

		Connection connection = null;
		try {
			connection = DatabaseUtil.getDBConnection();
			String locationData = null;

		
			String querySelectCheckLocation = LocationQuery.CHECK_LOCATION_STUD;
			PreparedStatement preparedStmtLocation = connection.prepareStatement(querySelectCheckLocation);
			preparedStmtLocation.setString(1, json.getCompanyId());
			preparedStmtLocation.setString(2, json.getLocation()+" "+json.getFlatNo()+" "+json.getStreetName()+" "+json.getArea()+" "+json.getCity()+" "+json.getState());
			ResultSet rsLocation = preparedStmtLocation.executeQuery();
			while (rsLocation.next()) {
				locationData = rsLocation.getString("Location");
			}

			if (locationData == null) {
				String querySelectCheckLocationstaff = LocationQuery.CHECK_LOCATION_STAFF;
				PreparedStatement preparedStmtLocationstaff = connection
						.prepareStatement(querySelectCheckLocationstaff);
				preparedStmtLocationstaff.setString(1, json.getCompanyId());
				preparedStmtLocationstaff.setString(2, json.getLocation()+" "+json.getFlatNo()+" "+json.getStreetName()+" "+json.getArea()+" "+json.getCity()+" "+json.getState());
				ResultSet rsLocationstaff = preparedStmtLocationstaff.executeQuery();
				while (rsLocationstaff.next()) {
					locationData = rsLocationstaff.getString("Location");
				}
				if (locationData == null) {
					String querySelect3 = LocationQuery.DELETE_LOCATION;
					PreparedStatement preparedStmt3 = connection.prepareStatement(querySelect3);
					preparedStmt3.setString(1, json.getCompanyId());
					preparedStmt3.setString(2, json.getLocation());
					preparedStmt3.setString(3, json.getFlatNo());
					preparedStmt3.setString(4, json.getStreetName());
					preparedStmt3.setString(5, json.getArea());
					preparedStmt3.setString(6, json.getCity());
					preparedStmt3.setString(7, json.getState());
					preparedStmt3.executeUpdate();
					
					json.setLocation("Deleted");
					
				} else {
					
					json.setLocation("NotDeleted");
				}
			} else {
				
				json.setLocation("NotDeleted");

			}
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {
			DatabaseUtil.closeConnection(connection);
		}

		return json;

	}
	/*
	 * function for Edit Location
	 */

	public static LocationJSON EditLocation(LocationJSON json) {

		Connection connection = null;
		try {
			connection = DatabaseUtil.getDBConnection();
			String oldLocation = "";
		

			String querySelect0 = LocationQuery.SEL_LOCATION_DUPLICATE;
			PreparedStatement preparedStmt0 = connection.prepareStatement(querySelect0);
			preparedStmt0.setString(1, json.getCompanyId());
			preparedStmt0.setString(2, json.getLocation());
			/*
			 * preparedStmt0.setString(3, json.getAddress());
			 * preparedStmt0.setString(4, json.getCity());
			 * preparedStmt0.setString(5, json.getState());
			 */
			ResultSet rs0 = preparedStmt0.executeQuery();
			while (rs0.next()) {
				oldLocation = rs0.getString("Location");
				
			}
		
			if (oldLocation.equals("") || json.getOldLocation().equals(json.getLocation())) {// second Condtion to update only name of Location
				
				String querySelect3 = LocationQuery.EDIT_LOCATION;
				PreparedStatement preparedStmt3 = connection.prepareStatement(querySelect3);
				preparedStmt3.setString(1, json.getLocation());
				preparedStmt3.setString(2, json.getFlatNo());
				preparedStmt3.setString(3, json.getStreetName());
				preparedStmt3.setString(4, json.getArea());
				preparedStmt3.setString(5, json.getCity());
				preparedStmt3.setString(6, json.getState());
				preparedStmt3.setString(7, json.getCompanyId());
				preparedStmt3.setString(8, json.getOldLocation());
				//preparedStmt3.setString(9, json.getOldFlatNo());
				//preparedStmt3.setString(10, json.getOldStreetName());
				//preparedStmt3.setString(11, json.getOldArea());
				//preparedStmt3.setString(12, json.getOldCity());
				//preparedStmt3.setString(13, json.getOldState());
				preparedStmt3.executeUpdate();

				//Updating location for Student
				String querySelectStud = LocationQuery.EDIT_LOCATION_STUD;
				PreparedStatement preparedStmtStud = connection.prepareStatement(querySelectStud);
				preparedStmtStud.setString(1, json.getLocation()+" "+json.getFlatNo()+" "+json.getStreetName()+" "+json.getArea()+" "+json.getCity()+" "+json.getState());
				//preparedStmtStud.setString(2, address);
				//preparedStmtStud.setString(3, json.getCity());
				//preparedStmtStud.setString(4, json.getState());
				preparedStmtStud.setString(2, json.getCompanyId());
				preparedStmtStud.setString(3, json.getOldLocation()+" "+json.getOldFlatNo()+" "+json.getOldStreetName()+" "+json.getOldArea()+" "+json.getOldCity()+" "+json.getOldState());
				preparedStmtStud.executeUpdate();
				
				//Updating location for Staff
				String querySelectStaff = LocationQuery.EDIT_LOCATION_STAFF;
				PreparedStatement preparedStmtStaff = connection.prepareStatement(querySelectStaff);
				preparedStmtStaff.setString(1, json.getLocation()+" "+json.getFlatNo()+" "+json.getStreetName()+" "+json.getArea()+" "+json.getCity()+" "+json.getState());
				//preparedStmtStud.setString(2, address);
				//preparedStmtStud.setString(3, json.getCity());
				//preparedStmtStud.setString(4, json.getState());
				preparedStmtStaff.setString(2, json.getCompanyId());
				preparedStmtStaff.setString(3, json.getOldLocation()+" "+json.getOldFlatNo()+" "+json.getOldStreetName()+" "+json.getOldArea()+" "+json.getOldCity()+" "+json.getOldState());
				preparedStmtStaff.executeUpdate();

				

			} else {
				
				json.setStatus("DUPLICATE");
			}
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {
			DatabaseUtil.closeConnection(connection);
		}

		return json;

	}
	/*
	 * function for Selecting Location list
	 */

	public static LocationJSON SelectLocationList(LocationJSON json) {

		ArrayList<LocationJSON> locationList = new ArrayList<LocationJSON>();

		Connection connection = null;
		try {
			connection = DatabaseUtil.getDBConnection();

		
			String querySelect3 = LocationQuery.SELECT_ALL_LOCATION;
			PreparedStatement preparedStmt3 = connection.prepareStatement(querySelect3);
			preparedStmt3.setString(1, json.getCompanyId());
			ResultSet rs3 = preparedStmt3.executeQuery();
			while (rs3.next()) {
				LocationJSON obj = new LocationJSON();
				obj.setLocation(rs3.getString("Location"));
				String address = rs3.getString("FlatNo") + " " + rs3.getString("StreetName") + " "
						+ rs3.getString("Area");
				obj.setAddress(address);
				obj.setFlatNo(rs3.getString("FlatNo"));
				obj.setStreetName(rs3.getString("StreetName"));
				obj.setArea(rs3.getString("Area"));
				obj.setState(rs3.getString("State"));
				obj.setCity(rs3.getString("City"));
				locationList.add(obj);
			}
			json.setLocationList(locationList);
			
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {
			DatabaseUtil.closeConnection(connection);
		}

		return json;

	}

}
