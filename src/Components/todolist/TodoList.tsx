export default function TodoList(props :any) {
  return (
    <section id='todolist'>
      {
        props.lists.map((list: any) => (
          <div className="todolistWrap" key={list.id}>
            <input type='checkbox' id='importance' className="displayNone" />
            <label htmlFor='importance' className={`importance importance-${list.importance}`} ></label>
            <p className="margin0px title">{list.title}</p>
          </div>
        ))
      }
    </section>
  )
}