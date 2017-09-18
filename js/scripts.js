$(document).ready(function(){
  console.log("[ scripts.js ] Document ready...");

  var body = $("body"),
      uploadResults = $("#upload-results"),
      fileField = $("#file-field"),
      fileFieldDesc = $("#file-field-desc"),
      fileFieldDescDefault = fileFieldDesc.text(),
      formData = false;

  var colors = {
    processing: "#607D8A",
    idle: "#22313F",
    error: "#96281B",
    success: "#336E7B"
  };

  if (window.FormData) {
    formData = new FormData();
  }

  fileField.on("change", function(event) {
    file = this.files[0];
    uploadFile(file);
  });

  fileFieldDesc.click(function(){
    fileField.click();
  });

  function uploadFile(file) {
    if (file) {
      if (!!file.type.match(/image.*/)) {
        if (window.FileReader) {
          var reader = new FileReader();
          reader.readAsDataURL(file);
        }

        if (formData) {
          formData.append("file", file);
          // formData.append("prefix", prefix);
        }

        if (formData) {
          body.css("background-color", colors.processing);
          fileFieldDesc.text("Uploading...");
          $.ajax({
            url: "upload.php",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
              rotateBgColor(body, colors.success, colors.idle);
              uploadResults.append(createUiResponse(response).hide().fadeIn(500));
              fileFieldDesc.text(fileFieldDescDefault);
            },
            error: function(response) {
              rotateBgColor(body, colors.error, colors.idle);
              uploadResults.append(createUiResponse(response.statusText).hide().fadeIn(500));
              fileFieldDesc.text(fileFieldDescDefault);
            }
          });
        }
      }
    }
  }

  document.onpaste = function(event){
    var items = (event.clipboardData || event.originalEvent.clipboardData).items;
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item.kind === 'file') {
        uploadFile(item.getAsFile());
      }
    }
  };

  function rotateBgColor(element, newColor, defaultColor) {
    element.css("background-color", newColor);
    setTimeout(function(){
      element.css("background-color", defaultColor);
    }, 2000);
  }

});

function createUiResponse(content) {
  var out = $("<div>", {class: "ui-response"});
  var thumbnail = $("<div>", {
    class: "thumbnail",
    onclick: "window.open('" + content + "', '_blank');"
  });
  var descContainer = $("<div>", {class: "upload-desc-container"});
  var desc = $("<div>", {class: "upload-desc"});
  thumbnail.css("background-image", "url(" + content + ")");
  desc.text(content);
  descContainer.append(desc);
  out.append(thumbnail);
  out.append(descContainer);
  return out;
}
