import User from '/imports/classes/User';

Meteor.publish('users', function() {
  return User.find();
});

Meteor.publish('user', function(slug) {
  return User.find({
    slug
  });
});