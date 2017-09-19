// ---------------------------------------------------------------------------
$(document).ready(function(){ // Document Ready: Start
// ---------------------------------------------------------------------------

var body = $("body"),
    uploadResults = $("#upload-results"),
    fileField = $("#file-field"),
    fileFieldDesc = $("#file-field-desc"),
    fileFieldDescDefault = fileFieldDesc.text(),
    modeButton = $("#mode-button"),
    classField = $("#class-field"),
    prefixField = $("#prefix-field"),
    formData = false,
    windowHeightOffset = 140,
    hiddenInputOffset = 20;

if (window.FormData) {
  formData = new FormData();
}

var modeFactory = {
  currentModeIndex: 0,
  modes: ["URL", "IMG", "MD"],
  modeLabels: ["Storage URL", "Image Element", "Markdown Element"],
  getMode: function(){
    return this.modes[this.currentModeIndex];
  },
  getModeLabel: function(){
    return this.modeLabels[this.currentModeIndex];
  },
  cycleMode: function(){
    if (this.currentModeIndex != this.modes.length - 1) {
      this.currentModeIndex++;
    } else {
      this.currentModeIndex = 0;
    }
    modeButton.text("Mode: " + this.getMode());
  },
  getModeElement: function(content) {
    if (this.getMode() == "IMG") {
      return this.createImageElement(content);
    }
    if (this.getMode() == "MD") {
      return this.createMdElement(content);
    }
    return content;
  },
  createImageElement: function(content) {
    return "<img src='" + content + "'/>";
  },
  createMdElement: function(content) {
    return "![](" + content + ")";
  }
};

// ---------------------------------------------------------------------------
// Application Logic
// ---------------------------------------------------------------------------

uploadResults.css('height', $(window).height() - windowHeightOffset);
fileField.css('height', $(window).height() - (windowHeightOffset + hiddenInputOffset));
fileField.css('padding-top', $(window).height() - windowHeightOffset);

// ---------------------------------------------------------------------------
// Event Handlers
// ---------------------------------------------------------------------------

modeButton.click(function(){
  modeFactory.cycleMode();
});

fileField.on("change", function(event) {
  file = this.files[0];
  uploadFile(file, file.name);
});

fileFieldDesc.click(function(){
  fileField.click();
});

document.onpaste = function(event){
  var items = (event.clipboardData || event.originalEvent.clipboardData).items;
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    if (item.kind === 'file') {
      uploadFile(item.getAsFile(), "Clipboard");
    }
  }
};

$(window).resize(function(){
    uploadResults.css('height', $(window).height() - windowHeightOffset);
    fileField.css('height', $(window).height() - (windowHeightOffset + hiddenInputOffset));
    fileField.css('padding-top', $(window).height() - windowHeightOffset);
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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
            if (response.error) {
              pushUploadResult(response.error, false, source);
            }
            if (response.data) {
              pushUploadResult(response.data, true, source);
            }
          },
          error: function(response) {
            pushUploadResult(response.statusText, false, source);
          }
        });
      }
    }
  }
}

function pushUploadResult(message, status, source) {
  uploadResults.prepend(
    createUiResponse(message, status, source)
      .hide()
      .fadeIn(500)
  );
  fileFieldDesc.text(fileFieldDescDefault);
}

function createUiResponse(content, validUpload, source) {
  var out = $("<div>", {class: "ui-response"});
  var thumbnail = $("<div>", {
    class: "thumbnail",
    onclick: "window.open('" + content + "', '_blank');"
  });
  var timestamp = $("<div>", {class: "timestamp"}).text(Date(Number(Date.now())));
  var descContainer = $("<div>", {class: "upload-desc-container"});
  var responseMessage = $("<div>", {class: "upload-response-message"}).text(modeFactory.getModeElement(content));
  var uploadSource = $("<div>", {class: "upload-source"}).text(source);

  responseMessage.on('click', function(){
    var originalContent = $(this).text();
    copyToClipboard(originalContent);
    responseMessage.text("Copied to clipboard.");
    setTimeout(function(){
      responseMessage.text(originalContent);
    }, 500);
  });

  thumbnail.css("background-image", "url(" + content + ")");

  descContainer.append(responseMessage);

  out.append(timestamp);
  if (validUpload) {
    descContainer.prepend($("<div>", {class: "label"}).text(modeFactory.getModeLabel()));
    descContainer.append($("<div>", {class: "label"}).text("Source:"));
    descContainer.append(uploadSource);
    out.append(thumbnail);
  }
  out.append(descContainer);
  return out;
}

function copyToClipboard(content) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(content).select();
  document.execCommand("copy");
  $temp.remove();
}

// ---------------------------------------------------------------------------
}); // Document Ready: End
// ---------------------------------------------------------------------------
