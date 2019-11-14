export default class {
  constructor(locales, initYear) {
    let years = [];
    let months = [];
    for (let year = initYear; year <= new Date().getFullYear(); year += 1) {
      years.push(year);
    }
    for (let month = 0; month < 12; month += 1 ) {
      months.push(new Date(null, month).toLocaleString(locales, { month: 'long'}));
    }
    this.years = years;
    this.months = months;
    this.currentYear = new Date().getFullYear().toString();
    this.currentMonth = new Date().toLocaleString(locales, { month: 'long' });
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

  getFilter(year, month) {
    const monthIndex = this.months.findIndex(currentMonth => currentMonth === month) + 1;
    const maxDays = new Date(year, monthIndex, 0).getDate();
    return {
      start: `${year}-${monthIndex}-1`,
      end: `${year}-${monthIndex}-${maxDays}`,
    };
  }

  async fetchDatas(apiCall, userId, { year, month }) {
    const { start, end } = this.getFilter(year, month);
    const res = await apiCall(userId, start, end);
    return res.data;
  }

  formatDate(date) {
    const day = new Date(date).toLocaleString('fr-FR', { weekday: 'long', day: '2-digit' });
    const hour = new Date(date).toLocaleString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    return {
      day,
      hour,
    }
  }
}
