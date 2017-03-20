/**
 * 
 */
package vn.gmobile.uniboard.db;

import java.util.List;

import com.bean.base.BeanFilter;

import vn.gmobile.uniboard.model.ProfileFunctionRelation;



/**
 * @author QuangN
 *
 */
public class ProfileFunctionRelationDAO {

	public List<ProfileFunctionRelation> getProfileFunctionRelation(BeanFilter filter) throws Exception {
		DbAdapter dba = new DbAdapter();
		List<ProfileFunctionRelation> beans = dba.getBeans(filter);
		dba.close();
		return beans;
	}
	
	public void updateProfileFunctionRelation(List<ProfileFunctionRelation> beans) throws Exception {
		DbAdapter dba = new DbAdapter();
		dba.processBeans(beans);
		dba.close();
	}
}
