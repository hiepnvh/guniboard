package vn.gmobile.uniboard.util;

import java.util.Date;
import java.util.Calendar;

public class DateUtils {
	
	public static int countWorkingDay(Date fromDate, Date toDate) {
		// inclusive count
		long fromTime = fromDate.getTime();
		long toTime = toDate.getTime();
		Calendar cal = Calendar.getInstance();
		cal.setTimeInMillis(fromTime);
		int count =0;
		while (cal.getTimeInMillis() <= toTime) {
			int dayOfWeek = cal.get(Calendar.DAY_OF_WEEK);
			if (dayOfWeek != Calendar.SUNDAY)
				count ++;
			cal.add(Calendar.DATE, 1);
		}
		return count;
		
	}
	
	
	public static long getWorkingDay( int workingDay,int month, int year) {
		Calendar cal = Calendar.getInstance();
		cal.clear();
		cal.set(Calendar.YEAR, year);
		cal.set(Calendar.MONTH, month);
		cal.set(Calendar.DAY_OF_MONTH, 1);
		int dayOfWeek = cal.get(Calendar.DAY_OF_WEEK);
		if (dayOfWeek == Calendar.SUNDAY)
			cal.add(Calendar.DAY_OF_MONTH, workingDay);
		else
			cal.add(Calendar.DAY_OF_MONTH, workingDay-1);
		return cal.getTimeInMillis();
	}
	
	public static long getLastDayOfMOnth( int month, int year) {
		Calendar cal = Calendar.getInstance();
		cal.clear();
		cal.set(Calendar.YEAR, year);
		cal.set(Calendar.MONTH, month);
		cal.set(Calendar.DAY_OF_MONTH, 1);
		cal.add(Calendar.MONTH, 1);
		cal.add(Calendar.DAY_OF_MONTH, -1);
		return cal.getTimeInMillis();
	}
	
	public static Date sum(Date startDate, int span) {
		Calendar cal = Calendar.getInstance();
		cal.clear();
		cal.setTime(startDate);
		cal.add(Calendar.MILLISECOND, span);
		return cal.getTime();
		
	}
}
