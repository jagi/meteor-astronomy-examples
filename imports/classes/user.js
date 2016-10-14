import {
  Class,
  Enum
}
from 'meteor/jagi:astronomy';
import Users from '/imports/collections/users.js';
import Address from '/imports/classes/address.js';
import Phone from '/imports/classes/phone.js';
import {
  check
}
from 'meteor/check';

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
      default () {
        return new Address();
      }
    },
    phones: {
      type: [Phone],
      default () {
        return [];
      }
    }
  },
  events: {
    afterInit(e) {
      e.target.calculateAge();
    }
  },
  meteorMethods: {
    changeName(doc, firstName, lastName) {
      check(firstName, String);
      check(lastName, String)
      doc.firstName = firstName;
      doc.lastName = lastName;
      return doc.save();
    }
  },
  methods: {
    calculateAge() {
      if (this.birthDate) {
        let diff = Date.now() - this.birthDate.getTime();
        this.age = Math.abs((new Date(diff)).getUTCFullYear() - 1970);
      }
    },
    fullName() {
      return this.firstName + ' ' + this.lastName;
    },
    formattedBirthDate() {
      let date = this.birthDate;

      if (date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (month < 10) {
          month = '0' + month;
        }
        if (day < 10) {
          day = '0' + day;
        }

        return year + '-' + month + '-' + day;
      }
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
    timestamp: {},
    softremove: {}
  }
});

export default User;