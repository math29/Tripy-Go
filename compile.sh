#!/usr/bin/env bash

bower install
cd back_office && bower install
cd ..
npm install
grunt build
