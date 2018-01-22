# ionic-inappbrowser-demo

This sample illustrates a problem when using the InAppBrowser plugin in an Cordova app on iOS, when there is no statusbar. In this case, when the device gets rotated from portrait to landscape, a gray reactangle appears in the upper left corner:
![Portrait](docs/portrait.png)
![Landscape](docs/landscape.png)

The gray area is the toolbar, which has always a height of 20, but initially a width of 0. AFter rotating, it has in landscape mode only a with of 25% (e.g. 256 on an iPad 2).

## Workaround

A workaround could be to patch the file platforms/ios/ionic-inappbrowser-demo/Plugins/cordova-plugin-inappbrowser/CDVInAppBrowser.m manually, by replacing in `viewDidLoad` the line

```objective-c
[bgToolbar setAutoresizingMask:UIViewAutoresizingFlexibleWidth];
```

with

```objective-c
[bgToolbar setAutoresizingMask:UIViewAutoresizingNone];
```
