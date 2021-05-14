
export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function formatYear(y, type) {
  const year = y.toString();
  switch (type) {
    case 2:
      return year.slice(-2);
    case 4:
      return year;
    default:

      return year;
  }
}


export function formatPadded(v, len) {
  const val = v.toString();

  return len === 2 && v < 10 ? `0${val}` : `${val}`;
}

export function formatDateName(name, len) {
  switch (len) {
    case 2:
    case 3:
      return name.toString().substr(0, len);
    default:
      return name;
  }
}
