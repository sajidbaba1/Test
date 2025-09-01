"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg">
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-grow p-2 border rounded-l-lg focus:outline-none"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          placeholder="Add a new task..."
        />
        <button
          onClick={addTodo}
          className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      <AnimatePresence>
        <ul className="list-none p-0">
          {todos.map(todo => (
            <motion.li
              key={todo.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between p-2 mb-2 bg-gray-100 rounded-lg"
            >
              <span
                className={`flex-grow cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="p-1 ml-2 text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </motion.li>
          ))}
        </ul>
      </AnimatePresence>
    </div>
  );
};

export default TodoList;
