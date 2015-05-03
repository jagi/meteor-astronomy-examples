Meteor.methods({
  '/member/save': function(data) {
    var member = new Member(data);

    if (member.validate()) {
      return member.save();
    } else {
      return false;
    }
  }
});
