// google map initialization, bound to window object
// called from script tag in html
var map;
// model array
// TODO: move to model function
var allLocations = [];
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
	// connect search function to html
	// mapView.query.subscribe(mapView.search);
};

// models
var mapView = function() {
	// create empty array to store location objects
	this.mapLocations = ko.observableArray([]);

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
	// add variable to hold array of infowindows so I can close them all before opening a new one
	this.infowindowArray = [];

	// add 5 custom hard-coded location markers on initialization
	for (var key in initialData) {
		var currentItem = initialData[key];
		// create marker
		currentItem.marker = new google.maps.Marker({
			position: {lat: currentItem.lat, lng: currentItem.lng},
			map: map,
			animation: google.maps.Animation.DROP,
			title: currentItem.title
		});
		// // add marker event listener
		// marker.addListener('click', (function(map, marker){
		// 	return function(){
		// 		marker.setAnimation(google.maps.Animation.DROP);
		// 	}
		// });
		// create infowindow
		// console.log(currentItem)
		// currentItem.infowindow = new google.maps.InfoWindow({
		// 	content: currentItem.title
		// });
		// add event listener on click for infowindow and animation
		currentItem.marker.addListener('click', (function(map, currentItem){
			return function(){
				// close all open infowindows
				for (var i = 0; i < self.infowindowArray.length; i++) {
					self.infowindowArray[i].close();
				}
				// add bounce animation to marker when clicked
				currentItem.marker.setAnimation(google.maps.Animation.BOUNCE);
				// create new infowindow
				currentItem.infowindow = new google.maps.InfoWindow({
					content: currentItem.title
				})
				// push infowindow to infowindowArray
				self.infowindowArray.push(currentItem.infowindow);
				// infoWindow.setContent(currentItem.title);
				currentItem.infowindow.open(map, currentItem.marker);
				setTimeout(function(){
					currentItem.marker.setAnimation(null);
				}, 1400);
			};
		})(map, currentItem));
		console.log(currentItem)
		// add initial locations to ko observable array & model array
		this.mapLocations.push(currentItem);
		allLocations.push(currentItem);
	};

	// filter functionality from searchbar
	var self = this;
	this.search = ko.observable('');
	self.search.subscribe(function (value) {
		var search = value.toLowerCase();
		// remove locations from view but not from overall array
		self.mapLocations.removeAll();
		// add locations back to view array based on search input
		for (var i = 0; i < allLocations.length; i++) {
			// hide all markers on map initially
			allLocations[i].marker.setVisible(false);
			if (allLocations[i].title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
				self.mapLocations.push(allLocations[i]);
				// make marker visible
				console.log(allLocations[i].marker)
				allLocations[i].marker.setVisible(true);
			}
		}
	});
	// TODO: refactor this and infowindow click listener into one function. currently duplicated code
	this.triggerInfowindow = function(currentLoc) {
		console.log(currentLoc)
		console.log('clicked');
		// close all open infowindows
			for (var i = 0; i < self.infowindowArray.length; i++) {
				self.infowindowArray[i].close();
			}
		// add bounce animation to marker when clicked
		currentLoc.marker.setAnimation(google.maps.Animation.BOUNCE);
		// create new infowindow
		currentLoc.infowindow = new google.maps.InfoWindow({
			content: currentLoc.title
		})
		// push infowindow to infowindowArray
		self.infowindowArray.push(currentLoc.infowindow);
		// infoWindow.setContent(currentItem.title);
		currentLoc.infowindow.open(map, currentLoc.marker);
		setTimeout(function(){
			currentItem.marker.setAnimation(null);
		}, 1400);
	}
	// add query as ko observable
	// this.query = ko.observable('');
	// console.log("1",this.query())

	// this.searchResults = ko.computed(function() {
	// 	console.log("2", this.query())
	// 	var search = this.query().toLowerCase();
	// 	return ko.utils.arrayFilter(allLocations, function(location) {
	// 		return location.title.toLowerCase().indexOf(search) >= 0;
	// 	});
	// }, mapView);

	// non-working search alternative
	// this.search = function(value) {
	// 	// remove locations from view but not from overall array
	// 	mapView.mapLocations.removeAll();
	// 	// add locations back to view array based on search input
	// 	for (var i = 0; i < allLocations.length; i++) {
	// 		if (allLocations[i].title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
	// 			mapView.mapLocations.push(allLocations[i]);
	// 			// make marker visible
	// 			marker[i].setVisible(true);
	// 		}
	// 	}
	// }
};






