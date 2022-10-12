#!/bin/sh

ENV="$(cat <<EOF
  window.env = {
      NEXT_PUBLIC_MAIN_API_DOMAIN: "$NEXT_PUBLIC_MAIN_API_DOMAIN",
      NEXT_PUBLIC_MAIN_SUBS_DOMAIN: "$NEXT_PUBLIC_MAIN_SUBS_DOMAIN",
  }
EOF
)"

echo $ENV > /erxespos/public/js/env.js

exec "$@"
