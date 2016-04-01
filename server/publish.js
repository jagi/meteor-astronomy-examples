import User from '/imports/classes/user.js';

Meteor.publish('users', function() {
  console.log('subscribe to all users');
	return User.find();
});

Meteor.publish('user', function(id) {
	return User.find(id);
});