#!/usr/bin/env bash
# Redirect output to stderr.
exec 1>&2

format() {
  ./node_modules/.bin/pretty-quick --staged
}

format
