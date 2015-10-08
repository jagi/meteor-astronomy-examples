Template.Users.onCreated(function(){
  this.subscribe('users');
});

Template.Users.helpers({
  users: function() {
    return Users.find({}, {
      sort: {
        age: -1
      }
    });
  }
});

Template.Users.events({
  'click [name=add]': function(e, tmpl) {
    FlowRouter.go('add');
  }
});

Template.User.events({
  'click .remove': function(e, tmpl) {
    if (confirm('Are you sure to remove "' + this.fullName() + '"')) {
      Meteor.call('/user/remove', this);
    }
  }
});

Template.UserForm.onCreated(function(){

  var _id = FlowRouter.getParam('_id');

  if (_id) {
    this.subscribe('user', _id);
    this.data.user = new ReactiveVar(Users.findOne(_id));
  } else {
    this.data.user = ReactiveVar(new User());
  }
});

Template.UserForm.events({
  'change input': function(e, tmpl) {
    var doc = this; // Instance of User, Phone or Address class.

    // Get an input which value was changed.
    var input = e.currentTarget;
    // Set a value of a field in an instance of User, Phone or Address class.
    doc.set(input.id, input.value);
    // Validate given field.
    doc.validate(input.id);
  },
  'click [name=addPhone]': function(e, tmpl) {
    var user = tmpl.data.user.get();
    // FIXME: It should be:
    // user.push('phones', new Phone());
    // However, it will not work because of trying to modify the same field with
    // two different modifiers. I have to implement modifiers merging.
    user.phones.push(new Phone());
    tmpl.data.user.set(user);
  },
  'click [name=removePhone]': function(e, tmpl) {
    var user = tmpl.data.user.get();
    user.pull('phones', this);
    tmpl.data.user.set(user);
  },
  'click [name=save]': function(e, tmpl) {
    var user = tmpl.data.user.get();

    if (user.validate()) {
      Meteor.call('/user/save', user, function(err) {
        if (!err) {
          FlowRouter.go('users');
        } else {
          user.catchValidationException(err);
        }
      });
    }
  }
});
