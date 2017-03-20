package vn.gmobile.uniboard.model;



import java.util.Date;

import com.bean.annot.*;
import com.bean.base.Bean;
import com.bean.base.BeanProperty;



@Entity(name = "common_dir_permission")
public class CommonDirPermission extends Bean {
	@Attribute(name = "dir_id")
	@ExternalKey
	public static final BeanProperty<Integer> DIR_ID =  BeanProperty.integerType();
	@Attribute(name = "user_id")
	@ExternalKey
	public static final BeanProperty<Integer> USER_ID =  BeanProperty.integerType();
}
