# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# Start hermes: https://reactnative.dev/docs/hermes
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }
# End hermes

# Start react-native-config: https://github.com/luggit/react-native-config
-keep class com.project.base.BuildConfig { *; }
# End react-native-config

# Start react-native: https://github.com/facebook/react-native/blob/main/ReactAndroid/proguard-rules.pro
# Fix some time build crash and run app crash
#-keep,allowobfuscation @interface com.facebook.jni.annotations.DoNotStrip
#-keep @com.facebook.jni.annotations.DoNotStrip class *
#-keepclassmembers class * {
#    @com.facebook.jni.annotations.DoNotStrip *;
#}
# End react-native