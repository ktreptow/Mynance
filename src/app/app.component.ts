import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  lastTimeBackPressed = 0;
  timePeriodToExit = 2000;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private toastCtrl: ToastController,
    private router: Router
  ) {
    this.initializeApp();

    this.backButtonEvent();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('android')) {
        this.statusBar.styleLightContent();
      } else {
        this.statusBar.styleDefault();
      }
      this.splashScreen.hide();
    });
  }
  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {
      if (this.router.url == '/tabs/(home:home)') {
        if (new Date().getTime() - this.lastTimeBackPressed < this.timePeriodToExit) {
          //Schließen der App
          navigator['app'].exitApp();

        } else {
          const toast = await this.toastCtrl.create({
            message: 'Erneut drücken, um die App zu schließen',
            duration: 2000,
            position: 'bottom'
          });
          toast.present();
          this.lastTimeBackPressed = new Date().getTime();
        }
      }
    });
  }



}
