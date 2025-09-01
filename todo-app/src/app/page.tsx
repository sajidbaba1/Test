import TodoList from '../components/TodoList';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">Animated To-Do List</h1>
        <TodoList />
      </div>
    </main>
  );
}
