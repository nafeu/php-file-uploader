<?php

$configs = include('config.php');
$base_url = $configs['base_url'];
$prefix = (isset($_POST['prefix']) ? $_POST['prefix'] : $configs['default_prefix']);
$target_directory = $configs["upload_directory"];
$temp_file = $_FILES["file"]["tmp_name"];
$file_extension = get_extension(basename($_FILES["file"]["name"]));
$file_size_limit = $configs['file_size_limit'];
$upload_status = true;
$unique_id_length = 6;
$output = Array("data" => null, "error" => null);

while (true) {
    $unique_id = generate_random_key($unique_id_length);
    $target_path = $target_directory . $prefix . $unique_id . "." . $file_extension;
    if (!file_exists($target_path)) {
        error_log($target_path);
        error_log("File does not exist at this path...");
        break;
    }
}


if (isset($_POST["submit"])) {
    $file_is_image = getimagesize($temp_file);
    if (!$file_is_image) {
        $upload_status = false;
        $output["error"] = "File format not supported. Must be an image.";
    }
}

if (file_exists($target_path)) {
    $upload_status = false;
    $output["error"] = "File already exists.";
}

if ($_FILES["file"]["size"] > $file_size_limit) {
    $upload_status = false;
    $output["error"] = "File is too large in size, must be no more than 0.5MB";
}

if ($file_extension != "jpg"
    && $file_extension != "png"
    && $file_extension != "jpeg"
    && $file_extension != "gif") {
    $upload_status = false;
    $output["error"] = "Image format not supported.";
}

if ($upload_status) {
    if (move_uploaded_file($temp_file, $target_path)) {
        $output["data"] = $base_url . $target_path;
    }
}

header('Content-Type: application/json');
echo json_encode($output);

// Helpers

function generate_random_key($length) {
    $pool = array_merge(range(0,9), range('a', 'z'),range('A', 'Z'));

    for($i=0; $i < $length; $i++) {
        $key .= $pool[mt_rand(0, count($pool) - 1)];
    }
    return $key;
}

function get_extension($file_name) {
     $extension = end(explode(".", $file_name));
     return $extension ? $extension : false;
}

?>