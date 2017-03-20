/**
 * 
 */
package vn.gmobile.uniboard.conf;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.bean.base.BeanFilter;

import vn.gmobile.uniboard.db.DbAdapter;
import vn.gmobile.uniboard.model.Message;




/**
 * @author QuangN
 * 
 */
public class MessageGroup {
		private static Map<String,String> MESSAGE_MAP;
		static {
			try {
				MESSAGE_MAP =  new HashMap<String,String>();
				DbAdapter dba = new DbAdapter();
				BeanFilter msgFilter = new BeanFilter(Message.class); 
				List<Message> messages =  dba.getBeans(msgFilter);
				for (Message msg: messages) {
					MESSAGE_MAP.put(msg.get(Message.ACRONYM),msg.get(Message.TEXT));
				}

				dba.close();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
			public static final String USER_INVALID = MESSAGE_MAP.get("USER_INVALID");
			public static final String NOT_LOGIN = MESSAGE_MAP.get("NOT_LOGIN");
			public static final String INVALID_USERNAME_PASSWORD = MESSAGE_MAP.get("INVALID_USERNAME_PASSWORD");
			public static final String USER_INACTIVE = MESSAGE_MAP.get("USER_INACTIVE");
			public static final String SYSTEM_ERROR = MESSAGE_MAP.get("SYSTEM_ERROR");
			public static final String USERNAME_EXIST = MESSAGE_MAP.get("USERNAME_EXIST");
			public static final String VIEW_ONLY = MESSAGE_MAP.get("VIEW_ONLY");
		
			

}
