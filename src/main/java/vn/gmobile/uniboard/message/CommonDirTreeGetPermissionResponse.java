package vn.gmobile.uniboard.message;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.json.*;

import com.base.filter.IntegerEqualFilter;
import com.bean.base.BeanFilter;
import com.bean.json.JsonUtils;

import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.db.CommonDirDAO;
import vn.gmobile.uniboard.model.CommonDir;
import vn.gmobile.uniboard.model.CommonDirPermission;

public class CommonDirTreeGetPermissionResponse extends JsonResponse {
	
	JSONObject _jRoot;
	Set<Integer> _set = new HashSet<Integer>();
	
	public CommonDirTreeGetPermissionResponse() { 
	}
	
	private JSONObject createCommonDirNode(CommonDir dir, Integer _userId) throws Exception {
		JSONObject jNode =  new JSONObject();
		jNode.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.DIR_ID, dir.get(CommonDir.DIR_ID));
		jNode.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.PARENT_DIR_ID, dir.get(CommonDir.PARENT_DIR_ID));
		jNode.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.TEXT, dir.get(CommonDir.NAME));
		jNode.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.LEAF, true);
		if(_set.contains(dir.get(CommonDir.PARENT_DIR_ID)))
			_set.add(dir.get(CommonDir.DIR_ID));
		if(_set.contains(dir.get(CommonDir.DIR_ID)))
			jNode.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.CHECKED, true);
		else
			jNode.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.CHECKED, false);
		return jNode;
	}
	
//	private JSONObject createDirNode(CommonDir dir) throws Exception {
//		JSONObject jNode =  new JSONObject();
//		jNode.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.DIR_ID, "");
//		jNode.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.PARENT_DIR_ID, dir.get(CommonDir.DIR_ID));
//		jNode.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.TEXT, dir.get(CommonDir.NAME));
//		jNode.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.LEAF, true);
//		
//		JSONObject jCommonDir = JsonUtils.fromBeanToJson(dir);
//		jNode.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.COMMON_DIR, jCommonDir);
//		return jNode;
//	}
	
//	Check node Permission
	public void setRoot(CommonDir rootCat,Integer _userId) throws Exception {
		CommonDirDAO dao = new CommonDirDAO();
		BeanFilter filter = new BeanFilter(CommonDirPermission.class);
		filter.setFilter(CommonDirPermission.USER_ID, new IntegerEqualFilter(_userId));
		List<CommonDirPermission> list = dao.getCommonDirPermission(filter);
		
//		if(list.size()>0) {
//			CommonDir dir = dao.getCommonDir(list.get(0).get(CommonDirPermission.DIR_ID));
//			List<CommonDir> subDirList = dao.getSubCommonDir(dir);
//			subDirList.add(dir);
//			for (CommonDir per : subDirList) {
//				_set.add(per.get(CommonDir.DIR_ID));
//			}
//		}
		
		for (CommonDirPermission e : list) {
			_set.add(e.get(CommonDirPermission.DIR_ID));
		}
		
		_jRoot = buildDirNode(rootCat,_userId);
		write(JsParams.COMMON_DIR_TREE_GET_RESPONSE.ROOT,_jRoot);
	}
	
	public void setRoot(List<CommonDir> _list, Integer _userIdPer) {
		// TODO Auto-generated method stub
		
	}
	
	private JSONObject buildDirNode(CommonDir dir,Integer _userId) throws Exception {
		JSONObject jDir = createCommonDirNode(dir,_userId);
//		ContentDAO contentDao = new ContentDAO();
		CommonDirDAO dirDao = new CommonDirDAO();
//		List<Content> contentList = contentDao.getContentInCategory(dir);
		List<CommonDir> subDirList = dirDao.getSubCommonDir(dir);
		if(subDirList.size() > 0) {
//			jDir.remove(JsParams.COMMON_DIR_TREE_GET_RESPONSE.CHECKED);
			jDir.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.LEAF, false);
		}
		JSONArray jDirList = new JSONArray();
//		for (Content content : contentList ) {
//			JSONObject contentNode = createContentNode(content);
//			jDirList.put(contentNode);
//		}
		for (CommonDir subDir : subDirList) {
			JSONObject dirNode = buildDirNode(subDir, _userId);
			jDirList.put(dirNode);
		}
		jDir.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.DIR_LIST, jDirList);
		return jDir;		
	}
	
	
//	Un check All
	public void setRoot(CommonDir rootCat) throws Exception {
			_jRoot = buildDirNodeUnCheckAll(rootCat);
			write(JsParams.COMMON_DIR_TREE_GET_RESPONSE.ROOT,_jRoot);
	}
	
	private JSONObject buildDirNodeUnCheckAll(CommonDir dir) throws Exception {
		JSONObject jDir = createCommonDirNodeUnCheckAll(dir);
		CommonDirDAO dirDao = new CommonDirDAO();
		List<CommonDir> subDirList = dirDao.getSubCommonDir(dir);
		if(subDirList.size() > 0) {
			jDir.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.LEAF, false);
		}
		JSONArray jDirList = new JSONArray();
		for (CommonDir subDir : subDirList) {
			JSONObject dirNode = buildDirNodeUnCheckAll(subDir);
			jDirList.put(dirNode);
		}
		jDir.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.DIR_LIST, jDirList);
		return jDir;		
	}
	
	private JSONObject createCommonDirNodeUnCheckAll(CommonDir dir) throws Exception {
		JSONObject jNode =  new JSONObject();
		jNode.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.DIR_ID, dir.get(CommonDir.DIR_ID));
		jNode.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.PARENT_DIR_ID, dir.get(CommonDir.PARENT_DIR_ID));
		jNode.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.TEXT, dir.get(CommonDir.NAME));
		jNode.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.LEAF, true);
		jNode.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.CHECKED, false);
		return jNode;
	}

	public void setPermission(List<CommonDir> _list) throws Exception {
		JSONArray  jarr = JsonUtils.fromBeanListToJsonArray(_list);
		write(JsParams.COMMON_DIR_TREE_GET_RESPONSE.PERMISSION_LIST, jarr);
		
	}
}
