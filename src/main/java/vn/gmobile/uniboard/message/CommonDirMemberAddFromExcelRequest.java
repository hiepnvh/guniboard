package vn.gmobile.uniboard.message;

import org.json.JSONObject;
import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.db.CommonDirMemberDAO;

public class CommonDirMemberAddFromExcelRequest extends JsonRequest {

	/**
	 * @param jObj
	 * @throws Exception 
	 */
	public CommonDirMemberAddFromExcelRequest(JSONObject jObj) throws Exception {
		super(jObj);
		if (jObj.has(JsParams.COMMON_DIR_MEMBER_ADD_FROM_EXCEL_REQUEST.DIR_ID)) {
			_dirId = jObj.getInt(JsParams.COMMON_DIR_MEMBER_ADD_FROM_EXCEL_REQUEST.DIR_ID);
		}
		if (jObj.has(JsParams.COMMON_DIR_MEMBER_ADD_FROM_EXCEL_REQUEST.FILE_PATH)) {
			_filePath = jObj.getString(JsParams.COMMON_DIR_MEMBER_ADD_FROM_EXCEL_REQUEST.FILE_PATH);
		}
	}
	
	Integer _dirId;
	String _filePath;
	
	@Override
	public JsonResponse execute() {
		CommonDirMemberAddResponse resp = new CommonDirMemberAddResponse();
		try {
			CommonDirMemberDAO _dao = new CommonDirMemberDAO();
			String result = _dao.addCommonDirMemberFromExcel(_dirId, _filePath);
			System.out.println(result);
			if(result.equalsIgnoreCase(""))
				resp.setSuccess(true);
			else{
				resp.setSuccess(false);
				resp.setInfo("Nhập danh sách không thành công. File bạn nhập vào chứa số bị trùng: " + result);
			}
		} catch (Exception exc) {
			exc.printStackTrace();
			resp.setSuccess(false);
			resp.setInfo(exc.getMessage());
	}
	return resp;
	}

}
