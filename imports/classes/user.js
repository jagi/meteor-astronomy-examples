import { Class } from 'meteor/jagi:astronomy';
import Users from '/imports/collections/users.js';
import Address from '/imports/classes/address.js';
import Phone from '/imports/classes/phone.js';

export default Class.create({
  name: 'User',
  collection: Users,
  fields: {
    firstName: {
      type: String
    },
    lastName: {
      type: String
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
        resolveParam: function() {
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
      default: function() {
        return new Address();
      }
    },
    phones: {
      type: [Phone],
      default: function() {
        return [];
      }
    }
  },
  events: {
    afterInit: function(e) {
      e.target.calculateAge();
    },
    beforeSave: function(e) {
      console.log('User.beforeSave');
    },
    afterSave: function(e) {
      console.log('User.afterSave');
    },
    beforeInsert: function(e) {
      console.log('User.beforeInsert');
    },
    afterInsert: function(e) {
      console.log('User.afterInsert');
    },
    beforeUpdate: function(e) {
      console.log('User.beforeUpdate');
    },
    afterUpdate: function(e) {
      console.log('User.afterUpdate');
    },
    beforeRemove: function(e) {
      console.log('User.beforeRemove');
    },
    afterRemove: function(e) {
      console.log('User.afterRemove');
    }
  },
  methods: {
    calculateAge: function() {
      if (this.birthDate) {
        let diff = Date.now() - this.birthDate.getTime();
        this.age = Math.abs((new Date(diff)).getUTCFullYear() - 1970);
      }
    },
    fullName: function() {
      return this.firstName + ' ' + this.lastName;
    },
    formattedBirthDate: function() {
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
    timestamp: {
      createdFieldName: 'createdAt'
    }
  }
});