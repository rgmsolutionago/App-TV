import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from './services/security.service';
import { KeepAwake } from '@capacitor-community/keep-awake';
import { Network } from '@capacitor/network';
import { DashboardService } from './services/dashboard.service';
import { tap } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { LOGIN } from 'src/environments/environment';
import { AppConfigService } from './services/app-config.service';
import { register } from 'swiper/element/bundle';

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild('screen', { static: true }) screen: any;
  private initPlugin!: boolean;

  constructor(
    public securityService: SecurityService,
    public dashboardService: DashboardService,
    private router: Router,
    private platform: Platform,
    public appConfigService: AppConfigService
  ) {}

  async ngOnInit() {
 


    if (LOGIN) {
      if (!this.securityService.isAuth) this.router.navigate(['/login']);
      else this.router.navigate(['/dashboard']);
      await KeepAwake.keepAwake();
    } else {
      this.router.navigate(['/dashboard']);
    }
    Network.getStatus().then((status) => {
      if (status.connected) this.appConfigService.isConected.next(true);
      else this.appConfigService.isConected.next(false);
    });

    Network.addListener('networkStatusChange', (status) => {
      if (status.connected) this.appConfigService.isConected.next(true);
      else this.appConfigService.isConected.next(false);
    });

    this.platform.backButton.subscribeWithPriority(
      10,
      async (processNextHandler) => {
        const n:any = navigator
        if (this.router.url && this.router.url.includes('/login'))
          n['app'].exitApp();
        else if (this.router.url && this.router.url.includes('/dashboard'))
          n['app'].exitApp();
        else processNextHandler();
      }
    );
  }
}
