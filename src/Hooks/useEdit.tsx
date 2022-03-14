import React, { useEffect, useState } from "react";
import axios from "axios";

export interface todolistType {
  title: string;
  repeat: string;
  importance: string;
}

export interface initValues {
  initialValues: todolistType;
  onSubmit: any;
  error?: any;
}

export default function useSubmit({ initialValues, onSubmit, error }: initValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const dayjs = require('dayjs');
  const today = dayjs();
  const Year = today.year();
  const Month = today.add(1, 'month').month()
  const Day = today.date()


  let token = `Token ${localStorage.getItem('token')}`

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    console.log(values)
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    e.preventDefault();
    await new Promise(r => setTimeout(r, 1000));
    setErrors(error(values));
  };

  //수정하기
  const handleEdit = async (xYear: number, xMonth: number, xDate: number, xId: number) => {
    try {
      const loadAxios = await axios.put(`http://15.164.62.156:8000/api/todolist/${xYear}/${xMonth}/${xDate}/${xId}/`,
        {
          title: values.title,
          repeat: values.repeat,
          importance: values.importance,
          date: `${xYear}-${xMonth}-${xDate}`
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        })
      if (loadAxios.status === 200) {
        window.location.replace('/todolist');
      }
      console.log(loadAxios)
    }
    catch (error) {
      console.log(error)
    }
  }

  return {
    values,
    errors,
    submitting,
    setSubmitting,
    onSubmit,
    Year,
    Month,
    Day,
    handleChange,
    handleSubmit,
    handleEdit
  }
}