Address = Astro.Class({
  name: 'Address',
  fields: {
    city: {
      type: 'string',
      validators: [
        Validators.required(),
        Validators.string(),
        Validators.minLength(3)
      ]
    },
    state: {
      type: 'string',
      validators: [
        Validators.required(),
        Validators.string(),
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
        Validators.string()
      ]
    },
    number: {
      type: 'string',
      validators: [
        Validators.string()
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
  embedOne: {
    'address': {
      class: 'Address'
    }
  },
  embedMany: {
    'phones': {
      class: 'Phone'
    }
  },
  fields: {
    'firstName': {
      type: 'string',
      required: true,
      validators: [
        Validators.required(),
        Validators.string(),
        Validators.minLength(3)
      ]
    },
    'lastName': {
      type: 'string',
      validators: [
        Validators.required(),
        Validators.string(),
        Validators.minLength(3)
      ]
    },
    'email': {
      type: 'string',
      validators: [
        Validators.required(),
        Validators.string(),
        Validators.email(3),
        Validators.unique(),
      ]
    },
    'age': {
      type: 'number',
      validators: [
        Validators.required(),
        Validators.number(),
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
    timestamp: {}
  }
});
