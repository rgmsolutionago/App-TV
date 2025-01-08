import { DEBUG } from 'src/environments/environment';

//import * as Sentry from '@sentry/capacitor';

export const registerLog = (error: string) => {
  //Sentry.captureException(error);
};


export function getModuleVideo(
  module: string,
  isVertical: boolean,
  isFull: boolean,
  sub: string = ''
) {
  return `./assets/module/${module}/${isVertical ? 'v' : 'd'}/${
    sub ? sub + '/' : ''
  }video${isFull ? '-full' : ''}.webm`;
}

export const types: any = {
  //   File Extension   MIME Type
  abs: 'audio/x-mpeg',
  ai: 'application/postscript',
  aif: 'audio/x-aiff',
  aifc: 'audio/x-aiff',
  aiff: 'audio/x-aiff',
  aim: 'application/x-aim',
  art: 'image/x-jg',
  asf: 'video/x-ms-asf',
  asx: 'video/x-ms-asf',
  au: 'audio/basic',
  avi: 'video/x-msvideo',
  avx: 'video/x-rad-screenplay',
  bcpio: 'application/x-bcpio',
  bin: 'application/octet-stream',
  bmp: 'image/bmp',
  body: 'text/html',
  cdf: 'application/x-cdf',
  cer: 'application/pkix-cert',
  class: 'application/java',
  cpio: 'application/x-cpio',
  csh: 'application/x-csh',
  css: 'text/css',
  dib: 'image/bmp',
  doc: 'application/msword',
  dtd: 'application/xml-dtd',
  dv: 'video/x-dv',
  dvi: 'application/x-dvi',
  eot: 'application/vnd.ms-fontobject',
  eps: 'application/postscript',
  etx: 'text/x-setext',
  exe: 'application/octet-stream',
  gif: 'image/gif',
  gtar: 'application/x-gtar',
  gz: 'application/x-gzip',
  hdf: 'application/x-hdf',
  hqx: 'application/mac-binhex40',
  htc: 'text/x-component',
  htm: 'text/html',
  html: 'text/html',
  ief: 'image/ief',
  jad: 'text/vnd.sun.j2me.app-descriptor',
  jar: 'application/java-archive',
  java: 'text/x-java-source',
  jnlp: 'application/x-java-jnlp-file',
  jpe: 'image/jpeg',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  js: 'application/javascript',
  jsf: 'text/plain',
  json: 'application/json',
  jspf: 'text/plain',
  kar: 'audio/midi',
  latex: 'application/x-latex',
  m3u: 'audio/x-mpegurl',
  mac: 'image/x-macpaint',
  man: 'text/troff',
  mathml: 'application/mathml+xml',
  me: 'text/troff',
  mid: 'audio/midi',
  midi: 'audio/midi',
  mif: 'application/x-mif',
  mov: 'video/quicktime',
  movie: 'video/x-sgi-movie',
  mp1: 'audio/mpeg',
  mp2: 'audio/mpeg',
  mp3: 'audio/mpeg',
  mp4: 'video/mp4',
  mpa: 'audio/mpeg',
  mpe: 'video/mpeg',
  mpeg: 'video/mpeg',
  mpega: 'audio/x-mpeg',
  mpg: 'video/mpeg',
  mpv2: 'video/mpeg2',
  ms: 'application/x-wais-source',
  nc: 'application/x-netcdf',
  oda: 'application/oda',
  odb: 'application/vnd.oasis.opendocument.database',
  odc: 'application/vnd.oasis.opendocument.chart',
  odf: 'application/vnd.oasis.opendocument.formula',
  odg: 'application/vnd.oasis.opendocument.graphics',
  odi: 'application/vnd.oasis.opendocument.image',
  odm: 'application/vnd.oasis.opendocument.text-master',
  odp: 'application/vnd.oasis.opendocument.presentation',
  ods: 'application/vnd.oasis.opendocument.spreadsheet',
  odt: 'application/vnd.oasis.opendocument.text',
  otg: 'application/vnd.oasis.opendocument.graphics-template',
  oth: 'application/vnd.oasis.opendocument.text-web',
  otp: 'application/vnd.oasis.opendocument.presentation-template',
  ots: 'application/vnd.oasis.opendocument.spreadsheet-template',
  ott: 'application/vnd.oasis.opendocument.text-template',
  ogx: 'application/ogg',
  ogv: 'video/ogg',
  oga: 'audio/ogg',
  ogg: 'audio/ogg',
  otf: 'application/x-font-opentype',
  spx: 'audio/ogg',
  flac: 'audio/flac',
  anx: 'application/annodex',
  axa: 'audio/annodex',
  axv: 'video/annodex',
  xspf: 'application/xspf+xml',
  pbm: 'image/x-portable-bitmap',
  pct: 'image/pict',
  pdf: 'application/pdf',
  pgm: 'image/x-portable-graymap',
  pic: 'image/pict',
  pict: 'image/pict',
  pls: 'audio/x-scpls',
  png: 'image/png',
  pnm: 'image/x-portable-anymap',
  pnt: 'image/x-macpaint',
  ppm: 'image/x-portable-pixmap',
  ppt: 'application/vnd.ms-powerpoint',
  pps: 'application/vnd.ms-powerpoint',
  ps: 'application/postscript',
  psd: 'image/vnd.adobe.photoshop',
  qt: 'video/quicktime',
  qti: 'image/x-quicktime',
  qtif: 'image/x-quicktime',
  ras: 'image/x-cmu-raster',
  rdf: 'application/rdf+xml',
  rgb: 'image/x-rgb',
  rm: 'application/vnd.rn-realmedia',
  roff: 'text/troff',
  rtf: 'application/rtf',
  rtx: 'text/richtext',
  sfnt: 'application/font-sfnt',
  sh: 'application/x-sh',
  shar: 'application/x-shar',
  sit: 'application/x-stuffit',
  snd: 'audio/basic',
  src: 'application/x-wais-source',
  sv4cpio: 'application/x-sv4cpio',
  sv4crc: 'application/x-sv4crc',
  svg: 'image/svg+xml',
  svgz: 'image/svg+xml',
  swf: 'application/x-shockwave-flash',
  t: 'text/troff',
  tar: 'application/x-tar',
  tcl: 'application/x-tcl',
  tex: 'application/x-tex',
  texi: 'application/x-texinfo',
  texinfo: 'application/x-texinfo',
  tif: 'image/tiff',
  tiff: 'image/tiff',
  tr: 'text/troff',
  tsv: 'text/tab-separated-values',
  ttf: 'application/x-font-ttf',
  txt: 'text/plain',
  ulw: 'audio/basic',
  ustar: 'application/x-ustar',
  vxml: 'application/voicexml+xml',
  xbm: 'image/x-xbitmap',
  xht: 'application/xhtml+xml',
  xhtml: 'application/xhtml+xml',
  xls: 'application/vnd.ms-excel',
  xml: 'application/xml',
  xpm: 'image/x-xpixmap',
  xsl: 'application/xml',
  xslt: 'application/xslt+xml',
  xul: 'application/vnd.mozilla.xul+xml',
  xwd: 'image/x-xwindowdump',
  vsd: 'application/vnd.visio',
  wav: 'audio/x-wav',
  wbmp: 'image/vnd.wap.wbmp',
  wml: 'text/vnd.wap.wml',
  wmlc: 'application/vnd.wap.wmlc',
  wmls: 'text/vnd.wap.wmlsc',
  wmlscriptc: 'application/vnd.wap.wmlscriptc',
  wmv: 'video/x-ms-wmv',
  woff: 'application/font-woff',
  woff2: 'application/font-woff2',
  webm: 'video/webm',
  wrl: 'model/vrml',
  wspolicy: 'application/wspolicy+xml',
  z: 'application/x-compress',
  zip: 'application/zip',
};

export const printInfo = (info: string = '') => {};

export const distributeVideos = (repetitions: any): any => {
  const reelLength:any = Object.values(repetitions).reduce(
    (a: any, b: any): any => {
      return a + b;
    },
    0
  ) as number;
  const reel = new Array(reelLength).fill(null);
  const videoByIndex : any= {};
  for (let video in repetitions) {
    let reps = repetitions[video];
    if (reps > 1) {
      let slotStart = Math.floor(reelLength / reps);
      const indexList = [];
      for (let i = 0; i < reps; i++) {
        let index = i * slotStart + Math.floor(slotStart / 2);
        indexList.push(index);
      }
      videoByIndex[video] = indexList;
    }
  }
  const visit: any = [];
  const nextAvailable = (visit: any, index: any) => {
    let nextIndex = index;
    while (visit.includes(nextIndex)) nextIndex++;
    return nextIndex;
  };
  Object.keys(videoByIndex).forEach((key) => {
    videoByIndex[key].forEach((index: any) => {
      let p = nextAvailable(visit, index);
      reel[p] = key;
      if (!visit.includes(p)) visit.push(p);
    });
  });
  const remaining = [];
  for (let video in repetitions) {
    let reps = repetitions[video];
    if (reps === 1) {
      remaining.push(video);
    }
  }
  let j = 0;
  for (let i = 0; i < reel.length; i++) {
    if (reel[i] == null) {
      reel[i] = remaining[j++];
    }
  }
  return reel;
};

export const updateReel = (
  countCuote: number=5,
  module: string,
  currentReel: string[]
) => {
 
  const reelLength = currentReel.length + countCuote;
  const reel = new Array(reelLength).fill(null);

  let slotStart = Math.floor(reelLength / countCuote);
  const indexList = [];
  for (let i = 0; i < countCuote; i++) {
    let index = i * slotStart + Math.floor(slotStart / 2);
    indexList.push(index);
  }

  indexList.forEach((index) => {
    reel[index] = module;
  });

  const remaining: any = [];
  currentReel.forEach((eOfReel) => {
    remaining.push(eOfReel);
  });

  let j = 0;
  for (let i = 0; i < reel.length; i++) {
    if (reel[i] == null) {
      reel[i] = remaining[j++];
    }
  }
  
  
  return reel;
};

export function hexToRgb(hex: any) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/*
export const getIconWeater = (icon = 'sunner', pColor, sColor) => {
   


  let primaryColor = `${hexToRgb(pColor)?.r / 255},${hexToRgb(pColor)?.g / 255},${
    hexToRgb(pColor)?.b / 255
  },1`;
  let secondaryColor = `${hexToRgb(sColor)?.r / 255},${
    hexToRgb(sColor)?.g / 255
  },${hexToRgb(sColor)?.b / 255},1`; 

  return URL.createObjectURL(
    new Blob([lottie[icon](primaryColor, secondaryColor)], {
      type: 'text/json',
    })
  );
};
*/

export const getIconCode = (code: any) => {
  switch (code) {
    case 113:
      return 113;
    case 119:
    case 122:
    case 143:
      return 116;
    case 176:
    case 179:
    case 182:
    case 293:
    case 299:
    case 305:
    case 323:
    case 329:
    case 353:
    case 356:
    case 359:
      return 176;
    case 227:
    case 230:
    case 248:
    case 260:
    case 317:
    case 320:
    case 326:
    case 332:
    case 335:
    case 338:
    case 350:
    case 362:
    case 365:
    case 368:
    case 371:
    case 374:
    case 377:
      return 227;

    case 185:
    case 263:
    case 266:
    case 281:
    case 284:
    case 296:
    case 302:
    case 308:
    case 311:
    case 314:
      return 253;

    case 200:
    case 386:
    case 389:
    case 392:
    case 395:
      return 200;

    default:
      return 113;
      break;
  }
};

export const StartBase =
  'data:image/png;base64,PHN2ZyB3aWR0aD0iMTM4IiBoZWlnaHQ9IjQxIiB2aWV3Qm94PSIwIDAgMTM4IDQxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNNDUuNDg1NCAxMS45MjQyQzUxLjM5NDcgMTEuOTI0MiA1NS41MDY3IDE1LjgxODYgNTUuNTA2NyAyMS40NTYyQzU1LjUwNjcgMjcuMDY1OCA1MS4zNDA2IDMwLjk4NzMgNDUuMzIxMSAzMC45ODczSDM3LjM5NjlWMTEuOTI0Mkg0NS40ODU0Wk00MS42OTkzIDI3LjM2NTVINDUuNTkzN0M0OC43ODA0IDI3LjM2NTUgNTEuMTIyMSAyNC45Njg3IDUxLjEyMjEgMjEuNDgzM0M1MS4xMjIxIDE3Ljk2OTggNDguNjcxMiAxNS41NDY5IDQ1LjQwMzMgMTUuNTQ2OUg0MS42OTkzVjI3LjM2NTVaIiBmaWxsPSIjMDAyNzRFIi8+CjxwYXRoIGQ9Ik03Mi43MTQ1IDIzLjY2MTRDNzIuNzE0NSAyOC4xMjcyIDY5LjU1NTggMzEuMTUwNSA2NC44NzE1IDMxLjE1MDVDNjAuMTYxMSAzMS4xNTA1IDU3LjAwMTUgMjguMTI3MiA1Ny4wMDE1IDIzLjY2MTRDNTcuMDAxNSAxOS4xNjg1IDYwLjE2MDIgMTYuMTk5NCA2NC44NzE1IDE2LjE5OTRDNjkuNTU1OCAxNi4xOTk0IDcyLjcxNDUgMTkuMTY3NiA3Mi43MTQ1IDIzLjY2MTRaTTYxLjIyMjcgMjMuNzE1NkM2MS4yMjI3IDI2LjExMjMgNjIuNjkzMiAyNy43NDYzIDY0Ljg3MTUgMjcuNzQ2M0M2Ny4wMjI3IDI3Ljc0NjMgNjguNTIxMyAyNi4xMTIzIDY4LjUyMTMgMjMuNzE1NkM2OC41MjEzIDIxLjMxODggNjcuMDIzNyAxOS42ODQ5IDY0Ljg3MTUgMTkuNjg0OUM2Mi42OTMyIDE5LjY4NTggNjEuMjIyNyAyMS4zMTg4IDYxLjIyMjcgMjMuNzE1NloiIGZpbGw9IiMwMDI3NEUiLz4KPHBhdGggZD0iTTkxLjM0MDcgMjMuNzQzNkM5MS4zNDA3IDI4LjE4MjMgODguNjQ0MyAzMS4xNTA1IDg0LjUzMjMgMzEuMTUwNUM4Mi40ODk0IDMxLjE1MDUgODAuODgzNSAzMC4zMzM1IDc5LjgyMDkgMjguODYzVjMwLjk4NzFINzUuNjI2OFYxMC43ODAzSDc5LjgyMDlWMTguNDg2OUM4MC44NTU0IDE3LjAxNjQgODIuNDYyMyAxNi4xOTk0IDg0LjQ1MDEgMTYuMTk5NEM4OC41NjIxIDE2LjE5OTQgOTEuMzQwNyAxOS4yMjI3IDkxLjM0MDcgMjMuNzQzNlpNODcuMDkxNSAyMy42MDYzQzg3LjA5MTUgMjEuMjY0NyA4NS42MjEgMTkuNTc1NiA4My40Njk4IDE5LjU3NTZDODEuMzE4NiAxOS41NzU2IDc5LjgyMDkgMjEuMjM2NiA3OS44MjA5IDIzLjYwNjNDNzkuODIwOSAyNi4wMzAyIDgxLjMxODYgMjcuNjY0MSA4My40Njk4IDI3LjY2NDFDODUuNjIxIDI3LjY2NDEgODcuMDkxNSAyNi4wMDMxIDg3LjA5MTUgMjMuNjA2M1oiIGZpbGw9IiMwMDI3NEUiLz4KPHBhdGggZD0iTTk0LjIyNDggMzAuOTg3MVYxMC43ODAzSDk4LjQxODlWMzAuOTg3MUg5NC4yMjQ4WiIgZmlsbD0iIzAwMjc0RSIvPgo8cGF0aCBkPSJNMTE2LjA5MSAyNC45NDE1SDEwNS41NzlDMTA2LjA2OSAyNi43OTMgMTA3LjQ4NSAyNy44ODI3IDEwOS4zNjUgMjcuODgyN0MxMTAuNzUzIDI3Ljg4MjcgMTEyLjA2IDI3LjMzODMgMTEzLjA2OCAyNi4zMzA5TDExNS4yNzQgMjguNTY0M0MxMTMuODAzIDMwLjE5ODIgMTExLjY1MiAzMS4xNTE1IDEwOS4wMTEgMzEuMTUxNUMxMDQuMzI3IDMxLjE1MTUgMTAxLjM1OCAyOC4xNTYyIDEwMS4zNTggMjMuNzE3NUMxMDEuMzU4IDE5LjE5NjYgMTA0LjQzNiAxNi4yMDEzIDEwOC45MDIgMTYuMjAxM0MxMTQuMDQ5IDE2LjE5OTUgMTE2LjQ0NSAxOS42MDM3IDExNi4wOTEgMjQuOTQxNVpNMTEyLjE2OSAyMi40NjM2QzExMi4xMTUgMjAuNTI5OSAxMTAuODYyIDE5LjI3NjkgMTA4LjkyOSAxOS4yNzY5QzEwNy4wNzcgMTkuMjc2OSAxMDUuODI0IDIwLjUyOTkgMTA1LjQ5NyAyMi40NjM2SDExMi4xNjlaIiBmaWxsPSIjMDAyNzRFIi8+CjxwYXRoIGQ9Ik0xMjcuMDM2IDExLjkyNDJDMTMyLjk0NiAxMS45MjQyIDEzNy4wNTggMTUuODE4NiAxMzcuMDU4IDIxLjQ1NjJDMTM3LjA1OCAyNy4wNjU4IDEzMi44OTIgMzAuOTg3MyAxMjYuODcyIDMwLjk4NzNIMTE4Ljk0OFYxMS45MjQySDEyNy4wMzZaTTEyMy4yNSAyNy4zNjU1SDEyNy4xNDVDMTMwLjMzMSAyNy4zNjU1IDEzMi42NzMgMjQuOTY4NyAxMzIuNjczIDIxLjQ4MzNDMTMyLjY3MyAxNy45Njk4IDEzMC4yMjIgMTUuNTQ2OSAxMjYuOTU0IDE1LjU0NjlIMTIzLjI1VjI3LjM2NTVaIiBmaWxsPSIjQTBDNTFFIi8+CjxwYXRoIGQ9Ik0xOC42ODk2IC0wLjAwMDE5ODM2NEwxNi40MjQ1IDcuNTY1NDVMMTkuMDMzMiAxMC4wNzhMMjAuMzQwNCA1LjUzMTg5TDMxLjA4OTkgMTYuNzA1M0wyNy44MDYxIDMwLjU3OTlMMjYuMTE2MiAyOS4yNTAzTDI0Ljg0MTcgMjguMjQ5NEwyMi42MTY3IDI2LjQ5MTNMMjEuMjExNSAyNS4zODU4TDE1Ljg1MDMgMjEuMTY0NkwxNy4xMDQyIDE2Ljc5OTZMMTQuMzU1NSAxNC40NDg2TDEyLjAwNTQgMjIuMjg0MUwyMC4zOTgzIDI4LjQ3ODFMMjEuODI4NyAyOS41MzY5TDI0LjEwNjkgMzEuMjIwNEwyNS40MDY2IDMyLjE3ODNMMjkuMDkwOSAzNC45MDE5TDMzLjQxMjkgMTYuMDI3NEwxOC42ODk2IC0wLjAwMDE5ODM2NFoiIGZpbGw9IiMwMDI3NEUiLz4KPHBhdGggZD0iTTIwLjA3ODkgMzYuMzIwMkw0Ljk3NjU0IDI2Ljc3MTRMMTAuNzI0MyA4LjgxNzU2TDEzLjIxNDQgMTEuMDIzOUwxNC45MzA2IDEyLjUzOTJMMTcuNjQyIDE0LjkzMjNMMTkuMTgyNiAxNi4yOTI2TDI0LjEyMTggMjAuNjY3OUwyMy4wODI2IDI0LjY5NjdMMjUuMjgwNSAyNi40OTMyTDI2Ljk1NjQgMTkuNzYwNEwyMC4wMjEgMTMuMjg5OUwxOC41MTQgMTEuODc5MUwxNS44Njk5IDkuNDEwNDVMMTQuMTkyOSA3Ljg0NzQ2TDguNjIzNTIgMi42NDMxTDAgMjguMzYyNEwyMS42NjcxIDQwLjk5OThMMjMuNjU0IDMzLjAyOTlMMjEuMzUyNSAzMS4zOTIyTDIwLjA3ODkgMzYuMzIwMloiIGZpbGw9IiNBMEM1MUUiLz4KPC9zdmc+Cg==';
