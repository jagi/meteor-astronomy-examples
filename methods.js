Meteor.methods({
  '/user/save': function(user) {
    if (user.validate()) {
      user.save();
    }
  },
  '/user/remove': function(user) {
    user.remove();
  }
});
