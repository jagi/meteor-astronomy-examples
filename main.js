import { Astro } from 'meteor/jagi:astronomy';
import User from '/imports/classes/User';
import Address from '/imports/classes/Address';
import Phone from '/imports/classes/Phone';

Astro.config.defaults = false;

if (Meteor.isClient) {
  window.User = User;
  window.Address = Address;
  window.Phone = Phone;
}