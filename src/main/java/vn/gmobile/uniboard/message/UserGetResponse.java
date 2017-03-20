package vn.gmobile.uniboard.message;

import java.util.List;
import org.json.JSONArray;
import org.json.JSONObject;
import com.bean.json.JsonUtils;
import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.model.MenuFunction;
import vn.gmobile.uniboard.model.Profile;
import vn.gmobile.uniboard.model.User;

public class UserGetResponse extends JsonResponse {
	JSONArray _jsonUsers;
	JSONArray _jsonProfiles;
	JSONArray _jsonFunctions;
	
	public UserGetResponse() {
		_jsonUsers = new JSONArray();
		_jsonFunctions = new JSONArray();
		_jsonProfiles = new JSONArray();
	}
	
	public void setTotalCount(int totalCount) throws Exception {
		write(JsParams.GET_USER_RESPONSE.TOTAL_COUNT, totalCount);	
	}
	

	public void addUser(User user,Profile profile, List<MenuFunction> functions) throws Exception {
		System.out.println(profile.get(Profile.NAME));
		JSONObject jsUser = JsonUtils.fromBeanToJson(user);
		_jsonUsers.put(jsUser);
		JSONObject jProfile = JsonUtils.fromBeanToJson(profile);
		_jsonProfiles.put(jProfile);
		JSONArray jFunctions = JsonUtils.fromBeanListToJsonArray(functions);		
		_jsonFunctions.put(jFunctions);		
		write(JsParams.GET_USER_RESPONSE.USER_LIST, _jsonUsers);
		write(JsParams.GET_USER_RESPONSE.FUNCTION_LIST, _jsonFunctions);		
		write(JsParams.GET_USER_RESPONSE.PROFILE_LIST, _jsonProfiles);		
	}


}
