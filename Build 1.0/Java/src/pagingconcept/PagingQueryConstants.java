
package pagingconcept;
public interface PagingQueryConstants {

	String SELECT_EMP_ID = "SELECT EmployeeId,CONCAT (FirstName,' ',LastName) AS Name ,Type,"
			+ "Department,Role FROM EmployeeTable WHERE CompanyId = ? AND Status = '0' AND Role <> 'Propertier' limit ? , ? ";

}


