#!/bin/bash
yarn translate
# react-native-sqlite-orm: add index.d.ts typescript
cp ./src/local_store/database/index.d.ts ./node_modules/react-native-sqlite-orm/src/index.d.ts
# rn-fetch-blob: Fix Require cycle, ref: https://github.com/joltup/rn-fetch-blob/issues/183
cp ./scripts/fixed_files/Blob.js ./node_modules/rn-fetch-blob/polyfill/Blob.js
cp ./scripts/fixed_files/Fetch.js ./node_modules/rn-fetch-blob/polyfill/Fetch.js
cp ./scripts/fixed_files/XMLHttpRequest.js ./node_modules/rn-fetch-blob/polyfill/XMLHttpRequest.js
