import {
  months,
  days,
  formatYear,
  formatPadded,
  formatDateName,
} from './formatHelpers';

export default class Fig {
  constructor(...args) {
    this._date = new Date(...args);
  }

  /**
   * Getters from Date Object
   *
   * @readonly
   * @memberof Fig
   */
  get year() {
    return this._date.getFullYear();
  }

  get month() {
    return months[this._date.getMonth()];
  }

  get day() {
    return this._date.getDate();
  }

  get dayOfWeek() {
    return days[this._date.getDay()];
  }

  get hour() {
    return this._date.getHours();
  }

  get minutes() {
    return this._date.getMinutes();
  }

  get seconds() {
    return this._date.getSeconds();
  }


  format(pattern) {
    // return default string
    if (!pattern) {
      return this._date.toDateString();
    }

    // Split by anything that is not a digit
    const sequence = pattern.split(/\b[^ymdwhisap]+\b/gi);

    // matches everything in sequence, returns array of separators
    const separators = pattern.split(/[ymdwhisap]+/gi);
    // console.log({sequence, separators})

    const formatted = [];

    sequence.map((s, i) => {
      // peek at first char to determine Y, M, D or H, I(min), S
      const dateSlice = s.toLowerCase().charAt(0);
      const len = s.length;
      let next;

      switch (dateSlice) {
        case 'y':
          next = formatYear(this.year, len);
          formatted.push(next, separators[i + 1]);
          break;
        case 'd':
          next = len <= 2 ? formatPadded(this.day) : formatDateName(this.dayOfWeek, len);
          formatted.push(next, separators[i + 1]);
          break;
        case 'm':
          // console.log(this.month)
          next = len <= 2
            ? formatPadded(this._date.getMonth() + 1)
            : formatDateName(this.month, len);
          formatted.push(next, separators[i + 1]);
          break;
        case 'h':
          next = formatPadded(this.hour, len);
          formatted.push(next, separators[i + 1]);
          break;
        case 'i':
          next = formatPadded(this.minutes, len);
          formatted.push(next, separators[i + 1]);
          break;
        case 's':
          next = formatPadded(this.seconds, len);
          formatted.push(next, separators[i + 1]);
          break;
        default:
          // console.log('unrecognized');
          break;
      }
      return next;
    });

    return formatted.join('');
  }

  when(date) {
    // const nowUTC = Date.UTC(date1.getUTCFullYear(), date1.getUTCMonth(), date1.getUTCDate());

    // const diff = (date.valueOf() - nowUTC.valueOf()) / (24 * 60 * 60 * 1000);
    const diff = (date.valueOf() - this._date.valueOf()) / (24 * 60 * 60 * 1000);

    return diff > 0 ? `${diff.toFixed(0)} days from ${this.format('MM/DD/YYYY')}` : `${Math.abs(diff).toFixed(0)} days since ${this.format('MM/DD/YYYY')}`;
  }
}

