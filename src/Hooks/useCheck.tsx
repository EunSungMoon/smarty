import React, { useEffect, useState } from "react";
import axios from "axios";

export interface todolistType {
  done: string;
}

export interface initValues {
  initialValues: todolistType;
  onSubmit: any;
  error?: any;
}

export default function useCheck({ initialValues, onSubmit, error }: initValues) {
  // const { id } = useParams<any>();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const dayjs = require('dayjs');
  const today = dayjs();
  const Year = today.format('YYYY')
  const Month = today.format('MM')
  const Day = today.format('DD')

  let token = `Token ${localStorage.getItem('token')}`

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    console.log(values)
  };

  const handleCheckSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    e.preventDefault();
    await new Promise(r => setTimeout(r, 1000));
    setErrors(error(values));
  };

  //수정하기
  const handleCheckAxios = async (xYear: number, xMonth: number, xDate: number, xId: string) => {
    try {
      const loadAxios = await axios.put(`http://15.164.62.156:8000/api/todolist/${xYear}/${xMonth}/${xDate}/${xId}/only`,
        {
          done: values.done,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        })
      // if (loadAxios.status === 200) {
      //   window.location.replace('/todolist');
      // }
      console.log(loadAxios)
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (submitting) {
      onSubmit(values);
    }
    setSubmitting(false)
  }, [errors]);

  return {
    values,
    errors,
    submitting,
    Year,
    Month,
    Day,
    onSubmit,
    setSubmitting,
    handleCheckAxios,
    handleCheckSubmit,
    handleCheckChange
  }
}