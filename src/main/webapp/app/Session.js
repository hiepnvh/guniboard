Ext.define(App.path('Session'), {
			extend : 'Ext.util.Observable',
			alternateClassName : 'App.Session',
			singleton : true,
			config : {
				user_id : null,
				username : null,
				name : null,
				email : null,
				password : null,
				functionlist : null,
				agentId : null,
				agentname : null,
				permission : null,
				infoUser : null,
				// last user
				last_user_id : null,
				last_username : null,
				last_infoUser : null,
				last_functionlist : null,
				// tree Store
				itemReport : null,
				itemReportDetail : null,
				shortcode_prefix : null,
				brandname : null,
				menuItems : null
			},
			constructor : function(config) {
				this.initConfig(config);
			},
			applyAgentId : function(val) {
				this.fireEvent('logginchange', this);
				return val;
			},

			isLoggedIn : function() {
				//        return (null != this.permission && null != this.agentname);
				return (null != this.functionlist);

			}
		});