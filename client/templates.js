Template.Members.events({
  'click [name=add]': function(e, tmpl) {
    Router.go('add');
  }
});

Template.Member.events({
  'click .remove': function(e, tmpl) {
    if (confirm(
        'Are you sure to remove "' + this.firstName + ' ' + this.lastName +
        '"'
      )) {
      this.remove();
    }
  }
});

Template.Form.events({
  'change input': function(e, tmpl) {
    var field = e.currentTarget;
    this.set(field.id, field.value);
    this.validate(field.id);
  },
  'click [name=save]': function(e, tmpl) {
    if (this.validate()) {
      Meteor.call('/member/save', this.get(), function(err, member) {
        if (!err) {
          Router.go('/');
        }
      });
    }
  }
});
