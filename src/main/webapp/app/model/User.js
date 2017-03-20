Ext.define(App.path('model.User'), {
			extend : 'Ext.data.Model',
			fields : ['user_id', 'active', 'profile_id', 'username', 'email',
					'password', 'mobile', 'name', 'create_date', 'title',
					'signature','brandname']
		});