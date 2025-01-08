/* eslint-disable */
// ----------------------------------------------------------------------

import { registerLog } from './common';

const STORAGE_KEY = 'DOBLED-APP12.0';

export const fromStorage = (key: string) => {
  return localStorage.getItem(STORAGE_KEY + '-' + key.toLowerCase());
};

export const toStorage = (key: string, value: string) => {
  try {
    let saveData = value;
    if (key === 'CONTENT')
      saveData = JSON.stringify(
        JSON.parse(value).map((e:any) => ({
          ...e,
          base64: '',
          poster: '',
        }))
      );
    return localStorage.setItem(
      STORAGE_KEY + '-' + key.toLowerCase(),
      saveData
    );
  } catch (e) {
    // alert('Quota exceeded!');

    registerLog('Quota exceeded!' + JSON.stringify(e));
  }
};

export const cleanStorage = (key: string) => {
  return localStorage.removeItem(STORAGE_KEY + '-' + key.toLowerCase());
};

export const uuid = () => {
  var d = new Date().getTime(); //Timestamp
  var d2 =
    (typeof performance !== 'undefined' &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
};
