package vn.gmobile.uniboard.model;

import java.util.Date;
import com.bean.annot.*;
import com.bean.base.Bean;
import com.bean.base.BeanProperty;

@Entity(name = "snd_scheduler")
public class SndScheduler extends Bean {
	@Attribute(name = "id")
	@ExternalKey
	public static final BeanProperty<Integer> id = BeanProperty.integerType();
	@Attribute(name = "campaign_id")
	public static final BeanProperty<Integer> campaign_id = BeanProperty.integerType();
	@Attribute(name = "shortcode")
	public static final BeanProperty<String> from = BeanProperty.stringType();
	@Attribute(name = "msisdn")
	public static final BeanProperty<String> to = BeanProperty.stringType();
	@Attribute(name = "txt")
	public static final BeanProperty<String> txt = BeanProperty.stringType();
	@Attribute(name = "sentat")
	public static final BeanProperty<Date> sentat = BeanProperty.dateType();
}
