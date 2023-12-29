#!/bin/sh
set -u

git version > /dev/null 2>&1 || {
  echo 'Error: git not installed.' >&2
  exit 2;
}
