package vn.gmobile.uniboard.message;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.json.JSONObject;

import com.base.filter.BeanInnerJoinFilter;
import com.base.filter.IntegerEqualFilter;
import com.base.filter.IntegerInFilter;
import com.base.filter.StringEqualFilter;
import com.base.filter.StringLikeFilter;
import com.bean.base.BeanFilter;
import com.graphbuilder.struc.LinkedList;

import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.db.CommonDirDAO;
import vn.gmobile.uniboard.db.UserDAO;
import vn.gmobile.uniboard.model.CommonDir;
import vn.gmobile.uniboard.model.CommonDirPermission;
import vn.gmobile.uniboard.model.MenuFunction;
import vn.gmobile.uniboard.model.Profile;
import vn.gmobile.uniboard.model.User;

public class UserGetRequest extends JsonRequest {

	/**
	 * @param jObj
	 * @throws Exception 
	 */
	public UserGetRequest(JSONObject jObj) throws Exception {
		super(jObj);
		_filter =  new BeanFilter(User.class);
		if (jObj.has(JsParams.COMMON_DIR_TREE_GET_REQUEST.USER_ID)) 
			_userId = jObj.getInt(JsParams.COMMON_DIR_TREE_GET_REQUEST.USER_ID);
		if (jObj.has(JsParams.GET_USER_REQUEST.USERNAME))
			_filter.setFilter(User.USERNAME, new StringLikeFilter(jObj.getString(JsParams.GET_USER_REQUEST.USERNAME)));
		if (jObj.has(JsParams.GET_USER_REQUEST.PROFILE_ID))
			_filter.setFilter(User.PROFILE_ID, new IntegerEqualFilter(jObj.getInt(JsParams.GET_USER_REQUEST.PROFILE_ID)));
		
	}

	BeanFilter _filter;
	
	@Override
	public JsonResponse execute() {
		UserGetResponse resp = new UserGetResponse();
		try {
			//get all unit of current user
			CommonDirDAO dDao = new CommonDirDAO();
			BeanFilter dFilter = new BeanFilter(CommonDirPermission.class);
			dFilter.setFilter(CommonDirPermission.USER_ID, new IntegerEqualFilter(_userId));
			List<CommonDirPermission> cdps = dDao.getCommonDirPermission(dFilter);
			List<CommonDir> allDirs = new ArrayList<CommonDir>();
			
			for(CommonDirPermission cdp : cdps){
				CommonDir dir = new CommonDir();
				dir.set(CommonDir.DIR_ID, cdp.get(CommonDirPermission.DIR_ID));
				allDirs.addAll(dDao.getAllSubDir(dir));
				allDirs.add(dir);
			}
			Set<Integer> allDirs_Id = new HashSet<Integer>();
			for(CommonDir d : allDirs){
				allDirs_Id.add(d.get(CommonDir.DIR_ID));
			}
			BeanFilter _relFilter = new BeanFilter(CommonDirPermission.class);
			_relFilter.setFilter(CommonDirPermission.DIR_ID, new IntegerInFilter(allDirs_Id));
			_filter.setFilter(User.USER_ID, new BeanInnerJoinFilter(_relFilter));
			
			UserDAO dao = new UserDAO();
			List<User> userBeans = dao.getUser(_filter);
			List<User> cleanList = clearListFromDuplicateFirstName(userBeans);
//			removeDuplicates(userBeans);
			System.out.println(cleanList.size());
			for (User userBean:  cleanList) {
				Profile profileBean = dao.getProfileOfUser(userBean);
				List<MenuFunction> functionBeans = dao.getFunctionOfUser(userBean);
				resp.addUser(userBean, profileBean, functionBeans);
			}
			
			resp.setSuccess(true);
		} catch (Exception exc) {
			exc.printStackTrace();
			resp.setSuccess(false);
			resp.setInfo(exc.getMessage());
			
		}
		return resp;
	}
	
	public static void removeDuplicates(List<User> list) {
	    final Set<User> encountered = new HashSet<User>();
	    for (Iterator<User> iter = list.iterator(); iter.hasNext(); ) {
	        final User t = iter.next();
	        final boolean first = encountered.add(t);
	        if (!first) {
	            iter.remove();
	        }
	    }
	}
	
	private List<User> clearListFromDuplicateFirstName(List<User> list1) {

		Map<String, User> cleanMap = new LinkedHashMap<String, User>();
		for (int i = 0; i < list1.size(); i++) {
		     cleanMap.put(list1.get(i).get(User.USERNAME), list1.get(i));
		}
		List<User> list = new ArrayList<User>(cleanMap.values());
		return list;
		}

}

class UserWrapper {
	   private User user; //set via constructor etc.

	   public int hashCode() {
	     int hashCode = user.get(User.USER_ID).hashCode(); //check for null etc.
	     //add the other hash codes as well
	     return hashCode;
	   }

	   public boolean equals(Object obj) {
		   if(obj instanceof User)
		    {
		        User temp = (User) obj;
		        if(user.get(User.USER_ID) == temp.get(User.USER_ID))
		            return true;
		    }
		    return false;
	   }
	 }
