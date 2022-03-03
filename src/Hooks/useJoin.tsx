import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

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

  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  //회원가입
  const handleAxiosJoin = async () => {
    try {
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
    catch (error) {
      console.log(error)
      // alert('회원가입에 실패했습니다')
    }
  }

  //로그인
  const handleAxiosLogin = async () => {
    try {
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
      if (loadAxios.status === 200) {
        localStorage.setItem('token', loadAxios.data.token)
        history.push('/smarty')
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (submitting) {
      onSubmit(values);
      setSubmitting(false);
    }
  }, [errors]);

  return {
    values,
    errors,
    submitting,
    handleChange,
    handleSubmit,
  };
}