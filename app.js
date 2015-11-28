// google map initialization, bound to window object
// called from script tag in html
var initMap = function() {
	// create a map object and specify the DOM element for display
	// center of map
	var centerLatLng = {lat: 37.336, lng: -121.893};
	// lat, lng, marker name, title for each hard-coded location
	var studio = {
		lat: 37.3303299,
		lng: -121.8858455,
		marker: 'studioMarker',
		title: 'The Studio'
	};
	var wholeFoods = {
		lat: 37.332092,
		lng: -121.9044,
		marker: 'wholeFoodsMarker',
		title: 'Whole Foods'
	};
	var guadalupe = {
		lat: 37.3434303,
		lng: -121.904,
		marker: 'guadalupeMarker',
		title: 'Guadalupe River Park'
	};
	var train = {
		lat: 37.330340,
		lng: -121.902960,
		marker: 'trainMarker',
		title: 'Diridon Train Station'
	};
	var ballet = {
		lat: 37.3369063,
		lng: -121.89304,
		marker: 'balletMarker',
		title: 'Silicon Valley Ballet'
	};

	// create array to hold default locations
	var mapLocations = [studio, wholeFoods, guadalupe, train, ballet]

	// create map
	var map = new google.maps.Map(document.getElementById('map'), {
		center: centerLatLng,
		scrollwheel: false,
		zoom: 15
	});

	// add 5 custom hard-coded location markers on initialization
	for (var i = 0; i < mapLocations.length; i++) {
		var currentItem = mapLocations[i];
		var marker = new google.maps.Marker({
			position: {lat: currentItem.lat, lng: currentItem.lng},
			map: map,
			title: currentItem.title
		})
	};

};

// models
var mapModel = function() {
	this.locations = [];

}

// controller
var viewModel = function() {

};

ko.applyBindings(new viewModel());