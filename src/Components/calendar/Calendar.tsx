import { useState } from "react";

const Calendar = () => {
  //day
  const dayjs = require('dayjs');
  const weekday = require('dayjs/plugin/weekday');
  const isoWeek = require('dayjs/plugin/isoWeek');
  const weekOfYear = require('dayjs/plugin/weekOfYear');

  // day extend
  dayjs.extend(weekday);
  dayjs.extend(isoWeek);
  dayjs.extend(weekOfYear);

  const today = dayjs();
  const newDate = today.month(2) //현재 날짜, 페이지 이걸로 월별카드에 링크 걸자!
  console.log(newDate) // Wed Mar 02 2022 00:05:42 GMT+0900

  const [viewDate, setViewDate] = useState(newDate);
  const [selectDate, setSelectDate] = useState(newDate);

  const createCalendar = () => {
    const startWeek = viewDate.startOf('month').week();
    const endWeek = viewDate.endOf('month').week() === 1 ? 53 : viewDate.endOf('month').week();

    let calender = [];

    for (let week = startWeek; week <= endWeek; week++) {
      calender.push(
        <div className="oneweek" key={week}>
          {Array(7).fill(0).map((n, i) => {
            let current = viewDate.startOf('week').week(week).add(n + i, 'day');
            // 현재 날짜 (기준)
            let isSelected = selectDate.format('YYYYMMDD') === current.format('YYYYMMDD') ? 'selected' : '';
            let isToday = newDate.format('YYYYMMDD') === current.format('YYYYMMDD') ? 'today' : '';
            let isNone = current.format('MM') === viewDate.format('MM') ? '' : 'none';
            return (
              <>
                <div className={`box`} key={current.format('D')} >
                  <div className={`text ${isSelected} ${isToday} ${isNone}`} onClick={() => { setSelectDate(current) }}>
                    <span className={`day`}>{current.format('D')}</span>
                    {isToday ? (<span className="isToday">오늘</span>)
                      : isSelected ? (<span className="isSelected"></span>) : null}
                  </div>
                </div >
              </>
            )
          })
          }
        </div >
      )
    }
    return calender;
  }

  const changegeMonth = (date: number, changeString: string) => {
    switch (changeString) {
      case 'add':
        return setViewDate(viewDate.add(1, 'month'))
      case 'subtract':
        return setViewDate(viewDate.subtract(1, 'month'))
      default:
        return date;
    }
  }

  return (
    <section id="calendar">
      <div className="currentMonth">
        {/* <button className='previous_icon button' onClick={() => changegeMonth(viewDate, 'subtract')}></button> */}
        <span className="thisMonth">{viewDate.format("MM")}월</span>
        {/* <button className='next_icon button' onClick={() => changegeMonth(viewDate, 'add')}></button> */}
      </div>

      <div className="calendarWrap">
        <div className="dayofWeek oneweek">
          <div className="box"><span className="text">SUN</span></div>
          <div className="box"><span className="text">MON</span></div>
          <div className="box"><span className="text">TUE</span></div>
          <div className="box"><span className="text">WED</span></div>
          <div className="box"><span className="text">THU</span></div>
          <div className="box"><span className="text">FRI</span></div>
          <div className="box"><span className="text">SAT</span></div>
        </div>
        {createCalendar()}
      </div>
    </section>
  )
}

export default Calendar;