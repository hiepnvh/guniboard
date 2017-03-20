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


public class CommonDirTreeGetPermissionRequest extends JsonRequest {

	/**
	 * @param jObj
	 * @throws Exception 
	 */
	public CommonDirTreeGetPermissionRequest(JSONObject jObj) throws Exception {
		super(jObj);
		if (jObj.has(JsParams.COMMON_DIR_TREE_GET_REQUEST.USER_ID)) {
			_userId = jObj.getInt(JsParams.COMMON_DIR_TREE_GET_REQUEST.USER_ID);
		}
		if (jObj.has(JsParams.COMMON_DIR_TREE_GET_REQUEST.USER_ID_PER)) {
			_userIdPer = jObj.getInt(JsParams.COMMON_DIR_TREE_GET_REQUEST.USER_ID_PER);
		}
		if (jObj.has(JsParams.COMMON_DIR_TREE_GET_REQUEST.TREE_TYPE)) {
			_treeType = jObj.getInt(JsParams.COMMON_DIR_TREE_GET_REQUEST.TREE_TYPE);
		}
	}

	Integer _userId;
	Integer _userIdPer;
	Integer _treeType = -1;

	@Override
	public JsonResponse execute()  {
		CommonDirTreeGetPermissionResponse resp =  new CommonDirTreeGetPermissionResponse();
		try {
			switch(_treeType) {
			case Consts.TREE.PERMISSION : {
				BeanFilter _relFilter = new BeanFilter(CommonDirPermission.class);
				_relFilter.setFilter(CommonDirPermission.USER_ID, new IntegerEqualFilter(_userId));
				
				BeanFilter _filter = new BeanFilter(CommonDir.class);
//				_filter.setFilter(CommonDir.PARENT_DIR_ID,new IsNullFilter());
				_filter.setFilter(CommonDir.DIR_ID, new BeanInnerJoinFilter(_relFilter));
				
				CommonDirDAO dao = new CommonDirDAO();
				
				List<CommonDir> _list = dao.getCommonDir(_filter);
				if (_list==null ||_list.size()==0)
					throw new Exception(MessageGroup.SYSTEM_ERROR);
				resp.setRoot(_list.get(0),_userIdPer);
				
				//get permission list of selected user
				BeanFilter _suRelFilter = new BeanFilter(CommonDirPermission.class);
				_suRelFilter.setFilter(CommonDirPermission.USER_ID, new IntegerEqualFilter(_userIdPer));
				
				BeanFilter _suFilter = new BeanFilter(CommonDir.class);
//				_filter.setFilter(CommonDir.PARENT_DIR_ID,new IsNullFilter());
				_suFilter.setFilter(CommonDir.DIR_ID, new BeanInnerJoinFilter(_suRelFilter));
				List<CommonDir> _suList = dao.getCommonDir(_suFilter);
				resp.setPermission(_suList);
				}
				break;
			case Consts.TREE.UNCHECK_ALL : {
				BeanFilter _relFilter = new BeanFilter(CommonDirPermission.class);
				_relFilter.setFilter(CommonDirPermission.USER_ID, new IntegerEqualFilter(_userId));
				
				BeanFilter _filter = new BeanFilter(CommonDir.class);
//				_filter.setFilter(CommonDir.PARENT_DIR_ID,new IsNullFilter());
				_filter.setFilter(CommonDir.DIR_ID, new BeanInnerJoinFilter(_relFilter));
				
				CommonDirDAO dao = new CommonDirDAO();
				
				List<CommonDir> _list = dao.getCommonDir(_filter);
				if (_list==null ||_list.size()==0)
					throw new Exception(MessageGroup.SYSTEM_ERROR);
				resp.setRoot(_list.get(0));
				
				//get permission list of selected user
				BeanFilter _suRelFilter = new BeanFilter(CommonDirPermission.class);
				_suRelFilter.setFilter(CommonDirPermission.USER_ID, new IntegerEqualFilter(_userIdPer));
				
				BeanFilter _suFilter = new BeanFilter(CommonDir.class);
//				_filter.setFilter(CommonDir.PARENT_DIR_ID,new IsNullFilter());
				_suFilter.setFilter(CommonDir.DIR_ID, new BeanInnerJoinFilter(_suRelFilter));
				List<CommonDir> _suList = dao.getCommonDir(_suFilter);
				resp.setPermission(_suList);
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
