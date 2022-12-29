import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoList from "./TodoList";
import { Button, Container } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "todoApp";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleClearTodo() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  function handleAddTodo() {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodo) => {
      return [...prevTodo, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }
  return (
    <>
      <Container className="d-flex flex-column gap-2">
        <TodoList todos={todos} toggleTodo={toggleTodo} />
        <input
          className="mt-2"
          ref={todoNameRef}
          style={{ height: "40px", fontSize: "24px" }}
          type="text"
        />
        <Button onClick={handleAddTodo} variant="primary">
          Add To do{" "}
        </Button>
        <Button onClick={handleClearTodo} variant="secondary">
          Clear To do{" "}
        </Button>
        <h2>{todos.filter((todo) => !todo.complete).length} To Do Left</h2>
      </Container>
    </>
  );
}

export default App;
