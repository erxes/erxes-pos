#!/bin/sh
echo "window.env = `jo \`env | grep REACT_APP_\``" > /etc/nginx/html/js/env.js
sed -i 's/${NGINX_HOST}/'"$NGINX_HOST"'/' /etc/nginx/conf.d/default.conf
sed -i 's~%REACT_APP_API_URL%~'"$REACT_APP_API_URL"'~g' /etc/nginx/html/index.html
sed -i 's~%REACT_APP_API_SUBSCRIPTION_URL%~'"$REACT_APP_API_SUBSCRIPTION_URL"'~g' /etc/nginx/html/index.html
exec "$@"
