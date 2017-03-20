package vn.gmobile.uniboard.model;

import com.bean.annot.Attribute;
import com.bean.annot.ExternalKey;
import com.bean.annot.Entity;
import com.bean.base.Bean;
import com.bean.base.BeanProperty;


@Entity(name = "message")
public class Message extends Bean {
	@Attribute(name = "type")
	public static final BeanProperty<String> TYPE = BeanProperty.stringType();
	@Attribute(name = "acronym")
	public static final BeanProperty<String> ACRONYM = BeanProperty.stringType();
	@Attribute(name = "text")
	public static final BeanProperty<String> TEXT = BeanProperty.stringType();
	@Attribute(name = "code")
	@ExternalKey
	public static final BeanProperty<Integer> CODE = BeanProperty.integerType();

}
