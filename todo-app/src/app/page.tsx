"use client";

import { useState, useMemo } from "react";

// Helper function to calculate current streak
const calculateCurrentStreak = (todos: { [key: string]: string[] }): [number, Date[]] => {
  const dates = Object.keys(todos)
    .filter((date) => todos[date].length > 0)
    .map((date) => new Date(date))
    .sort((a, b) => b.getTime() - a.getTime());

  if (dates.length === 0) {
    return [0, []];
  }

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const mostRecentDate = dates[0];
  if (
    mostRecentDate.toDateString() !== today.toDateString() &&
    mostRecentDate.toDateString() !== yesterday.toDateString()
  ) {
    return [0, []];
  }

  let currentStreak = 0;
  const streakDays: Date[] = [];

  for (let i = 0; i < dates.length; i++) {
    const date = dates[i];
    if (i === 0) {
      currentStreak = 1;
      streakDays.push(date);
    } else {
      const diff = dates[i - 1].getTime() - date.getTime();
      if (diff === 24 * 60 * 60 * 1000) {
        currentStreak++;
        streakDays.push(date);
      } else {
        break;
      }
    }
  }

  return [currentStreak, streakDays];
};

// Helper function to generate calendar days
const generateCalendarDays = (
  date: Date,
  selectedDate: Date,
  onDateClick: (day: number) => void,
  streakDays: Date[]
) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const today = new Date();
  const days = [];

  // Add empty slots for days before the first day of the month
  for (let i = 0; i < firstDay.getDay(); i++) {
    days.push(<div key={`empty-${i}`} className="border p-2 h-24"></div>);
  }

  // Add days of the month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const dayDate = new Date(year, month, i);
    const isSelected = dayDate.toDateString() === selectedDate.toDateString();
    const isToday = dayDate.toDateString() === today.toDateString();
    const isStreakDay = streakDays.some(
      (streakDate) => streakDate.toDateString() === dayDate.toDateString()
    );

    days.push(
      <div
        key={i}
        className={`border p-2 h-24 cursor-pointer hover:bg-gray-200 ${
          isSelected ? "bg-blue-200" : ""
        } ${isToday ? "bg-yellow-200" : ""} ${
          isStreakDay ? "bg-green-300" : ""
        }`}
        onClick={() => onDateClick(i)}
      >
        {i}
      </div>
    );
  }

  return days;
};

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todos, setTodos] = useState<{ [key: string]: string[] }>({
    // Example data for testing
    [new Date().toDateString()]: ["Task 1"],
    [new Date(new Date().setDate(new Date().getDate() - 1)).toDateString()]: ["Task 2"],
    [new Date(new Date().setDate(new Date().getDate() - 2)).toDateString()]: ["Task 3"],
    [new Date(new Date().setDate(new Date().getDate() - 4)).toDateString()]: ["Task 4"],
  });
  const [newTodo, setNewTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  const selectedDate = currentDate.toDateString();

  const [streak, streakDays] = useMemo(() => calculateCurrentStreak(todos), [todos]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos((prevTodos) => ({
        ...prevTodos,
        [selectedDate]: [...(prevTodos[selectedDate] || []), newTodo],
      }));
      setNewTodo("");
    }
  };

  const handleRemoveTodo = (index: number) => {
    setTodos((prevTodos) => ({
      ...prevTodos,
      [selectedDate]: prevTodos[selectedDate].filter((_, i) => i !== index),
    }));
  };

  const handleEditTodo = (index: number) => {
    setEditingIndex(index);
    setEditingText(todos[selectedDate][index]);
  };

  const handleUpdateTodo = () => {
    if (editingIndex !== null && editingText.trim()) {
      const updatedTodos = [...todos[selectedDate]];
      updatedTodos[editingIndex] = editingText;
      setTodos((prevTodos) => ({
        ...prevTodos,
        [selectedDate]: updatedTodos,
      }));
      setEditingIndex(null);
      setEditingText("");
    }
  };

  const handleDateClick = (day: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
  };

  return (
    <div className="flex h-screen bg-gray-100 p-4">
      {/* Calendar Section */}
      <div className="w-1/2 pr-2">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() =>
                setCurrentDate(
                  new Date(currentDate.setMonth(currentDate.getMonth() - 1))
                )
              }
            >
              &lt;
            </button>
            <h2 className="text-xl font-bold">
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() =>
                setCurrentDate(
                  new Date(currentDate.setMonth(currentDate.getMonth() + 1))
                )
              }
            >
              &gt;
            </button>
          </div>
          <div className="text-center mb-4">
            <h3 className="text-lg font-bold">Current Streak: {streak} days</h3>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center border-t pt-2">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
            {generateCalendarDays(
              currentDate,
              currentDate,
              handleDateClick,
              streakDays
            )}
          </div>
        </div>
      </div>

      {/* To-Do List Section */}
      <div className="w-1/2 pl-2">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-bold mb-4">To-Do for {selectedDate}</h2>
          <div className="flex mb-4">
            <input
              type="text"
              className="border p-2 flex-grow rounded-l"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new to-do"
            />
            <button
              className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
              onClick={handleAddTodo}
            >
              Add
            </button>
          </div>
          <ul>
            {(todos[selectedDate] || []).map((todo, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 border-b hover:bg-gray-100"
              >
                {editingIndex === index ? (
                  <input
                    type="text"
                    className="border p-2 flex-grow"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                ) : (
                  <span>{todo}</span>
                )}
                <div>
                  {editingIndex === index ? (
                    <button
                      className="text-green-500 mr-2 hover:text-green-600"
                      onClick={handleUpdateTodo}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="text-yellow-500 mr-2 hover:text-yellow-600"
                      onClick={() => handleEditTodo(index)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleRemoveTodo(index)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
