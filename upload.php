<?php

$host_url = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]/";
$prefix = (isset($_POST['prefix']) ? $_POST['prefix'] : "storage_");
$target_directory = "uploads/";
$target_path = $target_directory . basename($_FILES["file"]["name"]);
$file_extension = pathinfo($target_path,PATHINFO_EXTENSION);
$file_size_limit = 500000;
$upload_status = true;
$unique_id_length = 6;

while (true) {
    $unique_id = generate_random_key($unique_id_length);
    $target_path = $target_directory . $prefix . $unique_id . "." . $file_extension;
    if (!file_exists($target_path)) {
        break;
    }
}

if (isset($_POST["submit"])) {
    $file_is_image = getimagesize($_FILES["file"]["tmp_name"]);
    if (!$file_is_image) {
        $upload_status = false;
        header("HTTP/ 400 File is not an image.");
    }
}

if (file_exists($target_path)) {
    $upload_status = false;
    header("HTTP/ 400 File already exists.");
}

if ($_FILES["file"]["size"] > $file_size_limit) {
    $upload_status = false;
    header("HTTP/ 400 File is too large in size, must be no more than 0.5MB");
}

if ($file_extension != "jpg"
    && $file_extension != "png"
    && $file_extension != "jpeg"
    && $file_extension != "gif") {
    $upload_status = false;
    header("HTTP/ 400 Image format not supported.");
}

if ($upload_status) {
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_path)) {
        http_response_code(200);
        $output = $host_url . $target_path;
        echo $output;
    } else {
        header("HTTP/ 500 There was an error uploading your file");
    }
}

function generate_random_key($length) {
    $pool = array_merge(range(0,9), range('a', 'z'),range('A', 'Z'));

    for($i=0; $i < $length; $i++) {
        $key .= $pool[mt_rand(0, count($pool) - 1)];
    }
    return $key;
}

?>