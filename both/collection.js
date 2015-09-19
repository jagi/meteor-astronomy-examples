Address = Astro.Class({
  name: 'Address',
  fields: {
    city: {
      type: 'string',
      validator: [
        Validators.minLength(3)
      ]
    },
    state: {
      type: 'string',
      validator: [
        Validators.length(2)
      ]
    }
  },
  methods: {
    where: function() {
      return this.city + ', ' + this.state;
    }
  }
});

Phone = Astro.Class({
  name: 'Phone',
  fields: {
    name: {
      type: 'string',
      validator: [
        Validators.minLength(3)
      ]
    },
    number: {
      type: 'string',
      validator: [
        Validators.minLength(9)
      ]
    }
  },
  methods: {
    call: function() {
      console.log('Calling ' + this.name + ' phone: ' + this.number);
    }
  }
});

Users = new Mongo.Collection('users');

User = Astro.Class({
  name: 'User',
  collection: Users,
  fields: {
    'firstName': {
      type: 'string',
      validator: [
        Validators.minLength(3)
      ]
    },
    'lastName': {
      type: 'string',
      validator: [
        Validators.minLength(3)
      ]
    },
    'email': {
      type: 'string',
      validator: [
        Validators.email(3),
        Validators.unique()
      ]
    },
    'birthDate': {
      type: 'date',
      validator: [
        Validators.date()
      ]
    },
    'age': {
      type: 'number',
      transient: true
    },
    'address': {
      type: 'object',
      default: function() {
        return {};
      },
      nested: 'Address'
    },
    'phones': {
      type: 'array',
      nested: 'Phone'
    },
  },
  events: {
    afterInit: function() {
      var birthDate = this.birthDate;
      if (birthDate) {
        var diff = Date.now() - birthDate.getTime();
        this.set('age', Math.abs((new Date(diff)).getUTCFullYear() - 1970));
      }
    }
  },
  methods: {
    fullName: function() {
      return this.firstName + ' ' + this.lastName;
    },
    formattedBirthDate: function() {
      var date = this.birthDate;

      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = this.birthDate.getDate();

      if (month < 10) {
        month = '0' + month;
      }
      if (day < 10) {
        day = '0' + day;
      }

      return year + '-' + month + '-' + day;
    }
  },
  behaviors: {
    timestamp: {},
    softremove: {}
  }
});
