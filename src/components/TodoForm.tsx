import { useState, FormEvent } from 'react'

interface TodoFormProps {
  onAdd: (title: string) => void
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onAdd(title)
    setTitle('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="新しいタスクを入力..."
        className="todo-input"
        autoFocus
      />
      <button type="submit" className="todo-add-btn" disabled={!title.trim()}>
        追加
      </button>
    </form>
  )
}
