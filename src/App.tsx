import { useTodos } from './hooks/useTodos'
import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'
import './App.css'

function App() {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted,
    remainingCount,
    completedCount,
  } = useTodos()

  return (
    <div className="app">
      <header className="app-header">
        <h1>TODO</h1>
      </header>
      <main className="app-main">
        <TodoForm onAdd={addTodo} />
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
        />
        {todos.length > 0 && (
          <footer className="app-footer">
            <span className="todo-count">
              残り: {remainingCount}件
            </span>
            {completedCount > 0 && (
              <button className="clear-btn" onClick={clearCompleted}>
                完了済みを削除
              </button>
            )}
          </footer>
        )}
      </main>
    </div>
  )
}

export default App
