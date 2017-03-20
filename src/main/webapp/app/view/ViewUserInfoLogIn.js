Ext.define(App.path('view.ViewUserInfoLogIn'), {
	extend : 'Ext.form.Panel',
	itemId : 'ViewUserInfoLogIn',
	bodyStyle : 'background-color: transparent',
	border : false,
	layout : 'fit',
	config : {
		record : null,
		fieldDefaults : {
			margin : '5'
		},
		items : [{
			region : 'center',
			border : false,
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
										fieldStyle: 'background-color: #ddd; background-image: none;'
									}, {
										flex : 1,
										xtype : 'datefield',
										format : 'd/m/Y',
										value : new Date(),
										itemId : 'create_date',
										fieldLabel : 'Ngày tạo',
										readOnly : true,
										fieldStyle: 'background-color: #ddd; background-image: none;'
									}]
						}, {
							border : false,
							layout : 'hbox',
							defaultType : 'textfield',
							items : [{
										flex : 1,
										itemId : 'name',
										fieldLabel : 'Họ tên'
										, readOnly : true
										, fieldStyle: 'background-color: #ddd; background-image: none;'
									}, {
										flex : 1,
										xtype : 'combobox',
										itemId : 'profile_id',
										store: App.path('store.Profile'),
                                        displayField: 'name',
                                        valueField: 'profile_id',
										fieldLabel : 'Thuộc nhóm'
										, readOnly : true
										, fieldStyle: 'background-color: #ddd; background-image: none;'
									}]
						}, {
							border : false,
							layout : 'hbox',
							defaultType : 'textfield',
							items : [{
										flex : 1,
										itemId : 'password',
										inputType : 'password',
										fieldLabel : 'Mật khẩu'
										, readOnly : true
										, fieldStyle: 'background-color: #ddd; background-image: none;'
									}, {
										flex : 1,
										itemId : 'status',
										fieldLabel : 'Trạng thái'
										, readOnly : true
										, fieldStyle: 'background-color: #ddd; background-image: none;'
									}
									]
						}, {
							border : false,
							layout : 'hbox',
							defaultType : 'textfield',
							items : [{
										flex : 1,
										itemId : 'email',
										fieldLabel : 'Email'
										, readOnly : true
										, fieldStyle: 'background-color: #ddd; background-image: none;'
									}, {
										flex : 1,
										itemId : 'mobile',
										fieldLabel : 'Số điện thoại'
										, readOnly : true
										, fieldStyle: 'background-color: #ddd; background-image: none;'
									}]
						}, {
							border : false,
							layout : 'hbox',
							defaultType : 'textfield',
							items : [{
										flex : 1,
										itemId : 'title',
										fieldLabel : 'Tiêu đề'
										, readOnly : true
													, fieldStyle: 'background-color: #ddd; background-image: none;'
									}, {
										flex : 1,
										itemId : 'signature',
										fieldLabel : 'Chữ ký'
										, readOnly : true
										, fieldStyle: 'background-color: #ddd; background-image: none;'
									}]
						},{
							border : false,
							layout : 'hbox',
							items : [{
										xtype : 'checkbox',
										boxLabel : 'Có hiệu lực',
										itemId : 'active',
										name : 'active'
										, readOnly : true
									}]
						
						}]
			}]
		}]
	},
	activate : function() {
		var data = App.Session.infoUser;
		
		this.down('#user_id').setValue(data.user_id);
		this.down('#active').setValue(data.active);
		this.down('#profile_id').setValue(data.profile_id);
		this.down('#username').setValue(data.username);
		this.down('#email').setValue(data.email);
		this.down('#password').setValue(data.password);
		this.down('#mobile').setValue(data.mobile);
		this.down('#name').setValue(data.name);
		this.down('#title').setValue(data.title);
		this.down('#signature').setValue(data.signature);
		this.down('#create_date').setValue(App.ActionMe.DateFromDB(data.create_date));
	}
});

