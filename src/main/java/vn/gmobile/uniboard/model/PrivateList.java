package vn.gmobile.uniboard.model;



import java.util.Date;

import com.bean.annot.*;
import com.bean.base.Bean;
import com.bean.base.BeanProperty;



@Entity(name = "private_list")
public class PrivateList extends Bean {
	@Attribute(name = "list_id")
	@ExternalKey
	public static final BeanProperty<Integer> LIST_ID =  BeanProperty.integerType();
	@Attribute(name = "name")
	public static final BeanProperty<String> ENTRY_NAME =  BeanProperty.stringType();
	@Attribute(name = "description")
	public static final BeanProperty<String> DESCRIPTION =  BeanProperty.stringType();
	@Attribute(name = "active")
	public static final BeanProperty<Boolean> ACTIVE =  BeanProperty.boolType();
	@Attribute(name = "create_date")
	public static final BeanProperty<Date> CREATE_DATE =  BeanProperty.dateType();
	@Attribute(name = "user_id")
	public static final BeanProperty<Integer> USER_ID =  BeanProperty.integerType();
}
