import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AppComponent } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
	declarations: [
		AppComponent,
		HomePage
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(AppComponent)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		AppComponent,
		HomePage
	],
	providers: [
		InAppBrowser,
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler }
	]
})
export class AppModule { }
