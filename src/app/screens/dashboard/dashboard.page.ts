import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController, Platform } from '@ionic/angular';
import { Modal402Component } from 'src/app/components/modal402/modal402.component';
import { IDisplay } from 'src/app/model/IContent';
import { AppConfigService } from 'src/app/services/app-config.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FirebaseService } from 'src/app/services/firestore.service';
import { SecurityService } from 'src/app/services/security.service';
import { fromStorage, toStorage } from 'src/app/util/storage';
import { INTERVAL_TO_CALL_CONFIGS_APIS } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  resourceIntervalConf: any;
  handleRotate: boolean = false;
  constructor(
    private menuCtrl: MenuController,
    public platform: Platform,
    public appConfigService: AppConfigService,
    public dashboardService: DashboardService,
    public firebaseService: FirebaseService,

    public securityService: SecurityService,
    private router: Router,
    private modalCtrl: ModalController
  ) {}

  logout() {
    this.securityService.logout();
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event.key);

    if (21 == parseInt(event.key) || event.key == 'ArrowRight') {
      this.openMenu();
    }
    if (19 == parseInt(event.key) || event.key == 'ArrowLeft') {
      this.closeMenu();
    }
  }
  openMenu() {
    this.menuCtrl.open('dobled-menu');
  }
  closeMenu() {
    this.menuCtrl.close('dobled-menu');
  }
  ngOnInit() {
    //FETCH CONFIGS
    let deviceID = fromStorage('X-Device-ID') ?? '';
    if (deviceID.includes('Too many connections')) {
      this.securityService.logout();
      this.router.navigate(['/login']);
    }
    this.fetchConfig();
    if (this.resourceIntervalConf) clearInterval(this.resourceIntervalConf);
    this.resourceIntervalConf = setInterval(
      () => this.appConfigService.fetchConfigs(() => {}),
      INTERVAL_TO_CALL_CONFIGS_APIS
    );
    this.appConfigService.displayScreen.subscribe((v) => {
      this.desktopDisplayScreen = v;
      if (v === 2 || v == 3 || v == 4) this.handleRotate = true;
      else this.handleRotate = false;
    });
  }

  desktopDisplayScreen: number = 0;
  @HostListener('window:resize', ['$event'])
  resizeEvent(event: KeyboardEvent) {
    this.appConfigService.updateDevice();
    if (this.platform.width() <= 720) this.desktopDisplayScreen = 2;
    else this.desktopDisplayScreen = this.appConfigService.displayScreen.value;
  }

  fetchConfig() {
    this.appConfigService.fetchConfigs((code: any) => {
      //FETCH CONTENTS
      if (code === 402) {
        this.launchModalExired();
      }
      this.dashboardService.sendInfo();
      if (this.appConfigService.configsData?.firebase) {
        this.firebaseService.fetchEmission(
          this.appConfigService.configsData.uuid,
          (emissionData: any) => {
            console.log(emissionData);

            this.appConfigService.currentSportData = emissionData?.sportData;

            this.appConfigService.theme = {
              ...emissionData?.theme,
            };

            const data = emissionData[this.firebaseService.deviceID];

            if (data) {
              if (!data?.presentation) {
                Object.assign(data, {
                  presentation: {
                    display: 0,
                    padding: {
                      paddingBottom: 20,
                      paddingInner: 10,
                      paddingLeft: 20,
                      paddingRight: 20,
                      paddingTop: 20,
                    },
                  },
                });
              }

              const dipositionDisplay = data?.presentation?.display;
              this.appConfigService.displayNumber = data?.presentation?.display;
              this.appConfigService.displayScreen.next(dipositionDisplay);
              if (data?.presentation?.padding)
                this.appConfigService.paddingScreen = {
                  pb: data?.presentation?.padding?.paddingBottom,
                  pt: data?.presentation?.padding?.paddingTop,
                  pl: data?.presentation?.padding?.paddingLeft,
                  pr: data?.presentation?.padding?.paddingRight,
                  ip: data?.presentation?.padding?.paddingInner,
                };
              this.appConfigService.buildDisplay();
              toStorage('THEME', JSON.stringify(data.theme));
            }
          }
        );
      }
    });
  }

  modal: any;
  async launchModalExired() {
    if (!this.modal) {
      this.modal = await this.modalCtrl.create({
        component: Modal402Component,
        showBackdrop: false,
        mode: 'ios',
        cssClass: ['alert-modal', 'expired'],
        componentProps: {},
      });

      return await this.modal.present();
    }
  }
}
