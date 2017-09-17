<?php

$target_dir = "uploads/";
$target_path = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$image_file_type = pathinfo($target_path,PATHINFO_EXTENSION);
$upload_status = 1;

while (true) {
    $target_path = $target_dir . uniqid(rand(), true) . "." . $image_file_type;
    if (!file_exists($target_path)) {
      break;
    }
}

// Check if image file is a actual image or fake image
if (isset($_POST["submit"])) {
    $file_is_image = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if ($file_is_image !== false) {
        echo "File is an image - " . $file_is_image["mime"] . ".";
        $upload_status = 1;
    } else {
        echo "File is not an image.";
        $upload_status = 0;
    }
}

// Check if file already exists
if (file_exists($target_path)) {
    echo "Sorry, file already exists.";
    $upload_status = 0;
}

// Check file size
if ($_FILES["fileToUpload"]["size"] > 500000) {
    echo "Sorry, your file is too large.";
    $upload_status = 0;
}

// Allow certain file formats
if ($image_file_type != "jpg"
    && $image_file_type != "png"
    && $image_file_type != "jpeg"
    && $image_file_type != "gif") {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $upload_status = 0;
}

// Check if $upload_status is set to 0 by an error
if ($upload_status == 0) {
    echo "Sorry, your file was not uploaded.";
} else {
    // if everything is ok, try to upload file
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_path)) {
        echo "File upload successful!";
        echo "<br>";
        echo "<a href='" . $target_path . "'>" . $target_path . "</a>";
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}

?>