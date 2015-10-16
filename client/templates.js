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

Template.UserForm.helpers({
  isNew: function() {
    return FlowRouter.getParam('_id');
  }
});

Template.UserForm.events({
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
    'submit': [function(e) {
      var user = this.getDocument();

      if (user.validate()) {
        Meteor.call('/user/save', user, function(err) {
          if (err) {
            user.catchValidationException(err);
          } else {
            FlowRouter.go('users');
          }
        });
      }
    }],
    'afterCreate': [function(e) {
      var form = this;
      var id = FlowRouter.getParam('_id');
      var tmpl = Template.instance();

      if (id) {
        tmpl.subscribe('user', id);
        form.setDocument(Users.findOne(id));
      } else {
        form.setDocument(new User());
      }
    }],
    'change': [function(e) {
      var doc = this.getDocument();

      // Get an input which value was changed.
      var input = e.data.input;
      // Set a value of a field in an instance of User, Phone or Address class.
      doc.set(input.id, input.value);

      // Validate given field.
      console.log('validate', input.id);
      doc.validate(input.id);
    }]
  }
});
