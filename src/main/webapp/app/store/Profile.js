Ext.define(App.path('store.Profile'), {
			extend : 'Ext.data.Store',
			fields : ['profile_id', 'name'],
			storeId : 'Profile',
			proxy : {
				type : 'ajax',
				url : 'getprofile',
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
					root : 'profile_list'
				}
			}
		});