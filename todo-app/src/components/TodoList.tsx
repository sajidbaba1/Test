"use client";

import { useState } from "react";
import TodoItem from "./TodoItem";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Learn Next.js", completed: false },
    { id: 2, text: "Build a to-do app", completed: true },
    { id: 3, text: "Deploy the app", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo, completed: false },
      ]);
      setNewTodo("");
    }
  };

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <div className="flex space-x-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-grow p-2 border rounded"
          placeholder="Add a new to-do"
        />
        <button
          onClick={handleAddTodo}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      <ul className="mt-4 space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
