// 日本時間の暦日・予定開始時刻で判定。交通の実際の運行状況とは連動しません。
const TripClock = (() => {
  const dates = ['2026-11-15', '2026-11-16', '2026-11-17'];
  function state(now = new Date()) {
    const jp = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    const date = jp.toISOString().slice(0, 10);
    const day = dates.indexOf(date) + 1;
    const daysLeft = Math.round((Date.parse(dates[0]) - Date.parse(date)) / 86400000);
    const minute = jp.getUTCHours() * 60 + jp.getUTCMinutes();
    let next = null;
    if (day) {
      const index = TRIP.days[day - 1].events.findIndex(event => {
        const [hour, min] = event[0].match(/\d+:\d+/)[0].split(':').map(Number);
        return hour * 60 + min >= minute;
      });
      if (index >= 0) next = {day, event:TRIP.days[day - 1].events[index]};
      else if (day < 3) next = {day:day + 1, event:TRIP.days[day].events[0]};
    }
    return {day, daysLeft, next};
  }
  return {state};
})();
