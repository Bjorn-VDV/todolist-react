import TodoList from './TodoList';
import React, { useRef, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './css.css'

function App()
{
  const TodoNameRef = useRef();
  const [todos, setTodos] = useState([]);
  const [isNotRobot, setIsNotRobot] = useState(false);


  // Saving the code in a local storage, so refreshing does not remove the entire list
  const LOCAL_STORAGE_KEY = 'todoApp.Todos'
  // First we check if there is anything to show in the first place, otherwise we fill
  // the localstorage with an empty refreshed page before loading it
  useEffect(() =>
  {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])
  // This effect saves the code to localstorage everytime something happens to the todo array
  useEffect(() =>
  {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos])


  // Code explained:
  // Make a new todo list that uses the entirety of the old todolist
  // Taking the id of the todo, it reverses that id's .complete attribute
  // It then sets the entire list to the new list with the reversed attribute
  let toggleTodo = (id) =>
  {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  // Set name to the nameref's CURRENT VALUE. Not adding ".current.value" this breaks the entire code.
  // If the name is empty, we don't add a thing.
  // Otherwise, we set out new todolist through a sort of foreach loop.
  // prevTodos will take all the todos we have, and we add a new one to it with values:
  // ID: Created by RNG. Name: Name reference. Completes: Defaulted to false.
  // We then set the nameref back to null.
  // ... also made a check for being a robot or not.
  let HandleAddTodo = () =>
  {
    if (!isNotRobot)
    {
      alert("Please make sure you are not a robot.")
    }
    else
    {
      const name = TodoNameRef.current.value
      if (name === "") return
      setTodos(prevTodos =>
      {
        return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
      })
      TodoNameRef.current.value = null
    }
  }

  // Create a new array of todo objects by only saving those where .complete is false.
  let ClearCompleted = () =>
  {
    const newTodos = todos.filter(todos => !todos.complete)
    setTodos(newTodos)
  }

  // Simple function to change bool from true to false on a checkbox.
  let handleIsRobot = () =>
  {
    setIsNotRobot(current => !current);
  }

  // - We throw the function toggletodo to the TodoList. Inside TodoList, this function will
  // be thrown towards Todo, where it will be used for the checkbox.
  // - We throw the individual todo-array into the TodoList where it will convert them into a list.
  // - We use TodoNameRef to store the input text as a reference which will be set to the name of the todo.
  // - Two buttons, each have their own function above.
  // - We filter the todos by removing those that are complete, and then check how many objects are in there.
  // This will show how many todo's are left to do.
  // Adding a "not a robot" checkbox because why not.
  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={TodoNameRef} type="text"></input>
      <button onClick={HandleAddTodo}>Add Todo</button>
      <button onClick={ClearCompleted}>Clear completed todos</button>
      <div>{todos.filter(todos => !todos.complete).length} todos left</div>
      <label><input type="checkbox" value={isNotRobot} onChange={handleIsRobot}></input> I am not a Robot</label>
    </>
  )
}

export default App;