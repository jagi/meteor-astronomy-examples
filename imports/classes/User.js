import {
  Class
}
from 'meteor/jagi:astronomy';
import Users from '/imports/collections/Users';
import Address from '/imports/classes/Address';
import Phone from '/imports/classes/Phone';
import {
  check
}
from 'meteor/check';
import i18n from '../i18n/i18n';

const User = Class.create({
  name: 'User',
  collection: Users,
  secured: false,
  fields: {
    firstName: {
      type: String,
      validators: [{
        type: 'minLength',
        param: 2
      }]
    },
    lastName: {
      type: String,
      validators: [{
        type: 'minLength',
        param: 2
      }]
    },
    email: {
      type: String,
      validators: [{
        type: 'email'
      }]
    },
    birthDate: {
      type: Date,
      validators: [{
        type: 'lte',
        resolveParam() {
          var date = new Date();
          return date.setFullYear(date.getFullYear() - 18);
        }
      }]
    },
    age: {
      type: Number,
      transient: true
    },
    address: {
      type: Address,
      default() {
        return new Address();
      }
    },
    phones: {
      type: [Phone],
      default() {
        return [];
      }
    }
  },
  resolveError({ nestedName, validator }) {
    return i18n.get(`user.${nestedName}.${validator}`);
  },
  events: {
    afterInit(e) {
      e.target.calculateAge();
    }
  },
  helpers: {
    calculateAge() {
      if (this.birthDate) {
        const diff = Date.now() - this.birthDate.getTime();
        this.age = Math.abs((new Date(diff)).getUTCFullYear() - 1970);
      }
    },
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    formattedBirthDate() {
      const date = this.birthDate;
      if (date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (month < 10) {
          month = `0${month}`;
        }
        if (day < 10) {
          day = `0${day}`;
        }
        return `${year}-${month}-${day}`;
      }
    }
  },
  meteorMethods: {
    create() {
      return this.save();
    },
    changeName(firstName, lastName) {
      check(firstName, String);
      check(lastName, String);
      this.firstName = firstName;
      this.lastName = lastName;
      return this.save();
    }
  },
  indexes: {
    email: {
      fields: {
        email: 1
      },
      options: {
        unique: true
      }
    }
  },
  behaviors: {
    slug: {
      fieldName: 'email'
    },
    timestamp: {}
  }
});

export default User;