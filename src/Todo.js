import React from "react";

export default function Todo({ todo, toggleTodo })
{
    let HandleTodoClick = () =>
    {
        toggleTodo(todo.id)
    }

    return (
        <div className={todo.complete ? "complete" : "incomplete"}>
            <label>
                <input type="checkbox" checked={todo.complete} onChange={HandleTodoClick}></input>
                {todo.name}
            </label>
        </div>
    )
}