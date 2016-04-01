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
  },
  events: {
    beforeSave: function(e) {
      console.log('Phone.beforeSave');
    },
    afterSave: function(e) {
      console.log('Phone.afterSave');
    },
    beforeInsert: function(e) {
      console.log('Phone.beforeInsert');
    },
    afterInsert: function(e) {
      console.log('Phone.afterInsert');
    },
    beforeUpdate: function(e) {
      console.log('Phone.beforeUpdate');
    },
    afterUpdate: function(e) {
      console.log('Phone.afterUpdate');
    },
    beforeRemove: function(e) {
      console.log('Phone.beforeRemove');
    },
    afterRemove: function(e) {
      console.log('Phone.afterRemove');
    }
  }
});