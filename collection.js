Members = new Mongo.Collection('members');

Member = Astro.Class({
  name: 'Member',
  collection: Members,
  fields: {
    firstName: 'string',
    lastName: 'string',
    email: 'string',
    age: 'number'
  },
  validators: {
    firstName: Astro.Validators.and([
      Astro.Validators.str(),
      Astro.Validators.minlen(3)
    ]),
    lastName: Astro.Validators.and([
      Astro.Validators.str(),
      Astro.Validators.minlen(3)
    ]),
    email: Astro.Validators.and([
      Astro.Validators.str(),
      Astro.Validators.email(3)
    ]),
    age: Astro.Validators.and([
      Astro.Validators.num(),
      Astro.Validators.gte(18),
      Astro.Validators.lte(100)
    ])
  },
  behaviors: ['sort']
});
