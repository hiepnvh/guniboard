package vn.gmobile.uniboard.message;

import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import com.bean.json.JsonUtils;

import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.conf.SystemParamGroup;
import vn.gmobile.uniboard.model.MenuFunction;
import vn.gmobile.uniboard.model.Profile;
import vn.gmobile.uniboard.model.User;



public class LoginResponse extends JsonResponse {


	
	public void setUser(User user,Profile profile, List<MenuFunction> functions) throws Exception {
		JSONObject jsUser = JsonUtils.fromBeanToJson(user);
		write(JsParams.LOGIN_RESPONSE.USER, jsUser);
		JSONObject jsProfile = JsonUtils.fromBeanToJson(profile);
		write(JsParams.LOGIN_RESPONSE.PROFILE, jsProfile);
		JSONArray  jsonFunctions = JsonUtils.fromBeanListToJsonArray(functions);
		write(JsParams.LOGIN_RESPONSE.FUNCTION_LIST, jsonFunctions);
		write(JsParams.LOGIN_RESPONSE.SHORTCODE_PREFIX, SystemParamGroup.SHORTCODE_PREFIX);
	}
	

	
}
