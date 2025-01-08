import { Injectable } from '@angular/core';
import { Directory, Filesystem, ReadFileResult } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';
import {} from 'rxjs';
import { IInstagram } from '../model/IInstagram';
import { audio } from '../util/audio';
import { fromStorage, toStorage, uuid } from '../util/storage';

const KEY = 'DOWNLOAD_REF_FILE_DOWNLOAD_INSTGRAM_1.3';
@Injectable({
  providedIn: 'root',
})
export class InstagramStaticManagerService {
  audioResource: any;
  constructor(private platform: Platform) {
    this.audioResource = JSON.parse(JSON.stringify(audio));
  }

  mediaAsDownloadedInfo() {
    if (!fromStorage(KEY)) toStorage(KEY, JSON.stringify([]));
    let downloadRef: any[] = JSON.parse(fromStorage(KEY) as string);
    return downloadRef;
  }

  hasAsDownloadedComplete() {
    if (!fromStorage(KEY)) toStorage(KEY, JSON.stringify([]));
    let downloadRef: any[] = JSON.parse(fromStorage(KEY) as string);

    let countComplete = downloadRef.filter(
      (e) => e.stopDownloading === true
    ).length;
    let count = downloadRef.length;
    return countComplete === count;
  }

  getDownloadedCount() {
    if (!fromStorage(KEY)) toStorage(KEY, JSON.stringify([]));
    let downloadRef: any[] = JSON.parse(fromStorage(KEY) as string);
    return downloadRef.length;
  }

  getDownloadingCompleteCount() {
    if (!fromStorage(KEY)) toStorage(KEY, JSON.stringify([]));
    let downloadRef: any[] = JSON.parse(fromStorage(KEY) as string);
    let countComplete = downloadRef.filter(
      (e) => e.stopDownloading === true
    ).length;
    return countComplete;
  }

  md5Deleted(name: string) {
    if (!fromStorage(KEY)) toStorage(KEY, JSON.stringify([]));
    let downloadRef: any[] = JSON.parse(fromStorage(KEY) as string);
    let index = downloadRef.findIndex((e) => e.name === name);
    if (index !== -1) downloadRef.splice(index, 1);
    toStorage(KEY, JSON.stringify(downloadRef));
  }

  getStorageThumb(name: string) {
    if (!fromStorage(KEY)) toStorage(KEY, JSON.stringify([]));
    let downloadRef: any[] = JSON.parse(fromStorage(KEY) as string);
    let item = downloadRef.find((e) => e.name === name);
    if (item) return item.poster;
    return '';
  }

  hasRegistredMediaToDownload(name: string) {
    if (!fromStorage(KEY)) toStorage(KEY, JSON.stringify([]));
    let downloadRef: any[] = JSON.parse(fromStorage(KEY) as string);
    return downloadRef.filter((e) => e.name === name).length > 0;
  }

  mediaStartDownloaded(name: string) {
    if (!fromStorage(KEY)) toStorage(KEY, JSON.stringify([]));
    let downloadRef: any[] = JSON.parse(fromStorage(KEY) as string);
    return (
      downloadRef.filter((e) => e.name === name && e.startDownloading).length >
      0
    );
  }

  mediaStopDownloaded(name: string) {
    if (!fromStorage(KEY)) toStorage(KEY, JSON.stringify([]));
    let downloadRef: any[] = JSON.parse(fromStorage(KEY) as string);

    return (
      downloadRef.filter(
        (e) => e.name === name && e.startDownloading && e.stopDownloading
      ).length > 0
    );
  }

  registredMediaStatus(
    name: string,
    startDownloading: boolean,
    stopDownloading: boolean
  ) {
    if (!fromStorage(KEY)) toStorage(KEY, JSON.stringify([]));
    let downloadRef: any[] = JSON.parse(fromStorage(KEY) as string);
    if (name !== 'start-of-array') {
      if (downloadRef.find((e) => e.name === name)) {
        let index = downloadRef.findIndex((e) => e.name === name);
        downloadRef.splice(index, 1, {
          startDownloading,
          stopDownloading,
          name,
        });
      } else {
        downloadRef.push({
          startDownloading,
          stopDownloading,
          name,
        });
      }

      toStorage(KEY, JSON.stringify(downloadRef));
    }
  }

  progressCurrentFile: number = 0;
  isDevice() {
    return (
      this.platform.is('android') ||
      this.platform.is('ios') ||
      (this.platform.is('hybrid') && !this.platform.is('mobileweb'))
    );
  }

  async base64FromPath(path: string): Promise<string> {
    const response = await fetch(path);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject('method did not return a string');
        }
      };
      reader.readAsDataURL(blob);
    });
  }

  async downloadMediaResource(content: IInstagram) {
    const base64Data = await this.base64FromPath(content.video_url);

    const savedFile = await Filesystem.writeFile({
      path: content.uuid + '.mp4',
      data: base64Data,
      directory: Directory.Data,
    });

    return {
      uri: savedFile.uri,
      base64: base64Data,
    };
  }

  getMediaResource(content: IInstagram): Promise<ReadFileResult> {
    try {
      return Filesystem.readFile({
        path: content.uuid + '.mp4',
        directory: Directory.Data,
        //encoding: Encoding.UTF8,
      });
    } catch (error) {
      return new Promise((resolve) => resolve({ data: content.video_url }));
    }
  }

  async getMediaResourceAbsoluteURI(content: IInstagram): Promise<string> {
    const { uri } = await Filesystem.stat({
      directory: Directory.Data,
      path: content.uuid + '.mp4',
    });
    return uri;
  }

  removeMediaResource(content: IInstagram): void {
    this.md5Deleted(content.uuid);
    Filesystem.deleteFile({
      path: content.uuid + '.mp4',
      directory: Directory.Data,
      //encoding: Encoding.UTF8,
    })
      .then((response) => {})
      .catch((error) => {});
  }

  resources1: any;
  resources2: any;
  resources3: any;

  stopAudio() {
    if (this.resources1) delete this.resources1;
    if (this.resources2) delete this.resources2;
    if (this.resources3) delete this.resources3;
  }
  runAudio(
    opt: number,
    number: number,
    n: string,
    voz = 'argentina',
    fromFirebase = false
  ) {
    const getItemFromKey = (key: string) => {
      let base64;
      this.audioResource.forEach((element: any) => {
        let keys = Object.keys(element);
        if (keys[0] === key) {
          base64 = element[key];
        }
      });
      return base64;
    };

    if (this.resources1) {
      this.resources1.pause();
      delete this.resources1;
    }
    if (this.resources2) {
      this.resources2.pause();
      delete this.resources2;
    }
    if (this.resources3) {
      this.resources3.pause();
      delete this.resources3;
    }

    let name = '';
    if (n)
      name = n
        .toLowerCase()
        .replace('á', 'a')
        .replace('é', 'e')
        .replace('í', 'i')
        .replace('ó', 'o')
        .replace('ú', 'u')
        .replace(' ', '');

    this.resources1 = new Audio(getItemFromKey('ding'));
    this.resources2 = new Audio(getItemFromKey(name));
    this.resources3 = new Audio(getItemFromKey(`${number}`));

    if (fromFirebase) {
      if (number > 99) {
        opt = 0;
      } else {
        opt = 4;
      }
    }

    switch (opt) {
      case 0:
        this.resources1.play();
        break;
      case 1:
        this.resources1.play();
        this.resources1.onended = () => {
          this.resources2.play();
          this.resources2.onended = () => {
            this.resources3.play();
          };
        };

        break;
      case 2:
        this.resources1.play();
        this.resources1.onended = () => {
          this.resources3.play();
          this.resources3.onended = () => {
            this.resources2.play();
          };
        };
        break;
      case 3:
        this.resources1.play();
        this.resources1.onended = () => {
          this.resources2.play();
        };
        break;
      case 4:
        this.resources1.play();
        this.resources1.onended = () => {
          this.resources3.play();
        };
        break;
      case 5:
        this.resources2.play();
        this.resources2.onended = () => {
          this.resources3.play();
        };
        break;
      case 6:
        this.resources2.play();
        break;
      case 7:
        this.resources3.play();
        break;
      default:
        break;
    }
  }
}
