Ext.Loader.setConfig({
			enabled : true
		});
Ext.Loader.setPath('Ext.ux', 'lib/ux');
Ext.require(['Ext.grid.*', 'Ext.data.*', 'Ext.ux.grid.FiltersFeature',
		'Ext.toolbar.Paging', 'Ext.ux.ajax.JsonSimlet',
		'Ext.ux.ajax.SimManager']);

Ext.define(App.path('view.ViewIndex'), {
	extend : 'Ext.container.Container',
	xtype : 'viewindex',
	id : 'ViewIndex',
	itemId : 'viewindex',
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
										region : 'west',
										layout : 'fit',
										collapsible : true,
										width : App.Constant.WEST_VIEW_WIDTH,
										id : 'west',
										border : true,
										bodyStyle : 'background-color: transparent',
										items : {
											xtype : 'amxcontainer',
											id: 'WestView',
											layout : 'card'
										}
									}, {
										region : 'center',
										border : false,
										layout : 'fit',
										bodyStyle : 'background-color: transparent',
										items : {
											xtype : 'amxcontainer',
											id: 'CenterView',
											layout : 'card'
										}
									}]

						}]
			}],
	reset : function() {
		this.down('#viewmenuleft').activate();
	},
	showWhat : function(itemIdWest, WestView, itemIdCenter, CenterView) {
		this.reset();

		this.down('#WestView').activateViewItem(itemIdWest, function() {
					return Ext.create(WestView);
				}, this).activate();

		this.down('#CenterView').activateViewItem(itemIdCenter, function() {
					return Ext.create(CenterView);
				}, this).activate();
	},
	showWhats : function(itemIdWest, WestView, itemIdCenter, CenterView, store,
			itemDetail, DetailView) {
		this.reset();
		var me = this;
		this.down('#WestView').activateViewItem(itemIdWest, function() {
			var view = Ext.create(WestView, {
						store : store
					});
			view.on('select', function(m, record) {
						me.down('#CenterView').activateViewItem(itemDetail,
								function() {
									return Ext.create(DetailView, {
												record : record
											});
								}, this, function(viewItem) {
									viewItem.record = record;
								}).activate();
					});
			return view;
		}, this).activate();

		this.down('#CenterView').activateViewItem(itemIdCenter, function() {
					return Ext.create(CenterView);
				}, this).activate();
	},
	showWhatsTree : function(itemIdWest, WestView, itemIdCenter, CenterView,
			store, itemDetail, DetailView) {
		App.Session.itemReport = itemDetail;
		App.Session.itemReportDetail = DetailView;
		this.reset();
		var me = this;
		this.down('#WestView').activateViewItem(itemIdWest, function() {
			var view = Ext.create(WestView, {
						store : store
					});
			view.on('select', function(m, record) {
						me.down('#CenterView').activateViewItem(
								App.Session.itemReport, function() {
									return Ext.create(
											App.Session.itemReportDetail, {
												record : record
											});
								}, this, function(viewItem) {
									viewItem.record = record;
								}).activate();
					});
			return view;
		}, this).activate();

		this.down('#CenterView').activateViewItem(itemIdCenter, function() {
					return Ext.create(CenterView);
				}, this).activate();
	},
	showTree : function(itemIdWest, WestView, itemIdCenter, CenterView, store,
			itemDetail, DetailView) {
		this.reset();
		var me = this;
		var store1 = Ext.getStore(store);
		store1.setProxy({
					type : 'ajax',
					url : 'getagenttree',
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
						root : 'agent_list',
						totalProperty : 'totalCount'
					}
				});
		store1.load();
		this.down('#WestView').activateViewItem(itemIdWest, function() {
			var view = Ext.create(WestView, {
						store : store1
					});
			view.on('select', function(m, record) {
						me.down('#CenterView').activateViewItem(itemDetail,
								function() {
									return Ext.create(DetailView, {
												record : record
											});
								}, this, function(viewItem) {
									viewItem.record = record;
								}).activate();
					});
			return view;
		}, this, function(viewItem) {
			/** *** */
			console.log('active lan 2');
				/** ****** */
			}).activate();

		this.down('#CenterView').activateViewItem(itemIdCenter, function() {
					return Ext.create(CenterView);
				}, this).activate();
	},
	activate : function() {
	},
	DisableAll : function() {
		console.log('DisableAll');
		var mask = Ext.LoadMask(Ext.getCmp('ViewIndex'), {
					msg : 'Chờ giây lát..'
				});
		mask.show();
	},
	EnableAll : function() {
		Ext.LoadMask(Ext.getCmp('ViewIndex'), {
					msg : 'Chờ giây lát..'
				}).hide();
	}
});