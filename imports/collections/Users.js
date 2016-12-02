import {
  Mongo
}
from 'meteor/mongo';

const Users = new Mongo.Collection('users');

export default Users;