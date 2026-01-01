import { useState, useEffect, useCallback } from 'react'
import { Todo } from '../types/todo'

const STORAGE_KEY = 'todos'

function loadTodos(): Todo[] {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return []
  try {
    return JSON.parse(stored)
  } catch {
    return []
  }
}

function saveTodos(todos: Todo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos)

  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  const addTodo = useCallback((title: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
      createdAt: Date.now(),
    }
    setTodos(prev => [newTodo, ...prev])
  }, [])

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }, [])

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }, [])

  const updateTodo = useCallback((id: string, title: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, title: title.trim() } : todo
      )
    )
  }, [])

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed))
  }, [])

  const remainingCount = todos.filter(t => !t.completed).length
  const completedCount = todos.filter(t => t.completed).length

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted,
    remainingCount,
    completedCount,
  }
}
