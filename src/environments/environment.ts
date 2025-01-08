// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

export const INTERVAL_TO_CALL_CONFIGS_APIS = 1 * 60 * 1000;


export const INTERVAL_TO_CALL_NEWS_APIS = 16 * 60 * 1000;
export const INTERVAL_TO_CALL_SPORT_APIS = 21 * 1000;
export const INTERVAL_TO_CALL_WHEATER_APIS = 14 * 60 * 1000;
export const INTERVAL_TO_CALL_EXCHANGE_APIS = 31 * 60 * 1000;
export const INTERVAL_TO_CALL_FORECAST_APIS = 59 * 60 * 1000;
export const INTERVAL_SLIDE = 12 * 1000;
export const INTERVAL_TO_CALL_TRIVIA_APIS= 21 * 60 * 1000;
export const INTERVAL_TO_CALL_INSTAGRAM_APIS= 21 * 60 * 1000;
export const INTERVAL_TO_CALL_LIKETODAY_APIS= 21 * 60 * 1000;
export const INTERVAL_TO_CALL_DIDYOUNOW_APIS= 21 * 60 * 1000;
export const INTERVAL_TO_CALL_MOVIE_APIS= 21 * 60 * 1000;
export const INTERVAL_TO_CALL_REVIEW_APIS= 21 * 60 * 1000;
export const INTERVAL_TO_CALL_SHOW_APIS= 21 * 60 * 1000;

export const INTERVAL_TO_CALL_DETECTOR_APIS= 5 * 60 * 1000;


export const DEFAULT_CONTENT_IMAGE = 10;
export const INTERVAL_TO_CALL_CALLER_APIS = 5 * 60 * 1000;
export const INTERVAL_TO_CALL_MACHINE_APIS = 10000;
export const ENABLE_INTERVAL_CALL = false;
export const TIME_PAUSE = 5000;
export const NOCONTENT_SHOW_COUNT = 2;


 

export const DEBUG = true;

export const LOGIN = true;

export const DEFAULT_XSecretKey = 'CE6D95D8AB2B63A588E71F93B37169CC983282247CD44D3B7F43C7C4DD';
export const DEFAULT_XApiKey = 'YrQhPu';
export const DEFAULT_XDeviceID = 'f242abff-55a7-4065-ab71-1a72b0f00a54';


export const firebaseConfig = {
  apiKey: "AIzaSyDtfN9ZZsQc2Qq9Eevf9oYdB48oulMrxC8",
  authDomain: "dobled-6aee2.firebaseapp.com",
  databaseURL: "https://dobled-6aee2-default-rtdb.firebaseio.com",
  projectId: "dobled-6aee2",
  storageBucket: "dobled-6aee2.appspot.com",
  messagingSenderId: "375492882225",
  appId: "1:375492882225:web:df2e69b6a97bb6a8c4ca10"
};