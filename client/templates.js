Template.Users.onCreated(function() {
  this.subscribe('users');
});

Template.Users.helpers({
  users: function() {
    return Users.find({}, {
      sort: {
        age: -1
      }
    });
  }
});

Template.Users.events({
  'click [name=add]': function(e, tmpl) {
    FlowRouter.go('add');
  }
});

Template.User.events({
  'click .remove': function(e, tmpl) {
    if (confirm('Are you sure to remove "' + this.fullName() + '"')) {
      Meteor.call('/user/remove', this);
    }
  }
});

Template.UserForm.events({
  'change input': function(e) {
    var doc = UserForm.getDocument();

    // Get an input which value was changed.
    var input = e.currentTarget;
    // Set a value of a field in an instance of User, Phone or Address class.
    doc.set(input.id, input.value);
    // Validate given field.
    doc.validate(input.id);
  },
  'click [name=addPhone]': function(e) {
    var user = UserForm.getDocument();
    // FIXME: It should be:
    // user.push('phones', new Phone());
    // However, it will not work because of trying to modify the same field with
    // two different modifiers. I have to implement modifiers merging.
    user.phones.push(new Phone());
    UserForm.setDocument(user);
  },
  'click [name=removePhone]': function(e) {
    var user = UserForm.getDocument();
    user.pull('phones', this);
    UserForm.setDocument(user);
  }
});

UserForm = new Astro.Form({
  template: Template.UserForm,
  className: 'User',
  events: {
    submit: [function(e) {
      var user = UserForm.getDocument();

      if (user.validate()) {
        Meteor.call('/user/save', user, function(err) {
          if (!err) {
            FlowRouter.go('users');
          } else {
            user.catchValidationException(err);
          }
        });
      }
    }],
    afterCreate: [function(e) {
      var self = this;
      var instance = Template.instance();

      var id = FlowRouter.getParam('_id');
      if (id) {
        var subscription = instance.subscribe('user', id);
        self.setDocument(Users.findOne(id));
      } else {
        self.setDocument(new User());
      }
    }]
  }
});
