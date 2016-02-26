// google map initialization, bound to window object
// called from script tag in html
var map;
var service;
var detailsService;
// model array
// TODO: move to model function
var allLocations = [];
var initMap = function() {
	// create a map object and specify the DOM element for display
	// create empty array to store location objects
	// this.mapLocations = ko.observableArray();

	// center of map, create LatLng object for google places
	var centerLatLng = new google.maps.LatLng(37.336, -121.893);

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
	var initialData = [];
	initialData.push({
			lat: 37.3303299,
			lng: -121.8858455,
			marker: 'studioMarker',
			title: 'The Studio'
		}, {
			lat: 37.332092,
			lng: -121.9044,
			marker: 'wholeFoodsMarker',
			title: 'Whole Foods'
		}, {
			lat: 37.3434303,
			lng: -121.904,
			marker: 'guadalupeMarker',
			title: 'Guadalupe River Park'
		}, {
			lat: 37.330340,
			lng: -121.902960,
			marker: 'trainMarker',
			title: 'Diridon Train Station'
		}, {
			lat: 37.3369063,
			lng: -121.89304,
			marker: 'balletMarker',
			title: 'Silicon Valley Ballet'
	});

	// add variable to hold array of infowindows so I can close them all before opening a new one
	this.infowindowArray = [];


	// add 5 custom hard-coded location markers on initialization
	for (var i = 0; i < initialData.length; i++) {

		var currentItem = initialData[i];
		// LatLng object for each location:
		var currentItemLatLng = new google.maps.LatLng(currentItem.lat, currentItem.lng);

		// google places request
		var request = {
			location: currentItemLatLng,
			radius: '500',
			keyword: currentItem.title
		};
		// make google places request
		service = new google.maps.places.PlacesService(map);
		service.nearbySearch(request, placesCallback);

		// callback for places request
		function placesCallback(results, status) {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				for (var i = 0; i < results.length; i++) {
					var place = results[i];
					createMarker(results[i]);
				}
			}
		}



		// create marker
		function createMarker(item) {
			console.log("item", item)
			// make details request
			var request = {
				placeId: item.place_id
			};

			detailsService = new google.maps.places.PlacesService(map);
			detailsService.getDetails(request, detailsCallback);

			function detailsCallback(place, status) {
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					// update marker infowindow
					addClickListener(item, place);
					// add address, phone number, website properties to item
					item.formatted_address = place.formatted_address;
					item.formatted_phone_number = place.formatted_phone_number;
					item.website = place.website;
				}
			}

			// info for foursquare request
			var clientId = 'PJH1KVDYTTSVN3EUAV3LXPPR53LIEW0ZYGVKRE5OVTMO5YGT',
				clientSecret = 'RJU02QXFZRZCS1W53HG4SNFW4AYVMARPLKPBQ5DHF13XWUXW',
				apiEndpoint = 'https://api.foursquare.com/v2/venues/search',
				version = '20160225',
				name = item.name,
				intent = 'match';

			// ajax request to foursquare
			console.log("initialData", initialData)
			$.ajax({
				url: apiEndpoint,
				dataType: 'json',
				data: 'll=' + item.geometry.location.lat() + ',' + item.geometry.location.lng() + '&name=' + name + '&intent=' + intent + '&client_id=' + clientId + '&client_secret=' + clientSecret + '&v=' + version + '',
				// data: 'll=' + initialData[i].lat + ',' + initialData[i].lng + '&name=' + name + '&intent=' + intent + '&client_id=' + clientId + '&client_secret=' + clientSecret + '&v=' + version + '',
				// async: false,
				success: fourSquareSuccessHandler,
				error: function(err) {
					console.log("error in ajax request to foursquare:", err)
				}
			});

			function fourSquareSuccessHandler(data) {
				// do something with foursquare data
				console.log("successful AJAX request to foursquare");
				console.log("data:", data)
			}







			// default marker
			item.marker = new google.maps.Marker({
				position: item.geometry.location,
				map: map,
				animation: google.maps.Animation.DROP,
				title: item.name
			});
		}

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
		// console.log(currentItem)
		function addClickListener(item, place) {
			// console.log(item)
			 item.marker.addListener('click', (function(map, item){
				return function(){
					// close all open infowindows
					for (var i = 0; i < self.infowindowArray.length; i++) {
						self.infowindowArray[i].close();
					}
					// add bounce animation to marker when clicked
					item.marker.setAnimation(google.maps.Animation.BOUNCE);
					// create new infowindow
					var contentString = '<strong>' + item.name + '</strong>' + '<br/><hr/> <strong>Address: </strong>' + place.formatted_address + '<br/> <strong>Phone: </strong>' + place.formatted_phone_number + '<br/> <strong>Website: </strong>' + place.website;
					item.infowindow = new google.maps.InfoWindow({
						content: contentString
					})
					// push infowindow to infowindowArray
					self.infowindowArray.push(item.infowindow);
					// infoWindow.setContent(item.title);
					item.infowindow.open(map, item.marker);
					setTimeout(function(){
						item.marker.setAnimation(null);
					}, 1400);
				};
			})(map, item));

			// add initial locations to ko observable array & model array
			self.mapLocations.push(item);
			allLocations.push(item);
		}
		// console.log(currentItem)
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
			if (allLocations[i].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
				self.mapLocations.push(allLocations[i]);
				// make marker visible
				allLocations[i].marker.setVisible(true);
			}
		}
	});
	// TODO: refactor this and infowindow click listener into one function. currently duplicated code
	this.triggerInfowindow = function(currentLoc) {
		// close all open infowindows
			for (var i = 0; i < self.infowindowArray.length; i++) {
				self.infowindowArray[i].close();
			}
		// add bounce animation to marker when clicked
		currentLoc.marker.setAnimation(google.maps.Animation.BOUNCE);
		// create new infowindow
		var contentString = '<strong>' + currentLoc.name + '</strong>' + '<br/><hr/> <strong>Address: </strong>' + currentLoc.formatted_address + '<br/> <strong>Phone: </strong>' + currentLoc.formatted_phone_number + '<br/> <strong>Website: </strong>' + currentLoc.website;

		currentLoc.infowindow = new google.maps.InfoWindow({
			content: contentString
		})
		// push infowindow to infowindowArray
		self.infowindowArray.push(currentLoc.infowindow);
		// infoWindow.setContent(currentItem.title);
		currentLoc.infowindow.open(map, currentLoc.marker);
		setTimeout(function(){
			currentLoc.marker.setAnimation(null);
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

var googleError = function() {
	console.log("error loading google api");
}






