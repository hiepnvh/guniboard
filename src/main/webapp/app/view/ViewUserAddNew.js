Ext.define(App.path('view.ViewUserAddNew'), {
	extend : 'Ext.form.Panel',
	itemId : 'ViewUserAddNew',
	id : 'ViewUserAddNew',
	bodyStyle : 'background-color: transparent',
	border : false,
	layout : 'fit',
	title : 'Thêm người dùng mới',
	requires : [App.path('view.ViewCommonDirTreePerNoCheck')],
	config : {
		common_dir_id_arr : [],
		record : null,
		fieldDefaults : {
			margin : '5'
		},
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
									fieldLabel : 'Tên truy cập<span style="color: red;">(*)</span>'
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
									value : 1,
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
//							readOnly : true,
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
									xtype : 'label'
								}]
					}, {
						border : false,
						layout : 'hbox',
						defaultType : 'textfield',
						items : [{
									flex : 1,
									itemId : 'brandname',
									fieldLabel : 'Đầu số gửi<span style="color: red;">(*)'
								}, {
									flex : 1,
									xtype : 'label'
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
			}, {
				flex : 0.4,
				itemId : 'viewcommondirtreepernocheck',
				xtype : 'ViewCommonDirTreePerNoCheck'
			}]
		}]
	},
	activate : function() {
		console.log('add new user');
		this.down('#viewcommondirtreepernocheck').activate(1);
	},
	Update : function() {
		if(this.IsValidForm()) {
			
//		All items checked!
			var items = this.down('#viewcommondirtreepernocheck').getChecked();
	        
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
			
			var user = Ext.encode({
	//					user_id : this.down('#user_id').getValue(),
						active : this.down('#active').getValue() ? "1" : "0",
						profile_id : this.down('#profile_id').getValue().toString(),
						username : this.down('#username').getValue(),
						email : this.down('#email').getValue(),
						password : Ext.util.MD5(this.down('#password').getValue()),
						mobile : this.down('#mobile').getValue(),
						name : this.down('#name').getValue(),
//						title : this.down('#title').getValue(),
						signature : this.down('#signature').getValue(),
						brandname : this.down('#brandname').getValue(),
						create_date : App.ActionMe.DateToDB(this.down('#create_date').getValue())
					});
			
			var text = 'Thêm mới';
			App.Action.UserUpdate(App.Session.user_id, user, Ext.encode(this.common_dir_id_arr),
					function(options, success, response) {
						Ext.get(document.body).unmask();
						if (success) {
							response = Ext.decode(response.responseText);
							if (response.success) {
								Ext.MessageBox.alert('Thông báo', text +' thành công');
								me.getForm().reset();
								Ext.getCmp('ViewUser').Search();
							} else {
								Ext.MessageBox.alert('Thông báo',text +' thất bại ' + response.info);
							}
						} else {
							ViewIndex.setLoading(false);
							Ext.MessageBox.alert('Thông báo', text +' thất bại ' + response.info);
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
		var items = this.down('#viewcommondirtreepernocheck').getChecked();
		if(items.length==0){
			Ext.MessageBox.alert('Thông báo', 'Chưa chọn Danh bạ chung cho người dùng');
			return false;
		}
	return true;
	}
});


