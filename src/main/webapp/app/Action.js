Ext.define(App.path('Action'), {
    alternateClassName: 'App.Action',
    statics: {
      ResponseCode: {
            OK: 0
      },
     AjaxRequest: function(url ,params, callback, scope) {
        Ext.Ajax.request({
            url: url,
            actionMethods : {
					create : 'POST',
					read : 'POST',
					update : 'POST',
					destroy : 'POST'
				},
            params: params,
            timeout: 40000,
            callback : callback,//options,success,response 
            scope: scope
        });
     },
     loadJsonStore:function( url, params,model, callback, scope) {
        Ext.create('Ext.data.Store', {
             model: model,
             proxy: {
                 type: 'ajax',
                 url: url,//App.Setting.getHostUrl() + '/' + url,
                 extraParams: params,
                 reader: {
                     type: 'json',
                     root: 'data'
                 }
             }
         }).load({ callback: callback, scope: scope});
     },
//     User
	UserLogin:function(username,password, callback, scope){
         this.AjaxRequest('login',{username:username , password:password },callback, scope);
     },
     UserGet:function(user_id, username, get_user_id, profile_id, callback, scope){
          this.AjaxRequest('getuser',{user_id:user_id,username:username,get_user_id:get_user_id,profile_id:profile_id},callback, scope)
     },
     UserGet:function(user_id, username, callback, scope){
          this.AjaxRequest('getuser',{user_id:user_id,username:username},callback, scope)
     },
     UserUpdate:function(user_id, user, common_dir_id_arr, callback, scope){
          this.AjaxRequest('updateuser',{user_id:user_id,user:user, common_dir_id_arr : common_dir_id_arr},callback, scope)
     },
//     Common Dir
     AddCommonDir:function(user_id, dir, callback, scope){
          this.AjaxRequest('addcommondir',{user_id:user_id,dir:dir},callback, scope)
     },
     RemoveCommonDir:function(user_id, dir, callback, scope){
          this.AjaxRequest('removecommondir',{user_id:user_id,dir:dir},callback, scope)
     },
     UpdateCommonDir:function(user_id, dir, callback, scope){
          this.AjaxRequest('updatecommondir',{user_id:user_id,dir:dir},callback, scope)
     },
     LoadSubCommonDir:function(user_id, dir_id,tree_type, callback, scope){
    	 console.log('dirid ' + dir_id);
         this.AjaxRequest('getcommondirtree',{user_id:user_id,dir_id:dir_id,tree_type: tree_type},callback, scope)
    },
//     Common Dir Member
    CommonDirMemberPermissionGet:function(user_id,user_id_per,tree_type, callback, scope){
        this.AjaxRequest('getcommondirtreepermission',{user_id:user_id,user_id_per:user_id_per,tree_type:tree_type},callback, scope)
   },
     CommonDirMemberGet:function(user_id, dir_id, callback, scope){
          this.AjaxRequest('getcommondirmember',{user_id:user_id,dir_id:dir_id},callback, scope)
     },
     CommonDirMemberAdd:function(user_id, dir_id, member_list, callback, scope){
          this.AjaxRequest('addcommondirmember',{user_id:user_id,dir_id:dir_id,member_list:member_list},callback, scope)
     },
     CommonDirMemberRemove:function(user_id, dir_id, member_list, callback, scope){
          this.AjaxRequest('removecommondirmember',{user_id:user_id,dir_id:dir_id,member_list:member_list},callback, scope)
     },
     CommonDirMemberAddFromExcel:function(user_id, dir_id, file_path, callback, scope){
          this.AjaxRequest('commondirmemberaddfromexcel',{user_id:user_id,dir_id:dir_id,file_path:file_path},callback, scope)
     },
     CommonDirMemberMove:function(user_id, dir_id, member_list, callback, scope){
          this.AjaxRequest('movecommondirmember',{user_id:user_id,dir_id:dir_id,member_list:member_list},callback, scope)
     },
//     Private List
     PrivateListAdd:function(user_id, private_list, callback, scope){
          this.AjaxRequest('addprivatelist',{user_id:user_id,private_list:private_list},callback, scope)
     },
     PrivateListRemove:function(user_id, private_list, callback, scope){
          this.AjaxRequest('removeprivatelist',{user_id:user_id,private_list:private_list},callback, scope)
     },
     PrivateListGet:function(user_id, callback, scope){
          this.AjaxRequest('getprivatelist',{user_id:user_id},callback, scope)
     },
//     Private List Member
     PrivateListMemberAdd:function(user_id, list_id,member_list, callback, scope){
          this.AjaxRequest('addprivatelistmember',{user_id:user_id,list_id:list_id,member_list:member_list},callback, scope)
     },
     PrivateListMemberRemove:function(user_id, list_id,member_list, callback, scope){
          this.AjaxRequest('removeprivatelistmember',{user_id:user_id,list_id:list_id,member_list:member_list},callback, scope)
     },
     PrivateListMemberGet:function(user_id, list_id, callback, scope){
          this.AjaxRequest('getprivatelistmember',{user_id:user_id, list_id:list_id},callback, scope)
     },
     
     
//     Brand Account Admin
     BrandUserGet:function(user_id, account_id, callback, scope){
          this.AjaxRequest('getbranduser',{user_id:user_id,account_id:account_id},callback, scope)
     },
//     BrandAccountAdminUpdate:function(user_id, account, user_list, callback, scope){
//          this.AjaxRequest('updatebrandaccountadmin',{user_id:user_id,account:account,user_list:user_list},callback, scope)
//     },
     BrandAccountAdminGet:function(user_id, user_id, callback, scope){
          this.AjaxRequest('getbrandaccountadmin',{user_id:user_id,user_id:user_id},callback, scope)
     },
//		Brand Account Member
     BrandAccountMemberGet:function(user_id, account_id, callback, scope){
          this.AjaxRequest('getbrandaccountmember',{user_id:user_id,account_id:account_id},callback, scope)
     },
//     Brand Account Group
     BrandGroupAdd:function(user_id, account_id, group_list, callback, scope){
          this.AjaxRequest('addbrandaccountgroup',{user_id:user_id,account_id:account_id,group_list:group_list},callback, scope)
     },
     BrandGroupRemove:function(user_id, account_id, group_list, callback, scope){
          this.AjaxRequest('removebrandaccountgroup',{user_id:user_id,account_id:account_id,group_list:group_list},callback, scope)
     },
//     Brand Account Member
     BrandMemberAdd:function(user_id, account_id, member_list, callback, scope){
          this.AjaxRequest('addbrandaccountmember',{user_id:user_id,account_id:account_id,member_list:member_list},callback, scope)
     },
     BrandMemberRemove:function(user_id, account_id, member_list, callback, scope){
          this.AjaxRequest('removebrandaccountmember',{user_id:user_id,account_id:account_id,member_list:member_list},callback, scope)
     },
//     Brand Account Group Member
     BrandGroupMemberAdd:function(user_id, account_id, group_name, member_list, callback, scope){
          this.AjaxRequest('addbrandaccountadmin',{user_id:user_id,account_id:account_id,group_name:group_name,member_list:member_list},callback, scope)
     },
     BrandGroupMemberRemove:function(user_id, account_id, group_name, member_list, callback, scope){
          this.AjaxRequest('removebrandaccountadmin',{user_id:user_id,account_id:account_id,group_name:group_name,member_list:member_list},callback, scope)
     },
     BrandGroupMemberGet:function(user_id, group_list, callback, scope){
          this.AjaxRequest('getbrandaccountgroupmember',{user_id:user_id,group_list:group_list},callback, scope)
     },
//		SMS
	SendSMSCampaign:function(user_id, campaign, msisdn,dir_list, callback, scope){
	    this.AjaxRequest('sendsmscampaign',{user_id:user_id,campaign:campaign,msisdn:msisdn,dir_list:dir_list},callback, scope)
	},
	CampaignRemove:function(user_id, campaign_list, callback, scope){
	    this.AjaxRequest('removesmscampaign',{user_id:user_id,campaign_list:campaign_list},callback, scope)
	},
	CampaignCancel:function(user_id, campaign_list, callback, scope){
	    this.AjaxRequest('cancelsmscampaign',{user_id:user_id,campaign_list:campaign_list},callback, scope)
	},
//	SendSMS:function(service_key, text, msisdn,shortcode, callback, scope){
//	    this.AjaxRequest('http://localhost:8081/GTelCP/mtservice',{service_key:service_key,text:text,msisdn:msisdn,shortcode:shortcode},callback, scope)
//	},
     GetProfile:function(user_id,profile_id, callback, scope){
         this.AjaxRequest('getprofile',{user_id:user_id , profile_id:profile_id },callback, scope);
     }
    }
});

