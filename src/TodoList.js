import Todo from "./Todo";
import React from "react";

export default function TodoList({ todos, toggleTodo })
{
    return (
        // Make a list of individual todo's, sending said file the id (todo.id), completion (toggleTodo), and the name (todo) for each todo object        
        todos.map(todo =>
        {
            return (<Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} />)
        })
    )
}