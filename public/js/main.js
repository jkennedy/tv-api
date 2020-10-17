var infoWindow, deviceId, registrationEmail, address, browserPosition, customToken, authToken, firebaseUserId, googleCredential, googleAccessToken, googleRefreshToken;

$(document).ready(function(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      firebaseUserId = user.uid;
      user.getIdToken().then(function(idTokenResult) {
        setAuthToken(idTokenResult);
      });
      updateUIForCurrentUser();
    }
  });

  $('#signinButton').click(function() {
    let config = {
      consent: true
    }
    auth2.grantOfflineAccess(config).then(offlineSignInCallback);
  });
});

function getJSON(url, success, error) {
  console.log('getJSON:' + url);
  fetch(url, {
    method: 'GET',
    headers: {'Content-type': 'application/json;charset=UTF-8',
              'Authorization': 'Bearer ' + authToken},

  })
  .then(response => response.json())
  .then(json => success(json))
  .catch(err => error ? error(err) : console.log(err));
}

function postJSON(url, data, success, error) {
  console.log('postJSON' + url);
  fetch(url, {
    method: 'POST',
    headers: {'Content-type': 'application/json;charset=UTF-8',
              'Authorization': 'Bearer ' + authToken},
    body: JSON.stringify(data)
    })
  .then(response => response.json())
  .then(json => success(json))
  .catch(err => error ? error(err) : console.log(err));
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

async function setAuthToken(authTokenIn) {
  authToken = authTokenIn;
}

function updateUIForCurrentUser() {
  let user = firebase.auth().currentUser;
  let userInfo = user && user.providerData && user.providerData.length > 0 ? user.providerData[0] : null;
  let userSrc = userInfo ? userInfo : user;

  if (userSrc) {
    registrationEmail = userSrc.email;
    $('#userName').text(userSrc.displayName);
    $('#userEmail').text(registrationEmail);
    $('#userProfilePicture').attr('src', userSrc.photoURL);

  }
}

function createAndConnectCustomTokenUser() {
  getJSON('/registerUser', function(data) {
    console.log('createCustomToken');
    console.log(data);
    customToken = data.customToken;
    connectCustomTokenUserToGoogleUser();
  });
}

function connectCustomTokenUserToGoogleUser () {
  if (customToken && googleCredential) {
    var providerId = new firebase.auth.GoogleAuthProvider().providerId;
    let currentUser = firebase.auth().currentUser;
    console.log('connecting custom user trying to disconnect by provider id:' + providerId);
    currentUser.delete().then(function() {
      firebase.auth().signInWithCustomToken(customToken).then(credentials => {
        firebase.auth().currentUser.linkWithCredential(googleCredential).then(result => {
          updateUIForCurrentUser();
        });
      });
    }).catch(function(error) {
      console.log(error)
    });
  }
}


async function offlineSignInCallback(data) {
  console.log('offlineSignInCallback');
  console.log(data);
  postJSON('/google/exchangeCode', {code: data.code}, async function(exchangedResponse) {
    let googleIdToken = exchangedResponse.id_token;
    googleAccessToken = exchangedResponse.access_token;
    googleRefreshToken = exchangedResponse.refresh_token;
    googleCredential = firebase.auth.GoogleAuthProvider.credential(googleIdToken);
    let firebaseUserCredential = await firebase.auth().signInWithCredential(googleCredential);
    let idToken = await firebaseUserCredential.user.getIdToken();
    setAuthToken(idToken);
    createAndConnectCustomTokenUser();
  });
}

function start() {
  console.log('start');
  gapi.load('auth2', function() {
    auth2 = gapi.auth2.init({
      client_id: '366836412672-agghpni1ogp561vpktd0m7fhdbqmke2e.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/calendar.events.readonly',
      redirect_uri: 'http://localhost:3000/google/redirect',
      ux_mode: 'redirect'
    });
  });
}

function setBrowserPosition (position) {
  browserPosition = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };

  getAddressFromPosition(browserPosition);
}

async function initialize(deviceIdIn) {
    deviceId = deviceIdIn;
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

      let registrationDto = {
        pos: {
          lat: position.coords.latitude,
          long: position.coords.longitude
        },
        zipCode: zipCode,
        address: address.formattedAddress,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        country: address.countryRegion,
        email: registrationEmail,
        registrationCode: registrationCode,
        deviceId: deviceId,
        userToken: customToken,
        authId: firebaseUserId,
        googleAccessToken: googleAccessToken,
        googleRefreshToken: googleRefreshToken
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


/*
async function testGAPI() {
  let idToken = await firebase.auth().currentUser.getIdToken(true);

  $.ajaxSetup({
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", `Bearer ${idToken}`);
    }
  });

  $.post('/google/testGAPI').done(function(data) {
    console.log('testGAPI');
    console.log(data);
  });
}


async function linkGoogleCredentialToCurrentUser(idTokenIn) {
  googleCredential = firebase.auth.GoogleAuthProvider.credential(idTokenIn);

  firebase.auth().currentUser.linkWithCredential(googleCredential).then(function(result) {
    // Accounts successfully linked.
    console.log('linked google account to exisitng account');
    console.log(result);
    googleUser = result.user;
    googleCredential = result.credential;
    console.log('google credential set');
    console.log(googleCredential);
  }).catch(function(error) {
    console.log(error);
  });
}

function authenticateBaseUser(token) {
  firebase.auth().signInWithCustomToken(token).then(credentials => {
    console.log('signed in with custom token');
    console.log(JSON.stringify(credentials));
  });
}

function signIntoFirebaseWithGoogleIdToken(idTokenIn) {
  googleCredential = firebase.auth.GoogleAuthProvider.credential(idTokenIn);
  firebase.auth().signInWithCredential(googleCredential);
}

async function loginGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
  provider.addScope('https://www.googleapis.com/auth/userinfo.email');
  provider.addScope('https://www.googleapis.com/auth/youtube.readonly');
  provider.addScope('https://www.googleapis.com/auth/calendar.events.readonly');

  firebase.auth().signInWithPopup(provider).then(function(result) {
    console.log('sign in google');
    console.log(result);
    googleUser = result.user;
    googleCredential = result.credential;
    console.log('google credential set');
    console.log(googleCredential);
  }).catch(function(error) {
    console.log(error);
  });
}

async function linkGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
  provider.addScope('https://www.googleapis.com/auth/userinfo.email');
  provider.addScope('https://www.googleapis.com/auth/youtube.readonly');
  provider.addScope('https://www.googleapis.com/auth/calendar.events.readonly');

  firebase.auth().currentUser.linkWithPopup(provider).then(function(result) {
    // Accounts successfully linked.
    console.log('linked google account to exisitng account');
    console.log(result);
    googleUser = result.user;
    googleCredential = result.credential;
    console.log('google credential set');
    console.log(googleCredential);
  }).catch(function(error) {
    console.log(error);
  });
}

*/
