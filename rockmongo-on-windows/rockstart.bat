@echo off

set ROCK_PHP_PATH=%~dp0\php
set ROCK_PHP_PORT=9111
set ROCK_NGINX_PATH=%~dp0\nginx
set ROCK_NGINX_PORT=7788

echo Starting nginx ...
bin\hstart "%ROCK_NGINX_PATH%\nginx.exe -p %ROCK_NGINX_PATH%"

echo Starting php-cgi ...
bin\hstart /NOCONSOLE "%ROCK_PHP_PATH%\php-cgi.exe -b 127.0.0.1:%ROCK_PHP_PORT% -c %ROCK_PHP_PATH%\php.ini"

echo Success!

start http://127.0.0.1:%ROCK_NGINX_PORT%


exit