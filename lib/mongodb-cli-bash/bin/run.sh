#!/bin/bash -e

# start script
for script in $@; do
  bash $(cd $(dirname $0) && pwd)/${script}.sh
done
