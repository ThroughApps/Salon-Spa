package Location;

public interface LocationQuery {
	String ADD_LOCATION = "Insert into LocationTable(CompanyId,Location , FlatNo, StreetName, Area, City ,State) values( ? , ? , ? , ? , ? , ? , ?)";

	String SELECT_LOCATION = "Select Location ,FlatNo from LocationTable where ( CompanyId= ? and Location = ? ) or (CompanyId= ? and FlatNo = ? and StreetName =? and Area = ? and City = ? and State = ?)";

	String DELETE_LOCATION = "Delete from LocationTable  where CompanyId= ? and Location = ? and FlatNo = ? and StreetName =? and Area = ? and City = ? and State = ? ";

	String EDIT_LOCATION = "Update LocationTable set Location = ? ,FlatNo = ? , StreetName =? , Area = ? , City=? , State =? where CompanyId= ? and Location = ? ";

	String EDIT_LOCATION_STUD = "Update StudentTable set Location = ? where CompanyId= ? and Location = ? and status='0' ";

	String EDIT_LOCATION_STAFF = "Update EmployeeTable set Location = ?  where CompanyId= ? and Location = ? and status='0' ";

	
	String SELECT_ALL_LOCATION = "Select Location,FlatNo,StreetName,Area,State,City from LocationTable where CompanyId= ? ";

	String CHECK_LOCATION_STUD="SELECT Location FROM StudentTable WHERE CompanyId = ? AND Location = ? and status='0' ";

	String CHECK_LOCATION_STAFF="SELECT Location FROM EmployeeTable WHERE CompanyId = ? AND Location = ? and status='0'";

	String SEL_LOCATION_DUPLICATE="Select Location ,FlatNo from LocationTable where  CompanyId= ? and Location = ? ";

}
