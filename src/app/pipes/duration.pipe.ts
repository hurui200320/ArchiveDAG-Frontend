import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  // assuming value is seconds
  transform(value: number): string {
    let seconds = ~~(value % 60);
    value = ~~(value / 60); // in minutes
    let minutes = ~~(value % 60);
    value = ~~(value / 60); // in hours
    let hours = ~~(value % 24);
    let days = ~~(value / 24);
    let result = "";
    if (days != 0) {
      result += days.toString() + "d";
    }
    if (hours != 0) {
      result += hours.toString() + "h";
    }
    if (minutes != 0) {
      result += minutes.toString() + "m";
    }
    if (seconds != 0) {
      result += seconds.toString() + "s";
    }
    return result;
  }

}
