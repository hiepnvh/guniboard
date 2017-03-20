package vn.gmobile.uniboard.message;

import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import com.bean.json.JsonUtils;

import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.db.PrivateListMemberDAO;
import vn.gmobile.uniboard.model.PrivateList;

public class PrivateListGetResponse extends JsonResponse {
	
	public void setPrivateList(List<PrivateList> _list) throws Exception {
		JSONArray jArr = JsonUtils.fromBeanListToJsonArray(_list);	
		
		JSONArray _jArr = new JSONArray();
		for(int i = 0;i<jArr.length();i++){
			JSONObject jObj = jArr.getJSONObject(i);
			int list_id = jObj.getInt("list_id");
			PrivateListMemberDAO plmDa0 = new PrivateListMemberDAO();
			int memCount = plmDa0.getPrivateListMember(list_id).size();
			jObj.put("memcount", memCount);
			_jArr.put(jObj);
		}
		write(JsParams.PRIVATE_LIST_GET_RESPONSE.PRIVATE_LIST, _jArr);
	}
}
