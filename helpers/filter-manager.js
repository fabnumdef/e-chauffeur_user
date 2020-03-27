import { DateTime, Info } from 'luxon';

export default class {
  constructor(initYear) {
    const years = [];
    for (let year = initYear; year <= DateTime.local().year; year += 1) {
      years.push(year.toString());
    }

    this.years = years;
    this.months = Info.months('2-digit');
    this.currentYear = DateTime.local().toLocaleString({ year: 'numeric' });
    this.currentMonth = DateTime.local().toLocaleString({ month: '2-digit' });
    this.currentMonthName = DateTime.local().toLocaleString({ month: 'long' });
  }

  getSelects() {
    return {
      years: this.years,
      months: this.months,
    };
  }

  getCurrents() {
    return {
      year: this.currentYear,
      month: this.currentMonth,
      monthName: this.currentMonthName,
    };
  }

  static getFilter({ year, month }) {
    const dateTime = DateTime.local(parseInt(year, 10), parseInt(month, 10));
    return {
      start: dateTime.startOf('month').toISO(),
      end: dateTime.endOf('month').toISO(),
    };
  }

  static formatDate(date) {
    const day = DateTime.fromISO(date).toLocaleString({ weekday: 'long', day: '2-digit' });
    const hour = DateTime.fromISO(date).toLocaleString({ hour: '2-digit', minute: '2-digit' });
    return {
      day,
      hour,
    };
  }
}
