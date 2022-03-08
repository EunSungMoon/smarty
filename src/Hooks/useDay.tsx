import axios from "axios";
import { useState, useEffect } from 'react'

export default function useDay() {
  const dayjs = require('dayjs');
  const today = dayjs();

  const [lists, setLists] = useState([] as any)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewDate, setViewDate] = useState(today);
  let token = `Token ${localStorage.getItem('token')}`

  // const month = viewDate.month() + 1
  // const currentMonth = month.toString()

  const loadCalendarAxios = async (xMonth: string) => {
    try {
      setError(null);
      setLists(null);
      setLoading(true);
      const loadData = await axios.get(`http://15.164.62.156:8000/api/todolist/2022/${xMonth}/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      setLists(loadData.data)
      console.log(loadData)
      console.log(viewDate)
    } catch (error: any) {
      setError(error)
      console.log(error)
    }
    setLoading(false)
  }

  return {
    lists,
    loading,
    error,
    dayjs,
    viewDate,
    today,
    // month,
    // currentMonth,
    setViewDate,
    loadCalendarAxios
  }
}