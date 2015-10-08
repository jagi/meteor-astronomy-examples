Router.route('/', {
  name: 'users',
  template: 'Users',
  waitOn: function() {
    return Meteor.subscribe('users');
  },
  data: function() {
    return {
      users: Users.find({}, {
        sort: {
          age: -1
        }
      })
    };
  }
});

Router.route('/edit/:_id', {
  name: 'edit',
  template: 'UserForm',
  waitOn: function() {
    return Meteor.subscribe('user', this.params._id);
  },
  data: function() {
    return {
      user: new ReactiveVar(Users.findOne(this.params._id))
    };
  }
});

Router.route('/add', {
  name: 'add',
  template: 'UserForm',
  data: function() {
    return {
      user: new ReactiveVar(new User())
    };
  }
});
