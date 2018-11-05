const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const Request  = require('request');
const Querystring  = require('querystring');
var cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

//var csrf_guid = Guid.raw();
var csrf_guid = 'test';
const account_kit_api_version = 'v1.1';
const app_id = '248317325862187';
const app_secret = 'b50a135544538e8160de917d6d346160';
const me_endpoint_base_url = 'https://graph.accountkit.com/{{ACCOUNT_KIT_API_VERSION}}/me';
const token_exchange_base_url = 'https://graph.accountkit.com/{{ACCOUNT_KIT_API_VERSION}}/access_token';

app.post('/login_success', cors(), function(request, response) {
  // CSRF check
  if (request.body.csrf === csrf_guid) {
    var app_access_token = ['AA', app_id, app_secret].join('|');
    var params = {
      grant_type: 'authorization_code',
      code: request.body.code,
      access_token: app_access_token
    };

    // exchange tokens
    var token_exchange_url = token_exchange_base_url + '?' + Querystring.stringify(params);
    Request.get({url: token_exchange_url, json: true}, function(err, resp, respBody) {
      var view = {
        user_access_token: respBody.access_token,
        expires_at: respBody.expires_at,
        user_id: respBody.id,
      };

      // get account details at /me endpoint
      var me_endpoint_url = me_endpoint_base_url + '?access_token=' + respBody.access_token;
      Request.get({url: me_endpoint_url, json:true }, function(err, resp, respBody) {
        // send login_success.html
        if (respBody.phone) {
          view.phone_num = respBody.phone.number;
        } else if (respBody.email) {
          view.email_addr = respBody.email.address;
        }
        //var html = Mustache.to_html(loadLoginSuccess(), view);
        response.send("SUCCESSS");
      });
    });
  }
  else {
    // login failed
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end("Something went wrong. :( ");
  }
});

app.listen(8880);
