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
    var field = e.currentTarget;
    this.set(field.id, field.value);
    this.validate(field.id);
  },
  'click [name=save]': function(e, tmpl) {
    if (this.validate()) {
      Meteor.call('/user/save', this, function(err, user) {
        if (!err) {
          Router.go('users');
        }
      });
    }
  }
});
