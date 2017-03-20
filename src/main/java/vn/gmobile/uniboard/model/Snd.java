package vn.gmobile.uniboard.model;

import java.util.Date;
import com.bean.annot.*;
import com.bean.base.Bean;
import com.bean.base.BeanProperty;

@Entity(name = "snd")
public class Snd extends Bean {
	@Attribute(name = "snd_id")
	@ExternalKey
	public static final BeanProperty<Integer> snd_id = BeanProperty.integerType();
	@Attribute(name = "snd_from")
	public static final BeanProperty<String> snd_from = BeanProperty.stringType();
	@Attribute(name = "snd_to")
	public static final BeanProperty<String> snd_to = BeanProperty.stringType();
	@Attribute(name = "snd_txt")
	public static final BeanProperty<String> snd_txt = BeanProperty.stringType();
	@Attribute(name = "snd_sentat")
	public static final BeanProperty<Date> snd_sentat = BeanProperty.dateType();
	@Attribute(name = "snd_success")
	public static final BeanProperty<Date> snd_success = BeanProperty.dateType();
	@Attribute(name = "snd_failure")
	public static final BeanProperty<Date> snd_failure = BeanProperty.dateType();
	@Attribute(name = "snd_submitted")
	public static final BeanProperty<Date> snd_submitted = BeanProperty.dateType();
	@Attribute(name = "snd_buffered")
	public static final BeanProperty<Date> snd_buffered = BeanProperty.dateType();
	@Attribute(name = "snd_rejected")
	public static final BeanProperty<Date> snd_rejected = BeanProperty.dateType();
	@Attribute(name = "snd_intermediate")
	public static final BeanProperty<Date> snd_intermediate = BeanProperty.dateType();
	@Attribute(name = "snd_last")
	public static final BeanProperty<Integer> snd_last = BeanProperty.integerType();
	@Attribute(name = "snd_status")
	public static final BeanProperty<Integer> snd_status = BeanProperty.integerType();
	@Attribute(name = "snd_batch_id")
	public static final BeanProperty<Integer> snd_batch_id = BeanProperty.integerType();
}
