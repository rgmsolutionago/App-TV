import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import { IInstagram } from '../model/IInstagram';
import { cleanStorage, fromStorage, toStorage, uuid } from '../util/storage';
import { AppConfigService } from './app-config.service';

import { HttpService } from './http.service';
import { InstagramStaticManagerService } from './instagram-static-manager.service';
import { ReadFileResult } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root',
})
export class InstagramService {
  // frecuencyShow: number = 2;

  constructor(
    public platform: Platform,
    private http: HttpService,
    private instagramStaticManagerService: InstagramStaticManagerService,
    private appConfigService: AppConfigService
  ) {}

  //FETCH EXCHANGE
  pendingInstagram: boolean = false;
  instagramData: IInstagram[] = [];

  registerModule() {
    this.appConfigService.availableMods.next({
      ...this.appConfigService.availableMods.value,
      instagram: {
        loaded: true,
        items: this.instagramData,
      },
    });
  }

  buildInstagram() {
    this.registerModule();
    this.pendingInstagram = false;
    toStorage('Instagram', JSON.stringify(this.instagramData));
    this.downloadContent();
  }

  getNextInstagramItem() {
    let next: IInstagram | any;
    if (this.instagramData.filter((e) => !e.maskAsView).length === 0) {
      this.instagramData = this.instagramData.map((e) => ({
        ...e,
        maskAsView: false,
      }));
      toStorage('REPLACE', JSON.stringify(true));
    }

    if (this.instagramData.filter((e) => !e.maskAsView).length > 0) {
      next = this.instagramData.filter((e) => !e.maskAsView)[0];
      let index = this.instagramData.findIndex((e) => e.uuid === next.uuid);
      this.instagramData[index].maskAsView = true;
    }
    toStorage('Instagram', JSON.stringify(this.instagramData));
    console.log(next);
    
    return next;
  }
  fetchInstagram() {
    //if (this.appConfigService.configsData?.modules?.instagram.enable)
    if (this.appConfigService.configsData?.instagram_enabled)
      this.appConfigService.iniModules.push('Instagram');

    this.pendingInstagram = true;
    cleanStorage('REPLACE');
    this.http.call({ method: 'GET', path: '/contents/instagram' }).subscribe(
      (response) => {
        this.instagramData = response?.data?.map((e: any) => ({
          ...e,
          uuid: uuid(),
          maskAsView: false,
        }));
        this.buildInstagram();
        this.appConfigService.iniModules =
          this.appConfigService.iniModules.filter((e) => e != 'Instagram');
      },
      (e) => {
        if (fromStorage('Instagram')) {
          this.instagramData = JSON.parse(fromStorage('Instagram') as string);
          this.buildInstagram();
        }
      }
    );
  }

  countDownloaded: number = 0;
  countDownloading: number = 0;
  downloadContent() {
    this.instagramData.forEach((element: IInstagram) => {
      if (
        !this.instagramStaticManagerService.hasRegistredMediaToDownload(
          element.uuid
        )
      )
        this.instagramStaticManagerService.registredMediaStatus(
          element.uuid,
          false,
          false
        );
    });

    this.countDownloaded =
      this.instagramStaticManagerService.getDownloadingCompleteCount();
    this.countDownloading =
      this.instagramStaticManagerService.getDownloadedCount();

    this.instagramData.forEach((element: IInstagram) => {
      if (
        this.instagramStaticManagerService.mediaStopDownloaded(element.uuid)
      ) {
        this.updateLoadMedia(element);
      } else {
        element.downloading = true;
        if (
          !this.instagramStaticManagerService.mediaStartDownloaded(element.uuid)
        ) {
          this.instagramStaticManagerService.registredMediaStatus(
            element.uuid,
            true,
            false
          );
          this.instagramStaticManagerService
            .downloadMediaResource(element)
            .then((r) => {
              this.instagramStaticManagerService.registredMediaStatus(
                element.uuid,
                true,
                true
              );
              element.downloading = false;
              this.updateLoadMedia(element);

              this.countDownloaded =
                this.instagramStaticManagerService.getDownloadingCompleteCount();
              this.countDownloading =
                this.instagramStaticManagerService.getDownloadedCount();
            })
            .catch((e) => {
              this.instagramStaticManagerService.registredMediaStatus(
                element.uuid,
                false,
                false
              );
            });
        }
      }
    });
  }

  hasDownloadFile: boolean = false;
  pendingContents: boolean = false;

  updateLoadMedia(element: IInstagram) {
    this.instagramStaticManagerService
      .getMediaResource(element)
      .then((readFileResult: ReadFileResult) => {
        if (readFileResult && readFileResult.data) {
          //if (element.source !== 'video')
          element.base64 = `data:video/mp4;base64,${readFileResult.data}`;
          if (!element.thumbnail_url)
            element.thumbnail_url =
              this.instagramStaticManagerService.getStorageThumb(element.uuid);
          this.hasDownloadFile = true;
        }

        let countDownloaded = this.instagramData.length;
        let countDownloading = this.instagramData.length;

        if (
          this.instagramStaticManagerService.hasAsDownloadedComplete() &&
          countDownloaded === countDownloading
        )
          this.pendingContents = false;
      })
      .catch((error) => {});
  }
}
