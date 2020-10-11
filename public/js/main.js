var infoWindow, address, browserPosition, googleCredential, googleUser;

function setBrowserPosition (position) {
  browserPosition = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };

  getAddressFromPosition(browserPosition);
}

async function initialize() {
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

async function completeRegistration() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async function(position) {
      let zipCode = document.getElementById("zipCode").value;
      let registrationCode = document.getElementById("registrationCode").value;

      let token = localStorage.getItem('userToken');

      let registrationDto = {
        pos: {
          lat: position.coords.latitude,
          long: position.coords.longitude
        },
        zipCode: zipCode,
        address: address.formattedAddress,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        country: address.countryRegion,
        email: 'jack.kennedy@gmail.com',
        registrationCode: registrationCode,
        deviceId: 'K3DYMEHP4CWNH',
        userToken: token,
        authId: googleUser.uid,
        googleAccessToken: googleCredential.accessToken,
        googleRefreshToken: googleCredential.refreshToken ? googleCredential.refreshToken : googleUser.refreshToken
      };

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let notificationSection = document.getElementById("notificationSection");
          notificationSection.innerHTML = xhttp.responseText;
          notificationSection.className = "show";
        }
      };
      xhttp.onload = function() {
        let notificationSection = document.getElementById("notificationSection");
        notificationSection.innerHTML = xhttp.responseText;
        notificationSection.className = "show";
      };
      xhttp.open("POST", "/user/completeRegistration", true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send(JSON.stringify(registrationDto));


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
  let requestUrl = `https://dev.virtualearth.net/REST/v1/Locations/${position.lat},${position.lng}?key=${apiKey}`

  callRestService(requestUrl, geocodeCallback);

  return address ? address.formattedAddress : '';
}
