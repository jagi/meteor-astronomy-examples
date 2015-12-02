Template.registerHelper('log', function(arg){
  console.log(arg);
});

Template.Users.onCreated(function() {
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
      Meteor.call('/user/remove', this._id);
    }
  }
});

Template.UserForm.onCreated(function() {
  var _id = FlowRouter.getParam('_id');

  window.tmpl = this;

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
    // Get field name.
    var fieldName = input.id;
    // Convert value type if needed.
    var fieldValue;
    if (input.type === 'date') {
      fieldValue = input.valueAsDate;
    } else if (input.type === 'number') {
      fieldValue = input.valueAsNumber
    } else {
      fieldValue = input.value;
    }
    // Set new value.
    doc[fieldName] = fieldValue;
    // Validate given field.
    // doc.validate(input.id);
  },
  'click [name=addPhone]': function(e, tmpl) {
    var user = tmpl.data.user.get();
    user.phones.push(new Phone());
    tmpl.data.user.set(user);
  },
  'click [name=removePhone]': function(e, tmpl) {
    var user = tmpl.data.user.get();
    user.phones = _.without(user.phones, this);
    tmpl.data.user.set(user);
  },
  'click [name=save]': function(e, tmpl) {
    var user = tmpl.data.user.get();
    console.log(user.getModified());
    user.save(function(error) {
      console.log('save callback', arguments);
      if (!error) {
        FlowRouter.go('users');
      }
    });

    // if (user.validate()) {
    //   Meteor.call('/user/save', user, function(err) {
    //     if (!err) {
    //
    //     } else {
    //       user.catchValidationException(err);
    //     }
    //   });
    // }
  }
});
