package vn.gmobile.uniboard.message;

import java.util.HashSet;
import java.util.Set;
import org.json.JSONArray;
import org.json.JSONObject;
import com.bean.json.JsonUtils;

import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.db.CommonDirMemberDAO;
import vn.gmobile.uniboard.model.Member;

public class CommonDirMemberMoveRequest extends JsonRequest {

	/**
	 * @param jObj
	 * @throws Exception 
	 */
	public CommonDirMemberMoveRequest(JSONObject jObj) throws Exception {
		super(jObj);
		if (jObj.has(JsParams.COMMON_DIR_MEMBER_MOVE_REQUEST.DIR_ID)) {
			_dirId = jObj.getInt(JsParams.COMMON_DIR_MEMBER_MOVE_REQUEST.DIR_ID);
		}
		JSONArray jsArr = jObj.getJSONArray(JsParams.COMMON_DIR_MEMBER_MOVE_REQUEST.MEMBER_LIST);
		_set = new HashSet<Member>();
		for (int i=0;i<jsArr.length();i++) {
			JSONObject jsObj = new JSONObject(jsArr.get(i).toString());
			Member _record =(Member) JsonUtils.fromJsonToBean(jsObj, Member.class);
			_set.add(_record);
		}
	}
	
	Integer _dirId;
	Set<Member> _set;
	
	@Override
	public JsonResponse execute() {
		CommonDirMemberAddResponse resp = new CommonDirMemberAddResponse();
		try {
			CommonDirMemberDAO _dao = new CommonDirMemberDAO();
			_dao.moveCommonDirMember(_dirId, _set);
			resp.setSuccess(true);
		} catch (Exception exc) {
			exc.printStackTrace();
			resp.setSuccess(false);
			resp.setInfo(exc.getMessage());
	}
	return resp;
	}

}
