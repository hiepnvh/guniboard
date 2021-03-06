Ext.define(App.path('controller.Login'), {
    extend: 'Ext.app.Controller',
    views: [
        App.path('view.ViewLogin')
    ],
    refs: [{
            ref: 'MainView',
            selector: '#MainView' //  id:MainView 

        }],
    showLogin: function() {
        this.getMainView().activateViewItem('ViewLogin', function() {
            var viewItem = Ext.create(App.path('view.ViewLogin'));
            viewItem.on('loggedin', function() {
                this.home();
                Ext.Router.redirect('sendsms');
            }, this);
            return viewItem;
        }, this).activate();
    },
    home: function() {
        if (App.Session.isLoggedIn()) {
            Ext.Router.redirect('sendsms');
        } else {
            Ext.Router.redirect('');
        }
    }
});