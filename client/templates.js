import User from '/imports/classes/user.js';
import Phone from '/imports/classes/phone.js';
import { ValidationError } from 'meteor/jagi:astronomy';

Template.Users.onCreated(function() {
  this.subscribe('users');
});

Template.Users.helpers({
  users: function() {
    return User.find({}, {
      sort: {
        birthDate: 1
      }
    });
  }
});

Template.Users.events({
  'click [data-action="addUser"]': function(e, tmpl) {
    FlowRouter.go('add');
  }
});

Template.User.events({
  'click [data-action="removeUser"]': function(e, tmpl) {
    const user = this;

    if (confirm('Are you sure to remove "' + user.fullName() + '"')) {
      user.remove(function(err) {
        if (err) {
          if (ValidationError.is(err)) {
            Materialize.toast(err.reason, 2000);
          }
          else {
            throw err;
          }
        }
        else {
          Materialize.toast('User successfully removed', 2000);
        }
      });
    }
  }
});

Template.UserForm.onCreated(function() {
  const tmpl = this;
  tmpl.data.user = ReactiveVar();

  const _id = FlowRouter.getParam('_id');
  if (_id) {
    tmpl.subscribe('user', _id, function() {
      tmpl.data.user.set(User.findOne(_id));
      Tracker.afterFlush(function() {
        Materialize.updateTextFields();
      });
    });
  }
  else {
    tmpl.data.user.set(new User());
  }
});

Template.UserForm.events({
  'change input': function(e, tmpl) {
    const doc = this; // Instance of User, Phone or Address class.

    // Get an input which value was changed.
    const input = e.currentTarget;
    // Get field name.
    const fieldName = input.name;
    // Convert value type if needed.
    let fieldValue;
    if (input.type === 'date') {
      fieldValue = input.valueAsDate;
    }
    else if (input.type === 'number') {
      fieldValue = input.valueAsNumber
    }
    else {
      fieldValue = input.value;
    }
    // Set new value.
    doc.set(fieldName, fieldValue);
    // Validate given field.
    doc.validate({
      fields: [fieldName]
    }, function(err) {
      if (err) {
        if (ValidationError.is(err)) {
          Materialize.toast(err.reason, 2000);
        }
        else {
          throw err;
        }
      }
    });
  },
  'click [data-action="addPhone"]': function(e, tmpl) {
    const user = tmpl.data.user.get();
    user.phones.push(new Phone());
    tmpl.data.user.set(user);
  },
  'click [data-action="removePhone"]': function(e, tmpl) {
    const user = tmpl.data.user.get();
    user.phones = _.without(user.phones, this);
    tmpl.data.user.set(user);
  },
  'submit form': function(e, tmpl) {
    e.preventDefault();

    const user = tmpl.data.user.get();

    user.save(function(err) {
      if (err) {
        Materialize.toast(err.reason, 2000);
      }
      else {
        FlowRouter.go('users');
        Materialize.toast('User successfully saved', 2000);
      }
    });
  }
});