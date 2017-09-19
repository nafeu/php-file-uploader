# PHP File Uploader

A simple PHP file uploader for dev use only. Built to provide a CDN-like file storage solution during a separate application's development.

**Warning:** not neccessarily secure, use with caution.

### Features

- Currently only supports image uploads (jpg, png, jpeg, gif)
- Click to upload, drag and drop, or paste image from clipboard
- Generates URL, formatted HTML `img` tag or formatted Markdown `![]()` image
- Customizable image prefixes, file size limit, and classes
- Great for testing/developing a separate app that requires basic object storage

### Requirements

- PHP >= 5.4

### Installation / Usage

```
git clone https://github.com/nafeu/php-file-uploader.git
cd php-file-uploader
cp sample-config.php config.php
```

Open `config.php` in your editor of choice and adjust the config variables accordingly.

For `authentication_token`, I would recommend generating a token. You can use an online tool like [RandomKeygen](https://randomkeygen.com/) or just do it in your command line (Check out [this](https://www.howtogeek.com/howto/30184/10-ways-to-generate-a-random-password-from-the-command-line/) article for details). If you have `openssl` installed, then you can do:

```
openssl rand -base64 32
```

Save the returned token in your `config.php` and make sure to save it somewhere else for your own access. This token will allow you to upload files. Now you can start up a PHP development server with:

```
php -S localhost:8000
```

Where `localhost:8000` matches the `base_url` value of `http://localhost:8000` in `config.php`.

Now you can access `http://localhost:8000`, input the authentication token and, begin uploading images (either by pasting from clipboard, dragging and dropping from a file browser or clicking to upload) and use the returned URL, formatted html `img` tag or markdown image in a separate project.

### Deployment

Upload all the contents of the `php-file-uploader` root folder to your hosting server. Give the `uploads/` folder public `777` permissions **(WARNING: Do this step at your own risk)**.

### Author

Nafeu Nasir

### License

MIT