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
    <div id="header">
      <div class="header-block pointer bg-a" onclick="window.location.href='https://github.com/nafeu/php-file-uploader'">Simple Image Uploader</div>
      <div id="mode-button" class="header-block pointer bg-b">Mode: URL</div>
      <div class="header-block bg-c">Class: <input id="class-field" type="text"></input></div>
      <div class="header-block bg-d">Prefix: <input id="prefix-field" type="text"></input></div>
    </div>
    <div id="form-container">
      <div id="file-field-desc">Drag images in here, click to upload or paste from clipboard.</div>
      <input id="file-field" type="file" name="file"></input>
    </div>
    <div id="upload-results"></div>
  </body>
  <script src="js/scripts.js"></script>
</html>