package vn.gmobile.uniboard.message;

import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import com.bean.json.JsonUtils;

import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.db.CommonDirMemberDAO;
import vn.gmobile.uniboard.model.CommonDir;
import vn.gmobile.uniboard.model.Member;

public class CommonDirGetResponse extends JsonResponse {
	
	public void setCommonDir(CommonDir bean) throws Exception {
		JSONObject jObj = JsonUtils.fromBeanToJson(bean);		
		write(JsParams.COMMON_DIR_GET_RESPONSE.DIR, jObj);
	}

	public void setCommonDirMember(Integer _dirId) throws Exception {
		CommonDirMemberDAO _dao = new CommonDirMemberDAO();
		List<Member> _list = _dao.getCommonDirMember(_dirId);
		JSONArray jArr = JsonUtils.fromBeanListToJsonArray(_list);
		write(JsParams.COMMON_DIR_GET_REQUEST.DIR_MEMBER, jArr);
		
	}
}
