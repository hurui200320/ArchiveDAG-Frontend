import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateMultihash'
})
export class TruncateMultihashPipe implements PipeTransform {

  transform(value: string, ellipsis = '...'): unknown {
    // 8tVoZLyaU8vXspbPaGWqnTQhayc4y3ojvjPtEL3ySFHiUjhAkM54RQRuJ8qTSgZCas25gaXRDL4EUAgHSgtFdJjJBY
    // 8tVoZLyaU8vX...tFdJjJBY
    const start = value.substring(0, 12);
    const end = value.substring(value.length - 8, value.length);
    return start + ellipsis + end;
  }

}
