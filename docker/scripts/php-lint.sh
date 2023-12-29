#!/bin/sh
set -u

MODULE_DIRECTORY=${1:-$(dirname "$0")}
find "$MODULE_DIRECTORY" -type f -name '*.php' -print0 \
  | xargs -0 -n1 php -l -n \
  | (! grep -v "No syntax errors" );

echo "php $PHP_VERSION lint passed";
