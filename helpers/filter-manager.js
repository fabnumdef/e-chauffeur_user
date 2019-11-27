import { Settings, DateTime, Info } from 'luxon';

export default class {
  constructor(initYear) {
    const locale = Settings.defaultLocale;
    const years = [];
    for (let year = initYear; year <= DateTime.local().year; year += 1) {
      years.push(year);
    }

    this.locale = locale;
    this.years = years;
    this.months = Info.months('long', { locale });
    this.currentYear = DateTime.local().year;
    this.currentMonth = DateTime.local().toLocaleString({ month: 'long' });
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
    };
  }

  getFilter({ year, month }) {
    const monthIndex = this.months.findIndex((currentMonth) => currentMonth === month) + 1;
    const maxDays = DateTime.local(year, monthIndex).daysInMonth;
    return {
      start: `${year}-${monthIndex}-1`,
      end: `${year}-${monthIndex}-${maxDays}`,
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
