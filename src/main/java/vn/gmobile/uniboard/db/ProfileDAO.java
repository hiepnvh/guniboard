/**
 * 
 */
package vn.gmobile.uniboard.db;

import java.util.ArrayList;
import java.util.List;

import com.base.filter.BeanInnerJoinFilter;
import com.base.filter.IntegerEqualFilter;
import com.bean.base.BeanFilter;

import vn.gmobile.uniboard.model.MenuFunction;
import vn.gmobile.uniboard.model.Profile;
import vn.gmobile.uniboard.model.ProfileFunctionRelation;

/**
 * @author QuangN
 *
 */
public class ProfileDAO {
	
	public List<Profile> getProfile(BeanFilter filter) throws Exception {
		DbAdapter dba = new DbAdapter();	
		List<Profile> beans = dba.getBeans(filter);
		dba.close();
		return beans;
	}
	
	public void updateProfile(Profile profile,List<Integer> functionIds) throws Exception {
		DbAdapter dba = new DbAdapter();
		dba.processBeans(profile);
		BeanFilter  relFilter = new BeanFilter(ProfileFunctionRelation.class);
		relFilter.setFilter(ProfileFunctionRelation.PROFILE_ID, new IntegerEqualFilter(profile.get(Profile.PROFILE_ID)));
		dba.removeBeans(relFilter);
		List<ProfileFunctionRelation> relations = new ArrayList<ProfileFunctionRelation>();
		for (Integer functionId: functionIds) {
			ProfileFunctionRelation re = new ProfileFunctionRelation();
			re.set(ProfileFunctionRelation.FUNCTION_ID, functionId);
			re.set(ProfileFunctionRelation.PROFILE_ID, profile.get(Profile.PROFILE_ID));
			relations.add(re);
		}
		
		dba.processBeans(relations);
		dba.close();
	}
	
	public List<MenuFunction> getFunctionOfProfile(Profile profile) throws Exception {
		DbAdapter dba = new DbAdapter();	
		BeanFilter  relFilter = new BeanFilter(ProfileFunctionRelation.class);
		relFilter.setFilter(ProfileFunctionRelation.PROFILE_ID, new IntegerEqualFilter(profile.get(Profile.PROFILE_ID)));
		BeanFilter filter = new BeanFilter(MenuFunction.class);
		filter.setFilter(MenuFunction.FUNCTION_ID, new BeanInnerJoinFilter(relFilter));
		List<MenuFunction> beans = dba.getBeans(filter);	
		dba.close();
		return beans;
	}
	

}
