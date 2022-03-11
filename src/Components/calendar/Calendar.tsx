import { useState, useEffect } from "react";
import useDay from "../../Hooks/useDay";
import TodoList from "../todolist/TodoList";
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";

export default function Calendar() {
  const dayjs = require('dayjs');
  const today = dayjs();
  const { viewDate, lists, loading, error, loadCalendarAxios, setViewDate, loadDayAxios } = useDay(today);

  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  //day
  const weekday = require('dayjs/plugin/weekday');
  const isoWeek = require('dayjs/plugin/isoWeek');
  const weekOfYear = require('dayjs/plugin/weekOfYear');

  // day extend
  dayjs.extend(weekday);
  dayjs.extend(isoWeek);
  dayjs.extend(weekOfYear);

  const month = viewDate.add(1, 'month');
  const currentMonth = month.month();
  const currentYear = month.year();

  const [selectDate, setSelectDate] = useState(today);

  const createCalendar = () => {
    const startWeek = viewDate.startOf('month').week();
    const endWeek = viewDate.endOf('month').week() === 1 ? 53 : viewDate.endOf('month').week();

    let calender = [];

    for (let week = startWeek; week <= endWeek; week++) {
      calender.push(
        <div className={`oneweek`} key={week}>
          {Array(7).fill(0).map((n, i) => {
            let current = viewDate.startOf('week').week(week).add(n + i, 'day');
            // 현재 날짜 (기준)
            let isSelected = selectDate.format('YYYYMMDD') === current.format('YYYYMMDD') ? 'selected' : '';
            let isToday = today.format('YYYYMMDD') === current.format('YYYYMMDD') ? 'today' : '';
            let isNone = current.format('MM') === viewDate.format('MM') ? '' : 'none';
            let holiday = current.day() === 0 ? 'holiday' : '';
            let satDay = current.day() === 6 ? 'satDay' : '';
            return (
              <div
                className={`box ${current.day() === 6 ? 'borderRightnone' : ''}`} key={current.format('D')}>
                <div
                  className={`text ${isSelected} ${isToday} ${isNone}`}
                  onClick={() => { handleLoadDayData(current.date(), current) }}
                >
                  <span className={`day ${holiday} ${satDay}`}>{current.format('D')}</span>
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

  useEffect(() => {
    loadCalendarAxios(currentYear, currentMonth)
    return lists
  }, [viewDate]);

  const handleArrowBtn = (date: number, changeString: string, changeDate: string) => {
    if (changeString === 'add') {
      setViewDate(viewDate.add(1, changeDate))
    }
    else if (changeString === 'subtract') {
      setViewDate(viewDate.subtract(1, changeDate))
    }
    return loadCalendarAxios(currentYear, currentMonth);
  }

  const handleLoadDayData = (currentDate: number, c: number) => {
    loadDayAxios(currentYear, currentMonth, currentDate)
    setSelectDate(c)
  }

  if (loading) return <div>로딩중...</div>
  if (error) return <div>에러가 발생했습니다.</div>
  if (!lists) return <div>리스트 등록해주삼</div>

  return (
    <>
      <section id="calendar">
        <div className="currentDate">
          <div className="currentYear">
            <button className='arrowbtn' onClick={() => handleArrowBtn(viewDate, 'subtract', 'year')}><GoTriangleLeft /></button>
            <span className="thisMonth">{viewDate.format('YYYY')}년</span>
            <button className='arrowbtn' onClick={() => handleArrowBtn(viewDate, 'add', 'year')}><GoTriangleRight /></button>
          </div>
          <div className="currentMonth">
            <button className=' arrowbtn' onClick={() => handleArrowBtn(viewDate, 'subtract', 'month')}><GoTriangleLeft /></button>
            <span className="thisMonth">{viewDate.format("MM")}월</span>
            <button className='arrowbtn' onClick={() => handleArrowBtn(viewDate, 'add', 'month')}><GoTriangleRight /></button>
          </div>
        </div>

        <div className="calendarWrap">
          <div className="dayofWeek oneweek">
            {days.map(day => (
              <div className={`box borderBottomnone ${day === 'SAT' ? 'borderRightnone' : ''}`} key={day}>
                <span>{day}</span>
              </div>
            ))}
          </div>
          {createCalendar()}
        </div>
      </section >
      <TodoList lists={lists} />
    </>
  )
}