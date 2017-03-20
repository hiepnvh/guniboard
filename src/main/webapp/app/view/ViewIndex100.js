Ext.define(App.path('view.ViewIndex100'), {
	extend : 'Ext.container.Container',
	itemId : 'viewindex100',
	id : 'viewindex100',
	layout : {
		type : 'vbox',
		align : 'stretch',
		pack : 'start'
	},
	requires : [App.path('view.ViewHeader'),
			App.path('view.ViewMenuLeft')],
	items : [{
				height : 70,
				xtype : 'viewheader',
				border : true
			}, {
				xtype : 'panel',
				flex : 1,
				border : true,
				layout : {
					type : 'hbox',
					align : 'stretch'
				},
				items : [{
							// flex : 1,
//							title : 'Chức năng',
							xtype : 'viewmenuleft',
							itemId : 'viewmenuleft',
							border : true,
							width : App.Constant.MENU_LEFT_WIDTH,
							bodyStyle : 'background-color: transparent'
						}, {
							flex : 1,
//							title : 'Nội dung chi tiết',
							itemId : '1',
							layout : 'border',
							items : [{
										region : 'center',
										border : false,
										//margin:2,
										layout : 'fit',
										bodyStyle : 'background-color: transparent',
										items : {
											xtype : 'amxcontainer',
											itemId : 'CenterView',
											layout : 'card'
										}
									}]

						}]
			}],
	reset : function() {
		this.down('#viewmenuleft').activate();
	},
	showWhat : function(itemIdCenter, CenterView) {
		console.log('showwhat');
		this.reset();
		var me = this;
//		console.log(this.down('#CenterView'));
		this.down('#CenterView').activateViewItem(itemIdCenter, function() {
					console.log('center actived');
					return Ext.create(CenterView);
				}, me).activate();
		console.log('actived');
	},
	activate : function() {
		this.LoadMapProfile();
		this.LoadUser();
//		this.LoadCommonDirTree();
	},
	LoadUser : function() {
		var storeUser = Ext.getStore(App.path('store.User'));
		storeUser.getProxy().extraParams.user_id = App.Constant.user_id;
        storeUser.load();
	},
	LoadMapProfile : function() {
		/* ===============Begin Load All Staff and Set in A Map================= */
		var stoProfile = Ext.getStore(App.path('store.Profile'));
		stoProfile.getProxy().extraParams.user_id = 1;
		stoProfile.getProxy().extraParams.limit = null;
		// stoAllStaff.getProxy().extraParams.active = '1';
		stoProfile.load({
					scope : this,
					callback : function(records, ops, success) {
						if (success) {
							var mapProfile = new Ext.util.HashMap();
							for (var i = 0; i < records.length; i++) {
								var value = {
									profile_id : records[i].data.profile_id,
									name : records[i].data.name
								};
								mapProfile.add(records[i].data.profile_id, value);
							}
							App.MapValue.setMapProfile(mapProfile);
						}
					}
				});
		/* ===============End Load All Agent and Set in A Map================= */
	},
	LoadCommonDirTree : function() {
    	var store = Ext.getStore(App.path('store.CommonDirTree'));
    	store.getProxy().extraParams.user_id = App.Session.user_id;
		store.getProxy().extraParams.limit = null;
        store.load();
    },
	Test : function() {
		var date = new Date();
		var dd = date.getDate();
		var mm = date.getMonth();
		var yyyy = date.getFullYear();

	}
});