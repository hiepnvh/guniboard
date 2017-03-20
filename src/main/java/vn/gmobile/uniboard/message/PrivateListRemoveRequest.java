package vn.gmobile.uniboard.message;

import java.util.HashSet;
import java.util.Set;
import org.json.JSONArray;
import org.json.JSONObject;
import com.bean.json.JsonUtils;
import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.db.PrivateListDAO;
import vn.gmobile.uniboard.model.PrivateList;

public class PrivateListRemoveRequest extends JsonRequest {

	/**
	 * @param jObj
	 * @throws Exception 
	 */
	public PrivateListRemoveRequest(JSONObject jObj) throws Exception {
		super(jObj);
		if (jObj.has(JsParams.PRIVATE_LIST_ADD_REQUEST.USER_ID)) {
			_userId = jObj.getInt(JsParams.PRIVATE_LIST_ADD_REQUEST.USER_ID);
		}
		JSONArray jsArr = jObj.getJSONArray(JsParams.PRIVATE_LIST_ADD_REQUEST.PRIVATE_LIST);
		_set = new HashSet<PrivateList>();
		for (int i=0;i<jsArr.length();i++) {
			JSONObject jsObj = new JSONObject(jsArr.get(i).toString());
			PrivateList _record =(PrivateList) JsonUtils.fromJsonToBean(jsObj, PrivateList.class);
			_set.add(_record);
		}
	}
	
	Integer _userId;
	Set<PrivateList> _set;
	
	@Override
	public JsonResponse execute() {
		PrivateListAddResponse resp = new PrivateListAddResponse();
		try {
			PrivateListDAO _dao = new PrivateListDAO();
			_dao.removePrivateList(_set);
			resp.setSuccess(true);
		} catch (Exception exc) {
			exc.printStackTrace();
			resp.setSuccess(false);
			resp.setInfo(exc.getMessage());
	}
	return resp;
	}

}
