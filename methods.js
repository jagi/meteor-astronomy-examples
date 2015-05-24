Meteor.methods({
  '/user/save': function(user) {
    if (user.validate()) {
      user.save();
      return user;
    }

    user.throwValidationException();
  },
  '/user/remove': function(user) {
    user.remove();
  }
});
