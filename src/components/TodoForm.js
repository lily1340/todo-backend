import React, { useState, useEffect } from 'react';
import API from '../api';

export default function TodoForm({ refresh, editingTodo, clearEdit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
      setDueDate(editingTodo.dueDate.slice(0, 10));
    }
  }, [editingTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const todo = { title, description, dueDate };
    if (editingTodo) {
      await API.put(`/todos/${editingTodo._id}`, todo);
      clearEdit();
    } else {
      await API.post('/todos', todo);
    }
    setTitle('');
    setDescription('');
    setDueDate('');
    refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
      <button type="submit">{editingTodo ? 'Update' : 'Add'} Todo</button>
    </form>
  );
}
