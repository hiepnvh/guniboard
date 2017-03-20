package vn.gmobile.uniboard.message;

import java.util.List;
import org.json.JSONObject;
import com.base.filter.BeanInnerJoinFilter;
import com.base.filter.IntegerEqualFilter;
import com.bean.base.BeanFilter;

import vn.gmobile.uniboard.conf.Consts;
import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.conf.MessageGroup;
import vn.gmobile.uniboard.db.CommonDirDAO;
import vn.gmobile.uniboard.model.CommonDir;
import vn.gmobile.uniboard.model.CommonDirPermission;


public class CommonDirTreeGetRequest extends JsonRequest {

	/**
	 * @param jObj
	 * @throws Exception 
	 */
	public CommonDirTreeGetRequest(JSONObject jObj) throws Exception {
		super(jObj);
		if (jObj.has(JsParams.COMMON_DIR_TREE_GET_REQUEST.USER_ID)) {
			_userId = jObj.getInt(JsParams.COMMON_DIR_TREE_GET_REQUEST.USER_ID);
		}
		if (jObj.has(JsParams.COMMON_DIR_TREE_GET_REQUEST.TREE_TYPE)) {
			_treeType = jObj.getInt(JsParams.COMMON_DIR_TREE_GET_REQUEST.TREE_TYPE);
		}
		if (jObj.has(JsParams.COMMON_DIR_TREE_GET_REQUEST.DIR_ID)) {
			_dirId = jObj.getInt(JsParams.COMMON_DIR_TREE_GET_REQUEST.DIR_ID);
		}
	}

	Integer _userId,_dirId;
	Integer _treeType = -1;

	@Override
	public JsonResponse execute()  {
		CommonDirTreeGetResponse resp =  new CommonDirTreeGetResponse();
		try {
			BeanFilter _relFilter = new BeanFilter(CommonDirPermission.class);
			if(_userId!=null)
				_relFilter.setFilter(CommonDirPermission.USER_ID, new IntegerEqualFilter(_userId));
			BeanFilter _filter = new BeanFilter(CommonDir.class);
			//on active ( first load) : dirId null
			if(_dirId == null || _dirId==0){
				//load id list of user which in user's permissions then load child nodes and members
				_filter.setFilter(CommonDir.DIR_ID, new BeanInnerJoinFilter(_relFilter));
			}
			else {
				//load child nodes and members by dir_id
//				_filter.setFilter(CommonDir.DIR_ID, new BeanInnerJoinFilter(_relFilter));
				_filter.setFilter(CommonDir.DIR_ID, new IntegerEqualFilter(_dirId));
			}
			//load common dirs have parent is current dir
			CommonDirDAO dao = new CommonDirDAO();
			List<CommonDir> _list = dao.getCommonDir(_filter);
			if (_list==null ||_list.size()==0)
				throw new Exception(MessageGroup.SYSTEM_ERROR);
			
			switch (_treeType) {
			case Consts.TREE.NO_CHECKBOX: {
				resp.setRoot(_list, false);
			}
				break;
			case Consts.TREE.UNCHECK: {
				resp.setRoot(_list, true);
			}
				break;
			}
			
			resp.setSuccess(true);
		} catch (Exception exc) {
			exc.printStackTrace();
			resp.setSuccess(false);
			resp.setInfo(exc.getMessage());
			
		}
		return resp;
	}
	

}
