#!/usr/bin/env bash

bower install
bower update
cd back_office && bower install
bower update
cd ..
npm install
npm update
grunt build
