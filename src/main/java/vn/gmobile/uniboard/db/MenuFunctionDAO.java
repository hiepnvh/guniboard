/**
 * 
 */
package vn.gmobile.uniboard.db;

import java.util.List;

import com.bean.base.BeanFilter;

import vn.gmobile.uniboard.model.MenuFunction;

public class MenuFunctionDAO {
	public List<MenuFunction> getFunction(BeanFilter filter) throws Exception {
		DbAdapter dba = new DbAdapter();
		List<MenuFunction> beans =  dba.getBeans(filter);
		dba.close();
		return beans;
	}
}
