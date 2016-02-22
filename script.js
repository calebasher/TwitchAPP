$(document).ready(function(){

	var channels = ["freecodecamp","storbeck","terakilobyte","habathcx","RobotCaleb","brunofin","thomasballinger","noobs2ninjas","beohoff"];

	channels.forEach(function(channel){

		$('#results').append('<div class="row channelRow" id="'+channel+'""></div>');

		$.getJSON('https://api.twitch.tv/kraken/streams/'+channel+'?callback=?', function(data) {


			if (data.stream ===  null || data.stream === undefined) {
				$('#'+channel+'').addClass("redOffline");
			}
			else {
				$('#'+channel+'').addClass("greenOnline");
			}
			
		});

		$.getJSON('https://api.twitch.tv/kraken/channels/'+channel+'?callback=?', function(data) {

			if (data.logo === null || data.logo == undefined) {
				$('#'+channel+'').prepend('<div class="col-md-2"><img id="smallLogo" src="http://vignette4.wikia.nocookie.net/sims/images/6/65/Twitch_logo.png/revision/latest?cb=20140719225727"></div>');
			}
			else {
				$('#'+channel+'').prepend('<div class="col-md-2"><img id="smallLogo" src="'+data.logo+'"></div>');	
			};

			(data.display_name) ?
			$('#'+channel+'').append('<div class="col-md-5 name"><a href="'+data.url+'" target="blank">'+ data.display_name+'</div>') : 
			$('#'+channel+'').append('<div class="col-md-5 name"><a href="'+data.url+'" target="blank">'+ channel+'</div>'); 
			
			if (data.status === 422){
				$('#'+channel+'').append('<div class="col-md-5 status">Account does not exist.</div>')
			}
			else if (data.status !== null) {
				$('#'+channel+'').append('<div class="col-md-5 status">"'+data.status+'"</div>');
			}
		});


	})
var elem = $('#results').find('div.channelRow').sort(sortMe);

function sortMe(a, b) {
	return b.className < a.className;
}
$('#results').append(elem);

});