Ext.define(App.path('store.CommonDirPermission'), {
    extend: 'Ext.data.TreeStore',
    model: App.path('model.CommonDir'),
    storeId:'CommonDirPermission',
    folderSort: true,
    proxy : {
				type : 'ajax',
				url : 'getcommondirtreepermission',
				actionMethods : {
					create : 'POST',
					read : 'POST',
					update : 'POST',
					destroy : 'POST'
				},
				reader : {
					type : 'json',
					root : 'permission_list'
				}
			},
	sorters: [{
     property: 'text',
     direction: 'ASC' // or 'ASC'
   }]
});
