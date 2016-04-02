import User from '/imports/classes/user.js';

Meteor.publish('users', function() {
	return User.find();
});

Meteor.publish('user', function(id) {
	return User.find(id);
});