package vn.gmobile.uniboard.model;



import java.util.Date;

import com.bean.annot.*;
import com.bean.base.Bean;
import com.bean.base.BeanProperty;



@Entity(name = "common_dir")
public class CommonDir extends Bean {
	@Attribute(name = "dir_id")
	@ExternalKey
	@Final
	public static final BeanProperty<Integer> DIR_ID =  BeanProperty.integerType();
	@Attribute(name = "create_date")
	@Final
	public static final BeanProperty<Date> CREATE_DATE =  BeanProperty.dateType();
	@Attribute(name = "name")
	public static final BeanProperty<String> NAME =  BeanProperty.stringType();
	@Attribute(name = "parent_dir_id")
	public static final BeanProperty<Integer> PARENT_DIR_ID =  BeanProperty.integerType();
}
