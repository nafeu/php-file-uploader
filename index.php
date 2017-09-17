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
    <div id="form-container">
      <div id="file-field-desc">Drag images in here or click to upload.</div>
      <input id="file-field" type="file" name="file"></input>
    </div>
    <div id="upload-results" class="box width-80"></div>
  </body>
  <script type="text/javascript" src="js/scripts.js"></script>
</html>