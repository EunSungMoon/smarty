/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";

export interface todolistType {
  title: string;
  repeat: string;
  importance: string;
  done: string;
}

export interface initValues {
  initialValues: todolistType;
  onSubmit: any;
  error?: any;
}

export default function useSubmit({
  initialValues,
  onSubmit,
  error,
}: initValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const dayjs = require("dayjs");
  const today = dayjs();
  const Year = today.format("YYYY");
  const Month = today.format("MM");
  const Day = today.format("DD");

  let token = `Token ${localStorage.getItem("token")}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
    setErrors(error(values));
  };

  //삭제하기
  const handleDelete = async (
    xYear: number,
    xMonth: number,
    xDate: number,
    xid: any
  ) => {
    await axios.delete(
      `http://15.164.62.156:8000/api/todolist/${xYear}/${xMonth}/${xDate}/${xid}/`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    window.location.replace("/todolist");
  };

  const handleId = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    return (e.target as HTMLButtonElement).value;
  };

  //수정하기
  const handleEdit = async (
    xYear: number,
    xMonth: number,
    xDate: number,
    xId: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    try {
      let doneValue = "";
      if ((e.target as HTMLButtonElement).dataset.done === "0") {
        doneValue = "1";
      } else if ((e.target as HTMLButtonElement).dataset.done === "1") {
        doneValue = "0";
      }
      const loadAxios = await axios.put(
        `http://15.164.62.156:8000/api/todolist/${xYear}/${xMonth}/${xDate}/${xId}/`,
        {
          done: doneValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
    } catch (error) {
      setErrors(errors);
    }
  };

  //등록하기
  const handleAxios = async (xYear: number, xMonth: number, xDate: number) => {
    try {
      const loadAxios = await axios.post(
        `http://15.164.62.156:8000/api/todolist/${xYear}/${xMonth}/${xDate}/`,
        {
          title: values.title,
          repeat: values.repeat,
          importance: values.importance,
          done: values.done,
          date: `${xYear}-${xMonth}-${xDate}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (loadAxios.status === 201) {
        window.location.replace("/todolist");
      }
    } catch (error) {
      setErrors(errors);
    }
  };

  useEffect(() => {
    if (submitting) {
      if (errors.title === "*할일이 입력되지 않았습니다.") {
        return;
      } else {
        handleAxios(Year, Month, Day);
      }
      onSubmit(values);
    }
    setSubmitting(false);
  }, [errors]);

  return {
    values,
    errors,
    submitting,
    Year,
    Month,
    Day,
    handleChange,
    handleSubmit,
    handleDelete,
    handleEdit,
    handleId,
  };
}
