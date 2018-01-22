import { Component } from '@angular/core';
import { AlertController, Platform } from "ionic-angular";

import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	constructor(
		private platform: Platform,
		private inAppBrowser: InAppBrowser,
		private alertController: AlertController) {

	}

	public openInAppBrowser(): void {
		const url = "assets/test.html";
		const target = "_blank";
		const options: InAppBrowserOptions = {
			location: "no",
			toolbar: "no",
			toolbarposition: "bottom"
		}
		const browser = this.inAppBrowser.create(url, target, options);
		if (this.platform.is("cordova")) {
			browser.on("loaderror").subscribe((event) => {
				this.alertController.create({
					title: "Cannot load page '" + url + "'",
					message: event.message
				});
			});
		}
	}
}
