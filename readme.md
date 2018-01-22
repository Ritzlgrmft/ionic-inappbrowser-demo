# ionic-inappbrowser-demo

This sample illustrates a problem when using the InAppBrowser plugin in an Cordova app on iOS, when there is no statusbar. In this case, when the device gets rotated from portrait to landscape, a gray reactangle appears in the upper left corner:
![Portrait](docs/portrait.png)
![Landscape](docs/landscape.png)

The gray area is the toolbar, which has always a height of 20, but initially a width of 0. AFter rotating, it has in landscape mode only a with of 25% (e.g. 256 on an iPad 2).

I created the issue [CB-13816](https://issues.apache.org/jira/browse/CB-13816) for this problem.

## Workaround

A workaround could be to patch the file `platforms/ios/ionic-inappbrowser-demo/Plugins/cordova-plugin-inappbrowser/CDVInAppBrowser.m` manually, by replacing in `viewDidLoad` the line

```objective-c
[bgToolbar setAutoresizingMask:UIViewAutoresizingFlexibleWidth];
```

with

```objective-c
[bgToolbar setAutoresizingMask:UIViewAutoresizingNone];
```

There is a hook you can use to use the workaround. Just add the following lines to `config.xml`:

```xml
<hook src="hooks/patch_toolbar_autoreszing.js" type="after_platform_add" />
<hook src="hooks/patch_toolbar_autoreszing.js" type="after_prepare" />
```

## Build

```bash
npm install
ionic cordova emulate ios --target iPad-Air-2
```
