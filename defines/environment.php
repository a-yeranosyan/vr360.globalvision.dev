<?php

defined('_VR360_EXEC') or die;

define('VR360_URL_ROOT', (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]");
define('VR360_URL_FULL', VR360_URL_ROOT . $_SERVER['REQUEST_URI']);
define('VR360_URL_FULL_WITHOUT_PARAMS', 'http://' . $_SERVER['HTTP_HOST'] . explode('?', $_SERVER['REQUEST_URI'], 2)[0]);