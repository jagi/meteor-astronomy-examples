Address = Astro.Class.create({
  name: 'Address',
  fields: {
    city: {
      type: 'string'
    },
    state: {
      type: 'string'
    }
  },
  methods: {
    where: function() {
      return this.city + ', ' + this.state;
    }
  }
});

Phone = Astro.Class.create({
  name: 'Phone',
  fields: {
    name: {
      type: 'string'
    },
    number: {
      type: 'string',
    }
  }
});

Users = new Mongo.Collection('users');

Users.allow({
  insert: function() {
    return true;
  },
  update: function(userId, doc, fieldNames, modifier) {
    return true;
  },
  remove: function() {
    return true;
  }
});

User = Astro.Class.create({
  name: 'User',
  collection: Users,
  nested: {
    'address': {
      count: 'one',
      class: 'Address'
    },
    'phones': {
      count: 'many',
      class: 'Phone',
      default: function() {
        return [];
      }
    },
    'tags': {
      count: 'many',
      type: 'string',
      default: function() {
        return [];
      }
    }
  },
  fields: {
    'object': null,
    'firstName': {
      type: 'string',
      simpleValidator: 'string,minLength(4),maxLength(10)',
    },
    'lastName': {
      type: 'string'
    },
    'email': {
      type: 'string'
    },
    'birthDate': {
      type: 'date'
    },
    'age': {
      type: 'number',
      transient: true
    }
  },
  events: {
    beforeSave: function(e) {
      console.log('User.beforeSave');
    },
    beforeInsert: function(e) {
      console.log('User.beforeInsert');
    },
    beforeUpdate: function(e) {
      console.log('User.beforeUpdate');
    },
    beforeRemove: function(e) {
      console.log('User.beforeRemove');
    },
    afterSave: function(e) {
      console.log('User.afterSave');
    },
    afterInsert: function(e) {
      console.log('User.afterInsert');
    },
    afterUpdate: function(e) {
      console.log('User.afterUpdate');
    },
    afterRemove: function(e) {
      console.log('User.afterRemove');
    },
    afterInit: function(e) {
      e.target.calculateAge();
    },
    validation: function(e) {
      let doc = e.currentTarget;
    },
    validationError: function(e) {
      let error = e.error;

      if (error.validator === 'minLength') {
        error.message = 'It is too short!'
      }
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
    timestamp: {}
  }
});

Items = new Mongo.Collection(null);

Item = Astro.Class.create({
  name: 'Item',
  collection: Items,
  fields: {
    name: 'string'
  },
  events: {
    beforeSave: function(e) {
      console.log('Item.beforeSave');
    },
    beforeInsert: function(e) {
      console.log('Item.beforeInsert');
    },
    beforeUpdate: function(e) {
      console.log('Item.beforeUpdate');
    },
    beforeRemove: function(e) {
      console.log('Item.beforeRemove');
    },
    afterSave: function(e) {
      console.log('Item.afterSave');
    },
    afterInsert: function(e) {
      console.log('Item.afterInsert');
    },
    afterUpdate: function(e) {
      console.log('Item.afterUpdate');
    },
    afterRemove: function(e) {
      console.log('Item.afterRemove');
    }
  },
  behaviors: {
    timestamp: {}
  }
});

// let methods;
// if (Meteor.isClient) {
//   methods = Meteor.connection._methodHandlers;
// } else if (Meteor.isServer) {
//   methods = Meteor.server.method_handlers;
// }
// let original = methods['/users/insert'];
// methods['/users/insert'] = function() {
//   console.log('/users/insert');
//   return original.apply(this, arguments);
// };