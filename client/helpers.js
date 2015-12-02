Template.registerHelper('pathFor', function(routeName) {
  return FlowRouter.path(routeName, this);
});