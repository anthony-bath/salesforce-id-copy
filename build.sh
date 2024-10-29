#!/bin/bash

rm -rf dist
npx esbuild src/background.ts src/offscreen/offscreen.ts --bundle --outdir=dist --format=iife --platform=browser
cp src/manifest.json dist/manifest.json
cp src/offscreen/offscreen.html dist/offscreen.html
