import User from '/imports/classes/User';
import Address from '/imports/classes/Address';
import Phone from '/imports/classes/Phone';

if (Meteor.isClient) {
  window.User = User;
  window.Address = Address;
  window.Phone = Phone;
}