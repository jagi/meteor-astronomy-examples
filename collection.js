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
    firstName: Validators.and([
      Validators.required(),
      Validators.minlen(3)
    ]),
    lastName: Validators.and([
      Validators.required(),
      Validators.minlen(3)
    ]),
    email: Validators.and([
      Validators.required(),
      Validators.email(3)
    ]),
    age: Validators.and([
      Validators.required(),
      Validators.gte(18),
      Validators.lte(100)
    ])
  },
  behaviors: ['timestamp']
});
