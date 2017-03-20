package vn.gmobile.uniboard.message;

import java.util.List;
import org.json.JSONArray;
import com.bean.json.JsonUtils;

import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.model.Member;

public class PrivateListMemberGetResponse extends JsonResponse {
	
	public void setPrivateListMember(List<Member> _list) throws Exception {
		JSONArray jArr = JsonUtils.fromBeanListToJsonArray(_list);		
		write(JsParams.PRIVATE_LIST_MEMBER_GET_RESPONSE.MEMBER_LIST, jArr);
	}
}
