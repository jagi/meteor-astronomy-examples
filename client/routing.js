FlowRouter.route('/', {
  name: 'users',
  action: function() {
    BlazeLayout.render('Layout', {
      main: 'Users'
    });
  }
});

FlowRouter.route('/edit/:slug', {
  name: 'edit',
  action: function(params) {
    BlazeLayout.render('Layout', {
      main: 'UserForm'
    });
  }
});

FlowRouter.route('/add', {
  name: 'add',
  action: function() {
    BlazeLayout.render('Layout', {
      main: 'UserForm'
    });
  }
});
