<?php

return array(
    'default_prefix' => 'storage_', // Default prefix for all successful uploads
    'base_url' => 'http://localhost:8000/', // Address (optionally with port) being served by your server
    'upload_directory' => 'uploads/', // Directory to save uploaded files
    'file_size_limit' => 2000000, // File size upload limit in bytes
    'auth_token' => '' // The authorization token to allow file upload access
);

?>