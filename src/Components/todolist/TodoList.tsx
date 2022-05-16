import { HiOutlinePencilAlt, HiPlus, HiX, HiOutlineTrash } from "react-icons/hi";
import React, { useState } from "react";
import useSubmit from "../../Hooks/useSubmit";
import error from "../../models/error";
import { Scrollbars } from 'react-custom-scrollbars';
import EditTodolist from "./EditTodolist";

export default function TodoList(props: any) {
  const importances = [
    { value: '0', text: '낮음' },
    { value: '1', text: '보통' },
    { value: '2', text: '높음' }
  ]
  const repeats = [
    { value: '0', text: '안함' },
    { value: '1', text: '매주' }
  ]

  const [repeatDefault, setRepeatDefault] = useState(repeats[0].value);
  const [importanceDefault, setImportanceDefault] = useState(repeats[0].value);
  const [clickEditButton, setClickEditButton] = useState(false);
  const [clickedId, setClickedId] = useState<string>('');
  const [checkedList, setCheckedLists] = useState<any>([]);

  const { Year, Month, Day, values, errors, handleSubmit, handleChange, handleDelete, } = useSubmit({
    initialValues: {
      title: '',
      repeat: '0',
      importance: '0',
      done: '0'
    },
    onSubmit: () => { },
    error
  });

  const handleRadioButton = (e: React.MouseEvent, setFirst: any) => {
    setFirst((e.target as HTMLInputElement).value);

    switch ((e.target as HTMLInputElement).name) {
      case 'repeat':
        return values.repeat = (e.target as HTMLInputElement).value
      case 'importance':
        return values.importance = (e.target as HTMLInputElement).value
    }
  };

  const handleEditButton = (xId: string, button: boolean, settingButton: any) => {
    settingButton(!button);
    setClickedId(xId);
  }

  const onCheckedElement = (checked: boolean, list: string, e: React.ChangeEvent<HTMLInputElement>) => {
    checked ?
      setCheckedLists([...checkedList, list]) :
      setCheckedLists(checkedList.filter((el: string) => el !== list));
  };

  return (
    <section id='todolist' className="container">
      <Scrollbars style={{ height: 600 }} className='customScroll'>
        <form className="newTodolistWrap" onSubmit={handleSubmit}>
          <input type='checkbox' id='importance' className="displayNone" />
          <label htmlFor='importance' className='importance grayBox'></label>
          <div className="todolist container flex-start width">
            <div className="todolistForm container">
              <input
                type='text'
                name='title'
                value={values.title}
                onChange={handleChange}
              />
              {errors.title && <p className='errorMsg-not'>{errors.title}</p>}

              <div className="flex-start flex-flow">
                <div className="flex-start repeatWrap">
                  <p className="margin0px selectTitle box">반복</p>
                  {repeats.map((v: any) => (
                    <div className="radioWrap" key={v.value}>
                      <label className={`box radio ${repeatDefault === v.value ? 'checkedRadio' : ''}`} >
                        <input
                          type='radio'
                          name='repeat'
                          value={v.value}
                          className="displayNone"
                          onClick={(e) => handleRadioButton(e, setRepeatDefault)}
                          onChange={handleChange}
                        />
                        {v.text}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="flex-start">
                  <p className="margin0px selectTitle box">중요도</p>
                  {importances.map((v: any) => (
                    <div className="radioWrap" key={v.value}>
                      <label className={`box radio ${importanceDefault === v.value ? `checkedRadio-${v.value}` : ''}`} >
                        <input
                          type='radio'
                          name='importance'
                          value={v.value}
                          className="displayNone"
                          onClick={(e) => handleRadioButton(e, setImportanceDefault)}
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
              <button type="submit" title='등록하기' className="editBtn"><HiPlus /></button>
            </div>
          </div>
        </form>
        {
          props.lists.map((list: any) => (
            <React.Fragment key={list.id}>
              {props.dateline ? <p className="todolistDate">{list.date}</p> : null}
              <form
                className={`todolistWrap ${checkedList.includes(list) ? 'checkedbox' : ''}`}
              >
                <div className="todolist container" >
                  <button
                    type="button"
                    className="checkboxBtn"
                    onClick={() => handleDelete(Year, Month, Day, list.id)}
                  >
                    <label className={`importance importance-${list.importance} ${checkedList.includes(list) ? 'grayBox' : ''}`}>
                      <input
                        type='checkbox'
                        name="done"
                        className="displayNone"
                        onChange={(e) => onCheckedElement(e.target.checked, list, e)}
                        defaultChecked={checkedList.includes(list) ? true : false}
                      />
                    </label>
                  </button>
                  <p className={`margin0px title ${checkedList.includes(list) ? 'grayColor' : ''}`}>{list.title}</p>
                  <div className="buttonWrap">
                    <button
                      type="button"
                      title={clickEditButton && clickedId === list.id ? '닫기' : '수정하기'}
                      className="margin-right5px editBtn"
                      onClick={() => handleEditButton(list.id, clickEditButton, setClickEditButton)}
                    >
                      {clickEditButton && clickedId === list.id ? <HiX /> : < HiOutlinePencilAlt />}
                    </button>
                    <button
                      type="button"
                      title='삭제하기'
                      className="editBtn"
                      onClick={() => handleDelete(Year, Month, Day, list.id)}
                    >
                      <HiOutlineTrash />
                    </button>
                  </div>
                </div>
              </form>
              {clickEditButton && clickedId === list.id ?
                <EditTodolist
                  id={list.id}
                  title={list.title}
                  repeats={repeats}
                  importances={importances}
                  clickedrepeat={list.repeat}
                  clickedimportance={list.importance}
                  animation={clickEditButton}
                />
                : null}

            </React.Fragment>
          ))
        }
      </Scrollbars>
    </section >
  )
}