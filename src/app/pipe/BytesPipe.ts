import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'byteFormat' })
export class BytesPipe implements PipeTransform {
  transform(bytes: number) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = 3
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }
}
