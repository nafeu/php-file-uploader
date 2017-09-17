<?php

$host_url = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]/";
$target_directory = "uploads/";
$target_path = $target_directory . basename($_FILES["file"]["name"]);
$file_extension = pathinfo($target_path,PATHINFO_EXTENSION);
$file_size_limit = 500000;
$upload_status = true;

while (true) {
    $unique_id = uniqid(rand(), true);
    $target_path = $target_directory . $unique_id . "." . $file_extension;
    if (!file_exists($target_path)) {
        break;
    }
}

if (isset($_POST["submit"])) {
    $file_is_image = getimagesize($_FILES["file"]["tmp_name"]);
    if (!$file_is_image) {
        $upload_status = false;
    }
}

if (file_exists($target_path)) {
    $upload_status = false;
}

if ($_FILES["file"]["size"] > $file_size_limit) {
    $upload_status = false;
}

if ($file_extension != "jpg"
    && $file_extension != "png"
    && $file_extension != "jpeg"
    && $file_extension != "gif") {
    $upload_status = false;
}

if (!$upload_status) {
    http_response_code(400);
} else {
    // Upload file
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_path)) {
        http_response_code(200);
        $output = $host_url . $target_path;
        echo $output;
    } else {
        http_response_code(500);
        echo "There was an error uploading your file.";
    }
}

?>