package vn.gmobile.uniboard.message;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.json.JSONArray;
import org.json.JSONObject;
import com.base.filter.StringEqualFilter;
import com.bean.base.BeanFilter;
import com.bean.json.JsonUtils;
import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.conf.MessageGroup;
import vn.gmobile.uniboard.conf.SystemParamGroup;
import vn.gmobile.uniboard.db.UserDAO;
import vn.gmobile.uniboard.model.User;
import vn.gmobile.uniboard.util.PasswordUtils;

public class UserUpdateRequest extends JsonRequest {

	public UserUpdateRequest(JSONObject jObj) throws Exception {
		super(jObj);
		JSONObject jsUser = jObj.getJSONObject(JsParams.UPDATE_USER_REQUEST.USER);
		_user =(User) JsonUtils.fromJsonToBean(jsUser, User.class);
		if(jObj.has(JsParams.UPDATE_USER_REQUEST.COMMON_DIR_ID_ARR)){
			JSONArray jsArr = jObj.getJSONArray(JsParams.UPDATE_USER_REQUEST.COMMON_DIR_ID_ARR);
			_set = new HashSet<Integer>();
			for (int i=0;i<jsArr.length();i++) {
				int _id =  Integer.parseInt(jsArr.getString(i));
				_set.add(_id);
			}
		}
		
	}

	User  _user;
	Set<Integer> _set;

	@Override
	public JsonResponse execute() {
		UserUpdateResponse resp = new UserUpdateResponse();
		try {
			UserDAO dao = new UserDAO();
			if (_user.get(User.USER_ID)==null) {
				BeanFilter userFilter = new BeanFilter(User.class);
				userFilter.setFilter(User.USERNAME, new StringEqualFilter(_user.get(User.USERNAME)));
				List<User> users = dao.getUser(userFilter);
				if (users!=null && users.size()>0)
					throw new Exception(MessageGroup.USERNAME_EXIST);
				if(_user.get(User.PASSWORD) == null)
					_user.set(User.PASSWORD,PasswordUtils.generateMD5Pass(SystemParamGroup.DEFAULT_PASSWORD));
				dao.updateUser(_user,_set);
			} 
			else
				dao.updateUser(_user,_set);
			resp.setSuccess(true);
		} catch (Exception exc) {
			exc.printStackTrace();
			resp.setSuccess(false);
			resp.setInfo(exc.getMessage());
		}
		return resp;
	}
}
