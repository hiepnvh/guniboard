package vn.gmobile.uniboard.message;

import java.util.ArrayList;
import java.util.List;

import org.json.*;

import com.bean.json.JsonUtils;

import vn.gmobile.uniboard.conf.Consts;
import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.conf.SystemParamGroup;
import vn.gmobile.uniboard.db.CommonDirDAO;
import vn.gmobile.uniboard.db.CommonDirMemberDAO;
import vn.gmobile.uniboard.model.CommonDir;
import vn.gmobile.uniboard.model.Member;

public class CommonDirTreeGetResponse extends JsonResponse {
	
	JSONObject _jRoot;
	boolean _firstChild = true;
	
	public CommonDirTreeGetResponse() { 
		
	}
	
	private JSONObject createCommonDirNode(CommonDir dir) throws Exception {
		JSONObject jNode =  new JSONObject();
		jNode.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.DIR_ID, dir.get(CommonDir.DIR_ID) );
		jNode.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.PARENT_DIR_ID, dir.get(CommonDir.PARENT_DIR_ID));
		jNode.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.TEXT, dir.get(CommonDir.NAME));
		jNode.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.LEAF, true);
		jNode.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.CHECKED, false);
		return jNode;
	}
	
	/**
	 * @param rootCat - root of tree
	 * @param isCheckBox - if want have checkbox in each node true , else is false
	 * @throws Exception
	 */
	public void setRoot(CommonDir rootCat, Boolean isCheckBox) throws Exception {
		if(isCheckBox == true)
			_jRoot = buildDirNode(rootCat);
		else
			_jRoot = buildDirNodeNoCheckBox(rootCat);
		write(JsParams.COMMON_DIR_TREE_GET_RESPONSE.ROOT,_jRoot);
		
		//response mems
		List<Member> mems = getMemberList(rootCat.get(CommonDir.DIR_ID));
		JSONArray jArr = JsonUtils.fromBeanListToJsonArray(mems);
		write(JsParams.COMMON_DIR_GET_REQUEST.DIR_MEMBER, jArr);
	}
	
	public void setRoot(List<CommonDir> firstChildren, Boolean isCheckBox) throws Exception {
		if(isCheckBox == true)
			_jRoot = buildDirNode(firstChildren);
		else
			_jRoot = buildDirNodeNoCheckBox(firstChildren);
		write(JsParams.COMMON_DIR_TREE_GET_RESPONSE.ROOT,_jRoot);
		System.out.println(_jRoot);
	}
	
	private List<Member> getMemberList(int dirId) throws Exception{
		CommonDirMemberDAO _dao = new CommonDirMemberDAO();
		List<Member> mems = _dao.getCommonDirMember(dirId);
		return mems;
	}
	
	private JSONObject buildDirNode(List<CommonDir> dirs) throws Exception {
		
		JSONObject jDir = new JSONObject();
		if(dirs.get(0).get(CommonDir.DIR_ID)!=0)
			jDir = createCommonDirRootNode();
		
//		List<CommonDir> subDirList = new ArrayList<CommonDir>();
//		subDirList.addAll(firstChildren);
		if(dirs.size() > 0) {
			jDir.remove(JsParams.COMMON_DIR_TREE_GET_RESPONSE.CHECKED);
			jDir.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.LEAF, false);
		}
		JSONArray jDirList = new JSONArray();
		for (CommonDir dir : dirs) {
			JSONObject dirNode = buildDirNode(dir);
			jDirList.put(dirNode);
		}
		jDir.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.DIR_LIST, jDirList);
		_firstChild = false;
		return jDir;
		
	
	}
	
	private JSONObject buildDirNodeNoCheckBox(List<CommonDir> dirs) throws Exception {

		JSONObject jDir = new JSONObject();
		if(dirs.get(0).get(CommonDir.DIR_ID)!=0)
			jDir = createCommonDirRootNode();
//		System.out.println("firstChildren.size() " + firstChildren.size());
//		List<CommonDir> subDirList = new ArrayList<CommonDir>();
//		subDirList.addAll(firstChildren);
		if(dirs.size() > 0) {
			jDir.remove(JsParams.COMMON_DIR_TREE_GET_RESPONSE.CHECKED);
			jDir.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.LEAF, false);
		}
		JSONArray jDirList = new JSONArray();
		for (CommonDir dir : dirs) {
			JSONObject dirNode = buildDirNodeNoCheckBox(dir);
			jDirList.put(dirNode);
		}
		jDir.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.DIR_LIST, jDirList);
		_firstChild = false;
		return jDir;
	}

	private JSONObject buildDirNode(CommonDir dir) throws Exception {
		JSONObject jDir = createCommonDirNode(dir);
		CommonDirDAO dirDao = new CommonDirDAO();
		List<CommonDir> subDirList = dirDao.getSubCommonDir(dir);
		if(subDirList.size() > 0) {
			jDir.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.LEAF, false);
		}
//		JSONArray jDirList = new JSONArray();
//		for (CommonDir subDir : subDirList) {
//			JSONObject dirNode = buildDirNode(subDir);
//			jDirList.put(dirNode);
//		}
		JSONArray _jArr_DirList = new JSONArray();
		JSONArray jArr_DirList = JsonUtils.fromBeanListToJsonArray(subDirList);
		for(int i = 0; i <jArr_DirList.length(); i++){
			JSONObject jObj = jArr_DirList.getJSONObject(i);
			jObj.put("text", jObj.get("name").toString());
			jObj.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.CHECKED, false);
			jObj.remove("name");
			_jArr_DirList.put(jObj);
		}
		jDir.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.DIR_LIST, _jArr_DirList);
		
		//response mems
		List<Member> mems = getMemberList(dir.get(CommonDir.DIR_ID));
		JSONArray jArr = JsonUtils.fromBeanListToJsonArray(mems);
		jDir.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.DIR_MEMBER, jArr);
				
		return jDir;		
	}
	
	private JSONObject createCommonDirNodeNoCheckBox(CommonDir dir) throws Exception {
		JSONObject jNode =  new JSONObject();
		jNode.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.DIR_ID, dir.get(CommonDir.DIR_ID));
		jNode.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.PARENT_DIR_ID, dir.get(CommonDir.PARENT_DIR_ID));
		jNode.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.TEXT, dir.get(CommonDir.NAME));
		jNode.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.LEAF, true);
		return jNode;
	}
	
	private JSONObject buildDirNodeNoCheckBox(CommonDir dir) throws Exception {
		JSONObject jDir = createCommonDirNodeNoCheckBox(dir);
		CommonDirDAO dirDao = new CommonDirDAO();
		List<CommonDir> subDirList = dirDao.getSubCommonDir(dir);
		if(subDirList.size() > 0) {
			jDir.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.LEAF, false);
		}
//		JSONArray jDirList = new JSONArray();
//		for (CommonDir subDir : subDirList) {
//			JSONObject dirNode = buildDirNodeNoCheckBox(subDir);
//			jDirList.put(dirNode);
//		}
		JSONArray _jArr_DirList = new JSONArray();
		JSONArray jArr_DirList = JsonUtils.fromBeanListToJsonArray(subDirList);
		for(int i = 0; i <jArr_DirList.length(); i++){
			JSONObject jObj = jArr_DirList.getJSONObject(i);
			jObj.put("text", jObj.get("name").toString());
			jObj.remove("name");
			_jArr_DirList.put(jObj);
		}
		jDir.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.DIR_LIST, _jArr_DirList);
		//response mems
		List<Member> mems = getMemberList(dir.get(CommonDir.DIR_ID));
		JSONArray jArr = JsonUtils.fromBeanListToJsonArray(mems);
		jDir.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.DIR_MEMBER, jArr);
		
		return jDir;		
	}
	
	private static JSONObject createCommonDirRootNode() throws Exception {
		JSONObject jNode =  new JSONObject();
		jNode.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.DIR_ID, 0);
		jNode.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.PARENT_DIR_ID, 0);
		jNode.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.TEXT, SystemParamGroup.SYSTEM_NAME);
		jNode.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.LEAF, true);
		jNode.put(JsParams.COMMON_DIR_TREE_GET_RESPONSE.CHECKED, false);
		return jNode;
	}


}
