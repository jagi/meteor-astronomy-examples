FlowRouter.route('/', {
  name: 'users',
  action: function (params) {
    BlazeLayout.render("Users");
  }


});

FlowRouter.route('/edit/:_id', {
  name: 'edit',
  action: function (params) {
    BlazeLayout.render("UserForm", {_id: params._id});
  }
});

FlowRouter.route('/add', {
  name: 'add',
  action: function (params) {
    BlazeLayout.render("UserForm");
  }
});