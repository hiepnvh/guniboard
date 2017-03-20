package vn.gmobile.uniboard.message;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.json.JSONArray;
import org.json.JSONObject;

import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.db.PrivateListMemberDAO;
import vn.gmobile.uniboard.model.Member;

public class PrivateListMemberGetRequest extends JsonRequest {

	/**
	 * @param jObj
	 * @throws Exception 
	 */
	public PrivateListMemberGetRequest(JSONObject jObj) throws Exception {
		super(jObj);
		if (jObj.has(JsParams.PRIVATE_LIST_MEMBER_GET_REQUEST.LIST_ID)) {
			JSONArray listIds = jObj.getJSONArray(JsParams.PRIVATE_LIST_MEMBER_GET_REQUEST.LIST_ID);
			if (listIds != null) { 
				   for (int i=0;i<listIds.length();i++){
					   System.out.println(listIds.get(i).toString());
					   _listIds.add(Integer.parseInt(listIds.get(i).toString()));
				   } 
				} 
		}
		if (jObj.has(JsParams.PRIVATE_LIST_MEMBER_GET_REQUEST.USER_ID)) {
			_userId = jObj.getInt(JsParams.PRIVATE_LIST_MEMBER_GET_REQUEST.USER_ID);
		}
	}

	Set<Integer> _listIds = new HashSet<Integer>();
	Integer _userId = 0;
	
	@Override
	public JsonResponse execute() {
		PrivateListMemberGetResponse resp = new PrivateListMemberGetResponse();
		try {
			PrivateListMemberDAO _dao = new PrivateListMemberDAO();
			List<Member> _list = new ArrayList<Member>();
			
			if(_listIds.iterator().next()==0)
				_list = _dao.getAllPrivateListMember(_userId);
			else
				_list = _dao.getPrivateListMember(_listIds);
//			if(_listId!=0)
//				_list = _dao.getPrivateListMember(_listId);
//			else
//				_list = _dao.getAllPrivateListMember(_userId);
			resp.setPrivateListMember(_list);
			resp.setSuccess(true);
	} catch (Exception exc) {
		exc.printStackTrace();
		resp.setSuccess(false);
		resp.setInfo(exc.getMessage());
	}
	return resp;
	}

}
