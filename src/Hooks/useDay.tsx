import axios from "axios";
import { useState } from 'react'

export default function useDay(initialDay: any) {
  const [lists, setLists] = useState([] as any)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewDate, setViewDate] = useState(initialDay);
  const token = `Token ${localStorage.getItem('token')}`

  const loadCalendarAxios = async (xYear: number, xMonth: number) => {
    try {
      setError(null);
      setLists(null);
      setLoading(true);
      const loadData = await axios.get(`http://15.164.62.156:8000/api/todolist/${xYear}/${xMonth}/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      setLists(loadData.data)
    } catch (error: any) {
      setError(error)
      console.log(error)
    }
    setLoading(false)
  }

  const loadDayAxios = async (xYear: number, xMonth: number, xDay: number) => {
    try {
      setError(null);
      setLists(null);
      setLoading(true);
      const loadData = await axios.get(`http://15.164.62.156:8000/api/todolist/${xYear}/${xMonth}/${xDay}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      setLists(loadData.data)
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
    viewDate,
    setViewDate,
    loadCalendarAxios,
    loadDayAxios
  }
}