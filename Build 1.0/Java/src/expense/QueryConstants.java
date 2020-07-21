package expense;

public interface QueryConstants {
  
	
	String Expense_Insert ="insert into ExpenseTable(categoryName,userName,amount,companyId,date) VALUES(?,?,?,?,now())";
	
	String Category_Insert ="insert into Category(categoryName,companyId,categoryDate) VALUES(?,?,now())";
	
	String User_Insert ="insert into UserTable(userName,contactNo,description,companyId) VALUES(?,?,?,?)";
	
	String User_VERIFY="select contactNo from UserTable where contactNo=? and status='0' and companyId= ? ";
	
	String Category_VERIFY="select categoryName from Category where categoryName=? and status='0' and companyId= ? ";
	
	String Expense_Category_VERIFY="select categoryName from ExpenseTable where categoryName=? and status='0' and companyId=? ";
	
	String Category_Report="select categoryId,categoryName,categoryDate from Category where status='0' and companyId= ? ";
	
	String User_Report="select userId,userName,contactNo,description from UserTable where status='0' and companyId= ? ";
	
	String Expense_Report="select expenseId,categoryName,userName,amount,date from ExpenseTable where status='0' and companyId= ?";
	
	String DELETE_CATEGORY = "UPDATE Category SET Status ='1' WHERE categoryName = ? and companyId=? ";
	
	String DELETE_USER = "UPDATE UserTable SET Status ='1' WHERE userName = ? and companyId= ?";
	
	String DELETE_EXPENSE = "UPDATE ExpenseTable SET Status ='1' WHERE categoryName = ? and companyId= ? ";
}
