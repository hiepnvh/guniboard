Ext.define(App.path('store.CommonDirTree'), {
    extend: 'Ext.data.TreeStore',
    model: App.path('model.CommonDirTree'),
    storeId:'CommonDirTree',
    folderSort: true,
    proxy : {
				type : 'ajax',
				url : 'getcommondirtree',
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
