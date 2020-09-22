export const NEWS_PREVIEW_TEMPLATE =
    `<html>
        <head>
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap" rel="stylesheet">
        <style>
        body {
          width: 600px;
          height: 300px;
          margin: 0 auto;
          background-color: #061147;
        }

        .list {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-top: 10px;
          margin-bottom: 10px;
        }

        .article {
          flex: 1;
          display: flex;
          flex-direction: row;
          justify-content: center;
          margin: 10px;
        }

        .iconContainer * {
          flex: 1;
        }

        .textContainer * {
          flex: 9;
          height: 75px;
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .icon {
            height: 130px;
            width: auto;
        }

        .title {
          color: white;
          margin-top: 15px;
          margin-left: 15px;
          text-align: left;
          font: 28px Raleway;
          font-weight: bolder;
        }
        </style>
        </head>
        <body>

        <div class="list">
            {{#each articles}}
              <div class="article">
                <div class="iconContainer">
                    <img class="icon" src='{{snippet.thumbnails.medium.url}}'/>
                </div>
                <div class="textContainer">
                  <div class='title'>
                    {{title snippet.title}}
                  </div>
                </div>
              </div>
           {{/each}}
        </div>

        </body>
        </html>`;
