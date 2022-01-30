import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/inputTodo";
import { IncompleteTodos } from "./components/incompleteTodos";
import { CompleteTodos } from "./components/completeTodos";

export const App = () => {
  const [incomplete_todos, setIncompleteTodos] = useState([]);
  const [complete_todos, setCompleteTodos] = useState([]);
  const [add_todo_text, setTodoText] = useState("");
  const onChangeTodoText = (event) => setTodoText(event.target.value);
  const addTodo = (event) => {
    if (add_todo_text === "") {
      return;
    }
    const newTods = [...incomplete_todos, add_todo_text];
    setIncompleteTodos(newTods);
    setTodoText("");
  };
  const deleteTodo = (idx) => {
    const newTodos = [...incomplete_todos];
    newTodos.splice(idx, 1);
    setIncompleteTodos(newTodos);
  };
  const completeTodos = (idx) => {
    const newTodos = [...incomplete_todos];
    const comp_todo = newTodos[idx];
    const newCompleteTodos = [...complete_todos, comp_todo];
    setCompleteTodos(newCompleteTodos);
    newTodos.splice(idx, 1);
    setIncompleteTodos(newTodos);
  };
  const backTodo = (idx) => {
    const newCompleteTodos = [...complete_todos];
    newCompleteTodos.splice(idx, 1);
    setCompleteTodos(newCompleteTodos);

    const newIncompleteTodos = [...incomplete_todos, complete_todos[idx]];
    setIncompleteTodos(newIncompleteTodos);
  };
  return (
    <>
      <InputTodo
        todoText={add_todo_text}
        onChange={onChangeTodoText}
        onClick={addTodo}
        disabled={incomplete_todos.length >= 5}
      />
      {incomplete_todos.length >= 5 && (
        <p style={{ color: "red" }}>todoは5個まで</p>
      )}
      <IncompleteTodos
        todos={incomplete_todos}
        onClickComplete={completeTodos}
        onClickDelete={deleteTodo}
      />
      <CompleteTodos todos={complete_todos} onClickBack={backTodo} />
    </>
  );
};
