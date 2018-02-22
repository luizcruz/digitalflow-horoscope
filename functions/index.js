'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');
const fetch = require("node-fetch");



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
    var horoscope_response = '';	

 	const url = "http://sandipbgt.com/theastrologer/api/horoscope/" + sign + "/today/";
  
	function callAPI(url) { 
    	return fetch(url)
	    .then((response) => {
		   if(response.ok) {
		     return response.json();
		   } else {
		     throw new Error('Server response wasn\'t OK');
		   }
	 	})
	    .then((json) => {
			const response_json = json.horoscope;  
			return response_json ;
		})  
	    .catch(error => {
			console.log(error);
	    });
    }

	horoscope_response = callAPI(url).then((response_json)=>{
	      return response_json
	});
    
    app.tell('Alright, horoscope for '+ sign +' today is:  ' + horoscope_response + '');

    

    
  }

  // d. build an action map, which maps intent names to functions
  let actionMap = new Map();
  actionMap.set(NAME_ACTION, horoscope);


app.handleRequest(actionMap);
});


