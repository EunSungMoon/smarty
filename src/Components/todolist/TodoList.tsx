import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function TodoList() {
  const [lists, setLists] = useState([] as any)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let token = `Token ${localStorage.getItem('token')}`




  const dayjs = require('dayjs');
  const today = dayjs();
  const month=today.month()+1
  const currentMonth=month.toString()
  

  // currentMonth = useParams<{ currentMonth: string }>();

  const loadCalendarAxios = async () => {
    try {
      setError(null);
      setLists(null);
      setLoading(true);
      const loadData = await axios.get(`http://15.164.62.156:8000/api/todolist/2022/${currentMonth}/`, {
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
    return lists
  }, []);

  if (loading) return <div>로딩중...</div>
  if (error) return <div>에러가 발생했습니다.</div>
  if (!lists) return null;

  return (
    <section>
      todolist
    </section>
  )
}