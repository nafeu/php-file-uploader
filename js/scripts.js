var body, uploadResults, fileField, fileFieldDesc, fileFieldDefault,
    tokenField, modeButton, tokenButton, classField, prefixField, formData,
    windowHeightOffset, hiddenInputOffset, appData, modeFactory;

// ---------------------------------------------------------------------------
$(document).ready(function(){ // Document Ready: Start
// ---------------------------------------------------------------------------

body = $("body");
uploadResults = $("#upload-results");
fileField = $("#file-field");
fileFieldDesc = $("#file-field-desc");
fileFieldDescDefault = fileFieldDesc.text();
tokenField = $("#token-field");
tokenButton = $("#token-button");
modeButton = $("#mode-button");
classField = $("#class-field");
prefixField = $("#prefix-field");
formData = false;
windowHeightOffset = 150;
hiddenInputOffset = 20;

appData = {
  token: "",
  class: "storage",
  prefix: "storage_",
  mode: 0
};

if (window.FormData) {
  formData = new FormData();
}

modeFactory = {
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
  setMode: function(index) {
    if (index < this.modes.length) {
      this.currentModeIndex = index;
      modeButton.text("Mode: " + this.getMode());
    }
  },
  getModeElement: function(content, status) {
    if (status) {
      if (this.getMode() == "IMG") {
        return this.createImageElement(content);
      }
      if (this.getMode() == "MD") {
        return this.createMdElement(content);
      }
      return content;
    }
    return content;
  },
  createImageElement: function(content) {
    if (classField.val().length > 0) {
      return "<img class='" + classField.val() + "' src='" + content + "'/>";
    }
    return "<img src='" + content + "'/>";
  },
  createMdElement: function(content) {
    return "![](" + content + ")";
  }
};

// ---------------------------------------------------------------------------
// Application Logic
// ---------------------------------------------------------------------------

loadData();

tokenField.val(appData.token);
classField.val(appData.class);
prefixField.val(appData.prefix);
modeFactory.setMode(appData.mode);

uploadResults.css('height', $(window).height() - windowHeightOffset);
fileField.css('height', $(window).height() - (windowHeightOffset + hiddenInputOffset));
fileField.css('padding-top', $(window).height() - windowHeightOffset);

// ---------------------------------------------------------------------------
// Event Handlers
// ---------------------------------------------------------------------------

// Field events
tokenField.on("change paste keyup", function(event) {
  appData.token = $(this).val();
  saveData(appData);
});

classField.on("change paste keyup", function(event) {
  appData.class = $(this).val();
  saveData(appData);
});

prefixField.on("change paste keyup", function(event) {
  appData.prefix = $(this).val();
  saveData(appData);
});

fileField.on("change", function(event) {
  file = this.files[0];
  uploadFile(file, file.name);
});

fileFieldDesc.click(function(){
  fileField.click();
});

// Button events
modeButton.click(function(){
  modeFactory.cycleMode();
});

tokenButton.on("mouseenter", function(){
  tokenField.addClass("active");
});

tokenButton.on("mouseleave", function(){
  tokenField.removeClass("active");
});

// Document events
document.onpaste = function(event){
  var items = (event.clipboardData || event.originalEvent.clipboardData).items;
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    if (item.kind === 'file') {
      uploadFile(item.getAsFile(), "Clipboard");
    }
  }
};

// Window events
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
        formData.append("auth_token", tokenField.val());
        formData.append("file", file);
        if (prefixField.val().length > 0) {
          formData.append("prefix", prefixField.val());
        }
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

function createUiResponse(content, status, source) {
  var out = $("<div>", {class: "ui-response"});
  var thumbnail = $("<div>", {
    class: "thumbnail",
    onclick: "window.open('" + content + "', '_blank');"
  });
  var timestamp = $("<div>", {class: "timestamp"}).text(Date(Number(Date.now())));
  var descContainer = $("<div>", {class: "upload-desc-container"});
  var responseMessage = $("<div>", {class: "upload-response-message"}).text(modeFactory.getModeElement(content, status));
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
  if (status === true) {
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

function saveData() {
  window.localStorage.setItem("appData", JSON.stringify(appData));
}

function loadData() {
  if (window.localStorage.getItem("appData") !== null) {
    appData = JSON.parse(window.localStorage.getItem("appData"));
    return true;
  }
  return false;
}

// ---------------------------------------------------------------------------
}); // Document Ready: End
// ---------------------------------------------------------------------------
