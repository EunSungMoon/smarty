import {
  HiOutlinePencilAlt,
  HiPlus,
  HiX,
  HiOutlineTrash,
} from "react-icons/hi";
import React, { useState } from "react";
import useSubmit from "../../Hooks/useSubmit";
import error from "../../models/error";
import { Scrollbars } from "react-custom-scrollbars";
import EditTodolist from "./EditTodolist";

export default function TodoList(props: any) {
  const importances = [
    { value: "0", text: "낮음" },
    { value: "1", text: "보통" },
    { value: "2", text: "높음" },
  ];

  const [importanceDefault, setImportanceDefault] = useState(
    importances[0].value
  );
  const [clickEditButton, setClickEditButton] = useState(false);
  const [clickedId, setClickedId] = useState<string>("");

  const {
    Year,
    Month,
    Day,
    values,
    errors,
    handleSubmit,
    handleChange,
    handleDelete,
    handleEdit,
    handleId,
  } = useSubmit({
    initialValues: {
      title: "",
      repeat: "0",
      importance: "0",
      done: "0",
    },
    onSubmit: () => {},
    error,
  });

  const handleRadioButton = (e: React.MouseEvent) => {
    setImportanceDefault((e.target as HTMLInputElement).value);
  };

  const handleEditButton = (xId: string) => {
    setClickEditButton(!clickEditButton);
    setClickedId(xId);
  };

  return (
    <section id="todolist" className="container">
      <Scrollbars style={{ height: 600 }} className="customScroll">
        <form className="newTodolistWrap" onSubmit={handleSubmit}>
          <input type="checkbox" id="importance" className="displayNone" />
          <label htmlFor="importance" className="importance grayBox"></label>
          <div className="todolist container flex-start width">
            <div className="todolistForm container">
              <input
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
              />
              {errors.title && <p className="errorMsg-not">{errors.title}</p>}

              <div className="flex-start flex-flow">
                <div className="flex-start">
                  <p className="margin0px selectTitle box">중요도</p>
                  {importances.map((v: any) => (
                    <div className="radioWrap" key={v.value}>
                      <label
                        className={`box radio ${
                          importanceDefault === v.value
                            ? `checkedRadio-${v.value}`
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="importance"
                          value={v.value}
                          className="displayNone"
                          onClick={(e) => handleRadioButton(e)}
                          onChange={handleChange}
                        />
                        {v.text}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="buttonWrap">
              <button type="submit" title="등록하기" className="editBtn">
                <HiPlus />
              </button>
            </div>
          </div>
        </form>
        {props.lists.map((list: any) => (
          <React.Fragment key={list.id}>
            {props.dateline ? (
              <p className="todolistDate">{list.date}</p>
            ) : null}
            <form className={`todolistWrap checkedbox-${list.done}`}>
              <div className="todolist container">
                <button
                  type="button"
                  data-done={list.done}
                  className={`importance importance-${list.importance} done-${list.done}`}
                  value={list.id}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    handleEdit(Year, Month, Day, handleId(e), e);
                    props.doneCheck();
                  }}
                ></button>
                <p className={`margin0px title color-${list.done}`}>
                  {list.title}
                </p>
                <div className="buttonWrap">
                  <button
                    type="button"
                    title={
                      clickEditButton && clickedId === list.id
                        ? "닫기"
                        : "수정하기"
                    }
                    className="margin-right5px editBtn"
                    onClick={() => handleEditButton(list.id)}
                  >
                    {clickEditButton && clickedId === list.id ? (
                      <HiX />
                    ) : (
                      <HiOutlinePencilAlt />
                    )}
                  </button>
                  <button
                    type="button"
                    title="삭제하기"
                    className="editBtn"
                    onClick={() => handleDelete(Year, Month, Day, list.id)}
                  >
                    <HiOutlineTrash />
                  </button>
                </div>
              </div>
            </form>
            {clickEditButton && clickedId === list.id ? (
              <EditTodolist
                id={list.id}
                title={list.title}
                importances={importances}
                clickedrepeat={list.repeat}
                clickedimportance={list.importance}
                animation={clickEditButton}
              />
            ) : null}
          </React.Fragment>
        ))}
      </Scrollbars>
    </section>
  );
}
