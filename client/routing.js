Router.route('/', function() {
  this.render('Members', {
    data: function() {
      return {
        members: Members.find({}, {
          sort: {
            age: -1
          }
        })
      };
    }
  });
});

Router.route('/edit/:_id', function() {
  this.render('Edit', {
    data: function() {
      return {
        member: Members.findOne(this.params._id)
      };
    }
  });
}, {
  name: 'edit'
});

Router.route('/add', function() {
  this.render('Add', {
    data: function() {
      return {
        member: new Member()
      };
    }
  });
}, {
  name: 'add'
});
