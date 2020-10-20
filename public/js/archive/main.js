var infoWindow, address, browserPosition, googleCredential, googleUser, googleAccessToken, googleRefreshToken;

function authenticateBaseUser(token) {
  firebase.auth().signInWithCustomToken(token).then(credentials => {
    console.log('signed in with custom token');
    console.log(JSON.stringify(credentials));

  //  linkGoogle();
  });
}

function beginRegistration() {
  $.get('/registerUser', function(data) {
    console.log('registerUser');
    console.log(data);
    let userToken = data;
    localStorage.setItem('userToken', userToken);
    authenticateBaseUser(userToken);
  });
}

function getCurrentUser() {
  firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
    // Send token to your backend via HTTPS
    // ...
  }).catch(function(error) {
    // Handle error
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

function signIntoFirebaseWithGoogleIdToken(idToken) {
  firebase.auth().signInWithCredential(
    firebase.auth.GoogleAuthProvider.credential(idToken));
}

async function linkGoogleCredentialToCurrentUser(idToken) {
  let tempCredential = firebase.auth.GoogleAuthProvider.credential(idToken);

  firebase.auth().currentUser.linkWithCredential(tempCredential).then(function(result) {
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

async function offlineSignInCallback(data) {
  $.post('/google/exchangeCode', {code: data.code}).done(async function(exchangedResponse) {
    let googleIdToken = exchangedResponse.id_token;
    googleAccessToken = exchangedResponse.access_token;
    googleRefreshToken = exchangedResponse.refresh_token;

    await linkGoogleCredentialToCurrentUser(googleIdToken);

    //await signIntoFirebaseWithGoogleIdToken(googleIdToken);
    /*

    let userTokens = {
      ...exchangedResponse,
      email: 'jack.kennedy@gmail.com'
    }
    $.post('/google/updateUserTokens', userTokens).done(function(updateResponse) {
      console.log('done updating user tokens');
      console.log(updateResponse);
    });
    */
  });
}

function onSignIn(googleUser) {
  console.log('onSignIn!!!');
  var profile = googleUser.getBasicProfile();
  console.log(googleUser);
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

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

async function testdb() {
  try {
    var id = 'K3DYMEHP4CWNH';
    var db = firebase.firestore();
    let doc = db.collection('devices').doc(id);
    let snapshot = await doc.get();
    let entity = snapshot.exists ? snapshot.data() : null;

    console.log('got device:');
    console.log(JSON.stringify(entity));
  } catch (err) {
    console.log(err);
  }
}

$(document).ready(function(){
  $('#signinButton').click(function() {
    console.log('sign in ubtton click');
    let config = {
      consent: true
    }
    auth2.grantOfflineAccess(config).then(offlineSignInCallback);
  });
});

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
