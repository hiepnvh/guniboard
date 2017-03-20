Ext.define(App.path('view.GridContextMenu'), {
	extend : 'Ext.menu.Menu',
	hidden : true,
	hideMode : 'display',
	id : 'GridContextMenu',
	width : 138,
	frameHeader : false,
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			items : [{
						xtype : 'menuitem',
//						id : 'addnew',
						icon : 'resources/img/log-out.png',
						text : 'Chuyển đi',
						handler : function() {
							me.RemoveFrom();
						}
					}]
		});
		me.callParent(arguments);
	},
	RemoveFrom : function() {
		var grid = Ext.getCmp('ViewContactDetail').down('#grid2');
		var selection = grid.getSelectionModel().getSelection()[0];
		grid.getStore().remove(grid.getSelectionModel().getSelection()[0]);
		Ext.getCmp('ViewContactDetail').member_id_move = selection.data.member_id;
//		console.log(Ext.getCmp('ViewContactDetail').member_id_move);
		Ext.MessageBox.alert('Thông báo', 'Chọn lớp chuyển đến!');
	 }
});