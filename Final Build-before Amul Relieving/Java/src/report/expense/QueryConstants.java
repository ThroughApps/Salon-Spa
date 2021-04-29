package report.expense;

public interface QueryConstants {


	//--------QUERY FOR DAILY EXPENSE REPORT--------------//
	
	String DAILY_EXP_REPORT = "SELECT *FROM ExpenseTable WHERE date(DATE) = ? and status='0' and companyId= ? ";
	
	String DAILY_EXP_REPORT_DEL ="UPDATE ExpenseTable SET Status ='1' WHERE expenseId = ?  and companyId = ?"; 
	String DAILY_EXP_REPORT_UPDATE = "UPDATE ExpenseTable SET expenseId = ? , CategoryName = ? ,Username = ? , "
			+"Amount = ? , Date = ? WHERE  expenseId = ? AND CategoryName = ? AND Username = ? AND Amount = ? AND Date = ? and companyId= ?";

	//--------QUERY FOR MONTHLY EXPENSE REPORT--------------//
	
	String MONTHLY_EXP_REPORT = "SELECT *FROM ExpenseTable WHERE month(DATE) = ?  and status='0' and companyId= ? ";

	//--------QUERY FOR YEARLY EXPENSE REPORT--------------//
	
	//String YEARLY_EXP_REPORT = " SELECT *FROM ExpenseTable WHERE year(DATE) = ?  and status='0' and companyId= ? ";

	
			String YEARLY_EXP_REPORT = " SELECT *FROM ExpenseTable WHERE date(DATE) BETWEEN ? AND ?  and status='0' and companyId= ? ";

	//--------QUERY FOR DATE_WISE EXPENSE REPORT--------------//
	
	String DATE_WISE_EXP_REPORT = "SELECT *FROM ExpenseTable WHERE date(DATE) BETWEEN ? AND ?  and status='0' and companyId= ? ";

	String MONTHLY_EXP_USERNAME_SELECT="SELECT DISTINCT userName FROM ExpenseTable WHERE month(Date) = ?  and status='0' AND CompanyId = ?";

	String MONTHLY_EXP_AMOUNT="SELECT sum(amount) as amount from ExpenseTable WHERE userName=? and month(Date) = ?  and status='0' AND CompanyId = ?";
}