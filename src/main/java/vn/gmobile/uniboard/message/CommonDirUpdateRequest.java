package vn.gmobile.uniboard.message;

import org.json.JSONObject;
import com.bean.json.JsonUtils;

import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.db.CommonDirDAO;
import vn.gmobile.uniboard.model.CommonDir;

public class CommonDirUpdateRequest extends JsonRequest {

	/**
	 * @param jObj
	 * @throws Exception 
	 */
	public CommonDirUpdateRequest(JSONObject jObj) throws Exception {
		super(jObj);
		JSONObject jsObj = jObj.getJSONObject(JsParams.COMMON_DIR_UPDATE_REQUEST.DIR);
		_dir =(CommonDir) JsonUtils.fromJsonToBean(jsObj, CommonDir.class);
	}

	CommonDir _dir;
	
	@Override
	public JsonResponse execute() {
		CommonDirUpdateResponse resp = new CommonDirUpdateResponse();
		try {
			CommonDirDAO _dao = new CommonDirDAO();
			_dao.updateCommonDir(_dir);
			resp.setSuccess(true);
	} catch (Exception exc) {
		exc.printStackTrace();
		resp.setSuccess(false);
		resp.setInfo(exc.getMessage());
	}
	return resp;
	}

}
