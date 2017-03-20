package vn.gmobile.uniboard.conf;


/**
 * @author QuangN
 *
 */
public class Consts {
	
	public static final String DEFAULT_PASSWORD ="123456";
	public static final String DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
	public static final String NUMBER_FORMAT = "(8499|84199)(\\d{7})";
	public static final String CURRENCY_FORMAT = "#.### VND";
	
	public static class STATE {
		public static final int ACTIVE= 1;
		public static final int INACTIVE= 0;
	}
	
	public static class SMS_STATUS {
		public static final int DELIVERED = 1;
		public static final int UNKNOW = 0;
		public static final int UNDELIVERED = 2;
	}
	
	public static class TREE {
		public static final int UNCHECK = 0;
		public static final int PERMISSION = 1;
		public static final int NO_CHECKBOX = 2;
		public static final int UNCHECK_ALL = 3;
	}
}
