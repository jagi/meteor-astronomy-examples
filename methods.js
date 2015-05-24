Meteor.methods({
  '/user/save': function(user) {
    if (user.validate()) {
      user.save();
      return user;
    }

    var errors = user.getErrors();
    for (var fieldName in errors) {
      throw new Meteor.Error('validation-error', errors[fieldName]);
    }
  },
  '/user/remove': function(user) {
    user.remove();
  }
});
