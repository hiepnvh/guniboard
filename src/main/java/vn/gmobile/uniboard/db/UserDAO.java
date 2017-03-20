/**
 * 
 */
package vn.gmobile.uniboard.db;

import java.util.List;
import java.util.Set;

import com.base.filter.BeanInnerJoinFilter;
import com.base.filter.IntegerEqualFilter;
import com.base.filter.StringEqualFilter;
import com.bean.base.BeanFilter;

import vn.gmobile.uniboard.model.MenuFunction;
import vn.gmobile.uniboard.model.Profile;
import vn.gmobile.uniboard.model.ProfileFunctionRelation;
import vn.gmobile.uniboard.model.User;





/**
 * @author QuangN
 *
 */
public class UserDAO {
	public List<User> getUser(BeanFilter filter) throws Exception {
		DbAdapter dba = new DbAdapter();
		List<User> beans =  dba.getBeans(filter);
		dba.close();
		return beans;
	}
	
	public void updateUser(User user) throws Exception {
		DbAdapter dba = new DbAdapter();
		dba.processBeans(user);
		dba.close();
	}
	
	public void updateUser(User user, Set<Integer> _set) throws Exception {
		DbAdapter dba = new DbAdapter();
		dba.processBeans(user);
		if(_set!=null){
			CommonDirDAO dao = new CommonDirDAO();
			dao.updateCommonDirPermission(user.get(User.USER_ID), _set);
		}
		
		dba.close();
	}
	
	public User getUser(Integer userId) throws Exception {
		BeanFilter  filter = new BeanFilter(User.class);
		filter.setFilter(User.USER_ID, new IntegerEqualFilter(userId));
		List<User> beans = getUser(filter);
		if (beans!=null && beans.size()>0)
			return beans.get(0);
		return null;
	}
	
	public User getUser(String username,String password) throws Exception {
		BeanFilter filter = new BeanFilter(User.class);
		filter.setFilter(User.USERNAME,new StringEqualFilter(username));
		filter.setFilter(User.PASSWORD, new StringEqualFilter(password));
		List<User> beans = getUser(filter);
		if (beans!=null && beans.size()>0)
			return beans.get(0);
		return null;
	}
	
	
	public List<MenuFunction> getFunctionOfUser(User user) throws Exception {
		DbAdapter dba = new DbAdapter();
		BeanFilter  reFilter = new BeanFilter (ProfileFunctionRelation.class);
		reFilter.setFilter(ProfileFunctionRelation.PROFILE_ID, new IntegerEqualFilter(user.get(User.PROFILE_ID)));
		BeanFilter filter = new BeanFilter (MenuFunction.class);
		filter.setFilter(MenuFunction.FUNCTION_ID, new BeanInnerJoinFilter(reFilter));
		List<MenuFunction> beans = dba.getBeans(filter);	
		dba.close();
		return beans;
	}
	
	public Profile getProfileOfUser(User user) throws Exception {
		DbAdapter dba = new DbAdapter();
		BeanFilter filter = new BeanFilter (Profile.class);
		filter.setFilter(Profile.PROFILE_ID, new IntegerEqualFilter(user.get(User.PROFILE_ID)));
		List<Profile> beans = dba.getBeans(filter);	
		dba.close();
		if (beans!=null && beans.size()>0)
			return beans.get(0);
		return null;
	}
}
