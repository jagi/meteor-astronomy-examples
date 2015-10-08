Template.Users.events({
  'click [name=add]': function(e, tmpl) {
    Router.go('add');
  }
});

Template.UserForm.events({
  'click .remove': function(e, tmpl) {
    if (confirm('Are you sure to remove "' + this.fullName() + '"')) {
      Meteor.call('/user/remove', this);
    }
  }
});

Template.UserForm.events({
  'change input': function(e, tmpl) {
    var doc = this; // Instance of User, Phone or Address class.

    // Get an input which value was changed.
    var input = e.currentTarget;
    // Set a value of a field in an instance of User, Phone or Address class.
    doc.set(input.id, input.value);
    // Validate given field.
    doc.validate(input.id);
  },
  'click [name=addPhone]': function(e, tmpl) {
    var user = tmpl.data.user.get();
    // FIXME: It should be:
    // user.push('phones', new Phone());
    // However, it will not work because of trying to modify the same field with
    // two different modifiers. I have to implement modifiers merging.
    user.phones.push(new Phone());
    tmpl.data.user.set(user);
  },
  'click [name=removePhone]': function(e, tmpl) {
    var user = tmpl.data.user.get();
    user.pull('phones', this);
    tmpl.data.user.set(user);
  },
  'click [name=save]': function(e, tmpl) {
    var user = tmpl.data.user.get();

    if (user.validate()) {
      Meteor.call('/user/save', user, function(err) {
        if (!err) {
          Router.go('users');
        } else {
          user.catchValidationException(err);
        }
      });
    }
  }
});
