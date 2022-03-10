import { HiOutlinePencilAlt, HiPlus, HiX } from "react-icons/hi";
import React, { useState, useCallback } from "react";
import InputRadio from "./InputRadio";

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

  const [checkedList, setCheckedLists] = useState<any>([]);

  const onCheckedElement = (checked: boolean, list: string) => {
    checked ?
      setCheckedLists([...checkedList, list]) :
      setCheckedLists(checkedList.filter((el: string) => el !== list))
    console.log(checkedList)
    console.log(list)
  }

  return (
    <section id='todolist' className="container">
      {
        props.lists.map((list: any) => (
          <form className={`todolistWrap flex-start ${checkedList.includes(list) ? 'checkedbox' : ''}`} key={list.id} >
            <label className={`importance importance-${checkedList.includes(list) ? '3' : `${list.importance}`}`} >
              <input
                type='checkbox'
                value={list.importance}
                className="displayNone"
                onChange={(e) => onCheckedElement(e.target.checked, list)}
                defaultChecked={checkedList.includes(list) ? true : false}
              />
            </label>
            <div className="todolist container">
              <p className="margin0px title">{list.title}</p>
              <div className="buttonWrap">
                <button type="button" title='수정하기' className="margin-right5px editBtn"><HiOutlinePencilAlt /></button>
                <button type="button" title='삭제하기' className="editBtn"><HiX /></button>
              </div>
            </div>

          </form>
        ))
      }
      <form className="newTodolistWrap">
        <input type='checkbox' id='importance' className="displayNone" />
        <label htmlFor='importance' className='importance importance-3'></label>
        <div className="todolist container flex-start">
          <div className="todolistForm container">
            <input type='text' />

            <div className="flex-start">
              <div className="flex-start repeatWrap">
                <p className="margin0px selectTitle box">반복</p>
                <InputRadio radios={repeats} />
              </div>

              <div className="flex-start">
                <p className="margin0px selectTitle box">중요도</p>
                <InputRadio radios={importances} />
              </div>

            </div>
          </div>
          <div className="buttonWrap">
            <button type="button" title='등록하기' className="editBtn"><HiPlus /></button>
          </div>
        </div>
      </form>
    </section >
  )
}