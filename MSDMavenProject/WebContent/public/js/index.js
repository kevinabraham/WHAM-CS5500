var app = angular.module("PlacesApp", []);

app.controller("myNoteCtrl", function($scope) {
    $scope.message = "Hello to the project";
    $scope.option = {};
    $scope.events = null;

    $scope.position = "";

    $scope.lat = "0";
    $scope.lng = "0";
    $scope.accuracy = "0";
    $scope.error = "";
    $scope.model = { myMap: undefined };
    $scope.myMarkers = [];

    // $scope.initMap = function(){}

    // $scope.mapOptions = {
    //         center: new google.maps.LatLng($scope.lat, $scope.lng),
    //         zoom: 15,
    //         mapTypeId: google.maps.MapTypeId.ROADMAP
    //     };

    var infowindow;
    
    $scope.showPosition = function (position) {
            console.log("Inside show position");
            console.log(position);
            $scope.lat = position.coords.latitude;
            $scope.lng = position.coords.longitude;
            $scope.accuracy = position.coords.accuracy;
            $scope.$apply();

            var pyrmont = {lat: position.coords.latitude, lng: position.coords.longitude};

            map = new google.maps.Map(document.getElementById('map'), {
                  center: pyrmont,
                  zoom: 15
            });

  infowindow = new google.maps.InfoWindow();

  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: pyrmont,
    radius: 500,
    types: ['store']
  }, callback);
            // var latlng = new google.maps.LatLng($scope.lat, $scope.lng);
            // $scope.model.myMap.setCenter(latlng);
            // $scope.myMarkers.push(new google.maps.Marker({ map: latlng, position: latlng }));
        }

        function callback(results, status) {
            console.log(results);
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i].geometry.location);
    }
  }
}
function displayEvents(){
console.log("Inside displayEvents");
}

function createMarker(place) {
    console.log(place);
  var placeLoc = place;
  var marker = new google.maps.Marker({
    map: map,
    position: place
  });

  google.maps.event.addListener(marker, 'click', function() {
    // infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}


    $scope.showError = function (error) {
        console.log("Error")
        console.log(error);
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    $scope.error = "User denied the request for Geolocation."
                    break;
                case error.POSITION_UNAVAILABLE:
                    $scope.error = "Location information is unavailable."
                    break;
                case error.TIMEOUT:
                    $scope.error = "The request to get user location timed out."
                    break;
                case error.UNKNOWN_ERROR:
                    $scope.error = "An unknown error occurred."
                    break;
            }
            $scope.$apply();
        }

    $scope.getLocation = function () {
            console.log("Inside get location");
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
            }
            else {
                $scope.error = "Geolocation is not supported by this browser.";
            }
        }
 
        $scope.getLocation();
    

    $scope.getevents = function(){
    	console.log("Inside find events");
    	console.log($scope.option);
    	var eventsList = "";
    	
    	if($scope.option.festival){
    		console.log("Get festivals");
    		eventsList = eventsList + "festivals_parades";
    	}
    	if($scope.option.music){
    		console.log("Get music");
    		eventsList = eventsList + "festivals_parades";
    	}
    	if($scope.option.movies){
    		console.log("Get movies");
    		eventsList = eventsList + "festivals_parades";
    	}


        if($scope.lat !== 0 || $scope.lng !==0){
            var oArgs = {
          app_key: "vHx53bbX7CwW3hrs",
          // q: "music",
          where: "Boston", 
          category: eventsList,
          // "date": "2013061000-2015062000",
          page_size: 5,
          sort_order: "popularity",
      };
      // (String($scope.lat),String($scope.lng))

      EVDB.API.call("/events/search", oArgs, function(oData) {
            console.log(oData);
            $scope.events = oData.events.event;
            for(var i=0;i<$scope.events.length;i++){
                var locate = {lat : Number($scope.events[i].latitude), lng: Number($scope.events[i].longitude)};
                console.log("Location");
                console.log(locate);
                createMarker(locate);
            }



       });
  }else{
    $scope.error = "Error with the location";
  }

    	
    }
});