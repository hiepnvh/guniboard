Ext.define(App.path('store.PrivateList'), {
			extend : 'Ext.data.Store',
			model : App.path('model.PrivateList'),
			storeId : 'PrivateList',
			proxy : {
				type : 'ajax',
				url : 'getprivatelist',
				actionMethods : {
					create : 'POST',
					read : 'POST',
					update : 'POST',
					destroy : 'POST'
				},
				extraParams : {
					format : 'json'
				},
				reader : {
					type : 'json',
					root : 'private_list'
				}
			}
		});