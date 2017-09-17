$(document).ready(function(){
  console.log("[ scripts.js ] Document ready...");

  var body = $("body"),
      uploadResults = $("#upload-results"),
      fileField = $("#file-field"),
      fileFieldDesc = $("#file-field-desc"),
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
            uploadResults.append(createUiResponse(response).hide().fadeIn(500));
          },
          error: function(response) {
            uploadResults.append(createUiResponse(response.statusText).hide().fadeIn(500));
          }
        });
      }
    }
  });

  fileFieldDesc.click(function(){
    fileField.click();
  });

});

function createUiResponse(content) {
  var out = $("<div>", {class: "ui-response"});
  out.text(content);
  return out;
}
