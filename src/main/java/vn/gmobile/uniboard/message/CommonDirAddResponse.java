package vn.gmobile.uniboard.message;

import org.json.JSONObject;

import com.bean.json.JsonUtils;

import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.model.CommonDir;

public class CommonDirAddResponse extends JsonResponse {

	public void setCreatedDir(CommonDir _dir) throws Exception {
		// TODO Auto-generated method stub
		JSONObject dir = JsonUtils.fromBeanToJson(_dir);
		write(JsParams.COMMON_DIR_ADD_RESPONSE.REPONSE, dir);
	}

}
