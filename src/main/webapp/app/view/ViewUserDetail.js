Ext.define(App.path('view.ViewUserDetail'), {
	extend : 'Ext.form.Panel',
	itemId : 'ViewUserDetail',
	id : 'ViewUserDetail',
	bodyStyle : 'background-color: transparent',
	border : false,
	layout : 'fit',
	requires : [App.path('view.ViewCommonDirTreePerCheck')],
	title : 'Thông tin chi tiết người dùng',
	config : {
		common_dir_id_arr : [],
		record : null,
		fieldDefaults : {
			margin : '5'
		},
		flex : 1,
		items : [{
			region : 'center',
			border : false,
			height : 500,
			layout : {
					type : 'hbox',
					align : 'stretch',
					pack : 'start'
				},
			items : [{
				flex : 0.6,
				items : [{
					border : false,
					items : [{
						border : false,
						layout : 'hbox',
						defaultType : 'textfield',
						items : [{
									flex : 1,
									itemId : 'user_id',
									hidden : true
								}, {
									flex : 1,
									itemId : 'username',
									fieldLabel : 'Tên truy cập<span style="color: red;">(*)</span>',
									readOnly : true,
									fieldStyle : 'background-color: #ddd; background-image: none;'
								}, {
									flex : 1,
									xtype : 'datefield',
									format : 'd/m/Y',
									value : new Date(),
									itemId : 'create_date',
									fieldLabel : 'Ngày tạo',
									readOnly : true,
									fieldStyle : 'background-color: #ddd; background-image: none;'
								}]
					}, {
						border : false,
						layout : 'hbox',
						defaultType : 'textfield',
						items : [{
									flex : 1,
									itemId : 'name',
									fieldLabel : 'Họ tên'
								}, {
									flex : 1,
									xtype : 'combobox',
									itemId : 'profile_id',
									store : App.path('store.Profile'),
									displayField : 'name',
									valueField : 'profile_id',
									fieldLabel : 'Thuộc nhóm'
								}]
					}, {
						border : false,
						layout : 'hbox',
						defaultType : 'textfield',
						items : [{
							flex : 1,
							itemId : 'password',
							inputType : 'password',
							fieldLabel : 'Mật khẩu',
//							fieldStyle : 'background-color: #ddd; background-image: none;'
						}, {
							flex : 1,
							itemId : 'mobile',
							fieldLabel : 'Số điện thoại',
							maskRe : /[0-9]/
						}]
					}, {
						border : false,
						layout : 'hbox',
						defaultType : 'textfield',
						items : [/*{
							flex : 1,
							itemId : 'title',
							fieldLabel : 'Tiêu đề'
						}, */{
							flex : 1,
							itemId : 'signature',
							fieldLabel : 'Chữ ký'
						}]
					}, {
						border : false,
						layout : 'hbox',
						defaultType : 'textfield',
						items : [{
									flex : 1,
									itemId : 'email',
									fieldLabel : 'Email'
								}, {
									flex : 1,
									itemId : 'brandname',
									fieldLabel : 'Đầu số gửi<span style="color: red;">(*)'
								}]
					}, {
						border : false,
						layout : 'hbox',
						defaultType : 'textfield',
						items : [ {
							flex : 1,
							xtype : 'textarea',
							itemId : 'dirpermission',
							readOnly : true,
							fieldStyle : 'background-color: #ddd; background-image: none;',
							fieldLabel : 'Phòng/ban quản lý'
						}]
					}, {
						border : false,
						layout : 'vbox',
						items : [{
									xtype : 'checkbox',
									boxLabel : 'Có hiệu lực',
									itemId : 'active'
								}]

					}, {
						border : false,
						layout : 'hbox',
						items : [{
									xtype : 'tbfill'
								}, {
									width : 100,
									border : false,
									buttons : [{
										text : 'Lưu thông tin',
										handler : function() {
											var form = this.up('form');
											form.Update();
										}
									}]
								}]
					}]
				}]
			},{
				flex : 0.4,
				itemId : 'viewcommondirtreepercheck',
				xtype : 'ViewCommonDirTreePerCheck'
			}]
		}]
	},
	activate : function() {
		this.down('#viewcommondirtreepercheck').activate(this.record.data.user_id);
//		var items = this.down('#viewcommondirtreepercheck').getChecked();
//		console.log(items);
		console.log(this.down('#dirpermission'));
		var me = this;
		var user_id = App.Session.user_id;
    	var user_id_per = this.record.data.user_id;
    	var tree_type = App.Constant.TREE_PERMISSION;
		App.Action.CommonDirMemberPermissionGet(user_id,user_id_per,tree_type, function(options, success, response) {
            if (success) {
                response = Ext.decode(response.responseText);
                if (response.success) {
                    console.log(response);
                    var list = response.permission_list[0].name;
                    for(i=1;i<response.permission_list.length;i++)
                    	list += ', ' + response.permission_list[i].name ;
                    me.down('#dirpermission').setValue(list);

                } else {
                    Ext.MessageBox.alert('Thông báo', 'Đăng nhập không thành công '+ (response.info ? response.info : ''));
                }
            } else {
                Ext.MessageBox.alert('Thông báo', 'Đường truyền lỗi vui lòng thử lại sau');
            }
        });
		Ext.get(document.body).mask('Chờ giây lát..');
		var me = this;
		var data = me.record.data;
		this.down('#user_id').setValue(data.user_id);
		this.down('#active').setValue(data.active);
		this.down('#profile_id').setValue(data.profile_id);
		this.down('#username').setValue(data.username);
		this.down('#email').setValue(data.email);
		this.down('#password').setValue(data.password);
		this.down('#mobile').setValue(App.ActionMe.FormatMsisdn(data.mobile));
		this.down('#name').setValue(data.name);
//		this.down('#title').setValue(data.title);
		this.down('#signature').setValue(data.signature);
		this.down('#brandname').setValue(data.brandname);
		this.down('#create_date').setValue(App.ActionMe.DateFromDB(data.create_date));
		Ext.get(document.body).unmask();
		
	},
	Update : function() {
		if(this.IsValidForm()) {
	//		All items checked!
			var items = this.down('#viewcommondirtreepercheck').getChecked();
	        
	//		Add all items in a map
			var map = new Ext.util.HashMap();
			Ext.Array.each(items, function(rec) {
				map.add(rec.data.dir_id,rec.data);
	        });
	        
	        var map_work = map.clone();
			
	        var child_id_list = map.getKeys();
	        var parent_list = map.getValues();
	        
	//        Remove child if parent exist
	        Ext.Array.each(parent_list, function(rec) {
				if(map.containsKey(rec.parent_dir_id))
					map_work.removeAtKey(rec.dir_id);
	        });
	        
	//		map_work.each(function(key, value, length){
	//		    console.log(key, value, length);
	//		});
			
			this.common_dir_id_arr = map_work.getKeys();
			
	//		for(var i=0;i<items.length;i++) {
	//			this.common_dir_id_arr.push(items[i].data.dir_id);
	//		}
	//		
			Ext.get(document.body).mask('Chờ giây lát..');
			var me = this;
			//check if password doesnt change (is currently in md5 encoding)
			var pwd = this.down('#password').getValue();
			if(pwd.length!=32)
				pwd = Ext.util.MD5(pwd);
				
			var user = Ext.encode({
						user_id : this.down('#user_id').getValue(),
						active : this.down('#active').getValue() ? "1" : "0",
						profile_id : this.down('#profile_id').getValue().toString(),
						username : this.down('#username').getValue(),
						email : this.down('#email').getValue(),
						password : pwd,
						mobile : this.down('#mobile').getValue(),
						name : this.down('#name').getValue(),
	//					title : this.down('#title').getValue(),
						signature : this.down('#signature').getValue(),
						brandname : this.down('#brandname').getValue(),
						create_date : App.ActionMe.DateToDB(this.down('#create_date').getValue())
					});
			
			App.Action.UserUpdate(App.Session.user_id, user, Ext.encode(this.common_dir_id_arr),
					function(options, success, response) {
						Ext.get(document.body).unmask();
						if (success) {
							response = Ext.decode(response.responseText);
							if (response.success) {
								Ext.MessageBox.alert('Thông báo','Cập nhật thành công');
								me.getForm().reset();
								Ext.getCmp('ViewUser').Search();
							} else {
								Ext.MessageBox.alert('Thông báo',
										'Cập nhật thất bại ' + response.info);
							}
						} else {
							ViewIndex.setLoading(false);
							Ext.MessageBox.alert('Thông báo', 'Cập nhật thất bại ' + response.info);
						}
					});
					this.common_dir_id_arr = [];
		}
	},
	IsValidForm : function() {
		if (this.down('#username').getValue() == '') {
			Ext.MessageBox.alert('Thông báo', 'Chưa điền tên đăng nhập');
			return false;
		}
		if (this.down('#brandname').getValue() == '') {
			Ext.MessageBox.alert('Thông báo', 'Chưa điền đầu số gửi');
			return false;
		}
		var items = this.down('#viewcommondirtreepercheck').getChecked();
		if(items.length==0){
			Ext.MessageBox.alert('Thông báo', 'Chưa chọn Danh bạ chung cho người dùng');
			return false;
		}
	return true;
	}
});


