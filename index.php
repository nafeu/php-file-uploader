<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>PHP File Uploader</title>
    <script
      src="https://code.jquery.com/jquery-3.2.1.min.js"
      integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
      crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css?family=Roboto+Mono:300" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/styles.css">
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
  <script type="text/javascript" src="js/scripts.js"></script>
</html>