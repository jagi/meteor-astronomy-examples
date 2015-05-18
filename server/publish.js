Meteor.publish('users', function() {
  return Users.find();
});

Meteor.publish('user', function(id) {
  return Users.find(id);
});
