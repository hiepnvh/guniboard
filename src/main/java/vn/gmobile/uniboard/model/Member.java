package vn.gmobile.uniboard.model;



import java.util.Date;

import com.bean.annot.*;
import com.bean.base.Bean;
import com.bean.base.BeanProperty;



@Entity(name = "member")
public class Member extends Bean {
	@Attribute(name = "member_id")
	@ExternalKey
	public static final BeanProperty<Integer> MEMBER_ID =  BeanProperty.integerType();
	@Attribute(name = "name")
	public static final BeanProperty<String> NAME =  BeanProperty.stringType();
	@Attribute(name = "msisdn")
	public static final BeanProperty<String> MSISDN =  BeanProperty.stringType();
	@Attribute(name = "create_date")
	public static final BeanProperty<Date> CREATE_DATE =  BeanProperty.dateType();
}
