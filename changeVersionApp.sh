#!/bin/bash
# Change version app for Android and Ios
# Example use: ./upVersionApp.sh 1.2.3
VERSION=$1
# BUILD_NUMBER=$(echo $VERSION | awk 'BEGIN { FS = "." } ; {print $3}')

BUILD_NUMBER=$(echo ${VERSION//[.]/0} | awk '$0*=1')

# package.json
sed -i '' "s/\"version\": \".*\"/\"version\": \"${VERSION}\"/g" package.json

# android/app/build.gradlew
sed -i '' "s/versionName \".*\"/versionName \"${VERSION}\"/g" android/app/build.gradle
sed -i '' "s/ versionCode .*/ versionCode ${BUILD_NUMBER}/g" android/app/build.gradle

# ios/*.xcodeproj/project.pbxproj
sed -i '' "s/MARKETING_VERSION = .*;/MARKETING_VERSION = ${VERSION};/g" ios/project_base.xcodeproj/project.pbxproj
sed -i '' "s/CURRENT_PROJECT_VERSION = .*;/CURRENT_PROJECT_VERSION = ${BUILD_NUMBER};/g" ios/project_base.xcodeproj/project.pbxproj