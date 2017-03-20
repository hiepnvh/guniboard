Ext.define(App.path('view.ViewCommonDirTreePerNoCheck'), {
	extend : 'Ext.tree.Panel',
	xtype : 'ViewCommonDirTreePerNoCheck',
	itemId : 'ViewCommonDirTreePerNoCheck',
	id : 'ViewCommonDirTreePerNoCheck',
	title : 'Danh bạ chung',
	autoScroll : true,
	initComponent : function() {
		var store = App.path('store.CommonDirTreePermission');
		var me = this;
		var config = {
					store : App.path('store.CommonDirTreePermission'),
					border : false,
					rootVisible: false,
			        useArrows: true,
			        frame: true,
//					viewConfig : {
//						listeners : {
//							itemcontextmenu : {
//								fn : me.onViewItemContextMenu,
//								scope : me
//							}
//						}
//					},
		listeners : {
					itemclick : function(dv, record, item, index, e) {
//									Ext.getCmp('ViewContactDetail').SendCommonDirId(record.data.dir_id);
//									Ext.getCmp('ViewContactDetail').LoadCommonDirMember(record.data.dir_id);
					},
					selectionchange : function(selModel, selections) {
					},
					checkchange : function(node, checked, options) {
						 node.cascadeBy(function(n){n.set('checked', checked);} );
								}
							}
				};
		Ext.apply(this, config);
		this.callParent(arguments);
	},
	activate : function(userIdPer) {
		console.log('no check');
		var store = Ext.getStore(App.path('store.CommonDirTreePermission'));
    	store.getProxy().extraParams.user_id = App.Session.user_id;
    	store.getProxy().extraParams.user_id_per = userIdPer;
    	store.getProxy().extraParams.tree_type = App.Constant.TREE_UNCHECK_ALL;
		store.getProxy().extraParams.limit = null;
        store.load();
	},
	onViewItemContextMenu : function(dataview, record, item, index, e, eOpts) {
		e.stopEvent();
		if (!this.menu) {
			this.menu = Ext.create(App.path('view.TreeContextMenu'));
		}
		this.menu.showAt(e.getXY());
	}
});
