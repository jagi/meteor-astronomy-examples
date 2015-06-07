Users = new Mongo.Collection('users');

User = Astro.Class({
  name: 'User',
  collection: Users,
  fields: {
    'object': {
      type: 'object',
      default: {}
    },
    'object.subobject': {
      type: 'string',
      default: 'sub'
    },
    'addresses': {
      type: 'array',
      default: []
    },
    'addresses.$': {
      type: 'object',
      default: {
        state: '',
        city: ''
      }
    },
    'addresses.$.state': {
      type: 'string'
    },
    'addresses.$.city': {
      type: 'string'
    },
    'firstName': {
      type: 'string',
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
  behaviors: ['timestamp', 'softremove']
});
