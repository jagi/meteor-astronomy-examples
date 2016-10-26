import {
  Class
}
from 'meteor/jagi:astronomy';
import i18n from '../i18n/i18n';

const Address = Class.create({
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
  resolveError({ nestedName, validator }) {
    return i18n.get(`address.${nestedName}.${validator}`);
  },
  helpers: {
    where() {
      return this.city + ', ' + this.state;
    }
  }
});

export default Address;