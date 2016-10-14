import {
  Class
}
from 'meteor/jagi:astronomy';

const Phone = Class.create({
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

export default Phone;