import { HiOutlinePencilAlt, HiPlus, HiX } from "react-icons/hi";


export default function TodoList(props: any) {
  return (
    <section id='todolist' className="container">
      {
        props.lists.map((list: any) => (
          <form className="todolistWrap flex" key={list.id}>
            <input type='checkbox' id='importance' className="displayNone" />
            <label htmlFor='importance' className={`importance importance-${list.importance}`} ></label>
            <div className="todolist container">
              <p className="margin0px title">{list.title}</p>
              <div className="buttonWrap">
                <button type="button" title='수정하기' className="margin-right5px"><HiOutlinePencilAlt /></button>
                <button type="button" title='삭제하기'><HiX /></button>
              </div>
            </div>

          </form>
        ))
      }
      <form className="newTodolistWrap flex">
        <input type='checkbox' id='importance' className="displayNone" />
        <label htmlFor='importance' className='importance importance-3'></label>
        <div className="todolist container flex">
          <div className="todolistForm container">
            <input type='text' />
          </div>
          <div className="buttonWrap enrollBtn">
            <button type="button" title='등록하기'><HiPlus /></button>
          </div>
        </div>
      </form>
    </section>
  )
}