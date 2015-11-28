var map;
function initMap() {
	// create a map object and specify the DOM element for display
	var centerLatLng = {lat: 37.336, lng: -121.893};
	var studioLatLng = {lat: 37.3303299, lng: -121.8858455};
	var wholeFoodsLatLng = {lat: 37.332092, lng: -121.9044};
	var guadalupeLatLng = {lat: 37.3434303, lng: -121.904};
	var trainLatLng = {lat: 37.330340, lng: -121.902960};
	var balletLatLng = {lat: 37.3369063, lng: -121.89304};


	map = new google.maps.Map(document.getElementById('map'), {
		center: centerLatLng,
		scrollwheel: false,
		zoom: 15
	});

	// add 5 custom hard-coded location markers
	var studioMarker = new google.maps.Marker({
		position: studioLatLng,
		map: map,
		title: 'The Studio'
	});
	var wholeFoodsMarker = new google.maps.Marker({
		position: wholeFoodsLatLng,
		map: map,
		title: 'Whole Foods'
	});
	var guadalupeMarker = new google.maps.Marker({
		position: guadalupeLatLng,
		map: map,
		title: 'Guadalupe River Park'
	});
	var trainMarker = new google.maps.Marker({
		position: trainLatLng,
		map: map,
		title: 'Diridon Train Station'
	});
	var balletMarker = new google.maps.Marker({
		position: balletLatLng,
		map: map,
		title: 'Silicon Valley Ballet'
	});
}