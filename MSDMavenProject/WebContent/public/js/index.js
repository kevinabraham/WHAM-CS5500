var app = angular.module("PlacesApp", ['ui.bootstrap']);

app.controller("myNoteCtrl", function($scope,GoogleMapsService,$uibModal,$rootScope,UserService) {

  UserService.loggedIn();
  $scope.message = "Hello to the project";
  $scope.option = {};
  $scope.events = null;

  $scope.position = "";

  $scope.lat = "0";
  $scope.lng = "0";
  $scope.error = "";
  $scope.myMap = null;
  $scope.myMarkers = [];
  $scope.within = "";
  $scope.pageSize = "";

  $scope.withinOptions = [
    {name : "1", value : 1},
    {name : "5", value : 5},
    {name : "10", value : 10},
    {name : "20", value : 20}
  ]

  $scope.pageSizeOptions = [
    {name : "5", value : 5},
    {name : "10", value : 10},
    {name : "15", value : 15},
    {name : "20", value : 20},
    {name : "25", value : 25},
    {name : "30", value : 30}
  ]
  
//autcomplete code 
var input = document.getElementById('pac-input');
var autocomplete;

var infowindow;

$scope.showPosition = function (position) {
  console.log("Inside show position");
  $scope.lat = position.coords.latitude;
  $scope.lng = position.coords.longitude;

  var latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
  $scope.myMap.setCenter(latlng);

   //create a marker for my location
   var iconBase = 'images/';

   var marker = new google.maps.Marker({
    map: $scope.myMap,
    position: latlng,
    icon: iconBase + 'blue-icon.png'
  });
            // $scope.getevents();
}

function createMarker(eventInfo) {
  var marker = new google.maps.Marker({
    map: $scope.myMap,
    position: eventInfo.location,
    title : eventInfo.title
  });


  marker.content = '<div class="infoWindowContent">'
  + '<b>Venue </b>: '+ eventInfo.venue_address +', '+ eventInfo.city_name+', '+ eventInfo.postal_code
  +'<br/ ><b>Date</b> : '+eventInfo.start_time+'<br/><a href='+eventInfo.url+'>Event Details</a>'
  +'</div>';

  google.maps.event.addListener(marker, 'click', function() {
    console.log("inside infowindow");
    infowindow.setContent('<p>' + marker.title + '</p>' + marker.content);
    infowindow.open($scope.myMap, marker);
  });

  $scope.myMarkers.push(marker);
}


$scope.showError = function (error) {
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
  console.log(">> Inside get location");
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

    $scope.myMap = new google.maps.Map(document.getElementById('map'), { zoom: 12 });
    $scope.getLocation();

        // initializing other variables 
        autocomplete = new google.maps.places.Autocomplete(input);

        autocomplete.bindTo('bounds', $scope.myMap);

        autocomplete.addListener('place_changed', function() {
          var place = autocomplete.getPlace();

          if (!place.geometry) {
            console.log("Autocomplete's returned place contains no geometry");
            return;
          }

          $scope.lat = place.geometry.location.lat();
          $scope.lng = place.geometry.location.lng();

          var latlng = new google.maps.LatLng($scope.lat,$scope.lng);

          $scope.myMap.setCenter(latlng);
          var marker = new google.maps.Marker({
            map: $scope.myMap,
            position: latlng
          });

          // $scope.getevents();
        });

        infowindow = new google.maps.InfoWindow();

        //initializing other variables

      });

    // Trying to run through service end


    $scope.getevents = function(){
     console.log(">> Inside getevents()");
     var eventsList = "";
     $scope.myMarkers = [];

   // creating a new map again for new  events -start
   $scope.myMap = new google.maps.Map(document.getElementById('map'), { zoom: 12 });
   var latlng = new google.maps.LatLng($scope.lat,$scope.lng);
   $scope.myMap.setCenter(latlng);
   var marker = new google.maps.Marker({
    map: $scope.myMap,
    position: latlng,
    icon: 'images/blue-icon.png'
  });

  // creating a new map again for new  events - end

  if($rootScope.currentUser !=  null){
    // Retrieving Logged In user preferences
    var preferences = $rootScope.currentUser.preferences;
    console.log(preferences);
    var types = preferences.types;
    for(var i = 0; i<types.length;i++){
      if(eventsList == ""){
        eventsList = types[i];
      }else eventsList = eventsList + ", "+types[i];
    }

    console.log("Loading user preferences");
    $scope.within = {name: preferences.within.toString(), value: preferences.within};
    $scope.pageSize = {name : preferences.pageSize.toString(), value: preferences.pageSize}


  }else{

     // Retrieving Guest user preferences

     if($scope.option.festival){
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
      if(eventsList == ""){
        eventsList = eventsList + "movies_film";
      }else{
        eventsList = eventsList +", "+ "movies_film";
      }
    }
  }
  getEventsEventFull(eventsList);

}



function getEventsEventFull(eventsList){
  console.log(">> Inside getEventsEventFull");

  var StringLocation = $scope.lat +"," + $scope.lng;
  var oArgs = {
    app_key: "vHx53bbX7CwW3hrs",
          // q: "music",
          location: (StringLocation), 
          within : $scope.within.value,
          units:"mi",
          category: eventsList,
          // "date": "2013061000-2015062000",
          page_size: $scope.pageSize.value,
          sort_order: "popularity",
        };

        EVDB.API.call("/events/search", oArgs, function(oData) {
          console.log("Eventfull data callback");
          $scope.events = oData.events.event;
          for(var i=0;i<$scope.events.length;i++){
            var e = $scope.events[i];

            var eventlatlng = {lat : Number($scope.events[i].latitude), lng: Number($scope.events[i].longitude)};
            var eventInfo = {title : e.title, location: eventlatlng, venue_address : e.venue_address, 
              city_name : e.city_name, postal_code: e.postal_code, start_time: e.start_time, url:e.url};

              createMarker(eventInfo);
            }
          $scope.$apply();
          });
      }

      $scope.signin = function(){
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'login.html',
          controller: 'LoginController',
          windowClass: 'windowClass',
        });

        modalInstance.result.then(function (currentUser) {
          $rootScope.currentUser = currentUser;
        }, function () {
          console.error("Login failed");
        });



      }

      $scope.signup = function(){
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'signup.html',
          controller: 'RegisterController'
        });
        modalInstance.result.then(function (currentUser) {
          $rootScope.currentUser = currentUser;
        }, function () {
          console.error("Registration failed");
        });

      }

      $scope.logout = function(){

        UserService.logoutUser(function(response){
          console.log("User logout successfull");
          $rootScope.currentUser = null;
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

