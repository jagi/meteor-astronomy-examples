import {
  without
}
from 'lodash';
import User from '/imports/classes/User';
import Phone from '/imports/classes/Phone';
import {
  ValidationError
}
from 'meteor/jagi:astronomy';

Template.Users.onCreated(function() {
  this.subscribe('users');
});

Template.Users.helpers({
  users() {
    return User.find({}, {
      sort: {
        birthDate: 1
      }
    });
  }
});

Template.Users.events({
  'click [data-action="addUser"]' (e, tmpl) {
    FlowRouter.go('add');
  }
});

Template.User.events({
  'click [data-action="removeUser"]' (e, tmpl) {
    const user = this;

    if (confirm('Are you sure to remove "' + user.fullName() + '"')) {
      user.remove((err) => {
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
  tmpl.user = ReactiveVar();

  const slug = FlowRouter.getParam('slug');
  if (slug) {
    tmpl.subscribe('user', slug, () => {
      tmpl.user.set(User.findOne({
        slug
      }));
      Tracker.afterFlush(() => {
        Materialize.updateTextFields();
      });
    });
  }
  else {
    tmpl.user.set(new User());
  }
});

Template.UserForm.helpers({
  user() {
    const tmpl = Template.instance();
    return tmpl.user.get();
  }
});

Template.UserForm.events({
  'change input' (e, tmpl) {
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
    }, (err) => {
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
  'click [data-action="addPhone"]' (e, tmpl) {
    const user = tmpl.user.get();
    user.phones.push(new Phone());
    tmpl.user.set(user);
  },
  'click [data-action="removePhone"]' (e, tmpl) {
    const user = tmpl.user.get();
    user.phones = without(user.phones, this);
    tmpl.user.set(user);
  },
  'submit form' (e, tmpl) {
    e.preventDefault();

    const user = tmpl.user.get();

    user.save((err) => {
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