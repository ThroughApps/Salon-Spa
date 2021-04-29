package attendance;

import java.text.ParseException;

public class AttendanceController {

	public void addattendance(AttendanceJSON json) {
		AttendanceDao dao=new AttendanceDao();
		dao.addattendance(json);
		
	}

	public AttendanceJSON selectstaff(AttendanceJSON json) {
		AttendanceDao dao=new AttendanceDao();
		json=dao.selectstaff(json);		
		return json;
	}

/*
 * Staff Attendance Details
 */
	public AttendanceJSON StaffAttendance(AttendanceJSON json) {
		AttendanceDao dao=new AttendanceDao();
		json=dao.StaffAttendance(json);		
		return json;
	}
	
	/*
	 * Staff Monthly Attendance Details
	 */
		public AttendanceJSON MonthlyAttendance(AttendanceJSON json) throws ParseException {
			AttendanceDao dao=new AttendanceDao();
			json=dao.MonthlyAttendance(json);		
			return json;
		}
		
		/*
		 * Staff Period Attendance Details
		 */
			public AttendanceJSON PeriodAttendance(AttendanceJSON json) {
				AttendanceDao dao=new AttendanceDao();
				json=dao.PeriodAttendance(json);		
				return json;
			}

}
