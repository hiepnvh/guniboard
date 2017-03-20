package vn.gmobile.uniboard.message;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.json.JSONArray;
import org.json.JSONObject;

import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.db.CommonDirMemberDAO;
import vn.gmobile.uniboard.model.Member;

public class CommonDirMemberGetRequest extends JsonRequest {

	/**
	 * @param jObj
	 * @throws Exception 
	 */
	public CommonDirMemberGetRequest(JSONObject jObj) throws Exception {
		super(jObj);
		JSONArray jsArr = jObj.getJSONArray(JsParams.COMMON_DIR_MEMBER_GET_REQUEST.DIR_ID);
		_set = new HashSet<Integer>();
		for (int i=0;i<jsArr.length();i++) {
			_set.add(jsArr.getInt(i));
		}
	}

	Integer _dirId = 0;
	Set<Integer> _set;
	
	@Override
	public JsonResponse execute() {
		CommonDirMemberGetResponse resp = new CommonDirMemberGetResponse();
		try {
			CommonDirMemberDAO _dao = new CommonDirMemberDAO();
			List<Member> _list = _dao.getCommonDirMember(_set);
			resp.setCommonDirMember(_list);
			resp.setSuccess(true);
	} catch (Exception exc) {
		exc.printStackTrace();
		resp.setSuccess(false);
		resp.setInfo(exc.getMessage());
	}
	return resp;
	}

}
