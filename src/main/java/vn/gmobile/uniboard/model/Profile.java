/**
 * 
 */
package vn.gmobile.uniboard.model;


import java.util.Date;

import com.bean.annot.*;
import com.bean.base.Bean;
import com.bean.base.BeanProperty;



/**
 * @author QuangN
 *
 */

@Entity(name = "profile")
public class Profile extends Bean{
	@Attribute(name = "profile_id")
	@ExternalKey
	@Final
	public static final BeanProperty<Integer> PROFILE_ID =  BeanProperty.integerType();
	@Attribute(name = "create_date")
	@Final
	public static final BeanProperty<Date> CREATE_DATE = BeanProperty.dateType();
	@Attribute(name = "name")
	public static final BeanProperty<String> NAME =  BeanProperty.stringType();
	


}
