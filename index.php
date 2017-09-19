<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Simple Image Uploader</title>
    <script src="lib/jquery-3.2.1.min.js"></script>
    <link rel="stylesheet" type="text/css" href="css/styles.css">
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
  </head>
  <body>

    <div id="options">
      <div class="option-block bg-a">Token: <input id="token-field" type="password"></input></div>
      <div class="option-block bg-b">Class: <input id="class-field" type="text"></input></div>
      <div class="option-block bg-c">Prefix: <input id="prefix-field" type="text"></input></div>
      <div id="mode-button" class="option-block pointer bg-d">Mode: URL</div>
    </div>
    <div id="form-container">
      <div id="file-field-desc">Drag images in here, click to upload or paste from clipboard.</div>
      <input id="file-field" type="file" name="file"></input>
    </div>
    <div id="upload-results"></div>
    <a href="https://github.com/nafeu/php-file-uploader"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"></a>
  </body>
  <script src="js/scripts.js"></script>
</html>