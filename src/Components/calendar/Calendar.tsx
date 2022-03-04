import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Calendar = () => {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  let token = `Token ${localStorage.getItem('token')}`

  const [lists, setLists] = useState([] as any)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
const  id = useParams<{ id: string }>();

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

  const loadCalendarAxios = async () => {
    try {
      setError(null);
      setLists(null);
      setLoading(true);
      const loadData = await axios.get(`http://15.164.62.156:8000/api/todolist/2022/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      setLists(loadData.data)
      console.log(loadData)
    } catch (error: any) {
      setError(error)
      console.log(error)
    }
    setLoading(false)
  }


  useEffect(() => {
    loadCalendarAxios()
    return () => setLoading(false);
  }, []);

  if (loading) return <div>로딩중...</div>
  if (error) return <div>에러가 발생했습니다.</div>
  if (!lists) return null;

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

export default Calendar;