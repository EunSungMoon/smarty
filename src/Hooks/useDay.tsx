import axios from "axios";
import React, { useEffect, useState } from "react";

export default function useDay(initialDay: any) {
  const [lists, setLists] = useState([] as any);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewDate, setViewDate] = useState(initialDay);
  const token = `Token ${localStorage.getItem("token")}`;

  const dayjs = require("dayjs");
  const today = dayjs();
  const Year = today.format("YYYY");
  const Month = today.format("MM");
  const Day = today.format("DD");

  const loadCalendarAxios = async (xYear: number, xMonth: number) => {
    try {
      setError(null);
      setLists(null);
      setLoading(true);
      const loadData = await axios.get(
        `http://15.164.62.156:8000/api/todolist/${xYear}/${xMonth}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      setLists(loadData.data);
      console.log(loadData.data);
    } catch (error: any) {
      setError(error);
    }
    setLoading(false);
  };

  const loadDayAxios = async (xYear: number, xMonth: number, xDay: number) => {
    try {
      setError(null);
      setLists(null);
      setLoading(true);
      const loadData = await axios.get(
        `http://15.164.62.156:8000/api/todolist/${xYear}/${xMonth}/${xDay}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      setLists(loadData.data);
    } catch (error: any) {
      setError(error);
    }
    setLoading(false);
  };

  const handleId = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    return (e.target as HTMLButtonElement).value;
  };

  const [checked, setChecked] = useState<string>();

  const handleDoneValue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setChecked((e.target as HTMLButtonElement).dataset.done);
    console.log(checked);
  };

  const handleDone = () => {
    if (checked === "0") {
      setChecked("1");
      console.log(checked);
    } else if (checked === "1") {
      setChecked("0");
      console.log(checked);
    }
  };

  //수정하기
  const handleEdit = async (
    xYear: number,
    xMonth: number,
    xDate: number,
    xId: string,
    e:React.MouseEvent<HTMLButtonElement>
  ) => {
    try {
      handleDoneValue(e)
      handleDone();
      const loadAxios = await axios.put(
        `http://15.164.62.156:8000/api/todolist/${xYear}/${xMonth}/${xDate}/${xId}/`,
        {
          done: checked,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      console.log(loadAxios.data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    lists,
    loading,
    error,
    viewDate,
    setViewDate,
    loadCalendarAxios,
    loadDayAxios,
    handleEdit,
    Year,
    Month,
    Day,
    handleId,
    handleDoneValue,
  };
}
function e(e: any): string | (() => string | undefined) | undefined {
  throw new Error("Function not implemented.");
}
