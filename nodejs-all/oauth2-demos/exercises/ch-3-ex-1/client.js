var express = require("express");
var request = require("sync-request");
var url = require("url");
var qs = require("qs");
var querystring = require('querystring');
var cons = require('consolidate');
var randomstring = require("randomstring");
var __ = require('underscore');
__.string = require('underscore.string');

var app = express();

app.engine('html', cons.underscore);
app.set('view engine', 'html');
app.set('views', 'files/client');

// authorization server information
var authServer = {
	authorizationEndpoint: 'http://localhost:9001/authorize',
	tokenEndpoint: 'http://localhost:9001/token'
};

// client information


/*
 * Add the client information in here
 */
var client = {
	"client_id": "oauth-client-1",
	"client_secret": "oauth-client-secret-1",
	"redirect_uris": ["http://localhost:9000/callback"]
};

var protectedResource = 'http://localhost:9002/resource';

var state = null;

var access_token = null;
var refresh_token = null;
var scope = null;
var id_token = null;
var userInfo = null;

app.get('/', function (req, res) {
	res.render('index', {access_token: access_token, scope: scope});
});

app.get('/authorize', function(req, res){

	/*
	 * Send the user to the authorization server
	 */
	 access_token = null;
	 refresh_token = null;
	// scope = null;
	// state = randomstring.generate();
	
	var authorizeUrl = buildUrl(authServer.authorizationEndpoint, {
		response_type: 'code',
		//scope: client.scope,
		client_id: client.client_id,
		redirect_uri: client.redirect_uris[0],
		//state: state
	});
	
	console.log("redirect", authorizeUrl);
	// 重定向
	res.redirect(authorizeUrl);
	
});

app.get('/callback', function(req, res){
	console.log("-----/callback----------")
	/*
	 * Parse the response from the authorization server and get a token
	 */
	var code = req.query.code;

	var form_data = qs.stringify({
				grant_type: 'authorization_code',
				code: code,
				redirect_uri: client.redirect_uris[0]
			});
	var headers = {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Authorization': 'Basic ' + encodeClientCredentials(client.client_id, client.client_secret)
	};

	var tokRes = request('POST', authServer.tokenEndpoint, 
		{	
			body: form_data,
			headers: headers
		}
	);

	console.log('Requesting access token for code %s',code);
	if (tokRes.statusCode >= 200 && tokRes.statusCode < 300) {
		var body = JSON.parse(tokRes.getBody());
	
		access_token = body.access_token;
		console.log('Got access token: %s', access_token);
		if (body.refresh_token) {
			refresh_token = body.refresh_token;
			console.log('Got refresh token: %s', refresh_token);
		}
		
		scope = body.scope;
		console.log('Got scope: %s', scope);

		if (body.id_token) {
			userInfo = null;
			id_token = null;

			console.log('Got ID token: %s', body.id_token);
	
			// check the id token
			var pubKey = jose.KEYUTIL.getKey(rsaKey);
			var signatureValid = jose.jws.JWS.verify(body.id_token, pubKey, [rsaKey.alg]);
			if (signatureValid) {
				console.log('Signature validated.');
				var tokenParts = body.id_token.split('.');
				var payload = JSON.parse(base64url.decode(tokenParts[1]));
				console.log('Payload', payload);
				if (payload.iss == 'http://localhost:9001/') {
					console.log('issuer OK');
					if ((Array.isArray(payload.aud) && __.contains(payload.aud, client.client_id)) || 
						payload.aud == client.client_id) {
						console.log('Audience OK');
		
						var now = Math.floor(Date.now() / 1000);
		
						if (payload.iat <= now) {
							console.log('issued-at OK');
							if (payload.exp >= now) {
								console.log('expiration OK');
				
								console.log('Token valid!');

								// save just the payload, not the container (which has been validated)
								id_token = payload;
				
							}
						}
					}
				}
			}
			res.render('userinfo', {userInfo: userInfo, id_token: id_token});
			
		} else {
			res.render('index', {access_token: access_token, refresh_token: refresh_token, scope: scope});
		}

	} else {
		res.render('error', {error: 'Unable to fetch access token, server response: ' + tokRes.statusCode})
	}
	
});

app.get('/fetch_resource', function(req, res) {

	/*
	 * Use the access token to call the resource server
	 */
	if (!access_token) {
		res.render('error', {error: 'Missing access token.'});
		return;
	}
	
	console.log('Making request with access token %s', access_token);
	
	var headers = {
		'Authorization': 'Bearer ' + access_token,
		'Content-Type': 'application/x-www-form-urlencoded'
	};
	
	var resource = request('POST', protectedResource,
		{headers: headers}
	);
	
	if (resource.statusCode >= 200 && resource.statusCode < 300) {
		var body = JSON.parse(resource.getBody());
		res.render('data', {resource: body});
		return;
	} else {
		access_token = null;
		if (refresh_token) {
			// try to refresh and start again
			refreshAccessToken(req, res);
			return;
		} else {
			res.render('error', {error: 'Server returned response code: ' + resource.statusCode});
			return;
		}
	}
	
});

var buildUrl = function(base, options, hash) {
	var newUrl = url.parse(base, true);
	delete newUrl.search;
	if (!newUrl.query) {
		newUrl.query = {};
	}
	__.each(options, function(value, key, list) {
		newUrl.query[key] = value;
	});
	if (hash) {
		newUrl.hash = hash;
	}
	
	return url.format(newUrl);
};

var encodeClientCredentials = function(clientId, clientSecret) {
	return new Buffer(querystring.escape(clientId) + ':' + querystring.escape(clientSecret)).toString('base64');
};

app.use('/', express.static('files/client'));

var server = app.listen(9000, 'localhost', function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('OAuth Client is listening at http://%s:%s', host, port);
});
 
