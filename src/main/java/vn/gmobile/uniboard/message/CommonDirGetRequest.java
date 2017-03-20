package vn.gmobile.uniboard.message;

import org.json.JSONObject;

import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.db.CommonDirDAO;
import vn.gmobile.uniboard.model.CommonDir;

public class CommonDirGetRequest extends JsonRequest {

	/**
	 * @param jObj
	 * @throws Exception 
	 */
	public CommonDirGetRequest(JSONObject jObj) throws Exception {
		super(jObj);
		if (jObj.has(JsParams.COMMON_DIR_GET_REQUEST.DIR_ID)) {
			_dirId = jObj.getInt(JsParams.COMMON_DIR_GET_REQUEST.DIR_ID);
		}
	}

	Integer _dirId = 0;
	
	@Override
	public JsonResponse execute() {
		CommonDirGetResponse resp = new CommonDirGetResponse();
		try {
			CommonDirDAO _dao = new CommonDirDAO();
			CommonDir commonDir = _dao.getCommonDir(_dirId);
			resp.setCommonDir(commonDir);
			resp.setCommonDirMember(_dirId);
			resp.setSuccess(true);
	} catch (Exception exc) {
		exc.printStackTrace();
		resp.setSuccess(false);
		resp.setInfo(exc.getMessage());
	}
	return resp;
	}

}
