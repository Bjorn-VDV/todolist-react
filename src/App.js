import TodoList from './TodoList';
import React, { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './css.css'

function App()
{
  const TodoNameRef = useRef();
  const [todos, setTodos] = useState([]);

  let toggleTodo = (id) =>
  {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  let HandleAddTodo = () =>
  {
    const name = TodoNameRef.current.value
    if (name === "") return
    setTodos(prevTodos =>
    {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    TodoNameRef.current.value = null
  }

  let ClearCompleted = () =>
  {
    const newTodos = todos.filter(todos => !todos.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={TodoNameRef} type="text"></input>
      <button onClick={HandleAddTodo}>Add Todo</button>
      <button onClick={ClearCompleted}>Clear completed todos</button>
      <div>{todos.filter(todos => !todos.complete).length} todos left</div>
    </>
  )
}

export default App;