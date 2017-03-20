package vn.gmobile.uniboard.message;

import java.util.List;
import org.json.JSONObject;

import vn.gmobile.uniboard.db.PrivateListDAO;
import vn.gmobile.uniboard.model.PrivateList;

public class PrivateListGetRequest extends JsonRequest {

	/**
	 * @param jObj
	 * @throws Exception 
	 */
	public PrivateListGetRequest(JSONObject jObj) throws Exception {
		super(jObj);
	}

	Integer _userId = 0;
	
	@Override
	public JsonResponse execute() {
		PrivateListGetResponse resp = new PrivateListGetResponse();
		try {
			PrivateListDAO _dao = new PrivateListDAO();
			List<PrivateList> _list = _dao.getPrivateList(this.getUserId());
			resp.setPrivateList(_list);
			resp.setSuccess(true);
	} catch (Exception exc) {
		exc.printStackTrace();
		resp.setSuccess(false);
		resp.setInfo(exc.getMessage());
	}
	return resp;
	}

}
