// google map initialization, bound to window object
// called from script tag in html
var map;
var initMap = function() {
	// create a map object and specify the DOM element for display
	// create empty array to store location objects
	// this.mapLocations = ko.observableArray();

	// center of map
	var centerLatLng = {lat: 37.336, lng: -121.893};

	// create map
	map = new google.maps.Map(document.getElementById('map'), {
		center: centerLatLng,
		scrollwheel: false,
		zoom: 15
	});

	// mapView();
	ko.applyBindings(new mapView());
};

// models
var mapView = function() {
	// create empty array to store location objects
	this.mapLocations = ko.observableArray();

		// lat, lng, marker name, title for each hard-coded location
	var initialData = {
		studio: {
			lat: 37.3303299,
			lng: -121.8858455,
			marker: 'studioMarker',
			title: 'The Studio'
		},
		wholeFoods: {
			lat: 37.332092,
			lng: -121.9044,
			marker: 'wholeFoodsMarker',
			title: 'Whole Foods'
		},
		guadalupe: {
			lat: 37.3434303,
			lng: -121.904,
			marker: 'guadalupeMarker',
			title: 'Guadalupe River Park'
		},
		train: {
			lat: 37.330340,
			lng: -121.902960,
			marker: 'trainMarker',
			title: 'Diridon Train Station'
		},
		ballet: {
			lat: 37.3369063,
			lng: -121.89304,
			marker: 'balletMarker',
			title: 'Silicon Valley Ballet'
		}
	};

	// add 5 custom hard-coded location markers on initialization
	for (var key in initialData) {
		var currentItem = initialData[key];
		// add initial locations to array
		this.mapLocations.push(currentItem);
		// create marker
		var marker = new google.maps.Marker({
			position: {lat: currentItem.lat, lng: currentItem.lng},
			map: map,
			title: currentItem.title
		});
		// create infowindow
		var infowindow = new google.maps.InfoWindow({
			content: 'hello'
		});
		// add event listener on click
		marker.addListener('click', (function(map, marker){
			return function(){
				infowindow.open(map, marker);
			};
		})(map, marker));
	};

};







