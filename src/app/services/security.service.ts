import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { cleanStorage, fromStorage, toStorage } from '../util/storage';
import {
  DEFAULT_XApiKey,
  DEFAULT_XDeviceID,
  DEFAULT_XSecretKey,
  LOGIN,
} from 'src/environments/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  pending: boolean = false;
  isAuth: boolean = false;
  constructor(
    private toastController: ToastController,
    private http: HttpService,
    private router: Router,
  ) {
    if (!LOGIN) {
      this.isAuth = true;
      toStorage('X-Secret-Key', DEFAULT_XSecretKey);
      toStorage('X-Device-ID', DEFAULT_XDeviceID);
      toStorage('X-Api-Key', DEFAULT_XApiKey);
    } else if (fromStorage('X-Api-Key')) this.isAuth = true;
  }
  callerStorageID: string = 'callerStorageID';
  login(key: string) {
    this.pending = true;
    return this.http.call({ method: 'POST', path: '/key', payload: {}, key }).pipe(
      map((result) => {
        cleanStorage(this.callerStorageID);
        this.pending = false;
        this.isAuth = true;
        return result;
      })
    );
  }
  logout() {
    localStorage.clear()
    cleanStorage('X-Secret-Key');
    cleanStorage('X-Api-Key');
    cleanStorage('X-Device-ID');
    cleanStorage('X-Device-Name');
    this.isAuth = false;
    this.router.navigate(['/login']);
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
    });

    await toast.present();
  }
}
