Address = Astro.Class({
  name: 'Address',
  fields: {
    city: {
      type: 'string',
      validators: [
        Validators.minLength(3)
      ]
    },
    state: {
      type: 'string',
      validators: [
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
      validators: [
        Validators.minLength(3)
      ]
    },
    number: {
      type: 'string',
      validators: [
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
    'address': {
      type: 'object',
      class: 'Address',
      default: function() {
        return {};
      }
    },
    'phones': {
      type: 'array',
      class: 'Phone',
      default: function() {
        return [];
      }
    },
    'firstName': {
      type: 'string',
      required: true,
      validators: [
        Validators.minLength(3)
      ]
    },
    'lastName': {
      type: 'string',
      required: true,
      validators: [
        Validators.minLength(3)
      ]
    },
    'email': {
      type: 'string',
      required: true,
      validators: [
        Validators.email(3),
        Validators.unique()
      ]
    },
    'age': {
      type: 'number',
      required: true,
      validators: [
        Validators.gte(18),
        Validators.lte(100)
      ]
    }
  },
  methods: {
    fullName: function() {
      return this.firstName + ' ' + this.lastName;
    }
  },
  behaviors: {
    timestamp: {},
    softremove: {}
  }
});
