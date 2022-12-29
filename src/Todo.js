import React from "react";

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }
  return (
    <div>
      <label className="d-flex flex-row gap-2">
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={handleTodoClick}
        />
        <h2>{todo.name}</h2>
      </label>
    </div>
  );
}
