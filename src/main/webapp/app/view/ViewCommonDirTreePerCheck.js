Ext.define(App.path('view.ViewCommonDirTreePerCheck'), {
	extend : 'Ext.tree.Panel',
	xtype : 'ViewCommonDirTreePerCheck',
	itemId : 'ViewCommonDirTreePerCheck',
	id : 'ViewCommonDirTreePerCheck',
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
					dockedItems : [{
			hidden : true,
            xtype: 'toolbar',
            items: {
                text: 'Get checked nodes',
                handler: function(){
                	
//                	var store = Ext.getStore(App.path('store.CommonDirTreePermission'));
//                	console.log(store);
//                	
//                	store.each(function(rec) {
//					if (rec.get('checked') == true) {
//							console.log(rec.get('checked'));
//							}
//						});
                	var tree = Ext.getCmp('ViewCommonDirTreePerCheck');
                	console.log(tree.getChecked());
                	
                }
            }
        }],
		listeners : {
								itemclick : function(dv, record, item, index, e) {
//									Ext.getCmp('ViewContactDetail').SendCommonDirId(record.data.dir_id);
//									Ext.getCmp('ViewContactDetail').LoadCommonDirMember(record.data.dir_id);
								},
								selectionchange : function(selModel, selections) {
								},
								checkchange : function(node, checked, options) {
									if(!checked) { // uncheck parent by parent id
										/*loop for uncheck*/
										var parentNode = node.parentNode;
										while(parentNode){
											if(parentNode.data.dir_id==0)
												break;
											parentNode.set('checked', false);
											parentNode = parentNode.parentNode;
										}
									}
									node.cascadeBy(function(n){n.set('checked', checked);} );
											}
							}
				};
		Ext.apply(this, config);
		this.callParent(arguments);
	},
	activate : function(userIdPer) {
		var me =this;
		var store = Ext.getStore(App.path('store.CommonDirTreePermission'));
    	store.getProxy().extraParams.user_id = App.Session.user_id;
    	store.getProxy().extraParams.user_id_per = userIdPer;
    	store.getProxy().extraParams.tree_type = App.Constant.TREE_PERMISSION;
		store.getProxy().extraParams.limit = null;
        store.load(
//        		{
//					callback : function(records, options, success) {
//						if (success) {
//							var items = me.getChecked();
//							console.log(items);
//						}
//					}
//				}
        		);
	},
	onViewItemContextMenu : function(dataview, record, item, index, e, eOpts) {
		e.stopEvent();
		if (!this.menu) {
			this.menu = Ext.create(App.path('view.TreeContextMenu'));
		}
		this.menu.showAt(e.getXY());
	}
});
