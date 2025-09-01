import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">To-Do List</h1>
        <TodoList />
      </div>
    </main>
  );
}
