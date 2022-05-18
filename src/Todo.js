import React from "react";

export default function Todo({ todo, toggleTodo })
{
    let HandleTodoClick = () =>
    {
        toggleTodo(todo.id)
    }

    // This is how each todo will be printed, how they show up on the screen. 
            // A checkbox based on bool completion or not.
            // The name of the todo object.
    // When completed, it will change the CSS class for the div.    
    return (
        <div className={todo.complete ? "complete" : "incomplete"}>
            <label>
                <input type="checkbox" checked={todo.complete} onChange={HandleTodoClick}></input>
                {todo.name}
            </label>
        </div>
    )
}