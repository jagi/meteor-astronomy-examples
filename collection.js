Users = new Mongo.Collection('users');

User = Astro.Class({
  name: 'User',
  collection: Users,
  fields: {
    firstName: 'string',
    lastName: 'string',
    email: 'string',
    age: 'number'
  },
  methods: {
    fullName: function() {
      return this.firstName + ' ' + this.lastName;
    }
  },
  validators: {
    firstName: [
      Validators.required(),
      Validators.string(),
      Validators.minLength(3)
    ],
    lastName: [
      Validators.required(),
      Validators.string(),
      Validators.minLength(3)
    ],
    email: [
      Validators.required(),
      Validators.string(),
      Validators.email(3),
      Validators.unique(),
    ],
    age: [
      Validators.required(),
      Validators.number(),
      Validators.gte(18),
      Validators.lte(100)
    ]
  },
  behaviors: ['timestamp']
});
