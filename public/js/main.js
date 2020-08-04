var map, infoWindow, address, userEmail, browserPosition;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: -34.397,
      lng: 150.644
    },
    zoom: 10,
    styles: [{
        "elementType": "geometry",
        "stylers": [{
          "color": "#f5f5f5"
        }]
      },
      {
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#616161"
        }]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#f5f5f5"
        }]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#bdbdbd"
        }]
      },
      {
        "featureType": "administrative.neighborhood",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
          "color": "#eeeeee"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#757575"
        }]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{
          "color": "#e5e5e5"
        }]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#9e9e9e"
        }]
      },
      {
        "featureType": "road",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{
          "color": "#ffffff"
        }]
      },
      {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#757575"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dadada"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#616161"
        }]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#9e9e9e"
        }]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [{
          "color": "#e5e5e5"
        }]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [{
          "color": "#eeeeee"
        }]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
          "color": "#c9c9c9"
        }]
      },
      {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#9e9e9e"
        }]
      }
    ]
  });

  infoWindow = new google.maps.InfoWindow;

  if (browserPosition)
    updateMapToPosition(browserPosition);
}

function setBrowserPosition (position) {
  browserPosition = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };

  getAddressFromPosition(browserPosition);
  updateMapToPosition(browserPosition);
}

function updateMapToPosition(position) {
  if (infoWindow && position) {
    infoWindow.setPosition(position);
    infoWindow.setContent('Location found.');
    infoWindow.open(map);
    map.setCenter(position);
  }
}

async function initialize(email) {
    userEmail = email;
    getPositionFromBrowser();
}

function getPositionFromBrowser() {
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      setBrowserPosition (position);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

async function saveLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async function(position) {
      let zipCode = document.getElementById("zipCode").value;
      console.log(zipCode);

      let locationDto = {
        pos: {
          lat: position.coords.latitude,
          long: position.coords.longitude
        },
        zipCode: zipCode,
        address: address.formattedAddress,
        email: userEmail
      };

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(`on ready state changed: ${xhttp.status} : ${xhttp.statusText}`);
          let notificationSection = document.getElementById("notificationSection");
          notificationSection.innerHTML = xhttp.responseText;
          notificationSection.className = "show";
        }
      };
      xhttp.onload = function() {
         console.log(`onLoad: done saving location: ${xhttp.status} : ${xhttp.statusText}`);
         console.log(xhttp.response);
        let notificationSection = document.getElementById("notificationSection");
        notificationSection.innerHTML = xhttp.responseText;
        notificationSection.className = "show";
      };
      xhttp.open("POST", "/user/saveLocation", true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send(JSON.stringify(locationDto));



    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  }
}

function callRestService(request, callback) {
    $.ajax({
        url: request,
        dataType: "jsonp",
        jsonp: "jsonp",
        success: function (r) {
            callback(r);
        },
        error: function (e) {
            alert(e.statusText);
        }
    });
}

function geocodeCallback(data) {
  address = data && data.resourceSets && data.resourceSets[0].resources ? data.resourceSets[0].resources[0].address : '';
  document.getElementById("zipCode").value = address.postalCode;
}

async function getAddressFromPosition(position) {
  let apiKey = 'AjgLGu7ECWvaCgsbbWCf1eW4X3cdvlsVakECdGIB1nZY7RSmllO26tR7xSN9bWLB';
  let requestUrl = `http://dev.virtualearth.net/REST/v1/Locations/${position.lat},${position.lng}?key=${apiKey}`

  callRestService(requestUrl, geocodeCallback);

  return address ? address.formattedAddress : '';
}
