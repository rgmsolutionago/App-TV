import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { fromStorage } from '../util/storage';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  root_path_url_api: string;

  constructor(private httpClient: HttpClient) {
    this.root_path_url_api = 'https://consumers.dobled.net/api/v1';
  }

  call({
    method,
    path,
    payload = null,
    key = '',
  }: {
    method: string;
    path: string;
    payload?: any;
    key?: string;
  }): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();

    if (fromStorage('X-Api-Key'))
      headers = headers.set('X-Api-Key', fromStorage('X-Api-Key') as string);
    else headers = headers.set('X-Api-Key', key);
    if (fromStorage('X-Secret-Key'))
      headers = headers.set(
        'X-Secret-Key',
        fromStorage('X-Secret-Key') as string
      );

    if (method === 'GET')
      return from(
        this.httpClient.get(this.root_path_url_api + path, {
          headers: headers,
        })
      );
    if (method === 'POST') {
      return from(
        this.httpClient.post(this.root_path_url_api + path, payload, {
          headers: headers,
        })
      );
    }

    return from(
      this.httpClient.post(this.root_path_url_api + path, payload, {
        headers: headers,
      })
    );
  }
}
