Ext.define(App.path('view.ViewProfileAddNew'), {
	extend : 'Ext.form.Panel',
	xtype : 'ViewProfileAddNew',
	itemId : 'ViewProfileAddNew',
	bodyStyle : 'background-color: transparent',
	title : 'Thêm nhóm người dùng mới',
	border : false,
//	margin : 10,
	config : {
		border : false,
		record : null,
		fieldDefaults : {
			margin : '5'
		},
		items : [{
					border : false,
					bodyStyle : 'background-color: transparent',
					width : '100%',
					height : 150,
					xtype : 'itemselector',
					name : 'premission',
					itemId : 'GroupUserPermissionAddNew',
					anchor : '100%',
					store : Ext.create('Ext.data.Store', {
								fields : ['function_id','name']
								,storeId: 'funclistAddNew'
							}),
					displayField : 'name',
					valueField : 'function_id',
					allowBlank : false,
					msgTarget : 'side',
					fromTitle : 'Quyền chưa được cấp',
					toTitle : 'Quyền đã được cấp'
				}, {
					xtype : 'toolbar',
					border : false,
					dock : 'bottom',
					ui : 'footer',
					defaults : {
						minWidth : 85,
						border : false
					},
					items : ['->', {
								minHeight : 20,
								border : true,
								xtype : 'button',
								text : 'Lưu',
								margin : '0 0 0 0',
								handler : function() {
									var me = this.up('form');
									me.AddNewProfile();
								}
							}]
				}],
		dockedItems : [{
			border : false,
			dock : 'top',
			items : [{
				layout : 'hbox',
				padding : '0% 30% 0% 0%',
				margin : '5',
				border : false,
				items : [{
							xtype : 'textfield',
							itemId : 'agentId',
							name : 'agentId',
							hidden : true
						}, {
							flex : 1,
							border : false,
							fieldLabel : 'Mã nhóm',
							afterLabelTextTpl : '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
							xtype : 'textfield',
							itemId : 'profile_id',
							name : 'profile_id',
							width : '10%',
							readOnly : true,
							hidden: true,
							fieldStyle: 'background-color: #ddd; background-image: none;'
						}, {
							border : false,
							flex : 1,
							fieldLabel : 'Tên nhóm',
							afterLabelTextTpl : '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
							xtype : 'textfield',
							itemId : 'name',
							name : 'name',
							width : '10%'
						}]
			}]

		}]

	},
	activate : function() {
		var me = this;
		
		var storeNot = this.down('#GroupUserPermissionAddNew').getStore();
		storeNot.removeAll();
		storeNot.setProxy({
				type : 'ajax',
				url : 'getfunc',
				actionMethods : {
					create : 'POST',
					read : 'POST',
					update : 'POST',
					destroy : 'POST'
				},
				extraParams : {
					user_id : App.Session.user_id
				},
				reader : {
					type : 'json',
					root : 'function_list',
					successProperty : 'success'
				}
			});
		storeNot.load();
		me.getForm().reset();
		
				
//		var store = new Ext.data.JsonStore({
//			proxy : {
//				type : 'ajax',
//				url : 'getfunc',
//				actionMethods : {
//					create : 'POST',
//					read : 'POST',
//					update : 'POST',
//					destroy : 'POST'
//				},
//				extraParams : {
//					user_id : App.Session.user_id,
//					profile_id : me.record.data.profile_id
//				},
//				reader : {
//					type : 'json',
//					root : 'function_list',
//					successProperty : 'success'
//				}
//			},
//			fields : ['function_id','name']
//			});
//				
//		store.load({
//					scope : this,
//					callback : function(records, operation, success) {
//						if (success) {
//							var GroupUserPermissions = this.down('#GroupUserPermissionAddNew').getStore();
//							if(records.length > 0)
//							{
//								var dataValue = [];
//								for(var i=0;i<records.length;i++)
//								{
//									dataValue.push(records[i].data.function_id)
//									this.down('#GroupUserPermission').setValue(dataValue);
//								}
//							}
//						}
//
//					}
//				});
		
//		this.down('#profile_id').setValue(me.record.data.profile_id);
//		this.down('#name').setValue(me.record.data.name);
	},
	AddNewProfile : function() {
		var name = this.down('#name').getValue();
		var array = this.down('#GroupUserPermissionAddNew').value;
//		var array = this.down('#GroupUserPermissionAddNew').value;
//		var function_list = '';
//		
//		if(array.length>0)
//		{ 
//			function_list = '{'+array[0]+'}';
//			for(var i=1;i<array.length;i++)
//			{
//				function_list += ',{"'+array[i]+'"}';
//			}
//		}
//		
//		function_list = '[' + function_list +']';
		
		if(name == null || name == '') {
			Ext.MessageBox.alert('Thông báo','Chưa điền tên nhóm');
		} else {
		var profile = {name:name};
		var function_list = array;
		Ext.Ajax.request({
					url : 'updateprofile',
					actionMethods : {
					create : 'POST',
					read : 'POST',
					update : 'POST',
					destroy : 'POST'
					},
					params : {
						user_id : App.Session.user_id,
						profile : Ext.encode(profile),
						function_list : Ext.encode(array)
					},
					scope : this,
					timeout : 40000,
					callback : function(options, success, response) {
						if (success) {
							response = Ext.decode(response.responseText);
							if (response.success) {
								Ext.MessageBox.alert('Thông báo',
										'Thêm mới thành công ');
								Ext.getCmp('ViewProfile').getStore().load();
							} else {
								Ext.MessageBox.alert('Thông báo',
										'Thêm mới thất bại '+ response.info);
							}
						} else {
							Ext.MessageBox.alert('Thông báo',
									'Thêm mới thất bại. Vui lòng thử sau '+ response.info);
						}
					}

				});
		}
	}

});
