var app = angular.module("PlacesApp", []);

app.controller("myNoteCtrl", function($scope,GoogleMapsService) {
  $scope.message = "Hello to the project";
  $scope.option = {};
  $scope.events = null;

  $scope.position = "";

  $scope.lat = "0";
  $scope.lng = "0";
  $scope.accuracy = "0";
  $scope.error = "";
  $scope.myMap = null;
  $scope.myMarkers = [];
  $scope.currentLocation = null;

//autcomplete code 
var input = document.getElementById('pac-input');
var autocomplete;

var infowindow;

$scope.showPosition = function (position) {
  console.log("Inside show position");
  console.log(position);
  $scope.lat = position.coords.latitude;
  $scope.lng = position.coords.longitude;

  var latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
  $scope.myMap.setCenter(latlng);
  $scope.currentLocation = latlng;

            //create a marker for my location

            $scope.getevents();
          }

          function getGooglePlacesEvents(location){

            var service = new google.maps.places.PlacesService($scope.myMap);
            service.nearbySearch({
              location: $scope.currentLocation,
              radius: 500,
              types: ['store']
            }, callback);
          }

          function callback(results, status) {
            console.log("Google places results");
            console.log(results);
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              for (var i = 0; i < results.length; i++) {
                var eventInfo = {title : results[i].name , location : results[i].geometry.location}
                createMarker(eventInfo);
              }
            }
          }

          function createMarker(eventInfo) {
    // console.log(place);
    console.log(eventInfo);
    var marker = new google.maps.Marker({
      map: $scope.myMap,
      position: eventInfo.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(eventInfo.title);
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

  // Trying to run through service start

    console.log("Trying initializing maps through the service");
    var map;
    GoogleMapsService.mapsInitialized.
    then(function(){
        console.log("Maps initialized");

        $scope.myMap = new google.maps.Map(document.getElementById('map'), { zoom: 15 });
        $scope.getLocation();

        // initializing other variables 
        autocomplete = new google.maps.places.Autocomplete(input);

        autocomplete.bindTo('bounds', $scope.myMap);

        autocomplete.addListener('place_changed', function() {
          console.log("Inside autocomplete place changed");
          var place = autocomplete.getPlace();
          console.log(place);
              
          if (!place.geometry) {
            console.log("Autocomplete's returned place contains no geometry");
            return;
          }

          console.log($scope.lat);
          console.log($scope.lng);

          $scope.lat = place.geometry.location.lat();
          $scope.lng = place.geometry.location.lng();

          var latlng = new google.maps.LatLng($scope.lat,$scope.lng);
          $scope.currentLocation = latlng;

          $scope.myMap.setCenter(latlng);
          console.log("Changed map and geomarker center");
          var marker = new google.maps.Marker({
            map: $scope.myMap,
            position: latlng
          });

          $scope.getevents();
        });

        infowindow = new google.maps.InfoWindow();

        //initializing other variables

      });

    // Trying to run through service end


  $scope.getevents = function(){
   console.log("Inside find events");
   console.log($scope.option);
   var eventsList = "";

   if($scope.option.festival){
    console.log("Get festivals");
    if(eventsList == ""){
      eventsList = eventsList + "festivals_parades";
    }else{
      eventsList = eventsList +", "+ "festivals_parades";
    }
  }
  if($scope.option.music){
    if(eventsList == ""){
      eventsList = eventsList + "music";
    }else{
      eventsList = eventsList +", "+ "music";
    }
  }
  if($scope.option.movies){
    console.log("Get movies");
    if(eventsList == ""){
      eventsList = eventsList + "movies_film";
    }else{
      eventsList = eventsList +", "+ "movies_film";
    }
  }

  console.log(eventsList);

  getEventsEventFull(eventsList);    
      // getGooglePlacesEvents();
    }



    function  getEventsEventFull(eventsList){
      console.log("Inside getEventsEventFull");
      console.log("Location");
      console.log($scope.lat,$scope.lng);

      var StringLocation = $scope.lat +"," + $scope.lng;
      console.log("String location"+StringLocation);
      var oArgs = {
        app_key: "vHx53bbX7CwW3hrs",
          // q: "music",
          location: (StringLocation), 
          within : 10,
          units:"mi",
          category: eventsList,
          // "date": "2013061000-2015062000",
          page_size: 10,
          sort_order: "popularity",
        };

        EVDB.API.call("/events/search", oArgs, function(oData) {
          console.log("Eventfull data");
          console.log(oData);
          $scope.events = oData.events.event;
          for(var i=0;i<$scope.events.length;i++){
            console.log(i);
            var eventlatlng = {lat : Number($scope.events[i].latitude), lng: Number($scope.events[i].longitude)};
            var eventInfo = {title : $scope.events[i].title, location: eventlatlng};
            createMarker(eventInfo);
          }

        });
      }
    });


app.factory('GoogleMapsService',function($window,$q){

  //maps loader deferred object

  var asyncUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBQbY5fxCxyKIDVA4l-pF3BfrycBoqVf9g&signed_in=true&libraries=places&callback=';
  var mapsDefer = $q.defer();

  

  var asyncLoad = function(asyncUrl,callbackName){
    var script = document.createElement('script');

    script.src = asyncUrl + callbackName;
    document.body.appendChild(script);

  };

  $window.googleMapsInitialized = function(){
    mapsDefer.resolve();

  };

  asyncLoad(asyncUrl, 'googleMapsInitialized');

  return {

            // usage: Initializer.mapsInitialized.then(callback)
            mapsInitialized : mapsDefer.promise
  };
})