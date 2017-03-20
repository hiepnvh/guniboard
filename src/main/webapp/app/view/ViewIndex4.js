Ext.Loader.setConfig({
			enabled : true
		});
Ext.Loader.setPath('Ext.ux', 'lib/ux');
Ext.require(['Ext.grid.*', 'Ext.data.*', 'Ext.ux.grid.FiltersFeature',
		'Ext.toolbar.Paging', 'Ext.ux.ajax.JsonSimlet',
		'Ext.ux.ajax.SimManager']);

Ext.define(App.path('view.ViewIndex4'), {
	extend : 'Ext.container.Container',
	xtype : 'viewindex4',
	id : 'ViewIndex4',
	itemId : 'viewindex4',
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
							itemId : 'Content1',
							layout : {
								type : 'hbox',
								align : 'stretch',
								pack : 'start'
							},
							items : [{
								width : App.Constant.WEST_VIEW_WIDTH - 10,
								layout : {
									type : 'vbox',
									align : 'stretch',
									pack : 'start'
								},
								items : [{
									flex : 1,
									collapsible : false,
									layout : 'fit',
									id : 'west1',
									border : true,
									autoScroll : true,
									bodyStyle : 'background-color: transparent',
									items : {
										xtype : 'amxcontainer',
										id : 'WestView1',
										layout : 'card'
									}
								}, {
									flex : 1,
									collapsible : false,
									layout : 'fit',
									id : 'west2',
									border : true,
									autoScroll : true,
									bodyStyle : 'background-color: transparent',
									items : {
										xtype : 'amxcontainer',
										id : 'WestView2',
										layout : 'card'
									}
								}

								]
							}, {
								flex : 1,
								layout : {
									type : 'vbox',
									align : 'stretch',
									pack : 'start'
								},
								items : [{
									flex : 1,
									border : true,
									width : 'fit',
									autoScroll : true,
									bodyStyle : 'background-color: transparent',
									items : {
										xtype : 'amxcontainer',
										id : 'CenterView1',
										layout : 'card'
									}
								}, {
									flex : 1,
									border : true,
									width : 'fit',
									autoScroll : true,
									bodyStyle : 'background-color: transparent',
									items : {
										xtype : 'amxcontainer',
										id : 'CenterView2',
										layout : 'card'
									}
								}]
							}]

						}]
			}],
	reset : function() {
		this.down('#viewmenuleft').activate();
	},
	showWhat : function(itemIdWest, WestView1, itemIdCenter, CenterView1,itemIdWest2, WestView2,itemIdCenter2, CenterView2 ) {
		this.reset();

		this.down('#WestView1').activateViewItem(itemIdWest, function() {
					return Ext.create(WestView1);
				}, this).activate();

		this.down('#CenterView1').activateViewItem(itemIdCenter, function() {
					return Ext.create(CenterView1);
				}, this).activate();
		this.down('#WestView2').activateViewItem(itemIdWest2, function() {
			return Ext.create(WestView2);
		}, this).activate();

		this.down('#CenterView2').activateViewItem(itemIdCenter2, function() {
					return Ext.create(CenterView2);
				}, this).activate();
	},
	showWhats : function(itemIdWest1, WestView1, itemIdCenter1, CenterView1, store1,
			itemDetail1, DetailView1, itemIdWest2, WestView2, itemIdCenter2, CenterView2, store2,
			itemDetail2, DetailView2) {
		this.reset();
		var me = this;
		this.down('#WestView1').activateViewItem(itemIdWest1, function() {
			var view = Ext.create(WestView1, {
						store : store1
					});
			view.on('select', function(m, record) {
						me.down('#CenterView1').activateViewItem(itemDetail1,
								function() {
									return Ext.create(DetailView1, {
												record : record
											});
								}, this, function(viewItem) {
									viewItem.record = record;
								}).activate();
					});
			return view;
		}, this).activate();

		this.down('#CenterView1').activateViewItem(itemIdCenter1, function() {
					return Ext.create(CenterView1);
				}, this).activate();
		/////////////////////
		this.down('#WestView2').activateViewItem(itemIdWest2, function() {
			var view = Ext.create(WestView2, {
						store : store2
					});
			view.on('select', function(m, record) {
						me.down('#CenterView2').activateViewItem(itemDetail2,
								function() {
									return Ext.create(DetailView2, {
												record : record
											});
								}, this, function(viewItem) {
									viewItem.record = record;
								}).activate();
					});
			return view;
		}, this).activate();

		this.down('#CenterView2').activateViewItem(itemIdCenter2, function() {
					return Ext.create(CenterView2);
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