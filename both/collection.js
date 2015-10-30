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
        Validators.email(),
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
      nested: 'Phone',
      default: function() {
        return [];
      }
    }
  },
  events: {
    afterChange: function(e) {
      if (e.data.fieldName === 'birthDate') {
        this.calculateAge();
      }
    },
    afterInit: function() {
      this.calculateAge();
    }
  },
  methods: {
    calculateAge: function() {
      if (this.birthDate) {
        var diff = Date.now() - this.birthDate.getTime();
        this.set('age', Math.abs((new Date(diff)).getUTCFullYear() - 1970));
      }
    },
    fullName: function() {
      return this.firstName + ' ' + this.lastName;
    },
    formattedBirthDate: function() {
      var date = this.birthDate;

      if (date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

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
