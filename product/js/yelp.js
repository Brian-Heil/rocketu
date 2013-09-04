function getYelpData(location,foodtype) {
      var auth = { 
      //
      // Update with your auth tokens.
      //
      consumerKey: "uc4amnN-CGXv_MnQFEIToA",//bch "YOUR_CONSUMER_KEY", 
      consumerSecret: "WtPC6wSWDPaP_e9yTxWtDZimls4",//bch "YOUR_CONSUMER_SECRET",
      accessToken: "J_94Y5hs0cDWJ5oUBp3pnTQZPnQhgTcl",//bch "YOUR_TOKEN",
      // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
      // You wouldn't actually want to expose your access token secret like this in a real application.
      accessTokenSecret: "DcE0iEj5j5GJQorc0t6x89ntb-4",//bch "YOUR_TOKEN_SECRET",
      serviceProvider: { 
        signatureMethod: "HMAC-SHA1"
      }
    };

    var terms = 'food';
    var near = location;
    //add bch
    var category = foodtype;
    //end bch
    var accessor = {
      consumerSecret: auth.consumerSecret,
      tokenSecret: auth.accessTokenSecret
    };

    parameters = [];
    parameters.push(['term', terms]);
    //add bch
    parameters.push(['category_filter', category]);
    //end bch
    parameters.push(['location', near]);
    parameters.push(['callback', 'cb']);
    parameters.push(['oauth_consumer_key', auth.consumerKey]);
    parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
    parameters.push(['oauth_token', auth.accessToken]);
    parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

    var message = { 
      'action': 'http://api.yelp.com/v2/search',
      'method': 'GET',
      'parameters': parameters 
    };

    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);

    var parameterMap = OAuth.getParameterMap(message.parameters);
    parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)
    console.log(parameterMap);

    $.ajax({
        'url': message.action,
        'data': parameterMap,
        'cache': true,
        'dataType': 'jsonp',
        'jsonpCallback': 'cb',
        'success': function(data, textStats, XMLHttpRequest) {
        // list with details > loop through
            console.log(data);
            var businesslist = data.businesses;
            console.log (businesslist[0]);

            for (var i=0,len=businesslist.length; i<len; i++) {
                content = '<li><input type="checkbox" name="selection" value="' + businesslist[i].name + '">';
                content += "<h3>" + businesslist[i].name + "</h3>";
                content += "<p>" + "Yelp Rating " + businesslist[i].rating + "</p>";
                content += "<p>" + businesslist[i].snippet_text + "</p>";
                content += "<img src=" + businesslist[i].image_url + " /><br>";
                content += "</li>";
                $("ul#yelplist").append(content);

            }
            
        }
    });
    
};


// function displayYelpData(){
//     var businesslist = data.businesses
//         console.log (businesslist[0])
//         for (var i=0,len=businesslist.length; i<len; i++) {
//             content = "<h3>" + businesslist[i].name + "</h3>"
//             content += "<p>" + "Yelp Rating " + businesslist[i].rating + "</h3>"
//             content += "<p>" + businesslist[i].snippet_text + "</h3>"
//             $("#yelpresults").append(content + "<img src=" + businesslist[i].image_url + " /><br>");
//             }
// }