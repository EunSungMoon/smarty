import axios from "axios";
import { useState } from 'react'

export default function useDay(initialDay: any) {
  const [lists, setLists] = useState([] as any)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewDate, setViewDate] = useState(initialDay);
  let token = `Token ${localStorage.getItem('token')}`

  const loadCalendarAxios = async (xMonth: number) => {
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
    loadCalendarAxios
  }
}