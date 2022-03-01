import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { validateValues } from '../models/validate';

export interface joinValues {
  initialValues: validateValues;
  onSubmit: any;
  validate:any
}

export default function useJoin({ initialValues, onSubmit, validate }: joinValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({}); //타입 지정 필요
  const [submitting, setSubmitting] = useState(false);

  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement
    setValues({ ...values, [name]: value });
    console.log((e.target as HTMLInputElement).value)
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    e.preventDefault();
    await new Promise(r => setTimeout(r, 1000));
    setErrors(validate(values));
  };

  const handleAxios = async () => {
    try {
      const loadAxios = await axios.post('http://15.164.62.156:8000/api/register/', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(loadAxios);
    }
    catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    handleAxios()
    console.log('test')
    // if (submitting) {
    //   // if (Object.keys(errors).length === 0) {
    //   //   handleAxios();
    //   //   onSubmit(values);
    //   // }
    //   setSubmitting(false);
    // }
  }, [errors]);

  return {
    values,
    errors,
    submitting,
    handleChange,
    handleSubmit
  };
}