Meteor.methods({
  '/member/save': function(member) {
    if (member.validate()) {
      return member.save();
    } else {
      return false;
    }
  }
});
