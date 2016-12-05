if (process.env.DEV) {
  exports.iosTestApp = "~/xshare/ios/Share/build/release-iphonesimulator/TestApp.app";
  exports.android_xshare_dev = "~/xshare/android/bin/xshare-debug.apk";
} else {
  exports.iosTestApp = "http://appium.github.io/appium/assets/TestApp7.1.app.zip";
  exports.android_xshare_rel = "http://nzmessengers.co.nz/share/latest.apk";
}
