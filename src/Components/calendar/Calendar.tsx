import { useState } from "react";

export default function Calendar() {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

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
  const currentMonth = today.month() + 1
  console.log(typeof currentMonth)
  const test: string = currentMonth.toString()
  console.log(test)


  const [viewDate, setViewDate] = useState(today);
  const [selectDate, setSelectDate] = useState(today);

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
            let isToday = today.format('YYYYMMDD') === current.format('YYYYMMDD') ? 'today' : '';
            let isNone = current.format('MM') === viewDate.format('MM') ? '' : 'none';
            return (
              <div className={`box`} key={current.format('D')} >
                <div className={`text ${isSelected} ${isToday} ${isNone}`} onClick={() => { setSelectDate(current) }}>
                  <span className={`day`}>{current.format('D')}</span>
                  {isToday ? (<span className="isToday">오늘</span>)
                    : isSelected ? (<span className="isSelected"></span>) : null}
                </div>
              </div >
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
        <button className='previous_icon button' onClick={() => changegeMonth(viewDate, 'subtract')}></button>
        <span className="thisMonth">{viewDate.format("MM")}월</span>
        <button className='next_icon button' onClick={() => changegeMonth(viewDate, 'add')}></button>
      </div>

      <div className="calendarWrap">
        <div className="dayofWeek oneweek">
          {days.map(day => (
            <div className="box" key={day}>
              <span className="text">{day}</span>
            </div>
          ))}
        </div>
        {createCalendar()}
      </div>
    </section>
  )
}