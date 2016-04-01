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
  events: {
    beforeSave: function(e) {
      console.log('Address.beforeSave');
    },
    afterSave: function(e) {
      console.log('Address.afterSave');
    },
    beforeInsert: function(e) {
      console.log('Address.beforeInsert');
    },
    afterInsert: function(e) {
      console.log('Address.afterInsert');
    },
    beforeUpdate: function(e) {
      console.log('Address.beforeUpdate');
    },
    afterUpdate: function(e) {
      console.log('Address.afterUpdate');
    },
    beforeRemove: function(e) {
      console.log('Address.beforeRemove');
    },
    afterRemove: function(e) {
      console.log('Address.afterRemove');
    }
  },
  methods: {
    where: function() {
      return this.city + ', ' + this.state;
    }
  }
});