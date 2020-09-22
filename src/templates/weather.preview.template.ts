export const WEATHER_PREVIEW_TEMPLATE =
    `<html>
        <head>
          <script src="https://kit.fontawesome.com/1687ffb569.js" crossorigin="anonymous"></script>
          <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap" rel="stylesheet">
        <style>
          body {
            width: 600px;
            height: 300px;
            margin: 0 auto;
            padding: 5px;
            background-color: #061147;
          }

          .strip {
            display: flex;
            flex-direction: row;
            justify-content: center;
            height: 100%;
          }

          .tile {
            width: 150px;
            flex: 1;
            outline: 1px solid white;
            margin-left: 5px;
            margin-right: 5px;
            margin-bottom: 5px;
            margin-top: 5px;
          }

          .title {
            color: white;
            text-align: center;
            font: 34px Raleway;
            font-weight: bolder;
            margin-bottom: 5px;
            margin-top: 5px;
          }
          .iconContainer {
            margin-bottom: 10px;
            margin-top: 10px;
            color: white;
            font-size: 90px;
            text-align: center;
          }

          .icon {
            display: block;
            margin-left: auto;
            margin-right: auto;
            color: white;
            margin-top: 20px;
            margin-bottom: 20px;
          }

          .forecast {
            color: white;
            text-align: center;
            font: 30px Raleway;
            font-weight: bolder;
            margin-top: 10px;
          }

          .temp {
            color: white;
            text-align: center;
            font: 48px Arial;
            margin-bottom: 15px;
          }
        </style>
        </head>
        <body>

        <div class="strip">
            {{#each periods}}
              <div class="tile">
                <div class='title'>
                  {{firstWord name}}
                </div>
                <div class="iconContainer">
                  <i class="{{weatherIcon icon}}"></i>
                </div>
                <div class='forecast'>
                  {{{shortWrap shortForecast}}}
                </div>
                <div class='temp'>
                  {{temperature}} &#8457;
                </div>
              </div>
           {{/each}}
        </div>

        </body>
        </html>`;

export const WEATHER_GOV_ICON_MAPPINGS = new Map([
  ['day', 'fas fa-sun fa-10'],
  ['night', 'fas fa-moon fa-10'],
  ['cloud-day', 'fas fa-cloud-sun fa-10'],
  ['cloud-night', 'fas fa-cloud-moon fa-10'],
  ['rain-day', 'fas fa-cloud-sun-rain fa-10'],
  ['rain-night', 'fas fa-cloud-moon-rain fa-10'],
  ['https://api.weather.gov/icons/land/night/sct', 'fas fa-cloud-moon fa-10'],
  ['https://api.weather.gov/icons/land/night/bkn', 'fas fa-cloud-moon fa-10'],
  ['https://api.weather.gov/icons/land/night/wind_sct', 'fas fa-cloud-moon fa-10'],
  ['https://api.weather.gov/icons/land/day/sct/tsra_hi', 'fas fa-sun fa-10'],
  ['https://api.weather.gov/icons/land/day/sct/skc', 'fas fa-sun fa-10'],
  ['https://api.weather.gov/icons/land/day/wind_sct', 'fas fa-sun fa-10'],
  ['https://api.weather.gov/icons/land/day/bkn', 'fas fa-sun fa-10'],
  ['https://api.weather.gov/icons/land/day/tsra', 'fas fa-cloud-sun-rain fa-10'],
  ['https://api.weather.gov/icons/land/day/tsra_hi', 'fas fa-cloud-sun-rain fa-10'],
  ['https://api.weather.gov/icons/land/day/tsra_sct', 'fas fa-cloud-sun-rain fa-10'],
  ['https://api.weather.gov/icons/land/day/rain_showers', 'fas fa-cloud-sun-rain fa-10'],
  ['https://api.weather.gov/icons/land/day/sct/rain_showers', 'fas fa-cloud-sun-rain fa-10'],
  ['https://api.weather.gov/icons/land/day/bkn/rain_showers', 'fas fa-cloud-sun-rain fa-10'],
  ['https://api.weather.gov/icons/land/night/tsra', 'fas fa-cloud-moon-rain fa-10'],
  ['https://api.weather.gov/icons/land/night/tsra_hi', 'fas fa-cloud-moon-rain fa-10'],
  ['https://api.weather.gov/icons/land/night/tsra_sct', 'fas fa-cloud-moon-rain fa-10'],
  ['https://api.weather.gov/icons/land/night/rain_showers', 'fas fa-cloud-moon-rain fa-10']
]);
