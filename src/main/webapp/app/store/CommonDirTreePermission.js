Ext.define(App.path('store.CommonDirTreePermission'), {
    extend: 'Ext.data.TreeStore',
    model: App.path('model.CommonDirTree'),
    storeId:'CommonDirTreePermission',
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
					root : 'dir_list'
				}
			},
	sorters: [{
     property: 'text',
     direction: 'ASC' // or 'ASC'
   }]
});
