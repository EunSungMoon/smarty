
import Calendar from '../calendar/Calendar';
import TodoList from '../todolist/TodoList';

export default function Board() {
  return (
    <main id='calendarWrap' className="container">
      <Calendar />
      <TodoList />
    </main>
  )
}