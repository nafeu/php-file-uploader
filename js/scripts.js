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
    uploadFile(file, file.name);
  });

  fileFieldDesc.click(function(){
    fileField.click();
  });

  function uploadFile(file, source) {
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
          fileFieldDesc.text("Uploading...");
          $.ajax({
            url: "upload.php",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
              uploadResults.prepend(
                createUiResponse(response, true, source)
                  .hide()
                  .fadeIn(500)
              );
              fileFieldDesc.text(fileFieldDescDefault);
            },
            error: function(response) {
              uploadResults.prepend(
                createUiResponse(response.statusText, false, source)
                  .hide()
                  .fadeIn(500)
              );
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
        uploadFile(item.getAsFile(), "Clipboard");
      }
    }
  };

});

function createUiResponse(content, validUpload, source) {
  var out = $("<div>", {class: "ui-response"});
  var thumbnail = $("<div>", {
    class: "thumbnail",
    onclick: "window.open('" + content + "', '_blank');"
  });
  var timestamp = $("<div>", {class: "timestamp"}).text(Date(Number(Date.now())));
  var descContainer = $("<div>", {class: "upload-desc-container"});
  var desc = $("<div>", {class: "upload-desc"}).text(content);
  var uploadSource = $("<div>", {class: "upload-source"}).text(source);

  thumbnail.css("background-image", "url(" + content + ")");

  descContainer.append(desc);

  out.append(timestamp);
  if (validUpload) {
    descContainer.prepend($("<div>", {class: "label"}).text("Storage URL:"));
    descContainer.append($("<div>", {class: "label"}).text("Source:"));
    descContainer.append(uploadSource);
    out.append(thumbnail);
  }
  out.append(descContainer);
  return out;
}
