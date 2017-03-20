package vn.gmobile.uniboard.model;



import java.util.Date;

import com.bean.annot.*;
import com.bean.base.Bean;
import com.bean.base.BeanProperty;



@Entity(name = "sms_history")
public class SmsHistory extends Bean {
	@Attribute(name = "user_id")
	@ExternalKey
	public static final BeanProperty<Integer> USER_ID =  BeanProperty.integerType();
	@Attribute(name = "shortcode")
	@ExternalKey
	public static final BeanProperty<String> SHORTCODE =  BeanProperty.stringType();
	@Attribute(name = "send_date")
	@ExternalKey
	@Final
	public static final BeanProperty<String> SEND_DATE =  BeanProperty.stringType();
	@Attribute(name = "title")
	public static final BeanProperty<String> TITLE =  BeanProperty.stringType();
	@Attribute(name = "text")
	public static final BeanProperty<String> TEXT =  BeanProperty.stringType();
}
