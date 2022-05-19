- **Install Pakage:**

> `yarn install`

- **Intall Pod:**

> `cd ios`

> `yarn install`

- **Build Android:**

> `yarn build-debug-android-develop`

> `yarn build-debug-android-staging`

> `yarn build-debug-android-production`

> `yarn build-release-android-develop`

> `yarn build-release-android-staging`

> `yarn build-release-android-production`

> `yarn build-release-android-develop-install`

> `yarn build-release-android-staging-install`

> `yarn build-release-android-production-install`

- **Build Ios:**

> `use xcode`

- **Deploy Code Push Android (Deploy version app: auto get version from source code):**

> `yarn deploy-code-push-android-develop`

> `yarn deploy-code-push-android-staging`

> `yarn deploy-code-push-android-production`

> `yarn deploy-code-push-android-develop-force-update`

> `yarn deploy-code-push-android-staging-force-update`

> `yarn deploy-code-push-android-production-force-update`

- **Deploy Code Push Ios(Deploy version app: auto get version from source code):**

> `yarn deploy-code-push-ios-develop`

> `yarn deploy-code-push-ios-staging`

> `yarn deploy-code-push-ios-production`

> `yarn deploy-code-push-ios-develop-force-update`

> `yarn deploy-code-push-ios-staging-force-update`

> `yarn deploy-code-push-ios-production-force-update`

- **Note Code push:**

-> Get key android: `appcenter codepush deployment list --app govindvarshny@gmail.com/Project-Base-Android -k`

-> Get key ios: `appcenter codepush deployment list --app govindvarshny@gmail.com/Project-Base-Ios -k`

- Build debug: ios simulator not support build debug. so, disabled build debug project for both android ios.
