// Set AutoresizingMask of splashscreen's toolbar to None.
// v1.0
//
// It could happen that in the upper left corner of the InAppBrowser plugin a gray rectangle is shown.
// This can happen when
// - the app has no statusbar
// - the InAppBrowser plugin has no toolbar
// - the device gets rotated from portrait to landscape mode
//
// As a workaround, the AutoresizingMask of splashscreen's toolbar can be set to None.
//
// For using the hook, add the following lines
// to your config.xml:
// <hook type="after_platform_add" src="hooks/patch_toolbar_autoreszing.js" />
// <hook type="after_prepare" src="hooks/patch_toolbar_autoreszing.js" />
//
// Supported platforms:
// - ios

module.exports = function (ctx) {
	var fs = ctx.requireCordovaModule('fs');
	var path = ctx.requireCordovaModule('path');

	// patch the autoresizing of the toolbar
	function patchAutoresizingMask(inAppBrowserPath) {
		var data = fs.readFileSync(inAppBrowserPath, 'utf8');

		var toReplace = "bgToolbar setAutoresizingMask:UIViewAutoresizingFlexibleWidth";
		var replaceWith = "bgToolbar setAutoresizingMask:UIViewAutoresizingNone";
		if (data.indexOf(toReplace) >= 0) {
			var result = data.replace(new RegExp(toReplace, "g"), replaceWith);

			fs.writeFileSync(inAppBrowserPath, result, 'utf8')
			console.info('AutoresizingMask set to UIViewAutoresizingNone in ' + inAppBrowserPath);
		}
	}

	var rootdir = ctx.opts.projectRoot;
	if (rootdir) {
		try {
			// patch inappbrowser plugin
			// TODO: calculate 3 parameter dynamically
			var inAppBrowserPath = path.join('platforms', 'ios', 'ionic-inappbrowser-demo', 'Plugins', 'cordova-plugin-inappbrowser', 'CDVInAppBrowser.m');
			if (fs.existsSync(inAppBrowserPath)) {
				patchAutoresizingMask(inAppBrowserPath);
			}
		} catch (e) {
			console.error(e);
		}
	}
}
