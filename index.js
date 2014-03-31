var render = require('./lib/render');
var route = require('koa-route');
var views = require('co-views');
var request = require('co-request');
var koa = require('koa');
var app = koa();

app.use(route.get('/', index));

function *index() {

  var options = {
    url: 'https://api.github.com/users/lanceharper',
    headers: { 'User-Agent': 'request' }
  };

  var response = yield request(options);
  var parsedBody = JSON.parse(response.body);
  this.body = yield render('index', {user:parsedBody.name});
}

app.listen(3000);
