Ext.define(App.path('store.Member'), {
			extend : 'Ext.data.Store',
			model : App.path('model.Member'),
			storeId : 'Member',
			proxy : {
				type : 'ajax',
				url : 'getcommondirmember',
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
					root : 'member_list'
				}
			}
		});