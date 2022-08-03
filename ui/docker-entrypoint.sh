#!/bin/sh
echo "window.env = `jo \`env | grep REACT_APP_\``" > /etc/nginx/html/js/env.js
sed -i 's/${NGINX_HOST}/'"$NGINX_HOST"'/' /etc/nginx/conf.d/default.conf
exec "$@"
