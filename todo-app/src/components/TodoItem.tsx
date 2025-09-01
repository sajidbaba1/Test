"use client";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <li className="flex items-center p-2 border-b">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="mr-2"
      />
      <span className={`flex-grow ${todo.completed ? "line-through" : ""}`}>
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
