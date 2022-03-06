import axios from "axios";
import React, { useEffect, useState } from "react";

export interface validateValues {
  username: string;
  password: string;
  passwordCheck: string;
}

export interface initValues {
  initialValues: validateValues;
  onSubmit: any;
  validate?: any
}

export default function useJoin({ initialValues, onSubmit, validate }: initValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorDisappear, setErrorDisappear] = useState(false); //에러메세지 사라지게
  const [checkID, setCheckID] = useState(false); //중복체크여부

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleUniqueCheck(e)
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    e.preventDefault();
    await new Promise(r => setTimeout(r, 1000));
    setErrors(validate(values));

    (e.target as Element).id === 'join' ? handleAxiosJoin() : handleAxiosLogin()
  };

  const handleUniqueCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setErrorDisappear(false)
    } else if (e.target.value === values.username) {
      setErrorDisappear(true)
    }
  }

  const changeBtnName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== values.username) {
      setCheckID(false)
    }
  }


  //회원가입
  const handleAxiosJoin = async () => {
    try {
      setLoading(true);
      const loadAxios = await axios.post('http://15.164.62.156:8000/api/register/',
        {
          username: values.username,
          password: values.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        })
      if (loadAxios.status === 201) {
        alert('회원가입 성공')
        window.location.replace('/')
      }
    }
    catch (error: any) {
      console.log(error)
      // alert('회원가입에 실패했습니다')
    }
  }

  //로그인
  const handleAxiosLogin = async () => {
    try {
      setLoading(true);
      const loadAxios = await axios.post('http://15.164.62.156:8000/api/login/',
        {
          username: values.username,
          password: values.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        })
      console.log(loadAxios)
      if (loadAxios.status === 200) {
        localStorage.setItem('token', loadAxios.data.token)
        document.location.href = '/todolist/'
      }
    }
    catch (error: any) {
      console.log(error)
    }
  }

  const handleCheckID = async () => {
    setErrorDisappear(true)
    try {
      const loadAxios = await axios.post('http://15.164.62.156:8000/api/uniquecheck/',
        {
          username: values.username,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        })
      console.log(loadAxios)
      if (loadAxios.status === 200) {
        setCheckID(true);
      } else if (loadAxios.status === 202) {
        setCheckID(false);
      }
    } catch (error) {
      setCheckID(false)
      console.log(error)
    }
  }

  useEffect(() => {
    if (submitting) {
      onSubmit(values);
      setSubmitting(false);
    }
    return () => setLoading(false)
  }, []);

  return {
    values,
    errors,
    submitting,
    checkID,
    errorDisappear,
    handleChange,
    handleSubmit,
    handleCheckID,
    changeBtnName
  };
}