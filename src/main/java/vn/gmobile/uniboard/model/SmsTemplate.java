/**
 * @author anhta
 */
package vn.gmobile.uniboard.model;

import com.bean.annot.*;
import com.bean.base.Bean;
import com.bean.base.BeanProperty;

@Entity(name = "sms_template")
public class SmsTemplate extends Bean{
	@Attribute(name = "templ_name")
	public final static BeanProperty<String> TEMPL_NAME = BeanProperty.stringType();
	@Attribute(name = "from")
	public final static BeanProperty<String> FROM = BeanProperty.stringType();
	@Attribute(name = "to")
	public final static BeanProperty<String> TO = BeanProperty.stringType();
	@Attribute(name = "content")
	public final static BeanProperty<String> CONTENT = BeanProperty.stringType();
}
