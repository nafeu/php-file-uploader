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
    uploadFile(file);
  });

  fileFieldDesc.click(function(){
    fileField.click();
  });

  function uploadFile(file) {
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

});

function createUiResponse(content) {
  var out = $("<div>", {class: "ui-response"});
  var thumbnail = $("<div>", {
    class: "thumbnail",
    onclick: "window.open('" + content + "', '_blank');"
  });
  var descContainer = $("<div>", {class: "upload-desc-container"});
  var desc = $("<div>", {class: "upload-desc"});
  thumbnail.css("background", "url(" + content + ")");
  desc.text(content);
  descContainer.append(desc);
  out.append(thumbnail);
  out.append(descContainer);
  return out;
}
