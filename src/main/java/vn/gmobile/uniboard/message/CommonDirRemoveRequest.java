package vn.gmobile.uniboard.message;

import org.json.JSONObject;
import com.bean.json.JsonUtils;

import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.db.CommonDirDAO;
import vn.gmobile.uniboard.model.CommonDir;



public class CommonDirRemoveRequest extends JsonRequest {

	/**
	 * @param jObj
	 * @throws Exception 
	 */
	public CommonDirRemoveRequest(JSONObject jObj) throws Exception {
		super(jObj);
		JSONObject jsDir = jObj.getJSONObject(JsParams.COMMON_DIR_REMOVE_REQUEST.DIR);
		_dir = (CommonDir) JsonUtils.fromJsonToBean(jsDir, CommonDir.class);
	}
	
	CommonDir  _dir;
	
	@Override
	public JsonResponse execute() {
		CommonDirAddResponse resp = new CommonDirAddResponse();
		try {
			CommonDirDAO _dao = new CommonDirDAO();
			_dao.removeCommonDir(_dir);
			resp.setSuccess(true);
		} catch (Exception exc) {
			exc.printStackTrace();
			resp.setSuccess(false);
			resp.setInfo(exc.getMessage());
	}
	return resp;
	}

}
