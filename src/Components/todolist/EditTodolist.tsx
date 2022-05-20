/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import useEdit from "../../Hooks/useEdit";
import error from "../../models/error";

export default function EditTodolist({
  id,
  title,
  importances,
  clickedimportance,
  animation,
}: any) {
  const {
    submitting,
    onSubmit,
    Year,
    Month,
    Day,
    values,
    errors,
    setSubmitting,
    handleEditSubmit,
    handleEditChange,
    handleEdit,
  } = useEdit({
    initialValues: {
      title: title,
      importance: clickedimportance,
      done: "0",
    },
    onSubmit: () => {},
    error,
  });

  const [importanceDefault, setImportanceDefault] = useState(clickedimportance);

  useEffect(() => {
    if (submitting) {
      if (errors.title === "*할일이 입력되지 않았습니다.") {
        return;
      } else {
        handleEdit(Year, Month, Day, id);
      }
      onSubmit(values);
    }
    setSubmitting(false);
  }, [errors]);

  const handleRadioButton = (e: React.MouseEvent) => {
    setImportanceDefault((e.target as HTMLInputElement).value);
  };

  return (
    <form
      className={`newTodolistWrap editForm ${animation ? "fadeIn" : ""}`}
      onSubmit={handleEditSubmit}
    >
      <div className="todolist container flex-start">
        <div className="todolistForm container">
          <input
            type="text"
            name="title"
            defaultValue={title}
            onChange={handleEditChange}
          />
          {title.length === 0 && (
            <p className="errorMsg-not">*할일이 입력되지 않았습니다.</p>
          )}

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
                      onChange={handleEditChange}
                    />
                    {v.text}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="buttonWrap">
          <button type="submit" title="수정하기" className="editBtn">
            <HiOutlinePencilAlt />
          </button>
        </div>
      </div>
    </form>
  );
}
