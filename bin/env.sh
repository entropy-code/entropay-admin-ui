#!/bin/sh
# line endings must be \n, not \r\n !
echo "window._env_ = {" > ./env-config.js
awk -F '=' '!/^#/ && NF > 0 { print $1 ": \"" (ENVIRON[$1] ? ENVIRON[$1] : $2) "\"," }' ./.env >> ./env-config.js
echo "}" >> ./env-config.js
