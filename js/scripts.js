$(document).ready(function(){
  console.log("[ scripts.js ] Document ready...");

  var fileField = $("#file-field");
  var fileForm = $("#file-form");

  fileField.on('change', function(){
    fileForm.submit();
  });

})