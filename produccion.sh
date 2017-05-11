#!/usr/bin/env bash
git fetch -p
git checkout estable
git pull origin estable
npm i
bower install
gulp clean
gulp dist --backend http://backend.controles.co.cr:6010
