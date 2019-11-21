import { Settings } from 'luxon';

export default class {
  constructor(initYear) {
    const locale = Settings.defaultLocale;
    let years = [];
    let months = [];
    for (let year = initYear; year <= new Date().getFullYear(); year += 1) {
      years.push(year);
    }
    for (let month = 0; month < 12; month += 1 ) {
      months.push(new Date(null, month).toLocaleString(locale, { month: 'long'}));
    }
    this.locale = locale;
    this.years = years;
    this.months = months;
    this.currentYear = new Date().getFullYear().toString();
    this.currentMonth = new Date().toLocaleString(locale, { month: 'long' });
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
    }
  }

  getFilter({ year, month }) {
    const monthIndex = this.months.findIndex(currentMonth => currentMonth === month) + 1;
    const maxDays = new Date(year, monthIndex, 0).getDate();
    return {
      start: `${year}-${monthIndex}-1`,
      end: `${year}-${monthIndex}-${maxDays}`,
    };
  }

  formatDate(date) {
    const day = new Date(date).toLocaleString(this.locale, { weekday: 'long', day: '2-digit' });
    const hour = new Date(date).toLocaleString(this.locale, { hour: '2-digit', minute: '2-digit' });
    return {
      day,
      hour,
    }
  }
}
