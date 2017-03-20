package vn.gmobile.uniboard.model;



import java.util.Date;

import com.bean.annot.*;
import com.bean.base.Bean;
import com.bean.base.BeanProperty;



@Entity(name = "user")
public class User extends Bean {
	@Attribute(name = "user_id")
	@ExternalKey
	@Final
	public static final BeanProperty<Integer> USER_ID =  BeanProperty.integerType();
	@Attribute(name = "create_date")
	@Final
	public static final BeanProperty<Date> CREATE_DATE =  BeanProperty.dateType();
	@Attribute(name = "active")
	public static final BeanProperty<Integer> ACTIVE =  BeanProperty.integerType();
	@Attribute(name = "email")
	public static final BeanProperty<String> EMAIL =  BeanProperty.stringType();
	@Attribute(name = "username")
	public static final BeanProperty<String> USERNAME =  BeanProperty.stringType();
	@Attribute(name = "password")
	public static final BeanProperty<String> PASSWORD =  BeanProperty.stringType();
	@Attribute(name = "profile_id")
	public static final BeanProperty<Integer> PROFILE_ID =  BeanProperty.integerType();
	@Attribute(name = "name")
	public static final BeanProperty<String> NAME = BeanProperty.stringType();
	@Attribute(name = "mobile")
	public static final BeanProperty<String> MOBILE =  BeanProperty.stringType();
	@Attribute(name = "title")
	public static final BeanProperty<String>  TITLE =  BeanProperty.stringType();
	@Attribute(name = "signature")
	public static final BeanProperty<String> SIGNATURE =  BeanProperty.stringType();
	@Attribute(name = "brandname")
	public static final BeanProperty<String> BRANDNAME =  BeanProperty.stringType();
}
