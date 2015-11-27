var map;
function initMap() {
	// create a map object and specify the DOM element for display
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 37.332, lng: -121.893},
		scrollwheel: false,
		zoom: 15
	});
}