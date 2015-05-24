Template.Users.events({
  'click [name=add]': function(e, tmpl) {
    Router.go('add');
  }
});

Template.User.events({
  'click .remove': function(e, tmpl) {
    if (confirm('Are you sure to remove "' + this.fullName() + '"')) {
      Meteor.call('/user/remove', this);
    }
  }
});

Template.Form.events({
  'change input': function(e, tmpl) {
    var user = this;

    var field = e.currentTarget;
    user.set(field.id, field.value);
    user.validate(field.id);
  },
  'click [name=save]': function(e, tmpl) {
    var user = this;

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
