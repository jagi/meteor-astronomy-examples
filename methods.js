Meteor.methods({
  '/member/save': function(data) {
    var member;

    if (data._id) {
      member = Members.findOne(data._id);
      member.set(data);
    } else {
      member = new Member(data);
    }

    if (member.validate()) {
      return member.save();
    } else {
      return false;
    }
  }
});
