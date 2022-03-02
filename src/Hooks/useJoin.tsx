import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'

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

export default function useSubmit({ initialValues, onSubmit, validate }: initValues) {
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
  };

  const handleAxios = async () => {
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
      console.log(loadAxios)
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (submitting) {
      handleAxios()
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