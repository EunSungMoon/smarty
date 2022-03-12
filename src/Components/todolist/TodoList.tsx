import { HiOutlinePencilAlt, HiPlus, HiX } from "react-icons/hi";
import { useState } from "react";
import useSubmit from "../../Hooks/useSubmit";
import error from "../../models/error";
import { Scrollbars } from 'react-custom-scrollbars';

export default function TodoList(props: any) {
  const { Year, Month, Day, values, errors, handleSubmit, handleChange, handleDelete } = useSubmit({
    initialValues: {
      title: '',
      repeat: 0,
      importance: 0
    },
    onSubmit: () => { },
    error
  })

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
  const [repeatClick, setRepeatClick] = useState<any>([]);
  const [importanceClick, setImportanceClick] = useState<any>([]);

  const onCheckedElement = (checked: boolean, list: string) => {
    checked ?
      setCheckedLists([...checkedList, list]) :
      setCheckedLists(checkedList.filter((el: string) => el !== list))
  }

  const handleCheckbox = (
    checked: boolean,
    list: string,
    first: any,
    second: any,
    e: React.ChangeEvent<HTMLInputElement>) => { //const [second, first]=useState()

    handleChange(e);
    checked ?
      first([second[0], list]) :
      first(second.filter((el: string) => el !== list))

    console.log(checked)
    console.log(second)
  }

  return (
    <section id='todolist' className="container">
      <Scrollbars style={{ height: 600 }}>
        <form className="newTodolistWrap" onSubmit={handleSubmit}>
          <input type='checkbox' id='importance' className="displayNone" />
          <label htmlFor='importance' className='importance importance-3'></label>
          <div className="todolist container flex-start">
            <div className="todolistForm container">
              <input
                type='text'
                name='title'
                value={values.title}
                onChange={handleChange}
              />
              {errors.title && <p className='errorMsg-not'>{errors.title}</p>}

              <div className="flex-start">
                <div className="flex-start repeatWrap">
                  <p className="margin0px selectTitle box">반복</p>
                  {repeats.map((v: any) => (
                    <div className="radioWrap" key={v.value}>
                      <label className={`box radio ${repeatClick.includes(v) ? 'checkedRadio' : ''}`} >
                        <input
                          type='radio'
                          name='repeat'
                          value={v.value}
                          className="displayNone"
                          onChange={(e) => handleCheckbox(e.target.checked, v, setRepeatClick, repeatClick, e)}
                          defaultChecked={repeatClick.includes(v) ? true : false}
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
                      <label className={`box radio ${importanceClick.includes(v) ? 'checkedRadio' : ''}`} >
                        <input
                          type='radio'
                          name='importance'
                          value={v.value}
                          className="displayNone"
                          onChange={(e) => handleCheckbox(e.target.checked, v, setImportanceClick, importanceClick, e)}
                          defaultChecked={importanceClick.includes(v) ? true : false}
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
                  <button type="button" title='삭제하기' className="editBtn" onClick={() => handleDelete(Year, Month, Day, list.id)}><HiX /></button>
                </div>
              </div>

            </form>
          ))
        }
      </Scrollbars>
    </section >
  )
}