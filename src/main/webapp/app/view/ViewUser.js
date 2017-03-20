Ext.define(App.path('view.ViewUser'), {
			extend : 'Ext.grid.Panel',
			border : true,
			itemId : 'ViewUser',
			xtype : 'viewuser',
			id : 'ViewUser',
			autoScroll : true,
			initComponent : function(arguments) {
				var store = this.store;
				var me = this;
				Ext.apply(this, {
							title : 'Quản lý người dùng',
							border : false,
							store : store,
							stripeRows : true,
							columnLines : true,
							selModel : Ext.create('Ext.selection.RadioModel'),
							columns : [{
										text : 'STT',
										xtype : 'rownumberer',
										width : 30
									}, {
										text : 'Tên người dùng',
										flex : 1,
										sortable : true,
										name : 'name',
										dataIndex : 'name',
										filter : {
											type : 'string'
										}
									}],
							dockedItems : [{
										dock : 'bottom',
										height : 30,
										border : false,
										bodyStyle : 'background-color: transparent',
										items : [{
													xtype : 'button',
													text : 'Thêm mới',
													cls : 'search_all',
													margin : 5,
													handler : function() {
														me.UserAddNew();
													}
												}]

									}, {
										dock : 'top',
										height : 'fit',
										border : false,
										xtype : 'form',
										bodyStyle : 'background-color: transparent',
										items : [{
											xtype : 'fieldset',
											padding : '5 0 0 5',
											margin : '5 5 0 5',
											border : false,
											collapsible : false,
											items : [{
														xtype : 'textfield',
														fieldLabel : 'Tên đăng nhập',
														itemId : 'username',
														anchor : '98%',
														margin : '5 0 5 0'
													}, {
														xtype : 'combobox',
														fieldLabel : 'Thuộc nhóm',
														itemId : 'profile_id',
														store : App
																.path('store.Profile'),
														displayField : 'name',
														valueField : 'profile_id',
														anchor : '98%',
														margin : '5 0 5 0'
													}, {
														xtype : 'button',
														text : 'Tìm kiếm',
														cls : 'search_all',
														margin : 5,
														handler : function() {
															me.Search();
														}
													}]
										}]
									}]
						});
				this.callParent(arguments);
			},
			activate : function() {
				if(Ext.getCmp('ViewCommonDirTree'))
					Ext.getCmp('ViewCommonDirTree').deactive();
				if(Ext.getCmp('ViewCommonDirTree2'))
					Ext.getCmp('ViewCommonDirTree2').deactive();
				var storePro = this.down('#profile_id').getStore();
				storePro.getProxy().extraParams.user_id = App.Session.user_id;
				this.down('#username').setValue('');
				this.down('#profile_id').setValue(null);
				this.down('#username').focus();
				var store = this.getStore();
				store.removeAll();
			},
			UserAddNew : function() {
				var view_center = Ext.getCmp('CenterView1');
				view_center.activateViewItem('ViewUserAddNew', function() {
							var viewItem = Ext.create(App
									.path('view.ViewUserAddNew'));
							return viewItem;
						}).activate();
			},
			Search : function() {
				var store = this.getStore();

				var user_id = App.Session.user_id;
				var username = this.down('#username').getValue();
				var profile_id = this.down('#profile_id').getValue();

				store.setProxy({
							type : 'ajax',
							url : 'getuser',
							actionMethods : {
								create : 'POST',
								read : 'POST',
								update : 'POST',
								destroy : 'POST'
							},
							extraParams : {
								user_id : user_id,
								username : username,
								profile_id : profile_id
							},
							reader : {
								type : 'json',
								root : 'user_list',
								totalProperty : 'totalCount'
							}
						});
				store.load({
							callback : function(records, options, success) {
								if (success) {}
							}
						});
			}
		});
