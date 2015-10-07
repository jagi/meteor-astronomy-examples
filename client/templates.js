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
    var astroClass = this; //Instance of User, Phone or Address Astro class

    var field = e.currentTarget;
    astroClass.set(field.id, field.value);
    astroClass.validate(field.id);

    var user = Template.instance().data.user.get();
    Template.instance().data.user.set(user);
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
  },
  'click [name=add-phone]': function (e, tmpl) {
    var user = Template.instance().data.user.get();
    user.phones.push(new Phone());
    Template.instance().data.user.set(user);
  },
  'click [name=remove-phone]': function (e, tmpl) {
    var user = Template.instance().data.user.get();
    user.pull('phones', this);
    Template.instance().data.user.set(user);
  }
});

Template.Form.helpers({
  getUser: function () {
    return Template.instance().data.user.get();
  }
});


