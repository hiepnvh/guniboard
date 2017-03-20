package vn.gmobile.uniboard.model;



import java.util.Date;

import com.bean.annot.*;
import com.bean.base.Bean;
import com.bean.base.BeanProperty;



@Entity(name = "campaign")
public class Campaign extends Bean {
	@Attribute(name = "campaign_id")
	@ExternalKey
	public static final BeanProperty<Integer> CAMPAIGN_ID =  BeanProperty.integerType();
	@Attribute(name = "create_date")
	public static final BeanProperty<Date> CREATE_DATE =  BeanProperty.dateType();
	@Attribute(name = "campaign_code")
	public static final BeanProperty<String> CAMPAIGN_CODE =  BeanProperty.stringType();
	@Attribute(name = "send_date")
	public static final BeanProperty<Date> SEND_DATE =  BeanProperty.dateType();
	@Attribute(name = "shortcode")
	public static final BeanProperty<String> SHORTCODE =  BeanProperty.stringType();
	@Attribute(name = "title")
	public static final BeanProperty<String> TITLE =  BeanProperty.stringType();
	@Attribute(name = "text")
	public static final BeanProperty<String> TEXT =  BeanProperty.stringType();
	@Attribute(name = "user_id")
	public static final BeanProperty<Integer> USER_ID =  BeanProperty.integerType();
	@Attribute(name = "parent_campaign_id")
	public static final BeanProperty<Integer> PARENT_CAMPAIGN_ID =  BeanProperty.integerType();
}
