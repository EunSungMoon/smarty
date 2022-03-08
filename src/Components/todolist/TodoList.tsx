import { HiOutlinePencilAlt, HiPlus, HiX } from "react-icons/hi";


export default function TodoList(props: any) {
  return (
    <section id='todolist' className="container">
      {
        props.lists.map((list: any) => (
          <form className="todolistWrap flex-start" key={list.id}>
            <input type='checkbox' id='importance' className="displayNone" />
            <label htmlFor='importance' className={`importance importance-${list.importance}`} ></label>
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
                <div className="radioWrap">
                  <label className="box radio">
                    <input type='radio' name='repeat' value='norepeat' className="displayNone" />
                    안함
                  </label>
                </div>
                <div className="radioWrap">
                  <label className="box radio">
                    <input type='radio' name='repeat' value='everyweek' className="displayNone" />
                    매주
                  </label>
                </div>
              </div>

              <div className="flex-start">
                <p className="margin0px selectTitle box">중요도</p>
                <div className="radioWrap">
                  <label className="box radio">
                    <input type='radio' name='importance' value='low' className="displayNone" />
                    낮음
                  </label>
                </div>
                <div className="radioWrap">
                  <label className="box radio">
                    <input type='radio' name='importance' value='normal' className="displayNone" />
                    보통
                  </label>
                </div>
                <div className="radioWrap">
                  <label className="box radio">
                    <input type='radio' name='importance' value='high' className="displayNone" />
                    높음
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="buttonWrap">
            <button type="button" title='등록하기' className="editBtn"><HiPlus /></button>
          </div>
        </div>
      </form>
    </section>
  )
}