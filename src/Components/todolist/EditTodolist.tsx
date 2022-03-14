import { useState, useEffect } from "react"
import { HiOutlinePencilAlt } from "react-icons/hi";
import useEdit from '../../Hooks/useEdit'
import error from "../../models/error";

export default function EditTodolist({ id, title, repeats, importances, clickedrepeat, clickedimportance }: any) {
  const [repeatDefault, setRepeatDefault] = useState(clickedrepeat);
  const [importanceDefault, setImportanceDefault] = useState(clickedimportance);

  const { submitting, setSubmitting, onSubmit, Year, Month, Day, values, errors, handleSubmit, handleChange, handleEdit } = useEdit({
    initialValues: {
      title: '',
      repeat: '0',
      importance: '0'
    },
    onSubmit: () => { },
    error
  })

  const handleRadioButton = (e: React.MouseEvent, setFirst: any) => {
    setFirst((e.target as HTMLInputElement).value);

    switch ((e.target as HTMLInputElement).name) {
      case 'repeat':
        return values.repeat = (e.target as HTMLInputElement).value
      case 'importance':
        return values.importance = (e.target as HTMLInputElement).value
    }
  };

  useEffect(() => {
    if (submitting) {
      onSubmit(values);
      handleEdit(Year, Month, Day, id)
      console.log('test')
    }
    setSubmitting(false)
  }, [errors]);

  return (
    <form className="editTodolistWrap" onSubmit={handleSubmit}>
      <div className="todolist container flex-start">
        <div className="todolistForm container">
          <input
            type='text'
            name='title'
            defaultValue={title}
            onChange={handleChange}
          />
          {errors.title && <p className='errorMsg-not'>{errors.title}</p>}

          <div className="flex-start">
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
                  <label className={`box radio ${importanceDefault === v.value ? 'checkedRadio' : ''}`} >
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
          <button type="submit" title='수정하기' className="editBtn"><HiOutlinePencilAlt /></button>
        </div>
      </div>
    </form>
  )
}