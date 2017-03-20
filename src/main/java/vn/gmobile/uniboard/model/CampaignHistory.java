package vn.gmobile.uniboard.model;



import java.util.Date;

import com.bean.annot.*;
import com.bean.base.Bean;
import com.bean.base.BeanProperty;



@Entity(name = "campaign_history")
public class CampaignHistory extends Bean {
	@Attribute(name = "campaign_id")
	@ExternalKey
	public static final BeanProperty<Integer> CAMPAIGN_ID =  BeanProperty.integerType();
	@Attribute(name = "msisdn")
	@ExternalKey
	public static final BeanProperty<String> MSISDN =  BeanProperty.stringType();
	@Attribute(name = "status")
	public static final BeanProperty<Integer> STATUS =  BeanProperty.integerType();
	@Attribute(name = "reply")
	public static final BeanProperty<String> REPLY =  BeanProperty.stringType();
}
