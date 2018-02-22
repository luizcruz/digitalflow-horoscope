'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');
const https = require("http");


// a. the action name from the make_name Dialogflow intent
const NAME_ACTION = 'horoscope';
// b. the parameters that are parsed from the make_name intent
const SIGN_ARGUMENT = 'sign';


exports.horoscope = functions.https.onRequest((request, response) => {
  const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));




// c. The function that generates the silly name
  function horoscope (app) {

    let sign = app.getArgument(SIGN_ARGUMENT);
    let horoscope_response = '';
	
	const url =
	  "http://sandipbgt.com/theastrologer/api/horoscope/" + sign + "/today/";
	https.get(url, res => {
	  res.setEncoding("utf8");
	  let body = "";
	  res.on("data", data => {
	    body += data;
	  });
	  res.on("end", () => {
	    body = JSON.parse(body);
	    horoscope_response = `${body.horoscope}`;
	    app.tell('Alright, horoscope for your sign today is:  ' + horoscope_response + '');
	    
	  });
	});


  }

  // d. build an action map, which maps intent names to functions
  let actionMap = new Map();
  actionMap.set(NAME_ACTION, horoscope);


app.handleRequest(actionMap);
});


