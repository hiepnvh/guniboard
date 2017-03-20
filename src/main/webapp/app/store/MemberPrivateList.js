Ext.define(App.path('store.MemberPrivateList'), {
			extend : 'Ext.data.Store',
			model : App.path('model.Member'),
			storeId : 'MemberPrivateList',
			proxy : {
				type : 'ajax',
				url : 'getprivatelistmember',
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