$(document).ready(function(){
  console.log("[ scripts.js ] Document ready...");

  var body = $("body"),
      fileField = $("#file-field"),
      formData = false;

  if (window.FormData) {
    formData = new FormData();
  }

  fileField.on("change", function(event) {
    file = this.files[0];

    if (!!file.type.match(/image.*/)) {
      if (window.FileReader) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
      }

      if (formData) {
        formData.append("file", file);
      }

      if (formData) {
        $.ajax({
          url: "upload.php",
          type: "POST",
          data: formData,
          processData: false,
          contentType: false,
          success: function(response) {
            console.log(body);
            body.append(createUiResponse(response, "success").hide().fadeIn(2000));
          },
          error: function(response) {
            body.append(createUiResponse(response, "warning").hide().fadeIn(2000));
          }
        });
      }
    }
  });

});

function createUiResponse(content, level) {
  var out = $("<div>", {class: "ui-response " + level});
  out.text(content);
  return out;
}
