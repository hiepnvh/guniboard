package vn.gmobile.uniboard.message;

import java.util.HashSet;
import java.util.Set;
import org.json.JSONArray;
import org.json.JSONObject;
import com.bean.json.JsonUtils;
import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.db.PrivateListMemberDAO;
import vn.gmobile.uniboard.model.Member;

public class PrivateListMemberAddRequest extends JsonRequest {

	/**
	 * @param jObj
	 * @throws Exception 
	 */
	public PrivateListMemberAddRequest(JSONObject jObj) throws Exception {
		super(jObj);
		if (jObj.has(JsParams.PRIVATE_LIST_MEMBER_ADD_REQUEST.LIST_ID)) {
			_listId = jObj.getInt(JsParams.PRIVATE_LIST_MEMBER_ADD_REQUEST.LIST_ID);
		}
		JSONArray jsArr = jObj.getJSONArray(JsParams.PRIVATE_LIST_MEMBER_ADD_REQUEST.MEMBER_LIST);
		_set = new HashSet<Member>();
		for (int i=0;i<jsArr.length();i++) {
			JSONObject jsObj = new JSONObject(jsArr.get(i).toString());
			Member _record =(Member) JsonUtils.fromJsonToBean(jsObj, Member.class);
			_set.add(_record);
		}
	}
	
	Integer _listId;
	Set<Member> _set;
	
	@Override
	public JsonResponse execute() {
		PrivateListMemberAddResponse resp = new PrivateListMemberAddResponse();
		try {
			PrivateListMemberDAO _dao = new PrivateListMemberDAO();
			_dao.addPrivateListMember(_listId,_set);
			resp.setSuccess(true);
		} catch (Exception exc) {
			exc.printStackTrace();
			resp.setSuccess(false);
			resp.setInfo(exc.getMessage());
	}
	return resp;
	}

}
