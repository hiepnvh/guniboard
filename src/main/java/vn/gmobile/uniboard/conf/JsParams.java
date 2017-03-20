/**
 * 
 */
package vn.gmobile.uniboard.conf;


/**
 * @author QuangN
 * 
 */
public class JsParams {
	
	public static class GENERAL_REQUEST {
		public static final String USER_ID = "user_id";
	}
	
	public static class GENERAL_RESPONSE {
		public static final String SUCCESS = "success";
		public static final String INFO = "info";
	}	
	
	public static class GET_USER_REQUEST extends GENERAL_REQUEST  {
		public static final String USERNAME = "username";
		public static final String PROFILE_ID = "profile_id";
		public static final String START = "start";
		public static final String LIMIT = "limit";
	}
	
	public static class GET_USER_RESPONSE extends GENERAL_RESPONSE{
		public static final String USER_LIST = "user_list";
		public static final String PROFILE_LIST = "profile_list";
		public static final String FUNCTION_LIST = "function_list";
		public static final String TOTAL_COUNT = "totalCount";
	}
	
	public static class GET_FUNCTION_REQUEST extends GENERAL_REQUEST  {
		public static final String PROFILE_ID = "profile_id";
	}
	
	public static class GET_FUNCTION_RESPONSE extends GENERAL_RESPONSE{
		public static final String FUNCTION_LIST = "function_list";
	}
	
	public static class UPDATE_USER_REQUEST extends GENERAL_REQUEST{
		public static final String USER = "user";
		public static final String COMMON_DIR_ID_ARR = "common_dir_id_arr";  
	}
	
	public static class UPDATE_USER_RESPONSE extends GENERAL_RESPONSE{
		
	}
	
	public static class GET_PROFILE_REQUEST extends GENERAL_REQUEST  {
		public static final String PROFILE_ID = "profile_id";
	}
	
	public static class GET_PROFILE_RESPONSE extends GENERAL_RESPONSE{
		public static final String PROFILE_LIST= "profile_list";
	}
	
	public static class LOGIN_REQUEST  {
		public static final String USERNAME = "username";
		public static final String PASWORD = "password";
		
	}	
	
	public static class LOGIN_RESPONSE extends GENERAL_RESPONSE{
		public static final String USER = "user";
		public static final String FUNCTION_LIST= "function_list";
		public static final String PROFILE= "profile";
		public static final String SHORTCODE_PREFIX = "shortcode_prefix";
	}

	public static class UPDATE_PROFILE_REQUEST extends GENERAL_REQUEST{
		public static final String FUNCTION_LIST = "function_list";
		public static final String PROFILE = "profile";
	}

	public static class UPDATE_PROFILE_RESPONSE extends GENERAL_RESPONSE{
		
	}

/*#########################################################################*/	
	
	public static class PRIVATE_LIST_GET_REQUEST extends GENERAL_REQUEST  {
	}
	
	public static class PRIVATE_LIST_GET_RESPONSE extends GENERAL_RESPONSE {
		public static final String PRIVATE_LIST = "private_list";
	}

	public static class PRIVATE_LIST_ADD_REQUEST extends GENERAL_REQUEST  {
		public static final String PRIVATE_LIST = "private_list";
	}
	
	public static class PRIVATE_LIST_ADD_RESPONSE extends GENERAL_RESPONSE {
	}
	
	public static class PRIVATE_LIST_REMOVE_REQUEST extends GENERAL_REQUEST  {
		public static final String PRIVATE_LIST = "private_list";
	}
	
	public static class PRIVATE_LIST_REMOVE_RESPONSE extends GENERAL_RESPONSE {
	}
	
	public static class PRIVATE_LIST_MEMBER_GET_REQUEST extends GENERAL_REQUEST  {
		public static final String LIST_ID = "list_ids";
	}
	
	public static class PRIVATE_LIST_MEMBER_GET_RESPONSE extends GENERAL_RESPONSE {
		public static final String MEMBER_LIST = "member_list";
	}
	
	public static class PRIVATE_LIST_MEMBER_ADD_REQUEST extends GENERAL_REQUEST  {
		public static final String LIST_ID = "list_id";
		public static final String MEMBER_LIST = "member_list";
	}
	
	public static class PRIVATE_LIST_MEMBER_ADD_RESPONSE extends GENERAL_RESPONSE {
	}
	
	public static class PRIVATE_LIST_MEMBER_REMOVE_REQUEST extends GENERAL_REQUEST  {
		public static final String LIST_ID = "list_id";
		public static final String MEMBER_LIST = "member_list";
	}
	
	public static class PRIVATE_LIST_MEMBER_REMOVE_RESPONSE extends GENERAL_RESPONSE {
	}
	
	public static class COMMON_DIR_TREE_GET_REQUEST extends GENERAL_REQUEST  {
		public static final String TREE_TYPE = "tree_type";
		public static final String USER_ID_PER = "user_id_per";
		public static final String DIR_ID = "dir_id";
	}
	
	public static class COMMON_DIR_TREE_GET_RESPONSE extends GENERAL_RESPONSE {
		public static final String COMMON_DIR= "common_dir";
		public static final String DIR_ID= "dir_id";
		public static final String PARENT_DIR_ID= "parent_dir_id";
		public static final String LEAF= "leaf";
		public static final String TEXT= "text";
		public static final String DIR_LIST= "dir_list";
		public static final String ROOT= "dir_list";
		public static final String CHECKED= "checked";
		public static final String EXPANDABLE= "expandable";
		public static final String DIR_MEMBER = "dir_member";
		public static final String PERMISSION_LIST = "permission_list";
	}
	
	public static class COMMON_DIR_GET_REQUEST extends GENERAL_REQUEST  {
		public static final String DIR_ID = "dir_id";
		public static final String DIR_MEMBER = "dir_member";
	}
	
	public static class COMMON_DIR_GET_RESPONSE extends GENERAL_RESPONSE {
		public static final String DIR = "dir";
	}
	
	public static class COMMON_DIR_ADD_REQUEST extends GENERAL_REQUEST  {
		public static final String DIR = "dir";
	}
	
	public static class COMMON_DIR_ADD_RESPONSE extends GENERAL_RESPONSE {
		public static final String REPONSE = "reponse";
	}
	
	public static class COMMON_DIR_REMOVE_REQUEST extends GENERAL_REQUEST  {
		public static final String DIR = "dir";
	}
	
	public static class COMMON_DIR_REMOVE_RESPONSE extends GENERAL_RESPONSE {
	}
	
	public static class COMMON_DIR_UPDATE_REQUEST extends GENERAL_REQUEST  {
		public static final String DIR = "dir";
	}
	
	public static class COMMON_DIR_UPDATE_RESPONSE extends GENERAL_RESPONSE {
	}
	
	public static class COMMON_DIR_MEMBER_GET_REQUEST extends GENERAL_REQUEST  {
		public static final String DIR_ID = "dir_id";
	}
	
	public static class COMMON_DIR_MEMBER_GET_RESPONSE extends GENERAL_RESPONSE {
		public static final String MEMBER_LIST = "member_list";
	}
	
	public static class COMMON_DIR_MEMBER_ADD_REQUEST extends GENERAL_REQUEST  {
		public static final String DIR_ID = "dir_id";
		public static final String MEMBER_LIST = "member_list";
	}
	
	public static class COMMON_DIR_MEMBER_ADD_RESPONSE extends GENERAL_RESPONSE {
	}
	
	public static class COMMON_DIR_MEMBER_MOVE_REQUEST extends GENERAL_REQUEST  {
		public static final String DIR_ID = "dir_id";
		public static final String MEMBER_LIST = "member_list";
	}
	
	public static class COMMON_DIR_MEMBER_MOVE_RESPONSE extends GENERAL_RESPONSE {
	}
	
	public static class COMMON_DIR_MEMBER_ADD_FROM_EXCEL_REQUEST extends GENERAL_REQUEST  {
		public static final String DIR_ID = "dir_id";
		public static final String FILE_PATH = "file_path";
	}
	
	public static class COMMON_DIR_MEMBER_ADD_FROM_EXCEL_RESPONSE extends GENERAL_RESPONSE {
	}
	
	public static class COMMON_DIR_MEMBER_REMOVE_REQUEST extends GENERAL_REQUEST  {
		public static final String DIR_ID = "dir_id";
		public static final String MEMBER_LIST = "member_list";
	}
	
	public static class COMMON_DIR_MEMBER_REMOVE_RESPONSE extends GENERAL_RESPONSE {
	}
	
	public static class SMS_HISTORY_GET_REQUEST extends GENERAL_REQUEST  {
	}
	
	public static class SMS_HISTORY_GET_RESPONSE extends GENERAL_RESPONSE  {
		public static final String SMS_LIST = "sms_list";
	}
	
	public static class SMS_HISTORY_ADD_REQUEST extends GENERAL_REQUEST  {
		public static final String SMS = "sms";
	}
	
	public static class SMS_HISTORY_ADD_RESPONSE extends GENERAL_RESPONSE  {
	}
	
	public static class SMS_HISTORY_REMOVE_REQUEST extends GENERAL_REQUEST  {
		public static final String SMS_LIST = "sms_list";
	}
	
	public static class SMS_HISTORY_REMOVE_RESPONSE extends GENERAL_RESPONSE  {
	}
	
	public static class SEND_SMS_CAMPAIGN_REQUEST extends GENERAL_REQUEST  {
		public static final String CAMPAIGN = "campaign";
		
		public static final String SERVICE_KEY = "service_key";
		public static final String TITLE = "title";
		public static final String TEXT = "text";
		public static final String SHORTCODE = "shortcode";
		public static final String PARENT_CAMPAIGN_ID = "parent_campaign_id";
		public static final String send_date = "send_date";
		public static final String MSISDN = "msisdn";

		public static final String DIR_LIST = "dir_list";
	}
	
	public static class SEND_SMS_CAMPAIGN_RESPONSE extends GENERAL_RESPONSE  {
		public static final String SMS_LIST = "sms_list";
		public static final String CAMPAIGN_CODE = "campaign_code";
	}
	
	public static class CAMPAIGN_GET_REQUEST extends GENERAL_REQUEST  {
		public static final String sender = "sender";
		public static final String receiver = "receiver";
		public static final String start_date = "start_date";
		public static final String end_date = "end_date";
		public static final String START = "start";
		public static final String LIMIT = "limit";
	}
	
	public static class CAMPAIGN_GET_RESPONSE extends GENERAL_RESPONSE  {
		public static final String CAMPAIGN_LIST = "campaign_list";
		public static final String RESULTS = "results";
	}
	
	public static class CAMPAIGN_SMS_HISTORY_GET_REQUEST extends GENERAL_REQUEST  {
		public static final String CAMPAIGN_ID = "campaign_id";
		public static final String SERVICE_KEY = "service_key";
		public static final String CAMPAIGN_CODE = "campaign_code";
		public static final String SEND_DATE = "send_date";
	}
	
	public static class CAMPAIGN_SMS_HISTORY_GET_RESPONSE extends GENERAL_RESPONSE  {
		public static final String SMS_HIST_LIST = "sms_hist_list";
	}
	
	public static class CAMPAIGN_SMS_ADD_REQUEST extends GENERAL_REQUEST  {
		public static final String CAMPAIGN = "campaign";
		public static final String SMS_HIST_LIST = "sms_hist_list";
	}
	
	public static class CAMPAIGN_SMS_ADD_RESPONSE extends GENERAL_RESPONSE  {
	}
	
	public static class CAMPAIGN_SMS_REMOVE_REQUEST extends GENERAL_REQUEST  {
		public static final String CAMPAIGN_LIST = "campaign_list";
	}
	
	public static class CAMPAIGN_SMS_REMOVE_RESPONSE extends GENERAL_RESPONSE  {
	}
}
