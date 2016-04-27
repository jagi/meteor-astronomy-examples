import { Class } from 'meteor/jagi:astronomy';

export default Class.create({
  name: 'Phone',
  fields: {
    name: {
      type: String
    },
    number: {
      type: String
    }
  }
});