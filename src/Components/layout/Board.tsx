import Month from "../calendar/Month";
import Calendar from '../calendar/Calendar';
import TodoList from '../todolist/TodoList';

export default function Board() {
  return (
    <main>
      <Month />
      <section id='calendarWrap' className="container">
        <Calendar />
        <TodoList />
      </section>
    </main>
  )
}