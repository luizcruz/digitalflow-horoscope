const sign = 'aquarius';
const fetch = require("node-fetch");


    
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
      return response_json;
    });


console.log(horoscope_response);
    
