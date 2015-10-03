Template.Users.onCreated(function(){
  this.subscribe('users');
});

Template.Users.events({
  'click [name=add]': function(e, tmpl) {
    FlowRouter.go('add');
  }
});

Template.Users.helpers({
  users: function() {
    return Users.find({}, {
      sort: {
        age: -1
      }
    });
  }
});

Template.User.events({
  'click .remove': function(e, tmpl) {
    if (confirm('Are you sure to remove "' + this.fullName() + '"')) {
      Meteor.call('/user/remove', this);
    }
  }
});

Template.User.helpers({
  pathForCurrentUser : function(){
    var self = this;
    var params = {
      _id: self._id
    };
    //var queryParams = {comments: "yes"};
    var routeName = "edit";
    var path = FlowRouter.path(routeName, params);

    return path;
  }
});

Template.Edit.onCreated(function(){
  var _id = FlowRouter.getParam('_id');
  this.subscribe('user', _id);
});

Template.Edit.helpers({
  user: function(){
    return Users.findOne(this._id);
  }
});

Template.Add.helpers({
  user: function(){
    return new User();
  }
});

Template.Form.events({
  'change input': function(e, tmpl) {
    var user = this;

    var field = e.currentTarget;
    user.set(field.id, field.value);
    user.validate(field.id);
  },
  'click [name=save]': function(e, tmpl) {
    var user = this;

    if (user.validate()) {
      Meteor.call('/user/save', user, function(err) {
        if (!err) {
          FlowRouter.go('users');
        } else {
          user.catchValidationException(err);
        }
      });
    }
  }
});
