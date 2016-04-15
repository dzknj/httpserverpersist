const Router = module.exports = exports = function() {
  this.routes = {
    'GET': {},
    'POST': {},
    'DELETE': {}
  };
};
Router.prototype.get = function(routeName, cb) {
  this.routes.GET[routeName] = cb;
  return this;
};
Router.prototype.post = function(routeName, cb) {
  this.routes.POST[routeName] = cb;
  return this;
};
Router.prototype.delete = function(routeName, cb) {
  this.routes.DELETE[routeName] = cb;
  return this;
}
Router.prototype.route = function() {
  var routes = this.routes;
  return function(req, res) {
    if(typeof routes[req.method][req.url] === 'function')
      routes[req.method][req.url](req, res);
  };
};
