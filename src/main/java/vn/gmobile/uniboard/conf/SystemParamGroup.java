package vn.gmobile.uniboard.conf;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.bean.base.BeanFilter;

import vn.gmobile.uniboard.db.DbAdapter;
import vn.gmobile.uniboard.model.SystemParam;

public class SystemParamGroup {
	private static Map<String,String> SYSTEM_PARAMS;
	static {
		try {
			SYSTEM_PARAMS =  new HashMap<String,String>();
			DbAdapter dba = new DbAdapter();
			BeanFilter paramFilter = new BeanFilter(SystemParam.class); 
			List<SystemParam> params =  dba.getBeans(paramFilter);
			for (SystemParam param: params) {
				SYSTEM_PARAMS.put(param.get(SystemParam.NAME),param.get(SystemParam.VALUE));
			}

			dba.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static final String SERVICE_KEY = SYSTEM_PARAMS.get("SERVICE_KEY");
	public static final String DEFAULT_PASSWORD = SYSTEM_PARAMS.get("DEFAULT_PASSWORD");
	public static final String DELIMITER = SYSTEM_PARAMS.get("DELIMITER");
	public static final String SHORTCODE_PREFIX = SYSTEM_PARAMS.get("SHORTCODE_PREFIX");
	public static final String SYSTEM_NAME = SYSTEM_PARAMS.get("SYSTEM_NAME");
	public static final int SCAN_TIME = Integer.parseInt(SYSTEM_PARAMS.get("SCAN_TIME"));
	public static final Integer CANCEL_CAMPAIGN = Integer.parseInt(SYSTEM_PARAMS.get("CANCEL_CAMPAIGN"));
}
