export const TIME_PREVIEW_TEMPLATE =
    `<html>
        <head>
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap" rel="stylesheet">
        <style>
          body {
            width: 600px;
            height: 300px;
            background-color: #061147;
            display: flex;
            flex-direction: row;
            justify-content: center;
          }
          #previewSection {
            width: 600px;
            height: 300px;
            position: absolute;
          }
          #leftTile {
            position: absolute;
            width: 60%
            left: 0px;
            top: 0px;
            display: flex;
            flex-direction: column;
            padding-left: 30px;
          }
          #rightTile {
            position: absolute;
            top: 0px;
            left: 50%;
            width: 50%;
            height: 100%;
          }
          #date {
            margin-top: 80px;
            color: white;
            text-align: center;
            font: 70px Raleway;
            font-weight: bolder;
          }
          #time {
            color: white;
            text-align: center;
            font: 55px Raleway;
            font-weight: bolder;
          }
          .mapImage {
            width: auto;
            height: 100%;
            position: absolute;
          }
        </style>
        </head>
        <body>
          <div id="previewSection">
            <div id="leftTile">
              <div id="date">{{dateText}}</div>
              <div id="time">{{timeDescription}}</div>
            </div>
            <div id="rightTile">
              <img class="mapImage" src='{{mapBackgroundImage}}'/>
              <img class="mapImage" src='{{radarImage}}'/>
            </div>
          </div>
        </body>
        </html>`;
