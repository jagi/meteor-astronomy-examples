import { Class } from 'meteor/jagi:astronomy';

export default Class.create({
  name: 'Address',
  fields: {
    city: {
      type: String
    },
    state: {
      type: String,
      validators: [{
        type: 'length',
        param: 2
      }, {
        type: 'regexp',
        param: /[A-Z]{2}/
      }]
    }
  },
  methods: {
    where() {
      return this.city + ', ' + this.state;
    }
  }
});