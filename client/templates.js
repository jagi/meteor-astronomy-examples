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
import {
  ReactiveVar
}
from 'meteor/reactive-var';

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

    if (confirm(`Are you sure to remove "${user.fullName()}"?`)) {
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
  this.user = ReactiveVar();

  const slug = FlowRouter.getParam('slug');
  if (slug) {
    this.subscribe('user', slug, () => {
      this.user.set(User.findOne({
        slug
      }));
      Tracker.afterFlush(() => {
        Materialize.updateTextFields();
      });
    });
  }
  else {
    this.user.set(new User({}, {
      defaults: true
    }));
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
    // Instance of User, Phone or Address class.
    const doc = this;
    // Get an input which value was changed.
    const input = e.currentTarget;
    // Get field name.
    const fieldName = input.name;
    // Get field value.
    const fieldValue = input.value;
    // Set new value.
    doc.set(fieldName, fieldValue, {
      cast: true
    });
    // Validate only given field.
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